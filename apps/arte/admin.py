from django.contrib import admin
from .models import Categoria, Artista, Arte
from .forms import ArteForm

admin.site.register(Categoria)
admin.site.register(Artista)


@admin.register(Arte)
class ArteAdmin(admin.ModelAdmin):
    form = ArteForm

