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
      account_hierarchy: {
        Row: {
          account_code: string
          account_level: number
          account_name: string
          account_type: string
          created_at: string | null
          display_order: number | null
          id: string
          is_active: boolean | null
          parent_account_id: string | null
          report_category: string | null
          updated_at: string | null
        }
        Insert: {
          account_code: string
          account_level?: number
          account_name: string
          account_type: string
          created_at?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          parent_account_id?: string | null
          report_category?: string | null
          updated_at?: string | null
        }
        Update: {
          account_code?: string
          account_level?: number
          account_name?: string
          account_type?: string
          created_at?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          parent_account_id?: string | null
          report_category?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "account_hierarchy_parent_account_id_fkey"
            columns: ["parent_account_id"]
            isOneToOne: false
            referencedRelation: "account_hierarchy"
            referencedColumns: ["id"]
          },
        ]
      }
      activity_logs: {
        Row: {
          action: string
          created_at: string
          details: Json | null
          id: number
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          details?: Json | null
          id?: number
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          details?: Json | null
          id?: number
          user_id?: string | null
        }
        Relationships: []
      }
      adhesive_coating: {
        Row: {
          adhesion_strength: number | null
          adhesive_specification: string | null
          coat_weight_variance: number | null
          coating_speed: number | null
          coating_type: string
          coating_weight: number | null
          coating_width: number | null
          completed_at: string | null
          created_at: string | null
          curing_parameters: Json | null
          drying_temperature: number | null
          id: string
          operator_id: string | null
          qc_approved_by: string | null
          started_at: string | null
          status: Database["public"]["Enums"]["process_status"] | null
          uiorn: string
          updated_at: string | null
          viscosity_readings: Json | null
        }
        Insert: {
          adhesion_strength?: number | null
          adhesive_specification?: string | null
          coat_weight_variance?: number | null
          coating_speed?: number | null
          coating_type: string
          coating_weight?: number | null
          coating_width?: number | null
          completed_at?: string | null
          created_at?: string | null
          curing_parameters?: Json | null
          drying_temperature?: number | null
          id?: string
          operator_id?: string | null
          qc_approved_by?: string | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["process_status"] | null
          uiorn: string
          updated_at?: string | null
          viscosity_readings?: Json | null
        }
        Update: {
          adhesion_strength?: number | null
          adhesive_specification?: string | null
          coat_weight_variance?: number | null
          coating_speed?: number | null
          coating_type?: string
          coating_weight?: number | null
          coating_width?: number | null
          completed_at?: string | null
          created_at?: string | null
          curing_parameters?: Json | null
          drying_temperature?: number | null
          id?: string
          operator_id?: string | null
          qc_approved_by?: string | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["process_status"] | null
          uiorn?: string
          updated_at?: string | null
          viscosity_readings?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "adhesive_coating_uiorn_fkey"
            columns: ["uiorn"]
            isOneToOne: false
            referencedRelation: "order_punching"
            referencedColumns: ["uiorn"]
          },
        ]
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
            referencedRelation: "employee_details_enhanced"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "advances_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "panchkula_payroll_calculation"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "advances_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "payroll_calculation_enhanced"
            referencedColumns: ["employee_id"]
          },
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
      ai_conversations: {
        Row: {
          context_type: string | null
          created_at: string | null
          id: string
          is_archived: boolean | null
          title: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          context_type?: string | null
          created_at?: string | null
          id?: string
          is_archived?: boolean | null
          title?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          context_type?: string | null
          created_at?: string | null
          id?: string
          is_archived?: boolean | null
          title?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      ai_insights: {
        Row: {
          confidence_score: number | null
          created_at: string | null
          data: Json | null
          description: string | null
          id: string
          insight_type: string
          is_read: boolean | null
          title: string
          user_id: string | null
        }
        Insert: {
          confidence_score?: number | null
          created_at?: string | null
          data?: Json | null
          description?: string | null
          id?: string
          insight_type: string
          is_read?: boolean | null
          title: string
          user_id?: string | null
        }
        Update: {
          confidence_score?: number | null
          created_at?: string | null
          data?: Json | null
          description?: string | null
          id?: string
          insight_type?: string
          is_read?: boolean | null
          title?: string
          user_id?: string | null
        }
        Relationships: []
      }
      ai_intelligence_snapshots: {
        Row: {
          actionable_items: number | null
          category_analysis: Json
          created_at: string | null
          critical_alerts: number | null
          cross_correlations: Json
          executive_summary: Json
          id: string
          inventory_health_score: number | null
          material_insights: Json
          organization_id: string | null
          outliers_detected: Json
          overall_intelligence_score: number | null
          process_efficiency_score: number | null
          quality_score: number | null
          snapshot_date: string
          total_insights: number | null
          user_id: string | null
        }
        Insert: {
          actionable_items?: number | null
          category_analysis?: Json
          created_at?: string | null
          critical_alerts?: number | null
          cross_correlations?: Json
          executive_summary?: Json
          id?: string
          inventory_health_score?: number | null
          material_insights?: Json
          organization_id?: string | null
          outliers_detected?: Json
          overall_intelligence_score?: number | null
          process_efficiency_score?: number | null
          quality_score?: number | null
          snapshot_date?: string
          total_insights?: number | null
          user_id?: string | null
        }
        Update: {
          actionable_items?: number | null
          category_analysis?: Json
          created_at?: string | null
          critical_alerts?: number | null
          cross_correlations?: Json
          executive_summary?: Json
          id?: string
          inventory_health_score?: number | null
          material_insights?: Json
          organization_id?: string | null
          outliers_detected?: Json
          overall_intelligence_score?: number | null
          process_efficiency_score?: number | null
          quality_score?: number | null
          snapshot_date?: string
          total_insights?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      ai_messages: {
        Row: {
          content: string
          conversation_id: string | null
          created_at: string | null
          id: string
          metadata: Json | null
          role: string
        }
        Insert: {
          content: string
          conversation_id?: string | null
          created_at?: string | null
          id?: string
          metadata?: Json | null
          role: string
        }
        Update: {
          content?: string
          conversation_id?: string | null
          created_at?: string | null
          id?: string
          metadata?: Json | null
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "ai_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_usage_analytics: {
        Row: {
          cost_estimate: number | null
          created_at: string | null
          feature_type: string
          id: string
          tokens_used: number | null
          user_id: string | null
        }
        Insert: {
          cost_estimate?: number | null
          created_at?: string | null
          feature_type: string
          id?: string
          tokens_used?: number | null
          user_id?: string | null
        }
        Update: {
          cost_estimate?: number | null
          created_at?: string | null
          feature_type?: string
          id?: string
          tokens_used?: number | null
          user_id?: string | null
        }
        Relationships: []
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
      approval_matrix: {
        Row: {
          approval_level: number
          approver_id: string | null
          approver_role: string | null
          category: string | null
          created_at: string | null
          delegate_to: string | null
          department: string | null
          entity_type: string
          escalation_hours: number | null
          id: string
          is_active: boolean | null
          is_mandatory: boolean | null
          max_amount: number | null
          min_amount: number | null
          updated_at: string | null
        }
        Insert: {
          approval_level: number
          approver_id?: string | null
          approver_role?: string | null
          category?: string | null
          created_at?: string | null
          delegate_to?: string | null
          department?: string | null
          entity_type: string
          escalation_hours?: number | null
          id?: string
          is_active?: boolean | null
          is_mandatory?: boolean | null
          max_amount?: number | null
          min_amount?: number | null
          updated_at?: string | null
        }
        Update: {
          approval_level?: number
          approver_id?: string | null
          approver_role?: string | null
          category?: string | null
          created_at?: string | null
          delegate_to?: string | null
          department?: string | null
          entity_type?: string
          escalation_hours?: number | null
          id?: string
          is_active?: boolean | null
          is_mandatory?: boolean | null
          max_amount?: number | null
          min_amount?: number | null
          updated_at?: string | null
        }
        Relationships: []
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
      artwork_upload: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          artwork_name: string
          artwork_specifications: Json | null
          barcode_specifications: Json | null
          bleed_specifications: Json | null
          color_separation_done: boolean | null
          color_specifications: Json | null
          created_at: string | null
          customer_approval_status: string | null
          file_path: string
          file_size_mb: number | null
          file_type: string
          id: string
          print_dimensions: Json | null
          print_ready: boolean | null
          proofing_status: string | null
          registration_marks: boolean | null
          revision_notes: string | null
          status: Database["public"]["Enums"]["process_status"] | null
          uiorn: string
          updated_at: string | null
          uploaded_at: string | null
          uploaded_by: string | null
          version_number: number | null
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          artwork_name: string
          artwork_specifications?: Json | null
          barcode_specifications?: Json | null
          bleed_specifications?: Json | null
          color_separation_done?: boolean | null
          color_specifications?: Json | null
          created_at?: string | null
          customer_approval_status?: string | null
          file_path: string
          file_size_mb?: number | null
          file_type: string
          id?: string
          print_dimensions?: Json | null
          print_ready?: boolean | null
          proofing_status?: string | null
          registration_marks?: boolean | null
          revision_notes?: string | null
          status?: Database["public"]["Enums"]["process_status"] | null
          uiorn: string
          updated_at?: string | null
          uploaded_at?: string | null
          uploaded_by?: string | null
          version_number?: number | null
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          artwork_name?: string
          artwork_specifications?: Json | null
          barcode_specifications?: Json | null
          bleed_specifications?: Json | null
          color_separation_done?: boolean | null
          color_specifications?: Json | null
          created_at?: string | null
          customer_approval_status?: string | null
          file_path?: string
          file_size_mb?: number | null
          file_type?: string
          id?: string
          print_dimensions?: Json | null
          print_ready?: boolean | null
          proofing_status?: string | null
          registration_marks?: boolean | null
          revision_notes?: string | null
          status?: Database["public"]["Enums"]["process_status"] | null
          uiorn?: string
          updated_at?: string | null
          uploaded_at?: string | null
          uploaded_by?: string | null
          version_number?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "artwork_upload_uiorn_fkey"
            columns: ["uiorn"]
            isOneToOne: false
            referencedRelation: "order_punching"
            referencedColumns: ["uiorn"]
          },
        ]
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
            referencedRelation: "employee_details_enhanced"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendance_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "panchkula_payroll_calculation"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "attendance_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "payroll_calculation_enhanced"
            referencedColumns: ["employee_id"]
          },
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
      bill_of_materials: {
        Row: {
          bom_group_id: string | null
          bom_version: number | null
          consumption_rate: number | null
          created_at: string | null
          customer_code: string | null
          fg_item_code: string
          gsm_contribution: number | null
          id: string
          is_active: boolean | null
          percentage_contribution: number | null
          quantity_required: number
          rm_item_code: string
          specifications: Json | null
          unit_of_measure: string
          updated_at: string | null
          wastage_percentage: number | null
        }
        Insert: {
          bom_group_id?: string | null
          bom_version?: number | null
          consumption_rate?: number | null
          created_at?: string | null
          customer_code?: string | null
          fg_item_code: string
          gsm_contribution?: number | null
          id?: string
          is_active?: boolean | null
          percentage_contribution?: number | null
          quantity_required?: number
          rm_item_code: string
          specifications?: Json | null
          unit_of_measure?: string
          updated_at?: string | null
          wastage_percentage?: number | null
        }
        Update: {
          bom_group_id?: string | null
          bom_version?: number | null
          consumption_rate?: number | null
          created_at?: string | null
          customer_code?: string | null
          fg_item_code?: string
          gsm_contribution?: number | null
          id?: string
          is_active?: boolean | null
          percentage_contribution?: number | null
          quantity_required?: number
          rm_item_code?: string
          specifications?: Json | null
          unit_of_measure?: string
          updated_at?: string | null
          wastage_percentage?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "bill_of_materials_bom_group_id_fkey"
            columns: ["bom_group_id"]
            isOneToOne: false
            referencedRelation: "bom_groups"
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
      bom_groups: {
        Row: {
          created_at: string | null
          description: string | null
          display_order: number | null
          group_code: string
          group_name: string
          id: string
          is_active: boolean | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          group_code: string
          group_name: string
          id?: string
          is_active?: boolean | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          group_code?: string
          group_name?: string
          id?: string
          is_active?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      budget_entries: {
        Row: {
          account_code: string
          approved_at: string | null
          approved_by: string | null
          budget_amount: number
          budget_type: string
          budget_version: number | null
          created_at: string | null
          id: string
          notes: string | null
          period_id: number
          updated_at: string | null
        }
        Insert: {
          account_code: string
          approved_at?: string | null
          approved_by?: string | null
          budget_amount?: number
          budget_type?: string
          budget_version?: number | null
          created_at?: string | null
          id?: string
          notes?: string | null
          period_id: number
          updated_at?: string | null
        }
        Update: {
          account_code?: string
          approved_at?: string | null
          approved_by?: string | null
          budget_amount?: number
          budget_type?: string
          budget_version?: number | null
          created_at?: string | null
          id?: string
          notes?: string | null
          period_id?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "budget_entries_period_id_fkey"
            columns: ["period_id"]
            isOneToOne: false
            referencedRelation: "financial_periods"
            referencedColumns: ["id"]
          },
        ]
      }
      bulk_leave_applications: {
        Row: {
          applied_by: string | null
          approved_at: string | null
          approved_by: string | null
          batch_id: string
          created_at: string | null
          days_requested: number
          employee_id: string
          end_date: string
          id: string
          leave_type: string
          reason: string | null
          remarks: string | null
          start_date: string
          status: string
          unit_id: string | null
          updated_at: string | null
        }
        Insert: {
          applied_by?: string | null
          approved_at?: string | null
          approved_by?: string | null
          batch_id?: string
          created_at?: string | null
          days_requested: number
          employee_id: string
          end_date: string
          id?: string
          leave_type: string
          reason?: string | null
          remarks?: string | null
          start_date: string
          status?: string
          unit_id?: string | null
          updated_at?: string | null
        }
        Update: {
          applied_by?: string | null
          approved_at?: string | null
          approved_by?: string | null
          batch_id?: string
          created_at?: string | null
          days_requested?: number
          employee_id?: string
          end_date?: string
          id?: string
          leave_type?: string
          reason?: string | null
          remarks?: string | null
          start_date?: string
          status?: string
          unit_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bulk_leave_applications_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employee_details_enhanced"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bulk_leave_applications_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "panchkula_payroll_calculation"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "bulk_leave_applications_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "payroll_calculation_enhanced"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "bulk_leave_applications_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "payroll_employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bulk_leave_applications_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["unit_id"]
          },
        ]
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
      calculated_ratios: {
        Row: {
          calculated_value: number | null
          calculation_date: string | null
          created_at: string | null
          denominator_value: number | null
          id: string
          numerator_value: number | null
          period_id: number
          ratio_definition_id: string
        }
        Insert: {
          calculated_value?: number | null
          calculation_date?: string | null
          created_at?: string | null
          denominator_value?: number | null
          id?: string
          numerator_value?: number | null
          period_id: number
          ratio_definition_id: string
        }
        Update: {
          calculated_value?: number | null
          calculation_date?: string | null
          created_at?: string | null
          denominator_value?: number | null
          id?: string
          numerator_value?: number | null
          period_id?: number
          ratio_definition_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "calculated_ratios_period_id_fkey"
            columns: ["period_id"]
            isOneToOne: false
            referencedRelation: "financial_periods"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "calculated_ratios_ratio_definition_id_fkey"
            columns: ["ratio_definition_id"]
            isOneToOne: false
            referencedRelation: "ratio_definitions"
            referencedColumns: ["id"]
          },
        ]
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
      category_approvals: {
        Row: {
          approval_notes: string | null
          approval_status: string
          approved_by: string | null
          business_justification: string | null
          category_id: string | null
          change_data: Json
          change_type: string
          created_at: string | null
          id: string
          processed_at: string | null
          requested_at: string | null
          requested_by: string | null
          updated_at: string | null
        }
        Insert: {
          approval_notes?: string | null
          approval_status?: string
          approved_by?: string | null
          business_justification?: string | null
          category_id?: string | null
          change_data: Json
          change_type: string
          created_at?: string | null
          id?: string
          processed_at?: string | null
          requested_at?: string | null
          requested_by?: string | null
          updated_at?: string | null
        }
        Update: {
          approval_notes?: string | null
          approval_status?: string
          approved_by?: string | null
          business_justification?: string | null
          category_id?: string | null
          change_data?: Json
          change_type?: string
          created_at?: string | null
          id?: string
          processed_at?: string | null
          requested_at?: string | null
          requested_by?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "category_approvals_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "category_stats_mv"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "category_approvals_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "satguru_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "category_approvals_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "satguru_category_stats"
            referencedColumns: ["id"]
          },
        ]
      }
      category_audit_log: {
        Row: {
          action: string
          business_justification: string | null
          category_id: string | null
          changed_fields: string[] | null
          created_at: string | null
          id: string
          ip_address: unknown | null
          new_data: Json | null
          old_data: Json | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          business_justification?: string | null
          category_id?: string | null
          changed_fields?: string[] | null
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          new_data?: Json | null
          old_data?: Json | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          business_justification?: string | null
          category_id?: string | null
          changed_fields?: string[] | null
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          new_data?: Json | null
          old_data?: Json | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "category_audit_log_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "category_stats_mv"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "category_audit_log_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "satguru_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "category_audit_log_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "satguru_category_stats"
            referencedColumns: ["id"]
          },
        ]
      }
      category_recommendations: {
        Row: {
          based_on_items: string[] | null
          confidence_score: number | null
          created_at: string | null
          created_by: string | null
          id: string
          processed_at: string | null
          processed_by: string | null
          reasoning: string | null
          status: string | null
          suggested_category_code: string | null
          suggested_category_name: string
        }
        Insert: {
          based_on_items?: string[] | null
          confidence_score?: number | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          processed_at?: string | null
          processed_by?: string | null
          reasoning?: string | null
          status?: string | null
          suggested_category_code?: string | null
          suggested_category_name: string
        }
        Update: {
          based_on_items?: string[] | null
          confidence_score?: number | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          processed_at?: string | null
          processed_by?: string | null
          reasoning?: string | null
          status?: string | null
          suggested_category_code?: string | null
          suggested_category_name?: string
        }
        Relationships: []
      }
      category_usage_tracking: {
        Row: {
          category_id: string | null
          created_at: string | null
          id: string
          metadata: Json | null
          usage_type: string
          user_id: string | null
        }
        Insert: {
          category_id?: string | null
          created_at?: string | null
          id?: string
          metadata?: Json | null
          usage_type: string
          user_id?: string | null
        }
        Update: {
          category_id?: string | null
          created_at?: string | null
          id?: string
          metadata?: Json | null
          usage_type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "category_usage_tracking_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "category_stats_mv"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "category_usage_tracking_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "satguru_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "category_usage_tracking_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "satguru_category_stats"
            referencedColumns: ["id"]
          },
        ]
      }
      color_measurements_log: {
        Row: {
          captured_at: string
          delta_e: number
          id: string
          is_pass: boolean
          measured_a: number
          measured_b: number
          measured_l: number
          measurement_notes: string | null
          session_id: string
        }
        Insert: {
          captured_at?: string
          delta_e: number
          id?: string
          is_pass: boolean
          measured_a: number
          measured_b: number
          measured_l: number
          measurement_notes?: string | null
          session_id: string
        }
        Update: {
          captured_at?: string
          delta_e?: number
          id?: string
          is_pass?: boolean
          measured_a?: number
          measured_b?: number
          measured_l?: number
          measurement_notes?: string | null
          session_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "color_measurements_log_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "qc_sessions"
            referencedColumns: ["id"]
          },
        ]
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
      comments: {
        Row: {
          author_email: string
          author_name: string
          content: string
          content_id: string
          content_type: string
          created_at: string
          id: string
          is_approved: boolean | null
          parent_comment_id: string | null
          updated_at: string
        }
        Insert: {
          author_email: string
          author_name: string
          content: string
          content_id: string
          content_type: string
          created_at?: string
          id?: string
          is_approved?: boolean | null
          parent_comment_id?: string | null
          updated_at?: string
        }
        Update: {
          author_email?: string
          author_name?: string
          content?: string
          content_id?: string
          content_type?: string
          created_at?: string
          id?: string
          is_approved?: boolean | null
          parent_comment_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_parent_comment_id_fkey"
            columns: ["parent_comment_id"]
            isOneToOne: false
            referencedRelation: "comments"
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
      cost_mockup_estimate: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          coating_cost: number | null
          competitive_analysis: Json | null
          cost_breakdown: Json | null
          created_at: string | null
          currency: string | null
          customer_budget: number | null
          estimate_type: string
          estimated_at: string | null
          estimated_by: string | null
          id: string
          labor_cost: number | null
          lamination_cost: number | null
          material_cost: number | null
          mockup_cost: number | null
          mockup_delivery_days: number | null
          mockup_required: boolean | null
          mockup_status: string | null
          negotiation_notes: string | null
          overhead_cost: number | null
          packaging_cost: number | null
          printing_cost: number | null
          profit_margin_percentage: number | null
          selling_price: number | null
          setup_cost: number | null
          slitting_cost: number | null
          status: Database["public"]["Enums"]["process_status"] | null
          tooling_cost: number | null
          total_cost: number | null
          uiorn: string
          updated_at: string | null
          validity_days: number | null
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          coating_cost?: number | null
          competitive_analysis?: Json | null
          cost_breakdown?: Json | null
          created_at?: string | null
          currency?: string | null
          customer_budget?: number | null
          estimate_type?: string
          estimated_at?: string | null
          estimated_by?: string | null
          id?: string
          labor_cost?: number | null
          lamination_cost?: number | null
          material_cost?: number | null
          mockup_cost?: number | null
          mockup_delivery_days?: number | null
          mockup_required?: boolean | null
          mockup_status?: string | null
          negotiation_notes?: string | null
          overhead_cost?: number | null
          packaging_cost?: number | null
          printing_cost?: number | null
          profit_margin_percentage?: number | null
          selling_price?: number | null
          setup_cost?: number | null
          slitting_cost?: number | null
          status?: Database["public"]["Enums"]["process_status"] | null
          tooling_cost?: number | null
          total_cost?: number | null
          uiorn: string
          updated_at?: string | null
          validity_days?: number | null
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          coating_cost?: number | null
          competitive_analysis?: Json | null
          cost_breakdown?: Json | null
          created_at?: string | null
          currency?: string | null
          customer_budget?: number | null
          estimate_type?: string
          estimated_at?: string | null
          estimated_by?: string | null
          id?: string
          labor_cost?: number | null
          lamination_cost?: number | null
          material_cost?: number | null
          mockup_cost?: number | null
          mockup_delivery_days?: number | null
          mockup_required?: boolean | null
          mockup_status?: string | null
          negotiation_notes?: string | null
          overhead_cost?: number | null
          packaging_cost?: number | null
          printing_cost?: number | null
          profit_margin_percentage?: number | null
          selling_price?: number | null
          setup_cost?: number | null
          slitting_cost?: number | null
          status?: Database["public"]["Enums"]["process_status"] | null
          tooling_cost?: number | null
          total_cost?: number | null
          uiorn?: string
          updated_at?: string | null
          validity_days?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "cost_mockup_estimate_uiorn_fkey"
            columns: ["uiorn"]
            isOneToOne: false
            referencedRelation: "order_punching"
            referencedColumns: ["uiorn"]
          },
        ]
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
      customer_specifications: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          created_at: string | null
          customer_code: string
          file_path: string
          file_size: number
          id: string
          item_code: string
          notes: string | null
          specification_name: string
          status: string | null
          updated_at: string | null
          upload_date: string | null
          uploaded_by: string | null
          version: number | null
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string | null
          customer_code: string
          file_path: string
          file_size?: number
          id?: string
          item_code: string
          notes?: string | null
          specification_name: string
          status?: string | null
          updated_at?: string | null
          upload_date?: string | null
          uploaded_by?: string | null
          version?: number | null
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string | null
          customer_code?: string
          file_path?: string
          file_size?: number
          id?: string
          item_code?: string
          notes?: string | null
          specification_name?: string
          status?: string | null
          updated_at?: string | null
          upload_date?: string | null
          uploaded_by?: string | null
          version?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "customer_specifications_item_code_fkey"
            columns: ["item_code"]
            isOneToOne: false
            referencedRelation: "master_data_artworks_se"
            referencedColumns: ["item_code"]
          },
        ]
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
            referencedRelation: "item_specification_summary"
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
      dental_appointments: {
        Row: {
          appointment_date: string
          appointment_number: string
          appointment_type: Database["public"]["Enums"]["dental_appointment_type"]
          confirmation_sent: boolean | null
          created_at: string | null
          created_by: string | null
          dentist_id: string | null
          duration_minutes: number
          end_time: string
          id: string
          is_emergency: boolean | null
          patient_id: string | null
          post_appointment_notes: string | null
          practice_id: string | null
          pre_appointment_notes: string | null
          recurring_pattern: Json | null
          reminder_sent: boolean | null
          room_number: string | null
          start_time: string
          status:
            | Database["public"]["Enums"]["dental_appointment_status"]
            | null
          treatment_planned: string[] | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          appointment_date: string
          appointment_number: string
          appointment_type: Database["public"]["Enums"]["dental_appointment_type"]
          confirmation_sent?: boolean | null
          created_at?: string | null
          created_by?: string | null
          dentist_id?: string | null
          duration_minutes?: number
          end_time: string
          id?: string
          is_emergency?: boolean | null
          patient_id?: string | null
          post_appointment_notes?: string | null
          practice_id?: string | null
          pre_appointment_notes?: string | null
          recurring_pattern?: Json | null
          reminder_sent?: boolean | null
          room_number?: string | null
          start_time: string
          status?:
            | Database["public"]["Enums"]["dental_appointment_status"]
            | null
          treatment_planned?: string[] | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          appointment_date?: string
          appointment_number?: string
          appointment_type?: Database["public"]["Enums"]["dental_appointment_type"]
          confirmation_sent?: boolean | null
          created_at?: string | null
          created_by?: string | null
          dentist_id?: string | null
          duration_minutes?: number
          end_time?: string
          id?: string
          is_emergency?: boolean | null
          patient_id?: string | null
          post_appointment_notes?: string | null
          practice_id?: string | null
          pre_appointment_notes?: string | null
          recurring_pattern?: Json | null
          reminder_sent?: boolean | null
          room_number?: string | null
          start_time?: string
          status?:
            | Database["public"]["Enums"]["dental_appointment_status"]
            | null
          treatment_planned?: string[] | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dental_appointments_dentist_id_fkey"
            columns: ["dentist_id"]
            isOneToOne: false
            referencedRelation: "dental_staff"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dental_appointments_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "dental_patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dental_appointments_practice_id_fkey"
            columns: ["practice_id"]
            isOneToOne: false
            referencedRelation: "dental_practices"
            referencedColumns: ["id"]
          },
        ]
      }
      dental_audit_logs: {
        Row: {
          action: string
          changed_fields: string[] | null
          created_at: string | null
          id: string
          ip_address: unknown | null
          new_values: Json | null
          old_values: Json | null
          practice_id: string | null
          record_id: string
          table_name: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          changed_fields?: string[] | null
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          practice_id?: string | null
          record_id: string
          table_name: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          changed_fields?: string[] | null
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          practice_id?: string | null
          record_id?: string
          table_name?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dental_audit_logs_practice_id_fkey"
            columns: ["practice_id"]
            isOneToOne: false
            referencedRelation: "dental_practices"
            referencedColumns: ["id"]
          },
        ]
      }
      dental_invoice_items: {
        Row: {
          created_at: string | null
          description: string
          id: string
          insurance_covered: number | null
          invoice_id: string | null
          patient_portion: number
          quantity: number | null
          total_price: number
          treatment_id: string | null
          unit_price: number
        }
        Insert: {
          created_at?: string | null
          description: string
          id?: string
          insurance_covered?: number | null
          invoice_id?: string | null
          patient_portion: number
          quantity?: number | null
          total_price: number
          treatment_id?: string | null
          unit_price: number
        }
        Update: {
          created_at?: string | null
          description?: string
          id?: string
          insurance_covered?: number | null
          invoice_id?: string | null
          patient_portion?: number
          quantity?: number | null
          total_price?: number
          treatment_id?: string | null
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "dental_invoice_items_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "dental_invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dental_invoice_items_treatment_id_fkey"
            columns: ["treatment_id"]
            isOneToOne: false
            referencedRelation: "dental_treatments"
            referencedColumns: ["id"]
          },
        ]
      }
      dental_invoices: {
        Row: {
          amount_paid: number | null
          appointment_id: string | null
          balance_due: number
          created_at: string | null
          created_by: string | null
          discount_amount: number | null
          due_date: string
          id: string
          invoice_date: string
          invoice_number: string
          notes: string | null
          patient_id: string | null
          payment_terms: string | null
          practice_id: string | null
          sent_date: string | null
          sent_to_patient: boolean | null
          status: Database["public"]["Enums"]["payment_status"] | null
          subtotal: number
          tax_amount: number | null
          tax_rate: number | null
          total_amount: number
          updated_at: string | null
        }
        Insert: {
          amount_paid?: number | null
          appointment_id?: string | null
          balance_due: number
          created_at?: string | null
          created_by?: string | null
          discount_amount?: number | null
          due_date: string
          id?: string
          invoice_date?: string
          invoice_number: string
          notes?: string | null
          patient_id?: string | null
          payment_terms?: string | null
          practice_id?: string | null
          sent_date?: string | null
          sent_to_patient?: boolean | null
          status?: Database["public"]["Enums"]["payment_status"] | null
          subtotal?: number
          tax_amount?: number | null
          tax_rate?: number | null
          total_amount: number
          updated_at?: string | null
        }
        Update: {
          amount_paid?: number | null
          appointment_id?: string | null
          balance_due?: number
          created_at?: string | null
          created_by?: string | null
          discount_amount?: number | null
          due_date?: string
          id?: string
          invoice_date?: string
          invoice_number?: string
          notes?: string | null
          patient_id?: string | null
          payment_terms?: string | null
          practice_id?: string | null
          sent_date?: string | null
          sent_to_patient?: boolean | null
          status?: Database["public"]["Enums"]["payment_status"] | null
          subtotal?: number
          tax_amount?: number | null
          tax_rate?: number | null
          total_amount?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dental_invoices_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "dental_appointments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dental_invoices_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "dental_patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dental_invoices_practice_id_fkey"
            columns: ["practice_id"]
            isOneToOne: false
            referencedRelation: "dental_practices"
            referencedColumns: ["id"]
          },
        ]
      }
      dental_patient_alerts: {
        Row: {
          alert_type: string
          created_at: string | null
          created_by: string | null
          expires_at: string | null
          id: string
          is_active: boolean | null
          message: string
          patient_id: string | null
          practice_id: string | null
          severity: string | null
          title: string
        }
        Insert: {
          alert_type: string
          created_at?: string | null
          created_by?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          message: string
          patient_id?: string | null
          practice_id?: string | null
          severity?: string | null
          title: string
        }
        Update: {
          alert_type?: string
          created_at?: string | null
          created_by?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          message?: string
          patient_id?: string | null
          practice_id?: string | null
          severity?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "dental_patient_alerts_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "dental_patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dental_patient_alerts_practice_id_fkey"
            columns: ["practice_id"]
            isOneToOne: false
            referencedRelation: "dental_practices"
            referencedColumns: ["id"]
          },
        ]
      }
      dental_patients: {
        Row: {
          address: string | null
          allergies: string[] | null
          city: string | null
          created_at: string | null
          created_by: string | null
          date_of_birth: string | null
          email: string | null
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          emergency_contact_relation: string | null
          full_name: string
          gender: string | null
          id: string
          insurance_group_number: string | null
          insurance_policy_number: string | null
          insurance_provider: string | null
          is_active: boolean | null
          last_visit: string | null
          medical_conditions: string[] | null
          medications: string[] | null
          next_appointment_due: string | null
          notes: string | null
          patient_number: string
          phone: string | null
          practice_id: string | null
          referred_by: string | null
          state: string | null
          updated_at: string | null
          zip_code: string | null
        }
        Insert: {
          address?: string | null
          allergies?: string[] | null
          city?: string | null
          created_at?: string | null
          created_by?: string | null
          date_of_birth?: string | null
          email?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          emergency_contact_relation?: string | null
          full_name: string
          gender?: string | null
          id?: string
          insurance_group_number?: string | null
          insurance_policy_number?: string | null
          insurance_provider?: string | null
          is_active?: boolean | null
          last_visit?: string | null
          medical_conditions?: string[] | null
          medications?: string[] | null
          next_appointment_due?: string | null
          notes?: string | null
          patient_number: string
          phone?: string | null
          practice_id?: string | null
          referred_by?: string | null
          state?: string | null
          updated_at?: string | null
          zip_code?: string | null
        }
        Update: {
          address?: string | null
          allergies?: string[] | null
          city?: string | null
          created_at?: string | null
          created_by?: string | null
          date_of_birth?: string | null
          email?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          emergency_contact_relation?: string | null
          full_name?: string
          gender?: string | null
          id?: string
          insurance_group_number?: string | null
          insurance_policy_number?: string | null
          insurance_provider?: string | null
          is_active?: boolean | null
          last_visit?: string | null
          medical_conditions?: string[] | null
          medications?: string[] | null
          next_appointment_due?: string | null
          notes?: string | null
          patient_number?: string
          phone?: string | null
          practice_id?: string | null
          referred_by?: string | null
          state?: string | null
          updated_at?: string | null
          zip_code?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dental_patients_practice_id_fkey"
            columns: ["practice_id"]
            isOneToOne: false
            referencedRelation: "dental_practices"
            referencedColumns: ["id"]
          },
        ]
      }
      dental_payments: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          invoice_id: string | null
          notes: string | null
          patient_id: string | null
          payment_date: string
          payment_method: Database["public"]["Enums"]["payment_method"]
          practice_id: string | null
          processed_by: string | null
          reference_number: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          invoice_id?: string | null
          notes?: string | null
          patient_id?: string | null
          payment_date?: string
          payment_method: Database["public"]["Enums"]["payment_method"]
          practice_id?: string | null
          processed_by?: string | null
          reference_number?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          invoice_id?: string | null
          notes?: string | null
          patient_id?: string | null
          payment_date?: string
          payment_method?: Database["public"]["Enums"]["payment_method"]
          practice_id?: string | null
          processed_by?: string | null
          reference_number?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dental_payments_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "dental_invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dental_payments_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "dental_patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dental_payments_practice_id_fkey"
            columns: ["practice_id"]
            isOneToOne: false
            referencedRelation: "dental_practices"
            referencedColumns: ["id"]
          },
        ]
      }
      dental_practices: {
        Row: {
          address: string | null
          created_at: string | null
          email: string | null
          id: string
          is_active: boolean | null
          license_number: string | null
          logo_url: string | null
          name: string
          phone: string | null
          settings: Json | null
          tax_id: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          license_number?: string | null
          logo_url?: string | null
          name: string
          phone?: string | null
          settings?: Json | null
          tax_id?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          license_number?: string | null
          logo_url?: string | null
          name?: string
          phone?: string | null
          settings?: Json | null
          tax_id?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      dental_staff: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          email: string
          employee_id: string | null
          full_name: string
          hire_date: string | null
          hourly_rate: number | null
          id: string
          is_active: boolean | null
          license_number: string | null
          phone: string | null
          practice_id: string | null
          role: Database["public"]["Enums"]["user_role"]
          specialization: string[] | null
          updated_at: string | null
          user_id: string | null
          working_hours: Json | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          email: string
          employee_id?: string | null
          full_name: string
          hire_date?: string | null
          hourly_rate?: number | null
          id?: string
          is_active?: boolean | null
          license_number?: string | null
          phone?: string | null
          practice_id?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          specialization?: string[] | null
          updated_at?: string | null
          user_id?: string | null
          working_hours?: Json | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          email?: string
          employee_id?: string | null
          full_name?: string
          hire_date?: string | null
          hourly_rate?: number | null
          id?: string
          is_active?: boolean | null
          license_number?: string | null
          phone?: string | null
          practice_id?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          specialization?: string[] | null
          updated_at?: string | null
          user_id?: string | null
          working_hours?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "dental_staff_practice_id_fkey"
            columns: ["practice_id"]
            isOneToOne: false
            referencedRelation: "dental_practices"
            referencedColumns: ["id"]
          },
        ]
      }
      dental_treatment_templates: {
        Row: {
          category: string
          cost: number
          created_at: string
          description: string | null
          duration_minutes: number
          id: string
          is_active: boolean
          notes: string | null
          procedure_codes: string[] | null
          template_name: string
          updated_at: string
        }
        Insert: {
          category: string
          cost?: number
          created_at?: string
          description?: string | null
          duration_minutes?: number
          id?: string
          is_active?: boolean
          notes?: string | null
          procedure_codes?: string[] | null
          template_name: string
          updated_at?: string
        }
        Update: {
          category?: string
          cost?: number
          created_at?: string
          description?: string | null
          duration_minutes?: number
          id?: string
          is_active?: boolean
          notes?: string | null
          procedure_codes?: string[] | null
          template_name?: string
          updated_at?: string
        }
        Relationships: []
      }
      dental_treatments: {
        Row: {
          after_images: string[] | null
          anesthesia_used: string | null
          appointment_id: string | null
          before_images: string[] | null
          complications: string | null
          cost: number | null
          created_at: string | null
          created_by: string | null
          date_performed: string | null
          dentist_id: string | null
          duration_minutes: number | null
          follow_up_date: string | null
          follow_up_needed: boolean | null
          id: string
          insurance_covered: number | null
          materials_used: string[] | null
          notes: string | null
          patient_id: string | null
          patient_portion: number | null
          practice_id: string | null
          status: Database["public"]["Enums"]["treatment_status"] | null
          surface: string[] | null
          tooth_number: string[] | null
          treatment_code: string | null
          treatment_description: string | null
          treatment_name: string
          updated_at: string | null
          x_ray_images: string[] | null
        }
        Insert: {
          after_images?: string[] | null
          anesthesia_used?: string | null
          appointment_id?: string | null
          before_images?: string[] | null
          complications?: string | null
          cost?: number | null
          created_at?: string | null
          created_by?: string | null
          date_performed?: string | null
          dentist_id?: string | null
          duration_minutes?: number | null
          follow_up_date?: string | null
          follow_up_needed?: boolean | null
          id?: string
          insurance_covered?: number | null
          materials_used?: string[] | null
          notes?: string | null
          patient_id?: string | null
          patient_portion?: number | null
          practice_id?: string | null
          status?: Database["public"]["Enums"]["treatment_status"] | null
          surface?: string[] | null
          tooth_number?: string[] | null
          treatment_code?: string | null
          treatment_description?: string | null
          treatment_name: string
          updated_at?: string | null
          x_ray_images?: string[] | null
        }
        Update: {
          after_images?: string[] | null
          anesthesia_used?: string | null
          appointment_id?: string | null
          before_images?: string[] | null
          complications?: string | null
          cost?: number | null
          created_at?: string | null
          created_by?: string | null
          date_performed?: string | null
          dentist_id?: string | null
          duration_minutes?: number | null
          follow_up_date?: string | null
          follow_up_needed?: boolean | null
          id?: string
          insurance_covered?: number | null
          materials_used?: string[] | null
          notes?: string | null
          patient_id?: string | null
          patient_portion?: number | null
          practice_id?: string | null
          status?: Database["public"]["Enums"]["treatment_status"] | null
          surface?: string[] | null
          tooth_number?: string[] | null
          treatment_code?: string | null
          treatment_description?: string | null
          treatment_name?: string
          updated_at?: string | null
          x_ray_images?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "dental_treatments_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "dental_appointments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dental_treatments_dentist_id_fkey"
            columns: ["dentist_id"]
            isOneToOne: false
            referencedRelation: "dental_staff"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dental_treatments_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "dental_patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dental_treatments_practice_id_fkey"
            columns: ["practice_id"]
            isOneToOne: false
            referencedRelation: "dental_practices"
            referencedColumns: ["id"]
          },
        ]
      }
      departments: {
        Row: {
          code: string
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          name: string
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name: string
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          updated_at?: string
        }
        Relationships: []
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
      employee_emails: {
        Row: {
          batch_id: string | null
          created_at: string | null
          email: string
          employee_id: string
          id: string
          is_primary: boolean | null
          status: string | null
          updated_at: string | null
          uploaded_at: string | null
          uploaded_by: string | null
        }
        Insert: {
          batch_id?: string | null
          created_at?: string | null
          email: string
          employee_id: string
          id?: string
          is_primary?: boolean | null
          status?: string | null
          updated_at?: string | null
          uploaded_at?: string | null
          uploaded_by?: string | null
        }
        Update: {
          batch_id?: string | null
          created_at?: string | null
          email?: string
          employee_id?: string
          id?: string
          is_primary?: boolean | null
          status?: string | null
          updated_at?: string | null
          uploaded_at?: string | null
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employee_emails_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employee_details_enhanced"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_emails_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "panchkula_payroll_calculation"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "employee_emails_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "payroll_calculation_enhanced"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "employee_emails_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "payroll_employees"
            referencedColumns: ["id"]
          },
        ]
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
            referencedRelation: "employee_details_enhanced"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_leave_balances_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "panchkula_payroll_calculation"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "employee_leave_balances_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "payroll_calculation_enhanced"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "employee_leave_balances_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "payroll_employees"
            referencedColumns: ["id"]
          },
        ]
      }
      employee_overtime_rate_history: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          change_reason: string | null
          changed_by: string | null
          created_at: string | null
          effective_from: string
          employee_id: string
          id: string
          new_rate: number | null
          old_rate: number | null
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          change_reason?: string | null
          changed_by?: string | null
          created_at?: string | null
          effective_from?: string
          employee_id: string
          id?: string
          new_rate?: number | null
          old_rate?: number | null
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          change_reason?: string | null
          changed_by?: string | null
          created_at?: string | null
          effective_from?: string
          employee_id?: string
          id?: string
          new_rate?: number | null
          old_rate?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "employee_overtime_rate_history_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employee_details_enhanced"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_overtime_rate_history_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "panchkula_payroll_calculation"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "employee_overtime_rate_history_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "payroll_calculation_enhanced"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "employee_overtime_rate_history_employee_id_fkey"
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
            referencedRelation: "employee_details_enhanced"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employee_variable_overrides_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "panchkula_payroll_calculation"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "employee_variable_overrides_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "payroll_calculation_enhanced"
            referencedColumns: ["employee_id"]
          },
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
      enhanced_mappings: {
        Row: {
          account_hierarchy_id: string | null
          auto_mapped: boolean | null
          created_at: string | null
          id: string
          mapped_by: string | null
          mapping_confidence: number | null
          mapping_notes: string | null
          original_mapping_id: number | null
          review_required: boolean | null
          reviewed_by: string | null
          updated_at: string | null
        }
        Insert: {
          account_hierarchy_id?: string | null
          auto_mapped?: boolean | null
          created_at?: string | null
          id?: string
          mapped_by?: string | null
          mapping_confidence?: number | null
          mapping_notes?: string | null
          original_mapping_id?: number | null
          review_required?: boolean | null
          reviewed_by?: string | null
          updated_at?: string | null
        }
        Update: {
          account_hierarchy_id?: string | null
          auto_mapped?: boolean | null
          created_at?: string | null
          id?: string
          mapped_by?: string | null
          mapping_confidence?: number | null
          mapping_notes?: string | null
          original_mapping_id?: number | null
          review_required?: boolean | null
          reviewed_by?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "enhanced_mappings_account_hierarchy_id_fkey"
            columns: ["account_hierarchy_id"]
            isOneToOne: false
            referencedRelation: "account_hierarchy"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enhanced_mappings_original_mapping_id_fkey"
            columns: ["original_mapping_id"]
            isOneToOne: false
            referencedRelation: "schedule3_mapping"
            referencedColumns: ["id"]
          },
        ]
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
      final_reports: {
        Row: {
          amount: number
          id: number
          master_item_id: number
          period_id: number
        }
        Insert: {
          amount: number
          id?: number
          master_item_id: number
          period_id: number
        }
        Update: {
          amount?: number
          id?: number
          master_item_id?: number
          period_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "final_reports_master_item_id_fkey"
            columns: ["master_item_id"]
            isOneToOne: false
            referencedRelation: "schedule3_master_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "final_reports_period_id_fkey"
            columns: ["period_id"]
            isOneToOne: false
            referencedRelation: "financial_periods"
            referencedColumns: ["id"]
          },
        ]
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
      financial_periods: {
        Row: {
          created_at: string
          created_by: string | null
          end_date: string | null
          id: number
          notes: string | null
          period_name: string | null
          quarter: number | null
          quarter_end_date: string
          status: string
          uploaded_by: string | null
          year: number | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          end_date?: string | null
          id?: number
          notes?: string | null
          period_name?: string | null
          quarter?: number | null
          quarter_end_date: string
          status?: string
          uploaded_by?: string | null
          year?: number | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          end_date?: string | null
          id?: number
          notes?: string | null
          period_name?: string | null
          quarter?: number | null
          quarter_end_date?: string
          status?: string
          uploaded_by?: string | null
          year?: number | null
        }
        Relationships: []
      }
      financial_ratios: {
        Row: {
          current_ratio: number | null
          debt_to_equity_ratio: number | null
          id: number
          net_profit_margin: number | null
          period_id: number
          return_on_equity: number | null
          updated_at: string
        }
        Insert: {
          current_ratio?: number | null
          debt_to_equity_ratio?: number | null
          id?: number
          net_profit_margin?: number | null
          period_id: number
          return_on_equity?: number | null
          updated_at?: string
        }
        Update: {
          current_ratio?: number | null
          debt_to_equity_ratio?: number | null
          id?: number
          net_profit_margin?: number | null
          period_id?: number
          return_on_equity?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "financial_ratios_period_id_fkey"
            columns: ["period_id"]
            isOneToOne: true
            referencedRelation: "financial_periods"
            referencedColumns: ["id"]
          },
        ]
      }
      formula_execution_audit: {
        Row: {
          calculated_result: number | null
          employee_id: string | null
          executed_at: string | null
          executed_by: string | null
          execution_time_ms: number | null
          formula_expression: string
          formula_type: string
          id: string
          month_year: string
          variables_used: Json
        }
        Insert: {
          calculated_result?: number | null
          employee_id?: string | null
          executed_at?: string | null
          executed_by?: string | null
          execution_time_ms?: number | null
          formula_expression: string
          formula_type: string
          id?: string
          month_year: string
          variables_used: Json
        }
        Update: {
          calculated_result?: number | null
          employee_id?: string | null
          executed_at?: string | null
          executed_by?: string | null
          execution_time_ms?: number | null
          formula_expression?: string
          formula_type?: string
          id?: string
          month_year?: string
          variables_used?: Json
        }
        Relationships: [
          {
            foreignKeyName: "formula_execution_audit_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employee_details_enhanced"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "formula_execution_audit_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "panchkula_payroll_calculation"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "formula_execution_audit_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "payroll_calculation_enhanced"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "formula_execution_audit_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "payroll_employees"
            referencedColumns: ["id"]
          },
        ]
      }
      formula_performance_metrics: {
        Row: {
          avg_execution_time_ms: number
          created_at: string | null
          error_count: number
          execution_count: number
          formula_name: string
          id: string
          last_executed: string | null
          status: string
          success_rate: number
          updated_at: string | null
        }
        Insert: {
          avg_execution_time_ms?: number
          created_at?: string | null
          error_count?: number
          execution_count?: number
          formula_name: string
          id?: string
          last_executed?: string | null
          status?: string
          success_rate?: number
          updated_at?: string | null
        }
        Update: {
          avg_execution_time_ms?: number
          created_at?: string | null
          error_count?: number
          execution_count?: number
          formula_name?: string
          id?: string
          last_executed?: string | null
          status?: string
          success_rate?: number
          updated_at?: string | null
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
      gdrive_file_mappings: {
        Row: {
          confidence_score: number | null
          created_at: string | null
          file_name: string
          gdrive_url: string
          id: string
          mapping_status: string | null
          parsed_customer_code: string | null
          parsed_dimensions: string | null
          parsed_item_code: string | null
          parsed_product_name: string | null
          updated_at: string | null
        }
        Insert: {
          confidence_score?: number | null
          created_at?: string | null
          file_name: string
          gdrive_url: string
          id?: string
          mapping_status?: string | null
          parsed_customer_code?: string | null
          parsed_dimensions?: string | null
          parsed_item_code?: string | null
          parsed_product_name?: string | null
          updated_at?: string | null
        }
        Update: {
          confidence_score?: number | null
          created_at?: string | null
          file_name?: string
          gdrive_url?: string
          id?: string
          mapping_status?: string | null
          parsed_customer_code?: string | null
          parsed_dimensions?: string | null
          parsed_item_code?: string | null
          parsed_product_name?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      gms_admin_settings: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          setting_key: string
          setting_value: Json | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          setting_key: string
          setting_value?: Json | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          setting_key?: string
          setting_value?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      gms_appointments: {
        Row: {
          confirmed_at: string | null
          confirmed_by: string | null
          created_at: string | null
          email: string
          full_name: string
          id: string
          notes: string | null
          phone: string
          pref_date: string
          pref_slot: string
          service: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          confirmed_at?: string | null
          confirmed_by?: string | null
          created_at?: string | null
          email: string
          full_name: string
          id?: string
          notes?: string | null
          phone: string
          pref_date: string
          pref_slot: string
          service: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          confirmed_at?: string | null
          confirmed_by?: string | null
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          notes?: string | null
          phone?: string
          pref_date?: string
          pref_slot?: string
          service?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      gms_contact_submissions: {
        Row: {
          created_at: string | null
          email: string
          handled_at: string | null
          handled_by: string | null
          id: string
          message: string
          name: string
          phone: string | null
          preferred_date: string | null
          preferred_time: string | null
          service: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          handled_at?: string | null
          handled_by?: string | null
          id?: string
          message: string
          name: string
          phone?: string | null
          preferred_date?: string | null
          preferred_time?: string | null
          service?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          handled_at?: string | null
          handled_by?: string | null
          id?: string
          message?: string
          name?: string
          phone?: string | null
          preferred_date?: string | null
          preferred_time?: string | null
          service?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      gms_testimonials: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          content: string
          created_at: string | null
          email: string | null
          id: string
          is_approved: boolean | null
          is_featured: boolean | null
          location: string | null
          name: string
          phone: string | null
          rating: number | null
          updated_at: string | null
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          content: string
          created_at?: string | null
          email?: string | null
          id?: string
          is_approved?: boolean | null
          is_featured?: boolean | null
          location?: string | null
          name: string
          phone?: string | null
          rating?: number | null
          updated_at?: string | null
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          content?: string
          created_at?: string | null
          email?: string | null
          id?: string
          is_approved?: boolean | null
          is_featured?: boolean | null
          location?: string | null
          name?: string
          phone?: string | null
          rating?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      gms_user_resource_access: {
        Row: {
          accessed_at: string | null
          created_at: string | null
          id: string
          resource_name: string
          resource_type: string
          user_id: string
        }
        Insert: {
          accessed_at?: string | null
          created_at?: string | null
          id?: string
          resource_name: string
          resource_type: string
          user_id: string
        }
        Update: {
          accessed_at?: string | null
          created_at?: string | null
          id?: string
          resource_name?: string
          resource_type?: string
          user_id?: string
        }
        Relationships: []
      }
      gms_workshop_registrations: {
        Row: {
          accessibility_requirements: string | null
          created_at: string
          dietary_requirements: string | null
          email: string
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          experience_level: string | null
          full_name: string
          how_did_you_hear: string | null
          id: string
          payment_status: string
          phone: string
          registration_date: string
          special_requests: string | null
          status: string
          updated_at: string
          user_id: string | null
          workshop_date: string | null
          workshop_id: string
          workshop_price: number | null
          workshop_title: string
          workshop_type: string
        }
        Insert: {
          accessibility_requirements?: string | null
          created_at?: string
          dietary_requirements?: string | null
          email: string
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          experience_level?: string | null
          full_name: string
          how_did_you_hear?: string | null
          id?: string
          payment_status?: string
          phone: string
          registration_date?: string
          special_requests?: string | null
          status?: string
          updated_at?: string
          user_id?: string | null
          workshop_date?: string | null
          workshop_id: string
          workshop_price?: number | null
          workshop_title: string
          workshop_type: string
        }
        Update: {
          accessibility_requirements?: string | null
          created_at?: string
          dietary_requirements?: string | null
          email?: string
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          experience_level?: string | null
          full_name?: string
          how_did_you_hear?: string | null
          id?: string
          payment_status?: string
          phone?: string
          registration_date?: string
          special_requests?: string | null
          status?: string
          updated_at?: string
          user_id?: string | null
          workshop_date?: string | null
          workshop_id?: string
          workshop_price?: number | null
          workshop_title?: string
          workshop_type?: string
        }
        Relationships: []
      }
      gravure_printing: {
        Row: {
          actual_quantity: number | null
          color_count: number | null
          completed_at: string | null
          created_at: string | null
          cylinder_number: string | null
          id: string
          ink_colors: Json | null
          ink_consumption: number | null
          operator_id: string | null
          print_length: number | null
          printing_parameters: Json | null
          printing_speed: number | null
          quality_checks: Json | null
          started_at: string | null
          status: Database["public"]["Enums"]["process_status"] | null
          substrate_width: number | null
          supervisor_id: string | null
          uiorn: string
          updated_at: string | null
          waste_percentage: number | null
        }
        Insert: {
          actual_quantity?: number | null
          color_count?: number | null
          completed_at?: string | null
          created_at?: string | null
          cylinder_number?: string | null
          id?: string
          ink_colors?: Json | null
          ink_consumption?: number | null
          operator_id?: string | null
          print_length?: number | null
          printing_parameters?: Json | null
          printing_speed?: number | null
          quality_checks?: Json | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["process_status"] | null
          substrate_width?: number | null
          supervisor_id?: string | null
          uiorn: string
          updated_at?: string | null
          waste_percentage?: number | null
        }
        Update: {
          actual_quantity?: number | null
          color_count?: number | null
          completed_at?: string | null
          created_at?: string | null
          cylinder_number?: string | null
          id?: string
          ink_colors?: Json | null
          ink_consumption?: number | null
          operator_id?: string | null
          print_length?: number | null
          printing_parameters?: Json | null
          printing_speed?: number | null
          quality_checks?: Json | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["process_status"] | null
          substrate_width?: number | null
          supervisor_id?: string | null
          uiorn?: string
          updated_at?: string | null
          waste_percentage?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "gravure_printing_uiorn_fkey"
            columns: ["uiorn"]
            isOneToOne: false
            referencedRelation: "order_punching"
            referencedColumns: ["uiorn"]
          },
        ]
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
            referencedRelation: "item_specification_summary"
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
            referencedRelation: "item_specification_summary"
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
      item_code_history: {
        Row: {
          changed_at: string | null
          changed_by: string | null
          id: string
          item_master_id: string
          new_item_code: string
          old_item_code: string
          reason: string | null
        }
        Insert: {
          changed_at?: string | null
          changed_by?: string | null
          id?: string
          item_master_id: string
          new_item_code: string
          old_item_code: string
          reason?: string | null
        }
        Update: {
          changed_at?: string | null
          changed_by?: string | null
          id?: string
          item_master_id?: string
          new_item_code?: string
          old_item_code?: string
          reason?: string | null
        }
        Relationships: []
      }
      item_master: {
        Row: {
          category_id: string | null
          created_at: string | null
          customer_name: string | null
          dimensions: string | null
          file_hyperlink: string | null
          file_id: string | null
          gsm: number | null
          id: string
          is_active: boolean | null
          item_code: string
          item_name: string
          last_specification_update: string | null
          no_of_colours: string | null
          qualifier: string | null
          size_mm: string | null
          specification_status: string | null
          specifications: Json | null
          status: string | null
          uom: string | null
          updated_at: string | null
          usage_type: string | null
        }
        Insert: {
          category_id?: string | null
          created_at?: string | null
          customer_name?: string | null
          dimensions?: string | null
          file_hyperlink?: string | null
          file_id?: string | null
          gsm?: number | null
          id?: string
          is_active?: boolean | null
          item_code: string
          item_name: string
          last_specification_update?: string | null
          no_of_colours?: string | null
          qualifier?: string | null
          size_mm?: string | null
          specification_status?: string | null
          specifications?: Json | null
          status?: string | null
          uom?: string | null
          updated_at?: string | null
          usage_type?: string | null
        }
        Update: {
          category_id?: string | null
          created_at?: string | null
          customer_name?: string | null
          dimensions?: string | null
          file_hyperlink?: string | null
          file_id?: string | null
          gsm?: number | null
          id?: string
          is_active?: boolean | null
          item_code?: string
          item_name?: string
          last_specification_update?: string | null
          no_of_colours?: string | null
          qualifier?: string | null
          size_mm?: string | null
          specification_status?: string | null
          specifications?: Json | null
          status?: string | null
          uom?: string | null
          updated_at?: string | null
          usage_type?: string | null
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
      item_price_history: {
        Row: {
          approved_by: string | null
          business_justification: string | null
          change_reason: string | null
          change_type: string | null
          changed_by: string | null
          created_at: string | null
          effective_date: string | null
          id: string
          item_code: string
          new_price: number
          old_price: number | null
          price_change_percentage: number | null
          record_id: string | null
          upload_id: string | null
          validation_flags: Json | null
        }
        Insert: {
          approved_by?: string | null
          business_justification?: string | null
          change_reason?: string | null
          change_type?: string | null
          changed_by?: string | null
          created_at?: string | null
          effective_date?: string | null
          id?: string
          item_code: string
          new_price: number
          old_price?: number | null
          price_change_percentage?: number | null
          record_id?: string | null
          upload_id?: string | null
          validation_flags?: Json | null
        }
        Update: {
          approved_by?: string | null
          business_justification?: string | null
          change_reason?: string | null
          change_type?: string | null
          changed_by?: string | null
          created_at?: string | null
          effective_date?: string | null
          id?: string
          item_code?: string
          new_price?: number
          old_price?: number | null
          price_change_percentage?: number | null
          record_id?: string | null
          upload_id?: string | null
          validation_flags?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "item_price_history_record_id_fkey"
            columns: ["record_id"]
            isOneToOne: false
            referencedRelation: "item_pricing_upload_records"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "item_price_history_upload_id_fkey"
            columns: ["upload_id"]
            isOneToOne: false
            referencedRelation: "item_pricing_csv_uploads"
            referencedColumns: ["id"]
          },
        ]
      }
      item_pricing_csv_uploads: {
        Row: {
          approved_records: number
          completed_at: string | null
          created_at: string | null
          error_details: Json | null
          file_size_bytes: number
          filename: string
          id: string
          pending_records: number
          processed_records: number
          processing_status: string | null
          rejected_records: number
          total_records: number
          upload_date: string | null
          uploaded_by: string | null
          validation_summary: Json | null
        }
        Insert: {
          approved_records?: number
          completed_at?: string | null
          created_at?: string | null
          error_details?: Json | null
          file_size_bytes?: number
          filename: string
          id?: string
          pending_records?: number
          processed_records?: number
          processing_status?: string | null
          rejected_records?: number
          total_records?: number
          upload_date?: string | null
          uploaded_by?: string | null
          validation_summary?: Json | null
        }
        Update: {
          approved_records?: number
          completed_at?: string | null
          created_at?: string | null
          error_details?: Json | null
          file_size_bytes?: number
          filename?: string
          id?: string
          pending_records?: number
          processed_records?: number
          processing_status?: string | null
          rejected_records?: number
          total_records?: number
          upload_date?: string | null
          uploaded_by?: string | null
          validation_summary?: Json | null
        }
        Relationships: []
      }
      item_pricing_master: {
        Row: {
          approval_status: string | null
          approved_at: string | null
          approved_by: string | null
          category: string | null
          cost_category: string | null
          created_at: string | null
          created_by: string | null
          current_price: number
          effective_date: string | null
          id: string
          is_active: boolean | null
          item_code: string
          item_name: string | null
          previous_price: number | null
          price_change_reason: string | null
          price_source: string | null
          supplier: string | null
          uom: string | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          approval_status?: string | null
          approved_at?: string | null
          approved_by?: string | null
          category?: string | null
          cost_category?: string | null
          created_at?: string | null
          created_by?: string | null
          current_price?: number
          effective_date?: string | null
          id?: string
          is_active?: boolean | null
          item_code: string
          item_name?: string | null
          previous_price?: number | null
          price_change_reason?: string | null
          price_source?: string | null
          supplier?: string | null
          uom?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          approval_status?: string | null
          approved_at?: string | null
          approved_by?: string | null
          category?: string | null
          cost_category?: string | null
          created_at?: string | null
          created_by?: string | null
          current_price?: number
          effective_date?: string | null
          id?: string
          is_active?: boolean | null
          item_code?: string
          item_name?: string | null
          previous_price?: number | null
          price_change_reason?: string | null
          price_source?: string | null
          supplier?: string | null
          uom?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: []
      }
      item_pricing_upload_records: {
        Row: {
          auto_approved: boolean | null
          change_reason: string | null
          cost_category: string | null
          created_at: string | null
          current_price: number | null
          effective_date: string | null
          id: string
          item_code: string
          price_change_percentage: number | null
          proposed_price: number
          review_notes: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          row_number: number
          supplier: string | null
          upload_id: string | null
          validation_errors: Json | null
          validation_status: string | null
          validation_warnings: Json | null
        }
        Insert: {
          auto_approved?: boolean | null
          change_reason?: string | null
          cost_category?: string | null
          created_at?: string | null
          current_price?: number | null
          effective_date?: string | null
          id?: string
          item_code: string
          price_change_percentage?: number | null
          proposed_price: number
          review_notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          row_number: number
          supplier?: string | null
          upload_id?: string | null
          validation_errors?: Json | null
          validation_status?: string | null
          validation_warnings?: Json | null
        }
        Update: {
          auto_approved?: boolean | null
          change_reason?: string | null
          cost_category?: string | null
          created_at?: string | null
          current_price?: number | null
          effective_date?: string | null
          id?: string
          item_code?: string
          price_change_percentage?: number | null
          proposed_price?: number
          review_notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          row_number?: number
          supplier?: string | null
          upload_id?: string | null
          validation_errors?: Json | null
          validation_status?: string | null
          validation_warnings?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "item_pricing_upload_records_upload_id_fkey"
            columns: ["upload_id"]
            isOneToOne: false
            referencedRelation: "item_pricing_csv_uploads"
            referencedColumns: ["id"]
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
      lamination: {
        Row: {
          adhesive_coating_weight: number | null
          adhesive_type: string | null
          bond_strength: number | null
          completed_at: string | null
          created_at: string | null
          gsm_substrate_1: number | null
          gsm_substrate_2: number | null
          id: string
          lamination_speed: number | null
          lamination_type: string
          operator_id: string | null
          peel_strength: number | null
          pressure: number | null
          quality_approved_by: string | null
          started_at: string | null
          status: Database["public"]["Enums"]["process_status"] | null
          substrate_1: string
          substrate_2: string | null
          temperature: number | null
          uiorn: string
          updated_at: string | null
        }
        Insert: {
          adhesive_coating_weight?: number | null
          adhesive_type?: string | null
          bond_strength?: number | null
          completed_at?: string | null
          created_at?: string | null
          gsm_substrate_1?: number | null
          gsm_substrate_2?: number | null
          id?: string
          lamination_speed?: number | null
          lamination_type: string
          operator_id?: string | null
          peel_strength?: number | null
          pressure?: number | null
          quality_approved_by?: string | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["process_status"] | null
          substrate_1: string
          substrate_2?: string | null
          temperature?: number | null
          uiorn: string
          updated_at?: string | null
        }
        Update: {
          adhesive_coating_weight?: number | null
          adhesive_type?: string | null
          bond_strength?: number | null
          completed_at?: string | null
          created_at?: string | null
          gsm_substrate_1?: number | null
          gsm_substrate_2?: number | null
          id?: string
          lamination_speed?: number | null
          lamination_type?: string
          operator_id?: string | null
          peel_strength?: number | null
          pressure?: number | null
          quality_approved_by?: string | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["process_status"] | null
          substrate_1?: string
          substrate_2?: string | null
          temperature?: number | null
          uiorn?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lamination_uiorn_fkey"
            columns: ["uiorn"]
            isOneToOne: false
            referencedRelation: "order_punching"
            referencedColumns: ["uiorn"]
          },
        ]
      }
      leave_adjustment_history: {
        Row: {
          adjusted_by: string | null
          adjustment_amount: number
          adjustment_date: string
          adjustment_reason: string
          approved_at: string | null
          approved_by: string | null
          attendance_based_balance: number | null
          batch_id: string | null
          created_at: string
          discrepancy_source: string | null
          employee_id: string
          id: string
          leave_type: string
          new_balance: number
          original_calculated_balance: number | null
          previous_balance: number
          reconciliation_month: number
          reconciliation_session_id: string | null
          reconciliation_year: number
          unit_id: string | null
          updated_at: string
        }
        Insert: {
          adjusted_by?: string | null
          adjustment_amount?: number
          adjustment_date?: string
          adjustment_reason: string
          approved_at?: string | null
          approved_by?: string | null
          attendance_based_balance?: number | null
          batch_id?: string | null
          created_at?: string
          discrepancy_source?: string | null
          employee_id: string
          id?: string
          leave_type: string
          new_balance?: number
          original_calculated_balance?: number | null
          previous_balance?: number
          reconciliation_month: number
          reconciliation_session_id?: string | null
          reconciliation_year: number
          unit_id?: string | null
          updated_at?: string
        }
        Update: {
          adjusted_by?: string | null
          adjustment_amount?: number
          adjustment_date?: string
          adjustment_reason?: string
          approved_at?: string | null
          approved_by?: string | null
          attendance_based_balance?: number | null
          batch_id?: string | null
          created_at?: string
          discrepancy_source?: string | null
          employee_id?: string
          id?: string
          leave_type?: string
          new_balance?: number
          original_calculated_balance?: number | null
          previous_balance?: number
          reconciliation_month?: number
          reconciliation_session_id?: string | null
          reconciliation_year?: number
          unit_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "leave_adjustment_history_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employee_details_enhanced"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leave_adjustment_history_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "panchkula_payroll_calculation"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "leave_adjustment_history_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "payroll_calculation_enhanced"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "leave_adjustment_history_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "payroll_employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leave_adjustment_history_reconciliation_session_id_fkey"
            columns: ["reconciliation_session_id"]
            isOneToOne: false
            referencedRelation: "leave_reconciliation_status"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leave_adjustment_history_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["unit_id"]
          },
        ]
      }
      leave_applications: {
        Row: {
          applied_by: string | null
          approved_at: string | null
          approved_by: string | null
          created_at: string | null
          employee_id: string
          end_date: string
          id: string
          leave_type: string
          reason: string | null
          remarks: string | null
          start_date: string
          status: string
          total_days: number
          unit_id: string | null
          updated_at: string | null
        }
        Insert: {
          applied_by?: string | null
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string | null
          employee_id: string
          end_date: string
          id?: string
          leave_type: string
          reason?: string | null
          remarks?: string | null
          start_date: string
          status?: string
          total_days: number
          unit_id?: string | null
          updated_at?: string | null
        }
        Update: {
          applied_by?: string | null
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string | null
          employee_id?: string
          end_date?: string
          id?: string
          leave_type?: string
          reason?: string | null
          remarks?: string | null
          start_date?: string
          status?: string
          total_days?: number
          unit_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "leave_applications_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employee_details_enhanced"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leave_applications_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "panchkula_payroll_calculation"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "leave_applications_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "payroll_calculation_enhanced"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "leave_applications_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "payroll_employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leave_applications_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["unit_id"]
          },
        ]
      }
      leave_balance_history: {
        Row: {
          attendance_date: string
          balance_after: number
          balance_before: number
          created_at: string | null
          created_by: string | null
          days_used: number
          employee_id: string
          id: string
          leave_type: string
        }
        Insert: {
          attendance_date: string
          balance_after?: number
          balance_before?: number
          created_at?: string | null
          created_by?: string | null
          days_used?: number
          employee_id: string
          id?: string
          leave_type: string
        }
        Update: {
          attendance_date?: string
          balance_after?: number
          balance_before?: number
          created_at?: string | null
          created_by?: string | null
          days_used?: number
          employee_id?: string
          id?: string
          leave_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "leave_balance_history_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employee_details_enhanced"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leave_balance_history_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "panchkula_payroll_calculation"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "leave_balance_history_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "payroll_calculation_enhanced"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "leave_balance_history_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "payroll_employees"
            referencedColumns: ["id"]
          },
        ]
      }
      leave_reconciliation_status: {
        Row: {
          created_at: string
          employees_adjusted: number
          id: string
          is_completed: boolean
          month: number
          notes: string | null
          reconciled_by: string | null
          reconciliation_date: string
          total_adjustments: number
          total_employees: number
          unit_id: string | null
          updated_at: string
          year: number
        }
        Insert: {
          created_at?: string
          employees_adjusted?: number
          id?: string
          is_completed?: boolean
          month: number
          notes?: string | null
          reconciled_by?: string | null
          reconciliation_date?: string
          total_adjustments?: number
          total_employees?: number
          unit_id?: string | null
          updated_at?: string
          year: number
        }
        Update: {
          created_at?: string
          employees_adjusted?: number
          id?: string
          is_completed?: boolean
          month?: number
          notes?: string | null
          reconciled_by?: string | null
          reconciliation_date?: string
          total_adjustments?: number
          total_employees?: number
          unit_id?: string | null
          updated_at?: string
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "leave_reconciliation_status_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["unit_id"]
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
      machines: {
        Row: {
          capacity_per_hour: number | null
          created_at: string | null
          current_order_uiorn: string | null
          id: string
          last_maintenance: string | null
          location: string | null
          machine_id: string
          machine_name: string
          machine_type: string
          next_maintenance: string | null
          operator_id: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          capacity_per_hour?: number | null
          created_at?: string | null
          current_order_uiorn?: string | null
          id?: string
          last_maintenance?: string | null
          location?: string | null
          machine_id: string
          machine_name: string
          machine_type: string
          next_maintenance?: string | null
          operator_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          capacity_per_hour?: number | null
          created_at?: string | null
          current_order_uiorn?: string | null
          id?: string
          last_maintenance?: string | null
          location?: string | null
          machine_id?: string
          machine_name?: string
          machine_type?: string
          next_maintenance?: string | null
          operator_id?: string | null
          status?: string | null
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
          delta_e_tolerance: number | null
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
          target_a: number | null
          target_b: number | null
          target_l: number | null
          total_runs: string | null
          ups: number | null
        }
        Insert: {
          circum?: number | null
          coil_size?: string | null
          customer_name?: string | null
          cut_length?: string | null
          cyl_qty?: string | null
          delta_e_tolerance?: number | null
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
          target_a?: number | null
          target_b?: number | null
          target_l?: number | null
          total_runs?: string | null
          ups?: number | null
        }
        Update: {
          circum?: number | null
          coil_size?: string | null
          customer_name?: string | null
          cut_length?: string | null
          cyl_qty?: string | null
          delta_e_tolerance?: number | null
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
          target_a?: number | null
          target_b?: number | null
          target_l?: number | null
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
      material_consumption: {
        Row: {
          consumption_date: string | null
          cost_per_unit: number | null
          id: string
          material_type: string
          operator_id: string | null
          quantity_consumed: number | null
          stage: string
          total_cost: number | null
          uiorn: string
          unit: string | null
          waste_quantity: number | null
        }
        Insert: {
          consumption_date?: string | null
          cost_per_unit?: number | null
          id?: string
          material_type: string
          operator_id?: string | null
          quantity_consumed?: number | null
          stage: string
          total_cost?: number | null
          uiorn: string
          unit?: string | null
          waste_quantity?: number | null
        }
        Update: {
          consumption_date?: string | null
          cost_per_unit?: number | null
          id?: string
          material_type?: string
          operator_id?: string | null
          quantity_consumed?: number | null
          stage?: string
          total_cost?: number | null
          uiorn?: string
          unit?: string | null
          waste_quantity?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "material_consumption_operator_id_fkey"
            columns: ["operator_id"]
            isOneToOne: false
            referencedRelation: "operators"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "material_consumption_uiorn_fkey"
            columns: ["uiorn"]
            isOneToOne: false
            referencedRelation: "order_punching"
            referencedColumns: ["uiorn"]
          },
        ]
      }
      material_flow_tracking: {
        Row: {
          actual_vs_planned_variance: number | null
          bom_variance_percentage: number | null
          created_at: string | null
          customer_code: string | null
          fg_item_code: string | null
          id: string
          input_material_type: string
          input_quantity: number
          input_source_process: string | null
          input_unit: string
          material_cost_per_unit: number
          notes: string | null
          operator_id: string | null
          order_quantity: number | null
          output_good_quantity: number
          output_rework_quantity: number
          output_waste_quantity: number
          planned_consumption: number | null
          process_stage: Database["public"]["Enums"]["process_stage"]
          quality_grade: string
          recorded_at: string
          rework_reason: string | null
          total_input_cost: number
          uiorn: string
          updated_at: string | null
          waste_classification: string
          waste_cost_impact: number
          yield_percentage: number
        }
        Insert: {
          actual_vs_planned_variance?: number | null
          bom_variance_percentage?: number | null
          created_at?: string | null
          customer_code?: string | null
          fg_item_code?: string | null
          id?: string
          input_material_type: string
          input_quantity?: number
          input_source_process?: string | null
          input_unit?: string
          material_cost_per_unit?: number
          notes?: string | null
          operator_id?: string | null
          order_quantity?: number | null
          output_good_quantity?: number
          output_rework_quantity?: number
          output_waste_quantity?: number
          planned_consumption?: number | null
          process_stage: Database["public"]["Enums"]["process_stage"]
          quality_grade?: string
          recorded_at?: string
          rework_reason?: string | null
          total_input_cost?: number
          uiorn: string
          updated_at?: string | null
          waste_classification?: string
          waste_cost_impact?: number
          yield_percentage?: number
        }
        Update: {
          actual_vs_planned_variance?: number | null
          bom_variance_percentage?: number | null
          created_at?: string | null
          customer_code?: string | null
          fg_item_code?: string | null
          id?: string
          input_material_type?: string
          input_quantity?: number
          input_source_process?: string | null
          input_unit?: string
          material_cost_per_unit?: number
          notes?: string | null
          operator_id?: string | null
          order_quantity?: number | null
          output_good_quantity?: number
          output_rework_quantity?: number
          output_waste_quantity?: number
          planned_consumption?: number | null
          process_stage?: Database["public"]["Enums"]["process_stage"]
          quality_grade?: string
          recorded_at?: string
          rework_reason?: string | null
          total_input_cost?: number
          uiorn?: string
          updated_at?: string | null
          waste_classification?: string
          waste_cost_impact?: number
          yield_percentage?: number
        }
        Relationships: []
      }
      material_intelligence_rules: {
        Row: {
          accuracy_score: number | null
          actions: Json
          conditions: Json
          created_at: string | null
          created_by: string | null
          critical_threshold: number | null
          id: string
          is_active: boolean | null
          material_category: string
          rule_config: Json
          rule_type: string
          trigger_count: number | null
          updated_at: string | null
          warning_threshold: number | null
        }
        Insert: {
          accuracy_score?: number | null
          actions?: Json
          conditions?: Json
          created_at?: string | null
          created_by?: string | null
          critical_threshold?: number | null
          id?: string
          is_active?: boolean | null
          material_category: string
          rule_config?: Json
          rule_type: string
          trigger_count?: number | null
          updated_at?: string | null
          warning_threshold?: number | null
        }
        Update: {
          accuracy_score?: number | null
          actions?: Json
          conditions?: Json
          created_at?: string | null
          created_by?: string | null
          critical_threshold?: number | null
          id?: string
          is_active?: boolean | null
          material_category?: string
          rule_config?: Json
          rule_type?: string
          trigger_count?: number | null
          updated_at?: string | null
          warning_threshold?: number | null
        }
        Relationships: []
      }
      material_selection: {
        Row: {
          alternative_materials: Json | null
          approved_at: string | null
          approved_by: string | null
          barrier_properties: Json | null
          cost_per_kg: number | null
          created_at: string | null
          elongation_percentage: number | null
          food_grade_certified: boolean | null
          gsm: number | null
          id: string
          lead_time_days: number | null
          length_meters: number | null
          material_code: string | null
          material_grade: string
          material_type: Database["public"]["Enums"]["material_type"]
          minimum_order_quantity: number | null
          selected_at: string | null
          selected_by: string | null
          selection_criteria: string | null
          status: Database["public"]["Enums"]["process_status"] | null
          supplier_name: string | null
          sustainability_rating: string | null
          tensile_strength: number | null
          thickness_microns: number | null
          uiorn: string
          updated_at: string | null
          width_mm: number | null
        }
        Insert: {
          alternative_materials?: Json | null
          approved_at?: string | null
          approved_by?: string | null
          barrier_properties?: Json | null
          cost_per_kg?: number | null
          created_at?: string | null
          elongation_percentage?: number | null
          food_grade_certified?: boolean | null
          gsm?: number | null
          id?: string
          lead_time_days?: number | null
          length_meters?: number | null
          material_code?: string | null
          material_grade: string
          material_type: Database["public"]["Enums"]["material_type"]
          minimum_order_quantity?: number | null
          selected_at?: string | null
          selected_by?: string | null
          selection_criteria?: string | null
          status?: Database["public"]["Enums"]["process_status"] | null
          supplier_name?: string | null
          sustainability_rating?: string | null
          tensile_strength?: number | null
          thickness_microns?: number | null
          uiorn: string
          updated_at?: string | null
          width_mm?: number | null
        }
        Update: {
          alternative_materials?: Json | null
          approved_at?: string | null
          approved_by?: string | null
          barrier_properties?: Json | null
          cost_per_kg?: number | null
          created_at?: string | null
          elongation_percentage?: number | null
          food_grade_certified?: boolean | null
          gsm?: number | null
          id?: string
          lead_time_days?: number | null
          length_meters?: number | null
          material_code?: string | null
          material_grade?: string
          material_type?: Database["public"]["Enums"]["material_type"]
          minimum_order_quantity?: number | null
          selected_at?: string | null
          selected_by?: string | null
          selection_criteria?: string | null
          status?: Database["public"]["Enums"]["process_status"] | null
          supplier_name?: string | null
          sustainability_rating?: string | null
          tensile_strength?: number | null
          thickness_microns?: number | null
          uiorn?: string
          updated_at?: string | null
          width_mm?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "material_selection_uiorn_fkey"
            columns: ["uiorn"]
            isOneToOne: false
            referencedRelation: "order_punching"
            referencedColumns: ["uiorn"]
          },
        ]
      }
      materiality_settings: {
        Row: {
          applicable_to: string
          created_at: string | null
          created_by: string | null
          id: string
          is_active: boolean | null
          materiality_type: string
          setting_name: string
          threshold_value: number
          updated_at: string | null
        }
        Insert: {
          applicable_to: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          materiality_type: string
          setting_name: string
          threshold_value: number
          updated_at?: string | null
        }
        Update: {
          applicable_to?: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          materiality_type?: string
          setting_name?: string
          threshold_value?: number
          updated_at?: string | null
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
      operators: {
        Row: {
          created_at: string | null
          current_machine_id: string | null
          current_order_uiorn: string | null
          id: string
          is_active: boolean | null
          operator_code: string
          operator_name: string
          shift: string | null
          skills: string[] | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          current_machine_id?: string | null
          current_order_uiorn?: string | null
          id?: string
          is_active?: boolean | null
          operator_code: string
          operator_name: string
          shift?: string | null
          skills?: string[] | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          current_machine_id?: string | null
          current_order_uiorn?: string | null
          id?: string
          is_active?: boolean | null
          operator_code?: string
          operator_name?: string
          shift?: string | null
          skills?: string[] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      order_progress: {
        Row: {
          actual_completion: string | null
          current_stage: string
          estimated_completion: string | null
          id: string
          progress_percentage: number | null
          stage_notes: string | null
          stage_status: string | null
          started_at: string | null
          uiorn: string
          updated_at: string | null
        }
        Insert: {
          actual_completion?: string | null
          current_stage: string
          estimated_completion?: string | null
          id?: string
          progress_percentage?: number | null
          stage_notes?: string | null
          stage_status?: string | null
          started_at?: string | null
          uiorn: string
          updated_at?: string | null
        }
        Update: {
          actual_completion?: string | null
          current_stage?: string
          estimated_completion?: string | null
          id?: string
          progress_percentage?: number | null
          stage_notes?: string | null
          stage_status?: string | null
          started_at?: string | null
          uiorn?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "order_progress_uiorn_fkey"
            columns: ["uiorn"]
            isOneToOne: false
            referencedRelation: "order_punching"
            referencedColumns: ["uiorn"]
          },
        ]
      }
      order_punching: {
        Row: {
          assigned_to: string | null
          created_at: string | null
          created_by: string | null
          customer_code: string | null
          customer_name: string
          delivery_date: string | null
          id: string
          order_date: string
          order_quantity: number
          priority_level: string | null
          product_description: string
          special_instructions: string | null
          status: Database["public"]["Enums"]["process_status"] | null
          uiorn: string
          unit_of_measure: string | null
          updated_at: string | null
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string | null
          created_by?: string | null
          customer_code?: string | null
          customer_name: string
          delivery_date?: string | null
          id?: string
          order_date?: string
          order_quantity: number
          priority_level?: string | null
          product_description: string
          special_instructions?: string | null
          status?: Database["public"]["Enums"]["process_status"] | null
          uiorn: string
          unit_of_measure?: string | null
          updated_at?: string | null
        }
        Update: {
          assigned_to?: string | null
          created_at?: string | null
          created_by?: string | null
          customer_code?: string | null
          customer_name?: string
          delivery_date?: string | null
          id?: string
          order_date?: string
          order_quantity?: number
          priority_level?: string | null
          product_description?: string
          special_instructions?: string | null
          status?: Database["public"]["Enums"]["process_status"] | null
          uiorn?: string
          unit_of_measure?: string | null
          updated_at?: string | null
        }
        Relationships: []
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
      outlier_detection_log: {
        Row: {
          created_at: string | null
          current_value: number | null
          detection_date: string
          deviation_percentage: number | null
          expected_value: number | null
          id: string
          impact_assessment: string | null
          item_code: string
          material_category: string
          outlier_description: string | null
          outlier_type: string
          recommended_action: string | null
          resolution_notes: string | null
          resolved_at: string | null
          resolved_by: string | null
          severity: string
          status: string | null
          z_score: number | null
        }
        Insert: {
          created_at?: string | null
          current_value?: number | null
          detection_date?: string
          deviation_percentage?: number | null
          expected_value?: number | null
          id?: string
          impact_assessment?: string | null
          item_code: string
          material_category: string
          outlier_description?: string | null
          outlier_type: string
          recommended_action?: string | null
          resolution_notes?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          severity?: string
          status?: string | null
          z_score?: number | null
        }
        Update: {
          created_at?: string | null
          current_value?: number | null
          detection_date?: string
          deviation_percentage?: number | null
          expected_value?: number | null
          id?: string
          impact_assessment?: string | null
          item_code?: string
          material_category?: string
          outlier_description?: string | null
          outlier_type?: string
          recommended_action?: string | null
          resolution_notes?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          severity?: string
          status?: string | null
          z_score?: number | null
        }
        Relationships: []
      }
      overtime_rates_audit_log: {
        Row: {
          action: string
          batch_id: string | null
          employee_id: string | null
          id: string
          ip_address: unknown | null
          new_data: Json | null
          old_data: Json | null
          timestamp: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          batch_id?: string | null
          employee_id?: string | null
          id?: string
          ip_address?: unknown | null
          new_data?: Json | null
          old_data?: Json | null
          timestamp?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          batch_id?: string | null
          employee_id?: string | null
          id?: string
          ip_address?: unknown | null
          new_data?: Json | null
          old_data?: Json | null
          timestamp?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "overtime_rates_audit_log_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employee_details_enhanced"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "overtime_rates_audit_log_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "panchkula_payroll_calculation"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "overtime_rates_audit_log_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "payroll_calculation_enhanced"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "overtime_rates_audit_log_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "payroll_employees"
            referencedColumns: ["id"]
          },
        ]
      }
      overtime_rates_upload_history: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          batch_id: string
          error_details: Json | null
          failed_records: number | null
          file_name: string | null
          id: string
          successful_records: number | null
          total_records: number | null
          upload_status: string | null
          upload_timestamp: string | null
          uploaded_by: string | null
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          batch_id?: string
          error_details?: Json | null
          failed_records?: number | null
          file_name?: string | null
          id?: string
          successful_records?: number | null
          total_records?: number | null
          upload_status?: string | null
          upload_timestamp?: string | null
          uploaded_by?: string | null
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          batch_id?: string
          error_details?: Json | null
          failed_records?: number | null
          file_name?: string | null
          id?: string
          successful_records?: number | null
          total_records?: number | null
          upload_status?: string | null
          upload_timestamp?: string | null
          uploaded_by?: string | null
        }
        Relationships: []
      }
      overtime_validation_log: {
        Row: {
          created_at: string | null
          discrepancies: number
          employee_count: number
          id: string
          total_ot_hours: number
          validated_by: string | null
          validation_date: string
          validation_details: Json | null
          validation_status: string
        }
        Insert: {
          created_at?: string | null
          discrepancies?: number
          employee_count?: number
          id?: string
          total_ot_hours?: number
          validated_by?: string | null
          validation_date: string
          validation_details?: Json | null
          validation_status?: string
        }
        Update: {
          created_at?: string | null
          discrepancies?: number
          employee_count?: number
          id?: string
          total_ot_hours?: number
          validated_by?: string | null
          validation_date?: string
          validation_details?: Json | null
          validation_status?: string
        }
        Relationships: []
      }
      packaging_operations: {
        Row: {
          batch_numbers: string[] | null
          created_at: string | null
          id: string
          labeling_complete: boolean | null
          operator_id: string | null
          packaging_date: string | null
          packaging_specifications: Json | null
          packaging_type: string
          quality_check_passed: boolean | null
          quantity_packaged: number | null
          shipping_ready: boolean | null
          uiorn: string
          updated_at: string | null
        }
        Insert: {
          batch_numbers?: string[] | null
          created_at?: string | null
          id?: string
          labeling_complete?: boolean | null
          operator_id?: string | null
          packaging_date?: string | null
          packaging_specifications?: Json | null
          packaging_type: string
          quality_check_passed?: boolean | null
          quantity_packaged?: number | null
          shipping_ready?: boolean | null
          uiorn: string
          updated_at?: string | null
        }
        Update: {
          batch_numbers?: string[] | null
          created_at?: string | null
          id?: string
          labeling_complete?: boolean | null
          operator_id?: string | null
          packaging_date?: string | null
          packaging_specifications?: Json | null
          packaging_type?: string
          quality_check_passed?: boolean | null
          quantity_packaged?: number | null
          shipping_ready?: boolean | null
          uiorn?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "packaging_operations_operator_id_fkey"
            columns: ["operator_id"]
            isOneToOne: false
            referencedRelation: "operators"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "packaging_operations_uiorn_fkey"
            columns: ["uiorn"]
            isOneToOne: false
            referencedRelation: "order_punching"
            referencedColumns: ["uiorn"]
          },
        ]
      }
      packaging_projects: {
        Row: {
          approved_by: string | null
          barrier_properties: Json | null
          created_at: string | null
          customer_feedback: string | null
          design_approval_status: string | null
          design_completed_at: string | null
          design_requirements: string | null
          design_started_at: string | null
          designer_id: string | null
          id: string
          packaging_type: Database["public"]["Enums"]["packaging_type"]
          project_manager_id: string | null
          project_name: string
          prototype_status: string | null
          regulatory_compliance: Json | null
          revision_count: number | null
          shelf_life_requirements: number | null
          status: Database["public"]["Enums"]["process_status"] | null
          structural_specifications: Json | null
          sustainability_requirements: string | null
          uiorn: string
          updated_at: string | null
        }
        Insert: {
          approved_by?: string | null
          barrier_properties?: Json | null
          created_at?: string | null
          customer_feedback?: string | null
          design_approval_status?: string | null
          design_completed_at?: string | null
          design_requirements?: string | null
          design_started_at?: string | null
          designer_id?: string | null
          id?: string
          packaging_type: Database["public"]["Enums"]["packaging_type"]
          project_manager_id?: string | null
          project_name: string
          prototype_status?: string | null
          regulatory_compliance?: Json | null
          revision_count?: number | null
          shelf_life_requirements?: number | null
          status?: Database["public"]["Enums"]["process_status"] | null
          structural_specifications?: Json | null
          sustainability_requirements?: string | null
          uiorn: string
          updated_at?: string | null
        }
        Update: {
          approved_by?: string | null
          barrier_properties?: Json | null
          created_at?: string | null
          customer_feedback?: string | null
          design_approval_status?: string | null
          design_completed_at?: string | null
          design_requirements?: string | null
          design_started_at?: string | null
          designer_id?: string | null
          id?: string
          packaging_type?: Database["public"]["Enums"]["packaging_type"]
          project_manager_id?: string | null
          project_name?: string
          prototype_status?: string | null
          regulatory_compliance?: Json | null
          revision_count?: number | null
          shelf_life_requirements?: number | null
          status?: Database["public"]["Enums"]["process_status"] | null
          structural_specifications?: Json | null
          sustainability_requirements?: string | null
          uiorn?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "packaging_projects_uiorn_fkey"
            columns: ["uiorn"]
            isOneToOne: false
            referencedRelation: "order_punching"
            referencedColumns: ["uiorn"]
          },
        ]
      }
      packaging_selection: {
        Row: {
          approved_by: string | null
          child_resistant_features: boolean | null
          closure_type: string | null
          cost_impact_analysis: string | null
          created_at: string | null
          die_cutting_requirements: string | null
          finalized_at: string | null
          finishing_options: Json | null
          gusset_specifications: Json | null
          handle_type: string | null
          id: string
          packaging_category: string
          packaging_style: string
          perforation_requirements: string | null
          printing_areas: Json | null
          regulatory_markings: Json | null
          resealable_features: boolean | null
          seal_type: string | null
          selected_at: string | null
          selected_by: string | null
          status: Database["public"]["Enums"]["process_status"] | null
          tamper_evident_features: boolean | null
          tooling_requirements: string | null
          uiorn: string
          updated_at: string | null
          window_specifications: Json | null
        }
        Insert: {
          approved_by?: string | null
          child_resistant_features?: boolean | null
          closure_type?: string | null
          cost_impact_analysis?: string | null
          created_at?: string | null
          die_cutting_requirements?: string | null
          finalized_at?: string | null
          finishing_options?: Json | null
          gusset_specifications?: Json | null
          handle_type?: string | null
          id?: string
          packaging_category: string
          packaging_style: string
          perforation_requirements?: string | null
          printing_areas?: Json | null
          regulatory_markings?: Json | null
          resealable_features?: boolean | null
          seal_type?: string | null
          selected_at?: string | null
          selected_by?: string | null
          status?: Database["public"]["Enums"]["process_status"] | null
          tamper_evident_features?: boolean | null
          tooling_requirements?: string | null
          uiorn: string
          updated_at?: string | null
          window_specifications?: Json | null
        }
        Update: {
          approved_by?: string | null
          child_resistant_features?: boolean | null
          closure_type?: string | null
          cost_impact_analysis?: string | null
          created_at?: string | null
          die_cutting_requirements?: string | null
          finalized_at?: string | null
          finishing_options?: Json | null
          gusset_specifications?: Json | null
          handle_type?: string | null
          id?: string
          packaging_category?: string
          packaging_style?: string
          perforation_requirements?: string | null
          printing_areas?: Json | null
          regulatory_markings?: Json | null
          resealable_features?: boolean | null
          seal_type?: string | null
          selected_at?: string | null
          selected_by?: string | null
          status?: Database["public"]["Enums"]["process_status"] | null
          tamper_evident_features?: boolean | null
          tooling_requirements?: string | null
          uiorn?: string
          updated_at?: string | null
          window_specifications?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "packaging_selection_uiorn_fkey"
            columns: ["uiorn"]
            isOneToOne: false
            referencedRelation: "order_punching"
            referencedColumns: ["uiorn"]
          },
        ]
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
            referencedRelation: "employee_details_enhanced"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payroll_calculation_audit_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "panchkula_payroll_calculation"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "payroll_calculation_audit_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "payroll_calculation_enhanced"
            referencedColumns: ["employee_id"]
          },
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
          date_of_birth: string | null
          department_id: string | null
          email: string | null
          employee_code: string | null
          hra_amount: number | null
          id: string
          id_proof_file_path: string | null
          joining_date: string
          name: string
          other_conv_amount: number | null
          overtime_rate_per_hour: number | null
          pan_number: string | null
          preferred_language: string | null
          uan_number: string
          unit_id: string | null
          updated_at: string | null
        }
        Insert: {
          aadhaar_number?: string | null
          active?: boolean | null
          base_salary: number
          created_at?: string | null
          date_of_birth?: string | null
          department_id?: string | null
          email?: string | null
          employee_code?: string | null
          hra_amount?: number | null
          id?: string
          id_proof_file_path?: string | null
          joining_date: string
          name: string
          other_conv_amount?: number | null
          overtime_rate_per_hour?: number | null
          pan_number?: string | null
          preferred_language?: string | null
          uan_number: string
          unit_id?: string | null
          updated_at?: string | null
        }
        Update: {
          aadhaar_number?: string | null
          active?: boolean | null
          base_salary?: number
          created_at?: string | null
          date_of_birth?: string | null
          department_id?: string | null
          email?: string | null
          employee_code?: string | null
          hra_amount?: number | null
          id?: string
          id_proof_file_path?: string | null
          joining_date?: string
          name?: string
          other_conv_amount?: number | null
          overtime_rate_per_hour?: number | null
          pan_number?: string | null
          preferred_language?: string | null
          uan_number?: string
          unit_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payroll_employees_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
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
      payroll_reconciliation_links: {
        Row: {
          created_at: string
          employee_id: string
          id: string
          month: number
          payroll_job_id: string | null
          reconciliation_impact_amount: number | null
          reconciliation_session_id: string | null
          used_reconciled_data: boolean
          year: number
        }
        Insert: {
          created_at?: string
          employee_id: string
          id?: string
          month: number
          payroll_job_id?: string | null
          reconciliation_impact_amount?: number | null
          reconciliation_session_id?: string | null
          used_reconciled_data?: boolean
          year: number
        }
        Update: {
          created_at?: string
          employee_id?: string
          id?: string
          month?: number
          payroll_job_id?: string | null
          reconciliation_impact_amount?: number | null
          reconciliation_session_id?: string | null
          used_reconciled_data?: boolean
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "payroll_reconciliation_links_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employee_details_enhanced"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payroll_reconciliation_links_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "panchkula_payroll_calculation"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "payroll_reconciliation_links_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "payroll_calculation_enhanced"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "payroll_reconciliation_links_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "payroll_employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payroll_reconciliation_links_payroll_job_id_fkey"
            columns: ["payroll_job_id"]
            isOneToOne: false
            referencedRelation: "bulk_payroll_jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payroll_reconciliation_links_reconciliation_session_id_fkey"
            columns: ["reconciliation_session_id"]
            isOneToOne: false
            referencedRelation: "leave_reconciliation_status"
            referencedColumns: ["id"]
          },
        ]
      }
      payroll_settings: {
        Row: {
          created_at: string | null
          effective_from: string
          el_accrual_ratio: number | null
          esi_rate: number
          lwf_amount: number
          max_el_carryforward: number | null
          monthly_cl_accrual: number | null
          pf_rate: number
          setting_id: string
          sunday_overtime_multiplier: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          effective_from: string
          el_accrual_ratio?: number | null
          esi_rate: number
          lwf_amount?: number
          max_el_carryforward?: number | null
          monthly_cl_accrual?: number | null
          pf_rate: number
          setting_id?: string
          sunday_overtime_multiplier?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          effective_from?: string
          el_accrual_ratio?: number | null
          esi_rate?: number
          lwf_amount?: number
          max_el_carryforward?: number | null
          monthly_cl_accrual?: number | null
          pf_rate?: number
          setting_id?: string
          sunday_overtime_multiplier?: number | null
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
      pricing_audit_log: {
        Row: {
          action: string
          created_at: string | null
          entity_id: string | null
          entity_type: string
          id: string
          metadata: Json | null
          new_data: Json | null
          old_data: Json | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          entity_id?: string | null
          entity_type: string
          id?: string
          metadata?: Json | null
          new_data?: Json | null
          old_data?: Json | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          entity_id?: string | null
          entity_type?: string
          id?: string
          metadata?: Json | null
          new_data?: Json | null
          old_data?: Json | null
          user_id?: string | null
        }
        Relationships: []
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
      process_transfers: {
        Row: {
          created_at: string | null
          discrepancy_notes: string | null
          from_process: string
          id: string
          material_type: string
          quality_notes: string | null
          quantity_received: number | null
          quantity_sent: number
          received_at: string | null
          received_by: string | null
          sent_at: string
          sent_by: string | null
          to_process: string
          transfer_status: string
          uiorn: string
          unit_of_measure: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          discrepancy_notes?: string | null
          from_process: string
          id?: string
          material_type: string
          quality_notes?: string | null
          quantity_received?: number | null
          quantity_sent: number
          received_at?: string | null
          received_by?: string | null
          sent_at?: string
          sent_by?: string | null
          to_process: string
          transfer_status?: string
          uiorn: string
          unit_of_measure?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          discrepancy_notes?: string | null
          from_process?: string
          id?: string
          material_type?: string
          quality_notes?: string | null
          quantity_received?: number | null
          quantity_sent?: number
          received_at?: string | null
          received_by?: string | null
          sent_at?: string
          sent_by?: string | null
          to_process?: string
          transfer_status?: string
          uiorn?: string
          unit_of_measure?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      procurement_csv_uploads: {
        Row: {
          batch_id: string | null
          created_at: string | null
          error_details: Json | null
          failed_rows: number | null
          file_name: string
          file_size_bytes: number | null
          id: string
          processing_time_ms: number | null
          status: string | null
          successful_rows: number | null
          total_rows: number | null
          updated_at: string | null
          upload_date: string | null
          upload_type: string
          uploaded_by: string | null
        }
        Insert: {
          batch_id?: string | null
          created_at?: string | null
          error_details?: Json | null
          failed_rows?: number | null
          file_name: string
          file_size_bytes?: number | null
          id?: string
          processing_time_ms?: number | null
          status?: string | null
          successful_rows?: number | null
          total_rows?: number | null
          updated_at?: string | null
          upload_date?: string | null
          upload_type: string
          uploaded_by?: string | null
        }
        Update: {
          batch_id?: string | null
          created_at?: string | null
          error_details?: Json | null
          failed_rows?: number | null
          file_name?: string
          file_size_bytes?: number | null
          id?: string
          processing_time_ms?: number | null
          status?: string | null
          successful_rows?: number | null
          total_rows?: number | null
          updated_at?: string | null
          upload_date?: string | null
          upload_type?: string
          uploaded_by?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          employee_id: string | null
          full_name: string | null
          id: string
          is_active: boolean | null
          is_approved: boolean | null
          organization_id: string
          practice_id: string | null
          role: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          employee_id?: string | null
          full_name?: string | null
          id: string
          is_active?: boolean | null
          is_approved?: boolean | null
          organization_id: string
          practice_id?: string | null
          role?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          employee_id?: string | null
          full_name?: string | null
          id?: string
          is_active?: boolean | null
          is_approved?: boolean | null
          organization_id?: string
          practice_id?: string | null
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
          {
            foreignKeyName: "profiles_practice_id_fkey"
            columns: ["practice_id"]
            isOneToOne: false
            referencedRelation: "dental_practices"
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
      purchase_order_approvals: {
        Row: {
          approval_level: number
          approval_status: Database["public"]["Enums"]["approval_status"] | null
          approved_at: string | null
          approver_id: string | null
          approver_role: string | null
          comments: string | null
          created_at: string | null
          delegation_from: string | null
          escalation_date: string | null
          id: string
          notification_sent: boolean | null
          po_id: string | null
          rejected_at: string | null
          updated_at: string | null
        }
        Insert: {
          approval_level: number
          approval_status?:
            | Database["public"]["Enums"]["approval_status"]
            | null
          approved_at?: string | null
          approver_id?: string | null
          approver_role?: string | null
          comments?: string | null
          created_at?: string | null
          delegation_from?: string | null
          escalation_date?: string | null
          id?: string
          notification_sent?: boolean | null
          po_id?: string | null
          rejected_at?: string | null
          updated_at?: string | null
        }
        Update: {
          approval_level?: number
          approval_status?:
            | Database["public"]["Enums"]["approval_status"]
            | null
          approved_at?: string | null
          approver_id?: string | null
          approver_role?: string | null
          comments?: string | null
          created_at?: string | null
          delegation_from?: string | null
          escalation_date?: string | null
          id?: string
          notification_sent?: boolean | null
          po_id?: string | null
          rejected_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "purchase_order_approvals_po_id_fkey"
            columns: ["po_id"]
            isOneToOne: false
            referencedRelation: "purchase_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      purchase_order_audit_log: {
        Row: {
          action: string
          changed_at: string
          changed_by: string | null
          field_changed: string | null
          id: string
          metadata: Json | null
          new_value: Json | null
          old_value: Json | null
          purchase_order_id: string
          reason: string | null
        }
        Insert: {
          action: string
          changed_at?: string
          changed_by?: string | null
          field_changed?: string | null
          id?: string
          metadata?: Json | null
          new_value?: Json | null
          old_value?: Json | null
          purchase_order_id: string
          reason?: string | null
        }
        Update: {
          action?: string
          changed_at?: string
          changed_by?: string | null
          field_changed?: string | null
          id?: string
          metadata?: Json | null
          new_value?: Json | null
          old_value?: Json | null
          purchase_order_id?: string
          reason?: string | null
        }
        Relationships: []
      }
      purchase_order_items: {
        Row: {
          created_at: string | null
          description: string | null
          discount_amount: number | null
          discount_percentage: number | null
          id: string
          is_closed: boolean | null
          item_code: string
          item_name: string
          line_number: number
          line_total: number
          pending_quantity: number | null
          po_id: string | null
          quantity: number
          received_quantity: number | null
          required_date: string | null
          specifications: Json | null
          tax_amount: number | null
          tax_percentage: number | null
          unit_price: number
          uom: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          discount_amount?: number | null
          discount_percentage?: number | null
          id?: string
          is_closed?: boolean | null
          item_code: string
          item_name: string
          line_number: number
          line_total: number
          pending_quantity?: number | null
          po_id?: string | null
          quantity: number
          received_quantity?: number | null
          required_date?: string | null
          specifications?: Json | null
          tax_amount?: number | null
          tax_percentage?: number | null
          unit_price: number
          uom: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          discount_amount?: number | null
          discount_percentage?: number | null
          id?: string
          is_closed?: boolean | null
          item_code?: string
          item_name?: string
          line_number?: number
          line_total?: number
          pending_quantity?: number | null
          po_id?: string | null
          quantity?: number
          received_quantity?: number | null
          required_date?: string | null
          specifications?: Json | null
          tax_amount?: number | null
          tax_percentage?: number | null
          unit_price?: number
          uom?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "purchase_order_items_po_id_fkey"
            columns: ["po_id"]
            isOneToOne: false
            referencedRelation: "purchase_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      purchase_order_sequences: {
        Row: {
          created_at: string | null
          fiscal_year: number
          id: string
          last_sequence: number
          prefix: string
        }
        Insert: {
          created_at?: string | null
          fiscal_year: number
          id?: string
          last_sequence?: number
          prefix?: string
        }
        Update: {
          created_at?: string | null
          fiscal_year?: number
          id?: string
          last_sequence?: number
          prefix?: string
        }
        Relationships: []
      }
      purchase_orders: {
        Row: {
          approval_required: boolean | null
          approval_status: Database["public"]["Enums"]["approval_status"] | null
          approved_at: string | null
          approved_by: string | null
          billing_address: Json | null
          closed_at: string | null
          closed_by: string | null
          cost_center: string | null
          created_at: string | null
          created_by: string | null
          currency: string | null
          delivery_date: string | null
          department: string | null
          discount_amount: number | null
          exchange_rate: number | null
          id: string
          issued_at: string | null
          issued_by: string | null
          last_modified_at: string | null
          last_modified_by: string | null
          notes: string | null
          organization_id: string | null
          parent_po_id: string | null
          po_date: string
          po_number: string
          priority:
            | Database["public"]["Enums"]["purchase_order_priority"]
            | null
          project_code: string | null
          reference_number: string | null
          remarks: string | null
          required_date: string | null
          revision_number: number | null
          shipping_address: Json | null
          status: Database["public"]["Enums"]["purchase_order_status"] | null
          submitted_at: string | null
          subtotal: number | null
          supplier_id: string
          tax_amount: number | null
          terms_conditions: string | null
          total_amount: number | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          approval_required?: boolean | null
          approval_status?:
            | Database["public"]["Enums"]["approval_status"]
            | null
          approved_at?: string | null
          approved_by?: string | null
          billing_address?: Json | null
          closed_at?: string | null
          closed_by?: string | null
          cost_center?: string | null
          created_at?: string | null
          created_by?: string | null
          currency?: string | null
          delivery_date?: string | null
          department?: string | null
          discount_amount?: number | null
          exchange_rate?: number | null
          id?: string
          issued_at?: string | null
          issued_by?: string | null
          last_modified_at?: string | null
          last_modified_by?: string | null
          notes?: string | null
          organization_id?: string | null
          parent_po_id?: string | null
          po_date?: string
          po_number: string
          priority?:
            | Database["public"]["Enums"]["purchase_order_priority"]
            | null
          project_code?: string | null
          reference_number?: string | null
          remarks?: string | null
          required_date?: string | null
          revision_number?: number | null
          shipping_address?: Json | null
          status?: Database["public"]["Enums"]["purchase_order_status"] | null
          submitted_at?: string | null
          subtotal?: number | null
          supplier_id: string
          tax_amount?: number | null
          terms_conditions?: string | null
          total_amount?: number | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          approval_required?: boolean | null
          approval_status?:
            | Database["public"]["Enums"]["approval_status"]
            | null
          approved_at?: string | null
          approved_by?: string | null
          billing_address?: Json | null
          closed_at?: string | null
          closed_by?: string | null
          cost_center?: string | null
          created_at?: string | null
          created_by?: string | null
          currency?: string | null
          delivery_date?: string | null
          department?: string | null
          discount_amount?: number | null
          exchange_rate?: number | null
          id?: string
          issued_at?: string | null
          issued_by?: string | null
          last_modified_at?: string | null
          last_modified_by?: string | null
          notes?: string | null
          organization_id?: string | null
          parent_po_id?: string | null
          po_date?: string
          po_number?: string
          priority?:
            | Database["public"]["Enums"]["purchase_order_priority"]
            | null
          project_code?: string | null
          reference_number?: string | null
          remarks?: string | null
          required_date?: string | null
          revision_number?: number | null
          shipping_address?: Json | null
          status?: Database["public"]["Enums"]["purchase_order_status"] | null
          submitted_at?: string | null
          subtotal?: number | null
          supplier_id?: string
          tax_amount?: number | null
          terms_conditions?: string | null
          total_amount?: number | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "purchase_orders_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_orders_parent_po_id_fkey"
            columns: ["parent_po_id"]
            isOneToOne: false
            referencedRelation: "purchase_orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_orders_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      qc_sessions: {
        Row: {
          created_at: string | null
          delta_e_tolerance: number | null
          end_time: string | null
          id: string
          item_code: string
          operator_id: string | null
          start_time: string
          status: string
          target_a: number | null
          target_b: number | null
          target_l: number | null
          uiorn: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          delta_e_tolerance?: number | null
          end_time?: string | null
          id?: string
          item_code: string
          operator_id?: string | null
          start_time?: string
          status?: string
          target_a?: number | null
          target_b?: number | null
          target_l?: number | null
          uiorn: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          delta_e_tolerance?: number | null
          end_time?: string | null
          id?: string
          item_code?: string
          operator_id?: string | null
          start_time?: string
          status?: string
          target_a?: number | null
          target_b?: number | null
          target_l?: number | null
          uiorn?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      quality_checkpoints: {
        Row: {
          checkpoint_name: string
          created_at: string | null
          id: string
          inspector_id: string | null
          passed: boolean | null
          remarks: string | null
          stage: string
          test_parameters: Json | null
          test_results: Json | null
          tested_at: string | null
          uiorn: string
        }
        Insert: {
          checkpoint_name: string
          created_at?: string | null
          id?: string
          inspector_id?: string | null
          passed?: boolean | null
          remarks?: string | null
          stage: string
          test_parameters?: Json | null
          test_results?: Json | null
          tested_at?: string | null
          uiorn: string
        }
        Update: {
          checkpoint_name?: string
          created_at?: string | null
          id?: string
          inspector_id?: string | null
          passed?: boolean | null
          remarks?: string | null
          stage?: string
          test_parameters?: Json | null
          test_results?: Json | null
          tested_at?: string | null
          uiorn?: string
        }
        Relationships: [
          {
            foreignKeyName: "quality_checkpoints_inspector_id_fkey"
            columns: ["inspector_id"]
            isOneToOne: false
            referencedRelation: "operators"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quality_checkpoints_uiorn_fkey"
            columns: ["uiorn"]
            isOneToOne: false
            referencedRelation: "order_punching"
            referencedColumns: ["uiorn"]
          },
        ]
      }
      quality_metrics: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          created_at: string | null
          deviation_percentage: number | null
          id: string
          image_urls: string[] | null
          measured_value: number | null
          measurement_timestamp: string | null
          measurement_unit: string | null
          notes: string | null
          operator_id: string | null
          process_stage: Database["public"]["Enums"]["process_stage"]
          quality_template_id: string | null
          specification_max: number | null
          specification_min: number | null
          specification_target: number | null
          status: string | null
          text_value: string | null
          uiorn: string
          updated_at: string | null
          within_specification: boolean | null
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string | null
          deviation_percentage?: number | null
          id?: string
          image_urls?: string[] | null
          measured_value?: number | null
          measurement_timestamp?: string | null
          measurement_unit?: string | null
          notes?: string | null
          operator_id?: string | null
          process_stage: Database["public"]["Enums"]["process_stage"]
          quality_template_id?: string | null
          specification_max?: number | null
          specification_min?: number | null
          specification_target?: number | null
          status?: string | null
          text_value?: string | null
          uiorn: string
          updated_at?: string | null
          within_specification?: boolean | null
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string | null
          deviation_percentage?: number | null
          id?: string
          image_urls?: string[] | null
          measured_value?: number | null
          measurement_timestamp?: string | null
          measurement_unit?: string | null
          notes?: string | null
          operator_id?: string | null
          process_stage?: Database["public"]["Enums"]["process_stage"]
          quality_template_id?: string | null
          specification_max?: number | null
          specification_min?: number | null
          specification_target?: number | null
          status?: string | null
          text_value?: string | null
          uiorn?: string
          updated_at?: string | null
          within_specification?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "quality_metrics_quality_template_id_fkey"
            columns: ["quality_template_id"]
            isOneToOne: false
            referencedRelation: "quality_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      quality_specifications: {
        Row: {
          acceptance_criteria: string | null
          approved_at: string | null
          approved_by: string | null
          created_at: string | null
          customer_code: string
          effective_date: string | null
          expiry_date: string | null
          id: string
          is_active: boolean | null
          is_critical: boolean | null
          item_code: string
          max_value: number | null
          measurement_unit: string | null
          min_value: number | null
          specification_name: string
          specification_type: string
          target_value: number | null
          test_method: string | null
          updated_at: string | null
          version: number | null
        }
        Insert: {
          acceptance_criteria?: string | null
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string | null
          customer_code: string
          effective_date?: string | null
          expiry_date?: string | null
          id?: string
          is_active?: boolean | null
          is_critical?: boolean | null
          item_code: string
          max_value?: number | null
          measurement_unit?: string | null
          min_value?: number | null
          specification_name: string
          specification_type: string
          target_value?: number | null
          test_method?: string | null
          updated_at?: string | null
          version?: number | null
        }
        Update: {
          acceptance_criteria?: string | null
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string | null
          customer_code?: string
          effective_date?: string | null
          expiry_date?: string | null
          id?: string
          is_active?: boolean | null
          is_critical?: boolean | null
          item_code?: string
          max_value?: number | null
          measurement_unit?: string | null
          min_value?: number | null
          specification_name?: string
          specification_type?: string
          target_value?: number | null
          test_method?: string | null
          updated_at?: string | null
          version?: number | null
        }
        Relationships: []
      }
      quality_templates: {
        Row: {
          checkpoint_code: string
          checkpoint_name: string
          created_at: string | null
          critical_level: string | null
          frequency: string | null
          id: string
          is_mandatory: boolean | null
          measurement_type: string
          process_stage: Database["public"]["Enums"]["process_stage"]
          specification_limits: Json | null
          test_method: string | null
          updated_at: string | null
        }
        Insert: {
          checkpoint_code: string
          checkpoint_name: string
          created_at?: string | null
          critical_level?: string | null
          frequency?: string | null
          id?: string
          is_mandatory?: boolean | null
          measurement_type: string
          process_stage: Database["public"]["Enums"]["process_stage"]
          specification_limits?: Json | null
          test_method?: string | null
          updated_at?: string | null
        }
        Update: {
          checkpoint_code?: string
          checkpoint_name?: string
          created_at?: string | null
          critical_level?: string | null
          frequency?: string | null
          id?: string
          is_mandatory?: boolean | null
          measurement_type?: string
          process_stage?: Database["public"]["Enums"]["process_stage"]
          specification_limits?: Json | null
          test_method?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      quality_workflows: {
        Row: {
          assigned_to: string | null
          completed_at: string | null
          created_at: string | null
          current_step: string
          due_date: string | null
          id: string
          priority: string | null
          process_stage: Database["public"]["Enums"]["process_stage"]
          started_at: string | null
          status: string | null
          uiorn: string
          updated_at: string | null
          workflow_data: Json | null
          workflow_type: string
        }
        Insert: {
          assigned_to?: string | null
          completed_at?: string | null
          created_at?: string | null
          current_step: string
          due_date?: string | null
          id?: string
          priority?: string | null
          process_stage: Database["public"]["Enums"]["process_stage"]
          started_at?: string | null
          status?: string | null
          uiorn: string
          updated_at?: string | null
          workflow_data?: Json | null
          workflow_type: string
        }
        Update: {
          assigned_to?: string | null
          completed_at?: string | null
          created_at?: string | null
          current_step?: string
          due_date?: string | null
          id?: string
          priority?: string | null
          process_stage?: Database["public"]["Enums"]["process_stage"]
          started_at?: string | null
          status?: string | null
          uiorn?: string
          updated_at?: string | null
          workflow_data?: Json | null
          workflow_type?: string
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
      ratio_definitions: {
        Row: {
          benchmark_value: number | null
          calculation_formula: Json
          created_at: string | null
          display_order: number | null
          formula_description: string
          id: string
          industry_average: number | null
          is_active: boolean | null
          ratio_category: string
          ratio_name: string
          target_value: number | null
          updated_at: string | null
        }
        Insert: {
          benchmark_value?: number | null
          calculation_formula: Json
          created_at?: string | null
          display_order?: number | null
          formula_description: string
          id?: string
          industry_average?: number | null
          is_active?: boolean | null
          ratio_category: string
          ratio_name: string
          target_value?: number | null
          updated_at?: string | null
        }
        Update: {
          benchmark_value?: number | null
          calculation_formula?: Json
          created_at?: string | null
          display_order?: number | null
          formula_description?: string
          id?: string
          industry_average?: number | null
          is_active?: boolean | null
          ratio_category?: string
          ratio_name?: string
          target_value?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      reorder_rules: {
        Row: {
          auto_reorder_enabled: boolean | null
          category_specific_rules: Json | null
          consumption_rate: number | null
          created_at: string | null
          created_by: string | null
          economic_order_quantity: number | null
          id: string
          is_active: boolean | null
          item_code: string
          last_consumption_date: string | null
          lead_time_days: number
          maximum_stock: number | null
          minimum_order_quantity: number | null
          priority_level: number | null
          reorder_level: number
          reorder_quantity: number
          safety_stock: number | null
          seasonal_factor: number | null
          supplier_id: string | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          auto_reorder_enabled?: boolean | null
          category_specific_rules?: Json | null
          consumption_rate?: number | null
          created_at?: string | null
          created_by?: string | null
          economic_order_quantity?: number | null
          id?: string
          is_active?: boolean | null
          item_code: string
          last_consumption_date?: string | null
          lead_time_days?: number
          maximum_stock?: number | null
          minimum_order_quantity?: number | null
          priority_level?: number | null
          reorder_level: number
          reorder_quantity: number
          safety_stock?: number | null
          seasonal_factor?: number | null
          supplier_id?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          auto_reorder_enabled?: boolean | null
          category_specific_rules?: Json | null
          consumption_rate?: number | null
          created_at?: string | null
          created_by?: string | null
          economic_order_quantity?: number | null
          id?: string
          is_active?: boolean | null
          item_code?: string
          last_consumption_date?: string | null
          lead_time_days?: number
          maximum_stock?: number | null
          minimum_order_quantity?: number | null
          priority_level?: number | null
          reorder_level?: number
          reorder_quantity?: number
          safety_stock?: number | null
          seasonal_factor?: number | null
          supplier_id?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reorder_rules_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      reorder_suggestions: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          created_at: string | null
          current_stock: number
          estimated_cost: number | null
          estimated_stockout_date: string | null
          id: string
          item_code: string
          po_id: string | null
          reason: string | null
          reorder_level: number
          status: string | null
          suggested_quantity: number
          supplier_id: string | null
          updated_at: string | null
          urgency_level: string | null
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string | null
          current_stock: number
          estimated_cost?: number | null
          estimated_stockout_date?: string | null
          id?: string
          item_code: string
          po_id?: string | null
          reason?: string | null
          reorder_level: number
          status?: string | null
          suggested_quantity: number
          supplier_id?: string | null
          updated_at?: string | null
          urgency_level?: string | null
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string | null
          current_stock?: number
          estimated_cost?: number | null
          estimated_stockout_date?: string | null
          id?: string
          item_code?: string
          po_id?: string | null
          reason?: string | null
          reorder_level?: number
          status?: string | null
          suggested_quantity?: number
          supplier_id?: string | null
          updated_at?: string | null
          urgency_level?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reorder_suggestions_po_id_fkey"
            columns: ["po_id"]
            isOneToOne: false
            referencedRelation: "purchase_orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reorder_suggestions_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      report_templates: {
        Row: {
          created_at: string | null
          created_by: string | null
          id: string
          is_active: boolean | null
          is_default: boolean | null
          regulatory_standard: string | null
          template_name: string
          template_structure: Json
          template_type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          is_default?: boolean | null
          regulatory_standard?: string | null
          template_name: string
          template_structure: Json
          template_type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          is_default?: boolean | null
          regulatory_standard?: string | null
          template_name?: string
          template_structure?: Json
          template_type?: string
          updated_at?: string | null
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
            referencedRelation: "employee_details_enhanced"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "salary_disbursement_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "panchkula_payroll_calculation"
            referencedColumns: ["employee_id"]
          },
          {
            foreignKeyName: "salary_disbursement_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "payroll_calculation_enhanced"
            referencedColumns: ["employee_id"]
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
      satguru_ai_context_data: {
        Row: {
          context_data: Json
          context_type: string
          conversation_id: string | null
          created_at: string | null
          id: string
        }
        Insert: {
          context_data?: Json
          context_type: string
          conversation_id?: string | null
          created_at?: string | null
          id?: string
        }
        Update: {
          context_data?: Json
          context_type?: string
          conversation_id?: string | null
          created_at?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "satguru_ai_context_data_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "satguru_ai_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      satguru_ai_conversations: {
        Row: {
          context_type: string | null
          created_at: string | null
          id: string
          is_archived: boolean | null
          manufacturing_context: Json | null
          organization_id: string | null
          title: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          context_type?: string | null
          created_at?: string | null
          id?: string
          is_archived?: boolean | null
          manufacturing_context?: Json | null
          organization_id?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          context_type?: string | null
          created_at?: string | null
          id?: string
          is_archived?: boolean | null
          manufacturing_context?: Json | null
          organization_id?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "satguru_ai_conversations_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      satguru_ai_insights: {
        Row: {
          confidence_score: number | null
          created_at: string | null
          data: Json | null
          description: string | null
          id: string
          insight_type: string
          is_read: boolean | null
          manufacturing_context: Json | null
          organization_id: string | null
          title: string
          user_id: string | null
        }
        Insert: {
          confidence_score?: number | null
          created_at?: string | null
          data?: Json | null
          description?: string | null
          id?: string
          insight_type: string
          is_read?: boolean | null
          manufacturing_context?: Json | null
          organization_id?: string | null
          title: string
          user_id?: string | null
        }
        Update: {
          confidence_score?: number | null
          created_at?: string | null
          data?: Json | null
          description?: string | null
          id?: string
          insight_type?: string
          is_read?: boolean | null
          manufacturing_context?: Json | null
          organization_id?: string | null
          title?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "satguru_ai_insights_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      satguru_ai_intelligence_queries: {
        Row: {
          analysis_results: Json | null
          category_focus: string | null
          confidence_score: number | null
          correlations_found: Json | null
          created_at: string | null
          execution_time_ms: number | null
          id: string
          insights: Json | null
          material_specific_insights: Json | null
          organization_id: string | null
          outliers_count: number | null
          query_parameters: Json | null
          query_type: string
          session_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          analysis_results?: Json | null
          category_focus?: string | null
          confidence_score?: number | null
          correlations_found?: Json | null
          created_at?: string | null
          execution_time_ms?: number | null
          id?: string
          insights?: Json | null
          material_specific_insights?: Json | null
          organization_id?: string | null
          outliers_count?: number | null
          query_parameters?: Json | null
          query_type: string
          session_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          analysis_results?: Json | null
          category_focus?: string | null
          confidence_score?: number | null
          correlations_found?: Json | null
          created_at?: string | null
          execution_time_ms?: number | null
          id?: string
          insights?: Json | null
          material_specific_insights?: Json | null
          organization_id?: string | null
          outliers_count?: number | null
          query_parameters?: Json | null
          query_type?: string
          session_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "satguru_ai_intelligence_queries_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      satguru_ai_messages: {
        Row: {
          content: string
          conversation_id: string | null
          created_at: string | null
          id: string
          manufacturing_data: Json | null
          metadata: Json | null
          role: string
        }
        Insert: {
          content: string
          conversation_id?: string | null
          created_at?: string | null
          id?: string
          manufacturing_data?: Json | null
          metadata?: Json | null
          role: string
        }
        Update: {
          content?: string
          conversation_id?: string | null
          created_at?: string | null
          id?: string
          manufacturing_data?: Json | null
          metadata?: Json | null
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "satguru_ai_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "satguru_ai_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      satguru_ai_usage_analytics: {
        Row: {
          cost_estimate: number | null
          created_at: string | null
          feature_type: string
          id: string
          organization_id: string | null
          session_data: Json | null
          tokens_used: number | null
          user_id: string | null
        }
        Insert: {
          cost_estimate?: number | null
          created_at?: string | null
          feature_type: string
          id?: string
          organization_id?: string | null
          session_data?: Json | null
          tokens_used?: number | null
          user_id?: string | null
        }
        Update: {
          cost_estimate?: number | null
          created_at?: string | null
          feature_type?: string
          id?: string
          organization_id?: string | null
          session_data?: Json | null
          tokens_used?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "satguru_ai_usage_analytics_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      satguru_categories: {
        Row: {
          business_rules: Json | null
          category_code: string | null
          category_level: number | null
          category_name: string
          category_type: string | null
          created_at: string
          description: string | null
          id: string
          is_active: boolean | null
          last_modified_by: string | null
          metadata: Json | null
          parent_category_id: string | null
          sort_order: number | null
          updated_at: string
        }
        Insert: {
          business_rules?: Json | null
          category_code?: string | null
          category_level?: number | null
          category_name: string
          category_type?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          last_modified_by?: string | null
          metadata?: Json | null
          parent_category_id?: string | null
          sort_order?: number | null
          updated_at?: string
        }
        Update: {
          business_rules?: Json | null
          category_code?: string | null
          category_level?: number | null
          category_name?: string
          category_type?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          last_modified_by?: string | null
          metadata?: Json | null
          parent_category_id?: string | null
          sort_order?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "satguru_categories_parent_category_id_fkey"
            columns: ["parent_category_id"]
            isOneToOne: false
            referencedRelation: "category_stats_mv"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "satguru_categories_parent_category_id_fkey"
            columns: ["parent_category_id"]
            isOneToOne: false
            referencedRelation: "satguru_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "satguru_categories_parent_category_id_fkey"
            columns: ["parent_category_id"]
            isOneToOne: false
            referencedRelation: "satguru_category_stats"
            referencedColumns: ["id"]
          },
        ]
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
      satguru_cylinders: {
        Row: {
          colour: string
          created_at: string | null
          cylinder_code: string
          cylinder_name: string
          cylinder_size: number | null
          id: string
          is_active: boolean | null
          item_code: string
          last_run: string | null
          location: string | null
          manufacturer: string | null
          mileage_m: number | null
          remarks: string | null
          status: string
          type: string | null
          updated_at: string | null
        }
        Insert: {
          colour: string
          created_at?: string | null
          cylinder_code: string
          cylinder_name: string
          cylinder_size?: number | null
          id?: string
          is_active?: boolean | null
          item_code: string
          last_run?: string | null
          location?: string | null
          manufacturer?: string | null
          mileage_m?: number | null
          remarks?: string | null
          status?: string
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          colour?: string
          created_at?: string | null
          cylinder_code?: string
          cylinder_name?: string
          cylinder_size?: number | null
          id?: string
          is_active?: boolean | null
          item_code?: string
          last_run?: string | null
          location?: string | null
          manufacturer?: string | null
          mileage_m?: number | null
          remarks?: string | null
          status?: string
          type?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_satguru_cylinders_item_code"
            columns: ["item_code"]
            isOneToOne: false
            referencedRelation: "_artworks_revised_staging"
            referencedColumns: ["item_code"]
          },
        ]
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
          data_source: string | null
          date: string
          grn_number: string
          id: string
          invoice_number: string | null
          item_code: string
          qty_received: number
          remarks: string | null
          transaction_type: string | null
          uom: string
          upload_source: string | null
          vendor: string | null
        }
        Insert: {
          amount_inr?: number | null
          created_at?: string
          data_source?: string | null
          date?: string
          grn_number: string
          id?: string
          invoice_number?: string | null
          item_code: string
          qty_received: number
          remarks?: string | null
          transaction_type?: string | null
          uom: string
          upload_source?: string | null
          vendor?: string | null
        }
        Update: {
          amount_inr?: number | null
          created_at?: string
          data_source?: string | null
          date?: string
          grn_number?: string
          id?: string
          invoice_number?: string | null
          item_code?: string
          qty_received?: number
          remarks?: string | null
          transaction_type?: string | null
          uom?: string
          upload_source?: string | null
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
          {
            foreignKeyName: "satguru_grn_log_item_code_fkey"
            columns: ["item_code"]
            isOneToOne: false
            referencedRelation: "satguru_stock_summary_view"
            referencedColumns: ["item_code"]
          },
        ]
      }
      satguru_issue_log: {
        Row: {
          created_at: string
          data_source: string | null
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
          data_source?: string | null
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
          data_source?: string | null
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
          {
            foreignKeyName: "satguru_issue_log_item_code_fkey"
            columns: ["item_code"]
            isOneToOne: false
            referencedRelation: "satguru_stock_summary_view"
            referencedColumns: ["item_code"]
          },
        ]
      }
      satguru_issue_log_backup_cleanup: {
        Row: {
          backup_timestamp: string | null
          created_at: string | null
          date: string | null
          id: string | null
          item_code: string | null
          purpose: string | null
          qty_issued: number | null
          remarks: string | null
          total_issued_qty: number | null
        }
        Insert: {
          backup_timestamp?: string | null
          created_at?: string | null
          date?: string | null
          id?: string | null
          item_code?: string | null
          purpose?: string | null
          qty_issued?: number | null
          remarks?: string | null
          total_issued_qty?: number | null
        }
        Update: {
          backup_timestamp?: string | null
          created_at?: string | null
          date?: string | null
          id?: string | null
          item_code?: string | null
          purpose?: string | null
          qty_issued?: number | null
          remarks?: string | null
          total_issued_qty?: number | null
        }
        Relationships: []
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
          specifications: string | null
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
          specifications?: string | null
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
          specifications?: string | null
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
            referencedRelation: "category_stats_mv"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "satguru_item_master_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "satguru_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "satguru_item_master_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "satguru_category_stats"
            referencedColumns: ["id"]
          },
        ]
      }
      satguru_item_pricing: {
        Row: {
          created_at: string | null
          id: string
          item_code: string
          item_name: string | null
          purchase_rate: number | null
          standard_rate: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          item_code: string
          item_name?: string | null
          purchase_rate?: number | null
          standard_rate?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          item_code?: string
          item_name?: string | null
          purchase_rate?: number | null
          standard_rate?: number | null
          updated_at?: string | null
        }
        Relationships: []
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
          {
            foreignKeyName: "satguru_stock_item_code_fkey"
            columns: ["item_code"]
            isOneToOne: true
            referencedRelation: "satguru_stock_summary_view"
            referencedColumns: ["item_code"]
          },
        ]
      }
      schedule3_mapping: {
        Row: {
          created_at: string
          id: number
          master_item_id: number
          period_id: number
          tally_ledger_name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: number
          master_item_id: number
          period_id: number
          tally_ledger_name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: number
          master_item_id?: number
          period_id?: number
          tally_ledger_name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "schedule3_mapping_master_item_id_fkey"
            columns: ["master_item_id"]
            isOneToOne: false
            referencedRelation: "schedule3_master_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "schedule3_mapping_period_id_fkey"
            columns: ["period_id"]
            isOneToOne: false
            referencedRelation: "financial_periods"
            referencedColumns: ["id"]
          },
        ]
      }
      schedule3_master_items: {
        Row: {
          display_order: number | null
          id: number
          is_credit_positive: boolean
          report_section: string
          report_sub_section: string | null
          report_type: string
          schedule3_item: string
        }
        Insert: {
          display_order?: number | null
          id?: number
          is_credit_positive?: boolean
          report_section: string
          report_sub_section?: string | null
          report_type: string
          schedule3_item: string
        }
        Update: {
          display_order?: number | null
          id?: number
          is_credit_positive?: boolean
          report_section?: string
          report_sub_section?: string | null
          report_type?: string
          schedule3_item?: string
        }
        Relationships: []
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
      slitting: {
        Row: {
          blade_type: string | null
          completed_at: string | null
          core_diameter: number | null
          created_at: string | null
          edge_trim_waste: number | null
          finished_roll_count: number | null
          id: string
          number_of_slits: number
          operator_id: string | null
          parent_roll_width: number
          quality_checked_by: string | null
          rewind_tension: number | null
          slit_widths: Json
          slitting_speed: number | null
          started_at: string | null
          status: Database["public"]["Enums"]["process_status"] | null
          total_waste_percentage: number | null
          uiorn: string
          updated_at: string | null
        }
        Insert: {
          blade_type?: string | null
          completed_at?: string | null
          core_diameter?: number | null
          created_at?: string | null
          edge_trim_waste?: number | null
          finished_roll_count?: number | null
          id?: string
          number_of_slits: number
          operator_id?: string | null
          parent_roll_width: number
          quality_checked_by?: string | null
          rewind_tension?: number | null
          slit_widths: Json
          slitting_speed?: number | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["process_status"] | null
          total_waste_percentage?: number | null
          uiorn: string
          updated_at?: string | null
        }
        Update: {
          blade_type?: string | null
          completed_at?: string | null
          core_diameter?: number | null
          created_at?: string | null
          edge_trim_waste?: number | null
          finished_roll_count?: number | null
          id?: string
          number_of_slits?: number
          operator_id?: string | null
          parent_roll_width?: number
          quality_checked_by?: string | null
          rewind_tension?: number | null
          slit_widths?: Json
          slitting_speed?: number | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["process_status"] | null
          total_waste_percentage?: number | null
          uiorn?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "slitting_uiorn_fkey"
            columns: ["uiorn"]
            isOneToOne: false
            referencedRelation: "order_punching"
            referencedColumns: ["uiorn"]
          },
        ]
      }
      slitting_operations: {
        Row: {
          completed_at: string | null
          created_at: string | null
          id: string
          machine_id: string | null
          number_of_slits: number | null
          operator_id: string | null
          parent_roll_width: number | null
          quality_parameters: Json | null
          slitting_speed: number | null
          started_at: string | null
          status: string | null
          target_widths: number[] | null
          uiorn: string
          updated_at: string | null
          waste_percentage: number | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          machine_id?: string | null
          number_of_slits?: number | null
          operator_id?: string | null
          parent_roll_width?: number | null
          quality_parameters?: Json | null
          slitting_speed?: number | null
          started_at?: string | null
          status?: string | null
          target_widths?: number[] | null
          uiorn: string
          updated_at?: string | null
          waste_percentage?: number | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          machine_id?: string | null
          number_of_slits?: number | null
          operator_id?: string | null
          parent_roll_width?: number | null
          quality_parameters?: Json | null
          slitting_speed?: number | null
          started_at?: string | null
          status?: string | null
          target_widths?: number[] | null
          uiorn?: string
          updated_at?: string | null
          waste_percentage?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "slitting_operations_machine_id_fkey"
            columns: ["machine_id"]
            isOneToOne: false
            referencedRelation: "machines"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "slitting_operations_operator_id_fkey"
            columns: ["operator_id"]
            isOneToOne: false
            referencedRelation: "operators"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "slitting_operations_uiorn_fkey"
            columns: ["uiorn"]
            isOneToOne: false
            referencedRelation: "order_punching"
            referencedColumns: ["uiorn"]
          },
        ]
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
            referencedRelation: "item_specification_summary"
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
      stock_analytics_queries: {
        Row: {
          executed_at: string | null
          execution_time_ms: number | null
          filters: Json | null
          id: string
          organization_id: string | null
          query_type: string
          result_count: number | null
          user_id: string | null
        }
        Insert: {
          executed_at?: string | null
          execution_time_ms?: number | null
          filters?: Json | null
          id?: string
          organization_id?: string | null
          query_type: string
          result_count?: number | null
          user_id?: string | null
        }
        Update: {
          executed_at?: string | null
          execution_time_ms?: number | null
          filters?: Json | null
          id?: string
          organization_id?: string | null
          query_type?: string
          result_count?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "stock_analytics_queries_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      stories: {
        Row: {
          author: string
          cover_image_url: string | null
          created_at: string
          description: string | null
          genre: string | null
          id: string
          is_featured: boolean | null
          publication_date: string | null
          reading_time_estimate: number | null
          slug: string
          status: string
          tags: string[] | null
          title: string
          total_episodes: number | null
          updated_at: string
        }
        Insert: {
          author?: string
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          genre?: string | null
          id?: string
          is_featured?: boolean | null
          publication_date?: string | null
          reading_time_estimate?: number | null
          slug: string
          status?: string
          tags?: string[] | null
          title: string
          total_episodes?: number | null
          updated_at?: string
        }
        Update: {
          author?: string
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          genre?: string | null
          id?: string
          is_featured?: boolean | null
          publication_date?: string | null
          reading_time_estimate?: number | null
          slug?: string
          status?: string
          tags?: string[] | null
          title?: string
          total_episodes?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      story_episodes: {
        Row: {
          content: string
          created_at: string
          episode_number: number
          id: string
          image_urls: string[] | null
          is_published: boolean | null
          publication_date: string | null
          reading_time: number | null
          slug: string
          story_id: string
          title: string
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          episode_number: number
          id?: string
          image_urls?: string[] | null
          is_published?: boolean | null
          publication_date?: string | null
          reading_time?: number | null
          slug: string
          story_id: string
          title: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          episode_number?: number
          id?: string
          image_urls?: string[] | null
          is_published?: boolean | null
          publication_date?: string | null
          reading_time?: number | null
          slug?: string
          story_id?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "story_episodes_story_id_fkey"
            columns: ["story_id"]
            isOneToOne: false
            referencedRelation: "stories"
            referencedColumns: ["id"]
          },
        ]
      }
      substrate_catalog: {
        Row: {
          color: string | null
          cost_per_unit: number | null
          created_at: string | null
          id: string
          is_active: boolean | null
          length_m: number | null
          substrate_name: string
          substrate_type: string
          supplier: string | null
          thickness_micron: number | null
          updated_at: string | null
          width_mm: number | null
        }
        Insert: {
          color?: string | null
          cost_per_unit?: number | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          length_m?: number | null
          substrate_name: string
          substrate_type: string
          supplier?: string | null
          thickness_micron?: number | null
          updated_at?: string | null
          width_mm?: number | null
        }
        Update: {
          color?: string | null
          cost_per_unit?: number | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          length_m?: number | null
          substrate_name?: string
          substrate_type?: string
          supplier?: string | null
          thickness_micron?: number | null
          updated_at?: string | null
          width_mm?: number | null
        }
        Relationships: []
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
      supplier_code_sequences: {
        Row: {
          created_at: string | null
          id: number
          last_sequence: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          last_sequence?: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          last_sequence?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      suppliers: {
        Row: {
          address: Json | null
          bank_details: Json | null
          category: string | null
          certifications: Json | null
          contact_person: string | null
          created_at: string | null
          created_by: string | null
          credit_limit: number | null
          email: string | null
          id: string
          is_active: boolean | null
          is_approved: boolean | null
          lead_time_days: number | null
          material_categories: string[] | null
          minimum_order_value: number | null
          payment_terms: string | null
          performance_rating: number | null
          phone: string | null
          supplier_code: string
          supplier_name: string
          supplier_type: string | null
          tax_details: Json | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          address?: Json | null
          bank_details?: Json | null
          category?: string | null
          certifications?: Json | null
          contact_person?: string | null
          created_at?: string | null
          created_by?: string | null
          credit_limit?: number | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          is_approved?: boolean | null
          lead_time_days?: number | null
          material_categories?: string[] | null
          minimum_order_value?: number | null
          payment_terms?: string | null
          performance_rating?: number | null
          phone?: string | null
          supplier_code: string
          supplier_name: string
          supplier_type?: string | null
          tax_details?: Json | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          address?: Json | null
          bank_details?: Json | null
          category?: string | null
          certifications?: Json | null
          contact_person?: string | null
          created_at?: string | null
          created_by?: string | null
          credit_limit?: number | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          is_approved?: boolean | null
          lead_time_days?: number | null
          material_categories?: string[] | null
          minimum_order_value?: number | null
          payment_terms?: string | null
          performance_rating?: number | null
          phone?: string | null
          supplier_code?: string
          supplier_name?: string
          supplier_type?: string | null
          tax_details?: Json | null
          updated_at?: string | null
          updated_by?: string | null
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
      trial_balance_entries: {
        Row: {
          credit: number | null
          debit: number | null
          id: number
          ledger_name: string
          mapping_id: number | null
          parent_group: string | null
          period_id: number
        }
        Insert: {
          credit?: number | null
          debit?: number | null
          id?: number
          ledger_name: string
          mapping_id?: number | null
          parent_group?: string | null
          period_id: number
        }
        Update: {
          credit?: number | null
          debit?: number | null
          id?: number
          ledger_name?: string
          mapping_id?: number | null
          parent_group?: string | null
          period_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "trial_balance_entries_mapping_id_fkey"
            columns: ["mapping_id"]
            isOneToOne: false
            referencedRelation: "schedule3_mapping"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "trial_balance_entries_period_id_fkey"
            columns: ["period_id"]
            isOneToOne: false
            referencedRelation: "financial_periods"
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
      uiorn_material_consumption: {
        Row: {
          actual_quantity: number | null
          consumed_at: string | null
          id: string
          notes: string | null
          planned_quantity: number
          process_stage: Database["public"]["Enums"]["process_stage"]
          recorded_by: string | null
          rm_item_code: string
          total_cost: number | null
          uiorn: string
          unit_cost: number | null
          wastage_quantity: number | null
        }
        Insert: {
          actual_quantity?: number | null
          consumed_at?: string | null
          id?: string
          notes?: string | null
          planned_quantity: number
          process_stage: Database["public"]["Enums"]["process_stage"]
          recorded_by?: string | null
          rm_item_code: string
          total_cost?: number | null
          uiorn: string
          unit_cost?: number | null
          wastage_quantity?: number | null
        }
        Update: {
          actual_quantity?: number | null
          consumed_at?: string | null
          id?: string
          notes?: string | null
          planned_quantity?: number
          process_stage?: Database["public"]["Enums"]["process_stage"]
          recorded_by?: string | null
          rm_item_code?: string
          total_cost?: number | null
          uiorn?: string
          unit_cost?: number | null
          wastage_quantity?: number | null
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
      user_intelligence_sessions: {
        Row: {
          bookmarked_items: string[] | null
          created_at: string | null
          custom_thresholds: Json
          feedback_data: Json
          id: string
          interaction_history: Json
          last_active: string | null
          notification_preferences: Json
          organization_id: string | null
          preferred_categories: string[] | null
          updated_at: string | null
          user_id: string
          viewed_insights: string[] | null
        }
        Insert: {
          bookmarked_items?: string[] | null
          created_at?: string | null
          custom_thresholds?: Json
          feedback_data?: Json
          id?: string
          interaction_history?: Json
          last_active?: string | null
          notification_preferences?: Json
          organization_id?: string | null
          preferred_categories?: string[] | null
          updated_at?: string | null
          user_id: string
          viewed_insights?: string[] | null
        }
        Update: {
          bookmarked_items?: string[] | null
          created_at?: string | null
          custom_thresholds?: Json
          feedback_data?: Json
          id?: string
          interaction_history?: Json
          last_active?: string | null
          notification_preferences?: Json
          organization_id?: string | null
          preferred_categories?: string[] | null
          updated_at?: string | null
          user_id?: string
          viewed_insights?: string[] | null
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
      user_ratio_benchmarks: {
        Row: {
          benchmark_source: string | null
          created_at: string | null
          custom_industry_average: number | null
          custom_target_value: number | null
          id: string
          is_active: boolean | null
          notes: string | null
          organization_id: string | null
          ratio_definition_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          benchmark_source?: string | null
          created_at?: string | null
          custom_industry_average?: number | null
          custom_target_value?: number | null
          id?: string
          is_active?: boolean | null
          notes?: string | null
          organization_id?: string | null
          ratio_definition_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          benchmark_source?: string | null
          created_at?: string | null
          custom_industry_average?: number | null
          custom_target_value?: number | null
          id?: string
          is_active?: boolean | null
          notes?: string | null
          organization_id?: string | null
          ratio_definition_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_ratio_benchmarks_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_ratio_benchmarks_ratio_definition_id_fkey"
            columns: ["ratio_definition_id"]
            isOneToOne: false
            referencedRelation: "ratio_definitions"
            referencedColumns: ["id"]
          },
        ]
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
      valuation_analytics_cache: {
        Row: {
          cache_key: string
          cache_type: string
          cached_data: Json
          calculated_at: string
          calculation_time_ms: number | null
          expires_at: string
          filters_hash: string
          id: string
          record_count: number | null
        }
        Insert: {
          cache_key: string
          cache_type: string
          cached_data: Json
          calculated_at?: string
          calculation_time_ms?: number | null
          expires_at?: string
          filters_hash: string
          id?: string
          record_count?: number | null
        }
        Update: {
          cache_key?: string
          cache_type?: string
          cached_data?: Json
          calculated_at?: string
          calculation_time_ms?: number | null
          expires_at?: string
          filters_hash?: string
          id?: string
          record_count?: number | null
        }
        Relationships: []
      }
      valuation_approvals: {
        Row: {
          approval_level: number
          approver_id: string | null
          created_at: string
          decision_date: string | null
          decision_notes: string | null
          entity_id: string
          id: string
          request_amount: number | null
          request_data: Json
          request_type: string
          requested_by: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          approval_level?: number
          approver_id?: string | null
          created_at?: string
          decision_date?: string | null
          decision_notes?: string | null
          entity_id: string
          id?: string
          request_amount?: number | null
          request_data: Json
          request_type: string
          requested_by?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          approval_level?: number
          approver_id?: string | null
          created_at?: string
          decision_date?: string | null
          decision_notes?: string | null
          entity_id?: string
          id?: string
          request_amount?: number | null
          request_data?: Json
          request_type?: string
          requested_by?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      valuation_bulk_operations: {
        Row: {
          completed_at: string | null
          error_details: Json | null
          failed_records: number | null
          file_name: string | null
          file_size_mb: number | null
          id: string
          operation_summary: Json | null
          operation_type: string
          processed_records: number | null
          started_at: string
          started_by: string | null
          status: string | null
          success_details: Json | null
          success_records: number | null
          total_records: number | null
        }
        Insert: {
          completed_at?: string | null
          error_details?: Json | null
          failed_records?: number | null
          file_name?: string | null
          file_size_mb?: number | null
          id?: string
          operation_summary?: Json | null
          operation_type: string
          processed_records?: number | null
          started_at?: string
          started_by?: string | null
          status?: string | null
          success_details?: Json | null
          success_records?: number | null
          total_records?: number | null
        }
        Update: {
          completed_at?: string | null
          error_details?: Json | null
          failed_records?: number | null
          file_name?: string | null
          file_size_mb?: number | null
          id?: string
          operation_summary?: Json | null
          operation_type?: string
          processed_records?: number | null
          started_at?: string
          started_by?: string | null
          status?: string | null
          success_details?: Json | null
          success_records?: number | null
          total_records?: number | null
        }
        Relationships: []
      }
      valuation_item_codes: {
        Row: {
          category_name: string
          generated_at: string
          generated_by: string | null
          gsm: number | null
          id: string
          is_active: boolean | null
          item_code: string
          metadata: Json | null
          qualifier: string | null
          size_mm: number | null
          usage_type: string
        }
        Insert: {
          category_name: string
          generated_at?: string
          generated_by?: string | null
          gsm?: number | null
          id?: string
          is_active?: boolean | null
          item_code: string
          metadata?: Json | null
          qualifier?: string | null
          size_mm?: number | null
          usage_type: string
        }
        Update: {
          category_name?: string
          generated_at?: string
          generated_by?: string | null
          gsm?: number | null
          id?: string
          is_active?: boolean | null
          item_code?: string
          metadata?: Json | null
          qualifier?: string | null
          size_mm?: number | null
          usage_type?: string
        }
        Relationships: []
      }
      valuation_price_history: {
        Row: {
          approval_status: string | null
          approved_by: string | null
          change_reason: string | null
          changed_by: string | null
          created_at: string
          effective_date: string
          id: string
          item_code: string
          metadata: Json | null
          new_price: number
          old_price: number | null
          price_source: string | null
        }
        Insert: {
          approval_status?: string | null
          approved_by?: string | null
          change_reason?: string | null
          changed_by?: string | null
          created_at?: string
          effective_date?: string
          id?: string
          item_code: string
          metadata?: Json | null
          new_price: number
          old_price?: number | null
          price_source?: string | null
        }
        Update: {
          approval_status?: string | null
          approved_by?: string | null
          change_reason?: string | null
          changed_by?: string | null
          created_at?: string
          effective_date?: string
          id?: string
          item_code?: string
          metadata?: Json | null
          new_price?: number
          old_price?: number | null
          price_source?: string | null
        }
        Relationships: []
      }
      vendor_price_lists: {
        Row: {
          created_at: string | null
          created_by: string | null
          currency: string | null
          discount_percentage: number | null
          effective_from: string
          effective_to: string | null
          id: string
          is_active: boolean | null
          item_code: string
          lead_time_days: number | null
          minimum_order_quantity: number | null
          payment_terms: string | null
          supplier_id: string
          unit_price: number
          updated_at: string | null
          updated_by: string | null
          validity_days: number | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          currency?: string | null
          discount_percentage?: number | null
          effective_from?: string
          effective_to?: string | null
          id?: string
          is_active?: boolean | null
          item_code: string
          lead_time_days?: number | null
          minimum_order_quantity?: number | null
          payment_terms?: string | null
          supplier_id: string
          unit_price: number
          updated_at?: string | null
          updated_by?: string | null
          validity_days?: number | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          currency?: string | null
          discount_percentage?: number | null
          effective_from?: string
          effective_to?: string | null
          id?: string
          is_active?: boolean | null
          item_code?: string
          lead_time_days?: number | null
          minimum_order_quantity?: number | null
          payment_terms?: string | null
          supplier_id?: string
          unit_price?: number
          updated_at?: string | null
          updated_by?: string | null
          validity_days?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "vendor_price_lists_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "suppliers"
            referencedColumns: ["id"]
          },
        ]
      }
      weekly_off_rules: {
        Row: {
          created_at: string | null
          created_by: string | null
          day_of_week: number
          effective_from: string
          effective_to: string | null
          id: string
          is_active: boolean
          notes: string | null
          unit_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          day_of_week: number
          effective_from: string
          effective_to?: string | null
          id?: string
          is_active?: boolean
          notes?: string | null
          unit_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          day_of_week?: number
          effective_from?: string
          effective_to?: string | null
          id?: string
          is_active?: boolean
          notes?: string | null
          unit_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "weekly_off_rules_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["unit_id"]
          },
        ]
      }
    }
    Views: {
      balance_sheet_view: {
        Row: {
          category: string | null
          credit: number | null
          debit: number | null
          id: number | null
          item_code: string | null
          item_name: string | null
          ledger_name: string | null
          mapping_id: number | null
          net_amount: number | null
          period_id: number | null
          report_type: string | null
          sub_category: string | null
          tally_ledger_name: string | null
        }
        Relationships: [
          {
            foreignKeyName: "trial_balance_entries_mapping_id_fkey"
            columns: ["mapping_id"]
            isOneToOne: false
            referencedRelation: "schedule3_mapping"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "trial_balance_entries_period_id_fkey"
            columns: ["period_id"]
            isOneToOne: false
            referencedRelation: "financial_periods"
            referencedColumns: ["id"]
          },
        ]
      }
      category_hierarchy_view: {
        Row: {
          category_code: string | null
          category_level: number | null
          category_name: string | null
          full_path: string | null
          id: string | null
          parent_category_id: string | null
          path: string[] | null
        }
        Relationships: []
      }
      category_stats_mv: {
        Row: {
          active_items: number | null
          avg_item_value: number | null
          category_name: string | null
          consumable_items: number | null
          created_at: string | null
          description: string | null
          fg_items: number | null
          id: string | null
          last_item_added: string | null
          packaging_items: number | null
          rm_items: number | null
          total_items: number | null
          updated_at: string | null
        }
        Relationships: []
      }
      employee_details_enhanced: {
        Row: {
          aadhaar_number: string | null
          active: boolean | null
          age_years: number | null
          base_salary: number | null
          created_at: string | null
          date_of_birth: string | null
          department_code: string | null
          department_name: string | null
          employee_code: string | null
          hra_amount: number | null
          id: string | null
          id_proof_file_path: string | null
          joining_date: string | null
          name: string | null
          other_conv_amount: number | null
          pan_number: string | null
          plant_location: string | null
          uan_number: string | null
          unit_code: string | null
          unit_name: string | null
          updated_at: string | null
          years_of_service: number | null
        }
        Relationships: []
      }
      item_specification_summary: {
        Row: {
          active_specifications: number | null
          item_code: string | null
          item_name: string | null
          last_specification_update: string | null
          latest_specification_date: string | null
          specification_status: string | null
          total_specifications: number | null
        }
        Relationships: []
      }
      manufacturing_analytics: {
        Row: {
          active_orders: number | null
          avg_order_quantity: number | null
          completed_orders: number | null
          high_priority_orders: number | null
          on_hold_orders: number | null
          overdue_orders: number | null
          pending_orders: number | null
          unique_customers: number | null
        }
        Relationships: []
      }
      material_availability_view: {
        Row: {
          availability_status: string | null
          available_quantity: number | null
          operator_id: string | null
          process_stage: Database["public"]["Enums"]["process_stage"] | null
          quality_grade: string | null
          recorded_at: string | null
          uiorn: string | null
        }
        Insert: {
          availability_status?: never
          available_quantity?: number | null
          operator_id?: string | null
          process_stage?: Database["public"]["Enums"]["process_stage"] | null
          quality_grade?: string | null
          recorded_at?: string | null
          uiorn?: string | null
        }
        Update: {
          availability_status?: never
          available_quantity?: number | null
          operator_id?: string | null
          process_stage?: Database["public"]["Enums"]["process_stage"] | null
          quality_grade?: string | null
          recorded_at?: string | null
          uiorn?: string | null
        }
        Relationships: []
      }
      order_process_history: {
        Row: {
          captured_at: string | null
          captured_by: string | null
          current_order_status:
            | Database["public"]["Enums"]["process_status"]
            | null
          customer_name: string | null
          id: string | null
          metric: string | null
          order_created_at: string | null
          order_quantity: number | null
          priority_level: string | null
          product_description: string | null
          stage: Database["public"]["Enums"]["process_stage"] | null
          txt_value: string | null
          uiorn: string | null
          value: number | null
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
      panchkula_payroll_calculation: {
        Row: {
          base_salary: number | null
          calculation_date: string | null
          casual_leave_balance: number | null
          earned_leave_balance: number | null
          employee_code: string | null
          employee_id: string | null
          employee_name: string | null
          hra_amount: number | null
          joining_date: string | null
          other_conv_amount: number | null
          uan_number: string | null
          unit_code: string | null
          unit_name: string | null
        }
        Relationships: []
      }
      payroll_calculation_enhanced: {
        Row: {
          base_salary: number | null
          casual_leave_balance: number | null
          earned_leave_balance: number | null
          employee_id: string | null
          employee_name: string | null
          hra_amount: number | null
          other_conv_amount: number | null
          uan_number: string | null
          unit_code: string | null
          unit_id: string | null
          unit_name: string | null
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
      quality_dashboard_summary: {
        Row: {
          avg_deviation: number | null
          compliance_percentage: number | null
          failed_measurements: number | null
          last_measurement: string | null
          passed_measurements: number | null
          process_stage: Database["public"]["Enums"]["process_stage"] | null
          total_measurements: number | null
          uiorn: string | null
        }
        Relationships: []
      }
      satguru_analytics_consumption_patterns: {
        Row: {
          active_months: number | null
          avg_monthly_consumption: number | null
          category_name: string | null
          coefficient_of_variation: number | null
          consumption_pattern: string | null
          consumption_stddev: number | null
          forecast_next_month: number | null
          item_code: string | null
          item_name: string | null
          last_refreshed: string | null
          safety_stock_recommended: number | null
          seasonality_score: number | null
          total_consumption_24m: number | null
          trend_direction: string | null
          trend_percentage: number | null
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
          {
            foreignKeyName: "satguru_issue_log_item_code_fkey"
            columns: ["item_code"]
            isOneToOne: false
            referencedRelation: "satguru_stock_summary_view"
            referencedColumns: ["item_code"]
          },
        ]
      }
      satguru_category_stats: {
        Row: {
          active_items: number | null
          category_name: string | null
          consumable_items: number | null
          created_at: string | null
          description: string | null
          fg_items: number | null
          id: string | null
          packaging_items: number | null
          rm_items: number | null
          total_items: number | null
          updated_at: string | null
        }
        Relationships: []
      }
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
      satguru_stock_summary_view: {
        Row: {
          category_id: string | null
          category_name: string | null
          consumption_30_days: number | null
          current_qty: number | null
          data_quality: string | null
          item_code: string | null
          item_name: string | null
          last_updated: string | null
          legacy_baseline: number | null
          legacy_consumed_indicator: number | null
          legacy_grns: number | null
          legacy_issues: number | null
          legacy_received_indicator: number | null
          metrics_period: string | null
          net_operational_movement: number | null
          opening_stock: number | null
          operational_grns: number | null
          operational_issues: number | null
          received_30_days: number | null
          reorder_level: number | null
          stock_status: string | null
          total_grns: number | null
          total_issues: number | null
          uom: string | null
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
      accrue_monthly_leaves: {
        Args: { p_year: number; p_month: number }
        Returns: number
      }
      advanced_demand_forecast: {
        Args: { p_item_code: string; p_forecast_months?: number }
        Returns: {
          forecast_month: string
          simple_moving_average: number
          exponential_smoothing: number
          linear_trend: number
          seasonal_adjusted: number
          confidence_score: number
          recommended_forecast: number
        }[]
      }
      analyze_pricing_hierarchy_usage: {
        Args: Record<PropertyKey, never>
        Returns: {
          pricing_source: string
          item_count: number
          percentage: number
          avg_confidence: number
          total_value: number
        }[]
      }
      apply_leave_adjustments: {
        Args:
          | {
              p_adjustments: Json
              p_reason: string
              p_month: number
              p_year: number
            }
          | {
              p_adjustments: Json
              p_reason: string
              p_month: number
              p_year: number
              p_unit_id?: string
            }
        Returns: Json
      }
      assess_process_readiness: {
        Args: { p_uiorn: string; p_target_process: string }
        Returns: Json
      }
      auto_create_po_approvals: {
        Args: { po_id: string; po_amount: number }
        Returns: undefined
      }
      bulk_create_employees_from_csv: {
        Args: { rows: Json }
        Returns: Json
      }
      bulk_update_categories: {
        Args: { p_operations: Json }
        Returns: Json
      }
      bulk_upload_overtime_rates: {
        Args: {
          p_rates_data: Json
          p_file_name?: string
          p_change_reason?: string
        }
        Returns: Json
      }
      bytea_to_text: {
        Args: { data: string }
        Returns: string
      }
      calculate_bom_variance: {
        Args: { p_uiorn: string; p_process_stage: string }
        Returns: Json
      }
      calculate_current_stock: {
        Args: { p_item_code: string; p_opening_stock_date?: string }
        Returns: Json
      }
      calculate_delta_e_2000: {
        Args: {
          l1: number
          a1: number
          b1: number
          l2: number
          a2: number
          b2: number
        }
        Returns: number
      }
      calculate_end_to_end_yield: {
        Args: { p_uiorn: string }
        Returns: Json
      }
      calculate_financial_ratios: {
        Args: { p_period_id: number }
        Returns: undefined
      }
      calculate_order_progress: {
        Args: Record<PropertyKey, never> | { p_uiorn: string }
        Returns: {
          uiorn: string
          progress_percentage: number
          current_stage: string
          estimated_completion: string
        }[]
      }
      calculate_panchkula_salary: {
        Args: {
          p_employee_id: string
          p_month: string
          p_basic_salary: number
          p_hra_amount: number
          p_other_allowances?: number
        }
        Returns: {
          basic_earned: number
          hra_earned: number
          other_earned: number
          gross_salary: number
          epf_deduction: number
          esi_deduction: number
          lwf_deduction: number
          total_deductions: number
          net_salary: number
          paid_days: number
          present_days: number
          weekly_offs: number
          leave_days: number
        }[]
      }
      calculate_quality_score: {
        Args: { p_uiorn: string }
        Returns: number
      }
      calculate_reorder_suggestions: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      calculate_stock_valuation: {
        Args: {
          p_item_code?: string
          p_valuation_method?: string
          p_as_of_date?: string
        }
        Returns: {
          item_code: string
          item_name: string
          category_name: string
          current_qty: number
          unit_cost: number
          total_value: number
          valuation_method: string
          last_transaction_date: string
          cost_layers: Json
        }[]
      }
      can_transition_to_stage: {
        Args: {
          p_uiorn: string
          p_target_status: Database["public"]["Enums"]["process_status"]
        }
        Returns: boolean
      }
      check_attendance_data_consistency: {
        Args: Record<PropertyKey, never>
        Returns: {
          employee_name: string
          attendance_date: string
          current_status: string
          hours_worked: number
          suggested_status: string
          reason: string
        }[]
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
      cleanup_duplicate_item_names: {
        Args: Record<PropertyKey, never>
        Returns: {
          duplicate_groups_found: number
          records_preserved: number
          records_deleted: number
        }[]
      }
      cleanup_stuck_jobs: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      correct_sunday_attendance: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      create_daily_intelligence_snapshot: {
        Args: {
          p_user_id: string
          p_organization_id: string
          p_category_analysis?: Json
          p_material_insights?: Json
          p_outliers?: Json
          p_correlations?: Json
          p_summary?: Json
        }
        Returns: string
      }
      create_manufacturing_order_with_artwork: {
        Args: { p_order_data: Json; p_selected_items: Json }
        Returns: Json
      }
      create_prompt_and_job: {
        Args: { p_user_id: string; p_prompt_data: Json; p_job_type?: string }
        Returns: {
          prompt_id: string
          job_id: string
        }[]
      }
      create_t3d_job: {
        Args:
          | {
              p_prompt_id: string
              p_user_id: string
              p_job_type?: string
              p_selected_model?: string
              p_selected_service?: string
              p_quality_level?: string
            }
          | {
              p_prompt_id: string
              p_user_id: string
              p_status: string
              p_progress: number
              p_job_type: string
              p_selected_model: string
              p_selected_service: string
              p_quality_level: string
            }
          | {
              p_prompt_id: string
              p_user_id: string
              p_status: string
              p_progress: number
              p_job_type: string
              p_selected_model?: string
              p_selected_service?: string
              p_quality_level?: string
            }
        Returns: string
      }
      create_t3d_prompt: {
        Args: { p_user_id: string; p_version: number; p_json: Json }
        Returns: Json
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
      detect_consumption_anomalies: {
        Args: { p_item_code?: string; p_threshold_factor?: number }
        Returns: {
          item_code: string
          item_name: string
          anomaly_date: string
          expected_consumption: number
          actual_consumption: number
          deviation_factor: number
          anomaly_type: string
        }[]
      }
      detect_material_outliers: {
        Args: { p_material_category: string; p_lookback_days?: number }
        Returns: Json
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
      evaluate_payroll_formula: {
        Args: {
          p_employee_id: string
          p_formula_type: string
          p_month: string
          p_custom_variables?: Json
        }
        Returns: Json
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
      export_employee_master_enhanced: {
        Args: Record<PropertyKey, never>
        Returns: {
          employee_code: string
          employee_name: string
          uan_number: string
          unit_code: string
          unit_name: string
          plant_location: string
          department_name: string
          joining_date: string
          date_of_birth: string
          years_of_service: number
          age_years: number
          base_salary: number
          active: boolean
        }[]
      }
      find_t3d_job_by_prediction: {
        Args: { p_prediction_id: string }
        Returns: {
          id: string
          status: string
          user_id: string
        }[]
      }
      generate_asset_code: {
        Args: { p_location_code: string; p_category_code: string }
        Returns: string
      }
      generate_category_recommendations: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      generate_dental_appointment_number: {
        Args: { practice_id: string }
        Returns: string
      }
      generate_dental_invoice_number: {
        Args: { practice_id: string }
        Returns: string
      }
      generate_dental_patient_number: {
        Args: { practice_id: string }
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
      generate_patient_number_rpc: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_po_number: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_predictive_insights: {
        Args: { p_prediction_type?: string; p_user_id?: string }
        Returns: {
          insight_type: string
          insight_message: string
          confidence_score: number
          metadata: Json
        }[]
      }
      generate_supplier_code: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_valuation_item_code: {
        Args: {
          p_category_name: string
          p_usage_type?: string
          p_qualifier?: string
          p_size_mm?: number
          p_gsm?: number
        }
        Returns: string
      }
      get_active_items_for_selection: {
        Args: Record<PropertyKey, never>
        Returns: {
          item_code: string
          item_name: string
          uom: string
          status: string
          usage_type: string
        }[]
      }
      get_advanced_manufacturing_analytics: {
        Args: { p_analysis_type?: string; p_user_id?: string }
        Returns: {
          total_items: number
          low_stock_items: number
          out_of_stock_items: number
          total_inventory_value: number
          average_stock_level: number
          stock_turnover_rate: number
          critical_reorder_items: number
          excess_stock_items: number
          analysis_timestamp: string
        }[]
      }
      get_artwork_items_for_selection: {
        Args: Record<PropertyKey, never>
        Returns: {
          item_code: string
          item_name: string
          customer_name: string
          no_of_colours: string
          dimensions: string
          file_hyperlink: string
          file_id: string
          usage_type: string
          uom: string
          status: string
        }[]
      }
      get_category_performance_metrics: {
        Args: { p_days?: number }
        Returns: {
          category_id: string
          category_name: string
          view_count: number
          item_additions: number
          search_frequency: number
          last_activity: string
          utilization_score: number
        }[]
      }
      get_current_user_practice_id: {
        Args: Record<PropertyKey, never>
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
      get_employee_csv_template: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          uan_number: string
          unit_code: string
          department_code: string
          joining_date: string
          date_of_birth: string
          base_salary: string
          hra_amount: string
          other_conv_amount: string
          pan_number: string
          aadhaar_number: string
          email: string
          preferred_language: string
        }[]
      }
      get_enhanced_manufacturing_context_for_ai: {
        Args: { p_user_id?: string }
        Returns: Json
      }
      get_gms_user_role: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_grn_price_suggestions: {
        Args: {
          p_item_code?: string
          p_days_lookback?: number
          p_min_transactions?: number
        }
        Returns: {
          item_code: string
          item_name: string
          suggested_price: number
          transaction_count: number
          price_variance: number
          min_price: number
          max_price: number
          last_grn_date: string
          confidence_level: string
          recommendation: Json
        }[]
      }
      get_item_pricing_hierarchy: {
        Args: {
          p_item_code: string
          p_valuation_method?: string
          p_days_lookback?: number
        }
        Returns: {
          item_code: string
          pricing_source: string
          unit_cost: number
          confidence_score: number
          last_updated: string
          pricing_details: Json
        }[]
      }
      get_manufacturing_context_for_ai: {
        Args: Record<PropertyKey, never> | { p_user_id: string }
        Returns: Json
      }
      get_mapping_statistics: {
        Args: Record<PropertyKey, never>
        Returns: {
          total_accounts: number
          mapped_accounts: number
          completion_percentage: number
        }[]
      }
      get_next_manufacturing_stage: {
        Args: {
          p_current_status: Database["public"]["Enums"]["process_status"]
        }
        Returns: Database["public"]["Enums"]["process_status"]
      }
      get_operational_cutoff_date: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_order_material_progress: {
        Args: { p_uiorn: string }
        Returns: Json
      }
      get_order_process_history: {
        Args: { p_uiorn: string }
        Returns: {
          id: string
          stage: string
          metric: string
          value: number
          txt_value: string
          captured_at: string
          captured_by: string
          customer_name: string
          product_description: string
        }[]
      }
      get_process_statistics: {
        Args: Record<PropertyKey, never>
        Returns: {
          stage: string
          total_entries: number
          latest_activity: string
          unique_orders: number
        }[]
      }
      get_reconciliation_status: {
        Args: { p_month: number; p_year: number; p_unit_id?: string }
        Returns: {
          reconciliation_id: string
          is_completed: boolean
          reconciliation_date: string
          reconciled_by: string
          total_employees: number
          employees_adjusted: number
          total_adjustments: number
          unit_name: string
          notes: string
        }[]
      }
      get_t3d_job_by_id: {
        Args: { p_job_id: string }
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
        }[]
      }
      get_t3d_jobs: {
        Args: { p_user_id: string }
        Returns: {
          id: string
          prompt_id: string
          user_id: string
          status: string
          progress: number
          result_url: string
          created_at: string
          updated_at: string
          selected_model: string
          selected_service: string
          quality_level: string
          job_type: string
          prompt_text: string
          prompt_data: Json
        }[]
      }
      get_t3d_prompt_by_id: {
        Args: { p_prompt_id: string }
        Returns: {
          id: string
          user_id: string
          space: string
          style: string
          space_type: string
          description: string
          color_scheme: string[]
          dimensions_mm: Json
          mood_keywords: string[]
          uploaded_refs: string[]
          prompt_json: Json
          created_at: string
          updated_at: string
        }[]
      }
      get_t3d_prompts: {
        Args: { p_user_id: string } | { prompt_ids: string[] }
        Returns: {
          id: string
          user_id: string
          space: string
          style: string
          space_type: string
          description: string
          color_scheme: string[]
          dimensions_mm: Json
          mood_keywords: string[]
          uploaded_refs: string[]
          prompt_json: Json
          created_at: string
          updated_at: string
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
      get_user_pending_approvals: {
        Args: { p_user_id: string }
        Returns: {
          id: string
          po_id: string
          approval_level: number
          approval_status: string
          approver_id: string
          approved_at: string
          comments: string
          created_at: string
          po_number: string
          total_amount: number
          delivery_date: string
          po_status: string
          po_approval_status: string
          po_created_at: string
          supplier_name: string
          supplier_code: string
        }[]
      }
      get_user_practice_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_valuation_analytics: {
        Args: { p_filters?: Json }
        Returns: Json
      }
      get_workflow_bottlenecks: {
        Args: Record<PropertyKey, never>
        Returns: {
          stage: string
          avg_processing_time: number
          pending_orders: number
          bottleneck_score: number
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
      handle_manufacturing_stage_transition: {
        Args: {
          p_uiorn: string
          p_new_status: Database["public"]["Enums"]["process_status"]
          p_user_id?: string
        }
        Returns: undefined
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
      identify_process_bottlenecks: {
        Args: { p_uiorn?: string }
        Returns: Json
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
      is_dental_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      is_sunday: {
        Args: { input_date: string }
        Returns: boolean
      }
      log_ai_intelligence_query: {
        Args:
          | {
              p_query_type: string
              p_analysis_type?: string
              p_execution_time_ms?: number
              p_result_count?: number
              p_insights?: Json
            }
          | {
              p_query_type: string
              p_query_context?: Json
              p_response_data?: Json
              p_execution_time_ms?: number
            }
        Returns: string
      }
      log_audit_event_pricing: {
        Args: {
          p_action: string
          p_entity_type: string
          p_entity_id?: string
          p_old_data?: Json
          p_new_data?: Json
          p_metadata?: Json
        }
        Returns: undefined
      }
      manage_category_lifecycle: {
        Args: {
          p_category_id: string
          p_action: string
          p_justification?: string
        }
        Returns: Json
      }
      map_documents_to_smeta: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      map_documents_to_smeta4: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      ml_demand_prediction: {
        Args: {
          p_item_code: string
          p_forecast_horizon?: number
          p_confidence_level?: number
        }
        Returns: {
          forecast_period: string
          algorithm: string
          predicted_demand: number
          confidence_interval_lower: number
          confidence_interval_upper: number
          model_accuracy: number
          feature_importance: Json
        }[]
      }
      next_uiorn: {
        Args: { p_date?: string }
        Returns: string
      }
      next_uiorn_by_date: {
        Args: { p_date?: string }
        Returns: string
      }
      optimize_inventory_levels: {
        Args: { p_category_id?: string; p_service_level?: number }
        Returns: {
          item_code: string
          item_name: string
          current_stock: number
          recommended_reorder_point: number
          recommended_max_stock: number
          economic_order_quantity: number
          total_cost_reduction: number
          implementation_priority: string
        }[]
      }
      parse_gdrive_filename: {
        Args: { filename: string }
        Returns: Json
      }
      pre_populate_d_kegl_master_items: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      process_bulk_price_update: {
        Args: { p_operation_id: string; p_price_data: Json }
        Returns: Json
      }
      process_issue_batch: {
        Args: { p_rows: Json }
        Returns: Json
      }
      process_po_approval: {
        Args: {
          p_po_id: string
          p_approver_id: string
          p_action: string
          p_comments?: string
        }
        Returns: Json
      }
      process_pricing_upload_batch: {
        Args: {
          p_upload_id: string
          p_records: Json
          p_auto_approve_threshold?: number
        }
        Returns: Json
      }
      process_queued_jobs: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      reconcile_monthly_leaves: {
        Args: { p_month: number; p_year: number; p_unit_id?: string }
        Returns: Json
      }
      record_reconciliation_completion: {
        Args: {
          p_month: number
          p_year: number
          p_unit_id: string
          p_total_employees: number
          p_employees_adjusted: number
          p_total_adjustments: number
          p_notes?: string
        }
        Returns: string
      }
      refresh_analytics_materialized_views: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      refresh_balance_sheet_view: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      refresh_category_stats: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      refresh_manufacturing_analytics: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      retry_job: {
        Args: { p_job_id: string; p_user_id: string }
        Returns: boolean
      }
      route_rework_material: {
        Args: {
          p_uiorn: string
          p_material_type: string
          p_quality_grade: string
          p_rework_quantity: number
          p_current_process: string
        }
        Returns: Json
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
      satguru_check_stock_thresholds: {
        Args: Record<PropertyKey, never>
        Returns: {
          item_code: string
          item_name: string
          current_qty: number
          reorder_level: number
          status: string
        }[]
      }
      satguru_generate_enhanced_item_code: {
        Args: {
          category_name: string
          usage_type?: string
          qualifier?: string
          size_mm?: string
          gsm?: number
        }
        Returns: string
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
      satguru_get_stock_movement_analysis: {
        Args: { p_item_code?: string; p_category_id?: string; p_days?: number }
        Returns: {
          item_code: string
          item_name: string
          opening_stock: number
          total_received: number
          total_issued: number
          closing_stock: number
          net_movement: number
          movement_percentage: number
        }[]
      }
      satguru_get_workflow_status_counts: {
        Args: { p_uiorn?: string }
        Returns: {
          process_name: string
          pending_count: number
          started_count: number
          in_progress_count: number
          completed_count: number
          on_hold_count: number
          cancelled_count: number
          total_count: number
        }[]
      }
      satguru_get_workflow_summary: {
        Args: { p_uiorn: string }
        Returns: {
          uiorn: string
          customer_name: string
          order_date: string
          delivery_date: string
          order_status: Database["public"]["Enums"]["process_status"]
          order_punching_status: Database["public"]["Enums"]["process_status"]
          gravure_printing_status: Database["public"]["Enums"]["process_status"]
          lamination_status: Database["public"]["Enums"]["process_status"]
          adhesive_coating_status: Database["public"]["Enums"]["process_status"]
          slitting_status: Database["public"]["Enums"]["process_status"]
          packaging_projects_status: Database["public"]["Enums"]["process_status"]
          material_selection_status: Database["public"]["Enums"]["process_status"]
          packaging_selection_status: Database["public"]["Enums"]["process_status"]
          artwork_upload_status: Database["public"]["Enums"]["process_status"]
          cost_estimate_status: Database["public"]["Enums"]["process_status"]
          overall_completion_percentage: number
        }[]
      }
      satguru_insert_manual_item: {
        Args: {
          p_item_code: string
          p_item_name: string
          p_category_name: string
          p_qualifier?: string
          p_gsm?: number
          p_size_mm?: string
          p_uom?: string
          p_usage_type?: string
          p_specifications?: string
        }
        Returns: string
      }
      satguru_log_analytics_query: {
        Args: {
          p_query_type: string
          p_filters?: Json
          p_execution_time_ms?: number
          p_result_count?: number
        }
        Returns: string
      }
      satguru_update_item_code: {
        Args: {
          p_old_item_code: string
          p_new_item_code: string
          p_reason?: string
        }
        Returns: boolean
      }
      satguru_validate_item_code_format: {
        Args: { p_item_code: string; p_usage_type: string }
        Returns: boolean
      }
      satguru_validate_manual_item_code: {
        Args: { p_item_code: string }
        Returns: boolean
      }
      satguru_validate_unique_item_code: {
        Args:
          | { p_item_code: string }
          | { p_item_code: string; p_exclude_id?: string }
        Returns: boolean
      }
      search_employees: {
        Args: {
          p_search_term?: string
          p_department_ids?: string[]
          p_unit_ids?: string[]
          p_min_years_service?: number
          p_max_years_service?: number
          p_plant_location?: string
        }
        Returns: {
          aadhaar_number: string | null
          active: boolean | null
          age_years: number | null
          base_salary: number | null
          created_at: string | null
          date_of_birth: string | null
          department_code: string | null
          department_name: string | null
          employee_code: string | null
          hra_amount: number | null
          id: string | null
          id_proof_file_path: string | null
          joining_date: string | null
          name: string | null
          other_conv_amount: number | null
          pan_number: string | null
          plant_location: string | null
          uan_number: string | null
          unit_code: string | null
          unit_name: string | null
          updated_at: string | null
          years_of_service: number | null
        }[]
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
      track_category_usage: {
        Args: { p_category_id: string; p_usage_type: string; p_metadata?: Json }
        Returns: undefined
      }
      update_attendance_from_csv: {
        Args: { rows: Json; update_reason: string }
        Returns: Json
      }
      update_cylinder_usage: {
        Args: {
          p_cylinder_code: string
          p_mileage_increment: number
          p_last_run?: string
        }
        Returns: undefined
      }
      update_formula_metrics: {
        Args: {
          p_formula_name: string
          p_execution_time_ms: number
          p_success?: boolean
        }
        Returns: undefined
      }
      update_item_price: {
        Args: { p_item_code: string; p_new_price: number; p_reason?: string }
        Returns: boolean
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
      update_t3d_job: {
        Args:
          | {
              p_job_id: string
              p_status: string
              p_progress?: number
              p_error_message?: string
              p_result_url?: string
              p_replicate_prediction_id?: string
            }
          | {
              p_job_id: string
              p_status: string
              p_progress?: number
              p_result_url?: string
              p_error_message?: string
            }
          | {
              p_job_id: string
              p_status?: string
              p_progress?: number
              p_result_url?: string
              p_error_message?: string
            }
        Returns: boolean
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
      upsert_satguru_cylinders_from_csv: {
        Args: { csv_data: Json }
        Returns: Json
      }
      urlencode: {
        Args: { data: Json } | { string: string } | { string: string }
        Returns: string
      }
      validate_category_data: {
        Args: {
          p_category_name: string
          p_category_code?: string
          p_parent_id?: string
        }
        Returns: Json
      }
      validate_employee_emails_csv: {
        Args: { rows: Json }
        Returns: Json
      }
      validate_issue_batch: {
        Args: { p_items: Json }
        Returns: {
          row_num: number
          item_code: string
          item_name: string
          available_qty: number
          requested_qty: number
          validation_status: string
          error_message: string
        }[]
      }
      validate_issue_batch_all: {
        Args: { p_items: Json }
        Returns: Json
      }
      validate_issue_batch_chunked: {
        Args: { p_items: Json; p_chunk_size?: number; p_chunk_index?: number }
        Returns: Json
      }
      validate_leave_consumption: {
        Args: {
          p_employee_id: string
          p_leave_type: Database["public"]["Enums"]["attendance_status"]
          p_leave_date: string
          p_days?: number
        }
        Returns: boolean
      }
      validate_material_type_compatibility: {
        Args: {
          p_from_process: string
          p_to_process: string
          p_material_type: string
        }
        Returns: boolean
      }
      validate_pricing_record: {
        Args: {
          p_item_code: string
          p_proposed_price: number
          p_effective_date?: string
          p_cost_category?: string
          p_supplier?: string
        }
        Returns: Json
      }
    }
    Enums: {
      approval_status: "PENDING" | "APPROVED" | "REJECTED" | "ESCALATED"
      asset_condition: "new" | "good" | "fair" | "poor"
      asset_status: "active" | "maintenance" | "retired" | "disposed"
      attendance_status:
        | "PRESENT"
        | "WEEKLY_OFF"
        | "CASUAL_LEAVE"
        | "EARNED_LEAVE"
        | "UNPAID_LEAVE"
      dental_appointment_status:
        | "scheduled"
        | "confirmed"
        | "in_progress"
        | "completed"
        | "cancelled"
        | "no_show"
      dental_appointment_type:
        | "consultation"
        | "cleaning"
        | "filling"
        | "extraction"
        | "root_canal"
        | "crown"
        | "implant"
        | "orthodontics"
        | "emergency"
      formula_type: "gross_salary" | "deductions" | "net_salary" | "allowances"
      material_type: "PAPER" | "PLASTIC" | "FOIL" | "LAMINATE" | "COMPOSITE"
      media_type: "audio" | "video"
      packaging_type: "POUCH" | "BAG" | "ROLL" | "SHEET" | "CUSTOM"
      payment_method:
        | "cash"
        | "credit_card"
        | "debit_card"
        | "check"
        | "insurance"
        | "bank_transfer"
      payment_status:
        | "pending"
        | "paid"
        | "partially_paid"
        | "cancelled"
        | "refunded"
      process_stage:
        | "PRINTING"
        | "LAMINATION"
        | "ADHESIVE_COATING"
        | "SLITTING"
        | "DISPATCH"
        | "GRAVURE_PRINTING"
      process_status:
        | "PENDING"
        | "STARTED"
        | "IN_PROGRESS"
        | "COMPLETED"
        | "ON_HOLD"
        | "CANCELLED"
        | "ARTWORK_UPLOAD"
        | "GRAVURE_PRINTING"
        | "LAMINATION_COATING"
        | "ADHESIVE_COATING"
        | "SLITTING_PACKING"
      purchase_order_priority:
        | "LOW"
        | "MEDIUM"
        | "HIGH"
        | "URGENT"
        | "EMERGENCY"
      purchase_order_status:
        | "DRAFT"
        | "SUBMITTED"
        | "APPROVED"
        | "ISSUED"
        | "PARTIALLY_RECEIVED"
        | "RECEIVED"
        | "CLOSED"
        | "CANCELLED"
      stage: "printing" | "lamination" | "adhesive" | "slitting" | "dispatch"
      transfer_status: "pending" | "approved" | "rejected" | "completed"
      treatment_status: "planned" | "in_progress" | "completed" | "cancelled"
      user_role:
        | "admin"
        | "dentist"
        | "hygienist"
        | "receptionist"
        | "assistant"
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
      approval_status: ["PENDING", "APPROVED", "REJECTED", "ESCALATED"],
      asset_condition: ["new", "good", "fair", "poor"],
      asset_status: ["active", "maintenance", "retired", "disposed"],
      attendance_status: [
        "PRESENT",
        "WEEKLY_OFF",
        "CASUAL_LEAVE",
        "EARNED_LEAVE",
        "UNPAID_LEAVE",
      ],
      dental_appointment_status: [
        "scheduled",
        "confirmed",
        "in_progress",
        "completed",
        "cancelled",
        "no_show",
      ],
      dental_appointment_type: [
        "consultation",
        "cleaning",
        "filling",
        "extraction",
        "root_canal",
        "crown",
        "implant",
        "orthodontics",
        "emergency",
      ],
      formula_type: ["gross_salary", "deductions", "net_salary", "allowances"],
      material_type: ["PAPER", "PLASTIC", "FOIL", "LAMINATE", "COMPOSITE"],
      media_type: ["audio", "video"],
      packaging_type: ["POUCH", "BAG", "ROLL", "SHEET", "CUSTOM"],
      payment_method: [
        "cash",
        "credit_card",
        "debit_card",
        "check",
        "insurance",
        "bank_transfer",
      ],
      payment_status: [
        "pending",
        "paid",
        "partially_paid",
        "cancelled",
        "refunded",
      ],
      process_stage: [
        "PRINTING",
        "LAMINATION",
        "ADHESIVE_COATING",
        "SLITTING",
        "DISPATCH",
        "GRAVURE_PRINTING",
      ],
      process_status: [
        "PENDING",
        "STARTED",
        "IN_PROGRESS",
        "COMPLETED",
        "ON_HOLD",
        "CANCELLED",
        "ARTWORK_UPLOAD",
        "GRAVURE_PRINTING",
        "LAMINATION_COATING",
        "ADHESIVE_COATING",
        "SLITTING_PACKING",
      ],
      purchase_order_priority: ["LOW", "MEDIUM", "HIGH", "URGENT", "EMERGENCY"],
      purchase_order_status: [
        "DRAFT",
        "SUBMITTED",
        "APPROVED",
        "ISSUED",
        "PARTIALLY_RECEIVED",
        "RECEIVED",
        "CLOSED",
        "CANCELLED",
      ],
      stage: ["printing", "lamination", "adhesive", "slitting", "dispatch"],
      transfer_status: ["pending", "approved", "rejected", "completed"],
      treatment_status: ["planned", "in_progress", "completed", "cancelled"],
      user_role: ["admin", "dentist", "hygienist", "receptionist", "assistant"],
      variable_type: ["fixed", "calculated", "employee_specific", "system"],
    },
  },
} as const
