"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
import {
  ArrowLeft,
  Smartphone,
  Building2,
  AlertTriangle,
  CheckCircle,
  Clock,
  Home,
  FileText,
  Trophy,
  TrendingUp,
  User,
  ArrowUpRight,
  ArrowDownLeft,
  Info,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function WithdrawPage() {
  const router = useRouter()
  const [userBalance, setUserBalance] = useState(0)
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [withdrawMethod, setWithdrawMethod] = useState("")
  const [accountDetails, setAccountDetails] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [withdrawalHistory, setWithdrawalHistory] = useState([])

  // Load user balance and withdrawal history
  useEffect(() => {
    const savedBalance = localStorage.getItem("userBalance")
    const savedHistory = localStorage.getItem("withdrawalHistory")

    if (savedBalance) {
      setUserBalance(Number.parseFloat(savedBalance))
    }
    if (savedHistory) {
      setWithdrawalHistory(JSON.parse(savedHistory))
    }
  }, [])

  const processingFee = withdrawAmount ? Number.parseFloat(withdrawAmount) * 0.1 : 0
  const netAmount = withdrawAmount ? Number.parseFloat(withdrawAmount) - processingFee : 0
  const minWithdraw = 100
  const maxWithdraw = Math.min(userBalance, 5000)

  const handleWithdraw = () => {
    const amount = Number.parseFloat(withdrawAmount)

    if (amount < minWithdraw) {
      alert(`Minimum withdrawal amount is KES ${minWithdraw}`)
      return
    }

    if (amount > userBalance) {
      alert("Insufficient balance")
      return
    }

    if (!withdrawMethod || !accountDetails) {
      alert("Please fill in all withdrawal details")
      return
    }

    setIsProcessing(true)

    // Simulate processing delay
    setTimeout(() => {
      const newBalance = userBalance - amount
      const newWithdrawal = {
        id: Date.now(),
        amount: amount,
        fee: processingFee,
        netAmount: netAmount,
        method: withdrawMethod,
        account: accountDetails,
        status: "Pending",
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
      }

      // Update balance and history
      setUserBalance(newBalance)
      const updatedHistory = [newWithdrawal, ...withdrawalHistory]
      setWithdrawalHistory(updatedHistory)

      // Save to localStorage
      localStorage.setItem("userBalance", newBalance.toString())
      localStorage.setItem("withdrawalHistory", JSON.stringify(updatedHistory))

      // Reset form
      setWithdrawAmount("")
      setWithdrawMethod("")
      setAccountDetails("")
      setIsProcessing(false)

      alert(`Withdrawal request submitted! You will receive KES ${netAmount.toFixed(2)} after processing.`)
    }, 2000)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="h-4 w-4" />
      case "Pending":
        return <Clock className="h-4 w-4" />
      case "Failed":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Info className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold">Withdraw Funds</h1>
          </div>
          <div className="text-right">
            <div className="text-sm opacity-90">Available Balance</div>
            <div className="text-lg font-bold">KES {userBalance.toFixed(2)}</div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Withdrawal Form */}
        <Card>
          <CardHeader>
            <CardTitle>Withdrawal Request</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Amount Input */}
            <div className="space-y-2">
              <Label htmlFor="amount">Withdrawal Amount (KES)</Label>
              <Input
                id="amount"
                type="number"
                placeholder={`Min: ${minWithdraw}, Max: ${maxWithdraw}`}
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                min={minWithdraw}
                max={maxWithdraw}
              />
              <div className="text-xs text-gray-500">
                Minimum: KES {minWithdraw} • Maximum: KES {maxWithdraw}
              </div>
            </div>

            {/* Fee Breakdown */}
            {withdrawAmount && Number.parseFloat(withdrawAmount) > 0 && (
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Withdrawal Amount:</span>
                      <span className="font-medium">KES {Number.parseFloat(withdrawAmount).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-red-600">
                      <span>Processing Fee (10%):</span>
                      <span className="font-medium">- KES {processingFee.toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-bold text-green-600">
                      <span>You will receive:</span>
                      <span>KES {netAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Withdrawal Method */}
            <div className="space-y-2">
              <Label htmlFor="method">Withdrawal Method</Label>
              <Select value={withdrawMethod} onValueChange={setWithdrawMethod}>
                <SelectTrigger>
                  <SelectValue placeholder="Select withdrawal method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mpesa">
                    <div className="flex items-center">
                      <Smartphone className="h-4 w-4 mr-2 text-green-600" />
                      M-Pesa
                    </div>
                  </SelectItem>
                  <SelectItem value="bank">
                    <div className="flex items-center">
                      <Building2 className="h-4 w-4 mr-2 text-blue-600" />
                      Bank Transfer
                    </div>
                  </SelectItem>
                  <SelectItem value="airtel">
                    <div className="flex items-center">
                      <Smartphone className="h-4 w-4 mr-2 text-red-600" />
                      Airtel Money
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Account Details */}
            <div className="space-y-2">
              <Label htmlFor="account">
                {withdrawMethod === "mpesa" && "M-Pesa Phone Number"}
                {withdrawMethod === "airtel" && "Airtel Money Phone Number"}
                {withdrawMethod === "bank" && "Bank Account Number"}
                {!withdrawMethod && "Account Details"}
              </Label>
              <Input
                id="account"
                placeholder={
                  withdrawMethod === "mpesa"
                    ? "254712345678"
                    : withdrawMethod === "airtel"
                      ? "254712345678"
                      : withdrawMethod === "bank"
                        ? "Account number"
                        : "Enter account details"
                }
                value={accountDetails}
                onChange={(e) => setAccountDetails(e.target.value)}
              />
            </div>

            {/* Submit Button */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  className="w-full bg-green-600 hover:bg-green-700"
                  disabled={!withdrawAmount || !withdrawMethod || !accountDetails || isProcessing}
                >
                  {isProcessing ? "Processing..." : "Submit Withdrawal Request"}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirm Withdrawal</AlertDialogTitle>
                  <AlertDialogDescription>
                    <div className="space-y-2">
                      <p>Please confirm your withdrawal details:</p>
                      <div className="bg-gray-50 p-3 rounded text-sm">
                        <div>
                          <strong>Amount:</strong> KES {withdrawAmount}
                        </div>
                        <div>
                          <strong>Fee:</strong> KES {processingFee.toFixed(2)}
                        </div>
                        <div>
                          <strong>You'll receive:</strong> KES {netAmount.toFixed(2)}
                        </div>
                        <div>
                          <strong>Method:</strong> {withdrawMethod?.toUpperCase()}
                        </div>
                        <div>
                          <strong>Account:</strong> {accountDetails}
                        </div>
                      </div>
                      <p className="text-red-600 text-xs">This action cannot be undone.</p>
                    </div>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleWithdraw} className="bg-green-600 hover:bg-green-700">
                    Confirm Withdrawal
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>

        {/* Withdrawal Info */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-800 flex items-center">
              <Info className="h-5 w-5 mr-2" />
              Withdrawal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-2 text-blue-700">
            <div className="flex justify-between">
              <span>Processing Time:</span>
              <span className="font-medium">1-3 Business Days</span>
            </div>
            <div className="flex justify-between">
              <span>Processing Fee:</span>
              <span className="font-medium text-red-600">10% of withdrawal amount</span>
            </div>
            <div className="flex justify-between">
              <span>Minimum Amount:</span>
              <span className="font-medium">KES {minWithdraw}</span>
            </div>
            <div className="flex justify-between">
              <span>Daily Limit:</span>
              <span className="font-medium">KES 5,000</span>
            </div>
            <Alert className="mt-3 border-orange-200 bg-orange-50">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
              <AlertDescription className="text-orange-800 text-xs">
                Ensure your account details are correct. Incorrect details may result in failed transactions.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Withdrawal History */}
        {withdrawalHistory.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Recent Withdrawals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {withdrawalHistory.slice(0, 5).map((withdrawal) => (
                  <div key={withdrawal.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(withdrawal.status)}
                      <div>
                        <div className="font-medium">KES {withdrawal.netAmount.toFixed(2)}</div>
                        <div className="text-xs text-gray-500">
                          {withdrawal.date} • {withdrawal.method?.toUpperCase()}
                        </div>
                      </div>
                    </div>
                    <Badge className={getStatusColor(withdrawal.status)}>{withdrawal.status}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
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
          <Link href="/withdraw" className="flex flex-col items-center p-2 text-blue-600">
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
