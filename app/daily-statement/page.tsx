"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ArrowLeft,
  Home,
  FileText,
  Trophy,
  TrendingUp,
  User,
  ArrowUpRight,
  ArrowDownLeft,
  Calendar,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function DailyStatementPage() {
  const dailyData = [
    { date: "2025-01-19", tasks: 2, earnings: "KES 20", referrals: "KES 0", total: "KES 20" },
    { date: "2025-01-18", tasks: 3, earnings: "KES 30", referrals: "KES 15", total: "KES 45" },
    { date: "2025-01-17", tasks: 1, earnings: "KES 10", referrals: "KES 0", total: "KES 10" },
    { date: "2025-01-16", tasks: 2, earnings: "KES 20", referrals: "KES 25", total: "KES 45" },
    { date: "2025-01-15", tasks: 4, earnings: "KES 40", referrals: "KES 10", total: "KES 50" },
  ]

  const totalEarnings = dailyData.reduce((sum, day) => sum + Number.parseInt(day.total.replace("KES ", "")), 0)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-4">
        <div className="flex items-center space-x-3">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Daily Statement</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Summary Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Weekly Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">KES {totalEarnings}</div>
              <div className="text-sm text-gray-600">Total Earnings This Week</div>
            </div>
          </CardContent>
        </Card>

        {/* Daily Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dailyData.map((day, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="font-semibold">{day.date}</div>
                    <div className="font-bold text-green-600">{day.total}</div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-sm">
                    <div className="text-center p-2 bg-blue-50 rounded">
                      <div className="font-semibold">{day.tasks}</div>
                      <div className="text-gray-600">Tasks</div>
                    </div>
                    <div className="text-center p-2 bg-green-50 rounded">
                      <div className="font-semibold">{day.earnings}</div>
                      <div className="text-gray-600">Task Earnings</div>
                    </div>
                    <div className="text-center p-2 bg-purple-50 rounded">
                      <div className="font-semibold">{day.referrals}</div>
                      <div className="text-gray-600">Referrals</div>
                    </div>
                  </div>
                </div>
              ))}
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
          <Link href="/profile" className="flex flex-col items-center p-2 text-gray-600">
            <User className="h-5 w-5" />
            <span className="text-xs mt-1">My</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
