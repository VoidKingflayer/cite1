import React from 'react';
import { PROCESS_DATA } from '../data';
import { Reveal } from '../lib/interactive';

export const Process: React.FC<{ lang: 'RU' | 'EN' }> = ({ lang }) => {
  return (
    <section id="process" className="section-padding" style={{ backgroundColor: 'var(--bg-surface)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">002 / {lang === 'RU' ? 'КАК ЭТО УСТРОЕНО' : 'HOW IT WORKS'}</span>
          <h2 className="section-title">
            {lang === 'RU' ? 'Инженерный подход к телу' : 'An engineered approach to the body'}
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '0px',
          border: '1px solid var(--border-subtle)'
        }}>
          {PROCESS_DATA.map((step, idx) => (
            <Reveal key={step.n} delay={idx * 90}>
              <div style={{
                padding: '36px 28px',
                borderRight: idx < PROCESS_DATA.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                position: 'relative',
                height: '100%'
              }}>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  color: 'var(--accent)',
                  letterSpacing: '1px'
                }}>
                  {step.n}
                </span>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.3rem',
                  fontWeight: 700,
                  color: 'var(--text-main)',
                  margin: '16px 0 12px'
                }}>
                  {lang === 'RU' ? step.title : step.titleEn}
                </h3>
                <p style={{
                  fontSize: '0.88rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.65,
                  fontWeight: 300
                }}>
                  {step.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
