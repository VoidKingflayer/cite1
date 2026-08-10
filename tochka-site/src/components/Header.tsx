import React, { useState } from 'react';
import { Menu, X, Calendar, ChevronRight } from 'lucide-react';

interface HeaderProps {
  onOpenBooking: () => void;
  lang: 'RU' | 'EN';
  setLang: (lang: 'RU' | 'EN') => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking, lang, setLang }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "#about", label: lang === 'RU' ? "О студии" : "About" },
    { href: "#services", label: lang === 'RU' ? "Услуги" : "Services" },
    { href: "#highlights", label: lang === 'RU' ? "Инфо" : "Highlights" },
    { href: "#gallery", label: lang === 'RU' ? "Галерея" : "Gallery" },
    { href: "#benefits", label: lang === 'RU' ? "Преимущества" : "Benefits" },
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
      backgroundColor: 'rgba(13, 14, 16, 0.85)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-subtle)',
      transition: 'var(--transition-smooth)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '80px'
      }}>
        {/* Brand Logo */}
        <a href="#" style={{
          textDecoration: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start'
        }}>
          <span style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.75rem',
            fontWeight: 600,
            letterSpacing: '4px',
            color: 'var(--text-main)',
            lineHeight: 1
          }}>
            TOCH<span style={{ color: 'var(--accent-gold)' }}>_</span>KA
          </span>
          <span style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.625rem',
            letterSpacing: '2.5px',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            marginTop: '4px'
          }}>
            BATUMI • BODYWORK
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '28px'
        }}>
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              style={{
                color: 'var(--text-muted)',
                textDecoration: 'none',
                fontSize: '0.8125rem',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                fontWeight: 500,
                transition: 'var(--transition-smooth)'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-gold)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Language Toggle */}
          <button
            onClick={() => setLang(lang === 'RU' ? 'EN' : 'RU')}
            style={{
              background: 'transparent',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-muted)',
              padding: '6px 12px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.75rem',
              letterSpacing: '1px',
              transition: 'var(--transition-smooth)'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent-gold)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-subtle)')}
          >
            {lang}
          </button>

          {/* CTA Book Button */}
          <button
            onClick={onOpenBooking}
            className="btn-primary desktop-cta"
            style={{ padding: '10px 20px', fontSize: '0.75rem' }}
          >
            <Calendar size={14} />
            {lang === 'RU' ? 'Записаться' : 'Book Now'}
          </button>

          {/* Mobile Menu Toggle Button */}
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
          padding: '24px',
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
                fontSize: '1rem',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: '12px',
                borderBottom: '1px solid var(--border-subtle)'
              }}
            >
              <span>{link.label}</span>
              <ChevronRight size={16} color="var(--accent-gold)" />
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
