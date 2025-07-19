"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  ArrowLeft,
  Edit,
  Save,
  Home,
  FileText,
  Trophy,
  TrendingUp,
  User,
  ArrowUpRight,
  ArrowDownLeft,
  LogOut,
  RotateCcw,
  Users,
  Gift,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function ProfilePage() {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [userBalance, setUserBalance] = useState(0)
  const [referralEarnings, setReferralEarnings] = useState(0)
  const [userInfo, setUserInfo] = useState({
    name: "John Doe",
    phone: "794912***",
    email: "john@example.com",
    identity: "Intern",
    joinDate: "2025-01-15",
    referralCode: "FCB123456",
    totalEarnings: "KES 0",
    activePackage: "None",
  })

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedBalance = localStorage.getItem("userBalance")
    const savedReferralEarnings = localStorage.getItem("referralEarnings")
    const savedPhone = localStorage.getItem("userPhone")
    const savedReferralCode = localStorage.getItem("userReferralCode")

    if (savedBalance) {
      setUserBalance(Number.parseFloat(savedBalance))
      setUserInfo((prev) => ({ ...prev, totalEarnings: `KES ${Number.parseFloat(savedBalance).toFixed(2)}` }))
    }
    if (savedReferralEarnings) {
      setReferralEarnings(Number.parseFloat(savedReferralEarnings))
    }
    if (savedPhone) {
      setUserInfo((prev) => ({ ...prev, phone: savedPhone }))
    }
    if (savedReferralCode) {
      setUserInfo((prev) => ({ ...prev, referralCode: savedReferralCode }))
    }
  }, [])

  const handleLogout = () => {
    // Clear all user data
    localStorage.removeItem("userBalance")
    localStorage.removeItem("completedTasks")
    localStorage.removeItem("referralEarnings")
    localStorage.removeItem("userPhone")
    localStorage.removeItem("userReferralCode")
    localStorage.removeItem("isLoggedIn")

    // Redirect to login page
    router.push("/")
  }

  const handleAccountReset = () => {
    // Reset only balance and tasks, keep user info
    localStorage.setItem("userBalance", "0")
    localStorage.setItem("completedTasks", "[]")
    localStorage.setItem("referralEarnings", "0")

    // Update state
    setUserBalance(0)
    setReferralEarnings(0)
    setUserInfo((prev) => ({ ...prev, totalEarnings: "KES 0.00" }))

    alert("Account reset successfully! Your balance and tasks have been cleared.")
  }

  const generateReferralBonus = () => {
    // Simulate referral bonus (10% of user's current balance or minimum 50 KES)
    const bonus = Math.max(userBalance * 0.1, 50)
    const newReferralEarnings = referralEarnings + bonus
    const newBalance = userBalance + bonus

    setReferralEarnings(newReferralEarnings)
    setUserBalance(newBalance)

    // Save to localStorage
    localStorage.setItem("referralEarnings", newReferralEarnings.toString())
    localStorage.setItem("userBalance", newBalance.toString())

    alert(`Referral bonus earned! You received KES ${bonus.toFixed(2)}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold">Personal Information</h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Profile Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback className="text-lg">{userInfo.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-bold">{userInfo.name}</h2>
                <Badge className="mt-1">{userInfo.identity}</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={userInfo.name}
                  onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" value={userInfo.phone} disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={userInfo.email}
                  onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="referral">Referral Code</Label>
                <Input id="referral" value={userInfo.referralCode} disabled />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Account Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-sm text-gray-600">Total Earnings</div>
                <div className="text-lg font-bold text-green-600">KES {userBalance.toFixed(2)}</div>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-sm text-gray-600">Active Package</div>
                <div className="text-lg font-bold text-blue-600">{userInfo.activePackage}</div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <div className="text-sm text-gray-600">Join Date</div>
                <div className="text-lg font-bold text-purple-600">{userInfo.joinDate}</div>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <div className="text-sm text-gray-600">Referral Earnings</div>
                <div className="text-lg font-bold text-orange-600">KES {referralEarnings.toFixed(2)}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Referral Section */}
        <Card className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold mb-2">Earn Referral Bonus</h3>
                <p className="text-sm opacity-90">Invite friends and earn commission!</p>
              </div>
              <Users className="h-8 w-8" />
            </div>
            <Button onClick={generateReferralBonus} className="mt-4 bg-white text-orange-600 hover:bg-gray-100">
              <Gift className="h-4 w-4 mr-2" />
              Claim Referral Bonus
            </Button>
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Account Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Account Reset */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset Account
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Reset Account</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will reset your balance to zero and clear all completed tasks. Your profile information will
                    remain unchanged. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleAccountReset} className="bg-orange-600 hover:bg-orange-700">
                    Reset Account
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            {/* Logout */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Logout</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to logout? You will need to login again to access your account.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleLogout} className="bg-red-600 hover:bg-red-700">
                    Logout
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex justify-around py-2">
          <Link href="/dashboard" className="flex flex-col items-center p-2 text-gray-600">
            <Home className="h-5 w-5" />
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link href="/tasks" className="flex flex-col items-center p-2 text-gray-600">
            <FileText className="h-5 w-5" />
            <span className="text-xs mt-1">Task</span>
          </Link>
          <Link href="/vip" className="flex flex-col items-center p-2 text-gray-600">
            <Trophy className="h-5 w-5" />
            <span className="text-xs mt-1">VIP</span>
          </Link>
          <Link href="/profits" className="flex flex-col items-center p-2 text-gray-600">
            <TrendingUp className="h-5 w-5" />
            <span className="text-xs mt-1">Profits</span>
          </Link>
          <Link href="/withdraw" className="flex flex-col items-center p-2 text-gray-600">
            <ArrowDownLeft className="h-4 w-4" />
            <span className="text-xs mt-1">Withdraw</span>
          </Link>
          <Link href="/recharge" className="flex flex-col items-center p-2 text-gray-600">
            <ArrowUpRight className="h-4 w-4" />
            <span className="text-xs mt-1">Deposit</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center p-2 text-blue-600">
            <User className="h-5 w-5" />
            <span className="text-xs mt-1">My</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
