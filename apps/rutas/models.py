from django.db import models
from django.contrib.auth.models import User
from apps.arte.models import Arte
import json

class Ruta(models.Model):
    nombre = models.CharField(max_length=150)
    descripcion = models.TextField(blank=True, null=True)
    creador = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

    artes = models.ManyToManyField(Arte, related_name="rutas")

    recorrido = models.TextField(null=True, blank=True)

    inicio_lat = models.FloatField(blank=True, null=True)
    inicio_lng = models.FloatField(blank=True, null=True)
    fin_lat = models.FloatField(blank=True, null=True)
    fin_lng = models.FloatField(blank=True, null=True)

    def save(self, *args, **kwargs):
        if self.recorrido:
            try:
                geo = json.loads(self.recorrido)
                coords = geo["features"][0]["geometry"]["coordinates"]

                start = coords[0]
                end = coords[-1]

                self.inicio_lng = start[0]
                self.inicio_lat = start[1]
                self.fin_lng = end[0]
                self.fin_lat = end[1]

            except Exception:
                pass

        super().save(*args, **kwargs)

    def __str__(self):
        return self.nombre
