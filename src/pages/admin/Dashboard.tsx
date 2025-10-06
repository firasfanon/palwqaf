import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, MapPin, Gavel, FileText, Users, Calendar, AlertTriangle, CheckCircle, Clock, DollarSign, RefreshCw, Building, Eye, Activity, Bell, Download, Settings, Globe, Shield, Zap, Database, HardDrive, Cpu, MemoryStick, Network, Wifi, WifiOff, Server, Monitor, Smartphone, Tablet, Chrome, Siren as Firefox, Variable as Safari, Badge as Edge, Plus, Minus, ArrowUp, ArrowDown, Target, Award, Star, Heart, Bookmark, Share2, Filter, Search, Grid, List, PieChart, LineChart, AreaChart } from 'lucide-react';
import { 
  BarChart, 
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
      description: 'أراضي وقفية مسجلة ومدارة'
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
      description: 'قضايا تحتاج متابعة ومعالجة'
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
      description: 'وثائق مرقمنة ومفهرسة'
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
      description: 'مستخدمون نشطون في النظام'
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
      description: 'القيمة التقديرية لجميع الأوقاف'
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
      description: 'مواعيد واجتماعات مجدولة'
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
    { month: 'يناير', cases: 45, lands: 12, documents: 234, income: 75000, expenses: 45000, users: 142 },
    { month: 'فبراير', cases: 52, lands: 18, documents: 189, income: 82000, expenses: 48000, users: 148 },
    { month: 'مارس', cases: 38, lands: 15, documents: 267, income: 78000, expenses: 52000, users: 151 },
    { month: 'أبريل', cases: 61, lands: 22, documents: 298, income: 85000, expenses: 55000, users: 153 },
    { month: 'مايو', cases: 55, lands: 19, documents: 312, income: 88000, expenses: 58000, users: 155 },
    { month: 'يونيو', cases: 67, lands: 25, documents: 345, income: 92000, expenses: 62000, users: 156 }
  ];

  const casesByType = [
    { name: 'ملكية', value: 35, color: '#3B82F6', percentage: 35 },
    { name: 'حدود', value: 28, color: '#EF4444', percentage: 28 },
    { name: 'إيرادات', value: 15, color: '#10B981', percentage: 15 },
    { name: 'صيانة', value: 12, color: '#F59E0B', percentage: 12 },
    { name: 'قانونية', value: 10, color: '#8B5CF6', percentage: 10 }
  ];

  const landsByGovernorate = [
    { name: 'القدس', value: 234, color: '#22C55E', income: 18500 },
    { name: 'رام الله', value: 189, color: '#3B82F6', income: 15200 },
    { name: 'نابلس', value: 156, color: '#F59E0B', income: 12800 },
    { name: 'الخليل', value: 145, color: '#10B981', income: 11500 },
    { name: 'غزة', value: 234, color: '#8B5CF6', income: 14200 },
    { name: 'جنين', value: 123, color: '#EF4444', income: 8900 }
  ];

  const systemMetrics = [
    { name: 'استخدام المعالج', value: 45, max: 100, color: '#3B82F6', unit: '%' },
    { name: 'استخدام الذاكرة', value: 68, max: 100, color: '#10B981', unit: '%' },
    { name: 'مساحة التخزين', value: 234, max: 500, color: '#F59E0B', unit: 'GB' },
    { name: 'عدد الاتصالات', value: 156, max: 1000, color: '#8B5CF6', unit: 'اتصال' },
    { name: 'سرعة الاستجابة', value: 245, max: 1000, color: '#EF4444', unit: 'ms' },
    { name: 'معدل النجاح', value: 99.2, max: 100, color: '#22C55E', unit: '%' }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'case',
      title: 'تم إنشاء قضية جديدة: نزاع حدود أرض المسجد الكبير',
      time: 'منذ 5 دقائق',
      user: 'أحمد محمد',
      status: 'new',
      priority: 'high'
    },
    {
      id: 2,
      type: 'document',
      title: 'تم رفع وثيقة: سند ملكية أرض وقف الزيتون',
      time: 'منذ 15 دقيقة',
      user: 'فاطمة أحمد',
      status: 'success',
      priority: 'medium'
    },
    {
      id: 3,
      type: 'appointment',
      title: 'موعد جديد: اجتماع لجنة الأوقاف',
      time: 'منذ 30 دقيقة',
      user: 'محمد علي',
      status: 'scheduled',
      priority: 'high'
    },
    {
      id: 4,
      type: 'case',
      title: 'تم حل القضية: صيانة مسجد الرحمة',
      time: 'منذ ساعة',
      user: 'سارة خالد',
      status: 'resolved',
      priority: 'medium'
    },
    {
      id: 5,
      type: 'user',
      title: 'مستخدم جديد: موظف في مكتب نابلس',
      time: 'منذ ساعتين',
      user: 'مدير النظام',
      status: 'active',
      priority: 'low'
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
      category: 'legal'
    },
    {
      id: 2,
      title: 'تحديث وثائق أرض وقف المدرسة',
      dueDate: '2024-01-22',
      priority: 'high',
      assignee: 'فاطمة أحمد',
      progress: 45,
      category: 'documents'
    },
    {
      id: 3,
      title: 'إعداد تقرير الإيرادات الشهري',
      dueDate: '2024-01-25',
      priority: 'medium',
      assignee: 'محمد علي',
      progress: 20,
      category: 'financial'
    },
    {
      id: 4,
      title: 'فحص أمان النظام الشهري',
      dueDate: '2024-01-28',
      priority: 'high',
      assignee: 'خالد يوسف',
      progress: 0,
      category: 'security'
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
    { value: 'users', label: 'المستخدمون', icon: Users }
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

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'case': return <Gavel className="w-4 h-4 text-red-600" />;
      case 'document': return <FileText className="w-4 h-4 text-blue-600" />;
      case 'appointment': return <Calendar className="w-4 h-4 text-green-600" />;
      case 'user': return <Users className="w-4 h-4 text-purple-600" />;
      default: return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 bg-red-50';
      case 'high': return 'text-orange-600 bg-orange-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const renderOverviewCharts = () => (
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
  );

  const renderFinancialCharts = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="card-islamic">
        <h3 className="text-lg font-semibold text-islamic-800 mb-4 font-display">الإيرادات حسب المحافظة</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={landsByGovernorate}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="income" fill="#22C55E" name="الإيرادات (₪)" />
          </BarChart>
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
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
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

      {/* Metric Selection */}
      <div className="bg-white rounded-2xl shadow-elegant p-4">
        <div className="flex flex-wrap gap-2">
          {metricOptions.map((metric) => (
            <button
              key={metric.value}
              onClick={() => setSelectedMetric(metric.value)}
              className={`flex items-center space-x-2 space-x-reverse px-4 py-2 rounded-xl transition-all duration-300 font-body ${
                selectedMetric === metric.value
                  ? 'bg-islamic-600 text-white shadow-islamic'
                  : 'text-sage-700 hover:bg-islamic-50 hover:text-islamic-700'
              }`}
            >
              <metric.icon className="w-5 h-5" />
              <span>{metric.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Advanced Stats Cards */}
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

      {/* Charts Section */}
      <div className="bg-white rounded-2xl shadow-elegant p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="heading-2 text-islamic-800">التحليلات والرسوم البيانية</h2>
          <div className="flex items-center space-x-4 space-x-reverse">
            <button
              onClick={() => setViewMode('charts')}
              className={`p-2 rounded-lg ${viewMode === 'charts' ? 'bg-islamic-600 text-white' : 'bg-gray-200 text-gray-600'}`}
            >
              <BarChart3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('tables')}
              className={`p-2 rounded-lg ${viewMode === 'tables' ? 'bg-islamic-600 text-white' : 'bg-gray-200 text-gray-600'}`}
            >
              <Grid className="w-5 h-5" />
            </button>
          </div>
        </div>

        {selectedMetric === 'overview' && renderOverviewCharts()}
        {selectedMetric === 'financial' && renderFinancialCharts()}
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Recent Activities and System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enhanced Recent Activity */}
        <div className="card-golden">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-golden-800 font-display">النشاط الأخير</h3>
            <div className="flex items-center space-x-2 space-x-reverse">
              <button className="text-islamic-600 hover:text-islamic-700 text-sm font-medium font-body">
                عرض الكل
              </button>
              <button className="p-2 rounded-lg hover:bg-golden-100 transition-colors">
                <Filter className="w-4 h-4 text-golden-600" />
              </button>
            </div>
          </div>
          
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 space-x-reverse p-3 bg-white rounded-lg hover:shadow-sm transition-shadow">
                <div className="flex items-center space-x-2 space-x-reverse">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-golden-800 font-body line-clamp-2">
                    {activity.title}
                  </p>
                  <div className="flex items-center space-x-2 space-x-reverse mt-1">
                    <span className="text-xs text-sage-500 font-body">{activity.user}</span>
                    <span className="text-xs text-sage-400">•</span>
                    <span className="text-xs text-sage-500 font-body">{activity.time}</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(activity.priority)}`}>
                      {activity.priority === 'high' ? 'مهم' : activity.priority === 'medium' ? 'متوسط' : 'منخفض'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <SystemStatus />
      </div>

      {/* Urgent Tasks */}
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