import React, { useState } from 'react';
import { 
  User, 
  Calendar, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Star, 
  Award, 
  BookOpen, 
  Users, 
  Building, 
  Globe, 
  Heart, 
  Target, 
  CheckCircle, 
  ArrowLeft, 
  Eye, 
  Share2, 
  Bookmark, 
  Download, 
  Upload, 
  Settings, 
  Plus, 
  Edit, 
  Trash2, 
  AlertTriangle, 
  Info, 
  Zap, 
  Activity, 
  TrendingUp, 
  BarChart3, 
  Grid, 
  List, 
  Search, 
  Filter, 
  Send, 
  MessageSquare, 
  Video, 
  Image as ImageIcon, 
  FileText, 
  Mic, 
  Camera, 
  Printer, 
  Save, 
  Copy, 
  ExternalLink, 
  Navigation, 
  Compass, 
  Flag, 
  Archive, 
  Layers, 
  Sparkles, 
  Crown, 
  Gem, 
  HandHeart, 
  GraduationCap, 
  Megaphone, 
  Volume2, 
  VolumeX, 
  Bell, 
  RefreshCw, 
  Briefcase
} from 'lucide-react';
import { useToast } from '../hooks/useToast';

const MinisterPage = () => {
  const { success, info, error: showError } = useToast();
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState('biography');
  const [selectedMedia, setSelectedMedia] = useState<any>(null);

  const ministerInfo = {
    name: 'معالي الدكتور محمد أحمد الخالدي',
    title: 'وزير الأوقاف والشؤون الدينية',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
    biography: `معالي الدكتور محمد أحمد الخالدي، وزير الأوقاف والشؤون الدينية في دولة فلسطين. حاصل على درجة الدكتوراه في الشريعة الإسلامية من جامعة الأزهر الشريف، ولديه خبرة واسعة في مجال الإدارة الدينية والأوقاف.

يؤمن معاليه بأهمية دور الأوقاف في التنمية المجتمعية والاقتصادية، ويسعى لتطوير الخدمات الدينية وتحديث إدارة الأوقاف لتواكب متطلبات العصر مع الحفاظ على الأصالة الإسلامية.`,
    
    achievements: [
      'تطوير نظام إدارة الأوقاف الإلكتروني',
      'إطلاق برنامج صيانة وترميم المساجد التاريخية',
      'تأسيس مركز التعليم الديني المتطور',
      'تطوير برامج الحج والعمرة',
      'إنشاء صندوق التكافل الاجتماعي',
      'تعزيز العلاقات الدينية الدولية'
    ],
    
    education: [
      'دكتوراه في الشريعة الإسلامية - جامعة الأزهر الشريف (2010)',
      'ماجستير في أصول الفقه - الجامعة الإسلامية بغزة (2005)',
      'بكالوريوس في الشريعة والقانون - جامعة النجاح الوطنية (2002)'
    ],
    
    experience: [
      'وزير الأوقاف والشؤون الدينية (2020 - حتى الآن)',
      'نائب وزير الأوقاف (2018 - 2020)',
      'مدير عام الشؤون الدينية (2015 - 2018)',
      'رئيس قسم الفتوى والإرشاد (2012 - 2015)',
      'إمام وخطيب المسجد الكبير (2010 - 2012)'
    ]
  };

  const schedule = [
    {
      id: 1,
      day: 'الأحد',
      time: '9:00 - 11:00',
      activity: 'اجتماع مجلس الوزراء',
      type: 'official',
      location: 'مقر رئاسة الوزراء'
    },
    {
      id: 2,
      day: 'الأحد',
      time: '14:00 - 16:00',
      activity: 'استقبال المواطنين',
      type: 'public',
      location: 'مكتب الوزير'
    },
    {
      id: 3,
      day: 'الاثنين',
      time: '10:00 - 12:00',
      activity: 'زيارة ميدانية للمساجد',
      type: 'field',
      location: 'محافظة رام الله'
    },
    {
      id: 4,
      day: 'الثلاثاء',
      time: '9:00 - 10:30',
      activity: 'اجتماع إدارة الأوقاف',
      type: 'internal',
      location: 'قاعة الاجتماعات'
    },
    {
      id: 5,
      day: 'الأربعاء',
      time: '11:00 - 12:00',
      activity: 'لقاء إعلامي',
      type: 'media',
      location: 'قاعة المؤتمرات'
    },
    {
      id: 6,
      day: 'الخميس',
      time: '14:00 - 16:00',
      activity: 'استقبال المواطنين',
      type: 'public',
      location: 'مكتب الوزير'
    }
  ];

  const mediaGallery = [
    {
      id: 1,
      title: 'كلمة الوزير في افتتاح المؤتمر الديني',
      type: 'video',
      url: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800',
      thumbnail: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=400',
      date: '2024-01-15',
      duration: '15:30',
      views: 12500,
      likes: 890,
      description: 'كلمة معالي الوزير في افتتاح المؤتمر الديني السنوي'
    },
    {
      id: 2,
      title: 'زيارة المسجد الأقصى المبارك',
      type: 'image',
      url: 'https://images.pexels.com/photos/8728380/pexels-photo-8728380.jpeg?auto=compress&cs=tinysrgb&w=800',
      date: '2024-01-10',
      views: 8900,
      likes: 650,
      description: 'زيارة معالي الوزير للمسجد الأقصى المبارك'
    },
    {
      id: 3,
      title: 'خطبة الجمعة من المسجد الكبير',
      type: 'audio',
      url: 'https://images.pexels.com/photos/6686445/pexels-photo-6686445.jpeg?auto=compress&cs=tinysrgb&w=800',
      date: '2024-01-05',
      duration: '25:45',
      views: 15600,
      likes: 1200,
      description: 'خطبة الجمعة لمعالي الوزير من المسجد الكبير'
    },
    {
      id: 4,
      title: 'توقيع اتفاقية تعاون دولية',
      type: 'image',
      url: 'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=800',
      date: '2024-01-03',
      views: 6700,
      likes: 420,
      description: 'توقيع اتفاقية تعاون مع وزارة الأوقاف الأردنية'
    },
    {
      id: 5,
      title: 'افتتاح مسجد جديد',
      type: 'video',
      url: 'https://images.pexels.com/photos/8728380/pexels-photo-8728380.jpeg?auto=compress&cs=tinysrgb&w=800',
      thumbnail: 'https://images.pexels.com/photos/8728380/pexels-photo-8728380.jpeg?auto=compress&cs=tinysrgb&w=400',
      date: '2023-12-28',
      duration: '12:15',
      views: 9800,
      likes: 750,
      description: 'افتتاح مسجد النور الجديد في مدينة نابلس'
    },
    {
      id: 6,
      title: 'كلمة في المؤتمر الإسلامي العالمي',
      type: 'document',
      url: 'https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=800',
      date: '2023-12-20',
      views: 5400,
      likes: 380,
      description: 'نص كلمة معالي الوزير في المؤتمر الإسلامي العالمي'
    }
  ];

  const contactMethods = [
    {
      id: 1,
      title: 'المكتب الرسمي',
      icon: Building,
      details: 'مكتب معالي الوزير - الطابق الخامس',
      contact: '+970 2 298 2500',
      hours: 'الأحد - الخميس: 8:00 ص - 3:00 م',
      type: 'office'
    },
    {
      id: 2,
      title: 'الاستقبال العام',
      icon: Users,
      details: 'استقبال المواطنين والمؤسسات',
      contact: 'حجز موعد مسبق مطلوب',
      hours: 'الثلاثاء والخميس: 2:00 - 4:00 م',
      type: 'public'
    },
    {
      id: 3,
      title: 'البريد الإلكتروني',
      icon: Mail,
      details: 'للمراسلات الرسمية والاستفسارات',
      contact: 'minister@awqaf.gov.ps',
      hours: 'متاح على مدار الساعة',
      type: 'email'
    },
    {
      id: 4,
      title: 'الخط الساخن',
      icon: Phone,
      details: 'للحالات العاجلة والطوارئ',
      contact: '+970 59 123 4567',
      hours: 'متاح 24/7',
      type: 'emergency'
    }
  ];

  const getActivityTypeStyle = (type: string) => {
    switch (type) {
      case 'official':
        return 'bg-blue-100 text-blue-800';
      case 'public':
        return 'bg-green-100 text-green-800';
      case 'field':
        return 'bg-purple-100 text-purple-800';
      case 'internal':
        return 'bg-gray-100 text-gray-800';
      case 'media':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getActivityTypeIcon = (type: string) => {
    switch (type) {
      case 'official':
        return <Building className="w-4 h-4" />;
      case 'public':
        return <Users className="w-4 h-4" />;
      case 'field':
        return <MapPin className="w-4 h-4" />;
      case 'internal':
        return <Settings className="w-4 h-4" />;
      case 'media':
        return <Camera className="w-4 h-4" />;
      default:
        return <Calendar className="w-4 h-4" />;
    }
  };

  const getContactTypeStyle = (type: string) => {
    switch (type) {
      case 'office':
        return 'bg-blue-50 border-blue-200';
      case 'public':
        return 'bg-green-50 border-green-200';
      case 'email':
        return 'bg-purple-50 border-purple-200';
      case 'emergency':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="islamic-gradient text-white rounded-2xl p-8 mb-8 islamic-pattern">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <h1 className="heading-1 text-white mb-4">كلمة معالي الوزير</h1>
              <p className="body-large text-golden-200 mb-6">
                "نسعى لتطوير الخدمات الدينية وإدارة الأوقاف بما يخدم المجتمع الفلسطيني ويحافظ على تراثنا الإسلامي العريق"
              </p>
              <div className="flex items-center space-x-4 space-x-reverse">
                <button
                  onClick={() => setShowScheduleModal(true)}
                  className="btn-golden"
                >
                  <Calendar className="w-5 h-5 ml-2" />
                  حجز موعد
                </button>
                <button
                  onClick={() => setShowMediaModal(true)}
                  className="btn-outline-white"
                >
                  <Video className="w-5 h-5 ml-2" />
                  معرض الوسائط
                </button>
              </div>
            </div>
            <div className="text-center">
              <div className="w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src={ministerInfo.image}
                  alt={ministerInfo.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-xl font-semibold text-white font-display">{ministerInfo.name}</h2>
              <p className="text-golden-200 font-body">{ministerInfo.title}</p>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card-islamic">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-sage-600 font-body">سنوات الخبرة</p>
                <p className="text-3xl font-bold text-islamic-700 font-display">15+</p>
              </div>
              <Award className="w-8 h-8 text-islamic-500" />
            </div>
          </div>
          
          <div className="card-golden">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-sage-600 font-body">المشاريع المنجزة</p>
                <p className="text-3xl font-bold text-golden-700 font-display">120+</p>
              </div>
              <Target className="w-8 h-8 text-golden-500" />
            </div>
          </div>
          
          <div className="card-sage">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-sage-600 font-body">المساجد المطورة</p>
                <p className="text-3xl font-bold text-sage-700 font-display">85</p>
              </div>
              <Building className="w-8 h-8 text-sage-500" />
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-sage-600 font-body">الأسر المستفيدة</p>
                <p className="text-3xl font-bold text-gray-700 font-display">5,200</p>
              </div>
              <Heart className="w-8 h-8 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Content Area */}
          <div className="lg:col-span-2">
            {/* Navigation Tabs */}
            <div className="bg-white rounded-2xl shadow-elegant mb-8">
              <div className="border-b border-sage-200">
                <nav className="flex space-x-8 space-x-reverse px-6">
                  {[
                    { id: 'biography', name: 'السيرة الذاتية', icon: User },
                    { id: 'achievements', name: 'الإنجازات', icon: Award },
                    { id: 'education', name: 'التعليم', icon: GraduationCap },
                    { id: 'experience', name: 'الخبرة', icon: Briefcase },
                    { id: 'media', name: 'الوسائط', icon: Video }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setSelectedTab(tab.id)}
                      className={`flex items-center space-x-2 space-x-reverse py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                        selectedTab === tab.id
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
                {selectedTab === 'biography' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-islamic-800 mb-4 font-display">نبذة عن معالي الوزير</h3>
                      <div className="prose prose-lg max-w-none">
                        <p className="text-sage-700 leading-relaxed font-body">
                          {ministerInfo.biography}
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-islamic-50 p-6 rounded-xl">
                      <h4 className="font-semibold text-islamic-800 mb-3 font-display">الرؤية والرسالة</h4>
                      <blockquote className="text-islamic-700 italic font-body leading-relaxed">
                        "نؤمن بأن الأوقاف ليست مجرد أملاك، بل هي استثمار في المستقبل وخدمة للمجتمع. نسعى لتطوير إدارة الأوقاف لتكون نموذجاً يحتذى به في العالم الإسلامي."
                      </blockquote>
                    </div>
                  </div>
                )}

                {selectedTab === 'achievements' && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-islamic-800 mb-4 font-display">الإنجازات الرئيسية</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {ministerInfo.achievements.map((achievement, index) => (
                        <div key={index} className="bg-golden-50 p-4 rounded-lg border border-golden-200">
                          <div className="flex items-center space-x-3 space-x-reverse">
                            <CheckCircle className="w-5 h-5 text-golden-600" />
                            <span className="text-sage-700 font-body">{achievement}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedTab === 'education' && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-islamic-800 mb-4 font-display">المؤهلات العلمية</h3>
                    <div className="space-y-4">
                      {ministerInfo.education.map((edu, index) => (
                        <div key={index} className="bg-sage-50 p-4 rounded-lg border border-sage-200">
                          <div className="flex items-center space-x-3 space-x-reverse">
                            <GraduationCap className="w-5 h-5 text-sage-600" />
                            <span className="text-sage-700 font-body">{edu}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedTab === 'experience' && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-islamic-800 mb-4 font-display">الخبرة المهنية</h3>
                    <div className="space-y-4">
                      {ministerInfo.experience.map((exp, index) => (
                        <div key={index} className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                          <div className="flex items-center space-x-3 space-x-reverse">
                            <Briefcase className="w-5 h-5 text-blue-600" />
                            <span className="text-sage-700 font-body">{exp}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedTab === 'media' && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-islamic-800 mb-4 font-display">معرض الوسائط</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {mediaGallery.slice(0, 4).map((media) => (
                        <div key={media.id} className="bg-white rounded-lg border border-sage-200 overflow-hidden hover:shadow-lg transition-shadow">
                          <div className="relative">
                            {media.type === 'image' ? (
                              <img src={media.url} alt={media.title} className="w-full h-32 object-cover" />
                            ) : media.type === 'video' ? (
                              <div className="w-full h-32 bg-gray-100 flex items-center justify-center relative">
                                <img src={media.thumbnail} alt={media.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                                  <Video className="w-8 h-8 text-white" />
                                </div>
                                {media.duration && (
                                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                                    {media.duration}
                                  </div>
                                )}
                              </div>
                            ) : media.type === 'audio' ? (
                              <div className="w-full h-32 bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                                <Mic className="w-8 h-8 text-purple-600" />
                                {media.duration && (
                                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                                    {media.duration}
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div className="w-full h-32 bg-gray-100 flex items-center justify-center">
                                <FileText className="w-8 h-8 text-gray-400" />
                              </div>
                            )}
                          </div>
                          <div className="p-3">
                            <h4 className="font-semibold text-gray-800 mb-1 font-body text-sm">{media.title}</h4>
                            <p className="text-xs text-gray-600 mb-2 font-body">{media.description}</p>
                            <div className="flex items-center justify-between">
                              <p className="text-xs text-sage-500 font-body">{new Date(media.date).toLocaleDateString('ar-EG')}</p>
                              <div className="flex items-center space-x-2 space-x-reverse text-xs text-sage-500">
                                <div className="flex items-center space-x-1 space-x-reverse">
                                  <Eye className="w-3 h-3" />
                                  <span>{media.views}</span>
                                </div>
                                <div className="flex items-center space-x-1 space-x-reverse">
                                  <Heart className="w-3 h-3" />
                                  <span>{media.likes}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="text-center">
                      <button
                        onClick={() => setShowMediaModal(true)}
                        className="btn-primary"
                      >
                        عرض جميع الوسائط
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Schedule */}
            <div className="card-islamic">
              <h3 className="text-lg font-semibold text-islamic-800 mb-4 flex items-center font-display">
                <Calendar className="w-5 h-5 ml-2 text-islamic-600" />
                جدول المواعيد الأسبوعي
              </h3>
              <div className="space-y-3">
                {schedule.slice(0, 4).map((item) => (
                  <div key={item.id} className="bg-white p-4 rounded-lg border border-islamic-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-islamic-800 font-body">{item.day}</span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getActivityTypeStyle(item.type)}`}>
                        {getActivityTypeIcon(item.type)}
                      </span>
                    </div>
                    <div className="text-sm text-sage-600 space-y-1">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Clock className="w-3 h-3" />
                        <span className="font-body">{item.time}</span>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <MapPin className="w-3 h-3" />
                        <span className="font-body">{item.location}</span>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-gray-800 mt-2 font-body">{item.activity}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <button
                  onClick={() => setShowScheduleModal(true)}
                  className="btn-primary w-full"
                >
                  <Calendar className="w-5 h-5 ml-2" />
                  عرض الجدول الكامل
                </button>
              </div>
            </div>

            {/* Contact Information */}
            <div className="card-golden">
              <h3 className="text-lg font-semibold text-golden-800 mb-4 flex items-center font-display">
                <Phone className="w-5 h-5 ml-2 text-golden-600" />
                طرق التواصل
              </h3>
              <div className="space-y-3">
                {contactMethods.map((method) => (
                  <div key={method.id} className={`p-4 rounded-lg border ${getContactTypeStyle(method.type)}`}>
                    <div className="flex items-center space-x-3 space-x-reverse mb-2">
                      <method.icon className="w-5 h-5 text-gray-600" />
                      <h4 className="font-semibold text-gray-800 font-body">{method.title}</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-1 font-body">{method.details}</p>
                    <p className="text-sm font-medium text-gray-800 mb-1 font-body">{method.contact}</p>
                    <p className="text-xs text-gray-500 font-body">{method.hours}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card-sage">
              <h3 className="text-lg font-semibold text-sage-800 mb-4 font-display">إجراءات سريعة</h3>
              <div className="space-y-2">
                <button className="w-full flex items-center space-x-2 space-x-reverse px-4 py-3 bg-white text-sage-700 rounded-lg hover:bg-sage-50 transition-colors border border-sage-200">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span className="font-body">حجز موعد</span>
                </button>
                <button className="w-full flex items-center space-x-2 space-x-reverse px-4 py-3 bg-white text-sage-700 rounded-lg hover:bg-sage-50 transition-colors border border-sage-200">
                  <MessageSquare className="w-4 h-4 text-green-600" />
                  <span className="font-body">إرسال رسالة</span>
                </button>
                <button className="w-full flex items-center space-x-2 space-x-reverse px-4 py-3 bg-white text-sage-700 rounded-lg hover:bg-sage-50 transition-colors border border-sage-200">
                  <Download className="w-4 h-4 text-purple-600" />
                  <span className="font-body">تحميل السيرة الذاتية</span>
                </button>
                <button className="w-full flex items-center space-x-2 space-x-reverse px-4 py-3 bg-white text-sage-700 rounded-lg hover:bg-sage-50 transition-colors border border-sage-200">
                  <Share2 className="w-4 h-4 text-orange-600" />
                  <span className="font-body">مشاركة الصفحة</span>
                </button>
              </div>
            </div>

            {/* Office Hours */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 font-display">ساعات المكتب</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-body text-sage-600">استقبال المواطنين</span>
                  <span className="font-bold text-blue-600 font-body">الثلاثاء والخميس 2:00 - 4:00 م</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-body text-sage-600">المواعيد الرسمية</span>
                  <span className="font-bold text-green-600 font-body">الأحد - الخميس 9:00 ص - 3:00 م</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-body text-sage-600">الطوارئ</span>
                  <span className="font-bold text-red-600 font-body">24/7</span>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg mt-4">
                <h4 className="font-semibold text-blue-800 mb-2 font-display">ملاحظة مهمة</h4>
                <p className="text-blue-700 text-sm font-body">
                  يُرجى حجز موعد مسبق لضمان الحصول على الخدمة في الوقت المناسب
                </p>
              </div>
            </div>

            {/* Additional Contact Methods */}
            <div className="bg-white p-6 rounded-xl">
              <h3 className="font-semibold text-sage-800 mb-4 font-display">طرق التواصل الإضافية</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                  <span className="text-sage-700 font-body">واتساب: +970 59 123 4567</span>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <Globe className="w-5 h-5 text-green-600" />
                  <span className="text-sage-700 font-body">تويتر: @minister_awqaf</span>
                </div>
                <div className="flex items-center space-x-3 space-x-reverse">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  <span className="text-sage-700 font-body">حجز موعد: appointments.awqaf.gov.ps</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Media Gallery Modal */}
        {showMediaModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 w-full max-w-6xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="heading-2 text-islamic-800">معرض الوسائط الكامل</h2>
                <button
                  onClick={() => setShowMediaModal(false)}
                  className="text-sage-500 hover:text-sage-700 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {mediaGallery.map((media) => (
                  <div key={media.id} className="bg-white rounded-xl border border-sage-200 overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                      {media.type === 'image' ? (
                        <img src={media.url} alt={media.title} className="w-full h-48 object-cover" />
                      ) : media.type === 'video' ? (
                        <div className="w-full h-48 bg-gray-100 flex items-center justify-center relative">
                          <img src={media.thumbnail} alt={media.title} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                            <Video className="w-12 h-12 text-white" />
                          </div>
                          {media.duration && (
                            <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                              {media.duration}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                          <FileText className="w-12 h-12 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-800 mb-2 font-body">{media.title}</h4>
                      <p className="text-sm text-gray-600 mb-2 font-body">{media.description}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-sage-500 font-body">{new Date(media.date).toLocaleDateString('ar-EG')}</p>
                        <div className="flex items-center space-x-3 space-x-reverse text-xs text-sage-500">
                          <div className="flex items-center space-x-1 space-x-reverse">
                            <Eye className="w-3 h-3" />
                            <span>{media.views}</span>
                          </div>
                          <div className="flex items-center space-x-1 space-x-reverse">
                            <Heart className="w-3 h-3" />
                            <span>{media.likes}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Schedule Modal */}
        {showScheduleModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 w-full max-w-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="heading-2 text-islamic-800">إضافة موعد جديد</h2>
                <button
                  onClick={() => setShowScheduleModal(false)}
                  className="text-sage-500 hover:text-sage-700 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">عنوان الموعد</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="أدخل عنوان الموعد"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">التاريخ</label>
                    <input
                      type="date"
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">الوقت</label>
                    <input
                      type="time"
                      className="form-input"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">المكان</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="مكان الموعد"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-islamic-700 mb-2 font-body">نوع الموعد</label>
                  <select className="form-select">
                    <option value="meeting">اجتماع</option>
                    <option value="internal">داخلي</option>
                    <option value="diplomatic">دبلوماسي</option>
                    <option value="field">ميداني</option>
                    <option value="media">إعلامي</option>
                    <option value="religious">ديني</option>
                    <option value="public">عام</option>
                  </select>
                </div>
                
                <div className="flex justify-end space-x-4 space-x-reverse">
                  <button
                    type="button"
                    onClick={() => setShowScheduleModal(false)}
                    className="btn-outline"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                  >
                    <Save className="w-5 h-5 ml-2" />
                    حفظ الموعد
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MinisterPage;