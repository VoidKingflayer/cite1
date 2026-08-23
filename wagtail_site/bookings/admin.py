from django.contrib import admin
from .models import Booking, BlockedTimeSlot


@admin.register(BlockedTimeSlot)
class BlockedTimeSlotAdmin(admin.ModelAdmin):
    list_display = ("id", "date", "time_slot", "reason", "created_at")
    list_filter = ("date", "time_slot")
    search_fields = ("reason", "time_slot")
    ordering = ("-date", "time_slot")


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "client_name",
        "client_phone",
        "client_email",
        "service_name",
        "booking_date",
        "booking_time",
        "status",
        "created_at",
    )
    list_filter = ("status", "booking_date", "service", "created_at")
    search_fields = (
        "client_name",
        "client_phone",
        "client_email",
        "service_name",
        "notes",
    )
    date_hierarchy = "booking_date"
    readonly_fields = ("created_at", "updated_at")
    ordering = ("-booking_date", "-created_at")

    fieldsets = (
        (
            "Статус записи",
            {"fields": ("status",)},
        ),
        (
            "Данные клиента",
            {"fields": ("client_name", "client_phone", "client_email")},
        ),
        (
            "Детали бронирования",
            {"fields": ("service", "service_name", "booking_date", "booking_time")},
        ),
        (
            "Дополнительно",
            {"fields": ("notes", "created_at", "updated_at")},
        ),
    )

    actions = ["mark_as_confirmed", "mark_as_completed", "mark_as_cancelled"]

    @admin.action(description="✅ Подтвердить выбранные записи")
    def mark_as_confirmed(self, request, queryset):
        queryset.update(status=Booking.Status.CONFIRMED)

    @admin.action(description="✨ Отметить как завершенные")
    def mark_as_completed(self, request, queryset):
        queryset.update(status=Booking.Status.COMPLETED)

    @admin.action(description="❌ Отменить выбранные записи")
    def mark_as_cancelled(self, request, queryset):
        queryset.update(status=Booking.Status.CANCELLED)
