from django.db import models
from wagtail.models import Page
from wagtail.admin.panels import FieldPanel, MultiFieldPanel
from wagtail.snippets.models import register_snippet


@register_snippet
class Ritual(models.Model):
    CATEGORY_CHOICES = [
        ("body", "Body Therapy (Массаж тела)"),
        ("focused", "Face & Focused (Лицо и фокус-зоны)"),
        ("signature", "Signature & 4-Hands (Авторские и 4 руки)"),
    ]

    # English (Default)
    name = models.CharField("Название (EN)", max_length=150)
    category = models.CharField("Категория", max_length=20, choices=CATEGORY_CHOICES, default="body")
    tag = models.CharField("Тег / Бейдж (EN)", max_length=50, blank=True, help_text="Popular, Signature Technique...")
    description = models.TextField("Описание (EN)")

    # Russian (RU)
    name_ru = models.CharField("Название (RU)", max_length=150, blank=True)
    tag_ru = models.CharField("Тег / Бейдж (RU)", max_length=50, blank=True)
    description_ru = models.TextField("Описание (RU)", blank=True)

    # Georgian (GE/KA)
    name_ka = models.CharField("Название (GE)", max_length=150, blank=True)
    tag_ka = models.CharField("Тег / Бейдж (GE)", max_length=50, blank=True)
    description_ka = models.TextField("Описание (GE)", blank=True)

    tag_is_luxury = models.BooleanField("Премиальный золотистый тег", default=False)
    is_highlighted = models.BooleanField("Выделить строку в таблице", default=False)

    duration_1 = models.CharField("Длительность 1", max_length=50, default="60 min")
    price_1 = models.CharField("Стоимость 1 (USD / GEL)", max_length=50, default="$45")

    duration_2 = models.CharField("Длительность 2 (опционально)", max_length=50, blank=True, default="90 min")
    price_2 = models.CharField("Стоимость 2 (USD / GEL)", max_length=50, blank=True, default="$60")

    order = models.PositiveIntegerField("Порядок отображения", default=0)

    panels = [
        MultiFieldPanel(
            [
                FieldPanel("name"),
                FieldPanel("tag"),
                FieldPanel("description"),
            ],
            heading="🇬🇧 English Version",
        ),
        MultiFieldPanel(
            [
                FieldPanel("name_ru"),
                FieldPanel("tag_ru"),
                FieldPanel("description_ru"),
            ],
            heading="🇷🇺 Русская версия (RU)",
        ),
        MultiFieldPanel(
            [
                FieldPanel("name_ka"),
                FieldPanel("tag_ka"),
                FieldPanel("description_ka"),
            ],
            heading="🇬🇪 ქართული ვერსია (GE)",
        ),
        MultiFieldPanel(
            [
                FieldPanel("category"),
                FieldPanel("tag_is_luxury"),
                FieldPanel("is_highlighted"),
                FieldPanel("duration_1"),
                FieldPanel("price_1"),
                FieldPanel("duration_2"),
                FieldPanel("price_2"),
                FieldPanel("order"),
            ],
            heading="Параметры и стоимость",
        ),
    ]

    class Meta:
        verbose_name = "Ритуал / Процедура"
        verbose_name_plural = "Ритуалы и Цены"
        ordering = ["order", "id"]

    def __str__(self):
        return f"{self.name} ({self.price_1})"


class HomePage(Page):
    # 1. Header & Branding
    brand_logo_text = models.CharField("Логотип (текст)", max_length=50, default="tochka")
    announcement_ticker = models.TextField(
        "Бегущая строка (EN)",
        default="TOCHKA • YOUR SPACE TO BREATHE • WE PRESS PAUSE FOR YOU • 20% OFF YOUR 5TH MASSAGE • 46 LUKA ASATIANI ST, BATUMI",
    )
    announcement_ticker_ru = models.TextField(
        "Бегущая строка (RU)",
        blank=True,
        default="ТОЧКА • ВАШЕ ПРОСТРАНСТВО ДЛЯ ДЫХАНИЯ • СКИДКА 20% НА 5-Й СЕАНС • БАТУМИ, УЛ. ЛУКИ АСАТИАНИ, 46",
    )
    announcement_ticker_ka = models.TextField(
        "Бегущая строка (GE)",
        blank=True,
        default="წერტილი • თქვენი სივრცე სუნთქვისთვის • 20% ფასდაკლება მე-5 მასაჟზე • ბათუმი, ლუკა ასათიანის 46",
    )
    btn_book_header_text = models.CharField("Кнопка в шапке (EN)", max_length=50, default="BOOK A SESSION")
    btn_book_header_text_ru = models.CharField("Кнопка в шапке (RU)", max_length=50, blank=True, default="ЗАБРОНИРОВАТЬ")
    btn_book_header_text_ka = models.CharField("Кнопка в шапке (GE)", max_length=50, blank=True, default="დაჯავშნა")

    # 2. Hero Section
    hero_badge_tag = models.CharField("Hero: Бейдж (EN)", max_length=100, default="WELLNESS SANCTUARY")
    hero_badge_tag_ru = models.CharField("Hero: Бейдж (RU)", max_length=100, blank=True, default="WELLNESS SANCTUARY")
    hero_badge_tag_ka = models.CharField("Hero: Бейдж (GE)", max_length=100, blank=True, default="WELLNESS SANCTUARY")

    hero_main_title = models.CharField("Hero: Заголовок (EN)", max_length=200, default='A space<br /><span class="italic-serif">where you can slow down</span>')
    hero_main_title_ru = models.CharField("Hero: Заголовок (RU)", max_length=200, blank=True, default='Пространство,<br /><span class="italic-serif">где можно замедлиться</span>')
    hero_main_title_ka = models.CharField("Hero: Заголовок (GE)", max_length=200, blank=True, default='სივრცე,<br /><span class="italic-serif">სადაც შეგიძლიათ შენელდეთ</span>')

    hero_description = models.TextField(
        "Hero: Описание (EN)",
        default="TOCHKA is born at the meeting point of body and soul — a space to slow down, release tension, and restore your inner calm in gentle care.",
    )
    hero_description_ru = models.TextField(
        "Hero: Описание (RU)",
        blank=True,
        default="ТОЧКА рождается на стыке тела и души — пространство, где можно замедлиться, отпустить напряжение и восстановить внутреннее спокойствие в бережной заботе.",
    )
    hero_description_ka = models.TextField(
        "Hero: Описание (GE)",
        blank=True,
        default="TOCHKA იბადება სხეულისა და სულის შეხვედრის ადგილზე — სივრცე, სადაც შეგიძლიათ შეანელოთ ტემპი, მოიხსნათ დაძაბულობა და აღიდგინოთ შინაგანი სიმშვიდე.",
    )

    hero_btn_explore_text = models.CharField("Hero: Кнопка 1 (EN)", max_length=50, default="EXPLORE RITUALS")
    hero_btn_explore_text_ru = models.CharField("Hero: Кнопка 1 (RU)", max_length=50, blank=True, default="ВЫБРАТЬ РИТУАЛ")
    hero_btn_explore_text_ka = models.CharField("Hero: Кнопка 1 (GE)", max_length=50, blank=True, default="რიტუალების ნახვა")

    hero_btn_book_text = models.CharField("Hero: Кнопка 2 (EN)", max_length=50, default="BOOK APPOINTMENT")
    hero_btn_book_text_ru = models.CharField("Hero: Кнопка 2 (RU)", max_length=50, blank=True, default="ЗАПИСАТЬСЯ НА СЕАНС")
    hero_btn_book_text_ka = models.CharField("Hero: Кнопка 2 (GE)", max_length=50, blank=True, default="სეანსის დაჯავშნა")

    hero_feat_1_num = models.CharField("Hero: Преимущество 1 Номер", max_length=10, default="01")
    hero_feat_1_text = models.CharField("Hero: Преимущество 1 (EN)", max_length=100, default="Continuous-Contact Technique")
    hero_feat_1_text_ru = models.CharField("Hero: Преимущество 1 (RU)", max_length=100, blank=True, default="Техника непрерывного контакта")
    hero_feat_1_text_ka = models.CharField("Hero: Преимущество 1 (GE)", max_length=100, blank=True, default="უწყვეტი კონტაქტის ტექნიკა")

    hero_feat_2_num = models.CharField("Hero: Преимущество 2 Номер", max_length=10, default="02")
    hero_feat_2_text = models.CharField("Hero: Преимущество 2 (EN)", max_length=100, default="Natural Coconut Oil & Care")
    hero_feat_2_text_ru = models.CharField("Hero: Преимущество 2 (RU)", max_length=100, blank=True, default="Натуральное кокосовое масло")
    hero_feat_2_text_ka = models.CharField("Hero: Преимущество 2 (GE)", max_length=100, blank=True, default="ნატურალური ქოქოსის ზეთი")

    hero_feat_3_num = models.CharField("Hero: Преимущество 3 Номер", max_length=10, default="03")
    hero_feat_3_text = models.CharField("Hero: Преимущество 3 (EN)", max_length=100, default="10% Off 1st Visit • 20% Off 5th")
    hero_feat_3_text_ru = models.CharField("Hero: Преимущество 3 (RU)", max_length=100, blank=True, default="Скидка 10% на 1-й сеанс • 20% на 5-й")
    hero_feat_3_text_ka = models.CharField("Hero: Преимущество 3 (GE)", max_length=100, blank=True, default="10% ფასდაკლება 1-ლ სეანსზე • 20% მე-5-ზე")

    hero_image = models.ForeignKey(
        "wagtailimages.Image",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
        verbose_name="Hero: Главное изображение (справа)",
    )
    hero_card_tag_title = models.CharField("Hero: Метка на фото (EN)", max_length=100, default="TOCHKA RITUAL")
    hero_card_tag_title_ru = models.CharField("Hero: Метка на фото (RU)", max_length=100, blank=True, default="РИТУАЛ ТОЧКА")
    hero_card_tag_title_ka = models.CharField("Hero: Метка на фото (GE)", max_length=100, blank=True, default="წერტილის რიტუალი")
    hero_card_tag_loc = models.CharField("Hero: Метка на фото (локация)", max_length=100, default="BATUMI • 46 LUKA ASATIANI ST")

    # 3. Concept & Philosophy Section
    concept_serial = models.CharField("01 Номер секции", max_length=10, default="01")
    concept_heading = models.CharField("01 Заголовок (EN)", max_length=100, default="CONCEPT & PHILOSOPHY")
    concept_heading_ru = models.CharField("01 Заголовок (RU)", max_length=100, blank=True, default="КОНЦЕПЦИЯ И ФИЛОСОФИЯ")
    concept_heading_ka = models.CharField("01 Заголовок (GE)", max_length=100, blank=True, default="კონცეფცია და ფილოსოფია")

    concept_quote = models.TextField(
        "01 Цитата (EN)",
        default='“I wanted to create a place where you can feel tranquility from the very first moments: soft light, quiet, pleasant interior details, and a feeling of warmth. It is important to me that here you can not only relax your body, but also slow down, escape the everyday rush, and simply be in a comfortable, peaceful atmosphere.”',
    )
    concept_quote_ru = models.TextField(
        "01 Цитата (RU)",
        blank=True,
        default='«Мне хотелось создать место, в котором можно почувствовать спокойствие уже с первых минут: мягкий свет, тишина, приятные детали интерьера и ощущение уюта. Для меня важно, чтобы здесь вы могли не только расслабить тело, но и немного замедлиться, отвлечься от суеты и побыть в комфортной, спокойной обстановке».',
    )
    concept_quote_ka = models.TextField(
        "01 Цитата (GE)",
        blank=True,
        default='„მინდოდა შემექმნა ადგილი, სადაც პირველივე წუთებიდან იგრძნობთ სიმშვიდეს: რბილი სინათლე, სიჩუმე, ინტერიერის სასიამოვნო დეტალები და სიმყუდროვე. ჩემთვის მნიშვნელოვანია, რომ აქ შეძლოთ არა მხოლოდ სხეულის მოდუნება, არამედ ცოტათი შეჩერება, ყოველდღიური აურზაურისგან განტვირთვა და კომფორტულ, მშვიდ გარემოში ყოფნა“.',
    )

    concept_author = models.CharField("01 Автор цитаты (EN)", max_length=100, default="— Anna Kolosova • TOCHKA Founder & Therapist")
    concept_author_ru = models.CharField("01 Автор цитаты (RU)", max_length=100, blank=True, default="— Анна Колосова • Основатель и мастер студии ТОЧКА")
    concept_author_ka = models.CharField("01 Автор цитаты (GE)", max_length=100, blank=True, default="— ანა კოლოსოვა • დამფუძნებელი და თერაპევტი")

    concept_card_1_title = models.CharField("01 Карточка 1 Заголовок (EN)", max_length=100, default="Continuous-Contact Touch")
    concept_card_1_title_ru = models.CharField("01 Карточка 1 Заголовок (RU)", max_length=100, blank=True, default="Непрерывный контакт")
    concept_card_1_title_ka = models.CharField("01 Карточка 1 Заголовок (GE)", max_length=100, blank=True, default="უწყვეტი კონტაქტი")

    concept_card_1_text = models.TextField(
        "01 Карточка 1 Текст (EN)",
        default="Our signature continuous-contact technique: the therapist's hands barely leave the body, moving in a smooth meditative flow. This rhythm signals safety to the nervous system, releasing chronic tension without sudden changes in pace.",
    )
    concept_card_1_text_ru = models.TextField(
        "01 Карточка 1 Текст (RU)",
        blank=True,
        default="Авторская техника непрерывного контакта: руки мастера практически не отрываются от тела, переходя из одного движения в другое. Такой ритм дает нервной системе сигнал безопасности и глубоко снимает накопившийся стресс.",
    )
    concept_card_1_text_ka = models.TextField(
        "01 Карточка 1 Текст (GE)",
        blank=True,
        default="საავტორო უწყვეტი კონტაქტის ტექნიკა: თერაპევტის ხელები პრაქტიკულად არ შორდება სხეულს, მოძრაობს მდორე მედიტაციურ ნაკადში.",
    )

    concept_card_2_title = models.CharField("01 Карточка 2 Заголовок (EN)", max_length=100, default="Atmosphere of Gentle Care")
    concept_card_2_title_ru = models.CharField("01 Карточка 2 Заголовок (RU)", max_length=100, blank=True, default="Атмосфера искренней заботы")
    concept_card_2_title_ka = models.CharField("01 Карточка 2 Заголовок (GE)", max_length=100, blank=True, default="მზრუნველობის ატმოსფერო")

    concept_card_2_text = models.TextField(
        "01 Карточка 2 Текст (EN)",
        default="Natural coconut oil or delicate cream, fresh soft white towels, personalized guest playlist instead of generic sounds, and a relaxed cup of coffee or herbal tea after your session.",
    )
    concept_card_2_text_ru = models.TextField(
        "01 Карточка 2 Текст (RU)",
        blank=True,
        default="Натуральное кокосовое масло или нежный питательный крем, белоснежные полотенца, персональный плейлист гостя вместо шаблонных звуков и чашка чая или кофе после сеанса.",
    )
    concept_card_2_text_ka = models.TextField(
        "01 Карточка 2 Текст (GE)",
        blank=True,
        default="ნატურალური ქოქოსის ზეთი, რბილი პირსახოცები, პერსონალური მუსიკა და ყავა ან ჩაი სეანსის შემდეგ.",
    )

    # 4. Therapies & Rituals Section
    rituals_serial = models.CharField("02 Номер секции", max_length=10, default="02")
    rituals_heading = models.CharField("02 Заголовок (EN)", max_length=100, default="THERAPIES & RITUALS")
    rituals_heading_ru = models.CharField("02 Заголовок (RU)", max_length=100, blank=True, default="ТЕРАПИИ И РИТУАЛЫ")
    rituals_heading_ka = models.CharField("02 Заголовок (GE)", max_length=100, blank=True, default="თერაპიები და რიტუალები")

    rituals_subtext = models.TextField("02 Подзаголовок (EN)", default="Authentic treatments, precise myofascial techniques, and deep restorative care in Batumi.")
    rituals_subtext_ru = models.TextField("02 Подзаголовок (RU)", blank=True, default="Проверенные методики, прицельная проработка триггерных зон и холистический уход в Батуми.")
    rituals_subtext_ka = models.TextField("02 Подзаголовок (GE)", blank=True, default="ავთენტური პროცედურები, ზუსტი მიოფასციალური ტექნიკა და ღრმა აღდგენითი ზრუნვა ბათუმში.")

    promo_badge = models.CharField("02 Промо: Бейдж (EN)", max_length=50, default="FIRST VISIT WELCOME")
    promo_badge_ru = models.CharField("02 Промо: Бейдж (RU)", max_length=50, blank=True, default="ПЕРВЫЙ ВИЗИТ")
    promo_badge_ka = models.CharField("02 Промо: Бейдж (GE)", max_length=50, blank=True, default="პირველი ვიზიტი")

    promo_title = models.CharField("02 Промо: Заголовок (EN)", max_length=150, default="10% Privilege on Your First Session")
    promo_title_ru = models.CharField("02 Промо: Заголовок (RU)", max_length=150, blank=True, default="Привилегия 10% на первый визит")
    promo_title_ka = models.CharField("02 Промо: Заголовок (GE)", max_length=150, blank=True, default="10% ფასდაკლება პირველ ვიზიტზე")

    promo_subtitle = models.TextField(
        "02 Промо: Описание (EN)",
        default="Experience our signature continuous-contact massage with master. Includes organic coconut oil and complimentary post-session tea or coffee.",
    )
    promo_subtitle_ru = models.TextField(
        "02 Промо: Описание (RU)",
        blank=True,
        default="Познакомьтесь с авторской техникой непрерывного контакта и ощутите глубокое расслабление. Натуральные масла и чай/кофе включены.",
    )
    promo_subtitle_ka = models.TextField(
        "02 Промо: Описание (GE)",
        blank=True,
        default="გაეცანით ჩვენს საავტორო უწყვეტი კონტაქტის მასაჟს. მოიცავს ორგანულ ქოქოსის ზეთს და ჩაის/ყავას სეანსის შემდეგ.",
    )

    promo_btn_text = models.CharField("02 Промо: Кнопка (EN)", max_length=50, default="CLAIM 10% DISCOUNT")
    promo_btn_text_ru = models.CharField("02 Промо: Кнопка (RU)", max_length=50, blank=True, default="ПОЛУЧИТЬ СКИДКУ 10%")
    promo_btn_text_ka = models.CharField("02 Промо: Кнопка (GE)", max_length=50, blank=True, default="10%-იანი ფასდაკლების მიღება")

    # 5. Loyalty Card Section
    loyalty_serial = models.CharField("03 Номер секции", max_length=10, default="03")
    loyalty_heading = models.CharField("03 Заголовок (EN)", max_length=100, default="THE RITUAL OF GRATITUDE")
    loyalty_heading_ru = models.CharField("03 Заголовок (RU)", max_length=100, blank=True, default="РИТУАЛ БЛАГОДАРНОСТИ")
    loyalty_heading_ka = models.CharField("03 Заголовок (GE)", max_length=100, blank=True, default="მადლიერების რიტუალი")

    loyalty_subtitle = models.CharField("03 Подзаголовок (EN)", max_length=150, default="20% Privilege on Your 5th Massage")
    loyalty_subtitle_ru = models.CharField("03 Подзаголовок (RU)", max_length=150, blank=True, default="Привилегия 20% на каждый 5-й массаж")
    loyalty_subtitle_ka = models.CharField("03 Подзаголовок (GE)", max_length=150, blank=True, default="20% ფასდაკლება ყოველ მე-5 მასაჟზე")

    loyalty_desc = models.TextField(
        "03 Описание (EN)",
        default="Receive more pleasure and care for yourself. Enjoy 20% off your 5th massage — our little ritual of gratitude. Collect 4 stamps and receive your privilege on the 5th session.",
    )
    loyalty_desc_ru = models.TextField(
        "03 Описание (RU)",
        blank=True,
        default="Больше удовольствия и заботы о себе. Скидка 20% на каждый 5-й массаж — наш маленький ритуал благодарности за ваше доверие. Соберите 4 отметки и получите скидку 20% на 5-й сеанс.",
    )
    loyalty_desc_ka = models.TextField(
        "03 Описание (GE)",
        blank=True,
        default="მეტი სიამოვნება და ზრუნვა საკუთარ თავზე. 20%-იანი ფასდაკლება მე-5 მასაჟზე — ჩვენი მადლიერების რიტუალი.",
    )

    loyalty_image = models.ForeignKey(
        "wagtailimages.Image",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
        verbose_name="03 Изображение карты лояльности",
    )

    # 6. Gift Cards & Certificates
    giftcards_serial = models.CharField("04 Номер секции", max_length=10, default="04")
    giftcards_heading = models.CharField("04 Заголовок (EN)", max_length=100, default="GIFT CARDS & CERTIFICATES")
    giftcards_heading_ru = models.CharField("04 Заголовок (RU)", max_length=100, blank=True, default="ПОДАРОЧНЫЕ СЕРТИФИКАТЫ")
    giftcards_heading_ka = models.CharField("04 Заголовок (GE)", max_length=100, blank=True, default="სასაჩუქრე სერტიფიკატები")

    giftcards_subtext = models.TextField("04 Подзаголовок (EN)", default="Give the gift of presence, tranquility, and restorative self-care.")
    giftcards_subtext_ru = models.TextField("04 Подзаголовок (RU)", blank=True, default="Подарите близким моменты спокойствия, тишины и бережного восстановления.")
    giftcards_subtext_ka = models.TextField("04 Подзаголовок (GE)", blank=True, default="აჩუქეთ სიმშვიდის, დასვენებისა და ზრუნვის დაუვიწყარი წუთები.")

    giftcards_btn_text = models.CharField("04 Кнопка (EN)", max_length=100, default="ORDER CERTIFICATE (OR IN PERSON)")
    giftcards_btn_text_ru = models.CharField("04 Кнопка (RU)", max_length=100, blank=True, default="ОФОРМИТЬ СЕРТИФИКАТ (МОЖНО ЛИЧНО)")
    giftcards_btn_text_ka = models.CharField("04 Кнопка (GE)", max_length=100, blank=True, default="სერტიფიკატის შეძენა (ან პირადად)")

    # 7. Atmosphere & Reels Section
    reels_serial = models.CharField("05 Номер секции", max_length=10, default="05")
    reels_heading = models.CharField("05 Заголовок (EN)", max_length=100, default="ATMOSPHERE & INSTAGRAM REELS")
    reels_heading_ru = models.CharField("05 Заголовок (RU)", max_length=100, blank=True, default="АТМОСФЕРА И REELS")
    reels_heading_ka = models.CharField("05 Заголовок (GE)", max_length=100, blank=True, default="ატმოსფერო და ვიდეოები")

    reels_subtext = models.CharField("05 Подзаголовок (EN)", max_length=200, default="Moments of deep breath, flowing oils and restorative touch at @toch._ka")
    reels_subtext_ru = models.CharField("05 Подзаголовок (RU)", max_length=200, blank=True, default="Моменты глубокого дыхания, теплых масел и тактильной заботы в @toch._ka")
    reels_subtext_ka = models.CharField("05 Подзаголовок (GE)", max_length=200, blank=True, default="ღრმა სუნთქვის, თბილი ზეთებისა და მზრუნველი შეხების წუთები @toch._ka")

    reel_1_video = models.CharField("Reel 1: Видео путь", max_length=255, default="/static/home/images/3903588512237354348.mp4")
    reel_1_poster = models.ForeignKey("wagtailimages.Image", null=True, blank=True, on_delete=models.SET_NULL, related_name="+", verbose_name="Reel 1: Постер")
    reel_2_video = models.CharField("Reel 2: Видео путь", max_length=255, default="/static/home/images/3937630035152798052.mp4")
    reel_2_poster = models.ForeignKey("wagtailimages.Image", null=True, blank=True, on_delete=models.SET_NULL, related_name="+", verbose_name="Reel 2: Постер")
    reel_3_video = models.CharField("Reel 3: Видео путь", max_length=255, default="/static/home/images/tochka_reel_3.mp4")
    reel_3_poster = models.ForeignKey("wagtailimages.Image", null=True, blank=True, on_delete=models.SET_NULL, related_name="+", verbose_name="Reel 3: Постер")
    reel_4_video = models.CharField("Reel 4: Видео путь", max_length=255, default="/static/home/images/3959919174497769469.mp4")
    reel_4_poster = models.ForeignKey("wagtailimages.Image", null=True, blank=True, on_delete=models.SET_NULL, related_name="+", verbose_name="Reel 4: Постер")

    # 8. Manifesto Banner
    manifesto_huge_text = models.CharField("Манифест: Большой текст (EN)", max_length=100, default="ALL YOU KNEAD IS CARE")
    manifesto_huge_text_ru = models.CharField("Манифест: Большой текст (RU)", max_length=100, blank=True, default="ALL YOU KNEAD IS CARE")
    manifesto_huge_text_ka = models.CharField("Манифест: Большой текст (GE)", max_length=100, blank=True, default="ALL YOU KNEAD IS CARE")
    manifesto_small_text = models.CharField("Манифест: Нижняя подпись", max_length=100, default="TOCHKA • 46 LUKA ASATIANI ST, BATUMI")
    manifesto_image = models.ForeignKey(
        "wagtailimages.Image",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
        verbose_name="Манифест: Фоновое изображение",
    )

    # 9. Palette Section
    palette_serial = models.CharField("Секция Палитры: Номер", max_length=10, default="06")
    palette_heading = models.CharField("Палитра: Заголовок (EN)", max_length=100, default="COLOUR PALETTE & IDENTITY")
    palette_heading_ru = models.CharField("Палитра: Заголовок (RU)", max_length=100, blank=True, default="ЦВЕТОВАЯ ПАЛИТРА И АЙДЕНТИКА")
    palette_heading_ka = models.CharField("Палитра: Заголовок (GE)", max_length=100, blank=True, default="ფერების პალიტრა და იდენტობა")

    palette_subtext = models.TextField("Палитра: Описание", default="Iron metallic black, brushed titanium steel, platinum sand, and raw forged charcoal.")

    # 10. Booking & Concierge Section
    booking_serial = models.CharField("Бронирование: Номер", max_length=10, default="07")
    booking_heading = models.CharField("Бронирование: Заголовок (EN)", max_length=100, default="RESERVE YOUR SANCTUARY")
    booking_heading_ru = models.CharField("Бронирование: Заголовок (RU)", max_length=100, blank=True, default="ЗАБРОНИРОВАТЬ СЕАНС")
    booking_heading_ka = models.CharField("Бронирование: Заголовок (GE)", max_length=100, blank=True, default="სეანსის დაჯავშნა")

    booking_lead = models.TextField(
        "Бронирование: Описание (EN)",
        default="Select your ritual and preferred time. Master Anna Kolosova will confirm your appointment within 15 minutes.",
    )
    booking_lead_ru = models.TextField(
        "Бронирование: Описание (RU)",
        blank=True,
        default="Выберите желаемый ритуал и удобное время. Мастер Анна Колосова подтвердит вашу бронь в течение 15 минут.",
    )
    booking_lead_ka = models.TextField(
        "Бронирование: Описание (GE)",
        blank=True,
        default="აირჩიეთ სასურველი რიტუალი და დრო. მასტერი ანა კოლოსოვა დაადასტურებს თქვენს ჯავშანს 15 წუთში.",
    )

    booking_btn_text = models.CharField("Бронирование: Кнопка (EN)", max_length=50, default="CONFIRM RESERVATION")
    booking_btn_text_ru = models.CharField("Бронирование: Кнопка (RU)", max_length=50, blank=True, default="ПОДТВЕРДИТЬ ЗАПИСЬ")
    booking_btn_text_ka = models.CharField("Бронирование: Кнопка (GE)", max_length=50, blank=True, default="ჯავშნის დადასტურება")

    # 11. Location & Contacts Card
    loc_heading = models.CharField("Контакты: Заголовок", max_length=100, default="SANCTUARY LOCATION")
    loc_city = models.CharField("Контакты: Город / Метка", max_length=100, default="BATUMI SANCTUARY")
    loc_address = models.CharField("Контакты: Адрес", max_length=150, default="46 Luka Asatiani St, Batumi 6000, Georgia")
    loc_hours = models.CharField("Контакты: Часы работы", max_length=100, default="Daily: 09:00 — 23:00")
    loc_gmaps_url = models.URLField("Google Maps Ссылка", default="https://maps.app.goo.gl/xjAE2yyKdikHBroi9")
    loc_phone = models.CharField("Телефон", max_length=50, default="+995 591 22 61 45")
    loc_whatsapp_url = models.URLField("WhatsApp Ссылка", default="https://wa.me/message/vopznnayguwab1")
    loc_telegram_url = models.URLField("Telegram Ссылка", default="https://t.me/tochka_batumi")
    loc_instagram_url = models.URLField("Instagram Ссылка", default="https://www.instagram.com/toch._ka/")
    loc_email = models.EmailField("E-mail", blank=True, default="")

    # WhatsApp Notifications Settings (CallMeBot)
    whatsapp_notify_phone = models.CharField(
        "WhatsApp для уведомлений о записях",
        max_length=30,
        blank=True,
        default="",
        help_text="Номер телефона мастера/администратора с кодом страны (например +995591226145), куда CallMeBot будет отправлять уведомления",
    )
    whatsapp_notify_apikey = models.CharField(
        "CallMeBot WhatsApp API Key",
        max_length=50,
        blank=True,
        default="",
        help_text="Бесплатный API-ключ от CallMeBot (получите, отправив 'I allow callmebot to send me messages' на номер +34 911 06 73 98 в WhatsApp)",
    )

    # 12. Footer
    footer_motto = models.TextField("Подвал: Слоган (EN)", default="Your space to breathe. Aesthetics & comfort as part of the healing process.")
    footer_motto_ru = models.TextField("Подвал: Слоган (RU)", blank=True, default="Ваше пространство для дыхания. Эстетика и забота как часть процесса восстановления.")
    footer_motto_ka = models.TextField("Подвал: Слоган (GE)", blank=True, default="თქვენი სივრცე სუნთქვისთვის. ესთეტიკა და კომფორტი, როგორც განკურნების ნაწილი.")
    footer_copyright = models.CharField("Подвал: Копирайт", max_length=150, default="© 2023–2026 TOCHKA. Anna Kolosova Massage Sanctuary, Batumi.")

    content_panels = Page.content_panels + [
        MultiFieldPanel(
            [
                FieldPanel("brand_logo_text"),
                FieldPanel("announcement_ticker"),
                FieldPanel("announcement_ticker_ru"),
                FieldPanel("announcement_ticker_ka"),
                FieldPanel("btn_book_header_text"),
                FieldPanel("btn_book_header_text_ru"),
                FieldPanel("btn_book_header_text_ka"),
            ],
            heading="Шапка сайта (Header & Announcement)",
        ),
        MultiFieldPanel(
            [
                FieldPanel("hero_badge_tag"),
                FieldPanel("hero_badge_tag_ru"),
                FieldPanel("hero_badge_tag_ka"),
                FieldPanel("hero_main_title"),
                FieldPanel("hero_main_title_ru"),
                FieldPanel("hero_main_title_ka"),
                FieldPanel("hero_description"),
                FieldPanel("hero_description_ru"),
                FieldPanel("hero_description_ka"),
                FieldPanel("hero_btn_explore_text"),
                FieldPanel("hero_btn_explore_text_ru"),
                FieldPanel("hero_btn_explore_text_ka"),
                FieldPanel("hero_btn_book_text"),
                FieldPanel("hero_btn_book_text_ru"),
                FieldPanel("hero_btn_book_text_ka"),
                FieldPanel("hero_feat_1_num"),
                FieldPanel("hero_feat_1_text"),
                FieldPanel("hero_feat_1_text_ru"),
                FieldPanel("hero_feat_1_text_ka"),
                FieldPanel("hero_feat_2_num"),
                FieldPanel("hero_feat_2_text"),
                FieldPanel("hero_feat_2_text_ru"),
                FieldPanel("hero_feat_2_text_ka"),
                FieldPanel("hero_feat_3_num"),
                FieldPanel("hero_feat_3_text"),
                FieldPanel("hero_feat_3_text_ru"),
                FieldPanel("hero_feat_3_text_ka"),
                FieldPanel("hero_image"),
                FieldPanel("hero_card_tag_title"),
                FieldPanel("hero_card_tag_title_ru"),
                FieldPanel("hero_card_tag_title_ka"),
                FieldPanel("hero_card_tag_loc"),
            ],
            heading="Первый экран (Hero Section — EN / RU / GE)",
        ),
        MultiFieldPanel(
            [
                FieldPanel("concept_serial"),
                FieldPanel("concept_heading"),
                FieldPanel("concept_heading_ru"),
                FieldPanel("concept_heading_ka"),
                FieldPanel("concept_quote"),
                FieldPanel("concept_quote_ru"),
                FieldPanel("concept_quote_ka"),
                FieldPanel("concept_author"),
                FieldPanel("concept_author_ru"),
                FieldPanel("concept_author_ka"),
                FieldPanel("concept_card_1_title"),
                FieldPanel("concept_card_1_title_ru"),
                FieldPanel("concept_card_1_title_ka"),
                FieldPanel("concept_card_1_text"),
                FieldPanel("concept_card_1_text_ru"),
                FieldPanel("concept_card_1_text_ka"),
                FieldPanel("concept_card_2_title"),
                FieldPanel("concept_card_2_title_ru"),
                FieldPanel("concept_card_2_title_ka"),
                FieldPanel("concept_card_2_text"),
                FieldPanel("concept_card_2_text_ru"),
                FieldPanel("concept_card_2_text_ka"),
            ],
            heading="01. Концепция и Философия (Concept — EN / RU / GE)",
        ),
        MultiFieldPanel(
            [
                FieldPanel("rituals_serial"),
                FieldPanel("rituals_heading"),
                FieldPanel("rituals_heading_ru"),
                FieldPanel("rituals_heading_ka"),
                FieldPanel("rituals_subtext"),
                FieldPanel("rituals_subtext_ru"),
                FieldPanel("rituals_subtext_ka"),
                FieldPanel("promo_badge"),
                FieldPanel("promo_badge_ru"),
                FieldPanel("promo_badge_ka"),
                FieldPanel("promo_title"),
                FieldPanel("promo_title_ru"),
                FieldPanel("promo_title_ka"),
                FieldPanel("promo_subtitle"),
                FieldPanel("promo_subtitle_ru"),
                FieldPanel("promo_subtitle_ka"),
                FieldPanel("promo_btn_text"),
                FieldPanel("promo_btn_text_ru"),
                FieldPanel("promo_btn_text_ka"),
            ],
            heading="02. Ритуалы и Промо-баннер (Therapies — EN / RU / GE)",
        ),
        MultiFieldPanel(
            [
                FieldPanel("loyalty_serial"),
                FieldPanel("loyalty_heading"),
                FieldPanel("loyalty_heading_ru"),
                FieldPanel("loyalty_heading_ka"),
                FieldPanel("loyalty_subtitle"),
                FieldPanel("loyalty_subtitle_ru"),
                FieldPanel("loyalty_subtitle_ka"),
                FieldPanel("loyalty_desc"),
                FieldPanel("loyalty_desc_ru"),
                FieldPanel("loyalty_desc_ka"),
                FieldPanel("loyalty_image"),
            ],
            heading="03. Программа лояльности (Loyalty — EN / RU / GE)",
        ),
        MultiFieldPanel(
            [
                FieldPanel("giftcards_serial"),
                FieldPanel("giftcards_heading"),
                FieldPanel("giftcards_heading_ru"),
                FieldPanel("giftcards_heading_ka"),
                FieldPanel("giftcards_subtext"),
                FieldPanel("giftcards_subtext_ru"),
                FieldPanel("giftcards_subtext_ka"),
                FieldPanel("giftcards_btn_text"),
                FieldPanel("giftcards_btn_text_ru"),
                FieldPanel("giftcards_btn_text_ka"),
            ],
            heading="04. Подарочные сертификаты (Gift Cards — EN / RU / GE)",
        ),
        MultiFieldPanel(
            [
                FieldPanel("reels_serial"),
                FieldPanel("reels_heading"),
                FieldPanel("reels_heading_ru"),
                FieldPanel("reels_heading_ka"),
                FieldPanel("reels_subtext"),
                FieldPanel("reels_subtext_ru"),
                FieldPanel("reels_subtext_ka"),
                FieldPanel("reel_1_video"),
                FieldPanel("reel_1_poster"),
                FieldPanel("reel_2_video"),
                FieldPanel("reel_2_poster"),
                FieldPanel("reel_3_video"),
                FieldPanel("reel_3_poster"),
                FieldPanel("reel_4_video"),
                FieldPanel("reel_4_poster"),
            ],
            heading="05. Атмосфера и Видео-Reels (Atmosphere — EN / RU / GE)",
        ),
        MultiFieldPanel(
            [
                FieldPanel("manifesto_huge_text"),
                FieldPanel("manifesto_huge_text_ru"),
                FieldPanel("manifesto_huge_text_ka"),
                FieldPanel("manifesto_small_text"),
                FieldPanel("manifesto_image"),
            ],
            heading="06. Манифест-баннер (Manifesto — EN / RU / GE)",
        ),
        MultiFieldPanel(
            [
                FieldPanel("palette_serial"),
                FieldPanel("palette_heading"),
                FieldPanel("palette_heading_ru"),
                FieldPanel("palette_heading_ka"),
                FieldPanel("palette_subtext"),
            ],
            heading="07. Цветовая палитра (Identity — EN / RU / GE)",
        ),
        MultiFieldPanel(
            [
                FieldPanel("booking_serial"),
                FieldPanel("booking_heading"),
                FieldPanel("booking_heading_ru"),
                FieldPanel("booking_heading_ka"),
                FieldPanel("booking_lead"),
                FieldPanel("booking_lead_ru"),
                FieldPanel("booking_lead_ka"),
                FieldPanel("booking_btn_text"),
                FieldPanel("booking_btn_text_ru"),
                FieldPanel("booking_btn_text_ka"),
            ],
            heading="08. Форма бронирования (Booking — EN / RU / GE)",
        ),
        MultiFieldPanel(
            [
                FieldPanel("loc_heading"),
                FieldPanel("loc_city"),
                FieldPanel("loc_address"),
                FieldPanel("loc_hours"),
                FieldPanel("loc_gmaps_url"),
                FieldPanel("loc_phone"),
                FieldPanel("loc_whatsapp_url"),
                FieldPanel("loc_telegram_url"),
                FieldPanel("loc_instagram_url"),
                FieldPanel("loc_email"),
                FieldPanel("whatsapp_notify_phone"),
                FieldPanel("whatsapp_notify_apikey"),
            ],
            heading="09. Локация, Контакты и WhatsApp-уведомления (Location & WhatsApp Bot)",
        ),
        MultiFieldPanel(
            [
                FieldPanel("footer_motto"),
                FieldPanel("footer_motto_ru"),
                FieldPanel("footer_motto_ka"),
                FieldPanel("footer_copyright"),
            ],
            heading="10. Подвал сайта (Footer — EN / RU / GE)",
        ),
    ]

    def get_context(self, request, *args, **kwargs):
        context = super().get_context(request, *args, **kwargs)
        context["rituals"] = Ritual.objects.all().order_by("order", "id")
        return context

    class Meta:
        verbose_name = "Главная страница"

