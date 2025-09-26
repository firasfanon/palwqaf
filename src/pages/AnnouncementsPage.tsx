import React, { useState } from 'react';
import { 
  Clock, 
  AlertCircle,
  AlertTriangle,
  Info, 
  Bell, 
  Search, 
  Filter, 
  Calendar, 
  Eye, 
  Star, 
  Heart, 
  Share2, 
  Bookmark, 
  User, 
  Tag, 
  TrendingUp, 
  BarChart3, 
  Grid, 
  List, 
  SortAsc, 
  SortDesc, 
  RefreshCw, 
  Download, 
  Upload, 
  Settings, 
  Plus, 
  Edit, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  Zap, 
  Activity, 
  Target, 
  Award, 
  Building, 
  Globe, 
  FileText, 
  Megaphone, 
  Volume2, 
  VolumeX, 
  Send, 
  MessageSquare, 
  Flag, 
  Archive, 
  Layers, 
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Navigation,
  Compass,
  Crown,
  Gem,
  Shield,
  Lock,
  Unlock,
  Database,
  HardDrive,
  Cpu,
  MemoryStick,
  Network,
  Wifi,
  WifiOff,
  Server,
  Monitor,
  Smartphone,
  Tablet,
  Chrome,
  ArrowUp,
  ArrowDown,
  Copy,
  ExternalLink,
  Printer,
  Save,
  MoreVertical,
  ThumbsUp,
  ThumbsDown,
  Rss,
  Home,
  School,
  ShoppingCart,
  Cross,
  TreePine,
  Mountain,
  Sunrise,
  Sunset,
  CloudRain,
  Sun,
  Moon,
  Wind,
  Thermometer
} from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { useToast } from '../hooks/useToast';

const AnnouncementsPage = () => {
  const { success, info, error: showError } = useToast();
  const { announcements } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [viewMode, setViewMode] = useState<'cards' | 'list' | 'timeline'>('cards');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedAnnouncements, setSelectedAnnouncements] = useState<number[]>([]);
  const [showStats, setShowStats] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<any>(null);

  const priorities = [
    { id: 'all', name: 'جميع الإعلانات' },
    { id: 'urgent', name: 'عاجل', icon: AlertCircle, color: 'text-red-600' },
    { id: 'high', name: 'مهم', icon: Star, color: 'text-orange-600' },
    { id: 'normal', name: 'عادي', icon: Info, color: 'text-blue-600' },
    { id: 'low', name: 'منخفض', icon: CheckCircle, color: 'text-green-600' }
  ];

  const categories = [
    { id: 'all', name: 'جميع الفئات' },
    { id: 'general', name: 'عام', icon: Info, color: 'text-gray-600' },
    { id: 'religious', name: 'ديني', icon: Building, color: 'text-green-600' },
    { id: 'administrative', name: 'إداري', icon: Settings, color: 'text-blue-600' },
    { id: 'events', name: 'فعاليات', icon: Calendar, color: 'text-purple-600' },
    { id: 'services', name: 'خدمات', icon: Heart, color: 'text-pink-600' },
    { id: 'emergency', name: 'طوارئ', icon: AlertCircle, color: 'text-red-600' }
  ];

  const statusOptions = [
    { id: 'all', name: 'جميع الحالات' },
    { id: 'active', name: 'نشط' },
    { id: 'expired', name: 'منتهي الصلاحية' },
    { id: 'scheduled', name: 'مجدول' }
  ];

  let filteredAnnouncements = announcements.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = selectedPriority === 'all' || item.priority === selectedPriority;
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    
    let matchesDate = true;
    if (dateRange.from) {
      matchesDate = matchesDate && new Date(item.date) >= new Date(dateRange.from);
    }
    if (dateRange.to) {
      matchesDate = matchesDate && new Date(item.date) <= new Date(dateRange.to);
    }
    
    return matchesSearch && matchesPriority && matchesCategory && matchesDate;
  });

  // ترتيب النتائج
  filteredAnnouncements = [...filteredAnnouncements].sort((a, b) => {
    let aValue, bValue;
    switch (sortBy) {
      case 'title':
        aValue = a.title;
        bValue = b.title;
        break;
      case 'priority':
        const priorityOrder = { urgent: 4, high: 3, normal: 2, low: 1 };
        aValue = priorityOrder[a.priority as keyof typeof priorityOrder];
        bValue = priorityOrder[b.priority as keyof typeof priorityOrder];
        break;
      default:
        aValue = new Date(a.date);
        bValue = new Date(b.date);
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const totalPages = Math.ceil(filteredAnnouncements.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentAnnouncements = filteredAnnouncements.slice(startIndex, startIndex + itemsPerPage);

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'high':
        return <Bell className="w-5 h-5 text-orange-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const handleBulkAction = (action: string) => {
    if (selectedAnnouncements.length === 0) {
      showError('لم يتم تحديد إعلانات', 'يرجى تحديد إعلان واحد على الأقل');
      return;
    }

    switch (action) {
      case 'feature':
        success('تم تمييز الإعلانات', `تم تمييز ${selectedAnnouncements.length} إعلان`);
        break;
      case 'archive':
        success('تم أرشفة الإعلانات', `تم أرشفة ${selectedAnnouncements.length} إعلان`);
        break;
      case 'delete':
        if (window.confirm(`هل أنت متأكد من حذف ${selectedAnnouncements.length} إعلان؟`)) {
          success('تم حذف الإعلانات', `تم حذف ${selectedAnnouncements.length} إعلان`);
        }
        break;
    }
    setSelectedAnnouncements([]);
  };

  // حساب الإحصائيات
  const urgentCount = announcements.filter(a => a.priority === 'urgent').length;
  const activeCount = announcements.filter(a => !a.validUntil || new Date(a.validUntil) > new Date()).length;
  const expiredCount = announcements.filter(a => a.validUntil && new Date(a.validUntil) <= new Date()).length;
  const todayCount = announcements.filter(a => {
    const today = new Date();
    const announcementDate = new Date(a.date);
    return announcementDate.toDateString() === today.toDateString();
  }).length;

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-50 border-red-200 hover:bg-red-100';
      case 'high':
        return 'bg-orange-50 border-orange-200 hover:bg-orange-100';
      default:
        return 'bg-blue-50 border-blue-200 hover:bg-blue-100';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="islamic-gradient text-white rounded-2xl p-8 mb-8 islamic-pattern">
          <div className="text-center">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl animate-float">
              <Megaphone className="w-12 h-12 text-islamic-600" />
            </div>
            <h1 className="heading-1 text-white mb-4">الإعلانات الرسمية</h1>
            <p className="body-large text-golden-200 max-w-4xl mx-auto">
              آخر الإعلانات والتنبيهات المهمة من وزارة الأوقاف والشؤون الدينية
            </p>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card-islamic">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-sage-600 font-body">إجمالي الإعلانات</p>
                <p className="text-3xl font-bold text-islamic-700 font-display">{announcements.length}</p>
              </div>
              <Megaphone className="w-8 h-8 text-islamic-500" />
            </div>
          </div>
          
          <div className="card-golden">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-sage-600 font-body">إعلانات عاجلة</p>
                <p className="text-3xl font-bold text-golden-700 font-display">{urgentCount}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-golden-500" />
            </div>
          </div>
          
          <div className="card-sage">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-sage-600 font-body">إعلانات نشطة</p>
                <p className="text-3xl font-bold text-sage-700 font-display">{activeCount}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-sage-500" />
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-sage-600 font-body">اليوم</p>
                <p className="text-3xl font-bold text-gray-700 font-display">{todayCount}</p>
              </div>
              <Clock className="w-8 h-8 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Advanced Search and Filters */}
        <div className="bg-white rounded-2xl shadow-elegant p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-islamic-800 font-display">البحث والتصفية</h2>
              <p className="text-sage-600 font-body">أدوات متقدمة للبحث في الإعلانات</p>
            </div>
            <div className="flex items-center space-x-4 space-x-reverse">
              <button
                onClick={() => setShowStats(!showStats)}
                className="btn-secondary"
              >
                <BarChart3 className="w-5 h-5 ml-2" />
                الإحصائيات
              </button>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="btn-primary"
              >
                <Filter className="w-5 h-5 ml-2" />
                {showFilters ? 'إخفاء الفلاتر' : 'إظهار الفلاتر'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
            <div className="relative">
              <Search className="absolute right-3 top-3 h-5 w-5 text-sage-400" />
              <input
                type="text"
                placeholder="البحث في الإعلانات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input pr-10"
              />
            </div>
            
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="form-select"
            >
              {priorities.map(priority => (
                <option key={priority.id} value={priority.id}>{priority.name}</option>
              ))}
            </select>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="form-select"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
            
            <div className="flex items-center space-x-2 space-x-reverse">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="form-select"
              >
                <option value="date">التاريخ</option>
                <option value="title">العنوان</option>
                <option value="priority">الأولوية</option>
              </select>
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="p-2 border border-sage-300 rounded-lg hover:bg-sage-50"
              >
                {sortOrder === 'asc' ? <SortAsc className="w-5 h-5" /> : <SortDesc className="w-5 h-5" />}
              </button>
            </div>
            
            <div className="flex items-center space-x-2 space-x-reverse">
              <button
                onClick={() => setViewMode('cards')}
                className={`p-2 rounded-lg ${viewMode === 'cards' ? 'bg-islamic-600 text-white' : 'bg-gray-200 text-gray-600'}`}
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
                onClick={() => setViewMode('timeline')}
                className={`p-2 rounded-lg ${viewMode === 'timeline' ? 'bg-islamic-600 text-white' : 'bg-gray-200 text-gray-600'}`}
              >
                <Clock className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="border-t border-sage-200 pt-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">من تاريخ</label>
                  <input
                    type="date"
                    value={dateRange.from}
                    onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">إلى تاريخ</label>
                  <input
                    type="date"
                    value={dateRange.to}
                    onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">الحالة</label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="form-select"
                  >
                    {statusOptions.map(status => (
                      <option key={status.id} value={status.id}>{status.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Bulk Actions */}
          {selectedAnnouncements.length > 0 && (
            <div className="bg-islamic-50 border border-islamic-200 rounded-xl p-4 mt-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-islamic-800 font-body">
                  تم تحديد {selectedAnnouncements.length} إعلان
                </span>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <button 
                    onClick={() => handleBulkAction('feature')}
                    className="btn-primary text-sm px-3 py-1"
                  >
                    تمييز
                  </button>
                  <button 
                    onClick={() => handleBulkAction('archive')}
                    className="btn-secondary text-sm px-3 py-1"
                  >
                    أرشفة
                  </button>
                  <button 
                    onClick={() => handleBulkAction('delete')}
                    className="bg-red-600 text-white text-sm px-3 py-1 rounded-lg hover:bg-red-700"
                  >
                    حذف
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Statistics Panel */}
        {showStats && (
          <div className="card-golden mb-8">
            <h3 className="text-lg font-semibold text-golden-800 mb-4 font-display">إحصائيات الإعلانات</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg text-center">
                <AlertTriangle className="w-8 h-8 text-red-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-red-700 font-display">{urgentCount}</p>
                <p className="text-sm text-red-600 font-body">إعلانات عاجلة</p>
              </div>
              <div className="bg-white p-4 rounded-lg text-center">
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-700 font-display">{activeCount}</p>
                <p className="text-sm text-green-600 font-body">إعلانات نشطة</p>
              </div>
              <div className="bg-white p-4 rounded-lg text-center">
                <XCircle className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-700 font-display">{expiredCount}</p>
                <p className="text-sm text-gray-600 font-body">منتهية الصلاحية</p>
              </div>
              <div className="bg-white p-4 rounded-lg text-center">
                <Activity className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-700 font-display">{todayCount}</p>
                <p className="text-sm text-blue-600 font-body">إعلانات اليوم</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* الشريط الجانبي */}
          <div className="lg:col-span-1">
            <div className="card-islamic mb-6">
              <h3 className="text-lg font-semibold text-islamic-800 mb-4 flex items-center font-display">
                <Filter className="w-5 h-5 ml-2 text-islamic-600" />
                فلاتر الأولوية
              </h3>
              <div className="space-y-3">
                {priorities.map((priority) => (
                  <button
                    key={priority.id}
                    onClick={() => setSelectedPriority(priority.id)}
                    className={`w-full flex items-center space-x-2 space-x-reverse px-4 py-3 rounded-lg transition-colors font-body ${
                      selectedPriority === priority.id
                        ? 'bg-islamic-600 text-white'
                        : 'bg-white text-sage-700 hover:bg-islamic-50 border border-sage-200'
                    }`}
                  >
                    {priority.icon && <priority.icon className={`w-4 h-4 ${selectedPriority === priority.id ? 'text-white' : priority.color}`} />}
                    <span>{priority.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* إحصائيات سريعة */}
            <div className="card-golden mb-6">
              <h3 className="text-lg font-semibold text-golden-800 mb-4 font-display">إحصائيات سريعة</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sage-600 font-body">النتائج المفلترة</span>
                  <span className="font-bold text-golden-700 font-display">{filteredAnnouncements.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sage-600 font-body">إعلانات عاجلة</span>
                  <span className="font-bold text-red-600 font-display">{urgentCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sage-600 font-body">إعلانات نشطة</span>
                  <span className="font-bold text-green-600 font-display">{activeCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sage-600 font-body">منتهية الصلاحية</span>
                  <span className="font-bold text-gray-600 font-display">{expiredCount}</span>
                </div>
              </div>
            </div>

            {/* اشتراك في الإشعارات */}
            <div className="card-sage">
              <h3 className="text-lg font-semibold text-sage-800 mb-4 font-display">اشتراك في الإشعارات</h3>
              <p className="text-sage-600 text-sm mb-4 font-body">
                احصل على إشعارات فورية عند نشر إعلانات جديدة
              </p>
              <button 
                onClick={() => setShowSubscriptionModal(true)}
                className="w-full btn-primary"
              >
                <Bell className="w-5 h-5 ml-2" />
                اشترك في الإشعارات
              </button>
            </div>
          </div>

          {/* قائمة الإعلانات */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-islamic-800 font-display">
                  الإعلانات ({filteredAnnouncements.length})
                </h2>
                <p className="text-sage-600 font-body">
                  عرض {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredAnnouncements.length)} من {filteredAnnouncements.length}
                </p>
              </div>
              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
                className="form-select text-sm"
              >
                <option value={4}>4 لكل صفحة</option>
                <option value={8}>8 لكل صفحة</option>
                <option value={16}>16 لكل صفحة</option>
              </select>
            </div>

            {/* Bulk Actions */}
            {selectedAnnouncements.length > 0 && (
              <div className="bg-islamic-50 border border-islamic-200 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-islamic-800 font-body">
                    تم تحديد {selectedAnnouncements.length} إعلان
                  </span>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <button 
                      onClick={() => handleBulkAction('feature')}
                      className="btn-primary text-sm px-3 py-1"
                    >
                      تمييز
                    </button>
                    <button 
                      onClick={() => handleBulkAction('archive')}
                      className="btn-secondary text-sm px-3 py-1"
                    >
                      أرشفة
                    </button>
                    <button 
                      onClick={() => handleBulkAction('delete')}
                      className="bg-red-600 text-white text-sm px-3 py-1 rounded-lg hover:bg-red-700"
                    >
                      حذف
                    </button>
                  </div>
                </div>
              </div>
            )}

            {viewMode === 'cards' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentAnnouncements.map((item, index) => (
                  <div
                    key={item.id}
                    className={`card-islamic hover-lift animate-fade-in-up border-r-4 transition-all duration-300 ${getPriorityStyle(item.priority)}`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        {getPriorityIcon(item.priority)}
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800 font-display">{item.title}</h3>
                          <div className="flex items-center space-x-4 space-x-reverse mt-1">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityBadge(item.priority)}`}>
                              {item.priority === 'urgent' ? 'عاجل' : item.priority === 'high' ? 'مهم' : item.priority === 'normal' ? 'عادي' : 'منخفض'}
                            </span>
                            <div className="flex items-center text-sm text-gray-500">
                              <Clock className="w-4 h-4 ml-1" />
                              <span className="font-body">{new Date(item.date).toLocaleDateString('ar-EG')}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={selectedAnnouncements.includes(item.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedAnnouncements(prev => [...prev, item.id]);
                          } else {
                            setSelectedAnnouncements(prev => prev.filter(id => id !== item.id));
                          }
                        }}
                        className="rounded border-islamic-300 text-islamic-600 focus:ring-islamic-500"
                      />
                    </div>
                    
                    <p className="text-gray-600 mb-4 leading-relaxed font-body">
                      {item.description}
                    </p>
                    
                    {item.details && (
                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <h4 className="font-semibold text-gray-800 mb-2 font-display">التفاصيل:</h4>
                        <p className="text-gray-600 text-sm font-body">{item.details}</p>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-500">
                        <span className="font-body">نُشر في: {new Date(item.date).toLocaleDateString('ar-EG')}</span>
                        {item.validUntil && (
                          <span className="font-body">صالح حتى: {new Date(item.validUntil).toLocaleDateString('ar-EG')}</span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <button 
                          onClick={() => {
                            setSelectedAnnouncement(item);
                            setShowDetailsModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-700">
                          <Share2 className="w-4 h-4" />
                        </button>
                        <button className="text-purple-600 hover:text-purple-700">
                          <Bookmark className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : viewMode === 'list' ? (
              <div className="space-y-4">
                {currentAnnouncements.map((item) => (
                  <div
                    key={item.id}
                    className={`bg-white rounded-lg shadow-md p-6 border-r-4 transition-all duration-300 ${getPriorityStyle(item.priority)}`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        {getPriorityIcon(item.priority)}
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800 font-display">{item.title}</h3>
                          <div className="flex items-center space-x-4 space-x-reverse mt-1">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityBadge(item.priority)}`}>
                              {item.priority === 'urgent' ? 'عاجل' : item.priority === 'high' ? 'مهم' : item.priority === 'normal' ? 'عادي' : 'منخفض'}
                            </span>
                            <div className="flex items-center text-sm text-gray-500">
                              <Clock className="w-4 h-4 ml-1" />
                              <span className="font-body">{new Date(item.date).toLocaleDateString('ar-EG')}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={selectedAnnouncements.includes(item.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedAnnouncements(prev => [...prev, item.id]);
                          } else {
                            setSelectedAnnouncements(prev => prev.filter(id => id !== item.id));
                          }
                        }}
                        className="rounded border-islamic-300 text-islamic-600 focus:ring-islamic-500"
                      />
                    </div>
                    
                    <p className="text-gray-600 mb-4 leading-relaxed font-body">
                      {item.description}
                    </p>
                    
                    {item.details && (
                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <h4 className="font-semibold text-gray-800 mb-2 font-display">التفاصيل:</h4>
                        <p className="text-gray-600 text-sm font-body">{item.details}</p>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-500">
                        <span className="font-body">نُشر في: {new Date(item.date).toLocaleDateString('ar-EG')}</span>
                        {item.validUntil && (
                          <span className="font-body">صالح حتى: {new Date(item.validUntil).toLocaleDateString('ar-EG')}</span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <button 
                          onClick={() => {
                            setSelectedAnnouncement(item);
                            setShowDetailsModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-700">
                          <Share2 className="w-4 h-4" />
                        </button>
                        <button className="text-purple-600 hover:text-purple-700">
                          <Bookmark className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Timeline View
              <div className="relative">
                <div className="absolute right-8 top-0 bottom-0 w-1 bg-gradient-to-b from-islamic-500 to-golden-500 rounded-full"></div>
                <div className="space-y-8">
                  {currentAnnouncements.map((item, index) => (
                    <div key={item.id} className="relative flex items-start space-x-6 space-x-reverse">
                      <div className="absolute right-6 w-4 h-4 bg-islamic-600 rounded-full border-4 border-white shadow-lg transform -translate-x-1/2"></div>
                      <div className="mr-16 bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow border-r-4 border-islamic-500">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3 space-x-reverse">
                            {getPriorityIcon(item.priority)}
                            <h3 className="text-lg font-semibold text-gray-800 font-display">{item.title}</h3>
                          </div>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityBadge(item.priority)}`}>
                            {item.priority === 'urgent' ? 'عاجل' : item.priority === 'high' ? 'مهم' : item.priority === 'normal' ? 'عادي' : 'منخفض'}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-3 font-body">{item.description}</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="w-4 h-4 ml-1" />
                          <span className="font-body">{new Date(item.date).toLocaleDateString('ar-EG')}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* No Results */}
            {filteredAnnouncements.length === 0 && (
              <div className="card text-center py-12">
                <Megaphone className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2 font-display">لم يتم العثور على إعلانات</h3>
                <p className="text-gray-500 mb-6 font-body">جرب تعديل معايير البحث أو الفلاتر</p>
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedPriority('all');
                    setSelectedCategory('all');
                    setDateRange({ from: '', to: '' });
                  }}
                  className="btn-primary"
                >
                  مسح الفلاتر
                </button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-sage-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-sage-50 font-body"
                  >
                    السابق
                  </button>
                  
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    const page = currentPage <= 3 ? i + 1 : currentPage - 2 + i;
                    return page <= totalPages ? (
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
                    ) : null;
                  })}
                  
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
          </div>
        </div>

        {/* Emergency Announcements */}
        {urgentCount > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 mt-8">
            <div className="text-center">
              <AlertTriangle className="w-16 h-16 text-red-600 mx-auto mb-4" />
              <h2 className="heading-2 text-red-800 mb-4">إعلانات عاجلة</h2>
              <p className="text-red-700 mb-6 font-body">
                يوجد {urgentCount} إعلان عاجل يتطلب انتباهك الفوري
              </p>
              <button 
                onClick={() => setSelectedPriority('urgent')}
                className="btn-primary bg-red-600 hover:bg-red-700"
              >
                عرض الإعلانات العاجلة
              </button>
            </div>
          </div>
        )}

        {/* Subscription Modal */}
        {showSubscriptionModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 w-full max-w-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="heading-2 text-islamic-800">اشتراك في إشعارات الإعلانات</h2>
                <button
                  onClick={() => setShowSubscriptionModal(false)}
                  className="text-sage-500 hover:text-sage-700 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="text-center mb-6">
                <Bell className="w-16 h-16 text-islamic-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-islamic-800 mb-2 font-display">احصل على إشعارات فورية</h3>
                <p className="text-sage-600 font-body">سنرسل لك إشعارات عند نشر إعلانات جديدة حسب اهتماماتك</p>
              </div>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">البريد الإلكتروني</label>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="أدخل بريدك الإلكتروني"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">رقم الهاتف (اختياري)</label>
                  <input
                    type="tel"
                    className="form-input"
                    placeholder="+970 X XXX XXXX"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">الفئات المهتم بها</label>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.slice(1).map((category) => (
                      <label key={category.id} className="flex items-center space-x-2 space-x-reverse">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="rounded border-islamic-300 text-islamic-600 focus:ring-islamic-500"
                        />
                        <span className="text-sm font-body">{category.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">أولويات الإشعارات</label>
                  <div className="space-y-2">
                    {priorities.slice(1).map((priority) => (
                      <label key={priority.id} className="flex items-center space-x-2 space-x-reverse">
                        <input
                          type="checkbox"
                          defaultChecked={priority.id === 'urgent' || priority.id === 'high'}
                          className="rounded border-islamic-300 text-islamic-600 focus:ring-islamic-500"
                        />
                        <span className="text-sm font-body">{priority.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-end space-x-4 space-x-reverse">
                  <button
                    type="button"
                    onClick={() => setShowSubscriptionModal(false)}
                    className="btn-outline"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      success('تم الاشتراك بنجاح', 'ستصلك إشعارات الإعلانات الجديدة على بريدك الإلكتروني');
                      setShowSubscriptionModal(false);
                    }}
                    className="btn-primary"
                  >
                    <Bell className="w-5 h-5 ml-2" />
                    تأكيد الاشتراك
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Announcement Details Modal */}
        {showDetailsModal && selectedAnnouncement && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="heading-2 text-islamic-800">تفاصيل الإعلان</h2>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-sage-500 hover:text-sage-700 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-3 space-x-reverse mb-4">
                    {getPriorityIcon(selectedAnnouncement.priority)}
                    <h3 className="text-2xl font-semibold text-islamic-800 font-display">{selectedAnnouncement.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityBadge(selectedAnnouncement.priority)}`}>
                      {selectedAnnouncement.priority === 'urgent' ? 'عاجل' : 
                       selectedAnnouncement.priority === 'high' ? 'مهم' : 
                       selectedAnnouncement.priority === 'normal' ? 'عادي' : 'منخفض'}
                    </span>
                  </div>
                </div>
                
                <div className="bg-islamic-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-islamic-800 mb-3 font-display">محتوى الإعلان</h4>
                  <p className="text-sage-700 font-body leading-relaxed text-lg">{selectedAnnouncement.description}</p>
                  {selectedAnnouncement.details && (
                    <div className="mt-4 p-4 bg-white rounded-lg border border-islamic-200">
                      <h5 className="font-semibold text-islamic-800 mb-2 font-display">تفاصيل إضافية:</h5>
                      <p className="text-sage-700 font-body">{selectedAnnouncement.details}</p>
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-golden-50 p-6 rounded-xl">
                    <h4 className="font-semibold text-golden-800 mb-3 font-display">معلومات الإعلان</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sage-600 font-body">تاريخ النشر:</span>
                        <span className="font-medium font-body">{new Date(selectedAnnouncement.date).toLocaleDateString('ar-EG')}</span>
                      </div>
                      {selectedAnnouncement.validUntil && (
                        <div className="flex items-center justify-between">
                          <span className="text-sage-600 font-body">صالح حتى:</span>
                          <span className="font-medium font-body">{new Date(selectedAnnouncement.validUntil).toLocaleDateString('ar-EG')}</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-sage-600 font-body">الأولوية:</span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityBadge(selectedAnnouncement.priority)}`}>
                          {selectedAnnouncement.priority === 'urgent' ? 'عاجل' : 
                           selectedAnnouncement.priority === 'high' ? 'مهم' : 
                           selectedAnnouncement.priority === 'normal' ? 'عادي' : 'منخفض'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-sage-50 p-6 rounded-xl">
                    <h4 className="font-semibold text-sage-800 mb-3 font-display">إجراءات سريعة</h4>
                    <div className="space-y-3">
                      <button 
                        onClick={() => success('تم حفظ الإعلان', 'تم إضافة الإعلان إلى المفضلة')}
                        className="w-full btn-primary"
                      >
                        <Bookmark className="w-5 h-5 ml-2" />
                        حفظ في المفضلة
                      </button>
                      <button 
                        onClick={() => success('تم مشاركة الإعلان', 'تم نسخ رابط الإعلان')}
                        className="w-full btn-secondary"
                      >
                        <Share2 className="w-5 h-5 ml-2" />
                        مشاركة الإعلان
                      </button>
                      <button 
                        onClick={() => success('تم تحميل الإعلان', 'سيتم تحميل الإعلان كملف PDF')}
                        className="w-full btn-outline"
                      >
                        <Download className="w-5 h-5 ml-2" />
                        تحميل PDF
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnnouncementsPage;