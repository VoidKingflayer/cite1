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
    lang_select: "LANGUAGE:",
    hero_badge: "WELLNESS SANCTUARY",
    hero_title: 'Your space<br /><span class="italic-serif">to breathe.</span>',
    hero_desc: "TOCHKA is born at the meeting point of body and soul — where touch becomes a language of care, and space itself breathes tranquility. It is a place where the noise of the city can be left behind, and one can hear themselves again.",
    hero_btn_explore: "EXPLORE RITUALS",
    hero_btn_book: "BOOK APPOINTMENT",
    h_feat_1: "Continuous-Contact Technique",
    h_feat_2: "Natural Coconut Oil & Care",
    h_feat_3: "10% Off 1st Visit • 30% Off 5th",
    hero_tag_title: "WE PRESS PAUSE FOR YOU",
    concept_serial: "01",
    concept_heading: "CONCEPT & PHILOSOPHY",
    concept_quote: '"TOCHKA sounds confident and clear here, like a deep breath and a slow exhale. The strictness of the lines creates a sense of stability and support — the foundation on which recovery is built."',
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
    
    r1_name: "Classic Massage",
    r1_desc: "Deep and structured treatment tailored to relieve muscle tension and improve overall comfort. Steady pace with controlled pressure and trigger point release.",
    
    r2_name: "Relaxing Massage (Continuous Contact)",
    r2_desc: "Signature continuous-contact technique creating a seamless, flowing rhythm without breaks. Allows the nervous system to switch off, releasing fatigue and bringing deep inner calm.",
    
    r3_name: "Lymphatic Drainage Therapy",
    r3_desc: "Stimulates lymph circulation, reduces swelling, relieves heaviness in the legs, and brings overall body lightness and detoxification through soft flowing strokes.",
    
    r4_name: "Sports & Deep Tissue Massage",
    r4_desc: "Intensive mechanical therapy on muscles, fascia, and connective tissues. Normalizes muscle tone, eases stiffness, and accelerates post-workout recovery.",
    
    r5_name: "Back & Neck Recovery Therapy",
    r5_desc: "Targeted axial therapy. Releases neck and shoulder knots, relieves desk-posture stiffness, and alleviates tension headaches through focused trigger therapy.",
    
    r6_name: "Facial & Decollete Sculpting Lift",
    r6_desc: "Myofascial lifting and sculpting technique for face, neck, and decollete. Enhances contours, boosts microcirculation, and relieves facial muscle tension.",
    
    r7_name: "Signature TOCH_KA Sanctuary Ritual",
    r7_desc: "The ultimate sanctuary experience by therapist Anna Kolosova: seamless continuous contact, deep muscle release, organic coconut oil, custom playlist, and relaxing tea/coffee aftercare.",
    
    r8_name: "4 Hands Synchronized Symphony",
    r8_desc: "Two therapists perform synchronized movements in seamless harmony. The mirrored rhythm creates an effortless flow, overwhelming daily stress and inducing pure weightlessness.",
    
    loyalty_serial: "03",
    loyalty_heading: "THE RITUAL OF GRATITUDE",
    loyalty_subtitle: "30% Privilege on Your 5th Massage",
    loyalty_desc: "Receive more pleasure and care for yourself. Enjoy 30% off your 5th massage — our little ritual of gratitude. Collect 4 stamps and receive your privilege on the 5th session.",
    stamp_prompt: "CLICK TO TEST STAMP COLLECTION:",
    stamp_counter_3: "3 of 4 stamps collected. 1 more until your 30% discount on the 5th session!",
    stamp_counter_win: "🎉 <strong>Congratulations!</strong> All 4 stamps collected. Your 5th session is now 30% OFF at TOCHKA!",
    gift_serial: "04",
    gift_heading: "GIFT CARDS & CERTIFICATES",
    gift_subtext: "Give the gift of presence, tranquility, and restorative self-care.",
    gc_title: "Select Certificate Value",
    gc_note: "Delivered instantly in digital form or as an embossed tactile sand-finish physical card.",
    gc_sub_1: "Classic / Relaxing Massage (60m)",
    gc_sub_2: "Extended 90m Deep Recovery",
    gc_sub_3: "Signature TOCH_KA Ritual (90m)",
    gc_sub_4: "4 Hands Synchronized Symphony (60m)",
    gc_btn_buy: "PURCHASE GIFT CERTIFICATE",
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
    form_email_lbl: "E-MAIL ADDRESS *",
    form_ritual_lbl: "DESIRED RITUAL *",
    form_date_lbl: "PREFERRED DATE *",
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
    lang_select: "ЯЗЫК:",
    hero_badge: "SANCTUARY ПРОСТРАНСТВО",
    hero_title: 'Ваше пространство<br /><span class="italic-serif">для дыхания.</span>',
    hero_desc: "ТОЧКА рождается на стыке тела и души — там, где прикосновение становится языком заботы, а само пространство дышит спокойствием. Это место, где можно оставить за порогом шум города и снова услышать себя.",
    hero_btn_explore: "ВЫБРАТЬ РИТУАЛ",
    hero_btn_book: "ЗАПИСАТЬСЯ НА СЕАНС",
    h_feat_1: "Техника непрерывного контакта",
    h_feat_2: "Натуральное кокосовое масло",
    h_feat_3: "Скидка 10% на 1-й сеанс • 30% на 5-й",
    hero_tag_title: "МЫ СТАВИМ СУЕТУ НА ПАУЗУ",
    concept_serial: "01",
    concept_heading: "КОНЦЕПЦИЯ И ФИЛОСОФИЯ",
    concept_quote: '«ТОЧКА звучит уверенно и чисто, как глубокий вдох и медленный выдох. Строгость линий создает ощущение стабильности и опоры — фундамент, на котором строится восстановление».',
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
    
    r1_name: "Классический массаж",
    r1_desc: "Глубокая и последовательная работа с мышцами в среднем темпе с уверенной силой воздействия. Снятие напряжения, точечная проработка триггерных зон и восстановление легкого движения тела.",
    
    r2_name: "Расслабляющий массаж (Авторская техника)",
    r2_desc: "Фирменная авторская техника непрерывного контакта: руки практически не отрываются от тела, создавая медитативный поток. Позволяет нервной системе полностью расслабиться и восстановить внутреннее спокойствие.",
    
    r3_name: "Лимфодренажный детокс-массаж",
    r3_desc: "Стимуляция лимфотока, уменьшение отечности, снятие тяжести в ногах и ощущение легкости во всем теле. Мягкие дренажные приемы в сочетании с бережной мышечной проработкой.",
    
    r4_name: "Спортивный и глубокотканный массаж",
    r4_desc: "Интенсивное механическое воздействие на мышцы, фасции и соединительные ткани. Улучшает кровообращение, снимает спазмы и гипертонус, ускоряет восстановление после тренировок.",
    
    r5_name: "Восстановление спины и шеи",
    r5_desc: "Прицельная терапия осевого скелета. Снимает зажимы трапеций, синдром офисной шеи, улучшает кровообращение и избавляет от головных болей напряжения.",
    
    r6_name: "Скульптурирующий массаж лица и декольте",
    r6_desc: "Глубокая миофасциальная проработка мышц лица, шеи и зоны декольте. Моделирует четкий овал, снимает зажимы мимической мускулатуры и возвращает коже свежесть.",
    
    r7_name: "Авторский ритуал TOCH_KA",
    r7_desc: "Флагманский ритуал полного погружения от мастера Анны Колосовой: непрерывный контакт, глубокая проработка зажимов, органическое кокосовое масло, персональный плейлист и чаепитие.",
    
    r8_name: "Синхронный ритуал в 4 руки",
    r8_desc: "Синхронная работа двух мастеров в едином медитативном потоке. Зеркальные движения дарят ощущение невесомости и тотального ментального перезапуска.",
    
    loyalty_serial: "03",
    loyalty_heading: "РИТУАЛ БЛАГОДАРНОСТИ",
    loyalty_subtitle: "Скидка 30% на ваш 5-й массаж",
    loyalty_desc: "Дарите себе больше заботы и наслаждения. Скидка 30% на ваш 5-й массаж — наш знак признательности за ваше доверие. Соберите 4 отметки и получите скидку 30% на 5-й сеанс.",
    stamp_prompt: "НАЖМИТЕ, ЧТОБЫ ПРОТЕСТИРОВАТЬ ШТАМПЫ:",
    stamp_counter_3: "Собрано 3 из 4 отметок. Еще 1 до скидки 30% на 5-й сеанс!",
    stamp_counter_win: "🎉 <strong>Поздравляем!</strong> Все 4 отметки собраны. Скидка 30% на ваш 5-й сеанс в ТОЧКА активирована!",
    gift_serial: "04",
    gift_heading: "ПОДАРОЧНЫЕ СЕРТИФИКАТЫ",
    gift_subtext: "Подарите близким моменты тишины, заботы и глубокого расслабления.",
    gc_title: "Выберите номинал сертификата",
    gc_note: "Моментальная доставка в электронном виде или в виде премиальной физической карты с тиснением.",
    gc_sub_1: "Классический / Релакс-массаж (60 мин)",
    gc_sub_2: "Глубокая проработка тела (90 мин)",
    gc_sub_3: "Авторский ритуал TOCH_KA (90 мин)",
    gc_sub_4: "Синхронный массаж в 4 руки (60 мин)",
    gc_btn_buy: "ПРИОБРЕСТИ ПОДАРОЧНЫЙ СЕРТИФИКАТ",
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
    form_email_lbl: "E-MAIL АДРЕС *",
    form_ritual_lbl: "ЖЕЛАЕМЫЙ РИТУАЛ *",
    form_date_lbl: "ЖЕЛАЕМАЯ ДАТА *",
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
    lang_select: "ენა:",
    hero_badge: "SANCTUARY სივრცე",
    hero_title: 'თქვენი სივრცე<br /><span class="italic-serif">სუნთქვისთვის.</span>',
    hero_desc: "TOCHKA იბადება სხეულისა და სულის შეხვედრის ადგილას — სადაც შეხება ხდება მზრუნველობის ენა, ხოლო თავად სივრცე სუნთქავს სიმშვიდით. ეს არის ადგილი, სადაც შეგიძლიათ დაივიწყოთ ქალაქის ხმაური და კვლავ მოუსმინოთ საკუთარ თავს.",
    hero_btn_explore: "რიტუალების ნახვა",
    hero_btn_book: "სეანსზე ჩაწერა",
    h_feat_1: "უწყვეტი კონტაქტის ტექნიკა",
    h_feat_2: "ნატურალური ქოქოსის ზეთი",
    h_feat_3: "10% ფასდაკლება 1-ლ ვიზიტზე • 30% მე-5-ზე",
    hero_tag_title: "ჩვენ ვაჩერებთ დროს თქვენთვის",
    concept_serial: "01",
    concept_heading: "კონცეფცია და ფილოსოფია",
    concept_quote: '„TOCHKA ჟღერს თავდაჯერებულად და სუფთად, როგორც ღრმა ჩასუნთქვა და ნელი ამოსუნთქვა. ხაზების სიმკაცრე ქმნის სტაბილურობისა და საყრდენის შეგრძნებას — საძირკველს, რომელზეც შენდება აღდგენა.“',
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
    
    r1_name: "კლასიკური მასაჟი",
    r1_desc: "კუნთების ღრმა და თანმიმდევრული დამუშავება დაძაბულობის მოსახსნელად, ტრიგერული წერტილების განტვირთვა და სხეულის სიმსუბუქე.",
    
    r2_name: "რელაქს მასაჟი (უწყვეტი კონტაქტი)",
    r2_desc: "უწყვეტი კონტაქტის საავტორო ტექნიკა: ნელი, მდორე მოძრაობები ნერვული სისტემის სრული რელაქსაციისა და შინაგანი სიმშვიდისთვის.",
    
    r3_name: "ლიმფოდრენაჟული თერაპია",
    r3_desc: "ლიმფის დინების სტიმულირება, შეშუპების მოხსნა, ფეხებში სიმძიმის გაქრობა და სხეულის სრული დეტოქსიკაცია.",
    
    r4_name: "სპორტული და ღრმა მასაჟი",
    r4_desc: "ინტენსიური ზემოქმედება ღრმა კუნთებსა და ფასციებზე. აუმჯობესებს სისხლის მიმოქცევას და აჩქარებს აღდგენას ვარჯიშის შემდეგ.",
    
    r5_name: "ზურგისა და კისრის თერაპია",
    r5_desc: "ზურგისა და კისერ-საყელოს ზონის მიზნობრივი თერაპია. ხსნის დაჭიმულობას, ოფისის დაღლილობას და თავის ტკივილს.",
    
    r6_name: "სახისა და დეკოლტეს სკულპტურული ლიფტინგი",
    r6_desc: "სახის, კისრისა და დეკოლტეს მიოფასციალური სკულპტურული ლიფტინგ-მასაჟი. აუმჯობესებს ოვალს და კანის ტონუსს.",
    
    r7_name: "საავტორო რიტუალი TOCH_KA",
    r7_desc: "სრული ჩაძირვის საავტორო რიტუალი ანა კოლოსოვასგან: უწყვეტი კონტაქტი, ქოქოსის ზეთი, პერსონალური მუსიკა და ჩაი სეანსის შემდეგ.",
    
    r8_name: "4-ხელიანი სინქრონული სიმფონია",
    r8_desc: "ორი ოსტატის სინქრონული მუშაობა ერთიან ნაკადში სრული განტვირთვისა და უწონადობის შეგრძნებისთვის.",
    
    loyalty_serial: "03",
    loyalty_heading: "მადლიერების რიტუალი",
    loyalty_subtitle: "30%-იანი ფასდაკლება თქვენს მე-5 მასაჟზე",
    loyalty_desc: "აჩუქეთ საკუთარ თავს მეტი სიამოვნება. 30%-იანი ფასდაკლება მე-5 მასაჟზე — ჩვენი მადლიერების ნიშნად. შეაგროვეთ 4 შტამპი და მიიღეთ 30%-იანი პრივილეგია მე-5 სეანსზე.",
    stamp_prompt: "დააჭირეთ შტამპების გასატესტად:",
    stamp_counter_3: "შეგროვებულია 3 შტამპი 4-დან. კიდევ 1 მე-5 სეანსზე 30%-იან ფასდაკლებამდე!",
    stamp_counter_win: "🎉 <strong>გილოცავთ!</strong> 4-ვე შტამპი შეგროვებულია. თქვენი 30%-იანი ფასდაკლება მე-5 სეანსზე გააქტიურებულია!",
    gift_serial: "04",
    gift_heading: "სასაჩუქრე სერტიფიკატები",
    gift_subtext: "აჩუქეთ საყვარელ ადამიანებს სიმშვიდისა და ღრმა განტვირთვის წუთები.",
    gc_title: "აირჩიეთ სერტიფიკატის ნომინალი",
    gc_note: "მყისიერი მიწოდება ციფრული სახით ან ელიტარული რელიეფური ბარათით.",
    gc_sub_1: "კლასიკური / რელაქს მასაჟი (60 წთ)",
    gc_sub_2: "გაფართოებული ღრმა თერაპია (90 წთ)",
    gc_sub_3: "საავტორო რიტუალი TOCH_KA (90 წთ)",
    gc_sub_4: "სინქრონული მასაჟი 4 ხელში (60 წთ)",
    gc_btn_buy: "სერტიფიკატის შეძენა",
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
    form_email_lbl: "ელ-ფოსტა *",
    form_ritual_lbl: "სასურველი რიტუალი *",
    form_date_lbl: "სასურველი თარიღი *",
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
      [ { time: "60 min", cost: "$48" }, { time: "90 min", cost: "$63" } ],
      [ { time: "60 min", cost: "$52" }, { time: "90 min", cost: "$67" } ],
      [ { time: "45 min", cost: "$33" }, { time: "60 min", cost: "$45" } ],
      [ { time: "50 min", cost: "$40" } ],
      [ { time: "90 min", cost: "$70" }, { time: "120 min", cost: "$90" } ],
      [ { time: "60 min", cost: "$93" }, { time: "90 min", cost: "$125" } ]
    ],
    certificates: [ "$45", "$60", "$70", "$93" ],
    selectOptions: [
      { value: "", text: "Select a treatment or certificate...", disabled: true },
      { value: "Classic Massage", text: "Classic Massage (60 min — $45 / 90 min — $60)" },
      { value: "Relaxing Continuous-Contact Massage", text: "Relaxing Continuous-Contact (60 min — $45 / 90 min — $60)" },
      { value: "Lymphatic Drainage Therapy", text: "Lymphatic Drainage Therapy (60 min — $48 / 90 min — $63)" },
      { value: "Sports & Deep Tissue Massage", text: "Sports & Deep Tissue Massage (60 min — $52 / 90 min — $67)" },
      { value: "Back & Neck Recovery Therapy", text: "Back & Neck Recovery (45 min — $33 / 60 min — $45)" },
      { value: "Facial & Decollete Sculpting Lift", text: "Facial & Decollete Sculpting Lift (50 min — $40)" },
      { value: "Signature TOCH_KA Sanctuary Ritual", text: "Signature TOCH_KA Ritual (90 min — $70 / 120 min — $90)" },
      { value: "4 Hands Synchronized Symphony", text: "4 Hands Synchronized Symphony (60 min — $93 / 90 min — $125)" },
      { value: "Gift Certificate $45", text: "Gift Certificate — $45 (60 min Session)" },
      { value: "Gift Certificate $60", text: "Gift Certificate — $60 (90 min Session)" },
      { value: "Gift Certificate $70", text: "Gift Certificate — $70 (Signature Ritual)" },
      { value: "Gift Certificate $93", text: "Gift Certificate — $93 (4 Hands Session)" }
    ]
  },
  ka: {
    rituals: [
      [ { time: "60 წთ", cost: "120 ₾" }, { time: "90 წთ", cost: "160 ₾" } ],
      [ { time: "60 წთ", cost: "120 ₾" }, { time: "90 წთ", cost: "160 ₾" } ],
      [ { time: "60 წთ", cost: "130 ₾" }, { time: "90 წთ", cost: "170 ₾" } ],
      [ { time: "60 წთ", cost: "140 ₾" }, { time: "90 წთ", cost: "180 ₾" } ],
      [ { time: "45 წთ", cost: "90 ₾" }, { time: "60 წთ", cost: "120 ₾" } ],
      [ { time: "50 წთ", cost: "110 ₾" } ],
      [ { time: "90 წთ", cost: "190 ₾" }, { time: "120 წთ", cost: "240 ₾" } ],
      [ { time: "60 წთ", cost: "250 ₾" }, { time: "90 წთ", cost: "340 ₾" } ]
    ],
    certificates: [ "120 ₾", "160 ₾", "190 ₾", "250 ₾" ],
    selectOptions: [
      { value: "", text: "აირჩიეთ პროცედურა ან სერტიფიკატი...", disabled: true },
      { value: "Classic Massage", text: "კლასიკური მასაჟი (60 წთ — 120 ₾ / 90 წთ — 160 ₾)" },
      { value: "Relaxing Continuous-Contact Massage", text: "რელაქს მასაჟი უწყვეტი კონტაქტით (60 წთ — 120 ₾ / 90 წთ — 160 ₾)" },
      { value: "Lymphatic Drainage Therapy", text: "ლიმფოდრენაჟული თერაპია (60 წთ — 130 ₾ / 90 წთ — 170 ₾)" },
      { value: "Sports & Deep Tissue Massage", text: "სპორტული და ღრმა მასაჟი (60 წთ — 140 ₾ / 90 წთ — 180 ₾)" },
      { value: "Back & Neck Recovery Therapy", text: "ზურგისა და კისრის თერაპია (45 წთ — 90 ₾ / 60 წთ — 120 ₾)" },
      { value: "Facial & Decollete Sculpting Lift", text: "სახისა და დეკოლტეს სკულპტურული ლიფტინგი (50 წთ — 110 ₾)" },
      { value: "Signature TOCH_KA Sanctuary Ritual", text: "საავტორო რიტუალი TOCH_KA (90 წთ — 190 ₾ / 120 წთ — 240 ₾)" },
      { value: "4 Hands Synchronized Symphony", text: "4-ხელიანი სინქრონული სიმფონია (60 წთ — 250 ₾ / 90 წთ — 340 ₾)" },
      { value: "Gift Certificate 120 GEL", text: "სასაჩუქრე სერტიფიკატი — 120 ₾ (60 წთ სეანსი)" },
      { value: "Gift Certificate 160 GEL", text: "სასაჩუქრე სერტიფიკატი — 160 ₾ (90 წთ სეანსი)" },
      { value: "Gift Certificate 190 GEL", text: "სასაჩუქრე სერტიფიკატი — 190 ₾ (საავტორო რიტუალი)" },
      { value: "Gift Certificate 250 GEL", text: "სასაჩუქრე სერტიფიკატი — 250 ₾ (4 ხელში)" }
    ]
  },
  ru: {
    rituals: [
      [ { time: "60 мин", cost: "$45" }, { time: "90 мин", cost: "$60" } ],
      [ { time: "60 мин", cost: "$45" }, { time: "90 мин", cost: "$60" } ],
      [ { time: "60 мин", cost: "$48" }, { time: "90 мин", cost: "$63" } ],
      [ { time: "60 мин", cost: "$52" }, { time: "90 мин", cost: "$67" } ],
      [ { time: "45 мин", cost: "$33" }, { time: "60 мин", cost: "$45" } ],
      [ { time: "50 мин", cost: "$40" } ],
      [ { time: "90 мин", cost: "$70" }, { time: "120 мин", cost: "$90" } ],
      [ { time: "60 мин", cost: "$93" }, { time: "90 мин", cost: "$125" } ]
    ],
    certificates: [ "$45", "$60", "$70", "$93" ],
    selectOptions: [
      { value: "", text: "Выберите процедуру или сертификат...", disabled: true },
      { value: "Classic Massage", text: "Классический массаж (60 мин — $45 / 90 мин — $60)" },
      { value: "Relaxing Continuous-Contact Massage", text: "Расслабляющий массаж (60 мин — $45 / 90 мин — $60)" },
      { value: "Lymphatic Drainage Therapy", text: "Лимфодренажный детокс (60 мин — $48 / 90 мин — $63)" },
      { value: "Sports & Deep Tissue Massage", text: "Спортивный и глубокотканный (60 мин — $52 / 90 мин — $67)" },
      { value: "Back & Neck Recovery Therapy", text: "Восстановление спины и шеи (45 мин — $33 / 60 мин — $45)" },
      { value: "Facial & Decollete Sculpting Lift", text: "Скульптурирующий массаж лица (50 мин — $40)" },
      { value: "Signature TOCH_KA Sanctuary Ritual", text: "Авторский ритуал TOCH_KA (90 мин — $70 / 120 мин — $90)" },
      { value: "4 Hands Synchronized Symphony", text: "Синхронный массаж в 4 руки (60 мин — $93 / 90 мин — $125)" },
      { value: "Gift Certificate $45", text: "Подарочный сертификат — $45 (60 мин)" },
      { value: "Gift Certificate $60", text: "Подарочный сертификат — $60 (90 мин)" },
      { value: "Gift Certificate $70", text: "Подарочный сертификат — $70 (Авторский ритуал)" },
      { value: "Gift Certificate $93", text: "Подарочный сертификат — $93 (В 4 руки)" }
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

  const filterBtns = document.querySelectorAll('.menu-filter-pills .filter-pill');
  if (filterBtns[0]) filterBtns[0].textContent = t.f_all;
  if (filterBtns[1]) filterBtns[1].textContent = t.f_body;
  if (filterBtns[2]) filterBtns[2].textContent = t.f_focused;
  if (filterBtns[3]) filterBtns[3].textContent = t.f_signature;

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
    { name: t.r5_name, desc: t.r5_desc },
    { name: t.r6_name, desc: t.r6_desc },
    { name: t.r7_name, desc: t.r7_desc },
    { name: t.r8_name, desc: t.r8_desc },
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
    const btnBuy = giftSec.querySelector('.btn-espresso.full-width');
    if (btnBuy) btnBuy.textContent = t.gc_btn_buy;

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

    const labels = bookSec.querySelectorAll('label');
    if (labels[0]) labels[0].textContent = t.form_name_lbl;
    if (labels[1]) labels[1].textContent = t.form_phone_lbl;
    if (labels[2]) labels[2].textContent = t.form_email_lbl;
    if (labels[3]) labels[3].textContent = t.form_ritual_lbl;
    if (labels[4]) labels[4].textContent = t.form_date_lbl;
    if (labels[5]) labels[5].textContent = t.form_notes_lbl;

    const notesInp = document.getElementById('specialRequests');
    if (notesInp) notesInp.placeholder = t.form_notes_ph;

    const submitBtn = bookSec.querySelector('.btn-submit span');
    if (submitBtn) submitBtn.textContent = t.form_submit_btn;

    // Populate select options dynamically according to active language and currency rule
    const selectEl = document.getElementById('ritualSelect');
    if (selectEl && pData.selectOptions) {
      const selectedIndex = selectEl.selectedIndex >= 0 ? selectEl.selectedIndex : 0;
      selectEl.innerHTML = '';
      pData.selectOptions.forEach(opt => {
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
        counterText.innerHTML = `Собрано ${activeCount} из 4 отметок. Еще ${left} до скидки 30% на 5-й сеанс!`;
      } else if (currentOmraLang === 'ka') {
        counterText.innerHTML = `შეგროვებულია ${activeCount} შტამპი 4-დან. კიდევ ${left} მე-5 სეანსზე 30%-იან ფასდაკლებამდე!`;
      } else {
        counterText.innerHTML = `${activeCount} of 4 stamps collected. ${left} more until your 30% discount on the 5th session!`;
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

  // 5. Gift Card Amount Switcher
  const amountBtns = document.querySelectorAll('.amount-btn');
  const gcDisplayAmount = document.getElementById('gcDisplayAmount');

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

      // Pre-select gift certificate in booking form if matching
      if (ritualSelect && amount) {
        for (let i = 0; i < ritualSelect.options.length; i++) {
          if (ritualSelect.options[i].text.includes(amount) || ritualSelect.options[i].value.includes(amount)) {
            ritualSelect.selectedIndex = i;
            break;
          }
        }
      }
    });
  });

  // 6. Booking Form Submission
  const bookingForm = document.getElementById('omraBookingForm');
  const feedback = document.getElementById('omraFeedback');

  if (bookingForm && feedback) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const t = OMRA_TRANSLATIONS[currentOmraLang] || OMRA_TRANSLATIONS.en;
      const submitBtn = bookingForm.querySelector('button[type="submit"]');

      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>${t.form_transmitting}</span>`;

      setTimeout(() => {
        feedback.innerHTML = t.form_success;
        bookingForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<span>${t.form_submit_btn}</span>`;
      }, 1000);
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
