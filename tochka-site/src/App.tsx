import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Highlights } from './components/Highlights';
import { Gallery } from './components/Gallery';
import { Benefits } from './components/Benefits';
import { Reviews } from './components/Reviews';
import { BookingForm } from './components/BookingForm';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [lang, setLang] = useState<'RU' | 'EN'>('RU');
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<string>('');

  const scrollToBooking = (serviceTitle?: string) => {
    if (serviceTitle) {
      setSelectedServiceForBooking(serviceTitle);
    }
    const bookingElem = document.getElementById('booking');
    if (bookingElem) {
      bookingElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-dark)', minHeight: '100vh' }}>
      <Header
        onOpenBooking={() => scrollToBooking()}
        lang={lang}
        setLang={setLang}
      />
      <main>
        <Hero
          onOpenBooking={() => scrollToBooking()}
          lang={lang}
        />
        <About lang={lang} />
        <Services
          onSelectService={(title) => scrollToBooking(title)}
          lang={lang}
        />
        <Highlights lang={lang} />
        <Gallery />
        <Benefits lang={lang} />
        <Reviews lang={lang} />
        <BookingForm
          preselectedService={selectedServiceForBooking}
          lang={lang}
        />
        <Contact lang={lang} />
      </main>
      <Footer lang={lang} />
    </div>
  );
};

export default App;
