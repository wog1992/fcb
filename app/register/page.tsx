"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, User, Phone, Mail, Lock, Gift, CheckCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"

export default function RegisterPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [referralCode, setReferralCode] = useState("")
  const [hasReferralCode, setHasReferralCode] = useState(false)

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    referralCode: "",
    agreeToTerms: false,
  })

  const [errors, setErrors] = useState({})

  // Check for referral code in URL
  useEffect(() => {
    const refCode = searchParams.get("ref")
    if (refCode) {
      setReferralCode(refCode)
      setHasReferralCode(true)
      setFormData((prev) => ({ ...prev, referralCode: refCode }))
    }
  }, [searchParams])

  const validateForm = () => {
    const newErrors = {}

    // Full name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters"
    }

    // Phone validation (Kenyan format)
    const phoneRegex = /^(\+254|254|0)[17]\d{8}$/
    if (!formData.phone) {
      newErrors.phone = "Phone number is required"
    } else if (!phoneRegex.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Please enter a valid Kenyan phone number"
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    // Terms agreement validation
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const formatPhoneNumber = (phone) => {
    // Convert to standard format
    let formatted = phone.replace(/\s/g, "")
    if (formatted.startsWith("0")) {
      formatted = "254" + formatted.substring(1)
    } else if (formatted.startsWith("+254")) {
      formatted = formatted.substring(1)
    }
    return formatted
  }

  const handleRegister = async () => {
    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      // Simulate registration process
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const formattedPhone = formatPhoneNumber(formData.phone)

      // Generate unique referral code for new user
      const newUserReferralCode = `FCB${Math.random().toString(36).substring(2, 8).toUpperCase()}`

      // Save user data
      const userData = {
        fullName: formData.fullName,
        phone: formattedPhone,
        email: formData.email,
        referralCode: newUserReferralCode,
        joinDate: new Date().toLocaleDateString(),
        isLoggedIn: true,
      }
import { supabase } from "@/lib/supabase"; // make sure this is properly configured

const handleRegister = async () => {
  setIsLoading(true);
  setErrors({});

  // Check if phone number already exists
  const { data: existingUsers, error: checkError } = await supabase
    .from("users")
    .select("id")
    .eq("phone", formData.phone);

  if (checkError) {
    console.error("Phone check failed:", checkError.message);
    setIsLoading(false);
    return;
  }

  if (existingUsers && existingUsers.length > 0) {
    setErrors({ phone: "Phone number already registered" });
    setIsLoading(false);
    return;
  }

  // Proceed with your existing user creation logic
  const { error } = await supabase.from("users").insert([
    {
      full_name: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      password: formData.password,
      referral_code: formData.referralCode,
    },
  ]);

  if (error) {
    console.error("Error creating user:", error.message);
    setErrors({ submit: "Failed to register user" });
  } else {
    router.push("/dashboard"); // Or wherever you redirect after signup
  }

  setIsLoading(false);
};

      // Save to localStorage
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("userPhone", formattedPhone)
      localStorage.setItem("userReferralCode", newUserReferralCode)
      localStorage.setItem("userBalance", "0")
      localStorage.setItem("completedTasks", "[]")
      localStorage.setItem("referralEarnings", "0")
      localStorage.setItem("taskEarnings", "0")

      // Handle referral if provided
      if (formData.referralCode && formData.referralCode.trim()) {
        const invitedUsers = JSON.parse(localStorage.getItem("invitedUsers") || "[]")
        const newInvite = {
          phone: formattedPhone,
          referrerCode: formData.referralCode.trim(),
          joinDate: new Date().toLocaleDateString(),
          joinTime: new Date().toLocaleTimeString(),
        }
        invitedUsers.push(newInvite)
        localStorage.setItem("invitedUsers", JSON.stringify(invitedUsers))
      }

      alert("Registration successful! Welcome to FCB VIP Intern2Days!")
      router.push("/dashboard")
    } catch (error) {
      alert("Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-6">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Login
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
          <p className="text-gray-600">Join FCB VIP Intern2Days and start earning</p>
        </div>

        {/* Referral Alert */}
        {hasReferralCode && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <Gift className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              🎉 You're registering with referral code: <strong>{referralCode}</strong>
            </AlertDescription>
          </Alert>
        )}

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-center">Registration Form</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  className={`pl-10 ${errors.fullName ? "border-red-500" : ""}`}
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                />
              </div>
              {errors.fullName && <p className="text-sm text-red-600">{errors.fullName}</p>}
            </div>
           
            {/* Phone Number */}
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="0712345678 or +254712345678"
                  className={`pl-10 ${errors.phone ? "border-red-500" : ""}`}
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                />
              </div>
              {errors.phone && <p className="text-sm text-red-600">{errors.phone}</p>}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </div>
              {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password *</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  className={`pl-10 pr-10 ${errors.password ? "border-red-500" : ""}`}
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password *</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  className={`pl-10 pr-10 ${errors.confirmPassword ? "border-red-500" : ""}`}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword}</p>}
            </div>

            {/* Referral Code */}
            <div className="space-y-2">
              <Label htmlFor="referralCode">Referral Code (Optional)</Label>
              <div className="relative">
                <Gift className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="referralCode"
                  type="text"
                  placeholder="Enter referral code if you have one"
                  className="pl-10 font-mono"
                  value={formData.referralCode}
                  onChange={(e) => handleInputChange("referralCode", e.target.value.toUpperCase())}
                />
              </div>
              {formData.referralCode && (
                <p className="text-sm text-green-600 flex items-center">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Referral code applied
                </p>
              )}
            </div>

            {/* Terms and Conditions */}
            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked)}
                  className={errors.agreeToTerms ? "border-red-500" : ""}
                />
                <Label htmlFor="terms" className="text-sm leading-5">
                  I agree to the{" "}
                  <Link href="/terms" className="text-blue-600 hover:underline">
                    Terms and Conditions
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-blue-600 hover:underline">
                    Privacy Policy
                  </Link>
                </Label>
              </div>
              {errors.agreeToTerms && <p className="text-sm text-red-600">{errors.agreeToTerms}</p>}
            </div>

            {/* Register Button */}
            <Button
              onClick={handleRegister}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>

            {/* Login Link */}
            <div className="text-center pt-4">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link href="/" className="text-blue-600 hover:underline font-medium">
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Benefits */}
        <Card className="mt-6 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardContent className="p-4">
            <h3 className="font-semibold text-green-800 mb-2">Why Join FCB VIP Intern2Days?</h3>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Earn KES 70 for each completed task</li>
              <li>• Get paid daily for your work</li>
              <li>• Work from anywhere using your phone</li>
              <li>• Refer friends and earn KES 150 per referral</li>
              <li>• No experience required - start earning today!</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
