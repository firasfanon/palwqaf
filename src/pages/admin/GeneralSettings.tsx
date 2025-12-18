import React, { useState, useEffect } from 'react';
import { Settings, Save, RefreshCw, Download, Upload, Loader, Search, Eye, EyeOff } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useToast } from '../../hooks/useToast';

interface Setting {
  id: string;
  category: string;
  key: string;
  value: any;
  data_type: string;
  label_ar: string;
  description_ar: string | null;
  is_public: boolean;
  is_editable: boolean;
  updated_at: string;
}

interface GroupedSettings {
  [category: string]: Setting[];
}

const CATEGORIES = [
  { id: 'general', name: 'عام' },
  { id: 'contact', name: 'التواصل' },
  { id: 'social', name: 'السوشيال ميديا' },
  { id: 'localization', name: 'اللغة' },
  { id: 'security', name: 'الأمان' },
  { id: 'notifications', name: 'الإشعارات' },
  { id: 'system', name: 'النظام' },
  { id: 'appearance', name: 'المظهر' },
  { id: 'maps', name: 'الخرائط' },
  { id: 'reports', name: 'التقارير' },
  { id: 'performance', name: 'الأداء' },
  { id: 'integrations', name: 'التكامل' },
  { id: 'maintenance', name: 'الصيانة' }
];

const GeneralSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState<GroupedSettings>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showPasswords, setShowPasswords] = useState<{ [key: string]: boolean }>({});
  const { showToast } = useToast();

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
    } finally {
      setLoading(false);
    }
  };

  const handleSettingChange = (category: string, key: string, newValue: any) => {
    setSettings(prev => {
      const updated = { ...prev };
      const categorySettings = [...(updated[category] || [])];
      const settingIndex = categorySettings.findIndex(s => s.key === key);

      if (settingIndex !== -1) {
        categorySettings[settingIndex] = {
          ...categorySettings[settingIndex],
          value: newValue
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

      for (const setting of allSettings) {
        await supabase
          .from('system_settings')
          .update({
            value: setting.value,
            updated_at: new Date().toISOString()
          })
          .eq('id', setting.id);
      }

      setHasChanges(false);
      showToast('تم الحفظ بنجاح', 'success');
      await fetchSettings();
    } catch (error: any) {
      showToast('خطأ في الحفظ', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (window.confirm('هل أنت متأكد؟ سيتم فقدان التغييرات غير المحفوظة.')) {
      setHasChanges(false);
      fetchSettings();
    }
  };

  const renderInput = (setting: Setting) => {
    const value = setting.value;

    if (!setting.is_editable) {
      return (
        <div className="text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded">
          {String(value)}
        </div>
      );
    }

    switch (setting.data_type) {
      case 'boolean':
        return (
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={value === true}
              onChange={(e) => handleSettingChange(setting.category, setting.key, e.target.checked)}
              className="sr-only peer"
            />
            <div className="relative w-11 h-6 bg-gray-300 peer-focus:ring-2 peer-focus:ring-gray-400 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-700"></div>
            <span className="mr-3 text-sm text-gray-700">{value ? 'مفعّل' : 'معطّل'}</span>
          </label>
        );

      case 'number':
        return (
          <input
            type="number"
            value={value || 0}
            onChange={(e) => handleSettingChange(setting.category, setting.key, Number(e.target.value))}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-gray-500"
          />
        );

      case 'array':
        return (
          <textarea
            value={Array.isArray(value) ? value.join(', ') : String(value)}
            onChange={(e) => {
              const arr = e.target.value.split(',').map(v => v.trim()).filter(v => v);
              handleSettingChange(setting.category, setting.key, arr);
            }}
            rows={3}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-gray-500 resize-none"
            placeholder="قيم مفصولة بفاصلة"
          />
        );

      case 'json':
        return (
          <textarea
            value={typeof value === 'object' ? JSON.stringify(value, null, 2) : value}
            onChange={(e) => {
              try {
                const parsed = JSON.parse(e.target.value);
                handleSettingChange(setting.category, setting.key, parsed);
              } catch {}
            }}
            rows={4}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-gray-500 font-mono resize-none"
            placeholder='{"key": "value"}'
          />
        );

      case 'string':
      default:
        const isSensitive = setting.key.includes('password') || setting.key.includes('secret') || setting.key.includes('key');

        if (isSensitive) {
          return (
            <div className="relative">
              <input
                type={showPasswords[setting.key] ? 'text' : 'password'}
                value={value || ''}
                onChange={(e) => handleSettingChange(setting.category, setting.key, e.target.value)}
                className="w-full px-3 py-2 pl-10 text-sm border border-gray-300 rounded focus:outline-none focus:border-gray-500"
              />
              <button
                type="button"
                onClick={() => setShowPasswords(prev => ({ ...prev, [setting.key]: !prev[setting.key] }))}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPasswords[setting.key] ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          );
        }

        return (
          <input
            type="text"
            value={value || ''}
            onChange={(e) => handleSettingChange(setting.category, setting.key, e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-gray-500"
          />
        );
    }
  };

  const filteredSettings = () => {
    const currentSettings = settings[activeTab] || [];
    if (!searchQuery) return currentSettings;

    return currentSettings.filter(setting =>
      setting.label_ar.toLowerCase().includes(searchQuery.toLowerCase()) ||
      setting.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
      setting.description_ar?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="w-8 h-8 animate-spin text-gray-600" />
      </div>
    );
  }

  const currentSettings = filteredSettings();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">الإعدادات العامة</h1>
              <p className="text-sm text-gray-500 mt-0.5">إدارة إعدادات النظام</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleReset}
                disabled={!hasChanges}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-700 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshCw size={16} />
                إعادة
              </button>

              <button
                onClick={handleSave}
                disabled={!hasChanges || saving}
                className="flex items-center gap-1.5 px-4 py-1.5 text-sm text-white bg-gray-800 rounded hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <>
                    <Loader size={16} className="animate-spin" />
                    جاري الحفظ
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    حفظ التغييرات
                  </>
                )}
              </button>
            </div>
          </div>

          {hasChanges && (
            <div className="mt-3 bg-amber-50 border border-amber-200 rounded px-3 py-2">
              <p className="text-xs text-amber-800">
                ⚠️ لديك تغييرات غير محفوظة
              </p>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">

          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto">
              {CATEGORIES.map((cat) => {
                const count = settings[cat.id]?.length || 0;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveTab(cat.id)}
                    className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition ${
                      activeTab === cat.id
                        ? 'border-gray-800 text-gray-900 bg-gray-50'
                        : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {cat.name}
                    <span className={`px-1.5 py-0.5 text-xs rounded ${
                      activeTab === cat.id ? 'bg-gray-200 text-gray-800' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-4">

            <div className="mb-4">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="بحث في الإعدادات..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pr-10 pl-4 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-gray-500"
                />
              </div>
            </div>

            {currentSettings.length === 0 ? (
              <div className="text-center py-12">
                <Settings className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                <p className="text-sm text-gray-500">
                  {searchQuery ? 'لا توجد نتائج' : 'لا توجد إعدادات'}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {currentSettings.map((setting) => (
                  <div key={setting.id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <label className="text-sm font-semibold text-gray-900 block mb-0.5">
                          {setting.label_ar}
                        </label>
                        {setting.description_ar && (
                          <p className="text-xs text-gray-500">{setting.description_ar}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5">
                        {!setting.is_editable && (
                          <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">
                            للقراءة فقط
                          </span>
                        )}
                        {setting.is_public && (
                          <span className="px-2 py-0.5 text-xs bg-blue-50 text-blue-700 rounded">
                            عام
                          </span>
                        )}
                      </div>
                    </div>

                    {renderInput(setting)}

                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs text-gray-400">{setting.key}</span>
                      <span className="text-xs text-gray-400">
                        {new Date(setting.updated_at).toLocaleDateString('ar-EG')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default GeneralSettings;
