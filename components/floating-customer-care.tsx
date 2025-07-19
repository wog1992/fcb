"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, X, User, Users } from "lucide-react"

export function FloatingCustomerCare() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-4 z-50 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsOpen(false)} />

          {/* Modal Content */}
          <Card className="relative w-80 mx-4 bg-white">
            <CardHeader className="text-center pb-4">
              <div className="flex items-center justify-between">
                <div className="flex-1" />
                <CardTitle className="text-lg font-bold">FCB Customer Care</CardTitle>
                <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-1">@Carefbc</p>
            </CardHeader>
            <CardContent className="space-y-3">
              <a href="https://t.me/Carefbc" target="_blank" rel="noopener noreferrer" className="block">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  <User className="h-4 w-4 mr-2" />
                  Private Chat
                </Button>
              </a>

              <a href="https://t.me/+jCB1_MhuUZk1ZjBk" target="_blank" rel="noopener noreferrer" className="block">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                  <Users className="h-4 w-4 mr-2" />
                  Group Chat
                </Button>
              </a>

              <Button variant="outline" className="w-full bg-transparent" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
