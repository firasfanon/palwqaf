import { useState, useEffect } from 'react';
import { 
  WaqfLandsService, 
  CasesService, 
  DocumentsService, 
  AppointmentsService, 
  NewsService, 
  NotificationsService,
  UsersService,
  StatisticsService
} from '../services/database';

// Hook للأراضي الوقفية
export const useWaqfLands = (filters?: any) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await WaqfLandsService.getAll(filters);
      setData(result || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ في تحميل البيانات');
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [JSON.stringify(filters)]);

  const create = async (newData: any) => {
    try {
      const result = await WaqfLandsService.create(newData);
      await fetchData(); // إعادة تحميل البيانات
      return result;
    } catch (err) {
      throw err;
    }
  };

  const update = async (id: number, updateData: any) => {
    try {
      const result = await WaqfLandsService.update(id, updateData);
      await fetchData(); // إعادة تحميل البيانات
      return result;
    } catch (err) {
      throw err;
    }
  };

  const remove = async (id: number) => {
    try {
      await WaqfLandsService.delete(id);
      await fetchData(); // إعادة تحميل البيانات
    } catch (err) {
      throw err;
    }
  };

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    create,
    update,
    remove
  };
};

// Hook للقضايا
export const useCases = (filters?: any) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await CasesService.getAll(filters);
      setData(result || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ في تحميل البيانات');
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [JSON.stringify(filters)]);

  const create = async (newData: any) => {
    try {
      const result = await CasesService.create(newData);
      await fetchData();
      return result;
    } catch (err) {
      throw err;
    }
  };

  const update = async (id: number, updateData: any) => {
    try {
      const result = await CasesService.update(id, updateData);
      await fetchData();
      return result;
    } catch (err) {
      throw err;
    }
  };

  const addTimelineEntry = async (caseId: number, action: string, description: string, userId: number, userName: string) => {
    try {
      const result = await CasesService.addTimelineEntry(caseId, action, description, userId, userName);
      await fetchData();
      return result;
    } catch (err) {
      throw err;
    }
  };

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    create,
    update,
    addTimelineEntry
  };
};

// Hook للوثائق
export const useDocuments = (filters?: any) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await DocumentsService.getAll(filters);
      setData(result || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ في تحميل البيانات');
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [JSON.stringify(filters)]);

  const create = async (newData: any) => {
    try {
      const result = await DocumentsService.create(newData);
      await fetchData();
      return result;
    } catch (err) {
      throw err;
    }
  };

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    create
  };
};

// Hook للمواعيد
export const useAppointments = (filters?: any) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await AppointmentsService.getAll(filters);
      setData(result || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ في تحميل البيانات');
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [JSON.stringify(filters)]);

  const create = async (newData: any) => {
    try {
      const result = await AppointmentsService.create(newData);
      await fetchData();
      return result;
    } catch (err) {
      throw err;
    }
  };

  const update = async (id: number, updateData: any) => {
    try {
      const result = await AppointmentsService.update(id, updateData);
      await fetchData();
      return result;
    } catch (err) {
      throw err;
    }
  };

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    create,
    update
  };
};

// Hook للإحصائيات العامة
export const useDashboardStats = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const result = await StatisticsService.getDashboardStats();
      setStats(result);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ في تحميل الإحصائيات');
      setStats(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return {
    stats,
    loading,
    error,
    refetch: fetchStats
  };
};

// Hook للإشعارات
export const useNotifications = (userId: number) => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const [allNotifications, unreadNotifications] = await Promise.all([
        NotificationsService.getUserNotifications(userId),
        NotificationsService.getUserNotifications(userId, true)
      ]);
      
      setNotifications(allNotifications || []);
      setUnreadCount(unreadNotifications?.length || 0);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ في تحميل الإشعارات');
      setNotifications([]);
      setUnreadCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchNotifications();
    }
  }, [userId]);

  const markAsRead = async (id: number) => {
    try {
      await NotificationsService.markAsRead(id);
      await fetchNotifications();
    } catch (err) {
      throw err;
    }
  };

  const markAllAsRead = async () => {
    try {
      await NotificationsService.markAllAsRead(userId);
      await fetchNotifications();
    } catch (err) {
      throw err;
    }
  };

  return {
    notifications,
    unreadCount,
    loading,
    error,
    refetch: fetchNotifications,
    markAsRead,
    markAllAsRead
  };
};