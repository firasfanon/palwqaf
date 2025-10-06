import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Eye, 
  Trash2, 
  Save,
  Upload,
  Download,
  Settings,
  Home,
  Newspaper,
  Bell,
  Calendar,
  Heart,
  Building,
  Rocket,
  Mic,
  Image,
  Video,
  FileText,
  Star,
  Clock,
  User,
  MapPin,
  Phone,
  Mail,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Target,
  Award,
  TrendingUp,
  BarChart3,
  Activity,
  Zap,
  Globe,
  Sparkles,
  Crown,
  Gem,
  RefreshCw,
  Copy,
  Move,
  MoreVertical
} from 'lucide-react';
import { useData } from '../../contexts/DataContext';

const HomePageManagement: React.FC = () => {
  const { news, announcements, activities, addNews, updateNews, deleteNews } = useData();
  const [activeSection, setActiveSection] = useState('overview');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'news' | 'announcement' | 'activity' | 'sermon' | 'service' | 'mosque' | 'project'>('news');
  const [editingItem, setEditingItem] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const sections = [
    { id: 'overview', name: 'نظرة عامة', icon: Home, color: 'text-islamic-600' },
    { id: 'news', name: 'الأخبار', icon: Newspaper, color: 'text-blue-600' },
    { id: 'announcements', name: 'الإعلانات', icon: Bell, color: 'text-orange-600' },
    { id: 'activities', name: 'الأنشطة', icon: Calendar, color: 'text-purple-600' },
    { id: 'sermons', name: 'خطب الجمعة', icon: Mic, color: 'text-green-600' },
    { id: 'social', name: 'الخدمات الاجتماعية', icon: Heart, color: 'text-pink-600' },
    { id: 'mosques', name: 'المساجد', icon: Building, color: 'text-teal-600' },
    { id: 'projects', name: 'المشاريع', icon: Rocket, color: 'text-indigo-600' }
  ];

  // بيانات تجريبية للخدمات الاجتماعية
  const socialServices = [
    {
      id: 1,
      title: 'برنامج كفالة الأيتام',
      description: 'برنامج شامل لرعاية وكفالة الأطفال الأيتام',
      beneficiaries: 450,
      budget: 125000,
      status: 'active',
      image: 'https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 2,
      title: 'صندوق الزكاة والصدقات',
      description: 'صندوق لجمع وتوزيع الزكاة والصدقات',
      beneficiaries: 1200,
      budget: 280000,
      status: 'active',
      image: 'https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

  // بيانات تجريبية للمساجد
  const mosques = [
    {
      id: 1,
      name: 'المسجد الأقصى المبارك',
      description: 'أولى القبلتين وثالث الحرمين الشريفين',
      location: 'القدس - البلدة القديمة',
      capacity: 5000,
      status: 'active',
      image: 'https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 2,
      name: 'مسجد عمر بن الخطاب',
      description: 'مسجد حديث يخدم سكان مدينة رام الله',
      location: 'رام الله - وسط المدينة',
      capacity: 1500,
      status: 'active',
      image: 'https://images.pexels.com/photos/8107628/pexels-photo-8107628.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

  // بيانات تجريبية للمشاريع
  const projects = [
    {
      id: 1,
      title: 'مشروع ترميم المسجد الأقصى',
      description: 'مشروع شامل لترميم وصيانة المسجد الأقصى',
      budget: 5000000,
      progress: 64,
      status: 'ongoing',
      image: 'https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 2,
      title: 'مشروع رقمنة الأوقاف',
      description: 'مشروع تقني لرقمنة جميع سجلات الأوقاف',
      budget: 1200000,
      progress: 75,
      status: 'ongoing',
      image: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

  // بيانات تجريبية لخطب الجمعة
  const sermons = [
    {
      id: 1,
      title: 'أهمية الصلاة في حياة المسلم',
      preacher: 'الشيخ محمد أحمد الأحمد',
      date: '2024-01-19',
      duration: '25:30',
      views: 1250,
      image: 'https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 2,
      title: 'بر الوالدين في الإسلام',
      preacher: 'الدكتور خالد يوسف العمري',
      date: '2024-01-12',
      duration: '28:15',
      views: 980,
      image: 'https://images.pexels.com/photos/8107628/pexels-photo-8107628.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

  const handleAddNew = (type: typeof modalType) => {
    setModalType(type);
    setEditingItem(null);
    setShowModal(true);
  };

  const handleEdit = (item: any, type: typeof modalType) => {
    setModalType(type);
    setEditingItem(item);
    setShowModal(true);
  };

  const handleDelete = (id: number, type: typeof modalType) => {
    if (window.confirm('هل أنت متأكد من حذف هذا العنصر؟')) {
      if (type === 'news') {
        deleteNews(id);
      }
      // يمكن إضافة المزيد من الحذف للأنواع الأخرى
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card-islamic">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-islamic-700 font-display">{news.length}</h3>
              <p className="text-sage-600 font-body">الأخبار</p>
            </div>
            <Newspaper className="w-8 h-8 text-islamic-500" />
          </div>
        </div>
        
        <div className="card-golden">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-golden-700 font-display">{announcements.length}</h3>
              <p className="text-sage-600 font-body">الإعلانات</p>
            </div>
            <Bell className="w-8 h-8 text-golden-500" />
          </div>
        </div>
        
        <div className="card-sage">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-sage-700 font-display">{activities.length}</h3>
              <p className="text-sage-600 font-body">الأنشطة</p>
            </div>
            <Calendar className="w-8 h-8 text-sage-500" />
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-700 font-display">{sermons.length}</h3>
              <p className="text-sage-600 font-body">خطب الجمعة</p>
            </div>
            <Mic className="w-8 h-8 text-gray-500" />
          </div>
        </div>
      </div>

      {/* إجراءات سريعة */}
      <div className="bg-white rounded-2xl shadow-elegant p-8">
        <h3 className="heading-3 text-islamic-800 mb-6">إجراءات سريعة</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {sections.slice(1).map((section) => (
            <button
              key={section.id}
              onClick={() => handleAddNew(section.id as typeof modalType)}
              className="flex flex-col items-center p-6 border-2 border-sage-200 rounded-xl hover:border-islamic-500 hover:bg-islamic-50 transition-all duration-300"
            >
              <section.icon className={`w-8 h-8 mb-3 ${section.color}`} />
              <span className="font-medium text-sage-800 font-body">إضافة {section.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* آخر التحديثات */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-elegant p-6">
          <h4 className="text-lg font-semibold text-islamic-800 mb-4 font-display">آخر الأخبار</h4>
          <div className="space-y-3">
            {news.slice(0, 3).map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-islamic-50 rounded-lg">
                <div className="flex-1">
                  <h5 className="font-medium text-islamic-800 font-body line-clamp-1">{item.title}</h5>
                  <p className="text-sm text-sage-600 font-body">{new Date(item.date).toLocaleDateString('ar-EG')}</p>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <button
                    onClick={() => handleEdit(item, 'news')}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id, 'news')}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-elegant p-6">
          <h4 className="text-lg font-semibold text-islamic-800 mb-4 font-display">آخر الإعلانات</h4>
          <div className="space-y-3">
            {announcements.slice(0, 3).map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-golden-50 rounded-lg">
                <div className="flex-1">
                  <h5 className="font-medium text-golden-800 font-body line-clamp-1">{item.title}</h5>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    item.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                    item.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {item.priority === 'urgent' ? 'عاجل' : item.priority === 'high' ? 'مهم' : 'عادي'}
                  </span>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <button
                    onClick={() => handleEdit(item, 'announcement')}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id, 'announcement')}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderNewsManagement = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="heading-2 text-islamic-800">إدارة الأخبار</h2>
        <button
          onClick={() => handleAddNew('news')}
          className="btn-primary"
        >
          <Plus className="w-5 h-5 ml-2" />
          إضافة خبر جديد
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-elegant p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="relative">
            <Search className="absolute right-3 top-3 h-5 w-5 text-sage-400" />
            <input
              type="text"
              placeholder="البحث في الأخبار..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input pr-10 w-64"
            />
          </div>
          <button className="btn-secondary">
            <Filter className="w-5 h-5 ml-2" />
            فلاتر
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news
            .filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((item) => (
            <div key={item.id} className="card-islamic">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
              <div className="space-y-3">
                <h3 className="font-semibold text-islamic-800 font-display line-clamp-2">{item.title}</h3>
                <p className="text-sage-600 font-body text-sm line-clamp-3">{item.excerpt}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-sage-500 font-body">{new Date(item.date).toLocaleDateString('ar-EG')}</span>
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <Eye className="w-4 h-4 text-sage-400" />
                    <span className="text-sage-600">{item.views}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-sage-200">
                  <button
                    onClick={() => handleEdit(item, 'news')}
                    className="text-blue-600 hover:text-blue-700 font-medium font-body"
                  >
                    تعديل
                  </button>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <button className="text-green-600 hover:text-green-700">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id, 'news')}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAnnouncementsManagement = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="heading-2 text-islamic-800">إدارة الإعلانات</h2>
        <button
          onClick={() => handleAddNew('announcement')}
          className="btn-primary"
        >
          <Plus className="w-5 h-5 ml-2" />
          إضافة إعلان جديد
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-elegant overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-islamic-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-islamic-700 uppercase tracking-wider font-body">
                  العنوان
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-islamic-700 uppercase tracking-wider font-body">
                  الأولوية
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-islamic-700 uppercase tracking-wider font-body">
                  التاريخ
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-islamic-700 uppercase tracking-wider font-body">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-sage-200">
              {announcements.map((item) => (
                <tr key={item.id} className="hover:bg-islamic-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-islamic-800 font-body">{item.title}</div>
                      <div className="text-sm text-sage-600 font-body line-clamp-2">{item.description}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      item.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                      item.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {item.priority === 'urgent' ? 'عاجل' : item.priority === 'high' ? 'مهم' : 'عادي'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-sage-600 font-body">
                    {new Date(item.date).toLocaleDateString('ar-EG')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <button
                        onClick={() => handleEdit(item, 'announcement')}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id, 'announcement')}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderActivitiesManagement = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="heading-2 text-islamic-800">إدارة الأنشطة</h2>
        <button
          onClick={() => handleAddNew('activity')}
          className="btn-primary"
        >
          <Plus className="w-5 h-5 ml-2" />
          إضافة نشاط جديد
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map((item) => (
          <div key={item.id} className="card-islamic">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-islamic-800 font-display line-clamp-1">{item.title}</h3>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                item.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                item.status === 'ongoing' ? 'bg-green-100 text-green-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {item.status === 'upcoming' ? 'قادم' : item.status === 'ongoing' ? 'جاري' : 'مكتمل'}
              </span>
            </div>
            <p className="text-sage-600 font-body text-sm mb-4 line-clamp-2">{item.description}</p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2 space-x-reverse">
                <Calendar className="w-4 h-4 text-sage-400" />
                <span className="text-sage-600 font-body">{item.date}</span>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <MapPin className="w-4 h-4 text-sage-400" />
                <span className="text-sage-600 font-body">{item.location}</span>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <User className="w-4 h-4 text-sage-400" />
                <span className="text-sage-600 font-body">{item.attendees}/{item.maxAttendees}</span>
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-sage-200 mt-4">
              <button
                onClick={() => handleEdit(item, 'activity')}
                className="text-blue-600 hover:text-blue-700 font-medium font-body"
              >
                تعديل
              </button>
              <div className="flex items-center space-x-2 space-x-reverse">
                <button className="text-green-600 hover:text-green-700">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="text-red-600 hover:text-red-700">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSermonsManagement = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="heading-2 text-islamic-800">إدارة خطب الجمعة</h2>
        <button
          onClick={() => handleAddNew('sermon')}
          className="btn-primary"
        >
          <Plus className="w-5 h-5 ml-2" />
          إضافة خطبة جديدة
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sermons.map((item) => (
          <div key={item.id} className="card-islamic">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-32 object-cover rounded-xl mb-4"
            />
            <div className="space-y-3">
              <h3 className="font-semibold text-islamic-800 font-display line-clamp-2">{item.title}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <User className="w-4 h-4 text-sage-400" />
                  <span className="text-sage-600 font-body">{item.preacher}</span>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Calendar className="w-4 h-4 text-sage-400" />
                  <span className="text-sage-600 font-body">{new Date(item.date).toLocaleDateString('ar-EG')}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Clock className="w-4 h-4 text-sage-400" />
                    <span className="text-sage-600 font-body">{item.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <Eye className="w-4 h-4 text-sage-400" />
                    <span className="text-sage-600 font-body">{item.views}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-sage-200">
                <button
                  onClick={() => handleEdit(item, 'sermon')}
                  className="text-blue-600 hover:text-blue-700 font-medium font-body"
                >
                  تعديل
                </button>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <button className="text-green-600 hover:text-green-700">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="text-red-600 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSocialServicesManagement = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="heading-2 text-islamic-800">إدارة الخدمات الاجتماعية</h2>
        <button
          onClick={() => handleAddNew('service')}
          className="btn-primary"
        >
          <Plus className="w-5 h-5 ml-2" />
          إضافة خدمة جديدة
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {socialServices.map((item) => (
          <div key={item.id} className="card-islamic">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            <div className="space-y-3">
              <h3 className="font-semibold text-islamic-800 font-display">{item.title}</h3>
              <p className="text-sage-600 font-body text-sm line-clamp-2">{item.description}</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-islamic-50 rounded-lg">
                  <p className="text-lg font-bold text-islamic-700 font-display">{item.beneficiaries}</p>
                  <p className="text-xs text-sage-600 font-body">مستفيد</p>
                </div>
                <div className="text-center p-3 bg-golden-50 rounded-lg">
                  <p className="text-lg font-bold text-golden-700 font-display">{item.budget.toLocaleString()}</p>
                  <p className="text-xs text-sage-600 font-body">شيكل/شهر</p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-sage-200">
                <button
                  onClick={() => handleEdit(item, 'service')}
                  className="text-blue-600 hover:text-blue-700 font-medium font-body"
                >
                  تعديل
                </button>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <button className="text-green-600 hover:text-green-700">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="text-red-600 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMosquesManagement = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="heading-2 text-islamic-800">إدارة المساجد</h2>
        <button
          onClick={() => handleAddNew('mosque')}
          className="btn-primary"
        >
          <Plus className="w-5 h-5 ml-2" />
          إضافة مسجد جديد
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mosques.map((item) => (
          <div key={item.id} className="card-islamic">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            <div className="space-y-3">
              <h3 className="font-semibold text-islamic-800 font-display">{item.name}</h3>
              <p className="text-sage-600 font-body text-sm line-clamp-2">{item.description}</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <MapPin className="w-4 h-4 text-sage-400" />
                  <span className="text-sage-600 font-body">{item.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <User className="w-4 h-4 text-sage-400" />
                    <span className="text-sage-600 font-body">السعة: {item.capacity}</span>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    item.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {item.status === 'active' ? 'نشط' : 'غير نشط'}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-sage-200">
                <button
                  onClick={() => handleEdit(item, 'mosque')}
                  className="text-blue-600 hover:text-blue-700 font-medium font-body"
                >
                  تعديل
                </button>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <button className="text-green-600 hover:text-green-700">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="text-red-600 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderProjectsManagement = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="heading-2 text-islamic-800">إدارة المشاريع</h2>
        <button
          onClick={() => handleAddNew('project')}
          className="btn-primary"
        >
          <Plus className="w-5 h-5 ml-2" />
          إضافة مشروع جديد
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((item) => (
          <div key={item.id} className="card-islamic">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            <div className="space-y-3">
              <h3 className="font-semibold text-islamic-800 font-display">{item.title}</h3>
              <p className="text-sage-600 font-body text-sm line-clamp-2">{item.description}</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-sage-600 font-body">الميزانية:</span>
                  <span className="font-bold text-islamic-700 font-display">{item.budget.toLocaleString()} ₪</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-sage-600 font-body">التقدم:</span>
                  <span className="font-bold text-golden-700 font-display">{item.progress}%</span>
                </div>
                <div className="w-full bg-sage-200 rounded-full h-2">
                  <div 
                    className="bg-islamic-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${item.progress}%` }}
                  ></div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-sage-200">
                <button
                  onClick={() => handleEdit(item, 'project')}
                  className="text-blue-600 hover:text-blue-700 font-medium font-body"
                >
                  تعديل
                </button>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <button className="text-green-600 hover:text-green-700">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="text-red-600 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return renderOverview();
      case 'news':
        return renderNewsManagement();
      case 'announcements':
        return renderAnnouncementsManagement();
      case 'activities':
        return renderActivitiesManagement();
      case 'sermons':
        return renderSermonsManagement();
      case 'social':
        return renderSocialServicesManagement();
      case 'mosques':
        return renderMosquesManagement();
      case 'projects':
        return renderProjectsManagement();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="heading-1 text-islamic-800">إدارة الصفحة الرئيسية</h1>
          <p className="body-text text-sage-600 mt-2">إدارة شاملة لجميع محتويات الصفحة الرئيسية للموقع</p>
        </div>
        <div className="flex items-center space-x-4 space-x-reverse">
          <button className="btn-secondary">
            <Download className="w-5 h-5 ml-2" />
            تصدير البيانات
          </button>
          <button className="btn-primary">
            <RefreshCw className="w-5 h-5 ml-2" />
            تحديث الصفحة
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-2xl shadow-elegant p-2">
        <div className="flex flex-wrap gap-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center space-x-2 space-x-reverse px-6 py-3 rounded-xl transition-all duration-300 font-body ${
                activeSection === section.id
                  ? 'bg-islamic-600 text-white shadow-islamic'
                  : 'text-sage-700 hover:bg-islamic-50 hover:text-islamic-700'
              }`}
            >
              <section.icon className={`w-5 h-5 ${activeSection === section.id ? 'text-white' : section.color}`} />
              <span className="font-medium">{section.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {renderContent()}

      {/* Modal للإضافة والتعديل */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="heading-2 text-islamic-800">
                {editingItem ? 'تعديل' : 'إضافة'} {
                  modalType === 'news' ? 'خبر' : 
                  modalType === 'announcement' ? 'إعلان' : 
                  modalType === 'activity' ? 'نشاط' :
                  modalType === 'sermon' ? 'خطبة' :
                  modalType === 'service' ? 'خدمة اجتماعية' :
                  modalType === 'mosque' ? 'مسجد' :
                  modalType === 'project' ? 'مشروع' : 'عنصر'
                }
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-sage-500 hover:text-sage-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">العنوان</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="أدخل العنوان"
                  defaultValue={editingItem?.title || editingItem?.name || ''}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">الوصف</label>
                <textarea
                  rows={4}
                  className="form-textarea"
                  placeholder="أدخل الوصف"
                  defaultValue={editingItem?.description || editingItem?.excerpt || ''}
                />
              </div>

              {modalType === 'news' && (
                <div>
                  <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">الفئة</label>
                  <select className="form-select">
                    <option value="religious">الشؤون الدينية</option>
                    <option value="mosques">المساجد</option>
                    <option value="education">التعليم الديني</option>
                    <option value="events">الفعاليات</option>
                  </select>
                </div>
              )}

              {modalType === 'announcement' && (
                <div>
                  <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">الأولوية</label>
                  <select className="form-select">
                    <option value="normal">عادي</option>
                    <option value="high">مهم</option>
                    <option value="urgent">عاجل</option>
                  </select>
                </div>
              )}

              {modalType === 'activity' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">التاريخ</label>
                    <input
                      type="date"
                      className="form-input"
                      defaultValue={editingItem?.date || ''}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">الموقع</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="موقع النشاط"
                      defaultValue={editingItem?.location || ''}
                    />
                  </div>
                </div>
              )}

              {modalType === 'sermon' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">الخطيب</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="اسم الخطيب"
                      defaultValue={editingItem?.preacher || ''}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">المدة</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="25:30"
                      defaultValue={editingItem?.duration || ''}
                    />
                  </div>
                </div>
              )}

              {(modalType === 'service' || modalType === 'project') && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">
                      {modalType === 'service' ? 'المستفيدون' : 'الميزانية'}
                    </label>
                    <input
                      type="number"
                      className="form-input"
                      placeholder={modalType === 'service' ? '450' : '1000000'}
                      defaultValue={modalType === 'service' ? editingItem?.beneficiaries || '' : editingItem?.budget || ''}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">
                      {modalType === 'service' ? 'الميزانية الشهرية' : 'نسبة الإنجاز'}
                    </label>
                    <input
                      type="number"
                      className="form-input"
                      placeholder={modalType === 'service' ? '125000' : '75'}
                      defaultValue={modalType === 'service' ? editingItem?.budget || '' : editingItem?.progress || ''}
                    />
                  </div>
                </div>
              )}

              {modalType === 'mosque' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">الموقع</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="المدينة - المنطقة"
                      defaultValue={editingItem?.location || ''}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">السعة</label>
                    <input
                      type="number"
                      className="form-input"
                      placeholder="1500"
                      defaultValue={editingItem?.capacity || ''}
                    />
                  </div>
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">رفع صورة</label>
                <div className="border-2 border-dashed border-sage-300 rounded-xl p-6 text-center">
                  <Upload className="w-12 h-12 text-sage-400 mx-auto mb-4" />
                  <p className="text-sage-600 mb-2 font-body">اسحب الصورة هنا أو انقر للاختيار</p>
                  <p className="text-sm text-sage-500 font-body">الحد الأقصى: 5 MB</p>
                  <input type="file" className="hidden" accept="image/*" />
                  <button type="button" className="mt-2 btn-outline">
                    اختيار صورة
                  </button>
                </div>
              </div>
              
              <div className="flex justify-end space-x-4 space-x-reverse pt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn-outline"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                >
                  <Save className="w-5 h-5 ml-2" />
                  {editingItem ? 'تحديث' : 'حفظ'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePageManagement;