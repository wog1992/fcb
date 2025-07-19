"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  ArrowLeft,
  Share2,
  Copy,
  Users,
  Gift,
  MessageCircle,
  Send,
  Twitter,
  Facebook,
  Home,
  FileText,
  Trophy,
  TrendingUp,
  User,
  ArrowUpRight,
  ArrowDownLeft,
  Lock,
  Unlock,
  CheckCircle,
  AlertTriangle,
} from "lucide-react"
import Link from "next/link"

export default function InviteFriendsPage() {
  const [userReferralCode, setUserReferralCode] = useState("FCB123456")
  const [referralLink, setReferralLink] = useState("")
  const [invitedUsers, setInvitedUsers] = useState([])
  const [referralEarnings, setReferralEarnings] = useState(0)
  const [hasClaimedBonus, setHasClaimedBonus] = useState(false)
  const [showClaimDialog, setShowClaimDialog] = useState(false)
  const [referralCodeInput, setReferralCodeInput] = useState("")
  const [copySuccess, setCopySuccess] = useState(false)

  useEffect(() => {
    // Generate referral link with current domain
    const currentDomain = window.location.origin
    const link = `${currentDomain}/register?ref=${userReferralCode}`
    setReferralLink(link)

    // Load data from localStorage
    const savedReferralCode = localStorage.getItem("userReferralCode")
    const savedInvitedUsers = localStorage.getItem("invitedUsers")
    const savedReferralEarnings = localStorage.getItem("referralEarnings")
    const savedHasClaimedBonus = localStorage.getItem("hasClaimedReferralBonus")

    if (savedReferralCode) {
      setUserReferralCode(savedReferralCode)
      const newLink = `${currentDomain}/register?ref=${savedReferralCode}`
      setReferralLink(newLink)
    }
    if (savedInvitedUsers) {
      const users = JSON.parse(savedInvitedUsers)
      setInvitedUsers(users.filter((user) => user.referrerCode === (savedReferralCode || userReferralCode)))
    }
    if (savedReferralEarnings) {
      setReferralEarnings(Number.parseFloat(savedReferralEarnings))
    }
    if (savedHasClaimedBonus) {
      setHasClaimedBonus(JSON.parse(savedHasClaimedBonus))
    }
  }, [userReferralCode])

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea")
      textArea.value = text
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand("copy")
      document.body.removeChild(textArea)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    }
  }

  const shareViaWhatsApp = () => {
    const message = `🚀 Join FCB VIP Intern2Days and start earning money online!

💰 Complete simple tasks and earn KES 70 each
🎯 Get paid daily for easy work
📱 Work from your phone anywhere
🎁 Use my referral code: ${userReferralCode}

Join now: ${referralLink}

#MakeMoneyOnline #FCBIntern #EarnDaily`

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const shareViaTelegram = () => {
    const message = `🚀 Join FCB VIP Intern2Days and start earning!

💰 Earn KES 70 per task
🎁 Use my code: ${userReferralCode}

${referralLink}`

    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent(message)}`
    window.open(telegramUrl, "_blank")
  }

  const shareViaTwitter = () => {
    const message = `🚀 Join FCB VIP Intern2Days and start earning money online! 💰 Use my referral code: ${userReferralCode}`
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(referralLink)}`
    window.open(twitterUrl, "_blank")
  }

  const shareViaFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`
    window.open(facebookUrl, "_blank")
  }

  const claimReferralBonus = () => {
    if (referralCodeInput !== userReferralCode) {
      alert("Invalid referral code! Please enter your own referral code.")
      return
    }

    if (invitedUsers.length === 0) {
      alert("You haven't invited anyone yet!")
      return
    }

    if (hasClaimedBonus) {
      alert("You have already claimed your referral bonus!")
      return
    }

    // Calculate bonus (KES 150 per referral)
    const bonusAmount = invitedUsers.length * 150
    const currentBalance = Number.parseFloat(localStorage.getItem("userBalance") || "0")
    const newBalance = currentBalance + bonusAmount
    const newReferralEarnings = referralEarnings + bonusAmount

    // Update localStorage
    localStorage.setItem("userBalance", newBalance.toString())
    localStorage.setItem("referralEarnings", newReferralEarnings.toString())
    localStorage.setItem("hasClaimedReferralBonus", "true")

    // Update state
    setReferralEarnings(newReferralEarnings)
    setHasClaimedBonus(true)
    setShowClaimDialog(false)
    setReferralCodeInput("")

    alert(`🎉 Congratulations! You earned KES ${bonusAmount} from ${invitedUsers.length} referral(s)!`)
  }

  const canClaimBonus = invitedUsers.length > 0 && !hasClaimedBonus

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold">Invite Friends</h1>
          </div>
          <div className="text-right">
            <div className="text-sm opacity-90">Referral Earnings</div>
            <div className="text-lg font-bold">KES {referralEarnings.toFixed(2)}</div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Referral Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">{invitedUsers.length}</div>
              <div className="text-sm opacity-90">Friends Invited</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
            <CardContent className="p-4 text-center">
              <Gift className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">KES {(invitedUsers.length * 150).toFixed(0)}</div>
              <div className="text-sm opacity-90">Potential Earnings</div>
            </CardContent>
          </Card>
        </div>

        {/* Referral Code */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Share2 className="h-5 w-5 mr-2" />
              Your Referral Code
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Referral Code</Label>
              <div className="flex space-x-2">
                <Input value={userReferralCode} readOnly className="font-mono text-lg" />
                <Button
                  variant="outline"
                  onClick={() => copyToClipboard(userReferralCode)}
                  className={copySuccess ? "bg-green-100 text-green-700" : ""}
                >
                  {copySuccess ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Referral Link</Label>
              <div className="flex space-x-2">
                <Input value={referralLink} readOnly className="text-sm" />
                <Button
                  variant="outline"
                  onClick={() => copyToClipboard(referralLink)}
                  className={copySuccess ? "bg-green-100 text-green-700" : ""}
                >
                  {copySuccess ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {copySuccess && (
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  Copied to clipboard! Share it with your friends.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Share Options */}
        <Card>
          <CardHeader>
            <CardTitle>Share with Friends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button onClick={shareViaWhatsApp} className="bg-green-600 hover:bg-green-700">
                <MessageCircle className="h-4 w-4 mr-2" />
                WhatsApp
              </Button>
              <Button onClick={shareViaTelegram} className="bg-blue-500 hover:bg-blue-600">
                <Send className="h-4 w-4 mr-2" />
                Telegram
              </Button>
              <Button onClick={shareViaTwitter} className="bg-sky-500 hover:bg-sky-600">
                <Twitter className="h-4 w-4 mr-2" />
                Twitter
              </Button>
              <Button onClick={shareViaFacebook} className="bg-blue-700 hover:bg-blue-800">
                <Facebook className="h-4 w-4 mr-2" />
                Facebook
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Referral Bonus */}
        <Card
          className={`${canClaimBonus ? "bg-green-50 border-green-200" : hasClaimedBonus ? "bg-gray-50 border-gray-200" : "bg-orange-50 border-orange-200"}`}
        >
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <Gift className="h-5 w-5 mr-2" />
                Referral Bonus
              </span>
              {canClaimBonus ? (
                <Unlock className="h-5 w-5 text-green-600" />
              ) : (
                <Lock className="h-5 w-5 text-gray-500" />
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">KES {(invitedUsers.length * 150).toFixed(2)}</div>
                <div className="text-sm text-gray-600">{invitedUsers.length} referral(s) × KES 150 each</div>
              </div>

              {hasClaimedBonus ? (
                <Alert className="border-gray-200 bg-gray-50">
                  <CheckCircle className="h-4 w-4 text-gray-600" />
                  <AlertDescription className="text-gray-700">
                    You have already claimed your referral bonus of KES {referralEarnings.toFixed(2)}
                  </AlertDescription>
                </Alert>
              ) : invitedUsers.length === 0 ? (
                <Alert className="border-orange-200 bg-orange-50">
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                  <AlertDescription className="text-orange-800">
                    Invite friends using your referral link to unlock bonus earnings!
                  </AlertDescription>
                </Alert>
              ) : (
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    Great! You can now claim your referral bonus. Enter your referral code to unlock.
                  </AlertDescription>
                </Alert>
              )}

              <Dialog open={showClaimDialog} onOpenChange={setShowClaimDialog}>
                <DialogTrigger asChild>
                  <Button className="w-full" disabled={!canClaimBonus} variant={canClaimBonus ? "default" : "outline"}>
                    {hasClaimedBonus
                      ? "Bonus Already Claimed"
                      : canClaimBonus
                        ? "Claim Referral Bonus"
                        : "No Referrals Yet"}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="flex items-center">
                      <Gift className="h-5 w-5 mr-2 text-green-600" />
                      Claim Referral Bonus
                    </DialogTitle>
                    <DialogDescription>
                      Enter your referral code to claim KES {(invitedUsers.length * 150).toFixed(2)} bonus
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="claimCode">Your Referral Code</Label>
                      <Input
                        id="claimCode"
                        value={referralCodeInput}
                        onChange={(e) => setReferralCodeInput(e.target.value)}
                        placeholder="Enter your referral code"
                        className="font-mono"
                      />
                    </div>
                    <Alert className="border-blue-200 bg-blue-50">
                      <AlertTriangle className="h-4 w-4 text-blue-600" />
                      <AlertDescription className="text-blue-800">
                        This bonus can only be claimed once. Make sure you enter the correct code.
                      </AlertDescription>
                    </Alert>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowClaimDialog(false)}>
                      Cancel
                    </Button>
                    <Button onClick={claimReferralBonus} className="bg-green-600 hover:bg-green-700">
                      Claim KES {(invitedUsers.length * 150).toFixed(2)}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Invited Friends List */}
        {invitedUsers.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Your Referrals ({invitedUsers.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {invitedUsers.map((user, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium">{user.phone}</div>
                        <div className="text-xs text-gray-500">Joined: {user.joinDate}</div>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">+KES 150</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* How it Works */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-800">How Referrals Work</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-blue-700 space-y-2">
            <div className="flex items-start space-x-2">
              <div className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center text-xs font-bold">
                1
              </div>
              <div>Share your referral link or code with friends</div>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center text-xs font-bold">
                2
              </div>
              <div>When they register using your link, they become your referral</div>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center text-xs font-bold">
                3
              </div>
              <div>Earn KES 150 for each successful referral</div>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center text-xs font-bold">
                4
              </div>
              <div>Enter your referral code to claim your bonus (one-time only)</div>
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
            <span className="text-xs mt-1">Profile</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
