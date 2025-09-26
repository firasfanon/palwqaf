import React from 'react';
import { Shield, Eye, Lock, Users, Globe, FileText, CheckCircle, AlertTriangle, Info } from 'lucide-react';

const PrivacyPolicyPage = () => {
  const sections = [
    {
      id: 'introduction',
      title: 'مقدمة',
      icon: Info,
      content: `
        تلتزم وزارة الأوقاف والشؤون الدينية بحماية خصوصية زوار موقعها الإلكتروني ومستخدمي خدماتها. 
        تحدد هذه السياسة كيفية جمع واستخدام وحماية المعلومات الشخصية التي نحصل عليها من خلال موقعنا الإلكتروني.
      `
    },
    {
      id: 'collection',
      title: 'جمع المعلومات',
      icon: Users,
      content: `
        نقوم بجمع المعلومات التالية:
        • المعلومات الشخصية: الاسم، البريد الإلكتروني، رقم الهاتف عند التسجيل أو التواصل معنا
        • معلومات الاستخدام: صفحات الموقع التي تزورها، الوقت المستغرق، نوع المتصفح
        • معلومات تقنية: عنوان IP، نوع الجهاز، نظام التشغيل
        • ملفات تعريف الارتباط: لتحسين تجربة الاستخدام وتذكر تفضيلاتك
      `
    },
    {
      id: 'usage',
      title: 'استخدام المعلومات',
      icon: Eye,
      content: `
        نستخدم المعلومات المجمعة للأغراض التالية:
        • تقديم الخدمات المطلوبة والرد على الاستفسارات
        • تحسين محتوى الموقع وتجربة المستخدم
        • إرسال الإشعارات والتحديثات المهمة
        • إجراء الإحصائيات وتحليل الاستخدام
        • ضمان أمان الموقع ومنع الاستخدام غير المشروع
      `
    },
    {
      id: 'protection',
      title: 'حماية المعلومات',
      icon: Shield,
      content: `
        نتخذ إجراءات أمنية صارمة لحماية معلوماتك:
        • تشفير البيانات الحساسة باستخدام SSL
        • تقييد الوصول للمعلومات للموظفين المخولين فقط
        • مراقبة مستمرة للأنشطة المشبوهة
        • نسخ احتياطية منتظمة وآمنة
        • تحديث أنظمة الأمان بانتظام
      `
    },
    {
      id: 'sharing',
      title: 'مشاركة المعلومات',
      icon: Globe,
      content: `
        لا نقوم ببيع أو تأجير أو مشاركة معلوماتك الشخصية مع أطراف ثالثة، باستثناء:
        • عندما يكون ذلك مطلوباً قانونياً
        • لحماية حقوقنا أو حقوق الآخرين
        • مع مقدمي الخدمات الذين يساعدوننا في تشغيل الموقع (مع التزامهم بالسرية)
        • في حالة الحصول على موافقتك الصريحة
      `
    },
    {
      id: 'cookies',
      title: 'ملفات تعريف الارتباط',
      icon: FileText,
      content: `
        نستخدم ملفات تعريف الارتباط (Cookies) لـ:
        • تذكر تفضيلاتك وإعداداتك
        • تحليل استخدام الموقع وتحسين الأداء
        • تخصيص المحتوى حسب اهتماماتك
        • ضمان أمان جلسة التصفح
        
        يمكنك التحكم في ملفات تعريف الارتباط من خلال إعدادات متصفحك.
      `
    },
    {
      id: 'rights',
      title: 'حقوقك',
      icon: CheckCircle,
      content: `
        لديك الحقوق التالية فيما يتعلق بمعلوماتك الشخصية:
        • الحق في الوصول إلى معلوماتك الشخصية
        • الحق في تصحيح أو تحديث المعلومات
        • الحق في حذف معلوماتك (في ظروف معينة)
        • الحق في تقييد معالجة معلوماتك
        • الحق في نقل معلوماتك
        • الحق في الاعتراض على معالجة معلوماتك
      `
    },
    {
      id: 'updates',
      title: 'تحديث السياسة',
      icon: AlertTriangle,
      content: `
        قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. سنقوم بإشعارك بأي تغييرات مهمة من خلال:
        • نشر إشعار على الموقع الإلكتروني
        • إرسال بريد إلكتروني للمستخدمين المسجلين
        • تحديث تاريخ آخر تعديل في أعلى هذه الصفحة
        
        ننصحك بمراجعة هذه السياسة بانتظام للبقاء على اطلاع بأحدث التحديثات.
      `
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="islamic-gradient text-white rounded-2xl p-8 mb-8 islamic-pattern">
          <div className="text-center">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl animate-float">
              <Shield className="w-12 h-12 text-islamic-600" />
            </div>
            <h1 className="heading-1 text-white mb-4">سياسة الخصوصية</h1>
            <p className="body-large text-golden-200 max-w-4xl mx-auto">
              التزامنا بحماية خصوصيتك وبياناتك الشخصية
            </p>
            <div className="mt-6 text-golden-300">
              <p className="font-body">آخر تحديث: 15 يناير 2024</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {sections.map((section, index) => (
              <div key={section.id} className={`card-islamic animate-fade-in-up`} style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex items-center space-x-4 space-x-reverse mb-6">
                  <div className="w-12 h-12 islamic-gradient rounded-xl flex items-center justify-center">
                    <section.icon className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="heading-2 text-islamic-800">{section.title}</h2>
                </div>
                
                <div className="body-text text-sage-700 leading-relaxed whitespace-pre-line">
                  {section.content}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="islamic-gradient text-white rounded-2xl p-8 mt-8">
            <div className="text-center">
              <h2 className="heading-2 text-white mb-6">للاستفسار حول سياسة الخصوصية</h2>
              <p className="body-large text-golden-200 mb-8">
                إذا كان لديك أي أسئلة حول سياسة الخصوصية، يرجى التواصل معنا
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center justify-center space-x-3 space-x-reverse">
                  <Phone className="w-6 h-6" />
                  <div>
                    <p className="font-semibold font-display text-golden-200">هاتف</p>
                    <p className="opacity-90" dir="ltr">+970 2 298 2532</p>
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-3 space-x-reverse">
                  <Mail className="w-6 h-6" />
                  <div>
                    <p className="font-semibold font-display text-golden-200">البريد الإلكتروني</p>
                    <p className="opacity-90" dir="ltr">privacy@awqaf.gov.ps</p>
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-3 space-x-reverse">
                  <MapPin className="w-6 h-6" />
                  <div>
                    <p className="font-semibold font-display text-golden-200">العنوان</p>
                    <p className="opacity-90 font-body">رام الله - فلسطين</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;