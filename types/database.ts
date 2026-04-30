// Auto-generated from live Supabase schema

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type debt_type = "personal_loan" | "credit_card" | "ptptn" | "car_loan" | "home_loan" | "bnpl" | "aeon_credit" | "other"
export type milestone_type = "first_debt_paid" | "halfway_point" | "streak_3_months" | "streak_6_months" | "streak_12_months" | "all_debts_paid"
export type subscription_status = "free" | "pro" | "cancelled"

export interface Database {
  public: {
    Tables: {
      debts: {
        Row: {
          id: string
          user_id: string
          name: string
          balance: number
          interest_rate: number
          minimum_payment: number
          debt_type: debt_type
          original_balance: number | null
          custom_category: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          balance: number
          interest_rate: number
          minimum_payment: number
          debt_type?: debt_type
          original_balance?: number | null
          custom_category?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          balance?: number
          interest_rate?: number
          minimum_payment?: number
          debt_type?: debt_type
          original_balance?: number | null
          custom_category?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      milestones: {
        Row: {
          id: string
          user_id: string
          type: milestone_type
          achieved_at: string
          debt_id: string | null
        }
        Insert: {
          id?: string
          user_id: string
          type: milestone_type
          achieved_at?: string
          debt_id?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          type?: milestone_type
          achieved_at?: string
          debt_id?: string | null
        }
        Relationships: []
      }
      payments: {
        Row: {
          id: string
          debt_id: string
          user_id: string
          amount: number
          payment_date: string
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          debt_id: string
          user_id: string
          amount: number
          payment_date: string
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          debt_id?: string
          user_id?: string
          amount?: number
          payment_date?: string
          notes?: string | null
          created_at?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          id: string
          email: string
          stripe_customer_id: string | null
          subscription_status: subscription_status
          partner_id: string | null
          couple_invite_code: string | null
          digest_opted_out: boolean
          digest_last_sent: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          stripe_customer_id?: string | null
          subscription_status?: subscription_status
          partner_id?: string | null
          couple_invite_code?: string | null
          digest_opted_out?: boolean
          digest_last_sent?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          stripe_customer_id?: string | null
          subscription_status?: subscription_status
          partner_id?: string | null
          couple_invite_code?: string | null
          digest_opted_out?: boolean
          digest_last_sent?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    CompositeTypes: Record<string, never>
    Enums: {
      debt_type: "personal_loan" | "credit_card" | "ptptn" | "car_loan" | "home_loan" | "bnpl" | "aeon_credit" | "other"
      milestone_type: "first_debt_paid" | "halfway_point" | "streak_3_months" | "streak_6_months" | "streak_12_months" | "all_debts_paid"
      subscription_status: "free" | "pro" | "cancelled"
    }
  }
}
