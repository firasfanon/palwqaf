import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Eye, 
  Trash2, 
  User, 
  Shield, 
  MapPin,
  Building,
  CheckCircle,
  XCircle,
  Settings,
  Users,
  Crown,
  Briefcase,
  UserCheck,
  AlertTriangle,
  Lock,
  Unlock
} from 'lucide-react';
import { usePermissions } from '../../contexts/PermissionsContext';
import { ExtendedUser, UserRole, Governorate, SystemModule } from '../../types/permissions';

const UsersManagement: React.FC = () => {
  const { getUsersByRole, getUsersByGovernorate, hasPermission, updateUserPermissions } = usePermissions();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [selectedGovernorate, setSelectedGovernorate] = useState<string>('all');
  const [selectedUser, setSelectedUser] = useState<ExtendedUser | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showPermissionsModal, setShowPermissionsModal] = useState(false);

  // بيانات المستخدمين (من السياق)
  const allUsers: ExtendedUser[] = [
    {
      id: 1,
      email: 'admin@awqaf.gov.ps',
      name: 'مدير النظام العام',
      role: 'admin',
      department: 'الإدارة العامة',
      governorate: 'jerusalem',
      permissions: {
        userId: 1,
        role: 'super_admin',
        governorates: ['jerusalem', 'ramallah', 'nablus', 'hebron', 'gaza', 'jenin'],
        modules: {
          cases_management: {
            module: 'cases_management',
            permissions: ['create', 'read', 'update', 'delete', 'assign', 'close'],
            governorateRestricted: false
          },
          waqf_lands: {
            module: 'waqf_lands',
            permissions: ['create', 'read', 'update', 'delete', 'manage'],
            governorateRestricted: false
          },
          documents: {
            module: 'documents',
            permissions: ['upload', 'read', 'update', 'delete', 'archive'],
            governorateRestricted: false
          },
          users: {
            module: 'users',
            permissions: ['create', 'read', 'update', 'delete', 'manage_permissions'],
            governorateRestricted: false
          }
        },
        isActive: true,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-15'
      }
    },
    {
      id: 2,
      email: 'cases.manager.jerusalem@awqaf.gov.ps',
      name: 'مدير القضايا - القدس',
      role: 'manager',
      department: 'إدارة القضايا',
      governorate: 'jerusalem',
      permissions: {
        userId: 2,
        role: 'cases_manager',
        governorates: ['jerusalem'],
        modules: {
          cases_management: {
            module: 'cases_management',
            permissions: ['create', 'read', 'update', 'assign'],
            governorateRestricted: true,
            allowedGovernorates: ['jerusalem']
          },
          documents: {
            module: 'documents',
            permissions: ['upload', 'read', 'update'],
            governorateRestricted: true,
            allowedGovernorates: ['jerusalem']
          }
        },
        isActive: true,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-15'
      }
    },
    {
      id: 3,
      email: 'lands.manager.ramallah@awqaf.gov.ps',
      name: 'مدير الأراضي الوقفية - رام الله',
      role: 'manager',
      department: 'إدارة الأراضي الوقفية',
      governorate: 'ramallah',
      permissions: {
        userId: 3,
        role: 'lands_manager',
        governorates: ['ramallah'],
        modules: {
          waqf_lands: {
            module: 'waqf_lands',
            permissions: ['create', 'read', 'update', 'manage'],
            governorateRestricted: true,
            allowedGovernorates: ['ramallah']
          },
          documents: {
            module: 'documents',
            permissions: ['upload', 'read', 'update'],
            governorateRestricted: true,
            allowedGovernorates: ['ramallah']
          },
          gis: {
            module: 'gis',
            permissions: ['read', 'update'],
            governorateRestricted: true,
            allowedGovernorates: ['ramallah']
          }
        },
        isActive: true,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-15'
      }
    },
    {
      id: 4,
      email: 'documents.manager@awqaf.gov.ps',
      name: 'مدير الوثائق والأرشيف',
      role: 'manager',
      department: 'إدارة الوثائق',
      governorate: 'jerusalem',
      permissions: {
        userId: 4,
        role: 'documents_manager',
        governorates: ['jerusalem', 'ramallah', 'nablus'],
        modules: {
          documents: {
            module: 'documents',
            permissions: ['upload', 'read', 'update', 'delete', 'archive'],
            governorateRestricted: true,
            allowedGovernorates: ['jerusalem', 'ramallah', 'nablus']
          },
          archive: {
            module: 'archive',
            permissions: ['create', 'read', 'update', 'manage'],
            governorateRestricted: true,
            allowedGovernorates: ['jerusalem', 'ramallah', 'nablus']
          }
        },
        isActive: true,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-15'
      }
    },
    {
      id: 5,
      email: 'employee.nablus@awqaf.gov.ps',
      name: 'موظف - نابلس',
      role: 'employee',
      department: 'المكتب الإقليمي',
      governorate: 'nablus',
      permissions: {
        userId: 5,
        role: 'employee',
        governorates: ['nablus'],
        modules: {
          cases_management: {
            module: 'cases_management',
            permissions: ['read', 'update'],
            governorateRestricted: true,
            allowedGovernorates: ['nablus']
          },
          waqf_lands: {
            module: 'waqf_lands',
            permissions: ['read'],
            governorateRestricted: true,
            allowedGovernorates: ['nablus']
          },
          documents: {
            module: 'documents',
            permissions: ['upload', 'read'],
            governorateRestricted: true,
            allowedGovernorates: ['nablus']
          }
        },
        isActive: true,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-15'
      }
    },
    {
      id: 6,
      email: 'regional.manager.gaza@awqaf.gov.ps',
      name: 'المدير الإقليمي - غزة',
      role: 'manager',
      department: 'الإدارة الإقليمية',
      governorate: 'gaza',
      permissions: {
        userId: 6,
        role: 'regional_manager',
        governorates: ['gaza', 'rafah', 'khan_younis'],
        modules: {
          cases_management: {
            module: 'cases_management',
            permissions: ['create', 'read', 'update', 'assign'],
            governorateRestricted: true,
            allowedGovernorates: ['gaza', 'rafah', 'khan_younis']
          },
          waqf_lands: {
            module: 'waqf_lands',
            permissions: ['create', 'read', 'update'],
            governorateRestricted: true,
            allowedGovernorates: ['gaza', 'rafah', 'khan_younis']
          },
          documents: {
            module: 'documents',
            permissions: ['upload', 'read', 'update'],
            governorateRestricted: true,
            allowedGovernorates: ['gaza', 'rafah', 'khan_younis']
          }
        },
        isActive: true,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-15'
      }
    }
  ];

  const roleOptions = [
    { value: 'all', label: 'جميع الأدوار', icon: Users },
    { value: 'super_admin', label: 'مدير النظام العام', icon: Crown },
    { value: 'system_admin', label: 'مدير النظام', icon: Shield },
    { value: 'cases_manager', label: 'مدير القضايا', icon: Briefcase },
    { value: 'lands_manager', label: 'مدير الأراضي الوقفية', icon: Building },
    { value: 'documents_manager', label: 'مدير الوثائق', icon: Settings },
    { value: 'archive_manager', label: 'مدير الأرشيف', icon: Settings },
    { value: 'regional_manager', label: 'مدير إقليمي', icon: MapPin },
    { value: 'employee', label: 'موظف', icon: User },
    { value: 'viewer', label: 'مشاهد', icon: Eye }
  ];

  const governorateOptions = [
    { value: 'all', label: 'جميع المحافظات' },
    { value: 'jerusalem', label: 'القدس' },
    { value: 'ramallah', label: 'رام الله والبيرة' },
    { value: 'nablus', label: 'نابلس' },
    { value: 'hebron', label: 'الخليل' },
    { value: 'gaza', label: 'غزة' },
    { value: 'jenin', label: 'جنين' },
    { value: 'tulkarm', label: 'طولكرم' },
    { value: 'qalqilya', label: 'قلقيلية' },
    { value: 'salfit', label: 'سلفيت' },
    { value: 'bethlehem', label: 'بيت لحم' },
    { value: 'jericho', label: 'أريحا' },
    { value: 'tubas', label: 'طوباس' },
    { value: 'rafah', label: 'رفح' },
    { value: 'khan_younis', label: 'خان يونس' }
  ];

  const moduleOptions = [
    { id: 'cases_management', name: 'إدارة القضايا', icon: Briefcase },
    { id: 'waqf_lands', name: 'الأراضي الوقفية', icon: Building },
    { id: 'documents', name: 'إدارة الوثائق', icon: Settings },
    { id: 'archive', name: 'الأرشيف الإلكتروني', icon: Settings },
    { id: 'gis', name: 'نظام المعلومات الجغرافية', icon: MapPin },
    { id: 'users', name: 'إدارة المستخدمين', icon: Users },
    { id: 'reports', name: 'التقارير والإحصائيات', icon: Settings },
    { id: 'settings', name: 'الإعدادات العامة', icon: Settings }
  ];

  const getRoleIcon = (role: UserRole) => {
    const roleOption = roleOptions.find(r => r.value === role);
    return roleOption ? roleOption.icon : User;
  };

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'super_admin':
        return 'bg-red-100 text-red-800';
      case 'system_admin':
        return 'bg-purple-100 text-purple-800';
      case 'cases_manager':
      case 'lands_manager':
      case 'documents_manager':
      case 'archive_manager':
        return 'bg-blue-100 text-blue-800';
      case 'regional_manager':
        return 'bg-green-100 text-green-800';
      case 'employee':
        return 'bg-yellow-100 text-yellow-800';
      case 'viewer':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredUsers = allUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.permissions.role === selectedRole;
    const matchesGovernorate = selectedGovernorate === 'all' || user.governorate === selectedGovernorate;
    return matchesSearch && matchesRole && matchesGovernorate;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">إدارة المستخدمين والصلاحيات</h1>
          <p className="text-gray-600 mt-1">إدارة المستخدمين وصلاحياتهم حسب الأنظمة والمحافظات</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
        >
          <Plus className="w-5 h-5 ml-2" />
          إضافة مستخدم جديد
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 border-r-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">إجمالي المستخدمين</p>
              <p className="text-3xl font-bold text-gray-800">{allUsers.length}</p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border-r-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">المستخدمون النشطون</p>
              <p className="text-3xl font-bold text-gray-800">
                {allUsers.filter(u => u.permissions.isActive).length}
              </p>
            </div>
            <UserCheck className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border-r-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">المديرون</p>
              <p className="text-3xl font-bold text-gray-800">
                {allUsers.filter(u => u.permissions.role.includes('manager') || u.permissions.role.includes('admin')).length}
              </p>
            </div>
            <Crown className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border-r-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">المحافظات المغطاة</p>
              <p className="text-3xl font-bold text-gray-800">
                {new Set(allUsers.map(u => u.governorate)).size}
              </p>
            </div>
            <MapPin className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="البحث في المستخدمين..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10 pl-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {roleOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          
          <select
            value={selectedGovernorate}
            onChange={(e) => setSelectedGovernorate(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {governorateOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          
          <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-5 h-5 ml-2" />
            فلاتر متقدمة
          </button>
        </div>
      </div>

      {/* Users List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  المستخدم
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الدور
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  المحافظة
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الأنظمة المتاحة
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
              {filteredUsers.map((user) => {
                const RoleIcon = getRoleIcon(user.permissions.role);
                return (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                          <div className="text-xs text-gray-400">{user.department}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <RoleIcon className="w-4 h-4 text-gray-600" />
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleBadge(user.permissions.role)}`}>
                          {roleOptions.find(r => r.value === user.permissions.role)?.label}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">
                          {governorateOptions.find(g => g.value === user.governorate)?.label}
                        </span>
                      </div>
                      {user.permissions.governorates.length > 1 && (
                        <div className="text-xs text-gray-500 mt-1">
                          +{user.permissions.governorates.length - 1} محافظة أخرى
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {Object.keys(user.permissions.modules).slice(0, 3).map((moduleKey) => (
                          <span key={moduleKey} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            {moduleOptions.find(m => m.id === moduleKey)?.name}
                          </span>
                        ))}
                        {Object.keys(user.permissions.modules).length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            +{Object.keys(user.permissions.modules).length - 3}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        {user.permissions.isActive ? (
                          <>
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                              نشط
                            </span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4 text-red-500" />
                            <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                              غير نشط
                            </span>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <button 
                          onClick={() => setSelectedUser(user)}
                          className="text-blue-600 hover:text-blue-700"
                          title="عرض التفاصيل"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => {
                            setSelectedUser(user);
                            setShowPermissionsModal(true);
                          }}
                          className="text-purple-600 hover:text-purple-700"
                          title="إدارة الصلاحيات"
                        >
                          <Shield className="w-4 h-4" />
                        </button>
                        <button 
                          className="text-green-600 hover:text-green-700"
                          title="تعديل"
                        >
                          <Edit className="w-4 h-4" />
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

      {/* User Details Modal */}
      {selectedUser && !showPermissionsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">تفاصيل المستخدم</h2>
              <button
                onClick={() => setSelectedUser(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-3">المعلومات الأساسية</h3>
                  <div className="space-y-2">
                    <p><span className="text-gray-500">الاسم:</span> {selectedUser.name}</p>
                    <p><span className="text-gray-500">البريد الإلكتروني:</span> {selectedUser.email}</p>
                    <p><span className="text-gray-500">القسم:</span> {selectedUser.department}</p>
                    <p><span className="text-gray-500">المحافظة الرئيسية:</span> {governorateOptions.find(g => g.value === selectedUser.governorate)?.label}</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-3">الدور والصلاحيات</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">الدور:</span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleBadge(selectedUser.permissions.role)}`}>
                        {roleOptions.find(r => r.value === selectedUser.permissions.role)?.label}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">الحالة:</span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${selectedUser.permissions.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {selectedUser.permissions.isActive ? 'نشط' : 'غير نشط'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-3">المحافظات المتاحة</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedUser.permissions.governorates.map((gov) => (
                      <span key={gov} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {governorateOptions.find(g => g.value === gov)?.label}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-3">الأنظمة والصلاحيات</h3>
                  <div className="space-y-2">
                    {Object.entries(selectedUser.permissions.modules).map(([moduleKey, modulePermission]) => (
                      <div key={moduleKey} className="border border-gray-200 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-800">
                            {moduleOptions.find(m => m.id === moduleKey)?.name}
                          </span>
                          {modulePermission.governorateRestricted ? (
                            <Lock className="w-4 h-4 text-orange-500" />
                          ) : (
                            <Unlock className="w-4 h-4 text-green-500" />
                          )}
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {modulePermission.permissions.map((permission) => (
                            <span key={permission} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                              {permission}
                            </span>
                          ))}
                        </div>
                        {modulePermission.governorateRestricted && modulePermission.allowedGovernorates && (
                          <div className="mt-2">
                            <span className="text-xs text-gray-500">المحافظات المسموحة:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {modulePermission.allowedGovernorates.map((gov) => (
                                <span key={gov} className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
                                  {governorateOptions.find(g => g.value === gov)?.label}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Permissions Management Modal */}
      {showPermissionsModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">إدارة صلاحيات المستخدم</h2>
              <button
                onClick={() => {
                  setShowPermissionsModal(false);
                  setSelectedUser(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{selectedUser.name}</h3>
              <p className="text-gray-600">{selectedUser.email}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-3">الدور الأساسي</h4>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                    {roleOptions.slice(1).map(option => (
                      <option key={option.value} value={option.value} selected={selectedUser.permissions.role === option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-3">المحافظات المتاحة</h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {governorateOptions.slice(1).map(option => (
                      <label key={option.value} className="flex items-center space-x-2 space-x-reverse">
                        <input 
                          type="checkbox" 
                          className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                          defaultChecked={selectedUser.permissions.governorates.includes(option.value as Governorate)}
                        />
                        <span className="text-sm">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-3">صلاحيات الأنظمة</h4>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {moduleOptions.map(module => (
                      <div key={module.id} className="border border-gray-200 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <label className="flex items-center space-x-2 space-x-reverse">
                            <input 
                              type="checkbox" 
                              className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                              defaultChecked={!!selectedUser.permissions.modules[module.id as SystemModule]}
                            />
                            <span className="font-medium">{module.name}</span>
                          </label>
                        </div>
                        
                        {selectedUser.permissions.modules[module.id as SystemModule] && (
                          <div className="mt-2 space-y-2">
                            <div className="flex flex-wrap gap-2">
                              {['create', 'read', 'update', 'delete', 'manage'].map(action => (
                                <label key={action} className="flex items-center space-x-1 space-x-reverse">
                                  <input 
                                    type="checkbox" 
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    defaultChecked={selectedUser.permissions.modules[module.id as SystemModule]?.permissions.includes(action)}
                                  />
                                  <span className="text-xs">{action}</span>
                                </label>
                              ))}
                            </div>
                            
                            <label className="flex items-center space-x-2 space-x-reverse">
                              <input 
                                type="checkbox" 
                                className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                                defaultChecked={selectedUser.permissions.modules[module.id as SystemModule]?.governorateRestricted}
                              />
                              <span className="text-sm">مقيد بالمحافظة</span>
                            </label>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4 space-x-reverse mt-6">
              <button
                onClick={() => {
                  setShowPermissionsModal(false);
                  setSelectedUser(null);
                }}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                إلغاء
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                حفظ الصلاحيات
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">إضافة مستخدم جديد</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الاسم الكامل</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="أدخل الاسم الكامل"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="user@awqaf.gov.ps"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الدور</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                    {roleOptions.slice(1).map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">المحافظة الرئيسية</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                    {governorateOptions.slice(1).map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">القسم</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="أدخل اسم القسم"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">كلمة المرور</label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="كلمة مرور قوية"
                />
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
                  إضافة المستخدم
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersManagement;