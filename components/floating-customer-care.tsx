"use client"

import { useState } from "react"
import { MessageCircle, X, Users, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

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
          onClick={() => setIsOpen(!isOpen)}
          className="h-14 w-14 rounded-full bg-blue-500 hover:bg-blue-600 shadow-lg"
          size="icon"
        >
          {isOpen ? <X className="h-6 w-6 text-white" /> : <MessageCircle className="h-6 w-6 text-white" />}
        </Button>
      </div>

      {/* Customer Care Options Modal */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsOpen(false)} />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-sm mx-auto">
              <CardContent className="p-6 text-center">
                <div className="mb-4">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <MessageCircle className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">FCB Customer Care</h3>
                  <p className="text-sm text-gray-500">@Carefbc</p>
                </div>

                <div className="space-y-3">
                  <Button onClick={handlePrivateChat} className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                    <User className="h-4 w-4 mr-2" />
                    Private Chat
                  </Button>

                  <Button onClick={handleGroupChat} className="w-full bg-green-500 hover:bg-green-600 text-white">
                    <Users className="h-4 w-4 mr-2" />
                    Group Chat
                  </Button>
                </div>

                <Button onClick={() => setIsOpen(false)} variant="ghost" className="w-full mt-3 text-gray-500">
                  Cancel
                </Button>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </>
  )
}
