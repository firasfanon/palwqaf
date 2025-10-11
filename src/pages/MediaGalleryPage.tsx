import React, { useState } from 'react';
import { 
  Image as ImageIcon, 
  Video, 
  Mic, 
  FileText, 
  Download, 
  Share2, 
  Heart, 
  Eye, 
  Calendar, 
  User, 
  Tag, 
  Search, 
  Filter, 
  Grid, 
  List, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize, 
  RotateCcw, 
  ZoomIn, 
  ZoomOut, 
  Edit, 
  Trash2, 
  Upload, 
  Plus, 
  Star, 
  Bookmark, 
  Flag, 
  Archive, 
  Settings, 
  Info, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  TrendingUp, 
  BarChart3, 
  Activity, 
  Target, 
  Award, 
  Sparkles, 
  Layers, 
  Folder, 
  FolderOpen, 
  Copy, 
  Move, 
  Scissors, 
  Clipboard, 
  ExternalLink, 
  RefreshCw, 
  Save, 
  X 
} from 'lucide-react';
import { useToast } from '../hooks/useToast';

const MediaGalleryPage = () => {
  const { success, info, error: showError } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'masonry'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<number[]>([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewItem, setPreviewItem] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const mediaItems = [
    {
      id: 1,
      title: 'افتتاح المسجد الكبير الجديد',
      type: 'image',
      category: 'events',
      url: 'https://images.pexels.com/photos/8728380/pexels-photo-8728380.jpeg?auto=compress&cs=tinysrgb&w=800',
      thumbnail: 'https://images.pexels.com/photos/8728380/pexels-photo-8728380.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'صور من حفل افتتاح المسجد الكبير الجديد في مدينة رام الله',
      date: '2024-01-15',
      author: 'إدارة الإعلام',
      tags: ['افتتاح', 'مسجد', 'رام الله'],
      views: 15600,
      likes: 1200,
      downloads: 89,
      size: '2.5 MB',
      resolution: '1920x1080',
      featured: true
    },
    {
      id: 2,
      title: 'كلمة الوزير في المؤتمر الديني',
      type: 'video',
      category: 'speeches',
      url: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800',
      thumbnail: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'كلمة معالي الوزير في افتتاح المؤتمر الديني السنوي',
      date: '2024-01-12',
      author: 'قسم التصوير',
      tags: ['كلمة', 'مؤتمر', 'وزير'],
      views: 28900,
      likes: 2100,
      downloads: 156,
      duration: '15:30',
      size: '125 MB',
      quality: '1080p',
      featured: true
    },
    {
      id: 3,
      title: 'خطبة الجمعة - أهمية الوقف',
      type: 'audio',
      category: 'sermons',
      url: 'https://images.pexels.com/photos/6686445/pexels-photo-6686445.jpeg?auto=compress&cs=tinysrgb&w=800',
      thumbnail: 'https://images.pexels.com/photos/6686445/pexels-photo-6686445.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'خطبة الجمعة حول أهمية الوقف في الإسلام',
      date: '2024-01-10',
      author: 'الشيخ أحمد محمد',
      tags: ['خطبة', 'وقف', 'جمعة'],
      views: 12400,
      likes: 890,
      downloads: 234,
      duration: '25:45',
      size: '18 MB',
      quality: 'HD Audio'
    },
    {
      id: 4,
      title: 'دليل إدارة الأوقاف 2024',
      type: 'document',
      category: 'documents',
      url: 'https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=800',
      thumbnail: 'https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'الدليل الشامل لإدارة الأوقاف والمساجد للعام 2024',
      date: '2024-01-08',
      author: 'إدارة الأوقاف',
      tags: ['دليل', 'إدارة', 'أوقاف'],
      views: 8700,
      likes: 450,
      downloads: 567,
      size: '5.2 MB',
      pages: 120,
      format: 'PDF'
    },
    {
      id: 5,
      title: 'مراسم توقيع اتفاقية التعاون',
      type: 'image',
      category: 'events',
      url: 'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=800',
      thumbnail: 'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'صور من مراسم توقيع اتفاقية التعاون مع وزارة الأوقاف الأردنية',
      date: '2024-01-05',
      author: 'المصور الرسمي',
      tags: ['اتفاقية', 'تعاون', 'أردن'],
      views: 9800,
      likes: 720,
      downloads: 123,
      size: '3.1 MB',
      resolution: '1920x1280'
    },
    {
      id: 6,
      title: 'برنامج تدريب الأئمة',
      type: 'video',
      category: 'training',
      url: 'https://images.pexels.com/photos/8199562/pexels-photo-8199562.jpeg?auto=compress&cs=tinysrgb&w=800',
      thumbnail: 'https://images.pexels.com/photos/8199562/pexels-photo-8199562.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'فيديو توثيقي لبرنامج تدريب الأئمة والخطباء',
      date: '2024-01-03',
      author: 'قسم التدريب',
      tags: ['تدريب', 'أئمة', 'خطباء'],
      views: 18500,
      likes: 1350,
      downloads: 89,
      duration: '22:15',
      size: '180 MB',
      quality: '4K'
    }
  ];

  const categories = [
    { id: 'all', name: 'جميع الفئات', icon: Layers, color: 'text-gray-600' },
    { id: 'events', name: 'الفعاليات', icon: Calendar, color: 'text-blue-600' },
    { id: 'speeches', name: 'الخطابات', icon: Mic, color: 'text-green-600' },
    { id: 'sermons', name: 'الخطب', icon: BookOpen, color: 'text-purple-600' },
    { id: 'documents', name: 'الوثائق', icon: FileText, color: 'text-orange-600' },
    { id: 'training', name: 'التدريب', icon: GraduationCap, color: 'text-pink-600' },
    { id: 'news', name: 'الأخبار', icon: Info, color: 'text-teal-600' }
  ];

  const mediaTypes = [
    { id: 'all', name: 'جميع الأنواع', icon: Layers },
    { id: 'image', name: 'الصور', icon: ImageIcon },
    { id: 'video', name: 'الفيديو', icon: Video },
    { id: 'audio', name: 'الصوتيات', icon: Mic },
    { id: 'document', name: 'الوثائق', icon: FileText }
  ];

  let filteredMedia = mediaItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesType = selectedType === 'all' || item.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  // ترتيب النتائج
  filteredMedia = [...filteredMedia].sort((a, b) => {
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
      case 'likes':
        aValue = a.likes;
        bValue = b.likes;
        break;
      case 'downloads':
        aValue = a.downloads;
        bValue = b.downloads;
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

  const totalPages = Math.ceil(filteredMedia.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentMedia = filteredMedia.slice(startIndex, startIndex + itemsPerPage);

  // حساب الإحصائيات
  const totalViews = mediaItems.reduce((sum, item) => sum + item.views, 0);
  const totalLikes = mediaItems.reduce((sum, item) => sum + item.likes, 0);
  const totalDownloads = mediaItems.reduce((sum, item) => sum + item.downloads, 0);
  const featuredCount = mediaItems.filter(item => item.featured).length;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <ImageIcon className="w-5 h-5 text-blue-500" />;
      case 'video':
        return <Video className="w-5 h-5 text-red-500" />;
      case 'audio':
        return <Mic className="w-5 h-5 text-green-500" />;
      case 'document':
        return <FileText className="w-5 h-5 text-orange-500" />;
      default:
        return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  const handleBulkAction = (action: string) => {
    if (selectedMedia.length === 0) {
      showError('لم يتم تحديد عناصر', 'يرجى تحديد عنصر واحد على الأقل');
      return;
    }

    switch (action) {
      case 'download':
        success('تم بدء التحميل', `جاري تحميل ${selectedMedia.length} عنصر`);
        break;
      case 'archive':
        success('تم الأرشفة', `تم أرشفة ${selectedMedia.length} عنصر`);
        break;
      case 'delete':
        if (window.confirm(`هل أنت متأكد من حذف ${selectedMedia.length} عنصر؟`)) {
          success('تم الحذف', `تم حذف ${selectedMedia.length} عنصر`);
        }
        break;
      case 'feature':
        success('تم التمييز', `تم تمييز ${selectedMedia.length} عنصر`);
        break;
    }
    setSelectedMedia([]);
  };

  const openPreview = (item: any) => {
    setPreviewItem(item);
    setShowPreviewModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="islamic-gradient text-white rounded-2xl p-8 mb-8 islamic-pattern">
          <div className="text-center">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl animate-float">
              <ImageIcon className="w-12 h-12 text-islamic-600" />
            </div>
            <h1 className="heading-1 text-white mb-4">معرض الوسائط</h1>
            <p className="body-large text-golden-200 max-w-4xl mx-auto">
              مكتبة شاملة للصور والفيديوهات والوثائق من أنشطة وفعاليات وزارة الأوقاف والشؤون الدينية
            </p>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card-islamic">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-sage-600 font-body">إجمالي الوسائط</p>
                <p className="text-3xl font-bold text-islamic-700 font-display">{mediaItems.length}</p>
              </div>
              <Layers className="w-8 h-8 text-islamic-500" />
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
                <p className="text-sm font-medium text-sage-600 font-body">إجمالي الإعجابات</p>
                <p className="text-3xl font-bold text-sage-700 font-display">{totalLikes.toLocaleString()}</p>
              </div>
              <Heart className="w-8 h-8 text-sage-500" />
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-sage-600 font-body">إجمالي التحميلات</p>
                <p className="text-3xl font-bold text-gray-700 font-display">{totalDownloads.toLocaleString()}</p>
              </div>
              <Download className="w-8 h-8 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-elegant p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-islamic-800 font-display">البحث والتصفية</h2>
              <p className="text-sage-600 font-body">استخدم الأدوات أدناه للعثور على الوسائط المطلوبة</p>
            </div>
            <div className="flex items-center space-x-4 space-x-reverse">
              <button
                onClick={() => setShowUploadModal(true)}
                className="btn-primary"
              >
                <Upload className="w-5 h-5 ml-2" />
                رفع ملف جديد
              </button>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="btn-secondary"
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
                placeholder="البحث في الوسائط..."
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
              {mediaTypes.map(type => (
                <option key={type.id} value={type.id}>{type.name}</option>
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
              <option value="likes">الإعجابات</option>
              <option value="downloads">التحميلات</option>
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
                onClick={() => setViewMode('masonry')}
                className={`p-2 rounded-lg ${viewMode === 'masonry' ? 'bg-islamic-600 text-white' : 'bg-gray-200 text-gray-600'}`}
              >
                <Layers className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedMedia.length > 0 && (
            <div className="bg-islamic-50 border border-islamic-200 rounded-xl p-4 mt-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-islamic-800 font-body">
                  تم تحديد {selectedMedia.length} عنصر
                </span>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <button 
                    onClick={() => handleBulkAction('download')}
                    className="btn-primary text-sm px-3 py-1"
                  >
                    تحميل
                  </button>
                  <button 
                    onClick={() => handleBulkAction('feature')}
                    className="btn-secondary text-sm px-3 py-1"
                  >
                    تمييز
                  </button>
                  <button 
                    onClick={() => handleBulkAction('archive')}
                    className="btn-outline text-sm px-3 py-1"
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

        {/* Media Display */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="card-islamic mb-6">
              <h3 className="text-lg font-semibold text-islamic-800 mb-4 flex items-center font-display">
                <Filter className="w-5 h-5 ml-2 text-islamic-600" />
                فلاتر الوسائط
              </h3>
              <div className="space-y-3">
                {mediaTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`w-full flex items-center space-x-2 space-x-reverse px-4 py-3 rounded-lg transition-colors font-body ${
                      selectedType === type.id
                        ? 'bg-islamic-600 text-white'
                        : 'bg-white text-sage-700 hover:bg-islamic-50 border border-sage-200'
                    }`}
                  >
                    <type.icon className={`w-4 h-4 ${selectedType === type.id ? 'text-white' : 'text-gray-500'}`} />
                    {type.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="card-golden">
              <h3 className="text-lg font-semibold text-golden-800 mb-4 font-display">إحصائيات سريعة</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sage-600 font-body">النتائج المفلترة</span>
                  <span className="font-bold text-golden-700 font-display">{filteredMedia.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sage-600 font-body">الوسائط المميزة</span>
                  <span className="font-bold text-star-600 font-display">{featuredCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sage-600 font-body">إجمالي المشاهدات</span>
                  <span className="font-bold text-blue-600 font-display">{totalViews.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sage-600 font-body">إجمالي التحميلات</span>
                  <span className="font-bold text-green-600 font-display">{totalDownloads}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Media Grid */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-islamic-800 font-display">
                  الوسائط ({filteredMedia.length})
                </h2>
                <p className="text-sage-600 font-body">
                  عرض {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredMedia.length)} من {filteredMedia.length}
                </p>
              </div>
              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
                className="form-select text-sm"
              >
                <option value={12}>12 لكل صفحة</option>
                <option value={24}>24 لكل صفحة</option>
                <option value={48}>48 لكل صفحة</option>
              </select>
            </div>

            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentMedia.map((item, index) => (
                  <div key={item.id} className={`card-islamic overflow-hidden hover-lift animate-fade-in-up`} style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="relative group">
                      <div className="aspect-video overflow-hidden">
                        {item.type === 'image' ? (
                          <img
                            src={item.url}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        ) : item.type === 'video' ? (
                          <div className="w-full h-full bg-gray-100 flex items-center justify-center relative">
                            <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                              <Video className="w-12 h-12 text-white" />
                            </div>
                            {item.duration && (
                              <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                                {item.duration}
                              </div>
                            )}
                          </div>
                        ) : item.type === 'audio' ? (
                          <div className="w-full h-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                            <Mic className="w-12 h-12 text-purple-600" />
                            {item.duration && (
                              <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                                {item.duration}
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                            <FileText className="w-12 h-12 text-gray-400" />
                          </div>
                        )}
                      </div>
                      
                      <div className="absolute top-2 right-2 flex space-x-2 space-x-reverse">
                        {item.featured && (
                          <div className="bg-golden-600 text-white p-1 rounded-full">
                            <Star className="w-4 h-4" />
                          </div>
                        )}
                        <input
                          type="checkbox"
                          checked={selectedMedia.includes(item.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedMedia(prev => [...prev, item.id]);
                            } else {
                              setSelectedMedia(prev => prev.filter(id => id !== item.id));
                            }
                          }}
                          className="w-5 h-5 rounded border-white text-islamic-600 focus:ring-islamic-500"
                        />
                      </div>
                      
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="flex space-x-2 space-x-reverse">
                          <button
                            onClick={() => openPreview(item)}
                            className="bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100">
                            <Download className="w-4 h-4" />
                          </button>
                          <button className="bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100">
                            <Share2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        {getTypeIcon(item.type)}
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
                          {categories.find(c => c.id === item.category)?.name}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-islamic-800 mb-2 line-clamp-2 font-display">
                        {item.title}
                      </h3>
                      
                      <p className="text-sage-600 mb-4 line-clamp-2 font-body text-sm">
                        {item.description}
                      </p>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between text-xs text-sage-500">
                          <span className="font-body">الحجم: {item.size}</span>
                          <span className="font-body">{new Date(item.date).toLocaleDateString('ar-EG')}</span>
                        </div>
                        {item.resolution && (
                          <div className="text-xs text-sage-500 font-body">الدقة: {item.resolution}</div>
                        )}
                        {item.quality && (
                          <div className="text-xs text-sage-500 font-body">الجودة: {item.quality}</div>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-sage-200">
                        <div className="flex items-center space-x-4 space-x-reverse text-sm text-sage-500">
                          <div className="flex items-center space-x-1 space-x-reverse">
                            <Eye className="w-4 h-4" />
                            <span className="font-body">{item.views}</span>
                          </div>
                          <div className="flex items-center space-x-1 space-x-reverse">
                            <Heart className="w-4 h-4" />
                            <span className="font-body">{item.likes}</span>
                          </div>
                          <div className="flex items-center space-x-1 space-x-reverse">
                            <Download className="w-4 h-4" />
                            <span className="font-body">{item.downloads}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mt-3">
                        {item.tags.slice(0, 3).map((tag, idx) => (
                          <span key={idx} className="px-2 py-1 bg-sage-100 text-sage-700 text-xs rounded-full font-body">
                            #{tag}
                          </span>
                        ))}
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
                          الوسائط
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-islamic-700 uppercase tracking-wider font-body">
                          النوع
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-islamic-700 uppercase tracking-wider font-body">
                          المشاهدات
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-islamic-700 uppercase tracking-wider font-body">
                          التحميلات
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-islamic-700 uppercase tracking-wider font-body">
                          الإجراءات
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-sage-200">
                      {currentMedia.map((item) => (
                        <tr key={item.id} className="hover:bg-islamic-50">
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-3 space-x-reverse">
                              <div className="w-16 h-12 rounded-lg overflow-hidden">
                                <img src={item.thumbnail || item.url} alt={item.title} className="w-full h-full object-cover" />
                              </div>
                              <div>
                                <div className="text-sm font-medium text-islamic-800 font-body">{item.title}</div>
                                <div className="text-sm text-sage-600 font-body">{item.author}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-2 space-x-reverse">
                              {getTypeIcon(item.type)}
                              <span className="text-sm font-medium text-gray-800 font-body capitalize">{item.type}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-islamic-800 font-body">
                            {item.views.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-islamic-800 font-body">
                            {item.downloads}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center space-x-2 space-x-reverse">
                              <button 
                                onClick={() => openPreview(item)}
                                className="text-blue-600 hover:text-blue-700"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="text-green-600 hover:text-green-700">
                                <Download className="w-4 h-4" />
                              </button>
                              <button className="text-purple-600 hover:text-purple-700">
                                <Share2 className="w-4 h-4" />
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
              // Masonry View
              <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                {currentMedia.map((item, index) => (
                  <div key={item.id} className={`card-islamic break-inside-avoid mb-6 animate-fade-in-up`} style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="relative group">
                      <div className="overflow-hidden rounded-t-xl">
                        {item.type === 'image' ? (
                          <img
                            src={item.url}
                            alt={item.title}
                            className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            style={{ height: `${200 + Math.random() * 100}px` }}
                          />
                        ) : item.type === 'video' ? (
                          <div className="w-full bg-gray-100 flex items-center justify-center relative" style={{ height: '200px' }}>
                            <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                              <Video className="w-12 h-12 text-white" />
                            </div>
                          </div>
                        ) : (
                          <div className="w-full bg-gray-100 flex items-center justify-center" style={{ height: '150px' }}>
                            <FileText className="w-12 h-12 text-gray-400" />
                          </div>
                        )}
                      </div>
                      
                      <div className="absolute top-2 right-2 flex space-x-2 space-x-reverse">
                        {item.featured && (
                          <div className="bg-golden-600 text-white p-1 rounded-full">
                            <Star className="w-4 h-4" />
                          </div>
                        )}
                        <input
                          type="checkbox"
                          checked={selectedMedia.includes(item.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedMedia(prev => [...prev, item.id]);
                            } else {
                              setSelectedMedia(prev => prev.filter(id => id !== item.id));
                            }
                          }}
                          className="w-5 h-5 rounded border-white text-islamic-600 focus:ring-islamic-500"
                        />
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        {getTypeIcon(item.type)}
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
                          {categories.find(c => c.id === item.category)?.name}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-islamic-800 mb-2 font-display">
                        {item.title}
                      </h3>
                      
                      <p className="text-sage-600 mb-3 font-body text-sm">
                        {item.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-sage-500 mb-3">
                        <span className="font-body">{item.author}</span>
                        <span className="font-body">{new Date(item.date).toLocaleDateString('ar-EG')}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 space-x-reverse text-xs text-sage-500">
                          <div className="flex items-center space-x-1 space-x-reverse">
                            <Eye className="w-3 h-3" />
                            <span>{item.views}</span>
                          </div>
                          <div className="flex items-center space-x-1 space-x-reverse">
                            <Heart className="w-3 h-3" />
                            <span>{item.likes}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => openPreview(item)}
                          className="text-islamic-600 hover:text-islamic-700 font-medium font-body text-sm"
                        >
                          عرض
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* No Results */}
            {filteredMedia.length === 0 && (
              <div className="card text-center py-12">
                <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2 font-display">لم يتم العثور على وسائط</h3>
                <p className="text-gray-500 mb-6 font-body">جرب تعديل معايير البحث أو الفلاتر</p>
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setSelectedType('all');
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

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 w-full max-w-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="heading-2 text-islamic-800">رفع ملف جديد</h2>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="text-sage-500 hover:text-sage-700 text-2xl"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <form className="space-y-6">
                <div className="border-2 border-dashed border-sage-300 rounded-xl p-8 text-center hover:border-islamic-500 transition-colors">
                  <Upload className="w-12 h-12 text-sage-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-sage-700 mb-2 font-body">اسحب الملفات هنا أو انقر للاختيار</p>
                  <p className="text-sm text-sage-500 font-body">يدعم: JPG, PNG, MP4, MP3, PDF (حد أقصى 100MB)</p>
                  <input type="file" className="hidden" multiple accept="image/*,video/*,audio/*,.pdf" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">العنوان</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="عنوان الملف"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">الفئة</label>
                    <select className="form-select">
                      {categories.slice(1).map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">الوصف</label>
                  <textarea
                    className="form-input"
                    rows={3}
                    placeholder="وصف الملف"
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">الكلمات المفتاحية</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="أدخل الكلمات مفصولة بفواصل"
                  />
                </div>
                
                <div className="flex items-center space-x-4 space-x-reverse">
                  <label className="flex items-center space-x-2 space-x-reverse">
                    <input type="checkbox" className="rounded border-islamic-300 text-islamic-600 focus:ring-islamic-500" />
                    <span className="text-sm text-islamic-700 font-body">ملف مميز</span>
                  </label>
                  <label className="flex items-center space-x-2 space-x-reverse">
                    <input type="checkbox" className="rounded border-islamic-300 text-islamic-600 focus:ring-islamic-500" />
                    <span className="text-sm text-islamic-700 font-body">متاح للتحميل العام</span>
                  </label>
                </div>
                
                <div className="flex justify-end space-x-4 space-x-reverse">
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(false)}
                    className="btn-outline"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      success('تم الرفع بنجاح', 'تم رفع الملف وإضافته للمعرض');
                      setShowUploadModal(false);
                    }}
                    className="btn-primary"
                  >
                    <Upload className="w-5 h-5 ml-2" />
                    رفع الملف
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Preview Modal */}
        {showPreviewModal && previewItem && (
          <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b border-sage-200">
                <div>
                  <h2 className="text-xl font-semibold text-islamic-800 font-display">{previewItem.title}</h2>
                  <p className="text-sage-600 font-body">{previewItem.description}</p>
                </div>
                <button
                  onClick={() => setShowPreviewModal(false)}
                  className="text-sage-500 hover:text-sage-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-6">
                <div className="mb-6">
                  {previewItem.type === 'image' ? (
                    <img
                      src={previewItem.url}
                      alt={previewItem.title}
                      className="w-full max-h-96 object-contain rounded-xl"
                    />
                  ) : previewItem.type === 'video' ? (
                    <div className="w-full bg-black rounded-xl flex items-center justify-center" style={{ height: '400px' }}>
                      <div className="text-center text-white">
                        <Video className="w-16 h-16 mx-auto mb-4" />
                        <p className="font-body">معاينة الفيديو - المدة: {previewItem.duration}</p>
                      </div>
                    </div>
                  ) : previewItem.type === 'audio' ? (
                    <div className="w-full bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex items-center justify-center" style={{ height: '200px' }}>
                      <div className="text-center">
                        <Mic className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                        <p className="text-purple-700 font-body">ملف صوتي - المدة: {previewItem.duration}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full bg-gray-100 rounded-xl flex items-center justify-center" style={{ height: '300px' }}>
                      <div className="text-center">
                        <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 font-body">وثيقة {previewItem.format} - {previewItem.pages} صفحة</p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-islamic-800 mb-2 font-display">معلومات الملف</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-sage-600 font-body">النوع:</span>
                          <span className="font-medium font-body">{previewItem.type}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sage-600 font-body">الحجم:</span>
                          <span className="font-medium font-body">{previewItem.size}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sage-600 font-body">التاريخ:</span>
                          <span className="font-medium font-body">{new Date(previewItem.date).toLocaleDateString('ar-EG')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sage-600 font-body">المؤلف:</span>
                          <span className="font-medium font-body">{previewItem.author}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-islamic-800 mb-2 font-display">الكلمات المفتاحية</h3>
                      <div className="flex flex-wrap gap-2">
                        {previewItem.tags.map((tag: string, idx: number) => (
                          <span key={idx} className="px-2 py-1 bg-islamic-100 text-islamic-700 text-xs rounded-full font-body">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-islamic-800 mb-2 font-display">الإحصائيات</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-sage-600 font-body">المشاهدات:</span>
                          <span className="font-medium font-body">{previewItem.views.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sage-600 font-body">الإعجابات:</span>
                          <span className="font-medium font-body">{previewItem.likes}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sage-600 font-body">التحميلات:</span>
                          <span className="font-medium font-body">{previewItem.downloads}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <button className="w-full btn-primary">
                        <Download className="w-5 h-5 ml-2" />
                        تحميل الملف
                      </button>
                      <button className="w-full btn-secondary">
                        <Share2 className="w-5 h-5 ml-2" />
                        مشاركة
                      </button>
                      <button className="w-full btn-outline">
                        <Bookmark className="w-5 h-5 ml-2" />
                        حفظ في المفضلة
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

export default MediaGalleryPage;