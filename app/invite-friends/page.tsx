"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  ArrowLeft,
  Home,
  FileText,
  Trophy,
  TrendingUp,
  User,
  ArrowUpRight,
  ArrowDownLeft,
  Share2,
  Copy,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"

export default function InviteFriendsPage() {
  const [copied, setCopied] = useState(false)
  const referralCode = "FCB123456"
  const referralLink = `https://fcbvip.com/register?ref=${referralCode}`

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareViaWhatsApp = () => {
    const message = `Join FCB VIP Intern2Days and start earning daily! Use my referral code: ${referralCode}. Register here: ${referralLink}`
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-4">
        <div className="flex items-center space-x-3">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Invite Friends</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Referral Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card>
            <CardContent className="p-3 text-center">
              <div className="text-2xl font-bold text-blue-600">5</div>
              <div className="text-xs text-gray-600">Total Referrals</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <div className="text-2xl font-bold text-green-600">3</div>
              <div className="text-xs text-gray-600">Active</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold text-purple-600">KES 450</div>
              <div className="text-xs text-gray-600">Earned</div>
            </CardContent>
          </Card>
        </div>

        {/* Referral Code */}
        <Card>
          <CardHeader>
            <CardTitle>Your Referral Code</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Input value={referralCode} readOnly className="font-mono text-lg" />
              <Button onClick={() => copyToClipboard(referralCode)} size="sm">
                {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{referralCode}</div>
              <div className="text-sm text-gray-600">Share this code with friends</div>
            </div>
          </CardContent>
        </Card>

        {/* Referral Link */}
        <Card>
          <CardHeader>
            <CardTitle>Referral Link</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Input value={referralLink} readOnly className="text-sm" />
              <Button onClick={() => copyToClipboard(referralLink)} size="sm">
                {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Share Options */}
        <Card>
          <CardHeader>
            <CardTitle>Share with Friends</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button onClick={shareViaWhatsApp} className="w-full bg-green-600 hover:bg-green-700">
              <Share2 className="h-4 w-4 mr-2" />
              Share via WhatsApp
            </Button>
            <Button onClick={() => copyToClipboard(referralLink)} variant="outline" className="w-full">
              <Copy className="h-4 w-4 mr-2" />
              Copy Referral Link
            </Button>
          </CardContent>
        </Card>

        {/* Bonus Information */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
          <CardHeader>
            <CardTitle className="text-blue-800">Referral Bonuses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Level 1 (Direct):</span>
                <span className="font-bold text-green-600">11%</span>
              </div>
              <div className="flex justify-between">
                <span>Level 2 (Indirect):</span>
                <span className="font-bold text-blue-600">3%</span>
              </div>
              <div className="flex justify-between">
                <span>Level 3 (Sub-indirect):</span>
                <span className="font-bold text-purple-600">1%</span>
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
