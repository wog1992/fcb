export interface ReferralUser {
  phone: string
  referrerCode: string
  joinDate: string
  joinTime: string
  isActive?: boolean
}

export interface ReferralStats {
  totalReferrals: number
  activeReferrals: number
  totalEarnings: number
  pendingEarnings: number
}

export class ReferralSystem {
  private static readonly REFERRAL_BONUS = 150 // KES per referral
  private static readonly STORAGE_KEY = "invitedUsers"
  private static readonly EARNINGS_KEY = "referralEarnings"
  private static readonly CLAIMED_KEY = "hasClaimedReferralBonus"

  static addReferral(referrerCode: string, newUserPhone: string): boolean {
    try {
      const invitedUsers = this.getAllReferrals()

      // Check if user already exists
      const existingUser = invitedUsers.find((user) => user.phone === newUserPhone)
      if (existingUser) {
        return false // User already referred
      }

      const newReferral: ReferralUser = {
        phone: newUserPhone,
        referrerCode: referrerCode,
        joinDate: new Date().toLocaleDateString(),
        joinTime: new Date().toLocaleTimeString(),
        isActive: true,
      }

      invitedUsers.push(newReferral)
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(invitedUsers))

      return true
    } catch (error) {
      console.error("Error adding referral:", error)
      return false
    }
  }

  static getAllReferrals(): ReferralUser[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error("Error getting referrals:", error)
      return []
    }
  }

  static getReferralsByCode(referrerCode: string): ReferralUser[] {
    const allReferrals = this.getAllReferrals()
    return allReferrals.filter((user) => user.referrerCode === referrerCode)
  }

  static getReferralStats(referrerCode: string): ReferralStats {
    const userReferrals = this.getReferralsByCode(referrerCode)
    const activeReferrals = userReferrals.filter((user) => user.isActive !== false)

    return {
      totalReferrals: userReferrals.length,
      activeReferrals: activeReferrals.length,
      totalEarnings: userReferrals.length * this.REFERRAL_BONUS,
      pendingEarnings: this.hasClaimedBonus(referrerCode) ? 0 : userReferrals.length * this.REFERRAL_BONUS,
    }
  }

  static canClaimBonus(referrerCode: string): boolean {
    const referrals = this.getReferralsByCode(referrerCode)
    const hasReferrals = referrals.length > 0
    const hasNotClaimed = !this.hasClaimedBonus(referrerCode)

    return hasReferrals && hasNotClaimed
  }

  static claimBonus(referrerCode: string, inputCode: string): { success: boolean; amount: number; message: string } {
    // Validate referral code
    if (inputCode !== referrerCode) {
      return {
        success: false,
        amount: 0,
        message: "Invalid referral code. Please enter your own referral code.",
      }
    }

    // Check if already claimed
    if (this.hasClaimedBonus(referrerCode)) {
      return {
        success: false,
        amount: 0,
        message: "You have already claimed your referral bonus.",
      }
    }

    // Check if has referrals
    const referrals = this.getReferralsByCode(referrerCode)
    if (referrals.length === 0) {
      return {
        success: false,
        amount: 0,
        message: "You haven't invited anyone yet.",
      }
    }

    // Calculate and award bonus
    const bonusAmount = referrals.length * this.REFERRAL_BONUS

    try {
      // Update user balance
      const currentBalance = Number.parseFloat(localStorage.getItem("userBalance") || "0")
      const newBalance = currentBalance + bonusAmount
      localStorage.setItem("userBalance", newBalance.toString())

      // Update referral earnings
      const currentReferralEarnings = Number.parseFloat(localStorage.getItem(this.EARNINGS_KEY) || "0")
      const newReferralEarnings = currentReferralEarnings + bonusAmount
      localStorage.setItem(this.EARNINGS_KEY, newReferralEarnings.toString())

      // Mark as claimed
      localStorage.setItem(this.CLAIMED_KEY, "true")

      return {
        success: true,
        amount: bonusAmount,
        message: `Congratulations! You earned KES ${bonusAmount} from ${referrals.length} referral(s)!`,
      }
    } catch (error) {
      console.error("Error claiming bonus:", error)
      return {
        success: false,
        amount: 0,
        message: "Error processing bonus claim. Please try again.",
      }
    }
  }

  static hasClaimedBonus(referrerCode?: string): boolean {
    try {
      const claimed = localStorage.getItem(this.CLAIMED_KEY)
      return claimed === "true"
    } catch (error) {
      console.error("Error checking claimed status:", error)
      return false
    }
  }

  static generateReferralLink(referrerCode: string, baseUrl?: string): string {
    const domain = baseUrl || (typeof window !== "undefined" ? window.location.origin : "")
    return `${domain}/register?ref=${referrerCode}`
  }

  static validateReferralCode(code: string): boolean {
    // Basic validation for FCB referral codes
    const codeRegex = /^FCB[A-Z0-9]{6}$/
    return codeRegex.test(code)
  }

  static getReferralEarnings(): number {
    try {
      const earnings = localStorage.getItem(this.EARNINGS_KEY)
      return earnings ? Number.parseFloat(earnings) : 0
    } catch (error) {
      console.error("Error getting referral earnings:", error)
      return 0
    }
  }

  static resetReferralData(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY)
      localStorage.removeItem(this.EARNINGS_KEY)
      localStorage.removeItem(this.CLAIMED_KEY)
    } catch (error) {
      console.error("Error resetting referral data:", error)
    }
  }

  // Admin functions
  static getAllReferralStats(): { [key: string]: ReferralStats } {
    const allReferrals = this.getAllReferrals()
    const stats: { [key: string]: ReferralStats } = {}

    // Group by referrer code
    const referrerCodes = [...new Set(allReferrals.map((r) => r.referrerCode))]

    referrerCodes.forEach((code) => {
      stats[code] = this.getReferralStats(code)
    })

    return stats
  }

  static getTotalSystemReferrals(): number {
    return this.getAllReferrals().length
  }

  static getTotalSystemEarnings(): number {
    const allReferrals = this.getAllReferrals()
    return allReferrals.length * this.REFERRAL_BONUS
  }
}
