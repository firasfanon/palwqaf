import React, { useState } from 'react';
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Download, 
  Filter, 
  Calendar, 
  FileText, 
  Printer,
  Share2,
  RefreshCw,
  Settings,
  Eye,
  Plus,
  Search,
  MapPin,
  Building,
  Gavel,
  Users,
  DollarSign,
  Activity,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Target,
  Zap,
  Database,
  Globe,
  Layers,
  Grid,
  List
} from 'lucide-react';
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
  LineChart, 
  Line, 
  AreaChart, 
  Area 
} from 'recharts';

const ReportsStatistics: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedGovernorate, setSelectedGovernorate] = useState('all');
  const [exportFormat, setExportFormat] = useState('pdf');
  const [showCustomReport, setShowCustomReport] = useState(false);
  const [viewMode, setViewMode] = useState<'charts' | 'tables'>('charts');

  // أنواع التقارير
  const reportTypes = [
    { 
      id: 'overview', 
      name: 'نظرة عامة', 
      icon: BarChart3, 
      color: 'text-blue-600',
      description: 'إحصائيات شاملة لجميع أنشطة الوزارة'
    },
    { 
      id: 'financial', 
      name: 'التقرير المالي', 
      icon: DollarSign, 
      color: 'text-green-600',
      description: 'تقرير مفصل عن الإيرادات والمصروفات'
    },
    { 
      id: 'cases', 
      name: 'تقرير القضايا', 
      icon: Gavel, 
      color: 'text-red-600',
      description: 'إحصائيات القضايا وحالاتها'
    },
    { 
      id: 'lands', 
      name: 'تقرير الأراضي', 
      icon: Building, 
      color: 'text-purple-600',
      description: 'تقرير شامل عن الأراضي الوقفية'
    },
    { 
      id: 'performance', 
      name: 'تقرير الأداء', 
      icon: TrendingUp, 
      color: 'text-orange-600',
      description: 'مؤشرات الأداء الرئيسية'
    },
    { 
      id: 'documents', 
      name: 'تقرير الوثائق', 
      icon: FileText, 
      color: 'text-teal-600',
      description: 'إحصائيات الوثائق والأرشيف'
    }
  ];

  const periodOptions = [
    { value: 'daily', label: 'يومي' },
    { value: 'weekly', label: 'أسبوعي' },
    { value: 'monthly', label: 'شهري' },
    { value: 'quarterly', label: 'ربع سنوي' },
    { value: 'yearly', label: 'سنوي' },
    { value: 'custom', label: 'مخصص' }
  ];

  const governorateOptions = [
    { value: 'all', label: 'جميع المحافظات' },
    { value: 'jerusalem', label: 'القدس' },
    { value: 'ramallah', label: 'رام الله والبيرة' },
    { value: 'nablus', label: 'نابلس' },
    { value: 'hebron', label: 'الخليل' },
    { value: 'gaza', label: 'غزة' },
    { value: 'jenin', label: 'جنين' }
  ];

  const exportFormats = [
    { value: 'pdf', label: 'PDF', icon: FileText },
    { value: 'excel', label: 'Excel', icon: FileText },
    { value: 'csv', label: 'CSV', icon: FileText },
    { value: 'word', label: 'Word', icon: FileText }
  ];

  // بيانات تجريبية للتقارير
  const overviewData = {
    totalLands: 1247,
    totalCases: 89,
    totalDocuments: 15432,
    totalUsers: 156,
    totalValue: 12500000,
    monthlyIncome: 85000,
    monthlyExpenses: 52000,
    activeLands: 1156,
    disputedLands: 45,
    resolvedCases: 234,
    pendingCases: 89
  };

  const monthlyData = [
    { month: 'يناير', cases: 45, lands: 12, documents: 234, income: 75000, expenses: 45000 },
    { month: 'فبراير', cases: 52, lands: 18, documents: 189, income: 82000, expenses: 48000 },
    { month: 'مارس', cases: 38, lands: 15, documents: 267, income: 78000, expenses: 52000 },
    { month: 'أبريل', cases: 61, lands: 22, documents: 298, income: 85000, expenses: 55000 },
    { month: 'مايو', cases: 55, lands: 19, documents: 312, income: 88000, expenses: 58000 },
    { month: 'يونيو', cases: 67, lands: 25, documents: 345, income: 92000, expenses: 62000 }
  ];

  const casesByType = [
    { name: 'ملكية', value: 35, color: '#3B82F6' },
    { name: 'حدود', value: 28, color: '#EF4444' },
    { name: 'إيرادات', value: 15, color: '#10B981' },
    { name: 'صيانة', value: 12, color: '#F59E0B' },
    { name: 'قانونية', value: 10, color: '#8B5CF6' }
  ];

  const landsByType = [
    { name: 'مساجد', value: 456, color: '#22C55E' },
    { name: 'تجاري', value: 234, color: '#3B82F6' },
    { name: 'سكني', value: 189, color: '#F59E0B' },
    { name: 'زراعي', value: 156, color: '#10B981' },
    { name: 'مدارس', value: 123, color: '#8B5CF6' },
    { name: 'مقابر', value: 89, color: '#6B7280' }
  ];

  const governorateStats = [
    { name: 'القدس', lands: 234, cases: 23, value: 3200000, income: 18500 },
    { name: 'رام الله', lands: 189, cases: 18, value: 2800000, income: 15200 },
    { name: 'نابلس', lands: 156, cases: 15, value: 2100000, income: 12800 },
    { name: 'الخليل', lands: 145, cases: 12, value: 1900000, income: 11500 },
    { name: 'غزة', lands: 234, cases: 21, value: 1800000, income: 14200 },
    { name: 'جنين', lands: 123, cases: 8, value: 1200000, income: 8900 }
  ];

  const performanceMetrics = [
    { metric: 'معدل حل القضايا', value: 85, target: 90, unit: '%', trend: 'up' },
    { metric: 'رضا المستخدمين', value: 92, target: 95, unit: '%', trend: 'up' },
    { metric: 'وقت الاستجابة', value: 2.3, target: 2.0, unit: 'يوم', trend: 'down' },
    { metric: 'دقة البيانات', value: 96, target: 98, unit: '%', trend: 'up' },
    { metric: 'استخدام النظام', value: 78, target: 85, unit: '%', trend: 'up' },
    { metric: 'كفاءة العمليات', value: 88, target: 90, unit: '%', trend: 'up' }
  ];

  const quickReports = [
    { id: 'daily_summary', name: 'ملخص يومي', icon: Clock, description: 'ملخص أنشطة اليوم' },
    { id: 'weekly_cases', name: 'قضايا الأسبوع', icon: Gavel, description: 'تقرير القضايا الأسبوعي' },
    { id: 'monthly_financial', name: 'المالي الشهري', icon: DollarSign, description: 'التقرير المالي الشهري' },
    { id: 'quarterly_performance', name: 'الأداء الربع سنوي', icon: TrendingUp, description: 'تقرير الأداء الربع سنوي' }
  ];

  const renderOverviewReport = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">إجمالي الأراضي</p>
              <p className="text-3xl font-bold">{overviewData.totalLands.toLocaleString()}</p>
            </div>
            <Building className="w-8 h-8 text-blue-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-red-500 to-red-600 text-white p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100">القضايا النشطة</p>
              <p className="text-3xl font-bold">{overviewData.totalCases}</p>
            </div>
            <Gavel className="w-8 h-8 text-red-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">الوثائق المؤرشفة</p>
              <p className="text-3xl font-bold">{overviewData.totalDocuments.toLocaleString()}</p>
            </div>
            <FileText className="w-8 h-8 text-green-200" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">المستخدمون النشطون</p>
              <p className="text-3xl font-bold">{overviewData.totalUsers}</p>
            </div>
            <Users className="w-8 h-8 text-purple-200" />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">النشاط الشهري</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="cases" fill="#EF4444" name="القضايا" />
              <Bar dataKey="lands" fill="#10B981" name="الأراضي" />
              <Bar dataKey="documents" fill="#3B82F6" name="الوثائق" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">توزيع أنواع الأراضي</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart>
              <Pie
                data={landsByType}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {landsByType.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const renderFinancialReport = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border-r-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">الإيرادات الشهرية</p>
              <p className="text-2xl font-bold text-green-600">{overviewData.monthlyIncome.toLocaleString()} ₪</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border-r-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">المصروفات الشهرية</p>
              <p className="text-2xl font-bold text-red-600">{overviewData.monthlyExpenses.toLocaleString()} ₪</p>
            </div>
            <Activity className="w-8 h-8 text-red-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border-r-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">صافي الدخل</p>
              <p className="text-2xl font-bold text-blue-600">
                {(overviewData.monthlyIncome - overviewData.monthlyExpenses).toLocaleString()} ₪
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-blue-500" />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">الاتجاه المالي (6 أشهر)</h3>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="income" stackId="1" stroke="#10B981" fill="#10B981" name="الإيرادات" />
            <Area type="monotone" dataKey="expenses" stackId="2" stroke="#EF4444" fill="#EF4444" name="المصروفات" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderCasesReport = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border-r-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">إجمالي القضايا</p>
              <p className="text-3xl font-bold text-gray-800">{overviewData.totalCases}</p>
            </div>
            <Gavel className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border-r-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">قضايا محلولة</p>
              <p className="text-3xl font-bold text-green-600">{overviewData.resolvedCases}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border-r-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">قضايا معلقة</p>
              <p className="text-3xl font-bold text-orange-600">{overviewData.pendingCases}</p>
            </div>
            <Clock className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">توزيع القضايا حسب النوع</h3>
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

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">اتجاه القضايا الشهري</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="cases" stroke="#EF4444" strokeWidth={3} name="القضايا" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const renderPerformanceReport = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {performanceMetrics.map((metric, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-800">{metric.metric}</h4>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                metric.trend === 'up' ? 'bg-green-100' : 'bg-red-100'
              }`}>
                <TrendingUp className={`w-4 h-4 ${
                  metric.trend === 'up' ? 'text-green-600' : 'text-red-600 transform rotate-180'
                }`} />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-800">{metric.value}{metric.unit}</span>
                <span className="text-sm text-gray-500">الهدف: {metric.target}{metric.unit}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
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
    </div>
  );

  const renderGovernorateTable = () => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">إحصائيات المحافظات</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                المحافظة
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                عدد الأراضي
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                القضايا النشطة
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                القيمة الإجمالية
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                الدخل الشهري
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {governorateStats.map((gov, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-900">{gov.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {gov.lands}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {gov.cases}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {gov.value.toLocaleString()} ₪
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {gov.income.toLocaleString()} ₪
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderReportContent = () => {
    switch (selectedReport) {
      case 'overview':
        return renderOverviewReport();
      case 'financial':
        return renderFinancialReport();
      case 'cases':
        return renderCasesReport();
      case 'performance':
        return renderPerformanceReport();
      default:
        return renderOverviewReport();
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">التقارير والإحصائيات</h1>
          <p className="text-gray-600 mt-1">نظام تقارير متقدم مع تحليلات بيانية تفاعلية</p>
        </div>
        <div className="flex items-center space-x-4 space-x-reverse">
          <button 
            onClick={() => setShowCustomReport(true)}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center"
          >
            <Plus className="w-5 h-5 ml-2" />
            تقرير مخصص
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
            <Download className="w-5 h-5 ml-2" />
            تصدير التقرير
          </button>
        </div>
      </div>

      {/* Report Types */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {reportTypes.map((report) => {
            const ReportIcon = report.icon;
            return (
              <button
                key={report.id}
                onClick={() => setSelectedReport(report.id)}
                className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all ${
                  selectedReport === report.id
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                }`}
              >
                <ReportIcon className={`w-8 h-8 mb-2 ${selectedReport === report.id ? 'text-green-600' : report.color}`} />
                <span className="font-medium text-sm text-center">{report.name}</span>
                <span className="text-xs text-gray-500 text-center mt-1">{report.description}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">الفترة الزمنية</label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {periodOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">المحافظة</label>
            <select
              value={selectedGovernorate}
              onChange={(e) => setSelectedGovernorate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {governorateOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">تنسيق التصدير</label>
            <select
              value={exportFormat}
              onChange={(e) => setExportFormat(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {exportFormats.map(format => (
                <option key={format.value} value={format.value}>{format.label}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">عرض البيانات</label>
            <div className="flex items-center space-x-2 space-x-reverse">
              <button
                onClick={() => setViewMode('charts')}
                className={`flex-1 py-2 px-3 rounded-lg transition-colors ${
                  viewMode === 'charts' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}
              >
                <BarChart3 className="w-4 h-4 mx-auto" />
              </button>
              <button
                onClick={() => setViewMode('tables')}
                className={`flex-1 py-2 px-3 rounded-lg transition-colors ${
                  viewMode === 'tables' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}
              >
                <Grid className="w-4 h-4 mx-auto" />
              </button>
            </div>
          </div>
          
          <div className="flex items-end space-x-2 space-x-reverse">
            <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
              <RefreshCw className="w-4 h-4 ml-1" />
              تحديث
            </button>
            <button className="bg-gray-600 text-white py-2 px-3 rounded-lg hover:bg-gray-700 transition-colors">
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Reports */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">التقارير السريعة</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickReports.map((report) => (
            <button
              key={report.id}
              className="flex items-center space-x-3 space-x-reverse p-4 border border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all"
            >
              <report.icon className="w-6 h-6 text-green-600" />
              <div className="text-right">
                <div className="font-medium text-gray-800">{report.name}</div>
                <div className="text-sm text-gray-500">{report.description}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Report Content */}
      {viewMode === 'charts' ? (
        renderReportContent()
      ) : (
        <div className="space-y-6">
          {renderGovernorateTable()}
        </div>
      )}

      {/* Custom Report Modal */}
      {showCustomReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">إنشاء تقرير مخصص</h2>
              <button
                onClick={() => setShowCustomReport(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">اسم التقرير</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="أدخل اسم التقرير"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">نوع التقرير</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                  {reportTypes.map(type => (
                    <option key={type.id} value={type.id}>{type.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">من تاريخ</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">إلى تاريخ</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">المحافظات المشمولة</label>
                <div className="border border-gray-300 rounded-lg p-3 max-h-32 overflow-y-auto">
                  <div className="space-y-2">
                    {governorateOptions.slice(1).map((gov) => (
                      <label key={gov.value} className="flex items-center space-x-2 space-x-reverse">
                        <input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-500" />
                        <span className="text-sm">{gov.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">المعايير المطلوبة</label>
                <div className="border border-gray-300 rounded-lg p-3 max-h-32 overflow-y-auto">
                  <div className="space-y-2">
                    {['عدد الأراضي', 'القيمة الإجمالية', 'الإيرادات', 'المصروفات', 'القضايا', 'الوثائق'].map((metric, index) => (
                      <label key={index} className="flex items-center space-x-2 space-x-reverse">
                        <input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-500" defaultChecked />
                        <span className="text-sm">{metric}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-4 space-x-reverse pt-4">
                <button
                  type="button"
                  onClick={() => setShowCustomReport(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  إنشاء التقرير
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsStatistics;