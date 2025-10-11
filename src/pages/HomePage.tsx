import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Users, 
  MapPin, 
  ArrowLeft, 
  Star, 
  Clock, 
  Eye, 
  ChevronLeft, 
  ChevronRight,
  Play,
  Image as ImageIcon,
  Video,
  Award,
  Building,
  BookOpen,
  Heart,
  TrendingUp,
  Globe,
  Phone,
  Mail
} from 'lucide-react';
import { useData } from '../contexts/DataContext';

const HomePage = () => {
  const { news, announcements, activities } = useData();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState('images');
  const [counters, setCounters] = useState({
    mosques: 0,
    imams: 0,
    activities: 0,
    programs: 0
  });

  const heroSlides = [
    {
      id: 1,
      title: 'وزارة الأوقاف والشؤون الدينية',
      subtitle: 'خدمة المجتمع الفلسطيني وتعزيز القيم الدينية',
      description: 'نعمل على إدارة وتطوير الأوقاف الإسلامية وخدمة المساجد والمجتمع الفلسطيني',
      image: 'https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&w=1920',
      cta: 'تعرف على خدماتنا'
    },
    {
      id: 2,
      title: 'إدارة المساجد والأوقاف',
      subtitle: 'نظام متكامل لإدارة المساجد والممتلكات الوقفية',
      description: 'نوفر خدمات شاملة لإدارة المساجد والأوقاف الإسلامية في جميع أنحاء فلسطين',
      image: 'https://images.pexels.com/photos/8107628/pexels-photo-8107628.jpeg?auto=compress&cs=tinysrgb&w=1920',
      cta: 'استكشف الخدمات'
    },
    {
      id: 3,
      title: 'التعليم الديني والإرشاد',
      subtitle: 'برامج تعليمية وإرشادية متميزة',
      description: 'نقدم برامج التعليم الديني والإرشاد الروحي لجميع فئات المجتمع',
      image: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=1920',
      cta: 'تصفح البرامج'
    }
  ];

  const mediaGallery = {
    images: [
      { id: 1, src: 'https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'افتتاح المسجد الجديد' },
      { id: 2, src: 'https://images.pexels.com/photos/8107628/pexels-photo-8107628.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'مسابقة القرآن الكريم' },
      { id: 3, src: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'ورشة عمل الأوقاف' },
      { id: 4, src: 'https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'توقيع اتفاقية تعاون' }
    ],
    videos: [
      { id: 1, thumbnail: 'https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'كلمة الوزير في المؤتمر السنوي', duration: '5:30' },
      { id: 2, thumbnail: 'https://images.pexels.com/photos/8107628/pexels-photo-8107628.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'جولة في المسجد الجديد', duration: '3:45' },
      { id: 3, thumbnail: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'فعاليات شهر رمضان', duration: '8:20' }
    ]
  };

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Animated counters
  useEffect(() => {
    const animateCounters = () => {
      const targets = { mosques: 1247, imams: 356, activities: 89, programs: 45 };
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;

      Object.keys(targets).forEach(key => {
        let current = 0;
        const target = targets[key as keyof typeof targets];
        const increment = target / steps;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          setCounters(prev => ({ ...prev, [key]: Math.floor(current) }));
        }, stepDuration);
      });
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.disconnect();
        }
      });
    });

    const statsSection = document.getElementById('stats-section');
    if (statsSection) observer.observe(statsSection);

    return () => observer.disconnect();
  }, []);

  const latestNews = news.slice(0, 3);
  const latestAnnouncements = announcements.slice(0, 3);
  const upcomingActivities = activities.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Slider */}
      <section className="relative h-screen overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ${
              index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-sage-900/80 via-islamic-900/60 to-transparent"></div>
            </div>
            
            <div className="relative z-10 h-full flex items-center">
              <div className="container-spacing">
                <div className="max-w-3xl text-white animate-slide-up">
                  <h1 className="text-5xl md:text-7xl font-bold mb-8 font-display leading-tight text-white">
                    {slide.title}
                  </h1>
                  <h2 className="text-2xl md:text-3xl mb-8 text-golden-300 font-display">
                    {slide.subtitle}
                  </h2>
                  <p className="text-xl md:text-2xl mb-10 opacity-90 leading-relaxed font-body">
                    {slide.description}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      to="/services"
                      className="btn-primary shadow-islamic"
                    >
                      {slide.cta}
                    </Link>
                    <Link
                      to="/about"
                      className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-islamic-600 transition-all duration-300 transform hover:scale-105 font-body"
                    >
                      تعرف علينا
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slider Controls */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 space-x-reverse z-20">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-golden-400 scale-125 shadow-lg' : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
          className="absolute left-8 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300 z-20"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
          className="absolute right-8 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300 z-20"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </section>

      {/* Animated Statistics */}
      <section id="stats-section" className="bg-white py-20 -mt-16 relative z-10 shadow-elegant">
        <div className="container-spacing">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-24 h-24 islamic-gradient rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-islamic">
                <MapPin className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-5xl font-bold text-islamic-700 mb-3 font-display">{counters.mosques.toLocaleString()}</h3>
              <p className="text-sage-600 font-body text-lg">مسجد مُدار</p>
            </div>
            <div className="text-center group">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-5xl font-bold text-blue-700 mb-3 font-display">{counters.imams.toLocaleString()}</h3>
              <p className="text-sage-600 font-body text-lg">إمام وخطيب</p>
            </div>
            <div className="text-center group">
              <div className="w-24 h-24 golden-gradient rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-warm">
                <Star className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-5xl font-bold text-golden-700 mb-3 font-display">{counters.activities}</h3>
              <p className="text-sage-600 font-body text-lg">نشاط شهري</p>
            </div>
            <div className="text-center group">
              <div className="w-24 h-24 sage-gradient rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-soft">
                <Calendar className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-5xl font-bold text-sage-700 mb-3 font-display">{counters.programs}</h3>
              <p className="text-sage-600 font-body text-lg">برنامج تعليمي</p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="section-padding bg-gradient-to-br from-islamic-50 to-white geometric-pattern">
        <div className="container-spacing">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="heading-2 text-islamic-800 mb-4">آخر الأخبار</h2>
              <p className="body-text text-sage-600">تابع أحدث الأخبار والمستجدات من وزارة الأوقاف</p>
            </div>
            <Link
              to="/news"
              className="flex items-center space-x-2 space-x-reverse text-islamic-600 hover:text-islamic-700 transition-colors group font-body"
            >
              <span>عرض جميع الأخبار</span>
              <ArrowLeft className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestNews.map((item, index) => (
              <div key={item.id} className={`card-islamic overflow-hidden animate-slide-up`} style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-72 object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-islamic-600 text-white px-4 py-2 rounded-full text-sm font-semibold font-body shadow-lg">
                    جديد
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar className="w-4 h-4 ml-2" />
                    <span className="font-body">{new Date(item.date).toLocaleDateString('ar-EG')}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 line-clamp-2 font-display hover:text-islamic-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sage-600 mb-6 line-clamp-3 font-body leading-relaxed">
                    {item.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <Eye className="w-4 h-4 ml-1" />
                      <span className="font-body">{item.views} مشاهدة</span>
                    </div>
                    <Link
                      to={`/news/${item.id}`}
                      className="text-islamic-600 hover:text-islamic-700 font-medium font-body group"
                    >
                      <span>اقرأ المزيد</span>
                      <ArrowLeft className="w-4 h-4 inline mr-1 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Announcements */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-accent-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-4 font-arabic">الإعلانات المهمة</h2>
              <p className="text-gray-600 font-arabic">إعلانات وتنبيهات مهمة للمواطنين</p>
            </div>
            <Link
              to="/announcements"
              className="flex items-center space-x-2 space-x-reverse text-primary-600 hover:text-primary-700 transition-colors group font-arabic"
            >
              <span>عرض جميع الإعلانات</span>
              <ArrowLeft className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestAnnouncements.map((item, index) => (
              <div key={item.id} className={`bg-white rounded-2xl shadow-soft p-6 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 animate-slide-up border-r-4 ${
                item.priority === 'urgent' ? 'border-red-500' :
                item.priority === 'high' ? 'border-orange-500' :
                'border-blue-500'
              }`} style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-4 py-2 rounded-full text-sm font-medium font-arabic ${
                    item.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                    item.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {item.priority === 'urgent' ? 'عاجل' : item.priority === 'high' ? 'مهم' : 'عادي'}
                  </span>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 ml-1" />
                    <span className="font-arabic">{new Date(item.date).toLocaleDateString('ar-EG')}</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3 font-arabic">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-4 font-arabic leading-relaxed">
                  {item.description}
                </p>
                <Link
                  to={`/announcements/${item.id}`}
                  className="text-primary-600 hover:text-primary-700 font-medium font-arabic group"
                >
                  <span>اقرأ التفاصيل</span>
                  <ArrowLeft className="w-4 h-4 inline mr-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-white">
        <div className="container-spacing">
          <div className="text-center mb-16">
            <h2 className="heading-2 text-islamic-800 mb-6">خدماتنا</h2>
            <p className="body-large text-sage-600 max-w-3xl mx-auto">
              نقدم مجموعة شاملة من الخدمات الدينية والإدارية لخدمة المجتمع الفلسطيني
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Building, title: 'إدارة المساجد', desc: 'إدارة وصيانة المساجد والمرافق الدينية', gradient: 'islamic-gradient' },
              { icon: BookOpen, title: 'التعليم الديني', desc: 'برامج تعليمية وتدريبية متخصصة', gradient: 'golden-gradient' },
              { icon: Heart, title: 'الخدمات الاجتماعية', desc: 'برامج الدعم والمساعدات الخيرية', gradient: 'sage-gradient' },
              { icon: Award, title: 'الأنشطة والفعاليات', desc: 'تنظيم الأنشطة الدينية والثقافية', gradient: 'bg-gradient-to-br from-purple-500 to-purple-600' }
            ].map((service, index) => (
              <div key={index} className={`card group animate-slide-up`} style={{ animationDelay: `${index * 0.1}s` }}>
                <div className={`w-20 h-20 ${service.gradient} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4 font-display">{service.title}</h3>
                <p className="text-sage-600 font-body leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/e-services"
              className="btn-primary"
            >
              استكشف جميع الخدمات
            </Link>
          </div>
        </div>
      </section>

      {/* Media Gallery */}
      <section className="py-20 bg-gradient-to-br from-gray-100 to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4 font-arabic">معرض الصور والفيديو</h2>
            <p className="text-xl text-gray-600 font-arabic">شاهد أحدث الفعاليات والأنشطة</p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-full p-2 shadow-lg">
              <button
                onClick={() => setActiveTab('images')}
                className={`flex items-center space-x-2 space-x-reverse px-6 py-3 rounded-full transition-all duration-300 font-arabic ${
                  activeTab === 'images' 
                    ? 'bg-primary-600 text-white shadow-lg' 
                    : 'text-gray-600 hover:text-primary-600'
                }`}
              >
                <ImageIcon className="w-5 h-5" />
                <span>الصور</span>
              </button>
              <button
                onClick={() => setActiveTab('videos')}
                className={`flex items-center space-x-2 space-x-reverse px-6 py-3 rounded-full transition-all duration-300 font-arabic ${
                  activeTab === 'videos' 
                    ? 'bg-primary-600 text-white shadow-lg' 
                    : 'text-gray-600 hover:text-primary-600'
                }`}
              >
                <Video className="w-5 h-5" />
                <span>الفيديو</span>
              </button>
            </div>
          </div>

          {/* Gallery Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {activeTab === 'images' ? (
              mediaGallery.images.map((item, index) => (
                <div key={item.id} className={`group relative overflow-hidden rounded-2xl shadow-soft hover:shadow-xl transition-all duration-500 animate-scale-in`} style={{ animationDelay: `${index * 0.1}s` }}>
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <h4 className="text-white font-semibold font-arabic">{item.title}</h4>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              mediaGallery.videos.map((item, index) => (
                <div key={item.id} className={`group relative overflow-hidden rounded-2xl shadow-soft hover:shadow-xl transition-all duration-500 animate-scale-in`} style={{ animationDelay: `${index * 0.1}s` }}>
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Play className="w-8 h-8 text-white mr-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h4 className="text-white font-semibold mb-1 font-arabic">{item.title}</h4>
                      <p className="text-white/80 text-sm">{item.duration}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding islamic-gradient text-white">
        <div className="container-spacing">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="heading-2 text-white mb-8">تواصل معنا</h2>
              <p className="body-large mb-10 opacity-90 leading-relaxed">
                نحن هنا لخدمتكم والإجابة على استفساراتكم في أي وقت
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold font-display text-golden-200">هاتف</p>
                    <p className="opacity-90" dir="ltr">+970 2 298 2532</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold font-display text-golden-200">البريد الإلكتروني</p>
                    <p className="opacity-90" dir="ltr">info@awqaf.gov.ps</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold font-display text-golden-200">العنوان</p>
                    <p className="opacity-90 font-body">رام الله - فلسطين</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-10 border border-white/20">
              <h3 className="text-2xl font-bold mb-8 font-display text-golden-200">أرسل رسالة</h3>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="الاسم الكامل"
                  className="w-full px-6 py-4 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-golden-400 font-body backdrop-blur-sm"
                />
                <input
                  type="email"
                  placeholder="البريد الإلكتروني"
                  className="w-full px-6 py-4 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-golden-400 font-body backdrop-blur-sm"
                />
                <textarea
                  rows={4}
                  placeholder="الرسالة"
                  className="w-full px-6 py-4 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-golden-400 resize-none font-body backdrop-blur-sm"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-white text-islamic-600 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-300 font-body shadow-lg"
                >
                  إرسال الرسالة
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;