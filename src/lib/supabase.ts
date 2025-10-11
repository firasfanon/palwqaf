import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// أنواع البيانات المطابقة لقاعدة البيانات
export interface Database {
  public: {
    Tables: {
      governorates: {
        Row: {
          id: string;
          name_ar: string;
          name_en: string;
          code: string;
          region: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name_ar: string;
          name_en: string;
          code: string;
          region: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name_ar?: string;
          name_en?: string;
          code?: string;
          region?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      users: {
        Row: {
          id: number;
          email: string;
          name: string;
          role: string;
          department: string;
          governorate: string | null;
          phone: string | null;
          avatar_url: string | null;
          is_active: boolean;
          last_login: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          email: string;
          name: string;
          role?: string;
          department: string;
          governorate?: string | null;
          phone?: string | null;
          avatar_url?: string | null;
          is_active?: boolean;
          last_login?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          email?: string;
          name?: string;
          role?: string;
          department?: string;
          governorate?: string | null;
          phone?: string | null;
          avatar_url?: string | null;
          is_active?: boolean;
          last_login?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      waqf_lands: {
        Row: {
          id: number;
          name: string;
          description: string | null;
          area: number;
          location: any;
          boundaries: any;
          type: string;
          status: string;
          value: number;
          monthly_income: number;
          monthly_expenses: number;
          manager_name: string | null;
          manager_id: number | null;
          governorate: string | null;
          establishment_date: string | null;
          historical_period: string | null;
          founder: string | null;
          management_type: string;
          maintenance_status: string;
          last_inspection: string | null;
          next_inspection: string | null;
          national_registry_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          name: string;
          description?: string | null;
          area?: number;
          location?: any;
          boundaries?: any;
          type?: string;
          status?: string;
          value?: number;
          monthly_income?: number;
          monthly_expenses?: number;
          manager_name?: string | null;
          manager_id?: number | null;
          governorate?: string | null;
          establishment_date?: string | null;
          historical_period?: string | null;
          founder?: string | null;
          management_type?: string;
          maintenance_status?: string;
          last_inspection?: string | null;
          next_inspection?: string | null;
          national_registry_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          name?: string;
          description?: string | null;
          area?: number;
          location?: any;
          boundaries?: any;
          type?: string;
          status?: string;
          value?: number;
          monthly_income?: number;
          monthly_expenses?: number;
          manager_name?: string | null;
          manager_id?: number | null;
          governorate?: string | null;
          establishment_date?: string | null;
          historical_period?: string | null;
          founder?: string | null;
          management_type?: string;
          maintenance_status?: string;
          last_inspection?: string | null;
          next_inspection?: string | null;
          national_registry_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      cases: {
        Row: {
          id: number;
          title: string;
          description: string | null;
          type: string;
          status: string;
          priority: string;
          waqf_land_id: number | null;
          assigned_to: number | null;
          created_by: number | null;
          due_date: string | null;
          resolved_date: string | null;
          resolution_notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          title: string;
          description?: string | null;
          type?: string;
          status?: string;
          priority?: string;
          waqf_land_id?: number | null;
          assigned_to?: number | null;
          created_by?: number | null;
          due_date?: string | null;
          resolved_date?: string | null;
          resolution_notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          title?: string;
          description?: string | null;
          type?: string;
          status?: string;
          priority?: string;
          waqf_land_id?: number | null;
          assigned_to?: number | null;
          created_by?: number | null;
          due_date?: string | null;
          resolved_date?: string | null;
          resolution_notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      documents: {
        Row: {
          id: number;
          name: string;
          type: string;
          size_mb: number;
          url: string;
          content: string | null;
          tags: string[];
          category: string;
          related_to_type: string | null;
          related_to_id: number | null;
          uploaded_by: number | null;
          access_level: string;
          is_archived: boolean;
          download_count: number;
          view_count: number;
          uploaded_at: string;
          last_modified: string;
        };
        Insert: {
          id?: number;
          name: string;
          type?: string;
          size_mb?: number;
          url: string;
          content?: string | null;
          tags?: string[];
          category?: string;
          related_to_type?: string | null;
          related_to_id?: number | null;
          uploaded_by?: number | null;
          access_level?: string;
          is_archived?: boolean;
          download_count?: number;
          view_count?: number;
          uploaded_at?: string;
          last_modified?: string;
        };
        Update: {
          id?: number;
          name?: string;
          type?: string;
          size_mb?: number;
          url?: string;
          content?: string | null;
          tags?: string[];
          category?: string;
          related_to_type?: string | null;
          related_to_id?: number | null;
          uploaded_by?: number | null;
          access_level?: string;
          is_archived?: boolean;
          download_count?: number;
          view_count?: number;
          uploaded_at?: string;
          last_modified?: string;
        };
      };
      news: {
        Row: {
          id: number;
          title: string;
          excerpt: string | null;
          content: string | null;
          image_url: string | null;
          author: string;
          category: string;
          status: string;
          view_count: number;
          is_featured: boolean;
          tags: string[];
          published_at: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          title: string;
          excerpt?: string | null;
          content?: string | null;
          image_url?: string | null;
          author: string;
          category?: string;
          status?: string;
          view_count?: number;
          is_featured?: boolean;
          tags?: string[];
          published_at?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          title?: string;
          excerpt?: string | null;
          content?: string | null;
          image_url?: string | null;
          author?: string;
          category?: string;
          status?: string;
          view_count?: number;
          is_featured?: boolean;
          tags?: string[];
          published_at?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      appointments: {
        Row: {
          id: number;
          title: string;
          description: string | null;
          type: string;
          start_time: string;
          end_time: string;
          location: string;
          meeting_type: string;
          attendees: any;
          related_case_id: number | null;
          related_waqf_id: number | null;
          status: string;
          priority: string;
          created_by: number | null;
          documents: any;
          reminders: any;
          created_at: string;
        };
        Insert: {
          id?: number;
          title: string;
          description?: string | null;
          type?: string;
          start_time: string;
          end_time: string;
          location: string;
          meeting_type?: string;
          attendees?: any;
          related_case_id?: number | null;
          related_waqf_id?: number | null;
          status?: string;
          priority?: string;
          created_by?: number | null;
          documents?: any;
          reminders?: any;
          created_at?: string;
        };
        Update: {
          id?: number;
          title?: string;
          description?: string | null;
          type?: string;
          start_time?: string;
          end_time?: string;
          location?: string;
          meeting_type?: string;
          attendees?: any;
          related_case_id?: number | null;
          related_waqf_id?: number | null;
          status?: string;
          priority?: string;
          created_by?: number | null;
          documents?: any;
          reminders?: any;
          created_at?: string;
        };
      };
      notifications: {
        Row: {
          id: number;
          title: string;
          message: string;
          type: string;
          priority: string;
          user_id: number;
          is_read: boolean;
          related_to_type: string | null;
          related_to_id: number | null;
          sender: string;
          created_at: string;
        };
        Insert: {
          id?: number;
          title: string;
          message: string;
          type?: string;
          priority?: string;
          user_id: number;
          is_read?: boolean;
          related_to_type?: string | null;
          related_to_id?: number | null;
          sender?: string;
          created_at?: string;
        };
        Update: {
          id?: number;
          title?: string;
          message?: string;
          type?: string;
          priority?: string;
          user_id?: number;
          is_read?: boolean;
          related_to_type?: string | null;
          related_to_id?: number | null;
          sender?: string;
          created_at?: string;
        };
      };
    };
    Functions: {
      increment_news_views: {
        Args: { news_id: number };
        Returns: void;
      };
      increment_document_views: {
        Args: { document_id: number };
        Returns: void;
      };
      increment_document_downloads: {
        Args: { document_id: number };
        Returns: void;
      };
      search_all_content: {
        Args: { search_query: string };
        Returns: Array<{
          id: number;
          title: string;
          content: string;
          type: string;
          relevance: number;
        }>;
      };
      get_dashboard_stats: {
        Args: {};
        Returns: any;
      };
      get_financial_summary: {
        Args: { start_date?: string; end_date?: string };
        Returns: any;
      };
    };
  };
}