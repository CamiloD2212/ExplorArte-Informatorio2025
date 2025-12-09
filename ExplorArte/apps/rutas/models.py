from django.db import models
from django.contrib.auth.models import User
from apps.arte.models import Arte

class Ruta(models.Model):
    nombre = models.CharField(max_length=150)
    descripcion = models.TextField(blank=True, null=True)
    creador = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

    # Una ruta puede incluir muchos artes
    artes = models.ManyToManyField(Arte, related_name="rutas")

    # Lugar de destino principal (opcional)
    latitud = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitud = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)

    def __str__(self):
        return self.nombre
