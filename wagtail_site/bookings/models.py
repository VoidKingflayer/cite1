from django.db import models
from django.utils.html import format_html


class Booking(models.Model):
    class Status(models.TextChoices):
        PENDING = "pending", "⏳ Ожидает подтверждения"
        CONFIRMED = "confirmed", "✅ Подтверждена"
        COMPLETED = "completed", "✨ Завершена"
        CANCELLED = "cancelled", "❌ Отменена"

    client_name = models.CharField("Имя клиента", max_length=100)
    client_phone = models.CharField("Телефон", max_length=50)
    client_email = models.EmailField("Email", blank=True)

    service = models.ForeignKey(
        "home.Ritual",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="bookings",
        verbose_name="Ритуал / Процедура",
    )
    service_name = models.CharField("Название услуги", max_length=150, blank=True)

    booking_date = models.DateField("Дата визита")
    booking_time = models.CharField("Время визита", max_length=20, default="12:00")
    notes = models.TextField("Пожелания / Комментарий", blank=True)

    status = models.CharField(
        "Статус записи",
        max_length=20,
        choices=Status.choices,
        default=Status.PENDING,
    )

    created_at = models.DateTimeField("Дата создания заявки", auto_now_add=True)
    updated_at = models.DateTimeField("Дата обновления", auto_now=True)

    class Meta:
        verbose_name = "Онлайн-запись"
        verbose_name_plural = "Онлайн-записи"
        ordering = ["-booking_date", "-created_at"]

    def __str__(self):
        return f"Запись #{self.id}: {self.client_name} ({self.booking_date})"

    def save(self, *args, **kwargs):
        if self.service and not self.service_name:
            self.service_name = self.service.name
        super().save(*args, **kwargs)

    @property
    def status_badge(self):
        colors = {
            "pending": "#d97706",    # amber
            "confirmed": "#16a34a",  # green
            "completed": "#2563eb",  # blue
            "cancelled": "#dc2626",  # red
        }
        color = colors.get(self.status, "#6b7280")
        return format_html(
            '<span style="background-color: {}; color: #fff; padding: 4px 10px; border-radius: 9999px; font-weight: 600; font-size: 0.8rem; display: inline-block;">{}</span>',
            color,
            self.get_status_display(),
        )
