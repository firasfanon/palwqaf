import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface Setting {
  id: string;
  category: string;
  key: string;
  value: any;
  data_type: string;
  is_public: boolean;
}

interface Settings {
  [key: string]: any;
}

export const useSettings = () => {
  const [settings, setSettings] = useState<Settings>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const parseValue = (value: any, dataType: string) => {
    if (value === null || value === undefined) {
      return dataType === 'boolean' ? false : '';
    }

    if (dataType === 'boolean') {
      if (typeof value === 'boolean') return value;
      if (typeof value === 'string') {
        if (value === 'true') return true;
        if (value === 'false') return false;
        try {
          return JSON.parse(value) === true;
        } catch {
          return false;
        }
      }
      return Boolean(value);
    }

    try {
      if (typeof value === 'string') {
        const parsed = JSON.parse(value);
        return parsed;
      }
      return value;
    } catch {
      return value;
    }
  };

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('system_settings')
        .select('*')
        .eq('is_public', true);

      if (fetchError) throw fetchError;

      const settingsMap: Settings = {};
      data?.forEach((setting: Setting) => {
        settingsMap[setting.key] = parseValue(setting.value, setting.data_type);
      });

      setSettings(settingsMap);
      setError(null);
    } catch (err) {
      console.error('Error fetching settings:', err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();

    // Subscribe to realtime changes
    const channel = supabase
      .channel('settings-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'system_settings',
          filter: 'is_public=eq.true'
        },
        () => {
          fetchSettings();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const getSetting = (key: string, defaultValue: any = null) => {
    return settings[key] !== undefined ? settings[key] : defaultValue;
  };

  const getSettingBoolean = (key: string, defaultValue: boolean = false): boolean => {
    const value = getSetting(key, defaultValue);
    if (typeof value === 'boolean') return value;
    if (typeof value === 'string') return value === 'true';
    return Boolean(value);
  };

  const getSettingString = (key: string, defaultValue: string = ''): string => {
    const value = getSetting(key, defaultValue);
    return String(value);
  };

  const getSettingNumber = (key: string, defaultValue: number = 0): number => {
    const value = getSetting(key, defaultValue);
    return Number(value) || defaultValue;
  };

  return {
    settings,
    loading,
    error,
    getSetting,
    getSettingBoolean,
    getSettingString,
    getSettingNumber,
    refresh: fetchSettings
  };
};
