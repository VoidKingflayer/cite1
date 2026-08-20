/**
 * TOCHKA | MASSAGE & SPA — AUTHENTIC BATUMI INSTAGRAM SERVICES & LOGIC (EN, RU, GE)
 * Currency rules:
 * - English (EN): Dollars only ($)
 * - Georgian (KA/GE): Lari only (₾)
 * - Russian (RU): Dual format (₾ — $)
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
    curator_tag: "TOCHKA BY ANNA KOLOSOVA",
    pin_about: "about",
    pin_services: "services",
    pin_masters: "masters",
    about_title: "ABOUT",
    about_p1: "TOCHKA in Batumi is renowned for its calming atmosphere, continuous-contact massage technique, and personalized care by certified therapist Anna Kolosova. All treatments use natural coconut oil or delicate creams, accompanied by custom guest playlists and tea/coffee aftercare.",
    about_p2: "Located at 46 Luka Asatiani St, TOCHKA offers a peaceful sanctuary where you can escape the noise of the city, release tension from tired muscles, and restore internal harmony.",
    services_title: "YOU CHOOSE",
    s1_name: "Classic Massage",
    s1_price: "60 min / $45",
    s2_name: "Relaxing Massage<br />(Continuous Contact)",
    s2_price: "60 min / $45",
    s3_name: "Lymphatic Drainage Therapy",
    s3_price: "60 min / $48",
    s4_name: "Sports & Deep Tissue Massage",
    s4_price: "60 min / $52",
    s5_name: "Back & Neck Recovery Therapy",
    s5_price: "45 min / $33",
    s6_name: "Facial & Decollete Sculpting Lift",
    s6_price: "50 min / $40",
    s7_name: "Signature TOCH_KA Ritual",
    s7_price: "90 min / $70",
    s8_name: "4 Hands Synchronized Symphony",
    s8_price: "60 min / $93",
    masters_title: "MASTERS",
    masters_subtitle: "Meet our certified therapists in Batumi",
    m1_role: "Founder & Lead Therapist",
    m2_role: "Sports & Recovery Therapist",
    reels_title: "ATMOSPHERE & REELS",
    reels_subtitle: "Follow us on Instagram",
    r1_tag: "★ Ritual Flow",
    r2_tag: "★ Sacred Touch",
    r3_tag: "★ Healing Oils",
    r4_tag: "★ Deep Relaxation",
    temple_title: "BODY'S YOUR TEMPLE, RIGHT?",
    contacts_title: "CONTACTS",
    form_heading: "Send us a request",
    form_note: "Send us a request and master Anna Kolosova will confirm within 15 minutes.",
    form_name_ph: "Your Name",
    form_email_ph: "Your E-mail",
    form_phone_ph: "Your Phone (+995 591...)",
    form_select_ph: "Select desired treatment...",
    form_send_btn: "Send",
    form_transmitting: "Transmitting...",
    form_success: "✦ Thank you. We have received your request and will contact you shortly.",
    token_title: "Obsidian Palette",
    footer_copy: "© 2023–2026 TOCHKA MASSAGE SANCTUARY. BATUMI, 46 LUKA ASATIANI ST."
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
    curator_tag: "ТОЧКА ОТ АННЫ КОЛОСОВОЙ",
    pin_about: "о нас",
    pin_services: "услуги",
    pin_masters: "мастера",
    about_title: "О НАС",
    about_p1: "TOCHKA в Батуми известна своей эстетичной и успокаивающей атмосферой, авторской техникой непрерывного контакта и индивидуальным подходом мастера Анны Колосовой. Все сеансы проводятся с использованием натурального кокосового масла или нежного крема под персональный плейлист гостя.",
    about_p2: "Пространство на ул. Лука Асатиани, 46 создано для того, чтобы вы могли замедлиться, отпустить накопившийся стресс и почувствовать легкость в теле.",
    services_title: "ВАШ ВЫБОР",
    s1_name: "Классический массаж",
    s1_price: "60 мин / $45",
    s2_name: "Расслабляющий массаж<br />(Непрерывный контакт)",
    s2_price: "60 мин / $45",
    s3_name: "Лимфодренажный массаж",
    s3_price: "60 мин / $48",
    s4_name: "Спортивный и глубокотканный",
    s4_price: "60 мин / $52",
    s5_name: "Восстановление спины и шеи",
    s5_price: "45 мин / $33",
    s6_name: "Скульптурирующий массаж лица",
    s6_price: "50 мин / $40",
    s7_name: "Авторский ритуал TOCH_KA",
    s7_price: "90 мин / $70",
    s8_name: "Синхронный массаж в 4 руки",
    s8_price: "60 мин / $93",
    masters_title: "МАСТЕРА",
    masters_subtitle: "Познакомьтесь с нашими мастерами в Батуми",
    m1_role: "Основатель и ведущий мастер",
    m2_role: "Мастер спортивного массажа",
    reels_title: "АТМОСФЕРА И РИЛСЫ",
    reels_subtitle: "Подписывайтесь на нас в Instagram",
    r1_tag: "★ Ритуал гармонии",
    r2_tag: "★ Магия прикосновения",
    r3_tag: "★ Целебные масла",
    r4_tag: "★ Глубокий релакс",
    temple_title: "ВАШЕ ТЕЛО — ВАШ ХРАМ, ВЕРНО?",
    contacts_title: "КОНТАКТЫ",
    form_heading: "Оставить заявку",
    form_note: "Отправьте заявку, и мастер Анна Колосова свяжется с вами в течение 15 минут.",
    form_name_ph: "Ваше имя",
    form_email_ph: "Ваш E-mail",
    form_phone_ph: "Ваш телефон (+995 591...)",
    form_select_ph: "Выберите желаемую процедуру...",
    form_send_btn: "Отправить",
    form_transmitting: "Отправка заявки...",
    form_success: "✦ Спасибо! Ваша заявка принята, мы свяжемся с вами в ближайшее время.",
    token_title: "Палитра Obsidian",
    footer_copy: "© 2023–2026 TOCHKA MASSAGE SANCTUARY. БАТУМИ, УЛ. ЛУКА АСАТИАНИ, 46."
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
    curator_tag: "TOCHKA ანა კოლოსოვასგან",
    pin_about: "ჩვენს შესახებ",
    pin_services: "მომსახურება",
    pin_masters: "ოსტატები",
    about_title: "ჩვენს შესახებ",
    about_p1: "TOCHKA ბათუმში ცნობილია თავისი დამამშვიდებელი ატმოსფეროთი, უწყვეტი კონტაქტის საავტორო ტექნიკითა და ანა კოლოსოვას ინდივიდუალური მიდგომით. ყველა სეანსი ტარდება ქოქოსის ნატურალური ზეთით და პერსონალური მუსიკით.",
    about_p2: "სივრცე ლუკა ასათიანის 46-ში შექმნილია იმისთვის, რომ მოიშოროთ დაღლილობა და იგრძნოთ სხეულის სიმსუბუქე.",
    services_title: "თქვენი არჩევანი",
    s1_name: "კლასიკური მასაჟი",
    s1_price: "60 წთ / 120 ₾",
    s2_name: "რელაქს მასაჟი<br />(უწყვეტი კონტაქტი)",
    s2_price: "60 წთ / 120 ₾",
    s3_name: "ლიმფოდრენაჟული თერაპია",
    s3_price: "60 წთ / 130 ₾",
    s4_name: "სპორტული და ღრმა მასაჟი",
    s4_price: "60 წთ / 140 ₾",
    s5_name: "ზურგისა და კისრის თერაპია",
    s5_price: "45 წთ / 90 ₾",
    s6_name: "სახის სკულპტურული ლიფტინგი",
    s6_price: "50 წთ / 110 ₾",
    s7_name: "საავტორო რიტუალი TOCH_KA",
    s7_price: "90 წთ / 190 ₾",
    s8_name: "სინქრონული მასაჟი 4 ხელში",
    s8_price: "60 წთ / 250 ₾",
    masters_title: "ოსტატები",
    masters_subtitle: "გაიცანით ჩვენი სერტიფიცირებული ოსტატები ბათუმში",
    m1_role: "დამფუძნებელი და მთავარი ოსტატი",
    m2_role: "სპორტული მასაჟის ოსტატი",
    reels_title: "ატმოსფერო და ვიდეოები",
    reels_subtitle: "გამოგვყევით Instagram-ზე",
    r1_tag: "★ რიტუალის ჰარმონია",
    r2_tag: "★ შეხების მაგია",
    r3_tag: "★ სამკურნალო ზეთები",
    r4_tag: "★ ღრმა რელაქსაცია",
    temple_title: "თქვენი სხეული თქვენი ტაძარია, ასე არ არის?",
    contacts_title: "კონტაქტები",
    form_heading: "განაცხადის დატოვება",
    form_note: "დატოვეთ განაცხადი და ოსტატი ანა კოლოსოვა დაგიკავშირდებათ 15 წუთში.",
    form_name_ph: "თქვენი სახელი",
    form_email_ph: "თქვენი ელ-ფოსტა",
    form_phone_ph: "თქვენი ტელეფონი (+995 591...)",
    form_select_ph: "აირჩიეთ სასურველი პროცედურა...",
    form_send_btn: "გაგზავნა",
    form_transmitting: "იგზავნება...",
    form_success: "✦ მადლობა! თქვენი განაცხადი მიღებულია, მალე დაგიკავშირდებით.",
    token_title: "Obsidian პალიტრა",
    footer_copy: "© 2023–2026 TOCHKA MASSAGE SANCTUARY. ბათუმი, ლუკა ასათიანის 46."
  }
};

const GISO_SELECT_OPTIONS = {
  en: [
    { value: "", text: "Select desired treatment...", disabled: true },
    { value: "Classic Massage", text: "Classic Massage (60 min / $45)" },
    { value: "Relaxing Continuous-Contact Massage", text: "Relaxing Continuous-Contact (60 min / $45)" },
    { value: "Lymphatic Drainage Therapy", text: "Lymphatic Drainage Therapy (60 min / $48)" },
    { value: "Sports & Deep Tissue Massage", text: "Sports & Deep Tissue Massage (60 min / $52)" },
    { value: "Back & Neck Recovery Therapy", text: "Back & Neck Recovery Therapy (45 min / $33)" },
    { value: "Facial & Decollete Sculpting Lift", text: "Facial & Decollete Sculpting Lift (50 min / $40)" },
    { value: "Signature TOCH_KA Sanctuary Ritual", text: "Signature TOCH_KA Ritual (90 min / $70)" },
    { value: "4 Hands Synchronized Symphony", text: "4 Hands Synchronized Symphony (60 min / $93)" }
  ],
  ka: [
    { value: "", text: "აირჩიეთ სასურველი პროცედურა...", disabled: true },
    { value: "Classic Massage", text: "კლასიკური მასაჟი (60 წთ / 120 ₾)" },
    { value: "Relaxing Continuous-Contact Massage", text: "რელაქს მასაჟი უწყვეტი კონტაქტით (60 წთ / 120 ₾)" },
    { value: "Lymphatic Drainage Therapy", text: "ლიმფოდრენაჟული თერაპია (60 წთ / 130 ₾)" },
    { value: "Sports & Deep Tissue Massage", text: "სპორტული და ღრმა მასაჟი (60 წთ / 140 ₾)" },
    { value: "Back & Neck Recovery Therapy", text: "ზურგისა და კისრის თერაპია (45 წთ / 90 ₾)" },
    { value: "Facial & Decollete Sculpting Lift", text: "სახისა და დეკოლტეს სკულპტურული ლიფტინგი (50 წთ / 110 ₾)" },
    { value: "Signature TOCH_KA Sanctuary Ritual", text: "საავტორო რიტუალი TOCH_KA (90 წთ / 190 ₾)" },
    { value: "4 Hands Synchronized Symphony", text: "4-ხელიანი სინქრონული სიმფონია (60 წთ / 250 ₾)" }
  ],
  ru: [
    { value: "", text: "Выберите желаемую процедуру...", disabled: true },
    { value: "Classic Massage", text: "Классический массаж (60 мин / $45)" },
    { value: "Relaxing Continuous-Contact Massage", text: "Расслабляющий массаж (60 мин / $45)" },
    { value: "Lymphatic Drainage Therapy", text: "Лимфодренажный массаж (60 мин / $48)" },
    { value: "Sports & Deep Tissue Massage", text: "Спортивный и глубокотканный (60 мин / $52)" },
    { value: "Back & Neck Recovery Therapy", text: "Восстановление спины и шеи (45 мин / $33)" },
    { value: "Facial & Decollete Sculpting Lift", text: "Скульптурирующий массаж лица (50 мин / $40)" },
    { value: "Signature TOCH_KA Sanctuary Ritual", text: "Авторский ритуал TOCH_KA (90 мин / $70)" },
    { value: "4 Hands Synchronized Symphony", text: "Синхронный массаж в 4 руки (60 мин / $93)" }
  ]
};

let currentGisoLang = localStorage.getItem('tochka_giso_lang') || 'en';

function applyGisoLanguage(lang) {
  if (!GISO_TRANSLATIONS[lang]) lang = 'en';
  currentGisoLang = lang;
  localStorage.setItem('tochka_giso_lang', lang);
  document.documentElement.lang = lang;

  const t = GISO_TRANSLATIONS[lang];

  // Update language switcher active states
  document.querySelectorAll('.lang-btn').forEach(btn => {
    if (btn.getAttribute('data-lang') === lang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // 1. Navigation & Header
  document.querySelectorAll('[data-i18n="nav_about"]').forEach(el => el.textContent = t.nav_about);
  document.querySelectorAll('[data-i18n="nav_services"]').forEach(el => el.textContent = t.nav_services);
  document.querySelectorAll('[data-i18n="nav_masters"]').forEach(el => el.textContent = t.nav_masters);
  document.querySelectorAll('[data-i18n="nav_reels"]').forEach(el => el.textContent = t.nav_reels);
  document.querySelectorAll('[data-i18n="nav_contacts"]').forEach(el => el.textContent = t.nav_contacts);
  document.querySelectorAll('[data-i18n="btn_book_header"]').forEach(el => el.textContent = t.btn_book_header);
  document.querySelectorAll('[data-i18n="lang_select"]').forEach(el => el.textContent = t.lang_select);

  // 2. Hero Section
  const heroLead = document.querySelector('.hero-lead');
  if (heroLead) heroLead.innerHTML = t.hero_lead;

  const curatorTag = document.querySelector('.curator-tag');
  if (curatorTag) curatorTag.textContent = t.curator_tag;

  const pinAbout = document.querySelector('.pin-about');
  if (pinAbout) pinAbout.textContent = t.pin_about;
  const pinServices = document.querySelector('.pin-services');
  if (pinServices) pinServices.textContent = t.pin_services;
  const pinMasters = document.querySelector('.pin-masters');
  if (pinMasters) pinMasters.textContent = t.pin_masters;

  // 3. Editorial Hero Quote
  const templeTitle = document.querySelector('.hero-quote-serif');
  if (templeTitle) templeTitle.textContent = t.temple_title;

  // 4. About Section
  const aboutSec = document.getElementById('about');
  if (aboutSec) {
    const title = aboutSec.querySelector('.section-title');
    if (title) title.textContent = t.about_title;
    const p1 = aboutSec.querySelector('.about-p1');
    if (p1) p1.textContent = t.about_p1;
    const p2 = aboutSec.querySelector('.about-p2');
    if (p2) p2.textContent = t.about_p2;
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
  }

  // 7. Reels Section
  const reelsSec = document.getElementById('reels');
  if (reelsSec) {
    const title = reelsSec.querySelector('.section-title');
    if (title) title.textContent = t.reels_title;
    const sub = reelsSec.querySelector('.section-subtitle');
    if (sub) sub.innerHTML = `${t.reels_subtitle} <a href="https://www.instagram.com/toch._ka/" target="_blank" rel="noopener" style="color: var(--color-gold); text-decoration: none;">@toch._ka</a>`;

    const tags = reelsSec.querySelectorAll('.reel-tag');
    if (tags[0]) tags[0].textContent = t.r1_tag;
    if (tags[1]) tags[1].textContent = t.r2_tag;
    if (tags[2]) tags[2].textContent = t.r3_tag;
    if (tags[3]) tags[3].textContent = t.r4_tag;
  }

  // 8. Contacts Section
  const contactsSec = document.getElementById('contacts');
  if (contactsSec) {
    const title = contactsSec.querySelector('.section-title');
    if (title) title.textContent = t.contacts_title;
    const formHeading = contactsSec.querySelector('.form-heading');
    if (formHeading) formHeading.textContent = t.form_heading;
    const formNote = contactsSec.querySelector('.form-note');
    if (formNote) formNote.textContent = t.form_note;

    const nameInput = document.getElementById('clientName');
    if (nameInput) nameInput.placeholder = t.form_name_ph;
    const emailInput = document.getElementById('clientEmail');
    if (emailInput) emailInput.placeholder = t.form_email_ph;
    const phoneInput = document.getElementById('clientPhone');
    if (phoneInput) phoneInput.placeholder = t.form_phone_ph;

    const submitBtn = contactsSec.querySelector('.giso-send-btn span');
    if (submitBtn) submitBtn.textContent = t.form_send_btn;

    // Update select dropdown options
    const selectEl = document.getElementById('selectedService');
    const opts = GISO_SELECT_OPTIONS[lang] || GISO_SELECT_OPTIONS.en;
    if (selectEl && opts) {
      const selectedIndex = selectEl.selectedIndex >= 0 ? selectEl.selectedIndex : 0;
      selectEl.innerHTML = '';
      opts.forEach(opt => {
        const o = document.createElement('option');
        o.value = opt.value;
        o.textContent = opt.text;
        if (opt.disabled) o.disabled = true;
        selectEl.appendChild(o);
      });
      if (selectedIndex < selectEl.options.length) {
        selectEl.selectedIndex = selectedIndex;
      }
    }
  }

  // 9. Palette Tokens
  const tokenTitle = document.querySelector('.palette-section-title');
  if (tokenTitle) tokenTitle.textContent = t.token_title;

  // 10. Footer
  const footerCopy = document.querySelector('.footer-copy');
  if (footerCopy) footerCopy.textContent = t.footer_copy;
}

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Language
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
  const menuToggle = document.getElementById('gisoMenuToggle');
  const mobileDrawer = document.getElementById('gisoMobileDrawer');
  const mobileLinks = document.querySelectorAll('.m-link, .m-btn-primary');

  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
      const spans = menuToggle.querySelectorAll('span');
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
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.transform = 'none';
      });
    });
  }

  // 2. Service Card Click -> Scroll to Contacts Form
  const serviceCards = document.querySelectorAll('.service-card');
  const selectElement = document.getElementById('selectedService');
  const contactsSection = document.getElementById('contacts');

  serviceCards.forEach(card => {
    card.addEventListener('click', () => {
      const serviceName = card.getAttribute('data-service');
      if (selectElement && serviceName) {
        for (let i = 0; i < selectElement.options.length; i++) {
          if (selectElement.options[i].value.includes(serviceName) || serviceName.includes(selectElement.options[i].value)) {
            selectElement.selectedIndex = i;
            break;
          }
        }
      }
      if (contactsSection) {
        contactsSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // 3. Booking Form Submission
  const bookingForm = document.getElementById('bookingForm');
  const gisoFeedback = document.getElementById('gisoFeedback');

  if (bookingForm && gisoFeedback) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const t = GISO_TRANSLATIONS[currentGisoLang] || GISO_TRANSLATIONS.en;
      const submitBtn = bookingForm.querySelector('button[type="submit"]');

      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>${t.form_transmitting}</span>`;

      setTimeout(() => {
        gisoFeedback.textContent = t.form_success;
        gisoFeedback.style.display = 'block';
        bookingForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<span>${t.form_send_btn}</span>`;
      }, 1000);
    });
  }
});
