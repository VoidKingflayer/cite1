from django.db import models
from django.utils import timezone
from django.utils.html import format_html
from wagtail.admin.panels import FieldPanel, MultiFieldPanel


class Booking(models.Model):
    class Status(models.TextChoices):
        PENDING = "pending", "⏳ Ожидает подтверждения"
        CONFIRMED = "confirmed", "✅ Подтверждена"
        COMPLETED = "completed", "✨ Завершена"
        CANCELLED = "cancelled", "❌ Отменена"

    client_name = models.CharField("Имя клиента", max_length=100, help_text="ФИО или имя гостя")
    client_phone = models.CharField("Телефон", max_length=50, help_text="Контактный номер для связи / WhatsApp")
    client_email = models.EmailField("Email", blank=True, help_text="Электронная почта (необязательно)")

    service = models.ForeignKey(
        "home.Ritual",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="bookings",
        verbose_name="Ритуал / Процедура",
        help_text="Выберите услугу из каталога (если применимо)",
    )
    service_name = models.CharField(
        "Название услуги",
        max_length=150,
        blank=True,
        help_text="Заполняется автоматически при выборе услуги или вручную",
    )

    booking_date = models.DateField("Дата визита", default=timezone.now, help_text="Дата запланированного сеанса")
    booking_time = models.CharField(
        "Время визита",
        max_length=20,
        default="12:00",
        help_text="Время сеанса, например: 12:00, 14:30, 18:00",
    )
    notes = models.TextField("Пожелания / Комментарий", blank=True, help_text="Дополнительные пожелания гостя или примечания администратора")

    status = models.CharField(
        "Статус записи",
        max_length=20,
        choices=Status.choices,
        default=Status.PENDING,
        help_text="Текущее состояние бронирования",
    )

    created_at = models.DateTimeField("Дата создания заявки", auto_now_add=True)
    updated_at = models.DateTimeField("Дата обновления", auto_now=True)

    panels = [
        MultiFieldPanel(
            [
                FieldPanel("status"),
            ],
            heading="Статус записи",
        ),
        MultiFieldPanel(
            [
                FieldPanel("client_name"),
                FieldPanel("client_phone"),
                FieldPanel("client_email"),
            ],
            heading="👤 Данные клиента",
        ),
        MultiFieldPanel(
            [
                FieldPanel("service"),
                FieldPanel("service_name"),
                FieldPanel("booking_date"),
                FieldPanel("booking_time"),
            ],
            heading="💆 Детали процедуры и время",
        ),
        MultiFieldPanel(
            [
                FieldPanel("notes"),
            ],
            heading="📝 Пожелания клиента / Заметки",
        ),
    ]

    class Meta:
        verbose_name = "Онлайн-запись"
        verbose_name_plural = "Онлайн-записи"
        ordering = ["-booking_date", "-created_at"]

    def __str__(self):
        return f"Запись #{self.id}: {self.client_name} ({self.booking_date} {self.booking_time})"

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


class BlockedTimeSlot(models.Model):
    SLOT_CHOICES = [
        ("ALL_DAY", "⛔ Весь день (Выходной / Закрыто)"),
        ("09:00", "09:00"),
        ("10:00", "10:00"),
        ("11:00", "11:00"),
        ("12:00", "12:00"),
        ("13:00", "13:00"),
        ("14:00", "14:00"),
        ("15:00", "15:00"),
        ("16:00", "16:00"),
        ("17:00", "17:00"),
        ("18:00", "18:00"),
        ("19:00", "19:00"),
        ("20:00", "20:00"),
        ("21:00", "21:00"),
        ("22:00", "22:00"),
    ]

    date = models.DateField("Дата", default=timezone.now, help_text="Дата, для которой блокируется слот")
    time_slot = models.CharField(
        "Время или период",
        max_length=50,
        choices=SLOT_CHOICES,
        default="ALL_DAY",
        help_text="Выберите конкретный час или 'Весь день'",
    )
    reason = models.CharField(
        "Причина / Заметка",
        max_length=200,
        blank=True,
        default="Занято / Недоступно",
        help_text="Например: Обед, Личная встреча, Выходной",
    )
    created_at = models.DateTimeField("Создано", auto_now_add=True)

    panels = [
        FieldPanel("date"),
        FieldPanel("time_slot"),
        FieldPanel("reason"),
    ]

    class Meta:
        verbose_name = "Заблокированный слот / Выходной"
        verbose_name_plural = "Заблокированные слоты / Выходные"
        ordering = ["-date", "time_slot"]

    def __str__(self):
        return f"{self.date} [{self.get_time_slot_display()}]: {self.reason or 'Заблокировано'}"
