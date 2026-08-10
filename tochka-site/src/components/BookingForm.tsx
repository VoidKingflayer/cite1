import React, { useState, useEffect } from 'react';
import { Send, Phone, MessageSquare, Camera, CheckCircle2 } from 'lucide-react';
import { SERVICES_DATA } from '../data';

interface BookingFormProps {
  preselectedService?: string;
  lang: 'RU' | 'EN';
}

export const BookingForm: React.FC<BookingFormProps> = ({ preselectedService = '', lang }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: preselectedService || SERVICES_DATA[0].titleRu,
    date: '',
    time: '',
    comment: ''
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (preselectedService) {
      setFormData(prev => ({ ...prev, service: preselectedService }));
    }
  }, [preselectedService]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="booking" className="section-padding" style={{ backgroundColor: 'var(--bg-surface)', position: 'relative' }}>
      <div className="container">
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          
          <div className="section-header">
            <span className="section-tag">
              {lang === 'RU' ? 'ОНЛАЙН БРОНИРОВАНИЕ' : 'ONLINE BOOKING'}
            </span>
            <h2 className="section-title">
              {lang === 'RU' ? 'Записаться на сеанс' : 'Book an Appointment'}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '12px', fontWeight: 300 }}>
              {lang === 'RU'
                ? 'Заполните форму ниже или свяжитесь с нами напрямую в удобном мессенджере.'
                : 'Fill in the form below or contact us directly via instant messengers.'}
            </p>
          </div>

          {/* Quick Messenger Buttons Strip */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '12px',
            marginBottom: '40px'
          }}>
            <a
              href="https://t.me/tochka_batumi"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              style={{ justifyContent: 'center', fontSize: '0.8rem', padding: '12px' }}
            >
              <Send size={16} color="#0088cc" />
              <span>Telegram</span>
            </a>
            <a
              href="https://wa.me/995555000000"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              style={{ justifyContent: 'center', fontSize: '0.8rem', padding: '12px' }}
            >
              <MessageSquare size={16} color="#25D366" />
              <span>WhatsApp</span>
            </a>
            <a
              href="tel:+995555000000"
              className="btn-secondary"
              style={{ justifyContent: 'center', fontSize: '0.8rem', padding: '12px' }}
            >
              <Phone size={16} color="var(--accent-gold)" />
              <span>{lang === 'RU' ? 'Позвонить' : 'Call Studio'}</span>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              style={{ justifyContent: 'center', fontSize: '0.8rem', padding: '12px' }}
            >
              <Camera size={16} color="#E1306C" />
              <span>Instagram DM</span>
            </a>
          </div>

          {/* Booking Form Card */}
          <div className="editorial-card" style={{ padding: '40px' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 20px', animation: 'fadeIn 0.5s ease' }}>
                <CheckCircle2 size={56} color="var(--accent-gold)" style={{ margin: '0 auto 20px' }} />
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: 'var(--text-main)', marginBottom: '12px' }}>
                  {lang === 'RU' ? 'Ваша заявка принята' : 'Booking Request Received'}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '480px', margin: '0 auto 28px', lineHeight: 1.6 }}>
                  {lang === 'RU'
                    ? 'Благодарим за выбор TOCH_KA. Мы свяжемся с вами в Telegram/WhatsApp в течение 15 минут для подтверждения времени.'
                    : 'Thank you for choosing TOCH_KA. We will contact you via Telegram/WhatsApp within 15 minutes.'}
                </p>
                <button
                  onClick={() => { setSubmitted(false); }}
                  className="btn-secondary"
                >
                  {lang === 'RU' ? 'Записаться повторно' : 'New Booking'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                
                {/* Name Input */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '0.75rem', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                    {lang === 'RU' ? 'Ваше имя *' : 'Your Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Alexander"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      backgroundColor: 'var(--bg-dark)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '4px',
                      padding: '14px 16px',
                      color: 'var(--text-main)',
                      fontSize: '0.95rem',
                      outline: 'none',
                      transition: 'var(--transition-smooth)'
                    }}
                  />
                </div>

                {/* Phone / Messenger Input */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '0.75rem', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                    {lang === 'RU' ? 'Телефон / Telegram @username *' : 'Phone / Telegram username *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="+995 ... or @username"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{
                      backgroundColor: 'var(--bg-dark)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '4px',
                      padding: '14px 16px',
                      color: 'var(--text-main)',
                      fontSize: '0.95rem',
                      outline: 'none'
                    }}
                  />
                </div>

                {/* Service Selection */}
                <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '0.75rem', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                    {lang === 'RU' ? 'Услуга *' : 'Select Service *'}
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    style={{
                      backgroundColor: 'var(--bg-dark)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '4px',
                      padding: '14px 16px',
                      color: 'var(--text-main)',
                      fontSize: '0.95rem',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    {SERVICES_DATA.map((s) => (
                      <option key={s.id} value={s.titleRu} style={{ backgroundColor: 'var(--bg-card)' }}>
                        {lang === 'RU' ? s.titleRu : s.title} ({s.price})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '0.75rem', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                    {lang === 'RU' ? 'Желаемая дата' : 'Preferred Date'}
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    style={{
                      backgroundColor: 'var(--bg-dark)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '4px',
                      padding: '14px 16px',
                      color: 'var(--text-main)',
                      fontSize: '0.95rem',
                      outline: 'none'
                    }}
                  />
                </div>

                {/* Time */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '0.75rem', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                    {lang === 'RU' ? 'Желаемое время' : 'Preferred Time'}
                  </label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    style={{
                      backgroundColor: 'var(--bg-dark)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '4px',
                      padding: '14px 16px',
                      color: 'var(--text-main)',
                      fontSize: '0.95rem',
                      outline: 'none'
                    }}
                  />
                </div>

                {/* Comment */}
                <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '0.75rem', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                    {lang === 'RU' ? 'Пожелания или особенности (опционально)' : 'Notes / Special requests (optional)'}
                  </label>
                  <textarea
                    rows={3}
                    placeholder={lang === 'RU' ? 'Например: акцент на шею, повышенный гипертонус...' : 'E.g., focus on neck & shoulders...'}
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    style={{
                      backgroundColor: 'var(--bg-dark)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '4px',
                      padding: '14px 16px',
                      color: 'var(--text-main)',
                      fontSize: '0.95rem',
                      outline: 'none',
                      resize: 'none'
                    }}
                  />
                </div>

                <div style={{ gridColumn: '1 / -1', marginTop: '12px' }}>
                  <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                    {lang === 'RU' ? 'Отправить заявку на бронирование' : 'Submit Booking Request'}
                  </button>
                </div>

              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
