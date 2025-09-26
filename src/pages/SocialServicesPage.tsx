import React, { useState } from 'react';
import { 
  Heart, 
  Users, 
  Gift, 
  Home, 
  GraduationCap, 
  Stethoscope, 
  Utensils,
  Baby,
  UserCheck,
  HandHeart,
  Search,
  Filter,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Clock,
  Star,
  CheckCircle,
  AlertTriangle,
  Info,
  Download,
  Share2,
  Eye,
  ArrowLeft,
  Plus,
  Target,
  TrendingUp,
  Award,
  Sparkles,
  Shield,
  Zap,
  Globe,
  Building,
  FileText
} from 'lucide-react';

const SocialServicesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedService, setSelectedService] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  const socialServices = [
    {
      id: 1,
      title: 'برنامج كفالة الأيتام',
      description: 'برنامج شامل لرعاية وكفالة الأطفال الأيتام وتوفير احتياجاتهم التعليمية والصحية والاجتماعية',
      category: 'orphans',
      icon: Baby,
      color: 'from-pink-500 to-pink-600',
      beneficiaries: 450,
      monthlyBudget: 125000,
      coverage: ['القدس', 'رام الله', 'نابلس', 'الخليل', 'غزة'],
      image: 'https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=800',
      services: [
        'كفالة شهرية للأيتام',
        'رعاية صحية شاملة',
        'دعم تعليمي ومنح دراسية',
        'أنشطة ترفيهية وتربوية',
        'متابعة نفسية واجتماعية'
      ],
      requirements: [
        'شهادة وفاة الوالد/الوالدة',
        'شهادة ميلاد الطفل',
        'إثبات الحالة الاجتماعية',
        'تقرير طبي إذا لزم الأمر'
      ],
      contact: {
        name: 'الأستاذة فاطمة أحمد',
        phone: '+970 2 298 2540',
        email: 'orphans@awqaf.gov.ps',
        office: 'إدارة الشؤون الاجتماعية - الطابق الثاني'
      },
      statistics: {
        totalOrphans: 450,
        newCases: 25,
        graduatedCases: 18,
        successRate: 95
      }
    },
    {
      id: 2,
      title: 'صندوق الزكاة والصدقات',
      description: 'صندوق لجمع وتوزيع الزكاة والصدقات على الأسر المحتاجة والفقراء وفقاً للضوابط الشرعية',
      category: 'zakat',
      icon: HandHeart,
      color: 'from-green-500 to-green-600',
      beneficiaries: 1200,
      monthlyBudget: 280000,
      coverage: ['جميع المحافظات'],
      image: 'https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&w=800',
      services: [
        'توزيع الزكاة على مستحقيها',
        'مساعدات نقدية للأسر المحتاجة',
        'مساعدات عينية (طعام، ملابس)',
        'دعم المشاريع الصغيرة',
        'مساعدات طبية وتعليمية'
      ],
      zakatTypes: [
        'زكاة المال',
        'زكاة الذهب والفضة',
        'زكاة التجارة',
        'زكاة الزروع والثمار',
        'زكاة الأنعام'
      ],
      contact: {
        name: 'الأستاذ محمد خالد',
        phone: '+970 2 298 2541',
        email: 'zakat@awqaf.gov.ps',
        office: 'صندوق الزكاة - الطابق الأول'
      },
      statistics: {
        totalFamilies: 1200,
        monthlyDistribution: 280000,
        zakatCollected: 450000,
        projectsSupported: 85
      }
    },
    {
      id: 3,
      title: 'برنامج الإسكان الخيري',
      description: 'برنامج لتوفير السكن المناسب للأسر المحتاجة من خلال الوحدات السكنية الوقفية والمساعدات الإسكانية',
      category: 'housing',
      icon: Home,
      color: 'from-blue-500 to-blue-600',
      beneficiaries: 180,
      monthlyBudget: 95000,
      coverage: ['رام الله', 'نابلس', 'الخليل', 'جنين'],
      image: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=800',
      services: [
        'توفير وحدات سكنية بأجور رمزية',
        'مساعدات لترميم المنازل',
        'دعم إيجار السكن',
        'مساعدات لشراء الأثاث',
        'استشارات قانونية إسكانية'
      ],
      housingTypes: [
        'شقق سكنية للأسر الصغيرة',
        'منازل للأسر الكبيرة',
        'وحدات سكنية للمسنين',
        'سكن مؤقت للطوارئ'
      ],
      contact: {
        name: 'المهندس أحمد سالم',
        phone: '+970 2 298 2542',
        email: 'housing@awqaf.gov.ps',
        office: 'قسم الإسكان - الطابق الثاني'
      }
    },
    {
      id: 4,
      title: 'برنامج الرعاية الصحية',
      description: 'برنامج لتوفير الرعاية الصحية والعلاج للمرضى غير القادرين من خلال شبكة من المراكز الصحية',
      category: 'healthcare',
      icon: Stethoscope,
      color: 'from-red-500 to-red-600',
      beneficiaries: 800,
      monthlyBudget: 150000,
      coverage: ['القدس', 'غزة', 'الخليل', 'جنين'],
      image: 'https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=800',
      services: [
        'فحوصات طبية مجانية',
        'أدوية مدعومة',
        'عمليات جراحية مساعدة',
        'رعاية الأمومة والطفولة',
        'برامج التوعية الصحية'
      ],
      medicalCenters: [
        'مركز القدس الطبي',
        'عيادة غزة الخيرية',
        'مركز الخليل للرعاية',
        'عيادة جنين الشاملة'
      ],
      contact: {
        name: 'الدكتور عمر الزهار',
        phone: '+970 2 298 2543',
        email: 'health@awqaf.gov.ps',
        office: 'قسم الرعاية الصحية - الطابق الأول'
      }
    },
    {
      id: 5,
      title: 'برنامج التعليم والمنح الدراسية',
      description: 'برنامج لدعم التعليم وتوفير المنح الدراسية للطلاب المتفوقين من الأسر المحتاجة',
      category: 'education',
      icon: GraduationCap,
      color: 'from-purple-500 to-purple-600',
      beneficiaries: 320,
      monthlyBudget: 85000,
      coverage: ['جميع المحافظات'],
      image: 'https://images.pexels.com/photos/8107628/pexels-photo-8107628.jpeg?auto=compress&cs=tinysrgb&w=800',
      services: [
        'منح دراسية جامعية',
        'دعم الرسوم المدرسية',
        'توفير الكتب والقرطاسية',
        'دورات تقوية مجانية',
        'برامج التعليم المهني'
      ],
      scholarshipTypes: [
        'منح جامعية كاملة',
        'منح جزئية للرسوم',
        'منح للدراسات العليا',
        'منح التعليم المهني'
      ],
      contact: {
        name: 'الدكتور نور الدين أحمد',
        phone: '+970 2 298 2544',
        email: 'education@awqaf.gov.ps',
        office: 'قسم التعليم - الطابق الثالث'
      }
    },
    {
      id: 6,
      title: 'برنامج الأمن الغذائي',
      description: 'برنامج لتوفير الأمن الغذائي للأسر المحتاجة من خلال توزيع المواد الغذائية والوجبات الساخنة',
      category: 'food',
      icon: Utensils,
      color: 'from-orange-500 to-orange-600',
      beneficiaries: 950,
      monthlyBudget: 180000,
      coverage: ['غزة', 'الخليل', 'جنين', 'طولكرم'],
      image: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=800',
      services: [
        'سلل غذائية شهرية',
        'وجبات ساخنة يومية',
        'مساعدات غذائية طارئة',
        'برامج التغذية للأطفال',
        'مشاريع الأمن الغذائي المستدام'
      ],
      distributionPoints: [
        'مركز غزة للتوزيع',
        'مركز الخليل الخيري',
        'مركز جنين للمساعدات',
        'مركز طولكرم الاجتماعي'
      ],
      contact: {
        name: 'الأستاذة سارة خالد',
        phone: '+970 2 298 2545',
        email: 'food@awqaf.gov.ps',
        office: 'قسم الأمن الغذائي - الطابق الأول'
      }
    }
  ];

  const categories = [
    { id: 'all', name: 'جميع الخدمات', icon: Heart, color: 'text-islamic-600' },
    { id: 'orphans', name: 'رعاية الأيتام', icon: Baby, color: 'text-pink-600' },
    { id: 'zakat', name: 'الزكاة والصدقات', icon: HandHeart, color: 'text-green-600' },
    { id: 'housing', name: 'الإسكان الخيري', icon: Home, color: 'text-blue-600' },
    { id: 'healthcare', name: 'الرعاية الصحية', icon: Stethoscope, color: 'text-red-600' },
    { id: 'education', name: 'التعليم والمنح', icon: GraduationCap, color: 'text-purple-600' },
    { id: 'food', name: 'الأمن الغذائي', icon: Utensils, color: 'text-orange-600' }
  ];

  const filteredServices = socialServices.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalBeneficiaries = socialServices.reduce((sum, service) => sum + service.beneficiaries, 0);
  const totalBudget = socialServices.reduce((sum, service) => sum + service.monthlyBudget, 0);

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="islamic-gradient text-white rounded-2xl p-8 mb-8 islamic-pattern">
          <div className="text-center">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl animate-float">
              <Heart className="w-12 h-12 text-islamic-600" />
            </div>
            <h1 className="heading-1 text-white mb-4">الخدمات الاجتماعية</h1>
            <p className="body-large text-golden-200 max-w-4xl mx-auto">
              برامج الدعم الاجتماعي والخيري لخدمة المجتمع الفلسطيني وتحقيق التكافل الاجتماعي
            </p>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card-islamic">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-sage-600 font-body">إجمالي المستفيدين</p>
                <p className="text-3xl font-bold text-islamic-700 font-display">{totalBeneficiaries.toLocaleString()}</p>
              </div>
              <Users className="w-8 h-8 text-islamic-500" />
            </div>
          </div>
          
          <div className="card-golden">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-sage-600 font-body">الميزانية الشهرية</p>
                <p className="text-2xl font-bold text-golden-700 font-display">{totalBudget.toLocaleString()} ₪</p>
              </div>
              <Gift className="w-8 h-8 text-golden-500" />
            </div>
          </div>
          
          <div className="card-sage">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-sage-600 font-body">البرامج النشطة</p>
                <p className="text-3xl font-bold text-sage-700 font-display">{socialServices.length}</p>
              </div>
              <Target className="w-8 h-8 text-sage-500" />
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-sage-600 font-body">المحافظات المغطاة</p>
                <p className="text-3xl font-bold text-gray-700 font-display">16</p>
              </div>
              <MapPin className="w-8 h-8 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-elegant p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute right-3 top-3 h-5 w-5 text-sage-400" />
              <input
                type="text"
                placeholder="البحث في الخدمات الاجتماعية..."
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

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {filteredServices.map((service, index) => (
            <div key={service.id} className={`card-islamic hover-lift animate-fade-in-up`} style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="relative overflow-hidden rounded-xl mb-6">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute top-4 right-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center shadow-lg`}>
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-islamic-800 mb-2 font-display">
                    {service.title}
                  </h3>
                  <p className="text-sage-600 line-clamp-3 font-body leading-relaxed">
                    {service.description}
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-sage-600 font-body">المستفيدون:</span>
                    <span className="font-bold text-islamic-700 font-display">{service.beneficiaries.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-sage-600 font-body">الميزانية الشهرية:</span>
                    <span className="font-bold text-golden-700 font-display">{service.monthlyBudget.toLocaleString()} ₪</span>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <MapPin className="w-4 h-4 text-sage-400" />
                    <span className="text-sm text-sage-600 font-body">
                      {service.coverage.length > 2 ? `${service.coverage.slice(0, 2).join(', ')} +${service.coverage.length - 2}` : service.coverage.join(', ')}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-sage-200">
                  <button 
                    onClick={() => {
                      setSelectedService(service);
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

        {/* How to Apply Section */}
        <div className="bg-white rounded-2xl shadow-elegant p-8 mb-8">
          <h2 className="heading-2 text-islamic-800 mb-6">كيفية التقدم للخدمات</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: 1, title: 'تحديد الخدمة', desc: 'اختر الخدمة المناسبة لاحتياجاتك', icon: Target },
              { step: 2, title: 'تجهيز الوثائق', desc: 'جهز الوثائق والمستندات المطلوبة', icon: FileText },
              { step: 3, title: 'تقديم الطلب', desc: 'قدم طلبك في المكتب المختص', icon: UserCheck },
              { step: 4, title: 'المتابعة', desc: 'تابع حالة طلبك واستلم الخدمة', icon: CheckCircle }
            ].map((step) => (
              <div key={step.step} className="text-center">
                <div className="w-16 h-16 islamic-gradient rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-islamic-800 mb-2 font-display">{step.title}</h3>
                <p className="text-sage-600 text-sm font-body">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="islamic-gradient text-white rounded-2xl p-8">
          <div className="text-center">
            <h2 className="heading-2 text-white mb-6">للاستفسار والتواصل</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center justify-center space-x-3 space-x-reverse">
                <Phone className="w-6 h-6" />
                <div>
                  <p className="font-semibold font-display text-golden-200">الخط الساخن</p>
                  <p className="opacity-90" dir="ltr">+970 2 298 2540</p>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-3 space-x-reverse">
                <Mail className="w-6 h-6" />
                <div>
                  <p className="font-semibold font-display text-golden-200">البريد الإلكتروني</p>
                  <p className="opacity-90" dir="ltr">social@awqaf.gov.ps</p>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-3 space-x-reverse">
                <Clock className="w-6 h-6" />
                <div>
                  <p className="font-semibold font-display text-golden-200">ساعات العمل</p>
                  <p className="opacity-90 font-body">الأحد - الخميس: 8:00 - 15:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Service Details Modal */}
      {showModal && selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="heading-2 text-islamic-800">تفاصيل الخدمة</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-sage-500 hover:text-sage-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <img
                    src={selectedService.image}
                    alt={selectedService.title}
                    className="w-full h-64 object-cover rounded-xl shadow-lg"
                  />
                </div>
                
                <div className="bg-islamic-50 p-6 rounded-xl">
                  <h3 className="font-semibold text-islamic-800 mb-3 font-display">الخدمات المتاحة</h3>
                  <ul className="space-y-2">
                    {selectedService.services.map((service: string, index: number) => (
                      <li key={index} className="flex items-start space-x-2 space-x-reverse">
                        <CheckCircle className="w-4 h-4 text-islamic-600 mt-1 flex-shrink-0" />
                        <span className="text-sage-700 font-body">{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="heading-3 text-islamic-800 mb-3">{selectedService.title}</h3>
                  <p className="body-text text-sage-600 leading-relaxed">{selectedService.description}</p>
                </div>
                
                <div className="bg-golden-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-golden-800 mb-3 font-display">معلومات التواصل</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <UserCheck className="w-4 h-4 text-golden-600" />
                      <span className="font-body text-sage-700">{selectedService.contact.name}</span>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Phone className="w-4 h-4 text-golden-600" />
                      <span className="font-body text-sage-700" dir="ltr">{selectedService.contact.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Mail className="w-4 h-4 text-golden-600" />
                      <span className="font-body text-sage-700" dir="ltr">{selectedService.contact.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Building className="w-4 h-4 text-golden-600" />
                      <span className="font-body text-sage-700">{selectedService.contact.office}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-sage-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-sage-800 mb-3 font-display">الإحصائيات</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-body text-sage-600">المستفيدون:</span>
                      <span className="font-bold text-sage-800 font-display">{selectedService.beneficiaries.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-body text-sage-600">الميزانية الشهرية:</span>
                      <span className="font-bold text-sage-800 font-display">{selectedService.monthlyBudget.toLocaleString()} ₪</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-body text-sage-600">المحافظات المغطاة:</span>
                      <span className="font-bold text-sage-800 font-display">{selectedService.coverage.length}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-3 space-x-reverse">
                  <button className="btn-primary flex-1">
                    تقدم للخدمة
                  </button>
                  <button className="btn-secondary">
                    <Download className="w-5 h-5" />
                  </button>
                  <button className="btn-outline">
                    <Share2 className="w-5 h-5" />
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

export default SocialServicesPage;