from django.db import models
from django.contrib.auth.models import User
from apps.arte.models import Arte

class Comentario(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    arte = models.ForeignKey(Arte, on_delete=models.CASCADE, related_name="comentarios")
    contenido = models.TextField()
    fecha = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Comentario de {self.usuario.username} en {self.arte.titulo}"
