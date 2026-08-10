import React from 'react';
import { ArrowRight, MapPin, ShieldCheck, Sparkles } from 'lucide-react';
import { STOCK_IMAGES } from '../data';

interface HeroProps {
  onOpenBooking: () => void;
  lang: 'RU' | 'EN';
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, lang }) => {
  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      paddingTop: '100px',
      overflow: 'hidden',
      backgroundColor: 'var(--bg-dark)'
    }}>
      {/* Background Mood Image with Editorial Gradient Overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
        backgroundImage: `url(${STOCK_IMAGES.hero})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 30%',
        opacity: 0.38,
        filter: 'contrast(105%) saturate(85%)'
      }} />

      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 2,
        background: 'radial-gradient(circle at center, rgba(13, 14, 16, 0.4) 0%, rgba(13, 14, 16, 0.95) 85%)'
      }} />

      {/* Main Hero Content Container */}
      <div className="container" style={{ position: 'relative', zIndex: 3, width: '100%' }}>
        <div style={{ maxWidth: '820px' }}>
          
          {/* Location Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            backgroundColor: 'rgba(200, 169, 126, 0.08)',
            border: '1px solid var(--border-gold)',
            borderRadius: '30px',
            marginBottom: '28px',
            backdropFilter: 'blur(10px)'
          }}>
            <MapPin size={14} color="var(--accent-gold)" />
            <span style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.75rem',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: 'var(--accent-gold-light)',
              fontWeight: 500
            }}>
              BATUMI, GEORGIA • PRIVATE WELLNESS STUDIO
            </span>
          </div>

          {/* Main Title */}
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.8rem, 6.5vw, 5.2rem)',
            fontWeight: 300,
            lineHeight: 1.08,
            letterSpacing: '-0.5px',
            color: 'var(--text-main)',
            marginBottom: '24px'
          }}>
            Профессиональный массаж в Batumi.{' '}
            <span style={{
              fontStyle: 'italic',
              color: 'var(--accent-gold)',
              fontWeight: 400
            }}>
              Точность, тишина, восстановление.
            </span>
          </h1>

          {/* Subtitle / Value Statement */}
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: 'var(--text-muted)',
            fontWeight: 300,
            lineHeight: 1.7,
            marginBottom: '40px',
            maxWidth: '640px'
          }}>
            {lang === 'RU'
              ? 'Персональная телесная терапия в уединенной атмосфере dark editorial luxury. Освободите тело от гипертонуса и верните внутренний баланс.'
              : 'Personal body therapy in an intimate dark editorial luxury setting. Release physical tension and recover your natural balance.'}
          </p>

          {/* Call to Actions */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            alignItems: 'center',
            marginBottom: '60px'
          }}>
            <button onClick={onOpenBooking} className="btn-primary">
              <span>{lang === 'RU' ? 'Записаться на сеанс' : 'Book Appointment'}</span>
              <ArrowRight size={16} />
            </button>

            <a href="#services" className="btn-secondary">
              {lang === 'RU' ? 'Смотреть услуги' : 'Explore Services'}
            </a>
          </div>

          {/* Trust Highlights Strip */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '32px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <ShieldCheck size={20} color="var(--accent-gold)" />
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                100% Приватность и комфорт
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Sparkles size={20} color="var(--accent-gold)" />
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Индивидуальный подбор техник
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
