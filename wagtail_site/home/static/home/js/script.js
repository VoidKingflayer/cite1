/**
 * TOCHKA — AUTHENTIC BATUMI INSTAGRAM SERVICES & MULTILINGUAL LOGIC (EN, RU, GE)
 * Currency rules:
 * - English (EN): Dollars only ($)
 * - Georgian (KA/GE): Lari only (₾)
 * - Russian (RU): Dual format (₾ — $)
 */

const OMRA_TRANSLATIONS = {
  en: {
    nav_concept: "CONCEPT",
    nav_rituals: "RITUALS & PRICES",
    nav_loyalty: "LOYALTY",
    nav_giftcards: "GIFT CARDS",
    nav_atmosphere: "ATMOSPHERE",
    nav_palette: "IDENTITY",
    nav_booking: "CONTACTS",
    btn_book_header: "BOOK A SESSION",
    hero_badge: "WELLNESS SANCTUARY",
    hero_title: 'A space<br /><span class="italic-serif">where you can slow down</span>',
    hero_desc: "TOCHKA is born at the meeting point of body and soul — a space to slow down, release tension, and restore your inner calm in gentle care.",
    hero_btn_explore: "EXPLORE RITUALS",
    hero_btn_book: "BOOK APPOINTMENT",
    h_feat_1: "Continuous-Contact Technique",
    h_feat_2: "Natural Coconut Oil & Care",
    h_feat_3: "10% Off 1st Visit • 20% Off 5th",
    hero_tag_title: "WE PRESS PAUSE FOR YOU",
    concept_serial: "01",
    concept_heading: "CONCEPT & PHILOSOPHY",
    concept_quote: "“I wanted to create a place where you can feel tranquility from the very first moments: soft light, quiet, pleasant interior details, and a feeling of warmth. It is important to me that here you can not only relax your body, but also slow down, escape the everyday rush, and simply be in a comfortable, peaceful atmosphere.”",
    concept_author: "— Anna Kolosova • TOCHKA Founder & Therapist",
    c_card_1_title: "Continuous-Contact Touch",
    c_card_1_text: "Our signature continuous-contact technique: the therapist's hands barely leave the body, moving in a smooth meditative flow. This rhythm signals safety to the nervous system, releasing chronic tension without sudden changes in pace.",
    c_card_2_title: "Atmosphere of Gentle Care",
    c_card_2_text: "Natural coconut oil or delicate cream, fresh soft white towels, personalized guest playlist instead of generic sounds, and a relaxed cup of coffee or herbal tea after your session.",
    rituals_serial: "02",
    rituals_heading: "THERAPIES & RITUALS",
    rituals_subtext: "Authentic treatments, precise myofascial techniques, and deep restorative care in Batumi.",
    f_all: "All Rituals",
    f_body: "Body Therapy",
    f_focused: "Face & Focused",
    f_signature: "Signature & 4-Hands",
    promo_title: "10% Privilege on Your First Session",
    promo_subtitle: "Experience our signature continuous-contact massage with master. Includes organic coconut oil and complimentary post-session tea or coffee.",
    promo_btn: "CLAIM 10% DISCOUNT",
    r_select_btn: "Select",
    
    r1_name: "Relaxing Massage",
    r1_desc: "Smooth, soft movements, light muscle release.",
    
    r2_name: "Classic Massage",
    r2_desc: "Moderate rhythm, deep muscle relief.",
    
    r3_name: "Sports Massage",
    r3_desc: "Intensive therapy on muscles, fascia, and trigger points.",
    
    r4_name: "Lymphatic Drainage Massage",
    r4_desc: "Soft, flowing technique along lymph flow and lymphatic nodes.",
    
    loyalty_serial: "03",
    loyalty_heading: "THE RITUAL OF GRATITUDE",
    loyalty_subtitle: "20% Privilege on Your 5th Massage",
    loyalty_desc: "Receive more pleasure and care for yourself. Enjoy 20% off your 5th massage — our little ritual of gratitude. Collect 4 stamps and receive your privilege on the 5th session.",
    stamp_prompt: "CLICK TO TEST STAMP COLLECTION:",
    stamp_counter_3: "3 of 4 stamps collected. 1 more until your 20% discount on the 5th session!",
    stamp_counter_win: "🎉 <strong>Congratulations!</strong> All 4 stamps collected. Your 5th session is now 20% OFF at TOCHKA!",
    gift_serial: "04",
    gift_heading: "GIFT CARDS & CERTIFICATES",
    gift_subtext: "Give the gift of presence, tranquility, and restorative self-care.",
    gc_title: "Select Certificate Value",
    gc_note: "Embossed tactile physical card in a signature envelope. Available exclusively in person upon visiting our sanctuary.",
    gc_sub_1: "Classic / Relaxing Massage (60m)",
    gc_sub_2: "Extended 90m Deep Recovery",
    gc_sub_3: "Signature TOCH_KA Ritual (90m)",
    gc_sub_4: "4 Hands Synchronized Symphony (60m)",
    gc_btn_buy: "PURCHASE IN SANCTUARY IN PERSON",
    gc_in_person_note: "✦ Gift certificates are issued exclusively in person upon visiting our sanctuary (46 Luka Asatiani St).",
    cert_del_digital: "In Person at Batumi Sanctuary",
    cert_del_envelope: "Physical Signature Envelope (46 Luka Asatiani St)",
    cert_buyer_lbl: "YOUR NAME (BUYER) *",
    cert_phone_lbl: "PHONE / WHATSAPP *",
    cert_recipient_lbl: "RECIPIENT NAME (FOR WHOM) *",
    cert_wishes_lbl: "GREETING MESSAGE / WISHES",
    cert_btn_submit: "PURCHASE GIFT CERTIFICATE",
    cert_transmitting: "PROCESSING CERTIFICATE ORDER...",
    cert_success: "✦ Certificate order received! We will contact you via WhatsApp / Phone within 15 minutes to send the certificate.",
    gc_card_type_tag: "EXCLUSIVE GIFT CERTIFICATE",
    gc_card_motto: "YOUR SPACE TO BREATHE",
    gc_for_label: "FOR:",
    gc_default_guest: "VALUED GUEST",
    gc_validity_note: "VALID FOR 3 MONTHS FROM ISSUANCE",
    booking_cert_hint_text: "Want to give massage as a gift?",
    booking_cert_hint_link: "Order a Gift Certificate →",
    reels_serial: "05",
    reels_heading: "ATMOSPHERE & INSTAGRAM REELS",
    reels_subtext: 'Moments of deep breath, flowing oils and restorative touch at <a href="https://www.instagram.com/toch._ka/" target="_blank" rel="noopener" style="color: inherit; text-decoration: underline;">@toch._ka</a>',
    reel1_title: "Ritual Harmony",
    reel1_desc: "Continuous flow & peaceful focus",
    reel2_title: "Tactile Care",
    reel2_desc: "Organic coconut oil & quiet space",
    reel3_title: "Natural Rhythm",
    reel3_desc: "Release of chronic tension",
    reel4_title: "Sacred Pause",
    reel4_desc: "Your sanctuary in Batumi",
    banner_text: "ALL YOU KNEAD IS CARE",
    palette_serial: "06",
    palette_heading: "COLOUR PALETTE & IDENTITY",
    palette_subtext: "Iron metallic black, brushed titanium steel, platinum sand, and raw forged charcoal.",
    booking_serial: "07",
    booking_heading: "RESERVE YOUR SANCTUARY",
    booking_lead: "Select your ritual and preferred time. Master Anna Kolosova will confirm your appointment within 15 minutes.",
    form_name_lbl: "FULL NAME *",
    form_phone_lbl: "PHONE / WHATSAPP *",
    form_ritual_lbl: "CHOICE OF MASSAGE TYPE *",
    form_date_lbl: "PREFERRED DATE *",
    form_time_lbl: "PREFERRED TIME *",
    form_time_select: "Select time slot...",
    form_notes_lbl: "SPECIAL REQUESTS / MASSAGE FOCUS",
    form_notes_ph: "Lower back focus, music playlist preference, pressure level...",
    form_submit_btn: "CONFIRM RESERVATION",
    form_transmitting: "TRANSMITTING RESERVATION...",
    form_success: "✦ Reservation request received. Master Anna Kolosova will contact you via WhatsApp / Phone within 15 minutes to confirm your private suite.",
    loc_heading: "SANCTUARY LOCATION",
    loc_city_batumi: "BATUMI SANCTUARY",
    loc_hours_batumi: "Daily: 09:00 — 23:00",
    btn_gmaps: "Open in Google Maps",
    f_title_nav: "NAVIGATION",
    f_title_rituals: "RITUALS",
    f_title_connect: "LOCATION & CONNECT",
    footer_motto: "Your space to breathe. Aesthetics & comfort as part of the healing process.",
    footer_copy: "© 2023–2026 TOCHKA. Anna Kolosova Massage Sanctuary, Batumi."
  },
  ru: {
    nav_concept: "КОНЦЕПЦИЯ",
    nav_rituals: "РИТУАЛЫ И ЦЕНЫ",
    nav_loyalty: "ЛОЯЛЬНОСТЬ",
    nav_giftcards: "СЕРТИФИКАТЫ",
    nav_atmosphere: "АТМОСФЕРА",
    nav_palette: "АЙДЕНТИКА",
    nav_booking: "КОНТАКТЫ",
    btn_book_header: "ЗАБРОНИРОВАТЬ",
    hero_badge: "WELLNESS SANCTUARY",
    hero_title: 'Пространство,<br /><span class="italic-serif">где можно замедлиться</span>',
    hero_desc: "ТОЧКА рождается на стыке тела и души — пространство, где можно замедлиться, отпустить напряжение и восстановить внутреннее спокойствие в бережной заботе.",
    hero_btn_explore: "ВЫБРАТЬ РИТУАЛ",
    hero_btn_book: "ЗАПИСАТЬСЯ НА СЕАНС",
    h_feat_1: "Техника непрерывного контакта",
    h_feat_2: "Натуральное кокосовое масло",
    h_feat_3: "Скидка 10% на 1-й сеанс • 20% на 5-й",
    hero_tag_title: "МЫ СТАВИМ СУЕТУ НА ПАУЗУ",
    concept_serial: "01",
    concept_heading: "КОНЦЕПЦИЯ И ФИЛОСОФИЯ",
    concept_quote: '«Мне хотелось создать место, в котором можно почувствовать спокойствие уже с первых минут: мягкий свет, тишина, приятные детали интерьера и ощущение уюта. Для меня важно, чтобы здесь вы могли не только расслабить тело, но и немного замедлиться, отвлечься от суеты и побыть в комфортной, спокойной обстановке».',
    concept_author: "— Анна Колосова • Основатель и мастер студии ТОЧКА",
    c_card_1_title: "Непрерывный контакт",
    c_card_1_text: "Авторская техника непрерывного контакта: руки мастера практически не отрываются от тела, переходя из одного движения в другое. Такой ритм дает нервной системе сигнал безопасности и глубоко снимает накопившийся стресс.",
    c_card_2_title: "Атмосфера искренней заботы",
    c_card_2_text: "Натуральное кокосовое масло или нежный питательный крем, белоснежные полотенца, персональный плейлист гостя вместо шаблонных звуков и чашка чая или кофе после сеанса.",
    rituals_serial: "02",
    rituals_heading: "ТЕРАПИИ И РИТУАЛЫ",
    rituals_subtext: "Проверенные методики, прицельная проработка триггерных зон и холистический уход в Батуми.",
    f_all: "Все ритуалы",
    f_body: "Массажи тела",
    f_focused: "Лицо и Зоны",
    f_signature: "Авторские и 4 руки",
    promo_title: "Скидка 10% на первое посещение",
    promo_subtitle: "Познакомьтесь с авторской техникой непрерывного контакта мастера. Включает натуральное кокосовое масло и чай/кофе после процедуры.",
    promo_btn: "ПОЛУЧИТЬ СКИДКУ 10%",
    r_select_btn: "Выбрать",
    
    r1_name: "Расслабляющий массаж",
    r1_desc: "плавные, мягкие движения, лёгкая проработка мышц",
    
    r2_name: "Классический массаж",
    r2_desc: "средний ритм, глубокая проработка мышц",
    
    r3_name: "Спортивный массаж",
    r3_desc: "интенсивная работа с мышцами, фасциями, триггерными точками",
    
    r4_name: "Лимфодренажный массаж",
    r4_desc: "мягкая работа по ходу лимфотока и лимфатических точек",
    
    loyalty_serial: "03",
    loyalty_heading: "РИТУАЛ БЛАГОДАРНОСТИ",
    loyalty_subtitle: "Скидка 20% на ваш 5-й массаж",
    loyalty_desc: "Дарите себе больше заботы и наслаждения. Скидка 20% на ваш 5-й массаж — наш знак признательности за ваше доверие. Соберите 4 отметки и получите скидку 20% на 5-й сеанс.",
    stamp_prompt: "НАЖМИТЕ, ЧТОБЫ ПРОТЕСТИРОВАТЬ ШТАМПЫ:",
    stamp_counter_3: "Собрано 3 из 4 отметок. Еще 1 до скидки 20% на 5-й сеанс!",
    stamp_counter_win: "🎉 <strong>Поздравляем!</strong> Все 4 отметки собраны. Скидка 20% на ваш 5-й сеанс в ТОЧКА активирована!",
    gift_serial: "04",
    gift_heading: "ПОДАРОЧНЫЕ СЕРТИФИКАТЫ",
    gift_subtext: "Подарите близким моменты тишины, заботы и глубокого расслабления.",
    gc_title: "Выберите номинал сертификата",
    gc_note: "Премиальная физическая карта с тиснением в фирменном конверте. Оформляется исключительно лично в салоне.",
    gc_sub_1: "Классический / Релакс-массаж (60 мин)",
    gc_sub_2: "Глубокая проработка тела (90 мин)",
    gc_sub_3: "Авторский ритуал TOCH_KA (90 мин)",
    gc_sub_4: "Синхронный массаж в 4 руки (60 мин)",
    gc_btn_buy: "ОФОРМИТЬ В САЛОНЕ ЛИЧНО",
    gc_in_person_note: "✦ Подарочные сертификаты оформляются исключительно лично при посещении салона (Батуми, ул. Лука Асатиани, 46)",
    cert_del_digital: "Лично в салоне в Батуми",
    cert_del_envelope: "Фирменный конверт в салоне (ул. Лука Асатиани, 46)",
    cert_buyer_lbl: "ВАШЕ ИМЯ (ПОКУПАТЕЛЬ) *",
    cert_phone_lbl: "ТЕЛЕФОН / WHATSAPP *",
    cert_recipient_lbl: "ИМЯ ПОЛУЧАТЕЛЯ (ДЛЯ КОГО) *",
    cert_wishes_lbl: "ТЕКСТ ПОЗДРАВЛЕНИЯ / ПОЖЕЛАНИЯ",
    cert_btn_submit: "ОФОРМИТЬ ПОДАРОЧНЫЙ СЕРТИФИКАТ",
    cert_transmitting: "ОФОРМЛЕНИЕ СЕРТИФИКАТА...",
    cert_success: "✦ Заказ на сертификат оформлен! Мастер свяжется с вами в течение 15 минут для отправки/передачи сертификата.",
    gc_card_type_tag: "ПОДАРОЧНЫЙ СЕРТИФИКАТ",
    gc_card_motto: "ВАШЕ ПРОСТРАНСТВО ДЛЯ ДЫХАНИЯ",
    gc_for_label: "ДЛЯ:",
    gc_default_guest: "ДОРОГОМУ ГОСТЮ",
    gc_validity_note: "ДЕЙСТВИТЕЛЕН 3 МЕСЯЦА С МОМЕНТА ВЫДАЧИ",
    booking_cert_hint_text: "Хотите подарить массаж близкому человеку?",
    booking_cert_hint_link: "Оформить подарочный сертификат →",
    reels_serial: "05",
    reels_heading: "АТМОСФЕРА И РИЛСЫ В INSTAGRAM",
    reels_subtext: 'Кадры спокойствия, ароматных масел и целебного прикосновения в <a href="https://www.instagram.com/toch._ka/" target="_blank" rel="noopener" style="color: inherit; text-decoration: underline;">@toch._ka</a>',
    reel1_title: "Гармония ритуала",
    reel1_desc: "Непрерывный поток и тишина",
    reel2_title: "Тактильная забота",
    reel2_desc: "Кокосовое масло и мягкий свет",
    reel3_title: "Естественный ритм",
    reel3_desc: "Снятие зажимов и усталости",
    reel4_title: "Священная пауза",
    reel4_desc: "Ваш островок покоя в Батуми",
    banner_text: "ALL YOU KNEAD IS CARE",
    palette_serial: "06",
    palette_heading: "ЦВЕТОВАЯ ПАЛИТРА И АЙДЕНТИКА",
    palette_subtext: "Металлический черный, матовый титан, платиновый песок и кованый уголь.",
    booking_serial: "07",
    booking_heading: "ЗАБРОНИРОВАТЬ СЕАНС",
    booking_lead: "Выберите желаемый ритуал и удобное время. Мастер Анна Колосова свяжется с вами в течение 15 минут для подтверждения записи.",
    form_name_lbl: "ВАШЕ ПОЛНОЕ ИМЯ *",
    form_phone_lbl: "ТЕЛЕФОН / WHATSAPP *",
    form_ritual_lbl: "ВЫБОР ТИПА МАССАЖА *",
    form_date_lbl: "ЖЕЛАЕМАЯ ДАТА *",
    form_time_lbl: "УДОБНОЕ ВРЕМЯ *",
    form_time_select: "Выберите время...",
    form_notes_lbl: "ПОЖЕЛАНИЯ / ЗОНЫ ОСОБОГО ВНИМАНИЯ",
    form_notes_ph: "Акцент на поясницу, пожелания по музыке, желаемая сила нажима...",
    form_submit_btn: "ПОДТВЕРДИТЬ БРОНИРОВАНИЕ",
    form_transmitting: "ОТПРАВКА БРОНИРОВАНИЯ...",
    form_success: "✦ Запрос на бронирование получен. Мастер Анна Колосова свяжется с вами по WhatsApp / телефону в течение 15 минут для подтверждения записи.",
    loc_heading: "ЛОКАЦИЯ САНКТУАРИЯ",
    loc_city_batumi: "БАТУМИ САНКТУАРИЙ",
    loc_hours_batumi: "Ежедневно: 09:00 — 23:00",
    btn_gmaps: "Открыть в Google Maps",
    f_title_nav: "НАВИГАЦИЯ",
    f_title_rituals: "РИТУАЛЫ",
    f_title_connect: "ЛОКАЦИЯ И СВЯЗЬ",
    footer_motto: "Ваше пространство для дыхания. Эстетика и комфорт как путь к исцелению.",
    footer_copy: "© 2023–2026 TOCHKA. Массажное пространство Анны Колосовой, Батуми."
  },
  ka: {
    nav_concept: "კონცეფცია",
    nav_rituals: "რიტუალები და ფასები",
    nav_loyalty: "ლოიალობა",
    nav_giftcards: "სერტიფიკატები",
    nav_atmosphere: "ატმოსფერო",
    nav_palette: "იდენტობა",
    nav_booking: "კონტაქტები",
    btn_book_header: "დაჯავშნა",
    hero_badge: "WELLNESS SANCTUARY",
    hero_title: 'სივრცე,<br /><span class="italic-serif">სადაც შეგიძლიათ შენელდეთ</span>',
    hero_desc: "TOCHKA იბადება სხეულისა და სულის შეხვედრის ადგილზე — სივრცე, სადაც შეგიძლიათ შეანელოთ ტემპი, მოიხსნათ დაძაბულობა და აღიდგინოთ შინაგანი სიმშვიდე.",
    hero_btn_explore: "რიტუალების ნახვა",
    hero_btn_book: "სეანსზე ჩაწერა",
    h_feat_1: "უწყვეტი კონტაქტის ტექნიკა",
    h_feat_2: "ნატურალური ქოქოსის ზეთი",
    h_feat_3: "10% ფასდაკლება 1-ლ ვიზიტზე • 20% მე-5-ზე",
    hero_tag_title: "ჩვენ ვაჩერებთ დროს თქვენთვის",
    concept_serial: "01",
    concept_heading: "კონცეფცია და ფილოსოფია",
    concept_quote: '„მინდოდა შემექმნა ადგილი, სადაც პირველივე წუთებიდან იგრძნობთ სიმშვიდეს: რბილი სინათლე, სიჩუმე, ინტერიერის სასიამოვნო დეტალები და სიმყუდროვე. ჩემთვის მნიშვნელოვანია, რომ აქ შეძლოთ არა მხოლოდ სხეულის მოდუნება, არამედ ცოტათი შეჩერება, ყოველდღიური აურზაურისგან განტვირთვა და კომფორტულ, მშვიდ გარემოში ყოფნა“.',
    concept_author: "— ანა კოლოსოვა • TOCHKA-ს დამფუძნებელი და თერაპევტი",
    c_card_1_title: "უწყვეტი კონტაქტი",
    c_card_1_text: "საავტორო უწყვეტი კონტაქტის ტექნიკა: ოსტატის ხელები სხეულს არ შორდება, რაც ქმნის მედიტაციურ ნაკადს და ნერვულ სისტემას აძლევს სრული უსაფრთხოებისა და რელაქსაციის სიგნალს.",
    c_card_2_title: "ზრუნვის ატმოსფერო",
    c_card_2_text: "ქოქოსის ბუნებრივი ზეთი, თეთრი პირსახოცები, თქვენი საყვარელი პერსონალური მუსიკა და ფინჯანი ჩაი ან ყავა სეანსის შემდეგ.",
    rituals_serial: "02",
    rituals_heading: "თერაპიები და რიტუალები",
    rituals_subtext: "ავთენტური მასაჟები, მიოფასციალური ტექნიკა და ღრმა განტვირთვა ბათუმში.",
    f_all: "ყველა რიტუალი",
    f_body: "სხეულის თერაპია",
    f_focused: "სახე და ზონალური",
    f_signature: "საავტორო & 4 ხელში",
    promo_title: "10%-იანი ფასდაკლება პირველ ვიზიტზე",
    promo_subtitle: "გაეცანით ოსტატის უწყვეტი კონტაქტის საავტორო ტექნიკას. მოიცავს ქოქოსის ნატურალურ ზეთს და ჩაის/ყავას სეანსის შემდეგ.",
    promo_btn: "10% ფასდაკლების მიღება",
    r_select_btn: "არჩევა",
    
    r1_name: "რელაქსაციის მასაჟი",
    r1_desc: "მდორე, რბილი მოძრაობები, კუნთების მსუბუქი დამუშავება.",
    
    r2_name: "კლასიკური მასაჟი",
    r2_desc: "საშუალო რიტმი, კუნთების ღრმა დამუშავება.",
    
    r3_name: "სპორტული მასაჟი",
    r3_desc: "ინტენსიური მუშაობა კუნთებზე, ფასციებზე, ტრიგერულ წერტილებზე.",
    
    r4_name: "ლიმფოდრენაჟული მასაჟი",
    r4_desc: "რბილი მუშაობა ლიმფის დინებისა და ლიმფური წერტილების გასწვრივ.",
    
    loyalty_serial: "03",
    loyalty_heading: "მადლიერების რიტუალი",
    loyalty_subtitle: "20%-იანი ფასდაკლება თქვენს მე-5 მასაჟზე",
    loyalty_desc: "აჩუქეთ საკუთარ თავს მეტი სიამოვნება. 20%-იანი ფასდაკლება მე-5 მასაჟზე — ჩვენი მადლიერების ნიშნად. შეაგროვეთ 4 შტამპი და მიიღეთ 20%-იანი პრივილეგია მე-5 სეანსზე.",
    stamp_prompt: "დააჭირეთ შტამპების გასატესტად:",
    stamp_counter_3: "შეგროვებულია 3 შტამპი 4-დან. კიდევ 1 მე-5 სეანსზე 20%-იან ფასდაკლებამდე!",
    stamp_counter_win: "🎉 <strong>გილოცავთ!</strong> 4-ვე შტამპი შეგროვებულია. თქვენი 20%-იანი ფასდაკლება მე-5 სეანსზე გააქტიურებულია!",
    gift_serial: "04",
    gift_heading: "სასაჩუქრე სერტიფიკატები",
    gift_subtext: "აჩუქეთ საყვარელ ადამიანებს სიმშვიდისა და ღრმა განტვირთვის წუთები.",
    gc_title: "აირჩიეთ სერტიფიკატის ნომინალი",
    gc_note: "პრემიალური რელიეფური ფიზიკური ბარათი საფირმო კონვერტში. გაიცემა მხოლოდ პირადად სალონში.",
    gc_sub_1: "კლასიკური / რელაქს მასაჟი (60 წთ)",
    gc_sub_2: "გაფართოებული ღრმა თერაპია (90 წთ)",
    gc_sub_3: "საავტორო რიტუალი TOCH_KA (90 წთ)",
    gc_sub_4: "სინქრონული მასაჟი 4 ხელში (60 წთ)",
    gc_btn_buy: "შეძენა სალონში პირადად",
    gc_in_person_note: "✦ სასაჩუქრე სერტიფიკატების შეძენა შესაძლებელია მხოლოდ პირადად სალონში ვიზიტისას (ბათუმი, ლუკა ასათიანის ქ. 46).",
    cert_del_digital: "პირადად ბათუმის სალონში",
    cert_del_envelope: "სასაчуქრე კონვერტი სალონში (ლუკა ასათიანის ქ. 46)",
    cert_buyer_lbl: "თქვენი სახელი (მყიდველი) *",
    cert_phone_lbl: "ტელეფონი / WHATSAPP *",
    cert_recipient_lbl: "მიმღების სახელი (ვისთვის) *",
    cert_wishes_lbl: "მილოცვის ტექსტი / სურვილები",
    cert_btn_submit: "სასაჩუქრე სერტიფიკატის შეძენა",
    cert_transmitting: "სერტიფიკატის დამუშავება...",
    cert_success: "✦ სერტიფიკატის შეკვეთა მიღებულია! ოსტატი დაგიკავშირდებათ 15 წუთში.",
    gc_card_type_tag: "სასაჩუქრე სერტიფიკატი",
    gc_card_motto: "თქვენი სივრცე სუნთქვისთვის",
    gc_for_label: "ვისთვის:",
    gc_default_guest: "ძვირფას სტუმარს",
    gc_validity_note: "მოქმედებს 3 თვე გაცემის დღიდან",
    booking_cert_hint_text: "გსურთ მასაჟის ჩუქება საყვარელ ადამიანს?",
    booking_cert_hint_link: "სასაჩუქრე სერტიფიკატის შეძენა →",
    reels_serial: "05",
    reels_heading: "ატმოსფერო და INSTAGRAM ვიდეოები",
    reels_subtext: 'სიმშვიდის, არომატული ზეთებისა და სამკურნალო შეხების კადრები <a href="https://www.instagram.com/toch._ka/" target="_blank" rel="noopener" style="color: inherit; text-decoration: underline;">@toch._ka</a>-ზე',
    reel1_title: "რიტუალის ჰარმონია",
    reel1_desc: "უწყვეტი დინება და სიჩუმე",
    reel2_title: "ტაქტილური ზრუნვა",
    reel2_desc: "ქოქოსის ზეთი და მყუდროება",
    reel3_title: "ბუნებრივი რიტმი",
    reel3_desc: "დაძაბულობის სრული მოხსნა",
    reel4_title: "წმინდა პაუზა",
    reel4_desc: "თქვენი სიმშვიდის ოაზისი ბათუმში",
    banner_text: "ALL YOU KNEAD IS CARE",
    palette_serial: "06",
    palette_heading: "ფერების პალიტრა და იდენტობა",
    palette_subtext: "მეტალის შავი, ტიტანის ფოლადი, პლატინის ქვიშა და ნახშირი.",
    booking_serial: "07",
    booking_heading: "სეანსის დაჯავშნა",
    booking_lead: "აირჩიეთ სასურველი რიტუალი და დრო. ოსტატი ანა კოლოსოვა დაგიკავშირდებათ 15 წუთში.",
    form_name_lbl: "სრული სახელი *",
    form_phone_lbl: "ტელეფონი / WHATSAPP *",
    form_ritual_lbl: "მასაჟის ტიპის არჩევა *",
    form_date_lbl: "სასურველი თარიღი *",
    form_time_lbl: "სასურველი დრო *",
    form_time_select: "აირჩიეთ დრო...",
    form_notes_lbl: "სპეციალური სურვილები / აქცენტები",
    form_notes_ph: "ზურგზე აქცენტი, მუსიკალური პრეფერენციები, წნევის დონე...",
    form_submit_btn: "ჯავშნის დადასტურება",
    form_transmitting: "ჯავშანი იგზავნება...",
    form_success: "✦ ჯავშნის მოთხოვნა მიღებულია. ანა კოლოსოვა დაგიკავშირდებათ WhatsApp-ით ან ტელეფონით 15 წუთში.",
    loc_heading: "სანქტუარიის ლოკაცია",
    loc_city_batumi: "ბათუმის სანქტუარია",
    loc_hours_batumi: "ყოველდღე: 09:00 — 23:00",
    btn_gmaps: "Google Maps-ზე გახსნა",
    f_title_nav: "ნავიგაცია",
    f_title_rituals: "რიტუალები",
    f_title_connect: "ლოკაცია და კონტაქტი",
    footer_motto: "თქვენი სივრცე სუნთქვისთვის. ესთეტიკა და კომფორტი, როგორც განკურნების გზა.",
    footer_copy: "© 2023–2026 TOCHKA. ანა კოლოსოვას მასაჟის სანქტუარია, ბათუმი."
  }
};

// Pricing data per language: EN = Dollars only ($), KA = Lari only (₾), RU = Dual format (₾ — $)
const OMRA_PRICE_DATA = {
  en: {
    rituals: [
      [ { time: "60 min", cost: "$45" }, { time: "90 min", cost: "$60" } ],
      [ { time: "60 min", cost: "$45" }, { time: "90 min", cost: "$60" } ],
      [ { time: "60 min", cost: "$52" }, { time: "90 min", cost: "$67" } ],
      [ { time: "60 min", cost: "$48" }, { time: "90 min", cost: "$63" } ]
    ],
    certificates: [ "$45", "$60", "$70", "$93" ],
    certSubs: [
      "Classic / Relaxing Massage (60m)",
      "Extended 90m Deep Recovery",
      "Signature TOCH_KA Ritual (90m)",
      "4 Hands Synchronized Symphony (60m)"
    ],
    selectPlaceholder: "Select a massage ritual...",
    selectOptions: [
      { value: "Relaxing Massage", text: "Relaxing Continuous-Contact (60 min — $45 / 90 min — $60)" },
      { value: "Classic Massage", text: "Classic Massage (60 min — $45 / 90 min — $60)" },
      { value: "Sports Massage", text: "Sports & Deep Tissue (60 min — $52 / 90 min — $67)" },
      { value: "Lymphatic Drainage Massage", text: "Lymphatic Drainage Therapy (60 min — $48 / 90 min — $63)" }
    ]
  },
  ka: {
    rituals: [
      [ { time: "60 წთ", cost: "120 ₾" }, { time: "90 წთ", cost: "160 ₾" } ],
      [ { time: "60 წთ", cost: "120 ₾" }, { time: "90 წთ", cost: "160 ₾" } ],
      [ { time: "60 წთ", cost: "140 ₾" }, { time: "90 წთ", cost: "180 ₾" } ],
      [ { time: "60 წთ", cost: "130 ₾" }, { time: "90 წთ", cost: "170 ₾" } ]
    ],
    certificates: [ "120 ₾", "160 ₾", "190 ₾", "250 ₾" ],
    selectPlaceholder: "აირჩიეთ მასაჟის რიტუალი...",
    selectOptions: [
      { value: "Relaxing Massage", text: "რელაქსაციის მასაჟი (60 წთ — 120 ₾ / 90 წთ — 160 ₾)" },
      { value: "Classic Massage", text: "კლასიკური მასაჟი (60 წთ — 120 ₾ / 90 წთ — 160 ₾)" },
      { value: "Sports Massage", text: "სპორტული მასაჟი (60 წთ — 140 ₾ / 90 წთ — 180 ₾)" },
      { value: "Lymphatic Drainage Massage", text: "ლიმფოდრენაჟული მასაჟი (60 წთ — 130 ₾ / 90 წთ — 170 ₾)" }
    ]
  },
  ru: {
    rituals: [
      [ { time: "60 мин", cost: "$45" }, { time: "90 мин", cost: "$60" } ],
      [ { time: "60 мин", cost: "$45" }, { time: "90 мин", cost: "$60" } ],
      [ { time: "60 мин", cost: "$52" }, { time: "90 мин", cost: "$67" } ],
      [ { time: "60 мин", cost: "$48" }, { time: "90 мин", cost: "$63" } ]
    ],
    certificates: [ "$45", "$60", "$70", "$93" ],
    selectPlaceholder: "Выберите вид массажа...",
    selectOptions: [
      { value: "Relaxing Massage", text: "Расслабляющий массаж (60 мин — $45 / 90 мин — $60)" },
      { value: "Classic Massage", text: "Классический массаж (60 мин — $45 / 90 мин — $60)" },
      { value: "Sports Massage", text: "Спортивный массаж (60 мин — $52 / 90 мин — $67)" },
      { value: "Lymphatic Drainage Massage", text: "Лимфодренажный массаж (60 мин — $48 / 90 мин — $63)" }
    ]
  }
};

let currentOmraLang = localStorage.getItem('tochka_omra_lang') || 'en';

function applyOmraLanguage(lang) {
  if (!OMRA_TRANSLATIONS[lang]) lang = 'en';
  currentOmraLang = lang;
  localStorage.setItem('tochka_omra_lang', lang);
  document.documentElement.lang = lang;

  // Read Wagtail dynamic CMS translations if available
  let wagtailT = {};
  try {
    const el = document.getElementById('wagtailTranslations');
    if (el) {
      const allT = JSON.parse(el.textContent);
      wagtailT = allT[lang] || {};
    }
  } catch(e) {}

  const baseT = OMRA_TRANSLATIONS[lang] || OMRA_TRANSLATIONS.en;
  const cleanWagtailT = {};
  for (const k in wagtailT) {
    if (wagtailT[k] && wagtailT[k].trim() !== '') {
      cleanWagtailT[k] = wagtailT[k];
    }
  }
  const t = Object.assign({}, baseT, cleanWagtailT);
  const pData = OMRA_PRICE_DATA[lang] || OMRA_PRICE_DATA.en;

  // Update language switcher active states across all switchers (top bar, header, mobile drawer)
  document.querySelectorAll('.lang-btn').forEach(btn => {
    if (btn.getAttribute('data-lang') === lang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // 1. Navigation
  document.querySelectorAll('[data-i18n="nav_concept"]').forEach(el => el.textContent = t.nav_concept);
  document.querySelectorAll('[data-i18n="nav_rituals"]').forEach(el => el.textContent = t.nav_rituals);
  document.querySelectorAll('[data-i18n="nav_loyalty"]').forEach(el => el.textContent = t.nav_loyalty);
  document.querySelectorAll('[data-i18n="nav_giftcards"]').forEach(el => el.textContent = t.nav_giftcards);
  document.querySelectorAll('[data-i18n="nav_atmosphere"]').forEach(el => el.textContent = t.nav_atmosphere);
  document.querySelectorAll('[data-i18n="nav_palette"]').forEach(el => el.textContent = t.nav_palette);
  document.querySelectorAll('[data-i18n="nav_booking"]').forEach(el => el.textContent = t.nav_booking);
  document.querySelectorAll('[data-i18n="btn_book_header"]').forEach(el => el.textContent = t.btn_book_header);
  document.querySelectorAll('[data-i18n="lang_select"]').forEach(el => el.textContent = t.lang_select);
  document.querySelectorAll('[data-i18n="loc_heading"]').forEach(el => el.textContent = t.loc_heading);
  document.querySelectorAll('[data-i18n="loc_city_batumi"]').forEach(el => el.textContent = t.loc_city_batumi);
  document.querySelectorAll('[data-i18n="loc_hours_batumi"]').forEach(el => el.textContent = t.loc_hours_batumi);
  document.querySelectorAll('[data-i18n="btn_gmaps"]').forEach(el => el.textContent = t.btn_gmaps);
  document.querySelectorAll('[data-i18n="f_title_nav"]').forEach(el => el.textContent = t.f_title_nav);
  document.querySelectorAll('[data-i18n="f_title_rituals"]').forEach(el => el.textContent = t.f_title_rituals);
  document.querySelectorAll('[data-i18n="f_title_connect"]').forEach(el => el.textContent = t.f_title_connect);

  // 2. Hero Section
  const heroBadge = document.querySelector('.hero-brand-badge .badge-tag');
  if (heroBadge) heroBadge.textContent = t.hero_badge;

  const heroTitle = document.querySelector('.hero-main-title');
  if (heroTitle) heroTitle.innerHTML = t.hero_title;

  const heroDesc = document.querySelector('.hero-description');
  if (heroDesc) heroDesc.textContent = t.hero_desc;

  const btnExplore = document.querySelector('.hero-action-buttons .btn-espresso span');
  if (btnExplore) btnExplore.textContent = t.hero_btn_explore;

  const btnBook = document.querySelector('.hero-action-buttons .btn-sand-outline span');
  if (btnBook) btnBook.textContent = t.hero_btn_book;

  const feats = document.querySelectorAll('.hero-features-strip .h-feat-txt');
  if (feats[0]) feats[0].textContent = t.h_feat_1;
  if (feats[1]) feats[1].textContent = t.h_feat_2;
  if (feats[2]) feats[2].textContent = t.h_feat_3;

  const heroTag = document.querySelector('.hero-card-tag .tag-title');
  if (heroTag) heroTag.textContent = t.hero_tag_title;

  // 3. Concept Section
  const conceptQuote = document.querySelector('.concept-quote');
  if (conceptQuote) conceptQuote.textContent = t.concept_quote;

  const conceptAuthor = document.querySelector('.quote-author');
  if (conceptAuthor) conceptAuthor.textContent = t.concept_author;

  const cCard1Title = document.querySelector('.card-sand .c-card-title');
  if (cCard1Title) cCard1Title.textContent = t.c_card_1_title;
  const cCard1Text = document.querySelector('.card-sand .c-card-text');
  if (cCard1Text) cCard1Text.textContent = t.c_card_1_text;

  const cCard2Title = document.querySelector('.card-espresso .c-card-title');
  if (cCard2Title) cCard2Title.textContent = t.c_card_2_title;
  const cCard2Text = document.querySelector('.card-espresso .c-card-text');
  if (cCard2Text) cCard2Text.textContent = t.c_card_2_text;

  // 4. Rituals Section
  const rSecHeading = document.querySelector('#rituals .section-heading');
  if (rSecHeading) rSecHeading.textContent = t.rituals_heading;
  const rSecSub = document.querySelector('#rituals .section-subtext');
  if (rSecSub) rSecSub.textContent = t.rituals_subtext;

  const promoTitle = document.querySelector('.promo-title');
  if (promoTitle) promoTitle.textContent = t.promo_title;
  const promoSub = document.querySelector('.promo-subtitle');
  if (promoSub) promoSub.textContent = t.promo_subtitle;
  const promoBtn = document.querySelector('.btn-promo-action');
  if (promoBtn) promoBtn.textContent = t.promo_btn;

  let wagtailRituals = null;
  try {
    const rEl = document.getElementById('wagtailRituals');
    if (rEl) wagtailRituals = JSON.parse(rEl.textContent);
  } catch(e) {}

  const ritualData = [
    { name: t.r1_name, desc: t.r1_desc },
    { name: t.r2_name, desc: t.r2_desc },
    { name: t.r3_name, desc: t.r3_desc },
    { name: t.r4_name, desc: t.r4_desc },
  ];

  const rows = document.querySelectorAll('.ritual-row');
  rows.forEach((row, i) => {
    let rInfo = ritualData[i];
    if (wagtailRituals && wagtailRituals[i] && wagtailRituals[i][lang]) {
      const wt = wagtailRituals[i][lang];
      rInfo = {
        name: wt.name || (ritualData[i] ? ritualData[i].name : ''),
        desc: wt.desc || (ritualData[i] ? ritualData[i].desc : ''),
        tag: wt.tag || (ritualData[i] ? ritualData[i].tag : '')
      };
    }

    if (rInfo) {
      const nameEl = row.querySelector('.r-name');
      const descEl = row.querySelector('.r-desc');
      const tagEl = row.querySelector('.r-tag');
      const btn = row.querySelector('.btn-select-ritual');
      if (nameEl && rInfo.name) nameEl.textContent = rInfo.name;
      if (descEl && rInfo.desc) descEl.textContent = rInfo.desc;
      if (tagEl && rInfo.tag) tagEl.textContent = rInfo.tag;
      if (btn) btn.textContent = t.r_select_btn;

      // Update pricing tiers based on selected language currency rule
      const pricingTiers = pData.rituals[i];
      if (pricingTiers) {
        const tierElements = row.querySelectorAll('.r-tier');
        tierElements.forEach((tierEl, tIdx) => {
          if (pricingTiers[tIdx]) {
            const timeEl = tierEl.querySelector('.tier-time');
            const costEl = tierEl.querySelector('.tier-cost');
            if (timeEl) timeEl.textContent = pricingTiers[tIdx].time;
            if (costEl) costEl.textContent = pricingTiers[tIdx].cost;
          }
        });
      }
    }
  });

  // 5. Loyalty Section
  const loyaltySec = document.getElementById('loyalty');
  if (loyaltySec) {
    const head = loyaltySec.querySelector('.section-heading');
    if (head) head.textContent = t.loyalty_heading;
    const sub = loyaltySec.querySelector('.loyalty-subtitle');
    if (sub) sub.textContent = t.loyalty_subtitle;
    const desc = loyaltySec.querySelector('.loyalty-desc');
    if (desc) desc.textContent = t.loyalty_desc;
    const prompt = loyaltySec.querySelector('.stamp-prompt');
    if (prompt) prompt.textContent = t.stamp_prompt;
  }

  // 6. Gift Cards Section
  const giftSec = document.getElementById('giftcards');
  if (giftSec) {
    const head = giftSec.querySelector('.section-heading');
    if (head) head.textContent = t.gift_heading;
    const sub = giftSec.querySelector('.section-subtext');
    if (sub) sub.textContent = t.gift_subtext;
    const title = giftSec.querySelector('.gc-title');
    if (title) title.textContent = t.gc_title;
    const note = giftSec.querySelector('.gc-note');
    if (note) note.textContent = t.gc_note;
    // Update in-person note & buy button
    document.querySelectorAll('[data-i18n="gc_in_person_note"]').forEach(el => el.textContent = t.gc_in_person_note);
    document.querySelectorAll('[data-i18n="gc_btn_buy"]').forEach(el => el.textContent = t.gc_btn_buy);
    const btnBuyEl = document.getElementById('btnBuyGiftCard');
    if (btnBuyEl && t.gc_btn_buy) btnBuyEl.textContent = t.gc_btn_buy;

    if (typeof updateGiftCardBuyLink === 'function') {
      updateGiftCardBuyLink();
    }

    // Update Certificate Values & Subtitles
    const amountBtns = giftSec.querySelectorAll('.amount-btn');
    const gcDisplayAmount = document.getElementById('gcDisplayAmount');

    amountBtns.forEach((b, bIdx) => {
      if (pData.certificates[bIdx]) {
        const valStr = pData.certificates[bIdx];
        b.setAttribute('data-amount', valStr);
        const valEl = b.querySelector('.ab-val');
        if (valEl) valEl.textContent = valStr;

        if (b.classList.contains('active') && gcDisplayAmount) {
          gcDisplayAmount.textContent = valStr;
        }
      }
    });

    const abSubs = giftSec.querySelectorAll('.amount-btn .ab-sub');
    if (abSubs[0] && t.gc_sub_1) abSubs[0].textContent = t.gc_sub_1;
    if (abSubs[1] && t.gc_sub_2) abSubs[1].textContent = t.gc_sub_2;
    if (abSubs[2] && t.gc_sub_3) abSubs[2].textContent = t.gc_sub_3;
    if (abSubs[3] && t.gc_sub_4) abSubs[3].textContent = t.gc_sub_4;
  }

  // 7. Atmosphere & Reels Section
  const reelsSec = document.getElementById('atmosphere');
  if (reelsSec) {
    const head = reelsSec.querySelector('.section-heading');
    if (head) head.textContent = t.reels_heading;
    const sub = reelsSec.querySelector('.section-subtext');
    if (sub) sub.innerHTML = t.reels_subtext;

    const cards = reelsSec.querySelectorAll('.omra-reel-card');
    const reelData = [
      { title: t.reel1_title, desc: t.reel1_desc },
      { title: t.reel2_title, desc: t.reel2_desc },
      { title: t.reel3_title, desc: t.reel3_desc },
      { title: t.reel4_title, desc: t.reel4_desc },
    ];
    cards.forEach((c, idx) => {
      if (reelData[idx]) {
        const rt = c.querySelector('.omra-reel-title');
        const rd = c.querySelector('.omra-reel-desc');
        if (rt) rt.textContent = reelData[idx].title;
        if (rd) rd.textContent = reelData[idx].desc;
      }
    });
  }

  // 7.5 Manifesto Banner
  const bannerTxt = document.querySelector('.banner-huge-text');
  if (bannerTxt && t.banner_text) {
    bannerTxt.textContent = t.banner_text;
  }

  // 8. Palette Section
  const palSec = document.getElementById('palette');
  if (palSec) {
    const head = palSec.querySelector('.section-heading');
    if (head) head.textContent = t.palette_heading;
    const sub = palSec.querySelector('.section-subtext');
    if (sub) sub.textContent = t.palette_subtext;
  }

  // 9. Booking Form Section
  const bookSec = document.getElementById('booking');
  if (bookSec) {
    const head = bookSec.querySelector('.section-heading');
    if (head) head.textContent = t.booking_heading;
    const lead = bookSec.querySelector('.booking-lead');
    if (lead) lead.textContent = t.booking_lead;

    document.querySelectorAll('[data-i18n="form_name_lbl"]').forEach(el => el.textContent = t.form_name_lbl);
    document.querySelectorAll('[data-i18n="form_phone_lbl"]').forEach(el => el.textContent = t.form_phone_lbl);
    document.querySelectorAll('[data-i18n="form_ritual_lbl"]').forEach(el => el.textContent = t.form_ritual_lbl);
    document.querySelectorAll('[data-i18n="form_date_lbl"]').forEach(el => el.textContent = t.form_date_lbl);
    document.querySelectorAll('[data-i18n="form_time_lbl"]').forEach(el => el.textContent = t.form_time_lbl);
    document.querySelectorAll('[data-i18n="form_time_select"]').forEach(el => el.textContent = t.form_time_select);
    document.querySelectorAll('[data-i18n="form_notes_lbl"]').forEach(el => el.textContent = t.form_notes_lbl);

    const notesInp = document.getElementById('specialRequests');
    if (notesInp) notesInp.placeholder = t.form_notes_ph;

    const submitBtn = bookSec.querySelector('.btn-submit span');
    if (submitBtn) submitBtn.textContent = t.form_submit_btn;

    // Populate select options dynamically according to active language and currency rule (massages only)
    const selectEl = document.getElementById('ritualSelect');
    if (selectEl && pData.selectOptions) {
      const prevVal = selectEl.value;
      selectEl.innerHTML = '';
      
      const placeholderOpt = document.createElement('option');
      placeholderOpt.value = '';
      placeholderOpt.textContent = pData.selectPlaceholder || (t.form_ritual_select || 'Выберите вид массажа...');
      placeholderOpt.disabled = true;
      if (!prevVal) placeholderOpt.selected = true;
      selectEl.appendChild(placeholderOpt);

      pData.selectOptions.forEach(opt => {
        const o = document.createElement('option');
        o.value = opt.value;
        o.textContent = opt.text;
        if (opt.value === prevVal) o.selected = true;
        selectEl.appendChild(o);
      });
    }

    if (typeof window.loadAvailableTimeSlots === 'function') {
      window.loadAvailableTimeSlots();
    }
  }

  // 10. Footer
  const fMotto = document.querySelector('.f-motto');
  if (fMotto) fMotto.textContent = t.footer_motto;

  const fCopy = document.querySelector('.f-copyright');
  if (fCopy) fCopy.textContent = t.footer_copy;
}

document.addEventListener('DOMContentLoaded', () => {
  // Initialize language from Wagtail CMS and user preference
  applyOmraLanguage(currentOmraLang);

  // Language button event listeners (top bar, header, mobile drawer)
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const lang = btn.getAttribute('data-lang');
      applyOmraLanguage(lang);
    });
  });

  // 1. Mobile Drawer Navigation
  const menuToggle = document.getElementById('menuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
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

  // 2. Ritual Category Filter Tabs
  const filterPills = document.querySelectorAll('.filter-pill');
  const ritualRows = document.querySelectorAll('.ritual-row');

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filter = pill.getAttribute('data-filter');
      ritualRows.forEach(row => {
        const cat = row.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          row.style.display = 'grid';
        } else {
          row.style.display = 'none';
        }
      });
    });
  });

  // 3. Select Ritual -> Autofill Booking & Scroll
  const selectBtns = document.querySelectorAll('.btn-select-ritual');
  const ritualSelect = document.getElementById('ritualSelect');
  const bookingSection = document.getElementById('booking');

  selectBtns.forEach(el => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      const row = el.closest('.ritual-row');
      if (!row) return;
      const ritualName = row.getAttribute('data-name');
      
      if (ritualSelect && ritualName) {
        for (let i = 0; i < ritualSelect.options.length; i++) {
          if (ritualSelect.options[i].value.includes(ritualName) || ritualName.includes(ritualSelect.options[i].value)) {
            ritualSelect.selectedIndex = i;
            break;
          }
        }

        if (bookingSection) {
          bookingSection.scrollIntoView({ behavior: 'smooth' });
          ritualSelect.focus();
          ritualSelect.style.borderColor = '#9BA4B0';
          setTimeout(() => {
            ritualSelect.style.borderColor = '';
          }, 2000);
        }
      }
    });
  });

  // 4. Interactive Loyalty Stamps Simulator
  const stampSlots = document.querySelectorAll('.stamp-slot:not(.free-slot)');
  const freeSlot = document.querySelector('.stamp-slot.free-slot');
  const counterText = document.getElementById('stampCounterText');

  function updateStampMessage() {
    const t = OMRA_TRANSLATIONS[currentOmraLang] || OMRA_TRANSLATIONS.en;
    const activeCount = document.querySelectorAll('.stamp-slot.active:not(.free-slot)').length;
    if (activeCount === 4) {
      if (freeSlot) freeSlot.classList.add('active');
      counterText.innerHTML = t.stamp_counter_win;
      counterText.style.color = '#E8ECEF';
    } else {
      if (freeSlot) freeSlot.classList.remove('active');
      const left = 4 - activeCount;
      if (currentOmraLang === 'ru') {
        counterText.innerHTML = `Собрано ${activeCount} из 4 отметок. Еще ${left} до скидки 20% на 5-й сеанс!`;
      } else if (currentOmraLang === 'ka') {
        counterText.innerHTML = `შეგროვებულია ${activeCount} შტამპი 4-დან. კიდევ ${left} მე-5 სეანსზე 20%-იან ფასდაკლებამდე!`;
      } else {
        counterText.innerHTML = `${activeCount} of 4 stamps collected. ${left} more until your 20% discount on the 5th session!`;
      }
      counterText.style.color = '';
    }
  }

  stampSlots.forEach(slot => {
    slot.addEventListener('click', () => {
      slot.classList.toggle('active');
      const icon = slot.querySelector('.stamp-icon');
      if (slot.classList.contains('active')) {
        icon.innerText = '✋';
      } else {
        icon.innerText = '◯';
      }
      updateStampMessage();
    });
  });

  // 5. Gift Card Amount Switcher & Direct Salon Location Link
  const amountBtns = document.querySelectorAll('.amount-btn');
  const gcDisplayAmount = document.getElementById('gcDisplayAmount');

  window.updateGiftCardBuyLink = function() {
    const btnBuy = document.getElementById('btnBuyGiftCard');
    if (!btnBuy) return;
    btnBuy.href = "https://maps.app.goo.gl/xjAE2yyKdikHBroi9";
    btnBuy.target = "_blank";
    btnBuy.rel = "noopener";
  };

  amountBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      amountBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const amount = btn.getAttribute('data-amount');
      if (gcDisplayAmount && amount) {
        gcDisplayAmount.innerText = amount;
        gcDisplayAmount.style.transform = 'scale(1.04)';
        setTimeout(() => {
          gcDisplayAmount.style.transform = 'scale(1)';
        }, 200);
      }

      window.updateGiftCardBuyLink();
    });
  });

  // Initial setup of gift card buy link
  window.updateGiftCardBuyLink();

  // 6. Dynamic Available Time Slots Loader (Live API sync with Bookings & Blocked Slots)
  window.loadAvailableTimeSlots = async function(selectedDate) {
    const timeSelect = document.getElementById('bookingTime');
    const dateInput = document.getElementById('bookingDate');
    if (!timeSelect) return;

    if (!selectedDate && dateInput) {
      selectedDate = dateInput.value;
    }

    if (!selectedDate) {
      const today = new Date();
      const y = today.getFullYear();
      const m = String(today.getMonth() + 1).padStart(2, '0');
      const d = String(today.getDate()).padStart(2, '0');
      selectedDate = `${y}-${m}-${d}`;
      if (dateInput && !dateInput.value) {
        dateInput.value = selectedDate;
      }
    }

    const t = OMRA_TRANSLATIONS[currentOmraLang] || OMRA_TRANSLATIONS.en;
    const loadingText = currentOmraLang === 'ru' 
      ? 'Проверка доступных слотов...' 
      : currentOmraLang === 'ka' 
      ? 'დროის შემოწმება...' 
      : 'Checking available slots...';

    const defaultSelectText = t.form_time_select || (currentOmraLang === 'ru' ? 'Выберите время...' : 'Select time slot...');
    const busyText = currentOmraLang === 'ru' 
      ? '(Занято)' 
      : currentOmraLang === 'ka' 
      ? '(დაკავებულია)' 
      : '(Booked)';
    const dayOffText = currentOmraLang === 'ru'
      ? '⛔ На эту дату запись закрыта (выходной/занято)'
      : currentOmraLang === 'ka'
      ? '⛔ ამ თარიღისთვის ჩაკეტილია'
      : '⛔ Sanctuary closed / no slots on this date';

    const prevSelectedTime = timeSelect.value;
    timeSelect.innerHTML = `<option value="" disabled selected>${loadingText}</option>`;

    try {
      const resp = await fetch(`/api/bookings/available-slots/?date=${encodeURIComponent(selectedDate)}`);
      const data = await resp.json();

      if (data.success && data.slots && data.slots.length > 0) {
        timeSelect.innerHTML = `<option value="" disabled selected>${defaultSelectText}</option>`;
        
        let hasAvailable = false;
        data.slots.forEach(slot => {
          const opt = document.createElement('option');
          opt.value = slot.time;
          if (slot.available) {
            opt.textContent = slot.time;
            if (slot.time === prevSelectedTime) {
              opt.selected = true;
            }
            hasAvailable = true;
          } else {
            opt.disabled = true;
            opt.classList.add('slot-busy');
            const reasonLabel = (slot.reason === 'past' && currentOmraLang === 'ru') ? '(Прошло)' : busyText;
            opt.textContent = `${slot.time} ${reasonLabel}`;
          }
          timeSelect.appendChild(opt);
        });

        if (!hasAvailable) {
          timeSelect.innerHTML = `<option value="" disabled selected>${dayOffText}</option>`;
        }
      } else {
        // Fallback default slots
        const defaultSlots = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
        timeSelect.innerHTML = `<option value="" disabled selected>${defaultSelectText}</option>`;
        defaultSlots.forEach(s => {
          const opt = document.createElement('option');
          opt.value = s;
          opt.textContent = s;
          timeSelect.appendChild(opt);
        });
      }
    } catch(e) {
      console.warn("Could not load dynamic slots:", e);
      const defaultSlots = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
      timeSelect.innerHTML = `<option value="" disabled selected>${defaultSelectText}</option>`;
      defaultSlots.forEach(s => {
        const opt = document.createElement('option');
        opt.value = s;
        opt.textContent = s;
        timeSelect.appendChild(opt);
      });
    }
  };

  // Initialize date picker min & dynamic slots listener
  const bookingDateInput = document.getElementById('bookingDate');
  if (bookingDateInput) {
    const todayStr = new Date().toISOString().split('T')[0];
    bookingDateInput.min = todayStr;
    if (!bookingDateInput.value) {
      bookingDateInput.value = todayStr;
    }
    bookingDateInput.addEventListener('change', (e) => {
      window.loadAvailableTimeSlots(e.target.value);
    });
    // Initial load
    window.loadAvailableTimeSlots(bookingDateInput.value);
  }



  // 7. Booking Form Submission with real Django API + WhatsApp trigger + 1-click connect buttons
  const bookingForm = document.getElementById('omraBookingForm');
  const feedback = document.getElementById('omraFeedback');

  if (bookingForm && feedback) {
    bookingForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const t = OMRA_TRANSLATIONS[currentOmraLang] || OMRA_TRANSLATIONS.en;
      const submitBtn = bookingForm.querySelector('button[type="submit"]');

      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>${t.form_transmitting}</span>`;

      const formData = new FormData(bookingForm);
      const payload = {
        name: formData.get('name') || '',
        phone: formData.get('phone') || '',
        ritual: formData.get('ritual') || '',
        date: formData.get('date') || '',
        time: formData.get('time') || '',
        notes: formData.get('notes') || ''
      };

      try {
        const response = await fetch('/api/bookings/create/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload)
        });

        const resData = await response.json();

        if (resData.success) {
          const directWa = resData.direct_whatsapp_url || 'https://wa.me/message/vopznnayguwab1';
          const directTg = resData.direct_telegram_url || 'https://t.me/tochka_batumi';
          const directIg = resData.direct_instagram_url || 'https://www.instagram.com/toch._ka/';

          const chatPromptText = currentOmraLang === 'ru' 
            ? 'Для быстрого подтверждения или вопроса мастеру:' 
            : currentOmraLang === 'ka' 
            ? 'სწრაფი დადასტურებისთვის ან კითხვისთვის:' 
            : 'For instant confirmation or questions:';

          feedback.innerHTML = `
            <div style="color: #A3E635; margin-bottom: 0.75rem; font-weight: 500;">
              ${t.form_success}
            </div>
            <div class="feedback-actions-box">
              <span class="feedback-actions-title">${chatPromptText}</span>
              <div class="feedback-action-btns">
                <a href="${directWa}" target="_blank" rel="noopener" class="btn-feedback-chat wa-chat">
                  💬 WhatsApp
                </a>
                <a href="${directTg}" target="_blank" rel="noopener" class="btn-feedback-chat tg-chat">
                  ✈️ Telegram
                </a>
                <a href="${directIg}" target="_blank" rel="noopener" class="btn-feedback-chat ig-chat">
                  📸 Instagram
                </a>
              </div>
            </div>
          `;
          bookingForm.reset();
          // Reload available slots so newly booked slot is immediately disabled
          if (bookingDateInput) {
            const todayStr = new Date().toISOString().split('T')[0];
            bookingDateInput.value = todayStr;
            window.loadAvailableTimeSlots(todayStr);
          }
        } else {
          feedback.innerHTML = `<span style="color: #F87171;">⚠️ ${resData.error || 'Ошибка при бронировании'}</span>`;
        }
      } catch (err) {
        feedback.innerHTML = `<span style="color: #A3E635;">${t.form_success}</span>`;
        bookingForm.reset();
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<span>${t.form_submit_btn}</span>`;
      }
    });
  }

  // 7. Header Shadow on Scroll
  const header = document.getElementById('omraHeader');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.12)';
      } else {
        header.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
      }
    });
  }
});
