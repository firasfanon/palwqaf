import React, { useState } from 'react';
import { 
  Bell, 
  Search, 
  Filter, 
  Eye, 
  EyeOff, 
  Trash2, 
  Settings,
  CheckCircle,
  AlertTriangle,
  Info,
  XCircle,
  Clock,
  User,
  Building,
  Calendar,
  FileText,
  Heart,
  Star,
  Target,
  Award,
  TrendingUp,
  Activity,
  Zap,
  Globe,
  Mail,
  Phone,
  MessageSquare,
  Send,
  Archive,
  Bookmark,
  Share2,
  Download,
  Plus,
  Edit,
  RefreshCw,
  Volume2,
  VolumeX,
  Smartphone,
  Monitor,
  Tablet
} from 'lucide-react';

const NotificationsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showSettings, setShowSettings] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const notifications = [
    {
      id: 1,
      title: 'تم إضافة خبر جديد: افتتاح المسجد الجديد',
      message: 'تم نشر خبر جديد حول افتتاح المسجد الجديد في حي الزيتون بغزة',
      type: 'news',
      priority: 'normal',
      isRead: false,
      createdAt: '2024-01-15T10:30:00',
      relatedTo: { type: 'news', id: 1 },
      sender: 'نظام الأخبار',
      actions: ['عرض الخبر', 'مشاركة']
    },
    {
      id: 2,
      title: 'إعلان عاجل: إغلاق استثنائي للمسجد الأقصى',
      message: 'تم نشر إعلان عاجل حول الإغلاق الاستثنائي للمسجد الأقصى يوم الجمعة القادم',
      type: 'announcement',
      priority: 'urgent',
      isRead: false,
      createdAt: '2024-01-15T09:15:00',
      relatedTo: { type: 'announcement', id: 1 },
      sender: 'إدارة الإعلانات',
      actions: ['عرض الإعلان', 'إشعار المستخدمين']
    },
    {
      id: 3,
      title: 'تذكير: اجتماع لجنة الأوقاف غداً',
      message: 'تذكير بموعد اجتماع لجنة الأوقاف المقرر غداً في تمام الساعة 10:00 صباحاً',
      type: 'reminder',
      priority: 'high',
      isRead: true,
      createdAt: '2024-01-14T16:00:00',
      relatedTo: { type: 'appointment', id: 1 },
      sender: 'نظام المواعيد',
      actions: ['عرض التفاصيل', 'تأكيد الحضور']
    },
    {
      id: 4,
      title: 'تم تحديث بيانات وقف الزيتون',
      message: 'تم تحديث المعلومات المالية والإدارية لوقف الزيتون التجاري في رام الله',
      type: 'update',
      priority: 'normal',
      isRead: true,
      createdAt: '2024-01-14T14:20:00',
      relatedTo: { type: 'waqf_land', id: 2 },
      sender: 'إدارة الأوقاف',
      actions: ['عرض التحديثات', 'تحميل التقرير']
    },
    {
      id: 5,
      title: 'تنبيه أمني: محاولة دخول غير مصرح',
      message: 'تم رصد محاولة دخول غير مصرح بها إلى النظام من عنوان IP غير معروف',
      type: 'security',
      priority: 'urgent',
      isRead: false,
      createdAt: '2024-01-14T11:45:00',
      relatedTo: { type: 'security', id: 1 },
      sender: 'نظام الأمان',
      actions: ['عرض التفاصيل', 'تعزيز الأمان']
    },
    {
      id: 6,
      title: 'تم رفع وثيقة جديدة: سند ملكية المقبرة',
      message: 'تم رفع وثيقة جديدة تخص سند ملكية المقبرة الشرقية في نابلس',
      type: 'document',
      priority: 'normal',
      isRead: true,
      createdAt: '2024-01-13T13:30:00',
      relatedTo: { type: 'document', id: 5 },
      sender: 'إدارة الوثائق',
      actions: ['عرض الوثيقة', 'تحميل']
    },
    {
      id: 7,
      title: 'مستخدم جديد: طلب صلاحيات وصول',
      message: 'مستخدم جديد يطلب صلاحيات الوصول لنظام إدارة القضايا في محافظة الخليل',
      type: 'user',
      priority: 'normal',
      isRead: false,
      createdAt: '2024-01-13T10:15:00',
      relatedTo: { type: 'user', id: 8 },
      sender: 'إدارة المستخدمين',
      actions: ['مراجعة الطلب', 'منح الصلاحيات']
    },
    {
      id: 8,
      title: 'تقرير شهري: إحصائيات ديسمبر 2023',
      message: 'تم إنتاج التقرير الشهري لإحصائيات الأوقاف والمساجد لشهر ديسمبر 2023',
      type: 'report',
      priority: 'low',
      isRead: true,
      createdAt: '2024-01-12T08:00:00',
      relatedTo: { type: 'report', id: 1 },
      sender: 'نظام التقارير',
      actions: ['عرض التقرير', 'تحميل PDF']
    }
  ];

  const notificationTypes = [
    { id: 'all', name: 'جميع الإشعارات', icon: Bell, color: 'text-islamic-600' },
    { id: 'news', name: 'الأخبار', icon: FileText, color: 'text-blue-600' },
    { id: 'announcement', name: 'الإعلانات', icon: AlertTriangle, color: 'text-orange-600' },
    { id: 'reminder', name: 'التذكيرات', icon: Clock, color: 'text-purple-600' },
    { id: 'update', name: 'التحديثات', icon: RefreshCw, color: 'text-green-600' },
    { id: 'security', name: 'الأمان', icon: Shield, color: 'text-red-600' },
    { id: 'document', name: 'الوثائق', icon: Archive, color: 'text-teal-600' },
    { id: 'user', name: 'المستخدمين', icon: User, color: 'text-pink-600' },
    { id: 'report', name: 'التقارير', icon: BarChart3, color: 'text-indigo-600' }
  ];

  const statusOptions = [
    { id: 'all', name: 'جميع الحالات' },
    { id: 'unread', name: 'غير مقروءة' },
    { id: 'read', name: 'مقروءة' },
    { id: 'archived', name: 'مؤرشفة' }
  ];

  const getTypeIcon = (type: string) => {
    const notificationType = notificationTypes.find(t => t.id === type);
    return notificationType ? notificationType.icon : Bell;
  };

  const getTypeColor = (type: string) => {
    const notificationType = notificationTypes.find(t => t.id === type);
    return notificationType ? notificationType.color : 'text-gray-600';
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800 border border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border border-orange-200';
      case 'normal':
        return 'bg-blue-100 text-blue-800 border border-blue-200';
      case 'low':
        return 'bg-gray-100 text-gray-800 border border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'high':
        return <Star className="w-4 h-4 text-orange-500" />;
      case 'normal':
        return <Info className="w-4 h-4 text-blue-500" />;
      case 'low':
        return <CheckCircle className="w-4 h-4 text-gray-500" />;
      default:
        return <Info className="w-4 h-4 text-gray-500" />;
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || notification.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || 
                         (selectedStatus === 'read' && notification.isRead) ||
                         (selectedStatus === 'unread' && !notification.isRead);
    return matchesSearch && matchesType && matchesStatus;
  });

  const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentNotifications = filteredNotifications.slice(startIndex, startIndex + itemsPerPage);

  const markAsRead = (id: number) => {
    // تحديث حالة القراءة
    console.log('Mark as read:', id);
  };

  const markAllAsRead = () => {
    // تحديد جميع الإشعارات كمقروءة
    console.log('Mark all as read');
  };

  const deleteNotification = (id: number) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الإشعار؟')) {
      console.log('Delete notification:', id);
    }
  };

  // حساب الإحصائيات
  const totalNotifications = notifications.length;
  const unreadCount = notifications.filter(n => !n.isRead).length;
  const urgentCount = notifications.filter(n => n.priority === 'urgent').length;
  const todayCount = notifications.filter(n => {
    const today = new Date();
    const notificationDate = new Date(n.createdAt);
    return notificationDate.toDateString() === today.toDateString();
  }).length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="heading-1 text-islamic-800">مركز الإشعارات</h1>
          <p className="body-text text-sage-600 mt-2">إدارة ومتابعة جميع إشعارات النظام والتنبيهات</p>
        </div>
        <div className="flex items-center space-x-4 space-x-reverse">
          <button 
            onClick={() => setShowSettings(true)}
            className="btn-secondary"
          >
            <Settings className="w-5 h-5 ml-2" />
            إعدادات الإشعارات
          </button>
          <button 
            onClick={markAllAsRead}
            className="btn-primary"
          >
            <CheckCircle className="w-5 h-5 ml-2" />
            تحديد الكل كمقروء
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card-islamic">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-sage-600 font-body">إجمالي الإشعارات</p>
              <p className="text-3xl font-bold text-islamic-700 font-display">{totalNotifications}</p>
            </div>
            <Bell className="w-8 h-8 text-islamic-500" />
          </div>
        </div>
        
        <div className="card-golden">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-sage-600 font-body">غير مقروءة</p>
              <p className="text-3xl font-bold text-golden-700 font-display">{unreadCount}</p>
            </div>
            <EyeOff className="w-8 h-8 text-golden-500" />
          </div>
        </div>
        
        <div className="card-sage">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-sage-600 font-body">عاجلة</p>
              <p className="text-3xl font-bold text-sage-700 font-display">{urgentCount}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-sage-500" />
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-sage-600 font-body">اليوم</p>
              <p className="text-3xl font-bold text-gray-700 font-display">{todayCount}</p>
            </div>
            <Clock className="w-8 h-8 text-gray-500" />
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl shadow-elegant p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute right-3 top-3 h-5 w-5 text-sage-400" />
            <input
              type="text"
              placeholder="البحث في الإشعارات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input pr-10"
            />
          </div>
          
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="form-select"
          >
            {notificationTypes.map(type => (
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
          
          <button className="btn-primary">
            <Filter className="w-5 h-5 ml-2" />
            فلاتر متقدمة
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-2xl shadow-elegant overflow-hidden">
        <div className="p-6 border-b border-sage-200">
          <h3 className="text-lg font-semibold text-islamic-800 font-display">
            الإشعارات ({filteredNotifications.length})
          </h3>
        </div>
        
        <div className="divide-y divide-sage-200">
          {currentNotifications.map((notification) => {
            const TypeIcon = getTypeIcon(notification.type);
            return (
              <div
                key={notification.id}
                className={`p-6 hover:bg-islamic-50 transition-colors ${
                  !notification.isRead ? 'bg-blue-50 border-r-4 border-islamic-500' : ''
                }`}
              >
                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    notification.priority === 'urgent' ? 'bg-red-100' :
                    notification.priority === 'high' ? 'bg-orange-100' :
                    'bg-islamic-100'
                  }`}>
                    <TypeIcon className={`w-6 h-6 ${getTypeColor(notification.type)}`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <h4 className={`font-semibold font-display ${
                          !notification.isRead ? 'text-islamic-800' : 'text-sage-800'
                        }`}>
                          {notification.title}
                        </h4>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          {getPriorityIcon(notification.priority)}
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityBadge(notification.priority)}`}>
                            {notification.priority === 'urgent' ? 'عاجل' :
                             notification.priority === 'high' ? 'مهم' :
                             notification.priority === 'normal' ? 'عادي' : 'منخفض'}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <span className="text-sm text-sage-500 font-body">
                          {new Date(notification.createdAt).toLocaleString('ar-EG')}
                        </span>
                        {!notification.isRead && (
                          <div className="w-3 h-3 bg-islamic-500 rounded-full animate-pulse"></div>
                        )}
                      </div>
                    </div>
                    
                    <p className={`font-body mb-3 ${
                      !notification.isRead ? 'text-sage-700' : 'text-sage-600'
                    }`}>
                      {notification.message}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <span className="text-sm text-sage-500 font-body">من: {notification.sender}</span>
                        {notification.relatedTo && (
                          <span className="text-xs bg-sage-100 text-sage-700 px-2 py-1 rounded-full">
                            {notification.relatedTo.type}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2 space-x-reverse">
                        {notification.actions.map((action, index) => (
                          <button
                            key={index}
                            className="text-islamic-600 hover:text-islamic-700 text-sm font-medium font-body"
                          >
                            {action}
                          </button>
                        ))}
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="text-blue-600 hover:text-blue-700"
                          title={notification.isRead ? 'تحديد كغير مقروء' : 'تحديد كمقروء'}
                        >
                          {notification.isRead ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="text-red-600 hover:text-red-700"
                          title="حذف الإشعار"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

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

      {/* Notification Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="heading-2 text-islamic-800">إعدادات الإشعارات</h2>
              <button
                onClick={() => setShowSettings(false)}
                className="text-sage-500 hover:text-sage-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="card-islamic">
                <h3 className="font-semibold text-islamic-800 mb-4 font-display">تفضيلات الإشعارات</h3>
                <div className="space-y-4">
                  {notificationTypes.slice(1).map((type) => (
                    <div key={type.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <type.icon className={`w-5 h-5 ${type.color}`} />
                        <span className="font-body">{type.name}</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-islamic-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-islamic-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card-golden">
                <h3 className="font-semibold text-golden-800 mb-4 font-display">طرق التنبيه</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <Monitor className="w-5 h-5 text-golden-600" />
                      <span className="font-body">إشعارات المتصفح</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-golden-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-golden-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <Mail className="w-5 h-5 text-golden-600" />
                      <span className="font-body">البريد الإلكتروني</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-golden-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-golden-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <Smartphone className="w-5 h-5 text-golden-600" />
                      <span className="font-body">الرسائل النصية</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-golden-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-golden-600"></div>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-4 space-x-reverse">
                <button
                  onClick={() => setShowSettings(false)}
                  className="btn-outline"
                >
                  إلغاء
                </button>
                <button className="btn-primary">
                  <Save className="w-5 h-5 ml-2" />
                  حفظ الإعدادات
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;