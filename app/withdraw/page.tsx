"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function WithdrawPage() {
  const [userBalance, setUserBalance] = useState(0)
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [withdrawMethod, setWithdrawMethod] = useState("M-Pesa")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [withdrawalHistory, setWithdrawalHistory] = useState([])
  const [isProcessing, setIsProcessing] = useState(false)

  const minWithdraw = 120

  const calculateFee = (amount: number) => amount * 0.05
  const calculateNetAmount = (amount: number) => amount - calculateFee(amount)

  const canWithdraw = [3, 6].includes(new Date().getDay())

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const { data: profile } = await supabase
        .from("users")
        .select("balance, phone")
        .eq("id", user.id)
        .single()

      const { data: withdrawals } = await supabase
        .from("withdrawals")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

      setUserBalance(profile?.balance || 0)
      setPhoneNumber(profile?.phone || "")
      setWithdrawalHistory(withdrawals || [])
    }

    fetchData()
  }, [])

  const handleWithdraw = async () => {
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

    const fee = calculateFee(amount)
    const netAmount = calculateNetAmount(amount)
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      alert("User not authenticated.")
      setIsProcessing(false)
      return
    }

    const { error } = await supabase.from("withdrawals").insert([
      {
        user_id: user.id,
        amount,
        fee,
        net_amount: netAmount,
        method: withdrawMethod,
        phone: phoneNumber,
        status: "Pending",
      },
    ])

    if (error) {
      console.error("Insert error:", error)
      alert("Failed to submit withdrawal")
      setIsProcessing(false)
      return
    }

    const { error: updateError } = await supabase
      .from("users")
      .update({ balance: userBalance - amount })
      .eq("id", user.id)

    if (updateError) {
      console.error("Balance update failed:", updateError)
      alert("Withdrawal created, but balance update failed.")
    }

    setUserBalance(userBalance - amount)
    setWithdrawAmount("")
    setIsProcessing(false)
    alert(`Withdrawal request submitted! You will receive KES ${netAmount.toFixed(2)} after processing.`)
  }

  return (
    <div className="p-4 max-w-2xl mx-auto space-y-6">
      <Card>
        <CardContent className="space-y-4 p-6">
          <h2 className="text-xl font-bold">Withdraw</h2>
          <div>
            <label className="block font-medium mb-1">Withdrawal method</label>
            <Select value={withdrawMethod} onValueChange={setWithdrawMethod}>
              <SelectTrigger>
                <SelectValue placeholder="Select withdrawal method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="M-Pesa">M-Pesa</SelectItem>
                <SelectItem value="Airtel Money">Airtel Money</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block font-medium mb-1">Withdrawal wallet</label>
            <p>Commission Wallet [KES {userBalance.toFixed(2)}]</p>
          </div>
          <div>
            <label className="block font-medium mb-1">Withdrawal amount (Minimum: KES {minWithdraw})</label>
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
            <div className="grid grid-cols-3 gap-2 mt-2">
              {[120, 500, 1000, 2000, 5500, 10000, 20000, 50000, 100000, 200000, 500000].map((amount) => (
                <button
                  key={amount}
                  type="button"
                  className="bg-white border border-gray-300 rounded p-2 text-sm font-medium hover:bg-gray-100 disabled:opacity-50"
                  onClick={() => setWithdrawAmount(amount.toString())}
                  disabled={!canWithdraw}
                >
                  KES {amount}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block font-medium mb-1">Fund password</label>
            <Input id="fund-password" type="password" placeholder="Please input fund password" disabled />
          </div>
          <Button onClick={handleWithdraw} disabled={isProcessing || !canWithdraw} className="w-full">
            {isProcessing ? "Processing..." : "Submit"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Withdrawal History</h3>
          {withdrawalHistory.length === 0 ? (
            <p>No withdrawal history found.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left">Date</th>
                  <th className="text-left">Amount</th>
                  <th className="text-left">Fee</th>
                  <th className="text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {withdrawalHistory.map((w: any) => (
                  <tr key={w.id}>
                    <td>{new Date(w.created_at).toLocaleDateString()}</td>
                    <td>KES {w.amount}</td>
                    <td>KES {w.fee}</td>
                    <td>{w.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
