// Unsplash dark editorial high-quality curated wellness stock photos

export const STOCK_IMAGES = {
  hero: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=85&w=1600",
  about: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&q=85&w=1200",
  atmosphere: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&q=85&w=1200",
  
  services: {
    relaxing: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=85&w=800",
    deepTissue: "https://images.unsplash.com/photo-1519824921617-01d4524888bc?auto=format&fit=crop&q=85&w=800",
    backNeck: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&q=85&w=800",
    face: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=85&w=800",
    lymphatic: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=85&w=800",
    fullBody: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=85&w=800",
    antiStress: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=85&w=800"
  },
  
  gallery: [
    {
      url: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=85&w=800",
      caption: "TACTILE HARMONY",
      tag: "CONVERSATION WITH THE BODY"
    },
    {
      url: "https://images.unsplash.com/photo-1519824921617-01d4524888bc?auto=format&fit=crop&q=85&w=800",
      caption: "COMFORT DETAILS",
      tag: "MASTER TOUCH"
    },
    {
      url: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&q=85&w=800",
      caption: "ATMOSPHERE",
      tag: "BATUMI STUDIO"
    },
    {
      url: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=85&w=800",
      caption: "DEEP RELAXATION",
      tag: "CLASSIC BODYWORK"
    },
    {
      url: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=85&w=800",
      caption: "NATURAL RECOVERY",
      tag: "FACE THERAPY"
    },
    {
      url: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=85&w=800",
      caption: "INNER CALM",
      tag: "ANTI-STRESS RITUAL"
    }
  ],

  highlights: [
    { id: 'about', label: 'About Studio', icon: 'Sparkles', bg: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&q=80&w=200' },
    { id: 'reviews', label: 'Reviews', icon: 'Star', bg: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&q=80&w=200' },
    { id: 'price', label: 'Price List', icon: 'Tag', bg: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=200' },
    { id: 'faq', label: 'FAQ', icon: 'HelpCircle', bg: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=200' },
    { id: 'location', label: 'Batumi Map', icon: 'MapPin', bg: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&q=80&w=200' }
  ]
};

export const SERVICES_DATA = [
  {
    id: "relaxing",
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
