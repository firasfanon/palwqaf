import React, { useState } from 'react';
import { 
  Map, 
  FileText, 
  Building, 
  Users, 
  Calendar, 
  Heart, 
  Mic, 
  Target,
  Globe,
  Phone,
  Mail,
  Settings,
  Shield,
  Info,
  Search,
  Filter,
  Eye,
  ArrowLeft,
  Home,
  BookOpen,
  Crown,
  Flag,
  Award,
  Navigation
} from 'lucide-react';
import { Link } from 'react-router-dom';

const SitemapPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const siteStructure = [
    {
      category: 'main',
      name: 'الصفحات الرئيسية',
      icon: Home,
      color: 'text-islamic-600',
      pages: [
        { name: 'الصفحة الرئيسية', url: '/', description: 'الصفحة الرئيسية للموقع' },
        { name: 'البحث', url: '/search', description: 'البحث في محتويات الموقع' },
        { name: 'خريطة الموقع', url: '/sitemap', description: 'دليل شامل لصفحات الموقع' }
      ]
    },
    {
      category: 'ministry',
      name: 'الوزارة',
      icon: Building,
      color: 'text-blue-600',
      pages: [
        { name: 'عن الوزارة', url: '/about', description: 'معلومات شاملة عن الوزارة' },
        { name: 'كلمة الوزير', url: '/minister', description: 'السيرة الذاتية وكلمة معالي الوزير' },
        { name: 'الرؤية والرسالة', url: '/vision', description: 'رؤية ورسالة وقيم الوزارة' },
        { name: 'الهيكل التنظيمي', url: '/structure', description: 'التنظيم الإداري للوزارة' },
        { name: 'الوزراء السابقون', url: '/former-ministers', description: 'تاريخ وزراء الأوقاف السابقين' }
      ]
    },
    {
      category: 'services',
      name: 'الخدمات',
      icon: Settings,
      color: 'text-green-600',
      pages: [
        { name: 'الخدمات العامة', url: '/services', description: 'دليل الخدمات المقدمة' },
        { name: 'الخدمات الإلكترونية', url: '/e-services', description: 'الخدمات الرقمية والإلكترونية' },
        { name: 'الخدمات الاجتماعية', url: '/social-services', description: 'برامج الدعم والمساعدات الاجتماعية' },
        { name: 'المساجد', url: '/mosques', description: 'دليل المساجد في فلسطين' },
        { name: 'المشاريع', url: '/projects', description: 'المشاريع والمبادرات الحالية' }
      ]
    },
    {
      category: 'media',
      name: 'مركز الإعلام',
      icon: FileText,
      color: 'text-purple-600',
      pages: [
        { name: 'الأخبار', url: '/news', description: 'آخر أخبار الوزارة والأنشطة' },
        { name: 'الإعلانات', url: '/announcements', description: 'الإعلانات الرسمية والتنبيهات' },
        { name: 'الأنشطة والفعاليات', url: '/activities', description: 'الأنشطة والفعاليات المختلفة' },
        { name: 'خطب الجمعة', url: '/friday-sermons', description: 'مكتبة خطب الجمعة المسجلة' }
      ]
    },
    {
      category: 'contact',
      name: 'التواصل',
      icon: Phone,
      color: 'text-orange-600',
      pages: [
        { name: 'اتصل بنا', url: '/contact', description: 'معلومات التواصل ونموذج الاستفسارات' }
      ]
    },
    {
      category: 'legal',
      name: 'الصفحات القانونية',
      icon: Shield,
      color: 'text-red-600',
      pages: [
        { name: 'سياسة الخصوصية', url: '/privacy', description: 'سياسة حماية البيانات والخصوصية' },
        { name: 'شروط الاستخدام', url: '/terms', description: 'شروط وأحكام استخدام الموقع' }
      ]
    }
  ];

  const categories = [
    { id: 'all', name: 'جميع الصفحات', icon: Map },
    { id: 'main', name: 'الصفحات الرئيسية', icon: Home },
    { id: 'ministry', name: 'الوزارة', icon: Building },
    { id: 'services', name: 'الخدمات', icon: Settings },
    { id: 'media', name: 'مركز الإعلام', icon: FileText },
    { id: 'contact', name: 'التواصل', icon: Phone },
    { id: 'legal', name: 'الصفحات القانونية', icon: Shield }
  ];

  const filteredStructure = siteStructure.filter(section => {
    const matchesCategory = selectedCategory === 'all' || section.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      section.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      section.pages.some(page => 
        page.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        page.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  const totalPages = siteStructure.reduce((sum, section) => sum + section.pages.length, 0);

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="islamic-gradient text-white rounded-2xl p-8 mb-8 islamic-pattern">
          <div className="text-center">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl animate-float">
              <Map className="w-12 h-12 text-islamic-600" />
            </div>
            <h1 className="heading-1 text-white mb-4">خريطة الموقع</h1>
            <p className="body-large text-golden-200 max-w-4xl mx-auto">
              دليل شامل لجميع صفحات وأقسام موقع وزارة الأوقاف والشؤون الدينية
            </p>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card-islamic">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-sage-600 font-body">إجمالي الصفحات</p>
                <p className="text-3xl font-bold text-islamic-700 font-display">{totalPages}</p>
              </div>
              <FileText className="w-8 h-8 text-islamic-500" />
            </div>
          </div>
          
          <div className="card-golden">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-sage-600 font-body">الأقسام الرئيسية</p>
                <p className="text-3xl font-bold text-golden-700 font-display">{siteStructure.length}</p>
              </div>
              <Building className="w-8 h-8 text-golden-500" />
            </div>
          </div>
          
          <div className="card-sage">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-sage-600 font-body">الخدمات</p>
                <p className="text-3xl font-bold text-sage-700 font-display">
                  {siteStructure.find(s => s.category === 'services')?.pages.length || 0}
                </p>
              </div>
              <Settings className="w-8 h-8 text-sage-500" />
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-sage-600 font-body">المحتوى الإعلامي</p>
                <p className="text-3xl font-bold text-gray-700 font-display">
                  {siteStructure.find(s => s.category === 'media')?.pages.length || 0}
                </p>
              </div>
              <FileText className="w-8 h-8 text-gray-500" />
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
                placeholder="البحث في خريطة الموقع..."
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
                <category.icon className="w-5 h-5" />
                <span className="font-body">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Site Structure */}
        <div className="space-y-8">
          {filteredStructure.map((section, index) => (
            <div key={section.category} className={`card-islamic animate-fade-in-up`} style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="flex items-center space-x-4 space-x-reverse mb-6">
                <div className="w-12 h-12 islamic-gradient rounded-xl flex items-center justify-center">
                  <section.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="heading-2 text-islamic-800">{section.name}</h2>
                  <p className="text-sage-600 font-body">{section.pages.length} صفحة</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {section.pages.map((page, pageIndex) => (
                  <Link
                    key={pageIndex}
                    to={page.url}
                    className="block bg-white rounded-lg border border-sage-200 p-4 hover:border-islamic-300 hover:shadow-md transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-islamic-800 group-hover:text-islamic-600 transition-colors font-body">
                        {page.name}
                      </h3>
                      <ArrowLeft className="w-4 h-4 text-sage-400 group-hover:text-islamic-600 group-hover:translate-x-1 transition-all" />
                    </div>
                    <p className="text-sm text-sage-600 font-body">{page.description}</p>
                    <p className="text-xs text-islamic-600 mt-2 font-body">{page.url}</p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Navigation */}
        <div className="bg-white rounded-2xl shadow-elegant p-8 mt-8">
          <h2 className="heading-2 text-islamic-800 mb-6">التنقل السريع</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: 'الرئيسية', url: '/', icon: Home },
              { name: 'الأخبار', url: '/news', icon: FileText },
              { name: 'الخدمات', url: '/services', icon: Settings },
              { name: 'المساجد', url: '/mosques', icon: Building },
              { name: 'الأنشطة', url: '/activities', icon: Calendar },
              { name: 'اتصل بنا', url: '/contact', icon: Phone }
            ].map((link, index) => (
              <Link
                key={index}
                to={link.url}
                className="flex flex-col items-center p-4 bg-islamic-50 rounded-lg hover:bg-islamic-100 transition-colors group"
              >
                <link.icon className="w-8 h-8 text-islamic-600 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-islamic-800 font-body text-center">{link.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Help Section */}
        <div className="islamic-gradient text-white rounded-2xl p-8 mt-8">
          <div className="text-center">
            <h2 className="heading-2 text-white mb-6">هل تحتاج مساعدة في التنقل؟</h2>
            <p className="body-large text-golden-200 mb-8">
              فريق الدعم التقني متاح لمساعدتك في العثور على ما تبحث عنه
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center justify-center space-x-3 space-x-reverse">
                <Phone className="w-6 h-6" />
                <div>
                  <p className="font-semibold font-display text-golden-200">الدعم الهاتفي</p>
                  <p className="opacity-90" dir="ltr">+970 2 298 2540</p>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-3 space-x-reverse">
                <Mail className="w-6 h-6" />
                <div>
                  <p className="font-semibold font-display text-golden-200">البريد الإلكتروني</p>
                  <p className="opacity-90" dir="ltr">support@awqaf.gov.ps</p>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-3 space-x-reverse">
                <Search className="w-6 h-6" />
                <div>
                  <p className="font-semibold font-display text-golden-200">البحث المتقدم</p>
                  <p className="opacity-90 font-body">استخدم صفحة البحث</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SitemapPage;