"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Home, FileText, Trophy, TrendingUp, User } from "lucide-react"
import Link from "next/link"

export default function VIPPage() {
  const packages = [
    {
      id: "intern",
      name: "Intern",
      subtitle: "My identity",
      dailyWork: "Daily work 2 times",
      effectiveDate: "2025-07-18~2025-07-20",
      bgColor: "bg-gradient-to-r from-gray-800 to-gray-900",
      current: true,
    },
    {
      id: "j1",
      name: "J 1",
      deposit: "KES100",
      dailyEarning: "KES10.00/Per order",
      dailyWork: "Daily work 4 times",
      totalDeposit: "deposit KES1200",
      bgColor: "bg-gradient-to-r from-orange-500 to-red-500",
    },
    {
      id: "j2",
      name: "J 2",
      deposit: "KES5400",
      dailyEarning: "KES28.00/Per order",
      dailyWork: "Daily work 6 times",
      totalDeposit: "deposit KES5100",
      bgColor: "bg-gradient-to-r from-teal-400 to-green-500",
    },
    {
      id: "j3",
      name: "J 3",
      deposit: "KES10500",
      dailyEarning: "KES67.00/Per order",
      dailyWork: "Daily work 8 times",
      totalDeposit: "deposit KES16000",
      bgColor: "bg-gradient-to-r from-yellow-400 to-orange-500",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 p-4 text-center">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 mx-auto max-w-sm">
            <div className="text-sm opacity-90 mb-2">CREATING THE NEXT CENTURY</div>
            <div className="text-lg font-bold">EXECUTIVE</div>
          </div>
        </div>
      </div>

      {/* VIP Packages */}
      <div className="p-4 space-y-4">
        {packages.map((pkg) => (
          <Card key={pkg.id} className={`${pkg.bgColor} text-white overflow-hidden relative`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-xl font-bold">{pkg.name}</h3>
                    {pkg.current && (
                      <Badge variant="secondary" className="bg-white/20 text-white">
                        Current
                      </Badge>
                    )}
                  </div>

                  {pkg.subtitle && <p className="text-sm opacity-90 mb-1">{pkg.subtitle}</p>}

                  {pkg.dailyEarning && <p className="text-sm opacity-90 mb-1">{pkg.dailyEarning}</p>}

                  <p className="text-sm opacity-90 mb-1">{pkg.dailyWork}</p>

                  {pkg.totalDeposit && <p className="text-sm opacity-90">{pkg.totalDeposit}</p>}

                  {pkg.effectiveDate && (
                    <div className="mt-2">
                      <p className="text-xs opacity-75">Effective date</p>
                      <p className="text-sm">{pkg.effectiveDate}</p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-end space-y-2">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <Trophy className="h-4 w-4 text-white" />
                    </div>
                  </div>

                  {!pkg.current && (
                    <Button size="sm" className="bg-white/20 hover:bg-white/30 text-white border-white/30" asChild>
                      <Link href={`/invest/${pkg.id}`}>Join now</Link>
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Profit Table Section */}
      <div className="p-4 mt-8">
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-bold mb-4 text-center">Investment Packages</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Plan</th>
                    <th className="text-left p-2">Deposit</th>
                    <th className="text-left p-2">Daily</th>
                    <th className="text-left p-2">Monthly</th>
                    <th className="text-left p-2">Yearly</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-2 font-semibold">J1</td>
                    <td className="p-2">KES 100</td>
                    <td className="p-2 text-green-600">KES 60</td>
                    <td className="p-2 text-green-600">KES 1,800</td>
                    <td className="p-2 text-green-600">KES 21,900</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-semibold">J2</td>
                    <td className="p-2">KES 5,400</td>
                    <td className="p-2 text-green-600">KES 180</td>
                    <td className="p-2 text-green-600">KES 5,400</td>
                    <td className="p-2 text-green-600">KES 65,700</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-semibold">J3</td>
                    <td className="p-2">KES 10,500</td>
                    <td className="p-2 text-green-600">KES 350</td>
                    <td className="p-2 text-green-600">KES 10,500</td>
                    <td className="p-2 text-green-600">KES 127,750</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-semibold">J4</td>
                    <td className="p-2">KES 18,000</td>
                    <td className="p-2 text-green-600">KES 600</td>
                    <td className="p-2 text-green-600">KES 18,000</td>
                    <td className="p-2 text-green-600">KES 219,000</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-semibold">J5</td>
                    <td className="p-2">KES 39,000</td>
                    <td className="p-2 text-green-600">KES 1,300</td>
                    <td className="p-2 text-green-600">KES 39,000</td>
                    <td className="p-2 text-green-600">KES 474,500</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-semibold">J6</td>
                    <td className="p-2">KES 96,000</td>
                    <td className="p-2 text-green-600">KES 3,200</td>
                    <td className="p-2 text-green-600">KES 96,000</td>
                    <td className="p-2 text-green-600">KES 1,168,000</td>
                  </tr>
                </tbody>
              </table>
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
