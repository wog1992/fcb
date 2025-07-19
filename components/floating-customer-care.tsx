"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, X, Users, User } from "lucide-react"

export function FloatingCustomerCare() {
  const [isOpen, setIsOpen] = useState(false)

  const handlePrivateChat = () => {
    window.open("https://t.me/Carefbc", "_blank")
    setIsOpen(false)
  }

  const handleGroupChat = () => {
    window.open("https://t.me/+jCB1_MhuUZk1ZjBk", "_blank")
    setIsOpen(false)
  }

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-20 right-4 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200"
          size="icon"
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </Button>
      </div>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-sm mx-auto bg-white rounded-2xl shadow-2xl">
            <CardHeader className="text-center pb-4">
              <div className="flex items-center justify-between">
                <div className="flex-1" />
                <CardTitle className="text-lg font-semibold">FCB Customer Care</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8">
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-1">@Carefbc</p>
            </CardHeader>
            <CardContent className="space-y-3 pb-6">
              <Button
                onClick={handlePrivateChat}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center gap-2"
              >
                <User className="h-4 w-4" />
                Private Chat
              </Button>
              <Button
                onClick={handleGroupChat}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg flex items-center justify-center gap-2"
              >
                <Users className="h-4 w-4" />
                Group Chat
              </Button>
              <Button onClick={() => setIsOpen(false)} variant="outline" className="w-full py-3 rounded-lg">
                Cancel
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
