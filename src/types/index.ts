export interface User {
  id: number;
  email: string;
  name: string;
  role: 'admin' | 'manager' | 'employee' | 'viewer';
  department: string;
  permissions: string[];
  avatar?: string;
  lastLogin?: string;
}

export interface WaqfLand {
  id: number;
  name: string;
  description: string;
  area: number;
  location: {
    lat: number;
    lng: number;
    address: string;
    city: string;
    district: string;
  };
  boundaries: Array<{lat: number; lng: number}>;
  type: 'mosque' | 'cemetery' | 'school' | 'commercial' | 'residential' | 'agricultural';
  status: 'active' | 'disputed' | 'under_review' | 'inactive';
  documents: number[];
  cases: number[];
  value: number;
  income: number;
  expenses: number;
  manager: string;
  createdAt: string;
  updatedAt: string;
}

export interface Case {
  id: number;
  title: string;
  description: string;
  type: 'ownership' | 'boundary' | 'income' | 'maintenance' | 'legal' | 'administrative';
  status: 'open' | 'in_progress' | 'pending' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  waqfLandId?: number;
  assignedTo: number;
  createdBy: number;
  documents: number[];
  timeline: CaseTimeline[];
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CaseTimeline {
  id: number;
  caseId: number;
  action: string;
  description: string;
  userId: number;
  userName: string;
  timestamp: string;
  attachments?: number[];
}

export interface Document {
  id: number;
  name: string;
  type: 'pdf' | 'image' | 'word' | 'excel' | 'other';
  size: number;
  url: string;
  content?: string; // للبحث في المحتوى
  tags: string[];
  category: 'legal' | 'financial' | 'technical' | 'administrative' | 'historical';
  relatedTo: {
    type: 'case' | 'waqf_land' | 'general';
    id?: number;
  };
  uploadedBy: number;
  uploadedAt: string;
  lastModified: string;
  isArchived: boolean;
  accessLevel: 'public' | 'internal' | 'restricted' | 'confidential';
}

export interface Appointment {
  id: number;
  title: string;
  description: string;
  type: 'meeting' | 'inspection' | 'hearing' | 'consultation';
  startTime: string;
  endTime: string;
  location: string;
  attendees: number[];
  relatedCaseId?: number;
  relatedWaqfId?: number;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
  createdBy: number;
  createdAt: string;
}

export interface Report {
  id: number;
  title: string;
  type: 'financial' | 'cases' | 'lands' | 'performance' | 'custom';
  parameters: Record<string, any>;
  generatedBy: number;
  generatedAt: string;
  data: any;
  format: 'pdf' | 'excel' | 'csv';
}

export interface Notification {
  id: number;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  userId: number;
  isRead: boolean;
  relatedTo?: {
    type: 'case' | 'waqf_land' | 'appointment' | 'document';
    id: number;
  };
  createdAt: string;
}