"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MessageCircle, X, User, Users } from "lucide-react"

export default function FloatingCustomerCare() {
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
          className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsOpen(false)} />

          {/* Modal Content */}
          <Card className="relative w-80 mx-4 bg-white">
            <CardContent className="p-6">
              {/* Close Button */}
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 h-8 w-8 p-0"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>

              {/* Header */}
              <div className="text-center mb-6">
                <h3 className="text-lg font-bold text-gray-900">FCB Customer Care</h3>
                <p className="text-sm text-gray-500">@Carefbc</p>
              </div>

              {/* Chat Options */}
              <div className="space-y-3">
                <Button onClick={handlePrivateChat} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  <User className="h-4 w-4 mr-2" />
                  Private Chat
                </Button>

                <Button onClick={handleGroupChat} className="w-full bg-green-600 hover:bg-green-700 text-white">
                  <Users className="h-4 w-4 mr-2" />
                  Group Chat
                </Button>

                <Button variant="outline" onClick={() => setIsOpen(false)} className="w-full">
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
