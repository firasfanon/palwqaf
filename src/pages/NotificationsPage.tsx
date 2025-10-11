import React, { useState, useEffect } from 'react';
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
  Tablet,
  Save
} from 'lucide-react';
import { useToast } from '../hooks/useToast';

const NotificationsPage = () => {
  const { success, info, error: showError } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [showSettings, setShowSettings] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'list' | 'cards'>('cards');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedNotifications, setSelectedNotifications] = useState<number[]>([]);
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    soundEnabled: true,
    desktopNotifications: true,
    mobileNotifications: true,
    emailDigest: 'daily',
    quietHours: { start: '22:00', end: '07:00' },
    categories: {
      news: true,
      announcements: true,
      reminders: true,
      updates: true,
      security: true,
      documents: true,
      users: true,
      reports: false
    }
  });
  const itemsPerPage = 10;

  const notifications = [
    {
      id: 1,
      title: 'تم إضافة خبر جديد: افتتاح المسجد الجديد',
      message: 'تم نشر خبر جديد حول افتتاح المسجد الجديد في حي الزيتون بغزة بحضور معالي الوزير',
      type: 'news',
      priority: 'normal',
      isRead: false,
      createdAt: '2024-01-15T10:30:00',
      relatedTo: { type: 'news', id: 1 },
      sender: 'نظام الأخبار',
      actions: ['عرض الخبر', 'مشاركة'],
      category: 'content',
      importance: 'medium'
    },
    {
      id: 2,
      title: 'إعلان عاجل: إغلاق استثنائي للمسجد الأقصى',
      message: 'تم نشر إعلان عاجل حول الإغلاق الاستثنائي للمسجد الأقصى يوم الجمعة القادم لأعمال الصيانة الطارئة',
      type: 'announcement',
      priority: 'urgent',
      isRead: false,
      createdAt: '2024-01-15T09:15:00',
      relatedTo: { type: 'announcement', id: 1 },
      sender: 'إدارة الإعلانات',
      actions: ['عرض الإعلان', 'إشعار المستخدمين'],
      category: 'urgent',
      importance: 'high'
    },
    {
      id: 3,
      title: 'تذكير: اجتماع لجنة الأوقاف غداً',
      message: 'تذكير بموعد اجتماع لجنة الأوقاف المقرر غداً في تمام الساعة 10:00 صباحاً في قاعة الاجتماعات الرئيسية',
      type: 'reminder',
      priority: 'high',
      isRead: true,
      createdAt: '2024-01-14T16:00:00',
      relatedTo: { type: 'appointment', id: 1 },
      sender: 'نظام المواعيد',
      actions: ['عرض التفاصيل', 'تأكيد الحضور'],
      category: 'meetings',
      importance: 'high'
    },
    {
      id: 4,
      title: 'تم تحديث بيانات وقف الزيتون',
      message: 'تم تحديث المعلومات المالية والإدارية لوقف الزيتون التجاري في رام الله مع إضافة تقرير الإيرادات الجديد',
      type: 'update',
      priority: 'normal',
      isRead: true,
      createdAt: '2024-01-14T14:20:00',
      relatedTo: { type: 'waqf_land', id: 2 },
      sender: 'إدارة الأوقاف',
      actions: ['عرض التحديثات', 'تحميل التقرير'],
      category: 'data',
      importance: 'medium'
    },
    {
      id: 5,
      title: 'تنبيه أمني: محاولة دخول غير مصرح',
      message: 'تم رصد محاولة دخول غير مصرح بها إلى النظام من عنوان IP غير معروف. تم حظر المحاولة تلقائياً',
      type: 'security',
      priority: 'urgent',
      isRead: false,
      createdAt: '2024-01-14T11:45:00',
      relatedTo: { type: 'security', id: 1 },
      sender: 'نظام الأمان',
      actions: ['عرض التفاصيل', 'تعزيز الأمان'],
      category: 'security',
      importance: 'critical'
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

  const priorityOptions = [
    { id: 'all', name: 'جميع الأولويات' },
    { id: 'urgent', name: 'عاجل' },
    { id: 'high', name: 'مهم' },
    { id: 'normal', name: 'عادي' },
    { id: 'low', name: 'منخفض' }
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
    const matchesPriority = selectedPriority === 'all' || notification.priority === selectedPriority;
    return matchesSearch && matchesType && matchesStatus && matchesPriority;
  });

  const sortedNotifications = [...filteredNotifications].sort((a, b) => {
    let aValue, bValue;
    switch (sortBy) {
      case 'title':
        aValue = a.title;
        bValue = b.title;
        break;
      case 'priority':
        const priorityOrder = { urgent: 4, high: 3, normal: 2, low: 1 };
        aValue = priorityOrder[a.priority as keyof typeof priorityOrder];
        bValue = priorityOrder[b.priority as keyof typeof priorityOrder];
        break;
      case 'type':
        aValue = a.type;
        bValue = b.type;
        break;
      default:
        aValue = new Date(a.createdAt);
        bValue = new Date(b.createdAt);
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const totalPages = Math.ceil(sortedNotifications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentNotifications = sortedNotifications.slice(startIndex, startIndex + itemsPerPage);

  const markAsRead = (id: number) => {
    success('تم تحديد الإشعار كمقروء', 'تم تحديث حالة الإشعار بنجاح');
  };

  const markAllAsRead = () => {
    success('تم تحديد جميع الإشعارات كمقروءة', 'تم تحديث جميع الإشعارات بنجاح');
  };

  const deleteNotification = (id: number) => {
    if (window.confirm('هل أنت متأكد من حذف هذا الإشعار؟')) {
      success('تم حذف الإشعار', 'تم حذف الإشعار بنجاح');
    }
  };

  const handleBulkAction = (action: string) => {
    if (selectedNotifications.length === 0) {
      showError('لم يتم تحديد إشعارات', 'يرجى تحديد إشعار واحد على الأقل');
      return;
    }

    switch (action) {
      case 'mark_read':
        success('تم تحديد الإشعارات كمقروءة', `تم تحديث ${selectedNotifications.length} إشعار`);
        break;
      case 'archive':
        success('تم أرشفة الإشعارات', `تم أرشفة ${selectedNotifications.length} إشعار`);
        break;
      case 'delete':
        if (window.confirm(`هل أنت متأكد من حذف ${selectedNotifications.length} إشعار؟`)) {
          success('تم حذف الإشعارات', `تم حذف ${selectedNotifications.length} إشعار`);
        }
        break;
    }
    setSelectedNotifications([]);
  };

  const saveSettings = () => {
    localStorage.setItem('notificationSettings', JSON.stringify(notificationSettings));
    success('تم حفظ الإعدادات', 'تم حفظ إعدادات الإشعارات بنجاح');
    setShowSettings(false);
  };

  // تحميل الإعدادات المحفوظة
  useEffect(() => {
    const savedSettings = localStorage.getItem('notificationSettings');
    if (savedSettings) {
      setNotificationSettings(JSON.parse(savedSettings));
    }
  }, []);

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
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="islamic-gradient text-white rounded-2xl p-8 mb-8 islamic-pattern">
          <div className="text-center">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl animate-float">
              <Bell className="w-12 h-12 text-islamic-600" />
            </div>
            <h1 className="heading-1 text-white mb-4">مركز الإشعارات</h1>
            <p className="body-large text-golden-200 max-w-4xl mx-auto">
              إدارة ومتابعة جميع إشعارات النظام مع أدوات متقدمة للتحكم والتخصيص
            </p>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
        <div className="bg-white rounded-2xl shadow-elegant p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4">
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
            
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="form-select"
            >
              {priorityOptions.map(priority => (
                <option key={priority.id} value={priority.id}>{priority.name}</option>
              ))}
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="form-select"
            >
              <option value="date">التاريخ</option>
              <option value="title">العنوان</option>
              <option value="priority">الأولوية</option>
              <option value="type">النوع</option>
            </select>
            
            <div className="flex items-center space-x-2 space-x-reverse">
              <button
                onClick={() => setViewMode('cards')}
                className={`p-2 rounded-lg ${viewMode === 'cards' ? 'bg-islamic-600 text-white' : 'bg-gray-200 text-gray-600'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-islamic-600 text-white' : 'bg-gray-200 text-gray-600'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedNotifications.length > 0 && (
            <div className="bg-islamic-50 border border-islamic-200 rounded-xl p-4 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-islamic-800 font-body">
                  تم تحديد {selectedNotifications.length} إشعار
                </span>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <button 
                    onClick={() => handleBulkAction('mark_read')}
                    className="btn-primary text-sm px-3 py-1"
                  >
                    تحديد كمقروء
                  </button>
                  <button 
                    onClick={() => handleBulkAction('archive')}
                    className="btn-secondary text-sm px-3 py-1"
                  >
                    أرشفة
                  </button>
                  <button 
                    onClick={() => handleBulkAction('delete')}
                    className="bg-red-600 text-white text-sm px-3 py-1 rounded-lg hover:bg-red-700"
                  >
                    حذف
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 space-x-reverse">
              <button 
                onClick={markAllAsRead}
                className="btn-primary"
              >
                <CheckCircle className="w-5 h-5 ml-2" />
                تحديد الكل كمقروء
              </button>
              <button 
                onClick={() => setShowSettings(true)}
                className="btn-secondary"
              >
                <Settings className="w-5 h-5 ml-2" />
                إعدادات الإشعارات
              </button>
            </div>
            <div className="text-sm text-sage-600 font-body">
              عرض {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredNotifications.length)} من {filteredNotifications.length}
            </div>
          </div>
        </div>

        {/* Notifications Display */}
        {viewMode === 'cards' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {currentNotifications.map((notification) => {
              const TypeIcon = getTypeIcon(notification.type);
              return (
                <div
                  key={notification.id}
                  className={`card-islamic hover-lift ${
                    !notification.isRead ? 'border-r-4 border-islamic-500 bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        notification.priority === 'urgent' ? 'bg-red-100' :
                        notification.priority === 'high' ? 'bg-orange-100' :
                        'bg-islamic-100'
                      }`}>
                        <TypeIcon className={`w-6 h-6 ${getTypeColor(notification.type)}`} />
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-semibold font-display ${
                          !notification.isRead ? 'text-islamic-800' : 'text-sage-800'
                        }`}>
                          {notification.title}
                        </h4>
                        <div className="flex items-center space-x-2 space-x-reverse mt-1">
                          {getPriorityIcon(notification.priority)}
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityBadge(notification.priority)}`}>
                            {notification.priority === 'urgent' ? 'عاجل' :
                             notification.priority === 'high' ? 'مهم' :
                             notification.priority === 'normal' ? 'عادي' : 'منخفض'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={selectedNotifications.includes(notification.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedNotifications(prev => [...prev, notification.id]);
                        } else {
                          setSelectedNotifications(prev => prev.filter(id => id !== notification.id));
                        }
                      }}
                      className="rounded border-islamic-300 text-islamic-600 focus:ring-islamic-500"
                    />
                  </div>
                  
                  <p className={`font-body mb-4 ${
                    !notification.isRead ? 'text-sage-700' : 'text-sage-600'
                  }`}>
                    {notification.message}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <span className="text-sm text-sage-500 font-body">من: {notification.sender}</span>
                      {notification.relatedTo && (
                        <span className="text-xs bg-sage-100 text-sage-700 px-2 py-1 rounded-full">
                          {notification.relatedTo.type}
                        </span>
                      )}
                    </div>
                    {!notification.isRead && (
                      <div className="w-3 h-3 bg-islamic-500 rounded-full animate-pulse"></div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-sage-200">
                    <span className="text-xs text-sage-500 font-body">
                      {new Date(notification.createdAt).toLocaleString('ar-EG')}
                    </span>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="text-blue-600 hover:text-blue-700"
                        title={notification.isRead ? 'تحديد كغير مقروء' : 'تحديد كمقروء'}
                      >
                        {notification.isRead ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <button className="text-green-600 hover:text-green-700">
                        <Bookmark className="w-4 h-4" />
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
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-elegant overflow-hidden mb-8">
            <div className="p-6 border-b border-sage-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-islamic-800 font-display">
                  الإشعارات ({filteredNotifications.length})
                </h3>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <input
                    type="checkbox"
                    checked={selectedNotifications.length === currentNotifications.length && currentNotifications.length > 0}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedNotifications(currentNotifications.map(n => n.id));
                      } else {
                        setSelectedNotifications([]);
                      }
                    }}
                    className="rounded border-islamic-300 text-islamic-600 focus:ring-islamic-500"
                  />
                  <span className="text-sm text-sage-600 font-body">تحديد الكل</span>
                </div>
              </div>
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
                      <input
                        type="checkbox"
                        checked={selectedNotifications.includes(notification.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedNotifications(prev => [...prev, notification.id]);
                          } else {
                            setSelectedNotifications(prev => prev.filter(id => id !== notification.id));
                          }
                        }}
                        className="mt-1 rounded border-islamic-300 text-islamic-600 focus:ring-islamic-500"
                      />
                      
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
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mb-8">
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
            <div className="bg-white rounded-2xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="heading-2 text-islamic-800">إعدادات الإشعارات المتقدمة</h2>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-sage-500 hover:text-sage-700 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-8">
                {/* طرق التنبيه */}
                <div className="card-islamic">
                  <h3 className="font-semibold text-islamic-800 mb-4 font-display">طرق التنبيه</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="flex items-center justify-between p-4 border border-sage-200 rounded-lg">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <Mail className="w-5 h-5 text-blue-600" />
                        <span className="font-body">البريد الإلكتروني</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={notificationSettings.emailNotifications}
                        onChange={(e) => setNotificationSettings(prev => ({
                          ...prev,
                          emailNotifications: e.target.checked
                        }))}
                        className="rounded border-islamic-300 text-islamic-600 focus:ring-islamic-500"
                      />
                    </label>
                    
                    <label className="flex items-center justify-between p-4 border border-sage-200 rounded-lg">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <Bell className="w-5 h-5 text-green-600" />
                        <span className="font-body">إشعارات المتصفح</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={notificationSettings.pushNotifications}
                        onChange={(e) => setNotificationSettings(prev => ({
                          ...prev,
                          pushNotifications: e.target.checked
                        }))}
                        className="rounded border-islamic-300 text-islamic-600 focus:ring-islamic-500"
                      />
                    </label>
                    
                    <label className="flex items-center justify-between p-4 border border-sage-200 rounded-lg">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <MessageSquare className="w-5 h-5 text-purple-600" />
                        <span className="font-body">الرسائل النصية</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={notificationSettings.smsNotifications}
                        onChange={(e) => setNotificationSettings(prev => ({
                          ...prev,
                          smsNotifications: e.target.checked
                        }))}
                        className="rounded border-islamic-300 text-islamic-600 focus:ring-islamic-500"
                      />
                    </label>
                    
                    <label className="flex items-center justify-between p-4 border border-sage-200 rounded-lg">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <Volume2 className="w-5 h-5 text-orange-600" />
                        <span className="font-body">الأصوات</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={notificationSettings.soundEnabled}
                        onChange={(e) => setNotificationSettings(prev => ({
                          ...prev,
                          soundEnabled: e.target.checked
                        }))}
                        className="rounded border-islamic-300 text-islamic-600 focus:ring-islamic-500"
                      />
                    </label>
                  </div>
                </div>

                {/* فئات الإشعارات */}
                <div className="card-golden">
                  <h3 className="font-semibold text-golden-800 mb-4 font-display">فئات الإشعارات</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {notificationTypes.slice(1).map((type) => (
                      <label key={type.id} className="flex items-center justify-between p-4 border border-sage-200 rounded-lg">
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <type.icon className={`w-5 h-5 ${type.color}`} />
                          <span className="font-body">{type.name}</span>
                        </div>
                        <input
                          type="checkbox"
                          checked={notificationSettings.categories[type.id as keyof typeof notificationSettings.categories]}
                          onChange={(e) => setNotificationSettings(prev => ({
                            ...prev,
                            categories: {
                              ...prev.categories,
                              [type.id]: e.target.checked
                            }
                          }))}
                          className="rounded border-islamic-300 text-islamic-600 focus:ring-islamic-500"
                        />
                      </label>
                    ))}
                  </div>
                </div>

                {/* إعدادات متقدمة */}
                <div className="card-sage">
                  <h3 className="font-semibold text-sage-800 mb-4 font-display">إعدادات متقدمة</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-sage-700 mb-2 font-body">ملخص البريد الإلكتروني</label>
                      <select
                        value={notificationSettings.emailDigest}
                        onChange={(e) => setNotificationSettings(prev => ({
                          ...prev,
                          emailDigest: e.target.value
                        }))}
                        className="form-select"
                      >
                        <option value="never">أبداً</option>
                        <option value="daily">يومي</option>
                        <option value="weekly">أسبوعي</option>
                        <option value="monthly">شهري</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-sage-700 mb-2 font-body">ساعات الهدوء</label>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <input
                          type="time"
                          value={notificationSettings.quietHours.start}
                          onChange={(e) => setNotificationSettings(prev => ({
                            ...prev,
                            quietHours: { ...prev.quietHours, start: e.target.value }
                          }))}
                          className="form-input"
                        />
                        <span className="text-sage-600">إلى</span>
                        <input
                          type="time"
                          value={notificationSettings.quietHours.end}
                          onChange={(e) => setNotificationSettings(prev => ({
                            ...prev,
                            quietHours: { ...prev.quietHours, end: e.target.value }
                          }))}
                          className="form-input"
                        />
                      </div>
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
                  <button
                    onClick={saveSettings}
                    className="btn-primary"
                  >
                    <Save className="w-5 h-5 ml-2" />
                    حفظ الإعدادات
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;