from django.contrib import admin
from .models import Ruta, RutaArte

class RutaArteInline(admin.TabularInline):
    model = RutaArte
    extra = 1
    autocomplete_fields = ["arte"]
    ordering = ["orden"]

@admin.register(Ruta)
class RutaAdmin(admin.ModelAdmin):
    list_display = ("nombre", "creador")
    inlines = [RutaArteInline]

admin.site.register(RutaArte)
