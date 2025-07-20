"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
  Users,
  Gift,
  Lock,
  Unlock,
  AlertTriangle,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function ProfilePage() {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [userBalance, setUserBalance] = useState(0)
  const [referralEarnings, setReferralEarnings] = useState(0)
  const [taskEarnings, setTaskEarnings] = useState(0)
  const [hasClaimedReferralBonus, setHasClaimedReferralBonus] = useState(false)
  const [referralCodeInput, setReferralCodeInput] = useState("")
  const [showReferralDialog, setShowReferralDialog] = useState(false)
  const [referralStatus, setReferralStatus] = useState({
    hasInvited: false,
    invitedUsers: [],
    canClaim: false,
  })
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
    const savedTaskEarnings = localStorage.getItem("taskEarnings")
    const savedPhone = localStorage.getItem("userPhone")
    const savedReferralCode = localStorage.getItem("userReferralCode")
    const savedHasClaimedBonus = localStorage.getItem("hasClaimedReferralBonus")
    const savedReferralStatus = localStorage.getItem("referralStatus")

    if (savedBalance) {
      setUserBalance(Number.parseFloat(savedBalance))
      setUserInfo((prev) => ({ ...prev, totalEarnings: `KES ${Number.parseFloat(savedBalance).toFixed(2)}` }))
    }
    if (savedReferralEarnings) {
      setReferralEarnings(Number.parseFloat(savedReferralEarnings))
    }
    if (savedTaskEarnings) {
      setTaskEarnings(Number.parseFloat(savedTaskEarnings))
    }
    if (savedPhone) {
      setUserInfo((prev) => ({ ...prev, phone: savedPhone }))
    }
    if (savedReferralCode) {
      setUserInfo((prev) => ({ ...prev, referralCode: savedReferralCode }))
    }
    if (savedHasClaimedBonus) {
      setHasClaimedReferralBonus(JSON.parse(savedHasClaimedBonus))
    }
    if (savedReferralStatus) {
      setReferralStatus(JSON.parse(savedReferralStatus))
    }

    // Check if user has invited someone and can claim bonus
    checkReferralEligibility()
  }, [])

  const checkReferralEligibility = () => {
    // Simulate checking if user has invited someone
    const invitedUsers = JSON.parse(localStorage.getItem("invitedUsers") || "[]")
    const userReferralCode = localStorage.getItem("userReferralCode") || userInfo.referralCode

    // Check if anyone has used this user's referral code
    const hasValidInvites = invitedUsers.some((invite) => invite.referrerCode === userReferralCode)

    setReferralStatus({
      hasInvited: hasValidInvites,
      invitedUsers: invitedUsers.filter((invite) => invite.referrerCode === userReferralCode),
      canClaim: hasValidInvites && !hasClaimedReferralBonus,
    })
  }

  const handleLogout = () => {
    // Clear all user data
    localStorage.removeItem("userBalance")
    localStorage.removeItem("completedTasks")
    localStorage.removeItem("referralEarnings")
    localStorage.removeItem("taskEarnings")
    localStorage.removeItem("userPhone")
    localStorage.removeItem("userReferralCode")
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("hasClaimedReferralBonus")
    localStorage.removeItem("referralStatus")
    localStorage.removeItem("selectedPackage")

    // Redirect to login page
    router.push("/")
  }

  const validateReferralCode = () => {
    const userReferralCode = localStorage.getItem("userReferralCode") || userInfo.referralCode

    if (referralCodeInput === userReferralCode && referralStatus.hasInvited && !hasClaimedReferralBonus) {
      return true
    }
    return false
  }

  const claimReferralBonus = () => {
    if (!validateReferralCode()) {
      alert("Invalid referral code or you're not eligible for the bonus!")
      return
    }

    // Calculate bonus based on number of successful referrals
    const bonusPerReferral = 150 // KES 150 per successful referral
    const totalBonus = referralStatus.invitedUsers.length * bonusPerReferral

    const newReferralEarnings = referralEarnings + totalBonus
    const newBalance = userBalance + totalBonus

    setReferralEarnings(newReferralEarnings)
    setUserBalance(newBalance)
    setHasClaimedReferralBonus(true)

    // Save to localStorage
    localStorage.setItem("referralEarnings", newReferralEarnings.toString())
    localStorage.setItem("userBalance", newBalance.toString())
    localStorage.setItem("hasClaimedReferralBonus", "true")

    // Update referral status
    const updatedStatus = { ...referralStatus, canClaim: false }
    setReferralStatus(updatedStatus)
    localStorage.setItem("referralStatus", JSON.stringify(updatedStatus))

    setShowReferralDialog(false)
    setReferralCodeInput("")

    alert(
      `Congratulations! You earned KES ${totalBonus.toFixed(2)} from ${referralStatus.invitedUsers.length} successful referral(s)!`,
    )
  }

  const getReferralBonusStatus = () => {
    if (hasClaimedReferralBonus) {
      return {
        text: "Bonus Already Claimed",
        color: "text-gray-500",
        bgColor: "bg-gray-100",
        icon: Lock,
        disabled: true,
      }
    } else if (!referralStatus.hasInvited) {
      return {
        text: "No Referrals Yet",
        color: "text-orange-600",
        bgColor: "bg-orange-50",
        icon: Lock,
        disabled: true,
      }
    } else if (referralStatus.canClaim) {
      return {
        text: "Claim Referral Bonus",
        color: "text-green-600",
        bgColor: "bg-green-50",
        icon: Unlock,
        disabled: false,
      }
    } else {
      return {
        text: "Bonus Locked",
        color: "text-red-600",
        bgColor: "bg-red-50",
        icon: Lock,
        disabled: true,
      }
    }
  }

  const bonusStatus = getReferralBonusStatus()

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-lg font-bold">Personal Information</h1>
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

      <div className="p-3 space-y-3 overflow-y-auto">
        {/* Profile Card */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback className="text-sm">{userInfo.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-lg font-bold">{userInfo.name}</h2>
                <Badge className="mt-1 text-xs">{userInfo.identity}</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 pt-0">
            <div className="grid grid-cols-1 gap-3">
              <div className="space-y-1">
                <Label htmlFor="name" className="text-xs">
                  Full Name
                </Label>
                <Input
                  id="name"
                  value={userInfo.name}
                  onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                  disabled={!isEditing}
                  className="text-sm"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="phone" className="text-xs">
                  Phone Number
                </Label>
                <Input id="phone" value={userInfo.phone} disabled className="text-sm" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email" className="text-xs">
                  Email
                </Label>
                <Input
                  id="email"
                  value={userInfo.email}
                  onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                  disabled={!isEditing}
                  className="text-sm"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="referral" className="text-xs">
                  Referral Code
                </Label>
                <Input id="referral" value={userInfo.referralCode} disabled className="text-sm font-mono" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Summary */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Account Summary</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-2 gap-2">
              <div className="text-center p-2 bg-green-50 rounded-lg">
                <div className="text-xs text-gray-600">Total Balance</div>
                <div className="text-sm font-bold text-green-600">KES {userBalance.toFixed(2)}</div>
              </div>
              <div className="text-center p-2 bg-blue-50 rounded-lg">
                <div className="text-xs text-gray-600">Task Earnings</div>
                <div className="text-sm font-bold text-blue-600">KES {taskEarnings.toFixed(2)}</div>
              </div>
              <div className="text-center p-2 bg-purple-50 rounded-lg">
                <div className="text-xs text-gray-600">Referral Earnings</div>
                <div className="text-sm font-bold text-purple-600">KES {referralEarnings.toFixed(2)}</div>
              </div>
              <div className="text-center p-2 bg-orange-50 rounded-lg">
                <div className="text-xs text-gray-600">Active Package</div>
                <div className="text-sm font-bold text-orange-600">{userInfo.activePackage}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Referral Status */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-base">
              <Users className="h-4 w-4 mr-2" />
              Referral Status
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Total Referrals:</span>
                <span className="font-bold text-sm">{referralStatus.invitedUsers.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Bonus Status:</span>
                <Badge className={`${bonusStatus.bgColor} ${bonusStatus.color} text-xs`}>
                  <bonusStatus.icon className="h-3 w-3 mr-1" />
                  {hasClaimedReferralBonus ? "Claimed" : referralStatus.canClaim ? "Available" : "Locked"}
                </Badge>
              </div>

              {referralStatus.invitedUsers.length > 0 && (
                <div className="mt-2">
                  <div className="text-xs font-medium text-gray-700 mb-1">Your Referrals:</div>
                  <div className="space-y-1">
                    {referralStatus.invitedUsers.map((user, index) => (
                      <div key={index} className="text-xs bg-gray-50 p-2 rounded">
                        Phone: {user.phone} • Joined: {user.joinDate}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Referral Bonus Section */}
        <Card className={`${bonusStatus.bgColor} border-2`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className={`text-base font-bold ${bonusStatus.color}`}>Referral Bonus</h3>
                <p className="text-xs opacity-75">
                  {hasClaimedReferralBonus
                    ? "You have already claimed your referral bonus"
                    : referralStatus.hasInvited
                      ? `Earn KES ${referralStatus.invitedUsers.length * 150} from your referrals`
                      : "Invite friends to unlock referral bonus"}
                </p>
              </div>
              <bonusStatus.icon className={`h-6 w-6 ${bonusStatus.color}`} />
            </div>

            {!hasClaimedReferralBonus && referralStatus.hasInvited && (
              <Alert className="mb-3 border-green-200 bg-green-50">
                <AlertTriangle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800 text-xs">
                  You have {referralStatus.invitedUsers.length} successful referral(s). Enter your referral code to
                  claim KES {referralStatus.invitedUsers.length * 150} bonus!
                </AlertDescription>
              </Alert>
            )}

            <Dialog open={showReferralDialog} onOpenChange={setShowReferralDialog}>
              <DialogTrigger asChild>
                <Button
                  className={`w-full ${bonusStatus.color} ${bonusStatus.bgColor} border-2 text-sm`}
                  disabled={bonusStatus.disabled}
                  variant="outline"
                  size="sm"
                >
                  <bonusStatus.icon className="h-4 w-4 mr-2" />
                  {bonusStatus.text}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="flex items-center">
                    <Gift className="h-5 w-5 mr-2 text-green-600" />
                    Claim Referral Bonus
                  </DialogTitle>
                  <DialogDescription>
                    Enter your referral code to claim your bonus of KES {referralStatus.invitedUsers.length * 150}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="referralCode">Your Referral Code</Label>
                    <Input
                      id="referralCode"
                      value={referralCodeInput}
                      onChange={(e) => setReferralCodeInput(e.target.value)}
                      placeholder="Enter your referral code"
                      className="font-mono"
                    />
                  </div>
                  <Alert className="border-blue-200 bg-blue-50">
                    <AlertTriangle className="h-4 w-4 text-blue-600" />
                    <AlertDescription className="text-blue-800">
                      This bonus can only be claimed once. Make sure you enter the correct referral code.
                    </AlertDescription>
                  </Alert>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowReferralDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={claimReferralBonus} className="bg-green-600 hover:bg-green-700">
                    Claim Bonus
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        {/* Logout Section */}
        <Card>
          <CardContent className="p-4">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50 bg-transparent text-sm h-10"
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
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-20">
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
            <span className="text-xs mt-1">Profile</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
