import React from 'react';
import { Send, MessageSquare, Camera, ArrowUp } from 'lucide-react';

export const Footer: React.FC<{ lang: 'RU' | 'EN' }> = ({ lang }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{
      backgroundColor: '#090a0c',
      borderTop: '1px solid var(--border-subtle)',
      padding: '60px 0 30px',
      color: 'var(--text-muted)'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '40px',
          marginBottom: '48px'
        }}>
          
          {/* Brand Col */}
          <div>
            <span style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.8rem',
              fontWeight: 600,
              letterSpacing: '4px',
              color: 'var(--text-main)',
              display: 'block',
              marginBottom: '12px'
            }}>
              TOCH<span style={{ color: 'var(--accent-gold)' }}>_</span>KA
            </span>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.6, fontWeight: 300, maxWidth: '280px' }}>
              {lang === 'RU'
                ? 'Профессиональный массаж и телесная терапия в Batumi. Точность, тишина, глубокое восстановление.'
                : 'Professional bodywork & massage therapy in Batumi. Precision, silence, deep recovery.'}
            </p>
          </div>

          {/* Nav Links */}
          <div>
            <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--accent-gold)', marginBottom: '16px' }}>
              {lang === 'RU' ? 'Навигация' : 'Navigation'}
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
              <li><a href="#about" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>{lang === 'RU' ? 'О студии' : 'About'}</a></li>
              <li><a href="#services" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>{lang === 'RU' ? 'Коллекция услуг' : 'Services'}</a></li>
              <li><a href="#gallery" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>{lang === 'RU' ? 'Instagram Галерея' : 'Gallery'}</a></li>
              <li><a href="#contacts" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>{lang === 'RU' ? 'Контакты & Карта' : 'Contacts & Map'}</a></li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--accent-gold)', marginBottom: '16px' }}>
              {lang === 'RU' ? 'Социальные сети' : 'Social Media'}
            </h4>
            <div style={{ display: 'flex', gap: '16px' }}>
              <a href="https://t.me/tochka_batumi" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-main)', transition: 'var(--transition-smooth)' }}>
                <Send size={20} />
              </a>
              <a href="https://wa.me/995555000000" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-main)', transition: 'var(--transition-smooth)' }}>
                <MessageSquare size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-main)', transition: 'var(--transition-smooth)' }}>
                <Camera size={20} />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          fontSize: '0.75rem'
        }}>
          <div>
            © 2026 TOCH_KA Bodywork Studio, Batumi, Georgia. {lang === 'RU' ? 'Все права защищены.' : 'All rights reserved.'}
          </div>

          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <a href="#" style={{ color: 'var(--text-subtle)', textDecoration: 'none' }}>
              {lang === 'RU' ? 'Политика конфиденциальности' : 'Privacy Policy'}
            </a>
            <button
              onClick={scrollToTop}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-main)',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              aria-label="Scroll to Top"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
