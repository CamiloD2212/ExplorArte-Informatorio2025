from django.urls import path
from .views import agregar_comentario, editar_comentario, eliminar_comentario

urlpatterns = [
    path("agregar/<int:arte_id>/", agregar_comentario, name="agregar_comentario"),
    path("editar/<int:comentario_id>/", editar_comentario, name="editar_comentario"),
    path("eliminar/<int:comentario_id>/", eliminar_comentario, name="eliminar_comentario"),
]
