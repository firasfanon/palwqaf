import React, { useState, useEffect } from 'react';
import {
  Settings,
  Save,
  RefreshCw,
  Shield,
  Globe,
  Bell,
  Database,
  Phone,
  Languages,
  Palette,
  MapPin,
  BarChart3,
  Zap,
  Network,
  Loader,
  CheckCircle,
  AlertCircle,
  Download,
  Upload,
  Eye,
  EyeOff
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useToast } from '../../hooks/useToast';

interface Setting {
  id: string;
  category: string;
  key: string;
  value: any;
  data_type: string;
  label_ar: string;
  label_en: string | null;
  description_ar: string | null;
  description_en: string | null;
  is_public: boolean;
  is_editable: boolean;
  updated_at: string;
}

interface GroupedSettings {
  [category: string]: Setting[];
}

const GeneralSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState<GroupedSettings>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [showPasswords, setShowPasswords] = useState<{ [key: string]: boolean }>({});
  const { showToast } = useToast();

  const tabs = [
    { id: 'general', name: 'الإعدادات العامة', icon: Settings, color: 'text-green-600' },
    { id: 'contact', name: 'معلومات التواصل', icon: Phone, color: 'text-blue-600' },
    { id: 'social', name: 'وسائل التواصل', icon: Globe, color: 'text-cyan-600' },
    { id: 'localization', name: 'اللغة والمنطقة', icon: Languages, color: 'text-purple-600' },
    { id: 'security', name: 'الأمان والحماية', icon: Shield, color: 'text-red-600' },
    { id: 'notifications', name: 'الإشعارات', icon: Bell, color: 'text-orange-600' },
    { id: 'system', name: 'إعدادات النظام', icon: Database, color: 'text-teal-600' },
    { id: 'appearance', name: 'المظهر', icon: Palette, color: 'text-pink-600' },
    { id: 'maps', name: 'الخرائط', icon: MapPin, color: 'text-indigo-600' },
    { id: 'reports', name: 'التقارير', icon: BarChart3, color: 'text-amber-600' },
    { id: 'performance', name: 'الأداء', icon: Zap, color: 'text-yellow-600' },
    { id: 'integrations', name: 'التكامل', icon: Network, color: 'text-gray-600' },
    { id: 'maintenance', name: 'الصيانة', icon: RefreshCw, color: 'text-emerald-600' }
  ];

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('system_settings')
        .select('*')
        .order('category, key');

      if (error) throw error;

      const grouped: GroupedSettings = {};
      data?.forEach((setting: Setting) => {
        if (!grouped[setting.category]) {
          grouped[setting.category] = [];
        }
        grouped[setting.category].push(setting);
      });

      setSettings(grouped);
    } catch (error: any) {
      showToast('خطأ في تحميل الإعدادات', 'error');
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const parseValue = (value: any, dataType: string) => {
    if (typeof value === 'string') {
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    }
    return value;
  };

  const handleSettingChange = (category: string, key: string, newValue: any, dataType: string) => {
    setSettings(prev => {
      const updated = { ...prev };
      const categorySettings = [...(updated[category] || [])];
      const settingIndex = categorySettings.findIndex(s => s.key === key);

      if (settingIndex !== -1) {
        categorySettings[settingIndex] = {
          ...categorySettings[settingIndex],
          value: dataType === 'json' || dataType === 'array' ? newValue : JSON.stringify(newValue)
        };
        updated[category] = categorySettings;
      }

      return updated;
    });
    setHasChanges(true);
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      const allSettings = Object.values(settings).flat();
      const updates = allSettings.map(setting => ({
        id: setting.id,
        value: setting.value,
        updated_at: new Date().toISOString()
      }));

      for (const update of updates) {
        const { error } = await supabase
          .from('system_settings')
          .update({ value: update.value })
          .eq('id', update.id);

        if (error) throw error;
      }

      setHasChanges(false);
      showToast('تم حفظ الإعدادات بنجاح', 'success');
      await fetchSettings();
    } catch (error: any) {
      showToast('خطأ في حفظ الإعدادات', 'error');
      console.error('Error saving settings:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    if (window.confirm('هل أنت متأكد من إعادة تحميل الإعدادات من قاعدة البيانات؟')) {
      setHasChanges(false);
      await fetchSettings();
      showToast('تم إعادة تحميل الإعدادات', 'info');
    }
  };

  const handleExport = () => {
    const exportData = Object.entries(settings).reduce((acc, [category, categorySettings]) => {
      acc[category] = categorySettings.reduce((catAcc, setting) => {
        catAcc[setting.key] = parseValue(setting.value, setting.data_type);
        return catAcc;
      }, {} as any);
      return acc;
    }, {} as any);

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `settings-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    showToast('تم تصدير الإعدادات', 'success');
  };

  const renderSettingInput = (setting: Setting) => {
    const value = parseValue(setting.value, setting.data_type);
    const { category, key, data_type, is_editable } = setting;

    if (!is_editable) {
      return (
        <div className="text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded">
          {String(value)}
        </div>
      );
    }

    switch (data_type) {
      case 'boolean':
        return (
          <label className="flex items-center cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                checked={value === true}
                onChange={(e) => handleSettingChange(category, key, e.target.checked, data_type)}
                className="sr-only"
              />
              <div className={`w-10 h-6 rounded-full shadow-inner transition ${
                value ? 'bg-green-600' : 'bg-gray-300'
              }`}></div>
              <div className={`absolute w-4 h-4 bg-white rounded-full shadow top-1 transition ${
                value ? 'right-1' : 'right-5'
              }`}></div>
            </div>
            <span className="mr-3 text-sm text-gray-700">
              {value ? 'مفعّل' : 'معطّل'}
            </span>
          </label>
        );

      case 'number':
        return (
          <input
            type="number"
            value={value}
            onChange={(e) => handleSettingChange(category, key, Number(e.target.value), data_type)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        );

      case 'array':
        return (
          <textarea
            value={Array.isArray(value) ? value.join(', ') : String(value)}
            onChange={(e) => {
              const arr = e.target.value.split(',').map(v => v.trim()).filter(v => v);
              handleSettingChange(category, key, arr, data_type);
            }}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="أدخل القيم مفصولة بفاصلة"
          />
        );

      case 'json':
        return (
          <textarea
            value={typeof value === 'object' ? JSON.stringify(value, null, 2) : value}
            onChange={(e) => {
              try {
                const parsed = JSON.parse(e.target.value);
                handleSettingChange(category, key, parsed, data_type);
              } catch {
              }
            }}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 font-mono text-sm"
            placeholder='{"key": "value"}'
          />
        );

      case 'string':
      default:
        if (key.includes('password') || key.includes('secret') || key.includes('key')) {
          return (
            <div className="relative">
              <input
                type={showPasswords[key] ? 'text' : 'password'}
                value={value}
                onChange={(e) => handleSettingChange(category, key, e.target.value, data_type)}
                className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                type="button"
                onClick={() => setShowPasswords(prev => ({ ...prev, [key]: !prev[key] }))}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPasswords[key] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          );
        }

        return (
          <input
            type="text"
            value={value}
            onChange={(e) => handleSettingChange(category, key, e.target.value, data_type)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="w-12 h-12 animate-spin text-green-600" />
      </div>
    );
  }

  const currentTab = tabs.find(t => t.id === activeTab);
  const currentSettings = settings[activeTab] || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">الإعدادات العامة المتقدمة</h1>
          <p className="text-gray-600 mt-1">إدارة جميع إعدادات النظام من مكان واحد</p>
        </div>
        <div className="flex items-center space-x-3 space-x-reverse">
          <button
            onClick={handleExport}
            className="flex items-center px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            <Download className="w-5 h-5 ml-2" />
            تصدير
          </button>
          <button
            onClick={handleReset}
            disabled={!hasChanges}
            className="flex items-center px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition disabled:opacity-50"
          >
            <RefreshCw className="w-5 h-5 ml-2" />
            إعادة تحميل
          </button>
          <button
            onClick={handleSave}
            disabled={!hasChanges || saving}
            className="flex items-center px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
          >
            {saving ? (
              <Loader className="w-5 h-5 ml-2 animate-spin" />
            ) : (
              <Save className="w-5 h-5 ml-2" />
            )}
            حفظ التغييرات
          </button>
        </div>
      </div>

      {hasChanges && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start">
          <AlertCircle className="w-5 h-5 text-amber-600 ml-3 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium text-amber-800">لديك تغييرات غير محفوظة</p>
            <p className="text-sm text-amber-700 mt-1">
              تأكد من حفظ التغييرات قبل مغادرة الصفحة
            </p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="border-b border-gray-200 overflow-x-auto">
          <nav className="flex -mb-px">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition ${
                    activeTab === tab.id
                      ? 'border-green-600 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className={`w-5 h-5 ml-2 ${activeTab === tab.id ? tab.color : ''}`} />
                  {tab.name}
                  {settings[tab.id] && (
                    <span className="mr-2 px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full">
                      {settings[tab.id].length}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {currentTab && (
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <currentTab.icon className={`w-6 h-6 ml-2 ${currentTab.color}`} />
                <h2 className="text-xl font-bold text-gray-800">{currentTab.name}</h2>
              </div>
              <p className="text-sm text-gray-600">
                إعدادات {currentTab.name.toLowerCase()}
              </p>
            </div>
          )}

          {currentSettings.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Database className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p>لا توجد إعدادات في هذه الفئة</p>
            </div>
          ) : (
            <div className="space-y-6">
              {currentSettings.map((setting) => (
                <div key={setting.id} className="border border-gray-200 rounded-lg p-4 hover:border-green-300 transition">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-800 mb-1">
                        {setting.label_ar}
                        {!setting.is_editable && (
                          <span className="mr-2 text-xs text-gray-500">(للقراءة فقط)</span>
                        )}
                      </label>
                      {setting.description_ar && (
                        <p className="text-xs text-gray-600 mb-3">{setting.description_ar}</p>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      {setting.is_public && (
                        <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">
                          عام
                        </span>
                      )}
                      <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                        {setting.data_type}
                      </span>
                    </div>
                  </div>
                  {renderSettingInput(setting)}
                  <div className="mt-2 text-xs text-gray-400">
                    آخر تحديث: {new Date(setting.updated_at).toLocaleString('ar-EG')}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeneralSettings;
