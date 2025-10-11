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
import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import { PermissionsProvider } from './contexts/PermissionsContext';

function App() {
  return (
    <AuthProvider>
      <PermissionsProvider>
        <DataProvider>
          <Router>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={
                <div className="min-h-screen bg-gray-50" dir="rtl">
                  <Header />
                  <main className="min-h-screen">
                    <HomePage />
                  </main>
                  <Footer />
                </div>
              } />
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
              
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="homepage" element={<HomePageManagement />} />
                <Route path="national-registry" element={<NationalWaqfRegistryPage />} />
                <Route path="cases" element={<CasesManagement />} />
                <Route path="waqf-lands" element={<WaqfLandsManagement />} />
                <Route path="documents" element={<DocumentsManagement />} />
                <Route path="archive" element={<ElectronicArchive />} />
                <Route path="gis" element={<GISSystem />} />
                <Route path="search" element={<AdvancedSearch />} />
                <Route path="appointments" element={<AppointmentsCalendar />} />
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
        </DataProvider>
      </PermissionsProvider>
    </AuthProvider>
  );
}

export default App;