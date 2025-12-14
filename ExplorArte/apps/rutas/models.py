from django.db import models
from django.contrib.auth.models import User
from apps.arte.models import Arte

class Ruta(models.Model):
    nombre = models.CharField(max_length=150)
    descripcion = models.TextField(blank=True, null=True)
    creador = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

    artes = models.ManyToManyField(
        Arte,
        through="RutaArte",
        related_name="rutas"
    )

    def __str__(self):
        return self.nombre


class RutaArte(models.Model):
    ruta = models.ForeignKey(Ruta, on_delete=models.CASCADE)
    arte = models.ForeignKey(Arte, on_delete=models.CASCADE)
    orden = models.PositiveIntegerField()

    class Meta:
        ordering = ["orden"]

    def __str__(self):
        return f"{self.ruta.nombre} - {self.orden} - {self.arte.titulo}"
