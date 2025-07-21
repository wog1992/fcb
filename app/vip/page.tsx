"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Trophy, Star, Crown, Zap, Target, Gift, CheckCircle, Clock } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function VIPPage() {
  const [selectedPackage, setSelectedPackage] = useState("")
  const [userBalance, setUserBalance] = useState(0)
  const router = useRouter()

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

  const vipPackages = [
    {
      id: "J1",
      name: "J1 Package",
      price: 2100,
      dailyEarning: 70,
      duration: 365,
      totalReturn: 25550,
      icon: Star,
      color: "from-blue-500 to-purple-600",
      features: [
        "Daily earning: KES 70",
        "365 days duration",
        "Total return: KES 25550",
        "Basic support",
        "Task completion rewards",
      ],
    },
    {
      id: "J2",
      name: "J2 Package",
      price: 5400,
      dailyEarning: 180,
      duration: 365,
      totalReturn: 65700,
      icon: Trophy,
      color: "from-purple-500 to-pink-600",
      features: [
        "Daily earning: KES 180",
        "365 days duration",
        "Total return: KES 65,700",
        "Priority support",
        "Higher task rewards",
        "Bonus referral commissions",
      ],
    },
    {
      id: "J3",
      name: "J3 Package",
      price: 10500,
      dailyEarning: 350,
      duration: 365,
      totalReturn: 127,750,
      icon: Crown,
      color: "from-yellow-500 to-orange-600",
      features: [
        "Daily earning: KES 373",
        "365 days duration",
        "Total return: KES 127,750",
        "VIP support",
        "Premium task access",
        "Maximum referral bonuses",
        "Exclusive rewards",
      ],
    },
  ]

  const handleSelectPackage = (pkg) => {
    // Redirect to recharge page with package details
    router.push(`/recharge?amount=${pkg.price}&package=${pkg.name}`)
  }

  const getPackageStatus = (pkgId) => {
    if (selectedPackage === pkgId) {
      return { status: "Active", color: "bg-green-100 text-green-800", icon: CheckCircle }
    }
    return { status: "Available", color: "bg-gray-100 text-gray-800", icon: Clock }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white p-4">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex items-center space-x-2">
            <img src="/fcb-logo.jpg" alt="FCB Logo" className="h-8 w-8 rounded" />
            <div>
              <h1 className="text-xl font-bold">VIP Packages</h1>
              <p className="text-sm opacity-90">Choose your investment level</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Current Balance */}
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Available Balance</p>
                <p className="text-2xl font-bold text-green-600">KES {userBalance.toFixed(2)}</p>
              </div>
              <Zap className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        {/* Active Package Alert */}
        {selectedPackage && (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              <span className="text-green-700">
                ✅ You have an active <strong>{selectedPackage}</strong> package. Complete daily tasks to earn your
                rewards!
              </span>
            </AlertDescription>
          </Alert>
        )}

        {/* VIP Packages */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-center">Choose Your VIP Package</h2>

          {vipPackages.map((pkg) => {
            const IconComponent = pkg.icon
            const status = getPackageStatus(pkg.id)
            const StatusIcon = status.icon

            return (
              <Card key={pkg.id} className="overflow-hidden">
                <div className={`bg-gradient-to-r ${pkg.color} p-4 text-white`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <IconComponent className="h-8 w-8" />
                      <div>
                        <h3 className="text-xl font-bold">{pkg.name}</h3>
                        <p className="text-sm opacity-90">{pkg.duration} days investment</p>
                      </div>
                    </div>
                    <Badge className={status.color}>
                      <StatusIcon className="h-3 w-3 mr-1" />
                      {status.status}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">KES {pkg.price.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">Investment</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">KES {pkg.dailyEarning}</p>
                      <p className="text-xs text-gray-500">Daily Earning</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-600">KES {pkg.totalReturn.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">Total Return</p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <h4 className="font-semibold text-sm">Package Features:</h4>
                    {pkg.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-gray-50 p-3 rounded-lg mb-4">
                    <div className="flex justify-between text-sm">
                      <span>ROI:</span>
                      <span className="font-bold text-green-600">
                        {(((pkg.totalReturn - pkg.price) / pkg.price) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Profit:</span>
                      <span className="font-bold text-green-600">
                        KES {(pkg.totalReturn - pkg.price).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <Button
                    onClick={() => handleSelectPackage(pkg)}
                    disabled={selectedPackage === pkg.id}
                    className="w-full"
                  >
                    {selectedPackage === pkg.id ? "Currently Active" : `Invest KES ${pkg.price.toLocaleString()}`}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Investment Info */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center text-blue-800">
              <Gift className="h-5 w-5 mr-2" />
              How It Works
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-blue-700">
            <div className="flex items-start space-x-2">
              <Target className="h-4 w-4 mt-0.5 text-blue-600" />
              <span>Choose your VIP package and make payment</span>
            </div>
            <div className="flex items-start space-x-2">
              <Clock className="h-4 w-4 mt-0.5 text-blue-600" />
              <span>Admin confirms your payment and activates your package</span>
            </div>
            <div className="flex items-start space-x-2">
              <CheckCircle className="h-4 w-4 mt-0.5 text-blue-600" />
              <span>Complete daily tasks to earn your guaranteed daily income</span>
            </div>
            <div className="flex items-start space-x-2">
              <Gift className="h-4 w-4 mt-0.5 text-blue-600" />
              <span>Earn additional income through referral bonuses</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
