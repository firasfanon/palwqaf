import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  FileText, 
  MapPin, 
  Calendar, 
  Users, 
  Settings, 
  BarChart3,
  Archive,
  Search,
  Gavel,
  Map,
  FolderOpen,
  Clock,
  Bell,
  Key
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  const menuItems = [
    { 
      id: 'dashboard', 
      name: 'لوحة التحكم', 
      icon: Home, 
      path: '/admin',
      color: 'text-blue-600'
    },
    { 
      id: 'homepage', 
      name: 'إدارة الصفحة الرئيسية', 
      icon: Settings, 
      path: '/admin/homepage',
      color: 'text-islamic-600'
    },
    { 
      id: 'website', 
      name: 'إدارة الموقع الإلكتروني', 
      icon: Globe, 
      path: '/admin/website',
      color: 'text-blue-600'
    },
    { 
      id: 'national-registry', 
      name: 'المفتاح الوطني للأوقاف', 
      icon: Key, 
      path: '/admin/national-registry',
      color: 'text-green-600'
    },
     { 
      id: 'gis', 
      name: 'نظام المعلومات الجغرافية', 
      icon: Map, 
      path: '/admin/gis',
      color: 'text-purple-600'
    },
     { 
      id: 'waqf-lands', 
      name: 'ادارة الاراضي الوقفية', 
      icon: MapPin, 
      path: '/admin/waqf-lands',
      color: 'text-blue-600'
    },
   
    { 
      id: 'cases', 
      name: 'إدارة القضايا', 
      icon: Gavel, 
      path: '/admin/cases',
      color: 'text-red-600'
    },
     { 
      id: 'documents', 
      name: 'إدارة الوثائق', 
      icon: FolderOpen, 
      path: '/admin/documents',
      color: 'text-orange-600'
    },
       { 
      id: 'appointments', 
      name: 'المواعيد والتقويم', 
      icon: Calendar, 
      path: '/admin/appointments',
      color: 'text-pink-600'
    },
   
    { 
      id: 'archive', 
      name: 'الأرشيف الإلكتروني', 
      icon: Archive, 
      path: '/admin/archive',
      color: 'text-indigo-600'
    },
    { 
      id: 'search', 
      name: 'البحث المتقدم', 
      icon: Search, 
      path: '/admin/search',
      color: 'text-teal-600'
    },
       
    { 
      id: 'reports', 
      name: 'التقارير والإحصائيات', 
      icon: BarChart3, 
      path: '/admin/reports',
      color: 'text-yellow-600'
    },
    { 
      id: 'notifications', 
      name: 'الإشعارات', 
      icon: Bell, 
      path: '/admin/notifications',
      color: 'text-orange-600'
    },
    { 
      id: 'users', 
      name: 'إدارة المستخدمين', 
      icon: Users, 
      path: '/admin/users',
      color: 'text-cyan-600'
    },
    { 
      id: 'settings', 
      name: 'الإعدادات العامة', 
      icon: Settings, 
      path: '/admin/settings',
      color: 'text-gray-600'
    }
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed top-0 right-0 h-full w-80 bg-white shadow-elegant z-50 transform transition-transform duration-300 ease-in-out border-l border-islamic-200
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-8 border-b border-islamic-200 islamic-pattern">
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="w-16 h-16 islamic-gradient rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg font-display">أوقاف</span>
              </div>
              <div>
                <h2 className="font-bold text-xl text-islamic-800 font-display">نظام إدارة الأوقاف</h2>
                <p className="text-sm text-sage-600 font-body">النظام المتكامل</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto py-6">
            <nav className="space-y-2 px-6">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    onClick={onClose}
                    className={`
                      flex items-center space-x-3 space-x-reverse px-6 py-4 rounded-xl transition-all duration-300 font-body
                      ${isActive 
                        ? 'bg-islamic-50 text-islamic-700 border-r-4 border-islamic-600 shadow-md' 
                        : 'text-sage-700 hover:bg-islamic-50 hover:text-islamic-700'
                      }
                    `}
                  >
                    <item.icon className={`w-6 h-6 ${isActive ? 'text-islamic-600' : item.color}`} />
                    <span className="font-semibold">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-islamic-200 bg-islamic-50">
            <div className="text-center text-sm text-sage-600 font-body">
              <p className="font-semibold">© 2024 وزارة الأوقاف</p>
              <p>النسخة 2.0</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;