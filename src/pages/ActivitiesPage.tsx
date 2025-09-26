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
  XCircle,
  ArrowLeft,
  Bell,
  User,
  Phone,
  Mail,
  Megaphone
} from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { useToast } from '../hooks/useToast';

const ActivitiesPage = () => {
  const { success, info, error: showError } = useToast();
  const { activities } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'calendar'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedActivities, setSelectedActivities] = useState<number[]>([]);
  const [showStats, setShowStats] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<any>(null);

  // بيانات تجريبية للأنشطة
  const activitiesData = [
    {
      id: 1,
      title: 'مسابقة القرآن الكريم السنوية',
      description: 'مسابقة سنوية لحفظ القرآن الكريم وتجويده لجميع الفئات العمرية من مختلف المحافظات الفلسطينية',
      category: 'religious',
      type: 'competition',
      date: '2024-02-15',
      time: '09:00',
      endDate: '2024-02-17',
      location: 'المسجد الكبير - القدس',
      organizer: 'إدارة الشؤون الدينية',
      maxParticipants: 200,
      currentParticipants: 156,
      status: 'upcoming',
      image: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=800',
      registrationDeadline: '2024-02-10',
      ageGroups: ['أطفال (6-12)', 'شباب (13-25)', 'كبار (26+)'],
      prizes: ['الأول: 5000 ₪', 'الثاني: 3000 ₪', 'الثالث: 2000 ₪'],
      requirements: ['حفظ جزء عم كحد أدنى', 'إتقان التجويد', 'شهادة ميلاد'],
      contact: {
        name: 'الشيخ محمد أحمد',
        phone: '+970 2 298 2540',
        email: 'quran.competition@awqaf.gov.ps'
      }
    },
    {
      id: 2,
      title: 'ورشة عمل حول إدارة الأوقاف الحديثة',
      description: 'ورشة تدريبية متخصصة حول أحدث الطرق والتقنيات في إدارة الأوقاف الإسلامية واستثمارها',
      category: 'educational',
      type: 'workshop',
      date: '2024-02-20',
      time: '10:00',
      endDate: '2024-02-22',
      location: 'مركز التدريب - رام الله',
      organizer: 'إدارة التطوير والتدريب',
      maxParticipants: 50,
      currentParticipants: 38,
      status: 'upcoming',
      image: 'https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=800',
      registrationDeadline: '2024-02-15',
      targetAudience: ['مديرو الأوقاف', 'المحاسبون', 'المستشارون القانونيون'],
      topics: ['الاستثمار الوقفي', 'التكنولوجيا المالية', 'الإدارة الحديثة'],
      requirements: ['خبرة في إدارة الأوقاف', 'شهادة جامعية', 'حاسوب محمول'],
      contact: {
        name: 'د. فاطمة خالد',
        phone: '+970 2 298 2541',
        email: 'training@awqaf.gov.ps'
      }
    },
    {
      id: 3,
      title: 'محاضرة عن تاريخ المسجد الأقصى',
      description: 'محاضرة تاريخية شاملة عن تاريخ المسجد الأقصى المبارك ومكانته في الإسلام والتاريخ الفلسطيني',
      category: 'cultural',
      type: 'lecture',
      date: '2024-02-25',
      time: '16:00',
      endDate: '2024-02-25',
      location: 'قاعة المؤتمرات - البيرة',
      organizer: 'إدارة الثقافة والتراث',
      maxParticipants: 300,
      currentParticipants: 89,
      status: 'upcoming',
      image: 'https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&w=800',
      registrationDeadline: '2024-02-23',
      speakers: ['د. محمد التاريخي', 'أ. أحمد الأثري'],
      topics: ['تاريخ البناء', 'المعالم الأثرية', 'الأهمية الدينية'],
      requirements: ['لا توجد متطلبات خاصة'],
      contact: {
        name: 'أ. سارة أحمد',
        phone: '+970 2 298 2542',
        email: 'culture@awqaf.gov.ps'
      }
    },
    {
      id: 4,
      title: 'برنامج كفالة الأيتام - التسجيل المفتوح',
      description: 'برنامج اجتماعي شامل لكفالة الأطفال الأيتام وتوفير احتياجاتهم التعليمية والصحية والاجتماعية',
      category: 'social',
      type: 'program',
      date: '2024-03-01',
      time: '08:00',
      endDate: '2024-12-31',
      location: 'جميع المحافظات',
      organizer: 'إدارة الشؤون الاجتماعية',
      maxParticipants: 500,
      currentParticipants: 234,
      status: 'ongoing',
      image: 'https://images.pexels.com/photos/8107628/pexels-photo-8107628.jpeg?auto=compress&cs=tinysrgb&w=800',
      registrationDeadline: '2024-12-15',
      benefits: ['كفالة شهرية', 'رعاية صحية', 'دعم تعليمي', 'أنشطة ترفيهية'],
      requirements: ['شهادة وفاة الوالد', 'شهادة ميلاد الطفل', 'إثبات الحالة الاجتماعية'],
      contact: {
        name: 'أ. نور الدين محمد',
        phone: '+970 2 298 2543',
        email: 'orphans@awqaf.gov.ps'
      }
    },
    {
      id: 5,
      title: 'معرض التراث الإسلامي الفلسطيني',
      description: 'معرض شامل للتراث الإسلامي الفلسطيني يضم مخطوطات نادرة وقطع أثرية ووثائق تاريخية',
      category: 'cultural',
      type: 'exhibition',
      date: '2024-03-10',
      time: '10:00',
      endDate: '2024-03-20',
      location: 'متحف الأوقاف - القدس',
      organizer: 'إدارة التراث والمتاحف',
      maxParticipants: 1000,
      currentParticipants: 0,
      status: 'upcoming',
      image: 'https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=800',
      registrationDeadline: '2024-03-08',
      exhibits: ['مخطوطات نادرة', 'قطع أثرية', 'وثائق تاريخية', 'صور قديمة'],
      activities: ['جولات مرشدة', 'محاضرات تراثية', 'ورش تعليمية'],
      requirements: ['حجز مسبق للمجموعات', 'هوية شخصية'],
      contact: {
        name: 'د. خالد التراثي',
        phone: '+970 2 298 2544',
        email: 'heritage@awqaf.gov.ps'
      }
    },
    {
      id: 6,
      title: 'دورة تدريبية للأئمة الجدد',
      description: 'دورة تدريبية شاملة للأئمة والخطباء الجدد تشمل فن الخطابة والإرشاد الديني والتعامل مع المجتمع',
      category: 'training',
      type: 'course',
      date: '2024-03-15',
      time: '09:00',
      endDate: '2024-04-15',
      location: 'معهد إعداد الأئمة - نابلس',
      organizer: 'إدارة التعليم الديني',
      maxParticipants: 30,
      currentParticipants: 25,
      status: 'upcoming',
      image: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=800',
      registrationDeadline: '2024-03-10',
      curriculum: ['فن الخطابة', 'علوم القرآن', 'الحديث الشريف', 'الإرشاد النفسي'],
      duration: '30 يوم',
      requirements: ['شهادة جامعية في الشريعة', 'خبرة سابقة مفضلة', 'اختبار قبول'],
      contact: {
        name: 'الشيخ أحمد الإمام',
        phone: '+970 9 238 5678',
        email: 'imams.training@awqaf.gov.ps'
      }
    }
  ];

  const categories = [
    { id: 'all', name: 'جميع الأنشطة', icon: Calendar, color: 'text-islamic-600' },
    { id: 'religious', name: 'دينية', icon: Building, color: 'text-green-600' },
    { id: 'educational', name: 'تعليمية', icon: GraduationCap, color: 'text-blue-600' },
    { id: 'cultural', name: 'ثقافية', icon: Star, color: 'text-purple-600' },
    { id: 'social', name: 'اجتماعية', icon: Heart, color: 'text-pink-600' },
    { id: 'training', name: 'تدريبية', icon: Target, color: 'text-orange-600' },
    { id: 'community', name: 'مجتمعية', icon: Users, color: 'text-teal-600' }
  ];

  const statusOptions = [
    { id: 'all', name: 'جميع الحالات' },
    { id: 'upcoming', name: 'قادمة' },
    { id: 'ongoing', name: 'جارية' },
    { id: 'completed', name: 'مكتملة' },
    { id: 'cancelled', name: 'ملغية' }
  ];

  const locationOptions = [
    { id: 'all', name: 'جميع المواقع' },
    { id: 'القدس', name: 'القدس' },
    { id: 'رام الله', name: 'رام الله' },
    { id: 'نابلس', name: 'نابلس' },
    { id: 'غزة', name: 'غزة' },
    { id: 'الخليل', name: 'الخليل' },
    { id: 'جنين', name: 'جنين' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <Clock className="w-4 h-4 text-blue-500" />;
      case 'ongoing':
        return <Activity className="w-4 h-4 text-green-500" />;
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
        return 'bg-blue-100 text-blue-800';
      case 'ongoing':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredActivities = activitiesData.filter(activity => {
    const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.organizer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || activity.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || activity.status === selectedStatus;
    const matchesLocation = selectedLocation === 'all' || activity.location.includes(selectedLocation);
    
    let matchesDate = true;
    if (dateRange.from) {
      matchesDate = matchesDate && new Date(activity.date) >= new Date(dateRange.from);
    }
    if (dateRange.to) {
      matchesDate = matchesDate && new Date(activity.date) <= new Date(dateRange.to);
    }
    
    return matchesSearch && matchesCategory && matchesStatus && matchesLocation && matchesDate;
  });

  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentActivities = filteredActivities.slice(startIndex, startIndex + itemsPerPage);

  const handleRegistration = (activityId: number) => {
    const activity = activitiesData.find(a => a.id === activityId);
    if (activity) {
      setSelectedActivity(activity);
      setShowRegistrationModal(true);
    }
  };

  const handleBulkAction = (action: string) => {
    if (selectedActivities.length === 0) {
      showError('لم يتم تحديد أنشطة', 'يرجى تحديد نشاط واحد على الأقل');
      return;
    }

    switch (action) {
      case 'register':
        success('تم التسجيل في الأنشطة', `تم التسجيل في ${selectedActivities.length} نشاط`);
        break;
      case 'bookmark':
        success('تم حفظ الأنشطة', `تم حفظ ${selectedActivities.length} نشاط في المفضلة`);
        break;
      case 'share':
        success('تم مشاركة الأنشطة', `تم مشاركة ${selectedActivities.length} نشاط`);
        break;
    }
    setSelectedActivities([]);
  };

  // حساب الإحصائيات
  const totalParticipants = activitiesData.reduce((sum, activity) => sum + activity.currentParticipants, 0);
  const upcomingActivities = activitiesData.filter(activity => activity.status === 'upcoming').length;
  const ongoingActivities = activitiesData.filter(activity => activity.status === 'ongoing').length;
  const completedActivities = activitiesData.filter(activity => activity.status === 'completed').length;

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
              تعرف على الأنشطة والفعاليات المتنوعة التي تنظمها وزارة الأوقاف والشؤون الدينية
            </p>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card-islamic">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-sage-600 font-body">إجمالي الأنشطة</p>
                <p className="text-3xl font-bold text-islamic-700 font-display">{activitiesData.length}</p>
              </div>
              <Calendar className="w-8 h-8 text-islamic-500" />
            </div>
          </div>
          
          <div className="card-golden">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-sage-600 font-body">إجمالي المشاركين</p>
                <p className="text-2xl font-bold text-golden-700 font-display">{totalParticipants.toLocaleString()}</p>
              </div>
              <Users className="w-8 h-8 text-golden-500" />
            </div>
          </div>
          
          <div className="card-sage">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-sage-600 font-body">أنشطة قادمة</p>
                <p className="text-3xl font-bold text-sage-700 font-display">{upcomingActivities}</p>
              </div>
              <Clock className="w-8 h-8 text-sage-500" />
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-sage-600 font-body">أنشطة جارية</p>
                <p className="text-3xl font-bold text-gray-700 font-display">{ongoingActivities}</p>
              </div>
              <Activity className="w-8 h-8 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-elegant p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
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
            
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="form-select"
            >
              {locationOptions.map(location => (
                <option key={location.id} value={location.id}>{location.name}</option>
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
                onClick={() => setViewMode('calendar')}
                className={`p-2 rounded-lg ${viewMode === 'calendar' ? 'bg-islamic-600 text-white' : 'bg-gray-200 text-gray-600'}`}
              >
                <Calendar className="w-5 h-5" />
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
                <category.icon className={`w-5 h-5 ${selectedCategory === category.id ? 'text-white' : category.color}`} />
                <span className="font-body">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Activities Display */}
        {viewMode === 'grid' ? (
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
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <Users className="w-4 h-4 text-islamic-600" />
                          <span className="font-body text-islamic-700">{activity.currentParticipants}/{activity.maxParticipants}</span>
                        </div>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <Calendar className="w-4 h-4 text-golden-600" />
                          <span className="font-body text-golden-700">{new Date(activity.date).toLocaleDateString('ar-EG')}</span>
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
                      <Clock className="w-4 h-4 text-sage-400" />
                      <span className="text-sage-600 font-body">{activity.time}</span>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse text-sm">
                      <User className="w-4 h-4 text-sage-400" />
                      <span className="text-sage-600 font-body">{activity.organizer}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-sage-200">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      {getStatusIcon(activity.status)}
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(activity.status)}`}>
                        {statusOptions.find(s => s.id === activity.status)?.name}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <button 
                        onClick={() => handleRegistration(activity.id)}
                        className="btn-primary text-sm px-4 py-2"
                      >
                        {activity.status === 'upcoming' ? 'سجل الآن' : 'عرض التفاصيل'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : viewMode === 'list' ? (
          <div className="space-y-6 mb-8">
            {currentActivities.map((activity) => (
              <div key={activity.id} className="card-islamic">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  <div>
                    <img
                      src={activity.image}
                      alt={activity.title}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                  <div className="lg:col-span-3">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-4 space-x-reverse">
                        <span className="px-3 py-1 bg-islamic-100 text-islamic-800 rounded-full text-sm font-medium">
                          {categories.find(c => c.id === activity.category)?.name}
                        </span>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          {getStatusIcon(activity.status)}
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(activity.status)}`}>
                            {statusOptions.find(s => s.id === activity.status)?.name}
                          </span>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={selectedActivities.includes(activity.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedActivities(prev => [...prev, activity.id]);
                          } else {
                            setSelectedActivities(prev => prev.filter(id => id !== activity.id));
                          }
                        }}
                        className="rounded border-islamic-300 text-islamic-600 focus:ring-islamic-500"
                      />
                    </div>
                    
                    <h3 className="text-xl font-semibold text-islamic-800 mb-3 font-display">
                      {activity.title}
                    </h3>
                    
                    <p className="text-sage-600 mb-4 font-body leading-relaxed">
                      {activity.description}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center space-x-2 space-x-reverse text-sm">
                        <Calendar className="w-4 h-4 text-sage-400" />
                        <span className="text-sage-600 font-body">{new Date(activity.date).toLocaleDateString('ar-EG')}</span>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse text-sm">
                        <MapPin className="w-4 h-4 text-sage-400" />
                        <span className="text-sage-600 font-body">{activity.location}</span>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse text-sm">
                        <Users className="w-4 h-4 text-sage-400" />
                        <span className="text-sage-600 font-body">{activity.currentParticipants}/{activity.maxParticipants}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-500">
                        <User className="w-4 h-4" />
                        <span className="font-body">{activity.organizer}</span>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <button className="text-blue-600 hover:text-blue-700">
                          <Share2 className="w-4 h-4" />
                        </button>
                        <button className="text-golden-600 hover:text-golden-700">
                          <Bookmark className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleRegistration(activity.id)}
                          className="btn-primary text-sm px-4 py-2"
                        >
                          {activity.status === 'upcoming' ? 'سجل الآن' : 'عرض التفاصيل'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Calendar View
          <div className="card-islamic mb-8">
            <h3 className="text-lg font-semibold text-islamic-800 mb-6 font-display">التقويم الشهري للأنشطة</h3>
            <div className="bg-islamic-50 rounded-xl p-6">
              <div className="text-center">
                <Calendar className="w-24 h-24 text-islamic-600 mx-auto mb-6" />
                <h4 className="text-2xl font-semibold text-islamic-800 mb-4 font-display">عرض تقويمي</h4>
                <p className="text-sage-700 mb-6 font-body">عرض جميع الأنشطة في تقويم تفاعلي</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {currentActivities.slice(0, 3).map((activity) => (
                    <div key={activity.id} className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="flex items-center space-x-2 space-x-reverse mb-2">
                        <Calendar className="w-5 h-5 text-islamic-600" />
                        <span className="font-medium text-islamic-800 font-body">{activity.title}</span>
                      </div>
                      <p className="text-sm text-sage-600 font-body">{new Date(activity.date).toLocaleDateString('ar-EG')}</p>
                      <p className="text-sm text-sage-600 font-body">{activity.location}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-2 space-x-reverse">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-sage-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-sage-50 font-body"
              >
                السابق
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 border rounded-lg font-body ${
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
                className="px-4 py-2 border border-sage-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-sage-50 font-body"
              >
                التالي
              </button>
            </div>
          </div>
        )}

        {/* Registration Modal */}
        {showRegistrationModal && selectedActivity && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="heading-2 text-islamic-800">تفاصيل النشاط والتسجيل</h2>
                <button
                  onClick={() => setShowRegistrationModal(false)}
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
                    <h3 className="font-semibold text-islamic-800 mb-3 font-display">معلومات النشاط</h3>
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
                        <User className="w-5 h-5 text-purple-600" />
                        <span className="font-body text-sage-700">{selectedActivity.organizer}</span>
                      </div>
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <Users className="w-5 h-5 text-green-600" />
                        <span className="font-body text-sage-700">{selectedActivity.currentParticipants}/{selectedActivity.maxParticipants} مشارك</span>
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
                  
                  <div className="space-y-3">
                    {selectedActivity.status === 'upcoming' ? (
                      <button 
                        onClick={() => {
                          success('تم التسجيل بنجاح', `تم تسجيلك في نشاط: ${selectedActivity.title}`);
                          setShowRegistrationModal(false);
                        }}
                        className="w-full btn-primary"
                      >
                        <Plus className="w-5 h-5 ml-2" />
                        سجل في النشاط
                      </button>
                    ) : (
                      <button className="w-full btn-secondary">
                        <Eye className="w-5 h-5 ml-2" />
                        عرض تفاصيل النشاط
                      </button>
                    )}
                    <button className="w-full btn-outline">
                      <Share2 className="w-5 h-5 ml-2" />
                      مشاركة النشاط
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* How to Participate Section */}
        <div className="bg-white rounded-2xl shadow-elegant p-8">
          <h2 className="heading-2 text-islamic-800 mb-6">كيفية المشاركة في الأنشطة</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: 1, title: 'اختيار النشاط', desc: 'تصفح الأنشطة واختر ما يناسبك', icon: Target },
              { step: 2, title: 'التسجيل', desc: 'املأ نموذج التسجيل بالمعلومات المطلوبة', icon: FileText },
              { step: 3, title: 'التأكيد', desc: 'انتظر رسالة التأكيد على بريدك الإلكتروني', icon: CheckCircle },
              { step: 4, title: 'المشاركة', desc: 'احضر في الموعد المحدد واستمتع بالنشاط', icon: Star }
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
      </div>
    </div>
  );
};

export default ActivitiesPage;