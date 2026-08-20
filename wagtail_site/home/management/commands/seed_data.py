import os
from pathlib import Path
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.core.files import File
from wagtail.models import Site, Page
from wagtail.images.models import Image
from home.models import HomePage, Ritual


class Command(BaseCommand):
    help = "Импорт всех изображений и мультиязычного контента (EN/RU/GE) в Wagtail CMS"

    def handle(self, *args, **options):
        self.stdout.write("Начало наполнения базы данных и синхронизации мультиязычного контента Wagtail...")

        # 1. Superuser
        User = get_user_model()
        if not User.objects.filter(username="admin").exists():
            User.objects.create_superuser("admin", "admin@tochka.ge", "admin123")
            self.stdout.write(self.style.SUCCESS("✓ Создан суперпользователь: admin / admin123"))

        # 2. Import Images
        base_dir = Path(__file__).resolve().parent.parent.parent.parent
        static_img_dir = base_dir / "home" / "static" / "home" / "images"
        if not static_img_dir.exists():
            static_img_dir = base_dir.parent / "omra-spa" / "images"

        imported_images = {}
        image_titles = {
            "3903587528438016601.jpg": "Hero — Главное фото (Sensual Portrait & Dewy Skin)",
            "3903611317898741075_3903611114787886062.jpg": "Лояльность — Карта TOCHKA на камне",
            "3941719025657177039_clean.jpg": "Манифест — ALL YOU KNEAD IS CARE (Фон)",
            "manifesto_care_bg.jpg": "Манифест — Альтернативный фон",
            "tochka_poster_1.jpg": "Reels 1 — Обложка видео (Ritual Harmony)",
            "tochka_poster_2.jpg": "Reels 2 — Обложка видео (Tactile Care)",
            "tochka_poster_3.jpg": "Reels 3 — Обложка видео (Natural Rhythm)",
            "tochka_poster_4.jpg": "Reels 4 — Обложка видео (Sacred Pause)",
            "omra_module_1.jpg": "Интерьер 1 — Минималистичное пространство",
            "omra_module_2.jpg": "Интерьер 2 — Массажная зона",
            "omra_module_3.jpg": "Интерьер 3 — Детали декора",
            "omra_module_4.jpg": "Интерьер 4 — Чайная зона",
            "omra_module_5.jpg": "Интерьер 5 — Органические масла",
            "omra_module_6.jpg": "Интерьер 6 — Текстиль и уют",
            "omra_module_7.jpg": "Интерьер 7 — Атмосфера покоя",
            "omra_module_8.jpg": "Интерьер 8 — Спа-ритуалы",
            "omra_module_9.jpg": "Интерьер 9 — Фирменный стиль",
        }

        if static_img_dir.exists():
            for img_file in static_img_dir.glob("*.*"):
                if img_file.suffix.lower() in [".jpg", ".jpeg", ".png", ".webp"]:
                    filename = img_file.name
                    title = image_titles.get(filename, f"TOCHKA — {img_file.stem}")
                    existing_image = Image.objects.filter(title=title).first()
                    if not existing_image:
                        with open(img_file, "rb") as f:
                            img_obj = Image(title=title)
                            img_obj.file.save(filename, File(f), save=True)
                            imported_images[filename] = img_obj
                    else:
                        imported_images[filename] = existing_image

        hero_img = imported_images.get("3903587528438016601.jpg") or Image.objects.filter(title__icontains="Hero").first()
        loyalty_img = imported_images.get("3903611317898741075_3903611114787886062.jpg") or Image.objects.filter(title__icontains="Лояльность").first()
        manifesto_img = imported_images.get("3941719025657177039_clean.jpg") or Image.objects.filter(title__icontains="Манифест").first()
        poster_1 = imported_images.get("tochka_poster_1.jpg") or Image.objects.filter(title__icontains="Reels 1").first()
        poster_2 = imported_images.get("tochka_poster_2.jpg") or Image.objects.filter(title__icontains="Reels 2").first()
        poster_3 = imported_images.get("tochka_poster_3.jpg") or Image.objects.filter(title__icontains="Reels 3").first()
        poster_4 = imported_images.get("tochka_poster_4.jpg") or Image.objects.filter(title__icontains="Reels 4").first()

        # 3. Setup HomePage
        homepage = HomePage.objects.filter(slug="home").first()
        if not homepage:
            homepage = HomePage.objects.first()

        if homepage:
            homepage.hero_image = hero_img
            homepage.loyalty_image = loyalty_img
            homepage.manifesto_image = manifesto_img
            homepage.reel_1_poster = poster_1
            homepage.reel_2_poster = poster_2
            homepage.reel_3_poster = poster_3
            homepage.reel_4_poster = poster_4

            # Prepopulate RU & GE if empty
            if not homepage.hero_main_title_ru:
                homepage.hero_main_title_ru = "Ваше пространство для дыхания."
            if not homepage.hero_main_title_ka:
                homepage.hero_main_title_ka = "თქვენი სივრცე სუნთქვისთვის."

            if not homepage.hero_description_ru:
                homepage.hero_description_ru = "ТОЧКА рождается на стыке тела и души — там, где прикосновение становится языком заботы, а само пространство дышит спокойствием. Это место, где можно оставить за порогом шум города и снова услышать себя."
            if not homepage.hero_description_ka:
                homepage.hero_description_ka = "წერტილი იბადება სხეულისა და სულის შეხვედრის ადგილზე — სადაც შეხება ხდება ზრუნვის ენა, ხოლო თავად სივრცე სიმშვიდით სუნთქავს."

            homepage.save_revision().publish()
            self.stdout.write(self.style.SUCCESS("✓ HomePage обновлена со всеми мультиязычными полями (EN / RU / GE)"))

        # 4. Rituals Multilingual Data
        rituals_data = [
            {
                "name": "Classic Massage",
                "name_ru": "Классический массаж",
                "name_ka": "კლასიკური მასაჟი",
                "category": "body",
                "tag": "Popular",
                "tag_ru": "Популярный",
                "tag_ka": "პოპულარული",
                "tag_is_luxury": False,
                "is_highlighted": False,
                "description": "Deep and structured treatment tailored to relieve muscle tension and improve overall comfort. Steady pace with controlled pressure and trigger point release.",
                "description_ru": "Глубокая структурированная проработка мышц всего тела для снятия зажимов, улучшения кровообращения и общего восстановления тонуса.",
                "description_ka": "ღრმა და სტრუქტურირებული პროცედურა კუნთების დაძაბულობის მოსახსნელად და საერთო კომფორტის გასაუმჯობესებლად.",
                "duration_1": "60 min",
                "price_1": "$45",
                "duration_2": "90 min",
                "price_2": "$60",
                "order": 1,
            },
            {
                "name": "Relaxing Massage (Continuous Contact)",
                "name_ru": "Расслабляющий массаж (Непрерывный контакт)",
                "name_ka": "რელაქს მასაჟი (უწყვეტი კონტაქტი)",
                "category": "body",
                "tag": "Signature Technique",
                "tag_ru": "Авторская техника",
                "tag_ka": "საავტორო ტექნიკა",
                "tag_is_luxury": True,
                "is_highlighted": True,
                "description": "Signature continuous-contact technique creating a seamless, flowing rhythm without breaks. Allows the nervous system to switch off, releasing fatigue and bringing deep inner calm.",
                "description_ru": "Авторская техника непрерывного контакта рук мастера. Плавный, непрерывающийся поток движений перезагружает нервную систему и дарит глубокое умиротворение.",
                "description_ka": "საავტორო უწყვეტი კონტაქტის ტექნიკა ქმნის უწყვეტ, მდორე რიტმს. საშუალებას აძლევს ნერვულ სისტემას სრულად მოდუნდეს.",
                "duration_1": "60 min",
                "price_1": "$45",
                "duration_2": "90 min",
                "price_2": "$60",
                "order": 2,
            },
            {
                "name": "Lymphatic Drainage Therapy",
                "name_ru": "Лимфодренажный массаж",
                "name_ka": "ლიმფოდრენაჟული თერაპია",
                "category": "body",
                "tag": "Detox & Lightness",
                "tag_ru": "Детокс и легкость",
                "tag_ka": "დეტოქსი და სიმსუბუქე",
                "tag_is_luxury": False,
                "is_highlighted": False,
                "description": "Stimulates lymph circulation, reduces swelling, relieves heaviness in the legs, and brings overall body lightness and detoxification through soft flowing strokes.",
                "description_ru": "Мягкая волнообразная техника для активации лимфотока, выведения лишней жидкости, снятия отечности и ощущения невероятной легкости во всем теле.",
                "description_ka": "ასტიმულირებს ლიმფის ცირკულაციას, ამცირებს შეშუპებას, ხსნის სიმძიმეს ფეხებში და ანიჭებს სხეულს სიმსუბუქეს.",
                "duration_1": "60 min",
                "price_1": "$48",
                "duration_2": "90 min",
                "price_2": "$63",
                "order": 3,
            },
            {
                "name": "Sports & Deep Tissue Massage",
                "name_ru": "Спортивный и глубокотканный массаж",
                "name_ka": "სპორტული და ღრმა ქსოვილების მასაჟი",
                "category": "body",
                "tag": "Deep Recovery",
                "tag_ru": "Глубокое восстановление",
                "tag_ka": "ღრმა აღდგენა",
                "tag_is_luxury": False,
                "is_highlighted": False,
                "description": "Intensive mechanical therapy on muscles, fascia, and connective tissues. Normalizes muscle tone, eases stiffness, and accelerates post-workout recovery.",
                "description_ru": "Интенсивная силовая проработка глубоких слоев мышц и фасций. Снимает триггеры после тренировок и восстанавливает подвижность суставов.",
                "description_ka": "ინტენსიური მექანიკური თერაპია კუნთებზე, ფასციებსა და შემაერთებელ ქსოვილებზე. აჩქარებს ვარჯიშის შემდგომ აღდგენას.",
                "duration_1": "60 min",
                "price_1": "$52",
                "duration_2": "90 min",
                "price_2": "$67",
                "order": 4,
            },
            {
                "name": "Back & Neck Recovery Therapy",
                "name_ru": "Массаж спины и шейно-воротниковой зоны",
                "name_ka": "ზურგისა და კისრის აღდგენითი თერაპია",
                "category": "focused",
                "tag": "Targeted Therapy",
                "tag_ru": "Прицельная проработка",
                "tag_ka": "მიზნობრივი თერაპია",
                "tag_is_luxury": False,
                "is_highlighted": False,
                "description": "Targeted axial therapy. Releases neck and shoulder knots, relieves desk-posture stiffness, and alleviates tension headaches through focused trigger therapy.",
                "description_ru": "Прицельная работа с зоной шеи, лопаток и поясницы. Устраняет зажимы от сидячей работы за ноутбуком и головные боли напряжения.",
                "description_ka": "მიზნობრივი თერაპია. ხსნის კისრისა და მხრების დაძაბულობას და მჯდომარე სამუშაოთი გამოწვეულ დისკომფორტს.",
                "duration_1": "45 min",
                "price_1": "$33",
                "duration_2": "60 min",
                "price_2": "$45",
                "order": 5,
            },
            {
                "name": "Facial & Decollete Sculpting Lift",
                "name_ru": "Скульптурный лифтинг лица и декольте",
                "name_ka": "სახისა და დეკოლტეს სკულპტურული ლიფტინგი",
                "category": "focused",
                "tag": "Myofascial Lift",
                "tag_ru": "Миофасциальный лифтинг",
                "tag_ka": "მიოფასციალური ლიფტინგი",
                "tag_is_luxury": False,
                "is_highlighted": False,
                "description": "Myofascial lifting and sculpting technique for face, neck, and decollete. Enhances contours, boosts microcirculation, and relieves facial muscle tension.",
                "description_ru": "Моделирующий массаж лица, шеи и зоны декольте. Формирует четкий овал, снимает отечность, разглаживает мимические спазмы и возвращает сияние.",
                "description_ka": "მიოფასციალური ლიფტინგისა და სკულპტურინგის ტექნიკა სახის, კისრისა და დეკოლტესთვის. აუმჯობესებს კონტურებს და მიკროცირკულაციას.",
                "duration_1": "50 min",
                "price_1": "$40",
                "duration_2": "",
                "price_2": "",
                "order": 6,
            },
            {
                "name": "Signature TOCH_KA Sanctuary Ritual",
                "name_ru": "Авторский спа-ритуал ТОЧКА",
                "name_ka": "საავტორო რიტუალი წერტილი",
                "category": "signature",
                "tag": "Full Immersion",
                "tag_ru": "Полное погружение",
                "tag_ka": "სრული იმერსია",
                "tag_is_luxury": True,
                "is_highlighted": True,
                "description": "The ultimate sanctuary experience by therapist Anna Kolosova: seamless continuous contact, deep muscle release, organic coconut oil, custom playlist, and relaxing tea/coffee aftercare.",
                "description_ru": "Флагманский ритуал полного восстановления от Анны Колосовой: непрерывный контакт, кокосовое масло, индивидуальная музыкальная атмосфера и дегустация чая/кофе.",
                "description_ka": "უდიდესი სანქტუარი გამოცდილება თერაპევტ ანა კოლოსოვასგან: უწყვეტი კონტაქტი, კუნთების ღრმა მოდუნება, ორგანული ზეთი და მუსიკა.",
                "duration_1": "90 min",
                "price_1": "$70",
                "duration_2": "120 min",
                "price_2": "$90",
                "order": 7,
            },
            {
                "name": "4 Hands Synchronized Symphony",
                "name_ru": "Синхронный массаж в 4 руки",
                "name_ka": "სინქრონული მასაჟი 4 ხელში",
                "category": "signature",
                "tag": "Ultimate Experience",
                "tag_ru": "Высшее наслаждение",
                "tag_ka": "უმაღლესი გამოცდილება",
                "tag_is_luxury": True,
                "is_highlighted": False,
                "description": "Two therapists perform synchronized movements in seamless harmony. The mirrored rhythm creates an effortless flow, overwhelming daily stress and inducing pure weightlessness.",
                "description_ru": "Два мастера работают в идеальном зеркальном синхроне. Мозг отключает контроль, погружая сознание в абсолютное состояние невесомости и чистого блаженства.",
                "description_ka": "ორი თერაპევტი ასრულებს სინქრონიზებულ მოძრაობებს უწყვეტ ჰარმონიაში. სარკისებური რიტმი ქმნის სიმსუბუქის სრულყოფილ შეგრძნებას.",
                "duration_1": "60 min",
                "price_1": "$93",
                "duration_2": "90 min",
                "price_2": "$125",
                "order": 8,
            },
        ]

        Ritual.objects.all().delete()
        for r_data in rituals_data:
            Ritual.objects.create(**r_data)
        self.stdout.write(self.style.SUCCESS(f"✓ Загружено {len(rituals_data)} ритуалов на 3 языках (EN, RU, GE)"))
        self.stdout.write(self.style.SUCCESS("\n🎉 Все мультиязычные данные успешно синхронизированы в Wagtail CMS!"))
