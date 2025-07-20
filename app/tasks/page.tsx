"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Home, FileText, Trophy, TrendingUp, User, Play, Clock, CheckCircle, Lock } from "lucide-react"
import Link from "next/link"

export default function TasksPage() {
  const [activeTab, setActiveTab] = useState("doing")
  const [userBalance, setUserBalance] = useState(0)
  const [completedTasks, setCompletedTasks] = useState<number[]>([])
  const [taskInProgress, setTaskInProgress] = useState<number | null>(null)
  const [lastResetDate, setLastResetDate] = useState("")

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedBalance = localStorage.getItem("userBalance")
    const savedCompletedTasks = localStorage.getItem("completedTasks")
    const savedLastReset = localStorage.getItem("lastTaskReset")

    if (savedBalance) {
      setUserBalance(Number.parseFloat(savedBalance))
    }
    if (savedCompletedTasks) {
      setCompletedTasks(JSON.parse(savedCompletedTasks))
    }
    if (savedLastReset) {
      setLastResetDate(savedLastReset)
    }

    // Check if tasks need to be reset at midnight
    checkMidnightReset()
  }, [])

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("userBalance", userBalance.toString())
  }, [userBalance])

  useEffect(() => {
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks))
  }, [completedTasks])

  // Check if tasks should be reset at midnight
  const checkMidnightReset = () => {
    const today = new Date().toDateString()
    const savedResetDate = localStorage.getItem("lastTaskReset")

    if (savedResetDate !== today) {
      // Reset tasks for new day
      setCompletedTasks([])
      localStorage.setItem("completedTasks", "[]")
      localStorage.setItem("lastTaskReset", today)
      setLastResetDate(today)
    }
  }

  // Set up midnight reset timer
  useEffect(() => {
    const now = new Date()
    const tomorrow = new Date(now)
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(0, 0, 0, 0)

    const timeUntilMidnight = tomorrow.getTime() - now.getTime()

    const timer = setTimeout(() => {
      checkMidnightReset()
      // Set up daily interval after first midnight
      setInterval(checkMidnightReset, 24 * 60 * 60 * 1000)
    }, timeUntilMidnight)

    return () => clearTimeout(timer)
  }, [])

  const taskItems = [
    {
      id: 1,
      title: "Pen Review Task",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-07-19%20at%2010.07.35-yTJpQFl6UCvELeOw6mE6H0Mv8kGLCU.jpeg",
      reward: 60,
      category: "Intern",
      status: "available",
      description: "Review pen product",
      level: "Intern",
      dailyEarning: "KES 60 per 2 days",
      duration: 3000,
      requiredBalance: 0, // Free for intern level
    },
    {
      id: 2,
      title: "Watch Review Task",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-07-19%20at%2010.09.39-uGBrzzKSjKM8AhI3JaqC0RaTsPczIu.jpeg",
      reward: 70,
      category: "J1",
      status: "available",
      description: "Apple Watch review",
      level: "J1",
      dailyEarning: "KES 70 per day for 90 days",
      duration: 4000,
      requiredBalance: 2100, // Requires J1 investment
    },
    {
      id: 3,
      title: "Phone Review Task",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-07-19%20at%2010.10.33-Lmy6oz5bpzO9s8u29da5JsWBsORjE6.jpeg",
      reward: 180,
      category: "J2",
      status: "available",
      description: "Smartphone analysis",
      level: "J2",
      dailyEarning: "KES 180 per day for 90 days",
      duration: 5000,
      requiredBalance: 5400, // Requires J2 investment
    },
    {
      id: 4,
      title: "Tractor Review Task",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-07-19%20at%2010.12.55-NMdj8cGIwtfqTk4pTO61YavtWzInbt.jpeg",
      reward: 350,
      category: "J3",
      status: "available",
      description: "Vehicle product review",
      level: "J3",
      dailyEarning: "KES 350 per day for 90 days",
      duration: 6000,
      requiredBalance: 10500, // Requires J3 investment
    },
    {
      id: 5,
      title: "Motorbike Review Task",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-07-19%20at%2010.13.36-ZO70Doi5nzz1JQ8Ky4EjFUuXcJVb2A.jpeg",
      reward: 600,
      category: "J4",
      status: "available",
      description: "Ducati motorcycle review",
      level: "J4",
      dailyEarning: "KES 600 per day for 90 days",
      duration: 7000,
      requiredBalance: 18000, // Requires J4 investment
    },
    {
      id: 6,
      title: "Ferrari Review Task",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-07-19%20at%2010.23.52-aAw53910WyelVJr3uhHwUpjW6KSusf.jpeg",
      reward: 1300,
      category: "J5",
      status: "available",
      description: "Luxury sports car review",
      level: "J5",
      dailyEarning: "KES 1300 per day for 90 days",
      duration: 8000,
      requiredBalance: 39000, // Requires J5 investment
    },
    {
      id: 7,
      title: "House Review Task",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-07-19%20at%2010.25.10-dcKUkoACv5cdDJJ7P9vlg8jZ2ao6Fc.jpeg",
      reward: 3200,
      category: "J6",
      status: "available",
      description: "Luxury property review",
      level: "J6",
      dailyEarning: "KES 3200 per day for 90 days",
      duration: 10000,
      requiredBalance: 96000, // Requires J6 investment
    },
  ]

  const handleStartTask = (taskId: number) => {
    const task = taskItems.find((t) => t.id === taskId)
    if (!task || completedTasks.includes(taskId) || taskInProgress === taskId) return

    // Check if user has sufficient balance for this task
    if (userBalance < task.requiredBalance) {
      alert(
        `Insufficient balance! You need KES ${task.requiredBalance} to unlock this task. Please invest in ${task.category} package first.`,
      )
      return
    }

    setTaskInProgress(taskId)

    // Simulate task completion after duration
    setTimeout(() => {
      const newBalance = userBalance + task.reward
      const newTaskEarnings = Number.parseFloat(localStorage.getItem("taskEarnings") || "0") + task.reward

      setUserBalance(newBalance)
      setCompletedTasks((prev) => [...prev, taskId])
      setTaskInProgress(null)

      // Update task earnings
      localStorage.setItem("taskEarnings", newTaskEarnings.toString())

      // Show success message
      alert(`Task completed! You earned KES ${task.reward}`)
    }, task.duration)
  }

  const isTaskLocked = (task: any) => {
    return userBalance < task.requiredBalance
  }

  const getTaskButtonContent = (task: any) => {
    if (completedTasks.includes(task.id)) {
      return (
        <>
          <CheckCircle className="h-3 w-3 mr-1" />
          Completed
        </>
      )
    }

    if (taskInProgress === task.id) {
      return (
        <>
          <Clock className="h-3 w-3 mr-1 animate-spin" />
          In Progress...
        </>
      )
    }

    if (isTaskLocked(task)) {
      return (
        <>
          <Lock className="h-3 w-3 mr-1" />
          Locked
        </>
      )
    }

    return (
      <>
        <Play className="h-3 w-3 mr-1" />
        Start Task
      </>
    )
  }

  const getTaskButtonClass = (task: any) => {
    if (completedTasks.includes(task.id)) {
      return "bg-green-500 hover:bg-green-600 text-white"
    }

    if (taskInProgress === task.id) {
      return "bg-yellow-500 hover:bg-yellow-600 text-white"
    }

    if (isTaskLocked(task)) {
      return "bg-gray-400 text-white cursor-not-allowed"
    }

    return "bg-orange-500 hover:bg-orange-600 text-white"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Task list</h1>
          <div className="text-right">
            <div className="text-sm font-medium text-green-600">Balance: KES {userBalance.toFixed(2)}</div>
            <div className="text-xs text-gray-500">Tasks reset daily at 00:00</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-transparent">
            <TabsTrigger
              value="doing"
              className="data-[state=active]:bg-transparent data-[state=active]:text-orange-500 data-[state=active]:border-b-2 data-[state=active]:border-orange-500 rounded-none"
            >
              Doing
            </TabsTrigger>
            <TabsTrigger
              value="audit"
              className="data-[state=active]:bg-transparent data-[state=active]:text-orange-500 data-[state=active]:border-b-2 data-[state=active]:border-orange-500 rounded-none"
            >
              Audit
            </TabsTrigger>
            <TabsTrigger
              value="success"
              className="data-[state=active]:bg-transparent data-[state=active]:text-orange-500 data-[state=active]:border-b-2 data-[state=active]:border-orange-500 rounded-none"
            >
              Success
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Content */}
      <div className="p-4">
        {activeTab === "doing" && (
          <div>
            {/* Task Hall Header */}
            <div className="mb-4">
              <h2 className="text-lg font-bold mb-2">Task hall</h2>
              <div className="flex space-x-2 mb-4 overflow-x-auto">
                <Button size="sm" className="bg-blue-600 text-white whitespace-nowrap">
                  Intern
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-blue-600 text-blue-600 bg-transparent whitespace-nowrap"
                >
                  J1
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-blue-600 text-blue-600 bg-transparent whitespace-nowrap"
                >
                  J2
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-blue-600 text-blue-600 bg-transparent whitespace-nowrap"
                >
                  J3
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-blue-600 text-blue-600 bg-transparent whitespace-nowrap"
                >
                  J4
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-blue-600 text-blue-600 bg-transparent whitespace-nowrap"
                >
                  J5
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-blue-600 text-blue-600 bg-transparent whitespace-nowrap"
                >
                  J6
                </Button>
              </div>
            </div>

            {/* Task Grid */}
            <div className="grid grid-cols-1 gap-4 mb-6">
              {taskItems.map((task) => (
                <Card key={task.id} className={`relative overflow-hidden ${isTaskLocked(task) ? "opacity-60" : ""}`}>
                  <CardContent className="p-0">
                    <div className="flex">
                      <div className="w-24 h-24 flex-shrink-0 relative">
                        <img
                          src={task.image || "/placeholder.svg"}
                          alt={task.title}
                          className="w-full h-full object-cover rounded-l-lg"
                        />
                        {isTaskLocked(task) && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-l-lg">
                            <Lock className="h-6 w-6 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 p-3">
                        <div className="flex items-center justify-between mb-2">
                          <Badge className="bg-red-500 text-white">{task.category}</Badge>
                          <div className="font-bold text-green-600">KES +{task.reward}</div>
                        </div>
                        <div className="font-medium mb-1">{task.title}</div>
                        <div className="text-sm text-gray-600 mb-2">{task.description}</div>
                        <div className="text-xs text-blue-600 mb-2">{task.dailyEarning}</div>
                        {isTaskLocked(task) && (
                          <div className="text-xs text-red-500 mb-2">
                            Requires KES {task.requiredBalance} investment
                          </div>
                        )}
                        <Button
                          size="sm"
                          className={getTaskButtonClass(task)}
                          onClick={() => handleStartTask(task.id)}
                          disabled={
                            completedTasks.includes(task.id) || taskInProgress === task.id || isTaskLocked(task)
                          }
                        >
                          {getTaskButtonContent(task)}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === "success" && (
          <div>
            <h3 className="text-lg font-bold mb-3">Completed Tasks</h3>
            {completedTasks.length > 0 ? (
              <div className="space-y-3">
                {taskItems
                  .filter((task) => completedTasks.includes(task.id))
                  .map((task) => (
                    <Card key={task.id}>
                      <CardContent className="flex items-center justify-between p-3">
                        <div className="flex items-center space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <div>
                            <div className="font-medium">{task.title}</div>
                            <div className="text-sm text-gray-500">Completed</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-green-600">+KES {task.reward}</div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <Clock className="h-10 w-10 text-gray-400" />
                  </div>
                  <p className="text-gray-500">No completed tasks yet</p>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "audit" && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Clock className="h-10 w-10 text-gray-400" />
              </div>
              <p className="text-gray-500">No data</p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex justify-around py-2">
          <Link href="/dashboard" className="flex flex-col items-center p-2 text-gray-600">
            <Home className="h-5 w-5" />
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link href="/tasks" className="flex flex-col items-center p-2 text-blue-600">
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
