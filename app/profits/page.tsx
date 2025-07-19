"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, FileText, Trophy, TrendingUp, User, ArrowUpRight, ArrowDownLeft } from "lucide-react"
import Link from "next/link"

export default function ProfitsPage() {
  const referralBonusData = [
    { level: "J1 - Starter", deposit: "2,100", level1: "231", level2: "63", level3: "21" },
    { level: "J2 - Bronze", deposit: "5,400", level1: "594", level2: "162", level3: "54" },
    { level: "J3 - Silver", deposit: "10,500", level1: "1,155", level2: "315", level3: "105" },
    { level: "J4 - Gold", deposit: "18,000", level1: "1,980", level2: "540", level3: "180" },
    { level: "J5 - Platinum", deposit: "39,000", level1: "4,290", level2: "1,170", level3: "390" },
    { level: "J6 - Diamond", deposit: "96,000", level1: "10,560", level2: "2,880", level3: "960" },
    { level: "J7 - Crown Elite", deposit: "150,000", level1: "16,500", level2: "4,500", level3: "1,500" },
  ]

  const taskRebateData = [
    { level: "J1", daily: "70", l1: "2.10", l2: "1.40", l3: "0.70" },
    { level: "J2", daily: "180", l1: "5.40", l2: "3.60", l3: "1.80" },
    { level: "J3", daily: "350", l1: "10.50", l2: "7.00", l3: "3.50" },
    { level: "J4", daily: "600", l1: "18.00", l2: "12.00", l3: "6.00" },
    { level: "J5", daily: "1,300", l1: "39.00", l2: "26.00", l3: "13.00" },
    { level: "J6", daily: "3,200", l1: "96.00", l2: "64.00", l3: "32.00" },
    { level: "J7", daily: "5,000", l1: "150.00", l2: "100.00", l3: "50.00" },
  ]

  const investmentEarningsData = [
    { level: "J1 - Starter", deposit: "2,100", daily: "70", monthly: "2,100", yearly: "25,550" },
    { level: "J2 - Bronze", deposit: "5,400", daily: "180", monthly: "5,400", yearly: "65,700" },
    { level: "J3 - Silver", deposit: "10,500", daily: "350", monthly: "10,500", yearly: "127,750" },
    { level: "J4 - Gold", deposit: "18,000", daily: "600", monthly: "18,000", yearly: "219,000" },
    { level: "J5 - Platinum", deposit: "39,000", daily: "1,300", monthly: "39,000", yearly: "474,500" },
    { level: "J6 - Diamond", deposit: "96,000", daily: "3,200", monthly: "96,000", yearly: "1,168,000" },
    { level: "J7 - Crown Elite", deposit: "150,000", daily: "5,000", monthly: "150,000", yearly: "1,825,000" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-purple-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 text-white p-6">
        <h1 className="text-2xl font-bold text-center mb-4">Profit Information</h1>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
          <p className="text-sm leading-relaxed">
            Comprehensive profit breakdown showing referral bonuses, task rebates, and investment earnings across all
            job levels.
          </p>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Referral Bonus Table */}
        <Card>
          <CardHeader className="bg-gradient-to-r from-blue-400 to-cyan-400 text-white">
            <CardTitle className="text-center text-lg">Referral Bonus Table (Levels 1, 2, 3)</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-blue-500 text-white">
                  <tr>
                    <th className="p-3 text-left font-semibold">Job Level</th>
                    <th className="p-3 text-left font-semibold">Deposit (KSh)</th>
                    <th className="p-3 text-left font-semibold">Level 1 (11%)</th>
                    <th className="p-3 text-left font-semibold">Level 2 (3%)</th>
                    <th className="p-3 text-left font-semibold">Level 3 (1%)</th>
                  </tr>
                </thead>
                <tbody>
                  {referralBonusData.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-blue-50" : "bg-white"}>
                      <td className="p-3 font-medium">{row.level}</td>
                      <td className="p-3">{row.deposit}</td>
                      <td className="p-3 text-green-600 font-semibold">{row.level1}</td>
                      <td className="p-3 text-blue-600 font-semibold">{row.level2}</td>
                      <td className="p-3 text-purple-600 font-semibold">{row.level3}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Task Rebate Table */}
        <Card>
          <CardHeader className="bg-gradient-to-r from-gray-800 to-black text-white">
            <CardTitle className="text-center text-lg flex items-center justify-center">
              <span className="text-yellow-400 mr-2">⭐</span>
              Task Rebate Table (Daily Earnings)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 bg-gray-900">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-white">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="p-3 text-left font-semibold">Lvl</th>
                    <th className="p-3 text-left font-semibold">💰Daily</th>
                    <th className="p-3 text-left font-semibold">🟡3% (L1)</th>
                    <th className="p-3 text-left font-semibold">🟠2% (L2)</th>
                    <th className="p-3 text-left font-semibold">🔵1% (L3)</th>
                  </tr>
                </thead>
                <tbody>
                  {taskRebateData.map((row, index) => (
                    <tr key={index} className="border-b border-gray-700">
                      <td className="p-3 font-bold text-yellow-400">{row.level}</td>
                      <td className="p-3 font-semibold">{row.daily}</td>
                      <td className="p-3 text-yellow-400 font-semibold">{row.l1}</td>
                      <td className="p-3 text-orange-400 font-semibold">{row.l2}</td>
                      <td className="p-3 text-blue-400 font-semibold">{row.l3}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Investment Earnings Table */}
        <Card>
          <CardHeader className="bg-gradient-to-r from-green-400 to-emerald-400 text-white">
            <CardTitle className="text-center text-lg">
              Job Level Investment Earnings (Daily, Monthly, Yearly)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 bg-green-50">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-green-500 text-white">
                  <tr>
                    <th className="p-3 text-left font-semibold">Job Level</th>
                    <th className="p-3 text-left font-semibold">Deposit (KSh)</th>
                    <th className="p-3 text-left font-semibold">Daily</th>
                    <th className="p-3 text-left font-semibold">30 Days</th>
                    <th className="p-3 text-left font-semibold">365 Days</th>
                  </tr>
                </thead>
                <tbody>
                  {investmentEarningsData.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-green-100" : "bg-white"}>
                      <td className="p-3 font-medium">{row.level}</td>
                      <td className="p-3 font-semibold">{row.deposit}</td>
                      <td className="p-3 text-green-700 font-semibold">{row.daily}</td>
                      <td className="p-3 text-green-600 font-semibold">{row.monthly}</td>
                      <td className="p-3 text-green-800 font-semibold">{row.yearly}</td>
                    </tr>
                  ))}
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
          <Link href="/vip" className="flex flex-col items-center p-2 text-gray-600">
            <Trophy className="h-5 w-5" />
            <span className="text-xs mt-1">VIP</span>
          </Link>
          <Link href="/profits" className="flex flex-col items-center p-2 text-blue-600">
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
          <Link href="/profile" className="flex flex-col items-center p-2 text-gray-600">
            <User className="h-5 w-5" />
            <span className="text-xs mt-1">My</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
