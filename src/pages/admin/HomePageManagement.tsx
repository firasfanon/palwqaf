import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Edit, 
  Eye, 
  Save, 
  RefreshCw, 
  Upload, 
  Download,
  Image as ImageIcon,
  Video,
  FileText,
  Settings,
  Palette,
  Monitor,
  Smartphone,
  Tablet,
  Users,
  BarChart3,
  TrendingUp,
  Activity,
  Clock,
  Calendar,
  Star,
  Heart,
  Building,
  BookOpen,
  Phone,
  Mail,
  MapPin,
  Search,
  Filter,
  Plus,
  Trash2,
  CheckCircle,
  AlertTriangle,
  Info,
  Zap,
  Shield,
  Lock,
  Unlock,
  Bell,
  Target,
  Award,
  Crown,
  Gem,
  Sparkles,
  Navigation,
  Compass,
  Flag,
  Globe,
  Layers,
  Grid,
  List,
  Move,
  Copy,
  Scissors,
  RotateCcw,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Maximize,
  Minimize,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline,
  Link,
  Unlink,
  Type,
  Paintbrush2,
  Megaphone,
  Newspaper,
  GraduationCap,
  HandHeart,
  Calculator
} from 'lucide-react';
import { useToast } from '../../hooks/useToast';

const HomePageManagement: React.FC = () => {
  const { success, info, error: showError } = useToast();
  const [activeSection, setActiveSection] = useState('hero');
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [editMode, setEditMode] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('homepage');

  const tabs = [
    { id: 'homepage', name: 'الصفحة الرئيسية', icon: Home },
    { id: 'pages', name: 'إدارة الصفحات', icon: FileText },
    { id: 'services', name: 'إدارة الخدمات', icon: Settings },
    { id: 'navigation', name: 'القوائم والتنقل', icon: Navigation }
  ];

  const sections = [
    { id: 'hero', name: 'القسم الرئيسي', icon: Crown, color: 'text-islamic-600' },
    { id: 'minister', name: 'كلمة الوزير', icon: Users, color: 'text-blue-600' },
    { id: 'statistics', name: 'الإحصائيات', icon: BarChart3, color: 'text-green-600' },
    { id: 'news', name: 'الأخبار', icon: Newspaper, color: 'text-green-600' },
    { id: 'announcements', name: 'الإعلانات', icon: Megaphone, color: 'text-orange-600' },
    { id: 'services', name: 'الخدمات', icon: Settings, color: 'text-teal-600' },
    { id: 'events', name: 'الفعاليات', icon: Calendar, color: 'text-red-600' },
    { id: 'media', name: 'معرض الوسائط', icon: ImageIcon, color: 'text-blue-600' },
    { id: 'social', name: 'وسائل التواصل', icon: Globe, color: 'text-cyan-600' },
    { id: 'contact', name: 'معلومات التواصل', icon: Phone, color: 'text-red-600' }
  ];

  const pages = [
    { id: 'about', name: 'من نحن', icon: Info, route: '/about', enabled: true },
    { id: 'minister', name: 'كلمة الوزير', icon: Users, route: '/minister', enabled: true },
    { id: 'vision', name: 'الرؤية والرسالة', icon: Target, route: '/vision-mission', enabled: true },
    { id: 'structure', name: 'الهيكل التنظيمي', icon: Building, route: '/organizational-structure', enabled: true },
    { id: 'former-ministers', name: 'الوزراء السابقون', icon: Crown, route: '/former-ministers', enabled: true },
    { id: 'news', name: 'الأخبار', icon: Newspaper, route: '/news', enabled: true },
    { id: 'announcements', name: 'الإعلانات', icon: Megaphone, route: '/announcements', enabled: true },
    { id: 'projects', name: 'المشاريع', icon: Layers, route: '/projects', enabled: true },
    { id: 'activities', name: 'الأنشطة', icon: Activity, route: '/activities', enabled: true },
    { id: 'friday-sermons', name: 'خطب الجمعة', icon: BookOpen, route: '/friday-sermons', enabled: true },
    { id: 'mosques', name: 'المساجد', icon: Building, route: '/mosques', enabled: true },
    { id: 'media-gallery', name: 'معرض الوسائط', icon: ImageIcon, route: '/media-gallery', enabled: true },
    { id: 'contact', name: 'اتصل بنا', icon: Phone, route: '/contact', enabled: true },
    { id: 'services', name: 'الخدمات الإلكترونية', icon: Settings, route: '/e-services', enabled: true },
    { id: 'social-services', name: 'الخدمات الاجتماعية', icon: HandHeart, route: '/social-services', enabled: true }
  ];

  const serviceCategories = [
    {
      id: 'zakat',
      name: 'خدمات الزكاة',
      icon: Calculator,
      color: 'text-green-600',
      services: [
        { id: 'zakat-calc', name: 'حاسبة الزكاة', description: 'احسب زكاة أموالك بدقة', enabled: true },
        { id: 'zakat-payment', name: 'دفع الزكاة', description: 'ادفع زكاتك إلكترونياً', enabled: true },
        { id: 'zakat-inquiry', name: 'استعلام عن الزكاة', description: 'استفسر عن أحكام الزكاة', enabled: true }
      ]
    },
    {
      id: 'mosques',
      name: 'شؤون المساجد',
      icon: Building,
      color: 'text-islamic-600',
      services: [
        { id: 'mosque-directory', name: 'دليل المساجد', description: 'ابحث عن المساجد القريبة منك', enabled: true },
        { id: 'prayer-times', name: 'مواقيت الصلاة', description: 'مواقيت الصلاة في فلسطين', enabled: true },
        { id: 'mosque-registration', name: 'تسجيل مسجد', description: 'سجل مسجداً جديداً', enabled: true },
        { id: 'imam-services', name: 'خدمات الأئمة', description: 'خدمات خاصة بالأئمة والخطباء', enabled: true }
      ]
    },
    {
      id: 'endowments',
      name: 'خدمات الأوقاف',
      icon: Star,
      color: 'text-golden-600',
      services: [
        { id: 'waqf-registry', name: 'سجل الأوقاف الوطني', description: 'الاطلاع على سجل الأوقاف', enabled: true },
        { id: 'waqf-donation', name: 'التبرع للأوقاف', description: 'ساهم في دعم الأوقاف', enabled: true },
        { id: 'waqf-inquiry', name: 'استعلام عن الأوقاف', description: 'استعلم عن أملاك الأوقاف', enabled: true }
      ]
    },
    {
      id: 'religious',
      name: 'الشؤون الدينية',
      icon: BookOpen,
      color: 'text-sage-600',
      services: [
        { id: 'fatwa-inquiry', name: 'الاستفتاء الشرعي', description: 'اطرح استفساراتك الشرعية', enabled: true },
        { id: 'marriage-service', name: 'خدمات الزواج', description: 'خدمات عقد القران', enabled: true },
        { id: 'hajj-services', name: 'خدمات الحج', description: 'خدمات ومعلومات الحج', enabled: true },
        { id: 'religious-courses', name: 'الدورات الشرعية', description: 'التسجيل في الدورات الدينية', enabled: true }
      ]
    },
    {
      id: 'social',
      name: 'الخدمات الاجتماعية',
      icon: HandHeart,
      color: 'text-red-600',
      services: [
        { id: 'social-aid', name: 'المساعدات الاجتماعية', description: 'تقديم طلب للمساعدة الاجتماعية', enabled: true },
        { id: 'orphan-sponsorship', name: 'كفالة الأيتام', description: 'ساهم في كفالة يتيم', enabled: true },
        { id: 'family-counseling', name: 'الإرشاد الأسري', description: 'خدمات الإرشاد والاستشارات الأسرية', enabled: true }
      ]
    }
  ];

  const [homePageContent, setHomePageContent] = useState({
    hero: {
      title: 'وزارة الأوقاف والشؤون الدينية',
      subtitle: 'دولة فلسطين',
      description: 'نعمل على خدمة المجتمع الفلسطيني وتعزيز القيم الدينية والتراث الإسلامي',
      backgroundImage: 'https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg',
      ctaText: 'استكشف خدماتنا',
      ctaLink: '/services',
      showVideo: true,
      videoUrl: '/videos/ministry-intro.mp4',
      overlayOpacity: 60,
      textAlignment: 'center',
      showSlider: true,
      slides: [
        {
          title: 'وزير الأوقاف يشارك في المؤتمر الدولي للوقف الإسلامي',
          subtitle: 'مشاركة فلسطينية مميزة في المؤتمر الدولي',
          description: 'شارك معالي وزير الأوقاف والشؤون الدينية في المؤتمر الدولي للوقف الإسلامي',
          image: 'https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg',
          cta: 'اقرأ المزيد'
        }
      ]
    },
    minister: {
      name: 'د. محمد مصطفى نجم',
      position: 'وزير الأوقاف والشؤون الدينية',
      image: 'https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg',
      message: 'يسعدني أن أرحب بكم في الموقع الإلكتروني لوزارة الأوقاف والشؤون الدينية...',
      showFullMessage: false,
      messageLink: '/minister',
      showQuote: true,
      quoteText: 'نسعى لتطوير الخدمات الدينية وإدارة الأوقاف بما يخدم المجتمع الفلسطيني',
      showSignature: true
    },
    statistics: {
      showAnimatedCounters: true,
      animationDuration: 2000,
      counters: [
        { label: 'مسجد مُدار', value: 1247, icon: 'building', color: '#22C55E', target: 1300 },
        { label: 'إمام وخطيب', value: 356, icon: 'users', color: '#3B82F6', target: 400 },
        { label: 'نشاط شهري', value: 89, icon: 'calendar', color: '#F59E0B', target: 100 },
        { label: 'برنامج تعليمي', value: 45, icon: 'book', color: '#8B5CF6', target: 50 }
      ],
      backgroundPattern: 'geometric',
      showTargets: true,
      showProgress: true,
      layout: 'grid'
    },
    news: {
      showCount: 3,
      showCategories: true,
      showViewCounts: true,
      showDates: true,
      layout: 'grid',
      autoRefresh: true,
      refreshInterval: 300000,
      showExcerpts: true,
      showAuthors: true,
      showImages: true,
      enableFiltering: false
    },
    announcements: {
      showCount: 4,
      showPriorities: true,
      showExpiry: true,
      highlightUrgent: true,
      layout: 'cards',
      showIcons: true,
      showDates: true,
      enableMarquee: false,
      marqueeSpeed: 30
    },
    services: {
      showTabs: true,
      tabCategories: ['zakat', 'mosques', 'endowments', 'religious'],
      showIcons: true,
      showDescriptions: true,
      layout: 'grid',
      showCTA: true,
      ctaText: 'استكشف جميع الخدمات',
      ctaLink: '/services'
    },
    events: {
      showTabs: true,
      tabTypes: ['events', 'social'],
      showImages: true,
      showRegistration: true,
      showCapacity: false,
      showLocation: true,
      showTime: true,
      enableRegistration: true
    },
    media: {
      showTabs: true,
      mediaTypes: ['images', 'videos'],
      showTitles: true,
      showDurations: true,
      layout: 'grid',
      autoplay: false,
      showControls: true,
      enableLightbox: true,
      showCount: 6
    },
    social: {
      platforms: ['facebook', 'twitter', 'instagram', 'youtube'],
      showFollowers: true,
      showRecentPosts: true,
      postsCount: 2,
      autoUpdate: true,
      showEngagement: true,
      showLinks: true
    },
    contact: {
      showForm: true,
      showOffices: false,
      showMap: false,
      showSocialMedia: true,
      formFields: ['name', 'email', 'phone', 'subject', 'message'],
      showEmergencyContacts: false,
      showWorkingHours: true,
      enableDirectContact: true
    }
  });

  const handleSave = async () => {
    try {
      // محاكاة حفظ البيانات
      await new Promise(resolve => setTimeout(resolve, 1000));
      setHasUnsavedChanges(false);
      success('تم حفظ التغييرات', 'تم تحديث الصفحة الرئيسية بنجاح');
    } catch (err) {
      showError('خطأ في الحفظ', 'تعذر حفظ التغييرات، يرجى المحاولة مرة أخرى');
    }
  };

  const handlePreview = () => {
    window.open('/', '_blank');
    info('فتح المعاينة', 'تم فتح الصفحة الرئيسية في نافذة جديدة');
  };

  const handleReset = () => {
    if (window.confirm('هل أنت متأكد من إعادة تعيين جميع التغييرات؟')) {
      setHasUnsavedChanges(false);
      info('تم إعادة التعيين', 'تم استرجاع الإعدادات الافتراضية');
    }
  };

  const renderHeroSection = () => (
    <div className="space-y-6">
      <div className="card-islamic">
        <h3 className="text-lg font-semibold text-islamic-800 mb-4 font-display">إعدادات القسم الرئيسي</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">العنوان الرئيسي</label>
              <input
                type="text"
                value={homePageContent.hero.title}
                onChange={(e) => {
                  setHomePageContent(prev => ({
                    ...prev,
                    hero: { ...prev.hero, title: e.target.value }
                  }));
                  setHasUnsavedChanges(true);
                }}
                className="form-input"
                placeholder="عنوان الصفحة الرئيسية"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">العنوان الفرعي</label>
              <input
                type="text"
                value={homePageContent.hero.subtitle}
                onChange={(e) => {
                  setHomePageContent(prev => ({
                    ...prev,
                    hero: { ...prev.hero, subtitle: e.target.value }
                  }));
                  setHasUnsavedChanges(true);
                }}
                className="form-input"
                placeholder="العنوان الفرعي"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">الوصف</label>
              <textarea
                value={homePageContent.hero.description}
                onChange={(e) => {
                  setHomePageContent(prev => ({
                    ...prev,
                    hero: { ...prev.hero, description: e.target.value }
                  }));
                  setHasUnsavedChanges(true);
                }}
                rows={3}
                className="form-textarea"
                placeholder="وصف مختصر للوزارة"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">رابط صورة الخلفية</label>
              <input
                type="url"
                value={homePageContent.hero.backgroundImage}
                onChange={(e) => {
                  setHomePageContent(prev => ({
                    ...prev,
                    hero: { ...prev.hero, backgroundImage: e.target.value }
                  }));
                  setHasUnsavedChanges(true);
                }}
                className="form-input"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">نص زر الدعوة للعمل</label>
              <input
                type="text"
                value={homePageContent.hero.ctaText}
                onChange={(e) => {
                  setHomePageContent(prev => ({
                    ...prev,
                    hero: { ...prev.hero, ctaText: e.target.value }
                  }));
                  setHasUnsavedChanges(true);
                }}
                className="form-input"
                placeholder="نص الزر"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">رابط زر الدعوة للعمل</label>
              <input
                type="text"
                value={homePageContent.hero.ctaLink}
                onChange={(e) => {
                  setHomePageContent(prev => ({
                    ...prev,
                    hero: { ...prev.hero, ctaLink: e.target.value }
                  }));
                  setHasUnsavedChanges(true);
                }}
                className="form-input"
                placeholder="/services"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">شفافية الخلفية</label>
              <div className="flex items-center space-x-4 space-x-reverse">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={homePageContent.hero.overlayOpacity}
                  onChange={(e) => {
                    setHomePageContent(prev => ({
                      ...prev,
                      hero: { ...prev.hero, overlayOpacity: parseInt(e.target.value) }
                    }));
                    setHasUnsavedChanges(true);
                  }}
                  className="flex-1"
                />
                <span className="text-sm font-medium text-islamic-700 min-w-[40px]">
                  {homePageContent.hero.overlayOpacity}%
                </span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">محاذاة النص</label>
              <div className="flex items-center space-x-2 space-x-reverse">
                <button
                  onClick={() => {
                    setHomePageContent(prev => ({
                      ...prev,
                      hero: { ...prev.hero, textAlignment: 'right' }
                    }));
                    setHasUnsavedChanges(true);
                  }}
                  className={`p-2 rounded-lg border ${homePageContent.hero.textAlignment === 'right' ? 'bg-islamic-100 border-islamic-300' : 'border-gray-300'}`}
                >
                  <AlignRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setHomePageContent(prev => ({
                      ...prev,
                      hero: { ...prev.hero, textAlignment: 'center' }
                    }));
                    setHasUnsavedChanges(true);
                  }}
                  className={`p-2 rounded-lg border ${homePageContent.hero.textAlignment === 'center' ? 'bg-islamic-100 border-islamic-300' : 'border-gray-300'}`}
                >
                  <AlignCenter className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setHomePageContent(prev => ({
                      ...prev,
                      hero: { ...prev.hero, textAlignment: 'left' }
                    }));
                    setHasUnsavedChanges(true);
                  }}
                  className={`p-2 rounded-lg border ${homePageContent.hero.textAlignment === 'left' ? 'bg-islamic-100 border-islamic-300' : 'border-gray-300'}`}
                >
                  <AlignLeft className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="space-y-3">
              <label className="flex items-center space-x-2 space-x-reverse">
                <input
                  type="checkbox"
                  checked={homePageContent.hero.showVideo}
                  onChange={(e) => {
                    setHomePageContent(prev => ({
                      ...prev,
                      hero: { ...prev.hero, showVideo: e.target.checked }
                    }));
                    setHasUnsavedChanges(true);
                  }}
                  className="rounded border-islamic-300 text-islamic-600 focus:ring-islamic-500"
                />
                <span className="text-sm font-medium text-islamic-700 font-body">عرض فيديو تعريفي</span>
              </label>
              
              {homePageContent.hero.showVideo && (
                <input
                  type="url"
                  value={homePageContent.hero.videoUrl}
                  onChange={(e) => {
                    setHomePageContent(prev => ({
                      ...prev,
                      hero: { ...prev.hero, videoUrl: e.target.value }
                    }));
                    setHasUnsavedChanges(true);
                  }}
                  className="form-input"
                  placeholder="رابط الفيديو"
                />
              )}
              
              <label className="flex items-center space-x-2 space-x-reverse">
                <input
                  type="checkbox"
                  checked={homePageContent.hero.showSlider}
                  onChange={(e) => {
                    setHomePageContent(prev => ({
                      ...prev,
                      hero: { ...prev.hero, showSlider: e.target.checked }
                    }));
                    setHasUnsavedChanges(true);
                  }}
                  className="rounded border-islamic-300 text-islamic-600 focus:ring-islamic-500"
                />
                <span className="text-sm font-medium text-islamic-700 font-body">تفعيل العرض المتحرك</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Preview */}
      <div className="card-golden">
        <h4 className="text-lg font-semibold text-golden-800 mb-4 font-display">معاينة القسم الرئيسي</h4>
        <div className="relative bg-gradient-to-r from-islamic-600 to-sage-700 rounded-xl overflow-hidden h-64">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${homePageContent.hero.backgroundImage})`,
              opacity: (100 - homePageContent.hero.overlayOpacity) / 100
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
          <div className={`relative z-10 h-full flex items-center justify-${homePageContent.hero.textAlignment === 'center' ? 'center' : homePageContent.hero.textAlignment === 'right' ? 'end' : 'start'} p-8`}>
            <div className={`text-white ${homePageContent.hero.textAlignment === 'center' ? 'text-center' : homePageContent.hero.textAlignment === 'right' ? 'text-right' : 'text-left'}`}>
              <h1 className="text-3xl font-bold mb-2 font-display">{homePageContent.hero.title}</h1>
              <h2 className="text-xl mb-3 text-golden-300 font-display">{homePageContent.hero.subtitle}</h2>
              <p className="text-base mb-4 opacity-90 font-body">{homePageContent.hero.description}</p>
              <button className="bg-islamic-600 text-white px-6 py-2 rounded-lg hover:bg-islamic-700 transition-colors font-body">
                {homePageContent.hero.ctaText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMinisterSection = () => (
    <div className="space-y-6">
      <div className="card-islamic">
        <h3 className="text-lg font-semibold text-islamic-800 mb-4 font-display">إعدادات قسم كلمة الوزير</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">اسم الوزير</label>
              <input
                type="text"
                value={homePageContent.minister.name}
                onChange={(e) => {
                  setHomePageContent(prev => ({
                    ...prev,
                    minister: { ...prev.minister, name: e.target.value }
                  }));
                  setHasUnsavedChanges(true);
                }}
                className="form-input"
                placeholder="اسم معالي الوزير"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">المنصب</label>
              <input
                type="text"
                value={homePageContent.minister.position}
                onChange={(e) => {
                  setHomePageContent(prev => ({
                    ...prev,
                    minister: { ...prev.minister, position: e.target.value }
                  }));
                  setHasUnsavedChanges(true);
                }}
                className="form-input"
                placeholder="منصب الوزير"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">رابط صورة الوزير</label>
              <input
                type="url"
                value={homePageContent.minister.image}
                onChange={(e) => {
                  setHomePageContent(prev => ({
                    ...prev,
                    minister: { ...prev.minister, image: e.target.value }
                  }));
                  setHasUnsavedChanges(true);
                }}
                className="form-input"
                placeholder="https://example.com/minister.jpg"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">رابط الصفحة الكاملة</label>
              <input
                type="text"
                value={homePageContent.minister.messageLink}
                onChange={(e) => {
                  setHomePageContent(prev => ({
                    ...prev,
                    minister: { ...prev.minister, messageLink: e.target.value }
                  }));
                  setHasUnsavedChanges(true);
                }}
                className="form-input"
                placeholder="/minister"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">نص الكلمة</label>
              <textarea
                value={homePageContent.minister.message}
                onChange={(e) => {
                  setHomePageContent(prev => ({
                    ...prev,
                    minister: { ...prev.minister, message: e.target.value }
                  }));
                  setHasUnsavedChanges(true);
                }}
                rows={4}
                className="form-textarea"
                placeholder="كلمة معالي الوزير"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">نص الاقتباس المميز</label>
              <textarea
                value={homePageContent.minister.quoteText}
                onChange={(e) => {
                  setHomePageContent(prev => ({
                    ...prev,
                    minister: { ...prev.minister, quoteText: e.target.value }
                  }));
                  setHasUnsavedChanges(true);
                }}
                rows={2}
                className="form-textarea"
                placeholder="اقتباس مميز من كلمة الوزير"
              />
            </div>
            
            <div className="space-y-3">
              <label className="flex items-center space-x-2 space-x-reverse">
                <input
                  type="checkbox"
                  checked={homePageContent.minister.showQuote}
                  onChange={(e) => {
                    setHomePageContent(prev => ({
                      ...prev,
                      minister: { ...prev.minister, showQuote: e.target.checked }
                    }));
                    setHasUnsavedChanges(true);
                  }}
                  className="rounded border-islamic-300 text-islamic-600 focus:ring-islamic-500"
                />
                <span className="text-sm font-medium text-islamic-700 font-body">عرض الاقتباس المميز</span>
              </label>
              
              <label className="flex items-center space-x-2 space-x-reverse">
                <input
                  type="checkbox"
                  checked={homePageContent.minister.showSignature}
                  onChange={(e) => {
                    setHomePageContent(prev => ({
                      ...prev,
                      minister: { ...prev.minister, showSignature: e.target.checked }
                    }));
                    setHasUnsavedChanges(true);
                  }}
                  className="rounded border-islamic-300 text-islamic-600 focus:ring-islamic-500"
                />
                <span className="text-sm font-medium text-islamic-700 font-body">عرض التوقيع</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStatisticsSection = () => (
    <div className="space-y-6">
      <div className="card-islamic">
        <h3 className="text-lg font-semibold text-islamic-800 mb-4 font-display">إعدادات الإحصائيات</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <label className="flex items-center space-x-2 space-x-reverse">
              <input
                type="checkbox"
                checked={homePageContent.statistics.showAnimatedCounters}
                onChange={(e) => {
                  setHomePageContent(prev => ({
                    ...prev,
                    statistics: { ...prev.statistics, showAnimatedCounters: e.target.checked }
                  }));
                  setHasUnsavedChanges(true);
                }}
                className="rounded border-islamic-300 text-islamic-600 focus:ring-islamic-500"
              />
              <span className="text-sm font-medium text-islamic-700 font-body">عدادات متحركة</span>
            </label>
            
            <label className="flex items-center space-x-2 space-x-reverse">
              <input
                type="checkbox"
                checked={homePageContent.statistics.showTargets}
                onChange={(e) => {
                  setHomePageContent(prev => ({
                    ...prev,
                    statistics: { ...prev.statistics, showTargets: e.target.checked }
                  }));
                  setHasUnsavedChanges(true);
                }}
                className="rounded border-islamic-300 text-islamic-600 focus:ring-islamic-500"
              />
              <span className="text-sm font-medium text-islamic-700 font-body">عرض الأهداف</span>
            </label>
            
            <label className="flex items-center space-x-2 space-x-reverse">
              <input
                type="checkbox"
                checked={homePageContent.statistics.showProgress}
                onChange={(e) => {
                  setHomePageContent(prev => ({
                    ...prev,
                    statistics: { ...prev.statistics, showProgress: e.target.checked }
                  }));
                  setHasUnsavedChanges(true);
                }}
                className="rounded border-islamic-300 text-islamic-600 focus:ring-islamic-500"
              />
              <span className="text-sm font-medium text-islamic-700 font-body">عرض شريط التقدم</span>
            </label>
            
            <div>
              <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">مدة الحركة (مللي ثانية)</label>
              <input
                type="number"
                value={homePageContent.statistics.animationDuration}
                onChange={(e) => {
                  setHomePageContent(prev => ({
                    ...prev,
                    statistics: { ...prev.statistics, animationDuration: parseInt(e.target.value) }
                  }));
                  setHasUnsavedChanges(true);
                }}
                className="form-input"
                min="500"
                max="5000"
                step="100"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">نمط الخلفية</label>
              <select
                value={homePageContent.statistics.backgroundPattern}
                onChange={(e) => {
                  setHomePageContent(prev => ({
                    ...prev,
                    statistics: { ...prev.statistics, backgroundPattern: e.target.value }
                  }));
                  setHasUnsavedChanges(true);
                }}
                className="form-select"
              >
                <option value="none">بدون نمط</option>
                <option value="geometric">هندسي</option>
                <option value="islamic">إسلامي</option>
                <option value="dots">نقاط</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-islamic-800 font-display">العدادات</h4>
            {homePageContent.statistics.counters.map((counter, index) => (
              <div key={index} className="bg-white p-4 rounded-lg border border-sage-200">
                <div className="grid grid-cols-4 gap-2">
                  <input
                    type="text"
                    value={counter.label}
                    onChange={(e) => {
                      const newCounters = [...homePageContent.statistics.counters];
                      newCounters[index].label = e.target.value;
                      setHomePageContent(prev => ({
                        ...prev,
                        statistics: { ...prev.statistics, counters: newCounters }
                      }));
                      setHasUnsavedChanges(true);
                    }}
                    className="form-input text-sm"
                    placeholder="التسمية"
                  />
                  <input
                    type="number"
                    value={counter.value}
                    onChange={(e) => {
                      const newCounters = [...homePageContent.statistics.counters];
                      newCounters[index].value = parseInt(e.target.value);
                      setHomePageContent(prev => ({
                        ...prev,
                        statistics: { ...prev.statistics, counters: newCounters }
                      }));
                      setHasUnsavedChanges(true);
                    }}
                    className="form-input text-sm"
                    placeholder="القيمة"
                  />
                  <input
                    type="number"
                    value={counter.target}
                    onChange={(e) => {
                      const newCounters = [...homePageContent.statistics.counters];
                      newCounters[index].target = parseInt(e.target.value);
                      setHomePageContent(prev => ({
                        ...prev,
                        statistics: { ...prev.statistics, counters: newCounters }
                      }));
                      setHasUnsavedChanges(true);
                    }}
                    className="form-input text-sm"
                    placeholder="الهدف"
                  />
                  <input
                    type="color"
                    value={counter.color}
                    onChange={(e) => {
                      const newCounters = [...homePageContent.statistics.counters];
                      newCounters[index].color = e.target.value;
                      setHomePageContent(prev => ({
                        ...prev,
                        statistics: { ...prev.statistics, counters: newCounters }
                      }));
                      setHasUnsavedChanges(true);
                    }}
                    className="form-input h-10"
                  />
                </div>
              </div>
            ))}
            <button className="w-full btn-outline text-sm">
              <Plus className="w-4 h-4 ml-2" />
              إضافة عداد جديد
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNewsSection = () => (
    <div className="card-islamic">
      <h3 className="text-lg font-semibold text-islamic-800 mb-4 font-display">إعدادات قسم الأخبار</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">عدد الأخبار المعروضة</label>
            <input
              type="number"
              value={homePageContent.news.showCount}
              onChange={(e) => {
                setHomePageContent(prev => ({
                  ...prev,
                  news: { ...prev.news, showCount: parseInt(e.target.value) }
                }));
                setHasUnsavedChanges(true);
              }}
              className="form-input"
              min="1"
              max="10"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">تخطيط العرض</label>
            <select
              value={homePageContent.news.layout}
              onChange={(e) => {
                setHomePageContent(prev => ({
                  ...prev,
                  news: { ...prev.news, layout: e.target.value }
                }));
                setHasUnsavedChanges(true);
              }}
              className="form-select"
            >
              <option value="grid">شبكة</option>
              <option value="list">قائمة</option>
              <option value="carousel">عرض متحرك</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">فترة التحديث التلقائي (ثانية)</label>
            <input
              type="number"
              value={homePageContent.news.refreshInterval / 1000}
              onChange={(e) => {
                setHomePageContent(prev => ({
                  ...prev,
                  news: { ...prev.news, refreshInterval: parseInt(e.target.value) * 1000 }
                }));
                setHasUnsavedChanges(true);
              }}
              className="form-input"
              min="60"
              max="3600"
              step="60"
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-3">
            <label className="flex items-center space-x-2 space-x-reverse">
              <input
                type="checkbox"
                checked={homePageContent.news.showCategories}
                onChange={(e) => {
                  setHomePageContent(prev => ({
                    ...prev,
                    news: { ...prev.news, showCategories: e.target.checked }
                  }));
                  setHasUnsavedChanges(true);
                }}
                className="rounded border-islamic-300 text-islamic-600 focus:ring-islamic-500"
              />
              <span className="text-sm font-medium text-islamic-700 font-body">عرض الفئات</span>
            </label>
            
            <label className="flex items-center space-x-2 space-x-reverse">
              <input
                type="checkbox"
                checked={homePageContent.news.showViewCounts}
                onChange={(e) => {
                  setHomePageContent(prev => ({
                    ...prev,
                    news: { ...prev.news, showViewCounts: e.target.checked }
                  }));
                  setHasUnsavedChanges(true);
                }}
                className="rounded border-islamic-300 text-islamic-600 focus:ring-islamic-500"
              />
              <span className="text-sm font-medium text-islamic-700 font-body">عرض عدد المشاهدات</span>
            </label>
            
            <label className="flex items-center space-x-2 space-x-reverse">
              <input
                type="checkbox"
                checked={homePageContent.news.showDates}
                onChange={(e) => {
                  setHomePageContent(prev => ({
                    ...prev,
                    news: { ...prev.news, showDates: e.target.checked }
                  }));
                  setHasUnsavedChanges(true);
                }}
                className="rounded border-islamic-300 text-islamic-600 focus:ring-islamic-500"
              />
              <span className="text-sm font-medium text-islamic-700 font-body">عرض التواريخ</span>
            </label>
            
            <label className="flex items-center space-x-2 space-x-reverse">
              <input
                type="checkbox"
                checked={homePageContent.news.autoRefresh}
                onChange={(e) => {
                  setHomePageContent(prev => ({
                    ...prev,
                    news: { ...prev.news, autoRefresh: e.target.checked }
                  }));
                  setHasUnsavedChanges(true);
                }}
                className="rounded border-islamic-300 text-islamic-600 focus:ring-islamic-500"
              />
              <span className="text-sm font-medium text-islamic-700 font-body">تحديث تلقائي</span>
            </label>
            
            <label className="flex items-center space-x-2 space-x-reverse">
              <input
                type="checkbox"
                checked={homePageContent.news.showExcerpts}
                onChange={(e) => {
                  setHomePageContent(prev => ({
                    ...prev,
                    news: { ...prev.news, showExcerpts: e.target.checked }
                  }));
                  setHasUnsavedChanges(true);
                }}
                className="rounded border-islamic-300 text-islamic-600 focus:ring-islamic-500"
              />
              <span className="text-sm font-medium text-islamic-700 font-body">عرض المقتطفات</span>
            </label>
            
            <label className="flex items-center space-x-2 space-x-reverse">
              <input
                type="checkbox"
                checked={homePageContent.news.showAuthors}
                onChange={(e) => {
                  setHomePageContent(prev => ({
                    ...prev,
                    news: { ...prev.news, showAuthors: e.target.checked }
                  }));
                  setHasUnsavedChanges(true);
                }}
                className="rounded border-islamic-300 text-islamic-600 focus:ring-islamic-500"
              />
              <span className="text-sm font-medium text-islamic-700 font-body">عرض أسماء المحررين</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnnouncementsSection = () => (
    <div className="card-islamic">
      <h3 className="text-lg font-semibold text-islamic-800 mb-4 font-display">إعدادات قسم الإعلانات</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">عدد الإعلانات المعروضة</label>
            <input
              type="number"
              value={homePageContent.announcements.showCount}
              onChange={(e) => {
                setHomePageContent(prev => ({
                  ...prev,
                  announcements: { ...prev.announcements, showCount: parseInt(e.target.value) }
                }));
                setHasUnsavedChanges(true);
              }}
              className="form-input"
              min="1"
              max="8"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">تخطيط العرض</label>
            <select
              value={homePageContent.announcements.layout}
              onChange={(e) => {
                setHomePageContent(prev => ({
                  ...prev,
                  announcements: { ...prev.announcements, layout: e.target.value }
                }));
                setHasUnsavedChanges(true);
              }}
              className="form-select"
            >
              <option value="cards">بطاقات</option>
              <option value="list">قائمة</option>
              <option value="ticker">شريط متحرك</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">سرعة الشريط المتحرك (ثانية)</label>
            <input
              type="number"
              value={homePageContent.announcements.marqueeSpeed}
              onChange={(e) => {
                setHomePageContent(prev => ({
                  ...prev,
                  announcements: { ...prev.announcements, marqueeSpeed: parseInt(e.target.value) }
                }));
                setHasUnsavedChanges(true);
              }}
              className="form-input"
              min="10"
              max="60"
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-3">
            <label className="flex items-center space-x-2 space-x-reverse">
              <input
                type="checkbox"
                checked={homePageContent.announcements.showPriorities}
                onChange={(e) => {
                  setHomePageContent(prev => ({
                    ...prev,
                    announcements: { ...prev.announcements, showPriorities: e.target.checked }
                  }));
                  setHasUnsavedChanges(true);
                }}
                className="rounded border-islamic-300 text-islamic-600 focus:ring-islamic-500"
              />
              <span className="text-sm font-medium text-islamic-700 font-body">عرض الأولويات</span>
            </label>
            
            <label className="flex items-center space-x-2 space-x-reverse">
              <input
                type="checkbox"
                checked={homePageContent.announcements.showExpiry}
                onChange={(e) => {
                  setHomePageContent(prev => ({
                    ...prev,
                    announcements: { ...prev.announcements, showExpiry: e.target.checked }
                  }));
                  setHasUnsavedChanges(true);
                }}
                className="rounded border-islamic-300 text-islamic-600 focus:ring-islamic-500"
              />
              <span className="text-sm font-medium text-islamic-700 font-body">عرض تاريخ الانتهاء</span>
            </label>
            
            <label className="flex items-center space-x-2 space-x-reverse">
              <input
                type="checkbox"
                checked={homePageContent.announcements.highlightUrgent}
                onChange={(e) => {
                  setHomePageContent(prev => ({
                    ...prev,
                    announcements: { ...prev.announcements, highlightUrgent: e.target.checked }
                  }));
                  setHasUnsavedChanges(true);
                }}
                className="rounded border-islamic-300 text-islamic-600 focus:ring-islamic-500"
              />
              <span className="text-sm font-medium text-islamic-700 font-body">تمييز الإعلانات العاجلة</span>
            </label>
            
            <label className="flex items-center space-x-2 space-x-reverse">
              <input
                type="checkbox"
                checked={homePageContent.announcements.showIcons}
                onChange={(e) => {
                  setHomePageContent(prev => ({
                    ...prev,
                    announcements: { ...prev.announcements, showIcons: e.target.checked }
                  }));
                  setHasUnsavedChanges(true);
                }}
                className="rounded border-islamic-300 text-islamic-600 focus:ring-islamic-500"
              />
              <span className="text-sm font-medium text-islamic-700 font-body">عرض الأيقونات</span>
            </label>
            
            <label className="flex items-center space-x-2 space-x-reverse">
              <input
                type="checkbox"
                checked={homePageContent.announcements.enableMarquee}
                onChange={(e) => {
                  setHomePageContent(prev => ({
                    ...prev,
                    announcements: { ...prev.announcements, enableMarquee: e.target.checked }
                  }));
                  setHasUnsavedChanges(true);
                }}
                className="rounded border-islamic-300 text-islamic-600 focus:ring-islamic-500"
              />
              <span className="text-sm font-medium text-islamic-700 font-body">تفعيل الشريط المتحرك</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderServicesSection = () => (
    <div className="card-islamic">
      <h3 className="text-lg font-semibold text-islamic-800 mb-4 font-display">إعدادات قسم الخدمات</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">تخطيط العرض</label>
            <select
              value={homePageContent.services.layout}
              onChange={(e) => {
                setHomePageContent(prev => ({
                  ...prev,
                  services: { ...prev.services, layout: e.target.value }
                }));
                setHasUnsavedChanges(true);
              }}
              className="form-select"
            >
              <option value="grid">شبكة</option>
              <option value="tabs">تبويبات</option>
              <option value="accordion">أكورديون</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">نص زر الدعوة للعمل</label>
            <input
              type="text"
              value={homePageContent.services.ctaText}
              onChange={(e) => {
                setHomePageContent(prev => ({
                  ...prev,
                  services: { ...prev.services, ctaText: e.target.value }
                }));
                setHasUnsavedChanges(true);
              }}
              className="form-input"
              placeholder="نص الزر"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">رابط زر الدعوة للعمل</label>
            <input
              type="text"
              value={homePageContent.services.ctaLink}
              onChange={(e) => {
                setHomePageContent(prev => ({
                  ...prev,
                  services: { ...prev.services, ctaLink: e.target.value }
                }));
                setHasUnsavedChanges(true);
              }}
              className="form-input"
              placeholder="/services"
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-semibold text-islamic-800 font-display">فئات الخدمات</h4>
          <div className="space-y-2">
            {['zakat', 'mosques', 'endowments', 'religious'].map((category) => (
              <label key={category} className="flex items-center space-x-2 space-x-reverse">
                <input
                  type="checkbox"
                  checked={homePageContent.services.tabCategories.includes(category)}
                  onChange={(e) => {
                    const newCategories = e.target.checked 
                      ? [...homePageContent.services.tabCategories, category]
                      : homePageContent.services.tabCategories.filter(c => c !== category);
                    setHomePageContent(prev => ({
                      ...prev,
                      services: { ...prev.services, tabCategories: newCategories }
                    }));
                    setHasUnsavedChanges(true);
                  }}
                  className="rounded border-islamic-300 text-islamic-600 focus:ring-islamic-500"
                />
                <span className="text-sm font-medium text-islamic-700 font-body">
                  {category === 'zakat' ? 'خدمات الزكاة' :
                   category === 'mosques' ? 'شؤون المساجد' :
                   category === 'endowments' ? 'خدمات الأوقاف' : 'الشؤون الدينية'}
                </span>
              </label>
            ))}
          </div>
          
          <div className="space-y-3">
            <label className="flex items-center space-x-2 space-x-reverse">
              <input
                type="checkbox"
                checked={homePageContent.services.showTabs}
                onChange={(e) => {
                  setHomePageContent(prev => ({
                    ...prev,
                    services: { ...prev.services, showTabs: e.target.checked }
                  }));
                  setHasUnsavedChanges(true);
                }}
                className="rounded border-islamic-300 text-islamic-600 focus:ring-islamic-500"
              />
              <span className="text-sm font-medium text-islamic-700 font-body">عرض التبويبات</span>
            </label>
            
            <label className="flex items-center space-x-2 space-x-reverse">
              <input
                type="checkbox"
                checked={homePageContent.services.showIcons}
                onChange={(e) => {
                  setHomePageContent(prev => ({
                    ...prev,
                    services: { ...prev.services, showIcons: e.target.checked }
                  }));
                  setHasUnsavedChanges(true);
                }}
                className="rounded border-islamic-300 text-islamic-600 focus:ring-islamic-500"
              />
              <span className="text-sm font-medium text-islamic-700 font-body">عرض الأيقونات</span>
            </label>
            
            <label className="flex items-center space-x-2 space-x-reverse">
              <input
                type="checkbox"
                checked={homePageContent.services.showCTA}
                onChange={(e) => {
                  setHomePageContent(prev => ({
                    ...prev,
                    services: { ...prev.services, showCTA: e.target.checked }
                  }));
                  setHasUnsavedChanges(true);
                }}
                className="rounded border-islamic-300 text-islamic-600 focus:ring-islamic-500"
              />
              <span className="text-sm font-medium text-islamic-700 font-body">عرض زر الدعوة للعمل</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderEventsSection = () => (
    <div className="card-islamic">
      <h3 className="text-lg font-semibold text-islamic-800 mb-4 font-display">إعدادات قسم الفعاليات</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-3">
            <label className="flex items-center space-x-2 space-x-reverse">
              <input
                type="checkbox"
                checked={homePageContent.events.showTabs}
                onChange={(e) => {
                  setHomePageContent(prev => ({
                    ...prev,
                    events: { ...prev.events, showTabs: e.target.checked }
                  }));
                  setHasUnsavedChanges(true);
                }}
                className="rounded border-islamic-300 text-islamic-600 focus:ring-islamic-500"
              />
              <span className="text-sm font-medium text-islamic-700 font-body">عرض التبويبات</span>
            </label>
            
            <label className="flex items-center space-x-2 space-x-reverse">
              <input
                type="checkbox"
                checked={homePageContent.events.showImages}
                onChange={(e) => {
                  setHomePageContent(prev => ({
                    ...prev,
                    events: { ...prev.events, showImages: e.target.checked }
                  }));
                  setHasUnsavedChanges(true);
                }}
                className="rounded border-islamic-300 text-islamic-600 focus:ring-islamic-500"
              />
              <span className="text-sm font-medium text-islamic-700 font-body">عرض الصور</span>
            </label>
            
            <label className="flex items-center space-x-2 space-x-reverse">
              <input
                type="checkbox"
                checked={homePageContent.events.showRegistration}
                onChange={(e) => {
                  setHomePageContent(prev => ({
                    ...prev,
                    events: { ...prev.events, showRegistration: e.target.checked }
                  }));
                  setHasUnsavedChanges(true);
                }}
                className="rounded border-islamic-300 text-islamic-600 focus:ring-islamic-500"
              />
              <span className="text-sm font-medium text-islamic-700 font-body">عرض أزرار التسجيل</span>
            </label>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-3">
            <label className="flex items-center space-x-2 space-x-reverse">
              <input
                type="checkbox"
                checked={homePageContent.events.showLocation}
                onChange={(e) => {
                  setHomePageContent(prev => ({
                    ...prev,
                    events: { ...prev.events, showLocation: e.target.checked }
                  }));
                  setHasUnsavedChanges(true);
                }}
                className="rounded border-islamic-300 text-islamic-600 focus:ring-islamic-500"
              />
              <span className="text-sm font-medium text-islamic-700 font-body">عرض المواقع</span>
            </label>
            
            <label className="flex items-center space-x-2 space-x-reverse">
              <input
                type="checkbox"
                checked={homePageContent.events.showTime}
                onChange={(e) => {
                  setHomePageContent(prev => ({
                    ...prev,
                    events: { ...prev.events, showTime: e.target.checked }
                  }));
                  setHasUnsavedChanges(true);
                }}
                className="rounded border-islamic-300 text-islamic-600 focus:ring-islamic-500"
              />
              <span className="text-sm font-medium text-islamic-700 font-body">عرض الأوقات</span>
            </label>
            
            <label className="flex items-center space-x-2 space-x-reverse">
              <input
                type="checkbox"
                checked={homePageContent.events.enableRegistration}
                onChange={(e) => {
                  setHomePageContent(prev => ({
                    ...prev,
                    events: { ...prev.events, enableRegistration: e.target.checked }
                  }));
                  setHasUnsavedChanges(true);
                }}
                className="rounded border-islamic-300 text-islamic-600 focus:ring-islamic-500"
              />
              <span className="text-sm font-medium text-islamic-700 font-body">تفعيل التسجيل المباشر</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMediaSection = () => (
    <div className="card-islamic">
      <h3 className="text-lg font-semibold text-islamic-800 mb-4 font-display">إعدادات معرض الوسائط</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">عدد العناصر المعروضة</label>
            <input
              type="number"
              value={homePageContent.media.showCount}
              onChange={(e) => {
                setHomePageContent(prev => ({
                  ...prev,
                  media: { ...prev.media, showCount: parseInt(e.target.value) }
                }));
                setHasUnsavedChanges(true);
              }}
              className="form-input"
              min="3"
              max="12"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">تخطيط العرض</label>
            <select
              value={homePageContent.media.layout}
              onChange={(e) => {
                setHomePageContent(prev => ({
                  ...prev,
                  media: { ...prev.media, layout: e.target.value }
                }));
                setHasUnsavedChanges(true);
              }}
              className="form-select"
            >
              <option value="grid">شبكة</option>
              <option value="masonry">بناء حجري</option>
              <option value="carousel">عرض متحرك</option>
            </select>
          </div>
          
          <div className="space-y-3">
            <label className="flex items-center space-x-2 space-x-reverse">
              <input
                type="checkbox"
                checked={homePageContent.media.showTabs}
                onChange={(e) => {
                  setHomePageContent(prev => ({
                    ...prev,
                    media: { ...prev.media, showTabs: e.target.checked }
                  }));
                  setHasUnsavedChanges(true);
                }}
                className="rounded border-islamic-300 text-islamic-600 focus:ring-islamic-500"
              />
              <span className="text-sm font-medium text-islamic-700 font-body">عرض تبويبات الوسائط</span>
            </label>
            
            <label className="flex items-center space-x-2 space-x-reverse">
              <input
                type="checkbox"
                checked={homePageContent.media.showTitles}
                onChange={(e) => {
                  setHomePageContent(prev => ({
                    ...prev,
                    media: { ...prev.media, showTitles: e.target.checked }
                  }));
                  setHasUnsavedChanges(true);
                }}
                className="rounded border-islamic-300 text-islamic-600 focus:ring-islamic-500"
              />
              <span className="text-sm font-medium text-islamic-700 font-body">عرض العناوين</span>
            </label>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-3">
            <label className="flex items-center space-x-2 space-x-reverse">
              <input
                type="checkbox"
                checked={homePageContent.media.showDurations}
                onChange={(e) => {
                  setHomePageContent(prev => ({
                    ...prev,
                    media: { ...prev.media, showDurations: e.target.checked }
                  }));
                  setHasUnsavedChanges(true);
                }}
                className="rounded border-islamic-300 text-islamic-600 focus:ring-islamic-500"
              />
              <span className="text-sm font-medium text-islamic-700 font-body">عرض مدة الفيديوهات</span>
            </label>
            
            <label className="flex items-center space-x-2 space-x-reverse">
              <input
                type="checkbox"
                checked={homePageContent.media.autoplay}
                onChange={(e) => {
                  setHomePageContent(prev => ({
                    ...prev,
                    media: { ...prev.media, autoplay: e.target.checked }
                  }));
                  setHasUnsavedChanges(true);
                }}
                className="rounded border-islamic-300 text-islamic-600 focus:ring-islamic-500"
              />
              <span className="text-sm font-medium text-islamic-700 font-body">تشغيل تلقائي للفيديوهات</span>
            </label>
            
            <label className="flex items-center space-x-2 space-x-reverse">
              <input
                type="checkbox"
                checked={homePageContent.media.enableLightbox}
                onChange={(e) => {
                  setHomePageContent(prev => ({
                    ...prev,
                    media: { ...prev.media, enableLightbox: e.target.checked }
                  }));
                  setHasUnsavedChanges(true);
                }}
                className="rounded border-islamic-300 text-islamic-600 focus:ring-islamic-500"
              />
              <span className="text-sm font-medium text-islamic-700 font-body">تفعيل العرض المكبر</span>
            </label>
            
            <label className="flex items-center space-x-2 space-x-reverse">
              <input
                type="checkbox"
                checked={homePageContent.media.showControls}
                onChange={(e) => {
                  setHomePageContent(prev => ({
                    ...prev,
                    media: { ...prev.media, showControls: e.target.checked }
                  }));
                  setHasUnsavedChanges(true);
                }}
                className="rounded border-islamic-300 text-islamic-600 focus:ring-islamic-500"
              />
              <span className="text-sm font-medium text-islamic-700 font-body">عرض أدوات التحكم</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSocialSection = () => (
    <div className="card-islamic">
      <h3 className="text-lg font-semibold text-islamic-800 mb-4 font-display">إعدادات وسائل التواصل الاجتماعي</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="font-semibold text-islamic-800 font-display">المنصات المعروضة</h4>
          <div className="space-y-2">
            {['facebook', 'twitter', 'instagram', 'youtube', 'linkedin', 'whatsapp'].map((platform) => (
              <label key={platform} className="flex items-center space-x-2 space-x-reverse">
                <input
                  type="checkbox"
                  checked={homePageContent.social.platforms.includes(platform)}
                  onChange={(e) => {
                    const newPlatforms = e.target.checked 
                      ? [...homePageContent.social.platforms, platform]
                      : homePageContent.social.platforms.filter(p => p !== platform);
                    setHomePageContent(prev => ({
                      ...prev,
                      social: { ...prev.social, platforms: newPlatforms }
                    }));
                    setHasUnsavedChanges(true);
                  }}
                  className="rounded border-islamic-300 text-islamic-600 focus:ring-islamic-500"
                />
                <span className="text-sm font-medium text-islamic-700 font-body capitalize">
                  {platform === 'facebook' ? 'فيسبوك' :
                   platform === 'twitter' ? 'تويتر' :
                   platform === 'instagram' ? 'إنستغرام' :
                   platform === 'youtube' ? 'يوتيوب' :
                   platform === 'linkedin' ? 'لينكد إن' : 'واتساب'}
                </span>
              </label>
            ))}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">عدد المنشورات المعروضة</label>
            <input
              type="number"
              value={homePageContent.social.postsCount}
              onChange={(e) => {
                setHomePageContent(prev => ({
                  ...prev,
                  social: { ...prev.social, postsCount: parseInt(e.target.value) }
                }));
                setHasUnsavedChanges(true);
              }}
              className="form-input"
              min="1"
              max="5"
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-3">
            <label className="flex items-center space-x-2 space-x-reverse">
              <input
                type="checkbox"
                checked={homePageContent.social.showFollowers}
                onChange={(e) => {
                  setHomePageContent(prev => ({
                    ...prev,
                    social: { ...prev.social, showFollowers: e.target.checked }
                  }));
                  setHasUnsavedChanges(true);
                }}
                className="rounded border-islamic-300 text-islamic-600 focus:ring-islamic-500"
              />
              <span className="text-sm font-medium text-islamic-700 font-body">عرض عدد المتابعين</span>
            </label>
            
            <label className="flex items-center space-x-2 space-x-reverse">
              <input
                type="checkbox"
                checked={homePageContent.social.showRecentPosts}
                onChange={(e) => {
                  setHomePageContent(prev => ({
                    ...prev,
                    social: { ...prev.social, showRecentPosts: e.target.checked }
                  }));
                  setHasUnsavedChanges(true);
                }}
                className="rounded border-islamic-300 text-islamic-600 focus:ring-islamic-500"
              />
              <span className="text-sm font-medium text-islamic-700 font-body">عرض المنشورات الأخيرة</span>
            </label>
            
            <label className="flex items-center space-x-2 space-x-reverse">
              <input
                type="checkbox"
                checked={homePageContent.social.autoUpdate}
                onChange={(e) => {
                  setHomePageContent(prev => ({
                    ...prev,
                    social: { ...prev.social, autoUpdate: e.target.checked }
                  }));
                  setHasUnsavedChanges(true);
                }}
                className="rounded border-islamic-300 text-islamic-600 focus:ring-islamic-500"
              />
              <span className="text-sm font-medium text-islamic-700 font-body">تحديث تلقائي</span>
            </label>
            
            <label className="flex items-center space-x-2 space-x-reverse">
              <input
                type="checkbox"
                checked={homePageContent.social.showEngagement}
                onChange={(e) => {
                  setHomePageContent(prev => ({
                    ...prev,
                    social: { ...prev.social, showEngagement: e.target.checked }
                  }));
                  setHasUnsavedChanges(true);
                }}
                className="rounded border-islamic-300 text-islamic-600 focus:ring-islamic-500"
              />
              <span className="text-sm font-medium text-islamic-700 font-body">عرض إحصائيات التفاعل</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContactSection = () => (
    <div className="card-islamic">
      <h3 className="text-lg font-semibold text-islamic-800 mb-4 font-display">إعدادات قسم معلومات التواصل</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-3">
            <label className="flex items-center space-x-2 space-x-reverse">
              <input
                type="checkbox"
                checked={homePageContent.contact.showForm}
                onChange={(e) => {
                  setHomePageContent(prev => ({
                    ...prev,
                    contact: { ...prev.contact, showForm: e.target.checked }
                  }));
                  setHasUnsavedChanges(true);
                }}
                className="rounded border-islamic-300 text-islamic-600 focus:ring-islamic-500"
              />
              <span className="text-sm font-medium text-islamic-700 font-body">عرض نموذج التواصل</span>
            </label>
            
            <label className="flex items-center space-x-2 space-x-reverse">
              <input
                type="checkbox"
                checked={homePageContent.contact.showOffices}
                onChange={(e) => {
                  setHomePageContent(prev => ({
                    ...prev,
                    contact: { ...prev.contact, showOffices: e.target.checked }
                  }));
                  setHasUnsavedChanges(true);
                }}
                className="rounded border-islamic-300 text-islamic-600 focus:ring-islamic-500"
              />
              <span className="text-sm font-medium text-islamic-700 font-body">عرض المكاتب الفرعية</span>
            </label>
            
            <label className="flex items-center space-x-2 space-x-reverse">
              <input
                type="checkbox"
                checked={homePageContent.contact.showMap}
                onChange={(e) => {
                  setHomePageContent(prev => ({
                    ...prev,
                    contact: { ...prev.contact, showMap: e.target.checked }
                  }));
                  setHasUnsavedChanges(true);
                }}
                className="rounded border-islamic-300 text-islamic-600 focus:ring-islamic-500"
              />
              <span className="text-sm font-medium text-islamic-700 font-body">عرض الخريطة</span>
            </label>
            
            <label className="flex items-center space-x-2 space-x-reverse">
              <input
                type="checkbox"
                checked={homePageContent.contact.showWorkingHours}
                onChange={(e) => {
                  setHomePageContent(prev => ({
                    ...prev,
                    contact: { ...prev.contact, showWorkingHours: e.target.checked }
                  }));
                  setHasUnsavedChanges(true);
                }}
                className="rounded border-islamic-300 text-islamic-600 focus:ring-islamic-500"
              />
              <span className="text-sm font-medium text-islamic-700 font-body">عرض ساعات العمل</span>
            </label>
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-semibold text-islamic-800 font-display">حقول النموذج</h4>
          <div className="space-y-2">
            {['name', 'email', 'phone', 'subject', 'message', 'department'].map((field) => (
              <label key={field} className="flex items-center space-x-2 space-x-reverse">
                <input
                  type="checkbox"
                  checked={homePageContent.contact.formFields.includes(field)}
                  onChange={(e) => {
                    const newFields = e.target.checked 
                      ? [...homePageContent.contact.formFields, field]
                      : homePageContent.contact.formFields.filter(f => f !== field);
                    setHomePageContent(prev => ({
                      ...prev,
                      contact: { ...prev.contact, formFields: newFields }
                    }));
                    setHasUnsavedChanges(true);
                  }}
                  className="rounded border-islamic-300 text-islamic-600 focus:ring-islamic-500"
                />
                <span className="text-sm font-medium text-islamic-700 font-body">
                  {field === 'name' ? 'الاسم' :
                   field === 'email' ? 'البريد الإلكتروني' :
                   field === 'phone' ? 'الهاتف' :
                   field === 'subject' ? 'الموضوع' :
                   field === 'message' ? 'الرسالة' : 'القسم'}
                </span>
              </label>
            ))}
          </div>
          
          <div className="space-y-3">
            <label className="flex items-center space-x-2 space-x-reverse">
              <input
                type="checkbox"
                checked={homePageContent.contact.enableDirectContact}
                onChange={(e) => {
                  setHomePageContent(prev => ({
                    ...prev,
                    contact: { ...prev.contact, enableDirectContact: e.target.checked }
                  }));
                  setHasUnsavedChanges(true);
                }}
                className="rounded border-islamic-300 text-islamic-600 focus:ring-islamic-500"
              />
              <span className="text-sm font-medium text-islamic-700 font-body">تفعيل التواصل المباشر</span>
            </label>
            
            <label className="flex items-center space-x-2 space-x-reverse">
              <input
                type="checkbox"
                checked={homePageContent.contact.showEmergencyContacts}
                onChange={(e) => {
                  setHomePageContent(prev => ({
                    ...prev,
                    contact: { ...prev.contact, showEmergencyContacts: e.target.checked }
                  }));
                  setHasUnsavedChanges(true);
                }}
                className="rounded border-islamic-300 text-islamic-600 focus:ring-islamic-500"
              />
              <span className="text-sm font-medium text-islamic-700 font-body">عرض أرقام الطوارئ</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'hero':
        return renderHeroSection();
      case 'minister':
        return renderMinisterSection();
      case 'statistics':
        return renderStatisticsSection();
      case 'news':
        return renderNewsSection();
      case 'announcements':
        return renderAnnouncementsSection();
      case 'services':
        return renderServicesSection();
      case 'events':
        return renderEventsSection();
      case 'media':
        return renderMediaSection();
      case 'social':
        return renderSocialSection();
      case 'contact':
        return renderContactSection();
      default:
        return (
          <div className="card-islamic">
            <div className="text-center py-12">
              <Settings className="w-16 h-16 text-islamic-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-islamic-600 mb-2 font-display">قسم {sections.find(s => s.id === activeSection)?.name}</h3>
              <p className="text-sage-600 font-body">إعدادات هذا القسم متاحة الآن</p>
            </div>
          </div>
        );
    }
  };

  const renderPagesManagement = () => (
    <div className="space-y-6">
      <div className="card-islamic">
        <h3 className="text-lg font-semibold text-islamic-800 mb-4 font-display">إدارة صفحات الموقع</h3>
        <p className="text-sage-600 mb-6 font-body">إدارة جميع صفحات الموقع وتفعيلها أو إخفاؤها</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pages.map((page) => (
            <div key={page.id} className="bg-white border border-sage-200 rounded-xl p-4 hover:shadow-md transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="p-2 bg-islamic-100 rounded-lg">
                    <page.icon className="w-5 h-5 text-islamic-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-islamic-800 font-display">{page.name}</h4>
                    <p className="text-xs text-sage-600 font-body">{page.route}</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked={page.enabled}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>

              <div className="flex space-x-2 space-x-reverse">
                <button className="flex-1 btn-outline text-xs py-2">
                  <Edit className="w-3 h-3 ml-1" />
                  تعديل
                </button>
                <button className="flex-1 btn-outline text-xs py-2">
                  <Eye className="w-3 h-3 ml-1" />
                  معاينة
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card-sage">
          <h3 className="text-lg font-semibold text-sage-800 mb-4 font-display">إضافة صفحة جديدة</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-sage-700 mb-2 font-body">اسم الصفحة</label>
              <input type="text" className="form-input" placeholder="أدخل اسم الصفحة" />
            </div>
            <div>
              <label className="block text-sm font-medium text-sage-700 mb-2 font-body">المسار</label>
              <input type="text" className="form-input" placeholder="/page-route" />
            </div>
            <div>
              <label className="block text-sm font-medium text-sage-700 mb-2 font-body">القالب</label>
              <select className="form-select">
                <option>صفحة عامة</option>
                <option>صفحة مع صور</option>
                <option>صفحة مع نموذج</option>
              </select>
            </div>
            <button className="w-full btn-primary">
              <Plus className="w-5 h-5 ml-2" />
              إضافة الصفحة
            </button>
          </div>
        </div>

        <div className="card-golden">
          <h3 className="text-lg font-semibold text-golden-800 mb-4 font-display">إحصائيات الصفحات</h3>
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4 border border-golden-200">
              <div className="flex items-center justify-between">
                <span className="text-sm text-sage-700 font-body">عدد الصفحات النشطة</span>
                <span className="text-2xl font-bold text-islamic-600 font-display">{pages.filter(p => p.enabled).length}</span>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-golden-200">
              <div className="flex items-center justify-between">
                <span className="text-sm text-sage-700 font-body">إجمالي الصفحات</span>
                <span className="text-2xl font-bold text-sage-600 font-display">{pages.length}</span>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-golden-200">
              <div className="flex items-center justify-between">
                <span className="text-sm text-sage-700 font-body">آخر تحديث</span>
                <span className="text-sm text-sage-600 font-body">منذ ساعتين</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderServicesManagement = () => (
    <div className="space-y-6">
      {serviceCategories.map((category) => (
        <div key={category.id} className="card-islamic">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="p-3 bg-islamic-100 rounded-xl">
                <category.icon className={`w-6 h-6 ${category.color}`} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-islamic-800 font-display">{category.name}</h3>
                <p className="text-sm text-sage-600 font-body">{category.services.length} خدمة متاحة</p>
              </div>
            </div>
            <button className="btn-primary text-sm">
              <Plus className="w-4 h-4 ml-2" />
              إضافة خدمة
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {category.services.map((service) => (
              <div key={service.id} className="bg-white border border-sage-200 rounded-xl p-4 hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-islamic-800 mb-1 font-display">{service.name}</h4>
                    <p className="text-sm text-sage-600 font-body">{service.description}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked={service.enabled}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>

                <div className="flex space-x-2 space-x-reverse mt-3 pt-3 border-t border-sage-100">
                  <button className="flex-1 btn-outline text-xs py-2">
                    <Edit className="w-3 h-3 ml-1" />
                    تعديل
                  </button>
                  <button className="flex-1 btn-outline text-xs py-2">
                    <BarChart3 className="w-3 h-3 ml-1" />
                    إحصائيات
                  </button>
                  <button className="btn-outline text-xs py-2 px-3">
                    <Trash2 className="w-3 h-3 text-red-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="card-golden">
        <h3 className="text-lg font-semibold text-golden-800 mb-4 font-display">إحصائيات الخدمات</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 border border-golden-200 text-center">
            <div className="text-3xl font-bold text-islamic-600 mb-1 font-display">
              {serviceCategories.reduce((acc, cat) => acc + cat.services.length, 0)}
            </div>
            <div className="text-sm text-sage-600 font-body">إجمالي الخدمات</div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-golden-200 text-center">
            <div className="text-3xl font-bold text-green-600 mb-1 font-display">
              {serviceCategories.reduce((acc, cat) => acc + cat.services.filter(s => s.enabled).length, 0)}
            </div>
            <div className="text-sm text-sage-600 font-body">الخدمات النشطة</div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-golden-200 text-center">
            <div className="text-3xl font-bold text-golden-600 mb-1 font-display">{serviceCategories.length}</div>
            <div className="text-sm text-sage-600 font-body">فئات الخدمات</div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-golden-200 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1 font-display">342</div>
            <div className="text-sm text-sage-600 font-body">طلب اليوم</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNavigationManagement = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card-islamic">
          <h3 className="text-lg font-semibold text-islamic-800 mb-4 font-display">القائمة الرئيسية</h3>
          <p className="text-sm text-sage-600 mb-4 font-body">إدارة عناصر القائمة الرئيسية في الموقع</p>

          <div className="space-y-3">
            {[
              { label: 'الرئيسية', route: '/', icon: Home },
              { label: 'من نحن', route: '/about', icon: Info },
              { label: 'الخدمات', route: '/services', icon: Settings },
              { label: 'الأخبار', route: '/news', icon: Newspaper },
              { label: 'اتصل بنا', route: '/contact', icon: Phone }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white border border-sage-200 rounded-lg hover:shadow-md transition-all">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="cursor-move">
                    <Move className="w-4 h-4 text-sage-400" />
                  </div>
                  <item.icon className="w-4 h-4 text-islamic-600" />
                  <span className="font-medium text-islamic-800 font-body">{item.label}</span>
                  <span className="text-xs text-sage-500 font-body">{item.route}</span>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <button className="p-1 hover:bg-sage-100 rounded">
                    <Edit className="w-4 h-4 text-sage-600" />
                  </button>
                  <button className="p-1 hover:bg-red-100 rounded">
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full btn-outline mt-4">
            <Plus className="w-4 h-4 ml-2" />
            إضافة عنصر جديد
          </button>
        </div>

        <div className="card-sage">
          <h3 className="text-lg font-semibold text-sage-800 mb-4 font-display">القوائم الفرعية</h3>
          <p className="text-sm text-sage-600 mb-4 font-body">إدارة القوائم المنسدلة والفرعية</p>

          <div className="space-y-4">
            <div className="bg-white border border-sage-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-sage-800 font-display">من نحن</h4>
                <button className="text-sm text-islamic-600 hover:text-islamic-700 font-body">
                  تعديل
                </button>
              </div>
              <div className="space-y-2 mr-4">
                {['الرؤية والرسالة', 'الهيكل التنظيمي', 'الوزراء السابقون'].map((item, index) => (
                  <div key={index} className="flex items-center space-x-2 space-x-reverse text-sm text-sage-600 font-body">
                    <div className="w-1 h-1 rounded-full bg-sage-400"></div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-sage-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-sage-800 font-display">الخدمات</h4>
                <button className="text-sm text-islamic-600 hover:text-islamic-700 font-body">
                  تعديل
                </button>
              </div>
              <div className="space-y-2 mr-4">
                {['خدمات الزكاة', 'شؤون المساجد', 'خدمات الأوقاف', 'الشؤون الدينية'].map((item, index) => (
                  <div key={index} className="flex items-center space-x-2 space-x-reverse text-sm text-sage-600 font-body">
                    <div className="w-1 h-1 rounded-full bg-sage-400"></div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card-golden">
        <h3 className="text-lg font-semibold text-golden-800 mb-4 font-display">الروابط السريعة</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'حاسبة الزكاة', icon: Calculator },
            { name: 'دليل المساجد', icon: Building },
            { name: 'الاستفتاء الشرعي', icon: BookOpen },
            { name: 'خطب الجمعة', icon: Megaphone },
            { name: 'مواقيت الصلاة', icon: Clock },
            { name: 'الإعلانات', icon: Bell },
            { name: 'الفعاليات', icon: Calendar },
            { name: 'التواصل', icon: Phone }
          ].map((item, index) => (
            <div key={index} className="bg-white border border-golden-200 rounded-lg p-4 text-center hover:shadow-md transition-all cursor-pointer">
              <item.icon className="w-8 h-8 text-golden-600 mx-auto mb-2" />
              <span className="text-sm text-sage-800 font-body">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="heading-1 text-islamic-800">إدارة الموقع المتقدمة</h1>
          <p className="body-text text-sage-600 mt-2">إدارة شاملة لجميع صفحات وخدمات ومحتويات الموقع</p>
        </div>
        <div className="flex items-center space-x-4 space-x-reverse">
          <div className="flex items-center space-x-2 space-x-reverse">
            <button
              onClick={() => setPreviewMode('desktop')}
              className={`p-2 rounded-lg ${previewMode === 'desktop' ? 'bg-islamic-600 text-white' : 'bg-gray-200 text-gray-600'}`}
            >
              <Monitor className="w-5 h-5" />
            </button>
            <button
              onClick={() => setPreviewMode('tablet')}
              className={`p-2 rounded-lg ${previewMode === 'tablet' ? 'bg-islamic-600 text-white' : 'bg-gray-200 text-gray-600'}`}
            >
              <Tablet className="w-5 h-5" />
            </button>
            <button
              onClick={() => setPreviewMode('mobile')}
              className={`p-2 rounded-lg ${previewMode === 'mobile' ? 'bg-islamic-600 text-white' : 'bg-gray-200 text-gray-600'}`}
            >
              <Smartphone className="w-5 h-5" />
            </button>
          </div>
          <button 
            onClick={handlePreview}
            className="btn-secondary"
          >
            <Eye className="w-5 h-5 ml-2" />
            معاينة مباشرة
          </button>
          <button 
            onClick={handleSave}
            disabled={!hasUnsavedChanges}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-5 h-5 ml-2" />
            حفظ التغييرات
          </button>
        </div>
      </div>

      {/* Unsaved Changes Warning */}
      {hasUnsavedChanges && (
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
          <div className="flex items-center space-x-3 space-x-reverse">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            <div>
              <p className="font-semibold text-orange-800 font-body">تغييرات غير محفوظة</p>
              <p className="text-orange-700 text-sm font-body">لديك تغييرات غير محفوظة. تأكد من حفظها قبل المغادرة.</p>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <button onClick={handleSave} className="btn-primary text-sm">
                حفظ الآن
              </button>
              <button onClick={handleReset} className="btn-outline text-sm">
                تراجع
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Tabs */}
      <div className="bg-white rounded-2xl shadow-elegant p-2">
        <div className="flex space-x-2 space-x-reverse">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 space-x-reverse px-6 py-3 rounded-xl transition-all duration-300 font-body ${
                activeTab === tab.id
                  ? 'bg-islamic-600 text-white shadow-islamic'
                  : 'text-sage-700 hover:bg-sage-50'
              }`}
            >
              <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-white' : 'text-sage-600'}`} />
              <span className="font-medium">{tab.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Section Navigation - Only for Homepage Tab */}
      {activeTab === 'homepage' && (
        <div className="bg-white rounded-2xl shadow-elegant p-4">
          <div className="flex flex-wrap gap-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center space-x-2 space-x-reverse px-4 py-3 rounded-xl transition-all duration-300 font-body ${
                  activeSection === section.id
                    ? 'bg-islamic-600 text-white shadow-islamic'
                    : 'text-sage-700 hover:bg-islamic-50 hover:text-islamic-700'
                }`}
              >
                <section.icon className={`w-5 h-5 ${activeSection === section.id ? 'text-white' : section.color}`} />
                <span className="font-medium">{section.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Content */}
      {activeTab === 'homepage' && renderContent()}
      {activeTab === 'pages' && renderPagesManagement()}
      {activeTab === 'services' && renderServicesManagement()}
      {activeTab === 'navigation' && renderNavigationManagement()}

      {/* Quick Actions */}
      <div className="card-sage">
        <h3 className="text-lg font-semibold text-sage-800 mb-4 font-display">إجراءات سريعة</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button 
            onClick={() => info('استيراد المحتوى', 'سيتم فتح نافذة استيراد المحتوى')}
            className="flex flex-col items-center p-4 border border-sage-200 rounded-lg hover:bg-sage-50 transition-colors"
          >
            <Upload className="w-8 h-8 text-sage-600 mb-2" />
            <span className="text-sm font-medium text-sage-800 font-body">استيراد محتوى</span>
          </button>
          
          <button 
            onClick={() => success('تصدير المحتوى', 'سيتم تحميل ملف المحتوى')}
            className="flex flex-col items-center p-4 border border-sage-200 rounded-lg hover:bg-sage-50 transition-colors"
          >
            <Download className="w-8 h-8 text-sage-600 mb-2" />
            <span className="text-sm font-medium text-sage-800 font-body">تصدير محتوى</span>
          </button>
          
          <button 
            onClick={() => info('نسخ احتياطي', 'سيتم إنشاء نسخة احتياطية من المحتوى')}
            className="flex flex-col items-center p-4 border border-sage-200 rounded-lg hover:bg-sage-50 transition-colors"
          >
            <Shield className="w-8 h-8 text-sage-600 mb-2" />
            <span className="text-sm font-medium text-sage-800 font-body">نسخ احتياطي</span>
          </button>
          
          <button 
            onClick={() => info('إعادة تعيين', 'سيتم استرجاع الإعدادات الافتراضية')}
            className="flex flex-col items-center p-4 border border-sage-200 rounded-lg hover:bg-sage-50 transition-colors"
          >
            <RotateCcw className="w-8 h-8 text-sage-600 mb-2" />
            <span className="text-sm font-medium text-sage-800 font-body">إعادة تعيين</span>
          </button>
        </div>
      </div>

      {/* Global Settings */}
      <div className="card-golden">
        <h3 className="text-lg font-semibold text-golden-800 mb-4 font-display">الإعدادات العامة للصفحة</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-golden-700 mb-2 font-body">لغة المحتوى الافتراضية</label>
            <select className="form-select">
              <option value="ar">العربية</option>
              <option value="en">الإنجليزية</option>
              <option value="both">ثنائية اللغة</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-golden-700 mb-2 font-body">نمط الألوان</label>
            <select className="form-select">
              <option value="islamic">إسلامي (أخضر وذهبي)</option>
              <option value="modern">عصري (أزرق ورمادي)</option>
              <option value="traditional">تقليدي (بني وبيج)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-golden-700 mb-2 font-body">حجم الخط الافتراضي</label>
            <select className="form-select">
              <option value="small">صغير</option>
              <option value="medium">متوسط</option>
              <option value="large">كبير</option>
            </select>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-golden-200">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-golden-800 font-display">إعدادات الأداء</h4>
              <p className="text-sm text-sage-600 font-body">تحسين سرعة تحميل الصفحة</p>
            </div>
            <div className="space-y-2">
              <label className="flex items-center space-x-2 space-x-reverse">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-golden-300 text-golden-600 focus:ring-golden-500"
                />
                <span className="text-sm font-medium text-golden-700 font-body">ضغط الصور</span>
              </label>
              <label className="flex items-center space-x-2 space-x-reverse">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-golden-300 text-golden-600 focus:ring-golden-500"
                />
                <span className="text-sm font-medium text-golden-700 font-body">التحميل التدريجي</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageManagement;