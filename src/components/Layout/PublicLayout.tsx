import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { useSettings } from '../../hooks/useSettings';

interface PublicLayoutProps {
  children: React.ReactNode;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  const { getSettingBoolean, loading } = useSettings();

  const showHeader = !loading ? getSettingBoolean('show_menu_bar', true) : true;
  const showFooter = !loading ? getSettingBoolean('show_footer', true) : true;

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
