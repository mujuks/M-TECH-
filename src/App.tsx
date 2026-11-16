import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';
import { WhatsAppFab } from './components/WhatsAppFab';
import { ButtonLink } from './components/Button';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Portfolio } from './pages/Portfolio';
import { Contact } from './pages/Contact';

function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      window.requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        else window.scrollTo({ top: 0, behavior: 'auto' });
      });
      return;
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname, hash]);

  return null;
}

function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center bg-ice/60 px-6 text-center">
      <p className="font-display text-7xl font-extrabold text-electric">404</p>
      <h1 className="mt-4 font-display text-2xl font-extrabold text-navy sm:text-3xl">
        Page not found
      </h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <ButtonLink to="/">Back to Home</ButtonLink>
        <ButtonLink to="/contact" variant="ghost">
          Contact Us
        </ButtonLink>
      </div>
      <Link to="/portfolio" className="mt-5 text-sm font-semibold text-electric hover:underline">
        Or browse our portfolio
      </Link>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
      <BackToTop />
      <WhatsAppFab />
    </BrowserRouter>
  );
}
