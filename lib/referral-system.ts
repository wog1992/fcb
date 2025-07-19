// Referral System Backend Logic
export interface ReferralUser {
  phone: string
  referrerCode: string
  joinDate: string
  userId: string
  isActive: boolean
}

export interface ReferralStatus {
  hasInvited: boolean
  invitedUsers: ReferralUser[]
  canClaim: boolean
  totalEarnings: number
}

export class ReferralSystem {
  private static BONUS_PER_REFERRAL = 150 // KES 150 per successful referral
  private static STORAGE_KEY_INVITED_USERS = "invitedUsers"
  private static STORAGE_KEY_REFERRAL_STATUS = "referralStatus"
  private static STORAGE_KEY_CLAIMED_BONUS = "hasClaimedReferralBonus"

  // Add a new referral when someone registers with a referral code
  static addReferral(newUserPhone: string, referralCode: string, newUserId: string): void {
    const invitedUsers = this.getInvitedUsers()

    const newReferral: ReferralUser = {
      phone: newUserPhone,
      referrerCode: referralCode,
      joinDate: new Date().toISOString().split("T")[0],
      userId: newUserId,
      isActive: true,
    }

    invitedUsers.push(newReferral)
    localStorage.setItem(this.STORAGE_KEY_INVITED_USERS, JSON.stringify(invitedUsers))

    // Update referral status for the referrer
    this.updateReferralStatus(referralCode)
  }

  // Get all invited users
  static getInvitedUsers(): ReferralUser[] {
    const stored = localStorage.getItem(this.STORAGE_KEY_INVITED_USERS)
    return stored ? JSON.parse(stored) : []
  }

  // Get referral status for a specific user
  static getReferralStatus(userReferralCode: string): ReferralStatus {
    const invitedUsers = this.getInvitedUsers()
    const userReferrals = invitedUsers.filter((user) => user.referrerCode === userReferralCode)
    const hasClaimedBonus = this.hasClaimedBonus()

    return {
      hasInvited: userReferrals.length > 0,
      invitedUsers: userReferrals,
      canClaim: userReferrals.length > 0 && !hasClaimedBonus,
      totalEarnings: userReferrals.length * this.BONUS_PER_REFERRAL,
    }
  }

  // Update referral status for a user
  private static updateReferralStatus(referralCode: string): void {
    const status = this.getReferralStatus(referralCode)
    localStorage.setItem(this.STORAGE_KEY_REFERRAL_STATUS, JSON.stringify(status))
  }

  // Check if user has already claimed their referral bonus
  static hasClaimedBonus(): boolean {
    const claimed = localStorage.getItem(this.STORAGE_KEY_CLAIMED_BONUS)
    return claimed ? JSON.parse(claimed) : false
  }

  // Claim referral bonus
  static claimReferralBonus(
    userReferralCode: string,
    inputCode: string,
  ): {
    success: boolean
    message: string
    bonusAmount: number
  } {
    // Validate referral code
    if (inputCode !== userReferralCode) {
      return {
        success: false,
        message: "Invalid referral code. Please enter your own referral code.",
        bonusAmount: 0,
      }
    }

    // Check if already claimed
    if (this.hasClaimedBonus()) {
      return {
        success: false,
        message: "Referral bonus has already been claimed",
        bonusAmount: 0,
      }
    }

    // Check if user has valid referrals
    const status = this.getReferralStatus(userReferralCode)
    if (!status.hasInvited) {
      return {
        success: false,
        message: "No valid referrals found. Invite friends first!",
        bonusAmount: 0,
      }
    }

    // Calculate and award bonus
    const bonusAmount = status.totalEarnings

    // Update user balances
    const currentBalance = Number.parseFloat(localStorage.getItem("userBalance") || "0")
    const currentReferralEarnings = Number.parseFloat(localStorage.getItem("referralEarnings") || "0")

    const newBalance = currentBalance + bonusAmount
    const newReferralEarnings = currentReferralEarnings + bonusAmount

    localStorage.setItem("userBalance", newBalance.toString())
    localStorage.setItem("referralEarnings", newReferralEarnings.toString())
    localStorage.setItem(this.STORAGE_KEY_CLAIMED_BONUS, "true")

    // Update referral status
    const updatedStatus = { ...status, canClaim: false }
    localStorage.setItem(this.STORAGE_KEY_REFERRAL_STATUS, JSON.stringify(updatedStatus))

    return {
      success: true,
      message: `Successfully claimed KES ${bonusAmount} referral bonus! Added to your balance.`,
      bonusAmount,
    }
  }

  // Generate unique referral code
  static generateReferralCode(): string {
    return `FCB${Math.random().toString(36).substr(2, 6).toUpperCase()}`
  }

  // Validate referral code format
  static isValidReferralCode(code: string): boolean {
    return /^FCB[A-Z0-9]{6}$/.test(code)
  }

  // Get referral statistics for admin
  static getReferralStats(): {
    totalReferrals: number
    activeReferrals: number
    totalBonusesPaid: number
    pendingClaims: number
  } {
    const allReferrals = this.getInvitedUsers()
    const activeReferrals = allReferrals.filter((ref) => ref.isActive)

    // This would normally come from a database
    const totalBonusesPaid = Number.parseFloat(localStorage.getItem("totalReferralBonusesPaid") || "0")

    // Count users who have referrals but haven't claimed bonus
    const usersWithReferrals = new Set(allReferrals.map((ref) => ref.referrerCode))
    const claimedBonuses = new Set() // This would track who has claimed
    const pendingClaims = usersWithReferrals.size - claimedBonuses.size

    return {
      totalReferrals: allReferrals.length,
      activeReferrals: activeReferrals.length,
      totalBonusesPaid,
      pendingClaims,
    }
  }

  // Create shareable referral link
  static createReferralLink(referralCode: string, baseUrl?: string): string {
    const domain = baseUrl || (typeof window !== "undefined" ? window.location.origin : "https://fcbvip.com")
    return `${domain}/register?ref=${referralCode}`
  }

  // Extract referral code from URL
  static extractReferralFromUrl(url: string): string | null {
    try {
      const urlObj = new URL(url)
      const refCode = urlObj.searchParams.get("ref")
      return refCode && this.isValidReferralCode(refCode) ? refCode : null
    } catch {
      return null
    }
  }
}
