"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Users,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Eye,
  CheckCircle,
  XCircle,
  Shield,
  Activity,
  Target,
  Gift,
  Search,
  Filter,
  Download,
} from "lucide-react"

interface WithdrawalRequest {
  id: string
  userId: string
  phone: string
  amount: number
  method: string
  status: "pending" | "approved" | "rejected"
  requestDate: string
  riskLevel: "low" | "medium" | "high"
  isTrialWithdrawal: boolean
  userActivity: {
    accountAge: number
    totalDeposits: number
    totalEarnings: number
    taskEarnings: number
    referralEarnings: number
    tasksCompleted: number
    referralsMade: number
    lastActivity: string
  }
  withdrawalHistory: Array<{
    amount: number
    date: string
    status: string
  }>
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUser, setSelectedUser] = useState<WithdrawalRequest | null>(null)
  const [showUserDetails, setShowUserDetails] = useState(false)

  // Mock data - in real app this would come from API
  const [withdrawalRequests, setWithdrawalRequests] = useState<WithdrawalRequest[]>([
    {
      id: "WD001",
      userId: "USR001",
      phone: "07****1234",
      amount: 50,
      method: "M-Pesa",
      status: "pending",
      requestDate: "2025-01-19",
      riskLevel: "low",
      isTrialWithdrawal: true,
      userActivity: {
        accountAge: 3,
        totalDeposits: 2100,
        totalEarnings: 280,
        taskEarnings: 280,
        referralEarnings: 0,
        tasksCompleted: 4,
        referralsMade: 0,
        lastActivity: "2025-01-19",
      },
      withdrawalHistory: [],
    },
    {
      id: "WD002",
      userId: "USR002",
      phone: "07****5678",
      amount: 500,
      method: "M-Pesa",
      status: "pending",
      requestDate: "2025-01-19",
      riskLevel: "high",
      isTrialWithdrawal: false,
      userActivity: {
        accountAge: 1,
        totalDeposits: 100,
        totalEarnings: 800,
        taskEarnings: 650,
        referralEarnings: 150,
        tasksCompleted: 12,
        referralsMade: 1,
        lastActivity: "2025-01-19",
      },
      withdrawalHistory: [{ amount: 200, date: "2025-01-18", status: "approved" }],
    },
    {
      id: "WD003",
      userId: "USR003",
      phone: "07****9012",
      amount: 150,
      method: "Bank Transfer",
      status: "pending",
      requestDate: "2025-01-19",
      riskLevel: "medium",
      isTrialWithdrawal: false,
      userActivity: {
        accountAge: 7,
        totalDeposits: 1500,
        totalEarnings: 420,
        taskEarnings: 350,
        referralEarnings: 70,
        tasksCompleted: 5,
        referralsMade: 2,
        lastActivity: "2025-01-19",
      },
      withdrawalHistory: [
        { amount: 100, date: "2025-01-15", status: "approved" },
        { amount: 75, date: "2025-01-10", status: "approved" },
      ],
    },
  ])

  const [dashboardStats, setDashboardStats] = useState({
    totalUsers: 1247,
    totalDeposits: 2847500,
    totalEarnings: 456780,
    pendingWithdrawals: 3,
    totalWithdrawals: 234560,
    activeUsers: 892,
    newUsersToday: 23,
    referralBonusesPaid: 45600,
  })

  const handleWithdrawalAction = (requestId: string, action: "approve" | "reject") => {
    setWithdrawalRequests((prev) =>
      prev.map((request) =>
        request.id === requestId ? { ...request, status: action === "approve" ? "approved" : "rejected" } : request,
      ),
    )

    const request = withdrawalRequests.find((r) => r.id === requestId)
    if (request) {
      alert(`Withdrawal request ${requestId} has been ${action}d for ${request.phone}`)
    }
  }

  const getRiskBadgeColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const calculateFraudScore = (userActivity: WithdrawalRequest["userActivity"]) => {
    let score = 0

    // High earnings vs deposits ratio
    if (userActivity.totalEarnings > userActivity.totalDeposits * 0.5) score += 30

    // New account with high earnings
    if (userActivity.accountAge < 7 && userActivity.totalEarnings > 500) score += 25

    // Unrealistic task completion rate
    const avgEarningPerTask = userActivity.taskEarnings / Math.max(userActivity.tasksCompleted, 1)
    if (avgEarningPerTask > 80) score += 20

    // High referral earnings without sufficient referrals
    if (userActivity.referralEarnings > userActivity.referralsMade * 150) score += 15

    return Math.min(score, 100)
  }

  const filteredRequests = withdrawalRequests.filter(
    (request) => request.phone.includes(searchTerm) || request.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Monitor user activity and manage withdrawal requests</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">{dashboardStats.totalUsers.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Deposits</p>
                  <p className="text-2xl font-bold text-gray-900">
                    KES {dashboardStats.totalDeposits.toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                  <p className="text-2xl font-bold text-gray-900">
                    KES {dashboardStats.totalEarnings.toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending Withdrawals</p>
                  <p className="text-2xl font-bold text-gray-900">{dashboardStats.pendingWithdrawals}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="withdrawals">Withdrawal Requests</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="h-5 w-5 mr-2" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                      <div>
                        <p className="font-medium">Withdrawal Approved</p>
                        <p className="text-sm text-gray-600">07****1234 - KES 150</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">2 hours ago</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-blue-600 mr-3" />
                      <div>
                        <p className="font-medium">New User Registration</p>
                        <p className="text-sm text-gray-600">07****9876 joined with referral code</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">3 hours ago</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <div className="flex items-center">
                      <AlertTriangle className="h-5 w-5 text-red-600 mr-3" />
                      <div>
                        <p className="font-medium">High Risk Withdrawal</p>
                        <p className="text-sm text-gray-600">07****5678 - KES 500 flagged for review</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">5 hours ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="h-5 w-5 mr-2" />
                    Task Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Tasks Completed Today:</span>
                      <span className="font-bold">1,247</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Average Completion Time:</span>
                      <span className="font-bold">3.2 min</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Task Success Rate:</span>
                      <span className="font-bold text-green-600">94.5%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Gift className="h-5 w-5 mr-2" />
                    Referral System
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total Referrals:</span>
                      <span className="font-bold">456</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Bonuses Paid:</span>
                      <span className="font-bold">KES 45,600</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Pending Claims:</span>
                      <span className="font-bold text-orange-600">23</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="h-5 w-5 mr-2" />
                    Security Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">High Risk Users:</span>
                      <span className="font-bold text-red-600">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Flagged Withdrawals:</span>
                      <span className="font-bold text-yellow-600">5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Fraud Prevention Rate:</span>
                      <span className="font-bold text-green-600">98.2%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="withdrawals" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search by phone number or request ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Withdrawal Requests Table */}
            <Card>
              <CardHeader>
                <CardTitle>Withdrawal Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Request ID</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Risk Level</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">
                          {request.id}
                          {request.isTrialWithdrawal && <Badge className="ml-2 bg-blue-100 text-blue-800">Trial</Badge>}
                        </TableCell>
                        <TableCell>{request.phone}</TableCell>
                        <TableCell className="font-bold">KES {request.amount}</TableCell>
                        <TableCell>{request.method}</TableCell>
                        <TableCell>
                          <Badge className={getRiskBadgeColor(request.riskLevel)}>
                            {request.riskLevel.toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusBadgeColor(request.status)}>{request.status.toUpperCase()}</Badge>
                        </TableCell>
                        <TableCell>{request.requestDate}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm" onClick={() => setSelectedUser(request)}>
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-4xl">
                                <DialogHeader>
                                  <DialogTitle>User Activity Details - {request.phone}</DialogTitle>
                                  <DialogDescription>Complete activity history and fraud analysis</DialogDescription>
                                </DialogHeader>

                                {selectedUser && (
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* User Info */}
                                    <div className="space-y-4">
                                      <div>
                                        <h4 className="font-semibold mb-2">Account Information</h4>
                                        <div className="space-y-2 text-sm">
                                          <div className="flex justify-between">
                                            <span>Phone:</span>
                                            <span className="font-medium">{selectedUser.phone}</span>
                                          </div>
                                          <div className="flex justify-between">
                                            <span>Account Age:</span>
                                            <span className="font-medium">
                                              {selectedUser.userActivity.accountAge} days
                                            </span>
                                          </div>
                                          <div className="flex justify-between">
                                            <span>Last Activity:</span>
                                            <span className="font-medium">
                                              {selectedUser.userActivity.lastActivity}
                                            </span>
                                          </div>
                                        </div>
                                      </div>

                                      <div>
                                        <h4 className="font-semibold mb-2">Financial Summary</h4>
                                        <div className="space-y-2 text-sm">
                                          <div className="flex justify-between">
                                            <span>Total Deposits:</span>
                                            <span className="font-medium text-green-600">
                                              KES {selectedUser.userActivity.totalDeposits}
                                            </span>
                                          </div>
                                          <div className="flex justify-between">
                                            <span>Total Earnings:</span>
                                            <span className="font-medium text-blue-600">
                                              KES {selectedUser.userActivity.totalEarnings}
                                            </span>
                                          </div>
                                          <div className="flex justify-between">
                                            <span>Task Earnings:</span>
                                            <span className="font-medium">
                                              KES {selectedUser.userActivity.taskEarnings}
                                            </span>
                                          </div>
                                          <div className="flex justify-between">
                                            <span>Referral Earnings:</span>
                                            <span className="font-medium">
                                              KES {selectedUser.userActivity.referralEarnings}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Activity Analysis */}
                                    <div className="space-y-4">
                                      <div>
                                        <h4 className="font-semibold mb-2">Activity Analysis</h4>
                                        <div className="space-y-2 text-sm">
                                          <div className="flex justify-between">
                                            <span>Tasks Completed:</span>
                                            <span className="font-medium">
                                              {selectedUser.userActivity.tasksCompleted}
                                            </span>
                                          </div>
                                          <div className="flex justify-between">
                                            <span>Referrals Made:</span>
                                            <span className="font-medium">
                                              {selectedUser.userActivity.referralsMade}
                                            </span>
                                          </div>
                                          <div className="flex justify-between">
                                            <span>Avg. Earning/Task:</span>
                                            <span className="font-medium">
                                              KES{" "}
                                              {(
                                                selectedUser.userActivity.taskEarnings /
                                                Math.max(selectedUser.userActivity.tasksCompleted, 1)
                                              ).toFixed(2)}
                                            </span>
                                          </div>
                                          <div className="flex justify-between">
                                            <span>Earnings/Deposits Ratio:</span>
                                            <span className="font-medium">
                                              {(
                                                (selectedUser.userActivity.totalEarnings /
                                                  selectedUser.userActivity.totalDeposits) *
                                                100
                                              ).toFixed(1)}
                                              %
                                            </span>
                                          </div>
                                        </div>
                                      </div>

                                      <div>
                                        <h4 className="font-semibold mb-2">Fraud Risk Assessment</h4>
                                        <div className="space-y-2">
                                          <div className="flex justify-between items-center">
                                            <span className="text-sm">Risk Score:</span>
                                            <Badge className={getRiskBadgeColor(selectedUser.riskLevel)}>
                                              {calculateFraudScore(selectedUser.userActivity)}%
                                            </Badge>
                                          </div>
                                          <div className="text-xs text-gray-600">
                                            {selectedUser.riskLevel === "high" &&
                                              "⚠️ High risk - Manual review required"}
                                            {selectedUser.riskLevel === "medium" &&
                                              "⚡ Medium risk - Additional verification recommended"}
                                            {selectedUser.riskLevel === "low" && "✅ Low risk - Normal processing"}
                                          </div>
                                        </div>
                                      </div>

                                      {/* Withdrawal History */}
                                      <div>
                                        <h4 className="font-semibold mb-2">Withdrawal History</h4>
                                        {selectedUser.withdrawalHistory.length > 0 ? (
                                          <div className="space-y-1">
                                            {selectedUser.withdrawalHistory.map((withdrawal, index) => (
                                              <div key={index} className="flex justify-between text-sm">
                                                <span>KES {withdrawal.amount}</span>
                                                <span className="text-gray-500">{withdrawal.date}</span>
                                              </div>
                                            ))}
                                          </div>
                                        ) : (
                                          <p className="text-sm text-gray-500">No previous withdrawals</p>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>

                            {request.status === "pending" && (
                              <>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button variant="outline" size="sm" className="text-green-600 bg-transparent">
                                      <CheckCircle className="h-4 w-4" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Approve Withdrawal</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Are you sure you want to approve this withdrawal request for KES{" "}
                                        {request.amount}?
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() => handleWithdrawalAction(request.id, "approve")}
                                        className="bg-green-600 hover:bg-green-700"
                                      >
                                        Approve
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>

                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button variant="outline" size="sm" className="text-red-600 bg-transparent">
                                      <XCircle className="h-4 w-4" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Reject Withdrawal</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Are you sure you want to reject this withdrawal request? This action cannot be
                                        undone.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() => handleWithdrawalAction(request.id, "reject")}
                                        className="bg-red-600 hover:bg-red-700"
                                      >
                                        Reject
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">User management features will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
