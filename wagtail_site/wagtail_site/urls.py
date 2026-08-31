from django.conf import settings
from django.urls import include, path
from django.contrib import admin

from wagtail.admin import urls as wagtailadmin_urls
from wagtail import urls as wagtail_urls
from wagtail.documents import urls as wagtaildocs_urls

from django.http import HttpResponse
from django.views.generic.base import RedirectView
from bookings.views import (
    create_booking_api,
    get_available_slots_api,
    create_certificate_order_api,
    booking_confirmation_view,
)
from bookings.ai_views import (
    telegram_webhook_view,
    whatsapp_webhook_view,
    instagram_webhook_view,
    web_ai_chat_api_view,
    ai_status_api_view,
)
from search import views as search_views

SITEMAP_XML = """<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://tochkabatumi.ge/</loc>
    <lastmod>2026-08-23</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="ru" href="https://tochkabatumi.ge/?lang=ru"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://tochkabatumi.ge/?lang=en"/>
    <xhtml:link rel="alternate" hreflang="ka" href="https://tochkabatumi.ge/?lang=ka"/>
    <xhtml:link rel="alternate" hreflang="tr" href="https://tochkabatumi.ge/?lang=tr"/>
    <xhtml:link rel="alternate" hreflang="ar" href="https://tochkabatumi.ge/?lang=ar"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://tochkabatumi.ge/"/>
  </url>
</urlset>"""


def robots_txt(request):
    lines = [
        "User-agent: *",
        "Allow: /",
        "",
        "Sitemap: https://tochkabatumi.ge/sitemap.xml",
    ]
    return HttpResponse("\n".join(lines), content_type="text/plain; charset=utf-8")


def sitemap_xml(request):
    return HttpResponse(SITEMAP_XML.strip(), content_type="application/xml; charset=utf-8")


urlpatterns = [
    path("googlef25e567605d37c65.html", lambda request: HttpResponse("google-site-verification: googlef25e567605d37c65.html", content_type="text/html")),
    path("yandex_c35989e904dcbc0a.html", lambda request: HttpResponse("<html><head><meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\"></head><body>Verification: c35989e904dcbc0a</body></html>", content_type="text/html; charset=utf-8")),
    path("favicon.ico", RedirectView.as_view(url="/static/home/images/favicon.ico", permanent=True)),
    path("site.webmanifest", RedirectView.as_view(url="/static/home/images/site.webmanifest", permanent=True)),
    path("robots.txt", robots_txt, name="robots_txt"),
    path("sitemap.xml", sitemap_xml, name="sitemap_xml"),
    path("django-admin/", admin.site.urls),
    path("admin/", include(wagtailadmin_urls)),
    path("documents/", include(wagtaildocs_urls)),
    path("search/", search_views.search, name="search"),
    path("api/bookings/", create_booking_api, name="api_bookings"),
    path("api/bookings/create/", create_booking_api, name="api_create_booking"),
    path("api/bookings/available-slots/", get_available_slots_api, name="api_available_slots"),
    path("api/bookings/slots/", get_available_slots_api, name="api_slots"),
    path("api/certificates/order/", create_certificate_order_api, name="api_certificate_order"),
    # Booking Confirmation / Thank You Page (Google Ads, GA4, Meta & Yandex Conversions)
    path("booking/confirmed/", booking_confirmation_view, name="booking_confirmed"),
    path("booking-confirmation/", booking_confirmation_view, name="booking_confirmation_alias"),
    path("booking/success/", booking_confirmation_view, name="booking_success_alias"),
    path("thanks/", booking_confirmation_view, name="booking_thanks_alias"),
    # AI Administrator Multi-Channel Endpoints
    path("api/ai/telegram/webhook/", telegram_webhook_view, name="api_ai_telegram_webhook"),
    path("api/ai/whatsapp/webhook/", whatsapp_webhook_view, name="api_ai_whatsapp_webhook"),
    path("api/whatsapp/webhook/", whatsapp_webhook_view, name="api_whatsapp_webhook_alias"),
    path("api/ai/instagram/webhook/", instagram_webhook_view, name="api_ai_instagram_webhook"),
    path("api/instagram/webhook/", instagram_webhook_view, name="api_instagram_webhook_alias"),
    path("api/ai/chat/", web_ai_chat_api_view, name="api_ai_chat"),
    path("api/ai/status/", ai_status_api_view, name="api_ai_status"),
]


if settings.DEBUG:
    from django.conf.urls.static import static
    from django.contrib.staticfiles.urls import staticfiles_urlpatterns

    # Serve static and media files from development server
    urlpatterns += staticfiles_urlpatterns()
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns = urlpatterns + [
    # For anything not caught by a more specific rule above, hand over to
    # Wagtail's page serving mechanism. This should be the last pattern in
    # the list:
    path("", include(wagtail_urls)),
    # Alternatively, if you want Wagtail pages to be served from a subpath
    # of your site, rather than the site root:
    #    path("pages/", include(wagtail_urls)),
]
