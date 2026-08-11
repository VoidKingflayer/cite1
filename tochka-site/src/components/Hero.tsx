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
      paddingTop: '120px',
      paddingBottom: '80px',
      overflow: 'hidden',
      backgroundColor: 'var(--bg-dark)'
    }}>
      {/* Background Mood Image with Warm Editorial Earthy Gradient Overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
        backgroundImage: `url(${STOCK_IMAGES.hero})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 35%',
        opacity: 0.28,
        filter: 'contrast(118%) saturate(0%)'
      }} />

      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 2,
        background: 'radial-gradient(ellipse at center, rgba(13, 14, 16, 0.4) 0%, rgba(13, 14, 16, 0.97) 82%)'
      }} />

      {/* Main Hero Content Container */}
      <div className="container" style={{ position: 'relative', zIndex: 3, width: '100%' }}>
        <div style={{ maxWidth: '880px', textAlign: 'center', margin: '0 auto' }}>
          
          {/* Location Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '7px',
            padding: '5px 14px',
            backgroundColor: 'rgba(233, 231, 226, 0.04)',
            border: '1px solid var(--border-taupe)',
            borderRadius: '0px',
            marginBottom: '32px',
            backdropFilter: 'blur(12px)'
          }}>
            <MapPin size={11} color="var(--omra-taupe)" />
            <span style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.62rem',
              letterSpacing: '2.5px',
              textTransform: 'uppercase',
              color: 'var(--omra-sand-mid)',
              fontWeight: 500
            }}>
              Batumi, Georgia — Private Bodywork Sanctuary
            </span>
          </div>

          {/* Main Title - Replicating Clean Monoline Display from Omra Spa */}
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.4rem, 5vw, 4.5rem)',
            fontWeight: 300,
            lineHeight: 1.15,
            letterSpacing: '6px',
            textTransform: 'uppercase',
            color: 'var(--omra-sand-light)',
            marginBottom: '28px'
          }}>
            Профессиональный массаж в Batumi.{' '}
            <span style={{
              fontFamily: 'var(--font-display)',
              textTransform: 'uppercase',
              color: 'var(--omra-taupe)',
              fontWeight: 300,
              fontStyle: 'italic',
              display: 'block',
              marginTop: '12px',
              fontSize: '0.85em',
              letterSpacing: '5px'
            }}>
              Точность • Тишина • Восстановление
            </span>
          </h1>

          <div className="omra-divider" style={{ marginBottom: '36px' }} />

          {/* Subtitle Statement */}
          <p style={{
            fontSize: 'clamp(0.98rem, 1.6vw, 1.15rem)',
            color: 'var(--text-muted)',
            fontWeight: 300,
            lineHeight: 1.85,
            marginBottom: '48px',
            maxWidth: '680px',
            margin: '0 auto 48px'
          }}>
            {lang === 'RU'
              ? 'Персональная телесная терапия в уединенной атмосфере dark editorial luxury. Освободите тело от гипертонуса и верните внутренний баланс.'
              : 'Personal body therapy in an intimate dark editorial luxury setting. Release physical tension and recover your natural balance.'}
          </p>

          {/* Call to Actions */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '64px'
          }}>
            <button onClick={onOpenBooking} className="btn-primary">
              <span>{lang === 'RU' ? 'Записаться на сеанс' : 'Book Appointment'}</span>
              <ArrowRight size={15} />
            </button>

            <a href="#services" className="btn-secondary">
              {lang === 'RU' ? 'Смотреть услуги' : 'Explore Services'}
            </a>
          </div>

          {/* Trust Highlights Strip */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '24px',
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '36px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
              <ShieldCheck size={18} color="var(--omra-taupe)" />
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', letterSpacing: '2px', textTransform: 'uppercase' }}>
                100% Приватность
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
              <Sparkles size={18} color="var(--omra-taupe)" />
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', letterSpacing: '2px', textTransform: 'uppercase' }}>
                Индивидуальные техники
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
