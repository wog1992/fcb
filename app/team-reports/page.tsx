"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ArrowLeft, Home, FileText, Trophy, TrendingUp, User, ArrowUpRight, ArrowDownLeft, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function TeamReportsPage() {
  const teamMembers = [
    {
      id: 1,
      name: "Alice Johnson",
      phone: "07*****123",
      level: "J2",
      earnings: "KES 1,240",
      status: "active",
      joinDate: "2025-01-10",
    },
    {
      id: 2,
      name: "Bob Smith",
      phone: "07*****456",
      level: "J1",
      earnings: "KES 340",
      status: "active",
      joinDate: "2025-01-12",
    },
    {
      id: 3,
      name: "Carol Wilson",
      phone: "07*****789",
      level: "J3",
      earnings: "KES 2,450",
      status: "active",
      joinDate: "2025-01-08",
    },
    {
      id: 4,
      name: "David Brown",
      phone: "07*****012",
      level: "J1",
      earnings: "KES 180",
      status: "inactive",
      joinDate: "2025-01-15",
    },
  ]

  const teamStats = {
    totalMembers: teamMembers.length,
    activeMembers: teamMembers.filter((m) => m.status === "active").length,
    totalEarnings: "KES 4,210",
    monthlyCommission: "KES 421",
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4">
        <div className="flex items-center space-x-3">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Team Reports</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Team Stats */}
        <div className="grid grid-cols-2 gap-3">
          <Card>
            <CardContent className="p-3 text-center">
              <div className="text-2xl font-bold text-blue-600">{teamStats.totalMembers}</div>
              <div className="text-xs text-gray-600">Total Members</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <div className="text-2xl font-bold text-green-600">{teamStats.activeMembers}</div>
              <div className="text-xs text-gray-600">Active Members</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold text-purple-600">{teamStats.totalEarnings}</div>
              <div className="text-xs text-gray-600">Team Earnings</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold text-orange-600">{teamStats.monthlyCommission}</div>
              <div className="text-xs text-gray-600">My Commission</div>
            </CardContent>
          </Card>
        </div>

        {/* Team Members */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Team Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {teamMembers.map((member) => (
                <div key={member.id} className="border rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{member.name}</div>
                        <div className="text-sm text-gray-600">{member.phone}</div>
                        <div className="text-xs text-gray-500">Joined: {member.joinDate}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">{member.earnings}</div>
                      <div className="flex items-center space-x-1 mt-1">
                        <Badge variant="outline">{member.level}</Badge>
                        <Badge
                          className={
                            member.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                          }
                        >
                          {member.status}
                        </Badge>
                      </div>
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
