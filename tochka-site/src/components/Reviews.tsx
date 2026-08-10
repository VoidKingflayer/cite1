import React from 'react';
import { Star, Quote } from 'lucide-react';
import { REVIEWS_DATA } from '../data';

export const Reviews: React.FC<{ lang: 'RU' | 'EN' }> = ({ lang }) => {
  return (
    <section id="reviews" className="section-padding" style={{ backgroundColor: 'var(--bg-dark)' }}>
      <div className="container">
        
        <div className="section-header">
          <span className="section-tag">
            {lang === 'RU' ? 'ОТЗЫВЫ ГОСТЕЙ' : 'GUEST REVIEWS'}
          </span>
          <h2 className="section-title">
            {lang === 'RU' ? 'Живые впечатления' : 'Real Experiences'}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '12px', fontWeight: 300 }}>
            {lang === 'RU'
              ? 'Честные отзывы без рекламного пафоса от жителей и гостей Батуми.'
              : 'Authentic feedback from Batumi locals and international visitors.'}
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '32px'
        }}>
          {REVIEWS_DATA.map((rev, idx) => (
            <div
              key={idx}
              className="editorial-card"
              style={{
                padding: '36px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative'
              }}
            >
              <Quote
                size={36}
                color="var(--accent-gold)"
                style={{ opacity: 0.2, position: 'absolute', top: '24px', right: '24px' }}
              />

              <div>
                {/* Rating Stars */}
                <div style={{ display: 'flex', gap: '4px', marginBottom: '20px' }}>
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="var(--accent-gold)" color="var(--accent-gold)" />
                  ))}
                </div>

                <p style={{
                  fontSize: '0.95rem',
                  color: 'var(--text-main)',
                  lineHeight: 1.7,
                  fontStyle: 'italic',
                  marginBottom: '28px',
                  fontWeight: 300
                }}>
                  «{rev.text}»
                </p>
              </div>

              <div style={{
                borderTop: '1px solid var(--border-subtle)',
                paddingTop: '16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)' }}>
                    {rev.name}
                  </h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>
                    {rev.city}
                  </span>
                </div>

                <span style={{ fontSize: '0.75rem', color: 'var(--accent-gold)' }}>
                  {rev.date}
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
