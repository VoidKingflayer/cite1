from django.urls import path, reverse
from django.utils.html import format_html
from django.utils.safestring import mark_safe
from wagtail import hooks
from wagtail.admin.menu import MenuItem
from wagtail.admin.site_summary import SummaryItem
from wagtail.snippets.models import register_snippet
from wagtail.snippets.views.snippets import SnippetViewSet
from .models import Booking, BlockedTimeSlot
from .views import (
    admin_schedule_view,
    admin_update_booking_status_api,
    admin_quick_create_booking_api,
    admin_toggle_block_slot_api,
)
from .inbox_views import (
    admin_inbox_view,
    admin_inbox_get_chats_api,
    admin_inbox_get_messages_api,
    admin_inbox_send_reply_api,
    admin_inbox_toggle_chat_mode_api,
    admin_inbox_toggle_channel_mode_api,
)


class BookingViewSet(SnippetViewSet):
    model = Booking
    icon = "date"
    menu_label = "Онлайн-записи (Таблица)"
    menu_name = "bookings"
    menu_order = 150
    add_to_admin_menu = True

    inspect_view_enabled = True
    copy_view_enabled = True

    list_display = [
        "id",
        "client_card_html",
        "service_badge_html",
        "datetime_badge_html",
        "status_badge",
        "notes_preview_html",
        "quick_actions_html",
    ]
    list_display_links = ["id", "client_card_html"]
    
    list_filter = ["status", "booking_date", "service", "created_at"]
    search_fields = [
        "client_name",
        "client_phone",
        "client_email",
        "notes",
        "service_name",
    ]
    ordering = ["-booking_date", "-created_at"]

    list_export = [
        "id",
        "client_name",
        "client_phone",
        "client_email",
        "service_name",
        "booking_date",
        "booking_time",
        "status",
        "notes",
        "created_at",
    ]
    export_headings = {
        "id": "ID",
        "client_name": "Имя клиента",
        "client_phone": "Телефон",
        "client_email": "Email",
        "service_name": "Ритуал / Услуга",
        "booking_date": "Дата визита",
        "booking_time": "Время визита",
        "status": "Статус",
        "notes": "Комментарий",
        "created_at": "Дата создания",
    }


# Set custom column titles
Booking.client_card_html.fget.short_description = "👤 Гость / Контакты"
Booking.service_badge_html.fget.short_description = "💆 Процедура"
Booking.datetime_badge_html.fget.short_description = "📅 Дата и время"
Booking.status_badge.fget.short_description = "Статус"
Booking.notes_preview_html.fget.short_description = "📝 Пожелания"
Booking.quick_actions_html.fget.short_description = "⚡ Быстрые действия"


class BlockedTimeSlotViewSet(SnippetViewSet):
    model = BlockedTimeSlot
    icon = "time"
    menu_label = "⛔ Занятые часы / Выходные"
    menu_name = "blocked_slots"
    menu_order = 155
    add_to_admin_menu = True

    list_display = [
        "date",
        "time_slot",
        "reason",
        "created_at",
    ]
    list_filter = ["date", "time_slot"]
    search_fields = ["reason", "time_slot"]
    ordering = ["-date", "time_slot"]


register_snippet(BookingViewSet)
register_snippet(BlockedTimeSlotViewSet)


# =========================================================================
# Custom Admin URLs for Schedule & Omnichannel Inbox
# =========================================================================
@hooks.register("register_admin_urls")
def register_schedule_admin_urls():
    return [
        # Schedule & Booking APIs
        path("schedule/", admin_schedule_view, name="admin_schedule"),
        path("schedule/api/status/", admin_update_booking_status_api, name="admin_booking_status_api"),
        path("schedule/api/quick-create/", admin_quick_create_booking_api, name="admin_booking_quick_create_api"),
        path("schedule/api/toggle-block/", admin_toggle_block_slot_api, name="admin_booking_toggle_block_api"),

        # Omnichannel Live Inbox & AI Mode APIs
        path("inbox/", admin_inbox_view, name="admin_inbox"),
        path("inbox/api/chats/", admin_inbox_get_chats_api, name="admin_inbox_chats_api"),
        path("inbox/api/messages/", admin_inbox_get_messages_api, name="admin_inbox_messages_api"),
        path("inbox/api/send/", admin_inbox_send_reply_api, name="admin_inbox_send_api"),
        path("inbox/api/toggle-chat-mode/", admin_inbox_toggle_chat_mode_api, name="admin_inbox_toggle_chat_mode_api"),
        path("inbox/api/toggle-channel-mode/", admin_inbox_toggle_channel_mode_api, name="admin_inbox_toggle_channel_mode_api"),
    ]


@hooks.register("register_admin_menu_item")
def register_inbox_menu_item():
    return MenuItem(
        "💬 Все чаты (Omnichannel)",
        reverse("admin_inbox"),
        icon_name="mail",
        order=140,
    )


@hooks.register("register_admin_menu_item")
def register_whatsapp_qr_menu_item():
    return MenuItem(
        "📱 WhatsApp QR-код",
        "/whatsapp/qr",
        icon_name="mobile-alt",
        order=142,
        attrs={"target": "_blank"},
    )


@hooks.register("register_admin_menu_item")
def register_schedule_menu_item():
    return MenuItem(
        "📅 Расписание и календарь",
        reverse("admin_schedule"),
        icon_name="date",
        order=145,
    )


@hooks.register("register_admin_menu_item")
def register_add_booking_menu_item():
    url = reverse("wagtailsnippets_bookings_booking:add")
    return MenuItem(
        "➕ Новая запись",
        url,
        icon_name="plus",
        order=160,
    )


# =========================================================================
# Dashboard Summary Cards
# =========================================================================
class BookingsSummaryItem(SummaryItem):
    order = 200
    template_name = "bookings/admin_summary_item.html"

    def get_context_data(self, parent_context):
        total = Booking.objects.count()
        pending = Booking.objects.filter(status=Booking.Status.PENDING).count()
        confirmed = Booking.objects.filter(status=Booking.Status.CONFIRMED).count()
        return {
            "total_bookings": total,
            "pending_bookings": pending,
            "confirmed_bookings": confirmed,
            "url": reverse("admin_schedule"),
            "table_url": reverse("wagtailsnippets_bookings_booking:list"),
            "add_url": reverse("wagtailsnippets_bookings_booking:add"),
            "inbox_url": reverse("admin_inbox"),
        }


@hooks.register("construct_homepage_summary_items")
def add_bookings_summary_item(request, items):
    items.append(BookingsSummaryItem(request))


# =========================================================================
# Global JS injection for 1-click status updates directly from table rows
# =========================================================================
@hooks.register("insert_global_admin_js")
def insert_bookings_admin_js():
    return mark_safe("""
    <script>
    function quickUpdateStatus(bookingId, newStatus, evt) {
        if (evt) {
            evt.preventDefault();
            evt.stopPropagation();
        }
        
        function getCookie(name) {
            let cookieValue = null;
            if (document.cookie && document.cookie !== '') {
                const cookies = document.cookie.split(';');
                for (let i = 0; i < cookies.length; i++) {
                    const cookie = cookies[i].trim();
                    if (cookie.substring(0, name.length + 1) === (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }

        const csrftoken = getCookie('csrftoken');
        fetch('/admin/schedule/api/status/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-CSRFToken': csrftoken,
            },
            body: new URLSearchParams({
                'booking_id': bookingId,
                'status': newStatus
            })
        })
        .then(r => r.json())
        .then(data => {
            if (data.success) {
                window.location.reload();
            } else {
                alert('Ошибка: ' + (data.error || 'Не удалось обновить статус'));
            }
        })
        .catch(err => alert('Ошибка сети: ' + err));
    }
    </script>
    """)
