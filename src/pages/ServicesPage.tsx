import React, { useState } from 'react';
import { MapPin, Users, BookOpen, Calendar, Phone, Mail, Clock, Star, ArrowLeft, Search } from 'lucide-react';

const ServicesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const services = [
    {
      id: 1,
      title: 'إدارة المساجد',
      description: 'خدمات إدارة وصيانة المساجد والمرافق الدينية',
      icon: MapPin,
      category: 'mosques',
      features: ['صيانة المساجد', 'إدارة الأوقاف', 'تنظيم الصلوات', 'إدارة الموارد'],
      contactInfo: {
        phone: '+970 2 298 2534',
        email: 'mosques@awqaf.gov.ps',
        hours: 'الأحد - الخميس: 8:00 صباحاً - 3:00 مساءً'
      }
    },
    {
      id: 2,
      title: 'الشؤون الدينية',
      description: 'خدمات الإرشاد الديني والفتاوى الشرعية',
      icon: BookOpen,
      category: 'religious',
      features: ['الفتاوى الشرعية', 'الإرشاد الديني', 'الاستشارات الدينية', 'التوجيه الروحي'],
      contactInfo: {
        phone: '+970 2 298 2535',
        email: 'fatwa@awqaf.gov.ps',
        hours: 'الأحد - الخميس: 8:00 صباحاً - 3:00 مساءً'
      }
    },
    {
      id: 3,
      title: 'التعليم الديني',
      description: 'برامج التعليم الديني والدورات التدريبية',
      icon: BookOpen,
      category: 'education',
      features: ['دورات القرآن الكريم', 'تعليم اللغة العربية', 'الثقافة الإسلامية', 'برامج التأهيل'],
      contactInfo: {
        phone: '+970 2 298 2536',
        email: 'education@awqaf.gov.ps',
        hours: 'الأحد - الخميس: 8:00 صباحاً - 3:00 مساءً'
      }
    },
    {
      id: 4,
      title: 'الأنشطة والفعاليات',
      description: 'تنظيم الأنشطة الدينية والثقافية',
      icon: Calendar,
      category: 'events',
      features: ['المحاضرات الدينية', 'الندوات الثقافية', 'المسابقات القرآنية', 'الأنشطة الاجتماعية'],
      contactInfo: {
        phone: '+970 2 298 2537',
        email: 'events@awqaf.gov.ps',
        hours: 'الأحد - الخميس: 8:00 صباحاً - 3:00 مساءً'
      }
    },
    {
      id: 5,
      title: 'خدمات الحج والعمرة',
      description: 'تنظيم رحلات الحج والعمرة والخدمات المتعلقة بها',
      icon: Users,
      category: 'hajj',
      features: ['تنظيم رحلات الحج', 'رحلات العمرة', 'الإرشاد والتوجيه', 'الخدمات اللوجستية'],
      contactInfo: {
        phone: '+970 2 298 2538',
        email: 'hajj@awqaf.gov.ps',
        hours: 'الأحد - الخميس: 8:00 صباحاً - 3:00 مساءً'
      }
    },
    {
      id: 6,
      title: 'الخدمات الاجتماعية',
      description: 'برامج الدعم الاجتماعي والمساعدات الخيرية',
      icon: Users,
      category: 'social',
      features: ['المساعدات الخيرية', 'برامج الدعم الاجتماعي', 'رعاية الأسر المحتاجة', 'التكافل الاجتماعي'],
      contactInfo: {
        phone: '+970 2 298 2539',
        email: 'social@awqaf.gov.ps',
        hours: 'الأحد - الخميس: 8:00 صباحاً - 3:00 مساءً'
      }
    }
  ];

  const categories = [
    { id: 'all', name: 'جميع الخدمات' },
    { id: 'mosques', name: 'إدارة المساجد' },
    { id: 'religious', name: 'الشؤون الدينية' },
    { id: 'education', name: 'التعليم الديني' },
    { id: 'events', name: 'الأنشطة والفعاليات' },
    { id: 'hajj', name: 'الحج والعمرة' },
    { id: 'social', name: 'الخدمات الاجتماعية' }
  ];

  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="container mx-auto px-4">
        {/* العنوان والبحث */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">خدمات الوزارة</h1>
              <p className="text-gray-600">تعرف على جميع الخدمات المتاحة من وزارة الأوقاف والشؤون الدينية</p>
            </div>
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="relative">
                <Search className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="البحث في الخدمات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10 pl-4 py-2 w-64 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* فلاتر الفئات */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* قائمة الخدمات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div key={service.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center ml-4">
                    <service.icon className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{service.title}</h3>
                    <div className="flex items-center mt-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm text-gray-500 mr-1">(4.8)</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">
                  {service.description}
                </p>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">الخدمات المتاحة:</h4>
                  <ul className="space-y-1">
                    {service.features.map((feature, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full ml-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="border-t pt-4">
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="w-4 h-4 ml-2 text-green-600" />
                      <span>{service.contactInfo.phone}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="w-4 h-4 ml-2 text-green-600" />
                      <span>{service.contactInfo.email}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 ml-2 text-green-600" />
                      <span>{service.contactInfo.hours}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex items-center justify-between">
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                    اطلب الخدمة
                  </button>
                  <button className="flex items-center text-green-600 hover:text-green-700 font-medium">
                    <span>تفاصيل أكثر</span>
                    <ArrowLeft className="w-4 h-4 mr-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* معلومات إضافية */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">معلومات مهمة</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">ساعات العمل</h3>
              <p className="text-gray-600 mb-2">الأحد - الخميس: 8:00 صباحاً - 3:00 مساءً</p>
              <p className="text-gray-600 mb-2">الجمعة - السبت: مغلق</p>
              <p className="text-sm text-gray-500">خدمة الطوارئ متاحة على مدار الساعة</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">كيفية الحصول على الخدمة</h3>
              <ol className="text-gray-600 space-y-1">
                <li>1. اختر الخدمة المطلوبة</li>
                <li>2. تواصل مع القسم المختص</li>
                <li>3. قدم الوثائق المطلوبة</li>
                <li>4. احصل على الخدمة</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;