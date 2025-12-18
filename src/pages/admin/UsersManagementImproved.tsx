import React, { useState } from 'react';
import {
  Users,
  Plus,
  Edit,
  Trash2,
  Shield,
  Lock,
  Unlock,
  CheckCircle,
  XCircle,
  Mail,
  Phone,
  MapPin,
  Clock,
  Activity
} from 'lucide-react';
import { PageHeader, DataTable, StatCard, FilterBar, Modal } from '../../components/admin';
import type { Column } from '../../components/admin/DataTable';
import type { FilterOption } from '../../components/admin/FilterBar';
import { useToast } from '../../hooks/useToast';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  governorate: string;
  phone: string;
  isActive: boolean;
  lastLogin: string;
  createdAt: string;
}

const UsersManagementImproved: React.FC = () => {
  const { success, error: showError } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');

  const [filters, setFilters] = useState({
    role: '',
    status: '',
    governorate: '',
    search: '',
    dateFrom: '',
    dateTo: ''
  });

  const mockUsers: User[] = [
    {
      id: 1,
      name: 'أحمد محمد الأحمد',
      email: 'ahmed.ahmad@awqaf.gov.ps',
      role: 'admin',
      department: 'الإدارة العامة',
      governorate: 'القدس',
      phone: '+970 2 298 2534',
      isActive: true,
      lastLogin: '2024-01-15T10:30:00',
      createdAt: '2024-01-01'
    },
    {
      id: 2,
      name: 'فاطمة خالد يوسف',
      email: 'fatima.khalid@awqaf.gov.ps',
      role: 'manager',
      department: 'إدارة الأراضي الوقفية',
      governorate: 'رام الله',
      phone: '+970 2 295 3456',
      isActive: true,
      lastLogin: '2024-01-15T09:15:00',
      createdAt: '2024-01-02'
    },
    {
      id: 3,
      name: 'محمد علي حسن',
      email: 'mohammed.ali@awqaf.gov.ps',
      role: 'manager',
      department: 'إدارة القضايا',
      governorate: 'نابلس',
      phone: '+970 9 238 7890',
      isActive: true,
      lastLogin: '2024-01-15T08:20:00',
      createdAt: '2024-01-03'
    },
    {
      id: 4,
      name: 'سارة أحمد محمود',
      email: 'sara.ahmad@awqaf.gov.ps',
      role: 'employee',
      department: 'إدارة المستندات',
      governorate: 'الخليل',
      phone: '+970 2 229 4567',
      isActive: false,
      lastLogin: '2024-01-10T14:30:00',
      createdAt: '2024-01-04'
    },
    {
      id: 5,
      name: 'خالد يوسف عبد الله',
      email: 'khaled.youssef@awqaf.gov.ps',
      role: 'employee',
      department: 'الدعم الفني',
      governorate: 'غزة',
      phone: '+970 8 282 1234',
      isActive: true,
      lastLogin: '2024-01-15T11:00:00',
      createdAt: '2024-01-05'
    }
  ];

  const filteredUsers = mockUsers.filter(user => {
    if (filters.role && user.role !== filters.role) return false;
    if (filters.status === 'active' && !user.isActive) return false;
    if (filters.status === 'inactive' && user.isActive) return false;
    if (filters.governorate && user.governorate !== filters.governorate) return false;
    if (filters.search) {
      const search = filters.search.toLowerCase();
      return (
        user.name.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search) ||
        user.department.toLowerCase().includes(search)
      );
    }
    return true;
  });

  const filterOptions: FilterOption[] = [
    {
      id: 'role',
      label: 'الدور',
      type: 'select',
      value: filters.role,
      onChange: (value) => setFilters(prev => ({ ...prev, role: value })),
      options: [
        { value: 'admin', label: 'مدير النظام' },
        { value: 'manager', label: 'مدير' },
        { value: 'employee', label: 'موظف' },
        { value: 'viewer', label: 'مشاهد' }
      ]
    },
    {
      id: 'status',
      label: 'الحالة',
      type: 'select',
      value: filters.status,
      onChange: (value) => setFilters(prev => ({ ...prev, status: value })),
      options: [
        { value: 'active', label: 'نشط' },
        { value: 'inactive', label: 'غير نشط' }
      ]
    },
    {
      id: 'governorate',
      label: 'المحافظة',
      type: 'select',
      value: filters.governorate,
      onChange: (value) => setFilters(prev => ({ ...prev, governorate: value })),
      options: [
        { value: 'القدس', label: 'القدس' },
        { value: 'رام الله', label: 'رام الله' },
        { value: 'نابلس', label: 'نابلس' },
        { value: 'الخليل', label: 'الخليل' },
        { value: 'غزة', label: 'غزة' }
      ]
    },
    {
      id: 'search',
      label: 'بحث',
      type: 'search',
      value: filters.search,
      onChange: (value) => setFilters(prev => ({ ...prev, search: value })),
      placeholder: 'البحث بالاسم أو البريد أو القسم...'
    },
    {
      id: 'daterange',
      label: 'تاريخ الإنشاء',
      type: 'daterange',
      value: { from: filters.dateFrom, to: filters.dateTo },
      onChange: (value) => setFilters(prev => ({ ...prev, dateFrom: value.from, dateTo: value.to }))
    }
  ];

  const columns: Column<User>[] = [
    {
      key: 'name',
      title: 'الاسم',
      sortable: true,
      render: (user) => (
        <div className="flex items-center space-x-3 space-x-reverse">
          <div className="w-10 h-10 bg-islamic-500 rounded-full flex items-center justify-center text-white font-semibold">
            {user.name.charAt(0)}
          </div>
          <div>
            <p className="font-medium text-islamic-800">{user.name}</p>
            <p className="text-xs text-sage-500">{user.department}</p>
          </div>
        </div>
      )
    },
    {
      key: 'email',
      title: 'البريد الإلكتروني',
      sortable: true,
      render: (user) => (
        <div className="flex items-center space-x-2 space-x-reverse text-sm text-sage-700">
          <Mail className="w-4 h-4 text-sage-400" />
          <span>{user.email}</span>
        </div>
      )
    },
    {
      key: 'role',
      title: 'الدور',
      sortable: true,
      render: (user) => {
        const roleColors = {
          admin: 'bg-red-100 text-red-800 border-red-200',
          manager: 'bg-blue-100 text-blue-800 border-blue-200',
          employee: 'bg-green-100 text-green-800 border-green-200',
          viewer: 'bg-gray-100 text-gray-800 border-gray-200'
        };
        const roleLabels = {
          admin: 'مدير نظام',
          manager: 'مدير',
          employee: 'موظف',
          viewer: 'مشاهد'
        };
        return (
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${roleColors[user.role as keyof typeof roleColors]}`}>
            {roleLabels[user.role as keyof typeof roleLabels]}
          </span>
        );
      }
    },
    {
      key: 'governorate',
      title: 'المحافظة',
      sortable: true,
      render: (user) => (
        <div className="flex items-center space-x-2 space-x-reverse text-sm text-sage-700">
          <MapPin className="w-4 h-4 text-sage-400" />
          <span>{user.governorate}</span>
        </div>
      )
    },
    {
      key: 'isActive',
      title: 'الحالة',
      sortable: true,
      render: (user) => (
        <div className="flex items-center space-x-2 space-x-reverse">
          {user.isActive ? (
            <>
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm text-green-700 font-medium">نشط</span>
            </>
          ) : (
            <>
              <XCircle className="w-5 h-5 text-red-500" />
              <span className="text-sm text-red-700 font-medium">غير نشط</span>
            </>
          )}
        </div>
      )
    },
    {
      key: 'lastLogin',
      title: 'آخر دخول',
      sortable: true,
      render: (user) => (
        <div className="flex items-center space-x-2 space-x-reverse text-sm text-sage-600">
          <Clock className="w-4 h-4 text-sage-400" />
          <span>{new Date(user.lastLogin).toLocaleString('ar-EG', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}</span>
        </div>
      )
    }
  ];

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleDelete = (user: User) => {
    if (confirm(`هل أنت متأكد من حذف المستخدم ${user.name}؟`)) {
      success('تم الحذف بنجاح', `تم حذف المستخدم ${user.name}`);
    }
  };

  const handleToggleStatus = (user: User) => {
    const newStatus = !user.isActive;
    success(
      newStatus ? 'تم تفعيل المستخدم' : 'تم تعطيل المستخدم',
      `تم ${newStatus ? 'تفعيل' : 'تعطيل'} حساب ${user.name}`
    );
  };

  const handleAdd = () => {
    setSelectedUser(null);
    setModalMode('add');
    setIsModalOpen(true);
  };

  const handleClearFilters = () => {
    setFilters({
      role: '',
      status: '',
      governorate: '',
      search: '',
      dateFrom: '',
      dateTo: ''
    });
  };

  const stats = [
    {
      title: 'إجمالي المستخدمين',
      value: mockUsers.length.toString(),
      icon: Users,
      color: 'blue' as const,
      trend: 'up' as const,
      trendValue: '+3',
      subtitle: 'مستخدم مسجل في النظام'
    },
    {
      title: 'المستخدمون النشطون',
      value: mockUsers.filter(u => u.isActive).length.toString(),
      icon: Activity,
      color: 'green' as const,
      trend: 'up' as const,
      trendValue: '+2',
      subtitle: 'مستخدمون نشطون حالياً'
    },
    {
      title: 'مديرو النظام',
      value: mockUsers.filter(u => u.role === 'admin').length.toString(),
      icon: Shield,
      color: 'red' as const,
      subtitle: 'مدير لديه صلاحيات كاملة'
    },
    {
      title: 'المستخدمون غير النشطين',
      value: mockUsers.filter(u => !u.isActive).length.toString(),
      icon: Lock,
      color: 'orange' as const,
      trend: 'down' as const,
      trendValue: '-1',
      subtitle: 'حسابات معطلة أو موقوفة'
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="إدارة المستخدمين"
        subtitle="إدارة حسابات المستخدمين والصلاحيات"
        icon={Users}
        actions={
          <>
            <button className="btn-secondary">
              <Shield className="w-5 h-5 ml-2" />
              الصلاحيات
            </button>
            <button onClick={handleAdd} className="btn-primary">
              <Plus className="w-5 h-5 ml-2" />
              إضافة مستخدم
            </button>
          </>
        }
        breadcrumbs={[
          { label: 'الرئيسية', href: '/admin' },
          { label: 'إدارة المستخدمين' }
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <FilterBar
        filters={filterOptions}
        onClear={handleClearFilters}
      />

      <DataTable
        data={filteredUsers}
        columns={columns}
        searchKeys={['name', 'email', 'department']}
        onRowClick={(user) => console.log('Clicked:', user)}
        actions={(user) => (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleEdit(user);
              }}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="تعديل"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleToggleStatus(user);
              }}
              className={`p-2 rounded-lg transition-colors ${
                user.isActive
                  ? 'text-orange-600 hover:bg-orange-50'
                  : 'text-green-600 hover:bg-green-50'
              }`}
              title={user.isActive ? 'تعطيل' : 'تفعيل'}
            >
              {user.isActive ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(user);
              }}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="حذف"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </>
        )}
        pageSize={10}
        showExport={true}
        onExport={() => success('تم التصدير', 'جاري تحميل ملف Excel')}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalMode === 'add' ? 'إضافة مستخدم جديد' : 'تعديل بيانات المستخدم'}
        size="lg"
      >
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-islamic-700 mb-2">الاسم الكامل</label>
              <input
                type="text"
                defaultValue={selectedUser?.name}
                className="form-input"
                placeholder="أدخل الاسم الكامل"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-islamic-700 mb-2">البريد الإلكتروني</label>
              <input
                type="email"
                defaultValue={selectedUser?.email}
                className="form-input"
                placeholder="example@awqaf.gov.ps"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-islamic-700 mb-2">رقم الهاتف</label>
              <input
                type="tel"
                defaultValue={selectedUser?.phone}
                className="form-input"
                placeholder="+970 X XXX XXXX"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-islamic-700 mb-2">الدور</label>
              <select defaultValue={selectedUser?.role} className="form-select">
                <option value="admin">مدير النظام</option>
                <option value="manager">مدير</option>
                <option value="employee">موظف</option>
                <option value="viewer">مشاهد</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-islamic-700 mb-2">القسم</label>
              <select defaultValue={selectedUser?.department} className="form-select">
                <option value="الإدارة العامة">الإدارة العامة</option>
                <option value="إدارة الأراضي الوقفية">إدارة الأراضي الوقفية</option>
                <option value="إدارة القضايا">إدارة القضايا</option>
                <option value="إدارة المستندات">إدارة المستندات</option>
                <option value="الدعم الفني">الدعم الفني</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-islamic-700 mb-2">المحافظة</label>
              <select defaultValue={selectedUser?.governorate} className="form-select">
                <option value="القدس">القدس</option>
                <option value="رام الله">رام الله</option>
                <option value="نابلس">نابلس</option>
                <option value="الخليل">الخليل</option>
                <option value="غزة">غزة</option>
              </select>
            </div>
          </div>

          {modalMode === 'add' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-islamic-700 mb-2">كلمة المرور</label>
                <input
                  type="password"
                  className="form-input"
                  placeholder="كلمة مرور قوية"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-islamic-700 mb-2">تأكيد كلمة المرور</label>
                <input
                  type="password"
                  className="form-input"
                  placeholder="أعد إدخال كلمة المرور"
                />
              </div>
            </div>
          )}

          <div className="flex items-center justify-end space-x-3 space-x-reverse pt-4 border-t border-sage-200">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="btn-outline"
            >
              إلغاء
            </button>
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                success(
                  modalMode === 'add' ? 'تمت الإضافة' : 'تم التحديث',
                  modalMode === 'add' ? 'تم إضافة المستخدم بنجاح' : 'تم تحديث بيانات المستخدم'
                );
                setIsModalOpen(false);
              }}
              className="btn-primary"
            >
              {modalMode === 'add' ? 'إضافة' : 'حفظ التغييرات'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default UsersManagementImproved;
