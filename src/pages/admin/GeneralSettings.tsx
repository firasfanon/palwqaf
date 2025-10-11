import React, { useState } from 'react';
import { 
  Settings, 
  Save, 
  RefreshCw, 
  Shield, 
  Globe, 
  Bell, 
  Mail, 
  Database,
  Key,
  Eye,
  EyeOff,
  Upload,
  Download,
  Trash2,
  CheckCircle,
  AlertTriangle,
  Info,
  User,
  Building,
  MapPin,
  Phone,
  Clock,
  Calendar,
  FileText,
  Image,
  Video,
  Palette,
  Monitor,
  Smartphone,
  Tablet,
  Printer,
  Wifi,
  HardDrive,
  Cpu,
  MemoryStick,
  Network,
  Lock,
  Unlock,
  Zap,
  Activity,
  TrendingUp,
  BarChart3,
  Target,
  Award,
  Star,
  Heart,
  BookOpen,
  Crown,
  Gem,
  Sparkles
} from 'lucide-react';

const GeneralSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [showPassword, setShowPassword] = useState(false);
  const [settings, setSettings] = useState({
    siteName: 'وزارة الأوقاف والشؤون الدينية',
    siteDescription: 'الموقع الرسمي لوزارة الأوقاف والشؤون الدينية - دولة فلسطين',
    contactEmail: 'info@awqaf.gov.ps',
    contactPhone: '+970 2 298 2532',
    address: 'رام الله - فلسطين',
    workingHours: 'الأحد - الخميس: 8:00 ص - 3:00 م',
    language: 'ar',
    timezone: 'Asia/Jerusalem',
    currency: 'ILS',
    dateFormat: 'dd/mm/yyyy',
    enableNotifications: true,
    enableEmailAlerts: true,
    enableSMSAlerts: false,
    maintenanceMode: false,
    allowRegistration: true,
    requireEmailVerification: true,
    sessionTimeout: 30,
    maxFileSize: 10,
    allowedFileTypes: ['pdf', 'doc', 'docx', 'jpg', 'png', 'gif'],
    backupFrequency: 'daily',
    logLevel: 'info'
  });

  const tabs = [
    { id: 'general', name: 'الإعدادات العامة', icon: Settings, color: 'text-islamic-600' },
    { id: 'contact', name: 'معلومات التواصل', icon: Phone, color: 'text-blue-600' },
    { id: 'security', name: 'الأمان والحماية', icon: Shield, color: 'text-red-600' },
    { id: 'notifications', name: 'الإشعارات', icon: Bell, color: 'text-orange-600' },
    { id: 'system', name: 'إعدادات النظام', icon: Database, color: 'text-purple-600' },
    { id: 'appearance', name: 'المظهر والتخصيص', icon: Palette, color: 'text-pink-600' },
    { id: 'backup', name: 'النسخ الاحتياطي', icon: HardDrive, color: 'text-teal-600' }
  ];

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    // محاكاة حفظ الإعدادات
    console.log('Saving settings:', settings);
    alert('تم حفظ الإعدادات بنجاح');
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="card-islamic">
        <h3 className="text-lg font-semibold text-islamic-800 mb-4 font-display">معلومات الموقع الأساسية</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">اسم الموقع</label>
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) => handleSettingChange('siteName', e.target.value)}
              className="form-input"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">وصف الموقع</label>
            <textarea
              rows={3}
              value={settings.siteDescription}
              onChange={(e) => handleSettingChange('siteDescription', e.target.value)}
              className="form-textarea"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">اللغة الافتراضية</label>
              <select
                value={settings.language}
                onChange={(e) => handleSettingChange('language', e.target.value)}
                className="form-select"
              >
                <option value="ar">العربية</option>
                <option value="en">English</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">المنطقة الزمنية</label>
              <select
                value={settings.timezone}
                onChange={(e) => handleSettingChange('timezone', e.target.value)}
                className="form-select"
              >
                <option value="Asia/Jerusalem">القدس (GMT+2)</option>
                <option value="Asia/Gaza">غزة (GMT+2)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="card-golden">
        <h3 className="text-lg font-semibold text-golden-800 mb-4 font-display">التنسيق والعرض</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-golden-700 mb-2 font-body">العملة</label>
            <select
              value={settings.currency}
              onChange={(e) => handleSettingChange('currency', e.target.value)}
              className="form-select"
            >
              <option value="ILS">شيكل إسرائيلي (₪)</option>
              <option value="USD">دولار أمريكي ($)</option>
              <option value="EUR">يورو (€)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-golden-700 mb-2 font-body">تنسيق التاريخ</label>
            <select
              value={settings.dateFormat}
              onChange={(e) => handleSettingChange('dateFormat', e.target.value)}
              className="form-select"
            >
              <option value="dd/mm/yyyy">يوم/شهر/سنة</option>
              <option value="mm/dd/yyyy">شهر/يوم/سنة</option>
              <option value="yyyy-mm-dd">سنة-شهر-يوم</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-golden-700 mb-2 font-body">مهلة الجلسة (دقيقة)</label>
            <input
              type="number"
              value={settings.sessionTimeout}
              onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
              className="form-input"
              min="5"
              max="120"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderContactSettings = () => (
    <div className="space-y-6">
      <div className="card-islamic">
        <h3 className="text-lg font-semibold text-islamic-800 mb-4 font-display">معلومات التواصل</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">البريد الإلكتروني الرئيسي</label>
              <input
                type="email"
                value={settings.contactEmail}
                onChange={(e) => handleSettingChange('contactEmail', e.target.value)}
                className="form-input"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">رقم الهاتف الرئيسي</label>
              <input
                type="tel"
                value={settings.contactPhone}
                onChange={(e) => handleSettingChange('contactPhone', e.target.value)}
                className="form-input"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">العنوان</label>
            <input
              type="text"
              value={settings.address}
              onChange={(e) => handleSettingChange('address', e.target.value)}
              className="form-input"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">ساعات العمل</label>
            <input
              type="text"
              value={settings.workingHours}
              onChange={(e) => handleSettingChange('workingHours', e.target.value)}
              className="form-input"
            />
          </div>
        </div>
      </div>

      <div className="card-golden">
        <h3 className="text-lg font-semibold text-golden-800 mb-4 font-display">وسائل التواصل الاجتماعي</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-golden-700 mb-2 font-body">فيسبوك</label>
            <input
              type="url"
              className="form-input"
              placeholder="https://facebook.com/awqaf.ps"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-golden-700 mb-2 font-body">تويتر</label>
            <input
              type="url"
              className="form-input"
              placeholder="https://twitter.com/awqaf_ps"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-golden-700 mb-2 font-body">إنستغرام</label>
            <input
              type="url"
              className="form-input"
              placeholder="https://instagram.com/awqaf.ps"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-golden-700 mb-2 font-body">يوتيوب</label>
            <input
              type="url"
              className="form-input"
              placeholder="https://youtube.com/awqafps"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="card-islamic">
        <h3 className="text-lg font-semibold text-islamic-800 mb-4 font-display">إعدادات الأمان</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-islamic-800 font-body">السماح بالتسجيل الجديد</h4>
              <p className="text-sm text-sage-600 font-body">السماح للمستخدمين الجدد بإنشاء حسابات</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.allowRegistration}
                onChange={(e) => handleSettingChange('allowRegistration', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-islamic-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-islamic-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-islamic-800 font-body">تأكيد البريد الإلكتروني</h4>
              <p className="text-sm text-sage-600 font-body">طلب تأكيد البريد الإلكتروني عند التسجيل</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.requireEmailVerification}
                onChange={(e) => handleSettingChange('requireEmailVerification', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-islamic-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-islamic-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-islamic-800 font-body">وضع الصيانة</h4>
              <p className="text-sm text-sage-600 font-body">تفعيل وضع الصيانة لإخفاء الموقع مؤقتاً</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.maintenanceMode}
                onChange={(e) => handleSettingChange('maintenanceMode', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
            </label>
          </div>
        </div>
      </div>

      <div className="card-golden">
        <h3 className="text-lg font-semibold text-golden-800 mb-4 font-display">إعدادات الملفات</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-golden-700 mb-2 font-body">الحد الأقصى لحجم الملف (MB)</label>
            <input
              type="number"
              value={settings.maxFileSize}
              onChange={(e) => handleSettingChange('maxFileSize', parseInt(e.target.value))}
              className="form-input"
              min="1"
              max="100"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-golden-700 mb-2 font-body">أنواع الملفات المسموحة</label>
            <div className="grid grid-cols-3 gap-2">
              {['pdf', 'doc', 'docx', 'xls', 'xlsx', 'jpg', 'png', 'gif', 'mp4', 'mp3'].map((type) => (
                <label key={type} className="flex items-center space-x-2 space-x-reverse">
                  <input
                    type="checkbox"
                    checked={settings.allowedFileTypes.includes(type)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        handleSettingChange('allowedFileTypes', [...settings.allowedFileTypes, type]);
                      } else {
                        handleSettingChange('allowedFileTypes', settings.allowedFileTypes.filter(t => t !== type));
                      }
                    }}
                    className="rounded border-gray-300 text-golden-600 focus:ring-golden-500"
                  />
                  <span className="text-sm font-body">{type.toUpperCase()}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="card-islamic">
        <h3 className="text-lg font-semibold text-islamic-800 mb-4 font-display">إعدادات الإشعارات</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-islamic-800 font-body">تفعيل الإشعارات</h4>
              <p className="text-sm text-sage-600 font-body">تفعيل نظام الإشعارات العام</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.enableNotifications}
                onChange={(e) => handleSettingChange('enableNotifications', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-islamic-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-islamic-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-islamic-800 font-body">تنبيهات البريد الإلكتروني</h4>
              <p className="text-sm text-sage-600 font-body">إرسال التنبيهات عبر البريد الإلكتروني</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.enableEmailAlerts}
                onChange={(e) => handleSettingChange('enableEmailAlerts', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-islamic-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-islamic-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-islamic-800 font-body">تنبيهات الرسائل النصية</h4>
              <p className="text-sm text-sage-600 font-body">إرسال التنبيهات عبر الرسائل النصية</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.enableSMSAlerts}
                onChange={(e) => handleSettingChange('enableSMSAlerts', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-islamic-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-islamic-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSystemSettings = () => (
    <div className="space-y-6">
      <div className="card-islamic">
        <h3 className="text-lg font-semibold text-islamic-800 mb-4 font-display">إعدادات النظام</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">مستوى السجلات</label>
            <select
              value={settings.logLevel}
              onChange={(e) => handleSettingChange('logLevel', e.target.value)}
              className="form-select"
            >
              <option value="error">أخطاء فقط</option>
              <option value="warning">تحذيرات وأخطاء</option>
              <option value="info">معلومات عامة</option>
              <option value="debug">تفاصيل كاملة</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">تكرار النسخ الاحتياطي</label>
            <select
              value={settings.backupFrequency}
              onChange={(e) => handleSettingChange('backupFrequency', e.target.value)}
              className="form-select"
            >
              <option value="hourly">كل ساعة</option>
              <option value="daily">يومياً</option>
              <option value="weekly">أسبوعياً</option>
              <option value="monthly">شهرياً</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card-golden">
        <h3 className="text-lg font-semibold text-golden-800 mb-4 font-display">معلومات النظام</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sage-600 font-body">إصدار النظام:</span>
              <span className="font-medium font-body">2.0.1</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sage-600 font-body">قاعدة البيانات:</span>
              <span className="font-medium font-body">PostgreSQL 14</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sage-600 font-body">مساحة التخزين:</span>
              <span className="font-medium font-body">2.5 GB / 10 GB</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sage-600 font-body">آخر نسخة احتياطية:</span>
              <span className="font-medium font-body">اليوم 03:00</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sage-600 font-body">المستخدمون النشطون:</span>
              <span className="font-medium font-body">156</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sage-600 font-body">حالة النظام:</span>
              <span className="flex items-center space-x-1 space-x-reverse">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="font-medium text-green-600 font-body">يعمل بشكل طبيعي</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <div className="card-islamic">
        <h3 className="text-lg font-semibold text-islamic-800 mb-4 font-display">إعدادات المظهر</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">نمط الألوان</label>
            <div className="grid grid-cols-3 gap-3">
              <button className="p-4 border-2 border-islamic-500 rounded-lg bg-islamic-50">
                <div className="w-full h-8 islamic-gradient rounded mb-2"></div>
                <span className="text-sm font-body">الأخضر الإسلامي</span>
              </button>
              <button className="p-4 border-2 border-gray-300 rounded-lg">
                <div className="w-full h-8 golden-gradient rounded mb-2"></div>
                <span className="text-sm font-body">الذهبي الكلاسيكي</span>
              </button>
              <button className="p-4 border-2 border-gray-300 rounded-lg">
                <div className="w-full h-8 sage-gradient rounded mb-2"></div>
                <span className="text-sm font-body">الحكيم الهادئ</span>
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">حجم الخط</label>
            <select className="form-select">
              <option value="small">صغير</option>
              <option value="medium">متوسط</option>
              <option value="large">كبير</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card-golden">
        <h3 className="text-lg font-semibold text-golden-800 mb-4 font-display">شعار الموقع</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="w-20 h-20 islamic-gradient rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl font-display">أوقاف</span>
            </div>
            <div>
              <button className="btn-secondary">
                <Upload className="w-4 h-4 ml-2" />
                تغيير الشعار
              </button>
              <p className="text-sm text-sage-600 mt-1 font-body">الحد الأقصى: 2MB، PNG أو JPG</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBackupSettings = () => (
    <div className="space-y-6">
      <div className="card-islamic">
        <h3 className="text-lg font-semibold text-islamic-800 mb-4 font-display">النسخ الاحتياطي</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-islamic-50 rounded-lg">
              <HardDrive className="w-8 h-8 text-islamic-600 mx-auto mb-2" />
              <p className="font-medium text-islamic-800 font-body">آخر نسخة</p>
              <p className="text-sm text-sage-600 font-body">اليوم 03:00</p>
            </div>
            <div className="text-center p-4 bg-golden-50 rounded-lg">
              <CheckCircle className="w-8 h-8 text-golden-600 mx-auto mb-2" />
              <p className="font-medium text-golden-800 font-body">حالة النسخ</p>
              <p className="text-sm text-sage-600 font-body">مكتمل</p>
            </div>
            <div className="text-center p-4 bg-sage-50 rounded-lg">
              <Database className="w-8 h-8 text-sage-600 mx-auto mb-2" />
              <p className="font-medium text-sage-800 font-body">حجم النسخة</p>
              <p className="text-sm text-sage-600 font-body">2.5 GB</p>
            </div>
          </div>
          
          <div className="flex space-x-4 space-x-reverse">
            <button className="btn-primary">
              <Download className="w-5 h-5 ml-2" />
              إنشاء نسخة احتياطية الآن
            </button>
            <button className="btn-secondary">
              <Upload className="w-5 h-5 ml-2" />
              استعادة من نسخة احتياطية
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings();
      case 'contact':
        return renderContactSettings();
      case 'security':
        return renderSecuritySettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'system':
        return renderSystemSettings();
      case 'appearance':
        return renderAppearanceSettings();
      case 'backup':
        return renderBackupSettings();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="heading-1 text-islamic-800">الإعدادات العامة</h1>
          <p className="body-text text-sage-600 mt-2">إدارة إعدادات النظام والموقع العامة</p>
        </div>
        <div className="flex items-center space-x-4 space-x-reverse">
          <button 
            onClick={handleSave}
            className="btn-primary"
          >
            <Save className="w-5 h-5 ml-2" />
            حفظ الإعدادات
          </button>
          <button className="btn-secondary">
            <RefreshCw className="w-5 h-5 ml-2" />
            إعادة تعيين
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-2xl shadow-elegant p-2">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 space-x-reverse px-6 py-3 rounded-xl transition-all duration-300 font-body ${
                activeTab === tab.id
                  ? 'bg-islamic-600 text-white shadow-islamic'
                  : 'text-sage-700 hover:bg-islamic-50 hover:text-islamic-700'
              }`}
            >
              <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-white' : tab.color}`} />
              <span className="font-medium">{tab.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {renderContent()}
    </div>
  );
};

export default GeneralSettings;