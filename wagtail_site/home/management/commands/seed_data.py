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
                "name": "Relaxing Massage",
                "name_ru": "Расслабляющий массаж",
                "name_ka": "რელაქსაციის მასაჟი",
                "category": "body",
                "tag": "Signature Technique",
                "tag_ru": "Авторская техника",
                "tag_ka": "საავტორო ტექნიკა",
                "tag_is_luxury": True,
                "is_highlighted": True,
                "description": "Smooth, soft movements, light muscle release.",
                "description_ru": "плавные, мягкие движения, лёгкая проработка мышц",
                "description_ka": "მდორე, რბილი მოძრაობები, კუნთების მსუბუქი დამუშავება.",
                "duration_1": "60 min",
                "price_1": "120 ₾",
                "duration_2": "90 min",
                "price_2": "170 ₾",
                "order": 1,
            },
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
                "description": "Moderate rhythm, deep muscle relief.",
                "description_ru": "средний ритм, глубокая проработка мышц",
                "description_ka": "საშუალო რიტმი, კუნთების ღრმა დამუშავება.",
                "duration_1": "60 min",
                "price_1": "120 ₾",
                "duration_2": "90 min",
                "price_2": "170 ₾",
                "order": 2,
            },
            {
                "name": "Sports Massage",
                "name_ru": "Спортивный массаж",
                "name_ka": "სპორტული მასაჟი",
                "category": "body",
                "tag": "Deep Recovery",
                "tag_ru": "Глубокое восстановление",
                "tag_ka": "ღრმა აღდგენა",
                "tag_is_luxury": False,
                "is_highlighted": False,
                "description": "Intensive therapy on muscles, fascia, and trigger points.",
                "description_ru": "интенсивная работа с мышцами, фасциями, триггерными точками",
                "description_ka": "ინტენსიური მუშაობა კუნთებზე, ფასციებზე, ტრიგერულ წერტილებზე.",
                "duration_1": "60 min",
                "price_1": "120 ₾",
                "duration_2": "90 min",
                "price_2": "170 ₾",
                "order": 3,
            },
            {
                "name": "Lymphatic Drainage Massage",
                "name_ru": "Лимфодренажный массаж",
                "name_ka": "ლიმფოდრენაჟული მასაჟი",
                "category": "body",
                "tag": "Detox & Lightness",
                "tag_ru": "Детокс и легкость",
                "tag_ka": "დეტოქსი და სიმსუბუქე",
                "tag_is_luxury": False,
                "is_highlighted": False,
                "description": "Soft, flowing technique along lymph flow and lymphatic nodes.",
                "description_ru": "мягкая работа по ходу лимфотока и лимфатических точек",
                "description_ka": "რბილი მუშაობა ლიმფის დინებისა და ლიმფური წერტილების გასწვრივ.",
                "duration_1": "60 min",
                "price_1": "120 ₾",
                "duration_2": "90 min",
                "price_2": "170 ₾",
                "order": 4,
            },
        ]

        Ritual.objects.all().delete()
        for r_data in rituals_data:
            Ritual.objects.create(**r_data)
        self.stdout.write(self.style.SUCCESS(f"✓ Загружено {len(rituals_data)} ритуалов на 3 языках (EN, RU, GE)"))
        self.stdout.write(self.style.SUCCESS("\n🎉 Все мультиязычные данные успешно синхронизированы в Wagtail CMS!"))
