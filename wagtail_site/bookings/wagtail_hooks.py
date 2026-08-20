from wagtail.snippets.views.snippets import SnippetViewSet
from wagtail.snippets.models import register_snippet
from wagtail.admin.panels import FieldPanel, MultiFieldPanel
from .models import Booking


class BookingViewSet(SnippetViewSet):
    model = Booking
    icon = "date"
    menu_label = "Онлайн-записи"
    menu_name = "bookings"
    menu_order = 200
    add_to_admin_menu = True

    list_display = [
        "id",
        "client_name",
        "client_phone",
        "service_name",
        "booking_date",
        "status_badge",
        "created_at",
    ]
    list_filter = ["status", "booking_date", "service"]
    search_fields = ["client_name", "client_phone", "client_email", "notes", "service_name"]

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
            heading="Данные клиента",
        ),
        MultiFieldPanel(
            [
                FieldPanel("service"),
                FieldPanel("service_name"),
                FieldPanel("booking_date"),
                FieldPanel("booking_time"),
            ],
            heading="Детали процедуры",
        ),
        MultiFieldPanel(
            [
                FieldPanel("notes"),
            ],
            heading="Пожелания клиента",
        ),
    ]


register_snippet(BookingViewSet)
