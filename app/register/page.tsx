"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, RefreshCw } from "lucide-react"
import Link from "next/link"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
    confirmPassword: "",
    verificationCode: "",
    referralCode: "4426140",
  })

  const generateVerificationCode = () => {
    return Math.floor(1000 + Math.random() * 9000).toString()
  }

  const [verificationCode] = useState(generateVerificationCode())

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <span className="text-white ml-4">Choose language</span>
        </div>

        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">IPG</h1>
        </div>

        <Card className="backdrop-blur-sm bg-white/95">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Register</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reg-phone">Phone Number</Label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  +254
                </span>
                <Input
                  id="reg-phone"
                  placeholder="Please enter your phone number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="rounded-l-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reg-password">Password</Label>
              <Input
                id="reg-password"
                type="password"
                placeholder="Please enter the login password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="Please confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="verification">Verification Code</Label>
              <div className="flex space-x-2">
                <Input
                  id="verification"
                  placeholder="Please enter the verification code"
                  value={formData.verificationCode}
                  onChange={(e) => setFormData({ ...formData, verificationCode: e.target.value })}
                  className="flex-1"
                />
                <div className="flex items-center space-x-1 px-3 py-2 bg-gray-100 rounded border text-sm">
                  <span>{verificationCode}</span>
                  <RefreshCw className="h-4 w-4 text-gray-500" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="referral">Referral Code</Label>
              <Input
                id="referral"
                value={formData.referralCode}
                onChange={(e) => setFormData({ ...formData, referralCode: e.target.value })}
                className="bg-gray-50"
              />
            </div>

            <Button className="w-full bg-gradient-to-r from-orange-500 to-blue-500 hover:from-orange-600 hover:to-blue-600">
              Register now
            </Button>

            <Button variant="outline" className="w-full bg-transparent" asChild>
              <Link href="/">Have an account, download now</Link>
            </Button>

            <div className="text-center">
              <Link href="/" className="text-sm text-blue-600 hover:underline">
                Back to login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
