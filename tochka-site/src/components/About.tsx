import React from 'react';
import { STOCK_IMAGES } from '../data';

export const About: React.FC<{ lang: 'RU' | 'EN' }> = ({ lang }) => {
  return (
    <section id="about" className="section-padding" style={{ backgroundColor: 'var(--bg-surface)' }}>
      <div className="container">
        
        {/* Omra Style Branding Palette Row Display */}
        <div style={{
          marginBottom: '80px',
          padding: '32px',
          backgroundColor: 'var(--bg-dark)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '0px'
        }}>
          <span className="section-tag" style={{ display: 'block', textAlign: 'center', marginBottom: '24px' }}>
            BRAND COLOR PALETTE • TOCH_KA SPA
          </span>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '16px'
          }}>
            <div style={{ backgroundColor: '#E9E7E2', height: '90px', padding: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', color: '#0a0a0b', fontSize: '0.7rem', fontFamily: 'monospace' }}>
              <strong>LIGHT STONE</strong>
              <span>#E9E7E2</span>
            </div>
            <div style={{ backgroundColor: '#B6B2AB', height: '90px', padding: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', color: '#0a0a0b', fontSize: '0.7rem', fontFamily: 'monospace' }}>
              <strong>MID STONE</strong>
              <span>#B6B2AB</span>
            </div>
            <div style={{ backgroundColor: '#78756E', height: '90px', padding: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', color: '#ffffff', fontSize: '0.7rem', fontFamily: 'monospace' }}>
              <strong>GRAPHITE</strong>
              <span>#78756E</span>
            </div>
            <div style={{ backgroundColor: '#232320', height: '90px', padding: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', color: '#E9E7E2', fontSize: '0.7rem', fontFamily: 'monospace' }}>
              <strong>CHARCOAL</strong>
              <span>#232320</span>
            </div>
            <div style={{ backgroundColor: '#0a0a0b', height: '90px', padding: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', color: '#E9E7E2', fontSize: '0.7rem', fontFamily: 'monospace', border: '1px solid #333' }}>
              <strong>DEEP BLACK</strong>
              <span>#0A0A0B</span>
            </div>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '60px',
          alignItems: 'center'
        }}>
          {/* Left Column: Image Collage / Editorial Portrait */}
          <div style={{ position: 'relative' }}>
            <div className="editorial-card" style={{ height: '500px' }}>
              <img
                src={STOCK_IMAGES.about}
                alt="TOCH_KA Studio Philosophy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'contrast(112%) saturate(0%)'
                }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(20, 22, 25, 0.85) 0%, transparent 60%)'
              }} />
            </div>

            {/* Overlapping Badge in Omra Palette */}
            <div style={{
              position: 'absolute',
              bottom: '-20px',
              right: '-20px',
              backgroundColor: 'var(--omra-sand-light)',
              color: 'var(--omra-black)',
              border: '1px solid var(--border-taupe)',
              padding: '24px',
              borderRadius: '0px',
              maxWidth: '240px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
            }}>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2.4rem',
                color: 'var(--omra-espresso)',
                display: 'block',
                lineHeight: 1,
                letterSpacing: '2px'
              }}>
                100%
              </span>
              <span style={{
                fontSize: '0.7rem',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: 'var(--omra-black)',
                marginTop: '6px',
                display: 'block',
                fontWeight: 600
              }}>
                {lang === 'RU' ? 'Персональное внимание' : 'Personal Attention'}
              </span>
            </div>
          </div>

          {/* Right Column: Editorial Text Content */}
          <div>
            <span className="section-tag">
              {lang === 'RU' ? 'ФИЛОСОФИЯ И ПОДХОД' : 'PHILOSOPHY & APPROACH'}
            </span>
            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '28px' }}>
              {lang === 'RU'
                ? 'Bodywork как осознанная забота и глубокая тишина'
                : 'Bodywork as mindful care & absolute quietness'}
            </h2>
            <p style={{
              fontSize: '1.05rem',
              color: 'var(--text-muted)',
              lineHeight: 1.8,
              marginBottom: '24px',
              fontWeight: 300
            }}>
              Бренд <strong style={{ color: 'var(--text-main)' }}>TOCH_KA SPA</strong> создан для тех, кто ищет в Батуми больше, чем стандартный массаж. Мы рассматриваем тело как умную, но устающую систему, требующую не торопливой поверхностной техники, а глубокой и точной работы с фасциями и мышцами.
            </p>
            <p style={{
              fontSize: '1rem',
              color: 'var(--text-muted)',
              lineHeight: 1.8,
              marginBottom: '36px',
              fontWeight: 300
            }}>
              Здесь нет лишнего шума, шаблонных движений и спешки. Каждая минута сеанса посвящена снятию стресса, восстановлению гибкости и выравниванию дыхания в атмосфере приватного dark minimal спа.
            </p>

            {/* Bullet Highlights */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ borderLeft: '2px solid var(--omra-taupe)', paddingLeft: '16px' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '4px', letterSpacing: '1px', textTransform: 'uppercase' }}>
                  Точность техники
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Прицельная работа с точками напряжения.
                </p>
              </div>
              <div style={{ borderLeft: '2px solid var(--omra-taupe)', paddingLeft: '16px' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '4px', letterSpacing: '1px', textTransform: 'uppercase' }}>
                  Приватность
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Только вы, мастер и мягкий теплый свет.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
