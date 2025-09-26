import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  Users, 
  MapPin, 
  FileText,
  Bell,
  CheckCircle,
  XCircle,
  AlertTriangle,
  User,
  Video,
  Phone,
  Building,
  Navigation,
  ChevronLeft,
  ChevronRight,
  Grid,
  List,
  Settings,
  Download,
  Share2,
  Printer,
  RefreshCw,
  Zap,
  TrendingUp,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';

const AppointmentsCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // بيانات تجريبية للمواعيد
  const appointments = [
    {
      id: 1,
      title: 'اجتماع لجنة الأوقاف الشهري',
      description: 'اجتماع شهري لمناقشة القضايا العالقة والمشاريع الجديدة',
      type: 'meeting',
      startTime: '2024-01-20T10:00:00',
      endTime: '2024-01-20T12:00:00',
      location: 'قاعة الاجتماعات الرئيسية - الطابق الثالث',
      meetingType: 'in_person',
      attendees: [
        { id: 1, name: 'أحمد محمد الأحمد', role: 'مدير القضايا', status: 'confirmed' },
        { id: 2, name: 'فاطمة خالد يوسف', role: 'مدير الأراضي', status: 'confirmed' },
        { id: 3, name: 'محمد علي حسن', role: 'مدير المالية', status: 'pending' },
        { id: 4, name: 'سارة أحمد محمود', role: 'مدير الوثائق', status: 'confirmed' }
      ],
      relatedCaseId: null,
      relatedWaqfId: null,
      status: 'confirmed',
      priority: 'high',
      createdBy: 'مدير النظام',
      createdAt: '2024-01-15',
      documents: [
        { id: 1, name: 'جدول الأعمال', type: 'pdf' },
        { id: 2, name: 'تقرير الشهر السابق', type: 'word' }
      ],
      reminders: [
        { time: '1_day', sent: true },
        { time: '1_hour', sent: false }
      ]
    },
    {
      id: 2,
      title: 'جلسة استماع - نزاع حدود أرض المسجد الكبير',
      description: 'جلسة استماع للأطراف المتنازعة حول حدود أرض المسجد الكبير',
      type: 'hearing',
      startTime: '2024-01-22T14:00:00',
      endTime: '2024-01-22T16:00:00',
      location: 'قاعة الجلسات - الطابق الثاني',
      meetingType: 'in_person',
      attendees: [
        { id: 5, name: 'المحامي أحمد سالم', role: 'محامي الطرف الأول', status: 'confirmed' },
        { id: 6, name: 'المحامي محمد قاسم', role: 'محامي الطرف الثاني', status: 'confirmed' },
        { id: 1, name: 'أحمد محمد الأحمد', role: 'مدير القضايا', status: 'confirmed' }
      ],
      relatedCaseId: 1,
      relatedWaqfId: 1,
      status: 'scheduled',
      priority: 'urgent',
      createdBy: 'مدير القضايا',
      createdAt: '2024-01-16',
      documents: [
        { id: 3, name: 'ملف القضية الكامل', type: 'pdf' },
        { id: 4, name: 'خرائط الحدود', type: 'image' }
      ],
      reminders: [
        { time: '1_day', sent: false },
        { time: '2_hours', sent: false }
      ]
    },
    {
      id: 3,
      title: 'كشف ميداني - وقف الزيتون التجاري',
      description: 'كشف ميداني لتقييم حالة المباني والمرافق في وقف الزيتون',
      type: 'inspection',
      startTime: '2024-01-25T09:00:00',
      endTime: '2024-01-25T11:30:00',
      location: 'وقف الزيتون التجاري - رام الله',
      meetingType: 'field',
      attendees: [
        { id: 2, name: 'فاطمة خالد يوسف', role: 'مدير الأراضي', status: 'confirmed' },
        { id: 7, name: 'المهندس خالد نصر', role: 'مهندس معماري', status: 'confirmed' },
        { id: 8, name: 'أحمد عبد الله', role: 'مساح', status: 'pending' }
      ],
      relatedCaseId: null,
      relatedWaqfId: 2,
      status: 'scheduled',
      priority: 'medium',
      createdBy: 'مدير الأراضي',
      createdAt: '2024-01-17',
      documents: [
        { id: 5, name: 'خطة الكشف الميداني', type: 'pdf' },
        { id: 6, name: 'نموذج التقييم', type: 'excel' }
      ],
      reminders: [
        { time: '1_day', sent: false }
      ]
    },
    {
      id: 4,
      title: 'استشارة قانونية - تحديث سندات الملكية',
      description: 'استشارة قانونية حول إجراءات تحديث سندات ملكية المقبرة الشرقية',
      type: 'consultation',
      startTime: '2024-01-23T11:00:00',
      endTime: '2024-01-23T12:00:00',
      location: 'مكتب الاستشارات القانونية',
      meetingType: 'hybrid',
      attendees: [
        { id: 9, name: 'المستشار القانوني محمد رشيد', role: 'مستشار قانوني', status: 'confirmed' },
        { id: 10, name: 'نور الدين أحمد', role: 'مدير الشؤون القانونية', status: 'confirmed' }
      ],
      relatedCaseId: 4,
      relatedWaqfId: 4,
      status: 'confirmed',
      priority: 'high',
      createdBy: 'مدير الشؤون القانونية',
      createdAt: '2024-01-18',
      documents: [
        { id: 7, name: 'السندات الحالية', type: 'pdf' },
        { id: 8, name: 'القوانين الجديدة', type: 'pdf' }
      ],
      reminders: [
        { time: '2_hours', sent: false }
      ]
    },
    {
      id: 5,
      title: 'اجتماع تقييم الأداء الربع سنوي',
      description: 'اجتماع تقييم أداء الإدارات للربع الأول من العام',
      type: 'meeting',
      startTime: '2024-01-28T13:00:00',
      endTime: '2024-01-28T15:30:00',
      location: 'قاعة المؤتمرات الكبرى',
      meetingType: 'remote',
      attendees: [
        { id: 1, name: 'أحمد محمد الأحمد', role: 'مدير القضايا', status: 'confirmed' },
        { id: 2, name: 'فاطمة خالد يوسف', role: 'مدير الأراضي', status: 'confirmed' },
        { id: 3, name: 'محمد علي حسن', role: 'مدير المالية', status: 'confirmed' },
        { id: 4, name: 'سارة أحمد محمود', role: 'مدير الوثائق', status: 'pending' },
        { id: 11, name: 'خالد يوسف إبراهيم', role: 'مدير الموارد البشرية', status: 'confirmed' }
      ],
      relatedCaseId: null,
      relatedWaqfId: null,
      status: 'scheduled',
      priority: 'medium',
      createdBy: 'الوزير',
      createdAt: '2024-01-19',
      documents: [
        { id: 9, name: 'تقرير الأداء الربع سنوي', type: 'excel' },
        { id: 10, name: 'مؤشرات الأداء الرئيسية', type: 'pdf' }
      ],
      reminders: [
        { time: '1_week', sent: true },
        { time: '1_day', sent: false }
      ]
    }
  ];

  const appointmentTypes = [
    { value: 'all', label: 'جميع الأنواع', icon: Calendar, color: 'text-gray-600' },
    { value: 'meeting', label: 'اجتماع', icon: Users, color: 'text-blue-600' },
    { value: 'inspection', label: 'كشف ميداني', icon: Eye, color: 'text-green-600' },
    { value: 'hearing', label: 'جلسة استماع', icon: AlertTriangle, color: 'text-red-600' },
    { value: 'consultation', label: 'استشارة', icon: FileText, color: 'text-purple-600' }
  ];

  const statusOptions = [
    { value: 'all', label: 'جميع الحالات' },
    { value: 'scheduled', label: 'مجدول' },
    { value: 'confirmed', label: 'مؤكد' },
    { value: 'completed', label: 'مكتمل' },
    { value: 'cancelled', label: 'ملغي' }
  ];

  const meetingTypes = [
    { value: 'in_person', label: 'حضوري', icon: Building },
    { value: 'remote', label: 'عن بُعد', icon: Video },
    { value: 'hybrid', label: 'مختلط', icon: Phone },
    { value: 'field', label: 'ميداني', icon: Navigation }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <Clock className="w-4 h-4 text-blue-500" />;
      case 'confirmed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-gray-500" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getMeetingTypeIcon = (type: string) => {
    const meetingType = meetingTypes.find(mt => mt.value === type);
    return meetingType ? meetingType.icon : Building;
  };

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || appointment.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || appointment.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  // حساب الإحصائيات
  const totalAppointments = appointments.length;
  const todayAppointments = appointments.filter(apt => {
    const today = new Date();
    const aptDate = new Date(apt.startTime);
    return aptDate.toDateString() === today.toDateString();
  }).length;

  const upcomingAppointments = appointments.filter(apt => {
    const now = new Date();
    const aptDate = new Date(apt.startTime);
    return aptDate > now;
  }).length;

  const confirmedAppointments = appointments.filter(apt => apt.status === 'confirmed').length;

  // دالة لتنسيق الوقت
  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('ar-EG', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-EG', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">المواعيد والتقويم</h1>
          <p className="text-gray-600 mt-1">نظام إدارة المواعيد والاجتماعات مع التذكيرات التلقائية</p>
        </div>
        <div className="flex items-center space-x-4 space-x-reverse">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
            <Download className="w-5 h-5 ml-2" />
            تصدير التقويم
          </button>
          <button 
            onClick={() => setShowModal(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
          >
            <Plus className="w-5 h-5 ml-2" />
            موعد جديد
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 border-r-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">إجمالي المواعيد</p>
              <p className="text-3xl font-bold text-gray-800">{totalAppointments}</p>
            </div>
            <Calendar className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border-r-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">مواعيد اليوم</p>
              <p className="text-3xl font-bold text-gray-800">{todayAppointments}</p>
            </div>
            <Clock className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border-r-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">المواعيد القادمة</p>
              <p className="text-3xl font-bold text-gray-800">{upcomingAppointments}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border-r-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">مواعيد مؤكدة</p>
              <p className="text-3xl font-bold text-gray-800">{confirmedAppointments}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Calendar Controls */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="flex items-center space-x-2 space-x-reverse">
              <button
                onClick={() => {
                  const newDate = new Date(currentDate);
                  newDate.setMonth(newDate.getMonth() - 1);
                  setCurrentDate(newDate);
                }}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-semibold text-gray-800 min-w-[200px] text-center">
                {currentDate.toLocaleDateString('ar-EG', { year: 'numeric', month: 'long' })}
              </h2>
              <button
                onClick={() => {
                  const newDate = new Date(currentDate);
                  newDate.setMonth(newDate.getMonth() + 1);
                  setCurrentDate(newDate);
                }}
                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>
            <button
              onClick={() => setCurrentDate(new Date())}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              اليوم
            </button>
          </div>
          
          <div className="flex items-center space-x-2 space-x-reverse">
            <button
              onClick={() => setViewMode('month')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                viewMode === 'month' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}
            >
              شهري
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                viewMode === 'week' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}
            >
              أسبوعي
            </button>
            <button
              onClick={() => setViewMode('day')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                viewMode === 'day' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}
            >
              يومي
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="البحث في المواعيد..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10 pl-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {appointmentTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
          
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {statusOptions.map(status => (
              <option key={status.value} value={status.value}>{status.label}</option>
            ))}
          </select>
          
          <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-5 h-5 ml-2" />
            فلاتر متقدمة
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'].map(day => (
              <div key={day} className="text-center font-semibold text-gray-600 py-2">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 35 }, (_, i) => {
              const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i - 6);
              const isCurrentMonth = date.getMonth() === currentDate.getMonth();
              const isToday = date.toDateString() === new Date().toDateString();
              const dayAppointments = appointments.filter(apt => {
                const aptDate = new Date(apt.startTime);
                return aptDate.toDateString() === date.toDateString();
              });

              return (
                <div
                  key={i}
                  className={`min-h-[80px] p-2 rounded-lg border transition-colors ${
                    isCurrentMonth 
                      ? isToday 
                        ? 'bg-green-100 border-green-300' 
                        : 'bg-white border-gray-200 hover:bg-gray-50'
                      : 'bg-gray-100 border-gray-100'
                  }`}
                >
                  <div className={`text-sm font-medium mb-1 ${
                    isCurrentMonth ? 'text-gray-800' : 'text-gray-400'
                  }`}>
                    {date.getDate()}
                  </div>
                  <div className="space-y-1">
                    {dayAppointments.slice(0, 2).map(apt => (
                      <div
                        key={apt.id}
                        onClick={() => {
                          setSelectedAppointment(apt);
                          setShowDetailsModal(true);
                        }}
                        className="text-xs p-1 rounded bg-blue-100 text-blue-800 cursor-pointer hover:bg-blue-200 transition-colors truncate"
                      >
                        {formatTime(apt.startTime)} - {apt.title}
                      </div>
                    ))}
                    {dayAppointments.length > 2 && (
                      <div className="text-xs text-gray-500 text-center">
                        +{dayAppointments.length - 2} أخرى
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Appointments List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">قائمة المواعيد ({filteredAppointments.length})</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الموعد
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  النوع
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  التاريخ والوقت
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  المكان
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الحضور
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الحالة
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAppointments.map((appointment) => {
                const TypeIcon = appointmentTypes.find(t => t.value === appointment.type)?.icon || Calendar;
                const MeetingTypeIcon = getMeetingTypeIcon(appointment.meetingType);
                return (
                  <tr key={appointment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <TypeIcon className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{appointment.title}</div>
                          <div className="text-sm text-gray-500">{appointment.description.slice(0, 50)}...</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                          {appointmentTypes.find(t => t.value === appointment.type)?.label}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityBadge(appointment.priority)}`}>
                          {appointment.priority === 'urgent' ? 'عاجل' : 
                           appointment.priority === 'high' ? 'مهم' :
                           appointment.priority === 'medium' ? 'متوسط' : 'منخفض'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatDate(appointment.startTime)}
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatTime(appointment.startTime)} - {formatTime(appointment.endTime)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <MeetingTypeIcon className="w-4 h-4 text-gray-400" />
                        <div>
                          <div className="text-sm text-gray-900">{appointment.location}</div>
                          <div className="text-xs text-gray-500">
                            {meetingTypes.find(mt => mt.value === appointment.meetingType)?.label}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{appointment.attendees.length}</span>
                        <span className="text-xs text-gray-500">
                          ({appointment.attendees.filter(a => a.status === 'confirmed').length} مؤكد)
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        {getStatusIcon(appointment.status)}
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(appointment.status)}`}>
                          {statusOptions.find(s => s.value === appointment.status)?.label}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <button 
                          onClick={() => {
                            setSelectedAppointment(appointment);
                            setShowDetailsModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-700"
                          title="عرض التفاصيل"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          className="text-green-600 hover:text-green-700"
                          title="تعديل"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          className="text-purple-600 hover:text-purple-700"
                          title="إرسال تذكير"
                        >
                          <Bell className="w-4 h-4" />
                        </button>
                        <button 
                          className="text-red-600 hover:text-red-700"
                          title="حذف"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Appointment Details Modal */}
      {showDetailsModal && selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">تفاصيل الموعد</h2>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-3">معلومات أساسية</h3>
                  <div className="space-y-2">
                    <p><span className="text-gray-500">العنوان:</span> {selectedAppointment.title}</p>
                    <p><span className="text-gray-500">الوصف:</span> {selectedAppointment.description}</p>
                    <p><span className="text-gray-500">النوع:</span> {appointmentTypes.find(t => t.value === selectedAppointment.type)?.label}</p>
                    <p><span className="text-gray-500">المكان:</span> {selectedAppointment.location}</p>
                    <p><span className="text-gray-500">نوع الاجتماع:</span> {meetingTypes.find(mt => mt.value === selectedAppointment.meetingType)?.label}</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-3">التوقيت</h3>
                  <div className="space-y-2">
                    <p><span className="text-gray-500">التاريخ:</span> {formatDate(selectedAppointment.startTime)}</p>
                    <p><span className="text-gray-500">وقت البداية:</span> {formatTime(selectedAppointment.startTime)}</p>
                    <p><span className="text-gray-500">وقت النهاية:</span> {formatTime(selectedAppointment.endTime)}</p>
                    <p><span className="text-gray-500">المدة:</span> {
                      Math.round((new Date(selectedAppointment.endTime).getTime() - new Date(selectedAppointment.startTime).getTime()) / (1000 * 60))
                    } دقيقة</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-3">الوثائق المرفقة</h3>
                  <div className="space-y-2">
                    {selectedAppointment.documents.map((doc: any) => (
                      <div key={doc.id} className="flex items-center justify-between p-2 bg-white rounded border">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <FileText className="w-4 h-4 text-blue-600" />
                          <span className="text-sm">{doc.name}</span>
                        </div>
                        <button className="text-blue-600 hover:text-blue-700">
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-3">قائمة الحضور</h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {selectedAppointment.attendees.map((attendee: any) => (
                      <div key={attendee.id} className="flex items-center justify-between p-2 bg-white rounded border">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <User className="w-4 h-4 text-gray-600" />
                          <div>
                            <div className="text-sm font-medium">{attendee.name}</div>
                            <div className="text-xs text-gray-500">{attendee.role}</div>
                          </div>
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          attendee.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          attendee.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {attendee.status === 'confirmed' ? 'مؤكد' :
                           attendee.status === 'pending' ? 'معلق' : 'رفض'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-3">الحالة والأولوية</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">الحالة:</span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(selectedAppointment.status)}`}>
                        {statusOptions.find(s => s.value === selectedAppointment.status)?.label}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">الأولوية:</span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityBadge(selectedAppointment.priority)}`}>
                        {selectedAppointment.priority === 'urgent' ? 'عاجل' : 
                         selectedAppointment.priority === 'high' ? 'مهم' :
                         selectedAppointment.priority === 'medium' ? 'متوسط' : 'منخفض'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">أنشأ بواسطة:</span>
                      <span className="font-medium">{selectedAppointment.createdBy}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-3">التذكيرات</h3>
                  <div className="space-y-2">
                    {selectedAppointment.reminders.map((reminder: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-white rounded border">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <Bell className="w-4 h-4 text-orange-600" />
                          <span className="text-sm">
                            {reminder.time === '1_week' ? 'أسبوع قبل' :
                             reminder.time === '1_day' ? 'يوم قبل' :
                             reminder.time === '2_hours' ? 'ساعتان قبل' :
                             reminder.time === '1_hour' ? 'ساعة قبل' : reminder.time}
                          </span>
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          reminder.sent ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {reminder.sent ? 'تم الإرسال' : 'لم يُرسل'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    انضمام للاجتماع
                  </button>
                  <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                    تعديل الموعد
                  </button>
                  <button className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition-colors">
                    إرسال تذكير
                  </button>
                  <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
                    إضافة للتقويم الشخصي
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Appointment Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">إضافة موعد جديد</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">عنوان الموعد</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="أدخل عنوان الموعد"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الوصف</label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="أدخل وصف مفصل للموعد"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">نوع الموعد</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                    {appointmentTypes.slice(1).map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">نوع الاجتماع</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                    {meetingTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">تاريخ البداية</label>
                  <input
                    type="datetime-local"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">تاريخ النهاية</label>
                  <input
                    type="datetime-local"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">المكان</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="أدخل مكان الموعد"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الأولوية</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                    <option value="low">منخفضة</option>
                    <option value="medium">متوسطة</option>
                    <option value="high">مهمة</option>
                    <option value="urgent">عاجلة</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">مرتبط بـ</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                    <option value="">غير مرتبط</option>
                    <option value="case">قضية</option>
                    <option value="waqf">أرض وقفية</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الحضور</label>
                <div className="border border-gray-300 rounded-lg p-3 max-h-32 overflow-y-auto">
                  <div className="space-y-2">
                    {['أحمد محمد الأحمد', 'فاطمة خالد يوسف', 'محمد علي حسن', 'سارة أحمد محمود'].map((name, index) => (
                      <label key={index} className="flex items-center space-x-2 space-x-reverse">
                        <input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-500" />
                        <span className="text-sm">{name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-4 space-x-reverse pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  حفظ الموعد
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentsCalendar;