"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, EyeOff, User, Lock } from "lucide-react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [loginData, setLoginData] = useState({ username: "", password: "" })
  const [registerData, setRegisterData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    phone: "",
    inviteCode: "",
  })
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple validation - in real app, this would be proper authentication
    if (loginData.username && loginData.password) {
      if (loginData.username === "admin" && loginData.password === "admin") {
        router.push("/admin")
      } else {
        router.push("/dashboard")
      }
    }
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    if (registerData.password !== registerData.confirmPassword) {
      alert("Passwords do not match!")
      return
    }
    // In real app, this would create account and redirect
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4 shadow-lg">
            <span className="text-2xl font-bold text-blue-600">FCB</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">FCB VIP Intern2Days</h1>
          <p className="text-blue-100">Investment & Affiliate Platform</p>
        </div>

        <Card className="shadow-2xl border-0">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl text-center">Welcome</CardTitle>
            <CardDescription className="text-center">Sign in to your account or create a new one</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4 mt-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        type="text"
                        placeholder="Username"
                        className="pl-10"
                        value={loginData.username}
                        onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className="pl-10 pr-10"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    Sign In
                  </Button>
                </form>
                <div className="text-center text-sm text-gray-500">
                  Demo: Use any username/password or admin/admin for admin panel
                </div>
              </TabsContent>

              <TabsContent value="register" className="space-y-4 mt-4">
                <form onSubmit={handleRegister} className="space-y-4">
                  <Input
                    type="text"
                    placeholder="Username"
                    value={registerData.username}
                    onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
                    required
                  />
                  <Input
                    type="tel"
                    placeholder="Phone Number"
                    value={registerData.phone}
                    onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                    required
                  />
                  <Input
                    type="password"
                    placeholder="Password"
                    value={registerData.password}
                    onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                    required
                  />
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    value={registerData.confirmPassword}
                    onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                    required
                  />
                  <Input
                    type="text"
                    placeholder="Invite Code (Optional)"
                    value={registerData.inviteCode}
                    onChange={(e) => setRegisterData({ ...registerData, inviteCode: e.target.value })}
                  />
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                  >
                    Create Account
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
