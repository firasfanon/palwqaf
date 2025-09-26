import React, { useState } from 'react';
import { 
  Eye, 
  Target, 
  Heart, 
  Star, 
  Compass, 
  Flag, 
  Shield, 
  Building, 
  Users, 
  BookOpen, 
  Globe, 
  TrendingUp,
  Lightbulb,
  Handshake,
  Award,
  CheckCircle,
  ArrowRight,
  Zap,
  Crown,
  Gem,
  Sunrise,
  Mountain,
  Quote
} from 'lucide-react';

const VisionMissionPage = () => {
  const [activeSection, setActiveSection] = useState('vision');

  const sections = [
    { id: 'vision', name: 'الرؤية', icon: Eye },
    { id: 'mission', name: 'الرسالة', icon: Target },
    { id: 'values', name: 'القيم', icon: Heart },
    { id: 'goals', name: 'الأهداف', icon: Flag }
  ];

  const coreValues = [
    {
      icon: Shield,
      title: 'الأمانة والشفافية',
      description: 'نلتزم بأعلى معايير الأمانة والشفافية في إدارة الأوقاف الإسلامية',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Heart,
      title: 'خدمة المجتمع',
      description: 'نضع خدمة المجتمع الفلسطيني في مقدمة أولوياتنا ونعمل لتحقيق مصالحه',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: BookOpen,
      title: 'التعلم والتطوير',
      description: 'نؤمن بأهمية التعلم المستمر والتطوير لمواكبة التطورات العصرية',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Handshake,
      title: 'التعاون والشراكة',
      description: 'نبني شراكات قوية مع جميع المؤسسات لتحقيق أهدافنا المشتركة',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Star,
      title: 'التميز والجودة',
      description: 'نسعى للتميز في جميع خدماتنا ونلتزم بأعلى معايير الجودة',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      icon: Crown,
      title: 'الريادة والابتكار',
      description: 'نتطلع لأن نكون رواداً في مجال إدارة الأوقاف والخدمات الدينية',
      color: 'from-indigo-500 to-indigo-600'
    }
  ];

  const strategicGoals = [
    {
      icon: Building,
      title: 'تطوير إدارة الأوقاف',
      description: 'تحديث وتطوير أنظمة إدارة الأوقاف الإسلامية لتحقيق أقصى استفادة منها',
      objectives: [
        'رقمنة جميع سجلات الأوقاف',
        'تطوير أنظمة الاستثمار الوقفي',
        'تحسين آليات المتابعة والرقابة',
        'زيادة العوائد بنسبة 30% خلال 5 سنوات'
      ]
    },
    {
      icon: Users,
      title: 'تأهيل الكوادر البشرية',
      description: 'الاستثمار في تأهيل وتدريب الكوادر العاملة في الوزارة والمساجد',
      objectives: [
        'تدريب 500 إمام وخطيب سنوياً',
        'برامج التطوير المهني المستمر',
        'دورات في التكنولوجيا الحديثة',
        'برامج القيادة والإدارة'
      ]
    },
    {
      icon: Globe,
      title: 'التحول الرقمي',
      description: 'تحويل جميع خدمات الوزارة إلى خدمات إلكترونية متطورة وسهلة الاستخدام',
      objectives: [
        'إطلاق منصة الخدمات الإلكترونية',
        'تطبيق الهاتف المحمول',
        'نظام إدارة المحتوى المتقدم',
        'قواعد بيانات ذكية ومترابطة'
      ]
    },
    {
      icon: Heart,
      title: 'توسيع الخدمات الاجتماعية',
      description: 'تطوير وتوسيع برامج الخدمات الاجتماعية لتشمل شرائح أوسع من المجتمع',
      objectives: [
        'برامج دعم الأسر المحتاجة',
        'مشاريع التكافل الاجتماعي',
        'برامج رعاية الأيتام والأرامل',
        'مبادرات التنمية المجتمعية'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 text-white rounded-2xl p-8 mb-8">
          <div className="text-center">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Compass className="w-12 h-12 text-primary-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-arabic">الرؤية والرسالة والقيم</h1>
            <p className="text-xl md:text-2xl opacity-90 font-arabic leading-relaxed max-w-4xl mx-auto">
              نحدد هويتنا ومسارنا من خلال رؤية واضحة ورسالة سامية وقيم راسخة
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
                className={`flex items-center space-x-2 space-x-reverse px-6 py-3 rounded-lg transition-all duration-300 font-arabic ${
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
        {activeSection === 'vision' && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Eye className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4 font-arabic">رؤيتنا</h2>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-xl p-8 mb-8">
                <div className="text-center">
                  <Quote className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                  <p className="text-2xl font-semibold text-primary-700 font-arabic leading-relaxed">
                    "أن نكون الوزارة الرائدة في إدارة الأوقاف الإسلامية، نجمع بين الأصالة والمعاصرة، 
                    ونساهم في بناء مجتمع فلسطيني متماسك ومزدهر يستند إلى القيم الإسلامية السمحة"
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 text-center">
                  <Sunrise className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-blue-800 mb-3 font-arabic">الريادة</h3>
                  <p className="text-blue-700 font-arabic">نتطلع لأن نكون نموذجاً يُحتذى به في إدارة الأوقاف</p>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 text-center">
                  <Mountain className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-green-800 mb-3 font-arabic">الاستدامة</h3>
                  <p className="text-green-700 font-arabic">نعمل على تحقيق التنمية المستدامة للأوقاف الإسلامية</p>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 text-center">
                  <Gem className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-purple-800 mb-3 font-arabic">التميز</h3>
                  <p className="text-purple-700 font-arabic">نسعى للتميز في جميع خدماتنا ومبادراتنا</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'mission' && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4 font-arabic">رسالتنا</h2>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-accent-50 to-primary-50 rounded-xl p-8 mb-8">
                <div className="text-center">
                  <p className="text-xl font-semibold text-gray-800 font-arabic leading-relaxed mb-6">
                    نعمل على إدارة وتطوير الأوقاف الإسلامية والمساجد في فلسطين، وتقديم الخدمات الدينية والاجتماعية 
                    للمجتمع الفلسطيني، والمحافظة على التراث الإسلامي، من خلال كوادر مؤهلة وأنظمة حديثة تجمع بين 
                    الأصالة والمعاصرة.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-primary-600 font-arabic">مجالات عملنا</h3>
                  <div className="space-y-4">
                    {[
                      { icon: Building, text: 'إدارة وصيانة المساجد والأوقاف الإسلامية' },
                      { icon: Users, text: 'تأهيل وتدريب الأئمة والخطباء' },
                      { icon: BookOpen, text: 'نشر التعليم الديني والثقافة الإسلامية' },
                      { icon: Heart, text: 'تقديم الخدمات الاجتماعية والخيرية' },
                      { icon: Shield, text: 'المحافظة على التراث الإسلامي' },
                      { icon: Globe, text: 'التطوير والتحديث المستمر' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-start space-x-3 space-x-reverse">
                        <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-5 h-5 text-primary-600" />
                        </div>
                        <p className="text-gray-700 font-arabic">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-primary-600 font-arabic">التزاماتنا</h3>
                  <div className="space-y-4">
                    {[
                      'تقديم خدمات عالية الجودة لجميع المواطنين',
                      'الشفافية والمساءلة في جميع أعمالنا',
                      'الاستخدام الأمثل لموارد الأوقاف',
                      'التطوير المستمر لقدراتنا ومهاراتنا',
                      'احترام التنوع والتعددية في المجتمع',
                      'المساهمة في التنمية المستدامة'
                    ].map((commitment, index) => (
                      <div key={index} className="flex items-start space-x-3 space-x-reverse">
                        <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                        <p className="text-gray-700 font-arabic">{commitment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'values' && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4 font-arabic">قيمنا الأساسية</h2>
              <p className="text-lg text-gray-600 font-arabic">القيم التي توجه عملنا وتحدد سلوكنا المهني</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coreValues.map((value, index) => (
                <div key={index} className="group bg-gradient-to-br from-gray-50 to-primary-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
                  <div className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3 font-arabic">{value.title}</h3>
                  <p className="text-gray-600 font-arabic leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>

            {/* Values in Action */}
            <div className="mt-12 bg-gradient-to-br from-primary-50 to-accent-50 rounded-xl p-8">
              <h3 className="text-2xl font-semibold text-primary-600 mb-6 text-center font-arabic">قيمنا في العمل</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-4 font-arabic">مع المجتمع</h4>
                  <ul className="space-y-2">
                    {[
                      'نستمع لاحتياجات المجتمع ونلبيها',
                      'نتعامل مع الجميع بعدالة ومساواة',
                      'نحترم التنوع الثقافي والاجتماعي',
                      'نشارك في حل المشكلات المجتمعية'
                    ].map((item, index) => (
                      <li key={index} className="flex items-center space-x-2 space-x-reverse text-gray-700">
                        <ArrowRight className="w-4 h-4 text-primary-600" />
                        <span className="font-arabic">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-4 font-arabic">في العمل</h4>
                  <ul className="space-y-2">
                    {[
                      'نلتزم بأعلى معايير المهنية',
                      'نعمل بروح الفريق الواحد',
                      'نسعى للتطوير والتحسين المستمر',
                      'نتحمل المسؤولية ونحاسب أنفسنا'
                    ].map((item, index) => (
                      <li key={index} className="flex items-center space-x-2 space-x-reverse text-gray-700">
                        <ArrowRight className="w-4 h-4 text-primary-600" />
                        <span className="font-arabic">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'goals' && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Flag className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4 font-arabic">أهدافنا الاستراتيجية</h2>
              <p className="text-lg text-gray-600 font-arabic">الأهداف التي نسعى لتحقيقها خلال السنوات القادمة</p>
            </div>
            
            <div className="space-y-8">
              {strategicGoals.map((goal, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-50 to-primary-50 rounded-xl p-8">
                  <div className="flex items-center space-x-4 space-x-reverse mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
                      <goal.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold text-gray-800 font-arabic">{goal.title}</h3>
                      <p className="text-gray-600 font-arabic">{goal.description}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {goal.objectives.map((objective, idx) => (
                      <div key={idx} className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span className="text-gray-700 font-arabic">{objective}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Timeline */}
            <div className="mt-12 bg-gradient-to-br from-accent-50 to-primary-50 rounded-xl p-8">
              <h3 className="text-2xl font-semibold text-primary-600 mb-6 text-center font-arabic">خطة التنفيذ</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { year: '2024', title: 'التأسيس والإعداد', progress: 75 },
                  { year: '2025', title: 'التنفيذ والتطبيق', progress: 25 },
                  { year: '2026', title: 'التوسع والتطوير', progress: 0 },
                  { year: '2027', title: 'التقييم والتحسين', progress: 0 }
                ].map((phase, index) => (
                  <div key={index} className="bg-white rounded-lg p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold">{index + 1}</span>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2 font-arabic">{phase.year}</h4>
                    <p className="text-gray-600 mb-3 font-arabic">{phase.title}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-primary-500 to-accent-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${phase.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{phase.progress}%</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="bg-gradient-to-br from-primary-600 to-accent-600 text-white rounded-2xl p-8 mt-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4 font-arabic">انضم إلى رحلتنا</h2>
            <p className="text-xl opacity-90 mb-6 font-arabic">
              معاً نحو تحقيق رؤية طموحة لمستقبل أفضل للأوقاف الإسلامية في فلسطين
            </p>
            <div className="flex items-center justify-center space-x-4 space-x-reverse">
              <button className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors font-arabic">
                تواصل معنا
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors font-arabic">
                اعرف المزيد
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisionMissionPage;