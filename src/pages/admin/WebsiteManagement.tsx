import React, { useState, useEffect } from 'react';
import {
  Globe,
  FileText,
  TrendingUp,
  BarChart3,
  Image as ImageIcon,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  CheckCircle,
  AlertTriangle,
  Users,
  Clock,
  Loader,
  Save,
  X
} from 'lucide-react';
import { PageHeader, DataTable, StatCard, Modal } from '../../components/admin';
import type { Column } from '../../components/admin/DataTable';
import { useToast } from '../../hooks/useToast';
import { supabase } from '../../lib/supabase';

interface Page {
  id: string;
  page_id: string;
  name_ar: string;
  name_en?: string;
  url: string;
  status: 'published' | 'draft' | 'archived';
  page_type: 'dynamic' | 'static';
  views_count: number;
  seo_score: number;
  meta_title?: string;
  meta_description?: string;
  updated_at: string;
}

interface SEOMetric {
  id: string;
  page_id: string;
  score: number;
  issues_count: number;
  suggestions: string[];
  performance_score?: number;
  accessibility_score?: number;
  best_practices_score?: number;
  checked_at: string;
}

const WebsiteManagement: React.FC = () => {
  const { success, error: showError } = useToast();
  const [activeTab, setActiveTab] = useState('pages');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedPage, setSelectedPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [pages, setPages] = useState<Page[]>([]);
  const [seoMetrics, setSeoMetrics] = useState<SEOMetric[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      const { data: pagesData, error: pagesError } = await supabase
        .from('website_pages')
        .select('*')
        .order('updated_at', { ascending: false });

      if (pagesError) throw pagesError;

      const { data: seoData, error: seoError } = await supabase
        .from('page_seo_metrics')
        .select('*')
        .order('checked_at', { ascending: false });

      if (seoError) throw seoError;

      setPages(pagesData || []);
      setSeoMetrics(seoData || []);
    } catch (error: any) {
      showError('خطأ', 'فشل تحميل البيانات');
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePage = async () => {
    if (!selectedPage) return;

    try {
      setSaving(true);

      const { error } = await supabase
        .from('website_pages')
        .update({
          name_ar: selectedPage.name_ar,
          status: selectedPage.status,
          meta_title: selectedPage.meta_title,
          meta_description: selectedPage.meta_description,
          updated_at: new Date().toISOString()
        })
        .eq('id', selectedPage.id);

      if (error) throw error;

      success('تم التحديث', 'تم تحديث معلومات الصفحة بنجاح');
      setShowModal(false);
      await fetchData();
    } catch (error: any) {
      showError('خطأ', 'فشل تحديث الصفحة');
      console.error('Error updating page:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleDeletePage = async (pageId: string) => {
    if (!confirm('هل أنت متأكد من حذف هذه الصفحة؟')) return;

    try {
      const { error } = await supabase
        .from('website_pages')
        .delete()
        .eq('id', pageId);

      if (error) throw error;

      success('تم الحذف', 'تم حذف الصفحة بنجاح');
      await fetchData();
    } catch (error: any) {
      showError('خطأ', 'فشل حذف الصفحة');
      console.error('Error deleting page:', error);
    }
  };

  const tabs = [
    { id: 'pages', name: 'إدارة الصفحات', icon: FileText, color: 'text-blue-600' },
    { id: 'seo', name: 'تحسين SEO', icon: TrendingUp, color: 'text-green-600' },
    { id: 'analytics', name: 'التحليلات', icon: BarChart3, color: 'text-purple-600' },
    { id: 'media', name: 'الوسائط', icon: ImageIcon, color: 'text-orange-600' }
  ];

  const pageColumns: Column<Page>[] = [
    {
      key: 'name_ar',
      label: 'اسم الصفحة',
      render: (page) => (
        <div>
          <div className="font-medium text-gray-900">{page.name_ar}</div>
          <div className="text-sm text-gray-500">{page.url}</div>
        </div>
      )
    },
    {
      key: 'page_type',
      label: 'النوع',
      render: (page) => (
        <span className={`px-2 py-1 text-xs rounded-full ${
          page.page_type === 'dynamic' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {page.page_type === 'dynamic' ? 'ديناميكية' : 'ثابتة'}
        </span>
      )
    },
    {
      key: 'status',
      label: 'الحالة',
      render: (page) => (
        <div className="flex items-center space-x-2 space-x-reverse">
          {page.status === 'published' ? (
            <CheckCircle className="w-4 h-4 text-green-500" />
          ) : (
            <Clock className="w-4 h-4 text-yellow-500" />
          )}
          <span className={`px-2 py-1 text-xs rounded-full ${
            page.status === 'published' ? 'bg-green-100 text-green-800' :
            page.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {page.status === 'published' ? 'منشورة' : page.status === 'draft' ? 'مسودة' : 'مؤرشفة'}
          </span>
        </div>
      )
    },
    {
      key: 'views_count',
      label: 'المشاهدات',
      render: (page) => page.views_count.toLocaleString()
    },
    {
      key: 'seo_score',
      label: 'نقاط SEO',
      render: (page) => (
        <div className="flex items-center space-x-2 space-x-reverse">
          <div className="flex-1 bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${
                page.seo_score >= 90 ? 'bg-green-500' :
                page.seo_score >= 70 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${page.seo_score}%` }}
            />
          </div>
          <span className="text-sm font-medium text-gray-700">{page.seo_score}</span>
        </div>
      )
    },
    {
      key: 'actions',
      label: 'الإجراءات',
      render: (page) => (
        <div className="flex items-center space-x-2 space-x-reverse">
          <button
            onClick={() => window.open(page.url, '_blank')}
            className="p-2 hover:bg-blue-50 rounded text-blue-600"
            title="معاينة"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setSelectedPage(page);
              setShowModal(true);
            }}
            className="p-2 hover:bg-green-50 rounded text-green-600"
            title="تحرير"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDeletePage(page.id)}
            className="p-2 hover:bg-red-50 rounded text-red-600"
            title="حذف"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )
    }
  ];

  const filteredPages = pages.filter(page =>
    page.name_ar.toLowerCase().includes(searchQuery.toLowerCase()) ||
    page.url.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    totalPages: pages.length,
    publishedPages: pages.filter(p => p.status === 'published').length,
    totalViews: pages.reduce((sum, p) => sum + p.views_count, 0),
    avgSeoScore: Math.round(pages.reduce((sum, p) => sum + p.seo_score, 0) / pages.length) || 0
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="w-8 h-8 animate-spin text-islamic-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="إدارة الموقع"
        description="إدارة صفحات الموقع وتحسين SEO ومتابعة التحليلات"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="إجمالي الصفحات"
          value={stats.totalPages.toString()}
          icon={FileText}
          color="blue"
        />
        <StatCard
          title="الصفحات المنشورة"
          value={stats.publishedPages.toString()}
          icon={CheckCircle}
          color="green"
        />
        <StatCard
          title="إجمالي المشاهدات"
          value={stats.totalViews.toLocaleString()}
          icon={Eye}
          color="purple"
        />
        <StatCard
          title="متوسط نقاط SEO"
          value={`${stats.avgSeoScore}%`}
          icon={TrendingUp}
          color="orange"
        />
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div className="flex space-x-2 space-x-reverse">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 space-x-reverse px-4 py-2 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-islamic-50 text-islamic-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.name}</span>
                </button>
              );
            })}
          </div>

          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="بحث..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input pr-10"
            />
          </div>
        </div>

        {activeTab === 'pages' && (
          <DataTable
            data={filteredPages}
            columns={pageColumns}
          />
        )}

        {activeTab === 'seo' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">مقاييس SEO للصفحات</h3>
            {pages.map((page) => {
              const metric = seoMetrics.find(m => m.page_id === page.id);
              return (
                <div key={page.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-gray-900">{page.name_ar}</h4>
                      <p className="text-sm text-gray-500">{page.url}</p>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${
                        page.seo_score >= 90 ? 'text-green-600' :
                        page.seo_score >= 70 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {page.seo_score}
                      </div>
                      <p className="text-xs text-gray-500">نقاط SEO</p>
                    </div>
                  </div>

                  {metric && (
                    <div className="grid grid-cols-3 gap-4 pt-3 border-t border-gray-200">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">الأداء</p>
                        <p className="text-sm font-medium">{metric.performance_score || 0}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">إمكانية الوصول</p>
                        <p className="text-sm font-medium">{metric.accessibility_score || 0}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">أفضل الممارسات</p>
                        <p className="text-sm font-medium">{metric.best_practices_score || 0}%</p>
                      </div>
                    </div>
                  )}

                  {metric && metric.issues_count > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <div className="flex items-center text-sm text-amber-600">
                        <AlertTriangle className="w-4 h-4 ml-1" />
                        {metric.issues_count} مشكلة تحتاج إلى إصلاح
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="text-center py-12">
            <BarChart3 className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">التحليلات</h3>
            <p className="text-gray-600">سيتم إضافة تحليلات الموقع قريباً</p>
          </div>
        )}

        {activeTab === 'media' && (
          <div className="text-center py-12">
            <ImageIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">مكتبة الوسائط</h3>
            <p className="text-gray-600">سيتم إضافة مكتبة الوسائط قريباً</p>
          </div>
        )}
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={`تحرير: ${selectedPage?.name_ar}`}
        size="large"
      >
        {selectedPage && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">اسم الصفحة</label>
              <input
                type="text"
                value={selectedPage.name_ar}
                onChange={(e) => setSelectedPage({ ...selectedPage, name_ar: e.target.value })}
                className="form-input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">الحالة</label>
              <select
                value={selectedPage.status}
                onChange={(e) => setSelectedPage({ ...selectedPage, status: e.target.value as any })}
                className="form-select"
              >
                <option value="published">منشورة</option>
                <option value="draft">مسودة</option>
                <option value="archived">مؤرشفة</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">عنوان SEO</label>
              <input
                type="text"
                value={selectedPage.meta_title || ''}
                onChange={(e) => setSelectedPage({ ...selectedPage, meta_title: e.target.value })}
                className="form-input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">وصف SEO</label>
              <textarea
                value={selectedPage.meta_description || ''}
                onChange={(e) => setSelectedPage({ ...selectedPage, meta_description: e.target.value })}
                className="form-textarea"
                rows={3}
              />
            </div>

            <div className="flex justify-end space-x-3 space-x-reverse pt-4 border-t">
              <button
                onClick={() => setShowModal(false)}
                className="btn-outline"
                disabled={saving}
              >
                <X className="w-4 h-4 ml-2" />
                إلغاء
              </button>
              <button
                onClick={handleUpdatePage}
                className="btn-primary"
                disabled={saving}
              >
                {saving ? (
                  <>
                    <Loader className="w-4 h-4 ml-2 animate-spin" />
                    جاري الحفظ...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 ml-2" />
                    حفظ التغييرات
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default WebsiteManagement;
