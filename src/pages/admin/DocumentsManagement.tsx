import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Upload, 
  Download, 
  Eye, 
  Edit, 
  Trash2, 
  FileText, 
  Image, 
  File, 
  Archive,
  Tag,
  Calendar,
  User,
  FolderOpen,
  Star,
  Lock,
  Unlock,
  Share2,
  MoreVertical,
  Grid,
  List,
  SortAsc,
  SortDesc,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Clock,
  Paperclip
} from 'lucide-react';

const DocumentsManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedAccessLevel, setSelectedAccessLevel] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  // بيانات تجريبية للوثائق
  const documents = [
    {
      id: 1,
      name: 'سند ملكية أرض المسجد الكبير',
      type: 'pdf',
      size: 2.5,
      url: '/documents/ownership-deed-1.pdf',
      content: 'سند ملكية رقم 12345 للأرض الوقفية الواقعة في البلدة القديمة بالقدس',
      tags: ['سند ملكية', 'القدس', 'المسجد الكبير'],
      category: 'legal',
      relatedTo: { type: 'waqf_land', id: 1 },
      uploadedBy: 'أحمد محمد',
      uploadedAt: '2024-01-15',
      lastModified: '2024-01-15',
      isArchived: false,
      accessLevel: 'restricted',
      downloads: 15,
      views: 45
    },
    {
      id: 2,
      name: 'تقرير الإيرادات الشهري - ديسمبر 2023',
      type: 'excel',
      size: 1.8,
      url: '/documents/monthly-report-dec-2023.xlsx',
      content: 'تقرير مفصل عن إيرادات ومصروفات الأوقاف لشهر ديسمبر 2023',
      tags: ['تقرير مالي', 'إيرادات', 'ديسمبر 2023'],
      category: 'financial',
      relatedTo: { type: 'general' },
      uploadedBy: 'فاطمة أحمد',
      uploadedAt: '2024-01-10',
      lastModified: '2024-01-12',
      isArchived: false,
      accessLevel: 'internal',
      downloads: 28,
      views: 67
    },
    {
      id: 3,
      name: 'صور مسح أرض وقف الزيتون',
      type: 'image',
      size: 15.2,
      url: '/documents/survey-photos-olive-waqf.zip',
      content: 'مجموعة صور للمسح الميداني لأرض وقف الزيتون في رام الله',
      tags: ['مسح ميداني', 'صور', 'وقف الزيتون', 'رام الله'],
      category: 'technical',
      relatedTo: { type: 'waqf_land', id: 2 },
      uploadedBy: 'خالد يوسف',
      uploadedAt: '2024-01-08',
      lastModified: '2024-01-08',
      isArchived: false,
      accessLevel: 'public',
      downloads: 8,
      views: 23
    },
    {
      id: 4,
      name: 'محضر اجتماع لجنة الأوقاف',
      type: 'word',
      size: 0.8,
      url: '/documents/committee-meeting-minutes.docx',
      content: 'محضر اجتماع لجنة الأوقاف المنعقد بتاريخ 5 يناير 2024 لمناقشة القضايا العالقة',
      tags: ['محضر اجتماع', 'لجنة الأوقاف', 'قضايا عالقة'],
      category: 'administrative',
      relatedTo: { type: 'general' },
      uploadedBy: 'سارة خالد',
      uploadedAt: '2024-01-06',
      lastModified: '2024-01-06',
      isArchived: false,
      accessLevel: 'confidential',
      downloads: 12,
      views: 34
    },
    {
      id: 5,
      name: 'خرائط حدود المقبرة الشرقية',
      type: 'pdf',
      size: 8.7,
      url: '/documents/cemetery-boundary-maps.pdf',
      content: 'خرائط مساحية تفصيلية لحدود المقبرة الشرقية مع الأراضي المجاورة',
      tags: ['خرائط', 'حدود', 'المقبرة الشرقية', 'مساحة'],
      category: 'technical',
      relatedTo: { type: 'case', id: 1 },
      uploadedBy: 'نور الدين',
      uploadedAt: '2024-01-05',
      lastModified: '2024-01-05',
      isArchived: false,
      accessLevel: 'restricted',
      downloads: 6,
      views: 18
    },
    {
      id: 6,
      name: 'وثائق تاريخية - وقف القرن الثامن عشر',
      type: 'pdf',
      size: 12.3,
      url: '/documents/historical-18th-century-waqf.pdf',
      content: 'مجموعة وثائق تاريخية نادرة من القرن الثامن عشر تتعلق بالأوقاف الإسلامية',
      tags: ['وثائق تاريخية', 'القرن الثامن عشر', 'أوقاف إسلامية', 'تراث'],
      category: 'historical',
      relatedTo: { type: 'general' },
      uploadedBy: 'محمد علي',
      uploadedAt: '2024-01-03',
      lastModified: '2024-01-03',
      isArchived: true,
      accessLevel: 'public',
      downloads: 45,
      views: 123
    },
    {
      id: 7,
      name: 'تقرير فني - صيانة مسجد الرحمة',
      type: 'pdf',
      size: 3.4,
      url: '/documents/technical-report-mercy-mosque.pdf',
      content: 'تقرير فني مفصل عن أعمال الصيانة المطلوبة لمسجد الرحمة',
      tags: ['تقرير فني', 'صيانة', 'مسجد الرحمة', 'إصلاحات'],
      category: 'technical',
      relatedTo: { type: 'case', id: 3 },
      uploadedBy: 'أحمد محمد',
      uploadedAt: '2024-01-02',
      lastModified: '2024-01-02',
      isArchived: false,
      accessLevel: 'internal',
      downloads: 19,
      views: 52
    },
    {
      id: 8,
      name: 'عقد إيجار المحلات التجارية',
      type: 'pdf',
      size: 1.2,
      url: '/documents/commercial-lease-contract.pdf',
      content: 'عقد إيجار المحلات التجارية في وقف الزيتون التجاري',
      tags: ['عقد إيجار', 'محلات تجارية', 'وقف الزيتون'],
      category: 'legal',
      relatedTo: { type: 'waqf_land', id: 2 },
      uploadedBy: 'فاطمة أحمد',
      uploadedAt: '2024-01-01',
      lastModified: '2024-01-01',
      isArchived: false,
      accessLevel: 'restricted',
      downloads: 22,
      views: 38
    }
  ];

  const categoryOptions = [
    { value: 'all', label: 'جميع الفئات', icon: FolderOpen, color: 'text-gray-600' },
    { value: 'legal', label: 'قانونية', icon: FileText, color: 'text-blue-600' },
    { value: 'financial', label: 'مالية', icon: FileText, color: 'text-green-600' },
    { value: 'technical', label: 'تقنية', icon: FileText, color: 'text-purple-600' },
    { value: 'administrative', label: 'إدارية', icon: FileText, color: 'text-orange-600' },
    { value: 'historical', label: 'تاريخية', icon: Archive, color: 'text-amber-600' }
  ];

  const typeOptions = [
    { value: 'all', label: 'جميع الأنواع' },
    { value: 'pdf', label: 'PDF' },
    { value: 'word', label: 'Word' },
    { value: 'excel', label: 'Excel' },
    { value: 'image', label: 'صور' },
    { value: 'other', label: 'أخرى' }
  ];

  const accessLevelOptions = [
    { value: 'all', label: 'جميع المستويات' },
    { value: 'public', label: 'عام' },
    { value: 'internal', label: 'داخلي' },
    { value: 'restricted', label: 'مقيد' },
    { value: 'confidential', label: 'سري' }
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-8 h-8 text-red-500" />;
      case 'word':
        return <FileText className="w-8 h-8 text-blue-500" />;
      case 'excel':
        return <FileText className="w-8 h-8 text-green-500" />;
      case 'image':
        return <Image className="w-8 h-8 text-purple-500" />;
      default:
        return <File className="w-8 h-8 text-gray-500" />;
    }
  };

  const getAccessLevelBadge = (level: string) => {
    switch (level) {
      case 'public':
        return 'bg-green-100 text-green-800';
      case 'internal':
        return 'bg-blue-100 text-blue-800';
      case 'restricted':
        return 'bg-orange-100 text-orange-800';
      case 'confidential':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getAccessLevelIcon = (level: string) => {
    switch (level) {
      case 'public':
        return <Unlock className="w-4 h-4 text-green-500" />;
      case 'internal':
      case 'restricted':
      case 'confidential':
        return <Lock className="w-4 h-4 text-red-500" />;
      default:
        return <Unlock className="w-4 h-4 text-gray-500" />;
    }
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    const matchesType = selectedType === 'all' || doc.type === selectedType;
    const matchesAccessLevel = selectedAccessLevel === 'all' || doc.accessLevel === selectedAccessLevel;
    return matchesSearch && matchesCategory && matchesType && matchesAccessLevel;
  });

  const sortedDocuments = [...filteredDocuments].sort((a, b) => {
    let aValue, bValue;
    switch (sortBy) {
      case 'name':
        aValue = a.name;
        bValue = b.name;
        break;
      case 'size':
        aValue = a.size;
        bValue = b.size;
        break;
      case 'date':
        aValue = new Date(a.uploadedAt);
        bValue = new Date(b.uploadedAt);
        break;
      default:
        aValue = a.uploadedAt;
        bValue = b.uploadedAt;
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  // حساب الإحصائيات
  const totalDocuments = documents.length;
  const totalSize = documents.reduce((sum, doc) => sum + doc.size, 0);
  const archivedCount = documents.filter(doc => doc.isArchived).length;
  const recentCount = documents.filter(doc => {
    const uploadDate = new Date(doc.uploadedAt);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return uploadDate > weekAgo;
  }).length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">إدارة الوثائق والأرشيف</h1>
          <p className="text-gray-600 mt-1">نظام أرشفة إلكتروني متقدم مع إمكانية البحث في محتوى الوثائق</p>
        </div>
        <div className="flex items-center space-x-4 space-x-reverse">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
            <Download className="w-5 h-5 ml-2" />
            تصدير الفهرس
          </button>
          <button 
            onClick={() => setShowUploadModal(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
          >
            <Upload className="w-5 h-5 ml-2" />
            رفع وثيقة جديدة
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 border-r-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">إجمالي الوثائق</p>
              <p className="text-3xl font-bold text-gray-800">{totalDocuments}</p>
            </div>
            <FileText className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border-r-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">الحجم الإجمالي</p>
              <p className="text-2xl font-bold text-gray-800">{totalSize.toFixed(1)} GB</p>
            </div>
            <Archive className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border-r-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">وثائق مؤرشفة</p>
              <p className="text-2xl font-bold text-gray-800">{archivedCount}</p>
            </div>
            <Archive className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border-r-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">مضافة هذا الأسبوع</p>
              <p className="text-2xl font-bold text-gray-800">{recentCount}</p>
            </div>
            <Clock className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4">
          <div className="md:col-span-2 relative">
            <Search className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="البحث في الوثائق والمحتوى..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10 pl-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {categoryOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {typeOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          
          <select
            value={selectedAccessLevel}
            onChange={(e) => setSelectedAccessLevel(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {accessLevelOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          
          <div className="flex items-center space-x-2 space-x-reverse">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="date">التاريخ</option>
              <option value="name">الاسم</option>
              <option value="size">الحجم</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              {sortOrder === 'asc' ? <SortAsc className="w-5 h-5" /> : <SortDesc className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 space-x-reverse">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'}`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
          
          <div className="text-sm text-gray-600">
            عرض {sortedDocuments.length} من {totalDocuments} وثيقة
          </div>
        </div>
      </div>

      {/* Documents Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedDocuments.map((doc) => (
            <div key={doc.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    {getFileIcon(doc.type)}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{doc.name}</h3>
                      <p className="text-sm text-gray-500">{doc.size} MB</p>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
                
                <p className="text-gray-600 mb-4 text-sm line-clamp-2">{doc.content}</p>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {doc.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                  {doc.tags.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      +{doc.tags.length - 3}
                    </span>
                  )}
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">الفئة:</span>
                    <span className="font-medium">
                      {categoryOptions.find(c => c.value === doc.category)?.label}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">مستوى الوصول:</span>
                    <div className="flex items-center space-x-1 space-x-reverse">
                      {getAccessLevelIcon(doc.accessLevel)}
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getAccessLevelBadge(doc.accessLevel)}`}>
                        {accessLevelOptions.find(a => a.value === doc.accessLevel)?.label}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">رفع بواسطة:</span>
                    <span className="font-medium">{doc.uploadedBy}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <div className="flex items-center space-x-1 space-x-reverse">
                      <Eye className="w-4 h-4" />
                      <span>{doc.views}</span>
                    </div>
                    <div className="flex items-center space-x-1 space-x-reverse">
                      <Download className="w-4 h-4" />
                      <span>{doc.downloads}</span>
                    </div>
                  </div>
                  <span>{new Date(doc.uploadedAt).toLocaleDateString('ar-EG')}</span>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <button 
                    onClick={() => {
                      setSelectedDocument(doc);
                      setShowPreviewModal(true);
                    }}
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    معاينة
                  </button>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <button className="text-green-600 hover:text-green-700">
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="text-purple-600 hover:text-purple-700">
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button className="text-orange-600 hover:text-orange-700">
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الوثيقة
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الفئة
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الحجم
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    مستوى الوصول
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    رفع بواسطة
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    التاريخ
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الإجراءات
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedDocuments.map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        {getFileIcon(doc.type)}
                        <div>
                          <div className="text-sm font-medium text-gray-900">{doc.name}</div>
                          <div className="text-sm text-gray-500">{doc.content.slice(0, 60)}...</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                        {categoryOptions.find(c => c.value === doc.category)?.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {doc.size} MB
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-1 space-x-reverse">
                        {getAccessLevelIcon(doc.accessLevel)}
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getAccessLevelBadge(doc.accessLevel)}`}>
                          {accessLevelOptions.find(a => a.value === doc.accessLevel)?.label}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{doc.uploadedBy}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">
                          {new Date(doc.uploadedAt).toLocaleDateString('ar-EG')}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <button 
                          onClick={() => {
                            setSelectedDocument(doc);
                            setShowPreviewModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-700"
                          title="معاينة"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          className="text-green-600 hover:text-green-700"
                          title="تحميل"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button 
                          className="text-orange-600 hover:text-orange-700"
                          title="تعديل"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          className="text-purple-600 hover:text-purple-700"
                          title="مشاركة"
                        >
                          <Share2 className="w-4 h-4" />
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
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">رفع وثيقة جديدة</h2>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">اسم الوثيقة</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="أدخل اسم الوثيقة"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">الوصف</label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="أدخل وصف مفصل للوثيقة"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الفئة</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                    {categoryOptions.slice(1).map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">مستوى الوصول</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                    {accessLevelOptions.slice(1).map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">العلامات (Tags)</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="أدخل العلامات مفصولة بفواصل"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">مرتبطة بـ</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option value="general">عام</option>
                  <option value="case">قضية</option>
                  <option value="waqf_land">أرض وقفية</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">رفع الملف</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">اسحب الملف هنا أو انقر للاختيار</p>
                  <p className="text-sm text-gray-500">الحد الأقصى: 50 MB</p>
                  <input type="file" className="hidden" />
                  <button type="button" className="mt-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200">
                    اختيار ملف
                  </button>
                </div>
              </div>
              
              <div className="flex justify-end space-x-4 space-x-reverse pt-4">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  رفع الوثيقة
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreviewModal && selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">معاينة الوثيقة</h2>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="bg-gray-100 rounded-lg p-8 text-center">
                  {getFileIcon(selectedDocument.type)}
                  <h3 className="text-lg font-semibold mt-4 mb-2">{selectedDocument.name}</h3>
                  <p className="text-gray-600 mb-4">{selectedDocument.content}</p>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    فتح الملف
                  </button>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-3">معلومات الوثيقة</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">الحجم:</span>
                      <span className="font-medium">{selectedDocument.size} MB</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">النوع:</span>
                      <span className="font-medium">{selectedDocument.type.toUpperCase()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">الفئة:</span>
                      <span className="font-medium">
                        {categoryOptions.find(c => c.value === selectedDocument.category)?.label}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">مستوى الوصول:</span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getAccessLevelBadge(selectedDocument.accessLevel)}`}>
                        {accessLevelOptions.find(a => a.value === selectedDocument.accessLevel)?.label}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-3">العلامات</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedDocument.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-3">الإحصائيات</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">المشاهدات:</span>
                      <span className="font-medium">{selectedDocument.views}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">التحميلات:</span>
                      <span className="font-medium">{selectedDocument.downloads}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">رفع بواسطة:</span>
                      <span className="font-medium">{selectedDocument.uploadedBy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">تاريخ الرفع:</span>
                      <span className="font-medium">
                        {new Date(selectedDocument.uploadedAt).toLocaleDateString('ar-EG')}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
                    تحميل الوثيقة
                  </button>
                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                    مشاركة
                  </button>
                  <button className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700">
                    تعديل المعلومات
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentsManagement;