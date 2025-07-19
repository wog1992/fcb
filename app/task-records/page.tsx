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
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function TaskRecordsPage() {
  const taskHistory = [
    { id: 1, task: "Watch Product Video", reward: "KES 10", status: "completed", date: "2025-01-19", time: "14:30" },
    { id: 2, task: "BOSE Headphones Review", reward: "KES 10", status: "completed", date: "2025-01-19", time: "13:15" },
    { id: 3, task: "Tech Product Analysis", reward: "KES 10", status: "pending", date: "2025-01-19", time: "12:00" },
    { id: 4, task: "Cartier Watch Review", reward: "KES 10", status: "failed", date: "2025-01-18", time: "16:45" },
    { id: 5, task: "ASUS Zenbook Review", reward: "KES 10", status: "completed", date: "2025-01-18", time: "15:20" },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-orange-500" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
        <div className="flex items-center space-x-3">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Task Records</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card>
            <CardContent className="p-3 text-center">
              <div className="text-2xl font-bold text-green-600">
                {taskHistory.filter((t) => t.status === "completed").length}
              </div>
              <div className="text-xs text-gray-600">Completed</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <div className="text-2xl font-bold text-orange-600">
                {taskHistory.filter((t) => t.status === "pending").length}
              </div>
              <div className="text-xs text-gray-600">Pending</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <div className="text-2xl font-bold text-red-600">
                {taskHistory.filter((t) => t.status === "failed").length}
              </div>
              <div className="text-xs text-gray-600">Failed</div>
            </CardContent>
          </Card>
        </div>

        {/* Task History */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {taskHistory.map((task) => (
                <div key={task.id} className="border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(task.status)}
                      <span className="font-medium">{task.task}</span>
                    </div>
                    <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>
                      {task.date} at {task.time}
                    </span>
                    <span className="font-semibold text-green-600">{task.reward}</span>
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
