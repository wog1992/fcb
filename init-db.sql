-- Create the 'profiles' table to store additional user information
CREATE TABLE public.profiles (
    id uuid REFERENCES auth.users ON DELETE CASCADE,
    is_admin boolean DEFAULT FALSE NOT NULL,
    phone_number text,
    referral_code text UNIQUE,
    referred_by uuid REFERENCES public.profiles (id),
    balance numeric DEFAULT 0 NOT NULL,
    total_invested numeric DEFAULT 0 NOT NULL,
    total_earned numeric DEFAULT 0 NOT NULL,
    status text DEFAULT 'active' NOT NULL, -- 'active', 'suspended', 'banned'
    PRIMARY KEY (id)
);

-- Enable Row Level Security (RLS) for the 'profiles' table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policy for users to view their own profile
CREATE POLICY "Users can view their own profile." ON public.profiles
FOR SELECT USING (auth.uid() = id);

-- Policy for users to update their own profile (e.g., phone number)
CREATE POLICY "Users can update their own profile." ON public.profiles
FOR UPDATE USING (auth.uid() = id);

-- Policy for admins to view all profiles
CREATE POLICY "Admins can view all profiles." ON public.profiles
FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = TRUE));

-- Policy for admins to update any profile
CREATE POLICY "Admins can update any profile." ON public.profiles
FOR UPDATE TO authenticated USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = TRUE));

-- Create the 'investment_packages' table
CREATE TABLE public.investment_packages (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text UNIQUE NOT NULL, -- e.g., 'J1', 'J2'
    cost numeric NOT NULL,
    daily_profit numeric NOT NULL,
    monthly_return numeric NOT NULL,
    yearly_return numeric NOT NULL,
    level1_bonus_rate numeric DEFAULT 0.11 NOT NULL,
    level2_bonus_rate numeric DEFAULT 0.03 NOT NULL,
    level3_bonus_rate numeric DEFAULT 0.01 NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Seed initial data for 'investment_packages'
INSERT INTO public.investment_packages (name, cost, daily_profit, monthly_return, yearly_return) VALUES
('J1', 100, 60, 1800, 21900),
('J2', 5400, 180, 5400, 65700),
('J3', 10500, 350, 10500, 127750),
('J4', 18000, 600, 18000, 219000),
('J5', 39000, 1300, 39000, 474500),
('J6', 96000, 3200, 96000, 1168000)
ON CONFLICT (name) DO NOTHING;

-- Create the 'transactions' table
CREATE TABLE public.transactions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES public.profiles (id) ON DELETE CASCADE NOT NULL,
    type text NOT NULL, -- 'deposit', 'withdrawal', 'investment', 'daily_profit', 'referral_bonus'
    amount numeric NOT NULL,
    status text DEFAULT 'pending' NOT NULL, -- 'pending', 'approved', 'rejected'
    mpesa_message text, -- For deposits/withdrawals
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    approved_by uuid REFERENCES public.profiles (id), -- Admin who approved
    package_id uuid REFERENCES public.investment_packages (id), -- For investment type
    referred_user_id uuid REFERENCES public.profiles (id), -- For referral bonus type
    referral_level integer -- For referral bonus type (1, 2, or 3)
);

-- Enable RLS for 'transactions'
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- Policy for users to view their own transactions
CREATE POLICY "Users can view their own transactions." ON public.transactions
FOR SELECT USING (auth.uid() = user_id);

-- Policy for admins to view all transactions
CREATE POLICY "Admins can view all transactions." ON public.transactions
FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = TRUE));

-- Policy for users to insert deposit/withdrawal requests
CREATE POLICY "Users can insert deposit/withdrawal requests." ON public.transactions
FOR INSERT WITH CHECK (auth.uid() = user_id AND (type = 'deposit' OR type = 'withdrawal'));

-- Policy for admins to update transaction status
CREATE POLICY "Admins can update transaction status." ON public.transactions
FOR UPDATE TO authenticated USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = TRUE));

-- Create the 'daily_commissions' table
CREATE TABLE public.daily_commissions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES public.profiles (id) ON DELETE CASCADE NOT NULL,
    package_id uuid REFERENCES public.investment_packages (id) ON DELETE CASCADE NOT NULL,
    amount numeric NOT NULL,
    commission_date date NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    UNIQUE (user_id, commission_date) -- Ensure only one daily commission per user per day
);

-- Enable RLS for 'daily_commissions'
ALTER TABLE public.daily_commissions ENABLE ROW LEVEL SECURITY;

-- Policy for users to view their own daily commissions
CREATE POLICY "Users can view their own daily commissions." ON public.daily_commissions
FOR SELECT USING (auth.uid() = user_id);

-- Policy for admins to view all daily commissions
CREATE POLICY "Admins can view all daily commissions." ON public.daily_commissions
FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = TRUE));

-- Create a function to create a profile for new users
CREATE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, phone_number, referral_code)
  VALUES (NEW.id, (NEW.raw_user_meta_data->>'phone_number'), gen_random_uuid());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a trigger to call the function when a new user is created in auth.users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Set up a default admin user (replace with your actual admin email/password)
-- You would typically do this manually in Supabase or via an admin script
-- For demonstration, we'll assume an admin user is created and their profile is set to is_admin = TRUE
-- INSERT INTO auth.users (email, password, raw_user_meta_data) VALUES ('admin@example.com', 'your_strong_admin_password', '{"phone": "0782192086"}');
-- UPDATE public.profiles SET is_admin = TRUE WHERE id = (SELECT id FROM auth.users WHERE email = 'admin@example.com');
