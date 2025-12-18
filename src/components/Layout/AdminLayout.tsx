import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { Menu, X, Bell, User, LogOut, Search } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Sidebar from './Sidebar';

const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();

  // التحقق من تسجيل الدخول
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Top Navigation */}
      <header className="bg-white shadow-elegant border-b border-islamic-200 sticky top-0 z-30">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Right side - Menu and Logo */}
          <div className="flex items-center space-x-4 space-x-reverse">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-xl text-sage-600 hover:bg-islamic-50 lg:hidden transition-colors"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            
            <div className="hidden lg:flex items-center space-x-3 space-x-reverse">
              <div className="w-10 h-10 islamic-gradient rounded-full flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-sm font-display">أوقاف</span>
              </div>
              <div>
                <h1 className="font-bold text-islamic-800 font-display">نظام إدارة الأوقاف</h1>
              </div>
            </div>
          </div>

          {/* Center - Search */}
          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-sage-400 w-5 h-5" />
              <input
                type="text"
                placeholder="البحث السريع..."
                className="form-input pr-12"
              />
            </div>
          </div>

          {/* Left side - User menu */}
          <div className="flex items-center space-x-4 space-x-reverse">
            <button className="relative p-2 text-sage-600 hover:bg-islamic-50 rounded-xl transition-colors">
              <Bell className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
            </button>
            
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="w-10 h-10 bg-islamic-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-islamic-600" />
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-semibold text-islamic-800 font-body">{user?.name}</p>
                <p className="text-xs text-sage-600 font-body">{user?.role}</p>
              </div>
              <button
                onClick={logout}
                className="p-2 text-sage-600 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors"
                title="تسجيل الخروج"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main Content */}
        <main className="flex-1 lg:mr-64">
          <div className="px-2 py-3 lg:px-2 lg:pr-1">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;