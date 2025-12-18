import React, { useState, useEffect } from 'react';
import {
  Home,
  Edit,
  Eye,
  Save,
  RefreshCw,
  Upload,
  Image as ImageIcon,
  Newspaper,
  Megaphone,
  BarChart3,
  Calendar,
  Settings,
  Users,
  Crown,
  TrendingUp,
  Plus,
  Trash2,
  MoveUp,
  MoveDown,
  Monitor,
  Smartphone,
  Tablet,
  X,
  CheckCircle
} from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import { Modal, PageHeader } from '../../components/admin';
import FileUpload from '../../components/UI/FileUpload';

interface HomeSection {
  id: string;
  name: string;
  icon: any;
  enabled: boolean;
  order: number;
  settings?: any;
}

const HomePageManagement: React.FC = () => {
  const { success, error: showError } = useToast();
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [hasChanges, setHasChanges] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedSection, setSelectedSection] = useState<HomeSection | null>(null);

  const [sections, setSections] = useState<HomeSection[]>([
    {
      id: 'hero',
      name: 'القسم الرئيسي (Hero)',
      icon: Crown,
      enabled: true,
      order: 1,
      settings: {
        title: 'وزارة الأوقاف والشؤون الدينية',
        subtitle: 'دولة فلسطين',
        description: 'نسعى لخدمة المجتمع الفلسطيني وتعزيز القيم الإسلامية',
        backgroundImage: 'https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg',
        showCTA: true,
        ctaText: 'استكشف خدماتنا',
        ctaLink: '/services'
      }
    },
    {
      id: 'minister',
      name: 'كلمة الوزير',
      icon: Users,
      enabled: true,
      order: 2,
      settings: {
        title: 'كلمة معالي الوزير',
        ministerName: 'د. محمد صالح',
        photo: '/images/minister.jpg',
        message: 'نص كلمة الوزير...',
        showFullMessage: false
      }
    },
    {
      id: 'statistics',
      name: 'الإحصائيات',
      icon: BarChart3,
      enabled: true,
      order: 3,
      settings: {
        stats: [
          { label: 'المساجد', value: 1420, icon: 'building' },
          { label: 'الأراضي الوقفية', value: 850, icon: 'map' },
          { label: 'المستفيدون', value: 5400, icon: 'users' },
          { label: 'المشاريع', value: 230, icon: 'briefcase' }
        ]
      }
    },
    {
      id: 'news',
      name: 'آخر الأخبار',
      icon: Newspaper,
      enabled: true,
      order: 4,
      settings: {
        title: 'آخر الأخبار',
        itemsToShow: 6,
        showImages: true,
        showDate: true,
        showCategory: true
      }
    },
    {
      id: 'announcements',
      name: 'الإعلانات',
      icon: Megaphone,
      enabled: true,
      order: 5,
      settings: {
        title: 'الإعلانات الهامة',
        itemsToShow: 4,
        showPriority: true,
        highlightUrgent: true
      }
    },
    {
      id: 'events',
      name: 'الفعاليات',
      icon: Calendar,
      enabled: true,
      order: 6,
      settings: {
        title: 'الفعاليات القادمة',
        itemsToShow: 3,
        showDate: true,
        showLocation: true
      }
    },
    {
      id: 'services',
      name: 'الخدمات الإلكترونية',
      icon: Settings,
      enabled: true,
      order: 7,
      settings: {
        title: 'خدماتنا الإلكترونية',
        layout: 'grid',
        itemsToShow: 6
      }
    },
    {
      id: 'media',
      name: 'معرض الوسائط',
      icon: ImageIcon,
      enabled: false,
      order: 8,
      settings: {
        title: 'معرض الصور',
        itemsToShow: 8
      }
    }
  ]);

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const newSections = [...sections];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    if (targetIndex >= 0 && targetIndex < sections.length) {
      [newSections[index], newSections[targetIndex]] = [newSections[targetIndex], newSections[index]];

      newSections.forEach((section, idx) => {
        section.order = idx + 1;
      });

      setSections(newSections);
      setHasChanges(true);
    }
  };

  const toggleSection = (id: string) => {
    setSections(prev =>
      prev.map(section =>
        section.id === id ? { ...section, enabled: !section.enabled } : section
      )
    );
    setHasChanges(true);
  };

  const handleSave = async () => {
    try {
      success('تم الحفظ', 'تم حفظ التغييرات بنجاح');
      setHasChanges(false);
    } catch (err) {
      showError('خطأ', 'فشل حفظ التغييرات');
    }
  };

  const handleEditSection = (section: HomeSection) => {
    setSelectedSection(section);
    setShowModal(true);
  };

  const renderSectionSettings = () => {
    if (!selectedSection) return null;

    switch (selectedSection.id) {
      case 'hero':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">العنوان الرئيسي</label>
              <input
                type="text"
                value={selectedSection.settings.title}
                onChange={(e) => setSelectedSection({
                  ...selectedSection,
                  settings: { ...selectedSection.settings, title: e.target.value }
                })}
                className="form-input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">العنوان الفرعي</label>
              <input
                type="text"
                value={selectedSection.settings.subtitle}
                className="form-input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">الوصف</label>
              <textarea
                value={selectedSection.settings.description}
                className="form-textarea"
                rows={3}
              />
            </div>
            <FileUpload
              onUpload={(path, url) => setSelectedSection({
                ...selectedSection,
                settings: { ...selectedSection.settings, backgroundImage: url }
              })}
              bucket="images"
              folder="hero"
              accept="image/*"
              label="صورة الخلفية"
            />
          </div>
        );

      case 'statistics':
        return (
          <div className="space-y-4">
            {selectedSection.settings.stats.map((stat: any, index: number) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">التسمية</label>
                    <input type="text" value={stat.label} className="form-input" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">القيمة</label>
                    <input type="number" value={stat.value} className="form-input" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'news':
      case 'announcements':
      case 'events':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">العنوان</label>
              <input
                type="text"
                value={selectedSection.settings.title}
                className="form-input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">عدد العناصر المعروضة</label>
              <input
                type="number"
                value={selectedSection.settings.itemsToShow}
                className="form-input"
                min="1"
                max="12"
              />
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-8 text-gray-500">
            لا توجد إعدادات إضافية لهذا القسم
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="إدارة الصفحة الرئيسية"
        description="تخصيص وترتيب أقسام الصفحة الرئيسية"
        action={{
          label: hasChanges ? 'حفظ التغييرات' : 'محفوظ',
          icon: hasChanges ? Save : CheckCircle,
          onClick: handleSave,
          disabled: !hasChanges
        }}
      />

      {hasChanges && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-center">
          <TrendingUp className="w-5 h-5 text-amber-600 ml-3" />
          <div>
            <p className="font-medium text-amber-900">لديك تغييرات غير محفوظة</p>
            <p className="text-sm text-amber-800">تأكد من حفظ التغييرات قبل مغادرة الصفحة</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">أقسام الصفحة الرئيسية</h3>
              <div className="flex items-center space-x-2 space-x-reverse">
                <button
                  onClick={() => setPreviewMode('desktop')}
                  className={`p-2 rounded ${previewMode === 'desktop' ? 'bg-islamic-100 text-islamic-600' : 'text-gray-400'}`}
                >
                  <Monitor className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setPreviewMode('tablet')}
                  className={`p-2 rounded ${previewMode === 'tablet' ? 'bg-islamic-100 text-islamic-600' : 'text-gray-400'}`}
                >
                  <Tablet className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setPreviewMode('mobile')}
                  className={`p-2 rounded ${previewMode === 'mobile' ? 'bg-islamic-100 text-islamic-600' : 'text-gray-400'}`}
                >
                  <Smartphone className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {sections.map((section, index) => {
                const Icon = section.icon;
                return (
                  <div
                    key={section.id}
                    className={`border border-gray-200 rounded-lg p-4 transition-all ${
                      section.enabled ? 'bg-white' : 'bg-gray-50 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div className="flex flex-col space-y-1">
                          <button
                            onClick={() => moveSection(index, 'up')}
                            disabled={index === 0}
                            className="p-1 hover:bg-gray-100 rounded disabled:opacity-30"
                          >
                            <MoveUp className="w-4 h-4 text-gray-600" />
                          </button>
                          <button
                            onClick={() => moveSection(index, 'down')}
                            disabled={index === sections.length - 1}
                            className="p-1 hover:bg-gray-100 rounded disabled:opacity-30"
                          >
                            <MoveDown className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>

                        <div className={`p-3 rounded-lg ${section.enabled ? 'bg-islamic-50' : 'bg-gray-200'}`}>
                          <Icon className={`w-6 h-6 ${section.enabled ? 'text-islamic-600' : 'text-gray-400'}`} />
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-800">{section.name}</h4>
                          <p className="text-sm text-gray-500">الترتيب: {section.order}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 space-x-reverse">
                        <button
                          onClick={() => handleEditSection(section)}
                          className="p-2 hover:bg-blue-50 rounded text-blue-600"
                        >
                          <Edit className="w-4 h-4" />
                        </button>

                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={section.enabled}
                            onChange={() => toggleSection(section.id)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-islamic-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-islamic-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">معاينة سريعة</h3>
            <div className={`bg-gray-100 rounded-lg p-4 ${
              previewMode === 'mobile' ? 'max-w-[375px]' :
              previewMode === 'tablet' ? 'max-w-[768px]' : 'w-full'
            } mx-auto transition-all`}>
              <div className="space-y-3">
                {sections
                  .filter(s => s.enabled)
                  .sort((a, b) => a.order - b.order)
                  .map((section) => {
                    const Icon = section.icon;
                    return (
                      <div key={section.id} className="bg-white rounded p-3 text-center">
                        <Icon className="w-8 h-8 mx-auto mb-2 text-islamic-600" />
                        <p className="text-sm font-medium text-gray-700">{section.name}</p>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">الإحصائيات</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">الأقسام المفعلة</span>
                <span className="font-bold text-islamic-600">{sections.filter(s => s.enabled).length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">إجمالي الأقسام</span>
                <span className="font-bold text-gray-700">{sections.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={`تحرير: ${selectedSection?.name}`}
        size="large"
      >
        <div className="space-y-4">
          {renderSectionSettings()}

          <div className="flex justify-end space-x-3 space-x-reverse pt-4 border-t">
            <button
              onClick={() => setShowModal(false)}
              className="btn-outline"
            >
              <X className="w-4 h-4 ml-2" />
              إلغاء
            </button>
            <button
              onClick={() => {
                setHasChanges(true);
                setShowModal(false);
                success('تم التحديث', 'تم تحديث إعدادات القسم');
              }}
              className="btn-primary"
            >
              <Save className="w-4 h-4 ml-2" />
              حفظ التغييرات
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default HomePageManagement;
