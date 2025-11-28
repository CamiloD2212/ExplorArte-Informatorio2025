from django.contrib import admin
# Register your models here.
from .models import Categoria, Artista, Arte

admin.site.register(Categoria)
admin.site.register(Artista)
admin.site.register(Arte)