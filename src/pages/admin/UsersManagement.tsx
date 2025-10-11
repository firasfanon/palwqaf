import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Eye, 
  Trash2, 
  Download, 
  Upload,
  User,
  Shield,
  Key,
  Lock,
  Unlock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Activity,
  Settings,
  BarChart3,
  TrendingUp,
  RefreshCw,
  Save,
  Copy,
  Share2,
  Bookmark,
  Star,
  Award,
  Target,
  Flag,
  Crown,
  Gem,
  Zap,
  Sparkles,
  Globe,
  Building,
  FileText,
  Database,
  Archive,
  Layers,
  Grid,
  List,
  SortAsc,
  SortDesc,
  MoreVertical,
  UserPlus,
  UserMinus,
  UserCheck,
  UserX,
  Briefcase,
  GraduationCap,
  Home as HomeIcon,
  School,
  Heart,
  BookOpen
} from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import { usePermissions } from '../../contexts/PermissionsContext';

const UsersManagement: React.FC = () => {
  const { success, info, error: showError } = useToast();
  const { userPermissions, hasPermission } = usePermissions();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedGovernorate, setSelectedGovernorate] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'edit' | 'permissions' | 'details'>('add');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showBulkActions, setShowBulkActions] = useState(false);

  // بيانات تجريبية للمستخدمين
  const users = [
    {
      id: 1,
      name: 'أحمد محمد الأحمد',
      email: 'ahmed.ahmad@awqaf.gov.ps',
      role: 'admin',
      department: 'الإدارة العامة',
      governorate: 'jerusalem',
      phone: '+970 2 298 2534',
      avatar: 'https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=150',
      isActive: true,
      lastLogin: '2024-01-15T10:30:00',
      createdAt: '2024-01-01',
      permissions: ['all'],
      loginCount: 245,
      documentsUploaded: 45,
      casesManaged: 23,
      lastActivity: '2024-01-15T10:30:00',
      twoFactorEnabled: true,
      passwordLastChanged: '2024-01-10',
      failedLoginAttempts: 0
    },
    {
      id: 2,
      name: 'فاطمة خالد يوسف',
      email: 'fatima.khalid@awqaf.gov.ps',
      role: 'manager',
      department: 'إدارة الأراضي الوقفية',
      governorate: 'ramallah',
      phone: '+970 2 295 3456',
      avatar: 'https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=150',
      isActive: true,
      lastLogin: '2024-01-15T09:15:00',
      createdAt: '2024-01-02',
      permissions: ['waqf_lands', 'documents', 'gis'],
      loginCount: 189,
      documentsUploaded: 67,
      casesManaged: 12,
      lastActivity: '2024-01-15T09:45:00',
      twoFactorEnabled: true,
      passwordLastChanged: '2024-01-08',
      failedLoginAttempts: 0
    },
    {
      id: 3,
      name: 'محمد علي حسن',
      email: 'mohammed.ali@awqaf.gov.ps',
      role: 'manager',
      department: 'إدارة القضايا',
      governorate: 'nablus',
      phone: '+970 9 238 7890',
      avatar: 'https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=150',
      isActive: true,
      lastLogin: '2024-01-15T08:20:00',
      createdAt: '2024-01-03',
      permissions: ['cases_management', 'documents'],
      loginCount: 156,
      documentsUploaded: 34,
      casesManaged: 45,
      lastActivity: '2024-01-15T08:50:00',
      twoFactorEnabled: false,
      passwordLastChanged: '2024-01-05',
      failedLoginAttempts: 1
    },
    {
      id: 4,
      name: 'سارة أحمد محمود',
      email: 'sara.ahmed@awqaf.gov.ps',
      role: 'employee',
      department: 'إدارة الوثائق',
      governorate: 'hebron',
      phone: '+970 2 222 4567',
      avatar: 'https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=150',
      isActive: true,
      lastLogin: '2024-01-15T07:45:00',
      createdAt: '2024-01-04',
      permissions: ['documents', 'archive'],
      loginCount: 98,
      documentsUploaded: 123,
      casesManaged: 0,
      lastActivity: '2024-01-15T08:15:00',
      twoFactorEnabled: true,
      passwordLastChanged: '2024-01-12',
      failedLoginAttempts: 0
    },
    {
      id: 5,
      name: 'خالد يوسف إبراهيم',
      email: 'khalid.youssef@awqaf.gov.ps',
      role: 'employee',
      department: 'المكتب الإقليمي',
      governorate: 'gaza',
      phone: '+970 8 282 8901',
      avatar: 'https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=150',
      isActive: false,
      lastLogin: '2024-01-10T16:30:00',
      createdAt: '2024-01-05',
      permissions: ['waqf_lands'],
      loginCount: 67,
      documentsUploaded: 12,
      casesManaged: 8,
      lastActivity: '2024-01-10T16:45:00',
      twoFactorEnabled: false,
      passwordLastChanged: '2024-01-01',
      failedLoginAttempts: 3
    },
    {
      id: 6,
      name: 'نور الدين محمد',
      email: 'noureddine.mohammed@awqaf.gov.ps',
      role: 'viewer',
      department: 'الشؤون القانونية',
      governorate: 'jenin',
      phone: '+970 4 250 2345',
      avatar: 'https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=150',
      isActive: true,
      lastLogin: '2024-01-14T14:20:00',
      createdAt: '2024-01-06',
      permissions: ['documents'],
      loginCount: 34,
      documentsUploaded: 5,
      casesManaged: 0,
      lastActivity: '2024-01-14T15:10:00',
      twoFactorEnabled: false,
      passwordLastChanged: '2024-01-06',
      failedLoginAttempts: 0
    }
  ];

  const roleOptions = [
    { value: 'all', label: 'جميع الأدوار', icon: Users, color: 'text-gray-600' },
    { value: 'admin', label: 'مدير نظام', icon: Crown, color: 'text-red-600' },
    { value: 'manager', label: 'مدير', icon: Briefcase, color: 'text-blue-600' },
    { value: 'employee', label: 'موظف', icon: User, color: 'text-green-600' },
    { value: 'viewer', label: 'مشاهد', icon: Eye, color: 'text-purple-600' }
  ];

  const statusOptions = [
    { value: 'all', label: 'جميع الحالات' },
    { value: 'active', label: 'نشط' },
    { value: 'inactive', label: 'غير نشط' },
    { value: 'suspended', label: 'معلق' }
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

  const departmentOptions = [
    'الإدارة العامة',
    'إدارة الأراضي الوقفية',
    'إدارة القضايا',
    'إدارة الوثائق',
    'المكتب الإقليمي',
    'الشؤون القانونية',
    'الشؤون المالية',
    'الموارد البشرية'
  ];

  const permissionModules = [
    { id: 'cases_management', name: 'إدارة القضايا', icon: FileText, color: 'text-red-600' },
    { id: 'waqf_lands', name: 'الأراضي الوقفية', icon: Building, color: 'text-green-600' },
    { id: 'documents', name: 'إدارة الوثائق', icon: Archive, color: 'text-blue-600' },
    { id: 'archive', name: 'الأرشيف الإلكتروني', icon: Database, color: 'text-purple-600' },
    { id: 'gis', name: 'نظام GIS', icon: MapPin, color: 'text-orange-600' },
    { id: 'users', name: 'إدارة المستخدمين', icon: Users, color: 'text-pink-600' },
    { id: 'reports', name: 'التقارير', icon: BarChart3, color: 'text-teal-600' },
    { id: 'settings', name: 'الإعدادات', icon: Settings, color: 'text-indigo-600' }
  ];

  const getRoleIcon = (role: string) => {
    const roleOption = roleOptions.find(r => r.value === role);
    return roleOption ? roleOption.icon : User;
  };

  const getRoleColor = (role: string) => {
    const roleOption = roleOptions.find(r => r.value === role);
    return roleOption ? roleOption.color : 'text-gray-600';
  };

  const getStatusBadge = (isActive: boolean, failedAttempts: number) => {
    if (!isActive) return 'status-error';
    if (failedAttempts > 2) return 'status-pending';
    return 'status-active';
  };

  const getStatusText = (isActive: boolean, failedAttempts: number) => {
    if (!isActive) return 'غير نشط';
    if (failedAttempts > 2) return 'محظور مؤقتاً';
    return 'نشط';
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || 
                         (selectedStatus === 'active' && user.isActive) ||
                         (selectedStatus === 'inactive' && !user.isActive);
    const matchesGovernorate = selectedGovernorate === 'all' || user.governorate === selectedGovernorate;
    return matchesSearch && matchesRole && matchesStatus && matchesGovernorate;
  });

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    let aValue, bValue;
    switch (sortBy) {
      case 'name':
        aValue = a.name;
        bValue = b.name;
        break;
      case 'email':
        aValue = a.email;
        bValue = b.email;
        break;
      case 'role':
        aValue = a.role;
        bValue = b.role;
        break;
      case 'department':
        aValue = a.department;
        bValue = b.department;
        break;
      case 'lastLogin':
        aValue = new Date(a.lastLogin);
        bValue = new Date(b.lastLogin);
        break;
      default:
        aValue = a.name;
        bValue = b.name;
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  // حساب الإحصائيات
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.isActive).length;
  const adminUsers = users.filter(u => u.role === 'admin').length;
  const onlineUsers = users.filter(u => {
    const lastLogin = new Date(u.lastLogin);
    const now = new Date();
    const diffInHours = (now.getTime() - lastLogin.getTime()) / (1000 * 60 * 60);
    return diffInHours < 24;
  }).length;

  const handleBulkAction = (action: string) => {
    if (selectedUsers.length === 0) {
      showError('لم يتم تحديد مستخدمين', 'يرجى تحديد مستخدم واحد على الأقل');
      return;
    }

    switch (action) {
      case 'activate':
        success('تم تفعيل المستخدمين', `تم تفعيل ${selectedUsers.length} مستخدم`);
        break;
      case 'deactivate':
        success('تم إلغاء تفعيل المستخدمين', `تم إلغاء تفعيل ${selectedUsers.length} مستخدم`);
        break;
      case 'delete':
        if (window.confirm(`هل أنت متأكد من حذف ${selectedUsers.length} مستخدم؟`)) {
          success('تم حذف المستخدمين', `تم حذف ${selectedUsers.length} مستخدم`);
        }
        break;
      case 'export':
        success('تم تصدير البيانات', `تم تصدير بيانات ${selectedUsers.length} مستخدم`);
        break;
    }
    setSelectedUsers([]);
  };

  const handleUserAction = (action: string, user: any) => {
    switch (action) {
      case 'view':
        setSelectedUser(user);
        setModalType('details');
        setShowModal(true);
        break;
      case 'edit':
        setSelectedUser(user);
        setModalType('edit');
        setShowModal(true);
        break;
      case 'permissions':
        setSelectedUser(user);
        setModalType('permissions');
        setShowModal(true);
        break;
      case 'reset_password':
        success('تم إرسال رابط إعادة تعيين كلمة المرور', `تم إرسال رابط إلى ${user.email}`);
        break;
      case 'toggle_2fa':
        success(
          user.twoFactorEnabled ? 'تم إلغاء المصادقة الثنائية' : 'تم تفعيل المصادقة الثنائية',
          `تم ${user.twoFactorEnabled ? 'إلغاء' : 'تفعيل'} المصادقة الثنائية للمستخدم ${user.name}`
        );
        break;
    }
  };

  const renderUserCard = (user: any) => {
    const RoleIcon = getRoleIcon(user.role);
    return (
      <div key={user.id} className="card-islamic hover-lift">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                user.isActive ? 'bg-green-500' : 'bg-gray-400'
              }`}></div>
            </div>
            <div>
              <h3 className="font-semibold text-islamic-800 font-body">{user.name}</h3>
              <p className="text-sm text-sage-600 font-body">{user.email}</p>
            </div>
          </div>
          <input
            type="checkbox"
            checked={selectedUsers.includes(user.id)}
            onChange={(e) => {
              if (e.target.checked) {
                setSelectedUsers(prev => [...prev, user.id]);
              } else {
                setSelectedUsers(prev => prev.filter(id => id !== user.id));
              }
            }}
            className="rounded border-islamic-300 text-islamic-600 focus:ring-islamic-500"
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-2 space-x-reverse">
            <RoleIcon className={`w-4 h-4 ${getRoleColor(user.role)}`} />
            <span className="text-sm text-sage-700 font-body">{roleOptions.find(r => r.value === user.role)?.label}</span>
          </div>
          
          <div className="flex items-center space-x-2 space-x-reverse">
            <Building className="w-4 h-4 text-sage-400" />
            <span className="text-sm text-sage-700 font-body">{user.department}</span>
          </div>
          
          <div className="flex items-center space-x-2 space-x-reverse">
            <MapPin className="w-4 h-4 text-sage-400" />
            <span className="text-sm text-sage-700 font-body">{governorateOptions.find(g => g.value === user.governorate)?.label}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(user.isActive, user.failedLoginAttempts)}`}>
              {getStatusText(user.isActive, user.failedLoginAttempts)}
            </span>
            <div className="flex items-center space-x-1 space-x-reverse">
              {user.twoFactorEnabled && <Shield className="w-4 h-4 text-green-500" />}
              <span className="text-xs text-sage-500 font-body">
                آخر دخول: {new Date(user.lastLogin).toLocaleDateString('ar-EG')}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-sage-200 mt-4">
          <button 
            onClick={() => handleUserAction('view', user)}
            className="text-blue-600 hover:text-blue-700 font-medium text-sm font-body"
          >
            عرض التفاصيل
          </button>
          <div className="flex items-center space-x-2 space-x-reverse">
            <button 
              onClick={() => handleUserAction('edit', user)}
              className="text-green-600 hover:text-green-700"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button 
              onClick={() => handleUserAction('permissions', user)}
              className="text-purple-600 hover:text-purple-700"
            >
              <Key className="w-4 h-4" />
            </button>
            <button className="text-gray-600 hover:text-gray-700">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderUsersList = () => (
    <div className="bg-white rounded-2xl shadow-elegant overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-islamic-50">
            <tr>
              <th className="px-6 py-3 text-right">
                <input
                  type="checkbox"
                  checked={selectedUsers.length === sortedUsers.length && sortedUsers.length > 0}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedUsers(sortedUsers.map(u => u.id));
                    } else {
                      setSelectedUsers([]);
                    }
                  }}
                  className="rounded border-islamic-300 text-islamic-600 focus:ring-islamic-500"
                />
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-islamic-700 uppercase tracking-wider font-body">
                المستخدم
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-islamic-700 uppercase tracking-wider font-body">
                الدور
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-islamic-700 uppercase tracking-wider font-body">
                القسم
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-islamic-700 uppercase tracking-wider font-body">
                المحافظة
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-islamic-700 uppercase tracking-wider font-body">
                الحالة
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-islamic-700 uppercase tracking-wider font-body">
                آخر دخول
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-islamic-700 uppercase tracking-wider font-body">
                الإجراءات
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-sage-200">
            {sortedUsers.map((user) => {
              const RoleIcon = getRoleIcon(user.role);
              return (
                <tr key={user.id} className="hover:bg-islamic-50">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedUsers(prev => [...prev, user.id]);
                        } else {
                          setSelectedUsers(prev => prev.filter(id => id !== user.id));
                        }
                      }}
                      className="rounded border-islamic-300 text-islamic-600 focus:ring-islamic-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <div className="relative">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                          user.isActive ? 'bg-green-500' : 'bg-gray-400'
                        }`}></div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-islamic-800 font-body">{user.name}</div>
                        <div className="text-sm text-sage-600 font-body">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <RoleIcon className={`w-4 h-4 ${getRoleColor(user.role)}`} />
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                        {roleOptions.find(r => r.value === user.role)?.label}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-islamic-800 font-body">
                    {user.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-islamic-800 font-body">
                    {governorateOptions.find(g => g.value === user.governorate)?.label}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(user.isActive, user.failedLoginAttempts)}`}>
                        {getStatusText(user.isActive, user.failedLoginAttempts)}
                      </span>
                      {user.twoFactorEnabled && <Shield className="w-4 h-4 text-green-500" />}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-sage-600 font-body">
                    {new Date(user.lastLogin).toLocaleDateString('ar-EG')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <button 
                        onClick={() => handleUserAction('view', user)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleUserAction('edit', user)}
                        className="text-green-600 hover:text-green-700"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleUserAction('permissions', user)}
                        className="text-purple-600 hover:text-purple-700"
                      >
                        <Key className="w-4 h-4" />
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
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="heading-1 text-islamic-800">إدارة المستخدمين</h1>
          <p className="body-text text-sage-600 mt-2">إدارة شاملة للمستخدمين والصلاحيات مع أدوات متقدمة</p>
        </div>
        <div className="flex items-center space-x-4 space-x-reverse">
          <button className="btn-secondary">
            <Download className="w-5 h-5 ml-2" />
            تصدير البيانات
          </button>
          <button 
            onClick={() => {
              setSelectedUser(null);
              setModalType('add');
              setShowModal(true);
            }}
            className="btn-primary"
          >
            <Plus className="w-5 h-5 ml-2" />
            إضافة مستخدم
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card-islamic">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-sage-600 font-body">إجمالي المستخدمين</p>
              <p className="text-3xl font-bold text-islamic-700 font-display">{totalUsers}</p>
            </div>
            <Users className="w-8 h-8 text-islamic-500" />
          </div>
        </div>
        
        <div className="card-golden">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-sage-600 font-body">مستخدمون نشطون</p>
              <p className="text-3xl font-bold text-golden-700 font-display">{activeUsers}</p>
            </div>
            <UserCheck className="w-8 h-8 text-golden-500" />
          </div>
        </div>
        
        <div className="card-sage">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-sage-600 font-body">مديرو النظام</p>
              <p className="text-3xl font-bold text-sage-700 font-display">{adminUsers}</p>
            </div>
            <Crown className="w-8 h-8 text-sage-500" />
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-sage-600 font-body">متصلون اليوم</p>
              <p className="text-3xl font-bold text-gray-700 font-display">{onlineUsers}</p>
            </div>
            <Activity className="w-8 h-8 text-gray-500" />
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl shadow-elegant p-6">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4">
          <div className="relative">
            <Search className="absolute right-3 top-3 h-5 w-5 text-sage-400" />
            <input
              type="text"
              placeholder="البحث في المستخدمين..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input pr-10"
            />
          </div>
          
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="form-select"
          >
            {roleOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="form-select"
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          
          <select
            value={selectedGovernorate}
            onChange={(e) => setSelectedGovernorate(e.target.value)}
            className="form-select"
          >
            {governorateOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          
          <div className="flex items-center space-x-2 space-x-reverse">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="form-select"
            >
              <option value="name">الاسم</option>
              <option value="email">البريد الإلكتروني</option>
              <option value="role">الدور</option>
              <option value="department">القسم</option>
              <option value="lastLogin">آخر دخول</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="p-2 border border-sage-300 rounded-lg hover:bg-sage-50"
            >
              {sortOrder === 'asc' ? <SortAsc className="w-5 h-5" /> : <SortDesc className="w-5 h-5" />}
            </button>
          </div>
          
          <div className="flex items-center space-x-2 space-x-reverse">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-islamic-600 text-white' : 'bg-gray-200 text-gray-600'}`}
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
        {selectedUsers.length > 0 && (
          <div className="bg-islamic-50 border border-islamic-200 rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-islamic-800 font-body">
                تم تحديد {selectedUsers.length} مستخدم
              </span>
              <div className="flex items-center space-x-2 space-x-reverse">
                <button 
                  onClick={() => handleBulkAction('activate')}
                  className="btn-primary text-sm px-3 py-1"
                >
                  تفعيل
                </button>
                <button 
                  onClick={() => handleBulkAction('deactivate')}
                  className="btn-secondary text-sm px-3 py-1"
                >
                  إلغاء تفعيل
                </button>
                <button 
                  onClick={() => handleBulkAction('export')}
                  className="btn-outline text-sm px-3 py-1"
                >
                  تصدير
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
      </div>

      {/* Users Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedUsers.map(renderUserCard)}
        </div>
      ) : (
        renderUsersList()
      )}

      {/* User Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="heading-2 text-islamic-800">
                {modalType === 'add' ? 'إضافة مستخدم جديد' :
                 modalType === 'edit' ? 'تعديل المستخدم' :
                 modalType === 'permissions' ? 'إدارة الصلاحيات' :
                 'تفاصيل المستخدم'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-sage-500 hover:text-sage-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            {modalType === 'details' && selectedUser ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="text-center">
                    <img
                      src={selectedUser.avatar}
                      alt={selectedUser.name}
                      className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                    />
                    <h3 className="text-xl font-semibold text-islamic-800 font-display">{selectedUser.name}</h3>
                    <p className="text-sage-600 font-body">{selectedUser.email}</p>
                  </div>

                  <div className="bg-islamic-50 p-6 rounded-xl">
                    <h4 className="font-semibold text-islamic-800 mb-3 font-display">المعلومات الأساسية</h4>
                    <div className="space-y-2">
                      <p><span className="text-sage-500 font-body">الدور:</span> {roleOptions.find(r => r.value === selectedUser.role)?.label}</p>
                      <p><span className="text-sage-500 font-body">القسم:</span> {selectedUser.department}</p>
                      <p><span className="text-sage-500 font-body">المحافظة:</span> {governorateOptions.find(g => g.value === selectedUser.governorate)?.label}</p>
                      <p><span className="text-sage-500 font-body">الهاتف:</span> {selectedUser.phone}</p>
                    </div>
                  </div>

                  <div className="bg-golden-50 p-6 rounded-xl">
                    <h4 className="font-semibold text-golden-800 mb-3 font-display">إحصائيات النشاط</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-golden-700 font-display">{selectedUser.loginCount}</p>
                        <p className="text-sm text-golden-600 font-body">مرة دخول</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-700 font-display">{selectedUser.documentsUploaded}</p>
                        <p className="text-sm text-blue-600 font-body">وثيقة مرفوعة</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-700 font-display">{selectedUser.casesManaged}</p>
                        <p className="text-sm text-green-600 font-body">قضية مدارة</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-purple-700 font-display">{selectedUser.permissions.length}</p>
                        <p className="text-sm text-purple-600 font-body">صلاحية</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-sage-50 p-6 rounded-xl">
                    <h4 className="font-semibold text-sage-800 mb-3 font-display">الأمان والحماية</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sage-600 font-body">المصادقة الثنائية:</span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          selectedUser.twoFactorEnabled ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {selectedUser.twoFactorEnabled ? 'مفعلة' : 'غير مفعلة'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sage-600 font-body">آخر تغيير كلمة المرور:</span>
                        <span className="font-medium font-body">{new Date(selectedUser.passwordLastChanged).toLocaleDateString('ar-EG')}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sage-600 font-body">محاولات دخول فاشلة:</span>
                        <span className={`font-medium ${selectedUser.failedLoginAttempts > 0 ? 'text-red-600' : 'text-green-600'}`}>
                          {selectedUser.failedLoginAttempts}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-6 rounded-xl">
                    <h4 className="font-semibold text-blue-800 mb-3 font-display">الصلاحيات</h4>
                    <div className="space-y-2">
                      {selectedUser.permissions.map((permission: string, index: number) => (
                        <div key={index} className="flex items-center space-x-2 space-x-reverse">
                          <CheckCircle className="w-4 h-4 text-blue-600" />
                          <span className="text-sage-700 font-body">{permission}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button 
                      onClick={() => handleUserAction('edit', selectedUser)}
                      className="w-full btn-primary"
                    >
                      <Edit className="w-5 h-5 ml-2" />
                      تعديل المستخدم
                    </button>
                    <button 
                      onClick={() => handleUserAction('permissions', selectedUser)}
                      className="w-full btn-secondary"
                    >
                      <Key className="w-5 h-5 ml-2" />
                      إدارة الصلاحيات
                    </button>
                    <button 
                      onClick={() => handleUserAction('reset_password', selectedUser)}
                      className="w-full btn-outline"
                    >
                      <Lock className="w-5 h-5 ml-2" />
                      إعادة تعيين كلمة المرور
                    </button>
                  </div>
                </div>
              </div>
            ) : modalType === 'permissions' && selectedUser ? (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-islamic-800 mb-2 font-display">
                    إدارة صلاحيات {selectedUser.name}
                  </h3>
                  <p className="text-sage-600 font-body">{selectedUser.email}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {permissionModules.map((module) => (
                    <div key={module.id} className="bg-islamic-50 p-4 rounded-xl">
                      <div className="flex items-center space-x-3 space-x-reverse mb-3">
                        <module.icon className={`w-6 h-6 ${module.color}`} />
                        <h4 className="font-semibold text-islamic-800 font-body">{module.name}</h4>
                      </div>
                      <div className="space-y-2">
                        {['read', 'create', 'update', 'delete'].map((action) => (
                          <label key={action} className="flex items-center space-x-2 space-x-reverse">
                            <input
                              type="checkbox"
                              defaultChecked={selectedUser.permissions.includes(module.id)}
                              className="rounded border-islamic-300 text-islamic-600 focus:ring-islamic-500"
                            />
                            <span className="text-sm font-body">
                              {action === 'read' ? 'قراءة' :
                               action === 'create' ? 'إنشاء' :
                               action === 'update' ? 'تعديل' : 'حذف'}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end space-x-4 space-x-reverse">
                  <button
                    onClick={() => setShowModal(false)}
                    className="btn-outline"
                  >
                    إلغاء
                  </button>
                  <button className="btn-primary">
                    <Save className="w-5 h-5 ml-2" />
                    حفظ الصلاحيات
                  </button>
                </div>
              </div>
            ) : (
              // Add/Edit User Form
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">الاسم الكامل</label>
                    <input
                      type="text"
                      defaultValue={selectedUser?.name || ''}
                      className="form-input"
                      placeholder="أدخل الاسم الكامل"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">البريد الإلكتروني</label>
                    <input
                      type="email"
                      defaultValue={selectedUser?.email || ''}
                      className="form-input"
                      placeholder="user@awqaf.gov.ps"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">الدور</label>
                    <select 
                      defaultValue={selectedUser?.role || 'employee'}
                      className="form-select"
                    >
                      {roleOptions.slice(1).map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">القسم</label>
                    <select 
                      defaultValue={selectedUser?.department || ''}
                      className="form-select"
                    >
                      {departmentOptions.map((dept, index) => (
                        <option key={index} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">المحافظة</label>
                    <select 
                      defaultValue={selectedUser?.governorate || ''}
                      className="form-select"
                    >
                      {governorateOptions.slice(1).map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">رقم الهاتف</label>
                    <input
                      type="tel"
                      defaultValue={selectedUser?.phone || ''}
                      className="form-input"
                      placeholder="+970 X XXX XXXX"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">رابط الصورة الشخصية</label>
                    <input
                      type="url"
                      defaultValue={selectedUser?.avatar || ''}
                      className="form-input"
                      placeholder="https://example.com/avatar.jpg"
                    />
                  </div>
                </div>

                {modalType === 'add' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">كلمة المرور</label>
                      <input
                        type="password"
                        className="form-input"
                        placeholder="كلمة مرور قوية"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">تأكيد كلمة المرور</label>
                      <input
                        type="password"
                        className="form-input"
                        placeholder="تأكيد كلمة المرور"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <label className="flex items-center space-x-2 space-x-reverse">
                    <input
                      type="checkbox"
                      defaultChecked={selectedUser?.isActive ?? true}
                      className="rounded border-islamic-300 text-islamic-600 focus:ring-islamic-500"
                    />
                    <span className="text-sm font-medium text-islamic-700 font-body">حساب نشط</span>
                  </label>
                  
                  <label className="flex items-center space-x-2 space-x-reverse">
                    <input
                      type="checkbox"
                      defaultChecked={selectedUser?.twoFactorEnabled ?? false}
                      className="rounded border-islamic-300 text-islamic-600 focus:ring-islamic-500"
                    />
                    <span className="text-sm font-medium text-islamic-700 font-body">تفعيل المصادقة الثنائية</span>
                  </label>
                </div>

                <div className="flex justify-end space-x-4 space-x-reverse">
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
                    {modalType === 'add' ? 'إضافة المستخدم' : 'حفظ التغييرات'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersManagement;