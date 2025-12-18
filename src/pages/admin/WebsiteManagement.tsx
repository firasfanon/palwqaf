import React, { useState } from 'react';
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
  Clock
} from 'lucide-react';
import { PageHeader, DataTable, StatCard, Modal } from '../../components/admin';
import type { Column } from '../../components/admin/DataTable';
import { useToast } from '../../hooks/useToast';

interface Page {
  id: string;
  name: string;
  url: string;
  status: 'published' | 'draft' | 'archived';
  lastModified: string;
  views: number;
  seoScore: number;
  type: 'dynamic' | 'static';
}

const WebsiteManagement: React.FC = () => {
  const { success, error: showError } = useToast();
  const [activeTab, setActiveTab] = useState('pages');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedPage, setSelectedPage] = useState<Page | null>(null);

  const tabs = [
    { id: 'pages', name: 'إدارة الصفحات', icon: FileText, color: 'text-blue-600' },
    { id: 'seo', name: 'تحسين SEO', icon: TrendingUp, color: 'text-green-600' },
    { id: 'analytics', name: 'التحليلات', icon: BarChart3, color: 'text-purple-600' },
    { id: 'media', name: 'الوسائط', icon: ImageIcon, color: 'text-orange-600' }
  ];

  const pages: Page[] = [
    {
      id: 'home',
      name: 'الصفحة الرئيسية',
      url: '/',
      status: 'published',
      lastModified: '2024-01-15',
      views: 15420,
      type: 'dynamic',
      seoScore: 95
    },
    {
      id: 'about',
      name: 'عن الوزارة',
      url: '/about',
      status: 'published',
      lastModified: '2024-01-14',
      views: 3250,
      type: 'static',
      seoScore: 88
    },
    {
      id: 'minister',
      name: 'كلمة الوزير',
      url: '/minister',
      status: 'published',
      lastModified: '2024-01-13',
      views: 2180,
      type: 'static',
      seoScore: 92
    },
    {
      id: 'news',
      name: 'الأخبار',
      url: '/news',
      status: 'published',
      lastModified: '2024-01-15',
      views: 8750,
      type: 'dynamic',
      seoScore: 93
    },
    {
      id: 'services',
      name: 'الخدمات الإلكترونية',
      url: '/e-services',
      status: 'published',
      lastModified: '2024-01-09',
      views: 4560,
      type: 'dynamic',
      seoScore: 92
    },
    {
      id: 'contact',
      name: 'اتصل بنا',
      url: '/contact',
      status: 'published',
      lastModified: '2024-01-08',
      views: 2780,
      type: 'static',
      seoScore: 84
    }
  ];

  const seoMetrics = [
    { page: 'الصفحة الرئيسية', score: 95, issues: 0, color: 'text-green-600' },
    { page: 'الأخبار', score: 93, issues: 1, color: 'text-green-600' },
    { page: 'كلمة الوزير', score: 92, issues: 1, color: 'text-green-600' },
    { page: 'الرؤية والرسالة', score: 90, issues: 2, color: 'text-yellow-600' },
    { page: 'عن الوزارة', score: 88, issues: 2, color: 'text-yellow-600' },
    { page: 'اتصل بنا', score: 84, issues: 3, color: 'text-orange-600' }
  ];

  const analyticsData = {
    visitorsToday: 1247,
    pageViews: 3456,
    bounceRate: 23,
    avgSessionDuration: '4:32'
  };

  const mediaLibrary = [
    {
      id: 1,
      name: 'صورة المسجد الأقصى',
      type: 'image',
      size: '2.5 MB',
      url: 'https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg',
      usedIn: 3
    },
    {
      id: 2,
      name: 'شعار الوزارة',
      type: 'image',
      size: '512 KB',
      url: '/images/logo.png',
      usedIn: 8
    },
    {
      id: 3,
      name: 'فيديو افتتاح المسجد',
      type: 'video',
      size: '45 MB',
      url: '/videos/opening.mp4',
      usedIn: 2
    }
  ];

  const pageColumns: Column<Page>[] = [
    {
      key: 'name',
      label: 'اسم الصفحة',
      render: (page) => (
        <div>
          <div className="font-medium text-gray-900">{page.name}</div>
          <div className="text-sm text-gray-500">{page.url}</div>
        </div>
      )
    },
    {
      key: 'type',
      label: 'النوع',
      render: (page) => (
        <span className={`px-2 py-1 text-xs rounded-full ${
          page.type === 'dynamic' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {page.type === 'dynamic' ? 'ديناميكية' : 'ثابتة'}
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
            page.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
          }`}>
            {page.status === 'published' ? 'منشورة' : 'مسودة'}
          </span>
        </div>
      )
    },
    {
      key: 'views',
      label: 'المشاهدات',
      render: (page) => page.views.toLocaleString()
    },
    {
      key: 'seoScore',
      label: 'SEO',
      render: (page) => (
        <div className="flex items-center space-x-2 space-x-reverse">
          <div className="w-16 bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${
                page.seoScore >= 90 ? 'bg-green-500' :
                page.seoScore >= 80 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${page.seoScore}%` }}
            ></div>
          </div>
          <span className="text-sm font-medium">{page.seoScore}%</span>
        </div>
      )
    },
    {
      key: 'lastModified',
      label: 'آخر تحديث',
      render: (page) => new Date(page.lastModified).toLocaleDateString('ar-EG')
    },
    {
      key: 'actions',
      label: 'الإجراءات',
      render: (page) => (
        <div className="flex items-center space-x-2 space-x-reverse">
          <button
            onClick={() => {
              setSelectedPage(page);
              setShowModal(true);
            }}
            className="p-1 hover:bg-blue-50 rounded"
          >
            <Eye className="w-4 h-4 text-blue-600" />
          </button>
          <button className="p-1 hover:bg-green-50 rounded">
            <Edit className="w-4 h-4 text-green-600" />
          </button>
          <button className="p-1 hover:bg-red-50 rounded">
            <Trash2 className="w-4 h-4 text-red-600" />
          </button>
        </div>
      )
    }
  ];

  const stats = [
    {
      title: 'إجمالي الصفحات',
      value: pages.length,
      icon: FileText,
      color: 'bg-blue-500',
      change: '+2'
    },
    {
      title: 'صفحات منشورة',
      value: pages.filter(p => p.status === 'published').length,
      icon: CheckCircle,
      color: 'bg-green-500',
      change: '+1'
    },
    {
      title: 'إجمالي المشاهدات',
      value: pages.reduce((sum, p) => sum + p.views, 0).toLocaleString(),
      icon: Eye,
      color: 'bg-purple-500',
      change: '+12%'
    },
    {
      title: 'متوسط SEO',
      value: Math.round(pages.reduce((sum, p) => sum + p.seoScore, 0) / pages.length) + '%',
      icon: TrendingUp,
      color: 'bg-orange-500',
      change: '+5%'
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'pages':
        return (
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">جميع الصفحات</h3>
              <button className="btn-primary">
                <Plus className="w-5 h-5 ml-2" />
                إضافة صفحة جديدة
              </button>
            </div>
            <DataTable
              columns={pageColumns}
              data={pages}
              searchable
              searchPlaceholder="البحث في الصفحات..."
            />
          </div>
        );

      case 'seo':
        return (
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">تحسين محركات البحث (SEO)</h3>
            <div className="space-y-4">
              {seoMetrics.map((metric, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-800">{metric.page}</h4>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            metric.score >= 90 ? 'bg-green-500' :
                            metric.score >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${metric.score}%` }}
                        ></div>
                      </div>
                      <span className={`text-sm font-bold ${metric.color}`}>{metric.score}%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      {metric.issues > 0 ? (
                        <>
                          <AlertTriangle className="w-4 h-4 text-orange-500" />
                          <span className="text-sm text-gray-600">{metric.issues} مشكلة</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-600">لا توجد مشاكل</span>
                        </>
                      )}
                    </div>
                    <button className="text-islamic-600 hover:text-islamic-700 text-sm font-medium">
                      عرض التفاصيل
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'analytics':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">زوار اليوم</p>
                    <p className="text-3xl font-bold text-gray-800">{analyticsData.visitorsToday.toLocaleString()}</p>
                  </div>
                  <Users className="w-8 h-8 text-blue-500" />
                </div>
              </div>
              <div className="card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">مشاهدات الصفحات</p>
                    <p className="text-3xl font-bold text-gray-800">{analyticsData.pageViews.toLocaleString()}</p>
                  </div>
                  <Eye className="w-8 h-8 text-green-500" />
                </div>
              </div>
              <div className="card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">معدل الارتداد</p>
                    <p className="text-3xl font-bold text-gray-800">{analyticsData.bounceRate}%</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-purple-500" />
                </div>
              </div>
              <div className="card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">متوسط الجلسة</p>
                    <p className="text-3xl font-bold text-gray-800">{analyticsData.avgSessionDuration}</p>
                  </div>
                  <Clock className="w-8 h-8 text-orange-500" />
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">أداء الصفحات</h3>
              <div className="space-y-3">
                {pages.slice(0, 6).map((page) => (
                  <div key={page.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <FileText className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-800">{page.name}</p>
                        <p className="text-xs text-gray-500">{page.url}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-gray-800">{page.views.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">مشاهدة</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'media':
        return (
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">مكتبة الوسائط</h3>
              <button className="btn-primary">
                <Plus className="w-5 h-5 ml-2" />
                رفع ملف جديد
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {mediaLibrary.map((media) => (
                <div key={media.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition">
                  <div className="aspect-video bg-gray-100 flex items-center justify-center">
                    {media.type === 'image' ? (
                      <img src={media.url} alt={media.name} className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon className="w-12 h-12 text-gray-400" />
                    )}
                  </div>
                  <div className="p-4">
                    <h4 className="font-medium text-gray-800 mb-2 truncate">{media.name}</h4>
                    <div className="space-y-1 text-xs text-gray-600">
                      <p>الحجم: {media.size}</p>
                      <p>مستخدم في: {media.usedIn} صفحة</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="إدارة الموقع الإلكتروني"
        description="إدارة شاملة لصفحات ومحتوى الموقع"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="card">
        <div className="flex space-x-2 space-x-reverse border-b">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 space-x-reverse px-6 py-3 font-medium transition-colors ${
                  activeTab === tab.id
                    ? `${tab.color} border-b-2 border-current`
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        <div className="p-6">
          {renderContent()}
        </div>
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={`تفاصيل الصفحة: ${selectedPage?.name}`}
        size="large"
      >
        {selectedPage && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">اسم الصفحة</label>
                <p className="text-gray-900">{selectedPage.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الرابط</label>
                <p className="text-gray-900">{selectedPage.url}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">النوع</label>
                <p className="text-gray-900">{selectedPage.type === 'dynamic' ? 'ديناميكية' : 'ثابتة'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">المشاهدات</label>
                <p className="text-gray-900">{selectedPage.views.toLocaleString()}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">SEO Score</label>
                <p className="text-gray-900">{selectedPage.seoScore}%</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">آخر تحديث</label>
                <p className="text-gray-900">{new Date(selectedPage.lastModified).toLocaleDateString('ar-EG')}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default WebsiteManagement;
