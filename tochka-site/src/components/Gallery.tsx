import React from 'react';
import { STOCK_IMAGES } from '../data';
import { Heart, MessageCircle, Camera } from 'lucide-react';

export const Gallery: React.FC = () => {
  const [likes, setLikes] = React.useState<{ [key: number]: number }>({
    0: 142, 1: 98, 2: 210, 3: 176, 4: 115, 5: 189
  });
  const [likedState, setLikedState] = React.useState<{ [key: number]: boolean }>({});

  const toggleLike = (index: number) => {
    setLikedState(prev => {
      const isLiked = prev[index];
      setLikes(lPrev => ({
        ...lPrev,
        [index]: isLiked ? lPrev[index] - 1 : lPrev[index] + 1
      }));
      return { ...prev, [index]: !isLiked };
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
            <span className="section-tag">INSTAGRAM FEED AESTHETIC</span>
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
            <Camera size={16} color="var(--accent-gold)" />
            <span>@TOCH_KA.BATUMI</span>
          </a>
        </div>

        {/* Editorial Feed Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '24px'
        }}>
          {STOCK_IMAGES.gallery.map((item, idx) => (
            <div
              key={idx}
              className="editorial-card feed-post"
              style={{ borderRadius: '8px', overflow: 'hidden' }}
            >
              {/* Image Container with Warm Editorial Aesthetics */}
              <div style={{ position: 'relative', height: '360px', overflow: 'hidden' }}>
                <img
                  src={item.url}
                  alt={item.caption}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'contrast(108%) warm-light(10%)',
                    transition: 'var(--transition-smooth)'
                  }}
                />
                
                {/* Overlay Text Tag matching reference screenshot style */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(0,0,0,0.25)',
                  padding: '20px',
                  textAlign: 'center'
                }}>
                  <span style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.25rem',
                    letterSpacing: '4px',
                    textTransform: 'uppercase',
                    color: 'rgba(243, 243, 240, 0.95)',
                    fontWeight: 300,
                    textShadow: '0 2px 10px rgba(0,0,0,0.6)'
                  }}>
                    {item.tag}
                  </span>
                </div>
              </div>

              {/* Instagram Like & Comment Bar */}
              <div style={{
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: 'var(--bg-card)',
                borderTop: '1px solid var(--border-subtle)'
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
                      color: likedState[idx] ? '#e53e3e' : 'var(--text-muted)',
                      transition: 'var(--transition-smooth)'
                    }}
                  >
                    <Heart size={18} fill={likedState[idx] ? '#e53e3e' : 'none'} />
                    <span style={{ fontSize: '0.8rem', fontWeight: 500 }}>{likes[idx]}</span>
                  </button>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-subtle)' }}>
                    <MessageCircle size={18} />
                    <span style={{ fontSize: '0.8rem' }}>12</span>
                  </div>
                </div>

                <span style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.7rem',
                  letterSpacing: '1.5px',
                  color: 'var(--accent-gold)',
                  textTransform: 'uppercase'
                }}>
                  {item.caption}
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
