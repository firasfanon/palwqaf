import React, { useState, useEffect } from 'react';
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
  X,
  Save,
  RefreshCw
} from 'lucide-react';
import { PageHeader, DataTable, StatCard, FilterBar, Modal } from '../../components/admin';
import FileUpload from '../../components/UI/FileUpload';
import type { Column } from '../../components/admin/DataTable';
import type { FilterOption } from '../../components/admin/FilterBar';
import { useToast } from '../../hooks/useToast';
import { useDocuments } from '../../hooks/useDatabase';
import { DocumentsService } from '../../services/database';
import { StorageService } from '../../services/storage';

interface DocumentForm {
  name: string;
  type: string;
  category: string;
  access_level: string;
  file_path?: string;
  file_url?: string;
  size?: number;
  content?: string;
  tags?: string[];
  related_to_type?: string;
  related_to_id?: number;
}

const DocumentsManagementImproved: React.FC = () => {
  const { success, error: showError } = useToast();
  const { data: documents, loading, error, refetch, create } = useDocuments();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<any | null>(null);
  const [isViewMode, setIsViewMode] = useState(false);

  const [formData, setFormData] = useState<DocumentForm>({
    name: '',
    type: 'pdf',
    category: 'legal',
    access_level: 'internal',
    content: '',
    tags: []
  });

  const [filters, setFilters] = useState({
    type: '',
    category: '',
    access_level: '',
    search: ''
  });

  const filterOptions: FilterOption[] = [
    {
      key: 'category',
      label: 'الفئة',
      options: [
        { value: '', label: 'الكل' },
        { value: 'legal', label: 'قانوني' },
        { value: 'financial', label: 'مالي' },
        { value: 'technical', label: 'تقني' },
        { value: 'administrative', label: 'إداري' },
        { value: 'other', label: 'أخرى' }
      ]
    },
    {
      key: 'type',
      label: 'نوع الملف',
      options: [
        { value: '', label: 'الكل' },
        { value: 'pdf', label: 'PDF' },
        { value: 'doc', label: 'Word' },
        { value: 'xls', label: 'Excel' },
        { value: 'image', label: 'صورة' },
        { value: 'other', label: 'أخرى' }
      ]
    },
    {
      key: 'access_level',
      label: 'مستوى الوصول',
      options: [
        { value: '', label: 'الكل' },
        { value: 'public', label: 'عام' },
        { value: 'internal', label: 'داخلي' },
        { value: 'restricted', label: 'محدود' }
      ]
    }
  ];

  const columns: Column<any>[] = [
    {
      key: 'name',
      label: 'اسم الوثيقة',
      render: (doc) => (
        <div className="flex items-center space-x-2 space-x-reverse">
          {getFileIcon(doc.type)}
          <div>
            <p className="font-medium text-gray-900">{doc.name}</p>
            <p className="text-xs text-gray-500">{doc.type?.toUpperCase()}</p>
          </div>
        </div>
      )
    },
    {
      key: 'category',
      label: 'الفئة',
      render: (doc) => (
        <span className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(doc.category)}`}>
          {getCategoryLabel(doc.category)}
        </span>
      )
    },
    {
      key: 'size',
      label: 'الحجم',
      render: (doc) => StorageService.formatFileSize(doc.size || 0)
    },
    {
      key: 'uploaded_at',
      label: 'تاريخ الرفع',
      render: (doc) => new Date(doc.uploaded_at).toLocaleDateString('ar-EG')
    },
    {
      key: 'view_count',
      label: 'المشاهدات',
      render: (doc) => (
        <div className="flex items-center space-x-1 space-x-reverse">
          <Eye className="w-4 h-4 text-gray-400" />
          <span>{doc.view_count || 0}</span>
        </div>
      )
    },
    {
      key: 'actions',
      label: 'الإجراءات',
      render: (doc) => (
        <div className="flex items-center space-x-2 space-x-reverse">
          <button
            onClick={() => handleView(doc)}
            className="p-1 hover:bg-blue-50 rounded"
            title="عرض"
          >
            <Eye className="w-4 h-4 text-blue-600" />
          </button>
          <button
            onClick={() => handleDownload(doc)}
            className="p-1 hover:bg-green-50 rounded"
            title="تحميل"
          >
            <Download className="w-4 h-4 text-green-600" />
          </button>
          <button
            onClick={() => handleDelete(doc)}
            className="p-1 hover:bg-red-50 rounded"
            title="حذف"
          >
            <Trash2 className="w-4 h-4 text-red-600" />
          </button>
        </div>
      )
    }
  ];

  const getFileIcon = (type: string) => {
    switch (type?.toLowerCase()) {
      case 'pdf':
        return <FileText className="w-5 h-5 text-red-600" />;
      case 'doc':
      case 'docx':
        return <File className="w-5 h-5 text-blue-600" />;
      case 'xls':
      case 'xlsx':
        return <FileSpreadsheet className="w-5 h-5 text-green-600" />;
      case 'image':
      case 'jpg':
      case 'png':
        return <Image className="w-5 h-5 text-purple-600" />;
      default:
        return <Folder className="w-5 h-5 text-gray-600" />;
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      legal: 'bg-blue-100 text-blue-800',
      financial: 'bg-green-100 text-green-800',
      technical: 'bg-purple-100 text-purple-800',
      administrative: 'bg-orange-100 text-orange-800',
      other: 'bg-gray-100 text-gray-800'
    };
    return colors[category] || colors.other;
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      legal: 'قانوني',
      financial: 'مالي',
      technical: 'تقني',
      administrative: 'إداري',
      other: 'أخرى'
    };
    return labels[category] || category;
  };

  const handleOpenModal = () => {
    setSelectedDoc(null);
    setIsViewMode(false);
    setFormData({
      name: '',
      type: 'pdf',
      category: 'legal',
      access_level: 'internal',
      content: '',
      tags: []
    });
    setIsModalOpen(true);
  };

  const handleView = (doc: any) => {
    setSelectedDoc(doc);
    setIsViewMode(true);
    setIsModalOpen(true);
  };

  const handleDownload = async (doc: any) => {
    try {
      if (doc.file_path) {
        const data = await StorageService.downloadFile('documents', doc.file_path);
        const url = window.URL.createObjectURL(data);
        const a = document.createElement('a');
        a.href = url;
        a.download = doc.name;
        a.click();
        window.URL.revokeObjectURL(url);

        await DocumentsService.incrementDownloadCount(doc.id);
        success('تم تحميل الملف', 'تم تحميل الملف بنجاح');
      }
    } catch (err) {
      showError('خطأ', 'فشل تحميل الملف');
    }
  };

  const handleDelete = async (doc: any) => {
    if (!confirm('هل أنت متأكد من حذف هذه الوثيقة؟')) return;

    try {
      if (doc.file_path) {
        await StorageService.deleteFile('documents', doc.file_path);
      }

      await refetch();
      success('تم الحذف', 'تم حذف الوثيقة بنجاح');
    } catch (err) {
      showError('خطأ', 'فشل حذف الوثيقة');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await create({
        ...formData,
        uploader_id: 1,
        uploaded_at: new Date().toISOString()
      });

      success('تم الحفظ', 'تم حفظ الوثيقة بنجاح');
      setIsModalOpen(false);
      refetch();
    } catch (err) {
      showError('خطأ', 'فشل حفظ الوثيقة');
    }
  };

  const handleFileUpload = (filePath: string, fileUrl: string) => {
    setFormData(prev => ({
      ...prev,
      file_path: filePath,
      file_url: fileUrl
    }));
  };

  const stats = [
    {
      title: 'إجمالي الوثائق',
      value: documents?.length || 0,
      icon: FileText,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      title: 'تم رفعها هذا الشهر',
      value: documents?.filter(d => {
        const uploadDate = new Date(d.uploaded_at);
        const now = new Date();
        return uploadDate.getMonth() === now.getMonth();
      }).length || 0,
      icon: Upload,
      color: 'bg-green-500',
      change: '+8%'
    },
    {
      title: 'وثائق قانونية',
      value: documents?.filter(d => d.category === 'legal').length || 0,
      icon: Archive,
      color: 'bg-purple-500',
      change: '+3%'
    },
    {
      title: 'التحميلات',
      value: documents?.reduce((sum, d) => sum + (d.download_count || 0), 0) || 0,
      icon: Download,
      color: 'bg-orange-500',
      change: '+15%'
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="إدارة الوثائق"
        description="إدارة وتنظيم جميع الوثائق والمستندات"
        action={{
          label: 'رفع وثيقة جديدة',
          icon: Plus,
          onClick: handleOpenModal
        }}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <FilterBar
        filters={filters}
        onFilterChange={setFilters}
        filterOptions={filterOptions}
        onRefresh={refetch}
        showRefresh
      />

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <RefreshCw className="w-8 h-8 animate-spin text-islamic-600" />
          <span className="mr-3 text-gray-600">جاري التحميل...</span>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={documents || []}
          searchable
          searchPlaceholder="البحث في الوثائق..."
        />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isViewMode ? 'عرض الوثيقة' : selectedDoc ? 'تعديل الوثيقة' : 'رفع وثيقة جديدة'}
        size="large"
      >
        {isViewMode && selectedDoc ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">اسم الوثيقة</label>
                <p className="text-gray-900">{selectedDoc.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">النوع</label>
                <p className="text-gray-900">{selectedDoc.type}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الفئة</label>
                <p className="text-gray-900">{getCategoryLabel(selectedDoc.category)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">مستوى الوصول</label>
                <p className="text-gray-900">{selectedDoc.access_level}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">تاريخ الرفع</label>
                <p className="text-gray-900">{new Date(selectedDoc.uploaded_at).toLocaleDateString('ar-EG')}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">عدد المشاهدات</label>
                <p className="text-gray-900">{selectedDoc.view_count || 0}</p>
              </div>
            </div>
            {selectedDoc.content && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">المحتوى</label>
                <p className="text-gray-900 whitespace-pre-wrap">{selectedDoc.content}</p>
              </div>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                اسم الوثيقة *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="form-input"
                placeholder="أدخل اسم الوثيقة"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  نوع الملف *
                </label>
                <select
                  required
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="form-select"
                >
                  <option value="pdf">PDF</option>
                  <option value="doc">Word</option>
                  <option value="xls">Excel</option>
                  <option value="image">صورة</option>
                  <option value="other">أخرى</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الفئة *
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="form-select"
                >
                  <option value="legal">قانوني</option>
                  <option value="financial">مالي</option>
                  <option value="technical">تقني</option>
                  <option value="administrative">إداري</option>
                  <option value="other">أخرى</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                مستوى الوصول *
              </label>
              <select
                required
                value={formData.access_level}
                onChange={(e) => setFormData({ ...formData, access_level: e.target.value })}
                className="form-select"
              >
                <option value="public">عام</option>
                <option value="internal">داخلي</option>
                <option value="restricted">محدود</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                المحتوى
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="form-textarea"
                rows={4}
                placeholder="وصف أو محتوى الوثيقة"
              />
            </div>

            <FileUpload
              onUpload={handleFileUpload}
              bucket="documents"
              folder={formData.category}
              label="رفع الملف"
              description="اسحب الملف هنا أو انقر للاختيار"
            />

            <div className="flex justify-end space-x-3 space-x-reverse pt-4">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="btn-outline"
              >
                <X className="w-4 h-4 ml-2" />
                إلغاء
              </button>
              <button type="submit" className="btn-primary">
                <Save className="w-4 h-4 ml-2" />
                حفظ
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default DocumentsManagementImproved;
