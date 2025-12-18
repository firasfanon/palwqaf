import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AdminLayout from './components/Layout/AdminLayout';
import HomePage from './pages/HomePage';
import NewsPage from './pages/NewsPage';
import AnnouncementsPage from './pages/AnnouncementsPage';
import ServicesPage from './pages/ServicesPage';
import Dashboard from './pages/admin/Dashboard';
import CasesManagement from './pages/admin/CasesManagement';
import WaqfLandsManagement from './pages/admin/WaqfLandsManagement';
import DocumentsManagement from './pages/admin/DocumentsManagement';
import ElectronicArchive from './pages/admin/ElectronicArchive';
import AdvancedSearch from './pages/admin/AdvancedSearch';
import LoginPage from './pages/LoginPage';
import UsersManagement from './pages/admin/UsersManagement';
import AppointmentsCalendar from './pages/admin/AppointmentsCalendar';
import GISSystem from './pages/admin/GISSystem';
import ReportsStatistics from './pages/admin/ReportsStatistics';
import NationalWaqfRegistryPage from './pages/admin/NationalWaqfRegistry';
import GeneralSettings from './pages/admin/GeneralSettings';
import HomePageManagement from './pages/admin/HomePageManagement';
import WebsiteManagement from './pages/admin/WebsiteManagement';
import TasksManagement from './pages/admin/TasksManagement';
import AboutPage from './pages/AboutPage';
import MinisterPage from './pages/MinisterPage';
import VisionMissionPage from './pages/VisionMissionPage';
import OrganizationalStructurePage from './pages/OrganizationalStructurePage';
import FormerMinistersPage from './pages/FormerMinistersPage';
import ActivitiesPage from './pages/ActivitiesPage';
import SocialServicesPage from './pages/SocialServicesPage';
import FridaySermonsPage from './pages/FridaySermonsPage';
import MosquesPage from './pages/MosquesPage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';
import EServicesPage from './pages/EServicesPage';
import NotificationsPage from './pages/NotificationsPage';
import SearchPage from './pages/SearchPage';
import NewsDetailPage from './pages/NewsDetailPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import SitemapPage from './pages/SitemapPage';
import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import { PermissionsProvider } from './contexts/PermissionsContext';
import { ToastContainer } from './components/UI';
import { useToast } from './hooks/useToast';

const AppContent = () => {
  const { toasts, removeToast } = useToast();
  
  return (
    <>
      <Router>
        <Routes>
          {/* جميع المسارات الموجودة */}
          <Route path="/" element={
            <div className="min-h-screen bg-gray-50" dir="rtl">
              <Header />
              <main className="min-h-screen">
                <HomePage />
              </main>
              <Footer />
            </div>
          } />
          {/* باقي المسارات... */}
              <Route path="/news" element={
                <div className="min-h-screen bg-gray-50" dir="rtl">
                  <Header />
                  <main className="min-h-screen">
                    <NewsPage />
                  </main>
                  <Footer />
                </div>
              } />
              <Route path="/announcements" element={
                <div className="min-h-screen bg-gray-50" dir="rtl">
                  <Header />
                  <main className="min-h-screen">
                    <AnnouncementsPage />
                  </main>
                  <Footer />
                </div>
              } />
              <Route path="/services" element={
                <div className="min-h-screen bg-gray-50" dir="rtl">
                  <Header />
                  <main className="min-h-screen">
                    <ServicesPage />
                  </main>
                  <Footer />
                </div>
              } />
              <Route path="/login" element={<LoginPage />} />
              
              {/* Search and Utility Pages */}
              <Route path="/search" element={
                <div className="min-h-screen bg-gray-50" dir="rtl">
                  <Header />
                  <main className="min-h-screen">
                    <SearchPage />
                  </main>
                  <Footer />
                </div>
              } />
              <Route path="/news/:id" element={
                <div className="min-h-screen bg-gray-50" dir="rtl">
                  <Header />
                  <main className="min-h-screen">
                    <NewsDetailPage />
                  </main>
                  <Footer />
                </div>
              } />
              <Route path="/privacy" element={
                <div className="min-h-screen bg-gray-50" dir="rtl">
                  <Header />
                  <main className="min-h-screen">
                    <PrivacyPolicyPage />
                  </main>
                  <Footer />
                </div>
              } />
              <Route path="/terms" element={
                <div className="min-h-screen bg-gray-50" dir="rtl">
                  <Header />
                  <main className="min-h-screen">
                    <TermsOfServicePage />
                  </main>
                  <Footer />
                </div>
              } />
              <Route path="/sitemap" element={
                <div className="min-h-screen bg-gray-50" dir="rtl">
                  <Header />
                  <main className="min-h-screen">
                    <SitemapPage />
                  </main>
                  <Footer />
                </div>
              } />
              
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="homepage" element={<HomePageManagement />} />
                <Route path="website" element={<WebsiteManagement />} />
                <Route path="national-registry" element={<NationalWaqfRegistryPage />} />
                <Route path="cases" element={<CasesManagement />} />
                <Route path="waqf-lands" element={<WaqfLandsManagement />} />
                <Route path="documents" element={<DocumentsManagement />} />
                <Route path="archive" element={<ElectronicArchive />} />
                <Route path="gis" element={<GISSystem />} />
                <Route path="search" element={<AdvancedSearch />} />
                <Route path="appointments" element={<AppointmentsCalendar />} />
                <Route path="tasks" element={<TasksManagement />} />
                <Route path="users" element={<UsersManagement />} />
                <Route path="reports" element={<ReportsStatistics />} />
                <Route path="notifications" element={<NotificationsPage />} />
                <Route path="settings" element={<GeneralSettings />} />
              </Route>
              
              {/* Additional Pages */}
              <Route path="/about" element={
                <div className="min-h-screen bg-gray-50" dir="rtl">
                  <Header />
                  <main className="min-h-screen">
                    <AboutPage />
                  </main>
                  <Footer />
                </div>
              } />
              <Route path="/minister" element={
                <div className="min-h-screen bg-gray-50" dir="rtl">
                  <Header />
                  <main className="min-h-screen">
                    <MinisterPage />
                  </main>
                  <Footer />
                </div>
              } />
              <Route path="/vision" element={
                <div className="min-h-screen bg-gray-50" dir="rtl">
                  <Header />
                  <main className="min-h-screen">
                    <VisionMissionPage />
                  </main>
                  <Footer />
                </div>
              } />
              <Route path="/structure" element={
                <div className="min-h-screen bg-gray-50" dir="rtl">
                  <Header />
                  <main className="min-h-screen">
                    <OrganizationalStructurePage />
                  </main>
                  <Footer />
                </div>
              } />
              <Route path="/former-ministers" element={
                <div className="min-h-screen bg-gray-50" dir="rtl">
                  <Header />
                  <main className="min-h-screen">
                    <FormerMinistersPage />
                  </main>
                  <Footer />
                </div>
              } />
              <Route path="/e-services" element={
                <div className="min-h-screen bg-gray-50" dir="rtl">
                  <Header />
                  <main className="min-h-screen">
                    <EServicesPage />
                  </main>
                  <Footer />
                </div>
              } />
              <Route path="/e-services" element={
                <div className="min-h-screen bg-gray-50" dir="rtl">
                  <Header />
                  <main className="min-h-screen">
                    <EServicesPage />
                  </main>
                  <Footer />
                </div>
              } />
              <Route path="/mosques" element={
                <div className="min-h-screen bg-gray-50" dir="rtl">
                  <Header />
                  <main className="min-h-screen">
                    <MosquesPage />
                  </main>
                  <Footer />
                </div>
              } />
              <Route path="/projects" element={
                <div className="min-h-screen bg-gray-50" dir="rtl">
                  <Header />
                  <main className="min-h-screen">
                    <ProjectsPage />
                  </main>
                  <Footer />
                </div>
              } />
              <Route path="/contact" element={
                <div className="min-h-screen bg-gray-50" dir="rtl">
                  <Header />
                  <main className="min-h-screen">
                    <ContactPage />
                  </main>
                  <Footer />
                </div>
              } />
              <Route path="/activities" element={
                <div className="min-h-screen bg-gray-50" dir="rtl">
                  <Header />
                  <main className="min-h-screen">
                    <ActivitiesPage />
                  </main>
                  <Footer />
                </div>
              } />
              <Route path="/social-services" element={
                <div className="min-h-screen bg-gray-50" dir="rtl">
                  <Header />
                  <main className="min-h-screen">
                    <SocialServicesPage />
                  </main>
                  <Footer />
                </div>
              } />
              <Route path="/friday-sermons" element={
                <div className="min-h-screen bg-gray-50" dir="rtl">
                  <Header />
                  <main className="min-h-screen">
                    <FridaySermonsPage />
                  </main>
                  <Footer />
                </div>
              } />
        </Routes>
      </Router>
      <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <PermissionsProvider>
        <DataProvider>
          <AppContent />
        </DataProvider>
      </PermissionsProvider>
    </AuthProvider>
  );
}

export default App;