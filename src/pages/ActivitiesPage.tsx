import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  Star, 
  Search, 
  Filter, 
  Eye, 
  Heart,
  BookOpen,
  Award,
  Target,
  CheckCircle,
  XCircle,
  AlertTriangle,
  User,
  Phone,
  Mail,
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
  Building,
  Mic,
  Camera,
  Music,
  Palette,
  Trophy,
  Gift,
  Zap,
  Sparkles
} from 'lucide-react';

const ActivitiesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedActivity, setSelectedActivity] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const activities = [
    {
      id: 1,
      title: 'مسابقة القرآن الكريم السنوية',
      description: 'مسابقة قرآنية كبرى على مستوى فلسطين بمشاركة أكثر من 200 متسابق من جميع المحافظات',
      category: 'religious',
      type: 'competition',
      date: '2024-02-15',
      endDate: '2024-02-17',
      time: '09:00',
      location: 'المسجد الكبير - القدس',
      organizer: 'إدارة التعليم الديني',
      maxParticipants: 200,
      currentParticipants: 156,
      status: 'upcoming',
      priority: 'high',
      image: 'https://images.pexels.com/photos/8107628/pexels-photo-8107628.jpeg?auto=compress&cs=tinysrgb&w=800',
      contact: {
        name: 'الأستاذ محمد الأحمد',
        phone: '+970 2 298 2534',
        email: 'quran@awqaf.gov.ps'
      },
      requirements: [
        'حفظ جزء عم كاملاً',
        'إتقان التلاوة والتجويد',
        'العمر بين 12-25 سنة',
        'تقديم شهادة حسن سيرة وسلوك'
      ],
      prizes: [
        'المركز الأول: 5000 شيكل + رحلة عمرة',
        'المركز الثاني: 3000 شيكل + مكتبة قرآنية',
        'المركز الثالث: 2000 شيكل + جهاز حاسوب',
        'جوائز تشجيعية للمشاركين'
      ],
      schedule: [
        { time: '09:00', activity: 'التسجيل والاستقبال' },
        { time: '10:00', activity: 'الجلسة الافتتاحية' },
        { time: '11:00', activity: 'بداية المسابقة - المرحلة الأولى' },
        { time: '15:00', activity: 'المرحلة النهائية' },
        { time: '17:00', activity: 'حفل التكريم وتوزيع الجوائز' }
      ]
    },
    {
      id: 2,
      title: 'ندوة الأخلاق الإسلامية في العمل',
      description: 'ندوة تثقيفية حول تطبيق الأخلاق الإسلامية في بيئة العمل المعاصرة وأثرها على الإنتاجية',
      category: 'educational',
      type: 'seminar',
      date: '2024-02-20',
      endDate: '2024-02-20',
      time: '14:00',
      location: 'قاعة المؤتمرات - رام الله',
      organizer: 'إدارة الشؤون الدينية',
      maxParticipants: 150,
      currentParticipants: 89,
      status: 'upcoming',
      priority: 'medium',
      image: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=800',
      contact: {
        name: 'الدكتور أحمد يوسف',
        phone: '+970 2 298 2535',
        email: 'education@awqaf.gov.ps'
      },
      speakers: [
        'الدكتور محمد الأحمد - أستاذ الشريعة الإسلامية',
        'الأستاذة فاطمة خالد - خبيرة التنمية البشرية',
        'الدكتور خالد يوسف - أستاذ علم النفس الإسلامي'
      ],
      topics: [
        'الصدق والأمانة في العمل',
        'العدالة والإنصاف في التعامل',
        'التعاون وروح الفريق',
        'الإتقان والجودة في الأداء'
      ]
    },
    {
      id: 3,
      title: 'ورشة التربية الإسلامية للأطفال',
      description: 'ورشة عملية لتعليم الآباء والأمهات أسس التربية الإسلامية السليمة للأطفال في العصر الحديث',
      category: 'family',
      type: 'workshop',
      date: '2024-02-25',
      endDate: '2024-02-25',
      time: '10:00',
      location: 'مركز التدريب - نابلس',
      organizer: 'إدارة الشؤون الاجتماعية',
      maxParticipants: 100,
      currentParticipants: 67,
      status: 'upcoming',
      priority: 'medium',
      image: 'https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=800',
      contact: {
        name: 'الأستاذة سارة محمود',
        phone: '+970 9 238 5678',
        email: 'family@awqaf.gov.ps'
      },
      materials: [
        'دليل التربية الإسلامية للأطفال',
        'مجموعة قصص تربوية',
        'ألعاب تعليمية إسلامية',
        'شهادة مشاركة معتمدة'
      ],
      ageGroups: [
        'الأطفال 3-6 سنوات',
        'الأطفال 7-12 سنة',
        'المراهقون 13-17 سنة'
      ]
    },
    {
      id: 4,
      title: 'محاضرة أهمية الوقف في الإسلام',
      description: 'محاضرة تثقيفية حول دور الوقف في التنمية الاقتصادية والاجتماعية في المجتمع الإسلامي',
      category: 'religious',
      type: 'lecture',
      date: '2024-01-18',
      endDate: '2024-01-18',
      time: '19:00',
      location: 'المسجد الكبير - رام الله',
      organizer: 'إدارة الأوقاف',
      maxParticipants: 200,
      currentParticipants: 145,
      status: 'completed',
      priority: 'high',
      image: 'https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&w=800',
      contact: {
        name: 'الدكتور خالد عبد الله',
        phone: '+970 2 298 2533',
        email: 'waqf@awqaf.gov.ps'
      },
      feedback: {
        rating: 4.8,
        reviews: 45,
        comments: [
          'محاضرة مفيدة جداً ومعلومات قيمة',
          'أسلوب شيق وطرح واضح',
          'نتمنى المزيد من هذه المحاضرات'
        ]
      }
    },
    {
      id: 5,
      title: 'معرض التراث الإسلامي الفلسطيني',
      description: 'معرض شامل يعرض التراث الإسلامي الفلسطيني من خلال المخطوطات والصور والمعروضات التاريخية',
      category: 'cultural',
      type: 'exhibition',
      date: '2024-03-01',
      endDate: '2024-03-07',
      time: '09:00',
      location: 'متحف فلسطين - بيرزيت',
      organizer: 'إدارة التراث والثقافة',
      maxParticipants: 500,
      currentParticipants: 234,
      status: 'upcoming',
      priority: 'high',
      image: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=800',
      contact: {
        name: 'الأستاذ نور الدين محمد',
        phone: '+970 2 298 2536',
        email: 'heritage@awqaf.gov.ps'
      },
      exhibitions: [
        'مخطوطات قرآنية نادرة',
        'صور تاريخية للمساجد الفلسطينية',
        'أدوات وحرف تراثية',
        'وثائق تاريخية للأوقاف'
      ]
    },
    {
      id: 6,
      title: 'دورة الإسعافات الأولية للأئمة',
      description: 'دورة تدريبية متخصصة لتأهيل الأئمة والخطباء في مهارات الإسعافات الأولية والتعامل مع الطوارئ',
      category: 'training',
      type: 'course',
      date: '2024-02-28',
      endDate: '2024-03-02',
      time: '08:00',
      location: 'مركز التدريب المهني - غزة',
      organizer: 'إدارة التدريب والتأهيل',
      maxParticipants: 50,
      currentParticipants: 38,
      status: 'upcoming',
      priority: 'medium',
      image: 'https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=800',
      contact: {
        name: 'الدكتور عمر الزهار',
        phone: '+970 8 282 3456',
        email: 'training@awqaf.gov.ps'
      },
      curriculum: [
        'أساسيات الإسعافات الأولية',
        'التعامل مع الحالات الطارئة',
        'الإنعاش القلبي الرئوي',
        'إدارة الأزمات في المساجد'
      ],
      certification: 'شهادة معتمدة من وزارة الصحة'
    }
  ];

  const categories = [
    { id: 'all', name: 'جميع الأنشطة', icon: Calendar, color: 'text-islamic-600' },
    { id: 'religious', name: 'دينية', icon: BookOpen, color: 'text-green-600' },
    { id: 'educational', name: 'تعليمية', icon: Award, color: 'text-blue-600' },
    { id: 'cultural', name: 'ثقافية', icon: Palette, color: 'text-purple-600' },
    { id: 'social', name: 'اجتماعية', icon: Heart, color: 'text-pink-600' },
    { id: 'family', name: 'أسرية', icon: Users, color: 'text-orange-600' },
    { id: 'training', name: 'تدريبية', icon: Target, color: 'text-teal-600' }
  ];

  const statusOptions = [
    { id: 'all', name: 'جميع الحالات' },
    { id: 'upcoming', name: 'قادمة' },
    { id: 'ongoing', name: 'جارية' },
    { id: 'completed', name: 'مكتملة' },
    { id: 'cancelled', name: 'ملغية' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <Clock className="w-4 h-4 text-blue-500" />;
      case 'ongoing':
        return <Zap className="w-4 h-4 text-green-500" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-gray-500" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'status-pending';
      case 'ongoing':
        return 'status-active';
      case 'completed':
        return 'status-inactive';
      case 'cancelled':
        return 'status-error';
      default:
        return 'status-inactive';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || activity.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || activity.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentActivities = filteredActivities.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="islamic-gradient text-white rounded-2xl p-8 mb-8 islamic-pattern">
          <div className="text-center">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl animate-float">
              <Calendar className="w-12 h-12 text-islamic-600" />
            </div>
            <h1 className="heading-1 text-white mb-4">الأنشطة والفعاليات</h1>
            <p className="body-large text-golden-200 max-w-4xl mx-auto">
              تعرف على جميع الأنشطة والفعاليات التي تنظمها وزارة الأوقاف والشؤون الدينية
            </p>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card-islamic">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-sage-600 font-body">إجمالي الأنشطة</p>
                <p className="text-3xl font-bold text-islamic-700 font-display">{activities.length}</p>
              </div>
              <Calendar className="w-8 h-8 text-islamic-500" />
            </div>
          </div>
          
          <div className="card-golden">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-sage-600 font-body">أنشطة قادمة</p>
                <p className="text-3xl font-bold text-golden-700 font-display">
                  {activities.filter(a => a.status === 'upcoming').length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-golden-500" />
            </div>
          </div>
          
          <div className="card-sage">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-sage-600 font-body">المشاركون</p>
                <p className="text-3xl font-bold text-sage-700 font-display">
                  {activities.reduce((sum, a) => sum + a.currentParticipants, 0)}
                </p>
              </div>
              <Users className="w-8 h-8 text-sage-500" />
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-sage-600 font-body">أنشطة مكتملة</p>
                <p className="text-3xl font-bold text-gray-700 font-display">
                  {activities.filter(a => a.status === 'completed').length}
                </p>
              </div>
              <Trophy className="w-8 h-8 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-elegant p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute right-3 top-3 h-5 w-5 text-sage-400" />
              <input
                type="text"
                placeholder="البحث في الأنشطة..."
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

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {currentActivities.map((activity, index) => (
            <div key={activity.id} className={`card-islamic hover-lift animate-fade-in-up`} style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="relative overflow-hidden rounded-xl mb-6">
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute top-4 right-4 flex space-x-2 space-x-reverse">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(activity.status)}`}>
                    {statusOptions.find(s => s.id === activity.status)?.name}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityBadge(activity.priority)}`}>
                    {activity.priority === 'high' ? 'مهم' : activity.priority === 'medium' ? 'متوسط' : 'عادي'}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Calendar className="w-4 h-4 text-islamic-600" />
                        <span className="font-body text-islamic-700">{new Date(activity.date).toLocaleDateString('ar-EG')}</span>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Clock className="w-4 h-4 text-golden-600" />
                        <span className="font-body text-golden-700">{activity.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-islamic-800 mb-2 line-clamp-2 font-display">
                    {activity.title}
                  </h3>
                  <p className="text-sage-600 line-clamp-3 font-body leading-relaxed">
                    {activity.description}
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 space-x-reverse text-sm">
                    <MapPin className="w-4 h-4 text-sage-400" />
                    <span className="text-sage-600 font-body">{activity.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse text-sm">
                    <Building className="w-4 h-4 text-sage-400" />
                    <span className="text-sage-600 font-body">{activity.organizer}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Users className="w-4 h-4 text-sage-400" />
                      <span className="text-sage-600 font-body">{activity.currentParticipants}/{activity.maxParticipants}</span>
                    </div>
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-islamic-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(activity.currentParticipants / activity.maxParticipants) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-sage-200">
                  <button 
                    onClick={() => {
                      setSelectedActivity(activity);
                      setShowModal(true);
                    }}
                    className="text-islamic-600 hover:text-islamic-700 font-medium font-body group"
                  >
                    <span>عرض التفاصيل</span>
                    <ArrowLeft className="w-4 h-4 inline mr-1 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <button className="text-golden-600 hover:text-golden-700 transition-colors">
                      <Bookmark className="w-4 h-4" />
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

        {/* Upcoming Events Highlight */}
        <div className="bg-white rounded-2xl shadow-elegant p-8">
          <h2 className="heading-2 text-islamic-800 mb-6">الأنشطة القادمة</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activities.filter(a => a.status === 'upcoming').slice(0, 3).map((activity) => (
              <div key={activity.id} className="bg-gradient-to-br from-islamic-50 to-golden-50 rounded-xl p-6 border border-islamic-200">
                <div className="flex items-center space-x-3 space-x-reverse mb-4">
                  <div className="w-12 h-12 islamic-gradient rounded-xl flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-islamic-800 font-display">{activity.title}</h3>
                    <p className="text-sm text-sage-600 font-body">{new Date(activity.date).toLocaleDateString('ar-EG')}</p>
                  </div>
                </div>
                <p className="text-sage-600 text-sm mb-4 font-body">{activity.description.slice(0, 100)}...</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-islamic-600 font-body">{activity.location}</span>
                  <button className="text-islamic-600 hover:text-islamic-700 text-sm font-medium font-body">
                    التفاصيل
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Details Modal */}
      {showModal && selectedActivity && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="heading-2 text-islamic-800">تفاصيل النشاط</h2>
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
                    src={selectedActivity.image}
                    alt={selectedActivity.title}
                    className="w-full h-64 object-cover rounded-xl shadow-lg"
                  />
                </div>
                
                <div className="bg-islamic-50 p-6 rounded-xl">
                  <h3 className="font-semibold text-islamic-800 mb-3 font-display">معلومات أساسية</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <Calendar className="w-5 h-5 text-islamic-600" />
                      <span className="font-body text-sage-700">{new Date(selectedActivity.date).toLocaleDateString('ar-EG')}</span>
                    </div>
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <Clock className="w-5 h-5 text-golden-600" />
                      <span className="font-body text-sage-700">{selectedActivity.time}</span>
                    </div>
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      <span className="font-body text-sage-700">{selectedActivity.location}</span>
                    </div>
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <Building className="w-5 h-5 text-purple-600" />
                      <span className="font-body text-sage-700">{selectedActivity.organizer}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="heading-3 text-islamic-800 mb-3">{selectedActivity.title}</h3>
                  <p className="body-text text-sage-600 leading-relaxed">{selectedActivity.description}</p>
                </div>
                
                <div className="bg-golden-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-golden-800 mb-3 font-display">معلومات التواصل</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <User className="w-4 h-4 text-golden-600" />
                      <span className="font-body text-sage-700">{selectedActivity.contact.name}</span>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Phone className="w-4 h-4 text-golden-600" />
                      <span className="font-body text-sage-700" dir="ltr">{selectedActivity.contact.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Mail className="w-4 h-4 text-golden-600" />
                      <span className="font-body text-sage-700" dir="ltr">{selectedActivity.contact.email}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-sage-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-sage-800 mb-3 font-display">المشاركة</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-body text-sage-600">المشاركون الحاليون:</span>
                      <span className="font-bold text-sage-800 font-display">{selectedActivity.currentParticipants}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-body text-sage-600">الحد الأقصى:</span>
                      <span className="font-bold text-sage-800 font-display">{selectedActivity.maxParticipants}</span>
                    </div>
                    <div className="w-full bg-sage-200 rounded-full h-3">
                      <div 
                        className="bg-islamic-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${(selectedActivity.currentParticipants / selectedActivity.maxParticipants) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-3 space-x-reverse">
                  <button className="btn-primary flex-1">
                    سجل الآن
                  </button>
                  <button className="btn-secondary">
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button className="btn-outline">
                    <Bookmark className="w-5 h-5" />
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

export default ActivitiesPage;