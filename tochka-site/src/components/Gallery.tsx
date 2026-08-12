import React from 'react';
import { STOCK_IMAGES } from '../data';
import { Heart, MessageCircle, Camera } from 'lucide-react';
import { Reveal } from '../lib/interactive';

export const Gallery: React.FC = () => {
  const INITIAL_LIKES: { [key: number]: number } = {
    0: 142, 1: 98, 2: 210, 3: 176, 4: 115, 5: 189
  };
  const [likes, setLikes] = React.useState<{ [key: number]: { count: number; liked: boolean } }>(
    Object.fromEntries(
      Object.entries(INITIAL_LIKES).map(([idx, count]) => [idx, { count, liked: false }])
    )
  );

  const toggleLike = (index: number) => {
    setLikes(prev => {
      const current = prev[index];
      return {
        ...prev,
        [index]: {
          liked: !current.liked,
          count: current.liked ? current.count - 1 : current.count + 1
        }
      };
    });
  };

  return (
    <section id="gallery" className="section-padding" style={{ backgroundColor: 'var(--bg-dark)' }}>
      <div className="container">
        
        {/* Feed Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '48px',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div>
            <span className="section-tag">002 / VISUAL LOG</span>
            <h2 className="section-title" style={{ textAlign: 'left' }}>
              Визуальный дневник студии
            </h2>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            style={{ fontSize: '0.8rem', padding: '10px 20px' }}
          >
            <Camera size={16} color="var(--accent)" />
            <span>@TOCH_KA.BATUMI</span>
          </a>
        </div>

        {/* Case-study style feed grid — dark/paper tiles alternate like the reference grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '24px'
        }}>
          {STOCK_IMAGES.gallery.map((item, idx) => {
            const isPaper = idx % 2 === 1;
            return (
            <Reveal key={idx} delay={(idx % 3) * 90}>
            <div
              className={`editorial-card feed-post${isPaper ? ' paper-card' : ''}`}
              style={{ overflow: 'hidden' }}
            >
              {/* Image with mono index badge + bottom-left caption, reference tile style */}
              <div className="duotone-steel" style={{ position: 'relative', height: '360px', overflow: 'hidden' }}>
                <img
                  src={item.url}
                  alt={item.caption}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'contrast(112%) brightness(1.02)',
                    transition: 'var(--transition-smooth)'
                  }}
                />

                <span style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  letterSpacing: '1px',
                  color: 'var(--accent)',
                  background: 'rgba(10, 10, 11, 0.55)',
                  border: '1px solid var(--border-gold)',
                  borderRadius: 'var(--radius-pill)',
                  padding: '4px 10px',
                  backdropFilter: 'blur(6px)'
                }}>
                  {String(idx + 1).padStart(3, '0')}
                </span>

                <div style={{
                  position: 'absolute',
                  left: '16px',
                  bottom: '16px',
                  right: '16px'
                }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.78rem',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    color: 'rgba(243, 243, 240, 0.95)',
                    textShadow: '0 2px 10px rgba(0,0,0,0.8)'
                  }}>
                    {item.tag}
                  </span>
                </div>
              </div>

              {/* Like & Comment Bar */}
              <div style={{
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: isPaper ? 'var(--paper)' : 'var(--bg-card)',
                borderTop: isPaper ? '1px solid rgba(10,10,11,0.08)' : '1px solid var(--border-subtle)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <button
                    onClick={() => toggleLike(idx)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: likes[idx].liked ? '#e53e3e' : (isPaper ? 'var(--text-subtle)' : 'var(--text-muted)'),
                      transition: 'var(--transition-smooth)'
                    }}
                  >
                    <Heart size={18} fill={likes[idx].liked ? '#e53e3e' : 'none'} />
                    <span style={{ fontSize: '0.8rem', fontWeight: 500 }}>{likes[idx].count}</span>
                  </button>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-subtle)' }}>
                    <MessageCircle size={18} />
                    <span style={{ fontSize: '0.8rem' }}>12</span>
                  </div>
                </div>

                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  letterSpacing: '1px',
                  color: isPaper ? 'var(--accent-dim)' : 'var(--accent)',
                  textTransform: 'uppercase'
                }}>
                  {item.caption}
                </span>
              </div>

            </div>
            </Reveal>
            );
          })}
        </div>

      </div>
    </section>
  );
};
