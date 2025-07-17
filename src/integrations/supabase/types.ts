export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      _artworks_revised_staging: {
        Row: {
          circum: number | null
          coil_size: string | null
          customer_name: string | null
          cut_length: string | null
          cyl_qty: string | null
          dimensions: string | null
          file_hyperlink: string | null
          file_id: string | null
          item_code: string
          item_name: string | null
          last_run: string | null
          length: string | null
          location: string | null
          mielage_m: string | null
          no_of_colours: string | null
          qr_code: string | null
          remarks: string | null
          total_runs: string | null
          ups: number | null
        }
        Insert: {
          circum?: number | null
          coil_size?: string | null
          customer_name?: string | null
          cut_length?: string | null
          cyl_qty?: string | null
          dimensions?: string | null
          file_hyperlink?: string | null
          file_id?: string | null
          item_code: string
          item_name?: string | null
          last_run?: string | null
          length?: string | null
          location?: string | null
          mielage_m?: string | null
          no_of_colours?: string | null
          qr_code?: string | null
          remarks?: string | null
          total_runs?: string | null
          ups?: number | null
        }
        Update: {
          circum?: number | null
          coil_size?: string | null
          customer_name?: string | null
          cut_length?: string | null
          cyl_qty?: string | null
          dimensions?: string | null
          file_hyperlink?: string | null
          file_id?: string | null
          item_code?: string
          item_name?: string | null
          last_run?: string | null
          length?: string | null
          location?: string | null
          mielage_m?: string | null
          no_of_colours?: string | null
          qr_code?: string | null
          remarks?: string | null
          total_runs?: string | null
          ups?: number | null
        }
        Relationships: []
      }
      _artworks_se_backup: {
        Row: {
          customer_name: string | null
          dimensions: string | null
          file_hyperlink: string | null
          file_id: string | null
          item_code: string | null
          item_name: string | null
          no_of_colours: string | null
          snapshot_ts: string | null
        }
        Insert: {
          customer_name?: string | null
          dimensions?: string | null
          file_hyperlink?: string | null
          file_id?: string | null
          item_code?: string | null
          item_name?: string | null
          no_of_colours?: string | null
          snapshot_ts?: string | null
        }
        Update: {
          customer_name?: string | null
          dimensions?: string | null
          file_hyperlink?: string | null
          file_id?: string | null
          item_code?: string | null
          item_name?: string | null
          no_of_colours?: string | null
          snapshot_ts?: string | null
        }
        Relationships: []
      }
      _old_artworks_se: {
        Row: {
          customer_name: string | null
          dimensions: string | null
          file_hyperlink: string | null
          file_id: string | null
          item_code: string
          item_name: string | null
          no_of_colours: string | null
        }
        Insert: {
          customer_name?: string | null
          dimensions?: string | null
          file_hyperlink?: string | null
          file_id?: string | null
          item_code: string
          item_name?: string | null
          no_of_colours?: string | null
        }
        Update: {
          customer_name?: string | null
          dimensions?: string | null
          file_hyperlink?: string | null
          file_id?: string | null
          item_code?: string
          item_name?: string | null
          no_of_colours?: string | null
        }
        Relationships: []
      }
      admin_audit_log: {
        Row: {
          action: string
          admin_id: string | null
          created_at: string | null
          id: string
          ip_address: unknown | null
          new_data: Json | null
          old_data: Json | null
          target_id: string | null
          target_table: string | null
          user_agent: string | null
        }
        Insert: {
          action: string
          admin_id?: string | null
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          new_data?: Json | null
          old_data?: Json | null
          target_id?: string | null
          target_table?: string | null
          user_agent?: string | null
        }
        Update: {
          action?: string
          admin_id?: string | null
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          new_data?: Json | null
          old_data?: Json | null
          target_id?: string | null
          target_table?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      advances: {
        Row: {
          advance_amount: number
          advance_date: string
          advance_id: string
          created_at: string | null
          employee_id: string | null
          remarks: string | null
          unit_id: string | null
          updated_at: string | null
        }
        Insert: {
          advance_amount: number
          advance_date: string
          advance_id?: string
          created_at?: string | null
          employee_id?: string | null
          remarks?: string | null
          unit_id?: string | null
          updated_at?: string | null
        }
        Update: {
          advance_amount?: number
          advance_date?: string
          advance_id?: string
          created_at?: string | null
          employee_id?: string | null
          remarks?: string | null
          unit_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "advances_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "payroll_employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "advances_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["unit_id"]
          },
        ]
      }
      albums: {
        Row: {
          artist_id: string | null
          cover_url: string | null
          created_at: string | null
          id: string
          name: string
          updated_at: string | null
          year: number | null
        }
        Insert: {
          artist_id?: string | null
          cover_url?: string | null
          created_at?: string | null
          id?: string
          name: string
          updated_at?: string | null
          year?: number | null
        }
        Update: {
          artist_id?: string | null
          cover_url?: string | null
          created_at?: string | null
          id?: string
          name?: string
          updated_at?: string | null
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "albums_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "artists"
            referencedColumns: ["id"]
          },
        ]
      }
      appointments: {
        Row: {
          created_at: string
          email: string
          full_name: string
          id: string
          notes: string | null
          phone: string
          pref_date: string
          pref_slot: string
          service: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          full_name: string
          id?: string
          notes?: string | null
          phone: string
          pref_date: string
          pref_slot: string
          service: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          notes?: string | null
          phone?: string
          pref_date?: string
          pref_slot?: string
          service?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      approval_history: {
        Row: {
          action: string
          admin_id: string | null
          created_at: string
          id: string
          notes: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          admin_id?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          admin_id?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "approval_history_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      approvals: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          decision: string | null
          id: string
          job_id: string | null
          signed_pdf_url: string | null
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          decision?: string | null
          id?: string
          job_id?: string | null
          signed_pdf_url?: string | null
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          decision?: string | null
          id?: string
          job_id?: string | null
          signed_pdf_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "approvals_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "approvals_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      articles: {
        Row: {
          article_id: string
          author: string
          category: string | null
          content: string
          created_at: string
          excerpt: string | null
          published: boolean
          reading_time: number | null
          slug: string
          title: string
        }
        Insert: {
          article_id?: string
          author?: string
          category?: string | null
          content: string
          created_at?: string
          excerpt?: string | null
          published?: boolean
          reading_time?: number | null
          slug: string
          title: string
        }
        Update: {
          article_id?: string
          author?: string
          category?: string | null
          content?: string
          created_at?: string
          excerpt?: string | null
          published?: boolean
          reading_time?: number | null
          slug?: string
          title?: string
        }
        Relationships: []
      }
      artists: {
        Row: {
          created_at: string | null
          id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      asset_assignments: {
        Row: {
          asset_id: string | null
          assigned_by: string | null
          assigned_date: string | null
          assigned_to: string | null
          created_at: string | null
          id: string
          is_active: boolean | null
          notes: string | null
          return_date: string | null
        }
        Insert: {
          asset_id?: string | null
          assigned_by?: string | null
          assigned_date?: string | null
          assigned_to?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          notes?: string | null
          return_date?: string | null
        }
        Update: {
          asset_id?: string | null
          assigned_by?: string | null
          assigned_date?: string | null
          assigned_to?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          notes?: string | null
          return_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "asset_assignments_asset_id_fkey"
            columns: ["asset_id"]
            isOneToOne: false
            referencedRelation: "assets"
            referencedColumns: ["id"]
          },
        ]
      }
      asset_categories: {
        Row: {
          code: string
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          parent_category_id: string | null
          updated_at: string | null
        }
        Insert: {
          code: string
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          parent_category_id?: string | null
          updated_at?: string | null
        }
        Update: {
          code?: string
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          parent_category_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "asset_categories_parent_category_id_fkey"
            columns: ["parent_category_id"]
            isOneToOne: false
            referencedRelation: "asset_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      asset_history: {
        Row: {
          action: string
          asset_id: string | null
          changed_by: string | null
          created_at: string | null
          field_name: string | null
          id: string
          new_value: string | null
          notes: string | null
          old_value: string | null
        }
        Insert: {
          action: string
          asset_id?: string | null
          changed_by?: string | null
          created_at?: string | null
          field_name?: string | null
          id?: string
          new_value?: string | null
          notes?: string | null
          old_value?: string | null
        }
        Update: {
          action?: string
          asset_id?: string | null
          changed_by?: string | null
          created_at?: string | null
          field_name?: string | null
          id?: string
          new_value?: string | null
          notes?: string | null
          old_value?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "asset_history_asset_id_fkey"
            columns: ["asset_id"]
            isOneToOne: false
            referencedRelation: "assets"
            referencedColumns: ["id"]
          },
        ]
      }
      asset_transfers: {
        Row: {
          approved_by: string | null
          asset_id: string | null
          created_at: string | null
          from_location_id: string | null
          id: string
          notes: string | null
          requested_by: string | null
          status: Database["public"]["Enums"]["transfer_status"] | null
          to_location_id: string | null
          transfer_date: string | null
          updated_at: string | null
        }
        Insert: {
          approved_by?: string | null
          asset_id?: string | null
          created_at?: string | null
          from_location_id?: string | null
          id?: string
          notes?: string | null
          requested_by?: string | null
          status?: Database["public"]["Enums"]["transfer_status"] | null
          to_location_id?: string | null
          transfer_date?: string | null
          updated_at?: string | null
        }
        Update: {
          approved_by?: string | null
          asset_id?: string | null
          created_at?: string | null
          from_location_id?: string | null
          id?: string
          notes?: string | null
          requested_by?: string | null
          status?: Database["public"]["Enums"]["transfer_status"] | null
          to_location_id?: string | null
          transfer_date?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "asset_transfers_asset_id_fkey"
            columns: ["asset_id"]
            isOneToOne: false
            referencedRelation: "assets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "asset_transfers_from_location_id_fkey"
            columns: ["from_location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "asset_transfers_to_location_id_fkey"
            columns: ["to_location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
        ]
      }
      assets: {
        Row: {
          asset_code: string
          category_id: string | null
          condition: Database["public"]["Enums"]["asset_condition"] | null
          created_at: string | null
          created_by: string
          current_value: number | null
          description: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          location_id: string | null
          manufacturer: string | null
          model: string | null
          name: string
          notes: string | null
          purchase_cost: number | null
          purchase_date: string | null
          serial_number: string | null
          status: Database["public"]["Enums"]["asset_status"] | null
          updated_at: string | null
          updated_by: string | null
          warranty_expiry: string | null
        }
        Insert: {
          asset_code: string
          category_id?: string | null
          condition?: Database["public"]["Enums"]["asset_condition"] | null
          created_at?: string | null
          created_by: string
          current_value?: number | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          location_id?: string | null
          manufacturer?: string | null
          model?: string | null
          name: string
          notes?: string | null
          purchase_cost?: number | null
          purchase_date?: string | null
          serial_number?: string | null
          status?: Database["public"]["Enums"]["asset_status"] | null
          updated_at?: string | null
          updated_by?: string | null
          warranty_expiry?: string | null
        }
        Update: {
          asset_code?: string
          category_id?: string | null
          condition?: Database["public"]["Enums"]["asset_condition"] | null
          created_at?: string | null
          created_by?: string
          current_value?: number | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          location_id?: string | null
          manufacturer?: string | null
          model?: string | null
          name?: string
          notes?: string | null
          purchase_cost?: number | null
          purchase_date?: string | null
          serial_number?: string | null
          status?: Database["public"]["Enums"]["asset_status"] | null
          updated_at?: string | null
          updated_by?: string | null
          warranty_expiry?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "assets_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "asset_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "assets_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
        ]
      }
      attendance: {
        Row: {
          attendance_date: string
          attendance_id: string
          created_at: string | null
          employee_id: string
          hours_worked: number
          overtime_hours: number | null
          status: Database["public"]["Enums"]["attendance_status"]
          unit_id: string | null
          updated_at: string | null
        }
        Insert: {
          attendance_date: string
          attendance_id?: string
          created_at?: string | null
          employee_id: string
          hours_worked: number
          overtime_hours?: number | null
          status?: Database["public"]["Enums"]["attendance_status"]
          unit_id?: string | null
          updated_at?: string | null
        }
        Update: {
          attendance_date?: string
          attendance_id?: string
          created_at?: string | null
          employee_id?: string
          hours_worked?: number
          overtime_hours?: number | null
          status?: Database["public"]["Enums"]["attendance_status"]
          unit_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "attendance_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "payroll_employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendance_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["unit_id"]
          },
        ]
      }
      attendance_bad_backup: {
        Row: {
          attendance_date: string | null
          attendance_id: string | null
          created_at: string | null
          employee_id: string | null
          hours_worked: number | null
          overtime_hours: number | null
          unit_id: string | null
          updated_at: string | null
        }
        Insert: {
          attendance_date?: string | null
          attendance_id?: string | null
          created_at?: string | null
          employee_id?: string | null
          hours_worked?: number | null
          overtime_hours?: number | null
          unit_id?: string | null
          updated_at?: string | null
        }
        Update: {
          attendance_date?: string | null
          attendance_id?: string | null
          created_at?: string | null
          employee_id?: string | null
          hours_worked?: number | null
          overtime_hours?: number | null
          unit_id?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      attendance_bulk_updates: {
        Row: {
          affected_records: number
          batch_id: string
          created_at: string | null
          id: string
          reason: string
          user_id: string | null
        }
        Insert: {
          affected_records?: number
          batch_id?: string
          created_at?: string | null
          id?: string
          reason: string
          user_id?: string | null
        }
        Update: {
          affected_records?: number
          batch_id?: string
          created_at?: string | null
          id?: string
          reason?: string
          user_id?: string | null
        }
        Relationships: []
      }
      audit_gaps: {
        Row: {
          audit_requirement_id: number | null
          created_at: string | null
          gap_status: string | null
          id: string
          notes: string | null
          organisation_id: string | null
        }
        Insert: {
          audit_requirement_id?: number | null
          created_at?: string | null
          gap_status?: string | null
          id?: string
          notes?: string | null
          organisation_id?: string | null
        }
        Update: {
          audit_requirement_id?: number | null
          created_at?: string | null
          gap_status?: string | null
          id?: string
          notes?: string | null
          organisation_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_gaps_audit_requirement_id_fkey"
            columns: ["audit_requirement_id"]
            isOneToOne: false
            referencedRelation: "audit_requirements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "audit_gaps_organisation_id_fkey"
            columns: ["organisation_id"]
            isOneToOne: false
            referencedRelation: "organisations"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_requirements: {
        Row: {
          confidence: number | null
          covered: string | null
          framework_id: number | null
          id: number
          mandatory: boolean | null
          method: string | null
          point_num: string | null
          title: string
        }
        Insert: {
          confidence?: number | null
          covered?: string | null
          framework_id?: number | null
          id?: number
          mandatory?: boolean | null
          method?: string | null
          point_num?: string | null
          title: string
        }
        Update: {
          confidence?: number | null
          covered?: string | null
          framework_id?: number | null
          id?: number
          mandatory?: boolean | null
          method?: string | null
          point_num?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "audit_requirements_framework_id_fkey"
            columns: ["framework_id"]
            isOneToOne: false
            referencedRelation: "frameworks"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_posts: {
        Row: {
          author: string
          category: string
          content: string
          created_at: string
          excerpt: string | null
          featured_image_url: string | null
          id: string
          published: boolean
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          author?: string
          category: string
          content: string
          created_at?: string
          excerpt?: string | null
          featured_image_url?: string | null
          id?: string
          published?: boolean
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          author?: string
          category?: string
          content?: string
          created_at?: string
          excerpt?: string | null
          featured_image_url?: string | null
          id?: string
          published?: boolean
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      bulk_payroll_jobs: {
        Row: {
          completed_at: string | null
          created_at: string | null
          created_by: string | null
          error_details: Json | null
          failed_employees: number | null
          id: string
          month: string
          processed_employees: number | null
          started_at: string | null
          status: string | null
          total_employees: number | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          created_by?: string | null
          error_details?: Json | null
          failed_employees?: number | null
          id?: string
          month: string
          processed_employees?: number | null
          started_at?: string | null
          status?: string | null
          total_employees?: number | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          created_by?: string | null
          error_details?: Json | null
          failed_employees?: number | null
          id?: string
          month?: string
          processed_employees?: number | null
          started_at?: string | null
          status?: string | null
          total_employees?: number | null
        }
        Relationships: []
      }
      categories: {
        Row: {
          category_name: string
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          updated_at: string | null
        }
        Insert: {
          category_name: string
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          updated_at?: string | null
        }
        Update: {
          category_name?: string
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      colour_targets: {
        Row: {
          created_at: string | null
          customer: string | null
          delta_e_threshold: number | null
          id: string
          job_code: string | null
          lab_a: number | null
          lab_b: number | null
          lab_l: number | null
          organisation_id: string | null
        }
        Insert: {
          created_at?: string | null
          customer?: string | null
          delta_e_threshold?: number | null
          id?: string
          job_code?: string | null
          lab_a?: number | null
          lab_b?: number | null
          lab_l?: number | null
          organisation_id?: string | null
        }
        Update: {
          created_at?: string | null
          customer?: string | null
          delta_e_threshold?: number | null
          id?: string
          job_code?: string | null
          lab_a?: number | null
          lab_b?: number | null
          lab_l?: number | null
          organisation_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "colour_targets_organisation_id_fkey"
            columns: ["organisation_id"]
            isOneToOne: false
            referencedRelation: "organisations"
            referencedColumns: ["id"]
          },
        ]
      }
      contacts: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
        }
        Relationships: []
      }
      csv_upload_log: {
        Row: {
          created_at: string
          error_details: Json | null
          failed_rows: number
          file_name: string
          id: string
          successful_rows: number
          total_rows: number
          updated_at: string
          upload_date: string
          upload_type: string
          uploaded_by: string | null
        }
        Insert: {
          created_at?: string
          error_details?: Json | null
          failed_rows?: number
          file_name: string
          id?: string
          successful_rows?: number
          total_rows?: number
          updated_at?: string
          upload_date?: string
          upload_type: string
          uploaded_by?: string | null
        }
        Update: {
          created_at?: string
          error_details?: Json | null
          failed_rows?: number
          file_name?: string
          id?: string
          successful_rows?: number
          total_rows?: number
          updated_at?: string
          upload_date?: string
          upload_type?: string
          uploaded_by?: string | null
        }
        Relationships: []
      }
      daily_stock_snapshots: {
        Row: {
          created_at: string | null
          id: string
          metadata: Json | null
          record_count: number
          snapshot_data: Json
          snapshot_date: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          metadata?: Json | null
          record_count?: number
          snapshot_data: Json
          snapshot_date?: string
        }
        Update: {
          created_at?: string | null
          id?: string
          metadata?: Json | null
          record_count?: number
          snapshot_data?: Json
          snapshot_date?: string
        }
        Relationships: []
      }
      daily_stock_summary: {
        Row: {
          closing_qty: number | null
          created_at: string | null
          id: string
          issued_qty: number | null
          item_code: string
          opening_qty: number | null
          received_qty: number | null
          summary_date: string | null
        }
        Insert: {
          closing_qty?: number | null
          created_at?: string | null
          id?: string
          issued_qty?: number | null
          item_code: string
          opening_qty?: number | null
          received_qty?: number | null
          summary_date?: string | null
        }
        Update: {
          closing_qty?: number | null
          created_at?: string | null
          id?: string
          issued_qty?: number | null
          item_code?: string
          opening_qty?: number | null
          received_qty?: number | null
          summary_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "daily_stock_summary_item_code_fkey"
            columns: ["item_code"]
            isOneToOne: false
            referencedRelation: "item_master"
            referencedColumns: ["item_code"]
          },
          {
            foreignKeyName: "daily_stock_summary_item_code_fkey"
            columns: ["item_code"]
            isOneToOne: false
            referencedRelation: "stock_summary"
            referencedColumns: ["item_code"]
          },
        ]
      }
      deck_viscosity_readings: {
        Row: {
          captured_at: string
          captured_by: string | null
          deck_id: string
          id: string
          job_id: string | null
          viscosity_cps: number
        }
        Insert: {
          captured_at?: string
          captured_by?: string | null
          deck_id: string
          id?: string
          job_id?: string | null
          viscosity_cps: number
        }
        Update: {
          captured_at?: string
          captured_by?: string | null
          deck_id?: string
          id?: string
          job_id?: string | null
          viscosity_cps?: number
        }
        Relationships: [
          {
            foreignKeyName: "deck_viscosity_readings_captured_by_fkey"
            columns: ["captured_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deck_viscosity_readings_deck_id_fkey"
            columns: ["deck_id"]
            isOneToOne: false
            referencedRelation: "press_decks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deck_viscosity_readings_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      document_requirements: {
        Row: {
          document_id: string
          mapped_on: string | null
          requirement_id: number
        }
        Insert: {
          document_id: string
          mapped_on?: string | null
          requirement_id: number
        }
        Update: {
          document_id?: string
          mapped_on?: string | null
          requirement_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "document_requirements_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "document_requirements_requirement_id_fkey"
            columns: ["requirement_id"]
            isOneToOne: false
            referencedRelation: "audit_requirements"
            referencedColumns: ["id"]
          },
        ]
      }
      document_smeta_map: {
        Row: {
          document_id: string
          smeta_point_id: number
        }
        Insert: {
          document_id: string
          smeta_point_id: number
        }
        Update: {
          document_id?: string
          smeta_point_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "document_smeta_map_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "document_smeta_map_smeta_point_id_fkey"
            columns: ["smeta_point_id"]
            isOneToOne: false
            referencedRelation: "smeta_points"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          created_at: string | null
          doc_number: string | null
          drive_id: string | null
          file_url: string | null
          framework_id: number | null
          id: string
          issue_date: string | null
          next_review: string | null
          organisation_id: string | null
          parsed_on: string | null
          raw_meta: Json | null
          status: string | null
          title: string
          uploaded_by: string | null
          version: string | null
        }
        Insert: {
          created_at?: string | null
          doc_number?: string | null
          drive_id?: string | null
          file_url?: string | null
          framework_id?: number | null
          id?: string
          issue_date?: string | null
          next_review?: string | null
          organisation_id?: string | null
          parsed_on?: string | null
          raw_meta?: Json | null
          status?: string | null
          title: string
          uploaded_by?: string | null
          version?: string | null
        }
        Update: {
          created_at?: string | null
          doc_number?: string | null
          drive_id?: string | null
          file_url?: string | null
          framework_id?: number | null
          id?: string
          issue_date?: string | null
          next_review?: string | null
          organisation_id?: string | null
          parsed_on?: string | null
          raw_meta?: Json | null
          status?: string | null
          title?: string
          uploaded_by?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "documents_framework_id_fkey"
            columns: ["framework_id"]
            isOneToOne: false
            referencedRelation: "frameworks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_organisation_id_fkey"
            columns: ["organisation_id"]
            isOneToOne: false
            referencedRelation: "organisations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      email_queue: {
        Row: {
          attachment_name: string | null
          attempts: number | null
          created_at: string | null
          error_message: string | null
          html_content: string
          id: string
          max_attempts: number | null
          pdf_attachment: string | null
          scheduled_for: string | null
          sent_at: string | null
          status: string | null
          subject: string
          to_email: string
        }
        Insert: {
          attachment_name?: string | null
          attempts?: number | null
          created_at?: string | null
          error_message?: string | null
          html_content: string
          id?: string
          max_attempts?: number | null
          pdf_attachment?: string | null
          scheduled_for?: string | null
          sent_at?: string | null
          status?: string | null
          subject: string
          to_email: string
        }
        Update: {
          attachment_name?: string | null
          attempts?: number | null
          created_at?: string | null
          error_message?: string | null
          html_content?: string
          id?: string
          max_attempts?: number | null
          pdf_attachment?: string | null
          scheduled_for?: string | null
          sent_at?: string | null
          status?: string | null
          subject?: string
          to_email?: string
        }
        Relationships: []
      }
      employee_code_sequences: {
        Row: {
          created_at: string | null
          id: string
          last_sequence: number
          unit_code: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          last_sequence?: number
          unit_code: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          last_sequence?: number
          unit_code?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      employee_leave_balances: {
        Row: {
          casual_leave_balance: number
          earned_leave_balance: number
          employee_id: string
          id: string
          year: number
        }
        Insert: {
          casual_leave_balance?: number
          earned_leave_balance?: number
          employee_id: string
          id?: string
          year?: number
        }
        Update: {
          casual_leave_balance?: number
          earned_leave_balance?: number
          employee_id?: string
          id?: string
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "employee_leave_balances_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "payroll_employees"
            referencedColumns: ["id"]
          },
        ]
      }
      employee_variable_overrides: {
        Row: {
          created_at: string | null
          effective_from: string
          effective_to: string | null
          employee_id: string | null
          id: string
          override_value: number
          variable_id: string | null
        }
        Insert: {
          created_at?: string | null
          effective_from?: string
          effective_to?: string | null
          employee_id?: string | null
          id?: string
          override_value: number
          variable_id?: string | null
        }
        Update: {
          created_at?: string | null
          effective_from?: string
          effective_to?: string | null
          employee_id?: string | null
          id?: string
          override_value?: number
          variable_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employee_variable_overrides_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "payroll_employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_variable_overrides_variable_id_fkey"
            columns: ["variable_id"]
            isOneToOne: false
            referencedRelation: "formula_variables"
            referencedColumns: ["id"]
          },
        ]
      }
      employees: {
        Row: {
          aadhaar_number: string | null
          basic_salary: number | null
          created_at: string | null
          ctc: number | null
          date_of_birth: string | null
          date_of_joining: string | null
          email: string | null
          employee_id: string
          employee_name: string | null
          leaves_left: number | null
          leaves_used: number | null
          others: number | null
          pan_number: string | null
          updated_at: string | null
        }
        Insert: {
          aadhaar_number?: string | null
          basic_salary?: number | null
          created_at?: string | null
          ctc?: number | null
          date_of_birth?: string | null
          date_of_joining?: string | null
          email?: string | null
          employee_id: string
          employee_name?: string | null
          leaves_left?: number | null
          leaves_used?: number | null
          others?: number | null
          pan_number?: string | null
          updated_at?: string | null
        }
        Update: {
          aadhaar_number?: string | null
          basic_salary?: number | null
          created_at?: string | null
          ctc?: number | null
          date_of_birth?: string | null
          date_of_joining?: string | null
          email?: string | null
          employee_id?: string
          employee_name?: string | null
          leaves_left?: number | null
          leaves_used?: number | null
          others?: number | null
          pan_number?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      enrollments: {
        Row: {
          age: number
          course_selected: string
          created_at: string
          email: string
          id: string
          parent_name: string
          phone: string | null
          student_name: string
        }
        Insert: {
          age: number
          course_selected: string
          created_at?: string
          email: string
          id?: string
          parent_name: string
          phone?: string | null
          student_name: string
        }
        Update: {
          age?: number
          course_selected?: string
          created_at?: string
          email?: string
          id?: string
          parent_name?: string
          phone?: string | null
          student_name?: string
        }
        Relationships: []
      }
      experiences: {
        Row: {
          created_at: string
          details: string | null
          from_year: number
          id: string
          institution: string
          role: string
          to_year: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          details?: string | null
          from_year: number
          id?: string
          institution: string
          role: string
          to_year?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          details?: string | null
          from_year?: number
          id?: string
          institution?: string
          role?: string
          to_year?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      financial_document_links: {
        Row: {
          created_at: string
          date_added: string
          display_order: number
          document_type: string
          dropbox_url: string
          fiscal_year: string
          id: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          date_added?: string
          display_order?: number
          document_type: string
          dropbox_url: string
          fiscal_year: string
          id?: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          date_added?: string
          display_order?: number
          document_type?: string
          dropbox_url?: string
          fiscal_year?: string
          id?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      financial_kpis: {
        Row: {
          created_at: string
          id: string
          last_updated: string
          metric_name: string
          percentage: number | null
          period: string
          ticker: string
          value: number | null
        }
        Insert: {
          created_at?: string
          id?: string
          last_updated?: string
          metric_name: string
          percentage?: number | null
          period: string
          ticker?: string
          value?: number | null
        }
        Update: {
          created_at?: string
          id?: string
          last_updated?: string
          metric_name?: string
          percentage?: number | null
          period?: string
          ticker?: string
          value?: number | null
        }
        Relationships: []
      }
      financial_page_config: {
        Row: {
          config_key: string
          config_value: Json
          created_at: string
          id: string
          is_active: boolean
          section_type: string
          updated_at: string
        }
        Insert: {
          config_key: string
          config_value: Json
          created_at?: string
          id?: string
          is_active?: boolean
          section_type: string
          updated_at?: string
        }
        Update: {
          config_key?: string
          config_value?: Json
          created_at?: string
          id?: string
          is_active?: boolean
          section_type?: string
          updated_at?: string
        }
        Relationships: []
      }
      formula_variables: {
        Row: {
          active: boolean | null
          calculation_expression: string | null
          created_at: string | null
          default_value: number | null
          description: string | null
          display_name: string
          id: string
          name: string
          updated_at: string | null
          variable_type: Database["public"]["Enums"]["variable_type"]
        }
        Insert: {
          active?: boolean | null
          calculation_expression?: string | null
          created_at?: string | null
          default_value?: number | null
          description?: string | null
          display_name: string
          id?: string
          name: string
          updated_at?: string | null
          variable_type: Database["public"]["Enums"]["variable_type"]
        }
        Update: {
          active?: boolean | null
          calculation_expression?: string | null
          created_at?: string | null
          default_value?: number | null
          description?: string | null
          display_name?: string
          id?: string
          name?: string
          updated_at?: string | null
          variable_type?: Database["public"]["Enums"]["variable_type"]
        }
        Relationships: []
      }
      frameworks: {
        Row: {
          code: string
          id: number
          name: string
        }
        Insert: {
          code: string
          id?: number
          name: string
        }
        Update: {
          code?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      grn_log: {
        Row: {
          created_at: string | null
          grn_date: string | null
          grn_number: string
          id: string
          item_code: string
          qty_received: number
          remarks: string | null
          supplier: string | null
          total_value: number | null
          unit_price: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          grn_date?: string | null
          grn_number: string
          id?: string
          item_code: string
          qty_received: number
          remarks?: string | null
          supplier?: string | null
          total_value?: number | null
          unit_price?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          grn_date?: string | null
          grn_number?: string
          id?: string
          item_code?: string
          qty_received?: number
          remarks?: string | null
          supplier?: string | null
          total_value?: number | null
          unit_price?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "grn_log_item_code_fkey"
            columns: ["item_code"]
            isOneToOne: false
            referencedRelation: "item_master"
            referencedColumns: ["item_code"]
          },
          {
            foreignKeyName: "grn_log_item_code_fkey"
            columns: ["item_code"]
            isOneToOne: false
            referencedRelation: "stock_summary"
            referencedColumns: ["item_code"]
          },
        ]
      }
      investor_document_links: {
        Row: {
          created_at: string
          date_added: string
          display_order: number
          document_category: string
          dropbox_url: string
          fiscal_year: string
          id: string
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          date_added?: string
          display_order?: number
          document_category: string
          dropbox_url: string
          fiscal_year: string
          id?: string
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          date_added?: string
          display_order?: number
          document_category?: string
          dropbox_url?: string
          fiscal_year?: string
          id?: string
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      investor_page_config: {
        Row: {
          config_key: string
          config_value: Json
          created_at: string
          id: string
          is_active: boolean
          page_type: string
          section_type: string
          updated_at: string
        }
        Insert: {
          config_key: string
          config_value: Json
          created_at?: string
          id?: string
          is_active?: boolean
          page_type: string
          section_type: string
          updated_at?: string
        }
        Update: {
          config_key?: string
          config_value?: Json
          created_at?: string
          id?: string
          is_active?: boolean
          page_type?: string
          section_type?: string
          updated_at?: string
        }
        Relationships: []
      }
      issue_log: {
        Row: {
          created_at: string | null
          id: string
          issue_date: string | null
          issue_number: string
          issued_to: string | null
          item_code: string
          purpose: string | null
          qty_issued: number
          remarks: string | null
          total_cost: number | null
          unit_cost: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          issue_date?: string | null
          issue_number: string
          issued_to?: string | null
          item_code: string
          purpose?: string | null
          qty_issued: number
          remarks?: string | null
          total_cost?: number | null
          unit_cost?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          issue_date?: string | null
          issue_number?: string
          issued_to?: string | null
          item_code?: string
          purpose?: string | null
          qty_issued?: number
          remarks?: string | null
          total_cost?: number | null
          unit_cost?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "issue_log_item_code_fkey"
            columns: ["item_code"]
            isOneToOne: false
            referencedRelation: "item_master"
            referencedColumns: ["item_code"]
          },
          {
            foreignKeyName: "issue_log_item_code_fkey"
            columns: ["item_code"]
            isOneToOne: false
            referencedRelation: "stock_summary"
            referencedColumns: ["item_code"]
          },
        ]
      }
      item_master: {
        Row: {
          category_id: string | null
          created_at: string | null
          customer_name: string | null
          dimensions: string | null
          file_hyperlink: string | null
          file_id: string | null
          id: string
          is_active: boolean | null
          item_code: string
          item_name: string
          no_of_colours: string | null
          status: string | null
          uom: string | null
          updated_at: string | null
        }
        Insert: {
          category_id?: string | null
          created_at?: string | null
          customer_name?: string | null
          dimensions?: string | null
          file_hyperlink?: string | null
          file_id?: string | null
          id?: string
          is_active?: boolean | null
          item_code: string
          item_name: string
          no_of_colours?: string | null
          status?: string | null
          uom?: string | null
          updated_at?: string | null
        }
        Update: {
          category_id?: string | null
          created_at?: string | null
          customer_name?: string | null
          dimensions?: string | null
          file_hyperlink?: string | null
          file_id?: string | null
          id?: string
          is_active?: boolean | null
          item_code?: string
          item_name?: string
          no_of_colours?: string | null
          status?: string | null
          uom?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "item_master_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "item_master_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "stock_summary"
            referencedColumns: ["category_id"]
          },
        ]
      }
      jobs: {
        Row: {
          colour_target_id: string | null
          id: string
          job_ref: string | null
          organisation_id: string | null
          press_id: string | null
          scheduled_at: string | null
          status: string | null
        }
        Insert: {
          colour_target_id?: string | null
          id?: string
          job_ref?: string | null
          organisation_id?: string | null
          press_id?: string | null
          scheduled_at?: string | null
          status?: string | null
        }
        Update: {
          colour_target_id?: string | null
          id?: string
          job_ref?: string | null
          organisation_id?: string | null
          press_id?: string | null
          scheduled_at?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "jobs_colour_target_id_fkey"
            columns: ["colour_target_id"]
            isOneToOne: false
            referencedRelation: "colour_targets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jobs_organisation_id_fkey"
            columns: ["organisation_id"]
            isOneToOne: false
            referencedRelation: "organisations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jobs_press_id_fkey"
            columns: ["press_id"]
            isOneToOne: false
            referencedRelation: "presses"
            referencedColumns: ["id"]
          },
        ]
      }
      leave_requests: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          employee_id: string | null
          end_date: string | null
          id: string
          num_days: number | null
          reason: string | null
          requested_at: string | null
          start_date: string | null
          status: string | null
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          employee_id?: string | null
          end_date?: string | null
          id?: string
          num_days?: number | null
          reason?: string | null
          requested_at?: string | null
          start_date?: string | null
          status?: string | null
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          employee_id?: string | null
          end_date?: string | null
          id?: string
          num_days?: number | null
          reason?: string | null
          requested_at?: string | null
          start_date?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "leave_requests_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["employee_id"]
          },
        ]
      }
      locations: {
        Row: {
          address: string | null
          city: string | null
          code: string
          country: string | null
          created_at: string | null
          id: string
          is_active: boolean | null
          name: string
          postal_code: string | null
          state: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          code: string
          country?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          postal_code?: string | null
          state?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          code?: string
          country?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          postal_code?: string | null
          state?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      master_data_artworks_dkpkl: {
        Row: {
          customer_name: string | null
          dimensions: string | null
          file_hyperlink: string | null
          file_id: string | null
          item_code: string
          item_name: string | null
          no_of_colours: string | null
        }
        Insert: {
          customer_name?: string | null
          dimensions?: string | null
          file_hyperlink?: string | null
          file_id?: string | null
          item_code: string
          item_name?: string | null
          no_of_colours?: string | null
        }
        Update: {
          customer_name?: string | null
          dimensions?: string | null
          file_hyperlink?: string | null
          file_id?: string | null
          item_code?: string
          item_name?: string | null
          no_of_colours?: string | null
        }
        Relationships: []
      }
      master_data_artworks_dkpkl_bak: {
        Row: {
          Customer_Name: string | null
          Dimensions: string | null
          file_hyperlink: string | null
          file_id: string | null
          Item_Code: string | null
          Item_Name: string | null
          No_of_Colours: string | null
        }
        Insert: {
          Customer_Name?: string | null
          Dimensions?: string | null
          file_hyperlink?: string | null
          file_id?: string | null
          Item_Code?: string | null
          Item_Name?: string | null
          No_of_Colours?: string | null
        }
        Update: {
          Customer_Name?: string | null
          Dimensions?: string | null
          file_hyperlink?: string | null
          file_id?: string | null
          Item_Code?: string | null
          Item_Name?: string | null
          No_of_Colours?: string | null
        }
        Relationships: []
      }
      master_data_artworks_dkpkl_cylinder_name: {
        Row: {
          colour: string | null
          created_at: string
          customer_name: string | null
          cylinder_code: string
          item_code: string
          last_run: string | null
          location: string | null
          manufacturer: string | null
          mileage_m: number | null
          remarks: string | null
          type: string | null
        }
        Insert: {
          colour?: string | null
          created_at?: string
          customer_name?: string | null
          cylinder_code: string
          item_code: string
          last_run?: string | null
          location?: string | null
          manufacturer?: string | null
          mileage_m?: number | null
          remarks?: string | null
          type?: string | null
        }
        Update: {
          colour?: string | null
          created_at?: string
          customer_name?: string | null
          cylinder_code?: string
          item_code?: string
          last_run?: string | null
          location?: string | null
          manufacturer?: string | null
          mileage_m?: number | null
          remarks?: string | null
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_cylinder_item_code"
            columns: ["item_code"]
            isOneToOne: false
            referencedRelation: "master_data_artworks_dkpkl"
            referencedColumns: ["item_code"]
          },
        ]
      }
      master_data_artworks_se: {
        Row: {
          circum: number | null
          coil_size: string | null
          customer_name: string | null
          cut_length: string | null
          cyl_qty: string | null
          dimensions: string | null
          file_hyperlink: string | null
          file_id: string | null
          item_code: string
          item_name: string | null
          last_run: string | null
          length: string | null
          location: string | null
          mielage_m: string | null
          no_of_colours: string | null
          qr_code: string | null
          remarks: string | null
          total_runs: string | null
          ups: number | null
        }
        Insert: {
          circum?: number | null
          coil_size?: string | null
          customer_name?: string | null
          cut_length?: string | null
          cyl_qty?: string | null
          dimensions?: string | null
          file_hyperlink?: string | null
          file_id?: string | null
          item_code: string
          item_name?: string | null
          last_run?: string | null
          length?: string | null
          location?: string | null
          mielage_m?: string | null
          no_of_colours?: string | null
          qr_code?: string | null
          remarks?: string | null
          total_runs?: string | null
          ups?: number | null
        }
        Update: {
          circum?: number | null
          coil_size?: string | null
          customer_name?: string | null
          cut_length?: string | null
          cyl_qty?: string | null
          dimensions?: string | null
          file_hyperlink?: string | null
          file_id?: string | null
          item_code?: string
          item_name?: string | null
          last_run?: string | null
          length?: string | null
          location?: string | null
          mielage_m?: string | null
          no_of_colours?: string | null
          qr_code?: string | null
          remarks?: string | null
          total_runs?: string | null
          ups?: number | null
        }
        Relationships: []
      }
      master_data_artworks_se_bak: {
        Row: {
          Customer_Name: string | null
          Dimensions: string | null
          file_hyperlink: string | null
          file_id: string | null
          Item_Code: string | null
          Item_Name: string | null
          No_of_Colours: string | null
        }
        Insert: {
          Customer_Name?: string | null
          Dimensions?: string | null
          file_hyperlink?: string | null
          file_id?: string | null
          Item_Code?: string | null
          Item_Name?: string | null
          No_of_Colours?: string | null
        }
        Update: {
          Customer_Name?: string | null
          Dimensions?: string | null
          file_hyperlink?: string | null
          file_id?: string | null
          Item_Code?: string | null
          Item_Name?: string | null
          No_of_Colours?: string | null
        }
        Relationships: []
      }
      media: {
        Row: {
          album_id: string | null
          artist_id: string | null
          created_at: string | null
          duration: number | null
          file_size: number | null
          height: number | null
          id: string
          media_type: Database["public"]["Enums"]["media_type"]
          path: string
          title: string | null
          track_no: number | null
          updated_at: string | null
          width: number | null
        }
        Insert: {
          album_id?: string | null
          artist_id?: string | null
          created_at?: string | null
          duration?: number | null
          file_size?: number | null
          height?: number | null
          id?: string
          media_type?: Database["public"]["Enums"]["media_type"]
          path: string
          title?: string | null
          track_no?: number | null
          updated_at?: string | null
          width?: number | null
        }
        Update: {
          album_id?: string | null
          artist_id?: string | null
          created_at?: string | null
          duration?: number | null
          file_size?: number | null
          height?: number | null
          id?: string
          media_type?: Database["public"]["Enums"]["media_type"]
          path?: string
          title?: string | null
          track_no?: number | null
          updated_at?: string | null
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "media_album_id_fkey"
            columns: ["album_id"]
            isOneToOne: false
            referencedRelation: "albums"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "media_artist_id_fkey"
            columns: ["artist_id"]
            isOneToOne: false
            referencedRelation: "artists"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          event: string
          id: string
          organisation_id: string | null
          payload: Json | null
          sent_at: string | null
        }
        Insert: {
          event: string
          id?: string
          organisation_id?: string | null
          payload?: Json | null
          sent_at?: string | null
        }
        Update: {
          event?: string
          id?: string
          organisation_id?: string | null
          payload?: Json | null
          sent_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_organisation_id_fkey"
            columns: ["organisation_id"]
            isOneToOne: false
            referencedRelation: "organisations"
            referencedColumns: ["id"]
          },
        ]
      }
      orders_dashboard_dkpkl: {
        Row: {
          created_at: string | null
          created_by: string | null
          date: string | null
          id: string
          item_code: string | null
          item_name: string | null
          job_setup_min: number | null
          last_activity: string | null
          length_m: number | null
          po_number: string | null
          reel_weight_final_kg: number | null
          reel_weight_initial_kg: number | null
          reel_width_mm: number | null
          substrate: string
          substrate_id: string | null
          uiorn: string | null
          updated_at: string | null
          wastage_kg: number | null
          xrite_a: number | null
          xrite_b: number | null
          xrite_de: number | null
          xrite_l: number | null
          xrite_status: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          date?: string | null
          id?: string
          item_code?: string | null
          item_name?: string | null
          job_setup_min?: number | null
          last_activity?: string | null
          length_m?: number | null
          po_number?: string | null
          reel_weight_final_kg?: number | null
          reel_weight_initial_kg?: number | null
          reel_width_mm?: number | null
          substrate: string
          substrate_id?: string | null
          uiorn?: string | null
          updated_at?: string | null
          wastage_kg?: number | null
          xrite_a?: number | null
          xrite_b?: number | null
          xrite_de?: number | null
          xrite_l?: number | null
          xrite_status?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          date?: string | null
          id?: string
          item_code?: string | null
          item_name?: string | null
          job_setup_min?: number | null
          last_activity?: string | null
          length_m?: number | null
          po_number?: string | null
          reel_weight_final_kg?: number | null
          reel_weight_initial_kg?: number | null
          reel_width_mm?: number | null
          substrate?: string
          substrate_id?: string | null
          uiorn?: string | null
          updated_at?: string | null
          wastage_kg?: number | null
          xrite_a?: number | null
          xrite_b?: number | null
          xrite_de?: number | null
          xrite_l?: number | null
          xrite_status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_item"
            columns: ["item_code"]
            isOneToOne: false
            referencedRelation: "master_data_artworks_dkpkl"
            referencedColumns: ["item_code"]
          },
          {
            foreignKeyName: "fk_orders_item"
            columns: ["item_code"]
            isOneToOne: false
            referencedRelation: "master_data_artworks_dkpkl"
            referencedColumns: ["item_code"]
          },
          {
            foreignKeyName: "fk_sub"
            columns: ["substrate"]
            isOneToOne: false
            referencedRelation: "substrate_master_dkpkl"
            referencedColumns: ["substrate_name"]
          },
          {
            foreignKeyName: "fk_substrate"
            columns: ["substrate"]
            isOneToOne: false
            referencedRelation: "substrate_master_dkpkl"
            referencedColumns: ["substrate_name"]
          },
        ]
      }
      orders_dashboard_dkpkl_history: {
        Row: {
          created_at: string | null
          created_by: string | null
          date: string | null
          id: string | null
          item_code: string | null
          item_name: string | null
          job_setup_min: number | null
          last_activity: string | null
          length_m: number | null
          logged_at: string | null
          po_number: string | null
          reel_weight_final_kg: number | null
          reel_weight_initial_kg: number | null
          reel_width_mm: number | null
          substrate: string | null
          uiorn: string | null
          updated_at: string | null
          wastage_kg: number | null
          xrite_a: number | null
          xrite_b: number | null
          xrite_de: number | null
          xrite_l: number | null
          xrite_status: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          date?: string | null
          id?: string | null
          item_code?: string | null
          item_name?: string | null
          job_setup_min?: number | null
          last_activity?: string | null
          length_m?: number | null
          logged_at?: string | null
          po_number?: string | null
          reel_weight_final_kg?: number | null
          reel_weight_initial_kg?: number | null
          reel_width_mm?: number | null
          substrate?: string | null
          uiorn?: string | null
          updated_at?: string | null
          wastage_kg?: number | null
          xrite_a?: number | null
          xrite_b?: number | null
          xrite_de?: number | null
          xrite_l?: number | null
          xrite_status?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          date?: string | null
          id?: string | null
          item_code?: string | null
          item_name?: string | null
          job_setup_min?: number | null
          last_activity?: string | null
          length_m?: number | null
          logged_at?: string | null
          po_number?: string | null
          reel_weight_final_kg?: number | null
          reel_weight_initial_kg?: number | null
          reel_width_mm?: number | null
          substrate?: string | null
          uiorn?: string | null
          updated_at?: string | null
          wastage_kg?: number | null
          xrite_a?: number | null
          xrite_b?: number | null
          xrite_de?: number | null
          xrite_l?: number | null
          xrite_status?: string | null
        }
        Relationships: []
      }
      orders_dashboard_se: {
        Row: {
          adhesive_coating_done_at: string | null
          created_at: string | null
          created_by: string | null
          date: string | null
          dispatch_done_at: string | null
          id: string
          item_code: string | null
          item_name: string | null
          job_setup_min: number | null
          lamination_done_at: string | null
          last_activity: string | null
          length_m: number | null
          po_number: string | null
          printing_done_at: string | null
          reel_weight_final_kg: number | null
          reel_weight_initial_kg: number | null
          reel_width_mm: number | null
          slitting_done_at: string | null
          substrate: string
          uiorn: string | null
          updated_at: string | null
          wastage_kg: number | null
          xrite_a: number | null
          xrite_b: number | null
          xrite_de: number | null
          xrite_l: number | null
          xrite_status: string | null
        }
        Insert: {
          adhesive_coating_done_at?: string | null
          created_at?: string | null
          created_by?: string | null
          date?: string | null
          dispatch_done_at?: string | null
          id?: string
          item_code?: string | null
          item_name?: string | null
          job_setup_min?: number | null
          lamination_done_at?: string | null
          last_activity?: string | null
          length_m?: number | null
          po_number?: string | null
          printing_done_at?: string | null
          reel_weight_final_kg?: number | null
          reel_weight_initial_kg?: number | null
          reel_width_mm?: number | null
          slitting_done_at?: string | null
          substrate: string
          uiorn?: string | null
          updated_at?: string | null
          wastage_kg?: number | null
          xrite_a?: number | null
          xrite_b?: number | null
          xrite_de?: number | null
          xrite_l?: number | null
          xrite_status?: string | null
        }
        Update: {
          adhesive_coating_done_at?: string | null
          created_at?: string | null
          created_by?: string | null
          date?: string | null
          dispatch_done_at?: string | null
          id?: string
          item_code?: string | null
          item_name?: string | null
          job_setup_min?: number | null
          lamination_done_at?: string | null
          last_activity?: string | null
          length_m?: number | null
          po_number?: string | null
          printing_done_at?: string | null
          reel_weight_final_kg?: number | null
          reel_weight_initial_kg?: number | null
          reel_width_mm?: number | null
          slitting_done_at?: string | null
          substrate?: string
          uiorn?: string | null
          updated_at?: string | null
          wastage_kg?: number | null
          xrite_a?: number | null
          xrite_b?: number | null
          xrite_de?: number | null
          xrite_l?: number | null
          xrite_status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_dashboard_se_item_code_fkey"
            columns: ["item_code"]
            isOneToOne: false
            referencedRelation: "master_data_artworks_se"
            referencedColumns: ["item_code"]
          },
          {
            foreignKeyName: "orders_dashboard_se_substrate_fkey"
            columns: ["substrate"]
            isOneToOne: false
            referencedRelation: "substrate_master_se"
            referencedColumns: ["substrate_name"]
          },
        ]
      }
      orders_dashboard_se_history: {
        Row: {
          created_at: string | null
          created_by: string | null
          date: string | null
          id: string | null
          item_code: string | null
          item_name: string | null
          job_setup_min: number | null
          last_activity: string | null
          length_m: number | null
          logged_at: string | null
          po_number: string | null
          reel_weight_final_kg: number | null
          reel_weight_initial_kg: number | null
          reel_width_mm: number | null
          substrate: string | null
          uiorn: string | null
          updated_at: string | null
          wastage_kg: number | null
          xrite_a: number | null
          xrite_b: number | null
          xrite_de: number | null
          xrite_l: number | null
          xrite_status: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          date?: string | null
          id?: string | null
          item_code?: string | null
          item_name?: string | null
          job_setup_min?: number | null
          last_activity?: string | null
          length_m?: number | null
          logged_at?: string | null
          po_number?: string | null
          reel_weight_final_kg?: number | null
          reel_weight_initial_kg?: number | null
          reel_width_mm?: number | null
          substrate?: string | null
          uiorn?: string | null
          updated_at?: string | null
          wastage_kg?: number | null
          xrite_a?: number | null
          xrite_b?: number | null
          xrite_de?: number | null
          xrite_l?: number | null
          xrite_status?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          date?: string | null
          id?: string | null
          item_code?: string | null
          item_name?: string | null
          job_setup_min?: number | null
          last_activity?: string | null
          length_m?: number | null
          logged_at?: string | null
          po_number?: string | null
          reel_weight_final_kg?: number | null
          reel_weight_initial_kg?: number | null
          reel_width_mm?: number | null
          substrate?: string | null
          uiorn?: string | null
          updated_at?: string | null
          wastage_kg?: number | null
          xrite_a?: number | null
          xrite_b?: number | null
          xrite_de?: number | null
          xrite_l?: number | null
          xrite_status?: string | null
        }
        Relationships: []
      }
      org_tokens: {
        Row: {
          last_reset: string | null
          organisation_id: string
          remaining: number | null
        }
        Insert: {
          last_reset?: string | null
          organisation_id: string
          remaining?: number | null
        }
        Update: {
          last_reset?: string | null
          organisation_id?: string
          remaining?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "org_tokens_organisation_id_fkey"
            columns: ["organisation_id"]
            isOneToOne: true
            referencedRelation: "organisations"
            referencedColumns: ["id"]
          },
        ]
      }
      organisations: {
        Row: {
          created_at: string | null
          id: string
          name: string
          plan: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          plan?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          plan?: string | null
        }
        Relationships: []
      }
      organizations: {
        Row: {
          code: string
          created_at: string
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      payroll_audit_log: {
        Row: {
          id: string
          new_data: Json | null
          old_data: Json | null
          operation: string
          table_name: string
          timestamp: string | null
          user_id: string | null
        }
        Insert: {
          id?: string
          new_data?: Json | null
          old_data?: Json | null
          operation: string
          table_name: string
          timestamp?: string | null
          user_id?: string | null
        }
        Update: {
          id?: string
          new_data?: Json | null
          old_data?: Json | null
          operation?: string
          table_name?: string
          timestamp?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      payroll_calculation_audit: {
        Row: {
          calculated_at: string | null
          calculated_by: string | null
          calculation_details: Json
          employee_id: string | null
          formula_snapshot: Json
          id: string
          month: string
        }
        Insert: {
          calculated_at?: string | null
          calculated_by?: string | null
          calculation_details: Json
          employee_id?: string | null
          formula_snapshot: Json
          id?: string
          month: string
        }
        Update: {
          calculated_at?: string | null
          calculated_by?: string | null
          calculation_details?: Json
          employee_id?: string | null
          formula_snapshot?: Json
          id?: string
          month?: string
        }
        Relationships: [
          {
            foreignKeyName: "payroll_calculation_audit_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "payroll_employees"
            referencedColumns: ["id"]
          },
        ]
      }
      payroll_employees: {
        Row: {
          aadhaar_number: string | null
          active: boolean | null
          base_salary: number
          created_at: string | null
          employee_code: string | null
          hra_amount: number | null
          id: string
          joining_date: string
          name: string
          other_conv_amount: number | null
          pan_number: string | null
          uan_number: string
          unit_id: string | null
          updated_at: string | null
        }
        Insert: {
          aadhaar_number?: string | null
          active?: boolean | null
          base_salary: number
          created_at?: string | null
          employee_code?: string | null
          hra_amount?: number | null
          id?: string
          joining_date: string
          name: string
          other_conv_amount?: number | null
          pan_number?: string | null
          uan_number: string
          unit_id?: string | null
          updated_at?: string | null
        }
        Update: {
          aadhaar_number?: string | null
          active?: boolean | null
          base_salary?: number
          created_at?: string | null
          employee_code?: string | null
          hra_amount?: number | null
          id?: string
          joining_date?: string
          name?: string
          other_conv_amount?: number | null
          pan_number?: string | null
          uan_number?: string
          unit_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payroll_employees_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["unit_id"]
          },
        ]
      }
      payroll_formulas: {
        Row: {
          active: boolean | null
          created_at: string | null
          created_by: string | null
          description: string | null
          effective_from: string
          effective_to: string | null
          expression: string
          formula_type: Database["public"]["Enums"]["formula_type"]
          id: string
          name: string
          updated_at: string | null
          version: number | null
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          effective_from?: string
          effective_to?: string | null
          expression: string
          formula_type: Database["public"]["Enums"]["formula_type"]
          id?: string
          name: string
          updated_at?: string | null
          version?: number | null
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          effective_from?: string
          effective_to?: string | null
          expression?: string
          formula_type?: Database["public"]["Enums"]["formula_type"]
          id?: string
          name?: string
          updated_at?: string | null
          version?: number | null
        }
        Relationships: []
      }
      payroll_settings: {
        Row: {
          created_at: string | null
          effective_from: string
          esi_rate: number
          lwf_amount: number
          pf_rate: number
          setting_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          effective_from: string
          esi_rate: number
          lwf_amount?: number
          pf_rate: number
          setting_id?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          effective_from?: string
          esi_rate?: number
          lwf_amount?: number
          pf_rate?: number
          setting_id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      press_decks: {
        Row: {
          colour: string | null
          created_at: string | null
          deck_no: number
          id: string
          press_id: string | null
        }
        Insert: {
          colour?: string | null
          created_at?: string | null
          deck_no: number
          id?: string
          press_id?: string | null
        }
        Update: {
          colour?: string | null
          created_at?: string | null
          deck_no?: number
          id?: string
          press_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "press_decks_press_id_fkey"
            columns: ["press_id"]
            isOneToOne: false
            referencedRelation: "presses"
            referencedColumns: ["id"]
          },
        ]
      }
      presses: {
        Row: {
          created_at: string | null
          id: string
          name: string | null
          organisation_id: string | null
          serial: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name?: string | null
          organisation_id?: string | null
          serial?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string | null
          organisation_id?: string | null
          serial?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "presses_organisation_id_fkey"
            columns: ["organisation_id"]
            isOneToOne: false
            referencedRelation: "organisations"
            referencedColumns: ["id"]
          },
        ]
      }
      process_logs_dkpkl: {
        Row: {
          captured_at: string | null
          captured_by: string | null
          id: string
          metric: string
          stage: Database["public"]["Enums"]["stage"]
          txt_value: string | null
          uiorn: string
          value: number | null
        }
        Insert: {
          captured_at?: string | null
          captured_by?: string | null
          id?: string
          metric: string
          stage: Database["public"]["Enums"]["stage"]
          txt_value?: string | null
          uiorn: string
          value?: number | null
        }
        Update: {
          captured_at?: string | null
          captured_by?: string | null
          id?: string
          metric?: string
          stage?: Database["public"]["Enums"]["stage"]
          txt_value?: string | null
          uiorn?: string
          value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "process_logs_dkpkl_captured_by_fkey"
            columns: ["captured_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "process_logs_dkpkl_uiorn_fkey"
            columns: ["uiorn"]
            isOneToOne: false
            referencedRelation: "orders_dashboard_dkpkl"
            referencedColumns: ["uiorn"]
          },
        ]
      }
      process_logs_se: {
        Row: {
          captured_at: string | null
          captured_by: string | null
          id: string
          metric: string
          stage: Database["public"]["Enums"]["process_stage"]
          txt_value: string | null
          uiorn: string
          value: number | null
        }
        Insert: {
          captured_at?: string | null
          captured_by?: string | null
          id?: string
          metric: string
          stage: Database["public"]["Enums"]["process_stage"]
          txt_value?: string | null
          uiorn: string
          value?: number | null
        }
        Update: {
          captured_at?: string | null
          captured_by?: string | null
          id?: string
          metric?: string
          stage?: Database["public"]["Enums"]["process_stage"]
          txt_value?: string | null
          uiorn?: string
          value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "process_logs_se_captured_by_fkey"
            columns: ["captured_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "process_logs_se_uiorn_fkey"
            columns: ["uiorn"]
            isOneToOne: false
            referencedRelation: "orders_dashboard_se"
            referencedColumns: ["uiorn"]
          },
        ]
      }
      process_stages_dkpkl: {
        Row: {
          code: string
          name: string
          ordinal: number
        }
        Insert: {
          code: string
          name: string
          ordinal: number
        }
        Update: {
          code?: string
          name?: string
          ordinal?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          employee_id: string
          full_name: string | null
          id: string
          is_active: boolean | null
          is_approved: boolean | null
          organization_id: string
          role: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          employee_id: string
          full_name?: string | null
          id: string
          is_active?: boolean | null
          is_approved?: boolean | null
          organization_id: string
          role?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          employee_id?: string
          full_name?: string | null
          id?: string
          is_active?: boolean | null
          is_approved?: boolean | null
          organization_id?: string
          role?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      publications: {
        Row: {
          created_at: string
          id: string
          journal: string | null
          link: string | null
          title: string
          updated_at: string
          year: number | null
        }
        Insert: {
          created_at?: string
          id?: string
          journal?: string | null
          link?: string | null
          title: string
          updated_at?: string
          year?: number | null
        }
        Update: {
          created_at?: string
          id?: string
          journal?: string | null
          link?: string | null
          title?: string
          updated_at?: string
          year?: number | null
        }
        Relationships: []
      }
      quarterly_results: {
        Row: {
          created_at: string
          date_period: string | null
          ebitda: number | null
          ebitda_margin: number | null
          id: string
          net_profit: number | null
          quarter: string
          revenue: number | null
          revenue_growth: number | null
          ticker: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          date_period?: string | null
          ebitda?: number | null
          ebitda_margin?: number | null
          id?: string
          net_profit?: number | null
          quarter: string
          revenue?: number | null
          revenue_growth?: number | null
          ticker?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          date_period?: string | null
          ebitda?: number | null
          ebitda_margin?: number | null
          id?: string
          net_profit?: number | null
          quarter?: string
          revenue?: number | null
          revenue_growth?: number | null
          ticker?: string
          updated_at?: string
        }
        Relationships: []
      }
      resource_links: {
        Row: {
          category: string
          created_at: string
          description: string
          id: string
          is_featured: boolean
          title: string
          url: string
        }
        Insert: {
          category: string
          created_at?: string
          description: string
          id?: string
          is_featured?: boolean
          title: string
          url: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          id?: string
          is_featured?: boolean
          title?: string
          url?: string
        }
        Relationships: []
      }
      salary_audit_log: {
        Row: {
          action: string
          batch_id: string | null
          details: Json | null
          id: string
          performed_at: string
          performed_by: string | null
        }
        Insert: {
          action: string
          batch_id?: string | null
          details?: Json | null
          id?: string
          performed_at?: string
          performed_by?: string | null
        }
        Update: {
          action?: string
          batch_id?: string | null
          details?: Json | null
          id?: string
          performed_at?: string
          performed_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "salary_audit_log_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "salary_batches"
            referencedColumns: ["id"]
          },
        ]
      }
      salary_batches: {
        Row: {
          batch_name: string
          completed_at: string | null
          created_at: string
          created_by: string | null
          id: string
          metadata: Json | null
          period_end: string
          period_start: string
          period_type: string
          status: string
          total_deductions: number
          total_employees: number
          total_gross_amount: number
          total_net_amount: number
          updated_at: string
        }
        Insert: {
          batch_name: string
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          metadata?: Json | null
          period_end: string
          period_start: string
          period_type: string
          status?: string
          total_deductions?: number
          total_employees?: number
          total_gross_amount?: number
          total_net_amount?: number
          updated_at?: string
        }
        Update: {
          batch_name?: string
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          metadata?: Json | null
          period_end?: string
          period_start?: string
          period_type?: string
          status?: string
          total_deductions?: number
          total_employees?: number
          total_gross_amount?: number
          total_net_amount?: number
          updated_at?: string
        }
        Relationships: []
      }
      salary_disbursement: {
        Row: {
          advances_deduction: number | null
          base_salary: number
          batch_id: string | null
          created_at: string | null
          disbursed_on: string | null
          employee_id: string | null
          esi_deduction: number | null
          gross_salary: number | null
          hra_amount: number | null
          month: string
          net_salary: number
          other_conv_amount: number | null
          overtime_amount: number | null
          pf_deduction: number | null
          salary_id: string
          total_days_present: number
          total_hours_worked: number
          unit_id: string | null
          updated_at: string | null
        }
        Insert: {
          advances_deduction?: number | null
          base_salary: number
          batch_id?: string | null
          created_at?: string | null
          disbursed_on?: string | null
          employee_id?: string | null
          esi_deduction?: number | null
          gross_salary?: number | null
          hra_amount?: number | null
          month: string
          net_salary: number
          other_conv_amount?: number | null
          overtime_amount?: number | null
          pf_deduction?: number | null
          salary_id?: string
          total_days_present: number
          total_hours_worked: number
          unit_id?: string | null
          updated_at?: string | null
        }
        Update: {
          advances_deduction?: number | null
          base_salary?: number
          batch_id?: string | null
          created_at?: string | null
          disbursed_on?: string | null
          employee_id?: string | null
          esi_deduction?: number | null
          gross_salary?: number | null
          hra_amount?: number | null
          month?: string
          net_salary?: number
          other_conv_amount?: number | null
          overtime_amount?: number | null
          pf_deduction?: number | null
          salary_id?: string
          total_days_present?: number
          total_hours_worked?: number
          unit_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "salary_disbursement_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "salary_batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "salary_disbursement_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "payroll_employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "salary_disbursement_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["unit_id"]
          },
        ]
      }
      satguru_categories: {
        Row: {
          category_name: string
          created_at: string
          description: string | null
          id: string
          updated_at: string
        }
        Insert: {
          category_name: string
          created_at?: string
          description?: string | null
          id?: string
          updated_at?: string
        }
        Update: {
          category_name?: string
          created_at?: string
          description?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      satguru_csv_upload_log: {
        Row: {
          created_at: string
          error_details: Json | null
          failed_rows: number
          file_name: string
          id: string
          successful_rows: number
          total_rows: number
          updated_at: string
          upload_date: string
          upload_type: string
          uploaded_by: string | null
        }
        Insert: {
          created_at?: string
          error_details?: Json | null
          failed_rows?: number
          file_name: string
          id?: string
          successful_rows?: number
          total_rows?: number
          updated_at?: string
          upload_date?: string
          upload_type: string
          uploaded_by?: string | null
        }
        Update: {
          created_at?: string
          error_details?: Json | null
          failed_rows?: number
          file_name?: string
          id?: string
          successful_rows?: number
          total_rows?: number
          updated_at?: string
          upload_date?: string
          upload_type?: string
          uploaded_by?: string | null
        }
        Relationships: []
      }
      satguru_daily_stock_summary: {
        Row: {
          category_name: string | null
          created_at: string
          current_qty: number
          days_of_cover: number | null
          id: string
          item_code: string
          item_name: string
          opening_qty: number
          summary_date: string
          total_grn_qty: number
          total_issued_qty: number
        }
        Insert: {
          category_name?: string | null
          created_at?: string
          current_qty?: number
          days_of_cover?: number | null
          id?: string
          item_code: string
          item_name: string
          opening_qty?: number
          summary_date?: string
          total_grn_qty?: number
          total_issued_qty?: number
        }
        Update: {
          category_name?: string | null
          created_at?: string
          current_qty?: number
          days_of_cover?: number | null
          id?: string
          item_code?: string
          item_name?: string
          opening_qty?: number
          summary_date?: string
          total_grn_qty?: number
          total_issued_qty?: number
        }
        Relationships: []
      }
      satguru_grn_log: {
        Row: {
          amount_inr: number | null
          created_at: string
          date: string
          grn_number: string
          id: string
          invoice_number: string | null
          item_code: string
          qty_received: number
          remarks: string | null
          uom: string
          vendor: string | null
        }
        Insert: {
          amount_inr?: number | null
          created_at?: string
          date?: string
          grn_number: string
          id?: string
          invoice_number?: string | null
          item_code: string
          qty_received: number
          remarks?: string | null
          uom: string
          vendor?: string | null
        }
        Update: {
          amount_inr?: number | null
          created_at?: string
          date?: string
          grn_number?: string
          id?: string
          invoice_number?: string | null
          item_code?: string
          qty_received?: number
          remarks?: string | null
          uom?: string
          vendor?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "satguru_grn_log_item_code_fkey"
            columns: ["item_code"]
            isOneToOne: false
            referencedRelation: "satguru_item_master"
            referencedColumns: ["item_code"]
          },
          {
            foreignKeyName: "satguru_grn_log_item_code_fkey"
            columns: ["item_code"]
            isOneToOne: false
            referencedRelation: "satguru_stock_summary"
            referencedColumns: ["item_code"]
          },
        ]
      }
      satguru_issue_log: {
        Row: {
          created_at: string
          date: string
          id: string
          item_code: string
          purpose: string | null
          qty_issued: number
          remarks: string | null
          total_issued_qty: number | null
        }
        Insert: {
          created_at?: string
          date?: string
          id?: string
          item_code: string
          purpose?: string | null
          qty_issued: number
          remarks?: string | null
          total_issued_qty?: number | null
        }
        Update: {
          created_at?: string
          date?: string
          id?: string
          item_code?: string
          purpose?: string | null
          qty_issued?: number
          remarks?: string | null
          total_issued_qty?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "satguru_issue_log_item_code_fkey"
            columns: ["item_code"]
            isOneToOne: false
            referencedRelation: "satguru_item_master"
            referencedColumns: ["item_code"]
          },
          {
            foreignKeyName: "satguru_issue_log_item_code_fkey"
            columns: ["item_code"]
            isOneToOne: false
            referencedRelation: "satguru_stock_summary"
            referencedColumns: ["item_code"]
          },
        ]
      }
      satguru_item_master: {
        Row: {
          auto_code: string | null
          category_id: string | null
          created_at: string
          gsm: number | null
          id: string
          item_code: string
          item_name: string
          qualifier: string | null
          size_mm: string | null
          status: string
          uom: string
          updated_at: string
          usage_type: string | null
        }
        Insert: {
          auto_code?: string | null
          category_id?: string | null
          created_at?: string
          gsm?: number | null
          id?: string
          item_code: string
          item_name: string
          qualifier?: string | null
          size_mm?: string | null
          status?: string
          uom?: string
          updated_at?: string
          usage_type?: string | null
        }
        Update: {
          auto_code?: string | null
          category_id?: string | null
          created_at?: string
          gsm?: number | null
          id?: string
          item_code?: string
          item_name?: string
          qualifier?: string | null
          size_mm?: string | null
          status?: string
          uom?: string
          updated_at?: string
          usage_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "satguru_item_master_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "satguru_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      satguru_stock: {
        Row: {
          current_qty: number
          id: string
          item_code: string
          last_updated: string
          max_stock_level: number | null
          min_stock_level: number | null
          opening_qty: number
          reorder_level: number | null
        }
        Insert: {
          current_qty?: number
          id?: string
          item_code: string
          last_updated?: string
          max_stock_level?: number | null
          min_stock_level?: number | null
          opening_qty?: number
          reorder_level?: number | null
        }
        Update: {
          current_qty?: number
          id?: string
          item_code?: string
          last_updated?: string
          max_stock_level?: number | null
          min_stock_level?: number | null
          opening_qty?: number
          reorder_level?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "satguru_stock_item_code_fkey"
            columns: ["item_code"]
            isOneToOne: true
            referencedRelation: "satguru_item_master"
            referencedColumns: ["item_code"]
          },
          {
            foreignKeyName: "satguru_stock_item_code_fkey"
            columns: ["item_code"]
            isOneToOne: true
            referencedRelation: "satguru_stock_summary"
            referencedColumns: ["item_code"]
          },
        ]
      }
      segment_performance: {
        Row: {
          created_at: string
          id: string
          period: string
          revenue_percentage: number | null
          segment_name: string
          ticker: string
        }
        Insert: {
          created_at?: string
          id?: string
          period: string
          revenue_percentage?: number | null
          segment_name: string
          ticker?: string
        }
        Update: {
          created_at?: string
          id?: string
          period?: string
          revenue_percentage?: number | null
          segment_name?: string
          ticker?: string
        }
        Relationships: []
      }
      smeta_points: {
        Row: {
          description: string
          id: number
          point_number: string
          section: string
        }
        Insert: {
          description: string
          id?: number
          point_number: string
          section: string
        }
        Update: {
          description?: string
          id?: number
          point_number?: string
          section?: string
        }
        Relationships: []
      }
      spectro_readings: {
        Row: {
          a: number | null
          b: number | null
          captured_at: string | null
          delta_e: number | null
          id: string
          job_id: string | null
          l: number | null
          press_id: string | null
          user_id: string | null
        }
        Insert: {
          a?: number | null
          b?: number | null
          captured_at?: string | null
          delta_e?: number | null
          id?: string
          job_id?: string | null
          l?: number | null
          press_id?: string | null
          user_id?: string | null
        }
        Update: {
          a?: number | null
          b?: number | null
          captured_at?: string | null
          delta_e?: number | null
          id?: string
          job_id?: string | null
          l?: number | null
          press_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "spectro_readings_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "spectro_readings_press_id_fkey"
            columns: ["press_id"]
            isOneToOne: false
            referencedRelation: "presses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "spectro_readings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      stage_metrics_dkpkl: {
        Row: {
          id: string
          input_type: string | null
          metric_key: string | null
          metric_label: string | null
          stage_code: string | null
          unit: string | null
        }
        Insert: {
          id?: string
          input_type?: string | null
          metric_key?: string | null
          metric_label?: string | null
          stage_code?: string | null
          unit?: string | null
        }
        Update: {
          id?: string
          input_type?: string | null
          metric_key?: string | null
          metric_label?: string | null
          stage_code?: string | null
          unit?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "stage_metrics_dkpkl_stage_code_fkey"
            columns: ["stage_code"]
            isOneToOne: false
            referencedRelation: "process_stages_dkpkl"
            referencedColumns: ["code"]
          },
        ]
      }
      stage_status_dkpkl: {
        Row: {
          finished_at: string | null
          remarks: string | null
          stage: Database["public"]["Enums"]["stage"]
          started_at: string | null
          status: string | null
          uiorn: string
        }
        Insert: {
          finished_at?: string | null
          remarks?: string | null
          stage: Database["public"]["Enums"]["stage"]
          started_at?: string | null
          status?: string | null
          uiorn: string
        }
        Update: {
          finished_at?: string | null
          remarks?: string | null
          stage?: Database["public"]["Enums"]["stage"]
          started_at?: string | null
          status?: string | null
          uiorn?: string
        }
        Relationships: [
          {
            foreignKeyName: "stage_status_dkpkl_uiorn_fkey"
            columns: ["uiorn"]
            isOneToOne: false
            referencedRelation: "orders_dashboard_dkpkl"
            referencedColumns: ["uiorn"]
          },
        ]
      }
      staging_artworks_se: {
        Row: {
          circum: number | null
          coil_size: string | null
          customer_name: string | null
          cut_length: string | null
          cyl_qty: string | null
          dimensions: string | null
          file_hyperlink: string | null
          file_id: string | null
          item_code: string
          item_name: string | null
          last_run: string | null
          length: string | null
          location: string | null
          mileage_m: string | null
          no_of_colours: string | null
          qr_code: string | null
          remarks: string | null
          total_runs: string | null
          ups: number | null
        }
        Insert: {
          circum?: number | null
          coil_size?: string | null
          customer_name?: string | null
          cut_length?: string | null
          cyl_qty?: string | null
          dimensions?: string | null
          file_hyperlink?: string | null
          file_id?: string | null
          item_code: string
          item_name?: string | null
          last_run?: string | null
          length?: string | null
          location?: string | null
          mileage_m?: string | null
          no_of_colours?: string | null
          qr_code?: string | null
          remarks?: string | null
          total_runs?: string | null
          ups?: number | null
        }
        Update: {
          circum?: number | null
          coil_size?: string | null
          customer_name?: string | null
          cut_length?: string | null
          cyl_qty?: string | null
          dimensions?: string | null
          file_hyperlink?: string | null
          file_id?: string | null
          item_code?: string
          item_name?: string | null
          last_run?: string | null
          length?: string | null
          location?: string | null
          mileage_m?: string | null
          no_of_colours?: string | null
          qr_code?: string | null
          remarks?: string | null
          total_runs?: string | null
          ups?: number | null
        }
        Relationships: []
      }
      stock: {
        Row: {
          created_at: string | null
          current_qty: number | null
          id: string
          item_code: string
          last_updated: string | null
          opening_qty: number | null
          reserved_qty: number | null
        }
        Insert: {
          created_at?: string | null
          current_qty?: number | null
          id?: string
          item_code: string
          last_updated?: string | null
          opening_qty?: number | null
          reserved_qty?: number | null
        }
        Update: {
          created_at?: string | null
          current_qty?: number | null
          id?: string
          item_code?: string
          last_updated?: string | null
          opening_qty?: number | null
          reserved_qty?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "stock_item_code_fkey"
            columns: ["item_code"]
            isOneToOne: true
            referencedRelation: "item_master"
            referencedColumns: ["item_code"]
          },
          {
            foreignKeyName: "stock_item_code_fkey"
            columns: ["item_code"]
            isOneToOne: true
            referencedRelation: "stock_summary"
            referencedColumns: ["item_code"]
          },
        ]
      }
      substrate_master_dkpkl: {
        Row: {
          gsm: number | null
          micron: number | null
          substrate: string | null
          substrate_name: string
        }
        Insert: {
          gsm?: number | null
          micron?: number | null
          substrate?: string | null
          substrate_name: string
        }
        Update: {
          gsm?: number | null
          micron?: number | null
          substrate?: string | null
          substrate_name?: string
        }
        Relationships: []
      }
      substrate_master_dkpkl_bak: {
        Row: {
          GSM: number | null
          Micron: number | null
          Substrate: string | null
          Substrate_Name: string | null
        }
        Insert: {
          GSM?: number | null
          Micron?: number | null
          Substrate?: string | null
          Substrate_Name?: string | null
        }
        Update: {
          GSM?: number | null
          Micron?: number | null
          Substrate?: string | null
          Substrate_Name?: string | null
        }
        Relationships: []
      }
      substrate_master_se: {
        Row: {
          gsm: number | null
          micron: number | null
          substrate: string | null
          substrate_name: string
        }
        Insert: {
          gsm?: number | null
          micron?: number | null
          substrate?: string | null
          substrate_name: string
        }
        Update: {
          gsm?: number | null
          micron?: number | null
          substrate?: string | null
          substrate_name?: string
        }
        Relationships: []
      }
      substrate_master_se_bak: {
        Row: {
          GSM: number | null
          Micron: number | null
          Substrate: string | null
          Substrate_Name: string | null
        }
        Insert: {
          GSM?: number | null
          Micron?: number | null
          Substrate?: string | null
          Substrate_Name?: string | null
        }
        Update: {
          GSM?: number | null
          Micron?: number | null
          Substrate?: string | null
          Substrate_Name?: string | null
        }
        Relationships: []
      }
      templates: {
        Row: {
          created_at: string | null
          id: string
          organisation_id: string | null
          smeta_point_id: number | null
          template_url: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          organisation_id?: string | null
          smeta_point_id?: number | null
          template_url?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          organisation_id?: string | null
          smeta_point_id?: number | null
          template_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "templates_organisation_id_fkey"
            columns: ["organisation_id"]
            isOneToOne: false
            referencedRelation: "organisations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "templates_smeta_point_id_fkey"
            columns: ["smeta_point_id"]
            isOneToOne: false
            referencedRelation: "smeta_points"
            referencedColumns: ["id"]
          },
        ]
      }
      token_logs: {
        Row: {
          created_at: string | null
          id: string
          job_id: string | null
          note: string | null
          organisation_id: string | null
          tokens_used: number | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          job_id?: string | null
          note?: string | null
          organisation_id?: string | null
          tokens_used?: number | null
        }
        Update: {
          created_at?: string | null
          id?: string
          job_id?: string | null
          note?: string | null
          organisation_id?: string | null
          tokens_used?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "token_logs_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "token_logs_organisation_id_fkey"
            columns: ["organisation_id"]
            isOneToOne: false
            referencedRelation: "organisations"
            referencedColumns: ["id"]
          },
        ]
      }
      uiorn_counter: {
        Row: {
          last_serial: number
          ui_date: string
        }
        Insert: {
          last_serial: number
          ui_date: string
        }
        Update: {
          last_serial?: number
          ui_date?: string
        }
        Relationships: []
      }
      units: {
        Row: {
          created_at: string | null
          location: string | null
          unit_code: string
          unit_id: string
          unit_name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          location?: string | null
          unit_code: string
          unit_id?: string
          unit_name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          location?: string | null
          unit_code?: string
          unit_id?: string
          unit_name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      user_jobs: {
        Row: {
          created_at: string | null
          enhanced_prompt: string | null
          error_message: string | null
          id: string
          model_url: string | null
          progress: number | null
          prompt: string
          status: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          enhanced_prompt?: string | null
          error_message?: string | null
          id?: string
          model_url?: string | null
          progress?: number | null
          prompt: string
          status?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          enhanced_prompt?: string | null
          error_message?: string | null
          id?: string
          model_url?: string | null
          progress?: number | null
          prompt?: string
          status?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string | null
          email: string
          id: string
          organisation_id: string | null
          role: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          organisation_id?: string | null
          role?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          organisation_id?: string | null
          role?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_organisation_id_fkey"
            columns: ["organisation_id"]
            isOneToOne: false
            referencedRelation: "organisations"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      satguru_stock_summary: {
        Row: {
          category_name: string | null
          current_qty: number | null
          days_of_cover: number | null
          item_code: string | null
          item_name: string | null
          opening_qty: number | null
          total_grn_qty: number | null
          total_issued_qty: number | null
        }
        Relationships: []
      }
      stock_summary: {
        Row: {
          calculated_qty: number | null
          category_id: string | null
          category_name: string | null
          current_qty: number | null
          days_of_cover: number | null
          issue_30d: number | null
          item_code: string | null
          item_id: string | null
          item_name: string | null
          last_updated: string | null
          opening_qty: number | null
          stock_validation_status: string | null
          total_grn_qty: number | null
          total_issued_qty: number | null
        }
        Relationships: []
      }
      v_stage_rollup_dkpkl: {
        Row: {
          last_done: string | null
          overall_status: string | null
          stage_map: Json | null
          uiorn: string | null
        }
        Relationships: [
          {
            foreignKeyName: "stage_status_dkpkl_uiorn_fkey"
            columns: ["uiorn"]
            isOneToOne: false
            referencedRelation: "orders_dashboard_dkpkl"
            referencedColumns: ["uiorn"]
          },
        ]
      }
    }
    Functions: {
      bytea_to_text: {
        Args: { data: string }
        Returns: string
      }
      check_duplicate_process_log: {
        Args: {
          p_uiorn: string
          p_stage: Database["public"]["Enums"]["process_stage"]
          p_metric: string
          p_value?: number
          p_txt_value?: string
          p_minutes_threshold?: number
        }
        Returns: boolean
      }
      cleanup_stuck_jobs: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      create_prompt_and_job: {
        Args: { p_user_id: string; p_prompt_data: Json; p_job_type?: string }
        Returns: {
          prompt_id: string
          job_id: string
        }[]
      }
      delete_deck_viscosity_reading: {
        Args: { p_reading_id: string }
        Returns: boolean
      }
      delete_job: {
        Args: { p_job_id: string; p_user_id: string }
        Returns: undefined
      }
      delete_process_log: {
        Args: { log_id: string }
        Returns: undefined
      }
      enhanced_employee_lookup: {
        Args: { p_employee_identifier: string }
        Returns: {
          employee_id: string
          employee_name: string
          uan_number: string
          employee_code: string
          unit_id: string
        }[]
      }
      ensure_admin_users_setup: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      export_employee_master: {
        Args: { p_unit_id?: string }
        Returns: {
          employee_code: string
          employee_name: string
          uan_number: string
          unit_code: string
          unit_name: string
          joining_date: string
          base_salary: number
          active: boolean
        }[]
      }
      generate_asset_code: {
        Args: { p_location_code: string; p_category_code: string }
        Returns: string
      }
      generate_employee_code: {
        Args: { p_unit_id: string }
        Returns: string
      }
      generate_item_code_with_validation: {
        Args: {
          category_name: string
          qualifier?: string
          size_mm?: string
          gsm?: number
        }
        Returns: string
      }
      get_current_user_role: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_deck_viscosity_readings: {
        Args: { p_deck_id: string }
        Returns: {
          captured_at: string
          captured_by: string | null
          deck_id: string
          id: string
          job_id: string | null
          viscosity_cps: number
        }[]
      }
      get_user_jobs_safe: {
        Args: { p_user_id: string }
        Returns: {
          id: string
          prompt_id: string
          user_id: string
          status: string
          progress: number
          result_url: string
          job_type: string
          error_message: string
          created_at: string
          updated_at: string
          prompt_data: Json
        }[]
      }
      gtrgm_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_decompress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_options: {
        Args: { "": unknown }
        Returns: undefined
      }
      gtrgm_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      has_role: {
        Args: { user_role: string }
        Returns: boolean
      }
      http: {
        Args: { request: Database["public"]["CompositeTypes"]["http_request"] }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_delete: {
        Args:
          | { uri: string }
          | { uri: string; content: string; content_type: string }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_get: {
        Args: { uri: string } | { uri: string; data: Json }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_head: {
        Args: { uri: string }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_header: {
        Args: { field: string; value: string }
        Returns: Database["public"]["CompositeTypes"]["http_header"]
      }
      http_list_curlopt: {
        Args: Record<PropertyKey, never>
        Returns: {
          curlopt: string
          value: string
        }[]
      }
      http_patch: {
        Args: { uri: string; content: string; content_type: string }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_post: {
        Args:
          | { uri: string; content: string; content_type: string }
          | { uri: string; data: Json }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_put: {
        Args: { uri: string; content: string; content_type: string }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
      }
      http_reset_curlopt: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      http_set_curlopt: {
        Args: { curlopt: string; value: string }
        Returns: boolean
      }
      import_requirements: {
        Args: { csv_url: string }
        Returns: undefined
      }
      insert_attendance_from_csv: {
        Args: { rows: Json }
        Returns: Json
      }
      insert_attendance_from_csv_enhanced: {
        Args: { rows: Json }
        Returns: Json
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      map_documents_to_smeta: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      map_documents_to_smeta4: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      next_uiorn: {
        Args: { p_date?: string }
        Returns: string
      }
      next_uiorn_by_date: {
        Args: { p_date?: string }
        Returns: string
      }
      process_queued_jobs: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      rpc_upsert_stage_status_dkpkl: {
        Args: {
          p_uiorn: string
          p_stage: Database["public"]["Enums"]["stage"]
          p_status: string
          p_remarks?: string
        }
        Returns: undefined
      }
      satguru_generate_item_code: {
        Args: {
          category_name: string
          qualifier?: string
          size_mm?: string
          gsm?: number
        }
        Returns: string
      }
      set_limit: {
        Args: { "": number }
        Returns: number
      }
      show_limit: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      show_trgm: {
        Args: { "": string }
        Returns: string[]
      }
      text_to_bytea: {
        Args: { data: string }
        Returns: string
      }
      update_attendance_from_csv: {
        Args: { rows: Json; update_reason: string }
        Returns: Json
      }
      update_job_status: {
        Args: {
          p_job_id: string
          p_status: string
          p_progress?: number
          p_result_url?: string
          p_error_message?: string
          p_job_type?: string
        }
        Returns: undefined
      }
      update_leave_balance: {
        Args: { emp_id: string; days_used: number }
        Returns: undefined
      }
      update_user_approval: {
        Args: { user_id: string; approved: boolean; admin_notes?: string }
        Returns: undefined
      }
      upsert_deck_viscosity: {
        Args: {
          p_deck_id: string
          p_viscosity_cps: number
          p_job_id?: string
          p_captured_by?: string
        }
        Returns: string
      }
      upsert_leave_balances_from_csv: {
        Args: { rows: Json }
        Returns: Json
      }
      upsert_process_log: {
        Args: {
          p_uiorn: string
          p_stage: Database["public"]["Enums"]["process_stage"]
          p_metric: string
          p_value?: number
          p_txt_value?: string
          p_captured_by?: string
        }
        Returns: string
      }
      urlencode: {
        Args: { data: Json } | { string: string } | { string: string }
        Returns: string
      }
    }
    Enums: {
      asset_condition: "new" | "good" | "fair" | "poor"
      asset_status: "active" | "maintenance" | "retired" | "disposed"
      attendance_status:
        | "PRESENT"
        | "WEEKLY_OFF"
        | "CASUAL_LEAVE"
        | "EARNED_LEAVE"
        | "UNPAID_LEAVE"
      formula_type: "gross_salary" | "deductions" | "net_salary" | "allowances"
      media_type: "audio" | "video"
      process_stage:
        | "PRINTING"
        | "LAMINATION"
        | "ADHESIVE_COATING"
        | "SLITTING"
        | "DISPATCH"
      stage: "printing" | "lamination" | "adhesive" | "slitting" | "dispatch"
      transfer_status: "pending" | "approved" | "rejected" | "completed"
      variable_type: "fixed" | "calculated" | "employee_specific" | "system"
    }
    CompositeTypes: {
      http_header: {
        field: string | null
        value: string | null
      }
      http_request: {
        method: unknown | null
        uri: string | null
        headers: Database["public"]["CompositeTypes"]["http_header"][] | null
        content_type: string | null
        content: string | null
      }
      http_response: {
        status: number | null
        content_type: string | null
        headers: Database["public"]["CompositeTypes"]["http_header"][] | null
        content: string | null
      }
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      asset_condition: ["new", "good", "fair", "poor"],
      asset_status: ["active", "maintenance", "retired", "disposed"],
      attendance_status: [
        "PRESENT",
        "WEEKLY_OFF",
        "CASUAL_LEAVE",
        "EARNED_LEAVE",
        "UNPAID_LEAVE",
      ],
      formula_type: ["gross_salary", "deductions", "net_salary", "allowances"],
      media_type: ["audio", "video"],
      process_stage: [
        "PRINTING",
        "LAMINATION",
        "ADHESIVE_COATING",
        "SLITTING",
        "DISPATCH",
      ],
      stage: ["printing", "lamination", "adhesive", "slitting", "dispatch"],
      transfer_status: ["pending", "approved", "rejected", "completed"],
      variable_type: ["fixed", "calculated", "employee_specific", "system"],
    },
  },
} as const
