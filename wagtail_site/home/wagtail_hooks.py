from django.urls import reverse
from django.utils.html import format_html
from wagtail import hooks
from wagtail.admin.menu import MenuItem
from home.models import HomePage


class EditHomePageMenuItem(MenuItem):
    def is_shown(self, request):
        return request.user.is_authenticated


@hooks.register("register_admin_menu_item")
def register_edit_home_page_menu_item():
    home_page = HomePage.objects.filter(slug="home").first()
    if home_page:
        url = reverse("wagtailadmin_pages:edit", args=[home_page.id])
    else:
        url = reverse("wagtailadmin_explore_root")
    return EditHomePageMenuItem("✏️ Главная страница", url, icon_name="home", order=10)
