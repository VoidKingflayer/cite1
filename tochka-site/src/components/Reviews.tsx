import React, { useEffect, useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { REVIEWS_DATA } from '../data';
import { Magnetic, Reveal } from '../lib/interactive';

export const Reviews: React.FC<{ lang: 'RU' | 'EN' }> = ({ lang }) => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % REVIEWS_DATA.length);
    }, 5000);
    return () => clearInterval(id);
  }, [paused]);

  const go = (dir: 1 | -1) => {
    setIndex((i) => (i + dir + REVIEWS_DATA.length) % REVIEWS_DATA.length);
  };

  const rev = REVIEWS_DATA[index];

  return (
    <section id="reviews" className="section-padding" style={{ backgroundColor: 'var(--bg-dark)' }}>
      <div className="container">

        <div className="section-header">
          <span className="section-tag">
            {lang === 'RU' ? '004 / ОТЗЫВЫ ГОСТЕЙ' : '004 / GUEST REVIEWS'}
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

        <Reveal>
          <div
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            style={{ maxWidth: '760px', margin: '0 auto' }}
          >
            <div
              className="editorial-card"
              style={{
                padding: '48px',
                position: 'relative',
                minHeight: '260px'
              }}
            >
              <Quote
                size={40}
                color="var(--accent)"
                style={{ opacity: 0.2, position: 'absolute', top: '28px', right: '28px' }}
              />

              <div style={{ display: 'flex', gap: '4px', marginBottom: '20px' }}>
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="var(--accent)" color="var(--accent)" />
                ))}
              </div>

              <p style={{
                fontSize: '1.05rem',
                color: 'var(--text-main)',
                lineHeight: 1.75,
                marginBottom: '32px',
                fontWeight: 300,
                minHeight: '110px'
              }}>
                «{rev.text}»
              </p>

              <div style={{
                borderTop: '1px solid var(--border-subtle)',
                paddingTop: '16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    {rev.name}
                  </h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>
                    {rev.city}
                  </span>
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>
                  {rev.date}
                </span>
              </div>
            </div>

            {/* Carousel controls */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '20px',
              marginTop: '28px'
            }}>
              <Magnetic strength={0.4}>
                <button
                  onClick={() => go(-1)}
                  className="btn-secondary"
                  style={{ padding: '10px', width: '42px', height: '42px' }}
                  aria-label="Previous review"
                >
                  <ChevronLeft size={16} />
                </button>
              </Magnetic>

              <div style={{ display: 'flex', gap: '8px' }}>
                {REVIEWS_DATA.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    aria-label={`Review ${i + 1}`}
                    style={{
                      width: i === index ? '24px' : '8px',
                      height: '8px',
                      background: i === index ? 'var(--accent)' : 'var(--border-subtle)',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'var(--transition-smooth)'
                    }}
                  />
                ))}
              </div>

              <Magnetic strength={0.4}>
                <button
                  onClick={() => go(1)}
                  className="btn-secondary"
                  style={{ padding: '10px', width: '42px', height: '42px' }}
                  aria-label="Next review"
                >
                  <ChevronRight size={16} />
                </button>
              </Magnetic>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
};
