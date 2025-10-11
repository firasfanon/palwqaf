import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Lock, User, Eye, EyeOff } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // محاكاة تسجيل الدخول
      if (email === 'admin@awqaf.gov.ps' && password === 'admin123') {
        login({ 
          id: 1, 
          email: 'admin@awqaf.gov.ps', 
          name: 'مدير النظام',
          role: 'admin',
          department: 'الإدارة العامة',
          permissions: ['all']
        });
        navigate('/admin');
      } else {
        setError('بيانات تسجيل الدخول غير صحيحة');
      }
    } catch (err) {
      setError('حدث خطأ في تسجيل الدخول');
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
            تسجيل الدخول للوحة التحكم
          </h2>
          <p className="mt-4 text-center text-base text-sage-600 font-body">
            وزارة الأوقاف والشؤون الدينية - دولة فلسطين
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-elegant p-10 border border-islamic-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input pr-12"
                  placeholder="أدخل البريد الإلكتروني"
                />
                <User className="absolute right-4 top-4 h-5 w-5 text-sage-400" />
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
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input pr-12 pl-12"
                  placeholder="أدخل كلمة المرور"
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

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
            </button>

            <div className="text-center pt-4">
              <p className="text-sm text-sage-600 font-body">
              بيانات التجربة: admin@awqaf.gov.ps / admin123
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;