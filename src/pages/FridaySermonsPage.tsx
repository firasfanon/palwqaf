import React, { useState } from 'react';
import { 
  Mic, 
  Calendar, 
  Download, 
  Play, 
  Pause, 
  Volume2, 
  FileText, 
  Search, 
  Filter,
  Eye,
  Heart,
  Share2,
  Bookmark,
  Clock,
  User,
  MapPin,
  Star,
  ArrowLeft,
  Headphones,
  Video,
  BookOpen,
  Award,
  Target,
  Globe,
  Building,
  Users,
  MessageSquare,
  ThumbsUp,
  Music,
  Radio,
  Sparkles,
  Zap
} from 'lucide-react';

const FridaySermonsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFormat, setSelectedFormat] = useState('all');
  const [selectedSermon, setSelectedSermon] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [playingSermon, setPlayingSermon] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const sermons = [
    {
      id: 1,
      title: 'أهمية الصلاة في حياة المسلم',
      description: 'خطبة تتناول أهمية الصلاة ومكانتها في الإسلام وأثرها على حياة المؤمن الروحية والاجتماعية',
      preacher: 'الشيخ محمد أحمد الأحمد',
      mosque: 'المسجد الكبير - القدس',
      date: '2024-01-19',
      duration: '25:30',
      category: 'worship',
      topic: 'العبادات',
      language: 'العربية',
      views: 1250,
      likes: 89,
      downloads: 156,
      rating: 4.8,
      image: 'https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&w=800',
      audioUrl: '/sermons/prayer-importance.mp3',
      videoUrl: '/sermons/prayer-importance.mp4',
      textUrl: '/sermons/prayer-importance.pdf',
      formats: ['audio', 'video', 'text'],
      tags: ['الصلاة', 'العبادة', 'الإيمان', 'التقوى'],
      summary: 'تناولت الخطبة أهمية الصلاة كركن من أركان الإسلام وأثرها في تهذيب النفس وتقوية الصلة بالله',
      keyPoints: [
        'الصلاة عماد الدين وركنه الأساسي',
        'أثر الصلاة في تطهير النفس من الذنوب',
        'الصلاة تنهى عن الفحشاء والمنكر',
        'أهمية الخشوع والحضور في الصلاة'
      ],
      references: [
        'القرآن الكريم: سورة البقرة آية 45',
        'صحيح البخاري: كتاب الصلاة',
        'صحيح مسلم: كتاب الإيمان',
        'سنن أبي داود: كتاب الطهارة'
      ]
    },
    {
      id: 2,
      title: 'بر الوالدين في الإسلام',
      description: 'خطبة عن فضل بر الوالدين ومكانتهما في الإسلام وواجب الأبناء نحو والديهم',
      preacher: 'الدكتور خالد يوسف العمري',
      mosque: 'مسجد عمر بن الخطاب - رام الله',
      date: '2024-01-12',
      duration: '28:15',
      category: 'family',
      topic: 'الأسرة والمجتمع',
      language: 'العربية',
      views: 980,
      likes: 67,
      downloads: 123,
      rating: 4.9,
      image: 'https://images.pexels.com/photos/8107628/pexels-photo-8107628.jpeg?auto=compress&cs=tinysrgb&w=800',
      audioUrl: '/sermons/parents-kindness.mp3',
      videoUrl: '/sermons/parents-kindness.mp4',
      textUrl: '/sermons/parents-kindness.pdf',
      formats: ['audio', 'video', 'text'],
      tags: ['بر الوالدين', 'الأسرة', 'الأخلاق', 'الطاعة'],
      summary: 'خطبة مؤثرة عن أهمية بر الوالدين وحقوقهما على الأبناء في الدنيا والآخرة',
      keyPoints: [
        'بر الوالدين من أعظم القربات إلى الله',
        'حقوق الوالدين في الكبر والضعف',
        'الدعاء للوالدين بعد موتهما',
        'عقوق الوالدين من كبائر الذنوب'
      ]
    },
    {
      id: 3,
      title: 'الصدق والأمانة في التجارة',
      description: 'خطبة تتناول أخلاق التاجر المسلم وأهمية الصدق والأمانة في المعاملات التجارية',
      preacher: 'الشيخ أحمد محمود الزهار',
      mosque: 'المسجد العمري الكبير - غزة',
      date: '2024-01-05',
      duration: '22:45',
      category: 'ethics',
      topic: 'الأخلاق والمعاملات',
      language: 'العربية',
      views: 756,
      likes: 45,
      downloads: 89,
      rating: 4.7,
      image: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=800',
      audioUrl: '/sermons/trade-ethics.mp3',
      videoUrl: '/sermons/trade-ethics.mp4',
      textUrl: '/sermons/trade-ethics.pdf',
      formats: ['audio', 'video', 'text'],
      tags: ['الصدق', 'الأمانة', 'التجارة', 'المعاملات'],
      summary: 'خطبة عملية عن أهمية الأخلاق الإسلامية في التجارة والمعاملات المالية'
    },
    {
      id: 4,
      title: 'فضل شهر رمضان المبارك',
      description: 'خطبة عن فضائل شهر رمضان وأحكام الصيام وآدابه والاستعداد الروحي للشهر الكريم',
      preacher: 'الدكتور نور الدين محمد حسن',
      mosque: 'مسجد الفاروق - نابلس',
      date: '2024-03-08',
      duration: '30:20',
      category: 'seasonal',
      topic: 'المواسم الدينية',
      language: 'العربية',
      views: 1450,
      likes: 112,
      downloads: 234,
      rating: 4.9,
      image: 'https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=800',
      audioUrl: '/sermons/ramadan-virtues.mp3',
      videoUrl: '/sermons/ramadan-virtues.mp4',
      textUrl: '/sermons/ramadan-virtues.pdf',
      formats: ['audio', 'video', 'text'],
      tags: ['رمضان', 'الصيام', 'التقوى', 'الروحانية'],
      summary: 'خطبة شاملة عن استقبال شهر رمضان وكيفية الاستفادة من بركاته وفضائله'
    },
    {
      id: 5,
      title: 'العدالة الاجتماعية في الإسلام',
      description: 'خطبة عن مفهوم العدالة الاجتماعية في الإسلام وتطبيقها في المجتمع المعاصر',
      preacher: 'الدكتور عبد الرحمن الخالدي',
      mosque: 'مسجد الرحمة - الخليل',
      date: '2024-02-23',
      duration: '26:10',
      category: 'social',
      topic: 'القضايا الاجتماعية',
      language: 'العربية',
      views: 892,
      likes: 58,
      downloads: 134,
      rating: 4.6,
      image: 'https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&w=800',
      audioUrl: '/sermons/social-justice.mp3',
      videoUrl: '/sermons/social-justice.mp4',
      textUrl: '/sermons/social-justice.pdf',
      formats: ['audio', 'video', 'text'],
      tags: ['العدالة', 'المجتمع', 'الحقوق', 'المساواة'],
      summary: 'خطبة تناقش مبادئ العدالة الاجتماعية في الإسلام وتطبيقها في الواقع المعاصر'
    },
    {
      id: 6,
      title: 'الصبر والثبات في المحن',
      description: 'خطبة عن أهمية الصبر في مواجهة المحن والابتلاءات وكيفية التعامل معها بالإيمان',
      preacher: 'الشيخ سالم عبد الله قاسم',
      mosque: 'مسجد الأقصى المبارك - القدس',
      date: '2024-02-16',
      duration: '24:55',
      category: 'spiritual',
      topic: 'التربية الروحية',
      language: 'العربية',
      views: 1180,
      likes: 95,
      downloads: 187,
      rating: 4.8,
      image: 'https://images.pexels.com/photos/8107628/pexels-photo-8107628.jpeg?auto=compress&cs=tinysrgb&w=800',
      audioUrl: '/sermons/patience-trials.mp3',
      videoUrl: '/sermons/patience-trials.mp4',
      textUrl: '/sermons/patience-trials.pdf',
      formats: ['audio', 'video', 'text'],
      tags: ['الصبر', 'الابتلاء', 'الإيمان', 'الثبات'],
      summary: 'خطبة روحانية عن فضل الصبر وأجره عند الله وكيفية التحلي به في الشدائد'
    }
  ];

  const categories = [
    { id: 'all', name: 'جميع الخطب', icon: Mic, color: 'text-islamic-600' },
    { id: 'worship', name: 'العبادات', icon: BookOpen, color: 'text-green-600' },
    { id: 'family', name: 'الأسرة والمجتمع', icon: Users, color: 'text-blue-600' },
    { id: 'ethics', name: 'الأخلاق والمعاملات', icon: Heart, color: 'text-purple-600' },
    { id: 'seasonal', name: 'المواسم الدينية', icon: Calendar, color: 'text-orange-600' },
    { id: 'social', name: 'القضايا الاجتماعية', icon: Globe, color: 'text-teal-600' },
    { id: 'spiritual', name: 'التربية الروحية', icon: Sparkles, color: 'text-pink-600' }
  ];

  const formatOptions = [
    { id: 'all', name: 'جميع الصيغ' },
    { id: 'audio', name: 'صوتي' },
    { id: 'video', name: 'فيديو' },
    { id: 'text', name: 'نص' }
  ];

  const filteredSermons = sermons.filter(sermon => {
    const matchesSearch = sermon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sermon.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sermon.preacher.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || sermon.category === selectedCategory;
    const matchesFormat = selectedFormat === 'all' || sermon.formats.includes(selectedFormat);
    return matchesSearch && matchesCategory && matchesFormat;
  });

  const totalPages = Math.ceil(filteredSermons.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentSermons = filteredSermons.slice(startIndex, startIndex + itemsPerPage);

  const togglePlay = (sermonId: number) => {
    setPlayingSermon(playingSermon === sermonId ? null : sermonId);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="islamic-gradient text-white rounded-2xl p-8 mb-8 islamic-pattern">
          <div className="text-center">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl animate-float">
              <Mic className="w-12 h-12 text-islamic-600" />
            </div>
            <h1 className="heading-1 text-white mb-4">خطب الجمعة</h1>
            <p className="body-large text-golden-200 max-w-4xl mx-auto">
              مكتبة شاملة من خطب الجمعة المسجلة والمكتوبة من أفضل الخطباء في فلسطين
            </p>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card-islamic">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-sage-600 font-body">إجمالي الخطب</p>
                <p className="text-3xl font-bold text-islamic-700 font-display">{sermons.length}</p>
              </div>
              <Mic className="w-8 h-8 text-islamic-500" />
            </div>
          </div>
          
          <div className="card-golden">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-sage-600 font-body">إجمالي المشاهدات</p>
                <p className="text-2xl font-bold text-golden-700 font-display">
                  {sermons.reduce((sum, s) => sum + s.views, 0).toLocaleString()}
                </p>
              </div>
              <Eye className="w-8 h-8 text-golden-500" />
            </div>
          </div>
          
          <div className="card-sage">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-sage-600 font-body">إجمالي التحميلات</p>
                <p className="text-2xl font-bold text-sage-700 font-display">
                  {sermons.reduce((sum, s) => sum + s.downloads, 0).toLocaleString()}
                </p>
              </div>
              <Download className="w-8 h-8 text-sage-500" />
            </div>
          </div>
          
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-sage-600 font-body">الخطباء</p>
                <p className="text-3xl font-bold text-gray-700 font-display">
                  {new Set(sermons.map(s => s.preacher)).size}
                </p>
              </div>
              <Users className="w-8 h-8 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-elegant p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute right-3 top-3 h-5 w-5 text-sage-400" />
              <input
                type="text"
                placeholder="البحث في خطب الجمعة..."
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
            
            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
              className="form-select"
            >
              {formatOptions.map(format => (
                <option key={format.id} value={format.id}>{format.name}</option>
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
                <category.icon className={`w-5 h-5 ${selectedCategory === category.id ? 'text-white' : category.color}`} />
                <span className="font-body">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Sermons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {currentSermons.map((sermon, index) => (
            <div key={sermon.id} className={`card-islamic hover-lift animate-fade-in-up`} style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="relative overflow-hidden rounded-xl mb-6">
                <img
                  src={sermon.image}
                  alt={sermon.title}
                  className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Clock className="w-4 h-4 text-white" />
                        <span className="text-white text-sm font-body">{sermon.duration}</span>
                      </div>
                      <button
                        onClick={() => togglePlay(sermon.id)}
                        className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                      >
                        {playingSermon === sermon.id ? 
                          <Pause className="w-6 h-6 text-white" /> : 
                          <Play className="w-6 h-6 text-white mr-1" />
                        }
                      </button>
                    </div>
                  </div>
                </div>
                <div className="absolute top-4 right-4 flex space-x-2 space-x-reverse">
                  <div className="flex items-center space-x-1 space-x-reverse bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                    <Star className="w-4 h-4 text-golden-500 fill-current" />
                    <span className="text-sm font-bold text-gray-800">{sermon.rating}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-islamic-800 mb-2 line-clamp-2 font-display">
                    {sermon.title}
                  </h3>
                  <p className="text-sage-600 line-clamp-3 font-body leading-relaxed">
                    {sermon.description}
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 space-x-reverse text-sm">
                    <User className="w-4 h-4 text-sage-400" />
                    <span className="text-sage-600 font-body">{sermon.preacher}</span>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse text-sm">
                    <Building className="w-4 h-4 text-sage-400" />
                    <span className="text-sage-600 font-body">{sermon.mosque}</span>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse text-sm">
                    <Calendar className="w-4 h-4 text-sage-400" />
                    <span className="text-sage-600 font-body">{new Date(sermon.date).toLocaleDateString('ar-EG')}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <div className="flex items-center space-x-1 space-x-reverse">
                      <Eye className="w-4 h-4 text-sage-400" />
                      <span className="text-sage-600 font-body">{sermon.views}</span>
                    </div>
                    <div className="flex items-center space-x-1 space-x-reverse">
                      <ThumbsUp className="w-4 h-4 text-sage-400" />
                      <span className="text-sage-600 font-body">{sermon.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1 space-x-reverse">
                      <Download className="w-4 h-4 text-sage-400" />
                      <span className="text-sage-600 font-body">{sermon.downloads}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-sage-200">
                  <button 
                    onClick={() => {
                      setSelectedSermon(sermon);
                      setShowModal(true);
                    }}
                    className="text-islamic-600 hover:text-islamic-700 font-medium font-body group"
                  >
                    <span>عرض التفاصيل</span>
                    <ArrowLeft className="w-4 h-4 inline mr-1 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <button className="text-golden-600 hover:text-golden-700 transition-colors">
                      <Bookmark className="w-4 h-4" />
                    </button>
                    <button className="text-blue-600 hover:text-blue-700 transition-colors">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-2 space-x-reverse">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-sage-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-sage-50 transition-colors font-body"
              >
                السابق
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 border rounded-lg transition-colors font-body ${
                    currentPage === page
                      ? 'bg-islamic-600 text-white border-islamic-600'
                      : 'border-sage-300 hover:bg-sage-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border border-sage-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-sage-50 transition-colors font-body"
              >
                التالي
              </button>
            </div>
          </div>
        )}

        {/* Featured Sermons */}
        <div className="bg-white rounded-2xl shadow-elegant p-8">
          <h2 className="heading-2 text-islamic-800 mb-6">الخطب المميزة</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sermons.filter(s => s.rating >= 4.8).slice(0, 3).map((sermon) => (
              <div key={sermon.id} className="bg-gradient-to-br from-islamic-50 to-golden-50 rounded-xl p-6 border border-islamic-200">
                <div className="flex items-center space-x-3 space-x-reverse mb-4">
                  <div className="w-12 h-12 islamic-gradient rounded-xl flex items-center justify-center">
                    <Mic className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-islamic-800 font-display line-clamp-1">{sermon.title}</h3>
                    <p className="text-sm text-sage-600 font-body">{sermon.preacher}</p>
                  </div>
                  <div className="flex items-center space-x-1 space-x-reverse">
                    <Star className="w-4 h-4 text-golden-500 fill-current" />
                    <span className="text-sm font-bold text-golden-700">{sermon.rating}</span>
                  </div>
                </div>
                <p className="text-sage-600 text-sm mb-4 font-body line-clamp-2">{sermon.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-islamic-600 font-body">{sermon.duration}</span>
                  <button className="text-islamic-600 hover:text-islamic-700 text-sm font-medium font-body">
                    استمع الآن
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sermon Details Modal */}
      {showModal && selectedSermon && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="heading-2 text-islamic-800">تفاصيل الخطبة</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-sage-500 hover:text-sage-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <img
                    src={selectedSermon.image}
                    alt={selectedSermon.title}
                    className="w-full h-64 object-cover rounded-xl shadow-lg"
                  />
                </div>
                
                <div className="bg-islamic-50 p-6 rounded-xl">
                  <h3 className="font-semibold text-islamic-800 mb-3 font-display">معلومات الخطبة</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <User className="w-5 h-5 text-islamic-600" />
                      <span className="font-body text-sage-700">{selectedSermon.preacher}</span>
                    </div>
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <Building className="w-5 h-5 text-golden-600" />
                      <span className="font-body text-sage-700">{selectedSermon.mosque}</span>
                    </div>
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      <span className="font-body text-sage-700">{new Date(selectedSermon.date).toLocaleDateString('ar-EG')}</span>
                    </div>
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <Clock className="w-5 h-5 text-purple-600" />
                      <span className="font-body text-sage-700">{selectedSermon.duration}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-golden-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-golden-800 mb-3 font-display">الصيغ المتاحة</h4>
                  <div className="flex space-x-3 space-x-reverse">
                    {selectedSermon.formats.includes('audio') && (
                      <button className="flex items-center space-x-2 space-x-reverse bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <Headphones className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-body">صوتي</span>
                      </button>
                    )}
                    {selectedSermon.formats.includes('video') && (
                      <button className="flex items-center space-x-2 space-x-reverse bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <Video className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-body">فيديو</span>
                      </button>
                    )}
                    {selectedSermon.formats.includes('text') && (
                      <button className="flex items-center space-x-2 space-x-reverse bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <FileText className="w-4 h-4 text-purple-600" />
                        <span className="text-sm font-body">نص</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="heading-3 text-islamic-800 mb-3">{selectedSermon.title}</h3>
                  <p className="body-text text-sage-600 leading-relaxed">{selectedSermon.description}</p>
                </div>
                
                {selectedSermon.keyPoints && (
                  <div className="bg-sage-50 p-6 rounded-xl">
                    <h4 className="font-semibold text-sage-800 mb-3 font-display">النقاط الرئيسية</h4>
                    <ul className="space-y-2">
                      {selectedSermon.keyPoints.map((point: string, index: number) => (
                        <li key={index} className="flex items-start space-x-2 space-x-reverse">
                          <Target className="w-4 h-4 text-sage-600 mt-1 flex-shrink-0" />
                          <span className="text-sage-700 font-body">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="bg-blue-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-blue-800 mb-3 font-display">الإحصائيات</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-700 font-display">{selectedSermon.views}</p>
                      <p className="text-sm text-blue-600 font-body">مشاهدة</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-700 font-display">{selectedSermon.likes}</p>
                      <p className="text-sm text-green-600 font-body">إعجاب</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-700 font-display">{selectedSermon.downloads}</p>
                      <p className="text-sm text-purple-600 font-body">تحميل</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-golden-700 font-display">{selectedSermon.rating}</p>
                      <p className="text-sm text-golden-600 font-body">التقييم</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-3 space-x-reverse">
                  <button className="btn-primary flex-1">
                    <Play className="w-5 h-5 ml-2" />
                    استمع الآن
                  </button>
                  <button className="btn-secondary">
                    <Download className="w-5 h-5" />
                  </button>
                  <button className="btn-outline">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FridaySermonsPage;