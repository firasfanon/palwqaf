import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Eye, 
  Trash2, 
  Clock, 
  User, 
  AlertCircle,
  CheckCircle,
  XCircle,
  Calendar,
  FileText,
  MapPin
} from 'lucide-react';

const CasesManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedCase, setSelectedCase] = useState<any>(null);

  // بيانات تجريبية للقضايا
  const cases = [
    {
      id: 1,
      title: 'نزاع حدود أرض المسجد الكبير',
      description: 'نزاع حول الحدود الشرقية لأرض المسجد الكبير مع الأراضي المجاورة',
      type: 'boundary',
      status: 'in_progress',
      priority: 'high',
      waqfLandId: 1,
      waqfLandName: 'أرض المسجد الكبير',
      assignedTo: 'أحمد محمد',
      createdBy: 'محمد علي',
      dueDate: '2024-02-15',
      createdAt: '2024-01-10',
      documentsCount: 5,
      timelineCount: 8
    },
    {
      id: 2,
      title: 'مراجعة إيرادات وقف الزيتون',
      description: 'مراجعة شاملة لإيرادات ومصروفات وقف الزيتون للربع الأخير',
      type: 'income',
      status: 'open',
      priority: 'medium',
      waqfLandId: 2,
      waqfLandName: 'وقف الزيتون',
      assignedTo: 'فاطمة أحمد',
      createdBy: 'سارة خالد',
      dueDate: '2024-01-30',
      createdAt: '2024-01-12',
      documentsCount: 12,
      timelineCount: 3
    },
    {
      id: 3,
      title: 'صيانة طارئة لمسجد الرحمة',
      description: 'إصلاح تسريب في سقف مسجد الرحمة وتجديد نظام الإضاءة',
      type: 'maintenance',
      status: 'resolved',
      priority: 'urgent',
      waqfLandId: 3,
      waqfLandName: 'مسجد الرحمة',
      assignedTo: 'خالد يوسف',
      createdBy: 'أحمد محمد',
      dueDate: '2024-01-20',
      createdAt: '2024-01-08',
      documentsCount: 8,
      timelineCount: 15
    },
    {
      id: 4,
      title: 'تحديث سندات ملكية المقبرة الشرقية',
      description: 'تحديث وتجديد سندات ملكية المقبرة الشرقية وفقاً للقوانين الجديدة',
      type: 'ownership',
      status: 'pending',
      priority: 'high',
      waqfLandId: 4,
      waqfLandName: 'المقبرة الشرقية',
      assignedTo: 'نور الدين',
      createdBy: 'فاطمة أحمد',
      dueDate: '2024-02-28',
      createdAt: '2024-01-15',
      documentsCount: 3,
      timelineCount: 2
    }
  ];

  const statusOptions = [
    { value: 'all', label: 'جميع الحالات' },
    { value: 'open', label: 'مفتوحة' },
    { value: 'in_progress', label: 'قيد المعالجة' },
    { value: 'pending', label: 'معلقة' },
    { value: 'resolved', label: 'محلولة' },
    { value: 'closed', label: 'مغلقة' }
  ];

  const typeOptions = [
    { value: 'all', label: 'جميع الأنواع' },
    { value: 'ownership', label: 'ملكية' },
    { value: 'boundary', label: 'حدود' },
    { value: 'income', label: 'إيرادات' },
    { value: 'maintenance', label: 'صيانة' },
    { value: 'legal', label: 'قانونية' },
    { value: 'administrative', label: 'إدارية' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
        return <Clock className="w-4 h-4 text-blue-500" />;
      case 'in_progress':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'pending':
        return <XCircle className="w-4 h-4 text-orange-500" />;
      case 'resolved':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'closed':
        return <XCircle className="w-4 h-4 text-gray-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-blue-100 text-blue-800';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
        return 'bg-orange-100 text-orange-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'urgent':
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

  const filteredCases = cases.filter(caseItem => {
    const matchesSearch = caseItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         caseItem.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || caseItem.status === selectedStatus;
    const matchesType = selectedType === 'all' || caseItem.type === selectedType;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">إدارة القضايا</h1>
          <p className="text-gray-600 mt-1">إدارة ومتابعة جميع القضايا المتعلقة بالأراضي الوقفية</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
        >
          <Plus className="w-5 h-5 ml-2" />
          إضافة قضية جديدة
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="البحث في القضايا..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10 pl-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          
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
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {typeOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          
          <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-5 h-5 ml-2" />
            فلاتر متقدمة
          </button>
        </div>
      </div>

      {/* Cases List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  القضية
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  النوع
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الحالة
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الأولوية
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  المسؤول
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الموعد النهائي
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCases.map((caseItem) => (
                <tr key={caseItem.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{caseItem.title}</div>
                      <div className="text-sm text-gray-500">{caseItem.description.slice(0, 60)}...</div>
                      <div className="flex items-center mt-1 text-xs text-gray-400">
                        <MapPin className="w-3 h-3 ml-1" />
                        <span>{caseItem.waqfLandName}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                      {typeOptions.find(t => t.value === caseItem.type)?.label}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(caseItem.status)}
                      <span className={`px-2 py-1 text-xs font-medium rounded-full mr-2 ${getStatusBadge(caseItem.status)}`}>
                        {statusOptions.find(s => s.value === caseItem.status)?.label}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityBadge(caseItem.priority)}`}>
                      {caseItem.priority === 'urgent' ? 'عاجل' : 
                       caseItem.priority === 'high' ? 'مهم' :
                       caseItem.priority === 'medium' ? 'متوسط' : 'منخفض'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <User className="w-4 h-4 text-gray-400 ml-2" />
                      <span className="text-sm text-gray-900">{caseItem.assignedTo}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 text-gray-400 ml-2" />
                      <span className="text-sm text-gray-900">
                        {new Date(caseItem.dueDate).toLocaleDateString('ar-EG')}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <button 
                        onClick={() => setSelectedCase(caseItem)}
                        className="text-blue-600 hover:text-blue-700"
                        title="عرض التفاصيل"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        className="text-green-600 hover:text-green-700"
                        title="تعديل"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        className="text-red-600 hover:text-red-700"
                        title="حذف"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Case Details Modal */}
      {selectedCase && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">تفاصيل القضية</h2>
              <button
                onClick={() => setSelectedCase(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">معلومات أساسية</h3>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <p><span className="font-medium">العنوان:</span> {selectedCase.title}</p>
                    <p><span className="font-medium">الوصف:</span> {selectedCase.description}</p>
                    <p><span className="font-medium">الأرض الوقفية:</span> {selectedCase.waqfLandName}</p>
                    <p><span className="font-medium">المسؤول:</span> {selectedCase.assignedTo}</p>
                    <p><span className="font-medium">تاريخ الإنشاء:</span> {new Date(selectedCase.createdAt).toLocaleDateString('ar-EG')}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">الحالة والأولوية</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span>الحالة:</span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(selectedCase.status)}`}>
                        {statusOptions.find(s => s.value === selectedCase.status)?.label}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>الأولوية:</span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityBadge(selectedCase.priority)}`}>
                        {selectedCase.priority === 'urgent' ? 'عاجل' : 
                         selectedCase.priority === 'high' ? 'مهم' :
                         selectedCase.priority === 'medium' ? 'متوسط' : 'منخفض'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">الإحصائيات</h3>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <span>عدد الوثائق:</span>
                      <span className="font-medium">{selectedCase.documentsCount}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>عدد التحديثات:</span>
                      <span className="font-medium">{selectedCase.timelineCount}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>الموعد النهائي:</span>
                      <span className="font-medium">{new Date(selectedCase.dueDate).toLocaleDateString('ar-EG')}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">إجراءات سريعة</h3>
                  <div className="space-y-2">
                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      عرض الوثائق
                    </button>
                    <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                      إضافة تحديث
                    </button>
                    <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
                      عرض على الخريطة
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Case Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">إضافة قضية جديدة</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">عنوان القضية</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="أدخل عنوان القضية"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الوصف</label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="أدخل وصف مفصل للقضية"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">نوع القضية</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                    {typeOptions.slice(1).map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الأولوية</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                    <option value="low">منخفضة</option>
                    <option value="medium">متوسطة</option>
                    <option value="high">مهمة</option>
                    <option value="urgent">عاجلة</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الأرض الوقفية</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                    <option value="">اختر الأرض الوقفية</option>
                    <option value="1">أرض المسجد الكبير</option>
                    <option value="2">وقف الزيتون</option>
                    <option value="3">مسجد الرحمة</option>
                    <option value="4">المقبرة الشرقية</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">المسؤول</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                    <option value="">اختر المسؤول</option>
                    <option value="1">أحمد محمد</option>
                    <option value="2">فاطمة أحمد</option>
                    <option value="3">خالد يوسف</option>
                    <option value="4">نور الدين</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الموعد النهائي</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
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
                  حفظ القضية
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CasesManagement;