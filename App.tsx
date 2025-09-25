import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './components/pages/HomePage';
import AboutUsPage from './components/pages/AboutUsPage';
import EventsPage from './components/pages/EventsPage';
import PublicationsPage from './components/pages/PublicationsPage';
import MembershipPage from './components/pages/MembershipPage';
import GalleryPage from './components/pages/GalleryPage';
import ContactPage from './components/pages/ContactPage';
import ScrollToTop from './components/layout/ScrollToTop';
import OurTeamPage from './components/pages/OurTeamPage';
import AchievementsPage from './components/pages/AchievementsPage';
import AllPublicationsPage from './components/pages/AllPublicationsPage';
import AllPastEventsPage from './components/pages/AllPastEventsPage';
import AlbumDetailPage from './components/pages/AlbumDetailPage';

const App: React.FC = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-slate-50">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/about/our-team" element={<OurTeamPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/events/past" element={<AllPastEventsPage />} />
            <Route path="/publications" element={<PublicationsPage />} />
            <Route path="/achievements" element={<AchievementsPage />} />
            <Route path="/publications/all" element={<AllPublicationsPage />} />
            <Route path="/membership" element={<MembershipPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/gallery/:albumId" element={<AlbumDetailPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;