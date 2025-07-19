// Earnings Tracking System
export interface EarningRecord {
  id: string
  userId: string
  type: "task" | "referral" | "deposit" | "bonus"
  amount: number
  description: string
  timestamp: string
  taskId?: string
  referralUserId?: string
}

export interface UserEarnings {
  totalBalance: number
  taskEarnings: number
  referralEarnings: number
  depositAmount: number
  bonusEarnings: number
  earningsHistory: EarningRecord[]
}

export class EarningsTracker {
  private static STORAGE_KEY_EARNINGS = "userEarningsHistory"
  private static STORAGE_KEY_BALANCE = "userBalance"
  private static STORAGE_KEY_TASK_EARNINGS = "taskEarnings"
  private static STORAGE_KEY_REFERRAL_EARNINGS = "referralEarnings"

  // Add a new earning record
  static addEarning(
    type: "task" | "referral" | "deposit" | "bonus",
    amount: number,
    description: string,
    additionalData?: { taskId?: string; referralUserId?: string },
  ): void {
    const userId = localStorage.getItem("userPhone") || "unknown"
    const earningRecord: EarningRecord = {
      id: this.generateId(),
      userId,
      type,
      amount,
      description,
      timestamp: new Date().toISOString(),
      ...additionalData,
    }

    // Add to earnings history
    const history = this.getEarningsHistory()
    history.push(earningRecord)
    localStorage.setItem(this.STORAGE_KEY_EARNINGS, JSON.stringify(history))

    // Update specific earning type
    this.updateEarningsByType(type, amount)

    // Update total balance
    this.updateTotalBalance(amount)
  }

  // Update earnings by type
  private static updateEarningsByType(type: string, amount: number): void {
    if (type === "task") {
      const current = Number.parseFloat(localStorage.getItem(this.STORAGE_KEY_TASK_EARNINGS) || "0")
      localStorage.setItem(this.STORAGE_KEY_TASK_EARNINGS, (current + amount).toString())
    } else if (type === "referral" || type === "bonus") {
      const current = Number.parseFloat(localStorage.getItem(this.STORAGE_KEY_REFERRAL_EARNINGS) || "0")
      localStorage.setItem(this.STORAGE_KEY_REFERRAL_EARNINGS, (current + amount).toString())
    }
  }

  // Update total balance
  private static updateTotalBalance(amount: number): void {
    const currentBalance = Number.parseFloat(localStorage.getItem(this.STORAGE_KEY_BALANCE) || "0")
    const newBalance = currentBalance + amount
    localStorage.setItem(this.STORAGE_KEY_BALANCE, newBalance.toString())
  }

  // Get earnings history
  static getEarningsHistory(): EarningRecord[] {
    const stored = localStorage.getItem(this.STORAGE_KEY_EARNINGS)
    return stored ? JSON.parse(stored) : []
  }

  // Get user earnings summary
  static getUserEarnings(): UserEarnings {
    const history = this.getEarningsHistory()
    const taskEarnings = Number.parseFloat(localStorage.getItem(this.STORAGE_KEY_TASK_EARNINGS) || "0")
    const referralEarnings = Number.parseFloat(localStorage.getItem(this.STORAGE_KEY_REFERRAL_EARNINGS) || "0")
    const totalBalance = Number.parseFloat(localStorage.getItem(this.STORAGE_KEY_BALANCE) || "0")

    // Calculate other earnings from history
    const depositAmount = history
      .filter((record) => record.type === "deposit")
      .reduce((sum, record) => sum + record.amount, 0)

    const bonusEarnings = history
      .filter((record) => record.type === "bonus")
      .reduce((sum, record) => sum + record.amount, 0)

    return {
      totalBalance,
      taskEarnings,
      referralEarnings,
      depositAmount,
      bonusEarnings,
      earningsHistory: history,
    }
  }

  // Validate earning legitimacy (for admin fraud detection)
  static validateEarnings(userId: string): {
    isLegitimate: boolean
    suspiciousActivities: string[]
    riskLevel: "low" | "medium" | "high"
  } {
    const earnings = this.getUserEarnings()
    const suspiciousActivities: string[] = []
    let riskLevel: "low" | "medium" | "high" = "low"

    // Check for unrealistic task earnings
    const averageTaskEarning = 70 // KES per task
    const maxTasksPerDay = 10
    const accountAge = this.getAccountAge()
    const maxPossibleTaskEarnings = maxTasksPerDay * averageTaskEarning * accountAge

    if (earnings.taskEarnings > maxPossibleTaskEarnings * 1.2) {
      suspiciousActivities.push("Task earnings exceed realistic limits")
      riskLevel = "high"
    }

    // Check referral earnings legitimacy
    const referralHistory = this.getEarningsHistory().filter((record) => record.type === "referral")
    if (referralHistory.length > 0 && earnings.referralEarnings === 0) {
      suspiciousActivities.push("Referral records exist but no referral earnings")
      riskLevel = "medium"
    }

    // Check for rapid balance increases
    const recentEarnings = this.getEarningsHistory()
      .filter((record) => {
        const recordDate = new Date(record.timestamp)
        const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)
        return recordDate > oneDayAgo
      })
      .reduce((sum, record) => sum + record.amount, 0)

    if (recentEarnings > 1000) {
      // More than KES 1000 in 24 hours
      suspiciousActivities.push("Unusually high earnings in 24 hours")
      riskLevel = riskLevel === "high" ? "high" : "medium"
    }

    // Check deposit to earnings ratio
    if (earnings.depositAmount > 0) {
      const earningsRatio = (earnings.taskEarnings + earnings.referralEarnings) / earnings.depositAmount
      if (earningsRatio > 2) {
        // Earnings more than 200% of deposits
        suspiciousActivities.push("Earnings significantly exceed deposits")
        riskLevel = "high"
      }
    }

    return {
      isLegitimate: suspiciousActivities.length === 0,
      suspiciousActivities,
      riskLevel,
    }
  }

  // Get account age in days
  private static getAccountAge(): number {
    const joinDate = localStorage.getItem("userJoinDate")
    if (!joinDate) return 1

    const join = new Date(joinDate)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - join.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return Math.max(diffDays, 1)
  }

  // Generate unique ID for earnings records
  private static generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }

  // Reset all earnings (for account reset)
  static resetEarnings(): void {
    localStorage.setItem(this.STORAGE_KEY_EARNINGS, "[]")
    localStorage.setItem(this.STORAGE_KEY_BALANCE, "0")
    localStorage.setItem(this.STORAGE_KEY_TASK_EARNINGS, "0")
    localStorage.setItem(this.STORAGE_KEY_REFERRAL_EARNINGS, "0")
  }

  // Get earnings by date range
  static getEarningsByDateRange(startDate: string, endDate: string): EarningRecord[] {
    const history = this.getEarningsHistory()
    const start = new Date(startDate)
    const end = new Date(endDate)

    return history.filter((record) => {
      const recordDate = new Date(record.timestamp)
      return recordDate >= start && recordDate <= end
    })
  }

  // Get top earners (for admin dashboard)
  static getTopEarners(limit = 10): Array<{
    userId: string
    totalEarnings: number
    taskEarnings: number
    referralEarnings: number
  }> {
    // This would normally query a database
    // For demo purposes, return mock data
    return [
      { userId: "07****1234", totalEarnings: 2500, taskEarnings: 2100, referralEarnings: 400 },
      { userId: "07****5678", totalEarnings: 1800, taskEarnings: 1400, referralEarnings: 400 },
      { userId: "07****9012", totalEarnings: 1200, taskEarnings: 1050, referralEarnings: 150 },
    ]
  }
}
