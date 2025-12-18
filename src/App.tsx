import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AdminLayout from './components/Layout/AdminLayout';
import PublicLayout from './components/Layout/PublicLayout';
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
import RegisterPage from './pages/RegisterPage';
import UsersManagement from './pages/admin/UsersManagement';
import AppointmentsCalendar from './pages/admin/AppointmentsCalendar';
import GISSystem from './pages/admin/GISSystem';
import ReportsStatistics from './pages/admin/ReportsStatistics';
import NationalWaqfRegistryPage from './pages/admin/NationalWaqfRegistry';
import GeneralSettings from './pages/admin/GeneralSettings';
import HomePageManagement from './pages/admin/HomePageManagement';
import WebsiteManagement from './pages/admin/WebsiteManagement';
import TasksManagement from './pages/admin/TasksManagement';
import ButtonTest from './pages/admin/ButtonTest';
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
          {/* الصفحة الرئيسية */}
          <Route path="/" element={
            <PublicLayout>
              <HomePage />
            </PublicLayout>
          } />

          {/* صفحات الأخبار */}
          <Route path="/news" element={
            <PublicLayout>
              <NewsPage />
            </PublicLayout>
          } />
          <Route path="/announcements" element={
            <PublicLayout>
              <AnnouncementsPage />
            </PublicLayout>
          } />
          <Route path="/services" element={
            <PublicLayout>
              <ServicesPage />
            </PublicLayout>
          } />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Search and Utility Pages */}
          <Route path="/search" element={
            <PublicLayout>
              <SearchPage />
            </PublicLayout>
          } />
          <Route path="/news/:id" element={
            <PublicLayout>
              <NewsDetailPage />
            </PublicLayout>
          } />
          <Route path="/privacy" element={
            <PublicLayout>
              <PrivacyPolicyPage />
            </PublicLayout>
          } />
          <Route path="/terms" element={
            <PublicLayout>
              <TermsOfServicePage />
            </PublicLayout>
          } />
          <Route path="/sitemap" element={
            <PublicLayout>
              <SitemapPage />
            </PublicLayout>
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
                <Route path="button-test" element={<ButtonTest />} />
              </Route>
              
              {/* Additional Pages */}
          <Route path="/about" element={
            <PublicLayout>
              <AboutPage />
            </PublicLayout>
          } />
          <Route path="/minister" element={
            <PublicLayout>
              <MinisterPage />
            </PublicLayout>
          } />
          <Route path="/vision" element={
            <PublicLayout>
              <VisionMissionPage />
            </PublicLayout>
          } />
          <Route path="/structure" element={
            <PublicLayout>
              <OrganizationalStructurePage />
            </PublicLayout>
          } />
          <Route path="/former-ministers" element={
            <PublicLayout>
              <FormerMinistersPage />
            </PublicLayout>
          } />
          <Route path="/e-services" element={
            <PublicLayout>
              <EServicesPage />
            </PublicLayout>
          } />
          <Route path="/mosques" element={
            <PublicLayout>
              <MosquesPage />
            </PublicLayout>
          } />
          <Route path="/projects" element={
            <PublicLayout>
              <ProjectsPage />
            </PublicLayout>
          } />
          <Route path="/contact" element={
            <PublicLayout>
              <ContactPage />
            </PublicLayout>
          } />
          <Route path="/activities" element={
            <PublicLayout>
              <ActivitiesPage />
            </PublicLayout>
          } />
          <Route path="/social-services" element={
            <PublicLayout>
              <SocialServicesPage />
            </PublicLayout>
          } />
          <Route path="/friday-sermons" element={
            <PublicLayout>
              <FridaySermonsPage />
            </PublicLayout>
          } />
          <Route path="/notifications" element={
            <PublicLayout>
              <NotificationsPage />
            </PublicLayout>
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