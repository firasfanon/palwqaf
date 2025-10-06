import React from 'react';
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
  DollarSign
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const Dashboard: React.FC = () => {
  // بيانات تجريبية للإحصائيات
  const stats = [
    { 
      title: 'إجمالي الأراضي الوقفية', 
      value: '1,247', 
      change: '+12', 
      icon: MapPin, 
      color: 'bg-blue-500',
      trend: 'up'
    },
    { 
      title: 'القضايا النشطة', 
      value: '89', 
      change: '-5', 
      icon: Gavel, 
      color: 'bg-red-500',
      trend: 'down'
    },
    { 
      title: 'الوثائق المؤرشفة', 
      value: '15,432', 
      change: '+234', 
      icon: FileText, 
      color: 'bg-green-500',
      trend: 'up'
    },
    { 
      title: 'المستخدمون النشطون', 
      value: '156', 
      change: '+8', 
      icon: Users, 
      color: 'bg-purple-500',
      trend: 'up'
    }
  ];

  const casesByType = [
    { name: 'ملكية', value: 35, color: '#3B82F6' },
    { name: 'حدود', value: 28, color: '#EF4444' },
    { name: 'إيرادات', value: 15, color: '#10B981' },
    { name: 'صيانة', value: 12, color: '#F59E0B' },
    { name: 'قانونية', value: 10, color: '#8B5CF6' }
  ];

  const monthlyData = [
    { month: 'يناير', cases: 45, lands: 12, documents: 234 },
    { month: 'فبراير', cases: 52, lands: 18, documents: 189 },
    { month: 'مارس', cases: 38, lands: 15, documents: 267 },
    { month: 'أبريل', cases: 61, lands: 22, documents: 298 },
    { month: 'مايو', cases: 55, lands: 19, documents: 312 },
    { month: 'يونيو', cases: 67, lands: 25, documents: 345 }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'case',
      title: 'تم إنشاء قضية جديدة: نزاع حدود أرض المسجد الكبير',
      time: 'منذ 5 دقائق',
      user: 'أحمد محمد',
      status: 'new'
    },
    {
      id: 2,
      type: 'document',
      title: 'تم رفع وثيقة: سند ملكية أرض وقف الزيتون',
      time: 'منذ 15 دقيقة',
      user: 'فاطمة أحمد',
      status: 'success'
    },
    {
      id: 3,
      type: 'appointment',
      title: 'موعد جديد: اجتماع لجنة الأوقاف',
      time: 'منذ 30 دقيقة',
      user: 'محمد علي',
      status: 'scheduled'
    },
    {
      id: 4,
      type: 'case',
      title: 'تم حل القضية: صيانة مسجد الرحمة',
      time: 'منذ ساعة',
      user: 'سارة خالد',
      status: 'resolved'
    }
  ];

  const urgentTasks = [
    {
      id: 1,
      title: 'مراجعة قضية نزاع أرض المقبرة الشرقية',
      dueDate: '2024-01-20',
      priority: 'urgent',
      assignee: 'أحمد محمد'
    },
    {
      id: 2,
      title: 'تحديث وثائق أرض وقف المدرسة',
      dueDate: '2024-01-22',
      priority: 'high',
      assignee: 'فاطمة أحمد'
    },
    {
      id: 3,
      title: 'إعداد تقرير الإيرادات الشهري',
      dueDate: '2024-01-25',
      priority: 'medium',
      assignee: 'محمد علي'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">لوحة التحكم الرئيسية</h1>
          <p className="text-gray-600 mt-1">نظرة عامة على نشاط النظام والإحصائيات الرئيسية</p>
        </div>
        <div className="flex items-center space-x-4 space-x-reverse">
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            تصدير التقرير
          </button>
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            تحديث البيانات
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="card-islamic">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-sage-600 font-body">{stat.title}</p>
                <p className="text-3xl font-bold text-islamic-700 mt-2 font-display">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className={`w-4 h-4 ml-1 ${stat.trend === 'up' ? 'text-islamic-500' : 'text-red-500'}`} />
                  <span className={`text-sm font-medium font-body ${stat.trend === 'up' ? 'text-islamic-600' : 'text-red-600'}`}>
                    {stat.change} هذا الشهر
                  </span>
                </div>
              </div>
              <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Activity Chart */}
        <div className="card-islamic">
          <h3 className="text-lg font-semibold text-islamic-800 mb-4 font-display">النشاط الشهري</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="cases" fill="#16a34a" name="القضايا" />
              <Bar dataKey="lands" fill="#eab308" name="الأراضي" />
              <Bar dataKey="documents" fill="#22c55e" name="الوثائق" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Cases by Type Pie Chart */}
        <div className="card-golden">
          <h3 className="text-lg font-semibold text-golden-800 mb-4 font-display">توزيع القضايا حسب النوع</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
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
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activities and Urgent Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="card-sage">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-sage-800 font-display">النشاطات الأخيرة</h3>
            <button className="text-islamic-600 hover:text-islamic-700 text-sm font-medium font-body">
              عرض الكل
            </button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 space-x-reverse p-3 bg-white rounded-lg shadow-sm">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.status === 'new' ? 'bg-islamic-500' :
                  activity.status === 'success' ? 'bg-islamic-500' :
                  activity.status === 'scheduled' ? 'bg-golden-500' :
                  'bg-gray-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-sage-800 font-body">{activity.title}</p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-sage-600 font-body">{activity.user}</p>
                    <p className="text-xs text-sage-500 font-body">{activity.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Urgent Tasks */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800 font-display">المهام العاجلة</h3>
            <button className="text-islamic-600 hover:text-islamic-700 text-sm font-medium font-body">
              إدارة المهام
            </button>
          </div>
          <div className="space-y-4">
            {urgentTasks.map((task) => (
              <div key={task.id} className="p-4 border border-sage-200 rounded-lg bg-islamic-50">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-islamic-800 font-body">{task.title}</h4>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    task.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                    task.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {task.priority === 'urgent' ? 'عاجل' : task.priority === 'high' ? 'مهم' : 'متوسط'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-sage-600">
                  <span className="font-body">المسؤول: {task.assignee}</span>
                  <span className="font-body">الموعد: {new Date(task.dueDate).toLocaleDateString('ar-EG')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card-islamic">
        <h3 className="text-lg font-semibold text-islamic-800 mb-4 font-display">الإجراءات السريعة</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center p-4 border border-sage-200 rounded-lg hover:bg-islamic-50 transition-colors">
            <Gavel className="w-8 h-8 text-red-600 mb-2" />
            <span className="text-sm font-medium text-islamic-800 font-body">إضافة قضية</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-sage-200 rounded-lg hover:bg-islamic-50 transition-colors">
            <MapPin className="w-8 h-8 text-islamic-600 mb-2" />
            <span className="text-sm font-medium text-islamic-800 font-body">تسجيل أرض</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-sage-200 rounded-lg hover:bg-islamic-50 transition-colors">
            <FileText className="w-8 h-8 text-golden-600 mb-2" />
            <span className="text-sm font-medium text-islamic-800 font-body">رفع وثيقة</span>
          </button>
          <button className="flex flex-col items-center p-4 border border-sage-200 rounded-lg hover:bg-islamic-50 transition-colors">
            <Calendar className="w-8 h-8 text-sage-600 mb-2" />
            <span className="text-sm font-medium text-islamic-800 font-body">حجز موعد</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;