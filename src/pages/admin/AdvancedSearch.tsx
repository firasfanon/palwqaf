import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Calendar, 
  MapPin, 
  FileText, 
  Building, 
  Gavel, 
  Archive,
  User,
  Clock,
  Eye,
  Download,
  Star,
  Tag,
  SortAsc,
  SortDesc,
  Grid,
  List,
  RefreshCw,
  Settings,
  Bookmark,
  Share2,
  AlertCircle,
  CheckCircle,
  XCircle,
  Layers,
  Database,
  Zap,
  TrendingUp,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';

const AdvancedSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSystems, setSelectedSystems] = useState<string[]>(['all']);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(['all']);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedGovernorate, setSelectedGovernorate] = useState('all');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [sortBy, setSortBy] = useState('relevance');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [showFilters, setShowFilters] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [searchTime, setSearchTime] = useState(0);

  // أنظمة البحث المتاحة
  const searchSystems = [
    { id: 'all', name: 'جميع الأنظمة', icon: Database, color: 'text-gray-600' },
    { id: 'cases', name: 'إدارة القضايا', icon: Gavel, color: 'text-red-600' },
    { id: 'waqf_lands', name: 'الأراضي الوقفية', icon: Building, color: 'text-green-600' },
    { id: 'documents', name: 'إدارة الوثائق', icon: FileText, color: 'text-blue-600' },
    { id: 'archive', name: 'الأرشيف الإلكتروني', icon: Archive, color: 'text-purple-600' },
    { id: 'users', name: 'المستخدمون', icon: User, color: 'text-orange-600' },
    { id: 'appointments', name: 'المواعيد', icon: Calendar, color: 'text-pink-600' }
  ];

  // أنواع المحتوى
  const contentTypes = [
    { id: 'all', name: 'جميع الأنواع' },
    { id: 'text', name: 'نصوص' },
    { id: 'documents', name: 'وثائق' },
    { id: 'images', name: 'صور' },
    { id: 'maps', name: 'خرائط' },
    { id: 'reports', name: 'تقارير' }
  ];

  // حالات المحتوى
  const statusOptions = [
    { id: 'all', name: 'جميع الحالات' },
    { id: 'active', name: 'نشط' },
    { id: 'pending', name: 'معلق' },
    { id: 'completed', name: 'مكتمل' },
    { id: 'archived', name: 'مؤرشف' }
  ];

  // المحافظات
  const governorates = [
    { id: 'all', name: 'جميع المحافظات' },
    { id: 'jerusalem', name: 'القدس' },
    { id: 'ramallah', name: 'رام الله والبيرة' },
    { id: 'nablus', name: 'نابلس' },
    { id: 'hebron', name: 'الخليل' },
    { id: 'gaza', name: 'غزة' },
    { id: 'jenin', name: 'جنين' },
    { id: 'tulkarm', name: 'طولكرم' },
    { id: 'qalqilya', name: 'قلقيلية' },
    { id: 'salfit', name: 'سلفيت' },
    { id: 'bethlehem', name: 'بيت لحم' },
    { id: 'jericho', name: 'أريحا' }
  ];

  // بيانات تجريبية للنتائج
  const mockResults = [
    {
      id: 1,
      title: 'قضية نزاع حدود أرض المسجد الكبير',
      description: 'نزاع حول الحدود الشرقية لأرض المسجد الكبير مع الأراضي المجاورة في البلدة القديمة بالقدس',
      system: 'cases',
      type: 'case',
      status: 'in_progress',
      governorate: 'jerusalem',
      date: '2024-01-10',
      relevance: 95,
      tags: ['نزاع حدود', 'المسجد الكبير', 'القدس', 'البلدة القديمة'],
      relatedItems: 5,
      lastUpdate: '2024-01-15'
    },
    {
      id: 2,
      title: 'سند ملكية أرض المسجد الكبير',
      description: 'سند ملكية رقم 12345 للأرض الوقفية الواقعة في البلدة القديمة بالقدس',
      system: 'documents',
      type: 'document',
      status: 'active',
      governorate: 'jerusalem',
      date: '2024-01-15',
      relevance: 92,
      tags: ['سند ملكية', 'القدس', 'المسجد الكبير', 'وثيقة قانونية'],
      relatedItems: 3,
      lastUpdate: '2024-01-15'
    },
    {
      id: 3,
      title: 'أرض المسجد الكبير - القدس',
      description: 'أرض وقفية تحتوي على المسجد الكبير والمرافق التابعة له في البلدة القديمة',
      system: 'waqf_lands',
      type: 'waqf_land',
      status: 'active',
      governorate: 'jerusalem',
      date: '2020-01-15',
      relevance: 90,
      tags: ['أرض وقفية', 'مسجد', 'القدس', 'البلدة القديمة'],
      relatedItems: 12,
      lastUpdate: '2024-01-10'
    },
    {
      id: 4,
      title: 'خرائط حدود المسجد الكبير التاريخية',
      description: 'مجموعة خرائط تاريخية تظهر حدود أرض المسجد الكبير عبر فترات زمنية مختلفة',
      system: 'archive',
      type: 'maps',
      status: 'archived',
      governorate: 'jerusalem',
      date: '1920-01-01',
      relevance: 88,
      tags: ['خرائط تاريخية', 'حدود', 'المسجد الكبير', 'أرشيف'],
      relatedItems: 8,
      lastUpdate: '2023-12-20'
    },
    {
      id: 5,
      title: 'تقرير مالي - إيرادات وقف الزيتون',
      description: 'تقرير مفصل عن إيرادات ومصروفات وقف الزيتون التجاري في رام الله',
      system: 'documents',
      type: 'report',
      status: 'completed',
      governorate: 'ramallah',
      date: '2024-01-10',
      relevance: 85,
      tags: ['تقرير مالي', 'إيرادات', 'وقف الزيتون', 'رام الله'],
      relatedItems: 6,
      lastUpdate: '2024-01-12'
    },
    {
      id: 6,
      title: 'وقف الزيتون التجاري - رام الله',
      description: 'مجمع تجاري وقفي يحتوي على محلات ومكاتب للإيجار في مركز مدينة رام الله',
      system: 'waqf_lands',
      type: 'waqf_land',
      status: 'active',
      governorate: 'ramallah',
      date: '2019-03-22',
      relevance: 82,
      tags: ['وقف تجاري', 'محلات', 'رام الله', 'إيجار'],
      relatedItems: 18,
      lastUpdate: '2024-01-12'
    },
    {
      id: 7,
      title: 'اجتماع لجنة الأوقاف - يناير 2024',
      description: 'موعد اجتماع لجنة الأوقاف لمناقشة القضايا العالقة والمشاريع الجديدة',
      system: 'appointments',
      type: 'appointment',
      status: 'completed',
      governorate: 'jerusalem',
      date: '2024-01-05',
      relevance: 78,
      tags: ['اجتماع', 'لجنة الأوقاف', 'قضايا عالقة', 'مشاريع'],
      relatedItems: 4,
      lastUpdate: '2024-01-06'
    },
    {
      id: 8,
      title: 'مدير القضايا - القدس',
      description: 'أحمد محمد الأحمد - مدير قسم القضايا في مكتب القدس',
      system: 'users',
      type: 'user',
      status: 'active',
      governorate: 'jerusalem',
      date: '2023-01-01',
      relevance: 75,
      tags: ['مدير قضايا', 'القدس', 'موظف', 'إدارة'],
      relatedItems: 25,
      lastUpdate: '2024-01-14'
    }
  ];

  // تنفيذ البحث
  const performSearch = async () => {
    setIsSearching(true);
    const startTime = Date.now();
    
    // محاكاة وقت البحث
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    let results = mockResults;
    
    // تصفية النتائج حسب الاستعلام
    if (searchQuery.trim()) {
      results = results.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // تصفية حسب الأنظمة
    if (!selectedSystems.includes('all')) {
      results = results.filter(item => selectedSystems.includes(item.system));
    }
    
    // تصفية حسب النوع
    if (!selectedTypes.includes('all')) {
      results = results.filter(item => selectedTypes.includes(item.type));
    }
    
    // تصفية حسب الحالة
    if (selectedStatus !== 'all') {
      results = results.filter(item => item.status === selectedStatus);
    }
    
    // تصفية حسب المحافظة
    if (selectedGovernorate !== 'all') {
      results = results.filter(item => item.governorate === selectedGovernorate);
    }
    
    // تصفية حسب التاريخ
    if (dateRange.from) {
      results = results.filter(item => new Date(item.date) >= new Date(dateRange.from));
    }
    if (dateRange.to) {
      results = results.filter(item => new Date(item.date) <= new Date(dateRange.to));
    }
    
    // ترتيب النتائج
    results.sort((a, b) => {
      let aValue, bValue;
      switch (sortBy) {
        case 'relevance':
          aValue = a.relevance;
          bValue = b.relevance;
          break;
        case 'date':
          aValue = new Date(a.date);
          bValue = new Date(b.date);
          break;
        case 'title':
          aValue = a.title;
          bValue = b.title;
          break;
        case 'system':
          aValue = a.system;
          bValue = b.system;
          break;
        default:
          aValue = a.relevance;
          bValue = b.relevance;
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
    
    setSearchResults(results);
    setTotalResults(results.length);
    setSearchTime(Date.now() - startTime);
    setIsSearching(false);
  };

  // تنفيذ البحث عند تغيير المعايير
  useEffect(() => {
    if (searchQuery.trim() || selectedSystems.length > 1 || selectedTypes.length > 1 || 
        selectedStatus !== 'all' || selectedGovernorate !== 'all' || 
        dateRange.from || dateRange.to) {
      performSearch();
    } else {
      setSearchResults([]);
      setTotalResults(0);
    }
  }, [searchQuery, selectedSystems, selectedTypes, selectedStatus, selectedGovernorate, dateRange, sortBy, sortOrder]);

  const getSystemIcon = (systemId: string) => {
    const system = searchSystems.find(s => s.id === systemId);
    return system ? system.icon : Database;
  };

  const getSystemColor = (systemId: string) => {
    const system = searchSystems.find(s => s.id === systemId);
    return system ? system.color : 'text-gray-600';
  };

  const getSystemName = (systemId: string) => {
    const system = searchSystems.find(s => s.id === systemId);
    return system ? system.name : systemId;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      case 'in_progress':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-blue-500" />;
      case 'archived':
        return <Archive className="w-4 h-4 text-gray-500" />;
      case 'in_progress':
        return <Activity className="w-4 h-4 text-orange-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const handleSystemToggle = (systemId: string) => {
    if (systemId === 'all') {
      setSelectedSystems(['all']);
    } else {
      const newSystems = selectedSystems.includes('all') 
        ? [systemId]
        : selectedSystems.includes(systemId)
          ? selectedSystems.filter(s => s !== systemId)
          : [...selectedSystems.filter(s => s !== 'all'), systemId];
      
      setSelectedSystems(newSystems.length === 0 ? ['all'] : newSystems);
    }
  };

  const handleTypeToggle = (typeId: string) => {
    if (typeId === 'all') {
      setSelectedTypes(['all']);
    } else {
      const newTypes = selectedTypes.includes('all') 
        ? [typeId]
        : selectedTypes.includes(typeId)
          ? selectedTypes.filter(t => t !== typeId)
          : [...selectedTypes.filter(t => t !== 'all'), typeId];
      
      setSelectedTypes(newTypes.length === 0 ? ['all'] : newTypes);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">البحث المتقدم</h1>
          <p className="text-gray-600 mt-1">بحث شامل عبر جميع أنظمة الوزارة مع فلاتر متقدمة</p>
        </div>
        <div className="flex items-center space-x-4 space-x-reverse">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <Filter className="w-5 h-5 ml-2" />
            {showFilters ? 'إخفاء الفلاتر' : 'إظهار الفلاتر'}
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center">
            <Download className="w-5 h-5 ml-2" />
            تصدير النتائج
          </button>
        </div>
      </div>

      {/* Search Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 border-r-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">إجمالي النتائج</p>
              <p className="text-3xl font-bold text-gray-800">{totalResults}</p>
            </div>
            <Search className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border-r-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">وقت البحث</p>
              <p className="text-2xl font-bold text-gray-800">{searchTime}ms</p>
            </div>
            <Zap className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border-r-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">الأنظمة المبحوثة</p>
              <p className="text-2xl font-bold text-gray-800">
                {selectedSystems.includes('all') ? searchSystems.length - 1 : selectedSystems.length}
              </p>
            </div>
            <Database className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border-r-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">دقة البحث</p>
              <p className="text-2xl font-bold text-gray-800">
                {searchResults.length > 0 ? Math.round(searchResults.reduce((sum, r) => sum + r.relevance, 0) / searchResults.length) : 0}%
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Main Search Interface */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute right-4 top-4 h-6 w-6 text-gray-400" />
          <input
            type="text"
            placeholder="ابحث في جميع أنظمة الوزارة..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-12 pl-4 py-3 w-full text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          {isSearching && (
            <div className="absolute left-4 top-4">
              <RefreshCw className="w-6 h-6 text-green-500 animate-spin" />
            </div>
          )}
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="space-y-6 border-t pt-6">
            {/* Systems Filter */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">الأنظمة المراد البحث فيها</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                {searchSystems.map((system) => {
                  const SystemIcon = system.icon;
                  const isSelected = selectedSystems.includes(system.id);
                  return (
                    <button
                      key={system.id}
                      onClick={() => handleSystemToggle(system.id)}
                      className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all ${
                        isSelected
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      <SystemIcon className={`w-6 h-6 mb-2 ${isSelected ? 'text-green-600' : system.color}`} />
                      <span className="text-sm font-medium text-center">{system.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Additional Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">نوع المحتوى</label>
                <select
                  value={selectedTypes[0] || 'all'}
                  onChange={(e) => handleTypeToggle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {contentTypes.map(type => (
                    <option key={type.id} value={type.id}>{type.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الحالة</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {statusOptions.map(status => (
                    <option key={status.id} value={status.id}>{status.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">المحافظة</label>
                <select
                  value={selectedGovernorate}
                  onChange={(e) => setSelectedGovernorate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {governorates.map(gov => (
                    <option key={gov.id} value={gov.id}>{gov.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ترتيب النتائج</label>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="relevance">الصلة</option>
                    <option value="date">التاريخ</option>
                    <option value="title">العنوان</option>
                    <option value="system">النظام</option>
                  </select>
                  <button
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    {sortOrder === 'asc' ? <SortAsc className="w-5 h-5" /> : <SortDesc className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Date Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">من تاريخ</label>
                <input
                  type="date"
                  value={dateRange.from}
                  onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">إلى تاريخ</label>
                <input
                  type="date"
                  value={dateRange.to}
                  onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Search Results */}
      {(searchResults.length > 0 || isSearching) && (
        <div className="bg-white rounded-lg shadow-md">
          {/* Results Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">نتائج البحث</h2>
                <p className="text-gray-600 mt-1">
                  {isSearching ? 'جاري البحث...' : `تم العثور على ${totalResults} نتيجة في ${searchTime}ms`}
                </p>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'}`}
                >
                  <List className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Results Content */}
          <div className="p-6">
            {isSearching ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <RefreshCw className="w-12 h-12 text-green-500 animate-spin mx-auto mb-4" />
                  <p className="text-gray-600">جاري البحث في جميع الأنظمة...</p>
                </div>
              </div>
            ) : viewMode === 'list' ? (
              <div className="space-y-4">
                {searchResults.map((result) => {
                  const SystemIcon = getSystemIcon(result.system);
                  return (
                    <div key={result.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gray-100`}>
                            <SystemIcon className={`w-5 h-5 ${getSystemColor(result.system)}`} />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800 hover:text-green-600 cursor-pointer">
                              {result.title}
                            </h3>
                            <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-500 mt-1">
                              <span>{getSystemName(result.system)}</span>
                              <span>•</span>
                              <span>{governorates.find(g => g.id === result.governorate)?.name}</span>
                              <span>•</span>
                              <span>{new Date(result.date).toLocaleDateString('ar-EG')}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <div className="flex items-center space-x-1 space-x-reverse">
                            {getStatusIcon(result.status)}
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(result.status)}`}>
                              {statusOptions.find(s => s.id === result.status)?.name}
                            </span>
                          </div>
                          <div className="text-sm text-gray-500">
                            {result.relevance}% مطابقة
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {result.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          {result.tags.slice(0, 4).map((tag, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                              {tag}
                            </span>
                          ))}
                          {result.tags.length > 4 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                              +{result.tags.length - 4}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-4 space-x-reverse">
                          <div className="flex items-center space-x-1 space-x-reverse text-sm text-gray-500">
                            <Layers className="w-4 h-4" />
                            <span>{result.relatedItems} عنصر مرتبط</span>
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <button className="text-blue-600 hover:text-blue-700">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="text-green-600 hover:text-green-700">
                              <Bookmark className="w-4 h-4" />
                            </button>
                            <button className="text-purple-600 hover:text-purple-700">
                              <Share2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map((result) => {
                  const SystemIcon = getSystemIcon(result.system);
                  return (
                    <div key={result.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gray-100`}>
                            <SystemIcon className={`w-5 h-5 ${getSystemColor(result.system)}`} />
                          </div>
                          <div>
                            <span className="text-sm text-gray-500">{getSystemName(result.system)}</span>
                          </div>
                        </div>
                        <div className="text-sm font-medium text-green-600">
                          {result.relevance}%
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                        {result.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-4 text-sm line-clamp-3">
                        {result.description}
                      </p>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-1 space-x-reverse">
                          {getStatusIcon(result.status)}
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(result.status)}`}>
                            {statusOptions.find(s => s.id === result.status)?.name}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(result.date).toLocaleDateString('ar-EG')}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-4">
                        {result.tags.slice(0, 3).map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div className="flex items-center space-x-1 space-x-reverse text-sm text-gray-500">
                          <Layers className="w-4 h-4" />
                          <span>{result.relatedItems}</span>
                        </div>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <button className="text-blue-600 hover:text-blue-700">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="text-green-600 hover:text-green-700">
                            <Bookmark className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* No Results */}
      {!isSearching && searchQuery.trim() && searchResults.length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">لم يتم العثور على نتائج</h3>
          <p className="text-gray-600 mb-6">جرب تعديل معايير البحث أو استخدام كلمات مفتاحية مختلفة</p>
          <div className="flex items-center justify-center space-x-4 space-x-reverse">
            <button 
              onClick={() => {
                setSearchQuery('');
                setSelectedSystems(['all']);
                setSelectedTypes(['all']);
                setSelectedStatus('all');
                setSelectedGovernorate('all');
                setDateRange({ from: '', to: '' });
              }}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              مسح الفلاتر
            </button>
            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              نصائح البحث
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedSearch;