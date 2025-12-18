import React, { useState, useEffect } from 'react';
import { MapPin, Plus, Edit, Trash2, Save, X, Loader, Building2, Map } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useToast } from '../../hooks/useToast';

interface Governorate {
  id: string;
  name_ar: string;
  name_en: string;
  code: string;
  region: string;
  created_at?: string;
  updated_at?: string;
}

interface Location {
  id: number;
  governorate_code: string;
  name: string;
  type: 'City' | 'Village' | 'Camp';
  code?: string;
}

interface LocationsManagerProps {
  onClose: () => void;
}

const LocationsManager: React.FC<LocationsManagerProps> = ({ onClose }) => {
  const { success, error: showError } = useToast();
  const [activeTab, setActiveTab] = useState<'governorates' | 'locations'>('governorates');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Governorates state
  const [governorates, setGovernorates] = useState<Governorate[]>([]);
  const [showGovernorateModal, setShowGovernorateModal] = useState(false);
  const [editingGovernorate, setEditingGovernorate] = useState<Governorate | null>(null);
  const [governorateForm, setGovernorateForm] = useState({
    name_ar: '',
    name_en: '',
    code: '',
    region: 'west_bank'
  });

  // Locations state
  const [locations, setLocations] = useState<Location[]>([]);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  const [locationForm, setLocationForm] = useState({
    governorate_code: '',
    name: '',
    type: 'City' as 'City' | 'Village' | 'Camp',
    code: ''
  });

  useEffect(() => {
    loadGovernorates();
    loadLocations();
  }, []);

  const loadGovernorates = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('governorates')
        .select('*')
        .order('name_ar');

      if (error) throw error;
      setGovernorates(data || []);
    } catch (err: any) {
      showError('خطأ', 'فشل تحميل المحافظات');
      console.error('Error loading governorates:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadLocations = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('locations')
        .select('*')
        .order('name');

      if (error) throw error;
      setLocations(data || []);
    } catch (err: any) {
      showError('خطأ', 'فشل تحميل المدن والقرى');
      console.error('Error loading locations:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveGovernorate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);

      if (editingGovernorate) {
        const { error } = await supabase
          .from('governorates')
          .update({
            name_ar: governorateForm.name_ar,
            name_en: governorateForm.name_en,
            code: governorateForm.code,
            region: governorateForm.region,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingGovernorate.id);

        if (error) throw error;
        success('تم التحديث', 'تم تحديث المحافظة بنجاح');
      } else {
        const { error } = await supabase
          .from('governorates')
          .insert({
            name_ar: governorateForm.name_ar,
            name_en: governorateForm.name_en,
            code: governorateForm.code,
            region: governorateForm.region
          });

        if (error) throw error;
        success('تم الإضافة', 'تم إضافة المحافظة بنجاح');
      }

      setShowGovernorateModal(false);
      setEditingGovernorate(null);
      setGovernorateForm({ name_ar: '', name_en: '', code: '', region: 'west_bank' });
      loadGovernorates();
    } catch (err: any) {
      showError('خطأ', err.message || 'فشل حفظ المحافظة');
      console.error('Error saving governorate:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteGovernorate = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذه المحافظة؟')) return;

    try {
      const { error } = await supabase
        .from('governorates')
        .delete()
        .eq('id', id);

      if (error) throw error;
      success('تم الحذف', 'تم حذف المحافظة بنجاح');
      loadGovernorates();
    } catch (err: any) {
      showError('خطأ', err.message || 'فشل حذف المحافظة');
      console.error('Error deleting governorate:', err);
    }
  };

  const handleSaveLocation = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);

      if (editingLocation) {
        const { error } = await supabase
          .from('locations')
          .update({
            governorate_code: locationForm.governorate_code,
            name: locationForm.name,
            type: locationForm.type,
            code: locationForm.code || null
          })
          .eq('id', editingLocation.id);

        if (error) throw error;
        success('تم التحديث', 'تم تحديث الموقع بنجاح');
      } else {
        const { error } = await supabase
          .from('locations')
          .insert({
            governorate_code: locationForm.governorate_code,
            name: locationForm.name,
            type: locationForm.type,
            code: locationForm.code || null
          });

        if (error) throw error;
        success('تم الإضافة', 'تم إضافة الموقع بنجاح');
      }

      setShowLocationModal(false);
      setEditingLocation(null);
      setLocationForm({ governorate_code: '', name: '', type: 'City', code: '' });
      loadLocations();
    } catch (err: any) {
      showError('خطأ', err.message || 'فشل حفظ الموقع');
      console.error('Error saving location:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteLocation = async (id: number) => {
    if (!confirm('هل أنت متأكد من حذف هذا الموقع؟')) return;

    try {
      const { error } = await supabase
        .from('locations')
        .delete()
        .eq('id', id);

      if (error) throw error;
      success('تم الحذف', 'تم حذف الموقع بنجاح');
      loadLocations();
    } catch (err: any) {
      showError('خطأ', err.message || 'فشل حذف الموقع');
      console.error('Error deleting location:', err);
    }
  };

  const handleEditGovernorate = (gov: Governorate) => {
    setEditingGovernorate(gov);
    setGovernorateForm({
      name_ar: gov.name_ar,
      name_en: gov.name_en,
      code: gov.code,
      region: gov.region
    });
    setShowGovernorateModal(true);
  };

  const handleEditLocation = (loc: Location) => {
    setEditingLocation(loc);
    setLocationForm({
      governorate_code: loc.governorate_code,
      name: loc.name,
      type: loc.type,
      code: loc.code || ''
    });
    setShowLocationModal(true);
  };

  const getGovernorateNameByCode = (code: string) => {
    const gov = governorates.find(g => g.code === code);
    return gov ? gov.name_ar : code;
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'City': return 'مدينة';
      case 'Village': return 'قرية';
      case 'Camp': return 'مخيم';
      default: return type;
    }
  };

  const getRegionLabel = (region: string) => {
    switch (region) {
      case 'west_bank': return 'الضفة الغربية';
      case 'gaza': return 'قطاع غزة';
      case 'jerusalem': return 'القدس';
      default: return region;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-islamic-800">إدارة المحافظات والمواقع</h2>
            <p className="text-sm text-gray-600 mt-1">إدارة المحافظات والمدن والقرى في فلسطين</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('governorates')}
            className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
              activeTab === 'governorates'
                ? 'text-islamic-600 border-b-2 border-islamic-600 bg-islamic-50'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Map className="w-5 h-5 inline-block ml-2" />
            المحافظات
          </button>
          <button
            onClick={() => setActiveTab('locations')}
            className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
              activeTab === 'locations'
                ? 'text-islamic-600 border-b-2 border-islamic-600 bg-islamic-50'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Building2 className="w-5 h-5 inline-block ml-2" />
            المدن والقرى
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'governorates' ? (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  المحافظات ({governorates.length})
                </h3>
                <button
                  onClick={() => {
                    setEditingGovernorate(null);
                    setGovernorateForm({ name_ar: '', name_en: '', code: '', region: 'west_bank' });
                    setShowGovernorateModal(true);
                  }}
                  className="btn-primary"
                >
                  <Plus className="w-4 h-4 ml-2" />
                  إضافة محافظة
                </button>
              </div>

              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader className="w-8 h-8 animate-spin text-islamic-600" />
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase">الاسم بالعربية</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase">الاسم بالإنجليزية</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase">الرمز</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase">المنطقة</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase">الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {governorates.map((gov) => (
                        <tr key={gov.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm text-gray-900">{gov.name_ar}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{gov.name_en}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                              {gov.code}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">{getRegionLabel(gov.region)}</td>
                          <td className="px-6 py-4 text-sm">
                            <div className="flex items-center space-x-2 space-x-reverse">
                              <button
                                onClick={() => handleEditGovernorate(gov)}
                                className="text-blue-600 hover:text-blue-800"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteGovernorate(gov.id)}
                                className="text-red-600 hover:text-red-800"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  المدن والقرى ({locations.length})
                </h3>
                <button
                  onClick={() => {
                    setEditingLocation(null);
                    setLocationForm({ governorate_code: '', name: '', type: 'City', code: '' });
                    setShowLocationModal(true);
                  }}
                  className="btn-primary"
                >
                  <Plus className="w-4 h-4 ml-2" />
                  إضافة موقع
                </button>
              </div>

              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader className="w-8 h-8 animate-spin text-islamic-600" />
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase">الاسم</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase">النوع</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase">المحافظة</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase">الرمز</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase">الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {locations.map((loc) => (
                        <tr key={loc.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm text-gray-900">{loc.name}</td>
                          <td className="px-6 py-4 text-sm">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              loc.type === 'City' ? 'bg-green-100 text-green-800' :
                              loc.type === 'Village' ? 'bg-blue-100 text-blue-800' :
                              'bg-orange-100 text-orange-800'
                            }`}>
                              {getTypeLabel(loc.type)}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {getGovernorateNameByCode(loc.governorate_code)}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {loc.code && (
                              <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
                                {loc.code}
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <div className="flex items-center space-x-2 space-x-reverse">
                              <button
                                onClick={() => handleEditLocation(loc)}
                                className="text-blue-600 hover:text-blue-800"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteLocation(loc.id)}
                                className="text-red-600 hover:text-red-800"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Governorate Modal */}
      {showGovernorateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {editingGovernorate ? 'تعديل محافظة' : 'إضافة محافظة جديدة'}
            </h3>
            <form onSubmit={handleSaveGovernorate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الاسم بالعربية</label>
                <input
                  type="text"
                  required
                  value={governorateForm.name_ar}
                  onChange={(e) => setGovernorateForm({ ...governorateForm, name_ar: e.target.value })}
                  className="form-input"
                  placeholder="القدس"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الاسم بالإنجليزية</label>
                <input
                  type="text"
                  required
                  value={governorateForm.name_en}
                  onChange={(e) => setGovernorateForm({ ...governorateForm, name_en: e.target.value })}
                  className="form-input"
                  placeholder="Jerusalem"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الرمز</label>
                <input
                  type="text"
                  required
                  value={governorateForm.code}
                  onChange={(e) => setGovernorateForm({ ...governorateForm, code: e.target.value })}
                  className="form-input"
                  placeholder="JRS"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">المنطقة</label>
                <select
                  value={governorateForm.region}
                  onChange={(e) => setGovernorateForm({ ...governorateForm, region: e.target.value })}
                  className="form-select"
                >
                  <option value="west_bank">الضفة الغربية</option>
                  <option value="gaza">قطاع غزة</option>
                  <option value="jerusalem">القدس</option>
                </select>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowGovernorateModal(false);
                    setEditingGovernorate(null);
                  }}
                  className="btn-outline flex-1"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="btn-primary flex-1"
                >
                  {saving ? (
                    <>
                      <Loader className="w-4 h-4 ml-2 animate-spin" />
                      جاري الحفظ...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 ml-2" />
                      حفظ
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Location Modal */}
      {showLocationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {editingLocation ? 'تعديل موقع' : 'إضافة موقع جديد'}
            </h3>
            <form onSubmit={handleSaveLocation} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الاسم</label>
                <input
                  type="text"
                  required
                  value={locationForm.name}
                  onChange={(e) => setLocationForm({ ...locationForm, name: e.target.value })}
                  className="form-input"
                  placeholder="رام الله"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">النوع</label>
                <select
                  value={locationForm.type}
                  onChange={(e) => setLocationForm({ ...locationForm, type: e.target.value as any })}
                  className="form-select"
                >
                  <option value="City">مدينة</option>
                  <option value="Village">قرية</option>
                  <option value="Camp">مخيم</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">المحافظة</label>
                <select
                  required
                  value={locationForm.governorate_code}
                  onChange={(e) => setLocationForm({ ...locationForm, governorate_code: e.target.value })}
                  className="form-select"
                >
                  <option value="">اختر المحافظة</option>
                  {governorates.map((gov) => (
                    <option key={gov.id} value={gov.code}>
                      {gov.name_ar}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الرمز (اختياري)</label>
                <input
                  type="text"
                  value={locationForm.code}
                  onChange={(e) => setLocationForm({ ...locationForm, code: e.target.value })}
                  className="form-input"
                  placeholder="RAM"
                />
              </div>
              <div className="flex items-center space-x-3 space-x-reverse pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowLocationModal(false);
                    setEditingLocation(null);
                  }}
                  className="btn-outline flex-1"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="btn-primary flex-1"
                >
                  {saving ? (
                    <>
                      <Loader className="w-4 h-4 ml-2 animate-spin" />
                      جاري الحفظ...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 ml-2" />
                      حفظ
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationsManager;
