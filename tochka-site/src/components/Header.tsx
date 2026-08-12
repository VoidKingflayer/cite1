import React, { useEffect, useState } from 'react';
import { Menu, X, Calendar, ChevronRight } from 'lucide-react';
import { Magnetic } from '../lib/interactive';

interface HeaderProps {
  onOpenBooking: () => void;
  lang: 'RU' | 'EN';
  setLang: (lang: 'RU' | 'EN') => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking, lang, setLang }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { href: "#about", label: lang === 'RU' ? "О студии" : "About" },
    { href: "#process", label: lang === 'RU' ? "Процесс" : "Process" },
    { href: "#services", label: lang === 'RU' ? "Услуги" : "Services" },
    { href: "#gallery", label: lang === 'RU' ? "Галерея" : "Gallery" },
    { href: "#benefits", label: lang === 'RU' ? "Плюсы" : "Benefits" },
    { href: "#reviews", label: lang === 'RU' ? "Отзывы" : "Reviews" },
    { href: "#contacts", label: lang === 'RU' ? "Контакты" : "Contacts" },
  ];

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      backgroundColor: scrolled ? 'rgba(10, 11, 13, 0.92)' : 'rgba(10, 11, 13, 0.5)',
      backdropFilter: 'blur(20px)',
      borderBottom: scrolled ? '1px solid var(--border-subtle)' : '1px solid transparent',
      transition: 'var(--transition-smooth)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: scrolled ? '72px' : '92px',
        transition: 'var(--transition-smooth)'
      }}>
        {/* Brand Logo */}
        <a href="#" style={{
          textDecoration: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '2px'
        }}>
          <span style={{
            fontFamily: 'var(--font-logo)',
            fontSize: '1.6rem',
            fontWeight: 700,
            letterSpacing: '0.5px',
            color: 'var(--omra-sand-light)',
            lineHeight: 1,
            textTransform: 'lowercase'
          }}>
            tochka<span style={{ color: 'var(--accent)' }}>.</span>
          </span>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.56rem',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            fontWeight: 400
          }}>
            STEEL &amp; SAND SPA
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          {navLinks.map((link, idx) => (
            <Magnetic key={idx} strength={0.4}>
              <a
                href={link.href}
                style={{
                  color: 'var(--text-muted)',
                  textDecoration: 'none',
                  fontSize: '0.75rem',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                  padding: '8px 14px',
                  display: 'inline-block',
                  transition: 'var(--transition-smooth)'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
              >
                {link.label}
              </a>
            </Magnetic>
          ))}
        </nav>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            onClick={() => setLang(lang === 'RU' ? 'EN' : 'RU')}
            style={{
              background: 'transparent',
              border: '1px solid var(--border-subtle)',
              color: 'var(--accent)',
              padding: '6px 14px',
              fontFamily: 'var(--font-mono)',
              cursor: 'pointer',
              fontSize: '0.7rem',
              letterSpacing: '1px',
              transition: 'var(--transition-smooth)'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-subtle)')}
          >
            {lang}
          </button>

          <Magnetic strength={0.3}>
            <button
              onClick={onOpenBooking}
              className="btn-primary desktop-cta"
              style={{ padding: '12px 22px', fontSize: '0.7rem' }}
            >
              <Calendar size={14} />
              {lang === 'RU' ? 'Записаться' : 'Book Now'}
            </button>
          </Magnetic>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-toggle"
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-main)',
              cursor: 'pointer',
              padding: '4px'
            }}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Overlay Menu */}
      {mobileMenuOpen && (
        <div style={{
          backgroundColor: 'var(--bg-dark)',
          borderBottom: '1px solid var(--border-subtle)',
          padding: '28px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          animation: 'fadeIn 0.3s ease'
        }}>
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                color: 'var(--text-main)',
                textDecoration: 'none',
                fontSize: '0.95rem',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: '12px',
                borderBottom: '1px solid var(--border-subtle)'
              }}
            >
              <span>{link.label}</span>
              <ChevronRight size={16} color="var(--accent)" />
            </a>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenBooking();
            }}
            className="btn-primary"
            style={{ width: '100%', marginTop: '12px' }}
          >
            <Calendar size={16} />
            {lang === 'RU' ? 'Записаться на сеанс' : 'Book Appointment'}
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 992px) {
          .desktop-nav { display: none !important; }
          .desktop-cta { display: none !important; }
        }
        @media (min-width: 993px) {
          .mobile-toggle { display: none !important; }
        }
      `}</style>
    </header>
  );
};
