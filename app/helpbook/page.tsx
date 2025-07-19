"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ArrowLeft,
  Home,
  FileText,
  Trophy,
  TrendingUp,
  User,
  ArrowUpRight,
  ArrowDownLeft,
  HelpCircle,
  MessageCircle,
  Phone,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HelpbookPage() {
  const faqItems = [
    {
      question: "How do I start earning?",
      answer:
        "Register, choose an investment package (J1-J7), complete daily tasks, and earn daily profits plus referral bonuses.",
    },
    {
      question: "What are the withdrawal requirements?",
      answer:
        "Minimum withdrawal is KES 120. You must complete a recharge before withdrawing. Withdrawals are processed Monday-Saturday, 9:30 AM to 5:00 PM.",
    },
    {
      question: "How does the referral system work?",
      answer:
        "Earn 11% from Level 1 referrals, 3% from Level 2, and 1% from Level 3. Share your referral code to invite friends.",
    },
    {
      question: "How do I make a deposit?",
      answer:
        "Send M-Pesa payment to 0782192086 (George Wiswa), then paste the confirmation message in the app for verification.",
    },
    {
      question: "What are the investment packages?",
      answer:
        "J1 (KES 2,100), J2 (KES 5,400), J3 (KES 10,500), J4 (KES 18,000), J5 (KES 39,000), J6 (KES 96,000), J7 (KES 150,000).",
    },
    {
      question: "How often can I complete tasks?",
      answer:
        "Task frequency depends on your package level. Intern: 2 times daily, J1: 4 times, J2: 6 times, J3: 8 times, etc.",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4">
        <div className="flex items-center space-x-3">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Helpbook</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Contact Support */}
        <Card className="bg-gradient-to-r from-green-50 to-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center text-green-800">
              <MessageCircle className="h-5 w-5 mr-2" />
              Need Immediate Help?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <a href="https://t.me/Carefbc" target="_blank" rel="noopener noreferrer" className="block">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <MessageCircle className="h-4 w-4 mr-2" />
                Contact Customer Care
              </Button>
            </a>
            <div className="text-center text-sm text-gray-600">
              <div className="flex items-center justify-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>Admin: George Wiswa - 0782192086</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <HelpCircle className="h-5 w-5 mr-2" />
              Frequently Asked Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="font-semibold text-blue-800 mb-2">{item.question}</div>
                  <div className="text-sm text-gray-700 leading-relaxed">{item.answer}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/recharge">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <ArrowUpRight className="h-4 w-4 mr-2" />
                Make a Deposit
              </Button>
            </Link>
            <Link href="/withdraw">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <ArrowDownLeft className="h-4 w-4 mr-2" />
                Request Withdrawal
              </Button>
            </Link>
            <Link href="/invite-friends">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <User className="h-4 w-4 mr-2" />
                Invite Friends
              </Button>
            </Link>
            <Link href="/vip">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Trophy className="h-4 w-4 mr-2" />
                View Packages
              </Button>
            </Link>
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
