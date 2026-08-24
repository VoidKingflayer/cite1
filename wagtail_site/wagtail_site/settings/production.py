from .base import *

DEBUG = False
SECRET_KEY = "django-insecure-2pcbd$mn24k@d0@x9p2n02ht*52^ov6#g7)ea8u_fg@4c)a+8#"
WAGTAILADMIN_BASE_URL = "https://tochkabatumi.ge"

ALLOWED_HOSTS = [
    "tochkabatumi.ge",
    "www.tochkabatumi.ge",
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

# ManifestStaticFilesStorage is recommended in production, to prevent
# outdated JavaScript / CSS assets being served from cache
# (e.g. after a Wagtail upgrade).
# See https://docs.djangoproject.com/en/6.1/ref/contrib/staticfiles/#manifeststaticfilesstorage
STORAGES["staticfiles"]["BACKEND"] = "django.contrib.staticfiles.storage.ManifestStaticFilesStorage"

try:
    from .local import *
except ImportError:
    pass

