// Self-hosted editorial stock photography, graded to match the studio's moodboard
// (see /home/kingflayer/Рабочий стол/Prog/site/app/static/images/stock for the raw + graded source set)
// "teal" = biotech-case-study duotone accent shots, "stone" = neutral b&w for supporting tiles

const S = "/images/stock";

export const STOCK_IMAGES = {
  hero: `${S}/pexels_04_stone.jpg`,
  about: `${S}/pexels_10_stone.jpg`,
  atmosphere: `${S}/pexels_08_stone.jpg`,

  services: {
    relaxing: `${S}/pexels_02_stone.jpg`,
    deepTissue: `${S}/pexels_07_stone.jpg`,
    backNeck: `${S}/pexels_03_stone.jpg`,
    face: `${S}/pexels_06_stone.jpg`,
    lymphatic: `${S}/pexels_05_stone.jpg`,
    fullBody: `${S}/pexels_04_stone.jpg`,
    antiStress: `${S}/pexels_01_stone.jpg`
  },

  gallery: [
    {
      url: `${S}/pexels_01_stone.jpg`,
      caption: "TACTILE HARMONY",
      tag: "CONVERSATION WITH THE BODY"
    },
    {
      url: `${S}/pexels_06_stone.jpg`,
      caption: "COMFORT DETAILS",
      tag: "MASTER TOUCH"
    },
    {
      url: `${S}/pexels_08_stone.jpg`,
      caption: "ATMOSPHERE",
      tag: "BATUMI STUDIO"
    },
    {
      url: `${S}/pexels_04_stone.jpg`,
      caption: "DEEP RELAXATION",
      tag: "CLASSIC BODYWORK"
    },
    {
      url: `${S}/pexels_03_stone.jpg`,
      caption: "NATURAL RECOVERY",
      tag: "OUTDOOR RITUAL"
    },
    {
      url: `${S}/pexels_07_stone.jpg`,
      caption: "INNER CALM",
      tag: "TECHNIQUE & PRECISION"
    }
  ],

  highlights: [
    { id: 'about', label: 'About Studio', icon: 'Sparkles', bg: `${S}/pexels_08_stone.jpg` },
    { id: 'reviews', label: 'Reviews', icon: 'Star', bg: `${S}/pexels_02_stone.jpg` },
    { id: 'price', label: 'Price List', icon: 'Tag', bg: `${S}/pexels_09_stone.jpg` },
    { id: 'faq', label: 'FAQ', icon: 'HelpCircle', bg: `${S}/pexels_05_stone.jpg` },
    { id: 'location', label: 'Batumi Map', icon: 'MapPin', bg: `${S}/pexels_03_stone.jpg` }
  ]
};

export const MARQUEE_ITEMS = [
  'ТОЧНОСТЬ ДАВЛЕНИЯ',
  'СТАЛЬНАЯ ДИСЦИПЛИНА ТЕХНИКИ',
  'ТИШИНА И ПРИВАТНОСТЬ',
  'ВОССТАНОВЛЕНИЕ ТЕЛА',
  'BATUMI, GEORGIA'
];

export const STATS_DATA = [
  { value: 7, suffix: '+', label: 'лет практики' },
  { value: 1400, suffix: '+', label: 'сеансов проведено' },
  { value: 100, suffix: '%', label: 'приватность' },
  { value: 2, suffix: '', label: 'мастера в студии' }
];

export const PROCESS_DATA = [
  {
    n: '01',
    title: 'Диагностика',
    titleEn: 'Diagnostics',
    desc: 'Короткая беседа и пальпация — находим зоны гипертонуса и определяем допустимую интенсивность.'
  },
  {
    n: '02',
    title: 'Подбор техники',
    titleEn: 'Technique fit',
    desc: 'Комбинируем методики под конкретный запрос: от мягкой релаксации до глубокой проработки фасций.'
  },
  {
    n: '03',
    title: 'Сеанс',
    titleEn: 'The session',
    desc: 'Выверенное давление и ритм без спешки — тело ведёт, мастер точно считывает отклик.'
  },
  {
    n: '04',
    title: 'Рекомендации',
    titleEn: 'Aftercare',
    desc: 'После сеанса — короткий разбор состояния тела и рекомендации по восстановлению до следующего визита.'
  }
];

export const SERVICE_CATEGORIES = [
  { id: 'all', label: 'Все', labelEn: 'All' },
  { id: 'relax', label: 'Релакс', labelEn: 'Relax' },
  { id: 'therapeutic', label: 'Терапия', labelEn: 'Therapeutic' },
  { id: 'signature', label: 'Авторские', labelEn: 'Signature' }
];

export const SERVICES_DATA = [
  {
    id: "relaxing",
    category: "relax",
    title: "Relaxing Massage",
    titleRu: "Расслабляющий массаж",
    desc: "Мягкие глубокие поглаживания и акупрессура для полного снятия ментального и физического напряжения.",
    duration: "60 / 90 мин",
    price: "120 / 160 GEL",
    img: STOCK_IMAGES.services.relaxing,
    details: "Уникальная авторская методика плавных точечных проработок. Идеально подходит после напряженных перелетов или сложной рабочей недели."
  },
  {
    id: "deep-tissue",
    category: "therapeutic",
    title: "Deep Tissue Massage",
    titleRu: "Глубокотканный массаж",
    desc: "Интенсивная проработка фасций и глубоких мышц. Устраняет зажимы, триггерные точки и застарелую боли.",
    duration: "60 / 90 мин",
    price: "140 / 180 GEL",
    img: STOCK_IMAGES.services.deepTissue,
    details: "Силовой массаж с акцентом на проблемные зоны: шею, поясницу и плечевой пояс. Возвращает мышцам природную эластичность."
  },
  {
    id: "back-neck",
    category: "therapeutic",
    title: "Back & Neck Recovery",
    titleRu: "Восстановление спины и шеи",
    desc: "Прицельная терапия осевого скелета. Снимает синдром офисной шеи, гипертонус и головные боли напряжения.",
    duration: "45 / 60 мин",
    price: "90 / 120 GEL",
    img: STOCK_IMAGES.services.backNeck,
    details: "Специальный протокол локального восстановления для людей с сидячей работой или повышенными нагрузками."
  },
  {
    id: "face-sculpting",
    category: "signature",
    title: "Face Sculpting Massage",
    titleRu: "Скульптурирующий массаж лица",
    desc: "Миофасциальный лифтинг-массаж лица, зоны декольте и шейно-воротниковой зоны. Улучшает овал и тонус кожи.",
    duration: "50 мин",
    price: "110 GEL",
    img: STOCK_IMAGES.services.face,
    details: "Глубокая проработка мимической мускулатуры, естественный лимфодренаж и моделирующий эффект без инъекций."
  },
  {
    id: "lymphatic",
    category: "relax",
    title: "Lymphatic Drainage",
    titleRu: "Лимфодренажный массаж",
    desc: "Ритмичная мягкая техника для стимуляции лимфооттока, снятия отечности и детоксикации организма.",
    duration: "60 / 90 мин",
    price: "130 / 170 GEL",
    img: STOCK_IMAGES.services.lymphatic,
    details: "Дарит ощущение невесомости, ускоряет обменные процессы и выводит избыточную жидкость из тканей."
  },
  {
    id: "full-body",
    category: "signature",
    title: "Full Body Treatment",
    titleRu: "Авторский ритуал TOCH_KA",
    desc: "Комплексное погружение: сочетание релаксации, проработки глубоких мышц и ароматерапии натуральными маслами.",
    duration: "90 / 120 мин",
    price: "190 / 240 GEL",
    img: STOCK_IMAGES.services.fullBody,
    details: "Флагманский сеанс студии. Индивидуальный подбор комбинации техник в зависимости от текущего состояния вашего тела."
  }
];

export const REVIEWS_DATA = [
  {
    name: "Екатерина В.",
    city: "Батуми / Тбилиси",
    text: "Невероятное чувство тишины и профессионализма. Это совершенно другой уровень массажа в Батуми — без лишнего шума, в атмосфере глубокого уважения к телу.",
    rating: 5,
    date: "Август 2026"
  },
  {
    name: "Александр Г.",
    city: "Batumi Tourist",
    text: "Посещаю Deep Tissue сеансы регулярно. Мастер чувствует зажимы с первой секунды. Пропали хронические боли в шее после работы за ноутбуком.",
    rating: 5,
    date: "Июль 2026"
  },
  {
    name: "Мария К.",
    city: "Батуми",
    text: "Каждая деталь — от теплого освещения до текстуры масел и полотенец — создает ощущение дорогого приватного спа. Обязательно вернусь!",
    rating: 5,
    date: "Август 2026"
  }
];

export const FAQ_DATA = [
  {
    q: "Как подготовиться к сеансу?",
    a: "Рекомендуем не принимать тяжелую пищу за 1–1.5 часа до сеанса. В студии есть всё необходимое: от одноразовых принадлежностей до душевой и средств гигиены."
  },
  {
    q: "Принимаете ли вы туристов и на каком языке говорите?",
    a: "Да, мы находимся в удобном районе Батуми. Говорим на русском и английском языках. Вы можете быстро записаться через WhatsApp или Telegram."
  },
  {
    q: "Можно ли выбрать интенсивность массажа?",
    a: "Перед каждым сеансом мы проводим короткую диагностическую беседу и адаптируем силу нажатий и техники под ваш комфорт."
  }
];
