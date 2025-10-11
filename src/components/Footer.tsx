import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube, Globe, Clock, Printer as Fax } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-sage-900 via-sage-800 to-islamic-900 text-white relative overflow-hidden">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full islamic-gradient"></div>
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="islamic-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="2" fill="currentColor" opacity="0.1"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#islamic-pattern)"/>
        </svg>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Ministry Information */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="w-20 h-20 islamic-gradient rounded-full flex items-center justify-center shadow-xl">
                  <span className="text-white font-bold text-xl font-display">أوقاف</span>
                </div>
                <div>
                  <h3 className="font-bold text-2xl font-display text-white">وزارة الأوقاف</h3>
                  <p className="text-sm text-golden-300 font-body">دولة فلسطين</p>
                </div>
              </div>
              <p className="text-gray-300 text-base leading-relaxed font-body">
                وزارة الأوقاف والشؤون الدينية تعمل على خدمة المجتمع الفلسطيني وتعزيز القيم الدينية والتراث الإسلامي منذ تأسيسها.
              </p>
              
              {/* Social Media Links */}
              <div className="pt-4">
                <h4 className="font-semibold mb-4 font-display text-golden-300">تابعنا على:</h4>
                <div className="flex space-x-3 space-x-reverse">
                  <a href="#" className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-all duration-300 hover:scale-110 shadow-lg">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 transition-all duration-300 hover:scale-110 shadow-lg">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-all duration-300 hover:scale-110 shadow-lg">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-all duration-300 hover:scale-110 shadow-lg">
                    <Youtube className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h3 className="font-bold text-xl font-display border-b border-islamic-600 pb-3 text-golden-300">روابط سريعة</h3>
              <ul className="space-y-3 text-sm">
                <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center space-x-2 space-x-reverse font-body">
                  <span className="w-2 h-2 bg-islamic-500 rounded-full"></span>
                  <span>عن الوزارة</span>
                </Link></li>
                <li><Link to="/minister" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center space-x-2 space-x-reverse font-body">
                  <span className="w-2 h-2 bg-islamic-500 rounded-full"></span>
                  <span>كلمة الوزير</span>
                </Link></li>
                <li><Link to="/structure" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center space-x-2 space-x-reverse font-body">
                  <span className="w-2 h-2 bg-islamic-500 rounded-full"></span>
                  <span>الهيكل التنظيمي</span>
                </Link></li>
                <li><Link to="/news" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center space-x-2 space-x-reverse font-body">
                  <span className="w-2 h-2 bg-islamic-500 rounded-full"></span>
                  <span>أخبار الوزارة</span>
                </Link></li>
                <li><Link to="/mosques" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center space-x-2 space-x-reverse font-body">
                  <span className="w-2 h-2 bg-islamic-500 rounded-full"></span>
                  <span>المساجد</span>
                </Link></li>
              </ul>
            </div>

            {/* Services */}
            <div className="space-y-6">
              <h3 className="font-bold text-xl font-display border-b border-islamic-600 pb-3 text-golden-300">الخدمات</h3>
              <ul className="space-y-3 text-sm">
                <li><Link to="/e-services" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center space-x-2 space-x-reverse font-body">
                  <span className="w-2 h-2 bg-golden-500 rounded-full"></span>
                  <span>الخدمات الإلكترونية</span>
                </Link></li>
                <li><Link to="/mosques" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center space-x-2 space-x-reverse font-body">
                  <span className="w-2 h-2 bg-golden-500 rounded-full"></span>
                  <span>إدارة المساجد</span>
                </Link></li>
                <li><Link to="/services" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center space-x-2 space-x-reverse font-body">
                  <span className="w-2 h-2 bg-golden-500 rounded-full"></span>
                  <span>الأوقاف الإسلامية</span>
                </Link></li>
                <li><Link to="/friday-sermons" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center space-x-2 space-x-reverse font-body">
                  <span className="w-2 h-2 bg-golden-500 rounded-full"></span>
                  <span>التعليم الديني</span>
                </Link></li>
                <li><Link to="/social-services" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center space-x-2 space-x-reverse font-body">
                  <span className="w-2 h-2 bg-golden-500 rounded-full"></span>
                  <span>الإرشاد والتوجيه</span>
                </Link></li>
              </ul>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <h3 className="font-bold text-xl font-display border-b border-islamic-600 pb-3 text-golden-300">معلومات التواصل</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="w-14 h-14 bg-islamic-600 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold font-display text-golden-200 mb-1">هاتف</p>
                    <p className="opacity-90 font-body" dir="ltr">02-2411937/8/9</p>
                    <p className="opacity-90 font-body" dir="ltr">فاكس: 02-2411934</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="w-14 h-14 bg-islamic-600 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold font-display text-golden-200 mb-1">البريد الإلكتروني</p>
                    <p className="opacity-90 font-body" dir="ltr">info@awqaf.ps</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="w-14 h-14 bg-islamic-600 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold font-display text-golden-200 mb-1">العنوان</p>
                    <p className="opacity-90 font-body">القدس - مدينة البيرة - حي الجنان - شارع النور</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="w-14 h-14 bg-islamic-600 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold font-display text-golden-200 mb-1">ساعات العمل</p>
                    <p className="opacity-90 font-body">من الأحد إلى الخميس</p>
                    <p className="opacity-90 font-body">8:00 صباحاً - 3:00 مساءً</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Partners Section */}
          <div className="mt-12 pt-8 border-t border-gray-700">
            <h3 className="font-bold text-xl font-display text-golden-300 mb-6 text-center">شركاؤنا</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                'وزارة المالية',
                'وزارة التربية',
                'وزارة الأوقاف الأردنية',
                'صندوق الزكاة',
                'رابطة العالم الإسلامي',
                'الأوقاف المصرية'
              ].map((partner, index) => (
                <div key={index} className="bg-white rounded-lg p-4 text-center shadow-md hover:shadow-lg transition-shadow">
                  <span className="text-islamic-600 font-bold text-sm font-body">{partner}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700 bg-gray-900/50">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-4 space-x-reverse mb-4 md:mb-0">
                <p className="text-gray-400 text-sm font-body">
                  © 2024 وزارة الأوقاف والشؤون الدينية - دولة فلسطين. جميع الحقوق محفوظة.
                </p>
              </div>
              <div className="flex items-center space-x-4 space-x-reverse">
                <Link to="/privacy" className="text-gray-400 hover:text-white text-sm font-body transition-colors">
                  سياسة الخصوصية
                </Link>
                <Link to="/terms" className="text-gray-400 hover:text-white text-sm font-body transition-colors">
                  شروط الاستخدام
                </Link>
                <Link to="/sitemap" className="text-gray-400 hover:text-white text-sm font-body transition-colors">
                  خريطة الموقع
                </Link>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Globe className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400 text-sm font-body">تم التطوير بواسطة فريق تقنية المعلومات</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;