import React, { useState } from 'react';
import { 
  Hammer, 
  Building, 
  MapPin, 
  Calendar, 
  Clock, 
  Star, 
  Search, 
  Filter,
  Eye,
  Phone,
  Mail,
  Users,
  Award,
  Target,
  CheckCircle,
  AlertTriangle,
  Info,
  Download,
  Share2,
  Bookmark,
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  Image,
  Video,
  FileText,
  Globe,
  Zap,
  Sparkles,
  Crown,
  Gem,
  TrendingUp,
  BarChart3,
  PieChart,
  DollarSign,
  Wrench,
  Paintbrush,
  Home,
  School,
  Cross,
  TreePine,
  Activity,
  Layers,
  Settings,
  Shield,
  Heart,
  BookOpen,
  Lightbulb,
  Rocket,
  Flag,
  Compass
} from 'lucide-react';

const ProjectsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const projects = [
    {
      id: 1,
      title: 'مشروع ترميم المسجد الأقصى المبارك',
      description: 'مشروع شامل لترميم وصيانة المسجد الأقصى المبارك والحفاظ على معالمه التاريخية',
      category: 'restoration',
      status: 'ongoing',
      priority: 'urgent',
      budget: 5000000,
      spent: 3200000,
      startDate: '2023-01-15',
      endDate: '2024-12-31',
      progress: 64,
      location: 'القدس - الحرم القدسي الشريف',
      manager: 'المهندس أحمد محمد الأحمد',
      team: 45,
      beneficiaries: 50000,
      image: 'https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&w=800',
      objectives: [
        'ترميم القبة الذهبية والمآذن',
        'تجديد الأرضيات والجدران',
        'تحديث أنظمة الإضاءة والصوت',
        'تطوير المرافق الخدمية',
        'الحفاظ على الطابع التاريخي'
      ],
      phases: [
        { name: 'التخطيط والتصميم', status: 'completed', progress: 100 },
        { name: 'أعمال الترميم الأساسية', status: 'ongoing', progress: 75 },
        { name: 'التجهيزات التقنية', status: 'ongoing', progress: 45 },
        { name: 'اللمسات الأخيرة', status: 'pending', progress: 0 }
      ],
      funding: [
        { source: 'وزارة الأوقاف', amount: 2000000, percentage: 40 },
        { source: 'التبرعات المحلية', amount: 1500000, percentage: 30 },
        { source: 'المنح الدولية', amount: 1000000, percentage: 20 },
        { source: 'الأوقاف الخاصة', amount: 500000, percentage: 10 }
      ],
      contact: {
        phone: '+970 2 628 3292',
        email: 'aqsa.project@awqaf.gov.ps'
      }
    },
    {
      id: 2,
      title: 'مشروع بناء المركز الإسلامي الشامل',
      description: 'إنشاء مركز إسلامي متكامل يضم مسجد ومدرسة ومركز صحي ومرافق اجتماعية',
      category: 'construction',
      status: 'planning',
      priority: 'high',
      budget: 3500000,
      spent: 350000,
      startDate: '2024-03-01',
      endDate: '2025-12-31',
      progress: 10,
      location: 'رام الله - حي الطيرة',
      manager: 'المهندسة فاطمة خالد يوسف',
      team: 25,
      beneficiaries: 15000,
      image: 'https://images.pexels.com/photos/8107628/pexels-photo-8107628.jpeg?auto=compress&cs=tinysrgb&w=800',
      objectives: [
        'بناء مسجد بسعة 2000 مصلي',
        'إنشاء مدرسة قرآنية',
        'تأسيس مركز صحي',
        'إنشاء مركز للأنشطة الاجتماعية',
        'تطوير مساحات خضراء'
      ],
      phases: [
        { name: 'الدراسات والتصاميم', status: 'ongoing', progress: 80 },
        { name: 'الحصول على التراخيص', status: 'ongoing', progress: 60 },
        { name: 'أعمال البناء', status: 'pending', progress: 0 },
        { name: 'التجهيز والافتتاح', status: 'pending', progress: 0 }
      ],
      features: [
        'تصميم معماري إسلامي حديث',
        'تقنيات البناء الأخضر',
        'أنظمة طاقة متجددة',
        'مرافق ذكية ومتطورة'
      ]
    },
    {
      id: 3,
      title: 'مشروع رقمنة الأوقاف الفلسطينية',
      description: 'مشروع تقني شامل لرقمنة جميع سجلات الأوقاف وإنشاء نظام إدارة إلكتروني متطور',
      category: 'technology',
      status: 'ongoing',
      priority: 'high',
      budget: 1200000,
      spent: 720000,
      startDate: '2023-06-01',
      endDate: '2024-06-30',
      progress: 75,
      location: 'جميع المحافظات',
      manager: 'المهندس خالد يوسف إبراهيم',
      team: 15,
      beneficiaries: 100000,
      image: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=800',
      objectives: [
        'رقمنة سجلات الأوقاف',
        'تطوير نظام إدارة إلكتروني',
        'إنشاء قاعدة بيانات مركزية',
        'تدريب الموظفين',
        'تطوير تطبيق للهواتف الذكية'
      ],
      phases: [
        { name: 'تحليل المتطلبات', status: 'completed', progress: 100 },
        { name: 'التطوير والبرمجة', status: 'ongoing', progress: 85 },
        { name: 'الاختبار والتجريب', status: 'ongoing', progress: 60 },
        { name: 'النشر والتدريب', status: 'pending', progress: 0 }
      ],
      technologies: [
        'قواعد بيانات متقدمة',
        'أنظمة الأمان السيبراني',
        'تطبيقات الهواتف الذكية',
        'أنظمة النسخ الاحتياطي'
      ]
    },
    {
      id: 4,
      title: 'مشروع تأهيل الأئمة والخطباء',
      description: 'برنامج تدريبي شامل لتأهيل وتطوير مهارات الأئمة والخطباء في فلسطين',
      category: 'education',
      status: 'ongoing',
      priority: 'medium',
      budget: 800000,
      spent: 480000,
      startDate: '2023-09-01',
      endDate: '2024-08-31',
      progress: 60,
      location: 'مراكز التدريب في المحافظات',
      manager: 'الدكتور نور الدين محمد حسن',
      team: 20,
      beneficiaries: 500,
      image: 'https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=800',
      objectives: [
        'تدريب 500 إمام وخطيب',
        'تطوير مناهج تدريبية حديثة',
        'إقامة ورش عمل متخصصة',
        'إصدار شهادات معتمدة',
        'إنشاء شبكة تواصل مهنية'
      ],
      phases: [
        { name: 'إعداد المناهج', status: 'completed', progress: 100 },
        { name: 'التدريب الأساسي', status: 'ongoing', progress: 70 },
        { name: 'التدريب المتقدم', status: 'ongoing', progress: 40 },
        { name: 'التقييم والشهادات', status: 'pending', progress: 0 }
      ],
      courses: [
        'فن الخطابة والإلقاء',
        'التفسير والحديث',
        'الإرشاد النفسي والاجتماعي',
        'استخدام التكنولوجيا في التعليم'
      ]
    },
    {
      id: 5,
      title: 'مشروع الطاقة المتجددة للمساجد',
      description: 'مشروع بيئي لتزويد المساجد بأنظمة الطاقة الشمسية وتقليل استهلاك الكهرباء',
      category: 'environment',
      status: 'ongoing',
      priority: 'medium',
      budget: 2000000,
      spent: 800000,
      startDate: '2023-04-01',
      endDate: '2024-12-31',
      progress: 40,
      location: '50 مسجد في المحافظات',
      manager: 'المهندس عمر الزهار',
      team: 30,
      beneficiaries: 25000,
      image: 'https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&w=800',
      objectives: [
        'تركيب أنظمة طاقة شمسية',
        'تقليل فواتير الكهرباء بنسبة 70%',
        'تدريب فرق الصيانة',
        'نشر الوعي البيئي',
        'إنشاء نموذج مستدام'
      ],
      phases: [
        { name: 'الدراسة الفنية', status: 'completed', progress: 100 },
        { name: 'التركيب والتشغيل', status: 'ongoing', progress: 50 },
        { name: 'التدريب والصيانة', status: 'ongoing', progress: 30 },
        { name: 'التقييم والتوسع', status: 'pending', progress: 0 }
      ],
      benefits: [
        'توفير 500,000 شيكل سنوياً',
        'تقليل انبعاثات الكربون',
        'استقلالية في الطاقة',
        'نموذج للمشاريع البيئية'
      ]
    },
    {
      id: 6,
      title: 'مشروع الأرشيف الإلكتروني التراثي',
      description: 'مشروع لرقمنة وحفظ التراث الإسلامي الفلسطيني والوثائق التاريخية',
      category: 'heritage',
      status: 'completed',
      priority: 'high',
      budget: 900000,
      spent: 900000,
      startDate: '2022-01-01',
      endDate: '2023-12-31',
      progress: 100,
      location: 'مركز الأرشيف الرقمي - رام الله',
      manager: 'الدكتور سالم عبد الله قاسم',
      team: 12,
      beneficiaries: 200000,
      image: 'https://images.pexels.com/photos/8107628/pexels-photo-8107628.jpeg?auto=compress&cs=tinysrgb&w=800',
      objectives: [
        'رقمنة 50,000 وثيقة تاريخية',
        'إنشاء مكتبة رقمية',
        'تطوير محرك بحث متقدم',
        'إتاحة الوصول للباحثين',
        'الحفاظ على التراث'
      ],
      achievements: [
        'رقمنة 52,000 وثيقة',
        'إنشاء قاعدة بيانات شاملة',
        'تدريب 100 موظف',
        'إطلاق الموقع الإلكتروني',
        'توثيق 500 مخطوط نادر'
      ],
      impact: [
        'حفظ التراث للأجيال القادمة',
        'تسهيل البحث العلمي',
        'زيادة الوعي التراثي',
        'دعم الهوية الثقافية'
      ]
    }
  ];

  const categories = [
    { id: 'all', name: 'جميع المشاريع', icon: Rocket, color: 'text-islamic-600' },
    { id: 'construction', name: 'إنشاءات', icon: Building, color: 'text-blue-600' },
    { id: 'restoration', name: 'ترميم', icon: Hammer, color: 'text-orange-600' },
    { id: 'technology', name: 'تقنية', icon: Zap, color: 'text-purple-600' },
    { id: 'education', name: 'تعليمية', icon: BookOpen, color: 'text-green-600' },
    { id: 'environment', name: 'بيئية', icon: TreePine, color: 'text-teal-600' },
    { id: 'heritage', name: 'تراثية', icon: Crown, color: 'text-amber-600' }
  ];

  const statusOptions = [
    { id: 'all', name: 'جميع الحالات' },
    { id: 'planning', name: 'قيد التخطيط' },
    { id: 'ongoing', name: 'قيد التنفيذ' },
    { id: 'completed', name: 'مكتمل' },
    { id: 'suspended', name: 'معلق' },
    { id: 'cancelled', name: 'ملغي' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'planning':
        return <Compass className="w-4 h-4 text-blue-500" />;
      case 'ongoing':
        return <Activity className="w-4 h-4 text-green-500" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-gray-500" />;
      case 'suspended':
        return <AlertTriangle className="w-4 h-4 text-orange-500" />;
      case 'cancelled':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default:
        return <Info className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'planning':
        return 'bg-blue-100 text-blue-800';
      case 'ongoing':
        return 'status-active';
      case 'completed':
        return 'status-inactive';
      case 'suspended':
        return 'status-pending';
      case 'cancelled':
        return 'status-error';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || project.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProjects = filteredProjects.slice(startIndex, startIndex + itemsPerPage);

  // حساب الإحصائيات
  const totalBudget = projects.reduce((sum, project) => sum + project.budget, 0);
  const totalSpent = projects.reduce((sum, project) => sum + project.spent, 0);
  const ongoingProjects = projects.filter(project => project.status === 'ongoing').length;
  const completedProjects = projects.filter(project => project.status === 'completed').length;

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="islamic-gradient text-white rounded-2xl p-8 mb-8 islamic-pattern">
          <div className="text-center">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl animate-float">
              <Rocket className="w-12 h-12 text-islamic-600" />
            </div>
            <h1 className="heading-1 text-white mb-4">المشاريع والمبادرات</h1>
            <p className="body-large text-golden-200 max-w-4xl mx-auto">
              تعرف على المشاريع التطويرية والمبادرات الاستراتيجية لوزارة الأوقاف والشؤون الدينية
            </p>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card-islamic">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-sage-600 font-body">إجمالي المشاريع</p>
                <p className="text-3xl font-bold text-islamic-700 font-display">{projects.length}</p>
              </div>
              <Rocket className="w-8 h-8 text-islamic-500" />
            </div>
          </div>
          
          <div className="card-golden">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-sage-600 font-body">الميزانية الإجمالية</p>
                <p className="text-xl font-bold text-golden-700 font-display">{(totalBudget / 1000000).toFixed(1)}M ₪</p>
              </div>
              <DollarSign className="w-8 h-8 text-golden-500" />
            </div>
          </div>
          
          <div className="card-sage">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-sage-600 font-body">قيد التنفيذ</p>
                <p className="text-3xl font-bold text-sage-700 font-display">{ongoingProjects}</p>
              </div>
              <Activity className="w-8 h-8 text-sage-500" />
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-sage-600 font-body">مكتملة</p>
                <p className="text-3xl font-bold text-gray-700 font-display">{completedProjects}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-elegant p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute right-3 top-3 h-5 w-5 text-sage-400" />
              <input
                type="text"
                placeholder="البحث في المشاريع..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input pr-10"
              />
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="form-select"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
            
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="form-select"
            >
              {statusOptions.map(status => (
                <option key={status.id} value={status.id}>{status.name}</option>
              ))}
            </select>
            
            <button className="btn-primary">
              <Filter className="w-5 h-5 ml-2" />
              فلاتر متقدمة
            </button>
          </div>
        </div>

        {/* Categories Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 space-x-reverse px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-islamic-600 text-white shadow-islamic'
                    : 'bg-white text-sage-700 hover:bg-islamic-50 hover:text-islamic-700 shadow-soft'
                }`}
              >
                <category.icon className={`w-5 h-5 ${selectedCategory === category.id ? 'text-white' : category.color}`} />
                <span className="font-body">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {currentProjects.map((project, index) => (
            <div key={project.id} className={`card-islamic hover-lift animate-fade-in-up`} style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="relative overflow-hidden rounded-xl mb-6">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute top-4 right-4 flex space-x-2 space-x-reverse">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(project.status)}`}>
                    {statusOptions.find(s => s.id === project.status)?.name}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityBadge(project.priority)}`}>
                    {project.priority === 'urgent' ? 'عاجل' : 
                     project.priority === 'high' ? 'مهم' :
                     project.priority === 'medium' ? 'متوسط' : 'منخفض'}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-body text-islamic-700">التقدم: {project.progress}%</span>
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-islamic-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-islamic-800 mb-2 line-clamp-2 font-display">
                    {project.title}
                  </h3>
                  <p className="text-sage-600 line-clamp-3 font-body leading-relaxed">
                    {project.description}
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 space-x-reverse text-sm">
                    <Users className="w-4 h-4 text-sage-400" />
                    <span className="text-sage-600 font-body">{project.manager}</span>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse text-sm">
                    <MapPin className="w-4 h-4 text-sage-400" />
                    <span className="text-sage-600 font-body">{project.location}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <DollarSign className="w-4 h-4 text-sage-400" />
                      <span className="text-sage-600 font-body">{(project.budget / 1000000).toFixed(1)}M ₪</span>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Heart className="w-4 h-4 text-sage-400" />
                      <span className="text-sage-600 font-body">{project.beneficiaries.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-sage-200">
                  <button 
                    onClick={() => {
                      setSelectedProject(project);
                      setShowModal(true);
                    }}
                    className="text-islamic-600 hover:text-islamic-700 font-medium font-body group"
                  >
                    <span>عرض التفاصيل</span>
                    <ArrowLeft className="w-4 h-4 inline mr-1 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <button className="text-golden-600 hover:text-golden-700 transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="text-blue-600 hover:text-blue-700 transition-colors">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-2 space-x-reverse">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-sage-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-sage-50 transition-colors font-body"
              >
                السابق
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 border rounded-lg transition-colors font-body ${
                    currentPage === page
                      ? 'bg-islamic-600 text-white border-islamic-600'
                      : 'border-sage-300 hover:bg-sage-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border border-sage-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-sage-50 transition-colors font-body"
              >
                التالي
              </button>
            </div>
          </div>
        )}

        {/* Project Statistics */}
        <div className="bg-white rounded-2xl shadow-elegant p-8">
          <h2 className="heading-2 text-islamic-800 mb-6">إحصائيات المشاريع</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center bg-gradient-to-br from-islamic-50 to-golden-50 rounded-xl p-6">
              <DollarSign className="w-12 h-12 text-islamic-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-islamic-700 mb-2 font-display">{(totalBudget / 1000000).toFixed(1)}M ₪</h3>
              <p className="text-sage-600 font-body">إجمالي الميزانيات</p>
            </div>
            
            <div className="text-center bg-gradient-to-br from-golden-50 to-sage-50 rounded-xl p-6">
              <TrendingUp className="w-12 h-12 text-golden-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-golden-700 mb-2 font-display">{((totalSpent / totalBudget) * 100).toFixed(0)}%</h3>
              <p className="text-sage-600 font-body">نسبة الإنجاز المالي</p>
            </div>
            
            <div className="text-center bg-gradient-to-br from-sage-50 to-blue-50 rounded-xl p-6">
              <Users className="w-12 h-12 text-sage-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-sage-700 mb-2 font-display">
                {projects.reduce((sum, p) => sum + p.beneficiaries, 0).toLocaleString()}
              </h3>
              <p className="text-sage-600 font-body">إجمالي المستفيدين</p>
            </div>
            
            <div className="text-center bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
              <Award className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-blue-700 mb-2 font-display">{completedProjects}</h3>
              <p className="text-sage-600 font-body">مشاريع مكتملة</p>
            </div>
          </div>
        </div>
      </div>

      {/* Project Details Modal */}
      {showModal && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="heading-2 text-islamic-800">تفاصيل المشروع</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-sage-500 hover:text-sage-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-64 object-cover rounded-xl shadow-lg"
                  />
                </div>
                
                <div>
                  <h3 className="heading-3 text-islamic-800 mb-3">{selectedProject.title}</h3>
                  <p className="body-text text-sage-600 leading-relaxed">{selectedProject.description}</p>
                </div>

                <div className="bg-islamic-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-islamic-800 mb-3 font-display">أهداف المشروع</h4>
                  <ul className="space-y-2">
                    {selectedProject.objectives.map((objective: string, index: number) => (
                      <li key={index} className="flex items-start space-x-2 space-x-reverse">
                        <Target className="w-4 h-4 text-islamic-600 mt-1 flex-shrink-0" />
                        <span className="text-sage-700 font-body">{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-golden-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-golden-800 mb-3 font-display">مراحل التنفيذ</h4>
                  <div className="space-y-3">
                    {selectedProject.phases.map((phase: any, index: number) => (
                      <div key={index} className="bg-white rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-800 font-body">{phase.name}</span>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(phase.status)}`}>
                            {statusOptions.find(s => s.id === phase.status)?.name}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-islamic-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${phase.progress}%` }}
                          ></div>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{phase.progress}% مكتمل</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-sage-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-sage-800 mb-3 font-display">معلومات المشروع</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-body text-sage-600">الميزانية:</span>
                      <span className="font-bold text-sage-800 font-display">{project.budget.toLocaleString()} ₪</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-body text-sage-600">المنفق:</span>
                      <span className="font-bold text-sage-800 font-display">{project.spent.toLocaleString()} ₪</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-body text-sage-600">فريق العمل:</span>
                      <span className="font-bold text-sage-800 font-display">{project.team} شخص</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-body text-sage-600">المستفيدون:</span>
                      <span className="font-bold text-sage-800 font-display">{project.beneficiaries.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-blue-800 mb-3 font-display">الجدول الزمني</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <span className="font-body text-sage-700">البداية: {new Date(selectedProject.startDate).toLocaleDateString('ar-EG')}</span>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span className="font-body text-sage-700">النهاية: {new Date(selectedProject.endDate).toLocaleDateString('ar-EG')}</span>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Activity className="w-4 h-4 text-blue-600" />
                      <span className="font-body text-sage-700">التقدم: {selectedProject.progress}%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-purple-800 mb-3 font-display">معلومات التواصل</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Phone className="w-4 h-4 text-purple-600" />
                      <span className="font-body text-sage-700" dir="ltr">{selectedProject.contact.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Mail className="w-4 h-4 text-purple-600" />
                      <span className="font-body text-sage-700" dir="ltr">{selectedProject.contact.email}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-3 space-x-reverse">
                  <button className="btn-primary flex-1">
                    <Download className="w-5 h-5 ml-2" />
                    تحميل التقرير
                  </button>
                  <button className="btn-secondary">
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button className="btn-outline">
                    <Bookmark className="w-5 h-5" />
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

export default ProjectsPage;