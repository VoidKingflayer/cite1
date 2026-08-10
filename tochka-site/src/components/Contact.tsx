import React from 'react';
import { MapPin, Clock, Phone, Send, MessageSquare, Camera, Navigation } from 'lucide-react';

export const Contact: React.FC<{ lang: 'RU' | 'EN' }> = ({ lang }) => {
  return (
    <section id="contacts" className="section-padding" style={{ backgroundColor: 'var(--bg-dark)' }}>
      <div className="container">
        
        <div className="section-header">
          <span className="section-tag">
            {lang === 'RU' ? 'ЛОКАЦИЯ И СВЯЗЬ' : 'LOCATION & CONTACT'}
          </span>
          <h2 className="section-title">
            {lang === 'RU' ? 'Ждем вас в Batumi' : 'Visit Us in Batumi'}
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '40px',
          alignItems: 'start'
        }}>
          
          {/* Info Card Column */}
          <div className="editorial-card" style={{ padding: '36px' }}>
            
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--text-main)', marginBottom: '24px' }}>
              {lang === 'RU' ? 'Контактные данные' : 'Contact Details'}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <MapPin size={22} color="var(--accent-gold)" style={{ marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)' }}>
                    {lang === 'RU' ? 'Адрес' : 'Address'}
                  </h4>
                  <p style={{ fontSize: '1rem', color: 'var(--text-main)', marginTop: '4px' }}>
                    Batumi, Georgia • Memed Abashidze St / Seaside Boulevard
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <Clock size={22} color="var(--accent-gold)" style={{ marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)' }}>
                    {lang === 'RU' ? 'Часы работы' : 'Working Hours'}
                  </h4>
                  <p style={{ fontSize: '1rem', color: 'var(--text-main)', marginTop: '4px' }}>
                    {lang === 'RU' ? 'Ежедневно с 10:00 до 21:00 (по предварительной записи)' : 'Daily 10:00 - 21:00 (By appointment only)'}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <Phone size={22} color="var(--accent-gold)" style={{ marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)' }}>
                    {lang === 'RU' ? 'Телефон & Мессенджеры' : 'Phone & Messengers'}
                  </h4>
                  <a href="tel:+995555000000" style={{ fontSize: '1.1rem', color: 'var(--accent-gold)', textDecoration: 'none', fontWeight: 600, display: 'block', marginTop: '4px' }}>
                    +995 555 00 00 00
                  </a>
                </div>
              </div>

            </div>

            {/* Direct Social Links */}
            <div style={{
              display: 'flex',
              gap: '12px',
              marginTop: '32px',
              paddingTop: '24px',
              borderTop: '1px solid var(--border-subtle)'
            }}>
              <a href="https://t.me/tochka_batumi" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)' }}>
                <Send size={20} />
              </a>
              <a href="https://wa.me/995555000000" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)' }}>
                <MessageSquare size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)' }}>
                <Camera size={20} />
              </a>
            </div>

            <a
              href="https://maps.google.com/?q=Batumi,Georgia"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ width: '100%', marginTop: '28px' }}
            >
              <Navigation size={16} />
              <span>{lang === 'RU' ? 'Построить маршрут' : 'Get Directions'}</span>
            </a>

          </div>

          {/* Interactive Styled Map Embed */}
          <div className="editorial-card" style={{ height: '440px', overflow: 'hidden', position: 'relative' }}>
            <iframe
              title="TOCH_KA Batumi Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2983.476483748231!2d41.63666!3d41.64583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406786304ea777b1%3A0x6b13e8b0a13e2f10!2sBatumi%2C%20Georgia!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{
                border: 0,
                filter: 'invert(90%) hue-rotate(180deg) contrast(120%) opacity(0.85)'
              }}
              allowFullScreen={false}
              loading="lazy"
            />
          </div>

        </div>
      </div>
    </section>
  );
};
