export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      paper: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          title: string
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          title: string
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          title?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      install_available_extensions_and_test: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}
