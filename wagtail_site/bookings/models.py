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
            "pending": ("#d97706", "#fef3c7", "⏳"),    # amber
            "confirmed": ("#16a34a", "#dcfce7", "✅"),  # green
            "completed": ("#2563eb", "#dbeafe", "✨"),  # blue
            "cancelled": ("#dc2626", "#fee2e2", "❌"),  # red
        }
        text_color, bg_color, icon = colors.get(self.status, ("#4b5563", "#f3f4f6", "📌"))
        return format_html(
            '<span style="background-color: {}; color: {}; padding: 4px 12px; border-radius: 9999px; font-weight: 700; font-size: 0.82rem; display: inline-flex; align-items: center; gap: 4px; border: 1px solid rgba(0,0,0,0.05);">'
            '<span>{}</span><span>{}</span></span>',
            bg_color,
            text_color,
            icon,
            self.get_status_display().split(" ", 1)[-1] if " " in self.get_status_display() else self.get_status_display(),
        )

    @property
    def client_card_html(self):
        import re
        from django.utils.safestring import mark_safe
        clean_phone = re.sub(r"[^\d]", "", self.client_phone or "")
        wa_link = f"https://wa.me/{clean_phone}" if clean_phone else "#"
        
        email_part = f'<div style="font-size: 0.75rem; color: #6b7280; margin-top: 2px;">✉️ {self.client_email}</div>' if self.client_email else ''
        
        return format_html(
            '<div style="min-width: 170px;">'
            '<div style="font-weight: 700; color: #111827; font-size: 0.95rem; margin-bottom: 3px;">👤 {}</div>'
            '<div style="display: flex; align-items: center; gap: 8px; font-size: 0.82rem;">'
            '<a href="tel:{}" style="color: #4b5563; text-decoration: none; font-weight: 600;">📞 {}</a>'
            '<a href="{}" target="_blank" title="Написать в WhatsApp" style="display: inline-flex; align-items: center; justify-content: center; background: #25D366; color: #fff; width: 22px; height: 22px; border-radius: 50%; font-size: 11px; text-decoration: none; font-weight: bold; box-shadow: 0 1px 2px rgba(0,0,0,0.15);">💬</a>'
            '</div>'
            '{}'
            '</div>',
            self.client_name,
            self.client_phone,
            self.client_phone,
            wa_link,
            mark_safe(email_part) if email_part else "",
        )

    @property
    def datetime_badge_html(self):
        from datetime import date, timedelta
        from django.utils.safestring import mark_safe
        today = date.today()
        tomorrow = today + timedelta(days=1)
        
        weekdays_ru = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]
        months_ru = ["", "янв", "фев", "мар", "апр", "мая", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"]
        
        b_date = self.booking_date
        date_str = f"{b_date.day} {months_ru[b_date.month]} ({weekdays_ru[b_date.weekday()]})"
        
        tag_html = ""
        if b_date == today:
            tag_html = '<span style="background: #fee2e2; color: #dc2626; font-size: 0.72rem; padding: 2px 6px; border-radius: 4px; font-weight: 700; margin-left: 6px;">🔥 СЕГОДНЯ</span>'
        elif b_date == tomorrow:
            tag_html = '<span style="background: #fef3c7; color: #d97706; font-size: 0.72rem; padding: 2px 6px; border-radius: 4px; font-weight: 700; margin-left: 6px;">⚡ ЗАВТРА</span>'
        elif b_date < today:
            tag_html = '<span style="background: #f3f4f6; color: #9ca3af; font-size: 0.72rem; padding: 2px 6px; border-radius: 4px; font-weight: 600; margin-left: 6px;">Архив</span>'
        
        return format_html(
            '<div style="min-width: 150px;">'
            '<div style="font-weight: 700; color: #1f2937; font-size: 0.9rem; display: flex; align-items: center;">📅 {}{}</div>'
            '<div style="font-weight: 800; color: #0284c7; font-size: 1rem; margin-top: 2px;">🕒 {}</div>'
            '</div>',
            date_str,
            mark_safe(tag_html) if tag_html else "",
            self.booking_time,
        )

    @property
    def service_badge_html(self):
        from django.utils.safestring import mark_safe
        s_name = self.service_name or (self.service.name_ru if self.service else "Массаж")
        price_tag = ""
        if self.service:
            price_tag = f'<span style="background: #f0fdf4; color: #166534; padding: 2px 6px; border-radius: 4px; font-weight: 700; font-size: 0.75rem; margin-left: 6px;">{self.service.price_1} / {self.service.price_2}</span>'
        
        return format_html(
            '<div style="min-width: 150px;">'
            '<div style="font-weight: 600; color: #111827; font-size: 0.88rem;">💆 {}{}</div>'
            '</div>',
            s_name,
            mark_safe(price_tag) if price_tag else "",
        )

    @property
    def notes_preview_html(self):
        from django.utils.safestring import mark_safe
        if not self.notes:
            return mark_safe('<span style="color: #9ca3af; font-style: italic;">—</span>')
        
        preview = self.notes if len(self.notes) <= 45 else self.notes[:42] + "..."
        return format_html(
            '<div style="max-width: 200px; color: #4b5563; font-size: 0.82rem; line-height: 1.3;" title="{}">📝 {}</div>',
            self.notes,
            preview,
        )

    @property
    def quick_actions_html(self):
        from django.utils.safestring import mark_safe
        edit_url = f"/admin/snippets/bookings/booking/{self.id}/"
        import re
        clean_phone = re.sub(r"[^\d]", "", self.client_phone or "")
        wa_url = f"https://wa.me/{clean_phone}" if clean_phone else "#"
        
        btn_confirm = ""
        btn_complete = ""
        btn_cancel = ""
        
        if self.status == self.Status.PENDING:
            btn_confirm = f'<button onclick="quickUpdateStatus({self.id}, \'confirmed\', event)" style="background: #16a34a; color: #fff; border: none; padding: 4px 8px; border-radius: 6px; font-size: 0.75rem; font-weight: 700; cursor: pointer; transition: 0.2s;" title="Подтвердить запись">✅ Подтвердить</button>'
        if self.status in (self.Status.PENDING, self.Status.CONFIRMED):
            btn_complete = f'<button onclick="quickUpdateStatus({self.id}, \'completed\', event)" style="background: #2563eb; color: #fff; border: none; padding: 4px 8px; border-radius: 6px; font-size: 0.75rem; font-weight: 700; cursor: pointer; transition: 0.2s;" title="Завершить сеанс">✨ Завершить</button>'
        if self.status != self.Status.CANCELLED:
            btn_cancel = f'<button onclick="quickUpdateStatus({self.id}, \'cancelled\', event)" style="background: #fee2e2; color: #dc2626; border: 1px solid #fca5a5; padding: 3px 6px; border-radius: 6px; font-size: 0.75rem; font-weight: 600; cursor: pointer; transition: 0.2s;" title="Отменить запись">❌</button>'
            
        return format_html(
            '<div style="display: flex; gap: 6px; align-items: center; flex-wrap: wrap;">'
            '{}'
            '{}'
            '{}'
            '<a href="{}" style="background: #f3f4f6; color: #374151; border: 1px solid #d1d5db; padding: 3px 8px; border-radius: 6px; font-size: 0.75rem; font-weight: 600; text-decoration: none;" title="Редактировать всё">✏️ Изменить</a>'
            '<a href="{}" target="_blank" style="background: #25D366; color: #fff; padding: 3px 7px; border-radius: 6px; font-size: 0.75rem; font-weight: bold; text-decoration: none;" title="Написать клиенту">💬</a>'
            '</div>',
            mark_safe(btn_confirm) if btn_confirm else "",
            mark_safe(btn_complete) if btn_complete else "",
            mark_safe(btn_cancel) if btn_cancel else "",
            edit_url,
            wa_url,
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
