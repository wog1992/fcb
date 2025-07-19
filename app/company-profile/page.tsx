"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Home, FileText, Trophy, TrendingUp, User, Building } from "lucide-react"
import Link from "next/link"

export default function CompanyProfilePage() {
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
          <h1 className="text-xl font-bold">Company Profile</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building className="h-5 w-5 mr-2" />
              FCB VIP Intern2Days
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">About Us</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                FCB VIP Intern2Days is a leading investment and affiliate marketing platform that provides opportunities
                for users to earn daily profits through task completion and referral programs.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Our Mission</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                To provide sustainable earning opportunities for our members through innovative investment packages and
                rewarding task-based activities.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Contact Information</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium">Admin:</span> George Wiswa
                </div>
                <div>
                  <span className="font-medium">Phone:</span> 0782192086
                </div>
                <div>
                  <span className="font-medium">Customer Care:</span>
                  <a
                    href="https://t.me/Carefbc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline ml-1"
                  >
                    t.me/Carefbc
                  </a>
                </div>
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
          <Link href="/profile" className="flex flex-col items-center p-2 text-gray-600">
            <User className="h-5 w-5" />
            <span className="text-xs mt-1">My</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
