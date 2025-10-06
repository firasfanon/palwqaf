import React, { useState } from 'react';
import { 
  Calendar, 
  Eye, 
  User, 
  Share2, 
  Bookmark, 
  Search, 
  Filter,
  Heart,
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
  Star,
  Clock,
  ArrowLeft,
  Bell,
  Megaphone,
  Newspaper
} from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { useToast } from '../hooks/useToast';

const NewsPage = () => {
  const { success, info, error: showError } = useToast();
  const { news } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAuthor, setSelectedAuthor] = useState('all');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'magazine'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedNews, setSelectedNews] = useState<number[]>([]);
  const [showStats, setShowStats] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  const categories = [
    { id: 'all', name: 'جميع الأخبار', icon: Newspaper, color: 'text-islamic-600' },
    { id: 'mosques', name: 'المساجد', icon: Building, color: 'text-green-600' },
    { id: 'events', name: 'الفعاليات', icon: Calendar, color: 'text-blue-600' },
    { id: 'education', name: 'التعليم', icon: GraduationCap, color: 'text-purple-600' },
    { id: 'social', name: 'اجتماعي', icon: Heart, color: 'text-pink-600' },
    { id: 'international', name: 'دولي', icon: Globe, color: 'text-teal-600' },
    { id: 'administrative', name: 'إداري', icon: Settings, color: 'text-orange-600' }
  ];

  const authors = [
    { id: 'all', name: 'جميع المحررين' },
    { id: 'admin_news', name: 'إدارة الأخبار' },
    { id: 'activities_dept', name: 'قسم الأنشطة' },
    { id: 'development_dept', name: 'إدارة التطوير' },
    { id: 'public_relations', name: 'العلاقات العامة' }
  ];

  let filteredNews = news.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesAuthor = selectedAuthor === 'all' || item.author === selectedAuthor;
    
    let matchesDate = true;
    if (dateRange.from) {
      matchesDate = matchesDate && new Date(item.date) >= new Date(dateRange.from);
    }
    if (dateRange.to) {
      matchesDate = matchesDate && new Date(item.date) <= new Date(dateRange.to);
    }
    
    return matchesSearch && matchesCategory && matchesAuthor && matchesDate;
  });

  // ترتيب النتائج
  filteredNews = [...filteredNews].sort((a, b) => {
    let aValue, bValue;
    switch (sortBy) {
      case 'title':
        aValue = a.title;
        bValue = b.title;
        break;
      case 'views':
        aValue = a.views;
        bValue = b.views;
        break;
      case 'author':
        aValue = a.author;
        bValue = b.author;
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

  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentNews = filteredNews.slice(startIndex, startIndex + itemsPerPage);

  const handleBulkAction = (action: string) => {
    if (selectedNews.length === 0) {
      showError('لم يتم تحديد أخبار', 'يرجى تحديد خبر واحد على الأقل');
      return;
    }

    switch (action) {
      case 'feature':
        success('تم تمييز الأخبار', `تم تمييز ${selectedNews.length} خبر`);
        break;
      case 'archive':
        success('تم أرشفة الأخبار', `تم أرشفة ${selectedNews.length} خبر`);
        break;
      case 'delete':
        if (window.confirm(`هل أنت متأكد من حذف ${selectedNews.length} خبر؟`)) {
          success('تم حذف الأخبار', `تم حذف ${selectedNews.length} خبر`);
        }
        break;
    }
    setSelectedNews([]);
  };

  // حساب الإحصائيات
  const totalViews = news.reduce((sum, item) => sum + item.views, 0);
  const featuredNews = news.filter(item => item.views > 1000).length;
  const todayNews = news.filter(item => {
    const today = new Date();
    const newsDate = new Date(item.date);
    return newsDate.toDateString() === today.toDateString();
  }).length;
  const thisWeekNews = news.filter(item => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const newsDate = new Date(item.date);
    return newsDate > weekAgo;
  }).length;

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="islamic-gradient text-white rounded-2xl p-8 mb-8 islamic-pattern">
          <div className="text-center">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl animate-float">
              <Newspaper className="w-12 h-12 text-islamic-600" />
            </div>
            <h1 className="heading-1 text-white mb-4">أخبار الوزارة</h1>
            <p className="body-large text-golden-200 max-w-4xl mx-auto">
              تابع آخر الأخبار والمستجدات من وزارة الأوقاف والشؤون الدينية
            </p>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card-islamic">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-sage-600 font-body">إجمالي الأخبار</p>
                <p className="text-3xl font-bold text-islamic-700 font-display">{news.length}</p>
              </div>
              <Newspaper className="w-8 h-8 text-islamic-500" />
            </div>
          </div>
          
          <div className="card-golden">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-sage-600 font-body">إجمالي المشاهدات</p>
                <p className="text-2xl font-bold text-golden-700 font-display">{totalViews.toLocaleString()}</p>
              </div>
              <Eye className="w-8 h-8 text-golden-500" />
            </div>
          </div>
          
          <div className="card-sage">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-sage-600 font-body">أخبار مميزة</p>
                <p className="text-3xl font-bold text-sage-700 font-display">{featuredNews}</p>
              </div>
              <Star className="w-8 h-8 text-sage-500" />
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-sage-600 font-body">هذا الأسبوع</p>
                <p className="text-3xl font-bold text-gray-700 font-display">{thisWeekNews}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Advanced Search and Filters */}
        <div className="bg-white rounded-2xl shadow-elegant p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-islamic-800 font-display">البحث والتصفية</h2>
              <p className="text-sage-600 font-body">أدوات متقدمة للبحث في الأخبار</p>
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
                placeholder="البحث في الأخبار..."
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
              value={selectedAuthor}
              onChange={(e) => setSelectedAuthor(e.target.value)}
              className="form-select"
            >
              {authors.map(author => (
                <option key={author.id} value={author.id}>{author.name}</option>
              ))}
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="form-select"
            >
              <option value="date">التاريخ</option>
              <option value="title">العنوان</option>
              <option value="views">المشاهدات</option>
              <option value="author">المحرر</option>
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
                onClick={() => setViewMode('magazine')}
                className={`p-2 rounded-lg ${viewMode === 'magazine' ? 'bg-islamic-600 text-white' : 'bg-gray-200 text-gray-600'}`}
              >
                <Newspaper className="w-5 h-5" />
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
                  <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">عدد العناصر لكل صفحة</label>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
                    className="form-select"
                  >
                    <option value={6}>6 أخبار</option>
                    <option value={12}>12 خبر</option>
                    <option value={24}>24 خبر</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Bulk Actions */}
          {selectedNews.length > 0 && (
            <div className="bg-islamic-50 border border-islamic-200 rounded-xl p-4 mt-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-islamic-800 font-body">
                  تم تحديد {selectedNews.length} خبر
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
            <h3 className="text-lg font-semibold text-golden-800 mb-4 font-display">إحصائيات الأخبار</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg text-center">
                <Newspaper className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-700 font-display">{news.length}</p>
                <p className="text-sm text-blue-600 font-body">إجمالي الأخبار</p>
              </div>
              <div className="bg-white p-4 rounded-lg text-center">
                <Eye className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-700 font-display">{totalViews.toLocaleString()}</p>
                <p className="text-sm text-green-600 font-body">إجمالي المشاهدات</p>
              </div>
              <div className="bg-white p-4 rounded-lg text-center">
                <Star className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-yellow-700 font-display">{featuredNews}</p>
                <p className="text-sm text-yellow-600 font-body">أخبار مميزة</p>
              </div>
              <div className="bg-white p-4 rounded-lg text-center">
                <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-purple-700 font-display">{thisWeekNews}</p>
                <p className="text-sm text-purple-600 font-body">هذا الأسبوع</p>
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
                فلاتر الفئات
              </h3>
              <div className="space-y-3">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center space-x-2 space-x-reverse px-4 py-3 rounded-lg transition-colors font-body ${
                      selectedCategory === category.id
                        ? 'bg-islamic-600 text-white'
                        : 'bg-white text-sage-700 hover:bg-islamic-50 border border-sage-200'
                    }`}
                  >
                    <category.icon className={`w-4 h-4 ${selectedCategory === category.id ? 'text-white' : category.color}`} />
                    <span>{category.name}</span>
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
                  <span className="font-bold text-golden-700 font-display">{filteredNews.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sage-600 font-body">أخبار اليوم</span>
                  <span className="font-bold text-blue-600 font-display">{todayNews}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sage-600 font-body">هذا الأسبوع</span>
                  <span className="font-bold text-green-600 font-display">{thisWeekNews}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sage-600 font-body">أخبار مميزة</span>
                  <span className="font-bold text-purple-600 font-display">{featuredNews}</span>
                </div>
              </div>
            </div>

            {/* اشتراك في النشرة */}
            <div className="card-sage">
              <h3 className="text-lg font-semibold text-sage-800 mb-4 font-display">النشرة الإخبارية</h3>
              <p className="text-sage-600 text-sm mb-4 font-body">
                احصل على آخر الأخبار في بريدك الإلكتروني
              </p>
              <button 
                onClick={() => setShowSubscriptionModal(true)}
                className="w-full btn-primary"
              >
                <Bell className="w-5 h-5 ml-2" />
                اشترك في النشرة
              </button>
            </div>
          </div>

          {/* قائمة الأخبار */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-islamic-800 font-display">
                  الأخبار ({filteredNews.length})
                </h2>
                <p className="text-sage-600 font-body">
                  عرض {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredNews.length)} من {filteredNews.length}
                </p>
              </div>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                className="form-select text-sm"
              >
                <option value="desc">الأحدث أولاً</option>
                <option value="asc">الأقدم أولاً</option>
              </select>
            </div>

            {/* Bulk Actions */}
            {selectedNews.length > 0 && (
              <div className="bg-islamic-50 border border-islamic-200 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-islamic-800 font-body">
                    تم تحديد {selectedNews.length} خبر
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

            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentNews.map((item, index) => (
                  <div key={item.id} className={`card-islamic overflow-hidden animate-slide-up hover-lift`} style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="relative overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
                      />
                      <div className="absolute top-4 right-4 bg-islamic-600 text-white px-4 py-2 rounded-full text-sm font-semibold font-body shadow-lg">
                        جديد
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center space-x-2 space-x-reverse">
                              <Eye className="w-4 h-4 text-islamic-600" />
                              <span className="font-body text-islamic-700">{item.views} مشاهدة</span>
                            </div>
                            <span className="font-body text-sage-600">{new Date(item.date).toLocaleDateString('ar-EG')}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <Calendar className="w-4 h-4 ml-2" />
                        <span className="font-body">{new Date(item.date).toLocaleDateString('ar-EG')}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-4 line-clamp-2 font-display hover:text-islamic-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sage-600 mb-6 line-clamp-3 font-body leading-relaxed">
                        {item.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-500">
                          <User className="w-4 h-4 ml-1" />
                          <span className="font-body">{item.author}</span>
                        </div>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <input
                            type="checkbox"
                            checked={selectedNews.includes(item.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedNews(prev => [...prev, item.id]);
                              } else {
                                setSelectedNews(prev => prev.filter(id => id !== item.id));
                              }
                            }}
                            className="rounded border-islamic-300 text-islamic-600 focus:ring-islamic-500"
                          />
                          <button className="text-islamic-600 hover:text-islamic-700 font-medium font-body group">
                            <span>اقرأ المزيد</span>
                            <ArrowLeft className="w-4 h-4 inline mr-1 group-hover:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : viewMode === 'list' ? (
              <div className="space-y-6">
                {currentNews.map((item) => (
                  <div key={item.id} className="card-islamic">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className="md:col-span-1">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                      </div>
                      <div className="md:col-span-3">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <span className="px-3 py-1 bg-islamic-100 text-islamic-800 rounded-full text-sm font-medium">
                              {categories.find(c => c.id === item.category)?.name || 'عام'}
                            </span>
                            <div className="flex items-center text-sm text-gray-500">
                              <Calendar className="w-4 h-4 ml-1" />
                              <span className="font-body">{new Date(item.date).toLocaleDateString('ar-EG')}</span>
                            </div>
                          </div>
                          <input
                            type="checkbox"
                            checked={selectedNews.includes(item.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedNews(prev => [...prev, item.id]);
                              } else {
                                setSelectedNews(prev => prev.filter(id => id !== item.id));
                              }
                            }}
                            className="rounded border-islamic-300 text-islamic-600 focus:ring-islamic-500"
                          />
                        </div>
                        
                        <h3 className="text-xl font-semibold text-islamic-800 mb-3 font-display hover:text-islamic-600 cursor-pointer">
                          {item.title}
                        </h3>
                        
                        <p className="text-sage-600 mb-4 font-body leading-relaxed">
                          {item.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-500">
                            <div className="flex items-center space-x-1 space-x-reverse">
                              <User className="w-4 h-4" />
                              <span className="font-body">{item.author}</span>
                            </div>
                            <div className="flex items-center space-x-1 space-x-reverse">
                              <Eye className="w-4 h-4" />
                              <span className="font-body">{item.views} مشاهدة</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <button className="text-blue-600 hover:text-blue-700">
                              <Share2 className="w-4 h-4" />
                            </button>
                            <button className="text-golden-600 hover:text-golden-700">
                              <Bookmark className="w-4 h-4" />
                            </button>
                            <button className="text-islamic-600 hover:text-islamic-700 font-medium font-body group">
                              <span>اقرأ المزيد</span>
                              <ArrowLeft className="w-4 h-4 inline mr-1 group-hover:translate-x-1 transition-transform" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Magazine View
              <div className="space-y-8">
                {currentNews.length > 0 && (
                  <div className="card-islamic">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div>
                        <img
                          src={currentNews[0].image}
                          alt={currentNews[0].title}
                          className="w-full h-64 object-cover rounded-xl"
                        />
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                            الخبر الرئيسي
                          </span>
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="w-4 h-4 ml-1" />
                            <span className="font-body">{new Date(currentNews[0].date).toLocaleDateString('ar-EG')}</span>
                          </div>
                        </div>
                        <h2 className="text-2xl font-bold text-islamic-800 font-display">{currentNews[0].title}</h2>
                        <p className="text-sage-600 font-body leading-relaxed">{currentNews[0].excerpt}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-500">
                            <User className="w-4 h-4" />
                            <span className="font-body">{currentNews[0].author}</span>
                          </div>
                          <button className="btn-primary">
                            اقرأ المزيد
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {currentNews.slice(1).map((item, index) => (
                    <div key={item.id} className="card-golden">
                      <div className="flex space-x-4 space-x-reverse">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                        />
                        <div className="flex-1">
                          <div className="flex items-center text-sm text-gray-500 mb-2">
                            <Calendar className="w-4 h-4 ml-1" />
                            <span className="font-body">{new Date(item.date).toLocaleDateString('ar-EG')}</span>
                          </div>
                          <h3 className="font-semibold text-golden-800 mb-2 font-display line-clamp-2">{item.title}</h3>
                          <p className="text-sage-600 text-sm font-body line-clamp-2">{item.excerpt}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-sage-500 font-body">{item.author}</span>
                            <button className="text-islamic-600 hover:text-islamic-700 text-sm font-medium font-body">
                              اقرأ
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* No Results */}
            {filteredNews.length === 0 && (
              <div className="card text-center py-12">
                <Newspaper className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2 font-display">لم يتم العثور على أخبار</h3>
                <p className="text-gray-500 mb-6 font-body">جرب تعديل معايير البحث أو الفلاتر</p>
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setSelectedAuthor('all');
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

        {/* Featured News Section */}
        <div className="bg-white rounded-2xl shadow-elegant p-8 mt-8">
          <h2 className="heading-2 text-islamic-800 mb-6">الأخبار المميزة</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.filter(item => item.views > 1000).slice(0, 3).map((item) => (
              <div key={item.id} className="bg-gradient-to-br from-islamic-50 to-golden-50 rounded-xl p-6 border border-islamic-200">
                <div className="flex items-center space-x-3 space-x-reverse mb-4">
                  <div className="w-12 h-12 islamic-gradient rounded-xl flex items-center justify-center">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-islamic-800 font-display line-clamp-1">{item.title}</h3>
                    <p className="text-sm text-sage-600 font-body">{item.author}</p>
                  </div>
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <Eye className="w-4 h-4 text-golden-500" />
                    <span className="text-sm font-bold text-golden-700">{item.views}</span>
                  </div>
                </div>
                <p className="text-sage-600 text-sm mb-4 font-body line-clamp-2">{item.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-islamic-600 font-body">{new Date(item.date).toLocaleDateString('ar-EG')}</span>
                  <button className="text-islamic-600 hover:text-islamic-700 text-sm font-medium font-body">
                    اقرأ المزيد
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subscription Modal */}
        {showSubscriptionModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 w-full max-w-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="heading-2 text-islamic-800">اشتراك في النشرة الإخبارية</h2>
                <button
                  onClick={() => setShowSubscriptionModal(false)}
                  className="text-sage-500 hover:text-sage-700 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="text-center mb-6">
                <Bell className="w-16 h-16 text-islamic-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-islamic-800 mb-2 font-display">احصل على آخر الأخبار</h3>
                <p className="text-sage-600 font-body">سنرسل لك أحدث الأخبار والمستجدات في بريدك الإلكتروني</p>
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
                  <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">تكرار الإرسال</label>
                  <select className="form-select">
                    <option value="daily">يومي</option>
                    <option value="weekly">أسبوعي</option>
                    <option value="monthly">شهري</option>
                  </select>
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
                      success('تم الاشتراك بنجاح', 'ستصلك النشرة الإخبارية على بريدك الإلكتروني');
                      setShowSubscriptionModal(false);
                    }}
                    className="btn-primary"
                  >
                    <Send className="w-5 h-5 ml-2" />
                    تأكيد الاشتراك
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsPage;