import React, { useState, useEffect } from 'react';
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
  Sparkles,
  Search,
  Filter,
  Plus,
  Edit,
  X,
  Copy,
  Layers,
  Grid,
  List,
  RotateCcw,
  Volume2,
  VolumeX,
  Sun,
  Moon,
  Contrast,
  Type,
  Languages,
  Flag,
  Home,
  Navigation,
  Compass
} from 'lucide-react';
import { useToast } from '../../hooks/useToast';

const GeneralSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const { success, error: showError, warning, info } = useToast();

  const [settings, setSettings] = useState({
    // إعدادات الموقع العامة
    siteName: 'وزارة الأوقاف والشؤون الدينية',
    siteDescription: 'الموقع الرسمي لوزارة الأوقاف والشؤون الدينية - دولة فلسطين',
    siteKeywords: 'أوقاف، فلسطين، مساجد، شؤون دينية، وزارة',
    siteUrl: 'https://awqaf.gov.ps',
    adminEmail: 'admin@awqaf.gov.ps',
    supportEmail: 'support@awqaf.gov.ps',
    
    // معلومات التواصل
    contactEmail: 'info@awqaf.gov.ps',
    contactPhone: '+970 2 298 2532',
    contactFax: '+970 2 298 2534',
    address: 'رام الله - فلسطين - شارع الإرسال',
    workingHours: 'الأحد - الخميس: 8:00 ص - 3:00 م',
    emergencyPhone: '+970 2 298 2530',
    
    // وسائل التواصل الاجتماعي
    facebookUrl: 'https://facebook.com/awqaf.ps',
    twitterUrl: 'https://twitter.com/awqaf_ps',
    instagramUrl: 'https://instagram.com/awqaf.ps',
    youtubeUrl: 'https://youtube.com/awqafps',
    linkedinUrl: 'https://linkedin.com/company/awqaf-ps',
    
    // إعدادات اللغة والمنطقة
    defaultLanguage: 'ar',
    supportedLanguages: ['ar', 'en'],
    timezone: 'Asia/Jerusalem',
    currency: 'ILS',
    dateFormat: 'dd/mm/yyyy',
    timeFormat: '24h',
    numberFormat: 'arabic',
    rtlSupport: true,
    
    // إعدادات الأمان
    enableTwoFactor: false,
    passwordMinLength: 8,
    passwordRequireSpecial: true,
    passwordRequireNumbers: true,
    passwordRequireUppercase: true,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    lockoutDuration: 15,
    enableCaptcha: true,
    allowRegistration: false,
    requireEmailVerification: true,
    enableAuditLog: true,
    
    // إعدادات الإشعارات
    enableNotifications: true,
    enableEmailAlerts: true,
    enableSMSAlerts: false,
    enablePushNotifications: true,
    enableDesktopNotifications: true,
    notificationSound: true,
    emailDigestFrequency: 'daily',
    urgentNotificationMethods: ['email', 'sms', 'push'],
    
    // إعدادات النظام
    maintenanceMode: false,
    debugMode: false,
    logLevel: 'info',
    maxFileSize: 50,
    allowedFileTypes: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'jpg', 'png', 'gif', 'mp4', 'mp3'],
    autoBackup: true,
    backupFrequency: 'daily',
    backupRetention: 30,
    compressionEnabled: true,
    cacheEnabled: true,
    cacheDuration: 3600,
    
    // إعدادات المظهر
    theme: 'islamic',
    primaryColor: '#22c55e',
    secondaryColor: '#eab308',
    accentColor: '#16a34a',
    fontSize: 'medium',
    fontFamily: 'Noto Sans Arabic',
    darkModeEnabled: false,
    highContrastMode: false,
    animationsEnabled: true,
    reducedMotion: false,
    
    // إعدادات الخرائط
    defaultMapCenter: { lat: 31.7767, lng: 35.2345 },
    defaultZoomLevel: 8,
    mapProvider: 'openstreetmap',
    enableSatelliteView: true,
    enableTerrainView: true,
    showTrafficLayer: false,
    
    // إعدادات التقارير
    defaultReportFormat: 'pdf',
    enableScheduledReports: true,
    reportRetention: 90,
    enableReportSharing: true,
    watermarkReports: true,
    
    // إعدادات الأداء
    enableLazyLoading: true,
    enableImageOptimization: true,
    enableGzipCompression: true,
    enableCDN: false,
    maxConcurrentUsers: 100,
    
    // إعدادات التكامل
    enableAPIAccess: true,
    apiRateLimit: 1000,
    enableWebhooks: false,
    webhookSecret: '',
    enableExternalAuth: false,
    
    // إعدادات الصيانة
    autoUpdates: false,
    updateChannel: 'stable',
    maintenanceWindow: '02:00-04:00',
    enableHealthChecks: true,
    healthCheckInterval: 300
  });

  const tabs = [
    { id: 'general', name: 'الإعدادات العامة', icon: Settings, color: 'text-islamic-600' },
    { id: 'contact', name: 'معلومات التواصل', icon: Phone, color: 'text-blue-600' },
    { id: 'social', name: 'وسائل التواصل', icon: Globe, color: 'text-green-600' },
    { id: 'localization', name: 'اللغة والمنطقة', icon: Languages, color: 'text-purple-600' },
    { id: 'security', name: 'الأمان والحماية', icon: Shield, color: 'text-red-600' },
    { id: 'notifications', name: 'الإشعارات', icon: Bell, color: 'text-orange-600' },
    { id: 'system', name: 'إعدادات النظام', icon: Database, color: 'text-teal-600' },
    { id: 'appearance', name: 'المظهر والتخصيص', icon: Palette, color: 'text-pink-600' },
    { id: 'maps', name: 'إعدادات الخرائط', icon: MapPin, color: 'text-indigo-600' },
    { id: 'reports', name: 'إعدادات التقارير', icon: BarChart3, color: 'text-cyan-600' },
    { id: 'performance', name: 'الأداء والتحسين', icon: Zap, color: 'text-yellow-600' },
    { id: 'integrations', name: 'التكامل والAPI', icon: Network, color: 'text-gray-600' },
    { id: 'maintenance', name: 'الصيانة والتحديث', icon: RefreshCw, color: 'text-emerald-600' }
  ];

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // محاكاة حفظ الإعدادات
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // حفظ الإعدادات في localStorage للتجربة
      localStorage.setItem('waqf_settings', JSON.stringify(settings));
      
      setHasChanges(false);
      success('تم حفظ الإعدادات بنجاح', 'جميع التغييرات تم تطبيقها على النظام');
    } catch (err) {
      showError('خطأ في حفظ الإعدادات', 'حدث خطأ أثناء حفظ الإعدادات');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    if (window.confirm('هل أنت متأكد من إعادة تعيين جميع الإعدادات؟')) {
      // إعادة تحميل الإعدادات الافتراضية
      window.location.reload();
      warning('تم إعادة تعيين الإعدادات', 'تم استرجاع الإعدادات الافتراضية');
    }
  };

  const handleExportSettings = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'waqf-settings.json';
    link.click();
    info('تم تصدير الإعدادات', 'تم تحميل ملف الإعدادات');
  };

  const handleImportSettings = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedSettings = JSON.parse(e.target?.result as string);
          setSettings(importedSettings);
          setHasChanges(true);
          success('تم استيراد الإعدادات', 'تم تحميل الإعدادات من الملف');
        } catch (err) {
          showError('خطأ في استيراد الإعدادات', 'تأكد من صحة ملف الإعدادات');
        }
      };
      reader.readAsText(file);
    }
  };

  // تحميل الإعدادات المحفوظة عند بدء التشغيل
  useEffect(() => {
    const savedSettings = localStorage.getItem('waqf_settings');
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (err) {
        console.error('Error loading saved settings:', err);
      }
    }
  }, []);

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
              placeholder="اسم الموقع الرسمي"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">وصف الموقع</label>
            <textarea
              rows={3}
              value={settings.siteDescription}
              onChange={(e) => handleSettingChange('siteDescription', e.target.value)}
              className="form-textarea"
              placeholder="وصف مختصر للموقع"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">الكلمات المفتاحية</label>
            <input
              type="text"
              value={settings.siteKeywords}
              onChange={(e) => handleSettingChange('siteKeywords', e.target.value)}
              className="form-input"
              placeholder="كلمات مفتاحية مفصولة بفواصل"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">رابط الموقع</label>
              <input
                type="url"
                value={settings.siteUrl}
                onChange={(e) => handleSettingChange('siteUrl', e.target.value)}
                className="form-input"
                placeholder="https://awqaf.gov.ps"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">بريد المدير</label>
              <input
                type="email"
                value={settings.adminEmail}
                onChange={(e) => handleSettingChange('adminEmail', e.target.value)}
                className="form-input"
                placeholder="admin@awqaf.gov.ps"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="card-golden">
        <h3 className="text-lg font-semibold text-golden-800 mb-4 font-display">إعدادات الصفحة الرئيسية</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-golden-800 font-body">عرض شريط الأخبار العاجلة</h4>
              <p className="text-sm text-sage-600 font-body">إظهار شريط الأخبار المتحرك في أعلى الصفحة</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                defaultChecked
                onChange={(e) => handleSettingChange('showBreakingNews', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-golden-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-golden-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-golden-800 font-body">عرض الإحصائيات المتحركة</h4>
              <p className="text-sm text-sage-600 font-body">تفعيل العدادات المتحركة في قسم الإحصائيات</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                defaultChecked
                onChange={(e) => handleSettingChange('animatedCounters', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-golden-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-golden-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-golden-800 font-body">نافذة الترحيب للزوار الجدد</h4>
              <p className="text-sm text-sage-600 font-body">إظهار نافذة ترحيب للزوار الجدد</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                defaultChecked
                onChange={(e) => handleSettingChange('showWelcomeModal', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-golden-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-golden-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContactSettings = () => (
    <div className="space-y-6">
      <div className="card-islamic">
        <h3 className="text-lg font-semibold text-islamic-800 mb-4 font-display">معلومات التواصل الأساسية</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">البريد الإلكتروني الرئيسي</label>
              <input
                type="email"
                value={settings.contactEmail}
                onChange={(e) => handleSettingChange('contactEmail', e.target.value)}
                className="form-input"
                placeholder="info@awqaf.gov.ps"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">بريد الدعم التقني</label>
              <input
                type="email"
                value={settings.supportEmail}
                onChange={(e) => handleSettingChange('supportEmail', e.target.value)}
                className="form-input"
                placeholder="support@awqaf.gov.ps"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">رقم الهاتف الرئيسي</label>
              <input
                type="tel"
                value={settings.contactPhone}
                onChange={(e) => handleSettingChange('contactPhone', e.target.value)}
                className="form-input"
                placeholder="+970 2 298 2532"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">رقم الفاكس</label>
              <input
                type="tel"
                value={settings.contactFax}
                onChange={(e) => handleSettingChange('contactFax', e.target.value)}
                className="form-input"
                placeholder="+970 2 298 2534"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">هاتف الطوارئ</label>
              <input
                type="tel"
                value={settings.emergencyPhone}
                onChange={(e) => handleSettingChange('emergencyPhone', e.target.value)}
                className="form-input"
                placeholder="+970 2 298 2530"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">العنوان الكامل</label>
            <textarea
              rows={2}
              value={settings.address}
              onChange={(e) => handleSettingChange('address', e.target.value)}
              className="form-textarea"
              placeholder="العنوان التفصيلي للوزارة"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">ساعات العمل</label>
            <input
              type="text"
              value={settings.workingHours}
              onChange={(e) => handleSettingChange('workingHours', e.target.value)}
              className="form-input"
              placeholder="الأحد - الخميس: 8:00 ص - 3:00 م"
            />
          </div>
        </div>
      </div>

      <div className="card-golden">
        <h3 className="text-lg font-semibold text-golden-800 mb-4 font-display">مكاتب المحافظات</h3>
        <div className="space-y-4">
          {[
            { name: 'مكتب القدس', phone: '+970 2 628 3292', email: 'jerusalem@awqaf.gov.ps' },
            { name: 'مكتب غزة', phone: '+970 8 282 3456', email: 'gaza@awqaf.gov.ps' },
            { name: 'مكتب نابلس', phone: '+970 9 238 4567', email: 'nablus@awqaf.gov.ps' },
            { name: 'مكتب الخليل', phone: '+970 2 222 5678', email: 'hebron@awqaf.gov.ps' }
          ].map((office, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border border-golden-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-golden-700 mb-1 font-body">اسم المكتب</label>
                  <input
                    type="text"
                    defaultValue={office.name}
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-golden-700 mb-1 font-body">الهاتف</label>
                  <input
                    type="tel"
                    defaultValue={office.phone}
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-golden-700 mb-1 font-body">البريد الإلكتروني</label>
                  <input
                    type="email"
                    defaultValue={office.email}
                    className="form-input"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSocialSettings = () => (
    <div className="space-y-6">
      <div className="card-islamic">
        <h3 className="text-lg font-semibold text-islamic-800 mb-4 font-display">روابط وسائل التواصل الاجتماعي</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">فيسبوك</label>
              <input
                type="url"
                value={settings.facebookUrl}
                onChange={(e) => handleSettingChange('facebookUrl', e.target.value)}
                className="form-input"
                placeholder="https://facebook.com/awqaf.ps"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">تويتر</label>
              <input
                type="url"
                value={settings.twitterUrl}
                onChange={(e) => handleSettingChange('twitterUrl', e.target.value)}
                className="form-input"
                placeholder="https://twitter.com/awqaf_ps"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">إنستغرام</label>
              <input
                type="url"
                value={settings.instagramUrl}
                onChange={(e) => handleSettingChange('instagramUrl', e.target.value)}
                className="form-input"
                placeholder="https://instagram.com/awqaf.ps"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">يوتيوب</label>
              <input
                type="url"
                value={settings.youtubeUrl}
                onChange={(e) => handleSettingChange('youtubeUrl', e.target.value)}
                className="form-input"
                placeholder="https://youtube.com/awqafps"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">لينكد إن</label>
            <input
              type="url"
              value={settings.linkedinUrl}
              onChange={(e) => handleSettingChange('linkedinUrl', e.target.value)}
              className="form-input"
              placeholder="https://linkedin.com/company/awqaf-ps"
            />
          </div>
        </div>
      </div>

      <div className="card-golden">
        <h3 className="text-lg font-semibold text-golden-800 mb-4 font-display">إعدادات المشاركة</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-golden-800 font-body">تفعيل أزرار المشاركة</h4>
              <p className="text-sm text-sage-600 font-body">إظهار أزرار المشاركة في الأخبار والمحتوى</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                defaultChecked
                onChange={(e) => handleSettingChange('enableSocialSharing', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-golden-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-golden-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-golden-800 font-body">تضمين منشورات وسائل التواصل</h4>
              <p className="text-sm text-sage-600 font-body">عرض آخر المنشورات من وسائل التواصل</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                defaultChecked
                onChange={(e) => handleSettingChange('embedSocialPosts', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-golden-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-golden-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLocalizationSettings = () => (
    <div className="space-y-6">
      <div className="card-islamic">
        <h3 className="text-lg font-semibold text-islamic-800 mb-4 font-display">إعدادات اللغة</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">اللغة الافتراضية</label>
              <select
                value={settings.defaultLanguage}
                onChange={(e) => handleSettingChange('defaultLanguage', e.target.value)}
                className="form-select"
              >
                <option value="ar">العربية</option>
                <option value="en">English</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">اتجاه النص</label>
              <select
                value={settings.rtlSupport ? 'rtl' : 'ltr'}
                onChange={(e) => handleSettingChange('rtlSupport', e.target.value === 'rtl')}
                className="form-select"
              >
                <option value="rtl">من اليمين إلى اليسار (RTL)</option>
                <option value="ltr">من اليسار إلى اليمين (LTR)</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">اللغات المدعومة</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { code: 'ar', name: 'العربية', flag: '🇵🇸' },
                { code: 'en', name: 'English', flag: '🇺🇸' },
                { code: 'fr', name: 'Français', flag: '🇫🇷' },
                { code: 'es', name: 'Español', flag: '🇪🇸' }
              ].map((lang) => (
                <label key={lang.code} className="flex items-center space-x-2 space-x-reverse p-2 border border-sage-200 rounded-lg">
                  <input
                    type="checkbox"
                    checked={settings.supportedLanguages.includes(lang.code)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        handleSettingChange('supportedLanguages', [...settings.supportedLanguages, lang.code]);
                      } else {
                        handleSettingChange('supportedLanguages', settings.supportedLanguages.filter(l => l !== lang.code));
                      }
                    }}
                    className="rounded border-gray-300 text-islamic-600 focus:ring-islamic-500"
                  />
                  <span className="text-lg">{lang.flag}</span>
                  <span className="text-sm font-body">{lang.name}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="card-golden">
        <h3 className="text-lg font-semibold text-golden-800 mb-4 font-display">إعدادات المنطقة والتنسيق</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-golden-700 mb-2 font-body">المنطقة الزمنية</label>
            <select
              value={settings.timezone}
              onChange={(e) => handleSettingChange('timezone', e.target.value)}
              className="form-select"
            >
              <option value="Asia/Jerusalem">القدس (GMT+2)</option>
              <option value="Asia/Gaza">غزة (GMT+2)</option>
              <option value="Asia/Hebron">الخليل (GMT+2)</option>
            </select>
          </div>
          
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
              <option value="JOD">دينار أردني (JD)</option>
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
              <option value="dd-mm-yyyy">يوم-شهر-سنة</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-golden-700 mb-2 font-body">تنسيق الوقت</label>
            <select
              value={settings.timeFormat}
              onChange={(e) => handleSettingChange('timeFormat', e.target.value)}
              className="form-select"
            >
              <option value="24h">24 ساعة</option>
              <option value="12h">12 ساعة (AM/PM)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="card-islamic">
        <h3 className="text-lg font-semibold text-islamic-800 mb-4 font-display">إعدادات كلمات المرور</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">الحد الأدنى لطول كلمة المرور</label>
            <input
              type="number"
              value={settings.passwordMinLength}
              onChange={(e) => handleSettingChange('passwordMinLength', parseInt(e.target.value))}
              className="form-input"
              min="6"
              max="20"
            />
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-islamic-800 font-body">طلب أحرف خاصة</h4>
                <p className="text-sm text-sage-600 font-body">يجب أن تحتوي كلمة المرور على أحرف خاصة</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.passwordRequireSpecial}
                  onChange={(e) => handleSettingChange('passwordRequireSpecial', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-islamic-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-islamic-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-islamic-800 font-body">طلب أرقام</h4>
                <p className="text-sm text-sage-600 font-body">يجب أن تحتوي كلمة المرور على أرقام</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.passwordRequireNumbers}
                  onChange={(e) => handleSettingChange('passwordRequireNumbers', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-islamic-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-islamic-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-islamic-800 font-body">طلب أحرف كبيرة</h4>
                <p className="text-sm text-sage-600 font-body">يجب أن تحتوي كلمة المرور على أحرف كبيرة</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.passwordRequireUppercase}
                  onChange={(e) => handleSettingChange('passwordRequireUppercase', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-islamic-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-islamic-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="card-golden">
        <h3 className="text-lg font-semibold text-golden-800 mb-4 font-display">إعدادات الجلسة والوصول</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-golden-700 mb-2 font-body">مهلة الجلسة (دقيقة)</label>
              <input
                type="number"
                value={settings.sessionTimeout}
                onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
                className="form-input"
                min="5"
                max="480"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-golden-700 mb-2 font-body">محاولات تسجيل الدخول</label>
              <input
                type="number"
                value={settings.maxLoginAttempts}
                onChange={(e) => handleSettingChange('maxLoginAttempts', parseInt(e.target.value))}
                className="form-input"
                min="3"
                max="10"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-golden-700 mb-2 font-body">مدة الحظر (دقيقة)</label>
              <input
                type="number"
                value={settings.lockoutDuration}
                onChange={(e) => handleSettingChange('lockoutDuration', parseInt(e.target.value))}
                className="form-input"
                min="5"
                max="60"
              />
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-golden-800 font-body">تفعيل المصادقة الثنائية</h4>
                <p className="text-sm text-sage-600 font-body">طلب رمز تأكيد إضافي عند تسجيل الدخول</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.enableTwoFactor}
                  onChange={(e) => handleSettingChange('enableTwoFactor', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-golden-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-golden-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-golden-800 font-body">تفعيل CAPTCHA</h4>
                <p className="text-sm text-sage-600 font-body">طلب حل CAPTCHA عند تسجيل الدخول</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.enableCaptcha}
                  onChange={(e) => handleSettingChange('enableCaptcha', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-golden-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-golden-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-golden-800 font-body">تسجيل العمليات</h4>
                <p className="text-sm text-sage-600 font-body">تسجيل جميع العمليات الحساسة</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.enableAuditLog}
                  onChange={(e) => handleSettingChange('enableAuditLog', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-golden-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-golden-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="card-islamic">
        <h3 className="text-lg font-semibold text-islamic-800 mb-4 font-display">إعدادات الإشعارات العامة</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-islamic-800 font-body">تفعيل نظام الإشعارات</h4>
              <p className="text-sm text-sage-600 font-body">تفعيل نظام الإشعارات العام للموقع</p>
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
              <h4 className="font-medium text-islamic-800 font-body">الأصوات</h4>
              <p className="text-sm text-sage-600 font-body">تشغيل أصوات التنبيه مع الإشعارات</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notificationSound}
                onChange={(e) => handleSettingChange('notificationSound', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-islamic-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-islamic-600"></div>
            </label>
          </div>
        </div>
      </div>

      <div className="card-golden">
        <h3 className="text-lg font-semibold text-golden-800 mb-4 font-display">طرق التنبيه</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 space-x-reverse">
              <Mail className="w-5 h-5 text-golden-600" />
              <div>
                <h4 className="font-medium text-golden-800 font-body">البريد الإلكتروني</h4>
                <p className="text-sm text-sage-600 font-body">إرسال الإشعارات عبر البريد الإلكتروني</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.enableEmailAlerts}
                onChange={(e) => handleSettingChange('enableEmailAlerts', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-golden-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-golden-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 space-x-reverse">
              <Smartphone className="w-5 h-5 text-golden-600" />
              <div>
                <h4 className="font-medium text-golden-800 font-body">الرسائل النصية</h4>
                <p className="text-sm text-sage-600 font-body">إرسال الإشعارات عبر الرسائل النصية</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.enableSMSAlerts}
                onChange={(e) => handleSettingChange('enableSMSAlerts', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-golden-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-golden-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 space-x-reverse">
              <Bell className="w-5 h-5 text-golden-600" />
              <div>
                <h4 className="font-medium text-golden-800 font-body">إشعارات المتصفح</h4>
                <p className="text-sm text-sage-600 font-body">إشعارات فورية في المتصفح</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.enablePushNotifications}
                onChange={(e) => handleSettingChange('enablePushNotifications', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-golden-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-golden-600"></div>
            </label>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-golden-700 mb-2 font-body">تكرار ملخص البريد الإلكتروني</label>
            <select
              value={settings.emailDigestFrequency}
              onChange={(e) => handleSettingChange('emailDigestFrequency', e.target.value)}
              className="form-select"
            >
              <option value="never">لا يُرسل</option>
              <option value="daily">يومي</option>
              <option value="weekly">أسبوعي</option>
              <option value="monthly">شهري</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSystemSettings = () => (
    <div className="space-y-6">
      <div className="card-islamic">
        <h3 className="text-lg font-semibold text-islamic-800 mb-4 font-display">إعدادات النظام الأساسية</h3>
        <div className="space-y-4">
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
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-islamic-800 font-body">وضع التطوير</h4>
              <p className="text-sm text-sage-600 font-body">تفعيل وضع التطوير لعرض معلومات إضافية</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.debugMode}
                onChange={(e) => handleSettingChange('debugMode', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-islamic-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-islamic-600"></div>
            </label>
          </div>
          
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
        </div>
      </div>

      <div className="card-golden">
        <h3 className="text-lg font-semibold text-golden-800 mb-4 font-display">إعدادات الملفات والتخزين</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-golden-700 mb-2 font-body">الحد الأقصى لحجم الملف (MB)</label>
            <input
              type="number"
              value={settings.maxFileSize}
              onChange={(e) => handleSettingChange('maxFileSize', parseInt(e.target.value))}
              className="form-input"
              min="1"
              max="500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-golden-700 mb-2 font-body">أنواع الملفات المسموحة</label>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
              {['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'jpg', 'png', 'gif', 'mp4', 'mp3', 'zip', 'rar', 'txt'].map((type) => (
                <label key={type} className="flex items-center space-x-2 space-x-reverse p-2 border border-sage-200 rounded-lg">
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
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-golden-800 font-body">ضغط الملفات</h4>
                <p className="text-sm text-sage-600 font-body">ضغط الملفات تلقائياً لتوفير المساحة</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.compressionEnabled}
                  onChange={(e) => handleSettingChange('compressionEnabled', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-golden-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-golden-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-golden-800 font-body">النسخ الاحتياطي التلقائي</h4>
                <p className="text-sm text-sage-600 font-body">إنشاء نسخ احتياطية تلقائية</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.autoBackup}
                  onChange={(e) => handleSettingChange('autoBackup', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-golden-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-golden-600"></div>
              </label>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-golden-700 mb-2 font-body">تكرار النسخ الاحتياطي</label>
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
            
            <div>
              <label className="block text-sm font-medium text-golden-700 mb-2 font-body">مدة الاحتفاظ (يوم)</label>
              <input
                type="number"
                value={settings.backupRetention}
                onChange={(e) => handleSettingChange('backupRetention', parseInt(e.target.value))}
                className="form-input"
                min="7"
                max="365"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <div className="card-islamic">
        <h3 className="text-lg font-semibold text-islamic-800 mb-4 font-display">نمط الألوان والتصميم</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">نمط الألوان</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button 
                onClick={() => handleSettingChange('theme', 'islamic')}
                className={`p-4 border-2 rounded-lg transition-all ${settings.theme === 'islamic' ? 'border-islamic-500 bg-islamic-50' : 'border-gray-300'}`}
              >
                <div className="w-full h-8 islamic-gradient rounded mb-2"></div>
                <span className="text-sm font-body">الأخضر الإسلامي</span>
              </button>
              <button 
                onClick={() => handleSettingChange('theme', 'golden')}
                className={`p-4 border-2 rounded-lg transition-all ${settings.theme === 'golden' ? 'border-golden-500 bg-golden-50' : 'border-gray-300'}`}
              >
                <div className="w-full h-8 golden-gradient rounded mb-2"></div>
                <span className="text-sm font-body">الذهبي الكلاسيكي</span>
              </button>
              <button 
                onClick={() => handleSettingChange('theme', 'sage')}
                className={`p-4 border-2 rounded-lg transition-all ${settings.theme === 'sage' ? 'border-sage-500 bg-sage-50' : 'border-gray-300'}`}
              >
                <div className="w-full h-8 sage-gradient rounded mb-2"></div>
                <span className="text-sm font-body">الحكيم الهادئ</span>
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">حجم الخط</label>
              <select
                value={settings.fontSize}
                onChange={(e) => handleSettingChange('fontSize', e.target.value)}
                className="form-select"
              >
                <option value="small">صغير</option>
                <option value="medium">متوسط</option>
                <option value="large">كبير</option>
                <option value="extra-large">كبير جداً</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">نوع الخط</label>
              <select
                value={settings.fontFamily}
                onChange={(e) => handleSettingChange('fontFamily', e.target.value)}
                className="form-select"
              >
                <option value="Noto Sans Arabic">Noto Sans Arabic</option>
                <option value="Amiri">Amiri</option>
                <option value="Cairo">Cairo</option>
                <option value="Tajawal">Tajawal</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-islamic-800 font-body">الوضع الليلي</h4>
                <p className="text-sm text-sage-600 font-body">تفعيل الوضع الليلي للموقع</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.darkModeEnabled}
                  onChange={(e) => handleSettingChange('darkModeEnabled', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-islamic-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-islamic-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-islamic-800 font-body">وضع التباين العالي</h4>
                <p className="text-sm text-sage-600 font-body">تحسين التباين لذوي الاحتياجات الخاصة</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.highContrastMode}
                  onChange={(e) => handleSettingChange('highContrastMode', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-islamic-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-islamic-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-islamic-800 font-body">الحركات والانتقالات</h4>
                <p className="text-sm text-sage-600 font-body">تفعيل الحركات والانتقالات المرئية</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.animationsEnabled}
                  onChange={(e) => handleSettingChange('animationsEnabled', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-islamic-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-islamic-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="card-sage">
        <h3 className="text-lg font-semibold text-sage-800 mb-4 font-display">شعار الموقع والهوية البصرية</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="w-20 h-20 islamic-gradient rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl font-display">أوقاف</span>
            </div>
            <div className="flex-1">
              <button className="btn-secondary mb-2">
                <Upload className="w-4 h-4 ml-2" />
                تغيير الشعار
              </button>
              <p className="text-sm text-sage-600 font-body">الحد الأقصى: 5MB، PNG أو SVG مفضل</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-sage-700 mb-2 font-body">اللون الأساسي</label>
              <div className="flex items-center space-x-2 space-x-reverse">
                <input
                  type="color"
                  value={settings.primaryColor}
                  onChange={(e) => handleSettingChange('primaryColor', e.target.value)}
                  className="w-12 h-10 border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  value={settings.primaryColor}
                  onChange={(e) => handleSettingChange('primaryColor', e.target.value)}
                  className="form-input flex-1"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-sage-700 mb-2 font-body">اللون الثانوي</label>
              <div className="flex items-center space-x-2 space-x-reverse">
                <input
                  type="color"
                  value={settings.secondaryColor}
                  onChange={(e) => handleSettingChange('secondaryColor', e.target.value)}
                  className="w-12 h-10 border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  value={settings.secondaryColor}
                  onChange={(e) => handleSettingChange('secondaryColor', e.target.value)}
                  className="form-input flex-1"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-sage-700 mb-2 font-body">لون التمييز</label>
              <div className="flex items-center space-x-2 space-x-reverse">
                <input
                  type="color"
                  value={settings.accentColor}
                  onChange={(e) => handleSettingChange('accentColor', e.target.value)}
                  className="w-12 h-10 border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  value={settings.accentColor}
                  onChange={(e) => handleSettingChange('accentColor', e.target.value)}
                  className="form-input flex-1"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMapsSettings = () => (
    <div className="space-y-6">
      <div className="card-islamic">
        <h3 className="text-lg font-semibold text-islamic-800 mb-4 font-display">إعدادات الخرائط الأساسية</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">خط العرض الافتراضي</label>
              <input
                type="number"
                step="any"
                value={settings.defaultMapCenter.lat}
                onChange={(e) => handleSettingChange('defaultMapCenter', { ...settings.defaultMapCenter, lat: parseFloat(e.target.value) })}
                className="form-input"
                placeholder="31.7767"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">خط الطول الافتراضي</label>
              <input
                type="number"
                step="any"
                value={settings.defaultMapCenter.lng}
                onChange={(e) => handleSettingChange('defaultMapCenter', { ...settings.defaultMapCenter, lng: parseFloat(e.target.value) })}
                className="form-input"
                placeholder="35.2345"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">مستوى التكبير الافتراضي</label>
            <input
              type="range"
              min="1"
              max="18"
              value={settings.defaultZoomLevel}
              onChange={(e) => handleSettingChange('defaultZoomLevel', parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-sage-600 mt-1">
              <span>1 (بعيد جداً)</span>
              <span className="font-bold">المستوى الحالي: {settings.defaultZoomLevel}</span>
              <span>18 (قريب جداً)</span>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">مزود الخرائط</label>
            <select
              value={settings.mapProvider}
              onChange={(e) => handleSettingChange('mapProvider', e.target.value)}
              className="form-select"
            >
              <option value="openstreetmap">OpenStreetMap</option>
              <option value="google">Google Maps</option>
              <option value="mapbox">Mapbox</option>
              <option value="esri">ESRI</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card-golden">
        <h3 className="text-lg font-semibold text-golden-800 mb-4 font-display">طبقات الخريطة</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-golden-800 font-body">عرض الأقمار الصناعية</h4>
              <p className="text-sm text-sage-600 font-body">إتاحة عرض صور الأقمار الصناعية</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.enableSatelliteView}
                onChange={(e) => handleSettingChange('enableSatelliteView', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-golden-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-golden-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-golden-800 font-body">عرض التضاريس</h4>
              <p className="text-sm text-sage-600 font-body">إظهار طبقة التضاريس الجغرافية</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.enableTerrainView}
                onChange={(e) => handleSettingChange('enableTerrainView', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-golden-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-golden-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-golden-800 font-body">طبقة حركة المرور</h4>
              <p className="text-sm text-sage-600 font-body">إظهار معلومات حركة المرور</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.showTrafficLayer}
                onChange={(e) => handleSettingChange('showTrafficLayer', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-golden-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-golden-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderReportsSettings = () => (
    <div className="space-y-6">
      <div className="card-islamic">
        <h3 className="text-lg font-semibold text-islamic-800 mb-4 font-display">إعدادات التقارير</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">تنسيق التقرير الافتراضي</label>
            <select
              value={settings.defaultReportFormat}
              onChange={(e) => handleSettingChange('defaultReportFormat', e.target.value)}
              className="form-select"
            >
              <option value="pdf">PDF</option>
              <option value="excel">Excel</option>
              <option value="word">Word</option>
              <option value="csv">CSV</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">مدة الاحتفاظ بالتقارير (يوم)</label>
            <input
              type="number"
              value={settings.reportRetention}
              onChange={(e) => handleSettingChange('reportRetention', parseInt(e.target.value))}
              className="form-input"
              min="30"
              max="365"
            />
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-islamic-800 font-body">التقارير المجدولة</h4>
                <p className="text-sm text-sage-600 font-body">تفعيل إنشاء التقارير تلقائياً</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.enableScheduledReports}
                  onChange={(e) => handleSettingChange('enableScheduledReports', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-islamic-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-islamic-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-islamic-800 font-body">مشاركة التقارير</h4>
                <p className="text-sm text-sage-600 font-body">السماح بمشاركة التقارير خارجياً</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.enableReportSharing}
                  onChange={(e) => handleSettingChange('enableReportSharing', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-islamic-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-islamic-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-islamic-800 font-body">علامة مائية على التقارير</h4>
                <p className="text-sm text-sage-600 font-body">إضافة علامة مائية لحماية التقارير</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.watermarkReports}
                  onChange={(e) => handleSettingChange('watermarkReports', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-islamic-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-islamic-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPerformanceSettings = () => (
    <div className="space-y-6">
      <div className="card-islamic">
        <h3 className="text-lg font-semibold text-islamic-800 mb-4 font-display">تحسين الأداء</h3>
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-islamic-800 font-body">التحميل التدريجي</h4>
                <p className="text-sm text-sage-600 font-body">تحميل المحتوى عند الحاجة لتسريع الموقع</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.enableLazyLoading}
                  onChange={(e) => handleSettingChange('enableLazyLoading', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-islamic-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-islamic-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-islamic-800 font-body">تحسين الصور</h4>
                <p className="text-sm text-sage-600 font-body">ضغط وتحسين الصور تلقائياً</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.enableImageOptimization}
                  onChange={(e) => handleSettingChange('enableImageOptimization', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-islamic-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-islamic-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-islamic-800 font-body">ضغط GZIP</h4>
                <p className="text-sm text-sage-600 font-body">ضغط الملفات لتسريع التحميل</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.enableGzipCompression}
                  onChange={(e) => handleSettingChange('enableGzipCompression', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-islamic-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-islamic-600"></div>
              </label>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">الحد الأقصى للمستخدمين المتزامنين</label>
              <input
                type="number"
                value={settings.maxConcurrentUsers}
                onChange={(e) => handleSettingChange('maxConcurrentUsers', parseInt(e.target.value))}
                className="form-input"
                min="10"
                max="1000"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">مدة التخزين المؤقت (ثانية)</label>
              <input
                type="number"
                value={settings.cacheDuration}
                onChange={(e) => handleSettingChange('cacheDuration', parseInt(e.target.value))}
                className="form-input"
                min="300"
                max="86400"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderIntegrationsSettings = () => (
    <div className="space-y-6">
      <div className="card-islamic">
        <h3 className="text-lg font-semibold text-islamic-800 mb-4 font-display">إعدادات API والتكامل</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-islamic-800 font-body">تفعيل وصول API</h4>
              <p className="text-sm text-sage-600 font-body">السماح بالوصول للبيانات عبر API</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.enableAPIAccess}
                onChange={(e) => handleSettingChange('enableAPIAccess', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-islamic-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-islamic-600"></div>
            </label>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">حد معدل API (طلب/ساعة)</label>
            <input
              type="number"
              value={settings.apiRateLimit}
              onChange={(e) => handleSettingChange('apiRateLimit', parseInt(e.target.value))}
              className="form-input"
              min="100"
              max="10000"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-islamic-800 font-body">تفعيل Webhooks</h4>
              <p className="text-sm text-sage-600 font-body">إرسال إشعارات للأنظمة الخارجية</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.enableWebhooks}
                onChange={(e) => handleSettingChange('enableWebhooks', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-islamic-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-islamic-600"></div>
            </label>
          </div>
          
          {settings.enableWebhooks && (
            <div>
              <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">مفتاح Webhook السري</label>
              <div className="flex items-center space-x-2 space-x-reverse">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={settings.webhookSecret}
                  onChange={(e) => handleSettingChange('webhookSecret', e.target.value)}
                  className="form-input flex-1"
                  placeholder="أدخل مفتاح سري قوي"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderMaintenanceSettings = () => (
    <div className="space-y-6">
      <div className="card-islamic">
        <h3 className="text-lg font-semibold text-islamic-800 mb-4 font-display">إعدادات الصيانة والتحديث</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-islamic-800 font-body">التحديثات التلقائية</h4>
              <p className="text-sm text-sage-600 font-body">تحديث النظام تلقائياً عند توفر إصدارات جديدة</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.autoUpdates}
                onChange={(e) => handleSettingChange('autoUpdates', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-islamic-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-islamic-600"></div>
            </label>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">قناة التحديث</label>
            <select
              value={settings.updateChannel}
              onChange={(e) => handleSettingChange('updateChannel', e.target.value)}
              className="form-select"
            >
              <option value="stable">مستقر</option>
              <option value="beta">تجريبي</option>
              <option value="alpha">تطويري</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">نافذة الصيانة</label>
            <input
              type="text"
              value={settings.maintenanceWindow}
              onChange={(e) => handleSettingChange('maintenanceWindow', e.target.value)}
              className="form-input"
              placeholder="02:00-04:00"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-islamic-800 font-body">فحص صحة النظام</h4>
              <p className="text-sm text-sage-600 font-body">فحص دوري لصحة النظام والخدمات</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.enableHealthChecks}
                onChange={(e) => handleSettingChange('enableHealthChecks', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-islamic-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-islamic-600"></div>
            </label>
          </div>
          
          {settings.enableHealthChecks && (
            <div>
              <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">فترة الفحص (ثانية)</label>
              <input
                type="number"
                value={settings.healthCheckInterval}
                onChange={(e) => handleSettingChange('healthCheckInterval', parseInt(e.target.value))}
                className="form-input"
                min="60"
                max="3600"
              />
            </div>
          )}
        </div>
      </div>

      <div className="card-golden">
        <h3 className="text-lg font-semibold text-golden-800 mb-4 font-display">معلومات النظام</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sage-600 font-body">إصدار النظام:</span>
              <span className="font-medium font-body">2.1.0</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sage-600 font-body">قاعدة البيانات:</span>
              <span className="font-medium font-body">Supabase PostgreSQL</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sage-600 font-body">مساحة التخزين:</span>
              <span className="font-medium font-body">2.5 GB / 10 GB</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sage-600 font-body">الذاكرة المستخدمة:</span>
              <span className="font-medium font-body">45%</span>
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
              <span className="text-sage-600 font-body">وقت التشغيل:</span>
              <span className="font-medium font-body">15 يوم</span>
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

  const renderContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings();
      case 'contact':
        return renderContactSettings();
      case 'social':
        return renderSocialSettings();
      case 'localization':
        return renderLocalizationSettings();
      case 'security':
        return renderSecuritySettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'system':
        return renderSystemSettings();
      case 'appearance':
        return renderAppearanceSettings();
      case 'maps':
        return renderMapsSettings();
      case 'reports':
        return renderReportsSettings();
      case 'performance':
        return renderPerformanceSettings();
      case 'integrations':
        return renderIntegrationsSettings();
      case 'maintenance':
        return renderMaintenanceSettings();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="heading-1 text-islamic-800">الإعدادات العامة المتقدمة</h1>
          <p className="body-text text-sage-600 mt-2">إدارة شاملة لجميع إعدادات النظام والموقع</p>
          {hasChanges && (
            <div className="flex items-center space-x-2 space-x-reverse mt-2">
              <AlertTriangle className="w-4 h-4 text-orange-500" />
              <span className="text-sm text-orange-600 font-body">يوجد تغييرات غير محفوظة</span>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-4 space-x-reverse">
          <button 
            onClick={handleExportSettings}
            className="btn-outline"
          >
            <Download className="w-5 h-5 ml-2" />
            تصدير الإعدادات
          </button>
          <label className="btn-outline cursor-pointer">
            <Upload className="w-5 h-5 ml-2" />
            استيراد الإعدادات
            <input
              type="file"
              accept=".json"
              onChange={handleImportSettings}
              className="hidden"
            />
          </label>
          <button 
            onClick={handleReset}
            className="btn-secondary"
          >
            <RotateCcw className="w-5 h-5 ml-2" />
            إعادة تعيين
          </button>
          <button 
            onClick={handleSave}
            disabled={isLoading || !hasChanges}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <RefreshCw className="w-5 h-5 ml-2 animate-spin" />
            ) : (
              <Save className="w-5 h-5 ml-2" />
            )}
            {isLoading ? 'جاري الحفظ...' : 'حفظ الإعدادات'}
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
              className={`flex items-center space-x-2 space-x-reverse px-4 py-3 rounded-xl transition-all duration-300 font-body ${
                activeTab === tab.id
                  ? 'bg-islamic-600 text-white shadow-islamic'
                  : 'text-sage-700 hover:bg-islamic-50 hover:text-islamic-700'
              }`}
            >
              <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-white' : tab.color}`} />
              <span className="font-medium text-sm">{tab.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {renderContent()}

      {/* Save Confirmation */}
      {hasChanges && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-xl shadow-xl border border-orange-200 p-4 z-50">
          <div className="flex items-center space-x-4 space-x-reverse">
            <AlertTriangle className="w-6 h-6 text-orange-500" />
            <div>
              <p className="font-medium text-orange-800 font-body">يوجد تغييرات غير محفوظة</p>
              <p className="text-sm text-sage-600 font-body">احفظ التغييرات لتطبيقها على النظام</p>
            </div>
            <div className="flex space-x-2 space-x-reverse">
              <button
                onClick={() => {
                  setSettings(JSON.parse(localStorage.getItem('waqf_settings') || '{}'));
                  setHasChanges(false);
                }}
                className="btn-outline text-sm"
              >
                تراجع
              </button>
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="btn-primary text-sm"
              >
                {isLoading ? 'جاري الحفظ...' : 'حفظ الآن'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeneralSettings;