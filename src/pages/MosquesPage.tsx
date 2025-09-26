import React, { useState } from 'react';
import { 
  Building, 
  MapPin, 
  Users, 
  Calendar, 
  Clock, 
  Star, 
  Search, 
  Filter,
  Eye,
  Phone,
  Mail,
  Navigation,
  Award,
  Heart,
  BookOpen,
  Shield,
  Target,
  CheckCircle,
  AlertTriangle,
  Info,
  Download,
  Share2,
  Bookmark,
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  Image,
  Video,
  FileText,
  Globe,
  Zap,
  Sparkles,
  Crown,
  Gem,
  Sunrise,
  Mountain,
  Activity,
  TrendingUp,
  BarChart3,
  PieChart,
  DollarSign,
  Wrench,
  Hammer,
  Paintbrush,
  Home,
  School,
  Cross,
  TreePine
} from 'lucide-react';

const MosquesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGovernorate, setSelectedGovernorate] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedMosque, setSelectedMosque] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const mosques = [
    {
      id: 1,
      name: 'المسجد الأقصى المبارك',
      description: 'أولى القبلتين وثالث الحرمين الشريفين، أقدس المساجد في فلسطين والعالم الإسلامي',
      type: 'historical',
      governorate: 'القدس',
      city: 'القدس',
      district: 'البلدة القديمة',
      address: 'الحرم القدسي الشريف',
      capacity: 5000,
      area: 144000,
      buildYear: 691,
      imam: 'الشيخ عكرمة صبري',
      status: 'active',
      condition: 'excellent',
      lastMaintenance: '2024-01-10',
      nextMaintenance: '2024-04-10',
      image: 'https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&w=800',
      services: [
        'الصلوات الخمس',
        'صلاة الجمعة',
        'صلاة التراويح',
        'الدروس الدينية',
        'الاعتكاف',
        'الزيارات السياحية'
      ],
      facilities: [
        'مكتبة إسلامية',
        'قاعة محاضرات',
        'مركز طبي',
        'مواقف سيارات',
        'مرافق للمعاقين',
        'نظام صوتي متطور'
      ],
      contact: {
        phone: '+970 2 628 3292',
        email: 'aqsa@awqaf.gov.ps',
        website: 'www.alaqsa.org.ps'
      },
      coordinates: {
        lat: 31.7767,
        lng: 35.2345
      },
      history: 'بناه الخليفة الأموي عبد الملك بن مروان عام 691م، وهو ثالث أقدس المساجد في الإسلام',
      architecture: 'العمارة الإسلامية الأموية مع قبة ذهبية مميزة',
      significance: 'مسرى النبي محمد صلى الله عليه وسلم ومعراجه إلى السماء'
    },
    {
      id: 2,
      name: 'المسجد الإبراهيمي الشريف',
      description: 'مسجد تاريخي مقدس يضم مقام النبي إبراهيم عليه السلام وعائلته الكريمة',
      type: 'historical',
      governorate: 'الخليل',
      city: 'الخليل',
      district: 'البلدة القديمة',
      address: 'الحرم الإبراهيمي الشريف',
      capacity: 3000,
      area: 8500,
      buildYear: 1200,
      imam: 'الشيخ محمد أبو سنينة',
      status: 'restricted',
      condition: 'good',
      lastMaintenance: '2023-12-15',
      nextMaintenance: '2024-03-15',
      image: 'https://images.pexels.com/photos/8107628/pexels-photo-8107628.jpeg?auto=compress&cs=tinysrgb&w=800',
      services: [
        'الصلوات الخمس',
        'صلاة الجمعة',
        'الزيارة والدعاء',
        'الدروس الدينية',
        'المناسبات الدينية'
      ],
      facilities: [
        'مقامات الأنبياء',
        'مكتبة تراثية',
        'متحف إسلامي',
        'قاعة استقبال',
        'مرافق صحية'
      ],
      contact: {
        phone: '+970 2 222 2518',
        email: 'ibrahimi@awqaf.gov.ps',
        website: 'www.ibrahimi.org.ps'
      },
      coordinates: {
        lat: 31.5326,
        lng: 35.0998
      },
      history: 'بني فوق مقبرة النبي إبراهيم وعائلته، له تاريخ عريق يمتد لآلاف السنين',
      architecture: 'مزيج من العمارة الإسلامية والبيزنطية والصليبية'
    },
    {
      id: 3,
      name: 'مسجد عمر بن الخطاب',
      description: 'مسجد حديث يخدم سكان مدينة رام الله ويقدم خدمات دينية واجتماعية متنوعة',
      type: 'modern',
      governorate: 'رام الله',
      city: 'رام الله',
      district: 'وسط المدينة',
      address: 'شارع عمر بن الخطاب',
      capacity: 1500,
      area: 2800,
      buildYear: 1995,
      imam: 'الشيخ أحمد محمد الأحمد',
      status: 'active',
      condition: 'excellent',
      lastMaintenance: '2024-01-05',
      nextMaintenance: '2024-07-05',
      image: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=800',
      services: [
        'الصلوات الخمس',
        'صلاة الجمعة',
        'تحفيظ القرآن',
        'الدروس الدينية',
        'الأنشطة الشبابية',
        'الخدمات الاجتماعية'
      ],
      facilities: [
        'قاعة متعددة الأغراض',
        'مكتبة حديثة',
        'فصول تعليمية',
        'مواقف سيارات',
        'حديقة للأطفال',
        'نظام تكييف'
      ],
      contact: {
        phone: '+970 2 295 2847',
        email: 'omar.mosque@awqaf.gov.ps',
        website: 'www.omar-mosque.ps'
      },
      coordinates: {
        lat: 31.9038,
        lng: 35.2034
      },
      programs: [
        'برنامج تحفيظ القرآن للأطفال',
        'دورات تعليم اللغة العربية',
        'محاضرات أسبوعية',
        'أنشطة رمضانية'
      ]
    },
    {
      id: 4,
      name: 'مسجد الفاروق',
      description: 'مسجد مركزي في نابلس يقدم خدمات دينية وتعليمية شاملة للمجتمع المحلي',
      type: 'community',
      governorate: 'نابلس',
      city: 'نابلس',
      district: 'البلدة القديمة',
      address: 'شارع الفاروق الرئيسي',
      capacity: 2000,
      area: 3200,
      buildYear: 1987,
      imam: 'الدكتور خالد يوسف النابلسي',
      status: 'active',
      condition: 'good',
      lastMaintenance: '2023-11-20',
      nextMaintenance: '2024-05-20',
      image: 'https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=800',
      services: [
        'الصلوات الخمس',
        'صلاة الجمعة',
        'التعليم الديني',
        'الإرشاد الأسري',
        'الأنشطة الثقافية'
      ],
      facilities: [
        'مدرسة قرآنية',
        'قاعة مؤتمرات',
        'مكتبة عامة',
        'عيادة طبية',
        'مطبخ خيري'
      ],
      contact: {
        phone: '+970 9 238 4567',
        email: 'farouk@awqaf.gov.ps',
        website: 'www.farouk-nablus.ps'
      },
      coordinates: {
        lat: 32.2211,
        lng: 35.2544
      }
    },
    {
      id: 5,
      name: 'مسجد الرحمة',
      description: 'مسجد حديث في غزة مجهز بأحدث التقنيات ويخدم منطقة واسعة من المدينة',
      type: 'modern',
      governorate: 'غزة',
      city: 'غزة',
      district: 'الرمال',
      address: 'شارع الرشيد',
      capacity: 1200,
      area: 2100,
      buildYear: 2010,
      imam: 'الشيخ عمر الزهار',
      status: 'active',
      condition: 'excellent',
      lastMaintenance: '2024-01-15',
      nextMaintenance: '2024-07-15',
      image: 'https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&w=800',
      services: [
        'الصلوات الخمس',
        'صلاة الجمعة',
        'تحفيظ القرآن',
        'الدروس الدينية',
        'الأنشطة النسائية'
      ],
      facilities: [
        'قسم نسائي منفصل',
        'فصول تحفيظ',
        'مكتبة رقمية',
        'قاعة أفراح',
        'مطبخ مجهز'
      ],
      contact: {
        phone: '+970 8 282 5678',
        email: 'rahma@awqaf.gov.ps',
        website: 'www.rahma-gaza.ps'
      },
      coordinates: {
        lat: 31.5017,
        lng: 34.4668
      }
    },
    {
      id: 6,
      name: 'مسجد الهدى',
      description: 'مسجد مجتمعي في جنين يركز على الأنشطة التعليمية والاجتماعية للشباب',
      type: 'community',
      governorate: 'جنين',
      city: 'جنين',
      district: 'المركز',
      address: 'شارع الهدى',
      capacity: 800,
      area: 1800,
      buildYear: 2005,
      imam: 'الأستاذ نور الدين أحمد',
      status: 'active',
      condition: 'good',
      lastMaintenance: '2023-10-30',
      nextMaintenance: '2024-04-30',
      image: 'https://images.pexels.com/photos/8107628/pexels-photo-8107628.jpeg?auto=compress&cs=tinysrgb&w=800',
      services: [
        'الصلوات الخمس',
        'صلاة الجمعة',
        'برامج الشباب',
        'التعليم المهني',
        'الأنشطة الرياضية'
      ],
      facilities: [
        'ملعب رياضي',
        'ورش تدريبية',
        'مختبر حاسوب',
        'قاعة رياضية',
        'حديقة عامة'
      ],
      contact: {
        phone: '+970 4 250 3456',
        email: 'huda@awqaf.gov.ps',
        website: 'www.huda-jenin.ps'
      },
      coordinates: {
        lat: 32.4614,
        lng: 35.3007
      }
    },
    {
      id: 7,
      name: 'مسجد النور',
      description: 'مسجد عصري في بيت لحم يجمع بين التراث والحداثة في خدمة المجتمع',
      type: 'modern',
      governorate: 'بيت لحم',
      city: 'بيت لحم',
      district: 'وسط المدينة',
      address: 'شارع النور',
      capacity: 1000,
      area: 2200,
      buildYear: 2015,
      imam: 'الدكتور سالم عبد الله',
      status: 'active',
      condition: 'excellent',
      lastMaintenance: '2024-01-08',
      nextMaintenance: '2024-07-08',
      image: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=800',
      services: [
        'الصلوات الخمس',
        'صلاة الجمعة',
        'التعليم الديني',
        'الإرشاد النفسي',
        'الأنشطة الثقافية'
      ],
      facilities: [
        'مركز ثقافي',
        'قاعة فنون',
        'استوديو تسجيل',
        'مكتبة متخصصة',
        'قاعة اجتماعات'
      ],
      contact: {
        phone: '+970 2 274 5678',
        email: 'noor@awqaf.gov.ps',
        website: 'www.noor-bethlehem.ps'
      },
      coordinates: {
        lat: 31.7054,
        lng: 35.2024
      }
    },
    {
      id: 8,
      name: 'مسجد الصالحين',
      description: 'مسجد تراثي في طولكرم يحافظ على الطابع المعماري التقليدي',
      type: 'traditional',
      governorate: 'طولكرم',
      city: 'طولكرم',
      district: 'البلدة القديمة',
      address: 'حارة الصالحين',
      capacity: 600,
      area: 1500,
      buildYear: 1920,
      imam: 'الشيخ محمود الطولكرمي',
      status: 'active',
      condition: 'fair',
      lastMaintenance: '2023-09-12',
      nextMaintenance: '2024-03-12',
      image: 'https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=800',
      services: [
        'الصلوات الخمس',
        'صلاة الجمعة',
        'تعليم التراث',
        'الحرف التقليدية',
        'الأنشطة التراثية'
      ],
      facilities: [
        'متحف تراثي',
        'ورش حرفية',
        'مكتبة تراثية',
        'قاعة تراثية',
        'حديقة تقليدية'
      ],
      contact: {
        phone: '+970 9 267 8901',
        email: 'saliheen@awqaf.gov.ps',
        website: 'www.saliheen-tulkarm.ps'
      },
      coordinates: {
        lat: 32.3078,
        lng: 35.0275
      }
    },
    {
      id: 9,
      name: 'مسجد الفتح',
      description: 'مسجد حديث في قلقيلية مصمم ليكون مركزاً إسلامياً شاملاً للمنطقة',
      type: 'modern',
      governorate: 'قلقيلية',
      city: 'قلقيلية',
      district: 'المركز',
      address: 'شارع الفتح',
      capacity: 900,
      area: 2000,
      buildYear: 2018,
      imam: 'الدكتور أحمد القلقيلي',
      status: 'active',
      condition: 'excellent',
      lastMaintenance: '2024-01-12',
      nextMaintenance: '2024-07-12',
      image: 'https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&w=800',
      services: [
        'الصلوات الخمس',
        'صلاة الجمعة',
        'التعليم الرقمي',
        'الاستشارات الشرعية',
        'البرامج التقنية'
      ],
      facilities: [
        'مركز تقني',
        'استوديو بث',
        'قاعة ذكية',
        'مختبر لغات',
        'مركز إعلامي'
      ],
      contact: {
        phone: '+970 9 294 7890',
        email: 'fateh@awqaf.gov.ps',
        website: 'www.fateh-qalqilya.ps'
      },
      coordinates: {
        lat: 32.1896,
        lng: 34.9708
      }
    }
  ];

  const mosqueTypes = [
    { id: 'all', name: 'جميع الأنواع', icon: Building, color: 'text-islamic-600' },
    { id: 'historical', name: 'تاريخية', icon: Crown, color: 'text-amber-600' },
    { id: 'modern', name: 'حديثة', icon: Zap, color: 'text-blue-600' },
    { id: 'community', name: 'مجتمعية', icon: Users, color: 'text-green-600' },
    { id: 'traditional', name: 'تراثية', icon: Gem, color: 'text-purple-600' }
  ];

  const governorateOptions = [
    { id: 'all', name: 'جميع المحافظات' },
    { id: 'القدس', name: 'القدس' },
    { id: 'رام الله', name: 'رام الله والبيرة' },
    { id: 'نابلس', name: 'نابلس' },
    { id: 'الخليل', name: 'الخليل' },
    { id: 'غزة', name: 'غزة' },
    { id: 'جنين', name: 'جنين' },
    { id: 'طولكرم', name: 'طولكرم' },
    { id: 'قلقيلية', name: 'قلقيلية' },
    { id: 'بيت لحم', name: 'بيت لحم' }
  ];

  const statusOptions = [
    { id: 'all', name: 'جميع الحالات' },
    { id: 'active', name: 'نشط' },
    { id: 'restricted', name: 'مقيد' },
    { id: 'maintenance', name: 'قيد الصيانة' },
    { id: 'closed', name: 'مغلق' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'restricted':
        return <AlertTriangle className="w-4 h-4 text-orange-500" />;
      case 'maintenance':
        return <Wrench className="w-4 h-4 text-blue-500" />;
      case 'closed':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default:
        return <Info className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return 'status-active';
      case 'restricted':
        return 'status-pending';
      case 'maintenance':
        return 'bg-blue-100 text-blue-800';
      case 'closed':
        return 'status-error';
      default:
        return 'status-inactive';
    }
  };

  const getConditionBadge = (condition: string) => {
    switch (condition) {
      case 'excellent':
        return 'bg-green-100 text-green-800';
      case 'good':
        return 'bg-blue-100 text-blue-800';
      case 'fair':
        return 'bg-yellow-100 text-yellow-800';
      case 'poor':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredMosques = mosques.filter(mosque => {
    const matchesSearch = mosque.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mosque.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mosque.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGovernorate = selectedGovernorate === 'all' || mosque.governorate === selectedGovernorate;
    const matchesType = selectedType === 'all' || mosque.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || mosque.status === selectedStatus;
    return matchesSearch && matchesGovernorate && matchesType && matchesStatus;
  });

  const totalPages = Math.ceil(filteredMosques.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentMosques = filteredMosques.slice(startIndex, startIndex + itemsPerPage);

  // حساب الإحصائيات
  const totalCapacity = mosques.reduce((sum, mosque) => sum + mosque.capacity, 0);
  const totalArea = mosques.reduce((sum, mosque) => sum + mosque.area, 0);
  const activeMosques = mosques.filter(mosque => mosque.status === 'active').length;

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="islamic-gradient text-white rounded-2xl p-8 mb-8 islamic-pattern">
          <div className="text-center">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl animate-float">
              <Building className="w-12 h-12 text-islamic-600" />
            </div>
            <h1 className="heading-1 text-white mb-4">المساجد في فلسطين</h1>
            <p className="body-large text-golden-200 max-w-4xl mx-auto">
              دليل شامل للمساجد في فلسطين مع معلومات تفصيلية عن الخدمات والمرافق والأنشطة
            </p>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card-islamic">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-sage-600 font-body">إجمالي المساجد</p>
                <p className="text-3xl font-bold text-islamic-700 font-display">{mosques.length}</p>
              </div>
              <Building className="w-8 h-8 text-islamic-500" />
            </div>
          </div>
          
          <div className="card-golden">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-sage-600 font-body">السعة الإجمالية</p>
                <p className="text-2xl font-bold text-golden-700 font-display">{totalCapacity.toLocaleString()}</p>
              </div>
              <Users className="w-8 h-8 text-golden-500" />
            </div>
          </div>
          
          <div className="card-sage">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-sage-600 font-body">المساحة الإجمالية</p>
                <p className="text-2xl font-bold text-sage-700 font-display">{(totalArea / 1000).toFixed(0)}K م²</p>
              </div>
              <Target className="w-8 h-8 text-sage-500" />
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-sage-600 font-body">مساجد نشطة</p>
                <p className="text-3xl font-bold text-gray-700 font-display">{activeMosques}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-elegant p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute right-3 top-3 h-5 w-5 text-sage-400" />
              <input
                type="text"
                placeholder="البحث في المساجد..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input pr-10"
              />
            </div>
            
            <select
              value={selectedGovernorate}
              onChange={(e) => setSelectedGovernorate(e.target.value)}
              className="form-select"
            >
              {governorateOptions.map(option => (
                <option key={option.id} value={option.id}>{option.name}</option>
              ))}
            </select>
            
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="form-select"
            >
              {mosqueTypes.map(type => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>
            
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="form-select"
            >
              {statusOptions.map(status => (
                <option key={status.id} value={status.id}>{status.name}</option>
              ))}
            </select>
            
            <button className="btn-primary">
              <Filter className="w-5 h-5 ml-2" />
              فلاتر متقدمة
            </button>
          </div>
        </div>

        {/* Mosque Types Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            {mosqueTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`flex items-center space-x-2 space-x-reverse px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  selectedType === type.id
                    ? 'bg-islamic-600 text-white shadow-islamic'
                    : 'bg-white text-sage-700 hover:bg-islamic-50 hover:text-islamic-700 shadow-soft'
                }`}
              >
                <type.icon className={`w-5 h-5 ${selectedType === type.id ? 'text-white' : type.color}`} />
                <span className="font-body">{type.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Mosques Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {currentMosques.map((mosque, index) => (
            <div key={mosque.id} className={`card-islamic hover-lift animate-fade-in-up`} style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="relative overflow-hidden rounded-xl mb-6">
                <img
                  src={mosque.image}
                  alt={mosque.name}
                  className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute top-4 right-4 flex space-x-2 space-x-reverse">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(mosque.status)}`}>
                    {statusOptions.find(s => s.id === mosque.status)?.name}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getConditionBadge(mosque.condition)}`}>
                    {mosque.condition === 'excellent' ? 'ممتاز' : 
                     mosque.condition === 'good' ? 'جيد' :
                     mosque.condition === 'fair' ? 'مقبول' : 'ضعيف'}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <MapPin className="w-4 h-4 text-islamic-600" />
                        <span className="font-body text-islamic-700">{mosque.city}</span>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Users className="w-4 h-4 text-golden-600" />
                        <span className="font-body text-golden-700">{mosque.capacity}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-islamic-800 mb-2 font-display">
                    {mosque.name}
                  </h3>
                  <p className="text-sage-600 line-clamp-3 font-body leading-relaxed">
                    {mosque.description}
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 space-x-reverse text-sm">
                    <Building className="w-4 h-4 text-sage-400" />
                    <span className="text-sage-600 font-body">{mosque.imam}</span>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse text-sm">
                    <MapPin className="w-4 h-4 text-sage-400" />
                    <span className="text-sage-600 font-body">{mosque.address}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Calendar className="w-4 h-4 text-sage-400" />
                      <span className="text-sage-600 font-body">بناء {mosque.buildYear}</span>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Target className="w-4 h-4 text-sage-400" />
                      <span className="text-sage-600 font-body">{mosque.area} م²</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-sage-200">
                  <button 
                    onClick={() => {
                      setSelectedMosque(mosque);
                      setShowModal(true);
                    }}
                    className="text-islamic-600 hover:text-islamic-700 font-medium font-body group"
                  >
                    <span>عرض التفاصيل</span>
                    <ArrowLeft className="w-4 h-4 inline mr-1 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <button className="text-golden-600 hover:text-golden-700 transition-colors">
                      <Navigation className="w-4 h-4" />
                    </button>
                    <button className="text-blue-600 hover:text-blue-700 transition-colors">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-2 space-x-reverse">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-sage-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-sage-50 transition-colors font-body"
              >
                السابق
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 border rounded-lg transition-colors font-body ${
                    currentPage === page
                      ? 'bg-islamic-600 text-white border-islamic-600'
                      : 'border-sage-300 hover:bg-sage-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border border-sage-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-sage-50 transition-colors font-body"
              >
                التالي
              </button>
            </div>
          </div>
        )}

        {/* Featured Mosques */}
        <div className="bg-white rounded-2xl shadow-elegant p-8">
          <h2 className="heading-2 text-islamic-800 mb-6">المساجد المميزة</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mosques.filter(m => m.type === 'historical').slice(0, 3).map((mosque) => (
              <div key={mosque.id} className="bg-gradient-to-br from-islamic-50 to-golden-50 rounded-xl p-6 border border-islamic-200">
                <div className="flex items-center space-x-3 space-x-reverse mb-4">
                  <div className="w-12 h-12 islamic-gradient rounded-xl flex items-center justify-center">
                    <Crown className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-islamic-800 font-display line-clamp-1">{mosque.name}</h3>
                    <p className="text-sm text-sage-600 font-body">{mosque.city}</p>
                  </div>
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <Star className="w-4 h-4 text-golden-500 fill-current" />
                    <span className="text-sm font-bold text-golden-700">تاريخي</span>
                  </div>
                </div>
                <p className="text-sage-600 text-sm mb-4 font-body line-clamp-2">{mosque.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-islamic-600 font-body">السعة: {mosque.capacity}</span>
                  <button className="text-islamic-600 hover:text-islamic-700 text-sm font-medium font-body">
                    التفاصيل
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mosque Details Modal */}
      {showModal && selectedMosque && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="heading-2 text-islamic-800">تفاصيل المسجد</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-sage-500 hover:text-sage-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <img
                    src={selectedMosque.image}
                    alt={selectedMosque.name}
                    className="w-full h-64 object-cover rounded-xl shadow-lg"
                  />
                </div>
                
                <div>
                  <h3 className="heading-3 text-islamic-800 mb-3">{selectedMosque.name}</h3>
                  <p className="body-text text-sage-600 leading-relaxed">{selectedMosque.description}</p>
                </div>

                <div className="bg-islamic-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-islamic-800 mb-3 font-display">الخدمات المتاحة</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedMosque.services.map((service: string, index: number) => (
                      <div key={index} className="flex items-center space-x-2 space-x-reverse">
                        <CheckCircle className="w-4 h-4 text-islamic-600" />
                        <span className="text-sage-700 font-body text-sm">{service}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-golden-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-golden-800 mb-3 font-display">المرافق والتجهيزات</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedMosque.facilities.map((facility: string, index: number) => (
                      <div key={index} className="flex items-center space-x-2 space-x-reverse">
                        <Star className="w-4 h-4 text-golden-600" />
                        <span className="text-sage-700 font-body text-sm">{facility}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-sage-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-sage-800 mb-3 font-display">معلومات أساسية</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-body text-sage-600">الإمام:</span>
                      <span className="font-bold text-sage-800 font-display">{selectedMosque.imam}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-body text-sage-600">السعة:</span>
                      <span className="font-bold text-sage-800 font-display">{selectedMosque.capacity.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-body text-sage-600">المساحة:</span>
                      <span className="font-bold text-sage-800 font-display">{selectedMosque.area.toLocaleString()} م²</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-body text-sage-600">سنة البناء:</span>
                      <span className="font-bold text-sage-800 font-display">{selectedMosque.buildYear}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-blue-800 mb-3 font-display">معلومات التواصل</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Phone className="w-4 h-4 text-blue-600" />
                      <span className="font-body text-sage-700" dir="ltr">{selectedMosque.contact.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Mail className="w-4 h-4 text-blue-600" />
                      <span className="font-body text-sage-700" dir="ltr">{selectedMosque.contact.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Globe className="w-4 h-4 text-blue-600" />
                      <span className="font-body text-sage-700" dir="ltr">{selectedMosque.contact.website}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-purple-800 mb-3 font-display">الموقع</h4>
                  <div className="space-y-2">
                    <p className="font-body text-sage-700">{selectedMosque.address}</p>
                    <p className="font-body text-sage-700">{selectedMosque.district}, {selectedMosque.city}</p>
                    <p className="font-body text-sage-700">{selectedMosque.governorate}</p>
                  </div>
                </div>
                
                <div className="flex space-x-3 space-x-reverse">
                  <button className="btn-primary flex-1">
                    <Navigation className="w-5 h-5 ml-2" />
                    الاتجاهات
                  </button>
                  <button className="btn-secondary">
                    <Phone className="w-5 h-5" />
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

export default MosquesPage;