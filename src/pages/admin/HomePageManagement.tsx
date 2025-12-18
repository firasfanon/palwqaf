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
  CheckCircle,
  Loader
} from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import { Modal, PageHeader } from '../../components/admin';
import FileUpload from '../../components/UI/FileUpload';
import { supabase } from '../../lib/supabase';

interface HomeSection {
  id: string;
  section_name: string;
  name: string;
  icon: any;
  enabled: boolean;
  order: number;
  settings?: any;
}

const sectionIcons: {[key: string]: any} = {
  hero: Crown,
  minister: Users,
  statistics: BarChart3,
  news: Newspaper,
  announcements: Megaphone,
  events: Calendar,
  services: Settings,
  media: ImageIcon
};

const sectionNames: {[key: string]: string} = {
  hero: 'القسم الرئيسي (Hero)',
  minister: 'كلمة الوزير',
  statistics: 'الإحصائيات',
  news: 'آخر الأخبار',
  announcements: 'الإعلانات',
  events: 'الفعاليات',
  services: 'الخدمات الإلكترونية',
  media: 'معرض الوسائط'
};

const HomePageManagement: React.FC = () => {
  const { success, error: showError } = useToast();
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [hasChanges, setHasChanges] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedSection, setSelectedSection] = useState<HomeSection | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [sections, setSections] = useState<HomeSection[]>([]);

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('homepage_sections')
        .select('*')
        .order('display_order');

      if (error) throw error;

      const transformedSections: HomeSection[] = (data || []).map(section => ({
        id: section.section_name,
        section_name: section.section_name,
        name: sectionNames[section.section_name] || section.section_name,
        icon: sectionIcons[section.section_name] || Home,
        enabled: section.is_active,
        order: section.display_order,
        settings: section.settings || {}
      }));

      setSections(transformedSections);
    } catch (error: any) {
      showError('خطأ', 'فشل تحميل أقسام الصفحة الرئيسية');
      console.error('Error fetching sections:', error);
    } finally {
      setLoading(false);
    }
  };

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
      setSaving(true);

      for (const section of sections) {
        const { error } = await supabase
          .from('homepage_sections')
          .update({
            is_active: section.enabled,
            display_order: section.order,
            settings: section.settings,
            updated_at: new Date().toISOString()
          })
          .eq('section_name', section.section_name);

        if (error) throw error;
      }

      success('تم الحفظ', 'تم حفظ التغييرات بنجاح');
      setHasChanges(false);
      await fetchSections();
    } catch (err) {
      showError('خطأ', 'فشل حفظ التغييرات');
      console.error('Error saving:', err);
    } finally {
      setSaving(false);
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
                value={selectedSection.settings?.title || ''}
                onChange={(e) => setSelectedSection({
                  ...selectedSection,
                  settings: { ...selectedSection.settings, title: e.target.value }
                })}
                className="form-input"
                placeholder="أدخل العنوان الرئيسي"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">العنوان الفرعي</label>
              <input
                type="text"
                value={selectedSection.settings?.subtitle || ''}
                onChange={(e) => setSelectedSection({
                  ...selectedSection,
                  settings: { ...selectedSection.settings, subtitle: e.target.value }
                })}
                className="form-input"
                placeholder="أدخل العنوان الفرعي"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">الوصف</label>
              <textarea
                value={selectedSection.settings?.description || ''}
                onChange={(e) => setSelectedSection({
                  ...selectedSection,
                  settings: { ...selectedSection.settings, description: e.target.value }
                })}
                className="form-textarea"
                rows={3}
                placeholder="أدخل وصف القسم"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">نص الزر</label>
              <input
                type="text"
                value={selectedSection.settings?.ctaText || ''}
                onChange={(e) => setSelectedSection({
                  ...selectedSection,
                  settings: { ...selectedSection.settings, ctaText: e.target.value }
                })}
                className="form-input"
                placeholder="مثال: اكتشف المزيد"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">رابط الزر</label>
              <input
                type="text"
                value={selectedSection.settings?.ctaLink || ''}
                onChange={(e) => setSelectedSection({
                  ...selectedSection,
                  settings: { ...selectedSection.settings, ctaLink: e.target.value }
                })}
                className="form-input"
                placeholder="/services"
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
            {selectedSection.settings.stats?.map((stat: any, index: number) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">التسمية</label>
                    <input
                      type="text"
                      value={stat.label}
                      onChange={(e) => {
                        const newStats = [...selectedSection.settings.stats];
                        newStats[index].label = e.target.value;
                        setSelectedSection({
                          ...selectedSection,
                          settings: { ...selectedSection.settings, stats: newStats }
                        });
                      }}
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">القيمة</label>
                    <input
                      type="number"
                      value={stat.value}
                      onChange={(e) => {
                        const newStats = [...selectedSection.settings.stats];
                        newStats[index].value = Number(e.target.value);
                        setSelectedSection({
                          ...selectedSection,
                          settings: { ...selectedSection.settings, stats: newStats }
                        });
                      }}
                      className="form-input"
                    />
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
                value={selectedSection.settings.title || ''}
                onChange={(e) => setSelectedSection({
                  ...selectedSection,
                  settings: { ...selectedSection.settings, title: e.target.value }
                })}
                className="form-input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">عدد العناصر المعروضة</label>
              <input
                type="number"
                value={selectedSection.settings.itemsToShow || 6}
                onChange={(e) => setSelectedSection({
                  ...selectedSection,
                  settings: { ...selectedSection.settings, itemsToShow: Number(e.target.value) }
                })}
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="w-8 h-8 animate-spin text-islamic-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="إدارة الصفحة الرئيسية"
        description="تخصيص وترتيب أقسام الصفحة الرئيسية"
        action={{
          label: saving ? 'جاري الحفظ...' : hasChanges ? 'حفظ التغييرات' : 'محفوظ',
          icon: saving ? Loader : hasChanges ? Save : CheckCircle,
          onClick: handleSave,
          disabled: !hasChanges || saving
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
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">معاينة سريعة</h3>
              <Eye className="w-5 h-5 text-islamic-600" />
            </div>
            <div className={`bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 border border-gray-200 ${
              previewMode === 'mobile' ? 'max-w-[375px]' :
              previewMode === 'tablet' ? 'max-w-[768px]' : 'w-full'
            } mx-auto transition-all duration-300`}>
              <div className="space-y-2">
                {sections.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Eye className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p className="text-sm">لا توجد أقسام لعرضها</p>
                  </div>
                ) : (
                  sections
                    .filter(s => s.enabled)
                    .sort((a, b) => a.order - b.order)
                    .map((section, index) => {
                      const Icon = section.icon;
                      const hasSettings = section.settings && Object.keys(section.settings).length > 0;
                      return (
                        <div key={section.id} className="bg-white rounded-lg p-3 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                          <div className="flex items-center space-x-3 space-x-reverse">
                            <div className="flex-shrink-0 w-10 h-10 bg-islamic-50 rounded-lg flex items-center justify-center">
                              <Icon className="w-5 h-5 text-islamic-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-800 truncate">{section.name}</p>
                              <div className="flex items-center space-x-2 space-x-reverse">
                                <p className="text-xs text-gray-500">الترتيب: {index + 1}</p>
                                {hasSettings && (
                                  <>
                                    <span className="text-xs text-gray-300">•</span>
                                    <p className="text-xs text-green-600">مُعد</p>
                                  </>
                                )}
                              </div>
                              {section.settings?.title && (
                                <p className="text-xs text-gray-600 mt-1 truncate">
                                  {section.settings.title}
                                </p>
                              )}
                            </div>
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          </div>
                        </div>
                      );
                    })
                )}
              </div>

              {sections.filter(s => s.enabled).length === 0 && sections.length > 0 && (
                <div className="mt-4 text-center">
                  <p className="text-xs text-amber-600 bg-amber-50 rounded-lg p-3">
                    قم بتفعيل قسم واحد على الأقل لرؤية المعاينة
                  </p>
                </div>
              )}
            </div>

            <div className="mt-4 flex items-center justify-center space-x-2 space-x-reverse text-xs text-gray-500">
              <span>المعاينة حسب:</span>
              <span className="font-medium text-islamic-600">
                {previewMode === 'mobile' ? 'موبايل (375px)' :
                 previewMode === 'tablet' ? 'تابلت (768px)' : 'سطح المكتب'}
              </span>
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
              onClick={() => {
                setShowModal(false);
                setSelectedSection(null);
              }}
              className="btn-outline"
            >
              <X className="w-4 h-4 ml-2" />
              إلغاء
            </button>
            <button
              onClick={() => {
                if (selectedSection) {
                  setSections(prev =>
                    prev.map(section =>
                      section.id === selectedSection.id
                        ? { ...selectedSection }
                        : section
                    )
                  );
                  setHasChanges(true);
                  success('تم التحديث', 'تم تحديث إعدادات القسم');
                }
                setShowModal(false);
                setSelectedSection(null);
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
