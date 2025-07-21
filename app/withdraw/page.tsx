"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
  CreditCard,
  CheckCircle,
  Clock,
  AlertTriangle,
  Calendar,
  Info,
} from "lucide-react"
import Link from "next/link"

export default function WithdrawPage() {
  const [userBalance, setUserBalance] = useState(0)
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [withdrawMethod, setWithdrawMethod] = useState("mpesa")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [withdrawalHistory, setWithdrawalHistory] = useState([])
  const [canWithdraw, setCanWithdraw] = useState(false)
  const [nextWithdrawDate, setNextWithdrawDate] = useState("")

  const minWithdraw = 120 // Updated minimum withdrawal limit
  const processingFee = 0.1 // 10% processing fee

  useEffect(() => {
    // Load user data
    const savedBalance = localStorage.getItem("userBalance")
    const savedHistory = localStorage.getItem("withdrawalHistory")
    const savedPhone = localStorage.getItem("userPhone")

    if (savedBalance) {
      setUserBalance(Number.parseFloat(savedBalance))
    }
    if (savedHistory) {
      setWithdrawalHistory(JSON.parse(savedHistory))
    }
    if (savedPhone) {
      setPhoneNumber(savedPhone)
    }

    // Check if today is Wednesday (3) or Saturday (6)
    const today = new Date()
    const dayOfWeek = today.getDay()
    const isWithdrawDay = dayOfWeek === 3 || dayOfWeek === 6 // Wednesday or Saturday

    setCanWithdraw(isWithdrawDay)

    // Calculate next withdrawal date
    if (!isWithdrawDay) {
      const daysUntilNext = dayOfWeek < 3 ? 3 - dayOfWeek : dayOfWeek < 6 ? 6 - dayOfWeek : 7 - dayOfWeek + 3
      const nextDate = new Date(today)
      nextDate.setDate(today.getDate() + daysUntilNext)
      setNextWithdrawDate(nextDate.toLocaleDateString())
    }
  }, [])

  const calculateFee = (amount) => {
    return amount * processingFee
  }

  const calculateNetAmount = (amount) => {
    return amount - calculateFee(amount)
  }

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

    if (!canWithdraw) {
      alert("Withdrawals are only available on Wednesdays and Saturdays")
      return
    }

    setIsProcessing(true)

    // Simulate processing
    setTimeout(() => {
      const fee = calculateFee(amount)
      const netAmount = calculateNetAmount(amount)

      const newWithdrawal = {
        id: Date.now(),
        amount: amount,
        fee: fee,
        netAmount: netAmount,
        method: withdrawMethod,
        phone: phoneNumber,
        status: "Pending",
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
      }

      // Update history
      const updatedHistory = [newWithdrawal, ...withdrawalHistory]
      setWithdrawalHistory(updatedHistory)

      // Update balance (deduct gross amount)
      const newBalance = userBalance - amount
      setUserBalance(newBalance)

      // Save to localStorage
      localStorage.setItem("userBalance", newBalance.toString())
      localStorage.setItem("withdrawalHistory", JSON.stringify(updatedHistory))

      // Reset form
      setWithdrawAmount("")
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
        return <Clock className="h-4 w-4" />
    }
  }

  const grossAmount = Number.parseFloat(withdrawAmount) || 0
  const feeAmount = calculateFee(grossAmount)
  const netAmount = calculateNetAmount(grossAmount)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <img src="/fcb-logo.jpg" alt="FCB Logo" className="h-8 w-8 rounded" />
              <h1 className="text-xl font-bold">Withdraw Funds</h1>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm opacity-90">Available Balance</div>
            <div className="text-lg font-bold">KES {userBalance.toFixed(2)}</div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Withdrawal Schedule Alert */}
        <Card className={`${canWithdraw ? "bg-green-50 border-green-200" : "bg-orange-50 border-orange-200"}`}>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Calendar className={`h-5 w-5 ${canWithdraw ? "text-green-600" : "text-orange-600"}`} />
              <div>
                {canWithdraw ? (
                  <div>
                    <div className="font-bold text-green-800">✅ Withdrawal Available Today</div>
                    <div className="text-sm text-green-600">You can withdraw funds today (Wednesday/Saturday)</div>
                  </div>
                ) : (
                  <div>
                    <div className="font-bold text-orange-800">⏰ Withdrawal Not Available</div>
                    <div className="text-sm text-orange-600">
                      Next withdrawal date: <strong>{nextWithdrawDate}</strong> (Wednesday/Saturday only)
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Withdrawal Form */}
        <Card>
          <CardHeader>
            <CardTitle>Withdrawal Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Amount Input */}
            <div className="space-y-2">
              <Label htmlFor="amount">Withdrawal Amount (KES)</Label>
              <Input
                id="amount"
                type="number"
                placeholder={`Minimum: ${minWithdraw}`}
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                min={minWithdraw}
                max={userBalance}
                disabled={!canWithdraw}
              />
              <div className="text-xs text-gray-500">
                Minimum: KES {minWithdraw} • Available: KES {userBalance.toFixed(2)}
              </div>
            </div>

            {/* Live Fee Calculation */}
            {grossAmount >= minWithdraw && (
              <div className="bg-blue-50 p-4 rounded-lg space-y-2">
                <h4 className="font-medium text-blue-800">Withdrawal Breakdown</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Gross Amount:</span>
                    <span className="font-medium">KES {grossAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-red-600">
                    <span>Processing Fee (10%):</span>
                    <span className="font-medium">- KES {feeAmount.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-1 flex justify-between font-bold text-green-600">
                    <span>Net Amount:</span>
                    <span>KES {netAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Payment Method */}
            <div className="space-y-2">
              <Label>Withdrawal Method</Label>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={withdrawMethod === "mpesa" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setWithdrawMethod("mpesa")}
                  disabled={!canWithdraw}
                >
                  <Smartphone className="h-4 w-4 mr-1" />
                  M-Pesa
                </Button>
                <Button
                  variant={withdrawMethod === "bank" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setWithdrawMethod("bank")}
                  disabled={!canWithdraw}
                >
                  <Building2 className="h-4 w-4 mr-1" />
                  Bank
                </Button>
                <Button
                  variant={withdrawMethod === "card" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setWithdrawMethod("card")}
                  disabled={!canWithdraw}
                >
                  <CreditCard className="h-4 w-4 mr-1" />
                  Card
                </Button>
              </div>
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <Label htmlFor="phone">
                {withdrawMethod === "mpesa" && "M-Pesa Phone Number"}
                {withdrawMethod === "bank" && "Phone Number"}
                {withdrawMethod === "card" && "Phone Number"}
              </Label>
              <Input
                id="phone"
                placeholder="254712345678"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                disabled={!canWithdraw}
              />
            </div>

            {/* Submit Button */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={
                    !canWithdraw ||
                    !withdrawAmount ||
                    Number.parseFloat(withdrawAmount) < minWithdraw ||
                    !phoneNumber ||
                    isProcessing
                  }
                >
                  {isProcessing ? "Processing..." : `Withdraw KES ${netAmount.toFixed(2)}`}
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
                          <strong>Gross Amount:</strong> KES {grossAmount.toFixed(2)}
                        </div>
                        <div className="text-red-600">
                          <strong>Processing Fee:</strong> KES {feeAmount.toFixed(2)} (10%)
                        </div>
                        <div className="text-green-600 font-bold">
                          <strong>Net Amount:</strong> KES {netAmount.toFixed(2)}
                        </div>
                        <div>
                          <strong>Method:</strong> {withdrawMethod.toUpperCase()}
                        </div>
                        <div>
                          <strong>Phone:</strong> {phoneNumber}
                        </div>
                      </div>
                    </div>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleWithdraw} className="bg-blue-600 hover:bg-blue-700">
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
              <span>Withdrawal Days:</span>
              <span className="font-medium">Wednesday & Saturday</span>
            </div>
            <div className="flex justify-between">
              <span>Processing Time:</span>
              <span className="font-medium">1-24 hours</span>
            </div>
            <div className="flex justify-between">
              <span>Minimum Amount:</span>
              <span className="font-medium">KES {minWithdraw}</span>
            </div>
            <div className="flex justify-between">
              <span>Processing Fee:</span>
              <span className="font-medium">10%</span>
            </div>
            <Alert className="mt-3 border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800 text-xs">
                All withdrawals are processed securely within 24 hours on withdrawal days.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Withdrawal History */}
        {withdrawalHistory.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Withdrawal History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Gross Amount</TableHead>
                      <TableHead>Fee</TableHead>
                      <TableHead>Net Amount</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {withdrawalHistory.map((withdrawal) => (
                      <TableRow key={withdrawal.id}>
                        <TableCell className="text-sm">{withdrawal.date}</TableCell>
                        <TableCell className="font-medium">KES {withdrawal.amount.toFixed(2)}</TableCell>
                        <TableCell className="text-red-600">KES {withdrawal.fee.toFixed(2)}</TableCell>
                        <TableCell className="font-bold text-green-600">
                          KES {withdrawal.netAmount.toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{withdrawal.method.toUpperCase()}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(withdrawal.status)}>
                            <div className="flex items-center space-x-1">
                              {getStatusIcon(withdrawal.status)}
                              <span className="text-xs">{withdrawal.status}</span>
                            </div>
                            <div class="section">
                                <label class="label">Withdrawal amount (Minimum: 120)</label>
                                    <div class="amount-grid">
                                          <div class="amount-btn">120</div>
                                                <div class="amount-btn">500</div>
                                                      <div class="amount-btn">1000</div>
                                                            <div class="amount-btn">2000</div>
                                                                  <div class="amount-btn">5500</div>
                                                                        <div class="amount-btn">10000</div>
                                                                              <div class="amount-btn">20000</div>
                                                                                    <div class="amount-btn">50000</div>
                                                                                          <div class="amount-btn">100000</div>
                                                                                                <div class="amount-btn">200000</div>
                                                                                                      <div class="amount-btn">500000</div>
                                                                                                          </div>
                                                                                                            </div>
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
