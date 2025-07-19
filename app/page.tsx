"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, EyeOff, Shield, Users } from "lucide-react"
import Link from "next/link"

export default function AuthPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [loginData, setLoginData] = useState({
    phone: "",
    password: "",
  })
  const [registerData, setRegisterData] = useState({
    phone: "",
    password: "",
    confirmPassword: "",
    verificationCode: "",
    referralCode: "",
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">IPG</h1>
          <p className="text-blue-100">FCB VIP Intern2Days</p>
        </div>

        <Card className="backdrop-blur-sm bg-white/95">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Welcome</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">User Login</TabsTrigger>
                <TabsTrigger value="admin">Admin Login</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      +254
                    </span>
                    <Input
                      id="phone"
                      placeholder="Enter your phone number"
                      value={loginData.phone}
                      onChange={(e) => setLoginData({ ...loginData, phone: e.target.value })}
                      className="rounded-l-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <Link href="/dashboard">
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-blue-500 hover:from-orange-600 hover:to-blue-600">
                    Login
                  </Button>
                </Link>

                <div className="text-center">
                  <Button variant="outline" className="w-full bg-transparent" asChild>
                    <Link href="/register">Register New Account</Link>
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="admin" className="space-y-4">
                <div className="flex items-center justify-center p-4 bg-red-50 rounded-lg">
                  <Shield className="h-5 w-5 text-red-500 mr-2" />
                  <span className="text-red-700 text-sm">Admin Access Only</span>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="admin-phone">Admin Phone</Label>
                  <Input id="admin-phone" placeholder="0782192086" disabled className="bg-gray-50" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="admin-password">Admin Password</Label>
                  <Input id="admin-password" type="password" placeholder="Enter admin password" />
                </div>

                <Link href="/admin">
                  <Button className="w-full bg-red-600 hover:bg-red-700">Admin Login</Button>
                </Link>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Customer Care */}
        <div className="mt-6 text-center">
          <a
            href="https://t.me/Carefbc"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-white hover:text-blue-200 transition-colors"
          >
            <Users className="h-4 w-4 mr-2" />
            Customer Care Support
          </a>
        </div>
      </div>
    </div>
  )
}
