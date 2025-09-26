import React, { useState, useEffect } from 'react';
import { 
  Key, 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Eye, 
  Trash2, 
  Download, 
  Upload,
  MapPin, 
  Building, 
  Calendar, 
  User, 
  FileText, 
  Shield,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock,
  Star,
  Target,
  Award,
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
  Database,
  Globe,
  Layers,
  Archive,
  Settings,
  RefreshCw,
  Save,
  Share2,
  Printer,
  Bookmark,
  Flag,
  Crown,
  Gem,
  Zap,
  Sparkles,
  Heart,
  BookOpen,
  Home,
  School,
  ShoppingCart,
  Cross,
  TreePine,
  Mountain,
  Compass,
  Navigation
} from 'lucide-react';

const NationalWaqfRegistry: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGovernorate, setSelectedGovernorate] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>('grid');
  const [showModal, setShowModal] = useState(false);
  const [selectedRegistry, setSelectedRegistry] = useState<any>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // بيانات تجريبية للسجل الوطني للأوقاف
  const nationalRegistry = [
    {
      id: 'PS-JER-001-MSQ-001',
      registryNumber: 'WQF-2024-001',
      name: 'المسجد الأقصى المبارك',
      description: 'أولى القبلتين وثالث الحرمين الشريفين، أقدس المساجد في فلسطين',
      waqfType: 'mosque',
      subType: 'grand_mosque',
      governorate: 'jerusalem',
      city: 'القدس',
      district: 'البلدة القديمة',
      area: 144000,
      estimatedValue: 50000000,
      currentStatus: 'active',
      legalStatus: 'registered',
      establishmentDate: '691-01-01',
      historicalPeriod: 'umayyad',
      founder: 'الخليفة عبد الملك بن مروان',
      currentManager: 'الشيخ عكرمة صبري',
      managementType: 'ministry_direct',
      monthlyIncome: 0,
      monthlyExpenses: 50000,
      lastInspection: '2024-01-10',
      nextInspection: '2024-04-10',
      maintenanceStatus: 'excellent',
      documentsCount: 25,
      legalDocumentsCount: 15,
      coordinates: { lat: 31.7767, lng: 35.2345 },
      createdAt: '2024-01-01',
      lastModified: '2024-01-15',
      version: 1
    },
    {
      id: 'PS-RAM-002-COM-001',
      registryNumber: 'WQF-2024-002',
      name: 'وقف الزيتون التجاري',
      description: 'مجمع تجاري وقفي يحتوي على محلات ومكاتب للإيجار في مركز رام الله',
      waqfType: 'commercial',
      subType: 'urban_vacant',
      governorate: 'ramallah',
      city: 'رام الله',
      district: 'وسط المدينة',
      area: 1800,
      estimatedValue: 3200000,
      currentStatus: 'active',
      legalStatus: 'registered',
      establishmentDate: '2019-03-22',
      historicalPeriod: 'modern',
      founder: 'جمعية الأوقاف الخيرية',
      currentManager: 'فاطمة خالد يوسف',
      managementType: 'private_manager',
      monthlyIncome: 28000,
      monthlyExpenses: 12000,
      lastInspection: '2024-01-12',
      nextInspection: '2024-07-12',
      maintenanceStatus: 'good',
      documentsCount: 18,
      legalDocumentsCount: 8,
      coordinates: { lat: 31.9038, lng: 35.2034 },
      createdAt: '2024-01-02',
      lastModified: '2024-01-12',
      version: 2
    },
    {
      id: 'PS-NAB-003-CEM-001',
      registryNumber: 'WQF-2024-003',
      name: 'مقبرة الشهداء',
      description: 'مقبرة إسلامية وقفية لدفن الموتى من أبناء المنطقة في نابلس',
      waqfType: 'cemetery',
      subType: 'martyrs_cemetery',
      governorate: 'nablus',
      city: 'نابلس',
      district: 'شرق المدينة',
      area: 5000,
      estimatedValue: 800000,
      currentStatus: 'active',
      legalStatus: 'registered',
      establishmentDate: '1950-01-01',
      historicalPeriod: 'modern',
      founder: 'بلدية نابلس',
      currentManager: 'محمد علي حسن',
      managementType: 'local_committee',
      monthlyIncome: 2000,
      monthlyExpenses: 3000,
      lastInspection: '2024-01-08',
      nextInspection: '2024-07-08',
      maintenanceStatus: 'fair',
      documentsCount: 8,
      legalDocumentsCount: 5,
      coordinates: { lat: 32.2211, lng: 35.2544 },
      createdAt: '2024-01-03',
      lastModified: '2024-01-08',
      version: 1
    },
    {
      id: 'PS-GAZ-004-SCH-001',
      registryNumber: 'WQF-2024-004',
      name: 'مدرسة الأوقاف الابتدائية',
      description: 'مدرسة ابتدائية وقفية تخدم أطفال المنطقة في حي الزيتون بغزة',
      waqfType: 'educational',
      subType: 'urban_vacant',
      governorate: 'gaza',
      city: 'غزة',
      district: 'حي الزيتون',
      area: 3200,
      estimatedValue: 1500000,
      currentStatus: 'under_review',
      legalStatus: 'pending_registration',
      establishmentDate: '2021-09-05',
      historicalPeriod: 'modern',
      founder: 'وزارة الأوقاف',
      currentManager: 'سارة أحمد محمود',
      managementType: 'ministry_direct',
      monthlyIncome: 5000,
      monthlyExpenses: 18000,
      lastInspection: '2024-01-14',
      nextInspection: '2024-07-14',
      maintenanceStatus: 'good',
      documentsCount: 15,
      legalDocumentsCount: 6,
      coordinates: { lat: 31.5017, lng: 34.4668 },
      createdAt: '2024-01-04',
      lastModified: '2024-01-14',
      version: 3
    },
    {
      id: 'PS-HEB-005-AGR-001',
      registryNumber: 'WQF-2024-005',
      name: 'أراضي زراعية - وادي النار',
      description: 'أراضي زراعية وقفية مزروعة بأشجار الزيتون والحمضيات في وادي النار',
      waqfType: 'agricultural',
      subType: 'rural_vacant',
      governorate: 'hebron',
      city: 'الخليل',
      district: 'وادي النار',
      area: 12000,
      estimatedValue: 2800000,
      currentStatus: 'disputed',
      legalStatus: 'disputed_ownership',
      establishmentDate: '1800-01-01',
      historicalPeriod: 'ottoman',
      founder: 'عائلة الخليلي الوقفية',
      currentManager: 'خالد يوسف إبراهيم',
      managementType: 'family_managed',
      monthlyIncome: 8000,
      monthlyExpenses: 5000,
      lastInspection: '2024-01-09',
      nextInspection: '2024-07-09',
      maintenanceStatus: 'needs_assessment',
      documentsCount: 22,
      legalDocumentsCount: 12,
      coordinates: { lat: 31.5326, lng: 35.0998 },
      createdAt: '2024-01-05',
      lastModified: '2024-01-09',
      version: 4
    },
    {
      id: 'PS-JEN-006-RES-001',
      registryNumber: 'WQF-2024-006',
      name: 'مجمع سكني وقفي',
      description: 'مجمع سكني وقفي يحتوي على شقق للإيجار للأسر المحتاجة في جنين',
      waqfType: 'residential',
      subType: 'urban_vacant',
      governorate: 'jenin',
      city: 'جنين',
      district: 'وسط المدينة',
      area: 4500,
      estimatedValue: 1800000,
      currentStatus: 'active',
      legalStatus: 'registered',
      establishmentDate: '2020-05-18',
      historicalPeriod: 'modern',
      founder: 'جمعية البر والإحسان',
      currentManager: 'نور الدين محمد',
      managementType: 'community_managed',
      monthlyIncome: 12000,
      monthlyExpenses: 9000,
      lastInspection: '2024-01-11',
      nextInspection: '2024-07-11',
      maintenanceStatus: 'good',
      documentsCount: 10,
      legalDocumentsCount: 7,
      coordinates: { lat: 32.4614, lng: 35.3007 },
      createdAt: '2024-01-06',
      lastModified: '2024-01-11',
      version: 2
    }
  ];

  const waqfTypes = [
    { id: 'all', name: 'جميع الأنواع', icon: Building, color: 'text-islamic-600' },
    { id: 'mosque', name: 'مساجد', icon: Crown, color: 'text-green-600' },
    { id: 'cemetery', name: 'مقابر', icon: Cross, color: 'text-gray-600' },
    { id: 'educational', name: 'تعليمي', icon: School, color: 'text-blue-600' },
    { id: 'commercial', name: 'تجاري', icon: ShoppingCart, color: 'text-purple-600' },
    { id: 'residential', name: 'سكني', icon: Home, color: 'text-orange-600' },
    { id: 'agricultural', name: 'زراعي', icon: TreePine, color: 'text-green-500' }
  ];

  const governorateOptions = [
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
    { id: 'jericho', name: 'أريحا والأغوار' }
  ];

  const statusOptions = [
    { id: 'all', name: 'جميع الحالات' },
    { id: 'active', name: 'نشط' },
    { id: 'inactive', name: 'غير نشط' },
    { id: 'under_development', name: 'قيد التطوير' },
    { id: 'disputed', name: 'متنازع عليه' },
    { id: 'under_review', name: 'قيد المراجعة' },
    { id: 'suspended', name: 'معلق' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'inactive':
        return <XCircle className="w-4 h-4 text-gray-500" />;
      case 'under_development':
        return <Activity className="w-4 h-4 text-blue-500" />;
      case 'disputed':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'under_review':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'suspended':
        return <XCircle className="w-4 h-4 text-orange-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return 'status-active';
      case 'inactive':
        return 'status-inactive';
      case 'under_development':
        return 'bg-blue-100 text-blue-800';
      case 'disputed':
        return 'status-error';
      case 'under_review':
        return 'status-pending';
      case 'suspended':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'status-inactive';
    }
  };

  const getTypeIcon = (type: string) => {
    const waqfType = waqfTypes.find(t => t.id === type);
    return waqfType ? waqfType.icon : Building;
  };

  const getTypeColor = (type: string) => {
    const waqfType = waqfTypes.find(t => t.id === type);
    return waqfType ? waqfType.color : 'text-gray-600';
  };

  const filteredRegistry = nationalRegistry.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.registryNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGovernorate = selectedGovernorate === 'all' || item.governorate === selectedGovernorate;
    const matchesType = selectedType === 'all' || item.waqfType === selectedType;
    const matchesStatus = selectedStatus === 'all' || item.currentStatus === selectedStatus;
    return matchesSearch && matchesGovernorate && matchesType && matchesStatus;
  });

  const totalPages = Math.ceil(filteredRegistry.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredRegistry.slice(startIndex, startIndex + itemsPerPage);

  // حساب الإحصائيات
  const totalValue = nationalRegistry.reduce((sum, item) => sum + item.estimatedValue, 0);
  const totalArea = nationalRegistry.reduce((sum, item) => sum + item.area, 0);
  const activeWaqfs = nationalRegistry.filter(item => item.currentStatus === 'active').length;
  const disputedWaqfs = nationalRegistry.filter(item => item.currentStatus === 'disputed').length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="heading-1 text-islamic-800">المفتاح الوطني للأوقاف الفلسطينية</h1>
          <p className="body-text text-sage-600 mt-2">السجل الوطني الشامل لجميع الأوقاف الإسلامية في فلسطين</p>
        </div>
        <div className="flex items-center space-x-4 space-x-reverse">
          <button className="btn-secondary">
            <Download className="w-5 h-5 ml-2" />
            تصدير السجل
          </button>
          <button 
            onClick={() => setShowModal(true)}
            className="btn-primary"
          >
            <Plus className="w-5 h-5 ml-2" />
            تسجيل وقف جديد
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card-islamic">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-sage-600 font-body">إجمالي الأوقاف</p>
              <p className="text-3xl font-bold text-islamic-700 font-display">{nationalRegistry.length}</p>
            </div>
            <Key className="w-8 h-8 text-islamic-500" />
          </div>
        </div>
        
        <div className="card-golden">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-sage-600 font-body">القيمة الإجمالية</p>
              <p className="text-2xl font-bold text-golden-700 font-display">{(totalValue / 1000000).toFixed(0)}M ₪</p>
            </div>
            <Award className="w-8 h-8 text-golden-500" />
          </div>
        </div>
        
        <div className="card-sage">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-sage-600 font-body">المساحة الإجمالية</p>
              <p className="text-2xl font-bold text-sage-700 font-display">{(totalArea / 1000).toFixed(0)}K م²</p>
            </div>
            <MapPin className="w-8 h-8 text-sage-500" />
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-sage-600 font-body">أوقاف نشطة</p>
              <p className="text-3xl font-bold text-gray-700 font-display">{activeWaqfs}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-gray-500" />
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl shadow-elegant p-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
          <div className="relative">
            <Search className="absolute right-3 top-3 h-5 w-5 text-sage-400" />
            <input
              type="text"
              placeholder="البحث في السجل الوطني..."
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
            {waqfTypes.map(type => (
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
          
          <div className="flex items-center space-x-2 space-x-reverse">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-islamic-600 text-white' : 'bg-gray-200 text-gray-600'}`}
            >
              <Building className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-islamic-600 text-white' : 'bg-gray-200 text-gray-600'}`}
            >
              <FileText className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`p-2 rounded-lg ${viewMode === 'map' ? 'bg-islamic-600 text-white' : 'bg-gray-200 text-gray-600'}`}
            >
              <MapPin className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Registry Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentItems.map((item, index) => {
            const TypeIcon = getTypeIcon(item.waqfType);
            return (
              <div key={item.id} className={`card-islamic hover-lift animate-fade-in-up`} style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <div className="w-12 h-12 islamic-gradient rounded-xl flex items-center justify-center">
                      <TypeIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-islamic-800 font-display line-clamp-1">{item.name}</h3>
                      <p className="text-sm text-sage-600 font-body">{item.registryNumber}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 space-x-reverse">
                    {getStatusIcon(item.currentStatus)}
                  </div>
                </div>
                
                <p className="text-sage-600 text-sm mb-4 font-body line-clamp-2">{item.description}</p>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 space-x-reverse text-sm">
                    <MapPin className="w-4 h-4 text-sage-400" />
                    <span className="text-sage-600 font-body">{item.city}, {governorateOptions.find(g => g.id === item.governorate)?.name}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Target className="w-4 h-4 text-sage-400" />
                      <span className="text-sage-600 font-body">{item.area.toLocaleString()} م²</span>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Award className="w-4 h-4 text-sage-400" />
                      <span className="text-sage-600 font-body">{(item.estimatedValue / 1000000).toFixed(1)}M ₪</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse text-sm">
                    <User className="w-4 h-4 text-sage-400" />
                    <span className="text-sage-600 font-body">{item.currentManager}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-sage-200 mt-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(item.currentStatus)}`}>
                    {statusOptions.find(s => s.id === item.currentStatus)?.name}
                  </span>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <button 
                      onClick={() => {
                        setSelectedRegistry(item);
                        setShowDetailsModal(true);
                      }}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="text-green-600 hover:text-green-700">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="text-purple-600 hover:text-purple-700">
                      <MapPin className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : viewMode === 'list' ? (
        <div className="bg-white rounded-2xl shadow-elegant overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-islamic-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-islamic-700 uppercase tracking-wider font-body">
                    الوقف
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-islamic-700 uppercase tracking-wider font-body">
                    النوع
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-islamic-700 uppercase tracking-wider font-body">
                    الموقع
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-islamic-700 uppercase tracking-wider font-body">
                    المساحة
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-islamic-700 uppercase tracking-wider font-body">
                    القيمة
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
                {currentItems.map((item) => {
                  const TypeIcon = getTypeIcon(item.waqfType);
                  return (
                    <tr key={item.id} className="hover:bg-islamic-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <div className="w-10 h-10 islamic-gradient rounded-lg flex items-center justify-center">
                            <TypeIcon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-islamic-800 font-body">{item.name}</div>
                            <div className="text-sm text-sage-600 font-body">{item.registryNumber}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                          {waqfTypes.find(t => t.id === item.waqfType)?.name}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-islamic-800 font-body">{item.city}</div>
                        <div className="text-sm text-sage-600 font-body">{governorateOptions.find(g => g.id === item.governorate)?.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-islamic-800 font-body">
                        {item.area.toLocaleString()} م²
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-islamic-800 font-body">
                        {(item.estimatedValue / 1000000).toFixed(1)}M ₪
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          {getStatusIcon(item.currentStatus)}
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(item.currentStatus)}`}>
                            {statusOptions.find(s => s.id === item.currentStatus)?.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <button 
                            onClick={() => {
                              setSelectedRegistry(item);
                              setShowDetailsModal(true);
                            }}
                            className="text-blue-600 hover:text-blue-700"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="text-green-600 hover:text-green-700">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="text-purple-600 hover:text-purple-700">
                            <MapPin className="w-4 h-4" />
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
        // Map View
        <div className="bg-white rounded-2xl shadow-elegant p-8">
          <h3 className="text-lg font-semibold text-islamic-800 mb-6 font-display">خريطة الأوقاف الفلسطينية</h3>
          <div className="bg-gradient-to-br from-islamic-100 to-golden-100 rounded-xl p-12 text-center">
            <MapPin className="w-24 h-24 text-islamic-600 mx-auto mb-6" />
            <h4 className="text-2xl font-semibold text-islamic-800 mb-4 font-display">خريطة تفاعلية</h4>
            <p className="text-sage-700 mb-6 font-body">عرض جميع الأوقاف على الخريطة مع إمكانية التفاعل والتصفية</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {nationalRegistry.slice(0, 3).map((item) => {
                const TypeIcon = getTypeIcon(item.waqfType);
                return (
                  <div key={item.id} className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex items-center space-x-2 space-x-reverse mb-2">
                      <TypeIcon className={`w-5 h-5 ${getTypeColor(item.waqfType)}`} />
                      <span className="font-medium text-islamic-800 font-body">{item.name}</span>
                    </div>
                    <p className="text-sm text-sage-600 font-body">{item.city}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center">
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

      {/* Registry Details Modal */}
      {showDetailsModal && selectedRegistry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="heading-2 text-islamic-800">تفاصيل السجل الوطني</h2>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-sage-500 hover:text-sage-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-islamic-50 p-6 rounded-xl">
                  <h3 className="font-semibold text-islamic-800 mb-4 font-display">المعلومات الأساسية</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-sage-500 font-body">المفتاح الوطني</p>
                      <p className="font-medium font-body">{selectedRegistry.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-sage-500 font-body">رقم السجل</p>
                      <p className="font-medium font-body">{selectedRegistry.registryNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-sage-500 font-body">النوع</p>
                      <p className="font-medium font-body">{waqfTypes.find(t => t.id === selectedRegistry.waqfType)?.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-sage-500 font-body">المحافظة</p>
                      <p className="font-medium font-body">{governorateOptions.find(g => g.id === selectedRegistry.governorate)?.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-sage-500 font-body">المساحة</p>
                      <p className="font-medium font-body">{selectedRegistry.area.toLocaleString()} م²</p>
                    </div>
                    <div>
                      <p className="text-sm text-sage-500 font-body">القيمة التقديرية</p>
                      <p className="font-medium font-body">{selectedRegistry.estimatedValue.toLocaleString()} ₪</p>
                    </div>
                  </div>
                </div>

                <div className="bg-golden-50 p-6 rounded-xl">
                  <h3 className="font-semibold text-golden-800 mb-4 font-display">المعلومات التاريخية</h3>
                  <div className="space-y-2">
                    <p><span className="text-sage-500 font-body">تاريخ التأسيس:</span> {new Date(selectedRegistry.establishmentDate).toLocaleDateString('ar-EG')}</p>
                    <p><span className="text-sage-500 font-body">الفترة التاريخية:</span> {selectedRegistry.historicalPeriod}</p>
                    <p><span className="text-sage-500 font-body">المؤسس:</span> {selectedRegistry.founder}</p>
                  </div>
                </div>

                <div className="bg-sage-50 p-6 rounded-xl">
                  <h3 className="font-semibold text-sage-800 mb-4 font-display">الوصف التفصيلي</h3>
                  <p className="text-sage-700 font-body leading-relaxed">{selectedRegistry.description}</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-xl">
                  <h3 className="font-semibold text-blue-800 mb-4 font-display">الحالة والإدارة</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sage-600 font-body">الحالة الحالية:</span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(selectedRegistry.currentStatus)}`}>
                        {statusOptions.find(s => s.id === selectedRegistry.currentStatus)?.name}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sage-600 font-body">المدير الحالي:</span>
                      <span className="font-medium font-body">{selectedRegistry.currentManager}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sage-600 font-body">نوع الإدارة:</span>
                      <span className="font-medium font-body">{selectedRegistry.managementType}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 p-6 rounded-xl">
                  <h3 className="font-semibold text-purple-800 mb-4 font-display">المعلومات المالية</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sage-600 font-body">الإيرادات الشهرية:</span>
                      <span className="font-medium text-green-600 font-body">+{selectedRegistry.monthlyIncome.toLocaleString()} ₪</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sage-600 font-body">المصروفات الشهرية:</span>
                      <span className="font-medium text-red-600 font-body">-{selectedRegistry.monthlyExpenses.toLocaleString()} ₪</span>
                    </div>
                    <div className="flex items-center justify-between border-t pt-2">
                      <span className="text-sage-600 font-medium font-body">صافي الدخل:</span>
                      <span className={`font-bold font-display ${(selectedRegistry.monthlyIncome - selectedRegistry.monthlyExpenses) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {(selectedRegistry.monthlyIncome - selectedRegistry.monthlyExpenses).toLocaleString()} ₪
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 p-6 rounded-xl">
                  <h3 className="font-semibold text-orange-800 mb-4 font-display">الوثائق والمستندات</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sage-600 font-body">الوثائق العامة:</span>
                      <span className="font-medium font-body">{selectedRegistry.documentsCount}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sage-600 font-body">الوثائق القانونية:</span>
                      <span className="font-medium font-body">{selectedRegistry.legalDocumentsCount}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sage-600 font-body">آخر تفتيش:</span>
                      <span className="font-medium font-body">{new Date(selectedRegistry.lastInspection).toLocaleDateString('ar-EG')}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <button className="w-full btn-primary">
                    <Edit className="w-5 h-5 ml-2" />
                    تعديل السجل
                  </button>
                  <button className="w-full btn-secondary">
                    <Download className="w-5 h-5 ml-2" />
                    تحميل التقرير
                  </button>
                  <button className="w-full btn-outline">
                    <MapPin className="w-5 h-5 ml-2" />
                    عرض على الخريطة
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Registry Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="heading-2 text-islamic-800">تسجيل وقف جديد في السجل الوطني</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-sage-500 hover:text-sage-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">اسم الوقف</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="أدخل اسم الوقف"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">نوع الوقف</label>
                  <select className="form-select">
                    {waqfTypes.slice(1).map(type => (
                      <option key={type.id} value={type.id}>{type.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">الوصف</label>
                <textarea
                  rows={3}
                  className="form-textarea"
                  placeholder="أدخل وصف مفصل للوقف"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">المحافظة</label>
                  <select className="form-select">
                    {governorateOptions.slice(1).map(option => (
                      <option key={option.id} value={option.id}>{option.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">المدينة</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="اسم المدينة"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">المنطقة</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="اسم المنطقة"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">المساحة (م²)</label>
                  <input
                    type="number"
                    className="form-input"
                    placeholder="المساحة بالمتر المربع"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">القيمة التقديرية (₪)</label>
                  <input
                    type="number"
                    className="form-input"
                    placeholder="القيمة بالشيكل"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">المدير المسؤول</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="اسم المدير المسؤول"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">نوع الإدارة</label>
                  <select className="form-select">
                    <option value="ministry_direct">إدارة مباشرة من الوزارة</option>
                    <option value="local_committee">لجنة محلية</option>
                    <option value="private_manager">مدير خاص</option>
                    <option value="community_managed">إدارة مجتمعية</option>
                    <option value="family_managed">إدارة عائلية</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end space-x-4 space-x-reverse pt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn-outline"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                >
                  <Save className="w-5 h-5 ml-2" />
                  حفظ في السجل الوطني
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NationalWaqfRegistry;