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
      author: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          name: string
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          name: string
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          name?: string
        }
      }
      paper: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          title: string
          abstract: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          title: string
          abstract?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          title?: string
          abstract?: string | null
        }
      }
      paper_author: {
        Row: {
          created_at: string
          updated_at: string
          paper_id: string
          author_id: string
          position: number | null
        }
        Insert: {
          created_at?: string
          updated_at?: string
          paper_id: string
          author_id: string
          position?: number | null
        }
        Update: {
          created_at?: string
          updated_at?: string
          paper_id?: string
          author_id?: string
          position?: number | null
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
