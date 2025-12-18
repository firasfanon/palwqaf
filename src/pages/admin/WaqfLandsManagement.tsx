import React, { useState, useMemo } from 'react';
import {
  Plus,
  Search,
  Filter,
  Edit,
  Eye,
  Trash2,
  MapPin,
  FileText,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Building,
  Users,
  Calendar,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Map,
  Download,
  Upload,
  MoreVertical,
  RefreshCw
} from 'lucide-react';
import { useWaqfLands } from '../../hooks/useDatabase';
import { useToast } from '../../hooks/useToast';

interface WaqfLandForm {
  name: string;
  description: string;
  area: number;
  type: string;
  status: string;
  estimated_value: number;
  monthly_income: number;
  monthly_expenses: number;
  manager_name: string;
  address: string;
  city: string;
  governorate: string;
  latitude: number;
  longitude: number;
}

const WaqfLandsManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCity, setSelectedCity] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedLand, setSelectedLand] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState<WaqfLandForm>({
    name: '',
    description: '',
    area: 0,
    type: 'mosque',
    status: 'active',
    estimated_value: 0,
    monthly_income: 0,
    monthly_expenses: 0,
    manager_name: '',
    address: '',
    city: 'القدس',
    governorate: 'القدس',
    latitude: 31.7767,
    longitude: 35.2345
  });

  const { data: waqfLands, loading, error, refetch, create, update, remove } = useWaqfLands();
  const { success, error: showError, info } = useToast();

  // بيانات تجريبية للأراضي الوقفية (احتياطية في حال فشل التحميل)
  const fallbackWaqfLands = [
    {
      id: 1,
      name: 'أرض المسجد الكبير',
      description: 'أرض وقفية تحتوي على المسجد الكبير والمرافق التابعة له',
      area: 2500,
      location: {
        address: 'شارع الجامعة، البلدة القديمة',
        city: 'القدس',
        district: 'القدس',
        lat: 31.7767,
        lng: 35.2345
      },
      type: 'mosque',
      status: 'active',
      value: 2500000,
      monthlyIncome: 15000,
      monthlyExpenses: 8000,
      manager: 'أحمد محمد الأحمد',
      documentsCount: 12,
      casesCount: 2,
      createdAt: '2020-01-15',
      lastUpdate: '2024-01-10'
    },
    {
      id: 2,
      name: 'وقف الزيتون التجاري',
      description: 'مجمع تجاري وقفي يحتوي على محلات ومكاتب للإيجار',
      area: 1800,
      location: {
        address: 'شارع عمر بن الخطاب',
        city: 'رام الله',
        district: 'رام الله والبيرة',
        lat: 31.9038,
        lng: 35.2034
      },
      type: 'commercial',
      status: 'active',
      value: 3200000,
      monthlyIncome: 28000,
      monthlyExpenses: 12000,
      manager: 'فاطمة خالد يوسف',
      documentsCount: 18,
      casesCount: 1,
      createdAt: '2019-03-22',
      lastUpdate: '2024-01-12'
    },
    {
      id: 3,
      name: 'مقبرة الشهداء',
      description: 'مقبرة إسلامية وقفية لدفن الموتى من أبناء المنطقة',
      area: 5000,
      location: {
        address: 'طريق نابلس الرئيسي',
        city: 'نابلس',
        district: 'نابلس',
        lat: 32.2211,
        lng: 35.2544
      },
      type: 'cemetery',
      status: 'active',
      value: 800000,
      monthlyIncome: 2000,
      monthlyExpenses: 3000,
      manager: 'محمد علي حسن',
      documentsCount: 8,
      casesCount: 0,
      createdAt: '2018-07-10',
      lastUpdate: '2024-01-08'
    },
    {
      id: 4,
      name: 'مدرسة الأوقاف الابتدائية',
      description: 'مدرسة ابتدائية وقفية تخدم أطفال المنطقة',
      area: 3200,
      location: {
        address: 'حي الزيتون',
        city: 'غزة',
        district: 'غزة',
        lat: 31.5017,
        lng: 34.4668
      },
      type: 'school',
      status: 'under_review',
      value: 1500000,
      monthlyIncome: 5000,
      monthlyExpenses: 18000,
      manager: 'سارة أحمد محمود',
      documentsCount: 15,
      casesCount: 3,
      createdAt: '2021-09-05',
      lastUpdate: '2024-01-14'
    },
    {
      id: 5,
      name: 'أراضي زراعية - وادي النار',
      description: 'أراضي زراعية وقفية مزروعة بأشجار الزيتون والحمضيات',
      area: 12000,
      location: {
        address: 'وادي النار',
        city: 'الخليل',
        district: 'الخليل',
        lat: 31.5326,
        lng: 35.0998
      },
      type: 'agricultural',
      status: 'disputed',
      value: 2800000,
      monthlyIncome: 8000,
      monthlyExpenses: 5000,
      manager: 'خالد يوسف إبراهيم',
      documentsCount: 22,
      casesCount: 5,
      createdAt: '2017-11-20',
      lastUpdate: '2024-01-09'
    },
    {
      id: 6,
      name: 'مجمع سكني وقفي',
      description: 'مجمع سكني وقفي يحتوي على شقق للإيجار للأسر المحتاجة',
      area: 4500,
      location: {
        address: 'شارع الشهداء',
        city: 'جنين',
        district: 'جنين',
        lat: 32.4614,
        lng: 35.3007
      },
      type: 'residential',
      status: 'active',
      value: 1800000,
      monthlyIncome: 12000,
      monthlyExpenses: 9000,
      manager: 'نور الدين محمد',
      documentsCount: 10,
      casesCount: 1,
      createdAt: '2020-05-18',
      lastUpdate: '2024-01-11'
    }
  ];

  const typeOptions = [
    { value: 'all', label: 'جميع الأنواع', icon: Building },
    { value: 'mosque', label: 'مساجد', icon: Building },
    { value: 'cemetery', label: 'مقابر', icon: MapPin },
    { value: 'school', label: 'مدارس', icon: Building },
    { value: 'commercial', label: 'تجاري', icon: Building },
    { value: 'residential', label: 'سكني', icon: Building },
    { value: 'agricultural', label: 'زراعي', icon: Building }
  ];

  const statusOptions = [
    { value: 'all', label: 'جميع الحالات' },
    { value: 'active', label: 'نشط' },
    { value: 'disputed', label: 'متنازع عليه' },
    { value: 'under_review', label: 'قيد المراجعة' },
    { value: 'inactive', label: 'غير نشط' }
  ];

  const cityOptions = [
    { value: 'all', label: 'جميع المدن' },
    { value: 'القدس', label: 'القدس' },
    { value: 'رام الله', label: 'رام الله' },
    { value: 'نابلس', label: 'نابلس' },
    { value: 'غزة', label: 'غزة' },
    { value: 'الخليل', label: 'الخليل' },
    { value: 'جنين', label: 'جنين' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'disputed':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'under_review':
        return <XCircle className="w-4 h-4 text-yellow-500" />;
      case 'inactive':
        return <XCircle className="w-4 h-4 text-gray-500" />;
      default:
        return <CheckCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'disputed':
        return 'bg-red-100 text-red-800';
      case 'under_review':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    const typeOption = typeOptions.find(t => t.value === type);
    return typeOption ? typeOption.icon : Building;
  };

  // استخدام البيانات الحقيقية أو الاحتياطية
  const displayedLands = useMemo(() => {
    return (waqfLands && waqfLands.length > 0) ? waqfLands : fallbackWaqfLands;
  }, [waqfLands]);

  const filteredLands = useMemo(() => {
    return displayedLands.filter(land => {
      const matchesSearch = land.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           land.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           land.address?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType === 'all' || land.type === selectedType;
      const matchesStatus = selectedStatus === 'all' || land.status === selectedStatus;
      const matchesCity = selectedCity === 'all' || land.city === selectedCity || land.location?.city === selectedCity;
      return matchesSearch && matchesType && matchesStatus && matchesCity;
    });
  }, [displayedLands, searchTerm, selectedType, selectedStatus, selectedCity]);

  // حساب الإحصائيات
  const totalValue = useMemo(() =>
    displayedLands.reduce((sum, land) => sum + (land.estimated_value || land.value || 0), 0),
    [displayedLands]
  );
  const totalIncome = useMemo(() =>
    displayedLands.reduce((sum, land) => sum + (land.monthly_income || land.monthlyIncome || 0), 0),
    [displayedLands]
  );
  const totalExpenses = useMemo(() =>
    displayedLands.reduce((sum, land) => sum + (land.monthly_expenses || land.monthlyExpenses || 0), 0),
    [displayedLands]
  );
  const netIncome = totalIncome - totalExpenses;

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditMode && selectedLand) {
        await update(selectedLand.id, formData);
        success('تم تحديث الأرض الوقفية بنجاح', 'تم حفظ التغييرات');
      } else {
        await create(formData);
        success('تم إضافة الأرض الوقفية بنجاح', 'تمت الإضافة بنجاح');
      }
      setShowModal(false);
      resetForm();
      await refetch();
    } catch (err) {
      showError('حدث خطأ', err instanceof Error ? err.message : 'تعذرت العملية');
    }
  };

  // Handle delete
  const handleDelete = async (id: number) => {
    if (window.confirm('هل أنت متأكد من حذف هذه الأرض الوقفية؟')) {
      try {
        await remove(id);
        success('تم الحذف بنجاح', 'تم حذف الأرض الوقفية');
        await refetch();
      } catch (err) {
        showError('حدث خطأ', 'تعذر حذف الأرض الوقفية');
      }
    }
  };

  // Handle edit
  const handleEdit = (land: any) => {
    setIsEditMode(true);
    setSelectedLand(land);
    setFormData({
      name: land.name || '',
      description: land.description || '',
      area: land.area || 0,
      type: land.type || 'mosque',
      status: land.status || 'active',
      estimated_value: land.estimated_value || land.value || 0,
      monthly_income: land.monthly_income || land.monthlyIncome || 0,
      monthly_expenses: land.monthly_expenses || land.monthlyExpenses || 0,
      manager_name: land.manager_name || land.manager || '',
      address: land.address || land.location?.address || '',
      city: land.city || land.location?.city || 'القدس',
      governorate: land.governorate || land.location?.district || 'القدس',
      latitude: land.latitude || land.location?.lat || 31.7767,
      longitude: land.longitude || land.location?.lng || 35.2345
    });
    setShowModal(true);
  };

  // Reset form
  const resetForm = () => {
    setIsEditMode(false);
    setSelectedLand(null);
    setFormData({
      name: '',
      description: '',
      area: 0,
      type: 'mosque',
      status: 'active',
      estimated_value: 0,
      monthly_income: 0,
      monthly_expenses: 0,
      manager_name: '',
      address: '',
      city: 'القدس',
      governorate: 'القدس',
      latitude: 31.7767,
      longitude: 35.2345
    });
  };

  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: ['area', 'estimated_value', 'monthly_income', 'monthly_expenses', 'latitude', 'longitude'].includes(name)
        ? parseFloat(value) || 0
        : value
    }));
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">إدارة الأراضي الوقفية</h1>
          <p className="text-gray-600 mt-1">إدارة ومتابعة جميع الأراضي والممتلكات الوقفية</p>
          {loading && <p className="text-sm text-blue-600 mt-1">جاري تحميل البيانات...</p>}
          {error && <p className="text-sm text-red-600 mt-1">خطأ: {error}</p>}
        </div>
        <div className="flex items-center space-x-4 space-x-reverse">
          <button
            onClick={() => refetch()}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center"
            disabled={loading}
          >
            <RefreshCw className={`w-5 h-5 ml-2 ${loading ? 'animate-spin' : ''}`} />
            تحديث
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
            <Download className="w-5 h-5 ml-2" />
            تصدير البيانات
          </button>
          <button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
          >
            <Plus className="w-5 h-5 ml-2" />
            إضافة أرض وقفية
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 border-r-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">إجمالي الأراضي</p>
              <p className="text-3xl font-bold text-gray-800">{waqfLands.length}</p>
            </div>
            <Building className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border-r-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">القيمة الإجمالية</p>
              <p className="text-2xl font-bold text-gray-800">{totalValue.toLocaleString()} ₪</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border-r-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">الإيرادات الشهرية</p>
              <p className="text-2xl font-bold text-gray-800">{totalIncome.toLocaleString()} ₪</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border-r-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">صافي الدخل</p>
              <p className={`text-2xl font-bold ${netIncome >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {netIncome.toLocaleString()} ₪
              </p>
            </div>
            {netIncome >= 0 ? 
              <TrendingUp className="w-8 h-8 text-green-500" /> : 
              <TrendingDown className="w-8 h-8 text-red-500" />
            }
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
          <div className="relative">
            <Search className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="البحث في الأراضي..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10 pl-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {typeOptions.map(option => (
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
          
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {cityOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          
          <div className="flex items-center space-x-2 space-x-reverse">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'}`}
            >
              <Building className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'}`}
            >
              <FileText className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Lands Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLands.map((land) => {
            const TypeIcon = getTypeIcon(land.type);
            return (
              <div key={land.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <TypeIcon className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{land.name}</h3>
                        <p className="text-sm text-gray-500">{land.location.city}</p>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <p className="text-gray-600 mb-4 text-sm line-clamp-2">{land.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">المساحة:</span>
                      <span className="font-medium">{land.area.toLocaleString()} م²</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">القيمة:</span>
                      <span className="font-medium">{land.value.toLocaleString()} ₪</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">الدخل الشهري:</span>
                      <span className="font-medium text-green-600">+{land.monthlyIncome.toLocaleString()} ₪</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      {getStatusIcon(land.status)}
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(land.status)}`}>
                        {statusOptions.find(s => s.value === land.status)?.label}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-500">
                      <FileText className="w-4 h-4" />
                      <span>{land.documentsCount}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <button
                      onClick={() => setSelectedLand(land)}
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                    >
                      عرض التفاصيل
                    </button>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <button
                        onClick={() => handleEdit(land)}
                        className="text-green-600 hover:text-green-700"
                        title="تعديل"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-purple-600 hover:text-purple-700" title="عرض على الخريطة">
                        <Map className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(land.id)}
                        className="text-red-600 hover:text-red-700"
                        title="حذف"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الأرض الوقفية
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    النوع
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    المساحة
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الموقع
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الحالة
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الدخل الشهري
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الإجراءات
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLands.map((land) => {
                  const TypeIcon = getTypeIcon(land.type);
                  return (
                    <tr key={land.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                            <TypeIcon className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{land.name}</div>
                            <div className="text-sm text-gray-500">{land.manager}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                          {typeOptions.find(t => t.value === land.type)?.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {land.area.toLocaleString()} م²
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{land.location.city}</div>
                        <div className="text-sm text-gray-500">{land.location.address}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          {getStatusIcon(land.status)}
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(land.status)}`}>
                            {statusOptions.find(s => s.value === land.status)?.label}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-green-600">
                          +{land.monthlyIncome.toLocaleString()} ₪
                        </div>
                        <div className="text-sm text-red-600">
                          -{land.monthlyExpenses.toLocaleString()} ₪
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <button
                            onClick={() => setSelectedLand(land)}
                            className="text-blue-600 hover:text-blue-700"
                            title="عرض التفاصيل"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEdit(land)}
                            className="text-green-600 hover:text-green-700"
                            title="تعديل"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            className="text-purple-600 hover:text-purple-700"
                            title="عرض على الخريطة"
                          >
                            <Map className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(land.id)}
                            className="text-red-600 hover:text-red-700"
                            title="حذف"
                          >
                            <Trash2 className="w-4 h-4" />
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
      )}

      {/* Land Details Modal */}
      {selectedLand && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">تفاصيل الأرض الوقفية</h2>
              <button
                onClick={() => setSelectedLand(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* المعلومات الأساسية */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-4">المعلومات الأساسية</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">اسم الأرض</p>
                      <p className="font-medium">{selectedLand.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">النوع</p>
                      <p className="font-medium">{typeOptions.find(t => t.value === selectedLand.type)?.label}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">المساحة</p>
                      <p className="font-medium">{selectedLand.area.toLocaleString()} م²</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">القيمة التقديرية</p>
                      <p className="font-medium">{selectedLand.value.toLocaleString()} ₪</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">المدير المسؤول</p>
                      <p className="font-medium">{selectedLand.manager}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">تاريخ التسجيل</p>
                      <p className="font-medium">{new Date(selectedLand.createdAt).toLocaleDateString('ar-EG')}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-4">معلومات الموقع</h3>
                  <div className="space-y-2">
                    <p><span className="text-gray-500">العنوان:</span> {selectedLand.location.address}</p>
                    <p><span className="text-gray-500">المدينة:</span> {selectedLand.location.city}</p>
                    <p><span className="text-gray-500">المحافظة:</span> {selectedLand.location.district}</p>
                    <p><span className="text-gray-500">الإحداثيات:</span> {selectedLand.location.lat}, {selectedLand.location.lng}</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-4">الوصف</h3>
                  <p className="text-gray-700">{selectedLand.description}</p>
                </div>
              </div>

              {/* الإحصائيات والإجراءات */}
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-4">الإحصائيات المالية</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">الإيرادات الشهرية</span>
                      <span className="font-medium text-green-600">+{selectedLand.monthlyIncome.toLocaleString()} ₪</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">المصروفات الشهرية</span>
                      <span className="font-medium text-red-600">-{selectedLand.monthlyExpenses.toLocaleString()} ₪</span>
                    </div>
                    <div className="flex items-center justify-between border-t pt-2">
                      <span className="text-gray-600 font-medium">صافي الدخل</span>
                      <span className={`font-bold ${(selectedLand.monthlyIncome - selectedLand.monthlyExpenses) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {(selectedLand.monthlyIncome - selectedLand.monthlyExpenses).toLocaleString()} ₪
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-4">الحالة والوثائق</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">الحالة</span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(selectedLand.status)}`}>
                        {statusOptions.find(s => s.value === selectedLand.status)?.label}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">عدد الوثائق</span>
                      <span className="font-medium">{selectedLand.documentsCount}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">القضايا المرتبطة</span>
                      <span className="font-medium">{selectedLand.casesCount}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    عرض على الخريطة
                  </button>
                  <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                    عرض الوثائق
                  </button>
                  <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
                    عرض القضايا
                  </button>
                  <button className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition-colors">
                    تحرير البيانات
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Land Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                {isEditMode ? 'تعديل الأرض الوقفية' : 'إضافة أرض وقفية جديدة'}
              </h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">اسم الأرض الوقفية</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="أدخل اسم الأرض"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">نوع الأرض</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                    {typeOptions.slice(1).map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الوصف</label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="أدخل وصف مفصل للأرض الوقفية"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">المساحة (م²)</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="المساحة بالمتر المربع"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">القيمة التقديرية (₪)</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="القيمة بالشيكل"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الحالة</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                    {statusOptions.slice(1).map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">المدينة</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                    {cityOptions.slice(1).map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">العنوان التفصيلي</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="الشارع والحي"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">خط العرض</label>
                  <input
                    type="number"
                    step="any"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="31.7767"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">خط الطول</label>
                  <input
                    type="number"
                    step="any"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="35.2345"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الإيرادات الشهرية (₪)</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="0"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">المصروفات الشهرية (₪)</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="0"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">المدير المسؤول</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="اسم المدير"
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-4 space-x-reverse pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  حفظ الأرض الوقفية
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default WaqfLandsManagement;