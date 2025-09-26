import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, User, MessageSquare, Building, Globe, Calendar, Info, AlertTriangle, CheckCircle, Star, Heart, Share2, Bookmark, Download, Upload, Settings, Plus, Edit, Trash2, Search, Filter, Eye, TrendingUp, BarChart3, Activity, Target, Award, Sparkles, Crown, Gem, HandHeart, GraduationCap, Megaphone, Volume2, VolumeX, Bell, RefreshCw, Save, Copy, ExternalLink, Navigation, Compass, Flag, Archive, Layers, Grid, List, Facebook, Twitter, Instagram, Youtube, Linkedin, MessageCircle as WhatsApp, Printer, Fan as Fax, Headphones, HelpCircle, FileText, Image as ImageIcon, Video, Mic, BookOpen } from 'lucide-react';
import { useToast } from '../hooks/useToast';

const ContactPage = () => {
  const { success, info, error: showError } = useToast();
  const [selectedDepartment, setSelectedDepartment] = useState('general');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    department: 'general',
    priority: 'normal',
    attachments: []
  });
  const [showMap, setShowMap] = useState(false);
  const [activeTab, setActiveTab] = useState('contact');

  const departments = [
    {
      id: 'general',
      name: 'الاستعلامات العامة',
      icon: Info,
      phone: '+970 2 298 2500',
      email: 'info@awqaf.gov.ps',
      manager: 'الأستاذ محمد أحمد',
      office: 'الطابق الأول - مكتب 101',
      hours: 'الأحد - الخميس: 8:00 ص - 3:00 م',
      description: 'للاستفسارات العامة والمعلومات الأساسية'
    },
    {
      id: 'mosques',
      name: 'إدارة المساجد',
      icon: Building,
      phone: '+970 2 298 2534',
      email: 'mosques@awqaf.gov.ps',
      manager: 'الأستاذ أحمد محمد',
      office: 'الطابق الثاني - مكتب 201',
      hours: 'الأحد - الخميس: 8:00 ص - 3:00 م',
      description: 'خدمات إدارة وصيانة المساجد'
    },
    {
      id: 'religious',
      name: 'الشؤون الدينية',
      icon: BookOpen,
      phone: '+970 2 298 2535',
      email: 'fatwa@awqaf.gov.ps',
      manager: 'الشيخ محمد علي',
      office: 'الطابق الثاني - مكتب 205',
      hours: 'الأحد - الخميس: 8:00 ص - 3:00 م',
      description: 'الفتاوى والإرشاد الديني'
    },
    {
      id: 'education',
      name: 'التعليم الديني',
      icon: GraduationCap,
      phone: '+970 2 298 2536',
      email: 'education@awqaf.gov.ps',
      manager: 'الدكتور نور الدين',
      office: 'الطابق الثالث - مكتب 301',
      hours: 'الأحد - الخميس: 8:00 ص - 3:00 م',
      description: 'برامج التعليم والدورات الدينية'
    },
    {
      id: 'social',
      name: 'الخدمات الاجتماعية',
      icon: Heart,
      phone: '+970 2 298 2539',
      email: 'social@awqaf.gov.ps',
      manager: 'الأستاذة فاطمة خالد',
      office: 'الطابق الأول - مكتب 105',
      hours: 'الأحد - الخميس: 8:00 ص - 3:00 م',
      description: 'المساعدات والدعم الاجتماعي'
    },
    {
      id: 'media',
      name: 'الإعلام والعلاقات العامة',
      icon: Megaphone,
      phone: '+970 2 298 2540',
      email: 'media@awqaf.gov.ps',
      manager: 'الأستاذ سامر محمود',
      office: 'الطابق الثالث - مكتب 305',
      hours: 'الأحد - الخميس: 8:00 ص - 3:00 م',
      description: 'الإعلام والتواصل مع الجمهور'
    }
  ];

  const socialMedia = [
    {
      name: 'فيسبوك',
      icon: Facebook,
      url: 'https://facebook.com/awqaf.palestine',
      followers: '125K',
      color: 'text-blue-600'
    },
    {
      name: 'تويتر',
      icon: Twitter,
      url: 'https://twitter.com/awqaf_palestine',
      followers: '89K',
      color: 'text-sky-500'
    },
    {
      name: 'إنستغرام',
      icon: Instagram,
      url: 'https://instagram.com/awqaf.palestine',
      followers: '67K',
      color: 'text-pink-600'
    },
    {
      name: 'يوتيوب',
      icon: Youtube,
      url: 'https://youtube.com/awqafpalestine',
      followers: '45K',
      color: 'text-red-600'
    },
    {
      name: 'واتساب',
      icon: WhatsApp,
      url: 'https://wa.me/970591234567',
      followers: 'متاح',
      color: 'text-green-600'
    },
    {
      name: 'لينكد إن',
      icon: Linkedin,
      url: 'https://linkedin.com/company/awqaf-palestine',
      followers: '23K',
      color: 'text-blue-700'
    }
  ];

  const officeLocations = [
    {
      id: 1,
      name: 'المقر الرئيسي',
      address: 'شارع الإرسال، رام الله، فلسطين',
      phone: '+970 2 298 2500',
      fax: '+970 2 298 2501',
      email: 'info@awqaf.gov.ps',
      hours: 'الأحد - الخميس: 8:00 ص - 3:00 م',
      services: ['جميع الخدمات', 'مكتب الوزير', 'الإدارة العامة'],
      coordinates: { lat: 31.9046, lng: 35.2042 }
    },
    {
      id: 2,
      name: 'مكتب غزة',
      address: 'شارع عمر المختار، غزة، فلسطين',
      phone: '+970 8 282 3456',
      fax: '+970 8 282 3457',
      email: 'gaza@awqaf.gov.ps',
      hours: 'الأحد - الخميس: 8:00 ص - 3:00 م',
      services: ['إدارة المساجد', 'الشؤون الدينية', 'الخدمات الاجتماعية'],
      coordinates: { lat: 31.5017, lng: 34.4668 }
    },
    {
      id: 3,
      name: 'مكتب نابلس',
      address: 'البلدة القديمة، نابلس، فلسطين',
      phone: '+970 9 238 7890',
      fax: '+970 9 238 7891',
      email: 'nablus@awqaf.gov.ps',
      hours: 'الأحد - الخميس: 8:00 ص - 3:00 م',
      services: ['إدارة المساجد', 'التعليم الديني', 'الأنشطة'],
      coordinates: { lat: 32.2211, lng: 35.2544 }
    }
  ];

  const emergencyContacts = [
    {
      title: 'الطوارئ العامة',
      phone: '+970 59 123 4567',
      description: 'متاح 24/7 للحالات العاجلة',
      icon: AlertTriangle,
      color: 'text-red-600'
    },
    {
      title: 'الدعم الفني',
      phone: '+970 59 234 5678',
      description: 'دعم تقني للخدمات الإلكترونية',
      icon: Settings,
      color: 'text-blue-600'
    },
    {
      title: 'خدمة العملاء',
      phone: '+970 59 345 6789',
      description: 'استفسارات ومساعدة عامة',
      icon: Headphones,
      color: 'text-green-600'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showError('بيانات ناقصة', 'يرجى ملء جميع الحقول المطلوبة');
      return;
    }
    success('تم إرسال الرسالة', 'سيتم الرد عليك في أقرب وقت ممكن');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      department: 'general',
      priority: 'normal',
      attachments: []
    });
  };

  const selectedDept = departments.find(dept => dept.id === selectedDepartment);

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="islamic-gradient text-white rounded-2xl p-8 mb-8 islamic-pattern">
          <div className="text-center">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl animate-float">
              <Phone className="w-12 h-12 text-islamic-600" />
            </div>
            <h1 className="heading-1 text-white mb-4">اتصل بنا</h1>
            <p className="body-large text-golden-200 max-w-4xl mx-auto">
              نحن هنا لخدمتكم والإجابة على استفساراتكم في أي وقت
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card-islamic">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-sage-600 font-body">أقسام الخدمة</p>
                <p className="text-3xl font-bold text-islamic-700 font-display">{departments.length}</p>
              </div>
              <Building className="w-8 h-8 text-islamic-500" />
            </div>
          </div>
          
          <div className="card-golden">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-sage-600 font-body">ساعات الخدمة</p>
                <p className="text-2xl font-bold text-golden-700 font-display">7 ساعات</p>
              </div>
              <Clock className="w-8 h-8 text-golden-500" />
            </div>
          </div>
          
          <div className="card-sage">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-sage-600 font-body">المكاتب الفرعية</p>
                <p className="text-3xl font-bold text-sage-700 font-display">{officeLocations.length}</p>
              </div>
              <MapPin className="w-8 h-8 text-sage-500" />
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-sage-600 font-body">وسائل التواصل</p>
                <p className="text-3xl font-bold text-gray-700 font-display">{socialMedia.length}</p>
              </div>
              <Globe className="w-8 h-8 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-elegant mb-8">
          <div className="border-b border-sage-200">
            <nav className="flex space-x-8 space-x-reverse px-6">
              {[
                { id: 'contact', name: 'نموذج التواصل', icon: MessageSquare },
                { id: 'departments', name: 'الأقسام', icon: Building },
                { id: 'locations', name: 'المواقع', icon: MapPin },
                { id: 'social', name: 'وسائل التواصل', icon: Globe },
                { id: 'emergency', name: 'الطوارئ', icon: AlertTriangle }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 space-x-reverse py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-islamic-600 text-islamic-600'
                      : 'border-transparent text-sage-500 hover:text-sage-700 hover:border-sage-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="font-body">{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'contact' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Contact Form */}
                <div>
                  <h2 className="text-xl font-semibold text-islamic-800 mb-6 font-display">إرسال رسالة</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">الاسم الكامل *</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          className="form-input"
                          placeholder="أدخل اسمك الكامل"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">البريد الإلكتروني *</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          className="form-input"
                          placeholder="example@email.com"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">رقم الهاتف</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                          className="form-input"
                          placeholder="+970 59 123 4567"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">القسم المختص</label>
                        <select
                          value={formData.department}
                          onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                          className="form-select"
                        >
                          {departments.map(dept => (
                            <option key={dept.id} value={dept.id}>{dept.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">موضوع الرسالة *</label>
                        <input
                          type="text"
                          required
                          value={formData.subject}
                          onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                          className="form-input"
                          placeholder="موضوع الرسالة"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">الأولوية</label>
                        <select
                          value={formData.priority}
                          onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
                          className="form-select"
                        >
                          <option value="low">منخفضة</option>
                          <option value="normal">عادية</option>
                          <option value="high">عالية</option>
                          <option value="urgent">عاجلة</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">نص الرسالة *</label>
                      <textarea
                        required
                        rows={6}
                        value={formData.message}
                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                        className="form-input"
                        placeholder="اكتب رسالتك هنا..."
                      ></textarea>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">المرفقات (اختياري)</label>
                      <div className="border-2 border-dashed border-sage-300 rounded-lg p-4 text-center hover:border-islamic-500 transition-colors">
                        <Upload className="w-8 h-8 text-sage-400 mx-auto mb-2" />
                        <p className="text-sm text-sage-600 font-body">اسحب الملفات هنا أو انقر للاختيار</p>
                        <p className="text-xs text-sage-500 font-body">يدعم: PDF, DOC, JPG, PNG (حد أقصى 10MB)</p>
                        <input type="file" className="hidden" multiple accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" />
                      </div>
                    </div>
                    
                    <button type="submit" className="w-full btn-primary">
                      <Send className="w-5 h-5 ml-2" />
                      إرسال الرسالة
                    </button>
                  </form>
                </div>

                {/* Department Info */}
                <div className="space-y-6">
                  <div className="card-golden">
                    <h3 className="text-lg font-semibold text-golden-800 mb-4 font-display">معلومات القسم المختار</h3>
                    {selectedDept && (
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <div className="w-12 h-12 golden-gradient rounded-xl flex items-center justify-center">
                            <selectedDept.icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-golden-800 font-display">{selectedDept.name}</h4>
                            <p className="text-sm text-sage-600 font-body">{selectedDept.description}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <Phone className="w-4 h-4 text-golden-600" />
                            <span className="text-sage-700 font-body" dir="ltr">{selectedDept.phone}</span>
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <Mail className="w-4 h-4 text-golden-600" />
                            <span className="text-sage-700 font-body" dir="ltr">{selectedDept.email}</span>
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <Building className="w-4 h-4 text-golden-600" />
                            <span className="text-sage-700 font-body">{selectedDept.office}</span>
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <User className="w-4 h-4 text-golden-600" />
                            <span className="text-sage-700 font-body">{selectedDept.manager}</span>
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <Clock className="w-4 h-4 text-golden-600" />
                            <span className="text-sage-700 font-body">{selectedDept.hours}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Quick Contact */}
                  <div className="card-sage">
                    <h3 className="text-lg font-semibold text-sage-800 mb-4 font-display">تواصل سريع</h3>
                    <div className="space-y-3">
                      <button className="w-full flex items-center space-x-3 space-x-reverse px-4 py-3 bg-white text-sage-700 rounded-lg hover:bg-sage-50 transition-colors border border-sage-200">
                        <Phone className="w-5 h-5 text-green-600" />
                        <span className="font-body">اتصال مباشر</span>
                      </button>
                      <button className="w-full flex items-center space-x-3 space-x-reverse px-4 py-3 bg-white text-sage-700 rounded-lg hover:bg-sage-50 transition-colors border border-sage-200">
                        <WhatsApp className="w-5 h-5 text-green-600" />
                        <span className="font-body">واتساب</span>
                      </button>
                      <button className="w-full flex items-center space-x-3 space-x-reverse px-4 py-3 bg-white text-sage-700 rounded-lg hover:bg-sage-50 transition-colors border border-sage-200">
                        <Calendar className="w-5 h-5 text-blue-600" />
                        <span className="font-body">حجز موعد</span>
                      </button>
                    </div>
                  </div>

                  {/* FAQ */}
                  <div className="card">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 font-display">الأسئلة الشائعة</h3>
                    <div className="space-y-3">
                      {[
                        'كيف يمكنني حجز موعد مع الوزير؟',
                        'ما هي أوقات استقبال المواطنين؟',
                        'كيف أحصل على فتوى شرعية؟',
                        'ما هي خدمات إدارة المساجد؟'
                      ].map((question, idx) => (
                        <button key={idx} className="w-full text-right p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <HelpCircle className="w-4 h-4 text-blue-600" />
                            <span className="text-sm text-gray-700 font-body">{question}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'departments' && (
              <div>
                <h2 className="text-xl font-semibold text-islamic-800 mb-6 font-display">أقسام الوزارة</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {departments.map((dept) => (
                    <div key={dept.id} className="card-islamic">
                      <div className="flex items-center space-x-4 space-x-reverse mb-4">
                        <div className="w-12 h-12 islamic-gradient rounded-xl flex items-center justify-center">
                          <dept.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-islamic-800 font-display">{dept.name}</h3>
                          <p className="text-sm text-sage-600 font-body">{dept.description}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <Phone className="w-4 h-4 text-islamic-600" />
                          <span className="text-sage-700 font-body" dir="ltr">{dept.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <Mail className="w-4 h-4 text-islamic-600" />
                          <span className="text-sage-700 font-body" dir="ltr">{dept.email}</span>
                        </div>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <Building className="w-4 h-4 text-islamic-600" />
                          <span className="text-sage-700 font-body">{dept.office}</span>
                        </div>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <User className="w-4 h-4 text-islamic-600" />
                          <span className="text-sage-700 font-body">{dept.manager}</span>
                        </div>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <Clock className="w-4 h-4 text-islamic-600" />
                          <span className="text-sage-700 font-body">{dept.hours}</span>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-islamic-200">
                        <button
                          onClick={() => {
                            setSelectedDepartment(dept.id);
                            setActiveTab('contact');
                          }}
                          className="btn-primary w-full"
                        >
                          <MessageSquare className="w-5 h-5 ml-2" />
                          تواصل مع القسم
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'locations' && (
              <div>
                <h2 className="text-xl font-semibold text-islamic-800 mb-6 font-display">مواقع المكاتب</h2>
                <div className="space-y-6">
                  {officeLocations.map((location) => (
                    <div key={location.id} className="card-islamic">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-lg font-semibold text-islamic-800 mb-4 font-display">{location.name}</h3>
                          <div className="space-y-3">
                            <div className="flex items-center space-x-2 space-x-reverse">
                              <MapPin className="w-4 h-4 text-islamic-600" />
                              <span className="text-sage-700 font-body">{location.address}</span>
                            </div>
                            <div className="flex items-center space-x-2 space-x-reverse">
                              <Phone className="w-4 h-4 text-islamic-600" />
                              <span className="text-sage-700 font-body" dir="ltr">{location.phone}</span>
                            </div>
                            <div className="flex items-center space-x-2 space-x-reverse">
                              <Printer className="w-4 h-4 text-islamic-600" />
                              <span className="text-sage-700 font-body" dir="ltr">{location.fax}</span>
                            </div>
                            <div className="flex items-center space-x-2 space-x-reverse">
                              <Mail className="w-4 h-4 text-islamic-600" />
                              <span className="text-sage-700 font-body" dir="ltr">{location.email}</span>
                            </div>
                            <div className="flex items-center space-x-2 space-x-reverse">
                              <Clock className="w-4 h-4 text-islamic-600" />
                              <span className="text-sage-700 font-body">{location.hours}</span>
                            </div>
                          </div>
                          
                          <div className="mt-4">
                            <h4 className="font-semibold text-islamic-800 mb-2 font-display">الخدمات المتاحة:</h4>
                            <div className="flex flex-wrap gap-2">
                              {location.services.map((service, idx) => (
                                <span key={idx} className="px-2 py-1 bg-islamic-100 text-islamic-700 text-xs rounded-full font-body">
                                  {service}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-gray-100 rounded-xl p-4 flex items-center justify-center">
                          <div className="text-center">
                            <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600 font-body">خريطة الموقع</p>
                            <button className="btn-primary mt-4">
                              <Navigation className="w-5 h-5 ml-2" />
                              عرض على الخريطة
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'social' && (
              <div>
                <h2 className="text-xl font-semibold text-islamic-800 mb-6 font-display">وسائل التواصل الاجتماعي</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {socialMedia.map((platform) => (
                    <div key={platform.name} className="card-islamic text-center">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <platform.icon className={`w-8 h-8 ${platform.color}`} />
                      </div>
                      <h3 className="text-lg font-semibold text-islamic-800 mb-2 font-display">{platform.name}</h3>
                      <p className="text-sage-600 mb-4 font-body">{platform.followers} متابع</p>
                      <a
                        href={platform.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary w-full"
                      >
                        <ExternalLink className="w-5 h-5 ml-2" />
                        زيارة الصفحة
                      </a>
                    </div>
                  ))}
                </div>
                
                <div className="card-golden mt-8">
                  <h3 className="text-lg font-semibold text-golden-800 mb-4 font-display">اشترك في التحديثات</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-golden-800 mb-3 font-display">النشرة الإخبارية</h4>
                      <div className="flex space-x-2 space-x-reverse">
                        <input
                          type="email"
                          placeholder="بريدك الإلكتروني"
                          className="form-input flex-1"
                        />
                        <button className="btn-primary">
                          <Send className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-golden-800 mb-3 font-display">إشعارات الجوال</h4>
                      <div className="flex space-x-2 space-x-reverse">
                        <input
                          type="tel"
                          placeholder="رقم الجوال"
                          className="form-input flex-1"
                        />
                        <button className="btn-primary">
                          <Bell className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'emergency' && (
              <div>
                <h2 className="text-xl font-semibold text-islamic-800 mb-6 font-display">أرقام الطوارئ</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {emergencyContacts.map((contact) => (
                    <div key={contact.title} className="card border-l-4 border-red-500">
                      <div className="flex items-center space-x-3 space-x-reverse mb-4">
                        <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                          <contact.icon className={`w-6 h-6 ${contact.color}`} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800 font-display">{contact.title}</h3>
                          <p className="text-sm text-gray-600 font-body">{contact.description}</p>
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-red-600 mb-4 font-display" dir="ltr">{contact.phone}</p>
                        <button className="btn-primary w-full bg-red-600 hover:bg-red-700">
                          <Phone className="w-5 h-5 ml-2" />
                          اتصال فوري
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="card-islamic mt-8">
                  <div className="text-center">
                    <AlertTriangle className="w-16 h-16 text-red-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-red-800 mb-4 font-display">تنبيه مهم</h3>
                    <p className="text-sage-700 font-body leading-relaxed">
                      أرقام الطوارئ مخصصة للحالات العاجلة فقط. للاستفسارات العادية يرجى استخدام القنوات الاعتيادية للتواصل.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Contact Summary */}
        <div className="card-islamic">
          <h3 className="text-lg font-semibold text-islamic-800 mb-6 font-display">ملخص معلومات التواصل</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 islamic-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold text-islamic-800 mb-2 font-display">الهاتف الرئيسي</h4>
              <p className="text-2xl font-bold text-islamic-700 mb-2 font-display" dir="ltr">+970 2 298 2500</p>
              <p className="text-sage-600 font-body">متاح خلال ساعات العمل الرسمية</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 golden-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold text-golden-800 mb-2 font-display">البريد الإلكتروني</h4>
              <p className="text-xl font-bold text-golden-700 mb-2 font-display" dir="ltr">info@awqaf.gov.ps</p>
              <p className="text-sage-600 font-body">للمراسلات الرسمية والاستفسارات</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 sage-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold text-sage-800 mb-2 font-display">العنوان</h4>
              <p className="text-lg font-bold text-sage-700 mb-2 font-display">شارع الإرسال، رام الله</p>
              <p className="text-sage-600 font-body">المقر الرئيسي للوزارة</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;