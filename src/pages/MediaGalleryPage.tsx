import React, { useState } from 'react';
import { Image as ImageIcon, Video, Play, Pause, Download, Share2, Eye, Heart, Bookmark, Search, Filter, Grid, List, Calendar, User, Tag, Star, Clock, ArrowLeft, ZoomIn, ZoomOut, RotateCw, RotateCcw, Maximize, Minimize, X, ChevronLeft, ChevronRight, Upload, Settings, Trash2, Edit, Copy, ExternalLink, Info, Award, Target, TrendingUp, Activity, Building, Globe, FileText, Mic, Camera, Printer, Save, RefreshCw, Plus, Layers, Archive, FolderOpen, Database, HardDrive, Cpu, MemoryStick, Network, Wifi, Shield, Lock, Unlock, CheckCircle, AlertTriangle, XCircle, Bell, Phone, Mail, MapPin, Navigation, Compass, Flag, Crown, Gem, Sparkles, Zap, CloudLightning as Bolt, Sun, Moon, CloudRain, Wind, Thermometer } from 'lucide-react';
import { useToast } from '../hooks/useToast';

const MediaGalleryPage = () => {
  const { success, info, error: showError } = useToast();
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'masonry' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showLightbox, setShowLightbox] = useState(false);
  const [currentMedia, setCurrentMedia] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const mediaItems = [
    {
      id: 1,
      title: 'افتتاح المسجد الجديد في حي الزيتون',
      description: 'حفل افتتاح المسجد الجديد في حي الزيتون بغزة بحضور معالي الوزير والمسؤولين',
      type: 'image',
      category: 'events',
      url: 'https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&w=1200',
      thumbnail: 'https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&w=400',
      date: '2024-01-15',
      photographer: 'أحمد محمد',
      location: 'غزة - حي الزيتون',
      tags: ['افتتاح', 'مسجد', 'غزة', 'وزير'],
      views: 1250,
      likes: 89,
      downloads: 45,
      size: '2.5 MB',
      dimensions: '1920x1080',
      format: 'JPEG'
    },
    {
      id: 2,
      title: 'كلمة الوزير في المؤتمر الدولي',
      description: 'كلمة معالي الوزير في المؤتمر الدولي للأوقاف الإسلامية في إسطنبول',
      type: 'video',
      category: 'speeches',
      url: '/videos/minister-speech-istanbul.mp4',
      thumbnail: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=400',
      date: '2024-01-12',
      photographer: 'فريق الإعلام',
      location: 'إسطنبول - تركيا',
      tags: ['كلمة', 'وزير', 'مؤتمر', 'دولي'],
      views: 3420,
      likes: 156,
      downloads: 89,
      duration: '15:30',
      size: '125 MB',
      format: 'MP4',
      quality: '1080p'
    },
    {
      id: 3,
      title: 'مسابقة القرآن الكريم السنوية',
      description: 'فعاليات مسابقة القرآن الكريم السنوية بمشاركة 200 متسابق من مختلف المحافظات',
      type: 'image',
      category: 'competitions',
      url: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=1200',
      thumbnail: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=400',
      date: '2024-01-10',
      photographer: 'سارة أحمد',
      location: 'رام الله - قصر الثقافة',
      tags: ['مسابقة', 'قرآن', 'متسابقين', 'جوائز'],
      views: 890,
      likes: 67,
      downloads: 34,
      size: '3.1 MB',
      dimensions: '1920x1280',
      format: 'JPEG'
    },
    {
      id: 4,
      title: 'ورشة عمل إدارة الأوقاف',
      description: 'ورشة عمل متخصصة حول أحدث طرق إدارة الأوقاف الإسلامية',
      type: 'video',
      category: 'workshops',
      url: '/videos/waqf-management-workshop.mp4',
      thumbnail: 'https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=400',
      date: '2024-01-08',
      photographer: 'فريق التدريب',
      location: 'رام الله - مركز التدريب',
      tags: ['ورشة', 'أوقاف', 'إدارة', 'تدريب'],
      views: 567,
      likes: 43,
      downloads: 28,
      duration: '45:20',
      size: '280 MB',
      format: 'MP4',
      quality: '720p'
    },
    {
      id: 5,
      title: 'زيارة المسجد الأقصى المبارك',
      description: 'زيارة معالي الوزير للمسجد الأقصى المبارك والاطلاع على أعمال الترميم',
      type: 'image',
      category: 'visits',
      url: 'https://images.pexels.com/photos/8107628/pexels-photo-8107628.jpeg?auto=compress&cs=tinysrgb&w=1200',
      thumbnail: 'https://images.pexels.com/photos/8107628/pexels-photo-8107628.jpeg?auto=compress&cs=tinysrgb&w=400',
      date: '2024-01-05',
      photographer: 'خالد يوسف',
      location: 'القدس - المسجد الأقصى',
      tags: ['زيارة', 'أقصى', 'ترميم', 'وزير'],
      views: 2340,
      likes: 198,
      downloads: 87,
      size: '4.2 MB',
      dimensions: '1920x1080',
      format: 'JPEG'
    },
    {
      id: 6,
      title: 'خطبة الجمعة من المسجد الكبير',
      description: 'خطبة الجمعة لمعالي الوزير من المسجد الكبير في رام الله',
      type: 'audio',
      category: 'sermons',
      url: '/audio/friday-sermon-main-mosque.mp3',
      thumbnail: 'https://images.pexels.com/photos/6686445/pexels-photo-6686445.jpeg?auto=compress&cs=tinysrgb&w=400',
      date: '2024-01-05',
      photographer: 'فريق التسجيل',
      location: 'رام الله - المسجد الكبير',
      tags: ['خطبة', 'جمعة', 'وزير', 'مسجد'],
      views: 1560,
      likes: 123,
      downloads: 234,
      duration: '25:45',
      size: '18 MB',
      format: 'MP3',
      quality: '320kbps'
    },
    {
      id: 7,
      title: 'توقيع اتفاقية تعاون مع الأزهر',
      description: 'حفل توقيع اتفاقية التعاون مع جامعة الأزهر الشريف في مجال التعليم الديني',
      type: 'image',
      category: 'agreements',
      url: 'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=1200',
      thumbnail: 'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=400',
      date: '2024-01-03',
      photographer: 'نور الدين محمد',
      location: 'القاهرة - جامعة الأزهر',
      tags: ['اتفاقية', 'أزهر', 'تعاون', 'تعليم'],
      views: 678,
      likes: 54,
      downloads: 23,
      size: '1.8 MB',
      dimensions: '1600x1200',
      format: 'JPEG'
    },
    {
      id: 8,
      title: 'معرض التراث الإسلامي',
      description: 'معرض شامل للتراث الإسلامي الفلسطيني بمشاركة متاحف عالمية',
      type: 'video',
      category: 'exhibitions',
      url: '/videos/islamic-heritage-exhibition.mp4',
      thumbnail: 'https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=400',
      date: '2024-01-01',
      photographer: 'فريق المتاحف',
      location: 'القدس - متحف الأوقاف',
      tags: ['معرض', 'تراث', 'إسلامي', 'متاحف'],
      views: 1890,
      likes: 145,
      downloads: 67,
      duration: '12:15',
      size: '95 MB',
      format: 'MP4',
      quality: '1080p'
    }
  ];

  const mediaCategories = [
    { id: 'all', name: 'جميع الوسائط', icon: ImageIcon, color: 'text-islamic-600' },
    { id: 'events', name: 'الفعاليات', icon: Calendar, color: 'text-blue-600' },
    { id: 'speeches', name: 'الكلمات والخطب', icon: Mic, color: 'text-green-600' },
    { id: 'competitions', name: 'المسابقات', icon: Award, color: 'text-purple-600' },
    { id: 'workshops', name: 'ورش العمل', icon: Target, color: 'text-orange-600' },
    { id: 'visits', name: 'الزيارات', icon: MapPin, color: 'text-pink-600' },
    { id: 'sermons', name: 'خطب الجمعة', icon: BookOpen, color: 'text-teal-600' },
    { id: 'agreements', name: 'الاتفاقيات', icon: FileText, color: 'text-indigo-600' },
    { id: 'exhibitions', name: 'المعارض', icon: Star, color: 'text-amber-600' }
  ];

  const mediaTypes = [
    { id: 'all', name: 'جميع الأنواع', icon: Layers },
    { id: 'image', name: 'الصور', icon: ImageIcon },
    { id: 'video', name: 'الفيديوهات', icon: Video },
    { id: 'audio', name: 'التسجيلات الصوتية', icon: Mic }
  ];

  const yearOptions = [
    { id: 'all', name: 'جميع السنوات' },
    { id: '2024', name: '2024' },
    { id: '2023', name: '2023' },
    { id: '2022', name: '2022' },
    { id: '2021', name: '2021' }
  ];

  const filteredMedia = mediaItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesTab = activeTab === 'all' || item.type === activeTab;
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesYear = selectedYear === 'all' || new Date(item.date).getFullYear().toString() === selectedYear;
    return matchesSearch && matchesTab && matchesCategory && matchesYear;
  });

  const sortedMedia = [...filteredMedia].sort((a, b) => {
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

  const totalPages = Math.ceil(sortedMedia.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentMedia = sortedMedia.slice(startIndex, startIndex + itemsPerPage);

  const openLightbox = (item: any, index: number) => {
    setCurrentMedia(item);
    setCurrentIndex(index);
    setShowLightbox(true);
  };

  const navigateMedia = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev' 
      ? (currentIndex - 1 + sortedMedia.length) % sortedMedia.length
      : (currentIndex + 1) % sortedMedia.length;
    setCurrentIndex(newIndex);
    setCurrentMedia(sortedMedia[newIndex]);
  };

  const handleBulkAction = (action: string) => {
    if (selectedItems.length === 0) {
      showError('لم يتم تحديد عناصر', 'يرجى تحديد عنصر واحد على الأقل');
      return;
    }

    switch (action) {
      case 'download':
        success('تم بدء التحميل', `جاري تحميل ${selectedItems.length} عنصر`);
        break;
      case 'delete':
        if (window.confirm(`هل أنت متأكد من حذف ${selectedItems.length} عنصر؟`)) {
          success('تم الحذف', `تم حذف ${selectedItems.length} عنصر`);
        }
        break;
      case 'archive':
        success('تم الأرشفة', `تم أرشفة ${selectedItems.length} عنصر`);
        break;
    }
    setSelectedItems([]);
  };

  // حساب الإحصائيات
  const totalViews = mediaItems.reduce((sum, item) => sum + item.views, 0);
  const totalLikes = mediaItems.reduce((sum, item) => sum + item.likes, 0);
  const totalDownloads = mediaItems.reduce((sum, item) => sum + item.downloads, 0);
  const imageCount = mediaItems.filter(item => item.type === 'image').length;
  const videoCount = mediaItems.filter(item => item.type === 'video').length;
  const audioCount = mediaItems.filter(item => item.type === 'audio').length;

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
              مكتبة شاملة من الصور والفيديوهات والتسجيلات الصوتية لأنشطة وفعاليات الوزارة
            </p>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-8">
          <div className="card-islamic">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-sage-600 font-body">إجمالي الوسائط</p>
                <p className="text-2xl font-bold text-islamic-700 font-display">{mediaItems.length}</p>
              </div>
              <Layers className="w-6 h-6 text-islamic-500" />
            </div>
          </div>
          
          <div className="card-golden">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-sage-600 font-body">الصور</p>
                <p className="text-2xl font-bold text-golden-700 font-display">{imageCount}</p>
              </div>
              <ImageIcon className="w-6 h-6 text-golden-500" />
            </div>
          </div>
          
          <div className="card-sage">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-sage-600 font-body">الفيديوهات</p>
                <p className="text-2xl font-bold text-sage-700 font-display">{videoCount}</p>
              </div>
              <Video className="w-6 h-6 text-sage-500" />
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-sage-600 font-body">التسجيلات</p>
                <p className="text-2xl font-bold text-gray-700 font-display">{audioCount}</p>
              </div>
              <Mic className="w-6 h-6 text-gray-500" />
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-sage-600 font-body">المشاهدات</p>
                <p className="text-xl font-bold text-gray-700 font-display">{totalViews.toLocaleString()}</p>
              </div>
              <Eye className="w-6 h-6 text-gray-500" />
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-sage-600 font-body">الإعجابات</p>
                <p className="text-xl font-bold text-gray-700 font-display">{totalLikes.toLocaleString()}</p>
              </div>
              <Heart className="w-6 h-6 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Media Type Tabs */}
        <div className="bg-white rounded-2xl shadow-elegant mb-8">
          <div className="border-b border-sage-200">
            <nav className="flex space-x-8 space-x-reverse px-6">
              {mediaTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setActiveTab(type.id)}
                  className={`flex items-center space-x-2 space-x-reverse py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === type.id
                      ? 'border-islamic-600 text-islamic-600'
                      : 'border-transparent text-sage-500 hover:text-sage-700 hover:border-sage-300'
                  }`}
                >
                  <type.icon className="w-4 h-4" />
                  <span className="font-body">{type.name}</span>
                  <span className="bg-sage-100 text-sage-700 px-2 py-1 rounded-full text-xs">
                    {type.id === 'all' ? mediaItems.length :
                     type.id === 'image' ? imageCount :
                     type.id === 'video' ? videoCount : audioCount}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          {/* Search and Filters */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4">
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
                {mediaCategories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
              
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="form-select"
              >
                {yearOptions.map(year => (
                  <option key={year.id} value={year.id}>{year.name}</option>
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
              </select>
              
              <div className="flex items-center space-x-2 space-x-reverse">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-islamic-600 text-white' : 'bg-gray-200 text-gray-600'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('masonry')}
                  className={`p-2 rounded-lg ${viewMode === 'masonry' ? 'bg-islamic-600 text-white' : 'bg-gray-200 text-gray-600'}`}
                >
                  <Layers className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-islamic-600 text-white' : 'bg-gray-200 text-gray-600'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
              
              <button 
                onClick={() => setShowUploadModal(true)}
                className="btn-primary"
              >
                <Upload className="w-5 h-5 ml-2" />
                رفع وسائط
              </button>
            </div>

            {/* Bulk Actions */}
            {selectedItems.length > 0 && (
              <div className="bg-islamic-50 border border-islamic-200 rounded-xl p-4 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-islamic-800 font-body">
                    تم تحديد {selectedItems.length} عنصر
                  </span>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <button 
                      onClick={() => handleBulkAction('download')}
                      className="btn-primary text-sm px-3 py-1"
                    >
                      تحميل
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
        </div>

        {/* Media Grid */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {currentMedia.map((item, index) => (
              <div key={item.id} className={`card-islamic hover-lift animate-fade-in-up`} style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="relative overflow-hidden rounded-xl mb-4">
                  <div 
                    className="aspect-video bg-gray-100 cursor-pointer"
                    onClick={() => openLightbox(item, index)}
                  >
                    {item.type === 'image' ? (
                      <img 
                        src={item.thumbnail} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                      />
                    ) : item.type === 'video' ? (
                      <div className="relative w-full h-full">
                        <img 
                          src={item.thumbnail} 
                          alt={item.title} 
                          className="w-full h-full object-cover" 
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                          <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                            <Play className="w-8 h-8 text-islamic-600 mr-1" />
                          </div>
                        </div>
                        {item.duration && (
                          <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                            {item.duration}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                        <div className="text-center">
                          <Mic className="w-12 h-12 text-purple-600 mx-auto mb-2" />
                          <p className="text-sm text-purple-700 font-body">تسجيل صوتي</p>
                          {item.duration && (
                            <p className="text-xs text-purple-600 font-body">{item.duration}</p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="absolute top-2 right-2 flex space-x-2 space-x-reverse">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedItems(prev => [...prev, item.id]);
                        } else {
                          setSelectedItems(prev => prev.filter(id => id !== item.id));
                        }
                      }}
                      className="rounded border-white text-islamic-600 focus:ring-islamic-500 bg-white bg-opacity-90"
                    />
                    <span className="px-2 py-1 bg-black bg-opacity-70 text-white text-xs rounded-full">
                      {item.type === 'image' ? 'صورة' : item.type === 'video' ? 'فيديو' : 'صوت'}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-semibold text-islamic-800 font-display line-clamp-2">{item.title}</h3>
                  <p className="text-sm text-sage-600 font-body line-clamp-2">{item.description}</p>
                  
                  <div className="flex flex-wrap gap-1">
                    {item.tags.slice(0, 3).map((tag, idx) => (
                      <span key={idx} className="px-2 py-1 bg-islamic-100 text-islamic-700 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-sage-500">
                    <div className="flex items-center space-x-4 space-x-reverse">
                      <div className="flex items-center space-x-1 space-x-reverse">
                        <Eye className="w-4 h-4" />
                        <span>{item.views}</span>
                      </div>
                      <div className="flex items-center space-x-1 space-x-reverse">
                        <Heart className="w-4 h-4" />
                        <span>{item.likes}</span>
                      </div>
                    </div>
                    <span className="font-body">{new Date(item.date).toLocaleDateString('ar-EG')}</span>
                  </div>
                  
                  <div className="flex items-center justify-between pt-3 border-t border-sage-200">
                    <span className="text-xs text-sage-500 font-body">{item.photographer}</span>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <button className="text-blue-600 hover:text-blue-700">
                        <Download className="w-4 h-4" />
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
              </div>
            ))}
          </div>
        ) : viewMode === 'list' ? (
          <div className="bg-white rounded-2xl shadow-elegant overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-islamic-50">
                  <tr>
                    <th className="px-6 py-3 text-right">
                      <input
                        type="checkbox"
                        checked={selectedItems.length === currentMedia.length && currentMedia.length > 0}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedItems(currentMedia.map(item => item.id));
                          } else {
                            setSelectedItems([]);
                          }
                        }}
                        className="rounded border-islamic-300 text-islamic-600 focus:ring-islamic-500"
                      />
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-islamic-700 uppercase tracking-wider font-body">
                      الوسائط
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-islamic-700 uppercase tracking-wider font-body">
                      النوع
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-islamic-700 uppercase tracking-wider font-body">
                      الفئة
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-islamic-700 uppercase tracking-wider font-body">
                      التاريخ
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-islamic-700 uppercase tracking-wider font-body">
                      الإحصائيات
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
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(item.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedItems(prev => [...prev, item.id]);
                            } else {
                              setSelectedItems(prev => prev.filter(id => id !== item.id));
                            }
                          }}
                          className="rounded border-islamic-300 text-islamic-600 focus:ring-islamic-500"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <img 
                            src={item.thumbnail} 
                            alt={item.title} 
                            className="w-16 h-12 object-cover rounded-lg cursor-pointer"
                            onClick={() => openLightbox(item, index)}
                          />
                          <div>
                            <div className="text-sm font-medium text-islamic-800 font-body line-clamp-1">{item.title}</div>
                            <div className="text-sm text-sage-600 font-body line-clamp-1">{item.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          {item.type === 'image' ? <ImageIcon className="w-4 h-4 text-blue-600" /> :
                           item.type === 'video' ? <Video className="w-4 h-4 text-green-600" /> :
                           <Mic className="w-4 h-4 text-purple-600" />}
                          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                            {item.type === 'image' ? 'صورة' : item.type === 'video' ? 'فيديو' : 'صوت'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                          {mediaCategories.find(c => c.id === item.category)?.name}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-islamic-800 font-body">
                        {new Date(item.date).toLocaleDateString('ar-EG')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-4 space-x-reverse text-sm text-sage-600">
                          <div className="flex items-center space-x-1 space-x-reverse">
                            <Eye className="w-4 h-4" />
                            <span>{item.views}</span>
                          </div>
                          <div className="flex items-center space-x-1 space-x-reverse">
                            <Heart className="w-4 h-4" />
                            <span>{item.likes}</span>
                          </div>
                          <div className="flex items-center space-x-1 space-x-reverse">
                            <Download className="w-4 h-4" />
                            <span>{item.downloads}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <button 
                            onClick={() => openLightbox(item, index)}
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
                          <button className="text-orange-600 hover:text-orange-700">
                            <Edit className="w-4 h-4" />
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
          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 mb-8">
            {currentMedia.map((item, index) => (
              <div key={item.id} className={`card-islamic hover-lift break-inside-avoid mb-6 animate-fade-in-up`} style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="relative overflow-hidden rounded-xl mb-4">
                  <div 
                    className="cursor-pointer"
                    onClick={() => openLightbox(item, index)}
                  >
                    {item.type === 'image' ? (
                      <img 
                        src={item.thumbnail} 
                        alt={item.title} 
                        className="w-full object-cover transition-transform duration-500 hover:scale-110" 
                      />
                    ) : item.type === 'video' ? (
                      <div className="relative aspect-video">
                        <img 
                          src={item.thumbnail} 
                          alt={item.title} 
                          className="w-full h-full object-cover" 
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                          <Play className="w-12 h-12 text-white" />
                        </div>
                      </div>
                    ) : (
                      <div className="aspect-video bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                        <Mic className="w-16 h-16 text-purple-600" />
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-semibold text-islamic-800 font-display">{item.title}</h3>
                  <p className="text-sm text-sage-600 font-body">{item.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-sage-500">
                    <span className="font-body">{item.photographer}</span>
                    <span className="font-body">{new Date(item.date).toLocaleDateString('ar-EG')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

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

        {/* Lightbox Modal */}
        {showLightbox && currentMedia && (
          <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
            <div className="relative w-full h-full flex items-center justify-center p-4">
              {/* Close Button */}
              <button
                onClick={() => setShowLightbox(false)}
                className="absolute top-4 right-4 w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-colors z-10"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={() => navigateMedia('prev')}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-colors z-10"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={() => navigateMedia('next')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-colors z-10"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>

              {/* Media Content */}
              <div className="max-w-6xl max-h-full flex items-center justify-center">
                {currentMedia.type === 'image' ? (
                  <img 
                    src={currentMedia.url} 
                    alt={currentMedia.title} 
                    className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                  />
                ) : currentMedia.type === 'video' ? (
                  <video 
                    src={currentMedia.url} 
                    controls 
                    className="max-w-full max-h-full rounded-lg shadow-2xl"
                    autoPlay
                  />
                ) : (
                  <div className="bg-white rounded-lg p-8 max-w-md">
                    <div className="text-center">
                      <Mic className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-800 mb-4 font-display">{currentMedia.title}</h3>
                      <audio src={currentMedia.url} controls className="w-full" />
                    </div>
                  </div>
                )}
              </div>

              {/* Media Info */}
              <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-70 text-white p-4 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2 font-display">{currentMedia.title}</h3>
                    <p className="text-sm opacity-90 font-body">{currentMedia.description}</p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span>المصور:</span>
                      <span>{currentMedia.photographer}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>الموقع:</span>
                      <span>{currentMedia.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>التاريخ:</span>
                      <span>{new Date(currentMedia.date).toLocaleDateString('ar-EG')}</span>
                    </div>
                    {currentMedia.duration && (
                      <div className="flex items-center justify-between">
                        <span>المدة:</span>
                        <span>{currentMedia.duration}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="heading-2 text-islamic-800">رفع وسائط جديدة</h2>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="text-sage-500 hover:text-sage-700 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">العنوان</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="عنوان الوسائط"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">الوصف</label>
                  <textarea
                    rows={3}
                    className="form-textarea"
                    placeholder="وصف مفصل للوسائط"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">الفئة</label>
                    <select className="form-select">
                      {mediaCategories.slice(1).map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">الموقع</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="موقع التصوير"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">العلامات</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="العلامات مفصولة بفواصل"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">رفع الملفات</label>
                  <div className="border-2 border-dashed border-sage-300 rounded-lg p-8 text-center hover:border-islamic-500 transition-colors">
                    <Upload className="w-12 h-12 text-sage-400 mx-auto mb-4" />
                    <p className="text-sage-600 mb-2 font-body">اسحب الملفات هنا أو انقر للاختيار</p>
                    <p className="text-sm text-sage-500 font-body">يدعم: JPG, PNG, MP4, MP3 (حد أقصى 100MB)</p>
                    <input type="file" className="hidden" multiple accept="image/*,video/*,audio/*" />
                    <button type="button" className="mt-4 btn-primary">
                      اختيار الملفات
                    </button>
                  </div>
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
                      success('تم رفع الوسائط', 'تم رفع الملفات بنجاح إلى المعرض');
                      setShowUploadModal(false);
                    }}
                    className="btn-primary"
                  >
                    <Upload className="w-5 h-5 ml-2" />
                    رفع الوسائط
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

export default MediaGalleryPage;