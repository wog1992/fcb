"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Home, FileText, Trophy, TrendingUp, User, Crown, Star, Gift } from "lucide-react"
import Link from "next/link"

export default function VIPPage() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)

  const packages = [
    {
      id: "intern",
      name: "Intern",
      deposit: "Free",
      dailyEarning: "KES60.00/Per 2 days",
      totalDeposit: "Free Registration",
      color: "bg-gray-500",
      features: ["Basic tasks", "2-day earning cycle", "Limited rewards"],
    },
    {
      id: "j1",
      name: "J1",
      deposit: "KES2100",
      dailyEarning: "KES70.00/Per task",
      totalDeposit: "deposit KES2100",
      color: "bg-blue-500",
      features: ["Daily tasks", "Higher rewards", "Priority support"],
    },
    {
      id: "j2",
      name: "J2",
      deposit: "KES5400",
      dailyEarning: "KES180.00/Per day",
      totalDeposit: "deposit KES5400",
      color: "bg-green-500",
      features: ["Premium tasks", "Daily earnings", "VIP support"],
    },
    {
      id: "j3",
      name: "J3",
      deposit: "KES10500",
      dailyEarning: "KES350.00/Per day",
      totalDeposit: "deposit KES10500",
      color: "bg-yellow-500",
      features: ["Elite tasks", "High daily earnings", "Exclusive rewards"],
    },
    {
      id: "j4",
      name: "J4",
      deposit: "KES18000",
      dailyEarning: "KES600.00/Per day",
      totalDeposit: "deposit KES18000",
      color: "bg-orange-500",
      features: ["Premium elite tasks", "Maximum earnings", "Personal manager"],
    },
    {
      id: "j5",
      name: "J5",
      deposit: "KES39000",
      dailyEarning: "KES1300.00/Per day",
      totalDeposit: "deposit KES39000",
      color: "bg-red-500",
      features: ["Luxury tasks", "Top tier earnings", "VIP treatment"],
    },
    {
      id: "j6",
      name: "J6",
      deposit: "KES96000",
      dailyEarning: "KES3200.00/Per day",
      totalDeposit: "deposit KES96000",
      color: "bg-purple-500",
      features: ["Ultimate tasks", "Maximum profits", "Elite status"],
    },
  ]

  const profitData = [
    { level: "J1", daily: "KES280", monthly: "KES8,400", yearly: "KES102,200" },
    { level: "J2", daily: "KES180", monthly: "KES5,400", yearly: "KES65,700" },
    { level: "J3", daily: "KES350", monthly: "KES10,500", yearly: "KES127,750" },
    { level: "J4", daily: "KES600", monthly: "KES18,000", yearly: "KES219,000" },
    { level: "J5", daily: "KES1,300", monthly: "KES39,000", yearly: "KES474,500" },
    { level: "J6", daily: "KES3,200", monthly: "KES96,000", yearly: "KES1,168,000" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold">VIP Packages</h1>
          </div>
          <Crown className="h-6 w-6" />
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* VIP Intro */}
        <Card className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
          <CardContent className="p-6 text-center">
            <Star className="h-12 w-12 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Become a VIP Member</h2>
            <p className="text-sm opacity-90">
              Unlock premium tasks and maximize your earning potential with our VIP packages
            </p>
          </CardContent>
        </Card>

        {/* Package Selection */}
        <div>
          <h3 className="text-lg font-bold mb-4">Select Investment Package</h3>
          <div className="grid grid-cols-1 gap-4">
            {packages.map((pkg) => (
              <Card
                key={pkg.id}
                className={`cursor-pointer transition-all ${
                  selectedPackage === pkg.id ? "ring-2 ring-blue-500 shadow-lg" : ""
                }`}
                onClick={() => setSelectedPackage(pkg.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Badge className={`${pkg.color} text-white`}>{pkg.name}</Badge>
                      <div>
                        <div className="font-bold">{pkg.deposit}</div>
                        <div className="text-sm text-gray-600">{pkg.dailyEarning}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Total</div>
                      <div className="font-bold text-blue-600">{pkg.totalDeposit}</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {pkg.features.map((feature, index) => (
                      <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                        {feature}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Profit Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Gift className="h-5 w-5 mr-2" />
              Profit Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Level</th>
                    <th className="text-left p-2">Daily</th>
                    <th className="text-left p-2">Monthly</th>
                    <th className="text-left p-2">Yearly</th>
                  </tr>
                </thead>
                <tbody>
                  {profitData.map((row, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-2 font-medium">{row.level}</td>
                      <td className="p-2 text-green-600">{row.daily}</td>
                      <td className="p-2 text-blue-600">{row.monthly}</td>
                      <td className="p-2 text-purple-600">{row.yearly}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Investment Button */}
        {selectedPackage && (
          <Card className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-bold mb-2">Ready to Invest?</h3>
              <p className="text-sm opacity-90 mb-4">
                Selected: {packages.find((p) => p.id === selectedPackage)?.name} Package
              </p>
              <Link href="/recharge">
                <Button className="bg-white text-blue-600 hover:bg-gray-100">Proceed to Payment</Button>
              </Link>
            </CardContent>
          </Card>
        )}
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
          <Link href="/vip" className="flex flex-col items-center p-2 text-blue-600">
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
