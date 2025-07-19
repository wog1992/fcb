"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Home,
  FileText,
  Trophy,
  TrendingUp,
  User,
  ArrowUpRight,
  ArrowDownLeft,
  Calculator,
  ArrowUp,
  ArrowDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AccountingRecordsPage() {
  const transactions = [
    {
      id: 1,
      type: "deposit",
      amount: "KES 5,400",
      description: "J2 Package Investment",
      date: "2025-01-19",
      status: "completed",
    },
    {
      id: 2,
      type: "earning",
      amount: "KES 180",
      description: "Daily Task Completion",
      date: "2025-01-19",
      status: "completed",
    },
    {
      id: 3,
      type: "referral",
      amount: "KES 594",
      description: "Level 1 Referral Bonus",
      date: "2025-01-18",
      status: "completed",
    },
    {
      id: 4,
      type: "withdrawal",
      amount: "KES 300",
      description: "M-Pesa Withdrawal",
      date: "2025-01-17",
      status: "pending",
    },
    {
      id: 5,
      type: "earning",
      amount: "KES 180",
      description: "Daily Task Completion",
      date: "2025-01-17",
      status: "completed",
    },
  ]

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "deposit":
        return <ArrowUp className="h-4 w-4 text-green-500" />
      case "withdrawal":
        return <ArrowDown className="h-4 w-4 text-red-500" />
      case "earning":
        return <TrendingUp className="h-4 w-4 text-blue-500" />
      case "referral":
        return <User className="h-4 w-4 text-purple-500" />
      default:
        return <Calculator className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-orange-100 text-orange-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const totalDeposits = transactions
    .filter((t) => t.type === "deposit")
    .reduce((sum, t) => sum + Number.parseInt(t.amount.replace("KES ", "").replace(",", "")), 0)
  const totalEarnings = transactions
    .filter((t) => t.type === "earning" || t.type === "referral")
    .reduce((sum, t) => sum + Number.parseInt(t.amount.replace("KES ", "").replace(",", "")), 0)
  const totalWithdrawals = transactions
    .filter((t) => t.type === "withdrawal")
    .reduce((sum, t) => sum + Number.parseInt(t.amount.replace("KES ", "").replace(",", "")), 0)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4">
        <div className="flex items-center space-x-3">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Accounting Records</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card>
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold text-green-600">KES {totalDeposits.toLocaleString()}</div>
              <div className="text-xs text-gray-600">Total Deposits</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold text-blue-600">KES {totalEarnings.toLocaleString()}</div>
              <div className="text-xs text-gray-600">Total Earnings</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold text-red-600">KES {totalWithdrawals.toLocaleString()}</div>
              <div className="text-xs text-gray-600">Withdrawals</div>
            </CardContent>
          </Card>
        </div>

        {/* Transaction History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calculator className="h-5 w-5 mr-2" />
              Transaction History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      {getTransactionIcon(transaction.type)}
                      <div>
                        <div className="font-medium">{transaction.description}</div>
                        <div className="text-sm text-gray-600">{transaction.date}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`font-bold ${
                          transaction.type === "deposit" ||
                          transaction.type === "earning" ||
                          transaction.type === "referral"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {transaction.type === "withdrawal" ? "-" : "+"}
                        {transaction.amount}
                      </div>
                      <Badge className={getStatusColor(transaction.status)}>{transaction.status}</Badge>
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
