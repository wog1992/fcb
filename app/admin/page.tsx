"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Users,
  TrendingUp,
  CheckCircle,
  XCircle,
  Eye,
  Ban,
  UserCheck,
  ArrowUpRight,
  ArrowDownLeft,
  Search,
} from "lucide-react"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const stats = [
    { label: "Total Users", value: "1,247", icon: Users, color: "text-blue-600" },
    { label: "Pending Deposits", value: "23", icon: ArrowUpRight, color: "text-orange-600" },
    { label: "Pending Withdrawals", value: "15", icon: ArrowDownLeft, color: "text-red-600" },
    { label: "Total Revenue", value: "KES 2,456,780", icon: TrendingUp, color: "text-green-600" },
  ]

  const pendingDeposits = [
    { id: 1, user: "07*****086", amount: "KES 5,400", package: "J2", time: "2 mins ago", mpesaCode: "QGH7K8L9M0" },
    { id: 2, user: "07*****123", amount: "KES 10,500", package: "J3", time: "5 mins ago", mpesaCode: "XYZ1A2B3C4" },
    { id: 3, user: "07*****456", amount: "KES 100", package: "J1", time: "10 mins ago", mpesaCode: "DEF5G6H7I8" },
  ]

  const pendingWithdrawals = [
    { id: 1, user: "07*****789", amount: "KES 180", time: "1 hour ago", mpesaMessage: "Please send to 0712345678" },
    { id: 2, user: "07*****012", amount: "KES 350", time: "2 hours ago", mpesaMessage: "Withdraw to 0798765432" },
  ]

  const allUsers = [
    { id: 1, phone: "07*****086", name: "John Doe", status: "active", package: "J2", earnings: "KES 1,240" },
    { id: 2, phone: "07*****123", name: "Jane Smith", status: "active", package: "J3", earnings: "KES 2,450" },
    { id: 3, phone: "07*****456", name: "Bob Wilson", status: "suspended", package: "J1", earnings: "KES 340" },
    { id: 4, phone: "07*****789", name: "Alice Brown", status: "active", package: "J4", earnings: "KES 4,200" },
  ]

  const handleApproveDeposit = (id: number) => {
    console.log("Approving deposit:", id)
  }

  const handleRejectDeposit = (id: number) => {
    console.log("Rejecting deposit:", id)
  }

  const handleApproveWithdrawal = (id: number) => {
    console.log("Approving withdrawal:", id)
  }

  const handleRejectWithdrawal = (id: number) => {
    console.log("Rejecting withdrawal:", id)
  }

  const handleUserAction = (userId: number, action: string) => {
    console.log(`${action} user:`, userId)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-800 text-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-red-100">George Wiswa - 0782192086</p>
          </div>
          <div className="text-right">
            <div className="text-sm opacity-90">FCB VIP Intern2Days</div>
            <div className="text-lg font-semibold">Admin Panel</div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="flex items-center p-4">
                <stat.icon className={`h-8 w-8 ${stat.color} mr-3`} />
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-xl font-bold">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="deposits">Deposits</TabsTrigger>
            <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Deposits */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ArrowUpRight className="h-5 w-5 mr-2 text-green-600" />
                    Recent Deposits
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {pendingDeposits.slice(0, 3).map((deposit) => (
                      <div key={deposit.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium">{deposit.user}</div>
                          <div className="text-sm text-gray-600">
                            {deposit.amount} - {deposit.package}
                          </div>
                        </div>
                        <Badge variant="outline" className="text-orange-600">
                          Pending
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Withdrawals */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ArrowDownLeft className="h-5 w-5 mr-2 text-red-600" />
                    Recent Withdrawals
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {pendingWithdrawals.slice(0, 3).map((withdrawal) => (
                      <div key={withdrawal.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium">{withdrawal.user}</div>
                          <div className="text-sm text-gray-600">{withdrawal.amount}</div>
                        </div>
                        <Badge variant="outline" className="text-red-600">
                          Pending
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="deposits" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pending Deposits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingDeposits.map((deposit) => (
                    <div key={deposit.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarFallback>U</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{deposit.user}</div>
                            <div className="text-sm text-gray-600">{deposit.time}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-lg">{deposit.amount}</div>
                          <Badge>{deposit.package}</Badge>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded mb-3">
                        <Label className="text-sm font-medium">M-Pesa Code:</Label>
                        <div className="font-mono text-sm">{deposit.mpesaCode}</div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleApproveDeposit(deposit.id)}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleRejectDeposit(deposit.id)}>
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="withdrawals" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pending Withdrawals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingWithdrawals.map((withdrawal) => (
                    <div key={withdrawal.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarFallback>U</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{withdrawal.user}</div>
                            <div className="text-sm text-gray-600">{withdrawal.time}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-lg">{withdrawal.amount}</div>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded mb-3">
                        <Label className="text-sm font-medium">M-Pesa Message:</Label>
                        <div className="text-sm">{withdrawal.mpesaMessage}</div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleApproveWithdrawal(withdrawal.id)}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve & Send
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleRejectWithdrawal(withdrawal.id)}>
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  User Management
                  <div className="flex items-center space-x-2">
                    <Input placeholder="Search users..." className="w-64" />
                    <Button size="sm">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {allUsers.map((user) => (
                    <div key={user.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-gray-600">{user.phone}</div>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant={user.status === "active" ? "default" : "destructive"}>
                                {user.status}
                              </Badge>
                              <Badge variant="outline">{user.package}</Badge>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">{user.earnings}</div>
                          <div className="flex space-x-1 mt-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-3 w-3" />
                            </Button>
                            {user.status === "active" ? (
                              <Button size="sm" variant="outline" onClick={() => handleUserAction(user.id, "suspend")}>
                                <Ban className="h-3 w-3" />
                              </Button>
                            ) : (
                              <Button size="sm" variant="outline" onClick={() => handleUserAction(user.id, "activate")}>
                                <UserCheck className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
