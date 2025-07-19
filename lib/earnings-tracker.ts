// Earnings Tracking System
export interface Transaction {
  id: string
  type: "task" | "referral" | "deposit" | "withdrawal"
  amount: number
  description: string
  timestamp: string
  date: string
}

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

export interface EarningsBreakdown {
  taskEarnings: number
  referralEarnings: number
  depositAmount: number
  totalBalance: number
  totalWithdrawn: number
}

export class EarningsTracker {
  private static readonly TASK_REWARD = 70 // KES per task
  private static readonly REFERRAL_BONUS = 150 // KES per referral
  private static readonly STORAGE_KEY_EARNINGS = "userEarningsHistory"
  private static readonly STORAGE_KEY_BALANCE = "userBalance"
  private static readonly STORAGE_KEY_TASK_EARNINGS = "taskEarnings"
  private static readonly STORAGE_KEY_REFERRAL_EARNINGS = "referralEarnings"

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
  static validateEarnings(userPhone: string): { isValid: boolean; riskScore: number; issues: string[] } {
    const breakdown = this.getEarningsBreakdown()
    const completedTasks = JSON.parse(localStorage.getItem("completedTasks") || "[]")
    const accountAge = this.getAccountAge()

    const issues: string[] = []
    let riskScore = 0

    // Check task earnings vs completed tasks
    const expectedTaskEarnings = completedTasks.length * this.TASK_REWARD
    if (breakdown.taskEarnings > expectedTaskEarnings) {
      issues.push("Task earnings exceed completed tasks")
      riskScore += 30
    }

    // Check account age vs earnings
    if (accountAge < 7 && breakdown.totalBalance > 1000) {
      issues.push("High earnings for new account")
      riskScore += 25
    }

    // Check earnings vs deposits ratio
    const earnedAmount = breakdown.taskEarnings + breakdown.referralEarnings
    if (earnedAmount > breakdown.depositAmount * 10 && breakdown.depositAmount > 0) {
      issues.push("Earnings significantly exceed deposits")
      riskScore += 20
    }

    // Check withdrawal patterns
    if (breakdown.totalWithdrawn > breakdown.totalBalance * 2) {
      issues.push("Withdrawal amount suspicious")
      riskScore += 25
    }

    return {
      isValid: riskScore < 50,
      riskScore: Math.min(riskScore, 100),
      issues,
    }
  }

  // Get account age in days
  private static getAccountAge(): number {
    // Calculate days since account creation
    const joinDate = localStorage.getItem("joinDate")
    if (!joinDate) return 0

    const join = new Date(joinDate)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - join.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
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
    localStorage.removeItem("transactions")
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

  // Add task earning
  static addTaskEarning(taskId: string, taskName: string): boolean {
    try {
      const transaction: Transaction = {
        id: `task_${Date.now()}`,
        type: "task",
        amount: this.TASK_REWARD,
        description: `Completed task: ${taskName}`,
        timestamp: new Date().toISOString(),
        date: new Date().toLocaleDateString(),
      }

      this.addTransaction(transaction)
      this.updateTaskEarnings(this.TASK_REWARD)
      this.updateTotalBalance(this.TASK_REWARD)

      return true
    } catch (error) {
      console.error("Error adding task earning:", error)
      return false
    }
  }

  // Add referral earning
  static addReferralEarning(referralPhone: string): boolean {
    try {
      const transaction: Transaction = {
        id: `referral_${Date.now()}`,
        type: "referral",
        amount: this.REFERRAL_BONUS,
        description: `Referral bonus for ${referralPhone}`,
        timestamp: new Date().toISOString(),
        date: new Date().toLocaleDateString(),
      }

      this.addTransaction(transaction)
      this.updateReferralEarnings(this.REFERRAL_BONUS)
      this.updateTotalBalance(this.REFERRAL_BONUS)

      return true
    } catch (error) {
      console.error("Error adding referral earning:", error)
      return false
    }
  }

  // Add deposit
  static addDeposit(amount: number, method: string): boolean {
    try {
      const transaction: Transaction = {
        id: `deposit_${Date.now()}`,
        type: "deposit",
        amount: amount,
        description: `Deposit via ${method}`,
        timestamp: new Date().toISOString(),
        date: new Date().toLocaleDateString(),
      }

      this.addTransaction(transaction)
      this.updateTotalBalance(amount)

      return true
    } catch (error) {
      console.error("Error adding deposit:", error)
      return false
    }
  }

  // Add withdrawal
  static addWithdrawal(amount: number, method: string): boolean {
    try {
      const transaction: Transaction = {
        id: `withdrawal_${Date.now()}`,
        type: "withdrawal",
        amount: -amount, // Negative for withdrawals
        description: `Withdrawal via ${method}`,
        timestamp: new Date().toISOString(),
        date: new Date().toLocaleDateString(),
      }

      this.addTransaction(transaction)
      this.updateTotalBalance(-amount)

      return true
    } catch (error) {
      console.error("Error adding withdrawal:", error)
      return false
    }
  }

  private static addTransaction(transaction: Transaction): void {
    const transactions = this.getAllTransactions()
    transactions.unshift(transaction) // Add to beginning
    localStorage.setItem("transactions", JSON.stringify(transactions))
  }

  static getAllTransactions(): Transaction[] {
    try {
      const stored = localStorage.getItem("transactions")
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error("Error getting transactions:", error)
      return []
    }
  }

  static getEarningsBreakdown(): EarningsBreakdown {
    const taskEarnings = Number.parseFloat(localStorage.getItem("taskEarnings") || "0")
    const referralEarnings = Number.parseFloat(localStorage.getItem("referralEarnings") || "0")
    const totalBalance = Number.parseFloat(localStorage.getItem("userBalance") || "0")

    // Calculate deposits and withdrawals from transactions
    const transactions = this.getAllTransactions()
    const deposits = transactions.filter((t) => t.type === "deposit").reduce((sum, t) => sum + t.amount, 0)

    const withdrawals = transactions
      .filter((t) => t.type === "withdrawal")
      .reduce((sum, t) => sum + Math.abs(t.amount), 0)

    return {
      taskEarnings,
      referralEarnings,
      depositAmount: deposits,
      totalBalance,
      totalWithdrawn: withdrawals,
    }
  }

  private static updateTaskEarnings(amount: number): void {
    const current = Number.parseFloat(localStorage.getItem("taskEarnings") || "0")
    localStorage.setItem("taskEarnings", (current + amount).toString())
  }

  private static updateReferralEarnings(amount: number): void {
    const current = Number.parseFloat(localStorage.getItem("referralEarnings") || "0")
    localStorage.setItem("referralEarnings", (current + amount).toString())
  }

  private static updateTotalBalance(amount: number): void {
    const current = Number.parseFloat(localStorage.getItem("userBalance") || "0")
    localStorage.setItem("userBalance", (current + amount).toString())
  }

  static getRecentTransactions(limit = 10): Transaction[] {
    return this.getAllTransactions().slice(0, limit)
  }

  static getTransactionsByType(type: Transaction["type"]): Transaction[] {
    return this.getAllTransactions().filter((t) => t.type === type)
  }

  static getTotalEarnings(): number {
    const breakdown = this.getEarningsBreakdown()
    return breakdown.taskEarnings + breakdown.referralEarnings
  }
}
