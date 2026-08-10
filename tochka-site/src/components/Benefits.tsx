import React from 'react';

export const Benefits: React.FC<{ lang: 'RU' | 'EN' }> = ({ lang }) => {
  const items = [
    {
      title: lang === 'RU' ? "Профессионализм & Мастерство" : "Professional Expertise",
      desc: lang === 'RU' ? "Сертифицированные специалисты с большим опытом миофасциальной и спортивной телесной терапии." : "Certified bodywork practitioners specializing in myofascial release and sport recovery."
    },
    {
      title: lang === 'RU' ? "Приватность & Конфиденциальность" : "Absolute Privacy",
      desc: lang === 'RU' ? "Уединенный формат без потока и шумных холов. Время принадлежит только вам." : "Intimate private studio environment with zero distraction."
    },
    {
      title: lang === 'RU' ? "Индивидуальный подбор техник" : "Tailored Techniques",
      desc: lang === 'RU' ? "Диагностика гипертонуса перед началом работы и адаптация силы нажатий под ваши ощущения." : "Pre-session muscle assessment and tailored pressure adjustments."
    },
    {
      title: lang === 'RU' ? "Удобная быстрая запись" : "Instant Booking",
      desc: lang === 'RU' ? "Запись напрямую через Telegram или WhatsApp в 2 клика без сложных форм регистраций." : "Direct 2-click booking via Telegram or WhatsApp."
    },
    {
      title: lang === 'RU' ? "Чистая и спокойная атмосфера" : "Serene Sanctuary",
      desc: lang === 'RU' ? "Премиальный текстиль, гипоаллергенные органические масла, дезинфекция после каждого сеанса." : "Premium linens, organic massage elixirs, and serene ambient acoustics."
    },
    {
      title: lang === 'RU' ? "Локация в Batumi" : "Prime Batumi Location",
      desc: lang === 'RU' ? "Удобное расположение в центральной части Батуми с легким доступом и парковкой." : "Centrally located in Batumi close to the Boulevard."
    }
  ];

  return (
    <section id="benefits" className="section-padding" style={{ backgroundColor: 'var(--bg-surface)' }}>
      <div className="container">
        
        <div className="section-header">
          <span className="section-tag">{lang === 'RU' ? 'ПОЧЕМУ ВЫБИРАЮТ TOCH_KA' : 'WHY CHOOSE TOCH_KA'}</span>
          <h2 className="section-title">{lang === 'RU' ? 'Стандарты нашего сервиса' : 'Our Studio Standards'}</h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '28px'
        }}>
          {items.map((b, i) => (
            <div
              key={i}
              className="editorial-card"
              style={{
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}
            >
              <h3 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.4rem',
                fontWeight: 400,
                color: 'var(--text-main)'
              }}>
                {b.title}
              </h3>

              <p style={{
                fontSize: '0.9rem',
                color: 'var(--text-muted)',
                lineHeight: 1.6,
                fontWeight: 300
              }}>
                {b.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
