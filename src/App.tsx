import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Aims from './pages/Aims';
import Events from './pages/Events';
import NoticeBoardPage from './pages/NoticeBoardPage';
import MembersPage from './pages/MembersPage';
import Achievements from './pages/Achievements';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import RegistrationForm from './pages/RegistrationForm';

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/aims" element={<Aims />} />
            <Route path="/events" element={<Events />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/notices" element={<NoticeBoardPage />} />
            <Route path="/members" element={<MembersPage />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Layout>
      </Router>
    </LanguageProvider>
  );
}
