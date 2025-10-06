import React from 'react';
import { FileText, Users, Shield, AlertTriangle, CheckCircle, Info, Globe, Lock, Eye, Phone, Mail, MapPin } from 'lucide-react';

const TermsOfServicePage = () => {
  const sections = [
    {
      id: 'acceptance',
      title: 'قبول الشروط',
      icon: CheckCircle,
      content: `
        باستخدامك لموقع وزارة الأوقاف والشؤون الدينية الإلكتروني، فإنك توافق على الالتزام بهذه الشروط والأحكام. 
        إذا كنت لا توافق على أي من هذه الشروط، يرجى عدم استخدام الموقع.
        
        تطبق هذه الشروط على جميع زوار الموقع ومستخدمي الخدمات الإلكترونية المقدمة من خلاله.
      `
    },
    {
      id: 'services',
      title: 'الخدمات المقدمة',
      icon: Globe,
      content: `
        يقدم الموقع الخدمات التالية:
        • معلومات عن الوزارة وأنشطتها
        • الأخبار والإعلانات الرسمية
        • الخدمات الإلكترونية للمواطنين
        • معلومات عن المساجد والأوقاف
        • البرامج التعليمية والاجتماعية
        • خطب الجمعة والمحاضرات الدينية
        
        نحتفظ بالحق في تعديل أو إيقاف أي خدمة دون إشعار مسبق.
      `
    },
    {
      id: 'user_responsibilities',
      title: 'مسؤوليات المستخدم',
      icon: Users,
      content: `
        يتعهد المستخدم بما يلي:
        • استخدام الموقع للأغراض المشروعة فقط
        • عدم انتهاك حقوق الآخرين أو القوانين المعمول بها
        • عدم نشر محتوى مسيء أو غير لائق
        • الحفاظ على سرية بيانات الدخول الخاصة به
        • عدم محاولة اختراق الموقع أو إلحاق الضرر به
        • احترام حقوق الملكية الفكرية للمحتوى
      `
    },
    {
      id: 'intellectual_property',
      title: 'الملكية الفكرية',
      icon: Shield,
      content: `
        جميع المحتويات الموجودة على الموقع محمية بحقوق الطبع والنشر:
        • النصوص والصور والفيديوهات ملك للوزارة
        • لا يجوز نسخ أو توزيع المحتوى دون إذن مكتوب
        • يمكن الاقتباس للأغراض التعليمية مع ذكر المصدر
        • الشعارات والعلامات التجارية محفوظة للوزارة
        • المحتوى الديني يخضع لضوابط خاصة للاستخدام
      `
    },
    {
      id: 'limitations',
      title: 'قيود الاستخدام',
      icon: Lock,
      content: `
        يُمنع استخدام الموقع للأغراض التالية:
        • الأنشطة غير القانونية أو المخالفة للآداب العامة
        • نشر محتوى مضلل أو كاذب
        • التدخل في عمل الموقع أو خوادمه
        • جمع معلومات المستخدمين الآخرين
        • استخدام برامج آلية للوصول للموقع
        • انتحال الشخصية أو التمثيل الكاذب
      `
    },
    {
      id: 'liability',
      title: 'إخلاء المسؤولية',
      icon: AlertTriangle,
      content: `
        تخلي الوزارة مسؤوليتها عن:
        • دقة أو اكتمال المعلومات المقدمة من أطراف ثالثة
        • الأضرار الناتجة عن انقطاع الخدمة أو الأخطاء التقنية
        • المحتوى الموجود في المواقع المرتبطة خارجياً
        • الاستخدام غير المصرح به للمعلومات
        • القرارات المتخذة بناءً على المعلومات المقدمة
        
        يستخدم الموقع "كما هو" دون ضمانات صريحة أو ضمنية.
      `
    },
    {
      id: 'modifications',
      title: 'تعديل الشروط',
      icon: FileText,
      content: `
        تحتفظ الوزارة بالحق في تعديل هذه الشروط في أي وقت:
        • سيتم نشر التعديلات على هذه الصفحة
        • ستصبح التعديلات سارية فور نشرها
        • استمرار استخدامك للموقع يعني قبولك للشروط المحدثة
        • ننصح بمراجعة هذه الصفحة بانتظام
        • التعديلات الجوهرية سيتم الإعلان عنها بوضوح
      `
    },
    {
      id: 'governing_law',
      title: 'القانون الحاكم',
      icon: Info,
      content: `
        تخضع هذه الشروط والأحكام لـ:
        • القوانين المعمول بها في دولة فلسطين
        • الأحكام الشرعية الإسلامية
        • اللوائح الحكومية ذات الصلة
        • المعايير الدولية لحقوق الإنسان
        
        أي نزاع ينشأ عن استخدام الموقع سيتم حله وفقاً للقوانين الفلسطينية.
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
              <FileText className="w-12 h-12 text-islamic-600" />
            </div>
            <h1 className="heading-1 text-white mb-4">شروط الاستخدام</h1>
            <p className="body-large text-golden-200 max-w-4xl mx-auto">
              الشروط والأحكام لاستخدام موقع وزارة الأوقاف والشؤون الدينية
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

          {/* Important Notice */}
          <div className="bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200 rounded-2xl p-8 mt-8">
            <div className="flex items-center space-x-4 space-x-reverse mb-4">
              <AlertTriangle className="w-8 h-8 text-orange-600" />
              <h3 className="text-xl font-semibold text-orange-800 font-display">تنبيه مهم</h3>
            </div>
            <p className="text-orange-700 font-body leading-relaxed">
              هذه الشروط والأحكام تشكل اتفاقية قانونية ملزمة بينك وبين وزارة الأوقاف والشؤون الدينية. 
              يرجى قراءتها بعناية قبل استخدام الموقع. إذا كان لديك أي استفسارات، لا تتردد في التواصل معنا.
            </p>
          </div>

          {/* Contact Section */}
          <div className="islamic-gradient text-white rounded-2xl p-8 mt-8">
            <div className="text-center">
              <h2 className="heading-2 text-white mb-6">للاستفسار حول الشروط والأحكام</h2>
              <p className="body-large text-golden-200 mb-8">
                فريق الشؤون القانونية متاح للإجابة على استفساراتكم
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center justify-center space-x-3 space-x-reverse">
                  <Phone className="w-6 h-6" />
                  <div>
                    <p className="font-semibold font-display text-golden-200">هاتف</p>
                    <p className="opacity-90" dir="ltr">+970 2 298 2538</p>
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-3 space-x-reverse">
                  <Mail className="w-6 h-6" />
                  <div>
                    <p className="font-semibold font-display text-golden-200">البريد الإلكتروني</p>
                    <p className="opacity-90" dir="ltr">legal@awqaf.gov.ps</p>
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

export default TermsOfServicePage;