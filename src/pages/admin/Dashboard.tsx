import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  MapPin, 
  Gavel, 
  FileText, 
  Users, 
  Calendar, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  DollarSign, 
  RefreshCw, 
  Building, 
  Eye, 
  Activity, 
  Bell, 
  Download, 
  Settings, 
  Globe, 
  Shield, 
  Zap, 
  Database, 
  HardDrive, 
  Cpu, 
  MemoryStick, 
  Network, 
  Wifi, 
  WifiOff, 
  Server, 
  Monitor, 
  Smartphone, 
  Tablet, 
  Plus, 
  Minus, 
  ArrowUp, 
  ArrowDown, 
  Target, 
  Award, 
  Star, 
  Heart, 
  Bookmark, 
  Share2, 
  Filter as FilterIcon, 
  Search, 
  Grid, 
  List, 
  PieChart, 
  LineChart, 
  AreaChart,
  Home,
  Archive,
  Key,
  Lock,
  Unlock,
  Crown,
  Gem,
  Sparkles,
  Navigation,
  Compass,
  Flag,
  Layers,
  TreePine,
  Mountain,
  Sunrise,
  Sunset,
  CloudRain,
  Sun,
  Moon,
  Wind,
  Thermometer,
  Briefcase,
  GraduationCap,
  HandHeart,
  Calculator,
  Headphones,
  Video,
  Image as ImageIcon,
  Mic,
  Camera,
  Printer,
  Send,
  MessageSquare,
  ThumbsUp,
  Megaphone,
  Volume2,
  VolumeX,
  Rss,
  ExternalLink,
  Copy,
  Save as SaveIcon,
  Upload,
  FolderOpen,
  Tag,
  Link as LinkIcon,
  Hash,
  AtSign,
  Percent,
  Hash as HashIcon,
  TrendingDown,
  BarChart,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon
} from 'lucide-react';
import { 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell, 
  LineChart as RechartsLineChart, 
  Line, 
  AreaChart as RechartsAreaChart,
  Area,
  ComposedChart,
  Legend
} from 'recharts';
import QuickActions from '../../components/Features/QuickActions';
import SystemStatus from '../../components/Features/SystemStatus';
import RecentActivity from '../../components/Features/RecentActivity';
import { useToast } from '../../hooks/useToast';
import { useDashboardStats } from '../../hooks/useDatabase';

const Dashboard: React.FC = () => {
  const { success, info, error: showError } = useToast();
  const { stats, loading, error, refetch } = useDashboardStats();
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('overview');
  const [viewMode, setViewMode] = useState<'charts' | 'tables'>('charts');
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState(30);
  const [showAdvancedMetrics, setShowAdvancedMetrics] = useState(false);
  const [selectedDashboard, setSelectedDashboard] = useState('main');
  const [customWidgets, setCustomWidgets] = useState<string[]>(['stats', 'charts', 'activity', 'system']);
  const [dashboardLayout, setDashboardLayout] = useState('default');

  // لوحات التحكم المختلفة
  const dashboardTypes = [
    { id: 'main', name: 'الرئيسية', icon: Home, description: 'نظرة عامة شاملة' },
    { id: 'financial', name: 'المالية', icon: DollarSign, description: 'التقارير المالية والإيرادات' },
    { id: 'operations', name: 'العمليات', icon: Settings, description: 'إدارة العمليات اليومية' },
    { id: 'analytics', name: 'التحليلات', icon: BarChart3, description: 'تحليلات متقدمة ومؤشرات الأداء' },
    { id: 'security', name: 'الأمان', icon: Shield, description: 'مراقبة الأمان والتهديدات' },
    { id: 'performance', name: 'الأداء', icon: TrendingUp, description: 'مؤشرات الأداء والكفاءة' }
  ];

  // بيانات تجريبية للإحصائيات المتقدمة
  const advancedStatsData = [
    { 
      title: 'إجمالي الأراضي الوقفية', 
      value: '1,247', 
      change: '+12', 
      icon: MapPin, 
      color: 'bg-blue-500',
      trend: 'up',
      percentage: 2.4,
      target: 1300,
      description: 'أراضي وقفية مسجلة ومدارة',
      chartData: [
        { month: 'يناير', value: 1200 },
        { month: 'فبراير', value: 1215 },
        { month: 'مارس', value: 1230 },
        { month: 'أبريل', value: 1235 },
        { month: 'مايو', value: 1240 },
        { month: 'يونيو', value: 1247 }
      ]
    },
    { 
      title: 'القضايا النشطة', 
      value: '89', 
      change: '-5', 
      icon: Gavel, 
      color: 'bg-red-500',
      trend: 'down',
      percentage: -5.3,
      target: 80,
      description: 'قضايا تحتاج متابعة ومعالجة',
      chartData: [
        { month: 'يناير', value: 95 },
        { month: 'فبراير', value: 92 },
        { month: 'مارس', value: 90 },
        { month: 'أبريل', value: 94 },
        { month: 'مايو', value: 91 },
        { month: 'يونيو', value: 89 }
      ]
    },
    { 
      title: 'الوثائق المؤرشفة', 
      value: '15,432', 
      change: '+234', 
      icon: FileText, 
      color: 'bg-green-500',
      trend: 'up',
      percentage: 1.5,
      target: 16000,
      description: 'وثائق مرقمنة ومفهرسة',
      chartData: [
        { month: 'يناير', value: 14800 },
        { month: 'فبراير', value: 14950 },
        { month: 'مارس', value: 15100 },
        { month: 'أبريل', value: 15200 },
        { month: 'مايو', value: 15350 },
        { month: 'يونيو', value: 15432 }
      ]
    },
    { 
      title: 'المستخدمون النشطون', 
      value: '156', 
      change: '+8', 
      icon: Users, 
      color: 'bg-purple-500',
      trend: 'up',
      percentage: 5.4,
      target: 200,
      description: 'مستخدمون نشطون في النظام',
      chartData: [
        { month: 'يناير', value: 142 },
        { month: 'فبراير', value: 145 },
        { month: 'مارس', value: 148 },
        { month: 'أبريل', value: 151 },
        { month: 'مايو', value: 153 },
        { month: 'يونيو', value: 156 }
      ]
    },
    {
      title: 'القيمة الإجمالية للأوقاف',
      value: '125M ₪',
      change: '+2.3M',
      icon: DollarSign,
      color: 'bg-green-600',
      trend: 'up',
      percentage: 1.9,
      target: 130,
      description: 'القيمة التقديرية لجميع الأوقاف',
      chartData: [
        { month: 'يناير', value: 120 },
        { month: 'فبراير', value: 121 },
        { month: 'مارس', value: 122.5 },
        { month: 'أبريل', value: 123 },
        { month: 'مايو', value: 124.2 },
        { month: 'يونيو', value: 125 }
      ]
    },
    {
      title: 'المواعيد هذا الشهر',
      value: '45',
      change: '+12',
      icon: Calendar,
      color: 'bg-orange-500',
      trend: 'up',
      percentage: 36.4,
      target: 50,
      description: 'مواعيد واجتماعات مجدولة',
      chartData: [
        { month: 'يناير', value: 35 },
        { month: 'فبراير', value: 38 },
        { month: 'مارس', value: 40 },
        { month: 'أبريل', value: 42 },
        { month: 'مايو', value: 43 },
        { month: 'يونيو', value: 45 }
      ]
    }
  ];

  // استخدام البيانات الحقيقية إذا كانت متاحة
  const displayStats = stats ? [
    { 
      title: 'إجمالي الأراضي الوقفية', 
      value: stats.total_waqf_lands?.toString() || '0', 
      change: '+' + (stats.active_waqf_lands || 0), 
      icon: Building, 
      color: 'bg-blue-500',
      trend: 'up',
      percentage: 2.4,
      target: 1300,
      description: 'أراضي وقفية مسجلة ومدارة'
    },
    { 
      title: 'القضايا النشطة', 
      value: stats.open_cases?.toString() || '0', 
      change: '-' + (stats.total_cases - stats.open_cases || 0), 
      icon: Gavel, 
      color: 'bg-red-500',
      trend: 'down',
      percentage: -5.3,
      target: 80,
      description: 'قضايا تحتاج متابعة ومعالجة'
    },
    { 
      title: 'الوثائق المؤرشفة', 
      value: stats.total_documents?.toString() || '0', 
      change: '+' + Math.floor((stats.total_documents || 0) * 0.1), 
      icon: FileText, 
      color: 'bg-green-500',
      trend: 'up',
      percentage: 1.5,
      target: 16000,
      description: 'وثائق مرقمنة ومفهرسة'
    },
    { 
      title: 'المستخدمون النشطون', 
      value: stats.total_users?.toString() || '0', 
      change: '+' + Math.floor((stats.total_users || 0) * 0.05), 
      icon: Users, 
      color: 'bg-purple-500',
      trend: 'up',
      percentage: 5.4,
      target: 200,
      description: 'مستخدمون نشطون في النظام'
    }
  ] : advancedStatsData;

  // بيانات الرسوم البيانية المتقدمة
  const monthlyTrendData = [
    { month: 'يناير', cases: 45, lands: 12, documents: 234, income: 75000, expenses: 45000, users: 142, appointments: 35, news: 12, announcements: 8 },
    { month: 'فبراير', cases: 52, lands: 18, documents: 189, income: 82000, expenses: 48000, users: 148, appointments: 38, news: 15, announcements: 6 },
    { month: 'مارس', cases: 38, lands: 15, documents: 267, income: 78000, expenses: 52000, users: 151, appointments: 40, news: 18, announcements: 10 },
    { month: 'أبريل', cases: 61, lands: 22, documents: 298, income: 85000, expenses: 55000, users: 153, appointments: 42, news: 14, announcements: 7 },
    { month: 'مايو', cases: 55, lands: 19, documents: 312, income: 88000, expenses: 58000, users: 155, appointments: 43, news: 16, announcements: 9 },
    { month: 'يونيو', cases: 67, lands: 25, documents: 345, income: 92000, expenses: 62000, users: 156, appointments: 45, news: 20, announcements: 12 }
  ];

  const casesByType = [
    { name: 'ملكية', value: 35, color: '#3B82F6', percentage: 35 },
    { name: 'حدود', value: 28, color: '#EF4444', percentage: 28 },
    { name: 'إيرادات', value: 15, color: '#10B981', percentage: 15 },
    { name: 'صيانة', value: 12, color: '#F59E0B', percentage: 12 },
    { name: 'قانونية', value: 10, color: '#8B5CF6', percentage: 10 }
  ];

  const landsByGovernorate = [
    { name: 'القدس', value: 234, color: '#22C55E', income: 18500, cases: 23, documents: 156 },
    { name: 'رام الله', value: 189, color: '#3B82F6', income: 15200, cases: 18, documents: 134 },
    { name: 'نابلس', value: 156, color: '#F59E0B', income: 12800, cases: 15, documents: 98 },
    { name: 'الخليل', value: 145, color: '#10B981', income: 11500, cases: 12, documents: 87 },
    { name: 'غزة', value: 234, color: '#8B5CF6', income: 14200, cases: 21, documents: 145 },
    { name: 'جنين', value: 123, color: '#EF4444', income: 8900, cases: 8, documents: 76 }
  ];

  const systemMetrics = [
    { name: 'استخدام المعالج', value: 45, max: 100, color: '#3B82F6', unit: '%', status: 'good' },
    { name: 'استخدام الذاكرة', value: 68, max: 100, color: '#10B981', unit: '%', status: 'warning' },
    { name: 'مساحة التخزين', value: 234, max: 500, color: '#F59E0B', unit: 'GB', status: 'good' },
    { name: 'عدد الاتصالات', value: 156, max: 1000, color: '#8B5CF6', unit: 'اتصال', status: 'good' },
    { name: 'سرعة الاستجابة', value: 245, max: 1000, color: '#EF4444', unit: 'ms', status: 'good' },
    { name: 'معدل النجاح', value: 99.2, max: 100, color: '#22C55E', unit: '%', status: 'excellent' }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'case',
      title: 'تم إنشاء قضية جديدة: نزاع حدود أرض المسجد الكبير',
      time: 'منذ 5 دقائق',
      user: 'أحمد محمد',
      status: 'new',
      priority: 'high',
      icon: Gavel,
      color: 'text-red-600'
    },
    {
      id: 2,
      type: 'document',
      title: 'تم رفع وثيقة: سند ملكية أرض وقف الزيتون',
      time: 'منذ 15 دقيقة',
      user: 'فاطمة أحمد',
      status: 'success',
      priority: 'medium',
      icon: FileText,
      color: 'text-blue-600'
    },
    {
      id: 3,
      type: 'appointment',
      title: 'موعد جديد: اجتماع لجنة الأوقاف',
      time: 'منذ 30 دقيقة',
      user: 'محمد علي',
      status: 'scheduled',
      priority: 'high',
      icon: Calendar,
      color: 'text-green-600'
    },
    {
      id: 4,
      type: 'case',
      title: 'تم حل القضية: صيانة مسجد الرحمة',
      time: 'منذ ساعة',
      user: 'سارة خالد',
      status: 'resolved',
      priority: 'medium',
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      id: 5,
      type: 'user',
      title: 'مستخدم جديد: موظف في مكتب نابلس',
      time: 'منذ ساعتين',
      user: 'مدير النظام',
      status: 'active',
      priority: 'low',
      icon: Users,
      color: 'text-purple-600'
    }
  ];

  const urgentTasks = [
    {
      id: 1,
      title: 'مراجعة قضية نزاع أرض المقبرة الشرقية',
      dueDate: '2024-01-20',
      priority: 'urgent',
      assignee: 'أحمد محمد',
      progress: 75,
      category: 'legal',
      description: 'مراجعة شاملة للوثائق القانونية والحدود'
    },
    {
      id: 2,
      title: 'تحديث وثائق أرض وقف المدرسة',
      dueDate: '2024-01-22',
      priority: 'high',
      assignee: 'فاطمة أحمد',
      progress: 45,
      category: 'documents',
      description: 'تحديث السندات والوثائق القانونية'
    },
    {
      id: 3,
      title: 'إعداد تقرير الإيرادات الشهري',
      dueDate: '2024-01-25',
      priority: 'medium',
      assignee: 'محمد علي',
      progress: 20,
      category: 'financial',
      description: 'تجميع وتحليل البيانات المالية'
    },
    {
      id: 4,
      title: 'فحص أمان النظام الشهري',
      dueDate: '2024-01-28',
      priority: 'high',
      assignee: 'خالد يوسف',
      progress: 0,
      category: 'security',
      description: 'فحص شامل لأمان النظام والثغرات'
    }
  ];

  const timeRangeOptions = [
    { value: '24h', label: '24 ساعة' },
    { value: '7d', label: '7 أيام' },
    { value: '30d', label: '30 يوم' },
    { value: '90d', label: '90 يوم' },
    { value: '1y', label: 'سنة' }
  ];

  const metricOptions = [
    { value: 'overview', label: 'نظرة عامة', icon: BarChart3 },
    { value: 'financial', label: 'مالي', icon: DollarSign },
    { value: 'performance', label: 'الأداء', icon: TrendingUp },
    { value: 'system', label: 'النظام', icon: Database },
    { value: 'users', label: 'المستخدمون', icon: Users },
    { value: 'content', label: 'المحتوى', icon: FileText },
    { value: 'security', label: 'الأمان', icon: Shield }
  ];

  const widgetOptions = [
    { id: 'stats', name: 'الإحصائيات', icon: BarChart3, description: 'بطاقات الإحصائيات الرئيسية' },
    { id: 'charts', name: 'الرسوم البيانية', icon: PieChart, description: 'رسوم بيانية تفاعلية' },
    { id: 'activity', name: 'النشاط الأخير', icon: Activity, description: 'آخر الأنشطة والتحديثات' },
    { id: 'system', name: 'حالة النظام', icon: Database, description: 'مراقبة أداء النظام' },
    { id: 'tasks', name: 'المهام العاجلة', icon: Target, description: 'المهام التي تحتاج متابعة' },
    { id: 'notifications', name: 'الإشعارات', icon: Bell, description: 'آخر الإشعارات والتنبيهات' },
    { id: 'calendar', name: 'التقويم', icon: Calendar, description: 'المواعيد والأحداث القادمة' },
    { id: 'weather', name: 'الطقس', icon: Sun, description: 'حالة الطقس الحالية' }
  ];

  const layoutOptions = [
    { id: 'default', name: 'افتراضي', description: 'التخطيط الافتراضي للوحة' },
    { id: 'compact', name: 'مضغوط', description: 'عرض مضغوط لمزيد من المعلومات' },
    { id: 'detailed', name: 'مفصل', description: 'عرض مفصل مع تفاصيل إضافية' },
    { id: 'minimal', name: 'بسيط', description: 'عرض بسيط ونظيف' }
  ];

  // تحديث تلقائي
  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        refetch();
      }, refreshInterval * 1000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh, refreshInterval, refetch]);

  // إضافة تفاعل للإحصائيات
  const handleStatClick = (statTitle: string) => {
    info(`عرض تفاصيل ${statTitle}`, 'انقر على الإحصائية لعرض التفاصيل الكاملة');
  };

  const handleRefreshData = async () => {
    try {
      await refetch();
      success('تم تحديث البيانات', 'البيانات محدثة إلى آخر إصدار');
    } catch (err) {
      showError('تعذر تحديث البيانات', 'سيتم استخدام البيانات المحفوظة محلياً');
    }
  };

  const handleExportReport = () => {
    success('تم تصدير التقرير', 'سيتم تحميل التقرير خلال ثوانٍ');
  };

  const handleSaveLayout = () => {
    localStorage.setItem('dashboardLayout', JSON.stringify({
      selectedDashboard,
      customWidgets,
      dashboardLayout,
      viewMode,
      selectedMetric
    }));
    success('تم حفظ التخطيط', 'تم حفظ إعدادات لوحة التحكم');
  };

  const handleResetLayout = () => {
    setSelectedDashboard('main');
    setCustomWidgets(['stats', 'charts', 'activity', 'system']);
    setDashboardLayout('default');
    setViewMode('charts');
    setSelectedMetric('overview');
    success('تم إعادة تعيين التخطيط', 'تم استعادة الإعدادات الافتراضية');
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'case': return <Gavel className="w-4 h-4 text-red-600" />;
      case 'document': return <FileText className="w-4 h-4 text-blue-600" />;
      case 'appointment': return <Calendar className="w-4 h-4 text-green-600" />;
      case 'user': return <Users className="w-4 h-4 text-purple-600" />;
      case 'news': return <FileText className="w-4 h-4 text-orange-600" />;
      case 'announcement': return <Megaphone className="w-4 h-4 text-pink-600" />;
      default: return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const renderMainDashboard = () => (
    <div className="space-y-6">
      {/* Advanced Stats Cards */}
      {customWidgets.includes('stats') && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayStats.map((stat, index) => (
            <div 
              key={index} 
              className="card-islamic hover-lift cursor-pointer animate-fade-in-up group"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => handleStatClick(stat.title)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-right">
                  <div className={`flex items-center space-x-1 space-x-reverse text-sm font-medium ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.trend === 'up' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                    <span>{Math.abs(stat.percentage)}%</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium text-sage-600 font-body">{stat.title}</p>
                <p className="text-3xl font-bold text-islamic-700 font-display">{stat.value}</p>
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium font-body ${stat.trend === 'up' ? 'text-islamic-600' : 'text-red-600'}`}>
                    {stat.change} هذا الشهر
                  </span>
                  <span className="text-xs text-sage-500 font-body">
                    الهدف: {stat.target}
                  </span>
                </div>
                <div className="w-full bg-sage-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      parseInt(stat.value.replace(/[^\d]/g, '')) >= stat.target ? 'bg-green-500' : 'bg-islamic-500'
                    }`}
                    style={{ width: `${Math.min((parseInt(stat.value.replace(/[^\d]/g, '')) / stat.target) * 100, 100)}%` }}
                  ></div>
                </div>
                <p className="text-xs text-sage-600 font-body">{stat.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Charts Section */}
      {customWidgets.includes('charts') && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Activity Chart */}
          <div className="card-islamic">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-islamic-800 font-display">النشاط الشهري</h3>
              <div className="flex items-center space-x-2 space-x-reverse">
                <button className="p-2 rounded-lg hover:bg-islamic-100 transition-colors">
                  <Download className="w-4 h-4 text-islamic-600" />
                </button>
                <button className="p-2 rounded-lg hover:bg-islamic-100 transition-colors">
                  <Settings className="w-4 h-4 text-islamic-600" />
                </button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={monthlyTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="cases" fill="#EF4444" name="القضايا" />
                <Bar dataKey="lands" fill="#10B981" name="الأراضي" />
                <Line type="monotone" dataKey="documents" stroke="#3B82F6" strokeWidth={3} name="الوثائق" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Cases by Type Pie Chart */}
          <div className="card-golden">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-golden-800 font-display">توزيع القضايا حسب النوع</h3>
              <div className="flex items-center space-x-2 space-x-reverse">
                <button className="p-2 rounded-lg hover:bg-golden-100 transition-colors">
                  <Eye className="w-4 h-4 text-golden-600" />
                </button>
                <button className="p-2 rounded-lg hover:bg-golden-100 transition-colors">
                  <Share2 className="w-4 h-4 text-golden-600" />
                </button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={casesByType}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {casesByType.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>

          {/* Financial Trend */}
          <div className="card-sage">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-sage-800 font-display">الاتجاه المالي</h3>
              <select 
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
                className="text-sm border border-sage-300 rounded-lg px-3 py-1"
              >
                {timeRangeOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsAreaChart data={monthlyTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="income" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} name="الإيرادات" />
                <Area type="monotone" dataKey="expenses" stackId="2" stroke="#EF4444" fill="#EF4444" fillOpacity={0.6} name="المصروفات" />
              </RechartsAreaChart>
            </ResponsiveContainer>
          </div>

          {/* System Performance */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 font-display">أداء النظام</h3>
              <div className="flex items-center space-x-2 space-x-reverse">
                <div className={`w-3 h-3 rounded-full ${autoRefresh ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`}></div>
                <span className="text-xs text-gray-600">{autoRefresh ? 'تحديث تلقائي' : 'تحديث يدوي'}</span>
              </div>
            </div>
            <div className="space-y-3">
              {systemMetrics.map((metric, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: metric.color }}></div>
                    <span className="text-sm text-gray-700 font-body">{metric.name}</span>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full transition-all duration-500"
                        style={{ 
                          width: `${(metric.value / metric.max) * 100}%`,
                          backgroundColor: metric.color 
                        }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-800 min-w-[60px] text-left">
                      {metric.value} {metric.unit}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      {customWidgets.includes('activity') && <QuickActions />}

      {/* Recent Activities and System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enhanced Recent Activity */}
        {customWidgets.includes('activity') && (
          <div className="card-golden">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-golden-800 font-display">النشاط الأخير</h3>
              <div className="flex items-center space-x-2 space-x-reverse">
                <button className="text-islamic-600 hover:text-islamic-700 text-sm font-medium font-body">
                  عرض الكل
                </button>
                <button className="p-2 rounded-lg hover:bg-golden-100 transition-colors">
                  <FilterIcon className="w-4 h-4 text-golden-600" />
                </button>
              </div>
            </div>
            
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 space-x-reverse p-3 bg-white rounded-lg hover:shadow-sm transition-shadow">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <activity.icon className={activity.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-golden-800 font-body line-clamp-2">
                      {activity.title}
                    </p>
                    <div className="flex items-center space-x-2 space-x-reverse mt-1">
                      <span className="text-xs text-sage-500 font-body">{activity.user}</span>
                      <span className="text-xs text-sage-400">•</span>
                      <span className="text-xs text-sage-500 font-body">{activity.time}</span>
                      <span className={`px-2 py-1 text-xs rounded-full border ${getPriorityColor(activity.priority)}`}>
                        {activity.priority === 'high' ? 'مهم' : activity.priority === 'medium' ? 'متوسط' : 'منخفض'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {customWidgets.includes('system') && <SystemStatus />}
      </div>

      {/* Urgent Tasks */}
      {customWidgets.includes('tasks') && (
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800 font-display">المهام العاجلة والمتابعة</h3>
            <div className="flex items-center space-x-2 space-x-reverse">
              <button className="text-islamic-600 hover:text-islamic-700 text-sm font-medium font-body">
                إدارة المهام
              </button>
              <button className="btn-primary text-sm px-3 py-1">
                <Plus className="w-4 h-4 ml-1" />
                مهمة جديدة
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {urgentTasks.map((task) => (
              <div key={task.id} className="p-4 border border-sage-200 rounded-lg bg-islamic-50 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-islamic-800 font-body line-clamp-1">{task.title}</h4>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    task.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                    task.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {task.priority === 'urgent' ? 'عاجل' : task.priority === 'high' ? 'مهم' : 'متوسط'}
                  </span>
                </div>
                <p className="text-sm text-sage-600 mb-3 font-body">{task.description}</p>
                <div className="flex items-center justify-between text-sm text-sage-600 mb-3">
                  <span className="font-body">المسؤول: {task.assignee}</span>
                  <span className="font-body">الموعد: {new Date(task.dueDate).toLocaleDateString('ar-EG')}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-sage-600 font-body">التقدم:</span>
                    <span className="font-medium text-islamic-700 font-body">{task.progress}%</span>
                  </div>
                  <div className="w-full bg-sage-200 rounded-full h-2">
                    <div 
                      className="bg-islamic-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${task.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      task.category === 'legal' ? 'bg-blue-100 text-blue-800' :
                      task.category === 'documents' ? 'bg-green-100 text-green-800' :
                      task.category === 'financial' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {task.category === 'legal' ? 'قانوني' :
                       task.category === 'documents' ? 'وثائق' :
                       task.category === 'financial' ? 'مالي' : 'أمان'}
                    </span>
                    <button className="text-islamic-600 hover:text-islamic-700 text-xs font-medium">
                      عرض التفاصيل
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderFinancialDashboard = () => (
    <div className="space-y-6">
      {/* Financial KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card-islamic">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-sage-600 font-body">الإيرادات الشهرية</p>
              <p className="text-3xl font-bold text-islamic-700 font-display">92,000 ₪</p>
            </div>
            <TrendingUp className="w-8 h-8 text-islamic-500" />
          </div>
        </div>
        
        <div className="card-golden">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-sage-600 font-body">المصروفات الشهرية</p>
              <p className="text-3xl font-bold text-golden-700 font-display">62,000 ₪</p>
            </div>
            <TrendingDown className="w-8 h-8 text-golden-500" />
          </div>
        </div>
        
        <div className="card-sage">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-sage-600 font-body">صافي الربح</p>
              <p className="text-3xl font-bold text-sage-700 font-display">30,000 ₪</p>
            </div>
            <DollarSign className="w-8 h-8 text-sage-500" />
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-sage-600 font-body">معدل النمو</p>
              <p className="text-3xl font-bold text-gray-700 font-display">+5.2%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-gray-500" />
          </div>
        </div>
      </div>

      {/* Financial Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card-islamic">
          <h3 className="text-lg font-semibold text-islamic-800 mb-4 font-display">الإيرادات حسب المحافظة</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsBarChart data={landsByGovernorate}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="income" fill="#22C55E" name="الإيرادات (₪)" />
            </RechartsBarChart>
          </ResponsiveContainer>
        </div>

        <div className="card-golden">
          <h3 className="text-lg font-semibold text-golden-800 mb-4 font-display">نمو الإيرادات</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsLineChart data={monthlyTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="income" stroke="#10B981" strokeWidth={3} name="الإيرادات" />
              <Line type="monotone" dataKey="expenses" stroke="#EF4444" strokeWidth={3} name="المصروفات" />
            </RechartsLineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const renderSecurityDashboard = () => (
    <div className="space-y-6">
      {/* Security Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">حالة الأمان</p>
              <p className="text-2xl font-bold text-green-600">آمن</p>
            </div>
            <Shield className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="card border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">محاولات دخول فاشلة</p>
              <p className="text-2xl font-bold text-yellow-600">3</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        
        <div className="card border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">جلسات نشطة</p>
              <p className="text-2xl font-bold text-blue-600">24</p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="card border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">آخر نسخة احتياطية</p>
              <p className="text-xl font-bold text-purple-600">منذ ساعة</p>
            </div>
            <Database className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Security Events */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 font-display">أحداث الأمان الأخيرة</h3>
        <div className="space-y-3">
          {[
            { type: 'success', message: 'تم تسجيل دخول ناجح من IP: 192.168.1.100', time: 'منذ 5 دقائق', severity: 'info' },
            { type: 'warning', message: 'محاولة دخول فاشلة من IP: 10.0.0.50', time: 'منذ 15 دقيقة', severity: 'warning' },
            { type: 'success', message: 'تم إنشاء نسخة احتياطية تلقائية', time: 'منذ ساعة', severity: 'success' },
            { type: 'info', message: 'تم تحديث كلمة مرور المستخدم: أحمد محمد', time: 'منذ ساعتين', severity: 'info' }
          ].map((event, index) => (
            <div key={index} className={`p-3 rounded-lg border ${
              event.severity === 'success' ? 'bg-green-50 border-green-200' :
              event.severity === 'warning' ? 'bg-yellow-50 border-yellow-200' :
              event.severity === 'error' ? 'bg-red-50 border-red-200' :
              'bg-blue-50 border-blue-200'
            }`}>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-800 font-body">{event.message}</p>
                <span className="text-xs text-gray-500 font-body">{event.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAnalyticsDashboard = () => (
    <div className="space-y-6">
      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-islamic">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-sage-600 font-body">زوار الموقع</p>
              <p className="text-3xl font-bold text-islamic-700 font-display">12,547</p>
            </div>
            <Eye className="w-8 h-8 text-islamic-500" />
          </div>
        </div>
        
        <div className="card-golden">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-sage-600 font-body">مشاهدات الصفحات</p>
              <p className="text-3xl font-bold text-golden-700 font-display">45,892</p>
            </div>
            <BarChart3 className="w-8 h-8 text-golden-500" />
          </div>
        </div>
        
        <div className="card-sage">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-sage-600 font-body">معدل الارتداد</p>
              <p className="text-3xl font-bold text-sage-700 font-display">23.5%</p>
            </div>
            <TrendingDown className="w-8 h-8 text-sage-500" />
          </div>
        </div>
      </div>

      {/* User Behavior Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card-islamic">
          <h3 className="text-lg font-semibold text-islamic-800 mb-4 font-display">سلوك المستخدمين</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsAreaChart data={monthlyTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="users" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.6} name="المستخدمون" />
            </RechartsAreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card-golden">
          <h3 className="text-lg font-semibold text-golden-800 mb-4 font-display">الصفحات الأكثر زيارة</h3>
          <div className="space-y-3">
            {[
              { page: 'الصفحة الرئيسية', visits: 15420, percentage: 35 },
              { page: 'الأخبار', visits: 8750, percentage: 20 },
              { page: 'خطب الجمعة', visits: 6780, percentage: 15 },
              { page: 'الخدمات', visits: 5420, percentage: 12 },
              { page: 'الأنشطة', visits: 4320, percentage: 10 }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                <span className="text-sm font-medium text-golden-800 font-body">{item.page}</span>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <div className="w-16 bg-golden-200 rounded-full h-2">
                    <div 
                      className="bg-golden-500 h-2 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-bold text-golden-700 font-body">{item.visits.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderPerformanceDashboard = () => (
    <div className="space-y-6">
      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'معدل حل القضايا', value: 85, target: 90, unit: '%', color: 'bg-blue-500' },
          { title: 'رضا المستخدمين', value: 92, target: 95, unit: '%', color: 'bg-green-500' },
          { title: 'كفاءة العمليات', value: 88, target: 90, unit: '%', color: 'bg-purple-500' }
        ].map((metric, index) => (
          <div key={index} className="card-islamic">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-islamic-800 font-display">{metric.title}</h4>
              <div className={`w-8 h-8 ${metric.color} rounded-full flex items-center justify-center`}>
                <Target className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-islamic-700 font-display">{metric.value}{metric.unit}</span>
                <span className="text-sm text-sage-600 font-body">الهدف: {metric.target}{metric.unit}</span>
              </div>
              <div className="w-full bg-sage-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    metric.value >= metric.target ? 'bg-green-500' : 'bg-orange-500'
                  }`}
                  style={{ width: `${Math.min((metric.value / metric.target) * 100, 100)}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Performance Trends */}
      <div className="card-golden">
        <h3 className="text-lg font-semibold text-golden-800 mb-4 font-display">اتجاهات الأداء</h3>
        <ResponsiveContainer width="100%" height={400}>
          <RechartsLineChart data={monthlyTrendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="cases" stroke="#EF4444" strokeWidth={2} name="القضايا المحلولة" />
            <Line type="monotone" dataKey="documents" stroke="#3B82F6" strokeWidth={2} name="الوثائق المعالجة" />
            <Line type="monotone" dataKey="appointments" stroke="#10B981" strokeWidth={2} name="المواعيد المنجزة" />
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderDashboardContent = () => {
    switch (selectedDashboard) {
      case 'financial':
        return renderFinancialDashboard();
      case 'security':
        return renderSecurityDashboard();
      case 'analytics':
        return renderAnalyticsDashboard();
      case 'performance':
        return renderPerformanceDashboard();
      default:
        return renderMainDashboard();
    }
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="heading-1 text-islamic-800">لوحة التحكم المتقدمة</h1>
          <p className="body-text text-sage-600 mt-2">نظرة شاملة ومتقدمة على نشاط النظام والإحصائيات المباشرة</p>
        </div>
        <div className="flex items-center space-x-4 space-x-reverse">
          <div className="flex items-center space-x-2 space-x-reverse">
            <label className="text-sm text-sage-600 font-body">تحديث تلقائي:</label>
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                autoRefresh ? 'bg-islamic-600' : 'bg-gray-200'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                autoRefresh ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="text-sm border border-sage-300 rounded-lg px-3 py-2"
          >
            {timeRangeOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          <button 
            onClick={handleSaveLayout}
            className="btn-secondary"
          >
            <SaveIcon className="w-5 h-5 ml-2" />
            حفظ التخطيط
          </button>
          <button 
            onClick={handleExportReport}
            className="btn-secondary"
          >
            <BarChart3 className="w-5 h-5 ml-2" />
            تقرير شامل
          </button>
          <button 
            onClick={handleRefreshData}
            className="btn-primary"
            disabled={loading}
          >
            <RefreshCw className={`w-5 h-5 ml-2 ${loading ? 'animate-spin' : ''}`} />
            تحديث البيانات
          </button>
        </div>
      </div>

      {/* Dashboard Type Selection */}
      <div className="bg-white rounded-2xl shadow-elegant p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-islamic-800 font-display">نوع لوحة التحكم</h2>
          <div className="flex items-center space-x-2 space-x-reverse">
            <button
              onClick={() => setShowAdvancedMetrics(!showAdvancedMetrics)}
              className="btn-secondary text-sm px-3 py-1"
            >
              <Settings className="w-4 h-4 ml-1" />
              إعدادات متقدمة
            </button>
            <button
              onClick={handleResetLayout}
              className="btn-outline text-sm px-3 py-1"
            >
              <RefreshCw className="w-4 h-4 ml-1" />
              إعادة تعيين
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {dashboardTypes.map((dashboard) => (
            <button
              key={dashboard.id}
              onClick={() => setSelectedDashboard(dashboard.id)}
              className={`flex flex-col items-center p-4 rounded-xl transition-all duration-300 font-body ${
                selectedDashboard === dashboard.id
                  ? 'bg-islamic-600 text-white shadow-islamic'
                  : 'text-sage-700 hover:bg-islamic-50 hover:text-islamic-700 border border-sage-200'
              }`}
            >
              <dashboard.icon className="w-6 h-6 mb-2" />
              <span className="font-medium text-sm">{dashboard.name}</span>
              <span className="text-xs opacity-75 text-center mt-1">{dashboard.description}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Advanced Settings Panel */}
      {showAdvancedMetrics && (
        <div className="bg-white rounded-2xl shadow-elegant p-6">
          <h3 className="text-lg font-semibold text-islamic-800 mb-4 font-display">الإعدادات المتقدمة</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Widget Selection */}
            <div>
              <h4 className="font-semibold text-islamic-800 mb-3 font-display">اختيار الأدوات</h4>
              <div className="grid grid-cols-2 gap-3">
                {widgetOptions.map((widget) => (
                  <label key={widget.id} className="flex items-center space-x-3 space-x-reverse p-3 border border-sage-200 rounded-lg hover:bg-islamic-50 transition-colors">
                    <input
                      type="checkbox"
                      checked={customWidgets.includes(widget.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setCustomWidgets(prev => [...prev, widget.id]);
                        } else {
                          setCustomWidgets(prev => prev.filter(w => w !== widget.id));
                        }
                      }}
                      className="rounded border-islamic-300 text-islamic-600 focus:ring-islamic-500"
                    />
                    <widget.icon className="w-5 h-5 text-islamic-600" />
                    <div>
                      <span className="font-medium text-islamic-800 font-body">{widget.name}</span>
                      <p className="text-xs text-sage-600 font-body">{widget.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Layout Options */}
            <div>
              <h4 className="font-semibold text-islamic-800 mb-3 font-display">تخطيط اللوحة</h4>
              <div className="space-y-3">
                {layoutOptions.map((layout) => (
                  <label key={layout.id} className="flex items-center space-x-3 space-x-reverse p-3 border border-sage-200 rounded-lg hover:bg-islamic-50 transition-colors">
                    <input
                      type="radio"
                      name="layout"
                      value={layout.id}
                      checked={dashboardLayout === layout.id}
                      onChange={(e) => setDashboardLayout(e.target.value)}
                      className="border-islamic-300 text-islamic-600 focus:ring-islamic-500"
                    />
                    <div>
                      <span className="font-medium text-islamic-800 font-body">{layout.name}</span>
                      <p className="text-sm text-sage-600 font-body">{layout.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Refresh Settings */}
          <div className="mt-6 pt-6 border-t border-sage-200">
            <h4 className="font-semibold text-islamic-800 mb-3 font-display">إعدادات التحديث</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">فترة التحديث (ثانية)</label>
                <select
                  value={refreshInterval}
                  onChange={(e) => setRefreshInterval(parseInt(e.target.value))}
                  className="form-select"
                >
                  <option value={10}>10 ثوانٍ</option>
                  <option value={30}>30 ثانية</option>
                  <option value={60}>دقيقة واحدة</option>
                  <option value={300}>5 دقائق</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">عرض البيانات</label>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <button
                    onClick={() => setViewMode('charts')}
                    className={`flex-1 py-2 px-3 rounded-lg transition-colors ${
                      viewMode === 'charts' ? 'bg-islamic-600 text-white' : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    <BarChart3 className="w-4 h-4 mx-auto" />
                  </button>
                  <button
                    onClick={() => setViewMode('tables')}
                    className={`flex-1 py-2 px-3 rounded-lg transition-colors ${
                      viewMode === 'tables' ? 'bg-islamic-600 text-white' : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    <Grid className="w-4 h-4 mx-auto" />
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">المقياس الافتراضي</label>
                <select
                  value={selectedMetric}
                  onChange={(e) => setSelectedMetric(e.target.value)}
                  className="form-select"
                >
                  {metricOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="card-islamic">
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <RefreshCw className="w-8 h-8 text-islamic-600 animate-spin mx-auto mb-4" />
              <p className="text-sage-600 font-body">جاري تحميل البيانات من قاعدة البيانات...</p>
            </div>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="card bg-red-50 border border-red-200">
          <div className="flex items-center space-x-3 space-x-reverse">
            <AlertTriangle className="w-6 h-6 text-red-600" />
            <div>
              <p className="font-semibold text-red-800 font-body">خطأ في تحميل البيانات</p>
              <p className="text-red-600 font-body text-sm">{error}</p>
              <button 
                onClick={handleRefreshData}
                className="text-red-700 hover:text-red-800 text-sm font-medium mt-2 font-body"
              >
                إعادة المحاولة
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dashboard Content */}
      {renderDashboardContent()}

      {/* Advanced Analytics Toggle */}
      <div className="card-sage">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-sage-800 font-display">التحليلات المتقدمة</h3>
            <p className="text-sm text-sage-600 font-body">عرض مؤشرات الأداء التفصيلية والتنبؤات</p>
          </div>
          <button
            onClick={() => setShowAdvancedMetrics(!showAdvancedMetrics)}
            className="btn-primary"
          >
            {showAdvancedMetrics ? 'إخفاء' : 'عرض'} التحليلات المتقدمة
          </button>
        </div>
        
        {showAdvancedMetrics && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-sage-800 mb-2 font-body">معدل حل القضايا</h4>
              <div className="flex items-center space-x-2 space-x-reverse">
                <div className="w-full bg-sage-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
                <span className="text-sm font-bold text-green-600">85%</span>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-sage-800 mb-2 font-body">رضا المستخدمين</h4>
              <div className="flex items-center space-x-2 space-x-reverse">
                <div className="w-full bg-sage-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
                <span className="text-sm font-bold text-blue-600">92%</span>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-sage-800 mb-2 font-body">كفاءة النظام</h4>
              <div className="flex items-center space-x-2 space-x-reverse">
                <div className="w-full bg-sage-200 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '88%' }}></div>
                </div>
                <span className="text-sm font-bold text-purple-600">88%</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;