from django.urls import path
from . import views

app_name = "arte"

urlpatterns = [
    path('', views.index, name='index'),

    path('categorias/', views.categorias, name='categorias'),
    path('rutas/', views.rutas_view, name='rutas'),
    path('acerca/', views.acerca, name='acerca'),
    path('contacto/', views.contacto, name='contacto'),

    # CRUD Arte
    path('arte/<int:pk>/', views.detalle_arte, name='detalle_arte'),
    path('arte/nuevo/', views.crear_arte, name='crear_arte'),

    # Crear Artista y Categoría
    path('crear-artista/', views.crear_artista, name='crear_artista'),
    path('crear-categoria/', views.crear_categoria, name='crear_categoria'),

    path('arte/editar/<int:pk>/', views.editar_arte, name='editar_arte'),
    path('arte/borrar/<int:pk>/', views.borrar_arte, name='borrar_arte'),


    # # Galería (AJAX)
    # path('upload-imagen/', views.upload_imagen, name='upload_imagen'),
    # path('delete-imagen/', views.delete_imagen, name='delete_imagen'),
]

