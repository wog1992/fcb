"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  ArrowLeft,
  Download,
  Smartphone,
  Globe,
  Star,
  Shield,
  Zap,
  Users,
  CheckCircle,
  Info,
  ExternalLink,
} from "lucide-react"
import Link from "next/link"

export default function DownloadPage() {
  const [downloadStarted, setDownloadStarted] = useState(false)

  const handleDownload = (platform) => {
    setDownloadStarted(true)

    // Simulate download process
    setTimeout(() => {
      if (platform === "android") {
        // In a real app, this would trigger the actual APK download
        alert("Android APK download will start shortly. Please enable 'Install from Unknown Sources' in your settings.")
      } else if (platform === "web") {
        // Add to home screen functionality
        alert("To install the web app: Tap the share button in your browser and select 'Add to Home Screen'")
      }
      setDownloadStarted(false)
    }, 2000)
  }

  const features = [
    { icon: Zap, title: "Fast & Secure", description: "Lightning-fast transactions with bank-level security" },
    { icon: Users, title: "Referral System", description: "Earn money by inviting friends to join FCB" },
    { icon: Star, title: "VIP Packages", description: "Multiple investment packages with daily returns" },
    { icon: Shield, title: "Secure Payments", description: "M-Pesa integration with admin verification" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4">
        <div className="flex items-center space-x-3">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex items-center space-x-2">
            <img src="/fcb-logo.jpg" alt="FCB Logo" className="h-8 w-8 rounded" />
            <div>
              <h1 className="text-xl font-bold">Download FCB App</h1>
              <p className="text-sm opacity-90">Get the mobile app for better experience</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* App Info */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="p-6 text-center">
            <div className="mb-4">
              <img src="/fcb-logo.jpg" alt="FCB Logo" className="h-16 w-16 rounded-lg mx-auto mb-3" />
              <h2 className="text-2xl font-bold text-gray-800">FCB VIP App</h2>
              <p className="text-gray-600">Your gateway to financial freedom</p>
            </div>
            <div className="flex justify-center space-x-4 text-sm">
              <Badge className="bg-green-100 text-green-800">
                <Star className="h-3 w-3 mr-1" />
                4.8 Rating
              </Badge>
              <Badge className="bg-blue-100 text-blue-800">
                <Download className="h-3 w-3 mr-1" />
                10K+ Downloads
              </Badge>
              <Badge className="bg-purple-100 text-purple-800">
                <Shield className="h-3 w-3 mr-1" />
                Secure
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Download Options */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-800">Choose Your Platform</h3>

          {/* Android Download */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Smartphone className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-bold">Android App</div>
                    <div className="text-sm text-gray-600">Download APK file (Latest Version 2.1.0)</div>
                  </div>
                </div>
                <Button
                  onClick={() => handleDownload("android")}
                  disabled={downloadStarted}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {downloadStarted ? "Downloading..." : "Download APK"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Web App */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Globe className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-bold">Web App</div>
                    <div className="text-sm text-gray-600">Install as Progressive Web App (PWA)</div>
                  </div>
                </div>
                <Button
                  onClick={() => handleDownload("web")}
                  disabled={downloadStarted}
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  Add to Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Installation Instructions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Info className="h-5 w-5 mr-2" />
              Installation Guide
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-orange-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2 text-orange-800">For Android APK:</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm text-orange-700">
                <li>Download the APK file</li>
                <li>Go to Settings → Security → Enable "Unknown Sources"</li>
                <li>Open the downloaded APK file</li>
                <li>Tap "Install" and wait for completion</li>
                <li>Open the FCB app and log in</li>
              </ol>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2 text-blue-800">For Web App (PWA):</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm text-blue-700">
                <li>Open FCB website in your browser</li>
                <li>Tap the share/menu button</li>
                <li>Select "Add to Home Screen"</li>
                <li>Confirm installation</li>
                <li>Access FCB from your home screen</li>
              </ol>
            </div>
          </CardContent>
        </Card>

        {/* App Features */}
        <Card>
          <CardHeader>
            <CardTitle>Why Download FCB App?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <feature.icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium">{feature.title}</div>
                    <div className="text-sm text-gray-600">{feature.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Requirements */}
        <Card>
          <CardHeader>
            <CardTitle>System Requirements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <span className="text-sm font-medium">Android Version:</span>
              <span className="text-sm">5.0 or higher</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <span className="text-sm font-medium">Storage Space:</span>
              <span className="text-sm">25 MB</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <span className="text-sm font-medium">Internet:</span>
              <span className="text-sm">Required</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <span className="text-sm font-medium">Permissions:</span>
              <span className="text-sm">Camera, Storage, Phone</span>
            </div>
          </CardContent>
        </Card>

        {/* Support */}
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <div className="font-medium text-green-800">Need Help?</div>
                <div className="text-sm text-green-600">
                  Contact our support team at{" "}
                  <a
                    href="https://t.me/Carefbc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium hover:underline"
                  >
                    t.me/Carefbc
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alternative Access */}
        <Alert>
          <ExternalLink className="h-4 w-4" />
          <AlertDescription>
            <strong>Already using the web version?</strong> You can continue using FCB directly in your browser without
            downloading the app.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )
}
