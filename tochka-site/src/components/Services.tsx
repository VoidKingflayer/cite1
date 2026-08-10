import React, { useState } from 'react';
import { Clock, ArrowRight, X } from 'lucide-react';
import { SERVICES_DATA } from '../data';

interface ServicesProps {
  onSelectService: (serviceTitle: string) => void;
  lang: 'RU' | 'EN';
}

export const Services: React.FC<ServicesProps> = ({ onSelectService, lang }) => {
  const [activeModal, setActiveModal] = useState<typeof SERVICES_DATA[0] | null>(null);

  return (
    <section id="services" className="section-padding" style={{ backgroundColor: 'var(--bg-dark)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">
            {lang === 'RU' ? 'КОЛЛЕКЦИЯ УСЛУГ' : 'SERVICE COLLECTION'}
          </span>
          <h2 className="section-title">
            {lang === 'RU' ? 'Телесные ритуалы и терапия' : 'Bodywork & Massage Rituals'}
          </h2>
          <p style={{
            maxWidth: '560px',
            margin: '16px auto 0',
            color: 'var(--text-muted)',
            fontSize: '0.95rem',
            fontWeight: 300
          }}>
            {lang === 'RU'
              ? 'Каждая программа подбирается под особенности вашего тела, уровень усталости и индивидуальные пожелания.'
              : 'Each session is tailored to your body needs, fatigue level, and personal preferences.'}
          </p>
        </div>

        {/* Services Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '32px'
        }}>
          {SERVICES_DATA.map((service) => (
            <div key={service.id} className="editorial-card" style={{ display: 'flex', flexDirection: 'column' }}>
              
              {/* Card Image */}
              <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                <img
                  src={service.img}
                  alt={service.titleRu}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'var(--transition-smooth)'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, var(--bg-card) 0%, transparent 70%)'
                }} />
                
                {/* Price Tag Badge */}
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  backgroundColor: 'rgba(13, 14, 16, 0.85)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid var(--border-gold)',
                  padding: '6px 12px',
                  borderRadius: '4px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: 'var(--accent-gold-light)'
                }}>
                  {service.price}
                </div>
              </div>

              {/* Card Body */}
              <div style={{ padding: '28px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-subtle)', fontSize: '0.75rem', marginBottom: '8px' }}>
                  <Clock size={14} color="var(--accent-gold)" />
                  <span>{service.duration}</span>
                </div>

                <h3 style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.6rem',
                  fontWeight: 400,
                  color: 'var(--text-main)',
                  marginBottom: '12px'
                }}>
                  {lang === 'RU' ? service.titleRu : service.title}
                </h3>

                <p style={{
                  fontSize: '0.875rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.6,
                  marginBottom: '24px',
                  flexGrow: 1,
                  fontWeight: 300
                }}>
                  {service.desc}
                </p>

                {/* Card CTA Actions */}
                <div style={{ display: 'flex', gap: '12px', marginTop: 'auto' }}>
                  <button
                    onClick={() => setActiveModal(service)}
                    className="btn-secondary"
                    style={{ flex: 1, padding: '10px', fontSize: '0.75rem' }}
                  >
                    {lang === 'RU' ? 'Подробнее' : 'Details'}
                  </button>
                  <button
                    onClick={() => onSelectService(service.titleRu)}
                    className="btn-primary"
                    style={{ padding: '10px 16px', fontSize: '0.75rem' }}
                  >
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Service Detail Modal */}
      {activeModal && (
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
            borderRadius: '12px',
            maxWidth: '540px',
            width: '100%',
            overflow: 'hidden',
            boxShadow: '0 25px 50px rgba(0,0,0,0.8)',
            animation: 'fadeIn 0.3s ease'
          }}>
            <div style={{ position: 'relative', height: '200px' }}>
              <img src={activeModal.img} alt={activeModal.titleRu} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <button
                onClick={() => setActiveModal(null)}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  backgroundColor: 'rgba(0,0,0,0.6)',
                  border: 'none',
                  color: 'white',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <X size={20} />
              </button>
            </div>
            <div style={{ padding: '32px' }}>
              <span className="section-tag" style={{ marginBottom: '6px' }}>
                {activeModal.duration} • {activeModal.price}
              </span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--text-main)', marginBottom: '16px' }}>
                {lang === 'RU' ? activeModal.titleRu : activeModal.title}
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '24px' }}>
                {activeModal.details}
              </p>
              <button
                onClick={() => {
                  const title = activeModal.titleRu;
                  setActiveModal(null);
                  onSelectService(title);
                }}
                className="btn-primary"
                style={{ width: '100%' }}
              >
                {lang === 'RU' ? 'Записаться на этот сеанс' : 'Book This Session'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
