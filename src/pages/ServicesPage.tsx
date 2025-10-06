import React, { useState } from 'react';
import { 
  MapPin, 
  Users, 
  BookOpen, 
  Calendar, 
  Phone, 
  Mail, 
  Clock, 
  Star, 
  ArrowLeft, 
  Search,
  Filter,
  Eye,
  Heart,
  Share2,
  Bookmark,
  Download,
  Upload,
  Settings,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  AlertTriangle,
  Info,
  Building,
  Globe,
  Shield,
  Target,
  Award,
  TrendingUp,
  Activity,
  Zap,
  Sparkles,
  Crown,
  Gem,
  HandHeart,
  Calculator,
  FileText,
  Headphones,
  Video,
  Image as ImageIcon,
  Mic,
  Camera,
  Printer,
  Send,
  MessageSquare,
  ThumbsUp,
  Flag,
  Archive,
  Layers,
  Grid,
  List,
  BarChart3,
  PieChart,
  RefreshCw,
  Save,
  Copy,
  ExternalLink,
  Navigation,
  Compass,
  GraduationCap,
  XCircle
} from 'lucide-react';
import { useToast } from '../hooks/useToast';

const ServicesPage = () => {
  const { success, info, error: showError } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'detailed'>('grid');
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const services = [
    {
      id: 1,
      title: 'إدارة المساجد',
      description: 'خدمات إدارة وصيانة المساجد والمرافق الدينية',
      icon: MapPin,
      category: 'mosques',
      type: 'administrative',
      status: 'active',
      rating: 4.8,
      usersCount: 1250,
      completedRequests: 890,
      averageTime: '3 أيام',
      features: ['صيانة المساجد', 'إدارة الأوقاف', 'تنظيم الصلوات', 'إدارة الموارد'],
      requirements: ['طلب رسمي', 'وثائق الملكية', 'تقرير فني'],
      documents: ['نموذج الطلب', 'دليل الإجراءات', 'قائمة المتطلبات'],
      contactInfo: {
        phone: '+970 2 298 2534',
        email: 'mosques@awqaf.gov.ps',
        hours: 'الأحد - الخميس: 8:00 صباحاً - 3:00 مساءً',
        office: 'إدارة المساجد - الطابق الثاني',
        manager: 'الأستاذ أحمد محمد'
      },
      onlineService: true,
      mobileApp: true,
      cost: 'مجاني',
      processingTime: '3-5 أيام عمل'
    },
    {
      id: 2,
      title: 'الشؤون الدينية',
      description: 'خدمات الإرشاد الديني والفتاوى الشرعية',
      icon: BookOpen,
      category: 'religious',
      type: 'consultation',
      status: 'active',
      rating: 4.9,
      usersCount: 3500,
      completedRequests: 2890,
      averageTime: '1 يوم',
      features: ['الفتاوى الشرعية', 'الإرشاد الديني', 'الاستشارات الدينية', 'التوجيه الروحي'],
      requirements: ['تحديد السؤال الشرعي', 'معلومات شخصية أساسية'],
      documents: ['نموذج الاستفسار', 'دليل الفتاوى الشائعة'],
      contactInfo: {
        phone: '+970 2 298 2535',
        email: 'fatwa@awqaf.gov.ps',
        hours: 'الأحد - الخميس: 8:00 صباحاً - 3:00 مساءً',
        office: 'إدارة الشؤون الدينية - الطابق الثاني',
        manager: 'الشيخ محمد علي'
      },
      onlineService: true,
      mobileApp: true,
      cost: 'مجاني',
      processingTime: '24 ساعة'
    },
    {
      id: 3,
      title: 'التعليم الديني',
      description: 'برامج التعليم الديني والدورات التدريبية',
      icon: BookOpen,
      category: 'education',
      type: 'educational',
      status: 'active',
      rating: 4.7,
      usersCount: 2100,
      completedRequests: 1560,
      averageTime: '7 أيام',
      features: ['دورات القرآن الكريم', 'تعليم اللغة العربية', 'الثقافة الإسلامية', 'برامج التأهيل'],
      requirements: ['استمارة التسجيل', 'صورة شخصية', 'شهادة تعليمية'],
      documents: ['برنامج الدورات', 'شروط التسجيل', 'جدول المواعيد'],
      contactInfo: {
        phone: '+970 2 298 2536',
        email: 'education@awqaf.gov.ps',
        hours: 'الأحد - الخميس: 8:00 صباحاً - 3:00 مساءً',
        office: 'إدارة التعليم الديني - الطابق الثالث',
        manager: 'الدكتور نور الدين'
      },
      onlineService: false,
      mobileApp: false,
      cost: 'رسوم رمزية',
      processingTime: '1-2 أسبوع'
    },
    {
      id: 4,
      title: 'الأنشطة والفعاليات',
      description: 'تنظيم الأنشطة الدينية والثقافية',
      icon: Calendar,
      category: 'events',
      type: 'organizational',
      status: 'active',
      rating: 4.6,
      usersCount: 1800,
      completedRequests: 1200,
      averageTime: '5 أيام',
      features: ['المحاضرات الدينية', 'الندوات الثقافية', 'المسابقات القرآنية', 'الأنشطة الاجتماعية'],
      requirements: ['طلب تنظيم فعالية', 'تفاصيل الفعالية', 'موافقات أمنية'],
      documents: ['نموذج طلب الفعالية', 'دليل التنظيم', 'شروط الاستضافة'],
      contactInfo: {
        phone: '+970 2 298 2537',
        email: 'events@awqaf.gov.ps',
        hours: 'الأحد - الخميس: 8:00 صباحاً - 3:00 مساءً',
        office: 'إدارة الأنشطة - الطابق الأول',
        manager: 'الأستاذة سارة أحمد'
      },
      onlineService: true,
      mobileApp: false,
      cost: 'حسب نوع الفعالية',
      processingTime: '1-3 أسابيع'
    },
    {
      id: 5,
      title: 'خدمات الحج والعمرة',
      description: 'تنظيم رحلات الحج والعمرة والخدمات المتعلقة بها',
      icon: Users,
      category: 'hajj',
      type: 'travel',
      status: 'seasonal',
      rating: 4.9,
      usersCount: 850,
      completedRequests: 650,
      averageTime: '14 يوم',
      features: ['تنظيم رحلات الحج', 'رحلات العمرة', 'الإرشاد والتوجيه', 'الخدمات اللوجستية'],
      requirements: ['جواز سفر ساري', 'شهادة صحية', 'رسوم الرحلة'],
      documents: ['استمارة التسجيل', 'دليل الحاج', 'برنامج الرحلة'],
      contactInfo: {
        phone: '+970 2 298 2538',
        email: 'hajj@awqaf.gov.ps',
        hours: 'الأحد - الخميس: 8:00 صباحاً - 3:00 مساءً',
        office: 'إدارة الحج والعمرة - الطابق الأول',
        manager: 'الحاج محمد خالد'
      },
      onlineService: true,
      mobileApp: true,
      cost: 'حسب الرحلة',
      processingTime: '2-4 أسابيع'
    },
    {
      id: 6,
      title: 'الخدمات الاجتماعية',
      description: 'برامج الدعم الاجتماعي والمساعدات الخيرية',
      icon: Users,
      category: 'social',
      type: 'social',
      status: 'active',
      rating: 4.8,
      usersCount: 2400,
      completedRequests: 1890,
      averageTime: '7 أيام',
      features: ['المساعدات الخيرية', 'برامج الدعم الاجتماعي', 'رعاية الأسر المحتاجة', 'التكافل الاجتماعي'],
      requirements: ['إثبات الحاجة', 'وثائق الهوية', 'تقرير اجتماعي'],
      documents: ['استمارة طلب المساعدة', 'دليل الخدمات الاجتماعية'],
      contactInfo: {
        phone: '+970 2 298 2539',
        email: 'social@awqaf.gov.ps',
        hours: 'الأحد - الخميس: 8:00 صباحاً - 3:00 مساءً',
        office: 'إدارة الشؤون الاجتماعية - الطابق الأول',
        manager: 'الأستاذة فاطمة خالد'
      },
      onlineService: true,
      mobileApp: true,
      cost: 'مجاني',
      processingTime: '1-2 أسبوع'
    }
  ];

  const categories = [
    { id: 'all', name: 'جميع الخدمات' },
    { id: 'mosques', name: 'إدارة المساجد', icon: Building, color: 'text-green-600' },
    { id: 'religious', name: 'الشؤون الدينية', icon: BookOpen, color: 'text-blue-600' },
    { id: 'education', name: 'التعليم الديني', icon: GraduationCap, color: 'text-purple-600' },
    { id: 'events', name: 'الأنشطة والفعاليات', icon: Calendar, color: 'text-orange-600' },
    { id: 'hajj', name: 'الحج والعمرة', icon: Users, color: 'text-pink-600' },
    { id: 'social', name: 'الخدمات الاجتماعية', icon: Heart, color: 'text-teal-600' }
  ];

  const serviceTypes = [
    { id: 'all', name: 'جميع الأنواع' },
    { id: 'administrative', name: 'إدارية' },
    { id: 'consultation', name: 'استشارية' },
    { id: 'educational', name: 'تعليمية' },
    { id: 'organizational', name: 'تنظيمية' },
    { id: 'travel', name: 'سفر وسياحة' },
    { id: 'social', name: 'اجتماعية' }
  ];

  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    const matchesType = selectedType === 'all' || service.type === selectedType;
    return matchesSearch && matchesCategory && matchesType;
  });

  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentServices = filteredServices.slice(startIndex, startIndex + itemsPerPage);

  // حساب الإحصائيات
  const totalServices = services.length;
  const totalUsers = services.reduce((sum, service) => sum + service.usersCount, 0);
  const averageRating = services.reduce((sum, service) => sum + service.rating, 0) / services.length;
  const onlineServices = services.filter(service => service.onlineService).length;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return 'status-active';
      case 'seasonal':
        return 'status-pending';
      case 'maintenance':
        return 'bg-orange-100 text-orange-800';
      case 'inactive':
        return 'status-inactive';
      default:
        return 'status-active';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'seasonal':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'maintenance':
        return <Settings className="w-4 h-4 text-orange-500" />;
      case 'inactive':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="islamic-gradient text-white rounded-2xl p-8 mb-8 islamic-pattern">
          <div className="text-center">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl animate-float">
              <Settings className="w-12 h-12 text-islamic-600" />
            </div>
            <h1 className="heading-1 text-white mb-4">خدمات الوزارة</h1>
            <p className="body-large text-golden-200 max-w-4xl mx-auto">
              دليل شامل لجميع الخدمات المتاحة من وزارة الأوقاف والشؤون الدينية
            </p>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card-islamic">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-sage-600 font-body">إجمالي الخدمات</p>
                <p className="text-3xl font-bold text-islamic-700 font-display">{totalServices}</p>
              </div>
              <Settings className="w-8 h-8 text-islamic-500" />
            </div>
          </div>
          
          <div className="card-golden">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-sage-600 font-body">إجمالي المستخدمين</p>
                <p className="text-2xl font-bold text-golden-700 font-display">{totalUsers.toLocaleString()}</p>
              </div>
              <Users className="w-8 h-8 text-golden-500" />
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
                <p className="text-sm font-medium text-sage-600 font-body">خدمات إلكترونية</p>
                <p className="text-3xl font-bold text-gray-700 font-display">{onlineServices}</p>
              </div>
              <Globe className="w-8 h-8 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-elegant p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="relative">
              <Search className="absolute right-3 top-3 h-5 w-5 text-sage-400" />
              <input
                type="text"
                placeholder="البحث في الخدمات..."
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
            
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="form-select"
            >
              {serviceTypes.map(type => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>
            
            <div className="flex items-center space-x-2 space-x-reverse">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-islamic-600 text-white' : 'bg-gray-200 text-gray-600'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-islamic-600 text-white' : 'bg-gray-200 text-gray-600'}`}
              >
                <List className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('detailed')}
                className={`p-2 rounded-lg ${viewMode === 'detailed' ? 'bg-islamic-600 text-white' : 'bg-gray-200 text-gray-600'}`}
              >
                <Eye className="w-5 h-5" />
              </button>
            </div>
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
                {category.icon && <category.icon className={`w-5 h-5 ${selectedCategory === category.id ? 'text-white' : category.color}`} />}
                <span className="font-body">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Services Display */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentServices.map((service, index) => (
              <div key={service.id} className={`card-islamic hover-lift animate-fade-in-up`} style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <div className="w-12 h-12 islamic-gradient rounded-xl flex items-center justify-center shadow-lg">
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-islamic-800 font-display">{service.title}</h3>
                      <div className="flex items-center space-x-2 space-x-reverse mt-1">
                        <Star className="w-4 h-4 text-golden-500 fill-current" />
                        <span className="text-sm font-bold text-golden-700">{service.rating}</span>
                        <span className="text-xs text-sage-500">({service.usersCount} مستخدم)</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 space-x-reverse">
                    {getStatusIcon(service.status)}
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(service.status)}`}>
                      {service.status === 'active' ? 'متاح' : 
                       service.status === 'seasonal' ? 'موسمي' : 
                       service.status === 'maintenance' ? 'صيانة' : 'غير متاح'}
                    </span>
                  </div>
                </div>
                
                <p className="text-sage-600 mb-4 font-body leading-relaxed">
                  {service.description}
                </p>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-sage-600 font-body">وقت المعالجة:</span>
                    <span className="font-medium text-islamic-700">{service.processingTime}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-sage-600 font-body">التكلفة:</span>
                    <span className="font-medium text-green-600">{service.cost}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-sage-600 font-body">الطلبات المكتملة:</span>
                    <span className="font-medium text-blue-600">{service.completedRequests}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 space-x-reverse mb-4">
                  {service.onlineService && (
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      خدمة إلكترونية
                    </span>
                  )}
                  {service.mobileApp && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      تطبيق جوال
                    </span>
                  )}
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
                      اطلب الخدمة
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : viewMode === 'list' ? (
          <div className="bg-white rounded-2xl shadow-elegant overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-islamic-50">
                  <tr>
                    <th className="px-6 py-3 text-right text-xs font-medium text-islamic-700 uppercase tracking-wider font-body">
                      الخدمة
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-islamic-700 uppercase tracking-wider font-body">
                      الفئة
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-islamic-700 uppercase tracking-wider font-body">
                      التقييم
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-islamic-700 uppercase tracking-wider font-body">
                      المستخدمون
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-islamic-700 uppercase tracking-wider font-body">
                      الحالة
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-islamic-700 uppercase tracking-wider font-body">
                      الإجراءات
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-sage-200">
                  {currentServices.map((service) => (
                    <tr key={service.id} className="hover:bg-islamic-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <div className="w-10 h-10 islamic-gradient rounded-lg flex items-center justify-center">
                            <service.icon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-islamic-800 font-body">{service.title}</div>
                            <div className="text-sm text-sage-600 font-body">{service.description.slice(0, 50)}...</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                          {categories.find(c => c.id === service.category)?.name}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-1 space-x-reverse">
                          <Star className="w-4 h-4 text-golden-500 fill-current" />
                          <span className="text-sm font-bold text-golden-700">{service.rating}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-islamic-800 font-body">
                        {service.usersCount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          {getStatusIcon(service.status)}
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(service.status)}`}>
                            {service.status === 'active' ? 'متاح' : 
                             service.status === 'seasonal' ? 'موسمي' : 
                             service.status === 'maintenance' ? 'صيانة' : 'غير متاح'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <button 
                            onClick={() => {
                              setSelectedService(service);
                              setShowModal(true);
                            }}
                            className="text-blue-600 hover:text-blue-700"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="btn-primary text-xs px-3 py-1">
                            اطلب الآن
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          // Detailed View
          <div className="space-y-8">
            {currentServices.map((service, index) => (
              <div key={service.id} className={`card-islamic animate-fade-in-up`} style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center space-x-4 space-x-reverse">
                      <div className="w-16 h-16 islamic-gradient rounded-xl flex items-center justify-center shadow-lg">
                        <service.icon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold text-islamic-800 font-display">{service.title}</h3>
                        <div className="flex items-center space-x-4 space-x-reverse mt-2">
                          <div className="flex items-center space-x-1 space-x-reverse">
                            <Star className="w-4 h-4 text-golden-500 fill-current" />
                            <span className="font-bold text-golden-700">{service.rating}</span>
                          </div>
                          <span className="text-sage-600 font-body">({service.usersCount} مستخدم)</span>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(service.status)}`}>
                            {service.status === 'active' ? 'متاح' : 
                             service.status === 'seasonal' ? 'موسمي' : 
                             service.status === 'maintenance' ? 'صيانة' : 'غير متاح'}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sage-600 font-body leading-relaxed text-lg">
                      {service.description}
                    </p>
                    
                    <div className="bg-islamic-50 p-6 rounded-xl">
                      <h4 className="font-semibold text-islamic-800 mb-3 font-display">الخدمات المتاحة:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center space-x-2 space-x-reverse">
                            <CheckCircle className="w-4 h-4 text-islamic-600" />
                            <span className="text-sage-700 font-body text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-golden-50 p-6 rounded-xl">
                      <h4 className="font-semibold text-golden-800 mb-3 font-display">المتطلبات:</h4>
                      <div className="space-y-2">
                        {service.requirements.map((req, idx) => (
                          <div key={idx} className="flex items-center space-x-2 space-x-reverse">
                            <Target className="w-4 h-4 text-golden-600" />
                            <span className="text-sage-700 font-body text-sm">{req}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-sage-50 p-6 rounded-xl">
                      <h4 className="font-semibold text-sage-800 mb-3 font-display">معلومات الخدمة</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sage-600 font-body">وقت المعالجة:</span>
                          <span className="font-medium font-body">{service.processingTime}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sage-600 font-body">التكلفة:</span>
                          <span className="font-medium text-green-600 font-body">{service.cost}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sage-600 font-body">المدير المسؤول:</span>
                          <span className="font-medium font-body">{service.contactInfo.manager}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 p-6 rounded-xl">
                      <h4 className="font-semibold text-blue-800 mb-3 font-display">معلومات التواصل</h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <Phone className="w-4 h-4 text-blue-600" />
                          <span className="text-sage-700 font-body" dir="ltr">{service.contactInfo.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <Mail className="w-4 h-4 text-blue-600" />
                          <span className="text-sage-700 font-body" dir="ltr">{service.contactInfo.email}</span>
                        </div>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <Building className="w-4 h-4 text-blue-600" />
                          <span className="text-sage-700 font-body">{service.contactInfo.office}</span>
                        </div>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <Clock className="w-4 h-4 text-blue-600" />
                          <span className="text-sage-700 font-body">{service.contactInfo.hours}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <button className="w-full btn-primary">
                        <Send className="w-5 h-5 ml-2" />
                        اطلب الخدمة الآن
                      </button>
                      <button className="w-full btn-secondary">
                        <Download className="w-5 h-5 ml-2" />
                        تحميل النماذج
                      </button>
                      <button className="w-full btn-outline">
                        <Phone className="w-5 h-5 ml-2" />
                        اتصل بالمسؤول
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Service Categories Overview */}
        <div className="card-golden mt-8">
          <h3 className="text-lg font-semibold text-golden-800 mb-6 font-display">نظرة عامة على الخدمات</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.slice(1).map((category) => {
              const categoryServices = services.filter(s => s.category === category.id);
              const categoryUsers = categoryServices.reduce((sum, s) => sum + s.usersCount, 0);
              return (
                <div key={category.id} className="bg-white rounded-xl p-6 border border-golden-200">
                  <div className="flex items-center space-x-3 space-x-reverse mb-4">
                    <div className="w-12 h-12 golden-gradient rounded-xl flex items-center justify-center">
                      <category.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-golden-800 font-display">{category.name}</h4>
                      <p className="text-sm text-sage-600 font-body">{categoryServices.length} خدمة</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-sage-600 font-body">المستخدمون:</span>
                      <span className="font-bold text-golden-700 font-display">{categoryUsers.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-sage-600 font-body">متوسط التقييم:</span>
                      <span className="font-bold text-golden-700 font-display">
                        {(categoryServices.reduce((sum, s) => sum + s.rating, 0) / categoryServices.length).toFixed(1)}
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedCategory(category.id)}
                    className="w-full mt-4 btn-outline text-sm"
                  >
                    عرض خدمات {category.name}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* How to Apply Section */}
        <div className="card-sage mt-8">
          <h3 className="text-lg font-semibold text-sage-800 mb-6 font-display">كيفية الحصول على الخدمة</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: 1, title: 'اختيار الخدمة', desc: 'اختر الخدمة المناسبة لاحتياجاتك', icon: Target },
              { step: 2, title: 'تجهيز المتطلبات', desc: 'جهز الوثائق والمستندات المطلوبة', icon: FileText },
              { step: 3, title: 'تقديم الطلب', desc: 'قدم طلبك إلكترونياً أو في المكتب', icon: Send },
              { step: 4, title: 'المتابعة والاستلام', desc: 'تابع حالة طلبك واستلم الخدمة', icon: CheckCircle }
            ].map((step) => (
              <div key={step.step} className="text-center">
                <div className="w-16 h-16 sage-gradient rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold text-sage-800 mb-2 font-display">{step.title}</h4>
                <p className="text-sage-600 text-sm font-body">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 space-x-reverse mt-8">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg bg-white border border-sage-300 text-sage-700 hover:bg-sage-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              السابق
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === page
                    ? 'bg-islamic-600 text-white'
                    : 'bg-white border border-sage-300 text-sage-700 hover:bg-sage-50'
                }`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg bg-white border border-sage-300 text-sage-700 hover:bg-sage-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              التالي
            </button>
          </div>
        )}

        {/* Additional Information */}
        <div className="bg-white rounded-2xl shadow-elegant p-8 mt-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-islamic-800 mb-4 font-display">معلومات إضافية</h3>
            <p className="text-sage-600 font-body">
              للحصول على مساعدة إضافية أو استفسارات حول الخدمات، يمكنكم التواصل معنا
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2 font-display">الهاتف</h4>
              <p className="text-gray-600 font-body" dir="ltr">+970 2 298 2500</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2 font-display">البريد الإلكتروني</h4>
              <p className="text-gray-600 font-body" dir="ltr">info@awqaf.gov.ps</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2 font-display">ساعات العمل</h4>
              <p className="text-gray-600 font-body">الأحد - الخميس: 8:00 ص - 3:00 م</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;