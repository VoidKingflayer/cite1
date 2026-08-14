/**
 * TOCHKA | MASSAGE & SPA — INTERACTIVE LOGIC & MULTILINGUAL (EN, RU, GE)
 */

const GISO_TRANSLATIONS = {
  en: {
    nav_about: "ABOUT",
    nav_services: "SERVICES",
    nav_masters: "MASTERS",
    nav_reels: "ATMOSPHERE",
    nav_contacts: "CONTACTS",
    btn_book_header: "BOOK APPOINTMENT",
    lang_select: "LANGUAGE:",
    hero_lead: "TAKE A STEP TOWARDS RELAXATION.<br />A PLACE WHERE NOT ONLY THE BODY IS TAKEN CARE OF, BUT ALSO THE SOUL.<br />YOUR BODY IS YOUR TEMPLE, RIGHT?",
    curator_tag: "TOCHKA BY NORMA CRAWFORD",
    pin_about: "about",
    pin_services: "services",
    pin_masters: "masters",
    about_title: "ABOUT",
    about_p1: "TOCHKA in NYC is renowned for its friendly, unpretentious staff, aesthetically pleasing and soothing atmosphere, and more notably for its qualified and certified professional estheticians and therapists. All spa services are administered by New York State licensed professionals, who provide beneficial treatments using the highest quality products designed to cater to each client specific needs and total body wellness.",
    about_p2: "Allure, W, Self, TimeOut and Citysearch's Best Of Spas in NYC have applauded TOCHKA for its hands-on therapeutic treatments, knowledgeable therapists, and therapeutic skin care products. Allure Day Spa has everything you need to renew yourself from our award-winning facials, and couples massages to hair removal and body treatments.",
    services_title: "YOU CHOOSE",
    s1_name: "Deep Tissue Massage",
    s1_price: "1 hr / $105 + tax",
    s2_name: "Sports Massage",
    s2_price: "1 hr / $115 + tax",
    s3_name: "Hot Stones Massage",
    s3_price: "1 hr / $170 + tax",
    s4_name: "Hot Oil Massage",
    s4_price: "1 hr / $175 + tax",
    s5_name: "60-Minute Full Body Massage",
    s5_price: "1 hr / $185 + tax",
    s6_name: "90-Minute Full Body Massage",
    s6_price: "1 hr 30 min / $195 + tax",
    s7_name: "Aromatherapy",
    s7_price: "1 hr / $180 + tax",
    s8_name: "Sea Salt Scrub &<br />30 Minutes Massage",
    s8_price: "1 hr / $180 + tax",
    s9_name: "Dry Cupping Therapy",
    s9_price: "30 min / $60 + tax",
    s10_name: "Reflexology",
    s10_price: "1 hr / $165 + tax",
    masters_title: "MASTERS",
    masters_subtitle: "Meet our professional estheticians and therapists",
    m1_role: "Our BOSS",
    m2_role: "Our esthetician",
    m3_role: "Our therapist",
    m4_role: "Our therapist",
    reels_title: "ATMOSPHERE & REELS",
    reels_subtitle: "Follow us on Instagram",
    r1_tag: "★ Ritual Flow",
    r2_tag: "★ Sacred Touch",
    r3_tag: "★ Healing Oils",
    r4_tag: "★ Deep Relaxation",
    temple_title: "BODY'S YOUR TEMPLE, RIGHT?",
    contacts_title: "CONTACTS",
    form_heading: "Send us a request",
    form_note: "Send us a request and we'll call you back.",
    form_name_ph: "Your Name",
    form_email_ph: "Your E-mail",
    form_phone_ph: "Your Phone (+1 212...)",
    form_select_ph: "Select desired treatment...",
    form_send_btn: "Send",
    form_transmitting: "Transmitting...",
    form_success: "✦ Thank you. We have received your request and will contact you shortly.",
    token_title: "Obsidian Palette",
    footer_copy: "© 2023–2025 TOCHKA MASSAGE & SPA. ALL RIGHTS RESERVED."
  },
  ru: {
    nav_about: "О НАС",
    nav_services: "УСЛУГИ",
    nav_masters: "МАСТЕРА",
    nav_reels: "АТМОСФЕРА",
    nav_contacts: "КОНТАКТЫ",
    btn_book_header: "ЗАПИСАТЬСЯ",
    lang_select: "ЯЗЫК:",
    hero_lead: "СДЕЛАЙТЕ ШАГ НАВСТРЕЧУ РЕЛАКСАЦИИ.<br />МЕСТО, ГДЕ ЗАБОТЯТСЯ НЕ ТОЛЬКО О ТЕЛЕ, НО И О ДУШЕ.<br />ВАШЕ ТЕЛО — ВАШ ХРАМ, ВЕРНО?",
    curator_tag: "ТОЧКА ОТ НОРМЫ КРОУФОРД",
    pin_about: "о нас",
    pin_services: "услуги",
    pin_masters: "мастера",
    about_title: "О НАС",
    about_p1: "TOCHKA в Нью-Йорке известна своим приветливым персоналом, эстетичной и успокаивающей атмосферой, а также квалифицированными и сертифицированными мастерами и терапевтами. Все спа-процедуры проводятся лицензированными специалистами штата Нью-Йорк с использованием органических премиальных масел, подобранных под индивидуальные потребности каждого гостя.",
    about_p2: "Ведущие издания Allure, W, Self, TimeOut и Citysearch признали TOCHKA одним из лучших спа за глубокие терапевтические методики, экспертность мастеров и целебную косметику. У нас есть всё для вашего полного обновления: от авторских программ и массажей для двоих до деликатного ухода за телом.",
    services_title: "ВАШ ВЫБОР",
    s1_name: "Глубокий мышечный массаж",
    s1_price: "1 час / $105 + налог",
    s2_name: "Спортивный массаж",
    s2_price: "1 час / $115 + налог",
    s3_name: "Массаж горячими камнями",
    s3_price: "1 час / $170 + налог",
    s4_name: "Массаж горячими маслами",
    s4_price: "1 час / $175 + налог",
    s5_name: "60-минутный массаж всего тела",
    s5_price: "1 час / $185 + налог",
    s6_name: "90-минутный массаж всего тела",
    s6_price: "1.5 часа / $195 + налог",
    s7_name: "Ароматерапия",
    s7_price: "1 час / $180 + налог",
    s8_name: "Скраб с морской солью и<br />30 минут массажа",
    s8_price: "1 час / $180 + налог",
    s9_name: "Баночная терапия",
    s9_price: "30 мин / $60 + налог",
    s10_name: "Рефлексотерапия",
    s10_price: "1 час / $165 + налог",
    masters_title: "МАСТЕРА",
    masters_subtitle: "Познакомьтесь с нашими сертифицированными мастерами и терапевтами",
    m1_role: "Основатель и ведущий мастер",
    m2_role: "Наш эстетист",
    m3_role: "Наш терапевт",
    m4_role: "Наш терапевт",
    reels_title: "АТМОСФЕРА И РИЛСЫ",
    reels_subtitle: "Подписывайтесь на нас в Instagram",
    r1_tag: "★ Ритуал гармонии",
    r2_tag: "★ Магия прикосновения",
    r3_tag: "★ Целебные масла",
    r4_tag: "★ Глубокий релакс",
    temple_title: "ВАШЕ ТЕЛО — ВАШ ХРАМ, ВЕРНО?",
    contacts_title: "КОНТАКТЫ",
    form_heading: "Оставить заявку",
    form_note: "Отправьте заявку, и мы перезвоним вам в течение 15 минут.",
    form_name_ph: "Ваше имя",
    form_email_ph: "Ваш E-mail",
    form_phone_ph: "Ваш телефон (+7 / +1 / +995...)",
    form_select_ph: "Выберите желаемую процедуру...",
    form_send_btn: "Отправить",
    form_transmitting: "Отправка заявки...",
    form_success: "✦ Спасибо! Ваша заявка принята, мы свяжемся с вами в ближайшее время.",
    token_title: "Палитра Obsidian",
    footer_copy: "© 2023–2025 TOCHKA MASSAGE & SPA. ВСЕ ПРАВА ЗАЩИЩЕНЫ."
  },
  ka: {
    nav_about: "ჩვენს შესახებ",
    nav_services: "მომსახურება",
    nav_masters: "ოსტატები",
    nav_reels: "ატმოსფერო",
    nav_contacts: "კონტაქტები",
    btn_book_header: "ჩაწერა",
    lang_select: "ენა:",
    hero_lead: "გადადგით ნაბიჯი რელაქსაციისკენ.<br />ადგილი, სადაც ზრუნავენ არა მხოლოდ სხეულზე, არამედ სულზეც.<br />თქვენი სხეული თქვენი ტაძარია, ასე არ არის?",
    curator_tag: "TOCHKA ნორმა კროუფორდისგან",
    pin_about: "ჩვენს შესახებ",
    pin_services: "მომსახურება",
    pin_masters: "ოსტატები",
    about_title: "ჩვენს შესახებ",
    about_p1: "TOCHKA ნიუ-იორკში ცნობილია თავისი მეგობრული პერსონალით, ესთეტიკური და დამამშვიდებელი ატმოსფეროთი, და რაც მთავარია — კვალიფიციური და სერტიფიცირებული თერაპევტებით. ყველა სპა პროცედურა ტარდება ლიცენზირებული პროფესიონალების მიერ, უმაღლესი ხარისხის პრემიუმ პროდუქტებით.",
    about_p2: "Allure, W, Self და TimeOut-ის საუკეთესო სპა გამოცემებმა აღიარეს TOCHKA თავისი თერაპიული პროცედურებით, გამოცდილი ოსტატებითა და კანის მოვლის უმაღლესი ხარისხის ელიტარული საშუალებებით.",
    services_title: "თქვენი არჩევანი",
    s1_name: "ღრმა ქსოვილოვანი მასაჟი",
    s1_price: "1 სთ / $105 + გადასახადი",
    s2_name: "სპორტული მასაჟი",
    s2_price: "1 სთ / $115 + გადასახადი",
    s3_name: "ცხელი ქვების მასაჟი",
    s3_price: "1 სთ / $170 + გადასახადი",
    s4_name: "ცხელი ზეთის მასაჟი",
    s4_price: "1 სთ / $175 + გადასახადი",
    s5_name: "60-წუთიანი სრული სხეულის მასაჟი",
    s5_price: "1 სთ / $185 + გადასახადი",
    s6_name: "90-წუთიანი სრული სხეულის მასაჟი",
    s6_price: "1.5 სთ / $195 + გადასახადი",
    s7_name: "არომათერაპია",
    s7_price: "1 სთ / $180 + გადასახადი",
    s8_name: "ზღვის მარილის სკრაბი და<br />30 წთ მასაჟი",
    s8_price: "1 სთ / $180 + გადასახადი",
    s9_name: "ვაკუუმური თერაპია",
    s9_price: "30 წთ / $60 + გადასახადი",
    s10_name: "რეფლექსოლოგია",
    s10_price: "1 სთ / $165 + გადასახადი",
    masters_title: "ოსტატები",
    masters_subtitle: "გაიცანით ჩვენი პროფესიონალი ესთეტიკოსები და თერაპევტები",
    m1_role: "დამფუძნებელი და მთავარი ოსტატი",
    m2_role: "ჩვენი ესთეტიკოსი",
    m3_role: "ჩვენი თერაპევტი",
    m4_role: "ჩვენი თერაპევტი",
    reels_title: "ატმოსფერო და ვიდეოები",
    reels_subtitle: "გამოგვყევით Instagram-ზე",
    r1_tag: "★ რიტუალის ჰარმონია",
    r2_tag: "★ შეხების მაგია",
    r3_tag: "★ სამკურნალო ზეთები",
    r4_tag: "★ ღრმა რელაქსაცია",
    temple_title: "თქვენი სხეული თქვენი ტაძარია, ასე არ არის?",
    contacts_title: "კონტაქტები",
    form_heading: "გამოგვიგზავნეთ მოთხოვნა",
    form_note: "გამოგვიგზავნეთ მოთხოვნა და ჩვენ დაგიკავშირდებით.",
    form_name_ph: "თქვენი სახელი",
    form_email_ph: "თქვენი ელ-ფოსტა",
    form_phone_ph: "თქვენი ტელეფონი (+995 / +1...)",
    form_select_ph: "აირჩიეთ სასურველი პროცედურა...",
    form_send_btn: "გაგზავნა",
    form_transmitting: "იგზავნება...",
    form_success: "✦ გმადლობთ! თქვენი მოთხოვნა მიღებულია, მალე დაგიკავშირდებით.",
    token_title: "Obsidian პალიტრა",
    footer_copy: "© 2023–2025 TOCHKA MASSAGE & SPA. ყველა უფლება დაცულია."
  }
};

let currentGisoLang = localStorage.getItem('tochka_giso_lang') || 'en';

function applyGisoLanguage(lang) {
  if (!GISO_TRANSLATIONS[lang]) lang = 'en';
  currentGisoLang = lang;
  localStorage.setItem('tochka_giso_lang', lang);
  document.documentElement.lang = lang;

  const t = GISO_TRANSLATIONS[lang];

  // Update language buttons active state
  document.querySelectorAll('.lang-btn').forEach(btn => {
    if (btn.getAttribute('data-lang') === lang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // 1. Navigation
  document.querySelectorAll('[data-i18n="nav_about"]').forEach(el => el.textContent = t.nav_about);
  document.querySelectorAll('[data-i18n="nav_services"]').forEach(el => el.textContent = t.nav_services);
  document.querySelectorAll('[data-i18n="nav_masters"]').forEach(el => el.textContent = t.nav_masters);
  document.querySelectorAll('[data-i18n="nav_reels"]').forEach(el => el.textContent = t.nav_reels);
  document.querySelectorAll('[data-i18n="nav_contacts"]').forEach(el => el.textContent = t.nav_contacts);
  document.querySelectorAll('[data-i18n="btn_book_header"]').forEach(el => el.textContent = t.btn_book_header);
  document.querySelectorAll('[data-i18n="lang_select"]').forEach(el => el.textContent = t.lang_select);

  // 2. Hero Manifesto
  const leadEl = document.querySelector('.manifesto-lead');
  if (leadEl) leadEl.innerHTML = t.hero_lead;

  const curatorEl = document.querySelector('.curator-tag');
  if (curatorEl) curatorEl.textContent = t.curator_tag;

  // 3. Hotspots
  const pinAbout = document.querySelector('.pin-about .pin-text');
  if (pinAbout) pinAbout.textContent = t.pin_about;
  const pinServices = document.querySelector('.pin-services .pin-text');
  if (pinServices) pinServices.textContent = t.pin_services;
  const pinMasters = document.querySelector('.pin-masters .pin-text');
  if (pinMasters) pinMasters.textContent = t.pin_masters;

  // 4. About Section
  const aboutSec = document.getElementById('about');
  if (aboutSec) {
    const title = aboutSec.querySelector('.section-title');
    if (title) title.textContent = t.about_title;
    const paras = aboutSec.querySelectorAll('.about-para');
    if (paras[0]) paras[0].textContent = t.about_p1;
    if (paras[1]) paras[1].textContent = t.about_p2;
  }

  // 5. Services Section
  const servicesSec = document.getElementById('services');
  if (servicesSec) {
    const title = servicesSec.querySelector('.section-title');
    if (title) title.textContent = t.services_title;

    const cards = servicesSec.querySelectorAll('.service-card');
    const serviceKeys = [
      { name: t.s1_name, price: t.s1_price },
      { name: t.s2_name, price: t.s2_price },
      { name: t.s3_name, price: t.s3_price },
      { name: t.s4_name, price: t.s4_price },
      { name: t.s5_name, price: t.s5_price },
      { name: t.s6_name, price: t.s6_price },
      { name: t.s7_name, price: t.s7_price },
      { name: t.s8_name, price: t.s8_price },
      { name: t.s9_name, price: t.s9_price },
      { name: t.s10_name, price: t.s10_price },
    ];

    cards.forEach((card, idx) => {
      if (serviceKeys[idx]) {
        const nameEl = card.querySelector('.service-name');
        const priceEl = card.querySelector('.service-pricing');
        if (nameEl) nameEl.innerHTML = serviceKeys[idx].name;
        if (priceEl) priceEl.innerHTML = serviceKeys[idx].price;
      }
    });
  }

  // 6. Masters Section
  const mastersSec = document.getElementById('masters');
  if (mastersSec) {
    const title = mastersSec.querySelector('.section-title');
    if (title) title.textContent = t.masters_title;
    const sub = mastersSec.querySelector('.section-subtitle');
    if (sub) sub.textContent = t.masters_subtitle;

    const roles = mastersSec.querySelectorAll('.master-role');
    if (roles[0]) roles[0].textContent = t.m1_role;
    if (roles[1]) roles[1].textContent = t.m2_role;
    if (roles[2]) roles[2].textContent = t.m3_role;
    if (roles[3]) roles[3].textContent = t.m4_role;
  }

  // 7. Reels Section
  const reelsSec = document.getElementById('reels');
  if (reelsSec) {
    const title = reelsSec.querySelector('.section-title');
    if (title) title.textContent = t.reels_title;
    const sub = reelsSec.querySelector('.section-subtitle');
    if (sub) {
      sub.innerHTML = `${t.reels_subtitle} <a href="https://www.instagram.com/toch._ka/" target="_blank" rel="noopener" style="color: var(--c-gold-champagne); text-decoration: none;">@toch._ka</a>`;
    }
    const tags = reelsSec.querySelectorAll('.reel-tag');
    if (tags[0]) tags[0].textContent = t.r1_tag;
    if (tags[1]) tags[1].textContent = t.r2_tag;
    if (tags[2]) tags[2].textContent = t.r3_tag;
    if (tags[3]) tags[3].textContent = t.r4_tag;
  }

  // 8. Temple Banner
  const templeTitle = document.querySelector('.temple-title');
  if (templeTitle) templeTitle.textContent = t.temple_title;

  // 9. Contacts & Form
  const contactsSec = document.getElementById('contacts');
  if (contactsSec) {
    const title = contactsSec.querySelector('.section-title');
    if (title) title.textContent = t.contacts_title;
    const head = contactsSec.querySelector('.form-heading');
    if (head) head.textContent = t.form_heading;
    const note = contactsSec.querySelector('.form-note');
    if (note) note.textContent = t.form_note;

    const nameInp = document.getElementById('clientName');
    if (nameInp) nameInp.placeholder = t.form_name_ph;
    const emailInp = document.getElementById('clientEmail');
    if (emailInp) emailInp.placeholder = t.form_email_ph;
    const phoneInp = document.getElementById('clientPhone');
    if (phoneInp) phoneInp.placeholder = t.form_phone_ph;

    const sel = document.getElementById('selectedService');
    if (sel && sel.options[0]) sel.options[0].textContent = t.form_select_ph;

    const sendBtn = contactsSec.querySelector('.giso-send-btn span');
    if (sendBtn) sendBtn.textContent = t.form_send_btn;
  }

  // 10. Tokens & Footer
  const tokenHead = document.querySelector('.token-title-col .t-head:first-child');
  if (tokenHead) tokenHead.textContent = t.token_title;

  const footerCopy = document.querySelector('.footer-copy');
  if (footerCopy) footerCopy.textContent = t.footer_copy;
}

document.addEventListener('DOMContentLoaded', () => {
  // Initialize language
  applyGisoLanguage(currentGisoLang);

  // Language button event listeners
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const lang = btn.getAttribute('data-lang');
      applyGisoLanguage(lang);
    });
  });

  // 1. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileLinks = document.querySelectorAll('.m-nav-link, .m-btn-book');

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
      const spans = mobileMenuBtn.querySelectorAll('span');
      if (mobileDrawer.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(4px, 4px)';
        spans[1].style.transform = 'rotate(-45deg) translate(4px, -4px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.transform = 'none';
      }
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        const spans = mobileMenuBtn.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.transform = 'none';
      });
    });
  }

  // 2. Service Card Click to Auto-Select Treatment & Scroll to Booking
  const serviceCards = document.querySelectorAll('.service-card');
  const serviceSelect = document.getElementById('selectedService');

  serviceCards.forEach(card => {
    card.addEventListener('click', () => {
      const serviceName = card.getAttribute('data-service');
      if (serviceSelect && serviceName) {
        for (let i = 0; i < serviceSelect.options.length; i++) {
          if (serviceSelect.options[i].value.includes(serviceName) || serviceName.includes(serviceSelect.options[i].value)) {
            serviceSelect.selectedIndex = i;
            break;
          }
        }
        
        const contactsSection = document.getElementById('contacts');
        if (contactsSection) {
          contactsSection.scrollIntoView({ behavior: 'smooth' });
          serviceSelect.focus();
          serviceSelect.style.borderColor = '#D4AF77';
          setTimeout(() => {
            serviceSelect.style.borderColor = '';
          }, 2000);
        }
      }
    });
  });

  // 3. Contact & Booking Form Handler
  const form = document.getElementById('bookingForm');
  const feedback = document.getElementById('gisoFeedback');

  if (form && feedback) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const t = GISO_TRANSLATIONS[currentGisoLang] || GISO_TRANSLATIONS.en;
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>${t.form_transmitting}</span>`;

      setTimeout(() => {
        feedback.innerHTML = t.form_success;
        form.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<span>${t.form_send_btn}</span>`;
      }, 1000);
    });
  }

  // 4. Header Shadow on Scroll
  const header = document.getElementById('mainHeader');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
});
