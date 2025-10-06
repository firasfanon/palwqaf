import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, MapPin, ArrowLeft, Star, Clock, Eye, ChevronLeft, ChevronRight, Play, Image as ImageIcon, Video, Award, Building, BookOpen, Heart, TrendingUp, Globe, Phone, Mail, Newspaper, Megaphone, HandHeart, Fuel as Mosque, GraduationCap, Calculator, FileInput as FileInvoice, Kanban as Kaaba, Skull as Bullhorn, CalendarCheck, Hand as Hands, Video as PhotoVideo, Search as SearchPlus, Facebook, Twitter, Instagram, Youtube, Info, Link as LinkIcon, Handshake, Quote, Target, CheckCircle, Crown, Sparkles, Zap } from 'lucide-react';
import { useData } from '../contexts/DataContext';

const HomePage = () => {
  const { news, announcements, activities } = useData();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState('images');
  const [activeServiceTab, setActiveServiceTab] = useState('zakat');
  const [activeEventTab, setActiveEventTab] = useState('events');
  const [counters, setCounters] = useState({
    mosques: 0,
    imams: 0,
    activities: 0,
    programs: 0
  });

  const heroSlides = [
    {
      id: 1,
      title: 'وزير الأوقاف يشارك في المؤتمر الدولي للوقف الإسلامي',
      subtitle: 'مشاركة فلسطينية مميزة في المؤتمر الدولي',
      description: 'شارك معالي وزير الأوقاف والشؤون الدينية في المؤتمر الدولي للوقف الإسلامي الذي عقد في إسطنبول بمشاركة 40 دولة',
      image: 'https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&w=1920',
      cta: 'اقرأ المزيد'
    },
    {
      id: 2,
      title: 'افتتاح مسجد السلام بعد أعمال الترميم والتطوير',
      subtitle: 'إنجاز جديد في مجال تطوير المساجد',
      description: 'برعاية وزير الأوقاف تم افتتاح مسجد السلام في مدينة نابلس بعد أعمال الترميم والتطوير التي استمرت 6 أشهر',
      image: 'https://images.pexels.com/photos/8107628/pexels-photo-8107628.jpeg?auto=compress&cs=tinysrgb&w=1920',
      cta: 'شاهد التفاصيل'
    },
    {
      id: 3,
      title: 'انطلاق فعاليات مسابقة الأقصى لحفظ القرآن الكريم',
      subtitle: 'الدورة الـ15 من المسابقة القرآنية الكبرى',
      description: 'انطلقت فعاليات الدورة الـ15 من مسابقة الأقصى لحفظ القرآن الكريم بمشاركة 500 متسابق من مختلف المحافظات',
      image: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=1920',
      cta: 'تابع الفعاليات'
    }
  ];

  const mediaGallery = {
    images: [
      { id: 1, src: 'https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'افتتاح مسجد الرحمة في غزة' },
      { id: 2, src: 'https://images.pexels.com/photos/8107628/pexels-photo-8107628.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'المؤتمر السنوي للأئمة والخطباء' },
      { id: 3, src: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'حفل تكريم حفظة القرآن الكريم' },
      { id: 4, src: 'https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'وضع حجر الأساس لمشروع أوقاف جديد' },
      { id: 5, src: 'https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'زيارة ميدانية لمشاريع الأوقاف في الخليل' },
      { id: 6, src: 'https://images.pexels.com/photos/8107628/pexels-photo-8107628.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'ورشة عمل حول إدارة الأوقاف' }
    ],
    videos: [
      { id: 1, thumbnail: 'https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'كلمة وزير الأوقاف في المؤتمر الدولي', duration: '5:30' },
      { id: 2, thumbnail: 'https://images.pexels.com/photos/8107628/pexels-photo-8107628.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'تقرير عن مشاريع الأوقاف في غزة', duration: '3:45' },
      { id: 3, thumbnail: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'حفل تخريج حفظة القرآن الكريم', duration: '8:20' },
      { id: 4, thumbnail: 'https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'جولة في المسجد الأقصى المبارك', duration: '6:15' },
      { id: 5, thumbnail: 'https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'ورشة عمل للأئمة الجدد', duration: '4:30' },
      { id: 6, thumbnail: 'https://images.pexels.com/photos/8107628/pexels-photo-8107628.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'مشروع كفالة الأيتام السنوي', duration: '7:10' }
    ]
  };

  const serviceCategories = {
    zakat: [
      { icon: Calculator, title: 'حساب الزكاة', desc: 'حساب قيمة الزكاة الواجبة على أموالك وفقاً للشريعة الإسلامية' },
      { icon: HandHeart, title: 'دفع الزكاة', desc: 'دفع الزكاة إلكترونياً أو في مراكز الوزارة المعتمدة' },
      { icon: Hands, title: 'طلب مساعدة', desc: 'تقديم طلب للحصول على مساعدة من أموال الزكاة' },
      { icon: FileInvoice, title: 'إيصالات الزكاة', desc: 'الحصول على إيصالات رسمية لدفع الزكاة' }
    ],
    mosques: [
      { icon: Building, title: 'دليل المساجد', desc: 'دليل شامل لجميع المساجد في فلسطين' },
      { icon: Award, title: 'تراخيص بناء المساجد', desc: 'الحصول على تراخيص بناء وترميم المساجد' },
      { icon: TrendingUp, title: 'صيانة المساجد', desc: 'خدمات صيانة وتطوير المساجد' },
      { icon: Crown, title: 'المسجد الأقصى', desc: 'معلومات وخدمات خاصة بالمسجد الأقصى المبارك' }
    ],
    endowments: [
      { icon: BookOpen, title: 'تسجيل الأوقاف', desc: 'تسجيل الأوقاف الجديدة في السجل الرسمي' },
      { icon: Building, title: 'إدارة العقارات الوقفية', desc: 'إدارة وتطوير العقارات الوقفية' },
      { icon: TrendingUp, title: 'استثمار الأوقاف', desc: 'استثمار الأوقاف لتحقيق عوائد مستدامة' },
      { icon: Globe, title: 'قوانين الأوقاف', desc: 'القوانين واللوائح المنظمة للأوقاف' }
    ],
    religious: [
      { icon: BookOpen, title: 'خطبة الجمعة', desc: 'خطب الجمعة الأسبوعية من مختلف المساجد' },
      { icon: Heart, title: 'فتاوى شرعية', desc: 'الحصول على فتاوى شرعية من علماء معتمدين' },
      { icon: GraduationCap, title: 'دورات تحفيظ القرآن', desc: 'دورات تحفيظ القرآن الكريم لجميع الأعمار' },
      { icon: Award, title: 'إجازات قرآنية', desc: 'الحصول على إجازات في القرآن الكريم' }
    ]
  };

  const eventsData = {
    events: [
      {
        id: 1,
        title: 'المؤتمر السنوي للأوقاف الفلسطينية',
        description: 'المؤتمر السنوي لمناقشة تطوير الأوقاف الفلسطينية واستراتيجيات الحفاظ على المقدسات في فلسطين بمشاركة خبراء دوليين',
        date: '2024-06-20',
        time: '10:00',
        location: 'فندق الجراند بارك - رام الله',
        image: 'https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        id: 2,
        title: 'حفل تخريج حفظة القرآن الكريم',
        description: 'حفل تكريم وتخريج الدفعة الجديدة من حفظة القرآن الكريم من مختلف المحافظات الفلسطينية بحضور وزير الأوقاف',
        date: '2024-06-25',
        time: '16:00',
        location: 'مسجد فلسطين - غزة',
        image: 'https://images.pexels.com/photos/8107628/pexels-photo-8107628.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        id: 3,
        title: 'ورشة عمل للأئمة والخطباء الجدد',
        description: 'ورشة عمل تدريبية للأئمة والخطباء الجدد حول تطوير الخطاب الديني وتجديد الفكر الإسلامي في العصر الحديث',
        date: '2024-06-30',
        time: '09:00',
        location: 'مقر الوزارة - البيرة',
        image: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=800'
      }
    ],
    social: [
      {
        id: 1,
        title: 'اجتماع مع وفد من علماء الأزهر الشريف',
        description: 'استقبال وفد رفيع المستوى من علماء الأزهر الشريف لبحث سبل التعاون في الحفاظ على المقدسات الإسلامية في فلسطين',
        date: '2024-06-15',
        time: '11:00',
        location: 'مقر الوزارة - البيرة',
        image: 'https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        id: 2,
        title: 'لقاء مع ممثلي الطوائف المسيحية',
        description: 'لقاء تشاوري مع ممثلي الطوائف المسيحية في فلسطين لمناقشة احتياجات المقدسات المسيحية وآليات الحفاظ عليها',
        date: '2024-06-18',
        time: '14:00',
        location: 'بيت لحم - كنيسة المهد',
        image: 'https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        id: 3,
        title: 'اجتماع اللجنة العليا للأوقاف',
        description: 'اجتماع اللجنة العليا للأوقاف لمراجعة المشاريع الجديدة واعتماد الميزانية السنوية وتقييم أداء المشاريع القائمة',
        date: '2024-06-22',
        time: '10:00',
        location: 'قاعة المؤتمرات - رام الله',
        image: 'https://images.pexels.com/photos/8107628/pexels-photo-8107628.jpeg?auto=compress&cs=tinysrgb&w=800'
      }
    ]
  };

  const importantLinks = [
    {
      icon: BookOpen,
      title: 'الخدمات الدينية',
      links: [
        { name: 'خطبة الجمعة', url: '/friday-sermons' },
        { name: 'فتاوى شرعية', url: '/religious-fatwas' },
        { name: 'دورات تحفيظ القرآن', url: '/quran-courses' },
        { name: 'إجازات قرآنية', url: '/quran-certificates' }
      ]
    },
    {
      icon: Mosque,
      title: 'المساجد والمقدسات',
      links: [
        { name: 'دليل المساجد', url: '/mosques' },
        { name: 'تراخيص بناء المساجد', url: '/mosque-permits' },
        { name: 'صيانة المساجد', url: '/mosque-maintenance' },
        { name: 'المسجد الأقصى', url: '/al-aqsa' }
      ]
    },
    {
      icon: Building,
      title: 'الأوقاف والعقارات',
      links: [
        { name: 'تسجيل الأوقاف', url: '/waqf-registration' },
        { name: 'إدارة العقارات الوقفية', url: '/waqf-properties' },
        { name: 'استثمار الأوقاف', url: '/waqf-investment' },
        { name: 'قوانين الأوقاف', url: '/waqf-laws' }
      ]
    },
    {
      icon: Users,
      title: 'الخدمات المجتمعية',
      links: [
        { name: 'كفالة الأيتام', url: '/orphan-sponsorship' },
        { name: 'مساعدة الأسر المحتاجة', url: '/family-assistance' },
        { name: 'مشاريع التنمية', url: '/development-projects' },
        { name: 'التكافل الاجتماعي', url: '/social-solidarity' }
      ]
    }
  ];

  const socialMediaPosts = [
    {
      platform: 'facebook',
      icon: Facebook,
      title: 'فيسبوك',
      posts: [
        { text: 'انطلاق فعاليات الدورة السنوية لحفظة القرآن الكريم في مدينة غزة بحضور وزير الأوقاف', date: 'منذ 3 أيام' },
        { text: 'افتتاح مسجد الرحمة في مخيم البريج بعد أعمال الترميم والتطوير', date: 'منذ 5 أيام' }
      ]
    },
    {
      platform: 'twitter',
      icon: Twitter,
      title: 'تويتر',
      posts: [
        { text: 'وزير الأوقاف يلتقي وفداً من علماء الأزهر الشريف لبحث سبل التعاون في الحفاظ على المقدسات الإسلامية', date: 'منذ يومين' },
        { text: 'إطلاق تطبيق الوزارة الجديد للخدمات الإلكترونية على الهواتف الذكية', date: 'منذ 4 أيام' }
      ]
    },
    {
      platform: 'instagram',
      icon: Instagram,
      title: 'إنستغرام',
      posts: [
        { text: 'معرض الصور: حفل تكريم حفظة القرآن في رام الله', date: 'منذ يومين' },
        { text: 'جولة معالي الوزير في مشاريع الأوقاف الجديدة في الخليل', date: 'منذ 6 أيام' }
      ]
    }
  ];

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
  const latestAnnouncements = announcements.slice(0, 4);

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
              <div className="container mx-auto px-4">
                <div className="max-w-4xl text-white animate-slide-up">
                  <h1 className="text-4xl md:text-6xl font-bold mb-6 font-display leading-tight text-white">
                    {slide.title}
                  </h1>
                  <h2 className="text-xl md:text-2xl mb-6 text-golden-300 font-display">
                    {slide.subtitle}
                  </h2>
                  <p className="text-lg md:text-xl mb-8 opacity-90 leading-relaxed font-body max-w-3xl">
                    {slide.description}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      to="/news"
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

      {/* Minister Section */}
      <section className="bg-white py-20 -mt-16 relative z-10 shadow-elegant">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            <div className="text-center lg:text-right">
              <div className="w-64 h-80 bg-gradient-to-br from-islamic-600 to-sage-700 rounded-2xl mx-auto lg:mx-0 flex items-center justify-center text-white shadow-xl">
                <div className="text-center">
                  <Crown className="w-16 h-16 mx-auto mb-4 text-golden-300" />
                  <h3 className="text-xl font-bold mb-2 font-display">د. محمد مصطفى نجم</h3>
                  <p className="text-golden-200 font-body">وزير الأوقاف والشؤون الدينية</p>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-4 space-x-reverse mb-6">
                <Quote className="w-12 h-12 text-islamic-600" />
                <h2 className="text-3xl font-bold text-islamic-800 font-display">كلمة معالي الوزير</h2>
              </div>
              
              <div className="space-y-6 text-sage-700 font-body leading-relaxed">
                <p>
                  يسعدني أن أرحب بكم في الموقع الإلكتروني لوزارة الأوقاف والشؤون الدينية الفلسطينية، 
                  الذي يأتي ليكون نافذةً نطل منها على العالم، ووسيلةً للتواصل مع المواطنين والمؤسسات.
                </p>
                <p>
                  تسعى وزارتنا جاهدةً للحفاظ على المقدسات الإسلامية والمسيحية في فلسطين، والعمل على تطوير 
                  المساجد والمؤسسات الدينية، وتعزيز القيم الإسلامية السمحة، ونشر الوعي الديني الصحيح.
                </p>
                <p>
                  كما نولي اهتماماً كبيراً بمشاريع الوقف والزكاة التي تساهم في تنمية المجتمع وتقديم الدعم للمحتاجين. 
                  ونسعى دائماً لتقديم أفضل الخدمات للمواطنين من خلال تبسيط الإجراءات وتطوير أنظمة العمل.
                </p>
              </div>
              
              <div className="mt-8 flex items-center space-x-4 space-x-reverse">
                <div className="text-2xl font-bold text-islamic-600 font-display">د. محمد مصطفى نجم</div>
                <div className="text-sage-600 font-body">وزير الأوقاف والشؤون الدينية الفلسطينية</div>
              </div>
              
              <div className="mt-6">
                <Link
                  to="/minister"
                  className="btn-primary"
                >
                  اقرأ كلمة الوزير كاملة
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Statistics */}
      <section id="stats-section" className="bg-gradient-to-br from-islamic-50 to-golden-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-islamic-800 mb-6 font-display">إنجازاتنا بالأرقام</h2>
            <p className="text-xl text-sage-600 max-w-3xl mx-auto font-body">
              أرقام تعكس حجم العمل والإنجازات التي حققتها الوزارة في خدمة المجتمع الفلسطيني
            </p>
          </div>
          
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
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-islamic-800 mb-4 flex items-center space-x-3 space-x-reverse font-display">
                <Newspaper className="w-8 h-8 text-islamic-600" />
                <span>أخبار الوزارة</span>
              </h2>
              <p className="text-sage-600 font-body">تابع أحدث الأخبار والمستجدات من وزارة الأوقاف</p>
            </div>
            <Link
              to="/news"
              className="flex items-center space-x-2 space-x-reverse text-islamic-600 hover:text-islamic-700 transition-colors group font-body"
            >
              <span>المزيد</span>
              <ArrowLeft className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestNews.map((item, index) => (
              <div key={item.id} className={`card-islamic overflow-hidden animate-slide-up hover-lift`} style={{ animationDelay: `${index * 0.1}s` }}>
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

      {/* Announcements Section */}
      <section className="py-20 bg-gradient-to-br from-golden-50 to-islamic-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-islamic-800 mb-4 flex items-center space-x-3 space-x-reverse font-display">
                <Megaphone className="w-8 h-8 text-golden-600" />
                <span>الإعلانات</span>
              </h2>
              <p className="text-sage-600 font-body">إعلانات وتنبيهات مهمة للمواطنين</p>
            </div>
            <Link
              to="/announcements"
              className="flex items-center space-x-2 space-x-reverse text-islamic-600 hover:text-islamic-700 transition-colors group font-body"
            >
              <span>جميع الإعلانات</span>
              <ArrowLeft className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: CalendarCheck, title: 'مسابقة الاقصى لحفظ القرآن', date: '15 حزيران 2024', content: 'تعلن الوزارة عن فتح باب التسجيل للمشاركة في مسابقة الاقصى السنوية لحفظ القرآن الكريم وتجويده لجميع الفئات العمرية.' },
              { icon: Hands, title: 'مشروع كفالة الأيتام', date: '10 حزيران 2024', content: 'تعلن الوزارة عن بدء مشروع كفالة الأيتام للعام الجديد وتدعو المحسنين للمساهمة في هذا المشروع الخيري.' },
              { icon: Kaaba, title: 'مواعيد حج 1446هـ', date: '5 حزيران 2024', content: 'تعلن الوزارة عن فتح باب التسجيل لحج بيت الله الحرام لعام 1446هـ. يرجى مراجعة أقرب مكتب أوقاف للتسجيل.' },
              { icon: GraduationCap, title: 'دورة تأهيل الأئمة والخطباء', date: '1 حزيران 2024', content: 'تعلن الوزارة عن بدء دورة تأهيل الأئمة والخطباء الجدد. للمتقدمين مراجعة مديرية الأوقاف في محافظتهم.' }
            ].map((ad, index) => (
              <div key={index} className={`card-golden hover-lift animate-slide-up`} style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex items-center space-x-3 space-x-reverse mb-4">
                  <div className="w-12 h-12 golden-gradient rounded-xl flex items-center justify-center">
                    <ad.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-golden-800 font-display">{ad.title}</h3>
                </div>
                <div className="flex items-center text-sm text-golden-600 mb-3">
                  <Calendar className="w-4 h-4 ml-2" />
                  <span className="font-body">{ad.date}</span>
                </div>
                <p className="text-sage-700 font-body leading-relaxed">{ad.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section with Tabs */}
      <section className="py-20 bg-gradient-to-br from-islamic-50 to-white geometric-pattern">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-islamic-800 mb-6 flex items-center justify-center space-x-3 space-x-reverse font-display">
              <HandHeart className="w-8 h-8 text-islamic-600" />
              <span>خدمات الوزارة</span>
            </h2>
            <p className="text-xl text-sage-600 max-w-3xl mx-auto font-body">
              نقدم مجموعة شاملة من الخدمات الدينية والإدارية لخدمة المجتمع الفلسطيني
            </p>
          </div>

          {/* Service Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              { id: 'zakat', name: 'خدمات الزكاة', icon: Calculator },
              { id: 'mosques', name: 'شؤون المساجد', icon: Mosque },
              { id: 'endowments', name: 'خدمات الأوقاف', icon: Building },
              { id: 'religious', name: 'الشؤون الدينية', icon: BookOpen }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveServiceTab(tab.id)}
                className={`flex items-center space-x-2 space-x-reverse px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeServiceTab === tab.id
                    ? 'bg-islamic-600 text-white shadow-islamic'
                    : 'bg-white text-sage-700 hover:bg-islamic-50 hover:text-islamic-700 shadow-soft'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-body">{tab.name}</span>
              </button>
            ))}
          </div>

          {/* Service Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {serviceCategories[activeServiceTab as keyof typeof serviceCategories].map((service, index) => (
              <div key={index} className={`card group animate-slide-up hover-lift`} style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="w-20 h-20 islamic-gradient rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4 font-display">{service.title}</h3>
                <p className="text-sage-600 font-body leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/services"
              className="btn-primary"
            >
              استكشف جميع الخدمات
            </Link>
          </div>
        </div>
      </section>

      {/* Important Links Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-islamic-800 mb-6 flex items-center justify-center space-x-3 space-x-reverse font-display">
              <LinkIcon className="w-8 h-8 text-islamic-600" />
              <span>أهم روابط الوزارة</span>
            </h2>
            <p className="text-xl text-sage-600 max-w-3xl mx-auto font-body">
              روابط سريعة للوصول إلى أهم الخدمات والمعلومات
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {importantLinks.map((linkGroup, index) => (
              <div key={index} className={`card-islamic hover-lift animate-slide-up`} style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="w-16 h-16 islamic-gradient rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <linkGroup.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-islamic-800 mb-4 font-display">{linkGroup.title}</h3>
                <ul className="space-y-3">
                  {linkGroup.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        to={link.url}
                        className="flex items-center space-x-2 space-x-reverse text-sage-700 hover:text-islamic-600 transition-colors font-body"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>{link.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events and Social Activities Section */}
      <section className="py-20 bg-gradient-to-br from-sage-50 to-islamic-50">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-elegant overflow-hidden">
            {/* Header */}
            <div className="islamic-gradient text-white p-8">
              <div className="flex items-center space-x-4 space-x-reverse">
                <Calendar className="w-8 h-8 text-golden-300" />
                <h2 className="text-3xl font-bold text-white font-display">الفعاليات والاجتماعيات</h2>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex bg-islamic-50">
              <button
                onClick={() => setActiveEventTab('events')}
                className={`flex-1 text-center py-4 font-semibold transition-all duration-300 ${
                  activeEventTab === 'events'
                    ? 'text-islamic-700 border-b-3 border-golden-500 bg-white'
                    : 'text-sage-600 hover:text-islamic-600'
                }`}
              >
                الفعاليات
              </button>
              <button
                onClick={() => setActiveEventTab('social')}
                className={`flex-1 text-center py-4 font-semibold transition-all duration-300 ${
                  activeEventTab === 'social'
                    ? 'text-islamic-700 border-b-3 border-golden-500 bg-white'
                    : 'text-sage-600 hover:text-islamic-600'
                }`}
              >
                الاجتماعيات
              </button>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {eventsData[activeEventTab as keyof typeof eventsData].map((event, index) => (
                  <div key={event.id} className={`card-sage hover-lift animate-slide-up`} style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="relative overflow-hidden rounded-xl mb-6">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
                      />
                    </div>
                    <div className="flex items-center text-sm text-sage-600 mb-3">
                      <Calendar className="w-4 h-4 ml-2" />
                      <span className="font-body">{new Date(event.date).toLocaleDateString('ar-EG')}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-sage-800 mb-3 font-display">{event.title}</h3>
                    <p className="text-sage-600 mb-4 font-body leading-relaxed line-clamp-3">{event.description}</p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-sage-600">
                        <MapPin className="w-4 h-4 ml-2" />
                        <span className="font-body">{event.location}</span>
                      </div>
                      <div className="flex items-center text-sm text-sage-600">
                        <Clock className="w-4 h-4 ml-2" />
                        <span className="font-body">{event.time}</span>
                      </div>
                    </div>
                    <Link
                      to="/activities"
                      className="text-islamic-600 hover:text-islamic-700 font-medium font-body group"
                    >
                      <span>التفاصيل</span>
                      <ArrowLeft className="w-4 h-4 inline mr-1 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-8">
                <Link
                  to="/activities"
                  className="text-islamic-600 hover:text-islamic-700 font-medium font-body group"
                >
                  <span>عرض جميع الفعاليات والاجتماعيات</span>
                  <ArrowLeft className="w-5 h-5 inline mr-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Media Gallery */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-elegant overflow-hidden">
            {/* Header */}
            <div className="islamic-gradient text-white p-8">
              <div className="flex items-center space-x-4 space-x-reverse">
                <PhotoVideo className="w-8 h-8 text-golden-300" />
                <h2 className="text-3xl font-bold text-white font-display">معرض الصور والفيديو</h2>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex bg-islamic-50">
              <button
                onClick={() => setActiveTab('images')}
                className={`flex-1 text-center py-4 font-semibold transition-all duration-300 ${
                  activeTab === 'images'
                    ? 'text-islamic-700 border-b-3 border-golden-500 bg-white'
                    : 'text-sage-600 hover:text-islamic-600'
                }`}
              >
                <div className="flex items-center justify-center space-x-2 space-x-reverse">
                  <ImageIcon className="w-5 h-5" />
                  <span>الصور</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('videos')}
                className={`flex-1 text-center py-4 font-semibold transition-all duration-300 ${
                  activeTab === 'videos'
                    ? 'text-islamic-700 border-b-3 border-golden-500 bg-white'
                    : 'text-sage-600 hover:text-islamic-600'
                }`}
              >
                <div className="flex items-center justify-center space-x-2 space-x-reverse">
                  <Video className="w-5 h-5" />
                  <span>الفيديوهات</span>
                </div>
              </button>
            </div>

            {/* Gallery Content */}
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeTab === 'images' ? (
                  mediaGallery.images.map((item, index) => (
                    <div key={item.id} className={`group relative overflow-hidden rounded-2xl shadow-soft hover:shadow-xl transition-all duration-500 animate-scale-in`} style={{ animationDelay: `${index * 0.1}s` }}>
                      <img
                        src={item.src}
                        alt={item.title}
                        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <SearchPlus className="w-12 h-12 text-white bg-islamic-600/80 rounded-full p-3" />
                        </div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <h4 className="text-white font-semibold font-display">{item.title}</h4>
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
                          <h4 className="text-white font-semibold mb-1 font-display">{item.title}</h4>
                          <p className="text-white/80 text-sm">{item.duration}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              
              <div className="text-center mt-8">
                <Link
                  to="/gallery"
                  className="text-islamic-600 hover:text-islamic-700 font-medium font-body group"
                >
                  <span>تصفح المعرض الكامل</span>
                  <ArrowLeft className="w-5 h-5 inline mr-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-20 islamic-gradient text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center justify-center space-x-3 space-x-reverse font-display">
              <Globe className="w-8 h-8 text-golden-300" />
              <span>تواصل معنا على وسائل التواصل</span>
            </h2>
            <p className="text-xl text-golden-200 max-w-3xl mx-auto font-body">
              تابعونا على منصات التواصل الاجتماعي للحصول على آخر الأخبار والتحديثات
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {socialMediaPosts.map((social, index) => (
              <div key={social.platform} className={`bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/15 transition-all duration-300 animate-slide-up`} style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex items-center space-x-4 space-x-reverse mb-6 pb-4 border-b border-white/20">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <social.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white font-display">{social.title}</h3>
                </div>
                
                <div className="space-y-6">
                  {social.posts.map((post, postIndex) => (
                    <div key={postIndex} className="pb-4 border-b border-white/10 last:border-b-0">
                      <p className="text-white/90 mb-3 font-body leading-relaxed">{post.text}</p>
                      <div className="text-white/70 text-sm font-body">{post.date}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-br from-sage-800 to-islamic-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-8 flex items-center space-x-3 space-x-reverse font-display">
                <Info className="w-8 h-8 text-golden-300" />
                <span>معلومات التواصل</span>
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold font-display text-golden-200 mb-1">هاتف</p>
                    <p className="opacity-90 font-body" dir="ltr">02-2411937/8/9</p>
                    <p className="opacity-90 font-body" dir="ltr">فاكس: 02-2411934</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold font-display text-golden-200 mb-1">البريد الإلكتروني</p>
                    <p className="opacity-90 font-body" dir="ltr">info@awqaf.ps</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold font-display text-golden-200 mb-1">العنوان</p>
                    <p className="opacity-90 font-body">القدس - مدينة البيرة - حي الجنان - شارع النور</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
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
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-10 border border-white/20">
              <h3 className="text-2xl font-bold mb-8 font-display text-golden-200">أرسل رسالة</h3>
              <form className="space-y-6">
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