"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
  Coins,
  Gift,
} from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const [user, setUser] = useState({
    phone: "****5268",
    balance: 0,
    identity: "J2",
    hasUpgraded: true,
  })

  // Load balance from localStorage on component mount
  useEffect(() => {
    const savedBalance = localStorage.getItem("userBalance")
    if (savedBalance) {
      setUser((prev) => ({ ...prev, balance: Number.parseFloat(savedBalance) }))
    }
  }, [])

  const menuItems = [
    { icon: ArrowDownLeft, label: "Withdraw", href: "/withdraw", color: "text-blue-600" },
    { icon: ArrowUpRight, label: "Recharge", href: "/recharge", color: "text-blue-600" },
    { icon: Users, label: "Invitation rewards", href: "/invite-friends", color: "text-blue-600" },
    { icon: Star, label: "VIP", href: "/vip", color: "text-blue-600" },
    { icon: Coins, label: "Fund", href: "/accounting-records", color: "text-blue-600" },
    { icon: Gift, label: "Turntable of Luck", href: "/turntable", color: "text-blue-600" },
    { icon: Building, label: "Company Profile", href: "/company-profile", color: "text-blue-600" },
    { icon: Download, label: "Unduh App", href: "/download", color: "text-blue-600" },
  ]

  const membershipList = [
    { phone: "****3922", amount: "675KES", time: "Income this week" },
    { phone: "****3965", amount: "648KES", time: "Income this week" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-800 text-white p-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm">Choose language</span>
          <h1 className="text-xl font-bold">FCB</h1>
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
        </div>
      </div>

      <div className="p-4 space-y-6">
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

        {/* Membership List */}
        <div>
          <h3 className="text-lg font-bold mb-3 text-gray-800">Membership list</h3>
          <div className="space-y-3">
            {membershipList.map((member, index) => (
              <Card key={index}>
                <CardContent className="flex items-center justify-between p-3">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={`/placeholder-user-${index + 1}.jpg`} />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-sm">Congratulations {member.phone}</div>
                      <div className="text-xs text-gray-500">{member.time}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-red-500 text-sm">{member.amount}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
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
            <span className="text-xs mt-1">My</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
