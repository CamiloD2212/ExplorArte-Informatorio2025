from django.urls import path
from . import views

app_name = "arte"

urlpatterns = [
    path('', views.index, name='index'),
    path('categorias/', views.categorias, name='categorias'),
    path('rutas/', views.rutas_view, name='rutas'),
    path('acerca/', views.acerca, name='acerca'),
    path('contacto/', views.contacto, name='contacto'),
    # detalle de obra
    path('arte/<int:pk>/', views.detalle_arte, name='detalle_arte'),
]
