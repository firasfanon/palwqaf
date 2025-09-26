import React, { useState, useEffect } from 'react';
import { 
  Building, 
  Users, 
  Target, 
  Award, 
  Calendar, 
  MapPin, 
  Phone, 
  Mail,
  Globe,
  Heart,
  BookOpen,
  Handshake,
  Shield,
  Star,
  TrendingUp,
  Eye,
  Lightbulb,
  Compass,
  Flag,
  Crown,
  Zap,
  CheckCircle,
  ArrowLeft
} from 'lucide-react';

const AboutPage = () => {
  const [activeSection, setActiveSection] = useState('introduction');
  const [counters, setCounters] = useState({
    mosques: 0,
    waqfs: 0,
    employees: 0,
    years: 0
  });

  // Animated counters
  useEffect(() => {
    const animateCounters = () => {
      const targets = { mosques: 1247, waqfs: 856, employees: 342, years: 28 };
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;

      Object.keys(targets).forEach(key => {
        let current = 0;
        const target = targets[key as keyof typeof targets];
        const increment = target / steps;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          setCounters(prev => ({ ...prev, [key]: Math.floor(current) }));
        }, stepDuration);
      });
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.disconnect();
        }
      });
    });

    const statsSection = document.getElementById('stats-section');
    if (statsSection) observer.observe(statsSection);

    return () => observer.disconnect();
  }, []);

  const sections = [
    { id: 'introduction', name: 'مقدمة عن الوزارة', icon: Building },
    { id: 'history', name: 'تاريخ الوزارة', icon: Calendar },
    { id: 'objectives', name: 'الأهداف الاستراتيجية', icon: Target },
    { id: 'achievements', name: 'الإنجازات', icon: Award },
    { id: 'departments', name: 'الإدارات الرئيسية', icon: Users }
  ];

  const objectives = [
    {
      icon: Heart,
      title: 'خدمة المجتمع الفلسطيني',
      description: 'تقديم الخدمات الدينية والاجتماعية لجميع أفراد المجتمع الفلسطيني'
    },
    {
      icon: Building,
      title: 'إدارة الأوقاف الإسلامية',
      description: 'الحفاظ على الأوقاف الإسلامية وتطويرها واستثمارها بما يخدم المصلحة العامة'
    },
    {
      icon: BookOpen,
      title: 'نشر التعليم الديني',
      description: 'تعزيز التعليم الديني والثقافة الإسلامية في المجتمع الفلسطيني'
    },
    {
      icon: Handshake,
      title: 'التعاون والشراكة',
      description: 'بناء شراكات استراتيجية مع المؤسسات المحلية والدولية'
    },
    {
      icon: Shield,
      title: 'حماية التراث الإسلامي',
      description: 'المحافظة على التراث الإسلامي والمعالم الدينية في فلسطين'
    },
    {
      icon: TrendingUp,
      title: 'التطوير والتحديث',
      description: 'تطوير الخدمات وتحديث الأنظمة لمواكبة التطورات العصرية'
    }
  ];

  const achievements = [
    {
      icon: Building,
      number: '1,247',
      title: 'مسجد مُدار',
      description: 'مساجد تحت إشراف الوزارة في جميع المحافظات'
    },
    {
      icon: MapPin,
      number: '856',
      title: 'وقف إسلامي',
      description: 'أوقاف إسلامية مسجلة ومدارة بكفاءة'
    },
    {
      icon: Users,
      number: '342',
      title: 'موظف وإمام',
      description: 'كادر مؤهل يخدم في مختلف مناطق فلسطين'
    },
    {
      icon: Award,
      number: '28',
      title: 'عام من الخدمة',
      description: 'سنوات من العطاء والخدمة للمجتمع الفلسطيني'
    }
  ];

  const departments = [
    {
      icon: Compass,
      title: 'الإدارة العامة',
      description: 'الإشراف العام على جميع أنشطة الوزارة وتنسيق العمل بين الإدارات',
      responsibilities: ['التخطيط الاستراتيجي', 'الإشراف والمتابعة', 'التنسيق بين الإدارات']
    },
    {
      icon: Building,
      title: 'إدارة المساجد والأوقاف',
      description: 'إدارة وصيانة المساجد والأوقاف الإسلامية في جميع المحافظات',
      responsibilities: ['صيانة المساجد', 'إدارة الأوقاف', 'تنظيم الصلوات', 'الإشراف على الأئمة']
    },
    {
      icon: BookOpen,
      title: 'إدارة التعليم الديني',
      description: 'تطوير وتنفيذ برامج التعليم الديني والثقافة الإسلامية',
      responsibilities: ['المناهج الدينية', 'تدريب الأئمة', 'الدورات التعليمية', 'المسابقات القرآنية']
    },
    {
      icon: Heart,
      title: 'إدارة الشؤون الاجتماعية',
      description: 'تقديم الخدمات الاجتماعية والمساعدات للأسر المحتاجة',
      responsibilities: ['المساعدات الخيرية', 'برامج الدعم', 'رعاية الأيتام', 'التكافل الاجتماعي']
    },
    {
      icon: FileText,
      title: 'الإدارة المالية والقانونية',
      description: 'إدارة الشؤون المالية والقانونية للوزارة والأوقاف',
      responsibilities: ['الإدارة المالية', 'الشؤون القانونية', 'المراجعة والتدقيق', 'العقود والاتفاقيات']
    },
    {
      icon: Globe,
      title: 'العلاقات العامة والإعلام',
      description: 'إدارة العلاقات العامة والأنشطة الإعلامية للوزارة',
      responsibilities: ['العلاقات العامة', 'الإعلام والنشر', 'التواصل الاجتماعي', 'الفعاليات']
    }
  ];

  const timeline = [
    {
      year: '1994',
      title: 'تأسيس الوزارة',
      description: 'تأسيس وزارة الأوقاف والشؤون الدينية كجزء من السلطة الوطنية الفلسطينية',
      icon: Flag
    },
    {
      year: '1995',
      title: 'بداية العمل الميداني',
      description: 'بدء العمل الفعلي في إدارة المساجد والأوقاف في المناطق المحررة',
      icon: Building
    },
    {
      year: '2000',
      title: 'توسيع الخدمات',
      description: 'توسيع نطاق الخدمات لتشمل التعليم الديني والأنشطة الاجتماعية',
      icon: BookOpen
    },
    {
      year: '2005',
      title: 'الرقمنة والتطوير',
      description: 'بدء مشروع رقمنة الأوقاف وتطوير الأنظمة الإلكترونية',
      icon: Globe
    },
    {
      year: '2010',
      title: 'التوسع الجغرافي',
      description: 'افتتاح مكاتب إقليمية في جميع المحافظات الفلسطينية',
      icon: MapPin
    },
    {
      year: '2020',
      title: 'التحول الرقمي',
      description: 'إطلاق النظام الإلكتروني المتكامل لإدارة الأوقاف والمساجد',
      icon: Zap
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 text-white rounded-2xl p-8 mb-8">
          <div className="text-center">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Building className="w-12 h-12 text-primary-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-arabic">عن وزارة الأوقاف والشؤون الدينية</h1>
            <p className="text-xl md:text-2xl opacity-90 font-arabic leading-relaxed max-w-4xl mx-auto">
              وزارة تخدم المجتمع الفلسطيني وتحافظ على التراث الإسلامي منذ تأسيسها عام 1994
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-md p-2 mb-8">
          <div className="flex flex-wrap gap-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center space-x-2 space-x-reverse px-4 py-3 rounded-lg transition-all duration-300 font-arabic ${
                  activeSection === section.id
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-primary-50 hover:text-primary-600'
                }`}
              >
                <section.icon className="w-5 h-5" />
                <span className="font-medium">{section.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Sections */}
        {activeSection === 'introduction' && (
          <div className="space-y-8">
            {/* Introduction */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-6 font-arabic">نبذة عن الوزارة</h2>
                  <div className="space-y-4 text-gray-700 font-arabic leading-relaxed">
                    <p className="text-lg">
                      تأسست وزارة الأوقاف والشؤون الدينية عام 1994 كجزء من السلطة الوطنية الفلسطينية، 
                      وهي المؤسسة الرسمية المسؤولة عن إدارة الأوقاف الإسلامية والمساجد في فلسطين.
                    </p>
                    <p>
                      تعمل الوزارة على خدمة المجتمع الفلسطيني من خلال إدارة وتطوير الأوقاف الإسلامية، 
                      والإشراف على المساجد، وتقديم الخدمات الدينية والاجتماعية، والمحافظة على التراث الإسلامي.
                    </p>
                    <p>
                      تسعى الوزارة إلى تحقيق التنمية المستدامة من خلال استثمار الأوقاف الإسلامية بما يخدم 
                      المصلحة العامة ويساهم في بناء المجتمع الفلسطيني وتعزيز قيمه الإسلامية الأصيلة.
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <img
                    src="https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="مسجد فلسطيني"
                    className="w-full h-80 object-cover rounded-2xl shadow-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl"></div>
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div id="stats-section" className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center font-arabic">إنجازاتنا بالأرقام</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {achievements.map((achievement, index) => (
                  <div key={index} className="text-center group">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <achievement.icon className="w-10 h-10 text-white" />
                    </div>
                    <h4 className="text-4xl font-bold text-primary-700 mb-2 font-arabic">
                      {index === 0 ? counters.mosques.toLocaleString() :
                       index === 1 ? counters.waqfs.toLocaleString() :
                       index === 2 ? counters.employees.toLocaleString() :
                       counters.years}
                    </h4>
                    <p className="text-gray-600 font-bold font-arabic">{achievement.title}</p>
                    <p className="text-sm text-gray-500 mt-2 font-arabic">{achievement.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSection === 'history' && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center font-arabic">تاريخ الوزارة</h2>
            <div className="relative">
              <div className="absolute right-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-500 to-accent-500 rounded-full"></div>
              <div className="space-y-8">
                {timeline.map((event, index) => (
                  <div key={index} className="relative flex items-start space-x-6 space-x-reverse">
                    <div className="absolute right-6 w-4 h-4 bg-primary-600 rounded-full border-4 border-white shadow-lg transform -translate-x-1/2"></div>
                    <div className="mr-16 bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow duration-300">
                      <div className="flex items-center space-x-4 space-x-reverse mb-3">
                        <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                          <event.icon className="w-6 h-6 text-primary-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-primary-600 font-arabic">{event.year}</h3>
                          <h4 className="text-lg font-semibold text-gray-800 font-arabic">{event.title}</h4>
                        </div>
                      </div>
                      <p className="text-gray-600 font-arabic leading-relaxed">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSection === 'objectives' && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center font-arabic">الأهداف الاستراتيجية</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {objectives.map((objective, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-50 to-primary-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center mb-4">
                    <objective.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 font-arabic">{objective.title}</h3>
                  <p className="text-gray-600 font-arabic leading-relaxed">{objective.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'achievements' && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center font-arabic">إنجازات الوزارة</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-primary-600 font-arabic">الإنجازات الرئيسية</h3>
                <div className="space-y-4">
                  {[
                    'إدارة أكثر من 1,200 مسجد في جميع المحافظات الفلسطينية',
                    'تسجيل وإدارة أكثر من 850 وقف إسلامي',
                    'تدريب وتأهيل أكثر من 500 إمام وخطيب',
                    'تنظيم أكثر من 100 نشاط ديني وثقافي سنوياً',
                    'إطلاق النظام الإلكتروني المتكامل لإدارة الأوقاف',
                    'توقيع أكثر من 50 اتفاقية تعاون مع مؤسسات محلية ودولية'
                  ].map((achievement, index) => (
                    <div key={index} className="flex items-start space-x-3 space-x-reverse">
                      <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                      <p className="text-gray-700 font-arabic">{achievement}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-xl p-6">
                <h3 className="text-2xl font-semibold text-primary-600 mb-6 font-arabic">المشاريع الحديثة</h3>
                <div className="space-y-4">
                  {[
                    { title: 'مشروع رقمنة الأوقاف', status: 'مكتمل', progress: 100 },
                    { title: 'تطوير المساجد التاريخية', status: 'قيد التنفيذ', progress: 75 },
                    { title: 'برنامج تأهيل الأئمة', status: 'قيد التنفيذ', progress: 60 },
                    { title: 'مشروع الأرشيف الإلكتروني', status: 'قيد التنفيذ', progress: 85 }
                  ].map((project, index) => (
                    <div key={index} className="bg-white rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-800 font-arabic">{project.title}</h4>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          project.status === 'مكتمل' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {project.status}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-primary-500 to-accent-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{project.progress}% مكتمل</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'departments' && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center font-arabic">الإدارات الرئيسية</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {departments.map((dept, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-50 to-primary-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center space-x-4 space-x-reverse mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
                      <dept.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 font-arabic">{dept.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4 font-arabic leading-relaxed">{dept.description}</p>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-800 font-arabic">المسؤوليات الرئيسية:</h4>
                    <ul className="space-y-1">
                      {dept.responsibilities.map((resp, idx) => (
                        <li key={idx} className="flex items-center space-x-2 space-x-reverse text-sm text-gray-600">
                          <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                          <span className="font-arabic">{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contact Information */}
        <div className="bg-gradient-to-br from-primary-600 to-accent-600 text-white rounded-2xl p-8 mt-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6 font-arabic">للتواصل مع الوزارة</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center justify-center space-x-3 space-x-reverse">
                <Phone className="w-6 h-6" />
                <div>
                  <p className="font-semibold font-arabic">هاتف</p>
                  <p className="opacity-90" dir="ltr">+970 2 298 2532</p>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-3 space-x-reverse">
                <Mail className="w-6 h-6" />
                <div>
                  <p className="font-semibold font-arabic">البريد الإلكتروني</p>
                  <p className="opacity-90" dir="ltr">info@awqaf.gov.ps</p>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-3 space-x-reverse">
                <MapPin className="w-6 h-6" />
                <div>
                  <p className="font-semibold font-arabic">العنوان</p>
                  <p className="opacity-90 font-arabic">رام الله - فلسطين</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;