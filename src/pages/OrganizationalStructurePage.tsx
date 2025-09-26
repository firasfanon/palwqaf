import React, { useState } from 'react';
import { 
  Crown, 
  Users, 
  Building, 
  FileText, 
  MapPin, 
  BookOpen, 
  Heart, 
  Globe, 
  Shield, 
  Settings,
  User,
  Phone,
  Mail,
  Calendar,
  Award,
  Target,
  Briefcase,
  UserCheck,
  ChevronDown,
  ChevronRight,
  Eye,
  Download,
  Printer,
  Share2,
  TrendingUp
} from 'lucide-react';

const OrganizationalStructurePage = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [expandedNodes, setExpandedNodes] = useState<string[]>(['minister']);

  const organizationalChart = {
    minister: {
      id: 'minister',
      name: 'معالي الوزير',
      fullName: 'الدكتور محمد أحمد الأحمد',
      position: 'وزير الأوقاف والشؤون الدينية',
      level: 1,
      icon: Crown,
      color: 'from-red-500 to-red-600',
      contact: {
        phone: '+970 2 298 2530',
        email: 'minister@awqaf.gov.ps',
        office: 'مكتب الوزير - الطابق الرابع'
      },
      responsibilities: [
        'الإشراف العام على جميع أنشطة الوزارة',
        'وضع السياسات والاستراتيجيات العامة',
        'التمثيل الرسمي للوزارة',
        'اتخاذ القرارات الاستراتيجية'
      ],
      children: ['deputy_minister', 'general_secretary']
    },
    deputy_minister: {
      id: 'deputy_minister',
      name: 'وكيل الوزارة',
      fullName: 'الدكتور أحمد محمد يوسف',
      position: 'وكيل وزارة الأوقاف والشؤون الدينية',
      level: 2,
      icon: UserCheck,
      color: 'from-blue-500 to-blue-600',
      contact: {
        phone: '+970 2 298 2531',
        email: 'deputy@awqaf.gov.ps',
        office: 'مكتب وكيل الوزارة - الطابق الثالث'
      },
      responsibilities: [
        'مساعدة الوزير في الإدارة العامة',
        'الإشراف على تنفيذ السياسات',
        'التنسيق بين الإدارات المختلفة',
        'متابعة تنفيذ المشاريع الاستراتيجية'
      ],
      children: ['waqf_admin', 'religious_admin', 'social_admin']
    },
    general_secretary: {
      id: 'general_secretary',
      name: 'الأمين العام',
      fullName: 'الأستاذ خالد عبد الرحمن',
      position: 'الأمين العام للوزارة',
      level: 2,
      icon: Settings,
      color: 'from-green-500 to-green-600',
      contact: {
        phone: '+970 2 298 2532',
        email: 'secretary@awqaf.gov.ps',
        office: 'مكتب الأمين العام - الطابق الثالث'
      },
      responsibilities: [
        'الإشراف على الشؤون الإدارية والمالية',
        'إدارة الموارد البشرية',
        'متابعة الأنظمة واللوائح',
        'التنسيق مع الجهات الخارجية'
      ],
      children: ['hr_admin', 'finance_admin', 'legal_admin']
    },
    waqf_admin: {
      id: 'waqf_admin',
      name: 'إدارة الأوقاف',
      fullName: 'الدكتور فاطمة أحمد خالد',
      position: 'مدير عام الأوقاف',
      level: 3,
      icon: Building,
      color: 'from-purple-500 to-purple-600',
      contact: {
        phone: '+970 2 298 2533',
        email: 'waqf@awqaf.gov.ps',
        office: 'إدارة الأوقاف - الطابق الثاني'
      },
      responsibilities: [
        'إدارة جميع الأوقاف الإسلامية',
        'تطوير استثمارات الأوقاف',
        'متابعة صيانة الممتلكات الوقفية',
        'إعداد التقارير المالية للأوقاف'
      ],
      children: []
    },
    religious_admin: {
      id: 'religious_admin',
      name: 'إدارة الشؤون الدينية',
      fullName: 'الشيخ محمد علي حسن',
      position: 'مدير عام الشؤون الدينية',
      level: 3,
      icon: BookOpen,
      color: 'from-teal-500 to-teal-600',
      contact: {
        phone: '+970 2 298 2534',
        email: 'religious@awqaf.gov.ps',
        office: 'إدارة الشؤون الدينية - الطابق الثاني'
      },
      responsibilities: [
        'الإشراف على المساجد والأئمة',
        'تنظيم البرامج الدينية والتعليمية',
        'إدارة الفتاوى والاستشارات الشرعية',
        'تنسيق الأنشطة الدينية والثقافية'
      ],
      children: []
    },
    social_admin: {
      id: 'social_admin',
      name: 'إدارة الشؤون الاجتماعية',
      fullName: 'الأستاذة سارة محمود أحمد',
      position: 'مدير عام الشؤون الاجتماعية',
      level: 3,
      icon: Heart,
      color: 'from-pink-500 to-pink-600',
      contact: {
        phone: '+970 2 298 2535',
        email: 'social@awqaf.gov.ps',
        office: 'إدارة الشؤون الاجتماعية - الطابق الأول'
      },
      responsibilities: [
        'تنفيذ برامج الدعم الاجتماعي',
        'إدارة المساعدات والزكاة',
        'تنظيم الأنشطة الخيرية',
        'رعاية الأسر المحتاجة والأيتام'
      ],
      children: []
    },
    hr_admin: {
      id: 'hr_admin',
      name: 'إدارة الموارد البشرية',
      fullName: 'الأستاذ نور الدين محمد',
      position: 'مدير الموارد البشرية',
      level: 3,
      icon: Users,
      color: 'from-orange-500 to-orange-600',
      contact: {
        phone: '+970 2 298 2536',
        email: 'hr@awqaf.gov.ps',
        office: 'إدارة الموارد البشرية - الطابق الأول'
      },
      responsibilities: [
        'إدارة شؤون الموظفين',
        'التوظيف والتدريب',
        'تطوير السياسات الإدارية',
        'تقييم الأداء والترقيات'
      ],
      children: []
    },
    finance_admin: {
      id: 'finance_admin',
      name: 'الإدارة المالية',
      fullName: 'الأستاذ خالد يوسف إبراهيم',
      position: 'مدير الشؤون المالية',
      level: 3,
      icon: FileText,
      color: 'from-yellow-500 to-yellow-600',
      contact: {
        phone: '+970 2 298 2537',
        email: 'finance@awqaf.gov.ps',
        office: 'الإدارة المالية - الطابق الأول'
      },
      responsibilities: [
        'إدارة الميزانية والحسابات',
        'الرقابة المالية والمراجعة',
        'إعداد التقارير المالية',
        'إدارة المشتريات والعقود'
      ],
      children: []
    },
    legal_admin: {
      id: 'legal_admin',
      name: 'الإدارة القانونية',
      fullName: 'المستشار أحمد سالم قاسم',
      position: 'مدير الشؤون القانونية',
      level: 3,
      icon: Shield,
      color: 'from-indigo-500 to-indigo-600',
      contact: {
        phone: '+970 2 298 2538',
        email: 'legal@awqaf.gov.ps',
        office: 'الإدارة القانونية - الطابق الأول'
      },
      responsibilities: [
        'تقديم الاستشارات القانونية',
        'إعداد العقود والاتفاقيات',
        'متابعة القضايا القانونية',
        'مراجعة اللوائح والأنظمة'
      ],
      children: []
    }
  };

  const regionalOffices = [
    { name: 'مكتب القدس', manager: 'الأستاذ محمد الأحمد', phone: '+970 2 628 1234', governorates: ['القدس'] },
    { name: 'مكتب الضفة الغربية', manager: 'الدكتور أحمد يوسف', phone: '+970 9 238 5678', governorates: ['رام الله', 'نابلس', 'الخليل', 'بيت لحم'] },
    { name: 'مكتب الشمال', manager: 'الأستاذ خالد محمود', phone: '+970 4 250 9012', governorates: ['جنين', 'طولكرم', 'قلقيلية', 'سلفيت'] },
    { name: 'مكتب غزة', manager: 'الدكتور عمر الزهار', phone: '+970 8 282 3456', governorates: ['غزة', 'خان يونس', 'رفح', 'دير البلح'] }
  ];

  const toggleNode = (nodeId: string) => {
    setExpandedNodes(prev => 
      prev.includes(nodeId) 
        ? prev.filter(id => id !== nodeId)
        : [...prev, nodeId]
    );
  };

  const renderOrgNode = (nodeId: string, level: number = 0) => {
    const node = organizationalChart[nodeId as keyof typeof organizationalChart];
    if (!node) return null;

    const isExpanded = expandedNodes.includes(nodeId);
    const hasChildren = node.children && node.children.length > 0;

    return (
      <div key={nodeId} className="relative">
        <div 
          className={`bg-white rounded-xl shadow-lg p-6 border-2 transition-all duration-300 cursor-pointer hover:shadow-xl ${
            selectedDepartment === nodeId ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-primary-300'
          }`}
          onClick={() => setSelectedDepartment(nodeId)}
        >
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className={`w-16 h-16 bg-gradient-to-br ${node.color} rounded-xl flex items-center justify-center shadow-lg`}>
              <node.icon className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800 font-arabic">{node.name}</h3>
              <p className="text-primary-600 font-medium font-arabic">{node.fullName}</p>
              <p className="text-sm text-gray-600 font-arabic">{node.position}</p>
            </div>
            {hasChildren && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleNode(nodeId);
                }}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {isExpanded ? 
                  <ChevronDown className="w-5 h-5 text-gray-600" /> : 
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                }
              </button>
            )}
          </div>
        </div>

        {/* Children */}
        {hasChildren && isExpanded && (
          <div className="mt-6 mr-8 space-y-4">
            {node.children?.map((childId) => renderOrgNode(childId, level + 1))}
          </div>
        )}

        {/* Connection Lines */}
        {hasChildren && isExpanded && level < 2 && (
          <div className="absolute right-8 top-full w-0.5 h-6 bg-gray-300"></div>
        )}
      </div>
    );
  };

  const selectedNode = selectedDepartment ? organizationalChart[selectedDepartment as keyof typeof organizationalChart] : null;

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 text-white rounded-2xl p-8 mb-8">
          <div className="text-center">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Building className="w-12 h-12 text-primary-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-arabic">الهيكل التنظيمي</h1>
            <p className="text-xl md:text-2xl opacity-90 font-arabic leading-relaxed max-w-4xl mx-auto">
              التنظيم الإداري لوزارة الأوقاف والشؤون الدينية ومسؤوليات كل إدارة
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Organizational Chart */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-800 font-arabic">المخطط التنظيمي</h2>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                    <Download className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                    <Printer className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                    <Share2 className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
              
              <div className="space-y-6">
                {renderOrgNode('minister')}
              </div>
            </div>
          </div>

          {/* Department Details */}
          <div className="space-y-6">
            {selectedNode ? (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center space-x-4 space-x-reverse mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${selectedNode.color} rounded-xl flex items-center justify-center`}>
                    <selectedNode.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 font-arabic">{selectedNode.name}</h3>
                    <p className="text-primary-600 font-medium font-arabic">{selectedNode.fullName}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 font-arabic">المنصب</h4>
                    <p className="text-gray-600 font-arabic">{selectedNode.position}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 font-arabic">معلومات التواصل</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600" dir="ltr">{selectedNode.contact.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600" dir="ltr">{selectedNode.contact.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600 font-arabic">{selectedNode.contact.office}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 font-arabic">المسؤوليات الرئيسية</h4>
                    <ul className="space-y-2">
                      {selectedNode.responsibilities.map((responsibility, index) => (
                        <li key={index} className="flex items-start space-x-2 space-x-reverse">
                          <Target className="w-4 h-4 text-primary-600 mt-1 flex-shrink-0" />
                          <span className="text-gray-600 font-arabic">{responsibility}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
                <Eye className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2 font-arabic">اختر إدارة</h3>
                <p className="text-gray-500 font-arabic">انقر على أي إدارة لعرض تفاصيلها</p>
              </div>
            )}

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 font-arabic">إحصائيات سريعة</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 font-arabic">إجمالي الإدارات</span>
                  <span className="font-bold text-primary-600">8</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 font-arabic">المكاتب الإقليمية</span>
                  <span className="font-bold text-blue-600">4</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 font-arabic">إجمالي الموظفين</span>
                  <span className="font-bold text-green-600">342</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 font-arabic">المحافظات المغطاة</span>
                  <span className="font-bold text-purple-600">16</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Regional Offices */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 font-arabic">المكاتب الإقليمية</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {regionalOffices.map((office, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-primary-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2 font-arabic">{office.name}</h3>
                <p className="text-primary-600 font-medium mb-2 font-arabic">{office.manager}</p>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600" dir="ltr">{office.phone}</span>
                  </div>
                  <div className="text-sm text-gray-600 font-arabic">
                    <span className="font-medium">المحافظات: </span>
                    {office.governorates.join(', ')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Organizational Principles */}
        <div className="mt-8 bg-gradient-to-br from-primary-600 to-accent-600 text-white rounded-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 font-arabic">مبادئ التنظيم الإداري</h2>
            <p className="text-xl opacity-90 font-arabic">المبادئ التي تحكم عمل الهيكل التنظيمي للوزارة</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Target,
                title: 'الوضوح في المسؤوليات',
                description: 'تحديد واضح لمسؤوليات كل إدارة ومنصب'
              },
              {
                icon: Users,
                title: 'التنسيق والتكامل',
                description: 'تنسيق فعال بين جميع الإدارات والمستويات'
              },
              {
                icon: TrendingUp,
                title: 'المرونة والتطوير',
                description: 'قابلية التطوير والتكيف مع المتغيرات'
              }
            ].map((principle, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                <principle.icon className="w-12 h-12 mx-auto mb-4 text-white" />
                <h3 className="text-xl font-semibold mb-3 font-arabic">{principle.title}</h3>
                <p className="opacity-90 font-arabic">{principle.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationalStructurePage;