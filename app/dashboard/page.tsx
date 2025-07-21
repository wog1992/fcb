"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Home,
  FileText,
  Trophy,
  TrendingUp,
  User,
  ArrowUpRight,
  ArrowDownLeft,
  Users,
  Star,
  Building,
  Download,
  Gift,
  DollarSign,
  Target,
  Zap,
} from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const [user, setUser] = useState({
    phone: "****5268",
    balance: 0,
    taskEarnings: 0,
    referralEarnings: 0,
    identity: "J2",
    hasUpgraded: true,
    selectedPackage: "",
  })

  // Load balance from localStorage on component mount
  useEffect(() => {
    const savedBalance = localStorage.getItem("userBalance")
    const savedTaskEarnings = localStorage.getItem("taskEarnings")
    const savedReferralEarnings = localStorage.getItem("referralEarnings")
    const savedPhone = localStorage.getItem("userPhone")
    const savedPackage = localStorage.getItem("selectedPackage")

    // Initialize with zero balance for new users
    if (savedBalance) {
      setUser((prev) => ({ ...prev, balance: Number.parseFloat(savedBalance) }))
    } else {
      localStorage.setItem("userBalance", "0")
    }

    if (savedTaskEarnings) {
      setUser((prev) => ({ ...prev, taskEarnings: Number.parseFloat(savedTaskEarnings) }))
    } else {
      localStorage.setItem("taskEarnings", "0")
    }

    if (savedReferralEarnings) {
      setUser((prev) => ({ ...prev, referralEarnings: Number.parseFloat(savedReferralEarnings) }))
    } else {
      localStorage.setItem("referralEarnings", "0")
    }

    if (savedPhone) {
      // Mask the phone number for display
      const maskedPhone = `****${savedPhone.slice(-4)}`
      setUser((prev) => ({ ...prev, phone: maskedPhone }))
    }

    if (savedPackage) {
      setUser((prev) => ({ ...prev, selectedPackage: savedPackage }))
    }
  }, [])

  const menuItems = [
    { icon: ArrowDownLeft, label: "Withdraw", href: "/withdraw", color: "text-blue-600" },
    { icon: ArrowUpRight, label: "Recharge", href: "/recharge", color: "text-blue-600" },
    { icon: Users, label: "Invitation rewards", href: "/invite-friends", color: "text-blue-600" },
    { icon: Star, label: "VIP", href: "/vip", color: "text-blue-600" },
    { icon: Gift, label: "Turntable of Luck", href: "/turntable", color: "text-blue-600" },
    { icon: Building, label: "Company Profile", href: "/company-profile", color: "text-blue-600" },
    { icon: Download, label: "Unduh App", href: "/download", color: "text-blue-600" },
  ]

  // Calculate total earnings breakdown
  const totalEarnings = user.taskEarnings + user.referralEarnings
  const hasEarnings = totalEarnings > 0

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-800 text-white p-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm">Choose language</span>
          <div className="flex items-center space-x-2">
            <img src="/fcb-logo.jpg" alt="FCB Logo" className="h-8 w-8 rounded" />
            <h1 className="text-xl font-bold">FCB</h1>
          </div>
          <div></div>
        </div>

        {user.hasUpgraded && (
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 mb-4">
            <div className="flex items-center">
              <span className="text-green-300 mr-2">🎉</span>
              <span className="text-sm">
                Congratulations to {user.phone} for successfully upgrading to {user.identity}!
              </span>
            </div>
          </div>
        )}

        <div className="text-center">
          <div className="text-3xl font-bold mb-1">KES {user.balance.toFixed(2)}</div>
          <div className="text-sm opacity-90">Available Balance</div>

          {/* Earnings Breakdown */}
          {hasEarnings && (
            <div className="flex justify-center space-x-4 mt-2 text-xs opacity-75">
              <span>Tasks: KES {user.taskEarnings.toFixed(2)}</span>
              <span>•</span>
              <span>Referrals: KES {user.referralEarnings.toFixed(2)}</span>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-3 text-center">
              <div className="bg-green-50 p-2 rounded-lg w-fit mx-auto mb-2">
                <DollarSign className="h-4 w-4 text-green-600" />
              </div>
              <div className="text-sm font-bold">KES {user.balance.toFixed(2)}</div>
              <div className="text-xs text-gray-600">Balance</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-3 text-center">
              <div className="bg-blue-50 p-2 rounded-lg w-fit mx-auto mb-2">
                <Target className="h-4 w-4 text-blue-600" />
              </div>
              <div className="text-sm font-bold">KES {user.taskEarnings.toFixed(2)}</div>
              <div className="text-xs text-gray-600">Tasks</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="p-3 text-center">
              <div className="bg-purple-50 p-2 rounded-lg w-fit mx-auto mb-2">
                <Users className="h-4 w-4 text-purple-600" />
              </div>
              <div className="text-sm font-bold">KES {user.referralEarnings.toFixed(2)}</div>
              <div className="text-xs text-gray-600">Referrals</div>
            </CardContent>
          </Card>
        </div>

        {/* Package Status */}
        {user.selectedPackage && (
          <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-orange-800">Active Package: {user.selectedPackage}</div>
                  <div className="text-sm text-orange-600">Start completing tasks to earn money</div>
                </div>
                <Badge className="bg-yellow-100 text-yellow-800">
                  <Zap className="h-3 w-3 mr-1" />
                  Active
                </Badge>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Zero Balance Alert */}
        {user.balance === 0 && (
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardContent className="p-4 text-center">
              <Zap className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="font-bold text-blue-800 mb-1">Get Started!</div>
              <div className="text-sm text-blue-600 mb-3">
                Invest in a VIP package to unlock tasks and start earning money
              </div>
              <Link href="/vip">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Trophy className="h-4 w-4 mr-2" />
                  Choose VIP Package
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {/* Menu Grid */}
        <div className="grid grid-cols-2 gap-4">
          {menuItems.map((item, index) => (
            <Link key={index} href={item.href}>
              <Card className="hover:bg-gray-50 transition-colors">
                <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                  <item.icon className={`h-8 w-8 ${item.color} mb-3`} />
                  <span className="text-sm font-medium text-gray-700">{item.label}</span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Invitation Banner */}
        <Card className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white overflow-hidden">
          <CardContent className="p-6">
            <div className="mb-3">
              <h3 className="text-lg font-bold">FCB</h3>
              <p className="text-sm opacity-90">INVITE YOUR FRIENDS TO JOIN US</p>
            </div>
            <Link href="/invite-friends">
              <Button className="bg-yellow-600 hover:bg-yellow-700 text-white">GET MORE BENEFITS</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex justify-around py-2">
          <Link href="/dashboard" className="flex flex-col items-center p-2 text-blue-600">
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
          <Link href="/profile" className="flex flex-col items-center p-2 text-gray-600">
            <User className="h-5 w-5" />
            <span className="text-xs mt-1">Profile</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
