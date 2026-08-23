from django.contrib import admin
from .models import Ritual


@admin.register(Ritual)
class RitualAdmin(admin.ModelAdmin):
    list_display = ("name", "name_ru", "category", "duration_1", "price_1", "duration_2", "price_2", "order")
    list_filter = ("category", "tag_is_luxury", "is_highlighted")
    search_fields = ("name", "name_ru", "name_ka", "description", "description_ru")
    ordering = ("order", "id")
