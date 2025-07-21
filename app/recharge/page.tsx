"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Copy, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function RechargePage() {
  const [selectedPackage, setSelectedPackage] = useState("")
  const [mpesaMessage, setMpesaMessage] = useState("")
  const [copied, setCopied] = useState(false)

  const adminPhone = "0782192086"
  const adminName = "George Wiswa"

  const packages = [
    { id: "j1", name: "J1", amount: 100, daily: 60 },
    { id: "j2", name: "J2", amount: 5400, daily: 180 },
    { id: "j3", name: "J3", amount: 10500, daily: 350 },
    { id: "j4", name: "J4", amount: 18000, daily: 600 },
    { id: "j5", name: "J5", amount: 39000, daily: 1300 },
    { id: "j6", name: "J6", amount: 96000, daily: 3200 },
  ]

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSubmitDeposit = () => {
    if (!selectedPackage || !mpesaMessage.trim()) {
      alert("Please select a package and paste your M-Pesa message")
      return
    }

    // Store the pending package and message for admin approval
    const depositRequest = {
      id: Date.now().toString(),
      package: selectedPackage,
      packageName: packages.find((p) => p.id === selectedPackage)?.name,
      amount: packages.find((p) => p.id === selectedPackage)?.amount,
      mpesaMessage: mpesaMessage,
      status: "Pending Admin Confirmation",
      date: new Date().toISOString(),
      adminPhone: adminPhone,
      adminName: adminName,
    }

    // Save to localStorage for admin review
    const existingRequests = JSON.parse(localStorage.getItem("depositRequests") || "[]")
    existingRequests.push(depositRequest)
    localStorage.setItem("depositRequests", JSON.stringify(existingRequests))
    localStorage.setItem("awaitingAdminConfirmation", "true")

    console.log("Submitting deposit:", { selectedPackage, mpesaMessage })
    alert("Deposit request submitted! Admin will verify and approve shortly.")

    // Reset form
    setSelectedPackage("")
    setMpesaMessage("")
  }

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
          <div className="flex items-center space-x-2">
            <img src="/fcb-logo.jpg" alt="FCB Logo" className="h-8 w-8 rounded" />
            <h1 className="text-xl font-bold">Recharge</h1>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Admin Payment Info */}
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-800">Payment Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white rounded-lg">
              <div>
                <div className="font-medium">Admin Name</div>
                <div className="text-lg font-bold text-green-600">{adminName}</div>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-white rounded-lg">
              <div>
                <div className="font-medium">M-Pesa Number</div>
                <div className="text-lg font-bold text-green-600">{adminPhone}</div>
              </div>
              <Button size="sm" variant="outline" onClick={() => copyToClipboard(adminPhone)}>
                {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Package Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Select Investment Package</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                    selectedPackage === pkg.id ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedPackage(pkg.id)}
                >
                  <div className="text-center">
                    <Badge className="mb-2">{pkg.name}</Badge>
                    <div className="font-bold text-lg">KES {pkg.amount.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Daily: KES {pkg.daily}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Instructions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Step 1: Send M-Pesa Payment</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>Go to M-Pesa on your phone</li>
                <li>Select "Send Money"</li>
                <li>
                  Enter: <strong>{adminPhone}</strong>
                </li>
                <li>Enter the amount for your selected package</li>
                <li>Complete the transaction</li>
              </ol>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Step 2: Submit Confirmation</h4>
              <p className="text-sm">After sending money, paste the M-Pesa confirmation message below and submit.</p>
            </div>
          </CardContent>
        </Card>

        {/* M-Pesa Message Input */}
        <Card>
          <CardHeader>
            <CardTitle>M-Pesa Confirmation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="mpesa-message">Paste M-Pesa Message</Label>
              <Textarea
                id="mpesa-message"
                placeholder="Paste your complete M-Pesa confirmation message here...

Example: 'QGH7K8L9M0 Confirmed. You have sent KES5,400.00 to GEORGE WISWA 0782192086 on 19/1/25 at 2:30 PM. New M-Pesa balance is KES15,600.00. Transaction cost KES0.00. Amount you can transact within the day is 299,600.00.'"
                value={mpesaMessage}
                onChange={(e) => setMpesaMessage(e.target.value)}
                rows={8}
                className="min-h-[150px] font-mono text-sm"
              />
              <div className="grid grid-cols-1 gap-2 text-xs text-gray-600">
                <div className="bg-green-50 p-2 rounded">
                  <strong>✓ Include:</strong> Transaction code, amount, recipient name, date, time
                </div>
                <div className="bg-blue-50 p-2 rounded">
                  <strong>📱 How to find:</strong> Check your SMS messages after sending M-Pesa
                </div>
                <div className="bg-orange-50 p-2 rounded">
                  <strong>⚠️ Important:</strong> Message must match the selected package amount
                </div>
              </div>
            </div>

            <Button
              className="w-full bg-green-600 hover:bg-green-700"
              onClick={handleSubmitDeposit}
              disabled={!selectedPackage || !mpesaMessage.trim()}
            >
              Submit Deposit Request
            </Button>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <Card>
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium">Customer Care:</span>
                <a
                  href="https://t.me/Carefbc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline ml-2"
                >
                  t.me/Carefbc
                </a>
              </div>
              <div>
                <span className="font-medium">Admin Contact:</span>
                <span className="ml-2">
                  {adminName} - {adminPhone}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
