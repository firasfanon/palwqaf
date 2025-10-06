import React, { useState } from 'react';
import { 
  User, 
  Calendar, 
  Award, 
  BookOpen, 
  Heart, 
  Target, 
  Quote,
  Phone,
  Mail,
  MapPin,
  Globe,
  Building,
  Users,
  Star,
  CheckCircle,
  ArrowLeft,
  Download,
  Share2,
  Printer,
  Eye,
  Clock,
  TrendingUp,
  Handshake,
  Shield,
  Lightbulb
} from 'lucide-react';

const MinisterPage = () => {
  const [activeTab, setActiveTab] = useState('biography');

  const tabs = [
    { id: 'biography', name: 'السيرة الذاتية', icon: User },
    { id: 'message', name: 'كلمة الوزير', icon: Quote },
    { id: 'achievements', name: 'الإنجازات', icon: Award },
    { id: 'vision', name: 'الرؤية المستقبلية', icon: Target }
  ];

  const achievements = [
    {
      year: '2020',
      title: 'إطلاق النظام الإلكتروني المتكامل',
      description: 'إطلاق أول نظام إلكتروني شامل لإدارة الأوقاف في فلسطين',
      icon: Globe
    },
    {
      year: '2021',
      title: 'مشروع ترميم المساجد التاريخية',
      description: 'إطلاق مشروع طموح لترميم وصيانة 50 مسجد تاريخي',
      icon: Building
    },
    {
      year: '2022',
      title: 'برنامج تأهيل الأئمة المتقدم',
      description: 'تدريب وتأهيل أكثر من 200 إمام وخطيب على أحدث المناهج',
      icon: BookOpen
    },
    {
      year: '2023',
      title: 'مبادرة الأوقاف الاستثمارية',
      description: 'إطلاق مبادرة لاستثمار الأوقاف وزيادة عوائدها بنسبة 40%',
      icon: TrendingUp
    }
  ];

  const qualifications = [
    'دكتوراه في الشريعة الإسلامية - الجامعة الأزهر',
    'ماجستير في إدارة الأوقاف - جامعة القدس',
    'بكالوريوس في أصول الدين - الجامعة الإسلامية',
    'دبلوم في الإدارة العامة - معهد الإدارة والقيادة'
  ];

  const experiences = [
    {
      period: '2018 - الآن',
      position: 'وزير الأوقاف والشؤون الدينية',
      organization: 'دولة فلسطين',
      description: 'الإشراف العام على جميع الأوقاف الإسلامية والمساجد في فلسطين'
    },
    {
      period: '2015 - 2018',
      position: 'وكيل وزارة الأوقاف',
      organization: 'وزارة الأوقاف والشؤون الدينية',
      description: 'مساعدة الوزير في إدارة الشؤون الإدارية والمالية'
    },
    {
      period: '2010 - 2015',
      position: 'مدير عام الأوقاف',
      organization: 'وزارة الأوقاف والشؤون الدينية',
      description: 'إدارة ومتابعة جميع الأوقاف الإسلامية في المحافظات'
    },
    {
      period: '2005 - 2010',
      position: 'أستاذ الشريعة الإسلامية',
      organization: 'جامعة القدس',
      description: 'تدريس مواد الفقه والشريعة الإسلامية والإشراف على الرسائل العلمية'
    }
  ];

  const futureVision = [
    {
      icon: Globe,
      title: 'الرقمنة الشاملة',
      description: 'تحويل جميع خدمات الوزارة إلى خدمات إلكترونية متطورة بحلول 2025'
    },
    {
      icon: Building,
      title: 'تطوير الأوقاف',
      description: 'زيادة عوائد الأوقاف بنسبة 50% من خلال الاستثمار الذكي والمستدام'
    },
    {
      icon: Users,
      title: 'تأهيل الكوادر',
      description: 'تدريب وتأهيل 1000 إمام وخطيب على أحدث المناهج والتقنيات'
    },
    {
      icon: Heart,
      title: 'الخدمات الاجتماعية',
      description: 'توسيع برامج الدعم الاجتماعي لتشمل 10,000 أسرة محتاجة'
    },
    {
      icon: Shield,
      title: 'حماية التراث',
      description: 'ترميم وحماية جميع المعالم الإسلامية التاريخية في فلسطين'
    },
    {
      icon: Handshake,
      title: 'الشراكات الدولية',
      description: 'بناء شراكات استراتيجية مع 20 مؤسسة دولية متخصصة في الأوقاف'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 text-white rounded-2xl p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 font-arabic">معالي الوزير</h1>
              <h2 className="text-2xl md:text-3xl mb-4 text-accent-200 font-arabic">الدكتور محمد أحمد الأحمد</h2>
              <p className="text-xl opacity-90 font-arabic leading-relaxed">
                وزير الأوقاف والشؤون الدينية في دولة فلسطين
              </p>
              <div className="flex items-center space-x-6 space-x-reverse mt-6">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Calendar className="w-5 h-5" />
                  <span className="font-arabic">في المنصب منذ 2018</span>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Award className="w-5 h-5" />
                  <span className="font-arabic">25 عام خبرة</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 bg-white rounded-full shadow-2xl overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=400"
                    alt="معالي الوزير"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-accent-500 rounded-full flex items-center justify-center shadow-lg">
                  <Star className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-md p-2 mb-8">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 space-x-reverse px-6 py-3 rounded-lg transition-all duration-300 font-arabic ${
                  activeTab === tab.id
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-primary-50 hover:text-primary-600'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-medium">{tab.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Sections */}
        {activeTab === 'biography' && (
          <div className="space-y-8">
            {/* Personal Information */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 font-arabic">السيرة الذاتية</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-semibold text-primary-600 mb-4 font-arabic">المعلومات الشخصية</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <User className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-700 font-arabic">الاسم: الدكتور محمد أحمد الأحمد</span>
                    </div>
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-700 font-arabic">تاريخ الميلاد: 15 مارس 1970</span>
                    </div>
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-700 font-arabic">مكان الميلاد: القدس، فلسطين</span>
                    </div>
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <BookOpen className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-700 font-arabic">التخصص: الشريعة الإسلامية وإدارة الأوقاف</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-primary-600 mb-4 font-arabic">المؤهلات العلمية</h3>
                  <div className="space-y-3">
                    {qualifications.map((qualification, index) => (
                      <div key={index} className="flex items-start space-x-3 space-x-reverse">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-700 font-arabic">{qualification}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Professional Experience */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-semibold text-primary-600 mb-6 font-arabic">الخبرة المهنية</h3>
              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <div key={index} className="border-r-4 border-primary-500 bg-primary-50 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-xl font-semibold text-gray-800 font-arabic">{exp.position}</h4>
                      <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-arabic">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-primary-700 font-semibold mb-2 font-arabic">{exp.organization}</p>
                    <p className="text-gray-600 font-arabic leading-relaxed">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'message' && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <Quote className="w-16 h-16 text-primary-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-800 font-arabic">كلمة معالي الوزير</h2>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-xl p-8 mb-8">
                <div className="text-lg text-gray-700 font-arabic leading-relaxed space-y-6">
                  <p>
                    بسم الله الرحمن الرحيم، والصلاة والسلام على أشرف المرسلين سيدنا محمد وعلى آله وصحبه أجمعين.
                  </p>
                  
                  <p>
                    يسعدني أن أرحب بكم في موقع وزارة الأوقاف والشؤون الدينية، هذه المؤسسة العريقة التي تحمل على عاتقها 
                    مسؤولية عظيمة في خدمة ديننا الحنيف ومجتمعنا الفلسطيني الكريم.
                  </p>
                  
                  <p>
                    إن الأوقاف الإسلامية تمثل جزءاً لا يتجزأ من تراثنا الحضاري وهويتنا الإسلامية، وهي شاهد على عظمة 
                    هذا الدين وسماحته. ومن هذا المنطلق، نعمل في الوزارة على المحافظة على هذا التراث العظيم وتطويره 
                    ليواكب متطلبات العصر ويخدم أبناء شعبنا الفلسطيني.
                  </p>
                  
                  <p>
                    نسعى من خلال رؤيتنا الاستراتيجية إلى تحقيق نقلة نوعية في إدارة الأوقاف، من خلال الاستفادة من 
                    التكنولوجيا الحديثة وأفضل الممارسات العالمية، مع الحفاظ على الطابع الإسلامي الأصيل لهذه المؤسسة.
                  </p>
                  
                  <p>
                    إننا ملتزمون بخدمة مجتمعنا الفلسطيني من خلال تقديم أفضل الخدمات الدينية والاجتماعية، والعمل على 
                    تعزيز دور المساجد كمراكز إشعاع حضاري وثقافي في مجتمعنا.
                  </p>
                  
                  <p>
                    أدعو الله العلي القدير أن يوفقنا جميعاً لخدمة ديننا ووطننا، وأن يحفظ فلسطين وشعبها الكريم.
                  </p>
                </div>
                
                <div className="mt-8 text-center">
                  <div className="inline-block bg-white rounded-lg p-6 shadow-lg">
                    <p className="text-xl font-semibold text-primary-600 font-arabic">الدكتور محمد أحمد الأحمد</p>
                    <p className="text-gray-600 font-arabic">وزير الأوقاف والشؤون الدينية</p>
                    <p className="text-gray-500 text-sm font-arabic">دولة فلسطين</p>
                    <div className="mt-4 w-32 h-16 bg-gray-200 rounded-lg flex items-center justify-center mx-auto">
                      <span className="text-gray-500 text-xs font-arabic">توقيع الوزير</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center font-arabic">إنجازات معالي الوزير</h2>
            
            <div className="relative">
              <div className="absolute right-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-500 to-accent-500 rounded-full"></div>
              <div className="space-y-8">
                {achievements.map((achievement, index) => (
                  <div key={index} className="relative flex items-start space-x-6 space-x-reverse">
                    <div className="absolute right-6 w-4 h-4 bg-primary-600 rounded-full border-4 border-white shadow-lg transform -translate-x-1/2"></div>
                    <div className="mr-16 bg-gradient-to-br from-gray-50 to-primary-50 rounded-lg p-6 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center space-x-4 space-x-reverse mb-3">
                        <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                          <achievement.icon className="w-6 h-6 text-primary-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-primary-600 font-arabic">{achievement.year}</h3>
                          <h4 className="text-lg font-semibold text-gray-800 font-arabic">{achievement.title}</h4>
                        </div>
                      </div>
                      <p className="text-gray-600 font-arabic leading-relaxed">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Statistics */}
            <div className="mt-12 bg-gradient-to-br from-primary-50 to-accent-50 rounded-xl p-8">
              <h3 className="text-2xl font-semibold text-primary-600 mb-6 text-center font-arabic">إنجازات بالأرقام</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { number: '50+', title: 'مسجد تم ترميمه', icon: Building },
                  { number: '200+', title: 'إمام تم تأهيله', icon: Users },
                  { number: '40%', title: 'زيادة في العوائد', icon: TrendingUp },
                  { number: '15', title: 'مشروع جديد', icon: Lightbulb }
                ].map((stat, index) => (
                  <div key={index} className="text-center bg-white rounded-lg p-6 shadow-md">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <stat.icon className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-3xl font-bold text-primary-700 mb-2">{stat.number}</h4>
                    <p className="text-gray-600 font-arabic">{stat.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'vision' && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center font-arabic">الرؤية المستقبلية</h2>
            
            <div className="mb-8 bg-gradient-to-br from-primary-50 to-accent-50 rounded-xl p-8 text-center">
              <Target className="w-16 h-16 text-primary-600 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-primary-600 mb-4 font-arabic">رؤيتنا للمستقبل</h3>
              <p className="text-lg text-gray-700 font-arabic leading-relaxed max-w-3xl mx-auto">
                نتطلع إلى جعل وزارة الأوقاف والشؤون الدينية نموذجاً رائداً في إدارة الأوقاف الإسلامية، 
                تجمع بين الأصالة والمعاصرة، وتساهم في بناء مجتمع فلسطيني متماسك ومزدهر.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {futureVision.map((vision, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-50 to-primary-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center mb-4">
                    <vision.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 font-arabic">{vision.title}</h3>
                  <p className="text-gray-600 font-arabic leading-relaxed">{vision.description}</p>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="mt-12 bg-gradient-to-br from-primary-600 to-accent-600 text-white rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-4 font-arabic">معاً نحو مستقبل أفضل</h3>
              <p className="text-lg opacity-90 mb-6 font-arabic">
                ندعوكم للمشاركة في رحلتنا نحو تحقيق هذه الرؤية الطموحة
              </p>
              <div className="flex items-center justify-center space-x-4 space-x-reverse">
                <button className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors font-arabic">
                  تواصل معنا
                </button>
                <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors font-arabic">
                  اعرف المزيد
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Contact Section */}
        <div className="bg-gradient-to-br from-primary-600 to-accent-600 text-white rounded-2xl p-8 mt-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6 font-arabic">للتواصل مع مكتب الوزير</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center justify-center space-x-3 space-x-reverse">
                <Phone className="w-6 h-6" />
                <div>
                  <p className="font-semibold font-arabic">هاتف المكتب</p>
                  <p className="opacity-90" dir="ltr">+970 2 298 2530</p>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-3 space-x-reverse">
                <Mail className="w-6 h-6" />
                <div>
                  <p className="font-semibold font-arabic">البريد الإلكتروني</p>
                  <p className="opacity-90" dir="ltr">minister@awqaf.gov.ps</p>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-3 space-x-reverse">
                <Clock className="w-6 h-6" />
                <div>
                  <p className="font-semibold font-arabic">ساعات الاستقبال</p>
                  <p className="opacity-90 font-arabic">الأحد - الخميس: 9:00 - 15:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinisterPage;