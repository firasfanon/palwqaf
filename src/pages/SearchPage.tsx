import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Calendar, 
  Eye, 
  Star, 
  Clock, 
  User,
  Building,
  FileText,
  Mic,
  Heart,
  MapPin,
  ArrowLeft,
  TrendingUp,
  Target,
  Award,
  CheckCircle,
  Info,
  BookOpen,
  Globe,
  Phone,
  Mail
} from 'lucide-react';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // نتائج البحث التجريبية
  const searchResults = [
    {
      id: 1,
      title: 'وزير الأوقاف يفتتح المسجد الجديد في حي الزيتون',
      description: 'افتتح وزير الأوقاف والشؤون الدينية المسجد الجديد في حي الزيتون بمدينة غزة، والذي يتسع لـ 500 مصلي.',
      type: 'news',
      category: 'أخبار',
      url: '/news/1',
      date: '2024-01-15',
      views: 1250,
      relevance: 95,
      image: 'https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 2,
      title: 'مسابقة القرآن الكريم السنوية',
      description: 'تنطلق غداً مسابقة القرآن الكريم السنوية على مستوى فلسطين بمشاركة أكثر من 200 متسابق.',
      type: 'activity',
      category: 'أنشطة',
      url: '/activities/1',
      date: '2024-02-15',
      views: 890,
      relevance: 92,
      image: 'https://images.pexels.com/photos/8107628/pexels-photo-8107628.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 3,
      title: 'برنامج كفالة الأيتام',
      description: 'برنامج شامل لرعاية وكفالة الأطفال الأيتام وتوفير احتياجاتهم التعليمية والصحية.',
      type: 'service',
      category: 'خدمات اجتماعية',
      url: '/social-services/1',
      date: '2024-01-10',
      views: 650,
      relevance: 88,
      image: 'https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 4,
      title: 'أهمية الصلاة في حياة المسلم',
      description: 'خطبة تتناول أهمية الصلاة ومكانتها في الإسلام وأثرها على حياة المؤمن الروحية.',
      type: 'sermon',
      category: 'خطب الجمعة',
      url: '/friday-sermons/1',
      date: '2024-01-19',
      views: 1180,
      relevance: 90,
      image: 'https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 5,
      title: 'المسجد الأقصى المبارك',
      description: 'أولى القبلتين وثالث الحرمين الشريفين، أقدس المساجد في فلسطين والعالم الإسلامي.',
      type: 'mosque',
      category: 'مساجد',
      url: '/mosques/1',
      date: '2020-01-01',
      views: 2340,
      relevance: 98,
      image: 'https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 6,
      title: 'مشروع ترميم المسجد الأقصى المبارك',
      description: 'مشروع شامل لترميم وصيانة المسجد الأقصى المبارك والحفاظ على معالمه التاريخية.',
      type: 'project',
      category: 'مشاريع',
      url: '/projects/1',
      date: '2023-01-15',
      views: 780,
      relevance: 85,
      image: 'https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const categories = [
    { id: 'all', name: 'جميع الفئات', icon: Globe },
    { id: 'news', name: 'الأخبار', icon: FileText },
    { id: 'announcements', name: 'الإعلانات', icon: Info },
    { id: 'activities', name: 'الأنشطة', icon: Calendar },
    { id: 'services', name: 'الخدمات', icon: Heart },
    { id: 'sermons', name: 'خطب الجمعة', icon: Mic },
    { id: 'mosques', name: 'المساجد', icon: Building },
    { id: 'projects', name: 'المشاريع', icon: Target }
  ];

  const contentTypes = [
    { id: 'all', name: 'جميع الأنواع' },
    { id: 'news', name: 'أخبار' },
    { id: 'activity', name: 'نشاط' },
    { id: 'service', name: 'خدمة' },
    { id: 'sermon', name: 'خطبة' },
    { id: 'mosque', name: 'مسجد' },
    { id: 'project', name: 'مشروع' }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'news':
        return <FileText className="w-5 h-5 text-blue-600" />;
      case 'activity':
        return <Calendar className="w-5 h-5 text-green-600" />;
      case 'service':
        return <Heart className="w-5 h-5 text-red-600" />;
      case 'sermon':
        return <Mic className="w-5 h-5 text-purple-600" />;
      case 'mosque':
        return <Building className="w-5 h-5 text-orange-600" />;
      case 'project':
        return <Target className="w-5 h-5 text-teal-600" />;
      default:
        return <FileText className="w-5 h-5 text-gray-600" />;
    }
  };

  const filteredResults = searchResults.filter(result => {
    const matchesSearch = searchTerm === '' || 
      result.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || result.type === selectedCategory;
    const matchesType = selectedType === 'all' || result.type === selectedType;
    return matchesSearch && matchesCategory && matchesType;
  });

  const sortedResults = [...filteredResults].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'views':
        return b.views - a.views;
      case 'relevance':
      default:
        return b.relevance - a.relevance;
    }
  });

  const totalPages = Math.ceil(sortedResults.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentResults = sortedResults.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="islamic-gradient text-white rounded-2xl p-8 mb-8 islamic-pattern">
          <div className="text-center">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl animate-float">
              <Search className="w-12 h-12 text-islamic-600" />
            </div>
            <h1 className="heading-1 text-white mb-4">البحث في الموقع</h1>
            <p className="body-large text-golden-200 max-w-4xl mx-auto">
              ابحث في جميع محتويات موقع وزارة الأوقاف والشؤون الدينية
            </p>
          </div>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-2xl shadow-elegant p-8 mb-8">
          <div className="max-w-4xl mx-auto">
            <div className="relative mb-6">
              <Search className="absolute right-4 top-4 h-6 w-6 text-sage-400" />
              <input
                type="text"
                placeholder="ابحث في الموقع..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input pr-12 text-lg py-4"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="form-select"
              >
                {contentTypes.map(type => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="form-select"
              >
                <option value="relevance">الأكثر صلة</option>
                <option value="date">الأحدث</option>
                <option value="views">الأكثر مشاهدة</option>
              </select>
              
              <button className="btn-primary">
                <Filter className="w-5 h-5 ml-2" />
                بحث متقدم
              </button>
            </div>
          </div>
        </div>

        {/* Search Results */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-elegant p-6">
              <h3 className="text-lg font-semibold text-islamic-800 mb-4 font-display">الفئات</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center space-x-3 space-x-reverse px-4 py-2 rounded-lg transition-colors font-body ${
                      selectedCategory === category.id
                        ? 'bg-islamic-600 text-white'
                        : 'text-sage-700 hover:bg-islamic-50'
                    }`}
                  >
                    <category.icon className="w-4 h-4" />
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-elegant p-6">
              <h3 className="text-lg font-semibold text-islamic-800 mb-4 font-display">إحصائيات البحث</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sage-600 font-body">النتائج:</span>
                  <span className="font-bold text-islamic-700 font-display">{filteredResults.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sage-600 font-body">الصفحات:</span>
                  <span className="font-bold text-islamic-700 font-display">{totalPages}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sage-600 font-body">وقت البحث:</span>
                  <span className="font-bold text-islamic-700 font-display">0.05 ثانية</span>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-islamic-800 font-display">
                نتائج البحث ({filteredResults.length})
              </h2>
              <div className="text-sm text-sage-600 font-body">
                عرض {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredResults.length)} من {filteredResults.length}
              </div>
            </div>

            <div className="space-y-6">
              {currentResults.map((result) => (
                <div key={result.id} className="bg-white rounded-2xl shadow-elegant p-6 hover:shadow-lg transition-shadow">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="md:col-span-1">
                      <img
                        src={result.image}
                        alt={result.title}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    </div>
                    
                    <div className="md:col-span-3">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          {getTypeIcon(result.type)}
                          <span className="px-3 py-1 bg-islamic-100 text-islamic-800 rounded-full text-sm font-medium">
                            {result.category}
                          </span>
                          <div className="flex items-center space-x-1 space-x-reverse">
                            <Star className="w-4 h-4 text-golden-500" />
                            <span className="text-sm text-golden-600 font-body">{result.relevance}% مطابقة</span>
                          </div>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-islamic-800 mb-3 font-display hover:text-islamic-600 cursor-pointer">
                        {result.title}
                      </h3>
                      
                      <p className="text-sage-600 mb-4 font-body leading-relaxed">
                        {result.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 space-x-reverse text-sm text-sage-500">
                          <div className="flex items-center space-x-1 space-x-reverse">
                            <Calendar className="w-4 h-4" />
                            <span className="font-body">{new Date(result.date).toLocaleDateString('ar-EG')}</span>
                          </div>
                          <div className="flex items-center space-x-1 space-x-reverse">
                            <Eye className="w-4 h-4" />
                            <span className="font-body">{result.views} مشاهدة</span>
                          </div>
                        </div>
                        
                        <a
                          href={result.url}
                          className="text-islamic-600 hover:text-islamic-700 font-medium font-body group"
                        >
                          <span>عرض التفاصيل</span>
                          <ArrowLeft className="w-4 h-4 inline mr-1 group-hover:translate-x-1 transition-transform" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center">
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
          </div>
        </div>

        {/* Popular Searches */}
        <div className="bg-white rounded-2xl shadow-elegant p-8 mt-8">
          <h2 className="heading-2 text-islamic-800 mb-6">البحثات الشائعة</h2>
          <div className="flex flex-wrap gap-3">
            {[
              'المسجد الأقصى',
              'خطب الجمعة',
              'الخدمات الاجتماعية',
              'مسابقة القرآن',
              'كلمة الوزير',
              'الأوقاف الإسلامية',
              'المشاريع الجديدة',
              'التبرعات'
            ].map((term, index) => (
              <button
                key={index}
                onClick={() => setSearchTerm(term)}
                className="px-4 py-2 bg-islamic-100 text-islamic-700 rounded-full hover:bg-islamic-200 transition-colors font-body"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;