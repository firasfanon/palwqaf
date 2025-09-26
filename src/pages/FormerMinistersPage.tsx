import React, { useState } from 'react';
import { 
  Crown, 
  Calendar, 
  Award, 
  User, 
  BookOpen, 
  Star, 
  Clock, 
  Flag,
  Building,
  Heart,
  Globe,
  Shield,
  Target,
  TrendingUp,
  CheckCircle,
  Eye,
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  Users
} from 'lucide-react';

const FormerMinistersPage = () => {
  const [selectedMinister, setSelectedMinister] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  const formerMinisters = [
    {
      id: 1,
      name: 'الدكتور عبد الرحمن محمد الأحمد',
      period: '1994 - 2000',
      duration: '6 سنوات',
      image: 'https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=400',
      achievements: [
        'تأسيس الوزارة وإرساء أسسها الأولى',
        'إنشاء الهيكل التنظيمي الأساسي',
        'تسجيل أول 200 وقف إسلامي',
        'افتتاح 5 مكاتب إقليمية'
      ],
      biography: 'أول وزير للأوقاف والشؤون الدينية في دولة فلسطين، لعب دوراً محورياً في تأسيس الوزارة وإرساء أسسها. حاصل على دكتوراه في الشريعة الإسلامية من جامعة الأزهر.',
      education: [
        'دكتوراه في الشريعة الإسلامية - جامعة الأزهر',
        'ماجستير في أصول الفقه - الجامعة الإسلامية',
        'بكالوريوس في الدراسات الإسلامية - جامعة القدس'
      ],
      majorProjects: [
        'مشروع تأسيس الوزارة',
        'إنشاء قاعدة بيانات الأوقاف الأولى',
        'برنامج تأهيل الأئمة الأول',
        'مشروع ترميم المساجد التاريخية'
      ]
    },
    {
      id: 2,
      name: 'الدكتور محمد يوسف الخالدي',
      period: '2000 - 2006',
      duration: '6 سنوات',
      image: 'https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=400',
      achievements: [
        'توسيع نطاق عمل الوزارة لتشمل جميع المحافظات',
        'إطلاق أول برنامج للخدمات الاجتماعية',
        'تأسيس مركز التدريب والتأهيل',
        'زيادة عدد المساجد المدارة إلى 500 مسجد'
      ],
      biography: 'قاد الوزارة خلال فترة التوسع والنمو، وركز على تطوير الخدمات الاجتماعية والتعليمية. حاصل على دكتوراه في الإدارة العامة.',
      education: [
        'دكتوراه في الإدارة العامة - جامعة القاهرة',
        'ماجستير في الشريعة الإسلامية - جامعة الأزهر',
        'بكالوريوس في القانون - جامعة بيرزيت'
      ],
      majorProjects: [
        'مشروع التوسع الجغرافي',
        'برنامج الخدمات الاجتماعية المتكاملة',
        'مشروع تطوير المناهج الدينية',
        'مبادرة الشراكة المجتمعية'
      ]
    },
    {
      id: 3,
      name: 'الدكتور أحمد سالم قاسم',
      period: '2006 - 2012',
      duration: '6 سنوات',
      image: 'https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=400',
      achievements: [
        'إطلاق مشروع الرقمنة الأول للأوقاف',
        'تطوير نظام إدارة المساجد الإلكتروني',
        'إنشاء مركز الأرشيف الإلكتروني',
        'توقيع 25 اتفاقية تعاون دولية'
      ],
      biography: 'رائد التحول الرقمي في الوزارة، أدخل التكنولوجيا الحديثة في إدارة الأوقاف. حاصل على دكتوراه في تكنولوجيا المعلومات.',
      education: [
        'دكتوراه في تكنولوجيا المعلومات - جامعة لندن',
        'ماجستير في إدارة الأعمال - الجامعة الأمريكية',
        'بكالوريوس في الهندسة - جامعة بيرزيت'
      ],
      majorProjects: [
        'مشروع الرقمنة الشاملة',
        'نظام إدارة المساجد الإلكتروني',
        'مشروع الأرشيف الرقمي',
        'برنامج التدريب على التكنولوجيا'
      ]
    },
    {
      id: 4,
      name: 'الدكتور خالد عبد الله نصر',
      period: '2012 - 2018',
      duration: '6 سنوات',
      image: 'https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=400',
      achievements: [
        'تطوير استثمارات الأوقاف وزيادة عوائدها بنسبة 60%',
        'إطلاق مشروع المساجد الذكية',
        'تأسيس صندوق الأوقاف الاستثماري',
        'إنشاء 15 مركز خدمات مجتمعية'
      ],
      biography: 'خبير في الاستثمار الوقفي والتنمية المستدامة، حقق نقلة نوعية في عوائد الأوقاف. حاصل على دكتوراه في الاقتصاد الإسلامي.',
      education: [
        'دكتوراه في الاقتصاد الإسلامي - جامعة الأزهر',
        'ماجستير في إدارة الاستثمار - جامعة هارفارد',
        'بكالوريوس في الاقتصاد - جامعة القدس'
      ],
      majorProjects: [
        'صندوق الأوقاف الاستثماري',
        'مشروع المساجد الذكية',
        'برنامج التنمية المستدامة',
        'مبادرة الاستثمار الاجتماعي'
      ]
    }
  ];

  const currentMinister = {
    name: 'الدكتور محمد أحمد الأحمد',
    period: '2018 - الآن',
    duration: '6 سنوات',
    image: 'https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: 'current'
  };

  const allMinisters = [...formerMinisters, currentMinister];

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 text-white rounded-2xl p-8 mb-8">
          <div className="text-center">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Crown className="w-12 h-12 text-primary-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-arabic">وزراء الأوقاف والشؤون الدينية</h1>
            <p className="text-xl md:text-2xl opacity-90 font-arabic leading-relaxed max-w-4xl mx-auto">
              تاريخ حافل من القيادة والعطاء في خدمة الأوقاف الإسلامية والمجتمع الفلسطيني
            </p>
          </div>
        </div>

        {/* Current Minister */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 font-arabic">الوزير الحالي</h2>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-xl p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                <div className="text-center">
                  <div className="relative inline-block">
                    <img
                      src={currentMinister.image}
                      alt={currentMinister.name}
                      className="w-48 h-48 rounded-full object-cover shadow-xl mx-auto"
                    />
                    <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                      <Crown className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>
                
                <div className="lg:col-span-2 text-center lg:text-right">
                  <h3 className="text-3xl font-bold text-primary-700 mb-2 font-arabic">{currentMinister.name}</h3>
                  <p className="text-xl text-gray-600 mb-4 font-arabic">الوزير الحالي</p>
                  <div className="flex items-center justify-center lg:justify-start space-x-6 space-x-reverse mb-4">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Calendar className="w-5 h-5 text-primary-600" />
                      <span className="text-gray-700 font-arabic">{currentMinister.period}</span>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Clock className="w-5 h-5 text-primary-600" />
                      <span className="text-gray-700 font-arabic">{currentMinister.duration}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 font-arabic leading-relaxed">
                    يقود الوزارة حالياً نحو التحول الرقمي الشامل والتطوير المستدام للأوقاف الإسلامية، 
                    مع التركيز على الابتكار والتميز في الخدمات.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Former Ministers Timeline */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 font-arabic">الوزراء السابقون</h2>
            <p className="text-gray-600 font-arabic">تاريخ حافل من القيادة والإنجازات</p>
          </div>
          
          <div className="relative">
            <div className="absolute right-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-500 to-accent-500 rounded-full"></div>
            <div className="space-y-8">
              {formerMinisters.map((minister, index) => (
                <div key={minister.id} className="relative flex items-start space-x-6 space-x-reverse">
                  <div className="absolute right-6 w-4 h-4 bg-primary-600 rounded-full border-4 border-white shadow-lg transform -translate-x-1/2"></div>
                  <div className="mr-16 bg-gradient-to-br from-gray-50 to-primary-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-center">
                      <div className="text-center">
                        <img
                          src={minister.image}
                          alt={minister.name}
                          className="w-32 h-32 rounded-full object-cover shadow-lg mx-auto mb-4"
                        />
                        <div className="flex items-center justify-center space-x-2 space-x-reverse">
                          <Calendar className="w-4 h-4 text-primary-600" />
                          <span className="text-sm text-primary-600 font-arabic">{minister.period}</span>
                        </div>
                      </div>
                      
                      <div className="lg:col-span-2">
                        <h3 className="text-2xl font-bold text-gray-800 mb-2 font-arabic">{minister.name}</h3>
                        <p className="text-primary-600 font-medium mb-3 font-arabic">وزير الأوقاف والشؤون الدينية</p>
                        <p className="text-gray-600 font-arabic leading-relaxed mb-4">{minister.biography}</p>
                        
                        <div className="space-y-2">
                          <h4 className="font-semibold text-gray-800 font-arabic">أبرز الإنجازات:</h4>
                          <ul className="space-y-1">
                            {minister.achievements.slice(0, 2).map((achievement, idx) => (
                              <li key={idx} className="flex items-start space-x-2 space-x-reverse text-sm text-gray-600">
                                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="font-arabic">{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <div className="bg-white rounded-lg p-4 shadow-md mb-4">
                          <Clock className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                          <p className="text-lg font-bold text-gray-800 font-arabic">{minister.duration}</p>
                          <p className="text-sm text-gray-600 font-arabic">فترة الخدمة</p>
                        </div>
                        <button
                          onClick={() => {
                            setSelectedMinister(minister);
                            setShowModal(true);
                          }}
                          className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors font-arabic"
                        >
                          عرض التفاصيل
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center font-arabic">إحصائيات الوزراء</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
              <Crown className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-blue-700 mb-2">5</h3>
              <p className="text-blue-600 font-arabic">إجمالي الوزراء</p>
            </div>
            
            <div className="text-center bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
              <Calendar className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-green-700 mb-2">30</h3>
              <p className="text-green-600 font-arabic">سنة من الخدمة</p>
            </div>
            
            <div className="text-center bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6">
              <Award className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-purple-700 mb-2">150+</h3>
              <p className="text-purple-600 font-arabic">إنجاز رئيسي</p>
            </div>
            
            <div className="text-center bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6">
              <TrendingUp className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-orange-700 mb-2">6</h3>
              <p className="text-orange-600 font-arabic">متوسط فترة الخدمة</p>
            </div>
          </div>
        </div>

        {/* Legacy Section */}
        <div className="mt-8 bg-gradient-to-br from-primary-600 to-accent-600 text-white rounded-2xl p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6 font-arabic">إرث من العطاء والإنجاز</h2>
            <p className="text-xl opacity-90 mb-8 font-arabic leading-relaxed max-w-4xl mx-auto">
              على مدى ثلاثة عقود، قاد وزراء الأوقاف والشؤون الدينية الوزارة نحو التطوير والتحديث، 
              وحققوا إنجازات عظيمة في خدمة الأوقاف الإسلامية والمجتمع الفلسطيني
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: Building,
                  title: 'تطوير الأوقاف',
                  description: 'من 50 وقف في البداية إلى أكثر من 850 وقف اليوم'
                },
                {
                  icon: Users,
                  title: 'تأهيل الكوادر',
                  description: 'تدريب وتأهيل أكثر من 1000 إمام وخطيب'
                },
                {
                  icon: Globe,
                  title: 'التحول الرقمي',
                  description: 'إدخال التكنولوجيا الحديثة في جميع العمليات'
                }
              ].map((legacy, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                  <legacy.icon className="w-12 h-12 mx-auto mb-4 text-white" />
                  <h3 className="text-xl font-semibold mb-3 font-arabic">{legacy.title}</h3>
                  <p className="opacity-90 font-arabic">{legacy.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Minister Details Modal */}
      {showModal && selectedMinister && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 font-arabic">تفاصيل الوزير</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <img
                  src={selectedMinister.image}
                  alt={selectedMinister.name}
                  className="w-48 h-48 rounded-full object-cover shadow-xl mx-auto mb-4"
                />
                <h3 className="text-xl font-bold text-gray-800 mb-2 font-arabic">{selectedMinister.name}</h3>
                <p className="text-primary-600 font-medium font-arabic">وزير الأوقاف والشؤون الدينية</p>
                <p className="text-gray-600 font-arabic">{selectedMinister.period}</p>
              </div>
              
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3 font-arabic">السيرة الذاتية</h4>
                  <p className="text-gray-600 font-arabic leading-relaxed">{selectedMinister.biography}</p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3 font-arabic">المؤهلات العلمية</h4>
                  <ul className="space-y-2">
                    {selectedMinister.education.map((edu, index) => (
                      <li key={index} className="flex items-start space-x-2 space-x-reverse">
                        <BookOpen className="w-4 h-4 text-primary-600 mt-1 flex-shrink-0" />
                        <span className="text-gray-600 font-arabic">{edu}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3 font-arabic">أبرز الإنجازات</h4>
                  <ul className="space-y-2">
                    {selectedMinister.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-start space-x-2 space-x-reverse">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-600 font-arabic">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3 font-arabic">المشاريع الرئيسية</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedMinister.majorProjects.map((project, index) => (
                      <div key={index} className="bg-primary-50 rounded-lg p-3">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <Target className="w-4 h-4 text-primary-600" />
                          <span className="text-gray-700 font-arabic text-sm">{project}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormerMinistersPage;