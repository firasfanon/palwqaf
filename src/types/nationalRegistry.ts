export interface NationalWaqfRegistry {
  id: string; // المفتاح الوطني الفريد
  registryNumber: string; // رقم السجل الوطني
  name: string;
  description: string;
  
  // التصنيف الجغرافي
  location: {
    governorate: Governorate;
    city: string;
    village?: string;
    district: string;
    neighborhood?: string;
    street?: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    boundaries: Array<{lat: number; lng: number}>;
  };
  
  // تصنيف نوع الوقف
  waqfType: WaqfType;
  subType?: WaqfSubType;
  
  // المعلومات الأساسية
  area: number; // بالمتر المربع
  estimatedValue: number;
  currentStatus: WaqfStatus;
  legalStatus: LegalStatus;
  
  // المعلومات التاريخية
  establishmentDate?: string;
  historicalPeriod?: HistoricalPeriod;
  founder?: string;
  foundationDocument?: string;
  
  // الإدارة والمسؤولية
  currentManager: string;
  managementType: ManagementType;
  supervisingOffice: string;
  
  // المعلومات المالية
  monthlyIncome: number;
  monthlyExpenses: number;
  lastFinancialReview: string;
  
  // الوثائق والمستندات
  documents: NationalRegistryDocument[];
  legalDocuments: LegalDocument[];
  
  // الحالة والمتابعة
  lastInspection: string;
  nextInspection: string;
  maintenanceStatus: MaintenanceStatus;
  
  // البيانات الإضافية
  notes: string;
  tags: string[];
  relatedRegistries: string[]; // مفاتيح وطنية مرتبطة
  
  // بيانات النظام
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  lastModifiedBy: string;
  version: number;
}

export type WaqfType = 
  | 'mosque' // مساجد
  | 'cemetery' // مقابر
  | 'shrine' // مقامات
  | 'vacant_land' // أراضي ملساء
  | 'commercial' // تجاري
  | 'residential' // سكني
  | 'agricultural' // زراعي
  | 'educational' // تعليمي
  | 'healthcare' // صحي
  | 'cultural' // ثقافي
  | 'mixed'; // مختلط

export type WaqfSubType = 
  // للمساجد
  | 'grand_mosque' // مسجد كبير
  | 'neighborhood_mosque' // مسجد حي
  | 'historical_mosque' // مسجد تاريخي
  | 'modern_mosque' // مسجد حديث
  
  // للمقابر
  | 'public_cemetery' // مقبرة عامة
  | 'family_cemetery' // مقبرة عائلية
  | 'martyrs_cemetery' // مقبرة شهداء
  | 'historical_cemetery' // مقبرة تاريخية
  
  // للمقامات
  | 'prophet_shrine' // مقام نبي
  | 'companion_shrine' // مقام صحابي
  | 'scholar_shrine' // مقام عالم
  | 'saint_shrine' // مقام ولي
  
  // للأراضي الملساء
  | 'urban_vacant' // أرض ملساء حضرية
  | 'rural_vacant' // أرض ملساء ريفية
  | 'development_land' // أرض للتطوير
  | 'reserve_land'; // أرض احتياطية

export type WaqfStatus = 
  | 'active' // نشط
  | 'inactive' // غير نشط
  | 'under_development' // قيد التطوير
  | 'disputed' // متنازع عليه
  | 'under_review' // قيد المراجعة
  | 'suspended' // معلق
  | 'demolished' // مهدوم
  | 'abandoned'; // مهجور

export type LegalStatus = 
  | 'registered' // مسجل رسمياً
  | 'pending_registration' // قيد التسجيل
  | 'disputed_ownership' // ملكية متنازع عليها
  | 'court_case' // قضية محكمة
  | 'inheritance_dispute' // نزاع وراثة
  | 'government_claim' // مطالبة حكومية
  | 'clear_title'; // سند واضح

export type HistoricalPeriod = 
  | 'islamic_conquest' // الفتح الإسلامي
  | 'umayyad' // العهد الأموي
  | 'abbasid' // العهد العباسي
  | 'fatimid' // العهد الفاطمي
  | 'ayyubid' // العهد الأيوبي
  | 'mamluk' // العهد المملوكي
  | 'ottoman' // العهد العثماني
  | 'british_mandate' // الانتداب البريطاني
  | 'jordanian_rule' // الحكم الأردني
  | 'israeli_occupation' // الاحتلال الإسرائيلي
  | 'palestinian_authority' // السلطة الفلسطينية
  | 'modern'; // العصر الحديث

export type ManagementType = 
  | 'ministry_direct' // إدارة مباشرة من الوزارة
  | 'local_committee' // لجنة محلية
  | 'private_manager' // مدير خاص
  | 'community_managed' // إدارة مجتمعية
  | 'family_managed' // إدارة عائلية
  | 'contracted' // مقاول
  | 'vacant'; // شاغر

export type MaintenanceStatus = 
  | 'excellent' // ممتاز
  | 'good' // جيد
  | 'fair' // مقبول
  | 'poor' // ضعيف
  | 'critical' // حرج
  | 'under_maintenance' // قيد الصيانة
  | 'needs_assessment'; // يحتاج تقييم

export interface NationalRegistryDocument {
  id: number;
  type: 'ownership_deed' | 'survey_map' | 'photo' | 'inspection_report' | 'financial_report' | 'legal_document';
  name: string;
  url: string;
  uploadDate: string;
  isVerified: boolean;
  verifiedBy?: string;
  verificationDate?: string;
}

export interface LegalDocument {
  id: number;
  type: 'court_ruling' | 'ownership_certificate' | 'inheritance_document' | 'government_decree' | 'survey_certificate';
  documentNumber: string;
  issuingAuthority: string;
  issueDate: string;
  expiryDate?: string;
  status: 'valid' | 'expired' | 'pending' | 'disputed';
  url: string;
}

export type Governorate = 
  | 'jerusalem' // القدس
  | 'ramallah' // رام الله والبيرة
  | 'nablus' // نابلس
  | 'hebron' // الخليل
  | 'gaza' // غزة
  | 'jenin' // جنين
  | 'tulkarm' // طولكرم
  | 'qalqilya' // قلقيلية
  | 'salfit' // سلفيت
  | 'bethlehem' // بيت لحم
  | 'jericho' // أريحا والأغوار
  | 'tubas' // طوباس
  | 'rafah' // رفح
  | 'khan_younis' // خان يونس
  | 'deir_al_balah' // دير البلح
  | 'north_gaza'; // شمال غزة

export interface WaqfStatistics {
  governorate: Governorate;
  totalWaqfs: number;
  totalArea: number;
  totalValue: number;
  byType: {
    [key in WaqfType]: {
      count: number;
      area: number;
      value: number;
    };
  };
  byStatus: {
    [key in WaqfStatus]: number;
  };
  monthlyIncome: number;
  monthlyExpenses: number;
}

export interface SearchFilters {
  governorate?: Governorate;
  city?: string;
  village?: string;
  waqfType?: WaqfType;
  subType?: WaqfSubType;
  status?: WaqfStatus;
  legalStatus?: LegalStatus;
  managementType?: ManagementType;
  areaRange?: {
    min: number;
    max: number;
  };
  valueRange?: {
    min: number;
    max: number;
  };
  establishmentPeriod?: HistoricalPeriod;
  lastInspectionDate?: {
    from: string;
    to: string;
  };
}