import React, { useState } from 'react';
import { 
  Globe, 
  Smartphone, 
  Monitor, 
  Download, 
  Upload, 
  FileText, 
  CreditCard,
  Clock,
  CheckCircle,
  AlertTriangle,
  Info,
  User,
  Building,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Search,
  Filter,
  Eye,
  Star,
  Heart,
  Bookmark,
  Share2,
  ArrowLeft,
  Plus,
  Settings,
  Shield,
  Key,
  Lock,
  Unlock,
  Zap,
  Activity,
  TrendingUp,
  BarChart3,
  Target,
  Award,
  Crown,
  Gem,
  Sparkles,
  Navigation,
  Compass,
  Flag,
  Home,
  BookOpen,
  Mic,
  Video,
  Image,
  Printer,
  Send,
  MessageSquare,
  Bell,
  Headphones
} from 'lucide-react';

const EServicesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedService, setSelectedService] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  const eServices = [
    {
      id: 1,
      title: 'نظام إدارة الأوقاف الإلكتروني',
      description: 'نظام شامل لإدارة الأوقاف الإسلامية والمساجد إلكترونياً مع إمكانية المتابعة والتقارير',
      category: 'management',
      icon: Building,
      color: 'from-islamic-500 to-islamic-600',
      status: 'active',
      users: 1250,
      rating: 4.8,
      features: [
        'إدارة سجلات الأوقاف',
        'متابعة الإيرادات والمصروفات',
        'تقارير مالية تفصيلية',
        'إدارة المساجد والأئمة',
        'نظام المواعيد والاجتماعات',
        'أرشيف إلكتروني للوثائق'
      ],
      requirements: [
        'حساب مستخدم معتمد',
        'صلاحيات الوصول المناسبة',
        'اتصال إنترنت مستقر',
        'متصفح حديث'
      ],
      platforms: ['web', 'mobile', 'tablet'],
      image: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=800',
      tutorial: 'https://help.awqaf.gov.ps/waqf-management',
      support: {
        phone: '+970 2 298 2532',
        email: 'support@awqaf.gov.ps',
        hours: 'الأحد - الخميس: 8:00 ص - 3:00 م'
      }
    },
    {
      id: 2,
      title: 'خدمة طلب الفتاوى الشرعية',
      description: 'خدمة إلكترونية للحصول على الفتاوى الشرعية من علماء معتمدين في الوزارة',
      category: 'religious',
      icon: BookOpen,
      color: 'from-green-500 to-green-600',
      status: 'active',
      users: 3500,
      rating: 4.9,
      features: [
        'تقديم الأسئلة الشرعية',
        'الحصول على إجابات معتمدة',
        'أرشيف الفتاوى السابقة',
        'تصنيف حسب الموضوع',
        'إشعارات عند الرد',
        'مشاركة الفتاوى'
      ],
      requirements: [
        'تسجيل بيانات شخصية',
        'تحديد طبيعة السؤال',
        'انتظار الرد خلال 48 ساعة'
      ],
      platforms: ['web', 'mobile'],
      image: 'https://images.pexels.com/photos/8107628/pexels-photo-8107628.jpeg?auto=compress&cs=tinysrgb&w=800',
      tutorial: 'https://help.awqaf.gov.ps/fatwa-service',
      support: {
        phone: '+970 2 298 2535',
        email: 'fatwa@awqaf.gov.ps',
        hours: 'الأحد - الخميس: 9:00 ص - 2:00 م'
      }
    },
    {
      id: 3,
      title: 'نظام حجز المواعيد الإلكتروني',
      description: 'حجز المواعيد مع مسؤولي الوزارة والحصول على الخدمات المختلفة',
      category: 'appointments',
      icon: Calendar,
      color: 'from-blue-500 to-blue-600',
      status: 'active',
      users: 890,
      rating: 4.6,
      features: [
        'حجز المواعيد أونلاين',
        'اختيار الوقت المناسب',
        'تأكيد الموعد تلقائياً',
        'تذكيرات قبل الموعد',
        'إلغاء أو تعديل الموعد',
        'تقييم الخدمة'
      ],
      requirements: [
        'تحديد نوع الخدمة المطلوبة',
        'تقديم الوثائق المطلوبة',
        'تأكيد الحضور'
      ],
      platforms: ['web', 'mobile'],
      image: 'https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=800',
      tutorial: 'https://help.awqaf.gov.ps/appointments',
      support: {
        phone: '+970 2 298 2536',
        email: 'appointments@awqaf.gov.ps',
        hours: 'الأحد - الخميس: 8:00 ص - 3:00 م'
      }
    },
    {
      id: 4,
      title: 'خدمة التبرع الإلكتروني',
      description: 'منصة آمنة للتبرع للأوقاف والمساجد والمشاريع الخيرية إلكترونياً',
      category: 'donations',
      icon: Heart,
      color: 'from-red-500 to-red-600',
      status: 'active',
      users: 2100,
      rating: 4.7,
      features: [
        'تبرع آمن بالبطاقات الائتمانية',
        'اختيار المشروع المراد دعمه',
        'تبرع شهري تلقائي',
        'شهادات التبرع الإلكترونية',
        'متابعة استخدام التبرعات',
        'تقارير الشفافية'
      ],
      requirements: [
        'بطاقة ائتمانية صالحة',
        'تحديد مبلغ التبرع',
        'اختيار المشروع المستهدف'
      ],
      platforms: ['web', 'mobile'],
      image: 'https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&w=800',
      tutorial: 'https://help.awqaf.gov.ps/donations',
      support: {
        phone: '+970 2 298 2537',
        email: 'donations@awqaf.gov.ps',
        hours: '24/7'
      }
    },
    {
      id: 5,
      title: 'مكتبة الخطب والدروس الرقمية',
      description: 'مكتبة شاملة من الخطب والدروس الدينية المسجلة والمكتوبة',
      category: 'education',
      icon: Mic,
      color: 'from-purple-500 to-purple-600',
      status: 'active',
      users: 5600,
      rating: 4.8,
      features: [
        'مكتبة خطب الجمعة',
        'دروس دينية متنوعة',
        'تحميل الملفات الصوتية',
        'نصوص الخطب PDF',
        'بحث متقدم بالموضوع',
        'قوائم تشغيل مخصصة'
      ],
      requirements: [
        'تسجيل مجاني في الموقع',
        'اتصال إنترنت للاستماع',
        'تطبيق قارئ PDF للنصوص'
      ],
      platforms: ['web', 'mobile', 'tablet'],
      image: 'https://images.pexels.com/photos/8107628/pexels-photo-8107628.jpeg?auto=compress&cs=tinysrgb&w=800',
      tutorial: 'https://help.awqaf.gov.ps/digital-library',
      support: {
        phone: '+970 2 298 2538',
        email: 'library@awqaf.gov.ps',
        hours: 'الأحد - الخميس: 8:00 ص - 3:00 م'
      }
    },
    {
      id: 6,
      title: 'نظام تتبع الطلبات والمعاملات',
      description: 'تتبع حالة الطلبات والمعاملات المقدمة للوزارة في الوقت الفعلي',
      category: 'tracking',
      icon: Search,
      color: 'from-orange-500 to-orange-600',
      status: 'active',
      users: 1800,
      rating: 4.5,
      features: [
        'تتبع حالة الطلب',
        'إشعارات التحديثات',
        'تحميل الوثائق المطلوبة',
        'تواريخ المواعيد المهمة',
        'تقييم الخدمة',
        'أرشيف الطلبات السابقة'
      ],
      requirements: [
        'رقم الطلب أو المعاملة',
        'رقم الهوية الشخصية',
        'رقم الهاتف المسجل'
      ],
      platforms: ['web', 'mobile'],
      image: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=800',
      tutorial: 'https://help.awqaf.gov.ps/tracking',
      support: {
        phone: '+970 2 298 2539',
        email: 'tracking@awqaf.gov.ps',
        hours: 'الأحد - الخميس: 8:00 ص - 3:00 م'
      }
    }
  ];

  const categories = [
    { id: 'all', name: 'جميع الخدمات', icon: Globe, color: 'text-islamic-600' },
    { id: 'management', name: 'إدارية', icon: Settings, color: 'text-blue-600' },
    { id: 'religious', name: 'دينية', icon: BookOpen, color: 'text-green-600' },
    { id: 'appointments', name: 'المواعيد', icon: Calendar, color: 'text-purple-600' },
    { id: 'donations', name: 'التبرعات', icon: Heart, color: 'text-red-600' },
    { id: 'education', name: 'تعليمية', icon: Mic, color: 'text-orange-600' },
    { id: 'tracking', name: 'المتابعة', icon: Search, color: 'text-teal-600' }
  ];

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'web':
        return <Monitor className="w-4 h-4" />;
      case 'mobile':
        return <Smartphone className="w-4 h-4" />;
      case 'tablet':
        return <Smartphone className="w-4 h-4" />;
      default:
        return <Globe className="w-4 h-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return 'status-active';
      case 'maintenance':
        return 'status-pending';
      case 'inactive':
        return 'status-inactive';
      default:
        return 'status-inactive';
    }
  };

  const filteredServices = eServices.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalUsers = eServices.reduce((sum, service) => sum + service.users, 0);
  const averageRating = eServices.reduce((sum, service) => sum + service.rating, 0) / eServices.length;

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="islamic-gradient text-white rounded-2xl p-8 mb-8 islamic-pattern">
          <div className="text-center">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl animate-float">
              <Globe className="w-12 h-12 text-islamic-600" />
            </div>
            <h1 className="heading-1 text-white mb-4">الخدمات الإلكترونية</h1>
            <p className="body-large text-golden-200 max-w-4xl mx-auto">
              منصة شاملة للخدمات الإلكترونية المتطورة لتسهيل التعامل مع وزارة الأوقاف والشؤون الدينية
            </p>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card-islamic">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-sage-600 font-body">إجمالي الخدمات</p>
                <p className="text-3xl font-bold text-islamic-700 font-display">{eServices.length}</p>
              </div>
              <Globe className="w-8 h-8 text-islamic-500" />
            </div>
          </div>
          
          <div className="card-golden">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-sage-600 font-body">إجمالي المستخدمين</p>
                <p className="text-2xl font-bold text-golden-700 font-display">{totalUsers.toLocaleString()}</p>
              </div>
              <User className="w-8 h-8 text-golden-500" />
            </div>
          </div>
          
          <div className="card-sage">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-sage-600 font-body">متوسط التقييم</p>
                <p className="text-3xl font-bold text-sage-700 font-display">{averageRating.toFixed(1)}</p>
              </div>
              <Star className="w-8 h-8 text-sage-500" />
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-sage-600 font-body">خدمات نشطة</p>
                <p className="text-3xl font-bold text-gray-700 font-display">
                  {eServices.filter(s => s.status === 'active').length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-elegant p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute right-3 top-3 h-5 w-5 text-sage-400" />
              <input
                type="text"
                placeholder="البحث في الخدمات الإلكترونية..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input pr-10"
              />
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="form-select"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
            
            <button className="btn-primary">
              <Filter className="w-5 h-5 ml-2" />
              فلاتر متقدمة
            </button>
          </div>
        </div>

        {/* Categories Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 space-x-reverse px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-islamic-600 text-white shadow-islamic'
                    : 'bg-white text-sage-700 hover:bg-islamic-50 hover:text-islamic-700 shadow-soft'
                }`}
              >
                <category.icon className={`w-5 h-5 ${selectedCategory === category.id ? 'text-white' : category.color}`} />
                <span className="font-body">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {filteredServices.map((service, index) => (
            <div key={service.id} className={`card-islamic hover-lift animate-fade-in-up`} style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="relative overflow-hidden rounded-xl mb-6">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute top-4 right-4 flex space-x-2 space-x-reverse">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(service.status)}`}>
                    {service.status === 'active' ? 'متاح' : service.status === 'maintenance' ? 'صيانة' : 'غير متاح'}
                  </span>
                  <div className="flex items-center space-x-1 space-x-reverse bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                    <Star className="w-4 h-4 text-golden-500 fill-current" />
                    <span className="text-sm font-bold text-gray-800">{service.rating}</span>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <User className="w-4 h-4 text-islamic-600" />
                        <span className="font-body text-islamic-700">{service.users.toLocaleString()} مستخدم</span>
                      </div>
                      <div className="flex items-center space-x-1 space-x-reverse">
                        {service.platforms.map((platform, idx) => (
                          <div key={idx} className="text-golden-600">
                            {getPlatformIcon(platform)}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center space-x-3 space-x-reverse mb-2">
                    <div className={`w-12 h-12 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center`}>
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-islamic-800 font-display line-clamp-1">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-sage-600 line-clamp-3 font-body leading-relaxed">
                    {service.description}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-islamic-800 font-body">الميزات الرئيسية:</h4>
                  <ul className="space-y-1">
                    {service.features.slice(0, 3).map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-2 space-x-reverse text-sm">
                        <CheckCircle className="w-4 h-4 text-islamic-600 flex-shrink-0" />
                        <span className="text-sage-700 font-body">{feature}</span>
                      </li>
                    ))}
                    {service.features.length > 3 && (
                      <li className="text-sm text-islamic-600 font-body">+{service.features.length - 3} ميزة أخرى</li>
                    )}
                  </ul>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-sage-200">
                  <button 
                    onClick={() => {
                      setSelectedService(service);
                      setShowModal(true);
                    }}
                    className="text-islamic-600 hover:text-islamic-700 font-medium font-body group"
                  >
                    <span>عرض التفاصيل</span>
                    <ArrowLeft className="w-4 h-4 inline mr-1 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <button className="btn-primary text-sm px-4 py-2">
                      استخدم الآن
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* How to Use Section */}
        <div className="bg-white rounded-2xl shadow-elegant p-8 mb-8">
          <h2 className="heading-2 text-islamic-800 mb-6">كيفية استخدام الخدمات الإلكترونية</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: 1, title: 'التسجيل', desc: 'أنشئ حساب جديد أو سجل دخولك', icon: User },
              { step: 2, title: 'اختيار الخدمة', desc: 'اختر الخدمة المناسبة لاحتياجاتك', icon: Target },
              { step: 3, title: 'تعبئة البيانات', desc: 'أدخل المعلومات والوثائق المطلوبة', icon: FileText },
              { step: 4, title: 'المتابعة', desc: 'تابع حالة طلبك واحصل على النتائج', icon: CheckCircle }
            ].map((step) => (
              <div key={step.step} className="text-center">
                <div className="w-16 h-16 islamic-gradient rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-islamic-800 mb-2 font-display">{step.title}</h3>
                <p className="text-sage-600 text-sm font-body">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Support Section */}
        <div className="islamic-gradient text-white rounded-2xl p-8">
          <div className="text-center">
            <h2 className="heading-2 text-white mb-6">الدعم والمساعدة</h2>
            <p className="body-large text-golden-200 mb-8">
              فريق الدعم التقني متاح لمساعدتك في استخدام الخدمات الإلكترونية
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center justify-center space-x-3 space-x-reverse">
                <Phone className="w-6 h-6" />
                <div>
                  <p className="font-semibold font-display text-golden-200">الدعم الهاتفي</p>
                  <p className="opacity-90" dir="ltr">+970 2 298 2540</p>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-3 space-x-reverse">
                <Mail className="w-6 h-6" />
                <div>
                  <p className="font-semibold font-display text-golden-200">البريد الإلكتروني</p>
                  <p className="opacity-90" dir="ltr">support@awqaf.gov.ps</p>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-3 space-x-reverse">
                <MessageSquare className="w-6 h-6" />
                <div>
                  <p className="font-semibold font-display text-golden-200">الدردشة المباشرة</p>
                  <p className="opacity-90 font-body">متاح على الموقع</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Service Details Modal */}
      {showModal && selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="heading-2 text-islamic-800">تفاصيل الخدمة</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-sage-500 hover:text-sage-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <img
                    src={selectedService.image}
                    alt={selectedService.title}
                    className="w-full h-64 object-cover rounded-xl shadow-lg"
                  />
                </div>
                
                <div className="bg-islamic-50 p-6 rounded-xl">
                  <h3 className="font-semibold text-islamic-800 mb-3 font-display">جميع الميزات</h3>
                  <ul className="space-y-2">
                    {selectedService.features.map((feature: string, index: number) => (
                      <li key={index} className="flex items-start space-x-2 space-x-reverse">
                        <CheckCircle className="w-4 h-4 text-islamic-600 mt-1 flex-shrink-0" />
                        <span className="text-sage-700 font-body">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-golden-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-golden-800 mb-3 font-display">المتطلبات</h4>
                  <ul className="space-y-2">
                    {selectedService.requirements.map((req: string, index: number) => (
                      <li key={index} className="flex items-start space-x-2 space-x-reverse">
                        <Info className="w-4 h-4 text-golden-600 mt-1 flex-shrink-0" />
                        <span className="text-sage-700 font-body">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <div className="flex items-center space-x-3 space-x-reverse mb-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${selectedService.color} rounded-xl flex items-center justify-center`}>
                      <selectedService.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="heading-3 text-islamic-800">{selectedService.title}</h3>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Star className="w-4 h-4 text-golden-500 fill-current" />
                        <span className="font-bold text-golden-700">{selectedService.rating}</span>
                        <span className="text-sage-600 font-body">({selectedService.users.toLocaleString()} مستخدم)</span>
                      </div>
                    </div>
                  </div>
                  <p className="body-text text-sage-600 leading-relaxed">{selectedService.description}</p>
                </div>
                
                <div className="bg-sage-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-sage-800 mb-3 font-display">المنصات المتاحة</h4>
                  <div className="flex space-x-3 space-x-reverse">
                    {selectedService.platforms.map((platform: string, index: number) => (
                      <div key={index} className="flex items-center space-x-2 space-x-reverse bg-white px-4 py-2 rounded-lg shadow-sm">
                        {getPlatformIcon(platform)}
                        <span className="text-sm font-body capitalize">
                          {platform === 'web' ? 'موقع إلكتروني' : 
                           platform === 'mobile' ? 'تطبيق جوال' : 'تطبيق لوحي'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-blue-800 mb-3 font-display">الدعم والمساعدة</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Phone className="w-4 h-4 text-blue-600" />
                      <span className="font-body text-sage-700" dir="ltr">{selectedService.support.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Mail className="w-4 h-4 text-blue-600" />
                      <span className="font-body text-sage-700" dir="ltr">{selectedService.support.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span className="font-body text-sage-700">{selectedService.support.hours}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-3 space-x-reverse">
                  <button className="btn-primary flex-1">
                    <Zap className="w-5 h-5 ml-2" />
                    استخدم الخدمة
                  </button>
                  <button className="btn-secondary">
                    <BookOpen className="w-5 h-5" />
                  </button>
                  <button className="btn-outline">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EServicesPage;