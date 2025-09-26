export interface Permission {
  id: string;
  name: string;
  description: string;
  module: SystemModule;
  actions: PermissionAction[];
}

export interface PermissionAction {
  id: string;
  name: string;
  description: string;
}

export type SystemModule = 
  | 'cases_management'
  | 'waqf_lands'
  | 'documents'
  | 'archive'
  | 'gis'
  | 'users'
  | 'reports'
  | 'settings'
  | 'appointments'
  | 'notifications';

export type UserRole = 
  | 'super_admin'
  | 'system_admin'
  | 'cases_manager'
  | 'lands_manager'
  | 'documents_manager'
  | 'archive_manager'
  | 'regional_manager'
  | 'employee'
  | 'viewer';

export type Governorate = 
  | 'jerusalem'
  | 'ramallah'
  | 'nablus'
  | 'hebron'
  | 'gaza'
  | 'jenin'
  | 'tulkarm'
  | 'qalqilya'
  | 'salfit'
  | 'bethlehem'
  | 'jericho'
  | 'tubas'
  | 'rafah'
  | 'khan_younis'
  | 'deir_al_balah'
  | 'north_gaza';

export interface UserPermissions {
  userId: number;
  role: UserRole;
  governorates: Governorate[];
  modules: {
    [key in SystemModule]?: ModulePermission;
  };
  customPermissions?: Permission[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ModulePermission {
  module: SystemModule;
  permissions: string[];
  governorateRestricted: boolean;
  allowedGovernorates?: Governorate[];
}

export interface ExtendedUser extends User {
  permissions: UserPermissions;
  governorate: Governorate;
  department: string;
  supervisor?: number;
  subordinates?: number[];
}