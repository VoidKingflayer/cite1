from django.db import migrations

def update_loyalty_desc(apps, schema_editor):
    HomePage = apps.get_model('home', 'HomePage')
    for page in HomePage.objects.all():
        page.loyalty_desc = "Receive more pleasure and care for yourself. Enjoy 20% off your 5th massage — our little ritual of gratitude."
        page.loyalty_desc_ru = "Больше удовольствия и заботы о себе. Скидка 20% на каждый 5-й массаж — наш маленький ритуал благодарности за ваше доверие."
        page.loyalty_desc_ka = "მეტი სიამოვნება და ზრუნვა საკუთარ თავზე. 20%-იანი ფასდაკლება მე-5 მასაჟზე — ჩვენი მადლიერების რიტუალი."
        page.save(update_fields=['loyalty_desc', 'loyalty_desc_ru', 'loyalty_desc_ka'])

class Migration(migrations.Migration):

    dependencies = [
        ('home', '0007_set_production_wagtail_site'),
    ]

    operations = [
        migrations.RunPython(update_loyalty_desc, migrations.RunPython.noop),
    ]
