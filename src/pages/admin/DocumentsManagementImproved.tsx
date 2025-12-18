import React, { useState } from 'react';
import {
  FileText,
  Plus,
  Download,
  Eye,
  Trash2,
  Upload,
  Filter,
  Archive,
  File,
  Folder,
  Image,
  FileSpreadsheet,
  FileCode
} from 'lucide-react';
import { PageHeader, DataTable, StatCard, FilterBar, Modal } from '../../components/admin';
import type { Column } from '../../components/admin/DataTable';
import type { FilterOption } from '../../components/admin/FilterBar';
import { useToast } from '../../hooks/useToast';

interface Document {
  id: number;
  name: string;
  type: string;
  category: string;
  size: number;
  uploadedBy: string;
  uploadDate: string;
  lastModified: string;
  downloads: number;
  status: 'active' | 'archived';
}

const DocumentsManagementImproved: React.FC = () => {
  const { success, error: showError } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);

  const [filters, setFilters] = useState({
    type: '',
    category: '',
    status: '',
    search: '',
    dateFrom: '',
    dateTo: ''
  });

  const mockDocuments: Document[] = [
    {
      id: 1,
      name: 'سند ملكية أرض وقف المسجد الكبير',
      type: 'pdf',
      category: 'سندات',
      size: 2.5,
      uploadedBy: 'أحمد محمد',
      uploadDate: '2024-01-15',
      lastModified: '2024-01-15',
      downloads: 45,
      status: 'active'
    },
    {
      id: 2,
      name: 'تقرير فحص أرض وقف الزيتون',
      type: 'pdf',
      category: 'تقارير',
      size: 1.8,
      uploadedBy: 'فاطمة خالد',
      uploadDate: '2024-01-14',
      lastModified: '2024-01-14',
      downloads: 23,
      status: 'active'
    },
    {
      id: 3,
      name: 'خريطة توضيحية لحدود الوقف',
      type: 'jpg',
      category: 'خرائط',
      size: 4.2,
      uploadedBy: 'محمد علي',
      uploadDate: '2024-01-13',
      lastModified: '2024-01-13',
      downloads: 67,
      status: 'active'
    },
    {
      id: 4,
      name: 'كشف حساب شهر يناير',
      type: 'xlsx',
      category: 'مالية',
      size: 0.8,
      uploadedBy: 'سارة أحمد',
      uploadDate: '2024-01-12',
      lastModified: '2024-01-14',
      downloads: 12,
      status: 'active'
    },
    {
      id: 5,
      name: 'قرار محكمة قضية رقم 245',
      type: 'pdf',
      category: 'قرارات قانونية',
      size: 1.2,
      uploadedBy: 'خالد يوسف',
      uploadDate: '2024-01-10',
      lastModified: '2024-01-10',
      downloads: 34,
      status: 'archived'
    }
  ];

  const filteredDocs = mockDocuments.filter(doc => {
    if (filters.type && doc.type !== filters.type) return false;
    if (filters.category && doc.category !== filters.category) return false;
    if (filters.status && doc.status !== filters.status) return false;
    if (filters.search) {
      const search = filters.search.toLowerCase();
      return (
        doc.name.toLowerCase().includes(search) ||
        doc.uploadedBy.toLowerCase().includes(search)
      );
    }
    return true;
  });

  const filterOptions: FilterOption[] = [
    {
      id: 'type',
      label: 'نوع الملف',
      type: 'select',
      value: filters.type,
      onChange: (value) => setFilters(prev => ({ ...prev, type: value })),
      options: [
        { value: 'pdf', label: 'PDF' },
        { value: 'jpg', label: 'صورة' },
        { value: 'xlsx', label: 'Excel' },
        { value: 'docx', label: 'Word' }
      ]
    },
    {
      id: 'category',
      label: 'التصنيف',
      type: 'select',
      value: filters.category,
      onChange: (value) => setFilters(prev => ({ ...prev, category: value })),
      options: [
        { value: 'سندات', label: 'سندات' },
        { value: 'تقارير', label: 'تقارير' },
        { value: 'خرائط', label: 'خرائط' },
        { value: 'مالية', label: 'مالية' },
        { value: 'قرارات قانونية', label: 'قرارات قانونية' }
      ]
    },
    {
      id: 'status',
      label: 'الحالة',
      type: 'select',
      value: filters.status,
      onChange: (value) => setFilters(prev => ({ ...prev, status: value })),
      options: [
        { value: 'active', label: 'نشط' },
        { value: 'archived', label: 'مؤرشف' }
      ]
    },
    {
      id: 'search',
      label: 'بحث',
      type: 'search',
      value: filters.search,
      onChange: (value) => setFilters(prev => ({ ...prev, search: value })),
      placeholder: 'البحث بالاسم أو المستخدم...'
    }
  ];

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return <File className="w-5 h-5 text-red-500" />;
      case 'jpg':
      case 'jpeg':
      case 'png':
        return <Image className="w-5 h-5 text-blue-500" />;
      case 'xlsx':
      case 'xls':
        return <FileSpreadsheet className="w-5 h-5 text-green-500" />;
      case 'docx':
      case 'doc':
        return <FileText className="w-5 h-5 text-blue-600" />;
      default:
        return <FileCode className="w-5 h-5 text-gray-500" />;
    }
  };

  const formatSize = (size: number) => {
    return `${size.toFixed(1)} MB`;
  };

  const columns: Column<Document>[] = [
    {
      key: 'name',
      title: 'اسم الملف',
      sortable: true,
      render: (doc) => (
        <div className="flex items-center space-x-3 space-x-reverse">
          <div className="w-10 h-10 bg-islamic-50 rounded-lg flex items-center justify-center">
            {getFileIcon(doc.type)}
          </div>
          <div>
            <p className="font-medium text-islamic-800">{doc.name}</p>
            <p className="text-xs text-sage-500">{doc.type.toUpperCase()} • {formatSize(doc.size)}</p>
          </div>
        </div>
      )
    },
    {
      key: 'category',
      title: 'التصنيف',
      sortable: true,
      render: (doc) => (
        <span className="px-3 py-1 bg-islamic-100 text-islamic-700 rounded-full text-xs font-medium">
          {doc.category}
        </span>
      )
    },
    {
      key: 'uploadedBy',
      title: 'تم الرفع بواسطة',
      sortable: true
    },
    {
      key: 'uploadDate',
      title: 'تاريخ الرفع',
      sortable: true,
      render: (doc) => new Date(doc.uploadDate).toLocaleDateString('ar-EG')
    },
    {
      key: 'downloads',
      title: 'التحميلات',
      sortable: true,
      render: (doc) => (
        <span className="text-islamic-700 font-medium">{doc.downloads}</span>
      )
    },
    {
      key: 'status',
      title: 'الحالة',
      sortable: true,
      render: (doc) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            doc.status === 'active'
              ? 'bg-green-100 text-green-700'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          {doc.status === 'active' ? 'نشط' : 'مؤرشف'}
        </span>
      )
    }
  ];

  const handleDownload = (doc: Document) => {
    success('جاري التحميل', `جاري تحميل ${doc.name}`);
  };

  const handleView = (doc: Document) => {
    setSelectedDoc(doc);
    setIsModalOpen(true);
  };

  const handleDelete = (doc: Document) => {
    if (confirm(`هل أنت متأكد من حذف ${doc.name}؟`)) {
      success('تم الحذف', `تم حذف ${doc.name} بنجاح`);
    }
  };

  const handleArchive = (doc: Document) => {
    success(
      doc.status === 'active' ? 'تم الأرشفة' : 'تم إلغاء الأرشفة',
      `تم ${doc.status === 'active' ? 'أرشفة' : 'إلغاء أرشفة'} ${doc.name}`
    );
  };

  const stats = [
    {
      title: 'إجمالي الوثائق',
      value: mockDocuments.length.toString(),
      icon: FileText,
      color: 'blue' as const,
      trend: 'up' as const,
      trendValue: '+12',
      subtitle: 'وثيقة مرفوعة في النظام'
    },
    {
      title: 'الوثائق النشطة',
      value: mockDocuments.filter(d => d.status === 'active').length.toString(),
      icon: File,
      color: 'green' as const,
      subtitle: 'وثيقة قابلة للوصول'
    },
    {
      title: 'الوثائق المؤرشفة',
      value: mockDocuments.filter(d => d.status === 'archived').length.toString(),
      icon: Archive,
      color: 'orange' as const,
      subtitle: 'وثيقة في الأرشيف'
    },
    {
      title: 'إجمالي التحميلات',
      value: mockDocuments.reduce((sum, d) => sum + d.downloads, 0).toString(),
      icon: Download,
      color: 'purple' as const,
      trend: 'up' as const,
      trendValue: '+45',
      subtitle: 'عملية تحميل'
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="إدارة الوثائق"
        subtitle="إدارة وتنظيم جميع الوثائق والملفات"
        icon={FileText}
        actions={
          <>
            <button className="btn-secondary">
              <Folder className="w-5 h-5 ml-2" />
              المجلدات
            </button>
            <button onClick={() => setIsModalOpen(true)} className="btn-primary">
              <Upload className="w-5 h-5 ml-2" />
              رفع وثيقة
            </button>
          </>
        }
        breadcrumbs={[
          { label: 'الرئيسية', href: '/admin' },
          { label: 'إدارة الوثائق' }
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <FilterBar
        filters={filterOptions}
        onClear={() =>
          setFilters({
            type: '',
            category: '',
            status: '',
            search: '',
            dateFrom: '',
            dateTo: ''
          })
        }
      />

      <DataTable
        data={filteredDocs}
        columns={columns}
        searchKeys={['name', 'uploadedBy']}
        onRowClick={(doc) => handleView(doc)}
        actions={(doc) => (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleView(doc);
              }}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="عرض"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDownload(doc);
              }}
              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
              title="تحميل"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleArchive(doc);
              }}
              className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
              title={doc.status === 'active' ? 'أرشفة' : 'إلغاء الأرشفة'}
            >
              <Archive className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(doc);
              }}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="حذف"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </>
        )}
        pageSize={10}
        showExport={true}
        onExport={() => success('تم التصدير', 'جاري تحميل قائمة الوثائق')}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedDoc(null);
        }}
        title={selectedDoc ? 'تفاصيل الوثيقة' : 'رفع وثيقة جديدة'}
        size="lg"
      >
        {selectedDoc ? (
          <div className="space-y-6">
            <div className="flex items-center space-x-4 space-x-reverse p-4 bg-islamic-50 rounded-lg">
              <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center shadow-sm">
                {getFileIcon(selectedDoc.type)}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-islamic-800 text-lg">{selectedDoc.name}</h4>
                <p className="text-sm text-sage-600 mt-1">
                  {selectedDoc.type.toUpperCase()} • {formatSize(selectedDoc.size)}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-sage-600">التصنيف</label>
                <p className="text-islamic-800 font-medium mt-1">{selectedDoc.category}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-sage-600">الحالة</label>
                <p className="text-islamic-800 font-medium mt-1">
                  {selectedDoc.status === 'active' ? 'نشط' : 'مؤرشف'}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-sage-600">تم الرفع بواسطة</label>
                <p className="text-islamic-800 font-medium mt-1">{selectedDoc.uploadedBy}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-sage-600">تاريخ الرفع</label>
                <p className="text-islamic-800 font-medium mt-1">
                  {new Date(selectedDoc.uploadDate).toLocaleDateString('ar-EG')}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-sage-600">عدد التحميلات</label>
                <p className="text-islamic-800 font-medium mt-1">{selectedDoc.downloads}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-sage-600">آخر تعديل</label>
                <p className="text-islamic-800 font-medium mt-1">
                  {new Date(selectedDoc.lastModified).toLocaleDateString('ar-EG')}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 space-x-reverse pt-4 border-t border-sage-200">
              <button onClick={() => setIsModalOpen(false)} className="btn-outline">
                إغلاق
              </button>
              <button onClick={() => handleDownload(selectedDoc)} className="btn-primary">
                <Download className="w-5 h-5 ml-2" />
                تحميل الوثيقة
              </button>
            </div>
          </div>
        ) : (
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-islamic-700 mb-2">اسم الوثيقة</label>
              <input
                type="text"
                className="form-input"
                placeholder="أدخل اسم الوثيقة"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-islamic-700 mb-2">التصنيف</label>
                <select className="form-select">
                  <option value="">اختر التصنيف</option>
                  <option value="سندات">سندات</option>
                  <option value="تقارير">تقارير</option>
                  <option value="خرائط">خرائط</option>
                  <option value="مالية">مالية</option>
                  <option value="قرارات قانونية">قرارات قانونية</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-islamic-700 mb-2">الحالة</label>
                <select className="form-select">
                  <option value="active">نشط</option>
                  <option value="archived">مؤرشف</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-islamic-700 mb-2">رفع الملف</label>
              <div className="border-2 border-dashed border-sage-300 rounded-lg p-8 text-center hover:border-islamic-500 transition-colors cursor-pointer">
                <Upload className="w-12 h-12 text-sage-400 mx-auto mb-3" />
                <p className="text-sm text-sage-600 font-medium">اسحب الملف هنا أو انقر للاختيار</p>
                <p className="text-xs text-sage-500 mt-1">PDF, JPG, PNG, XLSX (الحد الأقصى: 10MB)</p>
                <input type="file" className="hidden" />
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 space-x-reverse pt-4 border-t border-sage-200">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="btn-outline"
              >
                إلغاء
              </button>
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  success('تم الرفع', 'تم رفع الوثيقة بنجاح');
                  setIsModalOpen(false);
                }}
                className="btn-primary"
              >
                <Upload className="w-5 h-5 ml-2" />
                رفع الوثيقة
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default DocumentsManagementImproved;
