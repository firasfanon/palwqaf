import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { useSettings } from '../../hooks/useSettings';

interface PublicLayoutProps {
  children: React.ReactNode;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  const { getSettingBoolean, loading } = useSettings();

  const showHeader = getSettingBoolean('show_menu_bar', true);
  const showFooter = getSettingBoolean('show_footer', true);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {showHeader && <Header />}
      <main className="min-h-screen">
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
};

export default PublicLayout;
