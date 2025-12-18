import React, { useState } from 'react';
import { Save, Download, Plus, Edit, Trash2, X, Check, Loader } from 'lucide-react';

const ButtonTest: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('تم الحفظ بنجاح!');
    }, 2000);
  };

  return (
    <div className="space-y-8 p-8">
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">اختبار الأزرار</h2>

        {/* Primary Buttons */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">الأزرار الأساسية (Primary)</h3>
          <div className="flex flex-wrap gap-4">
            <button className="btn-primary">
              <Save className="w-5 h-5 ml-2" />
              حفظ التغييرات
            </button>

            <button className="btn-primary" disabled>
              <Loader className="w-5 h-5 ml-2 animate-spin" />
              جاري الحفظ...
            </button>

            <button className="btn-primary">
              <Plus className="w-5 h-5 ml-2" />
              إضافة جديد
            </button>

            <button className="btn-primary btn-small">
              <Check className="w-4 h-4 ml-1" />
              زر صغير
            </button>

            <button className="btn-primary btn-large">
              <Download className="w-6 h-6 ml-2" />
              زر كبير
            </button>
          </div>
        </div>

        {/* Secondary Buttons */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">الأزرار الثانوية (Secondary)</h3>
          <div className="flex flex-wrap gap-4">
            <button className="btn-secondary">
              <Download className="w-5 h-5 ml-2" />
              تحميل
            </button>

            <button className="btn-secondary" disabled>
              <Loader className="w-5 h-5 ml-2 animate-spin" />
              جاري التحميل...
            </button>

            <button className="btn-secondary btn-small">
              <Edit className="w-4 h-4 ml-1" />
              تعديل
            </button>
          </div>
        </div>

        {/* Outline Buttons */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">أزرار الحدود (Outline)</h3>
          <div className="flex flex-wrap gap-4">
            <button className="btn-outline">
              <X className="w-5 h-5 ml-2" />
              إلغاء
            </button>

            <button className="btn-outline">
              <Trash2 className="w-5 h-5 ml-2" />
              حذف
            </button>

            <button className="btn-outline" disabled>
              معطل
            </button>
          </div>
        </div>

        {/* Interactive Button */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">زر تفاعلي مع حالة تحميل</h3>
          <button
            onClick={handleSave}
            disabled={loading}
            className="btn-primary"
          >
            {loading ? (
              <>
                <Loader className="w-5 h-5 ml-2 animate-spin" />
                جاري الحفظ...
              </>
            ) : (
              <>
                <Save className="w-5 h-5 ml-2" />
                حفظ
              </>
            )}
          </button>
        </div>

        {/* Modal with Buttons */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">نافذة منبثقة مع أزرار</h3>
          <button onClick={() => setShowModal(true)} className="btn-primary">
            <Plus className="w-5 h-5 ml-2" />
            فتح النافذة المنبثقة
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">نموذج اختبار</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الاسم</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="أدخل الاسم"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الوصف</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="أدخل الوصف..."
                />
              </div>
            </div>

            <div className="sticky bottom-0 bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-end space-x-3 space-x-reverse">
              <button
                onClick={() => setShowModal(false)}
                className="btn-outline"
              >
                <X className="w-5 h-5 ml-2" />
                إلغاء
              </button>
              <button
                onClick={() => {
                  alert('تم الحفظ بنجاح!');
                  setShowModal(false);
                }}
                className="btn-primary"
              >
                <Save className="w-5 h-5 ml-2" />
                حفظ التغييرات
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Form Example */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">نموذج مع أزرار</h2>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">العنوان</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">النوع</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
              <option>اختر النوع</option>
              <option>نوع 1</option>
              <option>نوع 2</option>
            </select>
          </div>

          <div className="flex items-center space-x-3 space-x-reverse pt-4">
            <button type="button" className="btn-outline flex-1">
              <X className="w-5 h-5 ml-2" />
              إلغاء
            </button>
            <button type="submit" className="btn-primary flex-1">
              <Save className="w-5 h-5 ml-2" />
              حفظ
            </button>
          </div>
        </form>
      </div>

      {/* Button Grid */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">شبكة الأزرار</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <button className="btn-primary">
            <Save className="w-5 h-5 ml-2" />
            حفظ
          </button>
          <button className="btn-secondary">
            <Download className="w-5 h-5 ml-2" />
            تحميل
          </button>
          <button className="btn-outline">
            <X className="w-5 h-5 ml-2" />
            إلغاء
          </button>
          <button className="btn-primary btn-small">
            <Plus className="w-4 h-4 ml-1" />
            إضافة
          </button>
          <button className="btn-secondary btn-small">
            <Edit className="w-4 h-4 ml-1" />
            تعديل
          </button>
          <button className="btn-outline btn-small">
            <Trash2 className="w-4 h-4 ml-1" />
            حذف
          </button>
        </div>
      </div>
    </div>
  );
};

export default ButtonTest;
