import React, { useState } from 'react';
import { Archive, Search, Filter, Calendar, Tag, FileText, Image, File, Download, Eye, Star, Clock, User, FolderOpen, Grid, List, SortAsc, SortDesc, RefreshCw, Database, HardDrive, Shield, Zap, TrendingUp, BarChart3, PieChart, Activity, CheckCircle, AlertTriangle, XCircle, Plus, Settings, BookOpen, History, Bookmark, Share2, Lock, Unlock, DownloadCloud as CloudDownload, Layers, TreePine, FolderTree, Folder, FileArchive, Cpu, MemoryStick, Network } from 'lucide-react';

const ElectronicArchive: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'timeline'>('grid');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedArchive, setSelectedArchive] = useState<any>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);

  // بيانات تجريبية للأرشيف الإلكتروني
  const archiveItems = [
    {
      id: 1,
      title: 'أرشيف سندات الملكية - القرن العشرين',
      description: 'مجموعة شاملة من سندات ملكية الأراضي الوقفية من بداية القرن العشرين',
      category: 'legal_documents',
      subcategory: 'ownership_deeds',
      year: 1920,
      period: '1900-1950',
      documentsCount: 245,
      totalSize: 1.2,
      language: 'عربي',
      location: 'القدس',
      archiveDate: '2023-01-15',
      lastAccessed: '2024-01-10',
      accessCount: 45,
      status: 'digitized',
      quality: 'high',
      tags: ['سندات ملكية', 'القرن العشرين', 'القدس', 'أوقاف'],
      relatedItems: [2, 5],
      digitalFormat: 'PDF/A',
      originalFormat: 'ورقي',
      condition: 'جيد',
      importance: 'high',
      restrictions: 'restricted'
    },
    {
      id: 2,
      title: 'سجلات المحكمة الشرعية - العهد العثماني',
      description: 'سجلات المحكمة الشرعية في القدس من العهد العثماني تتضمن قضايا الأوقاف',
      category: 'historical_records',
      subcategory: 'court_records',
      year: 1850,
      period: '1800-1900',
      documentsCount: 156,
      totalSize: 2.8,
      language: 'عربي/تركي',
      location: 'القدس',
      archiveDate: '2023-02-20',
      lastAccessed: '2024-01-08',
      accessCount: 23,
      status: 'digitized',
      quality: 'medium',
      tags: ['محكمة شرعية', 'عثماني', 'قضايا أوقاف', 'تاريخي'],
      relatedItems: [1, 3],
      digitalFormat: 'TIFF',
      originalFormat: 'مخطوط',
      condition: 'متوسط',
      importance: 'very_high',
      restrictions: 'public'
    },
    {
      id: 3,
      title: 'خرائط الأراضي الوقفية التاريخية',
      description: 'مجموعة خرائط تاريخية للأراضي الوقفية في فلسطين من فترات مختلفة',
      category: 'maps_plans',
      subcategory: 'historical_maps',
      year: 1930,
      period: '1920-1950',
      documentsCount: 89,
      totalSize: 3.5,
      language: 'عربي/إنجليزي',
      location: 'متعدد',
      archiveDate: '2023-03-10',
      lastAccessed: '2024-01-12',
      accessCount: 67,
      status: 'digitized',
      quality: 'high',
      tags: ['خرائط', 'تاريخية', 'أراضي وقفية', 'مساحة'],
      relatedItems: [4, 6],
      digitalFormat: 'GeoTIFF',
      originalFormat: 'خرائط ورقية',
      condition: 'ممتاز',
      importance: 'high',
      restrictions: 'internal'
    },
    {
      id: 4,
      title: 'وثائق الانتداب البريطاني',
      description: 'وثائق رسمية من فترة الانتداب البريطاني تتعلق بإدارة الأوقاف',
      category: 'administrative_records',
      subcategory: 'mandate_documents',
      year: 1925,
      period: '1920-1948',
      documentsCount: 312,
      totalSize: 1.8,
      language: 'إنجليزي/عربي',
      location: 'القدس',
      archiveDate: '2023-04-05',
      lastAccessed: '2024-01-05',
      accessCount: 34,
      status: 'digitized',
      quality: 'high',
      tags: ['انتداب بريطاني', 'إدارة أوقاف', 'وثائق رسمية'],
      relatedItems: [1, 3],
      digitalFormat: 'PDF/A',
      originalFormat: 'ورقي',
      condition: 'جيد',
      importance: 'high',
      restrictions: 'restricted'
    },
    {
      id: 5,
      title: 'صور فوتوغرافية تاريخية للمساجد',
      description: 'مجموعة نادرة من الصور الفوتوغرافية التاريخية للمساجد والمعالم الوقفية',
      category: 'photographs',
      subcategory: 'historical_photos',
      year: 1940,
      period: '1930-1960',
      documentsCount: 178,
      totalSize: 4.2,
      language: 'بصري',
      location: 'متعدد',
      archiveDate: '2023-05-15',
      lastAccessed: '2024-01-14',
      accessCount: 89,
      status: 'digitized',
      quality: 'medium',
      tags: ['صور تاريخية', 'مساجد', 'معالم وقفية', 'تراث'],
      relatedItems: [2, 6],
      digitalFormat: 'JPEG 2000',
      originalFormat: 'صور فوتوغرافية',
      condition: 'متوسط',
      importance: 'medium',
      restrictions: 'public'
    },
    {
      id: 6,
      title: 'مخطوطات وقفية نادرة',
      description: 'مجموعة من المخطوطات النادرة المتعلقة بالأوقاف والفقه الإسلامي',
      category: 'manuscripts',
      subcategory: 'religious_texts',
      year: 1600,
      period: '1500-1800',
      documentsCount: 67,
      totalSize: 2.1,
      language: 'عربي',
      location: 'القدس',
      archiveDate: '2023-06-20',
      lastAccessed: '2024-01-09',
      accessCount: 12,
      status: 'digitizing',
      quality: 'high',
      tags: ['مخطوطات', 'فقه إسلامي', 'أوقاف', 'نادر'],
      relatedItems: [2],
      digitalFormat: 'TIFF',
      originalFormat: 'مخطوط',
      condition: 'هش',
      importance: 'very_high',
      restrictions: 'confidential'
    },
    {
      id: 7,
      title: 'تقارير إدارية - النصف الثاني من القرن العشرين',
      description: 'تقارير إدارية ومالية لإدارة الأوقاف من الخمسينات حتى التسعينات',
      category: 'administrative_records',
      subcategory: 'reports',
      year: 1970,
      period: '1950-1990',
      documentsCount: 423,
      totalSize: 3.1,
      language: 'عربي',
      location: 'رام الله',
      archiveDate: '2023-07-10',
      lastAccessed: '2024-01-11',
      accessCount: 56,
      status: 'digitized',
      quality: 'high',
      tags: ['تقارير إدارية', 'تقارير مالية', 'القرن العشرين'],
      relatedItems: [4],
      digitalFormat: 'PDF/A',
      originalFormat: 'ورقي',
      condition: 'جيد',
      importance: 'medium',
      restrictions: 'internal'
    },
    {
      id: 8,
      title: 'مراسلات رسمية تاريخية',
      description: 'مراسلات رسمية بين إدارة الأوقاف والجهات الحكومية عبر فترات تاريخية مختلفة',
      category: 'correspondence',
      subcategory: 'official_letters',
      year: 1960,
      period: '1950-1980',
      documentsCount: 289,
      totalSize: 1.9,
      language: 'عربي',
      location: 'متعدد',
      archiveDate: '2023-08-25',
      lastAccessed: '2024-01-07',
      accessCount: 28,
      status: 'digitized',
      quality: 'medium',
      tags: ['مراسلات رسمية', 'حكومة', 'إدارة أوقاف'],
      relatedItems: [7],
      digitalFormat: 'PDF',
      originalFormat: 'ورقي',
      condition: 'جيد',
      importance: 'medium',
      restrictions: 'restricted'
    }
  ];

  const categoryOptions = [
    { value: 'all', label: 'جميع الفئات', icon: Archive, color: 'text-gray-600' },
    { value: 'legal_documents', label: 'وثائق قانونية', icon: FileText, color: 'text-blue-600' },
    { value: 'historical_records', label: 'سجلات تاريخية', icon: BookOpen, color: 'text-amber-600' },
    { value: 'maps_plans', label: 'خرائط ومخططات', icon: Layers, color: 'text-green-600' },
    { value: 'photographs', label: 'صور فوتوغرافية', icon: Image, color: 'text-purple-600' },
    { value: 'manuscripts', label: 'مخطوطات', icon: BookOpen, color: 'text-red-600' },
    { value: 'administrative_records', label: 'سجلات إدارية', icon: FolderOpen, color: 'text-orange-600' },
    { value: 'correspondence', label: 'مراسلات', icon: FileText, color: 'text-teal-600' }
  ];

  const statusOptions = [
    { value: 'all', label: 'جميع الحالات' },
    { value: 'digitized', label: 'مرقمن' },
    { value: 'digitizing', label: 'قيد الرقمنة' },
    { value: 'pending', label: 'في الانتظار' },
    { value: 'archived', label: 'مؤرشف' }
  ];

  const yearOptions = [
    { value: 'all', label: 'جميع الفترات' },
    { value: '1500-1800', label: '1500-1800' },
    { value: '1800-1900', label: '1800-1900' },
    { value: '1900-1950', label: '1900-1950' },
    { value: '1950-1990', label: '1950-1990' },
    { value: '1990-2000', label: '1990-2000' }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'digitized':
        return 'bg-green-100 text-green-800';
      case 'digitizing':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'digitized':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'digitizing':
        return <Activity className="w-4 h-4 text-blue-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'archived':
        return <Archive className="w-4 h-4 text-gray-500" />;
      default:
        return <XCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getImportanceBadge = (importance: string) => {
    switch (importance) {
      case 'very_high':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRestrictionIcon = (restriction: string) => {
    switch (restriction) {
      case 'public':
        return <Unlock className="w-4 h-4 text-green-500" />;
      case 'internal':
        return <Shield className="w-4 h-4 text-blue-500" />;
      case 'restricted':
        return <Lock className="w-4 h-4 text-orange-500" />;
      case 'confidential':
        return <Lock className="w-4 h-4 text-red-500" />;
      default:
        return <Lock className="w-4 h-4 text-gray-500" />;
    }
  };

  const filteredItems = archiveItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesYear = selectedYear === 'all' || item.period === selectedYear;
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesYear && matchesStatus;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    let aValue, bValue;
    switch (sortBy) {
      case 'title':
        aValue = a.title;
        bValue = b.title;
        break;
      case 'year':
        aValue = a.year;
        bValue = b.year;
        break;
      case 'size':
        aValue = a.totalSize;
        bValue = b.totalSize;
        break;
      case 'access':
        aValue = a.accessCount;
        bValue = b.accessCount;
        break;
      default:
        aValue = new Date(a.archiveDate);
        bValue = new Date(b.archiveDate);
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  // حساب الإحصائيات
  const totalItems = archiveItems.length;
  const totalSize = archiveItems.reduce((sum, item) => sum + item.totalSize, 0);
  const totalDocuments = archiveItems.reduce((sum, item) => sum + item.documentsCount, 0);
  const digitizedCount = archiveItems.filter(item => item.status === 'digitized').length;
  const digitizingCount = archiveItems.filter(item => item.status === 'digitizing').length;
  const totalAccess = archiveItems.reduce((sum, item) => sum + item.accessCount, 0);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">الأرشيف الإلكتروني المتقدم</h1>
          <p className="text-gray-600 mt-1">نظام أرشفة ذكي مع البحث المتقدم والتصنيف التلقائي للوثائق التاريخية</p>
        </div>
        <div className="flex items-center space-x-4 space-x-reverse">
          <button 
            onClick={() => setShowStatsModal(true)}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center"
          >
            <BarChart3 className="w-5 h-5 ml-2" />
            إحصائيات متقدمة
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
            <Download className="w-5 h-5 ml-2" />
            تصدير الفهرس
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center">
            <Plus className="w-5 h-5 ml-2" />
            إضافة للأرشيف
          </button>
        </div>
      </div>

      {/* Advanced Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4 border-r-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">إجمالي المجموعات</p>
              <p className="text-2xl font-bold text-gray-800">{totalItems}</p>
            </div>
            <Archive className="w-6 h-6 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4 border-r-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">إجمالي الوثائق</p>
              <p className="text-2xl font-bold text-gray-800">{totalDocuments.toLocaleString()}</p>
            </div>
            <FileText className="w-6 h-6 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4 border-r-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">الحجم الإجمالي</p>
              <p className="text-xl font-bold text-gray-800">{totalSize.toFixed(1)} GB</p>
            </div>
            <HardDrive className="w-6 h-6 text-purple-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4 border-r-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">مرقمن</p>
              <p className="text-2xl font-bold text-gray-800">{digitizedCount}</p>
            </div>
            <CheckCircle className="w-6 h-6 text-orange-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4 border-r-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">قيد الرقمنة</p>
              <p className="text-2xl font-bold text-gray-800">{digitizingCount}</p>
            </div>
            <Activity className="w-6 h-6 text-yellow-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4 border-r-4 border-teal-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">مرات الوصول</p>
              <p className="text-2xl font-bold text-gray-800">{totalAccess}</p>
            </div>
            <Eye className="w-6 h-6 text-teal-500" />
          </div>
        </div>
      </div>

      {/* Advanced Search and Filters */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4">
          <div className="md:col-span-2 relative">
            <Search className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="البحث الذكي في الأرشيف..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10 pl-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {categoryOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {yearOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          
          <div className="flex items-center space-x-2 space-x-reverse">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="date">التاريخ</option>
              <option value="title">العنوان</option>
              <option value="year">السنة</option>
              <option value="size">الحجم</option>
              <option value="access">الوصول</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              {sortOrder === 'asc' ? <SortAsc className="w-5 h-5" /> : <SortDesc className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 space-x-reverse">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'}`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'}`}
            >
              <List className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('timeline')}
              className={`p-2 rounded-lg ${viewMode === 'timeline' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'}`}
            >
              <History className="w-5 h-5" />
            </button>
          </div>
          
          <div className="text-sm text-gray-600">
            عرض {sortedItems.length} من {totalItems} مجموعة أرشيفية
          </div>
        </div>
      </div>

      {/* Archive Items Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedItems.map((item) => {
            const CategoryIcon = categoryOptions.find(c => c.value === item.category)?.icon || Archive;
            return (
              <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                        <CategoryIcon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{item.title}</h3>
                        <p className="text-sm text-gray-500">{item.period}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 space-x-reverse">
                      {getRestrictionIcon(item.restrictions)}
                      <Star className="w-4 h-4 text-yellow-500" />
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4 text-sm line-clamp-2">{item.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-2 bg-gray-50 rounded-lg">
                      <p className="text-lg font-bold text-blue-600">{item.documentsCount}</p>
                      <p className="text-xs text-gray-600">وثيقة</p>
                    </div>
                    <div className="text-center p-2 bg-gray-50 rounded-lg">
                      <p className="text-lg font-bold text-green-600">{item.totalSize} GB</p>
                      <p className="text-xs text-gray-600">الحجم</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {item.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                    {item.tags.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        +{item.tags.length - 3}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      {getStatusIcon(item.status)}
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(item.status)}`}>
                        {statusOptions.find(s => s.value === item.status)?.label}
                      </span>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getImportanceBadge(item.importance)}`}>
                      {item.importance === 'very_high' ? 'مهم جداً' : 
                       item.importance === 'high' ? 'مهم' :
                       item.importance === 'medium' ? 'متوسط' : 'منخفض'}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-4 space-x-reverse">
                      <div className="flex items-center space-x-1 space-x-reverse">
                        <Eye className="w-4 h-4" />
                        <span>{item.accessCount}</span>
                      </div>
                      <div className="flex items-center space-x-1 space-x-reverse">
                        <Calendar className="w-4 h-4" />
                        <span>{item.year}</span>
                      </div>
                    </div>
                    <span>{item.location}</span>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <button 
                      onClick={() => {
                        setSelectedArchive(item);
                        setShowDetailsModal(true);
                      }}
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                    >
                      عرض التفاصيل
                    </button>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <button className="text-green-600 hover:text-green-700">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="text-purple-600 hover:text-purple-700">
                        <Share2 className="w-4 h-4" />
                      </button>
                      <button className="text-orange-600 hover:text-orange-700">
                        <Bookmark className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : viewMode === 'list' ? (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    المجموعة الأرشيفية
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الفئة
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الفترة
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الوثائق
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الحالة
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الأهمية
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الإجراءات
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedItems.map((item) => {
                  const CategoryIcon = categoryOptions.find(c => c.value === item.category)?.icon || Archive;
                  return (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                            <CategoryIcon className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{item.title}</div>
                            <div className="text-sm text-gray-500">{item.description.slice(0, 60)}...</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                          {categoryOptions.find(c => c.value === item.category)?.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.period}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{item.documentsCount} وثيقة</div>
                        <div className="text-sm text-gray-500">{item.totalSize} GB</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          {getStatusIcon(item.status)}
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(item.status)}`}>
                            {statusOptions.find(s => s.value === item.status)?.label}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getImportanceBadge(item.importance)}`}>
                          {item.importance === 'very_high' ? 'مهم جداً' : 
                           item.importance === 'high' ? 'مهم' :
                           item.importance === 'medium' ? 'متوسط' : 'منخفض'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <button 
                            onClick={() => {
                              setSelectedArchive(item);
                              setShowDetailsModal(true);
                            }}
                            className="text-blue-600 hover:text-blue-700"
                            title="عرض التفاصيل"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button 
                            className="text-green-600 hover:text-green-700"
                            title="تحميل"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                          <button 
                            className="text-purple-600 hover:text-purple-700"
                            title="مشاركة"
                          >
                            <Share2 className="w-4 h-4" />
                          </button>
                          <button 
                            className="text-orange-600 hover:text-orange-700"
                            title="إضافة للمفضلة"
                          >
                            <Bookmark className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        // Timeline View
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">الخط الزمني للأرشيف</h3>
          <div className="space-y-6">
            {sortedItems.map((item, index) => {
              const CategoryIcon = categoryOptions.find(c => c.value === item.category)?.icon || Archive;
              return (
                <div key={item.id} className="flex items-start space-x-4 space-x-reverse">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                      <CategoryIcon className="w-6 h-6 text-blue-600" />
                    </div>
                    {index < sortedItems.length - 1 && (
                      <div className="w-0.5 h-16 bg-gray-300 mt-2"></div>
                    )}
                  </div>
                  <div className="flex-1 bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-lg font-semibold text-gray-800">{item.title}</h4>
                      <span className="text-sm font-medium text-blue-600">{item.year}</span>
                    </div>
                    <p className="text-gray-600 mb-3">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-500">
                        <span>{item.documentsCount} وثيقة</span>
                        <span>{item.totalSize} GB</span>
                        <span>{item.location}</span>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        {getStatusIcon(item.status)}
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(item.status)}`}>
                          {statusOptions.find(s => s.value === item.status)?.label}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Archive Details Modal */}
      {showDetailsModal && selectedArchive && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">تفاصيل المجموعة الأرشيفية</h2>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-4">المعلومات الأساسية</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">العنوان</p>
                      <p className="font-medium">{selectedArchive.title}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">الفئة</p>
                      <p className="font-medium">{categoryOptions.find(c => c.value === selectedArchive.category)?.label}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">الفترة الزمنية</p>
                      <p className="font-medium">{selectedArchive.period}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">الموقع</p>
                      <p className="font-medium">{selectedArchive.location}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">اللغة</p>
                      <p className="font-medium">{selectedArchive.language}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">تاريخ الأرشفة</p>
                      <p className="font-medium">{new Date(selectedArchive.archiveDate).toLocaleDateString('ar-EG')}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-4">الوصف التفصيلي</h3>
                  <p className="text-gray-700">{selectedArchive.description}</p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-4">العلامات والكلمات المفتاحية</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedArchive.tags.map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-4">المعلومات التقنية</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">التنسيق الرقمي</p>
                      <p className="font-medium">{selectedArchive.digitalFormat}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">التنسيق الأصلي</p>
                      <p className="font-medium">{selectedArchive.originalFormat}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">حالة الحفظ</p>
                      <p className="font-medium">{selectedArchive.condition}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">جودة الرقمنة</p>
                      <p className="font-medium">{selectedArchive.quality === 'high' ? 'عالية' : selectedArchive.quality === 'medium' ? 'متوسطة' : 'منخفضة'}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-4">الإحصائيات</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">عدد الوثائق</span>
                      <span className="font-medium">{selectedArchive.documentsCount}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">الحجم الإجمالي</span>
                      <span className="font-medium">{selectedArchive.totalSize} GB</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">مرات الوصول</span>
                      <span className="font-medium">{selectedArchive.accessCount}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">آخر وصول</span>
                      <span className="font-medium">{new Date(selectedArchive.lastAccessed).toLocaleDateString('ar-EG')}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-4">الحالة والأمان</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">الحالة</span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(selectedArchive.status)}`}>
                        {statusOptions.find(s => s.value === selectedArchive.status)?.label}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">الأهمية</span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getImportanceBadge(selectedArchive.importance)}`}>
                        {selectedArchive.importance === 'very_high' ? 'مهم جداً' : 
                         selectedArchive.importance === 'high' ? 'مهم' :
                         selectedArchive.importance === 'medium' ? 'متوسط' : 'منخفض'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">مستوى الوصول</span>
                      <div className="flex items-center space-x-1 space-x-reverse">
                        {getRestrictionIcon(selectedArchive.restrictions)}
                        <span className="text-sm">
                          {selectedArchive.restrictions === 'public' ? 'عام' :
                           selectedArchive.restrictions === 'internal' ? 'داخلي' :
                           selectedArchive.restrictions === 'restricted' ? 'مقيد' : 'سري'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    تصفح الوثائق
                  </button>
                  <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                    تحميل المجموعة
                  </button>
                  <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
                    البحث في المحتوى
                  </button>
                  <button className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition-colors">
                    إضافة للمفضلة
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Advanced Statistics Modal */}
      {showStatsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">إحصائيات الأرشيف المتقدمة</h2>
              <button
                onClick={() => setShowStatsModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-4">توزيع الفئات</h3>
                <div className="space-y-3">
                  {categoryOptions.slice(1).map(category => {
                    const count = archiveItems.filter(item => item.category === category.value).length;
                    const percentage = ((count / totalItems) * 100).toFixed(1);
                    return (
                      <div key={category.value} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <category.icon className={`w-4 h-4 ${category.color}`} />
                          <span className="text-sm">{category.label}</span>
                        </div>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <span className="text-sm font-medium">{count}</span>
                          <span className="text-xs text-gray-500">({percentage}%)</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-4">توزيع الحالات</h3>
                <div className="space-y-3">
                  {statusOptions.slice(1).map(status => {
                    const count = archiveItems.filter(item => item.status === status.value).length;
                    const percentage = ((count / totalItems) * 100).toFixed(1);
                    return (
                      <div key={status.value} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          {getStatusIcon(status.value)}
                          <span className="text-sm">{status.label}</span>
                        </div>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <span className="text-sm font-medium">{count}</span>
                          <span className="text-xs text-gray-500">({percentage}%)</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-4">الفترات الزمنية</h3>
                <div className="space-y-3">
                  {yearOptions.slice(1).map(period => {
                    const count = archiveItems.filter(item => item.period === period.value).length;
                    const percentage = ((count / totalItems) * 100).toFixed(1);
                    return (
                      <div key={period.value} className="flex items-center justify-between">
                        <span className="text-sm">{period.label}</span>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <span className="text-sm font-medium">{count}</span>
                          <span className="text-xs text-gray-500">({percentage}%)</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-4">إحصائيات الاستخدام</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">الأكثر وصولاً</span>
                    <span className="font-medium">{Math.max(...archiveItems.map(item => item.accessCount))} مرة</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">متوسط الوصول</span>
                    <span className="font-medium">{Math.round(totalAccess / totalItems)} مرة</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">أكبر مجموعة</span>
                    <span className="font-medium">{Math.max(...archiveItems.map(item => item.documentsCount))} وثيقة</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">متوسط الحجم</span>
                    <span className="font-medium">{(totalSize / totalItems).toFixed(1)} GB</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ElectronicArchive;