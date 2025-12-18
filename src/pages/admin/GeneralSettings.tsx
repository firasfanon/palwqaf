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
  AlertCircle,
  Download,
  Upload,
  Eye,
  EyeOff,
  Search,
  Filter,
  CheckCircle,
  Info,
  Mail,
  Key,
  Lock,
  Clock,
  HardDrive,
  Cpu,
  FileText,
  Image as ImageIcon,
  Video,
  Sun,
  Moon,
  Users,
  Activity
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

interface SettingCardProps {
  setting: Setting;
  onUpdate: (category: string, key: string, value: any) => void;
  showPassword: boolean;
  onTogglePassword: () => void;
}

const SettingCard: React.FC<SettingCardProps> = ({ setting, onUpdate, showPassword, onTogglePassword }) => {
  const value = typeof setting.value === 'string' ?
    (() => { try { return JSON.parse(setting.value); } catch { return setting.value; } })() :
    setting.value;

  const renderInput = () => {
    if (!setting.is_editable) {
      return (
        <div className="text-sm text-gray-600 bg-gray-50 px-4 py-3 rounded-lg border border-gray-200">
          {String(value)}
        </div>
      );
    }

    switch (setting.data_type) {
      case 'boolean':
        return (
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-green-400 transition">
            <span className="text-sm font-medium text-gray-700">
              {value ? 'مفعّل' : 'معطّل'}
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={value === true}
                onChange={(e) => onUpdate(setting.category, setting.key, e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>
        );

      case 'number':
        return (
          <div className="relative">
            <input
              type="number"
              value={value || 0}
              onChange={(e) => onUpdate(setting.category, setting.key, Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
            />
          </div>
        );

      case 'array':
        return (
          <textarea
            value={Array.isArray(value) ? value.join(', ') : String(value)}
            onChange={(e) => {
              const arr = e.target.value.split(',').map(v => v.trim()).filter(v => v);
              onUpdate(setting.category, setting.key, arr);
            }}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition resize-none"
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
                onUpdate(setting.category, setting.key, parsed);
              } catch {}
            }}
            rows={5}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent font-mono text-sm transition resize-none"
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
                type={showPassword ? 'text' : 'password'}
                value={value || ''}
                onChange={(e) => onUpdate(setting.category, setting.key, e.target.value)}
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              />
              <button
                type="button"
                onClick={onTogglePassword}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          );
        }

        return (
          <input
            type="text"
            value={value || ''}
            onChange={(e) => onUpdate(setting.category, setting.key, e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
          />
        );
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg hover:border-green-300 transition-all duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <label className="text-base font-semibold text-gray-800">
              {setting.label_ar}
            </label>
            {!setting.is_editable && (
              <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full">
                للقراءة فقط
              </span>
            )}
          </div>
          {setting.description_ar && (
            <p className="text-sm text-gray-600 mb-3">{setting.description_ar}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {setting.is_public && (
            <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-md font-medium">
              عام
            </span>
          )}
          <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-md font-medium">
            {setting.data_type}
          </span>
        </div>
      </div>

      {renderInput()}

      <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
        <span>آخر تحديث: {new Date(setting.updated_at).toLocaleString('ar-EG')}</span>
        <span className="text-gray-400">Key: {setting.key}</span>
      </div>
    </div>
  );
};

const GeneralSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState<GroupedSettings>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [showPasswords, setShowPasswords] = useState<{ [key: string]: boolean }>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [stats, setStats] = useState({ total: 0, public: 0, editable: 0 });
  const { showToast } = useToast();

  const tabs = [
    { id: 'general', name: 'الإعدادات العامة', icon: Settings, color: 'text-green-600', bgColor: 'bg-green-50' },
    { id: 'contact', name: 'معلومات التواصل', icon: Phone, color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { id: 'social', name: 'وسائل التواصل', icon: Globe, color: 'text-cyan-600', bgColor: 'bg-cyan-50' },
    { id: 'localization', name: 'اللغة والمنطقة', icon: Languages, color: 'text-purple-600', bgColor: 'bg-purple-50' },
    { id: 'security', name: 'الأمان', icon: Shield, color: 'text-red-600', bgColor: 'bg-red-50' },
    { id: 'notifications', name: 'الإشعارات', icon: Bell, color: 'text-orange-600', bgColor: 'bg-orange-50' },
    { id: 'system', name: 'النظام', icon: Database, color: 'text-teal-600', bgColor: 'bg-teal-50' },
    { id: 'appearance', name: 'المظهر', icon: Palette, color: 'text-pink-600', bgColor: 'bg-pink-50' },
    { id: 'maps', name: 'الخرائط', icon: MapPin, color: 'text-indigo-600', bgColor: 'bg-indigo-50' },
    { id: 'reports', name: 'التقارير', icon: BarChart3, color: 'text-amber-600', bgColor: 'bg-amber-50' },
    { id: 'performance', name: 'الأداء', icon: Zap, color: 'text-yellow-600', bgColor: 'bg-yellow-50' },
    { id: 'integrations', name: 'التكامل', icon: Network, color: 'text-gray-600', bgColor: 'bg-gray-50' },
    { id: 'maintenance', name: 'الصيانة', icon: RefreshCw, color: 'text-emerald-600', bgColor: 'bg-emerald-50' }
  ];

  useEffect(() => {
    fetchSettings();
  }, []);

  useEffect(() => {
    calculateStats();
  }, [settings]);

  const calculateStats = () => {
    const allSettings = Object.values(settings).flat();
    setStats({
      total: allSettings.length,
      public: allSettings.filter(s => s.is_public).length,
      editable: allSettings.filter(s => s.is_editable).length
    });
  };

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

  const handleSettingChange = (category: string, key: string, newValue: any) => {
    setSettings(prev => {
      const updated = { ...prev };
      const categorySettings = [...(updated[category] || [])];
      const settingIndex = categorySettings.findIndex(s => s.key === key);

      if (settingIndex !== -1) {
        const setting = categorySettings[settingIndex];
        const valueToStore = setting.data_type === 'json' || setting.data_type === 'array'
          ? newValue
          : JSON.stringify(newValue);

        categorySettings[settingIndex] = {
          ...categorySettings[settingIndex],
          value: valueToStore
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

      let successCount = 0;
      for (const setting of allSettings) {
        const { error } = await supabase
          .from('system_settings')
          .update({
            value: setting.value,
            updated_at: new Date().toISOString()
          })
          .eq('id', setting.id);

        if (!error) successCount++;
      }

      setHasChanges(false);
      showToast(`تم حفظ ${successCount} إعداد بنجاح`, 'success');
      await fetchSettings();
    } catch (error: any) {
      showToast('خطأ في حفظ الإعدادات', 'error');
      console.error('Error saving settings:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    if (window.confirm('هل أنت متأكد من إعادة تحميل الإعدادات؟ سيتم فقدان جميع التغييرات غير المحفوظة.')) {
      setHasChanges(false);
      await fetchSettings();
      showToast('تم إعادة تحميل الإعدادات', 'info');
    }
  };

  const handleExport = () => {
    const exportData = Object.entries(settings).reduce((acc, [category, categorySettings]) => {
      acc[category] = categorySettings.reduce((catAcc, setting) => {
        const value = typeof setting.value === 'string'
          ? (() => { try { return JSON.parse(setting.value); } catch { return setting.value; } })()
          : setting.value;
        catAcc[setting.key] = value;
        return catAcc;
      }, {} as any);
      return acc;
    }, {} as any);

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `settings-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('تم تصدير الإعدادات بنجاح', 'success');
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target?.result as string);

        setSettings(prev => {
          const updated = { ...prev };
          Object.entries(importedData).forEach(([category, categoryData]: [string, any]) => {
            if (updated[category]) {
              updated[category] = updated[category].map(setting => {
                if (categoryData[setting.key] !== undefined) {
                  const newValue = categoryData[setting.key];
                  const valueToStore = setting.data_type === 'json' || setting.data_type === 'array'
                    ? newValue
                    : JSON.stringify(newValue);
                  return { ...setting, value: valueToStore };
                }
                return setting;
              });
            }
          });
          return updated;
        });

        setHasChanges(true);
        showToast('تم استيراد الإعدادات بنجاح', 'success');
      } catch (error) {
        showToast('خطأ في استيراد الإعدادات. تأكد من صحة الملف.', 'error');
      }
    };
    reader.readAsText(file);
    event.target.value = '';
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
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <Loader className="w-16 h-16 animate-spin text-green-600 mb-4" />
        <p className="text-lg text-gray-600 font-medium">جاري تحميل الإعدادات...</p>
      </div>
    );
  }

  const currentTab = tabs.find(t => t.id === activeTab);
  const currentSettings = filteredSettings();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">الإعدادات العامة المتقدمة</h1>
              <p className="text-gray-600">إدارة شاملة لجميع إعدادات وخيارات النظام</p>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
                id="import-settings"
              />
              <label
                htmlFor="import-settings"
                className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition cursor-pointer"
              >
                <Upload className="w-5 h-5" />
                استيراد
              </label>
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition"
              >
                <Download className="w-5 h-5" />
                تصدير
              </button>
              <button
                onClick={handleReset}
                disabled={!hasChanges}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshCw className="w-5 h-5" />
                إعادة تحميل
              </button>
              <button
                onClick={handleSave}
                disabled={!hasChanges || saving}
                className="flex items-center gap-2 px-6 py-2 text-white bg-gradient-to-r from-green-600 to-green-700 rounded-lg hover:from-green-700 hover:to-green-800 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {saving ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    جاري الحفظ...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    حفظ التغييرات
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-700 font-medium mb-1">إجمالي الإعدادات</p>
                  <p className="text-3xl font-bold text-blue-900">{stats.total}</p>
                </div>
                <Settings className="w-12 h-12 text-blue-600 opacity-50" />
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-700 font-medium mb-1">الإعدادات العامة</p>
                  <p className="text-3xl font-bold text-green-900">{stats.public}</p>
                </div>
                <Globe className="w-12 h-12 text-green-600 opacity-50" />
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-700 font-medium mb-1">قابلة للتعديل</p>
                  <p className="text-3xl font-bold text-purple-900">{stats.editable}</p>
                </div>
                <Key className="w-12 h-12 text-purple-600 opacity-50" />
              </div>
            </div>
          </div>

          {hasChanges && (
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-xl p-4 flex items-start mb-6">
              <AlertCircle className="w-6 h-6 text-amber-600 ml-3 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-bold text-amber-900 text-lg">لديك تغييرات غير محفوظة!</p>
                <p className="text-sm text-amber-800 mt-1">
                  تأكد من حفظ التغييرات قبل مغادرة الصفحة أو تبديل الأقسام
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="overflow-x-auto">
              <nav className="flex -mb-px min-w-max">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const count = settings[tab.id]?.length || 0;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap border-b-3 transition-all ${
                        activeTab === tab.id
                          ? `border-green-600 ${tab.color} ${tab.bgColor}`
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${activeTab === tab.id ? tab.color : ''}`} />
                      <span>{tab.name}</span>
                      <span className={`px-2 py-0.5 text-xs rounded-full ${
                        activeTab === tab.id
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          <div className="p-6">
            {currentTab && (
              <div className="mb-6">
                <div className={`${currentTab.bgColor} rounded-xl p-6 border-2 ${currentTab.color.replace('text', 'border')}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 ${currentTab.bgColor} rounded-xl border-2 ${currentTab.color.replace('text', 'border')}`}>
                        <currentTab.icon className={`w-8 h-8 ${currentTab.color}`} />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-800">{currentTab.name}</h2>
                        <p className="text-sm text-gray-600 mt-1">
                          إدارة وتخصيص إعدادات {currentTab.name.toLowerCase()}
                        </p>
                      </div>
                    </div>
                    <div className="relative">
                      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="بحث في الإعدادات..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pr-10 pl-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent w-64"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentSettings.length === 0 ? (
              <div className="text-center py-16 bg-gray-50 rounded-xl">
                <Database className="w-20 h-20 mx-auto mb-4 text-gray-300" />
                <p className="text-xl font-medium text-gray-500 mb-2">
                  {searchQuery ? 'لا توجد نتائج للبحث' : 'لا توجد إعدادات في هذه الفئة'}
                </p>
                <p className="text-sm text-gray-400">
                  {searchQuery ? 'جرب كلمات بحث أخرى' : 'لم يتم إضافة أي إعدادات لهذا القسم بعد'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {currentSettings.map((setting) => (
                  <SettingCard
                    key={setting.id}
                    setting={setting}
                    onUpdate={handleSettingChange}
                    showPassword={showPasswords[setting.key] || false}
                    onTogglePassword={() => setShowPasswords(prev => ({ ...prev, [setting.key]: !prev[setting.key] }))}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Info className="w-6 h-6 text-blue-600" />
              <div>
                <p className="font-medium text-gray-800">معلومات النظام</p>
                <p className="text-sm text-gray-600">آخر تحديث: {new Date().toLocaleString('ar-EG')}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4" />
                <span>النظام يعمل</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>قاعدة البيانات متصلة</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralSettings;
