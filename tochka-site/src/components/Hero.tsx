import React from 'react';
import { ArrowRight, ArrowDown, MapPin, ShieldCheck, Sparkles } from 'lucide-react';
import { STOCK_IMAGES } from '../data';
import { Magnetic, MagneticField, Reveal } from '../lib/interactive';

interface HeroProps {
  onOpenBooking: () => void;
  lang: 'RU' | 'EN';
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, lang }) => {
  return (
    <MagneticField
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '120px',
        paddingBottom: '80px',
        overflow: 'hidden',
        backgroundColor: 'var(--bg-dark)'
      }}
    >
      <section style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        {/* Background mood image — neutral b&w, tinted with the steel/sand duotone wash */}
        <div className="duotone-steel" style={{ position: 'absolute', inset: 0 }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${STOCK_IMAGES.hero})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 35%',
            opacity: 0.38,
            filter: 'contrast(115%)'
          }} />
        </div>

        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, rgba(10, 11, 13, 0.35) 0%, rgba(10, 11, 13, 0.96) 82%)'
        }} />
      </section>

      {/* Technical corner labels */}
      <span style={{
        position: 'absolute', top: '108px', left: '32px', zIndex: 3,
        fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '1px',
        color: 'var(--text-subtle)', textTransform: 'uppercase'
      }}>
        N.01 — PRIVATE STUDIO
      </span>
      <span style={{
        position: 'absolute', bottom: '28px', left: '32px', zIndex: 3,
        fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '1px',
        color: 'var(--text-subtle)', textTransform: 'uppercase'
      }}>
        TOCHKA-SPA.COM
      </span>
      <ArrowDown
        size={16}
        color="var(--accent)"
        style={{
          position: 'absolute', bottom: '28px', right: '32px', zIndex: 3,
          animation: 'pulseGlow 2s ease-in-out infinite'
        }}
      />

      {/* Main Hero Content */}
      <div className="container" style={{ position: 'relative', zIndex: 3, width: '100%' }}>
        <div style={{ maxWidth: '880px', textAlign: 'center', margin: '0 auto' }}>

          <Reveal>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '7px',
              padding: '5px 14px',
              backgroundColor: 'rgba(237, 231, 218, 0.04)',
              border: '1px solid var(--border-taupe)',
              marginBottom: '32px',
              backdropFilter: 'blur(12px)'
            }}>
              <MapPin size={11} color="var(--accent)" />
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.62rem',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                color: 'var(--omra-sand-mid)',
                fontWeight: 500
              }}>
                Batumi, Georgia — Private Bodywork Sanctuary
              </span>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.6rem, 5.4vw, 4.6rem)',
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: '-1px',
              color: 'var(--omra-sand-light)',
              marginBottom: '24px'
            }}>
              Тело — как металл.{' '}
              <span style={{ color: 'var(--accent)' }}>
                Мы знаем, где снять напряжение.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={140}>
            <div style={{
              display: 'flex', gap: '10px', flexWrap: 'wrap',
              alignItems: 'center', justifyContent: 'center', marginBottom: '36px'
            }}>
              {['ТОЧНОСТЬ', 'СИЛА', 'ВОССТАНОВЛЕНИЕ'].map((w, i) => (
                <span key={i} style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  letterSpacing: '1px',
                  color: 'var(--accent)',
                  border: '1px solid var(--border-taupe)',
                  padding: '5px 12px'
                }}>
                  {w}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={200}>
            <p style={{
              fontSize: 'clamp(0.98rem, 1.6vw, 1.15rem)',
              color: 'var(--text-muted)',
              fontWeight: 300,
              lineHeight: 1.85,
              maxWidth: '680px',
              margin: '0 auto 48px'
            }}>
              {lang === 'RU'
                ? 'Инженерный подход к телесной терапии в Батуми: точечное давление, выверенная механика движений, ноль лишнего. Разожмите зажатые мышцы и верните телу свободный ход.'
                : 'An engineered approach to body therapy in Batumi: precise pressure, calibrated technique, zero excess. Release locked-up muscle and restore your body\'s free range of motion.'}
            </p>
          </Reveal>

          <Reveal delay={260}>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '20px',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '64px'
            }}>
              <Magnetic strength={0.25}>
                <button onClick={onOpenBooking} className="btn-primary">
                  <span>{lang === 'RU' ? 'Записаться на сеанс' : 'Book Appointment'}</span>
                  <ArrowRight size={15} />
                </button>
              </Magnetic>

              <Magnetic strength={0.25}>
                <a href="#services" className="btn-secondary">
                  {lang === 'RU' ? 'Смотреть услуги' : 'Explore Services'}
                </a>
              </Magnetic>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '24px',
              borderTop: '1px solid var(--border-subtle)',
              paddingTop: '36px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                <ShieldCheck size={18} color="var(--accent)" />
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', letterSpacing: '2px', textTransform: 'uppercase' }}>
                  100% Приватность
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                <Sparkles size={18} color="var(--accent)" />
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', letterSpacing: '2px', textTransform: 'uppercase' }}>
                  Индивидуальные техники
                </span>
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </MagneticField>
  );
};
