import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Globe, Send, User, MessageSquare, Building, Users, Calendar, Star, CheckCircle, AlertTriangle, Info, Download, Share2, Eye, ArrowLeft, Plus, Target, Heart, BookOpen, Shield, Award, Zap, Sparkles, Crown, Gem, TrendingUp, BarChart3, Navigation, Compass, Flag, Home, Settings, FileText, Headphones, Video, Image as ImageIcon, Printer, Fan as Fax } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    department: '',
    priority: 'normal'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const departments = [
    { id: 'general', name: 'الاستفسارات العامة', icon: Info },
    { id: 'waqf', name: 'إدارة الأوقاف', icon: Building },
    { id: 'mosques', name: 'شؤون المساجد', icon: Crown },
    { id: 'education', name: 'التعليم الديني', icon: BookOpen },
    { id: 'social', name: 'الخدمات الاجتماعية', icon: Heart },
    { id: 'technical', name: 'الدعم التقني', icon: Settings },
    { id: 'media', name: 'الإعلام والعلاقات العامة', icon: Globe }
  ];

  const contactMethods = [
    {
      id: 'phone',
      title: 'الهاتف',
      icon: Phone,
      color: 'from-green-500 to-green-600',
      primary: '+970 2 298 2532',
      secondary: '+970 2 298 2533',
      description: 'للاستفسارات العاجلة والطوارئ',
      hours: 'الأحد - الخميس: 8:00 ص - 3:00 م'
    },
    {
      id: 'email',
      title: 'البريد الإلكتروني',
      icon: Mail,
      color: 'from-blue-500 to-blue-600',
      primary: 'info@awqaf.gov.ps',
      secondary: 'contact@awqaf.gov.ps',
      description: 'للاستفسارات التفصيلية والوثائق',
      hours: 'رد خلال 24 ساعة'
    },
    {
      id: 'location',
      title: 'الموقع',
      icon: MapPin,
      color: 'from-purple-500 to-purple-600',
      primary: 'رام الله - فلسطين',
      secondary: 'شارع الإرسال، بجانب المقاطعة',
      description: 'للزيارات الشخصية والاجتماعات',
      hours: 'الأحد - الخميس: 8:00 ص - 3:00 م'
    },
    {
      id: 'fax',
      title: 'الفاكس',
      icon: Printer,
      color: 'from-orange-500 to-orange-600',
      primary: '+970 2 298 2534',
      secondary: '+970 2 298 2535',
      description: 'لإرسال الوثائق الرسمية',
      hours: '24 ساعة'
    }
  ];

  const officeLocations = [
    {
      id: 1,
      name: 'المكتب الرئيسي',
      address: 'رام الله - شارع الإرسال',
      phone: '+970 2 298 2532',
      email: 'ramallah@awqaf.gov.ps',
      manager: 'الأستاذ أحمد محمد الأحمد',
      services: ['الإدارة العامة', 'الأوقاف', 'الشؤون المالية'],
      hours: 'الأحد - الخميس: 8:00 ص - 3:00 م',
      coordinates: { lat: 31.9038, lng: 35.2034 }
    },
    {
      id: 2,
      name: 'مكتب القدس',
      address: 'القدس - البلدة القديمة',
      phone: '+970 2 628 3292',
      email: 'jerusalem@awqaf.gov.ps',
      manager: 'الشيخ عكرمة صبري',
      services: ['المسجد الأقصى', 'المقدسات', 'الزيارات'],
      hours: 'الأحد - الخميس: 8:00 ص - 3:00 م',
      coordinates: { lat: 31.7767, lng: 35.2345 }
    },
    {
      id: 3,
      name: 'مكتب غزة',
      address: 'غزة - شارع الرشيد',
      phone: '+970 8 282 3456',
      email: 'gaza@awqaf.gov.ps',
      manager: 'الدكتور عمر الزهار',
      services: ['المساجد', 'الخدمات الاجتماعية', 'التعليم'],
      hours: 'الأحد - الخميس: 8:00 ص - 3:00 م',
      coordinates: { lat: 31.5017, lng: 34.4668 }
    },
    {
      id: 4,
      name: 'مكتب نابلس',
      address: 'نابلس - شارع الفاروق',
      phone: '+970 9 238 4567',
      email: 'nablus@awqaf.gov.ps',
      manager: 'الدكتور خالد النابلسي',
      services: ['المساجد الإقليمية', 'التدريب', 'الأنشطة'],
      hours: 'الأحد - الخميس: 8:00 ص - 3:00 م',
      coordinates: { lat: 32.2211, lng: 35.2544 }
    }
  ];

  const socialMedia = [
    { name: 'فيسبوك', url: 'https://facebook.com/awqaf.ps', icon: '📘', followers: '125K' },
    { name: 'تويتر', url: 'https://twitter.com/awqaf_ps', icon: '🐦', followers: '89K' },
    { name: 'إنستغرام', url: 'https://instagram.com/awqaf.ps', icon: '📷', followers: '67K' },
    { name: 'يوتيوب', url: 'https://youtube.com/awqafps', icon: '📺', followers: '45K' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // محاكاة إرسال النموذج
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        department: '',
        priority: 'normal'
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="islamic-gradient text-white rounded-2xl p-8 mb-8 islamic-pattern">
          <div className="text-center">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl animate-float">
              <MessageSquare className="w-12 h-12 text-islamic-600" />
            </div>
            <h1 className="heading-1 text-white mb-4">تواصل معنا</h1>
            <p className="body-large text-golden-200 max-w-4xl mx-auto">
              نحن هنا لخدمتكم والإجابة على جميع استفساراتكم في أي وقت
            </p>
          </div>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {contactMethods.map((method, index) => (
            <div key={method.id} className={`card-islamic hover-lift animate-fade-in-up`} style={{ animationDelay: `${index * 0.1}s` }}>
              <div className={`w-16 h-16 bg-gradient-to-br ${method.color} rounded-xl flex items-center justify-center mb-6 shadow-lg`}>
                <method.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-islamic-800 mb-3 font-display">{method.title}</h3>
              <div className="space-y-2 mb-4">
                <p className="font-bold text-sage-800 font-body" dir="ltr">{method.primary}</p>
                <p className="text-sage-600 font-body" dir="ltr">{method.secondary}</p>
              </div>
              <p className="text-sage-600 text-sm mb-3 font-body">{method.description}</p>
              <p className="text-xs text-islamic-600 font-body">{method.hours}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-elegant p-8">
            <div className="flex items-center space-x-3 space-x-reverse mb-6">
              <div className="w-12 h-12 islamic-gradient rounded-xl flex items-center justify-center">
                <Send className="w-6 h-6 text-white" />
              </div>
              <h2 className="heading-2 text-islamic-800">أرسل رسالة</h2>
            </div>

            {submitStatus === 'success' && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <p className="text-green-800 font-body">تم إرسال رسالتك بنجاح. سنتواصل معك قريباً.</p>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <p className="text-red-800 font-body">حدث خطأ في إرسال الرسالة. يرجى المحاولة مرة أخرى.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-islamic-700 mb-2 font-body">
                    الاسم الكامل *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                    placeholder="أدخل اسمك الكامل"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-islamic-700 mb-2 font-body">
                    البريد الإلكتروني *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                    placeholder="example@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-islamic-700 mb-2 font-body">
                    رقم الهاتف
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="+970 X XXX XXXX"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-islamic-700 mb-2 font-body">
                    القسم المختص
                  </label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="form-select"
                  >
                    <option value="">اختر القسم</option>
                    {departments.map(dept => (
                      <option key={dept.id} value={dept.id}>{dept.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-islamic-700 mb-2 font-body">
                    موضوع الرسالة *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                    placeholder="موضوع الرسالة"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-islamic-700 mb-2 font-body">
                    الأولوية
                  </label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    className="form-select"
                  >
                    <option value="low">منخفضة</option>
                    <option value="normal">عادية</option>
                    <option value="high">مهمة</option>
                    <option value="urgent">عاجلة</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-islamic-700 mb-2 font-body">
                  نص الرسالة *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="form-textarea"
                  placeholder="اكتب رسالتك هنا..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2 space-x-reverse">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>جاري الإرسال...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2 space-x-reverse">
                    <Send className="w-5 h-5" />
                    <span>إرسال الرسالة</span>
                  </div>
                )}
              </button>
            </form>
          </div>

          {/* Quick Contact Info */}
          <div className="space-y-6">
            {/* Emergency Contact */}
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 border border-red-200">
              <div className="flex items-center space-x-3 space-x-reverse mb-4">
                <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-red-800 font-display">الطوارئ</h3>
              </div>
              <p className="text-red-700 mb-4 font-body">للحالات الطارئة والاستفسارات العاجلة</p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Phone className="w-4 h-4 text-red-600" />
                  <span className="font-bold text-red-800" dir="ltr">+970 2 298 2530</span>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Mail className="w-4 h-4 text-red-600" />
                  <span className="font-bold text-red-800" dir="ltr">emergency@awqaf.gov.ps</span>
                </div>
              </div>
            </div>

            {/* Working Hours */}
            <div className="bg-white rounded-2xl shadow-elegant p-6">
              <div className="flex items-center space-x-3 space-x-reverse mb-4">
                <div className="w-12 h-12 islamic-gradient rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-islamic-800 font-display">ساعات العمل</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-body text-sage-600">الأحد - الخميس</span>
                  <span className="font-bold text-islamic-700 font-body">8:00 ص - 3:00 م</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-body text-sage-600">الجمعة</span>
                  <span className="font-bold text-sage-700 font-body">8:00 ص - 12:00 م</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-body text-sage-600">السبت</span>
                  <span className="font-bold text-red-600 font-body">مغلق</span>
                </div>
                <div className="border-t border-sage-200 pt-3 mt-3">
                  <p className="text-sm text-islamic-600 font-body">خدمة الطوارئ متاحة على مدار الساعة</p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-2xl shadow-elegant p-6">
              <div className="flex items-center space-x-3 space-x-reverse mb-4">
                <div className="w-12 h-12 golden-gradient rounded-xl flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-islamic-800 font-display">تابعنا على</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {socialMedia.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 space-x-reverse p-3 bg-islamic-50 rounded-lg hover:bg-islamic-100 transition-colors"
                  >
                    <span className="text-2xl">{social.icon}</span>
                    <div>
                      <p className="font-medium text-islamic-800 font-body">{social.name}</p>
                      <p className="text-xs text-sage-600">{social.followers}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Office Locations */}
        <div className="bg-white rounded-2xl shadow-elegant p-8 mb-8">
          <h2 className="heading-2 text-islamic-800 mb-6">مكاتبنا في المحافظات</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {officeLocations.map((office) => (
              <div key={office.id} className="bg-gradient-to-br from-islamic-50 to-golden-50 rounded-xl p-6 border border-islamic-200">
                <div className="flex items-center space-x-3 space-x-reverse mb-4">
                  <div className="w-12 h-12 islamic-gradient rounded-xl flex items-center justify-center">
                    <Building className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-islamic-800 font-display">{office.name}</h3>
                    <p className="text-sm text-sage-600 font-body">{office.manager}</p>
                  </div>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <MapPin className="w-4 h-4 text-islamic-600" />
                    <span className="text-sage-700 font-body">{office.address}</span>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Phone className="w-4 h-4 text-golden-600" />
                    <span className="text-sage-700 font-body" dir="ltr">{office.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Mail className="w-4 h-4 text-blue-600" />
                    <span className="text-sage-700 font-body" dir="ltr">{office.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Clock className="w-4 h-4 text-purple-600" />
                    <span className="text-sage-700 font-body">{office.hours}</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-sage-800 mb-2 font-display">الخدمات:</h4>
                  <div className="flex flex-wrap gap-1">
                    {office.services.map((service, index) => (
                      <span key={index} className="px-2 py-1 bg-white text-islamic-700 text-xs rounded-full border border-islamic-200">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
                
                <button className="w-full bg-islamic-600 text-white py-2 rounded-lg hover:bg-islamic-700 transition-colors font-body">
                  <Navigation className="w-4 h-4 inline ml-2" />
                  الاتجاهات
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-elegant p-8 mb-8">
          <h2 className="heading-2 text-islamic-800 mb-6">الأسئلة الشائعة</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                question: 'كيف يمكنني التقدم لخدمات الوزارة؟',
                answer: 'يمكنك زيارة أقرب مكتب لنا أو التواصل عبر الهاتف أو البريد الإلكتروني لمعرفة الإجراءات المطلوبة.'
              },
              {
                question: 'ما هي ساعات عمل المكاتب؟',
                answer: 'نعمل من الأحد إلى الخميس من 8:00 صباحاً حتى 3:00 مساءً، والجمعة حتى 12:00 ظهراً.'
              },
              {
                question: 'كيف يمكنني التبرع للأوقاف؟',
                answer: 'يمكنك التبرع من خلال زيارة مكاتبنا أو التواصل مع قسم الأوقاف لمعرفة طرق التبرع المتاحة.'
              },
              {
                question: 'هل تقدمون خدمات إلكترونية؟',
                answer: 'نعم، نوفر العديد من الخدمات الإلكترونية من خلال موقعنا الإلكتروني وتطبيق الهاتف المحمول.'
              },
              {
                question: 'كيف يمكنني الحصول على فتوى شرعية؟',
                answer: 'يمكنك التواصل مع قسم الشؤون الدينية أو زيارة أقرب مسجد للحصول على الإرشاد الشرعي.'
              },
              {
                question: 'ما هي شروط العمل في الوزارة؟',
                answer: 'تختلف الشروط حسب المنصب. يمكنك مراجعة قسم الموارد البشرية أو موقعنا للاطلاع على الوظائف المتاحة.'
              }
            ].map((faq, index) => (
              <div key={index} className="bg-islamic-50 rounded-xl p-6">
                <h4 className="font-semibold text-islamic-800 mb-3 font-display">{faq.question}</h4>
                <p className="text-sage-700 font-body leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Map Section */}
        <div className="bg-white rounded-2xl shadow-elegant p-8">
          <h2 className="heading-2 text-islamic-800 mb-6">موقعنا على الخريطة</h2>
          <div className="bg-gradient-to-br from-islamic-100 to-golden-100 rounded-xl p-8 text-center">
            <MapPin className="w-16 h-16 text-islamic-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-islamic-800 mb-2 font-display">المكتب الرئيسي</h3>
            <p className="text-sage-700 mb-4 font-body">رام الله - شارع الإرسال، بجانب المقاطعة</p>
            <div className="flex items-center justify-center space-x-4 space-x-reverse">
              <button className="btn-primary">
                <Navigation className="w-5 h-5 ml-2" />
                فتح في الخرائط
              </button>
              <button className="btn-secondary">
                <Download className="w-5 h-5 ml-2" />
                تحميل الموقع
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;