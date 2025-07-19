"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Home, FileText, Trophy, TrendingUp, User } from "lucide-react"
import Link from "next/link"

export default function TurntablePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4">
        <div className="flex items-center space-x-3">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Turntable of Luck</h1>
        </div>
      </div>

      <div className="p-4">
        <Card>
          <CardHeader>
            <CardTitle>Coming Soon</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">The Turntable of Luck feature is coming soon!</p>
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
