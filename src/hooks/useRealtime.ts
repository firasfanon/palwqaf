import { useEffect, useRef } from 'react';
import { realtimeService } from '../services/realtime';
import { useToast } from './useToast';

export const useRealtimeNews = (onUpdate?: (payload: any) => void) => {
  const { toast } = useToast();
  const unsubscribeRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    unsubscribeRef.current = realtimeService.subscribeToNews((payload) => {
      const { eventType, new: newRecord, old: oldRecord } = payload;
      
      switch (eventType) {
        case 'INSERT':
          toast.success('تم إضافة خبر جديد');
          break;
        case 'UPDATE':
          toast.info('تم تحديث خبر');
          break;
        case 'DELETE':
          toast.warning('تم حذف خبر');
          break;
      }

      onUpdate?.(payload);
    });

    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
  }, [onUpdate, toast]);
};

export const useRealtimeWaqfLands = (onUpdate?: (payload: any) => void) => {
  const { toast } = useToast();
  const unsubscribeRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    unsubscribeRef.current = realtimeService.subscribeToWaqfLands((payload) => {
      const { eventType, new: newRecord } = payload;
      
      switch (eventType) {
        case 'INSERT':
          toast.success('تم إضافة أرض وقفية جديدة');
          break;
        case 'UPDATE':
          toast.info('تم تحديث بيانات أرض وقفية');
          break;
        case 'DELETE':
          toast.warning('تم حذف أرض وقفية');
          break;
      }

      onUpdate?.(payload);
    });

    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
  }, [onUpdate, toast]);
};

export const useRealtimeCases = (onUpdate?: (payload: any) => void) => {
  const { toast } = useToast();
  const unsubscribeRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    unsubscribeRef.current = realtimeService.subscribeToCases((payload) => {
      const { eventType, new: newRecord } = payload;
      
      switch (eventType) {
        case 'INSERT':
          toast.info('تم إنشاء قضية جديدة');
          break;
        case 'UPDATE':
          if (newRecord.status === 'resolved') {
            toast.success('تم حل قضية');
          } else {
            toast.info('تم تحديث قضية');
          }
          break;
      }

      onUpdate?.(payload);
    });

    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
  }, [onUpdate, toast]);
};

export const useRealtimeNotifications = (userId: string, onNotification?: (payload: any) => void) => {
  const { toast } = useToast();
  const unsubscribeRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!userId) return;

    unsubscribeRef.current = realtimeService.subscribeToNotifications(userId, (payload) => {
      const { new: notification } = payload;
      
      // عرض الإشعار كـ toast
      switch (notification.type) {
        case 'urgent':
          toast.error(notification.title, { duration: 10000 });
          break;
        case 'important':
          toast.warning(notification.title, { duration: 7000 });
          break;
        default:
          toast.info(notification.title);
      }

      onNotification?.(payload);
    });

    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
  }, [userId, onNotification, toast]);
};

export const useConnectionStatus = () => {
  const [status, setStatus] = useState<'connected' | 'disconnected' | 'error'>('connected');

  useEffect(() => {
    realtimeService.onConnectionStateChange(setStatus);
  }, []);

  return status;
};