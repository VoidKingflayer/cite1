import React, { useState } from 'react';
import { STOCK_IMAGES } from '../data';
import { Sparkles, Star, HelpCircle, MapPin, X } from 'lucide-react';

export const Highlights: React.FC<{ lang: 'RU' | 'EN' }> = ({ lang }) => {
  const [activeHighlight, setActiveHighlight] = useState<string | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles size={20} color="var(--accent-gold)" />;
      case 'Star': return <Star size={20} color="var(--accent-gold)" />;
      case 'HelpCircle': return <HelpCircle size={20} color="var(--accent-gold)" />;
      case 'MapPin': return <MapPin size={20} color="var(--accent-gold)" />;
      default: return <Sparkles size={20} color="var(--accent-gold)" />;
    }
  };

  const getHighlightContent = (id: string) => {
    switch (id) {
      case 'about':
        return {
          title: lang === 'RU' ? "О массаже и философии TOCH_KA" : "About TOCH_KA Philosophy",
          text: lang === 'RU'
            ? "TOCH_KA — это авторское пространство тела в Батуми. Мы специализируемся на миофасциальном релизе, глубокотканном восстановлении и антистресс-техниках. Используем 100% гипоаллергенные масляные эликсиры и сохраняем полную тишину во время практики."
            : "TOCH_KA is a signature bodywork studio in Batumi focusing on myofascial release, deep tissue recovery and anti-stress rituals."
        };
      case 'reviews':
        return {
          title: lang === 'RU' ? "Отзывы наших гостей" : "Guest Reviews",
          text: "«Лучший Deep Tissue массаж в моей жизни. Специалист точно почувствовал все проблемные зоны после перелета». — 4.9 ★★★★★"
        };
      case 'price':
        return {
          title: lang === 'RU' ? "Прайс и абонементы" : "Pricing & Passes",
          text: lang === 'RU'
            ? "Разовые сеансы от 90 GEL. Абонементы на 5 сеансов — скидка 15%. Персональный подбор времени и программы без скрытых доплат."
            : "Single sessions from 90 GEL. 5-session passes available with a 15% discount."
        };
      case 'faq':
        return {
          title: "FAQ / Вопросы",
          text: "1. Есть ли душ? Да, полностью оснащенная душевая зона.\n2. Нужно ли брать свои вещи? Нет, мы предоставляем всё необходимое.\n3. Как оплатить? Наличные GEL / карточка / перевод."
        };
      case 'location':
        return {
          title: "Batumi Location",
          text: lang === 'RU'
            ? "Уютная студия в центре Батуми (рядом с набережной). Точный адрес отправляется при подтверждении бронирования для вашей полной приватности."
            : "Cozy studio in central Batumi close to the boulevard."
        };
      default:
        return { title: "", text: "" };
    }
  };

  return (
    <section id="highlights" className="section-padding" style={{ backgroundColor: 'var(--bg-surface)' }}>
      <div className="container">
        
        <div className="section-header">
          <span className="section-tag">INSTAGRAM EDITORIAL HIGHLIGHTS</span>
          <h2 className="section-title">
            {lang === 'RU' ? 'Быстрый обзор студии' : 'Studio Highlights'}
          </h2>
        </div>

        {/* Highlight Circles Container */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '32px',
          flexWrap: 'wrap'
        }}>
          {STOCK_IMAGES.highlights.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveHighlight(item.id)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                transition: 'var(--transition-smooth)'
              }}
              className="highlight-item"
            >
              {/* Outer Golden Gradient Ring */}
              <div style={{
                width: '92px',
                height: '92px',
                borderRadius: '50%',
                padding: '3px',
                background: 'linear-gradient(135deg, var(--accent-gold) 0%, rgba(200, 169, 126, 0.2) 100%)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                transition: 'var(--transition-smooth)'
              }}>
                {/* Inner Preview Thumbnail */}
                <div style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  position: 'relative',
                  backgroundColor: 'var(--bg-dark)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <img
                    src={item.bg}
                    alt={item.label}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      opacity: 0.5,
                      filter: 'contrast(110%)'
                    }}
                  />
                  <div style={{ position: 'absolute', zIndex: 2 }}>
                    {getIcon(item.icon)}
                  </div>
                </div>
              </div>

              {/* Highlight Label */}
              <span style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.8rem',
                letterSpacing: '1px',
                color: 'var(--text-muted)',
                marginTop: '12px',
                textTransform: 'uppercase',
                fontWeight: 500
              }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>

      </div>

      {/* Modal Popup for Highlight Story Details */}
      {activeHighlight && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(12px)',
          zIndex: 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px'
        }}>
          <div style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-gold)',
            borderRadius: '16px',
            maxWidth: '460px',
            width: '100%',
            padding: '32px',
            position: 'relative',
            boxShadow: '0 25px 50px rgba(0,0,0,0.9)'
          }}>
            <button
              onClick={() => setActiveHighlight(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer'
              }}
            >
              <X size={24} />
            </button>

            <span className="section-tag" style={{ marginBottom: '8px' }}>
              HIGHLIGHT STORY
            </span>
            <h3 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.8rem',
              color: 'var(--text-main)',
              marginBottom: '16px'
            }}>
              {getHighlightContent(activeHighlight).title}
            </h3>
            <p style={{
              color: 'var(--text-muted)',
              fontSize: '0.95rem',
              lineHeight: 1.7,
              whiteSpace: 'pre-line',
              fontWeight: 300
            }}>
              {getHighlightContent(activeHighlight).text}
            </p>

            <button
              onClick={() => setActiveHighlight(null)}
              className="btn-secondary"
              style={{ width: '100%', marginTop: '28px' }}
            >
              {lang === 'RU' ? 'Закрыть' : 'Close'}
            </button>
          </div>
        </div>
      )}

      <style>{`
        .highlight-item:hover div:first-child {
          transform: scale(1.06);
          box-shadow: 0 0 25px var(--accent-gold-glow);
        }
      `}</style>
    </section>
  );
};
