import React, { createContext, useContext, useState, useEffect } from 'react';
import { ExtendedUser, UserPermissions, SystemModule, Governorate, UserRole } from '../types/permissions';
import { useAuth } from './AuthContext';

interface PermissionsContextType {
  userPermissions: UserPermissions | null;
  hasPermission: (module: SystemModule, action: string, governorate?: Governorate) => boolean;
  hasModuleAccess: (module: SystemModule) => boolean;
  canAccessGovernorate: (governorate: Governorate) => boolean;
  getUsersByRole: (role: UserRole) => ExtendedUser[];
  getUsersByGovernorate: (governorate: Governorate) => ExtendedUser[];
  updateUserPermissions: (userId: number, permissions: Partial<UserPermissions>) => void;
  loading: boolean;
}

const PermissionsContext = createContext<PermissionsContextType | undefined>(undefined);

export const usePermissions = () => {
  const context = useContext(PermissionsContext);
  if (context === undefined) {
    throw new Error('usePermissions must be used within a PermissionsProvider');
  }
  return context;
};

export const PermissionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [userPermissions, setUserPermissions] = useState<UserPermissions | null>(null);
  const [allUsers, setAllUsers] = useState<ExtendedUser[]>([]);
  const [loading, setLoading] = useState(true);

  // بيانات تجريبية للمستخدمين مع الصلاحيات
  const mockUsers: ExtendedUser[] = [
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
    }
  ];

  useEffect(() => {
    if (user) {
      // البحث عن صلاحيات المستخدم الحالي
      const currentUser = mockUsers.find(u => u.id === user.id);
      if (currentUser) {
        setUserPermissions(currentUser.permissions);
      }
      setAllUsers(mockUsers);
    }
    setLoading(false);
  }, [user]);

  const hasPermission = (module: SystemModule, action: string, governorate?: Governorate): boolean => {
    if (!userPermissions) return false;

    const modulePermission = userPermissions.modules[module];
    if (!modulePermission) return false;

    // التحقق من وجود الصلاحية
    if (!modulePermission.permissions.includes(action)) return false;

    // التحقق من قيود المحافظة
    if (modulePermission.governorateRestricted && governorate) {
      return modulePermission.allowedGovernorates?.includes(governorate) || false;
    }

    return true;
  };

  const hasModuleAccess = (module: SystemModule): boolean => {
    if (!userPermissions) return false;
    return !!userPermissions.modules[module];
  };

  const canAccessGovernorate = (governorate: Governorate): boolean => {
    if (!userPermissions) return false;
    return userPermissions.governorates.includes(governorate);
  };

  const getUsersByRole = (role: UserRole): ExtendedUser[] => {
    return allUsers.filter(user => user.permissions.role === role);
  };

  const getUsersByGovernorate = (governorate: Governorate): ExtendedUser[] => {
    return allUsers.filter(user => user.governorate === governorate);
  };

  const updateUserPermissions = (userId: number, permissions: Partial<UserPermissions>) => {
    setAllUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId 
          ? { ...user, permissions: { ...user.permissions, ...permissions } }
          : user
      )
    );

    if (userId === user?.id) {
      setUserPermissions(prev => prev ? { ...prev, ...permissions } : null);
    }
  };

  const value = {
    userPermissions,
    hasPermission,
    hasModuleAccess,
    canAccessGovernorate,
    getUsersByRole,
    getUsersByGovernorate,
    updateUserPermissions,
    loading
  };

  return (
    <PermissionsContext.Provider value={value}>
      {children}
    </PermissionsContext.Provider>
  );
};