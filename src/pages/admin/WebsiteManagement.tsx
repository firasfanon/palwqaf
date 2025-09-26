import React, { useState } from 'react';
import { 
  Globe, 
  Settings, 
  Eye, 
  Edit, 
  Save, 
  RefreshCw, 
  Upload, 
  Download, 
  Image as ImageIcon, 
  Video, 
  FileText, 
  Palette, 
  Monitor, 
  Smartphone, 
  Tablet, 
  Users, 
  BarChart3, 
  TrendingUp, 
  Activity, 
  Clock, 
  Calendar, 
  Star, 
  Heart, 
  Building, 
  BookOpen, 
  Phone, 
  Mail, 
  MapPin, 
  Search, 
  Filter, 
  Plus, 
  Trash2, 
  CheckCircle, 
  AlertTriangle, 
  Info, 
  Zap, 
  Shield, 
  Lock, 
  Unlock, 
  Bell, 
  Target, 
  Award, 
  Crown, 
  Gem, 
  Sparkles, 
  Navigation, 
  Compass, 
  Flag, 
  Home, 
  Database, 
  HardDrive, 
  Cpu, 
  MemoryStick, 
  Network, 
  Wifi, 
  WifiOff, 
  Server, 
  Chrome, 
  ArrowUp, 
  ArrowDown, 
  Bookmark, 
  Share2, 
  Copy, 
  Scissors, 
  RotateCcw, 
  RotateCw, 
  ZoomIn, 
  ZoomOut, 
  Maximize, 
  Minimize, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  Bold, 
  Italic, 
  Underline, 
  Link as LinkIcon, 
  Unlink, 
  Type, 
  Paintbrush2, 
  Layers, 
  Grid, 
  List, 
  Move, 
  MousePointer, 
  Hand, 
  Crosshair 
} from 'lucide-react';
import { useToast } from '../../hooks/useToast';

const WebsiteManagement: React.FC = () => {
  const { success, info, error: showError } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPage, setSelectedPage] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const tabs = [
    { id: 'overview', name: 'نظرة عامة', icon: Globe, color: 'text-islamic-600' },
    { id: 'pages', name: 'إدارة الصفحات', icon: FileText, color: 'text-blue-600' },
    { id: 'content', name: 'إدارة المحتوى', icon: Edit, color: 'text-green-600' },
    { id: 'media', name: 'الوسائط', icon: ImageIcon, color: 'text-purple-600' },
    { id: 'design', name: 'التصميم', icon: Palette, color: 'text-pink-600' },
    { id: 'seo', name: 'تحسين محركات البحث', icon: TrendingUp, color: 'text-orange-600' },
    { id: 'analytics', name: 'التحليلات', icon: BarChart3, color: 'text-teal-600' },
    { id: 'security', name: 'الأمان', icon: Shield, color: 'text-red-600' }
  ];

  const websitePages = [
    {
      id: 'home',
      name: 'الصفحة الرئيسية',
      url: '/',
      status: 'published',
      lastModified: '2024-01-15',
      views: 15420,
      type: 'dynamic',
      sections: ['hero', 'news', 'announcements', 'services', 'statistics'],
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
      sections: ['introduction', 'history', 'objectives', 'achievements'],
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
      sections: ['biography', 'message', 'achievements', 'vision'],
      seoScore: 92
    },
    {
      id: 'vision',
      name: 'الرؤية والرسالة',
      url: '/vision',
      status: 'published',
      lastModified: '2024-01-12',
      views: 1890,
      type: 'static',
      sections: ['vision', 'mission', 'values', 'goals'],
      seoScore: 90
    },
    {
      id: 'structure',
      name: 'الهيكل التنظيمي',
      url: '/structure',
      status: 'published',
      lastModified: '2024-01-11',
      views: 1560,
      type: 'static',
      sections: ['chart', 'departments', 'regional_offices'],
      seoScore: 85
    },
    {
      id: 'former-ministers',
      name: 'الوزراء السابقون',
      url: '/former-ministers',
      status: 'published',
      lastModified: '2024-01-10',
      views: 980,
      type: 'static',
      sections: ['timeline', 'achievements', 'legacy'],
      seoScore: 87
    },
    {
      id: 'news',
      name: 'الأخبار',
      url: '/news',
      status: 'published',
      lastModified: '2024-01-15',
      views: 8750,
      type: 'dynamic',
      sections: ['news_list', 'categories', 'search'],
      seoScore: 93
    },
    {
      id: 'announcements',
      name: 'الإعلانات',
      url: '/announcements',
      status: 'published',
      lastModified: '2024-01-15',
      views: 5420,
      type: 'dynamic',
      sections: ['announcements_list', 'priorities', 'filters'],
      seoScore: 89
    },
    {
      id: 'activities',
      name: 'الأنشطة والفعاليات',
      url: '/activities',
      status: 'published',
      lastModified: '2024-01-14',
      views: 4320,
      type: 'dynamic',
      sections: ['activities_list', 'categories', 'registration'],
      seoScore: 91
    },
    {
      id: 'social-services',
      name: 'الخدمات الاجتماعية',
      url: '/social-services',
      status: 'published',
      lastModified: '2024-01-13',
      views: 3890,
      type: 'dynamic',
      sections: ['services_list', 'programs', 'beneficiaries'],
      seoScore: 86
    },
    {
      id: 'friday-sermons',
      name: 'خطب الجمعة',
      url: '/friday-sermons',
      status: 'published',
      lastModified: '2024-01-12',
      views: 6780,
      type: 'dynamic',
      sections: ['sermons_list', 'preachers', 'audio_player'],
      seoScore: 94
    },
    {
      id: 'mosques',
      name: 'المساجد',
      url: '/mosques',
      status: 'published',
      lastModified: '2024-01-11',
      views: 2340,
      type: 'dynamic',
      sections: ['mosques_list', 'map', 'services'],
      seoScore: 88
    },
    {
      id: 'projects',
      name: 'المشاريع',
      url: '/projects',
      status: 'published',
      lastModified: '2024-01-10',
      views: 1890,
      type: 'dynamic',
      sections: ['projects_list', 'progress', 'funding'],
      seoScore: 87
    },
    {
      id: 'e-services',
      name: 'الخدمات الإلكترونية',
      url: '/e-services',
      status: 'published',
      lastModified: '2024-01-09',
      views: 4560,
      type: 'dynamic',
      sections: ['services_list', 'platforms', 'tutorials'],
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
      sections: ['contact_form', 'offices', 'map'],
      seoScore: 84
    }
  ];

  const contentStats = {
    totalPages: websitePages.length,
    publishedPages: websitePages.filter(p => p.status === 'published').length,
    totalViews: websitePages.reduce((sum, p) => sum + p.views, 0),
    averageSeoScore: Math.round(websitePages.reduce((sum, p) => sum + p.seoScore, 0) / websitePages.length),
    lastUpdate: '2024-01-15'
  };

  const mediaLibrary = [
    {
      id: 1,
      name: 'صورة المسجد الأقصى',
      type: 'image',
      size: '2.5 MB',
      dimensions: '1920x1080',
      uploadDate: '2024-01-15',
      usedIn: ['home', 'mosques', 'news'],
      url: 'https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg'
    },
    {
      id: 2,
      name: 'فيديو افتتاح المسجد الجديد',
      type: 'video',
      size: '45.2 MB',
      duration: '5:30',
      uploadDate: '2024-01-14',
      usedIn: ['home', 'news'],
      url: '/videos/mosque-opening.mp4'
    },
    {
      id: 3,
      name: 'شعار الوزارة الرسمي',
      type: 'image',
      size: '512 KB',
      dimensions: '512x512',
      uploadDate: '2024-01-10',
      usedIn: ['header', 'footer', 'documents'],
      url: '/images/ministry-logo.png'
    }
  ];

  const seoMetrics = [
    { page: 'الصفحة الرئيسية', score: 95, issues: 0, suggestions: ['تحسين سرعة التحميل'] },
    { page: 'الأخبار', score: 93, issues: 1, suggestions: ['إضافة meta descriptions'] },
    { page: 'خطب الجمعة', score: 94, issues: 0, suggestions: ['تحسين الصور'] },
    { page: 'كلمة الوزير', score: 92, issues: 1, suggestions: ['تحسين العناوين'] },
    { page: 'الرؤية والرسالة', score: 90, issues: 2, suggestions: ['تحسين الروابط الداخلية'] }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'draft':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'archived':
        return <Database className="w-4 h-4 text-gray-500" />;
      default:
        return <Info className="w-4 h-4 text-gray-500" />;
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Website Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card-islamic">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-sage-600 font-body">إجمالي الصفحات</p>
              <p className="text-3xl font-bold text-islamic-700 font-display">{contentStats.totalPages}</p>
            </div>
            <FileText className="w-8 h-8 text-islamic-500" />
          </div>
        </div>
        
        <div className="card-golden">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-sage-600 font-body">صفحات منشورة</p>
              <p className="text-3xl font-bold text-golden-700 font-display">{contentStats.publishedPages}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-golden-500" />
          </div>
        </div>
        
        <div className="card-sage">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-sage-600 font-body">إجمالي المشاهدات</p>
              <p className="text-2xl font-bold text-sage-700 font-display">{contentStats.totalViews.toLocaleString()}</p>
            </div>
            <Eye className="w-8 h-8 text-sage-500" />
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-sage-600 font-body">متوسط SEO</p>
              <p className="text-3xl font-bold text-gray-700 font-display">{contentStats.averageSeoScore}%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-gray-500" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card-islamic">
        <h3 className="text-lg font-semibold text-islamic-800 mb-4 font-display">الإجراءات السريعة</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center p-4 border border-sage-200 rounded-lg hover:bg-islamic-50 transition-colors">
            <Plus className="w-8 h-8 text-islamic-600 mb-2" />
            <span className="text-sm font-medium text-islamic-800 font-body">إضافة صفحة</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-sage-200 rounded-lg hover:bg-islamic-50 transition-colors">
            <Upload className="w-8 h-8 text-golden-600 mb-2" />
            <span className="text-sm font-medium text-islamic-800 font-body">رفع وسائط</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-sage-200 rounded-lg hover:bg-islamic-50 transition-colors">
            <Settings className="w-8 h-8 text-sage-600 mb-2" />
            <span className="text-sm font-medium text-islamic-800 font-body">إعدادات الموقع</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-sage-200 rounded-lg hover:bg-islamic-50 transition-colors">
            <BarChart3 className="w-8 h-8 text-blue-600 mb-2" />
            <span className="text-sm font-medium text-islamic-800 font-body">تقرير الأداء</span>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card-golden">
          <h3 className="text-lg font-semibold text-golden-800 mb-4 font-display">النشاط الأخير</h3>
          <div className="space-y-3">
            {[
              { action: 'تم تحديث صفحة الأخبار', time: 'منذ 5 دقائق', user: 'أحمد محمد' },
              { action: 'تم إضافة خبر جديد', time: 'منذ 15 دقيقة', user: 'فاطمة أحمد' },
              { action: 'تم تحديث كلمة الوزير', time: 'منذ ساعة', user: 'محمد علي' },
              { action: 'تم رفع صورة جديدة', time: 'منذ ساعتين', user: 'سارة خالد' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                <div>
                  <p className="text-sm font-medium text-golden-800 font-body">{activity.action}</p>
                  <p className="text-xs text-sage-600 font-body">{activity.user}</p>
                </div>
                <span className="text-xs text-sage-500 font-body">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card-sage">
          <h3 className="text-lg font-semibold text-sage-800 mb-4 font-display">الصفحات الأكثر زيارة</h3>
          <div className="space-y-3">
            {websitePages
              .sort((a, b) => b.views - a.views)
              .slice(0, 5)
              .map((page) => (
                <div key={page.id} className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-sage-800 font-body">{page.name}</p>
                    <p className="text-xs text-sage-600 font-body">{page.url}</p>
                  </div>
                  <span className="text-sm font-bold text-sage-700 font-display">{page.views.toLocaleString()}</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderPagesManagement = () => (
    <div className="space-y-6">
      {/* Pages List */}
      <div className="card-islamic">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-islamic-800 font-display">إدارة الصفحات</h3>
          <button className="btn-primary">
            <Plus className="w-5 h-5 ml-2" />
            إضافة صفحة جديدة
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-islamic-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-islamic-700 uppercase tracking-wider font-body">
                  الصفحة
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-islamic-700 uppercase tracking-wider font-body">
                  النوع
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-islamic-700 uppercase tracking-wider font-body">
                  الحالة
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-islamic-700 uppercase tracking-wider font-body">
                  المشاهدات
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-islamic-700 uppercase tracking-wider font-body">
                  SEO
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-islamic-700 uppercase tracking-wider font-body">
                  آخر تحديث
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-islamic-700 uppercase tracking-wider font-body">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-sage-200">
              {websitePages.map((page) => (
                <tr key={page.id} className="hover:bg-islamic-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-islamic-800 font-body">{page.name}</div>
                      <div className="text-sm text-sage-600 font-body">{page.url}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      page.type === 'dynamic' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {page.type === 'dynamic' ? 'ديناميكية' : 'ثابتة'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      {getStatusIcon(page.status)}
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(page.status)}`}>
                        {page.status === 'published' ? 'منشورة' : page.status === 'draft' ? 'مسودة' : 'مؤرشفة'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-islamic-800 font-body">
                    {page.views.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
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
                      <span className="text-sm font-medium font-body">{page.seoScore}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-sage-600 font-body">
                    {new Date(page.lastModified).toLocaleDateString('ar-EG')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <button 
                        onClick={() => {
                          setSelectedPage(page);
                          setShowModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-700">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => setShowPreview(true)}
                        className="text-purple-600 hover:text-purple-700"
                      >
                        <Monitor className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderMediaManagement = () => (
    <div className="space-y-6">
      {/* Media Library */}
      <div className="card-islamic">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-islamic-800 font-display">مكتبة الوسائط</h3>
          <button className="btn-primary">
            <Upload className="w-5 h-5 ml-2" />
            رفع ملف جديد
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mediaLibrary.map((media) => (
            <div key={media.id} className="bg-white rounded-lg border border-sage-200 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gray-100 flex items-center justify-center">
                {media.type === 'image' ? (
                  <img src={media.url} alt={media.name} className="w-full h-full object-cover" />
                ) : media.type === 'video' ? (
                  <Video className="w-12 h-12 text-gray-400" />
                ) : (
                  <FileText className="w-12 h-12 text-gray-400" />
                )}
              </div>
              <div className="p-4">
                <h4 className="font-medium text-gray-800 mb-2 font-body line-clamp-1">{media.name}</h4>
                <div className="space-y-1 text-xs text-gray-600">
                  <p>الحجم: {media.size}</p>
                  {media.dimensions && <p>الأبعاد: {media.dimensions}</p>}
                  {media.duration && <p>المدة: {media.duration}</p>}
                  <p>تاريخ الرفع: {new Date(media.uploadDate).toLocaleDateString('ar-EG')}</p>
                </div>
                <div className="mt-3">
                  <p className="text-xs text-sage-600 font-body">مستخدم في: {media.usedIn.length} صفحة</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSEOManagement = () => (
    <div className="space-y-6">
      {/* SEO Overview */}
      <div className="card-islamic">
        <h3 className="text-lg font-semibold text-islamic-800 mb-6 font-display">تحسين محركات البحث</h3>
        
        <div className="space-y-4">
          {seoMetrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-lg border border-sage-200 p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-800 font-body">{metric.page}</h4>
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
                  <span className="text-sm font-bold font-body">{metric.score}%</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 space-x-reverse">
                  {metric.issues > 0 ? (
                    <AlertTriangle className="w-4 h-4 text-orange-500" />
                  ) : (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  )}
                  <span className="text-sm text-gray-600 font-body">
                    {metric.issues > 0 ? `${metric.issues} مشكلة` : 'لا توجد مشاكل'}
                  </span>
                </div>
                <button className="text-islamic-600 hover:text-islamic-700 text-sm font-medium font-body">
                  عرض التفاصيل
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      {/* Analytics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-islamic">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-sage-600 font-body">زوار اليوم</p>
              <p className="text-3xl font-bold text-islamic-700 font-display">1,247</p>
            </div>
            <Users className="w-8 h-8 text-islamic-500" />
          </div>
        </div>
        
        <div className="card-golden">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-sage-600 font-body">مشاهدات الصفحات</p>
              <p className="text-3xl font-bold text-golden-700 font-display">3,456</p>
            </div>
            <Eye className="w-8 h-8 text-golden-500" />
          </div>
        </div>
        
        <div className="card-sage">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-sage-600 font-body">معدل الارتداد</p>
              <p className="text-3xl font-bold text-sage-700 font-display">23%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-sage-500" />
          </div>
        </div>
      </div>

      {/* Top Pages */}
      <div className="card-golden">
        <h3 className="text-lg font-semibold text-golden-800 mb-4 font-display">أداء الصفحات</h3>
        <div className="space-y-3">
          {websitePages.slice(0, 6).map((page) => (
            <div key={page.id} className="flex items-center justify-between p-3 bg-white rounded-lg">
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="w-8 h-8 bg-golden-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-4 h-4 text-golden-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-golden-800 font-body">{page.name}</p>
                  <p className="text-xs text-sage-600 font-body">{page.url}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-golden-700 font-display">{page.views.toLocaleString()}</p>
                <p className="text-xs text-sage-600 font-body">مشاهدة</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'pages':
        return renderPagesManagement();
      case 'media':
        return renderMediaManagement();
      case 'seo':
        return renderSEOManagement();
      case 'analytics':
        return renderAnalytics();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="heading-1 text-islamic-800">إدارة الموقع الإلكتروني</h1>
          <p className="body-text text-sage-600 mt-2">نظام إدارة شامل لجميع صفحات ومحتويات الموقع</p>
        </div>
        <div className="flex items-center space-x-4 space-x-reverse">
          <button className="btn-secondary">
            <Download className="w-5 h-5 ml-2" />
            تصدير البيانات
          </button>
          <button className="btn-primary">
            <Save className="w-5 h-5 ml-2" />
            حفظ التغييرات
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-2xl shadow-elegant p-2">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 space-x-reverse px-6 py-3 rounded-xl transition-all duration-300 font-body ${
                activeTab === tab.id
                  ? 'bg-islamic-600 text-white shadow-islamic'
                  : 'text-sage-700 hover:bg-islamic-50 hover:text-islamic-700'
              }`}
            >
              <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-white' : tab.color}`} />
              <span className="font-medium">{tab.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {renderContent()}

      {/* Page Details Modal */}
      {showModal && selectedPage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="heading-2 text-islamic-800">تفاصيل الصفحة</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-sage-500 hover:text-sage-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-islamic-50 p-6 rounded-xl">
                  <h3 className="font-semibold text-islamic-800 mb-4 font-display">معلومات الصفحة</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-sage-500 font-body">اسم الصفحة</p>
                      <p className="font-medium font-body">{selectedPage.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-sage-500 font-body">الرابط</p>
                      <p className="font-medium font-body">{selectedPage.url}</p>
                    </div>
                    <div>
                      <p className="text-sm text-sage-500 font-body">النوع</p>
                      <p className="font-medium font-body">{selectedPage.type === 'dynamic' ? 'ديناميكية' : 'ثابتة'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-sage-500 font-body">آخر تحديث</p>
                      <p className="font-medium font-body">{new Date(selectedPage.lastModified).toLocaleDateString('ar-EG')}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-golden-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-golden-800 mb-3 font-display">أقسام الصفحة</h4>
                  <div className="space-y-2">
                    {selectedPage.sections.map((section: string, index: number) => (
                      <div key={index} className="flex items-center space-x-2 space-x-reverse">
                        <CheckCircle className="w-4 h-4 text-golden-600" />
                        <span className="text-sage-700 font-body">{section}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-sage-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-sage-800 mb-3 font-display">الإحصائيات</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-body text-sage-600">المشاهدات:</span>
                      <span className="font-bold text-sage-800 font-display">{selectedPage.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-body text-sage-600">نقاط SEO:</span>
                      <span className="font-bold text-sage-800 font-display">{selectedPage.seoScore}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-body text-sage-600">الحالة:</span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(selectedPage.status)}`}>
                        {selectedPage.status === 'published' ? 'منشورة' : selectedPage.status === 'draft' ? 'مسودة' : 'مؤرشفة'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <button className="w-full btn-primary">
                    <Edit className="w-5 h-5 ml-2" />
                    تحرير الصفحة
                  </button>
                  <button className="w-full btn-secondary">
                    <Eye className="w-5 h-5 ml-2" />
                    معاينة
                  </button>
                  <button className="w-full btn-outline">
                    <BarChart3 className="w-5 h-5 ml-2" />
                    تقرير مفصل
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WebsiteManagement;