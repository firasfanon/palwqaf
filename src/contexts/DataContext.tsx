import React, { createContext, useContext, useState } from 'react';

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  author: string;
  category: string;
  views: number;
}

interface Announcement {
  id: number;
  title: string;
  description: string;
  details?: string;
  date: string;
  priority: 'normal' | 'high' | 'urgent';
  validUntil?: string;
}

interface Activity {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  attendees: number;
  maxAttendees: number;
  status: 'upcoming' | 'ongoing' | 'completed';
}

interface DataContextType {
  news: NewsItem[];
  announcements: Announcement[];
  activities: Activity[];
  addNews: (news: Omit<NewsItem, 'id'>) => void;
  updateNews: (id: number, news: Partial<NewsItem>) => void;
  deleteNews: (id: number) => void;
  addAnnouncement: (announcement: Omit<Announcement, 'id'>) => void;
  updateAnnouncement: (id: number, announcement: Partial<Announcement>) => void;
  deleteAnnouncement: (id: number) => void;
  addActivity: (activity: Omit<Activity, 'id'>) => void;
  updateActivity: (id: number, activity: Partial<Activity>) => void;
  deleteActivity: (id: number) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [news, setNews] = useState<NewsItem[]>([
    {
      id: 1,
      title: 'وزير الأوقاف يفتتح المسجد الجديد في حي الزيتون',
      excerpt: 'افتتح وزير الأوقاف والشؤون الدينية المسجد الجديد في حي الزيتون بمدينة غزة، والذي يتسع لـ 500 مصلي.',
      content: 'افتتح وزير الأوقاف والشؤون الدينية اليوم المسجد الجديد في حي الزيتون بمدينة غزة، والذي يتسع لـ 500 مصلي. يأتي هذا المشروع ضمن خطة الوزارة لتعزيز الخدمات الدينية في المناطق المكتظة بالسكان.',
      image: 'https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&w=800',
      date: '2024-01-15',
      author: 'إدارة الأخبار',
      category: 'mosques',
      views: 1250
    },
    {
      id: 2,
      title: 'انطلاق مسابقة القرآن الكريم السنوية على مستوى فلسطين',
      excerpt: 'تنطلق غداً مسابقة القرآن الكريم السنوية على مستوى فلسطين بمشاركة أكثر من 200 متسابق من مختلف المحافظات.',
      content: 'تنطلق غداً مسابقة القرآن الكريم السنوية على مستوى فلسطين بمشاركة أكثر من 200 متسابق من مختلف المحافظات. المسابقة تهدف إلى تشجيع الشباب على حفظ القرآن الكريم وتلاوته.',
      image: 'https://images.pexels.com/photos/8107628/pexels-photo-8107628.jpeg?auto=compress&cs=tinysrgb&w=800',
      date: '2024-01-14',
      author: 'قسم الأنشطة',
      category: 'events',
      views: 890
    },
    {
      id: 3,
      title: 'ورشة عمل حول إدارة الأوقاف الإسلامية',
      excerpt: 'تنظم الوزارة ورشة عمل متخصصة حول إدارة الأوقاف الإسلامية وتطوير آليات الاستثمار الوقفي.',
      content: 'تنظم الوزارة ورشة عمل متخصصة حول إدارة الأوقاف الإسلامية وتطوير آليات الاستثمار الوقفي. الورشة تستهدف المسؤولين عن إدارة الأوقاف في المحافظات.',
      image: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=800',
      date: '2024-01-13',
      author: 'إدارة التطوير',
      category: 'education',
      views: 567
    },
    {
      id: 4,
      title: 'توقيع اتفاقية تعاون مع الجامعة الإسلامية',
      excerpt: 'وقعت الوزارة اتفاقية تعاون مع الجامعة الإسلامية بغزة لتطوير البرامج الدينية والأكاديمية.',
      content: 'وقعت الوزارة اتفاقية تعاون مع الجامعة الإسلامية بغزة لتطوير البرامج الدينية والأكاديمية. الاتفاقية تشمل برامج التدريب والتأهيل للأئمة والخطباء.',
      image: 'https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=800',
      date: '2024-01-12',
      author: 'العلاقات العامة',
      category: 'education',
      views: 723
    }
  ]);

  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: 1,
      title: 'إغلاق استثنائي للمسجد الأقصى يوم الجمعة',
      description: 'تعلن الوزارة عن إغلاق استثنائي للمسجد الأقصى يوم الجمعة القادم لأعمال الصيانة الطارئة.',
      details: 'سيتم إغلاق المسجد الأقصى من الساعة 6 صباحاً حتى 2 ظهراً لأعمال الصيانة الطارئة في النظام الكهربائي.',
      date: '2024-01-15',
      priority: 'urgent',
      validUntil: '2024-01-19'
    },
    {
      id: 2,
      title: 'فتح باب التسجيل لدورة تأهيل الأئمة',
      description: 'تعلن الوزارة عن فتح باب التسجيل لدورة تأهيل الأئمة والخطباء الجدد للعام 2024.',
      details: 'الدورة تستمر 3 أشهر وتشمل التدريب على الخطابة والإرشاد الديني. آخر موعد للتسجيل 30 يناير 2024.',
      date: '2024-01-14',
      priority: 'high',
      validUntil: '2024-01-30'
    },
    {
      id: 3,
      title: 'تعديل مواعيد صلاة الجمعة في المساجد الحكومية',
      description: 'تعلن الوزارة عن تعديل مواعيد صلاة الجمعة في المساجد الحكومية اعتباراً من الأسبوع القادم.',
      date: '2024-01-13',
      priority: 'normal'
    },
    {
      id: 4,
      title: 'إطلاق مشروع رقمنة المخطوطات الإسلامية',
      description: 'تعلن الوزارة عن إطلاق مشروع رقمنة المخطوطات الإسلامية النادرة بالتعاون مع المؤسسات الدولية.',
      date: '2024-01-12',
      priority: 'normal'
    }
  ]);

  const [activities, setActivities] = useState<Activity[]>([
    {
      id: 1,
      title: 'محاضرة عن أهمية الوقف في الإسلام',
      description: 'محاضرة تثقيفية حول دور الوقف في التنمية الاقتصادية والاجتماعية.',
      date: '2024-01-20',
      location: 'المسجد الكبير - رام الله',
      attendees: 145,
      maxAttendees: 200,
      status: 'upcoming'
    },
    {
      id: 2,
      title: 'ندوة حول الأخلاق الإسلامية في العمل',
      description: 'ندوة تفاعلية حول تطبيق الأخلاق الإسلامية في بيئة العمل المعاصرة.',
      date: '2024-01-22',
      location: 'قاعة المؤتمرات - غزة',
      attendees: 89,
      maxAttendees: 150,
      status: 'upcoming'
    },
    {
      id: 3,
      title: 'ورشة عمل حول التربية الإسلامية للأطفال',
      description: 'ورشة عملية لتعليم الآباء والأمهات أسس التربية الإسلامية السليمة.',
      date: '2024-01-25',
      location: 'مركز التدريب - نابلس',
      attendees: 67,
      maxAttendees: 100,
      status: 'upcoming'
    }
  ]);

  const addNews = (newsItem: Omit<NewsItem, 'id'>) => {
    const newId = Math.max(...news.map(n => n.id)) + 1;
    setNews([...news, { ...newsItem, id: newId }]);
  };

  const updateNews = (id: number, updatedNews: Partial<NewsItem>) => {
    setNews(news.map(item => item.id === id ? { ...item, ...updatedNews } : item));
  };

  const deleteNews = (id: number) => {
    setNews(news.filter(item => item.id !== id));
  };

  const addAnnouncement = (announcement: Omit<Announcement, 'id'>) => {
    const newId = Math.max(...announcements.map(a => a.id)) + 1;
    setAnnouncements([...announcements, { ...announcement, id: newId }]);
  };

  const updateAnnouncement = (id: number, updatedAnnouncement: Partial<Announcement>) => {
    setAnnouncements(announcements.map(item => item.id === id ? { ...item, ...updatedAnnouncement } : item));
  };

  const deleteAnnouncement = (id: number) => {
    setAnnouncements(announcements.filter(item => item.id !== id));
  };

  const addActivity = (activity: Omit<Activity, 'id'>) => {
    const newId = Math.max(...activities.map(a => a.id)) + 1;
    setActivities([...activities, { ...activity, id: newId }]);
  };

  const updateActivity = (id: number, updatedActivity: Partial<Activity>) => {
    setActivities(activities.map(item => item.id === id ? { ...item, ...updatedActivity } : item));
  };

  const deleteActivity = (id: number) => {
    setActivities(activities.filter(item => item.id !== id));
  };

  const value = {
    news,
    announcements,
    activities,
    addNews,
    updateNews,
    deleteNews,
    addAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
    addActivity,
    updateActivity,
    deleteActivity
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};