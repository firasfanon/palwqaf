import { supabase } from '../lib/supabase';
import type { Database } from '../lib/supabase';

// خدمات قاعدة البيانات للأراضي الوقفية
export class WaqfLandsService {
  static async getAll(filters?: {
    governorate?: string;
    type?: string;
    status?: string;
    search?: string;
  }) {
    let query = supabase
      .from('waqf_lands')
      .select(`
        *,
        manager:users(name, email),
        governorate_info:governorates(name_ar, name_en)
      `);

    if (filters?.governorate && filters.governorate !== 'all') {
      query = query.eq('governorate', filters.governorate);
    }

    if (filters?.type && filters.type !== 'all') {
      query = query.eq('type', filters.type);
    }

    if (filters?.status && filters.status !== 'all') {
      query = query.eq('status', filters.status);
    }

    if (filters?.search) {
      query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  static async getById(id: number) {
    const { data, error } = await supabase
      .from('waqf_lands')
      .select(`
        *,
        manager:users(name, email, phone),
        governorate_info:governorates(name_ar, name_en),
        cases:cases(id, title, status, priority),
        documents:documents(id, name, type, category)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  static async create(data: Database['public']['Tables']['waqf_lands']['Insert']) {
    const { data: result, error } = await supabase
      .from('waqf_lands')
      .insert(data)
      .select()
      .single();

    if (error) throw error;
    return result;
  }

  static async update(id: number, data: Database['public']['Tables']['waqf_lands']['Update']) {
    const { data: result, error } = await supabase
      .from('waqf_lands')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return result;
  }

  static async delete(id: number) {
    const { error } = await supabase
      .from('waqf_lands')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  static async getStatistics() {
    const { data, error } = await supabase
      .from('waqf_lands')
      .select('type, status, value, monthly_income, monthly_expenses, governorate');

    if (error) throw error;

    const stats = {
      total: data.length,
      totalValue: data.reduce((sum, land) => sum + (land.value || 0), 0),
      totalIncome: data.reduce((sum, land) => sum + (land.monthly_income || 0), 0),
      totalExpenses: data.reduce((sum, land) => sum + (land.monthly_expenses || 0), 0),
      byType: {} as Record<string, number>,
      byStatus: {} as Record<string, number>,
      byGovernorate: {} as Record<string, number>
    };

    data.forEach(land => {
      stats.byType[land.type] = (stats.byType[land.type] || 0) + 1;
      stats.byStatus[land.status] = (stats.byStatus[land.status] || 0) + 1;
      if (land.governorate) {
        stats.byGovernorate[land.governorate] = (stats.byGovernorate[land.governorate] || 0) + 1;
      }
    });

    return stats;
  }
}

// خدمات قاعدة البيانات للقضايا
export class CasesService {
  static async getAll(filters?: {
    status?: string;
    type?: string;
    assignedTo?: number;
    search?: string;
  }) {
    let query = supabase
      .from('cases')
      .select(`
        *,
        waqf_land:waqf_lands(name, governorate),
        assigned_user:users!assigned_to(name, email),
        created_user:users!created_by(name, email),
        timeline:case_timeline(id, action, timestamp)
      `);

    if (filters?.status && filters.status !== 'all') {
      query = query.eq('status', filters.status);
    }

    if (filters?.type && filters.type !== 'all') {
      query = query.eq('type', filters.type);
    }

    if (filters?.assignedTo) {
      query = query.eq('assigned_to', filters.assignedTo);
    }

    if (filters?.search) {
      query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  static async getById(id: number) {
    const { data, error } = await supabase
      .from('cases')
      .select(`
        *,
        waqf_land:waqf_lands(name, location, governorate),
        assigned_user:users!assigned_to(name, email, phone),
        created_user:users!created_by(name, email),
        timeline:case_timeline(*, user:users(name)),
        documents:documents(id, name, type, uploaded_at)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  static async create(data: Database['public']['Tables']['cases']['Insert']) {
    const { data: result, error } = await supabase
      .from('cases')
      .insert(data)
      .select()
      .single();

    if (error) throw error;

    // إضافة إدخال في تاريخ القضية
    await supabase
      .from('case_timeline')
      .insert({
        case_id: result.id,
        action: 'إنشاء القضية',
        description: 'تم إنشاء القضية',
        user_id: data.created_by,
        user_name: 'المستخدم'
      });

    return result;
  }

  static async update(id: number, data: Database['public']['Tables']['cases']['Update']) {
    const { data: result, error } = await supabase
      .from('cases')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return result;
  }

  static async addTimelineEntry(caseId: number, action: string, description: string, userId: number, userName: string) {
    const { data, error } = await supabase
      .from('case_timeline')
      .insert({
        case_id: caseId,
        action,
        description,
        user_id: userId,
        user_name: userName
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}

// خدمات قاعدة البيانات للوثائق
export class DocumentsService {
  static async getAll(filters?: {
    category?: string;
    type?: string;
    accessLevel?: string;
    search?: string;
  }) {
    let query = supabase
      .from('documents')
      .select(`
        *,
        uploader:users(name, email)
      `);

    if (filters?.category && filters.category !== 'all') {
      query = query.eq('category', filters.category);
    }

    if (filters?.type && filters.type !== 'all') {
      query = query.eq('type', filters.type);
    }

    if (filters?.accessLevel && filters.accessLevel !== 'all') {
      query = query.eq('access_level', filters.accessLevel);
    }

    if (filters?.search) {
      query = query.or(`name.ilike.%${filters.search}%,content.ilike.%${filters.search}%,tags.cs.{${filters.search}}`);
    }

    const { data, error } = await query.order('uploaded_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  static async getById(id: number) {
    const { data, error } = await supabase
      .from('documents')
      .select(`
        *,
        uploader:users(name, email)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  static async create(data: Database['public']['Tables']['documents']['Insert']) {
    const { data: result, error } = await supabase
      .from('documents')
      .insert(data)
      .select()
      .single();

    if (error) throw error;
    return result;
  }

  static async incrementViewCount(id: number) {
    const { error } = await supabase
      .rpc('increment_document_views', { document_id: id });

    if (error) throw error;
  }

  static async incrementDownloadCount(id: number) {
    const { error } = await supabase
      .rpc('increment_document_downloads', { document_id: id });

    if (error) throw error;
  }
}

// خدمات قاعدة البيانات للمواعيد
export class AppointmentsService {
  static async getAll(filters?: {
    type?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
  }) {
    let query = supabase
      .from('appointments')
      .select(`
        *,
        creator:users(name, email),
        related_case:cases(title),
        related_waqf:waqf_lands(name)
      `);

    if (filters?.type && filters.type !== 'all') {
      query = query.eq('type', filters.type);
    }

    if (filters?.status && filters.status !== 'all') {
      query = query.eq('status', filters.status);
    }

    if (filters?.startDate) {
      query = query.gte('start_time', filters.startDate);
    }

    if (filters?.endDate) {
      query = query.lte('start_time', filters.endDate);
    }

    const { data, error } = await query.order('start_time', { ascending: true });

    if (error) throw error;
    return data;
  }

  static async create(data: Database['public']['Tables']['appointments']['Insert']) {
    const { data: result, error } = await supabase
      .from('appointments')
      .insert(data)
      .select()
      .single();

    if (error) throw error;
    return result;
  }

  static async update(id: number, data: Database['public']['Tables']['appointments']['Update']) {
    const { data: result, error } = await supabase
      .from('appointments')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return result;
  }
}

// خدمات قاعدة البيانات للأخبار
export class NewsService {
  static async getAll(filters?: {
    category?: string;
    status?: string;
    search?: string;
  }) {
    let query = supabase
      .from('news')
      .select('*');

    if (filters?.category && filters.category !== 'all') {
      query = query.eq('category', filters.category);
    }

    if (filters?.status && filters.status !== 'all') {
      query = query.eq('status', filters.status);
    }

    if (filters?.search) {
      query = query.or(`title.ilike.%${filters.search}%,excerpt.ilike.%${filters.search}%,content.ilike.%${filters.search}%`);
    }

    const { data, error } = await query.order('published_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  static async getById(id: number) {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  static async create(data: Database['public']['Tables']['news']['Insert']) {
    const { data: result, error } = await supabase
      .from('news')
      .insert(data)
      .select()
      .single();

    if (error) throw error;
    return result;
  }

  static async incrementViewCount(id: number) {
    const { error } = await supabase
      .rpc('increment_news_views', { news_id: id });

    if (error) throw error;
  }
}

// خدمات قاعدة البيانات للإشعارات
export class NotificationsService {
  static async getUserNotifications(userId: number, unreadOnly: boolean = false) {
    let query = supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId);

    if (unreadOnly) {
      query = query.eq('is_read', false);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  static async markAsRead(id: number) {
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', id);

    if (error) throw error;
  }

  static async markAllAsRead(userId: number) {
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('user_id', userId)
      .eq('is_read', false);

    if (error) throw error;
  }

  static async create(data: {
    title: string;
    message: string;
    type: string;
    user_id: number;
    related_to_type?: string;
    related_to_id?: number;
    sender?: string;
  }) {
    const { data: result, error } = await supabase
      .from('notifications')
      .insert(data)
      .select()
      .single();

    if (error) throw error;
    return result;
  }
}

// خدمات قاعدة البيانات للمستخدمين
export class UsersService {
  static async getAll(filters?: {
    role?: string;
    governorate?: string;
    isActive?: boolean;
    search?: string;
  }) {
    let query = supabase
      .from('users')
      .select(`
        *,
        governorate_info:governorates(name_ar, name_en),
        permissions:user_permissions(module, permissions, governorate_restricted, allowed_governorates)
      `);

    if (filters?.role && filters.role !== 'all') {
      query = query.eq('role', filters.role);
    }

    if (filters?.governorate && filters.governorate !== 'all') {
      query = query.eq('governorate', filters.governorate);
    }

    if (filters?.isActive !== undefined) {
      query = query.eq('is_active', filters.isActive);
    }

    if (filters?.search) {
      query = query.or(`name.ilike.%${filters.search}%,email.ilike.%${filters.search}%,department.ilike.%${filters.search}%`);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  static async getById(id: number) {
    const { data, error } = await supabase
      .from('users')
      .select(`
        *,
        governorate_info:governorates(name_ar, name_en),
        permissions:user_permissions(module, permissions, governorate_restricted, allowed_governorates)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  static async updatePermissions(userId: number, permissions: Array<{
    module: string;
    permissions: string[];
    governorate_restricted: boolean;
    allowed_governorates: string[];
  }>) {
    // حذف الصلاحيات الحالية
    await supabase
      .from('user_permissions')
      .delete()
      .eq('user_id', userId);

    // إضافة الصلاحيات الجديدة
    const { data, error } = await supabase
      .from('user_permissions')
      .insert(permissions.map(p => ({ ...p, user_id: userId })))
      .select();

    if (error) throw error;
    return data;
  }
}

// خدمات عامة للإحصائيات
export class StatisticsService {
  static async getDashboardStats() {
    const { data, error } = await supabase
      .rpc('get_dashboard_stats');
    
    if (error) throw error;
    return data;
  }

  static async getDashboardStatsByGovernorate(governorate: string) {
    const { data, error } = await supabase
      .rpc('get_dashboard_stats_by_governorate', { user_governorate: governorate });
    
    if (error) throw error;
    return data;
  }

  static async getFinancialSummary(startDate?: string, endDate?: string) {
    const { data, error } = await supabase.rpc('get_financial_summary', {
      start_date: startDate,
      end_date: endDate
    });
    if (error) throw error;
    return data;
  }

  static async searchAllContent(query: string) {
    const { data, error } = await supabase.rpc('search_all_content', {
      search_query: query
    });
    if (error) throw error;
    return data;
  }
}