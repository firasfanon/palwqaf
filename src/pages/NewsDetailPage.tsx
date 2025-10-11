import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Eye, User, Share2, Bookmark, Printer as Print, ArrowLeft, ThumbsUp, MessageSquare, Tag, Clock, Building, MapPin, Star, Heart, Download, Facebook, Twitter, Linkedin, Copy, CheckCircle } from 'lucide-react';
import { useData } from '../contexts/DataContext';

const NewsDetailPage = () => {
  const { id } = useParams();
  const { news } = useData();
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  // العثور على الخبر المحدد
  const newsItem = news.find(item => item.id === parseInt(id || '1')) || news[0];

  // أخبار ذات صلة
  const relatedNews = news.filter(item => 
    item.id !== newsItem.id && item.category === newsItem.category
  ).slice(0, 3);

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = newsItem.title;
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        break;
    }
    setShowShareMenu(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 space-x-reverse text-sm text-sage-600">
            <Link to="/" className="hover:text-islamic-600 transition-colors font-body">الرئيسية</Link>
            <span>/</span>
            <Link to="/news" className="hover:text-islamic-600 transition-colors font-body">الأخبار</Link>
            <span>/</span>
            <span className="text-islamic-600 font-body">{newsItem.title}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <article className="bg-white rounded-2xl shadow-elegant overflow-hidden">
              {/* Article Header */}
              <div className="relative">
                <img
                  src={newsItem.image}
                  alt={newsItem.title}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent">
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center space-x-4 space-x-reverse text-white mb-4">
                      <span className="px-3 py-1 bg-islamic-600 rounded-full text-sm font-medium">
                        {newsItem.category === 'mosques' ? 'مساجد' : 
                         newsItem.category === 'events' ? 'فعاليات' : 
                         newsItem.category === 'education' ? 'تعليم' : 'عام'}
                      </span>
                      <div className="flex items-center space-x-1 space-x-reverse">
                        <Calendar className="w-4 h-4" />
                        <span className="font-body">{new Date(newsItem.date).toLocaleDateString('ar-EG')}</span>
                      </div>
                      <div className="flex items-center space-x-1 space-x-reverse">
                        <Eye className="w-4 h-4" />
                        <span className="font-body">{newsItem.views} مشاهدة</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Article Content */}
              <div className="p-8">
                <h1 className="heading-1 text-islamic-800 mb-6">{newsItem.title}</h1>
                
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-sage-200">
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <div className="w-12 h-12 bg-islamic-100 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-islamic-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-islamic-800 font-body">{newsItem.author}</p>
                      <p className="text-sm text-sage-600 font-body">محرر الأخبار</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <button
                      onClick={() => setLiked(!liked)}
                      className={`flex items-center space-x-1 space-x-reverse px-4 py-2 rounded-lg transition-colors ${
                        liked ? 'bg-red-100 text-red-600' : 'bg-sage-100 text-sage-600 hover:bg-red-100 hover:text-red-600'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
                      <span className="font-body">إعجاب</span>
                    </button>
                    
                    <button
                      onClick={() => setBookmarked(!bookmarked)}
                      className={`flex items-center space-x-1 space-x-reverse px-4 py-2 rounded-lg transition-colors ${
                        bookmarked ? 'bg-golden-100 text-golden-600' : 'bg-sage-100 text-sage-600 hover:bg-golden-100 hover:text-golden-600'
                      }`}
                    >
                      <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
                      <span className="font-body">حفظ</span>
                    </button>
                    
                    <div className="relative">
                      <button
                        onClick={() => setShowShareMenu(!showShareMenu)}
                        className="flex items-center space-x-1 space-x-reverse px-4 py-2 bg-sage-100 text-sage-600 rounded-lg hover:bg-islamic-100 hover:text-islamic-600 transition-colors"
                      >
                        <Share2 className="w-4 h-4" />
                        <span className="font-body">مشاركة</span>
                      </button>
                      
                      {showShareMenu && (
                        <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-sage-200 z-50">
                          <div className="p-2">
                            <button
                              onClick={() => handleShare('facebook')}
                              className="w-full flex items-center space-x-2 space-x-reverse px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            >
                              <Facebook className="w-4 h-4" />
                              <span className="font-body">فيسبوك</span>
                            </button>
                            <button
                              onClick={() => handleShare('twitter')}
                              className="w-full flex items-center space-x-2 space-x-reverse px-3 py-2 text-blue-400 hover:bg-blue-50 rounded-lg transition-colors"
                            >
                              <Twitter className="w-4 h-4" />
                              <span className="font-body">تويتر</span>
                            </button>
                            <button
                              onClick={() => handleShare('copy')}
                              className="w-full flex items-center space-x-2 space-x-reverse px-3 py-2 text-sage-600 hover:bg-sage-50 rounded-lg transition-colors"
                            >
                              {copied ? <CheckCircle className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                              <span className="font-body">{copied ? 'تم النسخ' : 'نسخ الرابط'}</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Article Body */}
                <div className="prose prose-lg max-w-none">
                  <p className="body-large text-sage-700 leading-relaxed mb-6">
                    {newsItem.excerpt}
                  </p>
                  
                  <div className="body-text text-sage-700 leading-relaxed space-y-4">
                    <p>
                      {newsItem.content}
                    </p>
                    
                    <p>
                      وأضاف الوزير في كلمته خلال حفل الافتتاح أن هذا المشروع يأتي ضمن خطة الوزارة الاستراتيجية 
                      لتطوير الخدمات الدينية في جميع المحافظات الفلسطينية، مؤكداً على أهمية دور المساجد كمراكز 
                      إشعاع ديني وثقافي في المجتمع.
                    </p>
                    
                    <p>
                      من جانبه، أعرب أهالي المنطقة عن شكرهم وامتنانهم للوزارة على هذا الإنجاز المهم، مؤكدين 
                      أن المسجد الجديد سيلبي احتياجاتهم الدينية ويساهم في تعزيز الروابط الاجتماعية في الحي.
                    </p>
                  </div>
                </div>

                {/* Tags */}
                <div className="mt-8 pt-6 border-t border-sage-200">
                  <h4 className="font-semibold text-islamic-800 mb-3 font-display">الكلمات المفتاحية:</h4>
                  <div className="flex flex-wrap gap-2">
                    {['افتتاح مسجد', 'غزة', 'حي الزيتون', 'وزير الأوقاف', 'خدمات دينية'].map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-islamic-100 text-islamic-700 rounded-full text-sm font-body">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Related News */}
            <div className="bg-white rounded-2xl shadow-elegant p-6">
              <h3 className="text-lg font-semibold text-islamic-800 mb-4 font-display">أخبار ذات صلة</h3>
              <div className="space-y-4">
                {relatedNews.map((item) => (
                  <Link
                    key={item.id}
                    to={`/news/${item.id}`}
                    className="block group"
                  >
                    <div className="flex space-x-3 space-x-reverse">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                      />
                      <div>
                        <h4 className="font-medium text-islamic-800 group-hover:text-islamic-600 transition-colors font-body line-clamp-2">
                          {item.title}
                        </h4>
                        <div className="flex items-center space-x-2 space-x-reverse text-xs text-sage-500 mt-1">
                          <Calendar className="w-3 h-3" />
                          <span className="font-body">{new Date(item.date).toLocaleDateString('ar-EG')}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-elegant p-6">
              <h3 className="text-lg font-semibold text-islamic-800 mb-4 font-display">إجراءات سريعة</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-2 space-x-reverse px-4 py-3 bg-islamic-50 text-islamic-700 rounded-lg hover:bg-islamic-100 transition-colors">
                  <Print className="w-4 h-4" />
                  <span className="font-body">طباعة الخبر</span>
                </button>
                <button className="w-full flex items-center space-x-2 space-x-reverse px-4 py-3 bg-golden-50 text-golden-700 rounded-lg hover:bg-golden-100 transition-colors">
                  <Download className="w-4 h-4" />
                  <span className="font-body">تحميل PDF</span>
                </button>
                <button className="w-full flex items-center space-x-2 space-x-reverse px-4 py-3 bg-sage-50 text-sage-700 rounded-lg hover:bg-sage-100 transition-colors">
                  <MessageSquare className="w-4 h-4" />
                  <span className="font-body">إضافة تعليق</span>
                </button>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-2xl shadow-elegant p-6">
              <h3 className="text-lg font-semibold text-islamic-800 mb-4 font-display">للاستفسار</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Building className="w-4 h-4 text-islamic-600" />
                  <span className="text-sage-700 font-body">إدارة الأخبار</span>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Phone className="w-4 h-4 text-golden-600" />
                  <span className="text-sage-700 font-body" dir="ltr">+970 2 298 2534</span>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Mail className="w-4 h-4 text-blue-600" />
                  <span className="text-sage-700 font-body" dir="ltr">news@awqaf.gov.ps</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back to News */}
        <div className="mt-8 text-center">
          <Link
            to="/news"
            className="inline-flex items-center space-x-2 space-x-reverse text-islamic-600 hover:text-islamic-700 font-medium font-body group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            <span>العودة إلى الأخبار</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewsDetailPage;