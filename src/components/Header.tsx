import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Search, Bell, User, Home, Newspaper, Megaphone, Settings, Globe, ChevronDown, Phone, Mail } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [language, setLanguage] = useState('ar');
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show/hide header based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      
      // Add background when scrolled
      setIsScrolled(currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  const navigationItems = [
    { 
      name: 'الرئيسية', 
      href: '/', 
      icon: Home,
      submenu: []
    },
    { 
      name: 'الوزارة', 
      href: '/', 
      icon: Settings,
      submenu: [
        { name: 'كلمة الوزير', href: '/minister' },
        { name: 'الرؤية والرسالة', href: '/vision' },
        { name: 'الهيكل التنظيمي', href: '/structure' },
        { name: 'وزراء سابقون', href: '/former-ministers' }
      ]
    },
    { 
      name: 'الإعلام', 
      href: '/news', 
      icon: Newspaper,
      submenu: [
        { name: 'الاخبار', href: '/news' },
        { name: 'الاعلانات', href: '/announcements' },
        { name: 'الانشطة', href: '/activities' },
        { name: 'خطبة الجمعة', href: '/friday-sermons' }
      ]
    },
    { 
      name: 'الخدمات', 
      href: '/services', 
      icon: Settings,
      submenu: [
        { name: 'الخدمات الإلكترونية', href: '/e-services' },
        { name: 'الخدمات الاجتماعية', href: '/social-services' },
        { name: 'المساجد', href: '/mosques' },
        { name: 'المشاريع', href: '/projects' }
      ]
    },
          { 
      name: 'للتواصل ', 
      href: '/contact', 
      icon: Phone,
      submenu: []
    },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
    document.documentElement.dir = language === 'ar' ? 'ltr' : 'rtl';
    document.documentElement.lang = language === 'ar' ? 'en' : 'ar';
  };

  return (
    <>
      {/* Main Header */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        showHeader ? 'translate-y-0' : '-translate-y-full'
      } ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white'}`}>
        
        {/* Logo and Brand Section */}
        <div className="islamic-gradient text-white py-6 shadow-lg">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6 space-x-reverse">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl animate-float">
                  <div className="w-16 h-16 islamic-gradient rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xl font-display">أوقاف</span>
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl font-bold font-display text-white">وزارة الأوقاف والشؤون الدينية</h1>
                  <p className="text-xl opacity-90 font-body text-golden-200">دولة فلسطين</p>
                </div>
              </div>
              
              {/* Palestinian Flag */}
              <div className="hidden md:flex items-center space-x-4 space-x-reverse">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <div className="flex">
                    <div className="w-10 h-8 bg-black shadow-md"></div>
                    <div className="w-10 h-8 bg-white shadow-md"></div>
                    <div className="w-10 h-8 bg-islamic-500 shadow-md"></div>
                  </div>
                  <div className="w-0 h-0 border-t-[16px] border-t-transparent border-b-[16px] border-b-transparent border-r-[24px] border-r-red-600 shadow-lg"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Navigation Bar */}
        <nav className="bg-white border-b border-gray-200 shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              
              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-8 space-x-reverse">
                {navigationItems.map((item) => (
                  <div key={item.name} className="relative group">
                    <Link
                      to={item.href}
                      className={`flex items-center space-x-2 space-x-reverse px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
                        location.pathname === item.href
                          ? 'text-islamic-600 bg-islamic-50 shadow-sm'
                          : 'text-gray-700 hover:text-islamic-600 hover:bg-islamic-50'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-body">{item.name}</span>
                      {item.submenu.length > 0 && <ChevronDown className="w-4 h-4" />}
                    </Link>
                    
                    {/* Dropdown Menu */}
                    {item.submenu.length > 0 && (
                      <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                        <div className="py-2">
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.name}
                              to={subItem.href}
                              className="block px-4 py-3 text-gray-700 hover:text-islamic-600 hover:bg-islamic-50 transition-colors font-body"
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Search and Actions */}
              <div className="flex items-center space-x-4 space-x-reverse">
                {/* Search Bar */}
                <form onSubmit={handleSearch} className="relative hidden md:block">
                  <div className="flex items-center">
                    <input
                      type="text"
                      placeholder="البحث في الموقع..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-islamic-500 focus:border-transparent font-body"
                    />
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </form>

                {/* Language Toggle */}
                <div className="relative">
                  <button
                    onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                    className="flex items-center space-x-2 space-x-reverse px-3 py-2 text-gray-700 hover:text-islamic-600 transition-colors"
                  >
                    <Globe className="w-5 h-5" />
                    <span className="font-body">{language === 'ar' ? 'العربية' : 'English'}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  
                  {showLanguageMenu && (
                    <div className="absolute top-full right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                      <div className="py-2">
                        <button
                          onClick={() => {
                            setLanguage('ar');
                            setShowLanguageMenu(false);
                          }}
                          className="block w-full text-right px-4 py-2 text-gray-700 hover:text-islamic-600 hover:bg-islamic-50 font-body"
                        >
                          العربية
                        </button>
                        <button
                          onClick={() => {
                            setLanguage('en');
                            setShowLanguageMenu(false);
                          }}
                          className="block w-full text-right px-4 py-2 text-gray-700 hover:text-islamic-600 hover:bg-islamic-50 font-english"
                        >
                          English
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Social Media Links */}
                <div className="hidden md:flex items-center space-x-3 space-x-reverse">
                  <a href="#" className="text-blue-600 hover:text-blue-700 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-blue-500 hover:text-blue-600 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-red-600 hover:text-red-700 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-pink-600 hover:text-pink-700 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                    </svg>
                  </a>
                </div>

                {/* Notifications */}
                <button className="relative p-2 text-gray-600 hover:text-islamic-600 transition-colors">
                  <Bell className="w-6 h-6" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse">
                    <span className="absolute inset-0 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
                  </span>
                </button>
                
                {/* User Menu */}
                {user ? (
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Link
                      to="/admin"
                      className="flex items-center space-x-2 space-x-reverse text-gray-700 hover:text-islamic-600 transition-colors"
                    >
                      <User className="w-5 h-5" />
                      <span className="font-body">لوحة التحكم</span>
                    </Link>
                    <button
                      onClick={logout}
                      className="text-red-600 hover:text-red-700 transition-colors font-body"
                    >
                      تسجيل الخروج
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="flex items-center space-x-2 space-x-reverse bg-islamic-600 text-white px-4 py-2 rounded-lg hover:bg-islamic-700 transition-colors"
                  >
                    <User className="w-5 h-5" />
                    <span className="font-body">تسجيل الدخول</span>
                  </Link>
                )}

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="lg:hidden p-2 text-gray-600 hover:text-islamic-600 transition-colors"
                >
                  {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
              <div className="lg:hidden py-4 border-t border-gray-200 animate-slide-down">
                <div className="flex flex-col space-y-3">
                  {/* Mobile Search */}
                  <form onSubmit={handleSearch} className="relative mb-4">
                    <input
                      type="text"
                      placeholder="البحث في الموقع..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-islamic-500 font-body"
                    />
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </form>

                  {navigationItems.map((item) => (
                    <div key={item.name}>
                      <Link
                        to={item.href}
                        className={`flex items-center space-x-3 space-x-reverse py-3 px-4 rounded-lg transition-colors duration-200 font-medium ${
                          location.pathname === item.href
                            ? 'text-islamic-600 bg-islamic-50'
                            : 'text-gray-700 hover:text-islamic-600 hover:bg-islamic-50'
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <item.icon className="w-5 h-5" />
                        <span className="font-body">{item.name}</span>
                      </Link>
                      
                      {/* Mobile Submenu */}
                      {item.submenu.length > 0 && (
                        <div className="mr-8 mt-2 space-y-2">
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.name}
                              to={subItem.href}
                              className="block py-2 px-4 text-gray-600 hover:text-islamic-600 transition-colors font-body"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
             {/* Breaking News Bar */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-2 text-sm overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex items-center">
            <span className="bg-white text-red-600 px-3 py-1 rounded-full text-xs font-bold ml-4 animate-pulse">
              عاجل
            </span>
            <div className="animate-marquee whitespace-nowrap">
              <span className="mx-8">وزير الأوقاف يفتتح المسجد الجديد في حي الزيتون</span>
              <span className="mx-8">انطلاق مسابقة القرآن الكريم السنوية</span>
              <span className="mx-8">توقيع اتفاقية تعاون مع الجامعة الإسلامية</span>
            </div>
          </div>
        </div>
      </div>
          </div>
        </nav>
      </header>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </>
  );
};

export default Header;