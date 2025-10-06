import React, { useState } from 'react';
import { Clock, AlertCircle, Info, Bell, Search, Filter } from 'lucide-react';
import { useData } from '../contexts/DataContext';

const AnnouncementsPage = () => {
  const { announcements } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const priorities = [
    { id: 'all', name: 'جميع الإعلانات' },
    { id: 'urgent', name: 'عاجل' },
    { id: 'high', name: 'مهم' },
    { id: 'normal', name: 'عادي' },
  ];

  const filteredAnnouncements = announcements.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = selectedPriority === 'all' || item.priority === selectedPriority;
    return matchesSearch && matchesPriority;
  });

  const totalPages = Math.ceil(filteredAnnouncements.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentAnnouncements = filteredAnnouncements.slice(startIndex, startIndex + itemsPerPage);

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'high':
        return <Bell className="w-5 h-5 text-orange-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-50 border-red-200 hover:bg-red-100';
      case 'high':
        return 'bg-orange-50 border-orange-200 hover:bg-orange-100';
      default:
        return 'bg-blue-50 border-blue-200 hover:bg-blue-100';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="container mx-auto px-4">
        {/* العنوان والبحث */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">الإعلانات الرسمية</h1>
              <p className="text-gray-600">آخر الإعلانات والتنبيهات المهمة من وزارة الأوقاف والشؤون الدينية</p>
            </div>
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="relative">
                <Search className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="البحث في الإعلانات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10 pl-4 py-2 w-64 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* الشريط الجانبي */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Filter className="w-5 h-5 ml-2" />
                تصفية الإعلانات
              </h3>
              <div className="space-y-2">
                {priorities.map((priority) => (
                  <button
                    key={priority.id}
                    onClick={() => setSelectedPriority(priority.id)}
                    className={`w-full text-right px-4 py-2 rounded-lg transition-colors ${
                      selectedPriority === priority.id
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {priority.name}
                  </button>
                ))}
              </div>
            </div>

            {/* إحصائيات سريعة */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">إحصائيات الإعلانات</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">إجمالي الإعلانات</span>
                  <span className="font-bold text-green-600">{announcements.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">إعلانات عاجلة</span>
                  <span className="font-bold text-red-600">
                    {announcements.filter(a => a.priority === 'urgent').length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">إعلانات مهمة</span>
                  <span className="font-bold text-orange-600">
                    {announcements.filter(a => a.priority === 'high').length}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* قائمة الإعلانات */}
          <div className="lg:col-span-3">
            <div className="space-y-4">
              {currentAnnouncements.map((item) => (
                <div
                  key={item.id}
                  className={`bg-white rounded-lg shadow-md p-6 border-r-4 transition-all duration-300 ${getPriorityStyle(item.priority)}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      {getPriorityIcon(item.priority)}
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
                        <div className="flex items-center space-x-4 space-x-reverse mt-1">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityBadge(item.priority)}`}>
                            {item.priority === 'urgent' ? 'عاجل' : item.priority === 'high' ? 'مهم' : 'عادي'}
                          </span>
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="w-4 h-4 ml-1" />
                            <span>{new Date(item.date).toLocaleDateString('ar-EG')}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {item.description}
                  </p>
                  
                  {item.details && (
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <h4 className="font-semibold text-gray-800 mb-2">التفاصيل:</h4>
                      <p className="text-gray-600 text-sm">{item.details}</p>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-500">
                      <span>نُشر في: {new Date(item.date).toLocaleDateString('ar-EG')}</span>
                      {item.validUntil && (
                        <span>صالح حتى: {new Date(item.validUntil).toLocaleDateString('ar-EG')}</span>
                      )}
                    </div>
                    <button className="text-green-600 hover:text-green-700 font-medium">
                      مشاركة
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* التصفح */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    السابق
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 border rounded-lg ${
                        currentPage === page
                          ? 'bg-green-600 text-white border-green-600'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    التالي
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementsPage;