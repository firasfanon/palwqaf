import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube, Globe, Clock, Fan as Fax } from 'lucide-react';

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
        <div className="container-spacing section-padding">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Ministry Information */}
            <div className="content-spacing">
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
            <div className="content-spacing">
              <h3 className="font-bold text-xl font-display border-b border-islamic-600 pb-3 text-golden-300">روابط سريعة</h3>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center space-x-2 space-x-reverse font-body">
                  <span className="w-2 h-2 bg-islamic-500 rounded-full"></span>
                  <span>عن الوزارة</span>
                </a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center space-x-2 space-x-reverse font-body">
                  <span className="w-2 h-2 bg-islamic-500 rounded-full"></span>
                  <span>كلمة الوزير</span>
                </a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center space-x-2 space-x-reverse font-body">
                  <span className="w-2 h-2 bg-islamic-500 rounded-full"></span>
                  <span>الهيكل التنظيمي</span>
                </a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center space-x-2 space-x-reverse font-body">
                  <span className="w-2 h-2 bg-islamic-500 rounded-full"></span>
                  <span>المديريات</span>
                </a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center space-x-2 space-x-reverse font-body">
                  <span className="w-2 h-2 bg-islamic-500 rounded-full"></span>
                  <span>المساجد</span>
                </a></li>
              </ul>
            </div>

            {/* Services */}
            <div className="content-spacing">
              <h3 className="font-bold text-xl font-display border-b border-islamic-600 pb-3 text-golden-300">الخدمات</h3>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center space-x-2 space-x-reverse font-body">
                  <span className="w-2 h-2 bg-golden-500 rounded-full"></span>
                  <span>الخدمات الإلكترونية</span>
                </a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center space-x-2 space-x-reverse font-body">
                  <span className="w-2 h-2 bg-golden-500 rounded-full"></span>
                  <span>إدارة المساجد</span>
                </a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center space-x-2 space-x-reverse font-body">
                  <span className="w-2 h-2 bg-golden-500 rounded-full"></span>
                  <span>الأوقاف الإسلامية</span>
                </a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center space-x-2 space-x-reverse font-body">
                  <span className="w-2 h-2 bg-golden-500 rounded-full"></span>
                  <span>التعليم الديني</span>
                </a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center space-x-2 space-x-reverse font-body">
                  <span className="w-2 h-2 bg-golden-500 rounded-full"></span>
                  <span>الإرشاد والتوجيه</span>
                </a></li>
              </ul>
            </div>

            {/* Contact Information */}
            <div className="content-spacing">
              <h3 className="font-bold text-xl font-display border-b border-islamic-600 pb-3 text-golden-300">معلومات التواصل</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 space-x-reverse">
                  <div className="w-10 h-10 bg-islamic-600 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 shadow-md">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold font-display text-golden-300">العنوان:</p>
                    <p className="text-sm text-gray-300 font-body">رام الله - فلسطين</p>
                    <p className="text-xs text-gray-400 font-body">شارع الإرسال، بجانب المقاطعة</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-10 h-10 bg-islamic-600 rounded-xl flex items-center justify-center shadow-md">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold font-display text-golden-300">هاتف:</p>
                    <p className="text-sm text-gray-300" dir="ltr">+970 2 298 2532</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                    <Fax className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium font-arabic">فاكس:</p>
                    <p className="text-sm text-gray-300" dir="ltr">+970 2 298 2533</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium font-arabic">البريد الإلكتروني:</p>
                    <p className="text-sm text-gray-300" dir="ltr">info@awqaf.gov.ps</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                    <Clock className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium font-arabic">ساعات العمل:</p>
                    <p className="text-sm text-gray-300 font-arabic">الأحد - الخميس</p>
                    <p className="text-xs text-gray-400 font-arabic">8:00 ص - 3:00 م</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      

        {/* Bottom Footer */}
        <div className="border-t border-gray-700 bg-gray-900/50">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-4 space-x-reverse mb-4 md:mb-0">
                <p className="text-gray-400 text-sm font-arabic">
                  © 2024 وزارة الأوقاف والشؤون الدينية - دولة فلسطين. جميع الحقوق محفوظة.
                </p>
              </div>
              <div className="flex items-center space-x-4 space-x-reverse">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Globe className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400 text-sm font-arabic">تم التطوير بواسطة فريق تقنية المعلومات</span>
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