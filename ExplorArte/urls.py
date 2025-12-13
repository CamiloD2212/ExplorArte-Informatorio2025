from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.auth import views as auth_views 
from apps.usuarios.views import registrar_usuario

urlpatterns = [
    path('admin/', admin.site.urls),

    # URLs de la app arte
    path('', include('apps.arte.urls', namespace='arte')),

    # LOGIN y LOGOUT
    path('login/', auth_views.LoginView.as_view(template_name='usuarios/login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('register/', registrar_usuario, name='register'),

    #comentarios
    path("comentarios/", include("apps.comentarios.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
