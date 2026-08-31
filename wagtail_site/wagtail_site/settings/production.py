from .base import *

DEBUG = False
SECRET_KEY = "django-insecure-2pcbd$mn24k@d0@x9p2n02ht*52^ov6#g7)ea8u_fg@4c)a+8#"
WAGTAILADMIN_BASE_URL = "https://tochkabatumi.ge"

ALLOWED_HOSTS = [
    "tochkabatumi.ge",
    "www.tochkabatumi.ge",
    "72.56.65.153",
    "37.252.22.92",
    "127.0.0.1",
    "localhost",
]

CSRF_TRUSTED_ORIGINS = [
    "https://tochkabatumi.ge",
    "https://www.tochkabatumi.ge",
    "http://tochkabatumi.ge",
    "http://www.tochkabatumi.ge",
]

from django.contrib.staticfiles.storage import ManifestStaticFilesStorage


class NonStrictManifestStaticFilesStorage(ManifestStaticFilesStorage):
    manifest_strict = False


STORAGES = {
    "default": {
        "BACKEND": "django.core.files.storage.FileSystemStorage",
    },
    "staticfiles": {
        "BACKEND": "wagtail_site.settings.production.NonStrictManifestStaticFilesStorage",
    },
}

try:
    from .local import *
except ImportError:
    pass

