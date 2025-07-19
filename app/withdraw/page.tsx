"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  ArrowLeft,
  AlertCircle,
  Home,
  FileText,
  Trophy,
  TrendingUp,
  User,
  ArrowUpRight,
  ArrowDownLeft,
} from "lucide-react"
import Link from "next/link"

export default function WithdrawPage() {
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [fundPassword, setFundPassword] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("mpesa")
  const [userBalance, setUserBalance] = useState(0)

  const minWithdrawal = 120
  const processingFeeRate = 0.1 // 10% processing fee

  // Load balance from localStorage
  useEffect(() => {
    const savedBalance = localStorage.getItem("userBalance")
    if (savedBalance) {
      setUserBalance(Number.parseFloat(savedBalance))
    }
  }, [])

  const quickAmounts = [
    [120, 500, 1000, 2000],
    [5000, 10000, 20000, 50000],
    [100000, 200000, 500000],
  ]

  const handleQuickAmount = (amount: number) => {
    setWithdrawAmount(amount.toString())
  }

  const calculateNetAmount = (amount: number) => {
    const fee = amount * processingFeeRate
    return amount - fee
  }

  const calculateFee = (amount: number) => {
    return amount * processingFeeRate
  }

  const handleWithdraw = () => {
    const amount = Number.parseFloat(withdrawAmount)

    if (!withdrawAmount || amount < minWithdrawal) {
      alert(`Minimum withdrawal amount is KES ${minWithdrawal}`)
      return
    }

    if (amount > userBalance) {
      alert("Insufficient balance")
      return
    }

    if (!fundPassword) {
      alert("Please enter fund password")
      return
    }

    const fee = calculateFee(amount)
    const netAmount = calculateNetAmount(amount)

    // Process withdrawal
    console.log("Processing withdrawal:", {
      grossAmount: amount,
      processingFee: fee,
      netAmount: netAmount,
      method: paymentMethod,
      password: fundPassword,
    })

    alert(
      `Withdrawal request submitted!\nGross Amount: KES ${amount}\nProcessing Fee (10%): KES ${fee.toFixed(2)}\nNet Amount: KES ${netAmount.toFixed(2)}`,
    )
  }

  const currentAmount = Number.parseFloat(withdrawAmount) || 0
  const currentFee = calculateFee(currentAmount)
  const currentNetAmount = calculateNetAmount(currentAmount)

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
          <h1 className="text-xl font-bold">Withdraw</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Payment Method */}
        <div className="space-y-2">
          <Select value={paymentMethod} onValueChange={setPaymentMethod}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select payment method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mpesa">M-Pesa</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Withdrawal Wallet */}
        <Card>
          <CardHeader>
            <CardTitle>Withdrawal wallet</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              <div className="text-lg font-bold mb-1">Commission Wallet [0.00]</div>
              <div className="text-gray-600">Current wallet balance: KES {userBalance.toFixed(2)}</div>
            </div>
          </CardContent>
        </Card>

        {/* Withdrawal Amount */}
        <div className="space-y-4">
          <Label className="text-lg font-semibold">Withdrawal amount</Label>

          {/* Amount Input */}
          <Input
            type="number"
            placeholder="Enter amount"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
            className="text-lg p-4"
          />

          {/* Fee Calculation Display */}
          {currentAmount > 0 && (
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Withdrawal Amount:</span>
                    <span className="font-medium">KES {currentAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-red-600">
                    <span>Processing Fee (10%):</span>
                    <span className="font-medium">- KES {currentFee.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-bold text-green-600">
                    <span>Net Amount:</span>
                    <span>KES {currentNetAmount.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Amount Selection */}
          <div className="space-y-3">
            {quickAmounts.map((row, rowIndex) => (
              <div key={rowIndex} className="grid grid-cols-4 gap-3">
                {row.map((amount) => (
                  <Button
                    key={amount}
                    variant="outline"
                    className="h-12 text-sm font-medium bg-transparent"
                    onClick={() => handleQuickAmount(amount)}
                  >
                    {amount.toLocaleString()}
                  </Button>
                ))}
              </div>
            ))}
          </div>

          <div className="text-sm text-gray-600">Minimum withdrawal: KES {minWithdrawal}</div>
        </div>

        {/* Fund Password */}
        <div className="space-y-2">
          <Label className="text-lg font-semibold">Fund password</Label>
          <Input
            type="password"
            placeholder="Please input fund password"
            value={fundPassword}
            onChange={(e) => setFundPassword(e.target.value)}
            className="text-lg p-4"
          />
        </div>

        {/* Submit Button */}
        <Button
          className="w-full bg-orange-500 hover:bg-orange-600 text-white text-lg py-4 mt-6"
          onClick={handleWithdraw}
        >
          Submit
        </Button>

        {/* Info Alert */}
        {userBalance < minWithdrawal && (
          <Alert className="border-orange-200 bg-orange-50">
            <AlertCircle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              Insufficient balance. Complete tasks to earn more before withdrawing.
            </AlertDescription>
          </Alert>
        )}

        {/* Withdrawal Schedule */}
        <Card>
          <CardHeader>
            <CardTitle>Withdrawal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Processing Hours:</span>
                <span className="font-medium">Monday to Saturday</span>
              </div>
              <div className="flex justify-between">
                <span>Processing Time:</span>
                <span className="font-medium">9:30 AM to 5:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Processing Fee:</span>
                <span className="font-medium text-red-600">10% of withdrawal amount</span>
              </div>
              <div className="flex justify-between">
                <span>Admin Contact:</span>
                <span className="font-medium">George Wiswa - 0782192086</span>
              </div>
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
            <span className="text-xs mt-1">My</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
