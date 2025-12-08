from django.contrib import admin
from django.urls import path, include
from apps.arte.views import home 
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("", home, name="home"),   # <---- Home
    path("admin/", admin.site.urls),
    path("arte/", include("apps.arte.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
