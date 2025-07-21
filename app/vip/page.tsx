"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  Crown,
  Star,
  Zap,
  TrendingUp,
  Users,
  Gift,
  Home,
  FileText,
  Trophy,
  TrendingUpIcon,
  User,
  ArrowUpRight,
  ArrowDownLeft,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function VIPPage() {
  const router = useRouter()
  const [userBalance, setUserBalance] = useState(0)
  const [selectedPackage, setSelectedPackage] = useState("")

  useEffect(() => {
    const savedBalance = localStorage.getItem("userBalance")
    const savedPackage = localStorage.getItem("selectedPackage")

    if (savedBalance) {
      setUserBalance(Number.parseFloat(savedBalance))
    }
    if (savedPackage) {
      setSelectedPackage(savedPackage)
    }
  }, [])

  const packages = [
    {
      id: "j1",
      name: "J1",
      price: 2100,
      dailyEarning: 70,
      duration: 90,
      totalReturn: 6300,
      profit: 4200,
      level: "Basic",
      color: "from-blue-500 to-blue-600",
      features: ["Daily Tasks", "Basic Support", "90 Days Duration"],
    },
    {
      id: "j2",
      name: "J2",
      price: 5400,
      dailyEarning: 180,
      duration: 90,
      totalReturn: 16200,
      profit: 10800,
      level: "Standard",
      color: "from-purple-500 to-purple-600",
      features: ["Daily Tasks", "Priority Support", "90 Days Duration", "Bonus Tasks"],
    },
    {
      id: "j3",
      name: "J3",
      price: 10500,
      dailyEarning: 350,
      duration: 90,
      totalReturn: 31500,
      profit: 21000,
      level: "Premium",
      color: "from-orange-500 to-orange-600",
      features: ["Daily Tasks", "VIP Support", "90 Days Duration", "Bonus Tasks", "Referral Bonus"],
    },
    {
      id: "j4",
      name: "J4",
      price: 18000,
      dailyEarning: 600,
      duration: 90,
      totalReturn: 54000,
      profit: 36000,
      level: "Elite",
      color: "from-green-500 to-green-600",
      features: ["Daily Tasks", "Elite Support", "90 Days Duration", "Premium Tasks", "High Referral Bonus"],
    },
    {
      id: "j5",
      name: "J5",
      price: 39000,
      dailyEarning: 1300,
      duration: 90,
      totalReturn: 117000,
      profit: 78000,
      level: "Master",
      color: "from-red-500 to-red-600",
      features: ["Daily Tasks", "Master Support", "90 Days Duration", "Exclusive Tasks", "Maximum Referral Bonus"],
    },
    {
      id: "j6",
      name: "J6",
      price: 96000,
      dailyEarning: 3200,
      duration: 90,
      totalReturn: 288000,
      profit: 192000,
      level: "Diamond",
      color: "from-yellow-500 to-yellow-600",
      features: [
        "Daily Tasks",
        "Diamond Support",
        "90 Days Duration",
        "Premium Exclusive Tasks",
        "Ultimate Referral Bonus",
      ],
    },
  ]

  const handleSelectPackage = (pkg) => {
    setSelectedPackage(pkg.id)
    localStorage.setItem("selectedPackage", pkg.id)
    localStorage.setItem("selectedPackageName", pkg.name)
    localStorage.setItem("selectedPackagePrice", pkg.price.toString())
    localStorage.setItem("selectedPackageDailyEarning", pkg.dailyEarning.toString())

    // Redirect to recharge page
    router.push("/recharge")
  }

  const getROI = (pkg) => {
    return ((pkg.profit / pkg.price) * 100).toFixed(0)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold">VIP Investment Packages</h1>
          </div>
          <Crown className="h-6 w-6" />
        </div>
        <div className="mt-2 text-sm opacity-90">Choose your investment level and start earning daily profits</div>
      </div>

      <div className="p-4 space-y-4">
        {/* Current Balance */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="p-4 text-center">
            <div className="text-sm text-gray-600 mb-1">Available Balance</div>
            <div className="text-2xl font-bold text-blue-600">KES {userBalance.toFixed(2)}</div>
            {selectedPackage && (
              <Badge className="mt-2 bg-green-100 text-green-800">
                Active Package: {selectedPackage.toUpperCase()}
              </Badge>
            )}
          </CardContent>
        </Card>

        {/* Profit Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Profit Overview (90 Days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="font-bold text-green-600">J1 Package</div>
                <div className="text-xs text-gray-600">KES 70/day × 90 days</div>
                <div className="font-bold">Total: KES 6,300</div>
                <div className="text-xs text-green-600">Profit: KES 4,200</div>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="font-bold text-blue-600">J2 Package</div>
                <div className="text-xs text-gray-600">KES 180/day × 90 days</div>
                <div className="font-bold">Total: KES 16,200</div>
                <div className="text-xs text-blue-600">Profit: KES 10,800</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* VIP Packages */}
        <div className="space-y-4">
          {packages.map((pkg) => (
            <Card key={pkg.id} className="overflow-hidden">
              <div className={`bg-gradient-to-r ${pkg.color} p-4 text-white`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold">
                      {pkg.name} - {pkg.level}
                    </h3>
                    <div className="text-sm opacity-90">90 Days Investment Plan</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">KES {pkg.price.toLocaleString()}</div>
                    <div className="text-sm opacity-90">Investment</div>
                  </div>
                </div>
              </div>

              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600">Daily Earning</div>
                    <div className="text-lg font-bold text-green-600">KES {pkg.dailyEarning}</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600">Total Return</div>
                    <div className="text-lg font-bold text-blue-600">KES {pkg.totalReturn.toLocaleString()}</div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Profit Margin</span>
                    <span className="font-bold text-green-600">{getROI(pkg)}% ROI</span>
                  </div>
                  <Progress value={Number.parseInt(getROI(pkg))} className="h-2" />
                </div>

                <div className="space-y-2 mb-4">
                  {pkg.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <Star className="h-4 w-4 text-yellow-500 mr-2" />
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="bg-green-50 p-3 rounded-lg mb-4">
                  <div className="text-sm text-green-800">
                    <strong>Total Profit:</strong> KES {pkg.profit.toLocaleString()} over 90 days
                  </div>
                </div>

                <Button
                  className={`w-full bg-gradient-to-r ${pkg.color} hover:opacity-90`}
                  onClick={() => handleSelectPackage(pkg)}
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Invest in {pkg.name} Package
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Investment Benefits */}
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center text-purple-800">
              <Gift className="h-5 w-5 mr-2" />
              Investment Benefits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex items-center">
                <Users className="h-4 w-4 text-purple-600 mr-3" />
                <span>Earn daily profits for 90 consecutive days</span>
              </div>
              <div className="flex items-center">
                <TrendingUpIcon className="h-4 w-4 text-purple-600 mr-3" />
                <span>Guaranteed returns with high profit margins</span>
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-purple-600 mr-3" />
                <span>Access to exclusive tasks and bonuses</span>
              </div>
              <div className="flex items-center">
                <Gift className="h-4 w-4 text-purple-600 mr-3" />
                <span>Referral bonuses and team rewards</span>
              </div>
            </div>
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
          <Link href="/vip" className="flex flex-col items-center p-2 text-blue-600">
            <Trophy className="h-5 w-5" />
            <span className="text-xs mt-1">VIP</span>
          </Link>
          <Link href="/profits" className="flex flex-col items-center p-2 text-gray-600">
            <TrendingUpIcon className="h-5 w-5" />
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
          <Link href="/profile" className="flex flex-col items-center p-2 text-gray-600">
            <User className="h-5 w-5" />
            <span className="text-xs mt-1">Profile</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
