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
      href: '/about', 
      icon: Settings,
      submenu: [
        { name: 'كلمة الوزير', href: '/minister' },
        { name: 'الرؤية والرسالة', href: '/vision' },
        { name: 'الهيكل التنظيمي', href: '/structure' },
        { name: 'وزراء سابقون', href: '/former-ministers' }
      ]
    },
     { 
      name: 'الخدمات الالكترونية', 
      href: '/services', 
      icon: Settings,
      submenu: [
        { name: 'الخدمات الإلكترونية', href: '/e-services' },
        { name: 'الخدمات الاجتماعية', href: '/social-services' },
        { name: 'المساجد', href: '/mosques' },
        { name: 'المشاريع', href: '/projects' },
        { name: 'اتصل بنا', href: '/contact' }
      ]
    },
    { 
      name: 'مركز الاعلام', 
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
      name: 'تواصل معنا', 
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
        </div>  {/* Breaking News Bar */}
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
                          ? 'text-primary-600 bg-primary-50 shadow-sm'
                          : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-arabic">{item.name}</span>
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
                              className="block px-4 py-3 text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-colors font-arabic"
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
                      className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent font-arabic"
                    />
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </form>

                {/* Language Toggle */}
                <div className="relative">
                  <button
                    onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                    className="flex items-center space-x-2 space-x-reverse px-3 py-2 text-gray-700 hover:text-primary-600 transition-colors"
                  >
                    <Globe className="w-5 h-5" />
                    <span className="font-arabic">{language === 'ar' ? 'العربية' : 'English'}</span>
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
                          className="block w-full text-right px-4 py-2 text-gray-700 hover:text-primary-600 hover:bg-primary-50 font-arabic"
                        >
                          العربية
                        </button>
                        <button
                          onClick={() => {
                            setLanguage('en');
                            setShowLanguageMenu(false);
                          }}
                          className="block w-full text-right px-4 py-2 text-gray-700 hover:text-primary-600 hover:bg-primary-50 font-english"
                        >
                          English
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Notifications */}
                <button className="relative p-2 text-gray-600 hover:text-primary-600 transition-colors">
                  <Bell className="w-6 h-6" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                </button>
                
                {/* User Menu */}
                {user ? (
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Link
                      to="/admin"
                      className="flex items-center space-x-2 space-x-reverse text-gray-700 hover:text-primary-600 transition-colors"
                    >
                      <User className="w-5 h-5" />
                      <span className="font-arabic">لوحة التحكم</span>
                    </Link>
                    <button
                      onClick={logout}
                      className="text-red-600 hover:text-red-700 transition-colors font-arabic"
                    >
                      تسجيل الخروج
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="flex items-center space-x-2 space-x-reverse bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    <User className="w-5 h-5" />
                    <span className="font-arabic">تسجيل الدخول</span>
                  </Link>
                )}

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="lg:hidden p-2 text-gray-600 hover:text-primary-600 transition-colors"
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
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 font-arabic"
                    />
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </form>

                  {navigationItems.map((item) => (
                    <div key={item.name}>
                      <Link
                        to={item.href}
                        className={`flex items-center space-x-3 space-x-reverse py-3 px-4 rounded-lg transition-colors duration-200 font-medium ${
                          location.pathname === item.href
                            ? 'text-primary-600 bg-primary-50'
                            : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <item.icon className="w-5 h-5" />
                        <span className="font-arabic">{item.name}</span>
                      </Link>
                      
                      {/* Mobile Submenu */}
                      {item.submenu.length > 0 && (
                        <div className="mr-8 mt-2 space-y-2">
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.name}
                              to={subItem.href}
                              className="block py-2 px-4 text-gray-600 hover:text-primary-600 transition-colors font-arabic"
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