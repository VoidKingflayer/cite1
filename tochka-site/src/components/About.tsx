import React from 'react';
import { STOCK_IMAGES } from '../data';

export const About: React.FC<{ lang: 'RU' | 'EN' }> = ({ lang }) => {
  return (
    <section id="about" className="section-padding" style={{ backgroundColor: 'var(--bg-surface)' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '60px',
          alignItems: 'center'
        }}>
          {/* Left Column: Image Collage / Editorial Portrait */}
          <div style={{ position: 'relative' }}>
            <div className="editorial-card" style={{ height: '480px' }}>
              <img
                src={STOCK_IMAGES.about}
                alt="TOCH_KA Studio Philosophy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'contrast(105%) grayscale(20%)'
                }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(20, 22, 25, 0.8) 0%, transparent 60%)'
              }} />
            </div>

            {/* Overlapping Badge */}
            <div style={{
              position: 'absolute',
              bottom: '-20px',
              right: '-20px',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-gold)',
              padding: '24px',
              borderRadius: '8px',
              maxWidth: '240px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
            }}>
              <span style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '2.5rem',
                color: 'var(--accent-gold)',
                display: 'block',
                lineHeight: 1
              }}>
                100%
              </span>
              <span style={{
                fontSize: '0.75rem',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                marginTop: '6px',
                display: 'block'
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
              Бренд <strong style={{ color: 'var(--text-main)' }}>TOCH_KA</strong> создан для тех, кто ищет в Батуми больше, чем стандартный массаж. Мы рассматриваем тело как умную, но устающую систему, требующую не торопливой поверхностной техники, а глубокой и точной работы с фасциями и мышцами.
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
              <div style={{ borderLeft: '2px solid var(--accent-gold)', paddingLeft: '16px' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '4px' }}>
                  Точность техники
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Прицельная работа с точками напряжения.
                </p>
              </div>
              <div style={{ borderLeft: '2px solid var(--accent-gold)', paddingLeft: '16px' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '4px' }}>
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
