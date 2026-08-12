import React from 'react';
import { STOCK_IMAGES, STATS_DATA } from '../data';
import { Counter, Reveal } from '../lib/interactive';

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
          {/* Left Column: Editorial Portrait */}
          <Reveal y={0}>
          <div style={{ position: 'relative' }}>
            <div className="editorial-card duotone-steel" style={{ height: '500px' }}>
              <img
                src={STOCK_IMAGES.about}
                alt="TOCH_KA Studio Philosophy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'contrast(112%)'
                }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(20, 22, 25, 0.85) 0%, transparent 60%)'
              }} />
            </div>

            <div style={{
              position: 'absolute',
              bottom: '-20px',
              right: '-20px',
              backgroundColor: 'var(--omra-sand-light)',
              color: 'var(--omra-black)',
              border: '1px solid var(--border-taupe)',
              padding: '24px',
              maxWidth: '240px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
            }}>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2.4rem',
                fontWeight: 700,
                color: 'var(--omra-espresso)',
                display: 'block',
                lineHeight: 1,
                letterSpacing: '-1px'
              }}>
                <Counter to={100} suffix="%" />
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
          </Reveal>

          {/* Right Column: Editorial Text Content */}
          <Reveal delay={100}>
          <div>
            <span className="section-tag">
              001 / {lang === 'RU' ? 'ФИЛОСОФИЯ И ПОДХОД' : 'PHILOSOPHY & APPROACH'}
            </span>
            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '28px' }}>
              {lang === 'RU'
                ? 'Bodywork с инженерной точностью'
                : 'Bodywork with engineering precision'}
            </h2>
            <p style={{
              fontSize: '1.05rem',
              color: 'var(--text-muted)',
              lineHeight: 1.8,
              marginBottom: '24px',
              fontWeight: 300
            }}>
              Студия <strong style={{ color: 'var(--text-main)' }}>TOCH_KA</strong> создана для тех, кто ищет в Батуми больше, чем стандартный массаж. Мы рассматриваем тело как механическую систему под нагрузкой — с точками опоры, натяжением и зажимами, которые нужно снимать выверенным, а не случайным давлением.
            </p>
            <p style={{
              fontSize: '1rem',
              color: 'var(--text-muted)',
              lineHeight: 1.8,
              marginBottom: '40px',
              fontWeight: 300
            }}>
              Здесь нет лишнего шума, шаблонных движений и спешки. Каждая минута сеанса посвящена снятию стресса, восстановлению подвижности и возвращению телу свободного хода.
            </p>

            {/* Animated stat counters */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
              gap: '24px',
              borderTop: '1px solid var(--border-subtle)',
              paddingTop: '28px'
            }}>
              {STATS_DATA.map((stat, i) => (
                <div key={i} style={{ borderLeft: '2px solid var(--accent)', paddingLeft: '14px' }}>
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.8rem',
                    fontWeight: 700,
                    color: 'var(--text-main)',
                    display: 'block',
                    lineHeight: 1
                  }}>
                    <Counter to={stat.value} suffix={stat.suffix} />
                  </span>
                  <span style={{
                    fontSize: '0.72rem',
                    color: 'var(--text-muted)',
                    letterSpacing: '0.5px',
                    marginTop: '6px',
                    display: 'block'
                  }}>
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
