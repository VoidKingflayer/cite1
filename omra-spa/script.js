/**
 * TOCHKA — INTERACTIVE LOGIC & MULTILINGUAL (EN, RU, GE)
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
    h_feat_1: "Synchronized 4-Hands",
    h_feat_2: "Heated Volcanic Stones",
    h_feat_3: "Complimentary 6th Visit",
    hero_tag_title: "WE PRESS PAUSE FOR YOU",
    concept_serial: "01",
    concept_heading: "CONCEPT & PHILOSOPHY",
    concept_quote: '"TOCHKA sounds confident and clear here, like a deep breath and a slow exhale. The strictness of the lines creates a sense of stability and support — the foundation on which recovery is built."',
    concept_author: "— Brand Identity & Architecture Concept",
    c_card_1_title: "Balance of Straight & Soft",
    c_card_1_text: "The simplicity of the form resembles an architectural object: it has clarity, structure, and rhythm. The subtle curve in our philosophy adds softness, hinting at touch, flowing oils, and smooth synchronized movements.",
    c_card_2_title: "Healing Through Atmosphere",
    c_card_2_text: "Every element contributes to renewal: the ease of breath, the warmth of a therapist’s hands, tactile linen materials, and subtle transparency where aesthetics and comfort become vital parts of the healing process.",
    rituals_serial: "02",
    rituals_heading: "THERAPIES & RITUALS",
    rituals_subtext: "Signature massages, synchronized body therapies, and holistic care.",
    f_all: "All Rituals",
    f_massage: "Massages",
    f_special: "Specialties & 4-Hands",
    f_scrub: "Scrubs & Cupping",
    r_select_btn: "Select",
    r1_name: "Balinese Massage",
    r1_desc: "Traditional Indonesian ritual combining flowing movements, gentle stretches, and acupressure. Relieves fatigue, improves circulation, and brings deep relaxation.",
    r2_name: "Deep Tissue Massage",
    r2_desc: "Powerful focused pressure to release knots and chronic tension, reaching deep muscle layers. Ideal for athletes or those with stiffness, supporting recovery and flexibility.",
    r3_name: "Shiatsu Therapy",
    r3_desc: "Japanese tradition, applying rhythmic pressure along meridians and gentle stretches. Restores energy flow, reduces fatigue, and balances body and mind.",
    r4_name: "Lymphatic Drainage",
    r4_desc: "A gentle, rhythmic technique designed to stimulate the lymphatic system through precise, light pressure and flowing hand movements. Detoxifies, reduces bloating, and strengthens natural immunity.",
    r5_name: "Hot Stone Volcanic Ritual",
    r5_desc: "Heated volcanic stones are placed on key energy points and used in combination with slow gliding massage. The warmth penetrates deeply into muscles, easing stiffness and improving blood circulation.",
    r6_name: "4 Hands Synchronized Symphony",
    r6_desc: "Two therapists perform synchronized movements, blending techniques for total body relaxation. The mirrored movements create a rhythmic flow, overwhelming the senses and allowing for complete release of stress.",
    r7_name: "Foot Reflexology",
    r7_desc: "Targeted pressure applied to reflex points on the feet corresponding to internal organs. Releases blockages, promotes recovery, and leaves the body feeling restored.",
    r8_name: "Slim & Contour Sculpting",
    r8_desc: "Firm, shaping techniques combined with wooden tools and gentle cupping. Stimulates circulation, reduces water retention, and tones the silhouette.",
    r9_name: "Coffee Scrub & Full-Body Massage",
    r9_desc: "Revitalizing body ritual combining aromatic coffee exfoliation with a relaxing full-body massage. Gently polishes the skin, leaving it silky smooth.",
    loyalty_serial: "03",
    loyalty_heading: "THE RITUAL OF GRATITUDE",
    loyalty_subtitle: "Your 6th Massage Is Complimentary",
    loyalty_desc: "Receive more pleasure and care for yourself. Your 6th massage is complimentary — our little ritual of gratitude. Collect 5 stamps and enjoy your next session as our gift.",
    stamp_prompt: "CLICK TO TEST STAMP COLLECTION:",
    stamp_counter_3: "3 of 5 stamps collected. 2 more until your complimentary session!",
    stamp_counter_win: "🎉 <strong>Congratulations!</strong> All 5 stamps collected. Your 6th session is 100% complimentary from TOCHKA!",
    gift_serial: "04",
    gift_heading: "GIFT CARDS & CERTIFICATES",
    gift_subtext: "Give the gift of presence, tranquility, and restorative self-care.",
    gc_title: "Select Certificate Value",
    gc_note: "Delivered instantly in digital form or as an embossed tactile sand-finish physical card.",
    gc_btn_buy: "PURCHASE GIFT CERTIFICATE",
    reels_serial: "05",
    reels_heading: "ATMOSPHERE & INSTAGRAM REELS",
    reels_subtext: 'Moments of deep breath, flowing oils and restorative touch at <a href="https://www.instagram.com/toch._ka/" target="_blank" rel="noopener" style="color: inherit; text-decoration: underline;">@toch._ka</a>',
    reel1_title: "Ritual Harmony",
    reel1_desc: "Synchronized flow & deep peace",
    reel2_title: "Healing Touch",
    reel2_desc: "Restoring natural energy flow",
    reel3_title: "Aromatic Warmth",
    reel3_desc: "Pure botanical oils & herbs",
    reel4_title: "Sacred Pause",
    reel4_desc: "Your sanctuary in the city",
    banner_text: "ALL YOU KNEAD IS LOVE",
    palette_serial: "06",
    palette_heading: "COLOUR PALETTE & IDENTITY",
    palette_subtext: "Iron metallic black, brushed titanium steel, platinum sand, and raw forged charcoal.",
    booking_serial: "07",
    booking_heading: "RESERVE YOUR SANCTUARY",
    booking_lead: "Select your ritual and preferred time. Our concierge will confirm your private suite within 15 minutes.",
    form_name_lbl: "FULL NAME *",
    form_phone_lbl: "PHONE / WHATSAPP *",
    form_email_lbl: "E-MAIL ADDRESS *",
    form_ritual_lbl: "DESIRED RITUAL *",
    form_date_lbl: "PREFERRED DATE *",
    form_notes_lbl: "SPECIAL REQUESTS / MASSAGE FOCUS",
    form_notes_ph: "Lower back focus, essential oil preference, pressure level...",
    form_submit_btn: "CONFIRM RESERVATION",
    form_transmitting: "TRANSMITTING RESERVATION...",
    form_success: "✦ Reservation request received. Our TOCHKA concierge will contact you via WhatsApp / Phone within 15 minutes to confirm your private suite.",
    loc_heading: "SANCTUARY LOCATION",
    loc_city_batumi: "BATUMI SANCTUARY",
    loc_hours_batumi: "Daily: 10:00 — 22:00",
    btn_gmaps: "Open in Google Maps",
    f_title_nav: "NAVIGATION",
    f_title_rituals: "RITUALS",
    f_title_connect: "LOCATION & CONNECT",
    footer_motto: "Your space to breathe. Aesthetics & comfort as part of the healing process.",
    footer_copy: "© 2023–2025 TOCHKA. Design & Branding based on Aiya Kerimova's architectural identity."
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
    h_feat_1: "Синхронный массаж в 4 руки",
    h_feat_2: "Горячие вулканические камни",
    h_feat_3: "6-й сеанс в подарок",
    hero_tag_title: "МЫ СТАВИМ СУЕТУ НА ПАУЗУ",
    concept_serial: "01",
    concept_heading: "КОНЦЕПЦИЯ И ФИЛОСОФИЯ",
    concept_quote: '«ТОЧКА звучит уверенно и чисто, как глубокий вдох и медленный выдох. Строгость линий создает ощущение стабильности и опоры — фундамент, на котором строится восстановление».',
    concept_author: "— Архитектурная концепция и айдентика бренда",
    c_card_1_title: "Баланс строгих и мягких линий",
    c_card_1_text: "Лаконичность формы напоминает архитектурный объект: в ней есть четкость, структура и ритм. Мягкие изгибы символизируют тактильность, текучесть масел и плавность синхронных движений мастеров.",
    c_card_2_title: "Исцеление через атмосферу",
    c_card_2_text: "Каждый элемент работает на обновление: легкость дыхания, теплота рук терапевта, натуральный лен и приглушенный свет, где эстетика становится неотъемлемой частью восстановления.",
    rituals_serial: "02",
    rituals_heading: "ТЕРАПИИ И РИТУАЛЫ",
    rituals_subtext: "Авторские массажи, синхронные ритуалы и холистический уход.",
    f_all: "Все ритуалы",
    f_massage: "Массажи",
    f_special: "Специальные и в 4 руки",
    f_scrub: "Скрабы и банки",
    r_select_btn: "Выбрать",
    r1_name: "Балийский традиционный массаж",
    r1_desc: "Классический индонезийский ритуал, сочетающий мягкие растяжки, волнообразные движения и точечное воздействие. Снимает усталость и дарит глубокое расслабление.",
    r2_name: "Глубокий мышечный массаж (Deep Tissue)",
    r2_desc: "Интенсивная проработка глубоких мышечных слоев и фасций для снятия зажимов и хронического напряжения. Идеально для спортсменов и при сидячем образе жизни.",
    r3_name: "Японская терапия Шиацу",
    r3_desc: "Традиционная японская методика ритмичного надавливания на энергетические меридианы. Восстанавливает баланс сил и гармонизирует тело и разум.",
    r4_name: "Лимфодренажный детокс-массаж",
    r4_desc: "Мягкая ритмичная техника для стимуляции лимфотока. Выводит токсины, снимает отечность и укрепляет естественный иммунитет организма.",
    r5_name: "Вулканический ритуал Hot Stone",
    r5_desc: "Прогретые базальтовые камни в сочетании с плавным скольжением массажных масел. Глубокое тепло проникает в мышцы, снимая скованность.",
    r6_name: "Симфония в 4 руки (Синхронный ритуал)",
    r6_desc: "Два терапевта работают в зеркальной синхронности. Непрерывный поток движений погружает в состояние абсолютной невесомости и покоя.",
    r7_name: "Рефлексотерапия стоп",
    r7_desc: "Точечное воздействие на акупунктурные зоны стоп, отвечающие за внутренние органы. Запускает процессы самовосстановления всего тела.",
    r8_name: "Скульптурирующий массаж Slim & Contour",
    r8_desc: "Моделирующие техники с применением бамбуковых элементов и вакуумных баночек. Улучшает тургор кожи и формирует четкие контуры тела.",
    r9_name: "Кофейный скраб и массаж всего тела",
    r9_desc: "Ароматный пилинг из натурального свежемолотого кофе с последующим расслабляющим масляным массажем. Делает кожу шелковистой и сияющей.",
    loyalty_serial: "03",
    loyalty_heading: "РИТУАЛ БЛАГОДАРНОСТИ",
    loyalty_subtitle: "Ваш 6-й массаж — в подарок от нас",
    loyalty_desc: "Дарите себе больше заботы и наслаждения. Каждый 6-й визит комплиментарен — наш знак признательности за ваше доверие. Соберите 5 отметок и получите следующий сеанс в подарок.",
    stamp_prompt: "НАЖМИТЕ, ЧТОБЫ ПРОТЕСТИРОВАТЬ ШТАМПЫ:",
    stamp_counter_3: "Собрано 3 из 5 отметок. Еще 2 сеанса до бесплатного ритуала!",
    stamp_counter_win: "🎉 <strong>Поздравляем!</strong> Все 5 отметок собраны. Ваш 6-й сеанс — на 100% бесплатный подарок от ТОЧКА!",
    gift_serial: "04",
    gift_heading: "ПОДАРОЧНЫЕ СЕРТИФИКАТЫ",
    gift_subtext: "Подарите близким моменты тишины, заботы и глубокого расслабления.",
    gc_title: "Выберите номинал сертификата",
    gc_note: "Моментальная доставка в электронном виде или в виде премиальной физической карты с тиснением.",
    gc_btn_buy: "ПРИОБРЕСТИ ПОДАРОЧНЫЙ СЕРТИФИКАТ",
    reels_serial: "05",
    reels_heading: "АТМОСФЕРА И РИЛСЫ В INSTAGRAM",
    reels_subtext: 'Кадры спокойствия, ароматных масел и целебного прикосновения в <a href="https://www.instagram.com/toch._ka/" target="_blank" rel="noopener" style="color: inherit; text-decoration: underline;">@toch._ka</a>',
    reel1_title: "Гармония ритуала",
    reel1_desc: "Синхронный поток и тишина",
    reel2_title: "Целительное прикосновение",
    reel2_desc: "Восстановление баланса энергии",
    reel3_title: "Ароматное тепло",
    reel3_desc: "Органические масла и травы",
    reel4_title: "Священная пауза",
    reel4_desc: "Ваш островок покоя в ритме города",
    banner_text: "ALL YOU KNEAD IS LOVE",
    palette_serial: "06",
    palette_heading: "ЦВЕТОВАЯ ПАЛИТРА И АЙДЕНТИКА",
    palette_subtext: "Металлический черный, матовый титан, платиновый песок и кованый уголь.",
    booking_serial: "07",
    booking_heading: "ЗАБРОНИРОВАТЬ СЕАНС",
    booking_lead: "Выберите желаемый ритуал и удобное время. Наш консьерж свяжется с вами в течение 15 минут для подтверждения бронирования сьюта.",
    form_name_lbl: "ВАШЕ ПОЛНОЕ ИМЯ *",
    form_phone_lbl: "ТЕЛЕФОН / WHATSAPP *",
    form_email_lbl: "E-MAIL АДРЕС *",
    form_ritual_lbl: "ЖЕЛАЕМЫЙ РИТУАЛ *",
    form_date_lbl: "ЖЕЛАЕМАЯ ДАТА *",
    form_notes_lbl: "ПОЖЕЛАНИЯ / ЗОНЫ ОСОБОГО ВНИМАНИЯ",
    form_notes_ph: "Акцент на поясницу, предпочтения по маслам, желаемая сила нажима...",
    form_submit_btn: "ПОДТВЕРДИТЬ БРОНИРОВАНИЕ",
    form_transmitting: "ОТПРАВКА БРОНИРОВАНИЯ...",
    form_success: "✦ Запрос на бронирование получен. Консьерж ТОЧКА свяжется с вами по WhatsApp / телефону в течение 15 минут для подтверждения сьюта.",
    loc_heading: "ЛОКАЦИЯ САНКТУАРИЯ",
    loc_city_batumi: "БАТУМИ САНКТУАРИЙ",
    loc_hours_batumi: "Ежедневно: 10:00 — 22:00",
    btn_gmaps: "Открыть в Google Maps",
    f_title_nav: "НАВИГАЦИЯ",
    f_title_rituals: "РИТУАЛЫ",
    f_title_connect: "ЛОКАЦИЯ И СВЯЗЬ",
    footer_motto: "Ваше пространство для дыхания. Эстетика и комфорт как путь к исцелению.",
    footer_copy: "© 2023–2025 TOCHKA. Дизайн и концепция бренда основаны на архитектурной айдентике Айи Керимовой."
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
    h_feat_1: "სინქრონული 4-ხელიანი მასაჟი",
    h_feat_2: "გახურებული ვულკანური ქვები",
    h_feat_3: "მე-6 ვიზიტი საჩუქრად",
    hero_tag_title: "ჩვენ ვაჩერებთ დროს თქვენთვის",
    concept_serial: "01",
    concept_heading: "კონცეფცია და ფილოსოფია",
    concept_quote: '„TOCHKA ჟღერს თავდაჯერებულად და სუფთად, როგორც ღრმა ჩასუნთქვა და ნელი ამოსუნთქვა. ხაზების სიმკაცრე ქმნის სტაბილურობისა და საყრდენის შეგრძნებას — საძირკველს, რომელზეც შენდება აღდგენა.“',
    concept_author: "— ბრენდის არქიტექტურული იდენტობის კონცეფცია",
    c_card_1_title: "მკაცრი და რბილი ხაზების ბალანსი",
    c_card_1_text: "ფორმის ლაკონიურობა წააგავს არქიტექტურულ ობიექტს: მასში არის სიცხადე, სტრუქტურა და რიტმი. რბილი მოსახვევები მიუთითებს შეხებაზე, ზეთების დინებასა და ოსტატების სინქრონულ მოძრაობებზე.",
    c_card_2_title: "განკურნება ატმოსფეროს მეშვეობით",
    c_card_2_text: "თითოეული ელემენტი მუშაობს განახლებაზე: სუნთქვის სიმსუბუქე, თერაპევტის თბილი ხელები, ბუნებრივი თეთრეული და ესთეტიკა, რომელიც ხდება აღდგენის განუყოფელი ნაწილი.",
    rituals_serial: "02",
    rituals_heading: "თერაპიები და რიტუალები",
    rituals_subtext: "საავტორო მასაჟები, სინქრონული რიტუალები და ჰოლისტური მოვლა.",
    f_all: "ყველა რიტუალი",
    f_massage: "მასაჟები",
    f_special: "სპეციალური & 4-ხელიანი",
    f_scrub: "სკრაბები და ვაკუუმი",
    r_select_btn: "არჩევა",
    r1_name: "ბალინური ტრადიციული მასაჟი",
    r1_desc: "კლასიკური ინდონეზიური რიტუალი, რომელიც აერთიანებს რბილ გაჭიმვებს, ტალღოვან მოძრაობებსა და წერტილოვან ზემოქმედებას.",
    r2_name: "ღრმა ქსოვილოვანი მასაჟი (Deep Tissue)",
    r2_desc: "ღრმა კუნთოვანი ფენების ინტენსიური დამუშავება დაძაბულობის მოსახსნელად. იდეალურია სპორტსმენებისთვის.",
    r3_name: "იაპონური შიაცუ თერაპია",
    r3_desc: "რიტმული ზეწოლა ენერგეტიკულ მერიდიანებზე. აღადგენს ძალთა ბალანსს და აჰარმონიებს სხეულსა და გონებას.",
    r4_name: "ლიმფოდრენაჟული დეტოქს-მასაჟი",
    r4_desc: "რბილი რიტმული ტექნიკა ლიმფის მიმოქცევის სტიმულირებისთვის. გამოდევნის ტოქსინებს და აძლიერებს იმუნიტეტს.",
    r5_name: "ვულკანური ცხელი ქვების რიტუალი",
    r5_desc: "გახურებული ბაზალტის ქვები სამკურნალო ზეთებთან კომბინაციაში. ღრმა სითბო აღწევს კუნთებში.",
    r6_name: "სინქრონული სიმფონია 4 ხელში",
    r6_desc: "ორი თერაპევტი მუშაობს სრულ სინქრონში, რაც ქმნის აბსოლუტური სიმშვიდისა და უწონადობის შეგრძნებას.",
    r7_name: "ტერფების რეფლექსოლოგია",
    r7_desc: "წერტილოვანი ზემოქმედება ტერფის აკუპუნქტურულ ზონებზე. რთავს მთელი სხეულის თვითგანკურნების პროცესს.",
    r8_name: "სკულპტურინგი Slim & Contour",
    r8_desc: "სხეულის მოდელირების ტექნიკა ბამბუკის ელემენტებითა და ვაკუუმით. აუმჯობესებს კანის ტურგორს.",
    r9_name: "ყავის სკრაბი და სრული მასაჟი",
    r9_desc: "ნატურალური ყავის პილინგი და დამამშვიდებელი ზეთის მასაჟი. კანს ხდის აბრეშუმისებრს და მბზინავს.",
    loyalty_serial: "03",
    loyalty_heading: "მადლიერების რიტუალი",
    loyalty_subtitle: "თქვენი მე-6 მასაჟი საჩუქარია ჩვენგან",
    loyalty_desc: "აჩუქეთ საკუთარ თავს მეტი სიამოვნება. ყოველი მე-6 ვიზიტი უფასოა — ჩვენი მადლიერების ნიშნად. შეაგროვეთ 5 შტამპი და მიიღეთ შემდეგი სეანსი საჩუქრად.",
    stamp_prompt: "დააჭირეთ შტამპების გასატესტად:",
    stamp_counter_3: "შეგროვებულია 3 შტამპი 5-დან. კიდევ 2 სეანსი უფასო მასაჟამდე!",
    stamp_counter_win: "🎉 <strong>გილოცავთ!</strong> 5-ვე შტამპი შეგროვებულია. თქვენი მე-6 სეანსი 100%-ით უფასოა TOCHKA-სგან!",
    gift_serial: "04",
    gift_heading: "სასაჩუქრე სერტიფიკატები",
    gift_subtext: "აჩუქეთ საყვარელ ადამიანებს სიმშვიდისა და ღრმა განტვირთვის წუთები.",
    gc_title: "აირჩიეთ სერტიფიკატის ნომინალი",
    gc_note: "მყისიერი მიწოდება ციფრული სახით ან ელიტარული რელიეფური ბარათით.",
    gc_btn_buy: "სერტიფიკატის შეძენა",
    reels_serial: "05",
    reels_heading: "ატმოსფერო და INSTAGRAM ვიდეოები",
    reels_subtext: 'სიმშვიდის, არომატული ზეთებისა და სამკურნალო შეხების კადრები <a href="https://www.instagram.com/toch._ka/" target="_blank" rel="noopener" style="color: inherit; text-decoration: underline;">@toch._ka</a>-ზე',
    reel1_title: "რიტუალის ჰარმონია",
    reel1_desc: "სინქრონული დინება და სიჩუმე",
    reel2_title: "სამკურნალო შეხება",
    reel2_desc: "ენერგიის ბალანსის აღდგენა",
    reel3_title: "არომატული სითბო",
    reel3_desc: "ორგანული ზეთები და მცენარეები",
    reel4_title: "წმინდა პაუზა",
    reel4_desc: "თქვენი სიმშვიდის ოაზისი ქალაქში",
    banner_text: "ALL YOU KNEAD IS LOVE",
    palette_serial: "06",
    palette_heading: "ფერების პალიტრა და იდენტობა",
    palette_subtext: "მეტალის შავი, ტიტანის ფოლადი, პლატინის ქვიშა და ნახშირი.",
    booking_serial: "07",
    booking_heading: "სეანსის დაჯავშნა",
    booking_lead: "აირჩიეთ სასურველი რიტუალი და დრო. ჩვენი კონსიერჟი დაგიკავშირდებათ 15 წუთში.",
    form_name_lbl: "სრული სახელი *",
    form_phone_lbl: "ტელეფონი / WHATSAPP *",
    form_email_lbl: "ელ-ფოსტა *",
    form_ritual_lbl: "სასურველი რიტუალი *",
    form_date_lbl: "სასურველი თარიღი *",
    form_notes_lbl: "სპეციალური სურვილები / აქცენტები",
    form_notes_ph: "წელის ზონაზე აქცენტი, ზეთების პრეფერენცია, წნევის დონე...",
    form_submit_btn: "ჯავშნის დადასტურება",
    form_transmitting: "ჯავშანი იგზავნება...",
    form_success: "✦ ჯავშნის მოთხოვნა მიღებულია. TOCHKA-ს კონსიერჟი დაგიკავშირდებათ WhatsApp-ით ან ტელეფონით 15 წუთში.",
    loc_heading: "სანქტუარიის ლოკაცია",
    loc_city_batumi: "ბათუმის სანქტუარია",
    loc_hours_batumi: "ყოველდღე: 10:00 — 22:00",
    btn_gmaps: "Google Maps-ზე გახსნა",
    f_title_nav: "ნავიგაცია",
    f_title_rituals: "რიტუალები",
    f_title_connect: "ლოკაცია და კონტაქტი",
    footer_motto: "თქვენი სივრცე სუნთქვისთვის. ესთეტიკა და კომფორტი, როგორც განკურნების გზა.",
    footer_copy: "© 2023–2025 TOCHKA. ბრენდის დიზაინი ეფუძნება აია ქერიმოვას არქიტექტურულ იდენტობას."
  }
};

let currentOmraLang = localStorage.getItem('tochka_omra_lang') || 'en';

function applyOmraLanguage(lang) {
  if (!OMRA_TRANSLATIONS[lang]) lang = 'en';
  currentOmraLang = lang;
  localStorage.setItem('tochka_omra_lang', lang);
  document.documentElement.lang = lang;

  const t = OMRA_TRANSLATIONS[lang];

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

  const filterBtns = document.querySelectorAll('.menu-filter-pills .filter-pill');
  if (filterBtns[0]) filterBtns[0].textContent = t.f_all;
  if (filterBtns[1]) filterBtns[1].textContent = t.f_massage;
  if (filterBtns[2]) filterBtns[2].textContent = t.f_special;
  if (filterBtns[3]) filterBtns[3].textContent = t.f_scrub;

  const ritualData = [
    { name: t.r1_name, desc: t.r1_desc },
    { name: t.r2_name, desc: t.r2_desc },
    { name: t.r3_name, desc: t.r3_desc },
    { name: t.r4_name, desc: t.r4_desc },
    { name: t.r5_name, desc: t.r5_desc },
    { name: t.r6_name, desc: t.r6_desc },
    { name: t.r7_name, desc: t.r7_desc },
    { name: t.r8_name, desc: t.r8_desc },
    { name: t.r9_name, desc: t.r9_desc },
  ];

  const rows = document.querySelectorAll('.ritual-row');
  rows.forEach((row, i) => {
    if (ritualData[i]) {
      const nameEl = row.querySelector('.r-name');
      const descEl = row.querySelector('.r-desc');
      const btn = row.querySelector('.btn-select-ritual');
      if (nameEl) nameEl.textContent = ritualData[i].name;
      if (descEl) descEl.textContent = ritualData[i].desc;
      if (btn) btn.textContent = t.r_select_btn;
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
  }

  // 10. Footer
  const fMotto = document.querySelector('.f-motto');
  if (fMotto) fMotto.textContent = t.footer_motto;

  const fCopy = document.querySelector('.f-copyright');
  if (fCopy) fCopy.textContent = t.footer_copy;
}

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Language
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
  const selectBtns = document.querySelectorAll('.btn-select-ritual, .ritual-row');
  const ritualSelect = document.getElementById('ritualSelect');
  const bookingSection = document.getElementById('booking');

  selectBtns.forEach(el => {
    el.addEventListener('click', (e) => {
      const row = el.closest('.ritual-row') || el;
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
          ritualSelect.style.borderColor = '#4D535E';
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
    if (activeCount === 5) {
      if (freeSlot) freeSlot.classList.add('active');
      counterText.innerHTML = t.stamp_counter_win;
      counterText.style.color = '#E8ECEF';
    } else {
      if (freeSlot) freeSlot.classList.remove('active');
      const left = 5 - activeCount;
      if (currentOmraLang === 'ru') {
        counterText.innerHTML = `Собрано ${activeCount} из 5 отметок. Еще ${left} до бесплатного сеанса!`;
      } else if (currentOmraLang === 'ka') {
        counterText.innerHTML = `შეგროვებულია ${activeCount} შტამპი 5-დან. კიდევ ${left} უფასო სეანსამდე!`;
      } else {
        counterText.innerHTML = `${activeCount} of 5 stamps collected. ${left} more until your complimentary session!`;
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
        gcDisplayAmount.innerText = `${amount} USD`;
        gcDisplayAmount.style.transform = 'scale(1.06)';
        setTimeout(() => {
          gcDisplayAmount.style.transform = 'scale(1)';
        }, 200);
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
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>${t.form_transmitting}</span>`;

      setTimeout(() => {
        feedback.innerHTML = t.form_success;
        bookingForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<span>${t.form_submit_btn}</span>`;
      }, 1200);
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
