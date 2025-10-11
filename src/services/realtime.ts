import { supabase } from '../lib/supabase';
import { RealtimeChannel } from '@supabase/supabase-js';

export class RealtimeService {
  private channels: Map<string, RealtimeChannel> = new Map();

  // الاشتراك في تحديثات الأخبار
  subscribeToNews(callback: (payload: any) => void) {
    const channel = supabase
      .channel('news_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'news'
        },
        callback
      )
      .subscribe();

    this.channels.set('news', channel);
    return () => this.unsubscribe('news');
  }

  // الاشتراك في تحديثات الأراضي الوقفية
  subscribeToWaqfLands(callback: (payload: any) => void) {
    const channel = supabase
      .channel('waqf_lands_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'waqf_lands'
        },
        callback
      )
      .subscribe();

    this.channels.set('waqf_lands', channel);
    return () => this.unsubscribe('waqf_lands');
  }

  // الاشتراك في تحديثات القضايا
  subscribeToCases(callback: (payload: any) => void) {
    const channel = supabase
      .channel('cases_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'cases'
        },
        callback
      )
      .subscribe();

    this.channels.set('cases', channel);
    return () => this.unsubscribe('cases');
  }

  // الاشتراك في تحديثات الإشعارات
  subscribeToNotifications(userId: string, callback: (payload: any) => void) {
    const channel = supabase
      .channel(`notifications_${userId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${userId}`
        },
        callback
      )
      .subscribe();

    this.channels.set(`notifications_${userId}`, channel);
    return () => this.unsubscribe(`notifications_${userId}`);
  }

  // إلغاء الاشتراك
  unsubscribe(channelName: string) {
    const channel = this.channels.get(channelName);
    if (channel) {
      supabase.removeChannel(channel);
      this.channels.delete(channelName);
    }
  }

  // إلغاء جميع الاشتراكات
  unsubscribeAll() {
    this.channels.forEach((channel, name) => {
      supabase.removeChannel(channel);
    });
    this.channels.clear();
  }

  // إرسال إشعار مباشر
  async sendRealtimeNotification(channel: string, event: string, payload: any) {
    const channelInstance = supabase.channel(channel);
    await channelInstance.send({
      type: 'broadcast',
      event,
      payload
    });
  }

  // مراقبة حالة الاتصال
  onConnectionStateChange(callback: (state: string) => void) {
    supabase.realtime.onOpen(() => callback('connected'));
    supabase.realtime.onClose(() => callback('disconnected'));
    supabase.realtime.onError(() => callback('error'));
  }
}

export const realtimeService = new RealtimeService();