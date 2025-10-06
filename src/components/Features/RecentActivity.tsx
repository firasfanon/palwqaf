import React from 'react';
import { 
  Clock, 
  User, 
  FileText, 
  Building, 
  Gavel, 
  Calendar,
  Eye,
  Edit,
  Plus,
  Trash2,
  Upload,
  Download
} from 'lucide-react';

interface Activity {
  id: string;
  type: 'create' | 'update' | 'delete' | 'view' | 'upload' | 'download';
  entity: 'news' | 'waqf_land' | 'case' | 'document' | 'appointment' | 'user';
  title: string;
  description: string;
  user: string;
  timestamp: string;
}

const RecentActivity: React.FC = () => {
  const activities: Activity[] = [
    {
      id: '1',
      type: 'create',
      entity: 'news',
      title: 'تم إضافة خبر جديد',
      description: 'افتتاح المسجد الجديد في حي الزيتون',
      user: 'أحمد محمد',
      timestamp: '2024-01-15T10:30:00'
    },
    {
      id: '2',
      type: 'update',
      entity: 'waqf_land',
      title: 'تم تحديث بيانات أرض وقفية',
      description: 'وقف الزيتون التجاري - رام الله',
      user: 'فاطمة خالد',
      timestamp: '2024-01-15T09:15:00'
    },
    {
      id: '3',
      type: 'create',
      entity: 'case',
      title: 'تم إنشاء قضية جديدة',
      description: 'نزاع حدود أرض المسجد الكبير',
      user: 'محمد علي',
      timestamp: '2024-01-15T08:45:00'
    },
    {
      id: '4',
      type: 'upload',
      entity: 'document',
      title: 'تم رفع وثيقة جديدة',
      description: 'سند ملكية المقبرة الشرقية',
      user: 'سارة أحمد',
      timestamp: '2024-01-15T08:20:00'
    },
    {
      id: '5',
      type: 'create',
      entity: 'appointment',
      title: 'تم جدولة موعد جديد',
      description: 'اجتماع لجنة الأوقاف الشهري',
      user: 'خالد يوسف',
      timestamp: '2024-01-15T07:55:00'
    }
  ];

  const getActivityIcon = (type: string, entity: string) => {
    switch (type) {
      case 'create':
        return <Plus className="w-4 h-4 text-green-600" />;
      case 'update':
        return <Edit className="w-4 h-4 text-blue-600" />;
      case 'delete':
        return <Trash2 className="w-4 h-4 text-red-600" />;
      case 'view':
        return <Eye className="w-4 h-4 text-purple-600" />;
      case 'upload':
        return <Upload className="w-4 h-4 text-orange-600" />;
      case 'download':
        return <Download className="w-4 h-4 text-teal-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getEntityIcon = (entity: string) => {
    switch (entity) {
      case 'news':
        return <FileText className="w-4 h-4 text-blue-600" />;
      case 'waqf_land':
        return <Building className="w-4 h-4 text-green-600" />;
      case 'case':
        return <Gavel className="w-4 h-4 text-red-600" />;
      case 'document':
        return <FileText className="w-4 h-4 text-purple-600" />;
      case 'appointment':
        return <Calendar className="w-4 h-4 text-orange-600" />;
      case 'user':
        return <User className="w-4 h-4 text-teal-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'الآن';
    if (diffInMinutes < 60) return `منذ ${diffInMinutes} دقيقة`;
    if (diffInMinutes < 1440) return `منذ ${Math.floor(diffInMinutes / 60)} ساعة`;
    return `منذ ${Math.floor(diffInMinutes / 1440)} يوم`;
  };

  return (
    <div className="card-golden">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-golden-800 font-display">النشاط الأخير</h3>
        <button className="text-islamic-600 hover:text-islamic-700 text-sm font-medium font-body">
          عرض الكل
        </button>
      </div>
      
      <div className="space-y-3">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3 space-x-reverse p-3 bg-white rounded-lg hover:shadow-sm transition-shadow">
            <div className="flex items-center space-x-2 space-x-reverse">
              {getActivityIcon(activity.type, activity.entity)}
              {getEntityIcon(activity.entity)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-golden-800 font-body">
                {activity.title}
              </p>
              <p className="text-xs text-sage-600 font-body line-clamp-1">
                {activity.description}
              </p>
              <div className="flex items-center space-x-2 space-x-reverse mt-1">
                <span className="text-xs text-sage-500 font-body">{activity.user}</span>
                <span className="text-xs text-sage-400">•</span>
                <span className="text-xs text-sage-500 font-body">{formatTimeAgo(activity.timestamp)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;