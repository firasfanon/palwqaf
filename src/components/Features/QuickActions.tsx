import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  FileText, 
  Building, 
  Users, 
  Calendar,
  MapPin,
  BarChart3,
  Settings,
  Bell,
  Download,
  Upload
} from 'lucide-react';

const QuickActions: React.FC = () => {
  const actions = [
    {
      id: 'waqf-lands',
      title: 'الأراضي الوقفية',
      description: 'إدارة الأراضي الوقفية',
      icon: Building,
      color: 'from-green-500 to-green-600',
      href: '/admin/waqf-lands'
    },
    {
      id: 'cases',
      title: 'إدارة القضايا',
      description: 'متابعة القضايا الوقفية',
      icon: FileText,
      color: 'from-red-500 to-red-600',
      href: '/admin/cases'
    },
    {
      id: 'documents',
      title: 'إدارة المستندات',
      description: 'تنظيم وأرشفة الوثائق',
      icon: FileText,
      color: 'from-blue-500 to-blue-600',
      href: '/admin/documents'
    },
    {
      id: 'search',
      title: 'البحث المتقدم',
      description: 'البحث في جميع الأنظمة',
      icon: Search,
      color: 'from-purple-500 to-purple-600',
      href: '/admin/search'
    },
    {
      id: 'appointments',
      title: 'جدولة المواعيد',
      description: 'إدارة المواعيد والاجتماعات',
      icon: Calendar,
      color: 'from-orange-500 to-orange-600',
      href: '/admin/appointments'
    },
    {
      id: 'archive',
      title: 'الأرشيف الإلكتروني',
      description: 'الأرشيف الرقمي الشامل',
      icon: Download,
      color: 'from-teal-500 to-teal-600',
      href: '/admin/archive'
    },
    {
      id: 'reports',
      title: 'التقارير المتقدمة',
      description: 'تقارير وإحصائيات تفصيلية',
      icon: BarChart3,
      color: 'from-indigo-500 to-indigo-600',
      href: '/admin/reports-advanced'
    },
    {
      id: 'gis',
      title: 'نظام GIS',
      description: 'خرائط الأراضي الجغرافية',
      icon: MapPin,
      color: 'from-pink-500 to-pink-600',
      href: '/admin/gis'
    }
  ];

  return (
    <div className="card-islamic">
      <h3 className="text-lg font-semibold text-islamic-800 mb-6 font-display">الإجراءات السريعة</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {actions.map((action) => (
          <Link
            key={action.id}
            to={action.href}
            className="group flex flex-col items-center p-4 rounded-xl border border-sage-200 hover:border-islamic-300 hover:shadow-md transition-all duration-300 bg-white"
          >
            <div className={`w-12 h-12 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
              <action.icon className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-medium text-islamic-800 text-center font-body text-sm">
              {action.title}
            </h4>
            <p className="text-xs text-sage-600 text-center mt-1 font-body">
              {action.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;