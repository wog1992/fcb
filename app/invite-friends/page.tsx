"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
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
  Gift,
  Lock,
  Unlock,
} from "lucide-react"
import Link from "next/link"
import { ReferralSystem } from "@/lib/referral-system"

export default function InviteFriendsPage() {
  const [copied, setCopied] = useState(false)
  const [referralCode, setReferralCode] = useState("")
  const [referralLink, setReferralLink] = useState("")
  const [referralStatus, setReferralStatus] = useState({
    hasInvited: false,
    invitedUsers: [],
    canClaim: false,
    totalEarnings: 0,
  })
  const [claimCode, setClaimCode] = useState("")
  const [showClaimDialog, setShowClaimDialog] = useState(false)

  useEffect(() => {
    // Get or generate referral code
    let userReferralCode = localStorage.getItem("userReferralCode")
    if (!userReferralCode) {
      userReferralCode = ReferralSystem.generateReferralCode()
      localStorage.setItem("userReferralCode", userReferralCode)
    }

    setReferralCode(userReferralCode)

    // Create referral link with current domain
    const currentDomain = window.location.origin
    const link = `${currentDomain}/register?ref=${userReferralCode}`
    setReferralLink(link)

    // Get referral status
    const status = ReferralSystem.getReferralStatus(userReferralCode)
    setReferralStatus(status)
  }, [])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareViaWhatsApp = () => {
    const message = `🎉 Join FCB VIP Intern2Days and start earning daily! 💰

✅ Earn KES 70 per task completed
✅ Daily earning opportunities  
✅ Instant withdrawals
✅ Referral bonuses up to KES 150

Use my referral code: ${referralCode}
Register here: ${referralLink}

Start earning today! 🚀`

    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank")
  }

  const shareViaTwitter = () => {
    const message = `Join FCB VIP Intern2Days! Earn KES 70 per task. Use my referral code: ${referralCode} ${referralLink}`
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`, "_blank")
  }

  const shareViaFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`, "_blank")
  }

  const shareViaTelegram = () => {
    const message = `Join FCB VIP Intern2Days and earn daily! Use referral code: ${referralCode} ${referralLink}`
    window.open(
      `https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent(message)}`,
      "_blank",
    )
  }

  const handleClaimBonus = () => {
    const result = ReferralSystem.claimReferralBonus(referralCode, claimCode)

    if (result.success) {
      alert(result.message)
      // Refresh referral status
      const updatedStatus = ReferralSystem.getReferralStatus(referralCode)
      setReferralStatus(updatedStatus)
      setShowClaimDialog(false)
      setClaimCode("")
    } else {
      alert(result.message)
    }
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
              <div className="text-2xl font-bold text-blue-600">{referralStatus.invitedUsers.length}</div>
              <div className="text-xs text-gray-600">Total Referrals</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <div className="text-2xl font-bold text-green-600">
                {referralStatus.invitedUsers.filter((user) => user.isActive).length}
              </div>
              <div className="text-xs text-gray-600">Active</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold text-purple-600">KES {referralStatus.totalEarnings}</div>
              <div className="text-xs text-gray-600">Available</div>
            </CardContent>
          </Card>
        </div>

        {/* Claim Bonus Section */}
        {referralStatus.hasInvited && (
          <Card
            className={`${referralStatus.canClaim ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"}`}
          >
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                {referralStatus.canClaim ? (
                  <Unlock className="h-5 w-5 text-green-600" />
                ) : (
                  <Lock className="h-5 w-5 text-gray-400" />
                )}
                <span>Referral Bonus</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">KES {referralStatus.totalEarnings}</div>
                  <div className="text-sm text-gray-600">
                    {referralStatus.canClaim ? "Ready to claim!" : "Already claimed or no referrals"}
                  </div>
                </div>

                {referralStatus.canClaim && (
                  <Dialog open={showClaimDialog} onOpenChange={setShowClaimDialog}>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        <Gift className="h-4 w-4 mr-2" />
                        Claim Bonus
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Claim Referral Bonus</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="text-center">
                          <div className="text-xl font-bold text-green-600">KES {referralStatus.totalEarnings}</div>
                          <div className="text-sm text-gray-600">Available to claim</div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Enter your referral code to claim:</label>
                          <Input
                            value={claimCode}
                            onChange={(e) => setClaimCode(e.target.value.toUpperCase())}
                            placeholder="Enter referral code"
                            className="text-center font-mono"
                          />
                        </div>
                        <Button
                          onClick={handleClaimBonus}
                          className="w-full bg-green-600 hover:bg-green-700"
                          disabled={!claimCode}
                        >
                          Claim KES {referralStatus.totalEarnings}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </CardContent>
          </Card>
        )}

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

            <div className="grid grid-cols-2 gap-3">
              <Button onClick={shareViaTelegram} variant="outline" className="w-full bg-transparent">
                <Share2 className="h-4 w-4 mr-2" />
                Telegram
              </Button>
              <Button onClick={shareViaTwitter} variant="outline" className="w-full bg-transparent">
                <Share2 className="h-4 w-4 mr-2" />
                Twitter
              </Button>
            </div>

            <Button onClick={() => copyToClipboard(referralLink)} variant="outline" className="w-full">
              <Copy className="h-4 w-4 mr-2" />
              Copy Referral Link
            </Button>
          </CardContent>
        </Card>

        {/* Invited Users List */}
        {referralStatus.invitedUsers.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Your Referrals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {referralStatus.invitedUsers.map((user, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <div>
                      <div className="font-medium">{user.phone}</div>
                      <div className="text-xs text-gray-600">Joined: {user.joinDate}</div>
                    </div>
                    <div
                      className={`px-2 py-1 rounded text-xs ${user.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}`}
                    >
                      {user.isActive ? "Active" : "Inactive"}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Bonus Information */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
          <CardHeader>
            <CardTitle className="text-blue-800">How Referral Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Per Successful Referral:</span>
                <span className="font-bold text-green-600">KES 150</span>
              </div>
              <div className="text-xs text-gray-600 space-y-1">
                <p>• Share your referral code or link</p>
                <p>• Friend registers using your code</p>
                <p>• You earn KES 150 per active referral</p>
                <p>• Claim bonus using your referral code</p>
                <p>• Bonus can only be claimed once</p>
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
