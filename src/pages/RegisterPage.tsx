import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Lock, User, Mail, Eye, EyeOff, Building } from 'lucide-react';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    department: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError('كلمة المرور غير متطابقة');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
      setLoading(false);
      return;
    }

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
            role: 'admin',
            department: formData.department,
            permissions: ['all']
          }
        }
      });

      if (signUpError) throw signUpError;

      setSuccess('تم إنشاء الحساب بنجاح! يمكنك الآن تسجيل الدخول');

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'حدث خطأ في إنشاء الحساب');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-islamic-50 via-white to-golden-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 geometric-pattern">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <div className="w-24 h-24 islamic-gradient rounded-full flex items-center justify-center shadow-xl animate-float">
              <span className="text-white font-bold text-xl font-display">أوقاف</span>
            </div>
          </div>
          <h2 className="mt-8 text-center text-4xl font-bold text-islamic-800 font-display">
            إنشاء حساب جديد
          </h2>
          <p className="mt-4 text-center text-base text-sage-600 font-body">
            وزارة الأوقاف والشؤون الدينية - دولة فلسطين
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-elegant p-10 border border-islamic-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-islamic-700 mb-2 font-body">
                الاسم الكامل
              </label>
              <div className="mt-1 relative">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="form-input pr-12"
                  placeholder="أدخل اسمك الكامل"
                />
                <User className="absolute right-4 top-4 h-5 w-5 text-sage-400" />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-islamic-700 mb-2 font-body">
                البريد الإلكتروني
              </label>
              <div className="mt-1 relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="form-input pr-12"
                  placeholder="admin@awqaf.gov.ps"
                />
                <Mail className="absolute right-4 top-4 h-5 w-5 text-sage-400" />
              </div>
            </div>

            <div>
              <label htmlFor="department" className="block text-sm font-semibold text-islamic-700 mb-2 font-body">
                القسم
              </label>
              <div className="mt-1 relative">
                <input
                  id="department"
                  name="department"
                  type="text"
                  required
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="form-input pr-12"
                  placeholder="الإدارة العامة"
                />
                <Building className="absolute right-4 top-4 h-5 w-5 text-sage-400" />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-islamic-700 mb-2 font-body">
                كلمة المرور
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="form-input pr-12 pl-12"
                  placeholder="أدخل كلمة المرور (6 أحرف على الأقل)"
                />
                <Lock className="absolute right-4 top-4 h-5 w-5 text-sage-400" />
                <button
                  type="button"
                  className="absolute left-4 top-4 h-5 w-5 text-sage-400 hover:text-sage-600 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-islamic-700 mb-2 font-body">
                تأكيد كلمة المرور
              </label>
              <div className="mt-1 relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="form-input pr-12"
                  placeholder="أعد إدخال كلمة المرور"
                />
                <Lock className="absolute right-4 top-4 h-5 w-5 text-sage-400" />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="mr-3">
                    <p className="text-sm text-red-800 font-body">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="mr-3">
                    <p className="text-sm text-green-800 font-body">{success}</p>
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'جاري إنشاء الحساب...' : 'إنشاء حساب'}
            </button>

            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-sm text-sage-600 font-body">
                لديك حساب؟{' '}
                <Link to="/login" className="font-semibold text-islamic-600 hover:text-islamic-700 transition-colors">
                  تسجيل الدخول
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
