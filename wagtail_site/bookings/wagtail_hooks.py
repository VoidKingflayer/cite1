from django.urls import reverse
from django.utils.html import format_html
from wagtail import hooks
from wagtail.admin.menu import MenuItem
from wagtail.admin.site_summary import SummaryItem
from wagtail.snippets.models import register_snippet
from wagtail.snippets.views.snippets import SnippetViewSet
from .models import Booking, BlockedTimeSlot


class BookingViewSet(SnippetViewSet):
    model = Booking
    icon = "date"
    menu_label = "Онлайн-записи"
    menu_name = "bookings"
    menu_order = 150
    add_to_admin_menu = True

    inspect_view_enabled = True
    copy_view_enabled = True

    list_display = [
        "id",
        "client_name",
        "client_phone",
        "service_name",
        "booking_date",
        "booking_time",
        "status_badge",
        "created_at",
    ]
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


class AddBookingMenuItem(MenuItem):
    def is_shown(self, request):
        return request.user.is_authenticated


@hooks.register("register_admin_menu_item")
def register_add_booking_menu_item():
    url = reverse("wagtailsnippets_bookings_booking:add")
    return AddBookingMenuItem(
        "➕ Новая запись",
        url,
        icon_name="plus",
        order=160,
    )


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
            "url": reverse("wagtailsnippets_bookings_booking:list"),
            "add_url": reverse("wagtailsnippets_bookings_booking:add"),
        }


@hooks.register("construct_homepage_summary_items")
def add_bookings_summary_item(request, items):
    items.append(BookingsSummaryItem(request))
