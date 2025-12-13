from django.contrib import admin
from django import forms
import json
from .models import Ruta

class RutaAdminForm(forms.ModelForm):
    class Meta:
        model = Ruta
        fields = '__all__'
        widgets = {
            'recorrido': forms.HiddenInput(),
            'inicio_lat': forms.HiddenInput(),
            'inicio_lng': forms.HiddenInput(),
            'fin_lat': forms.HiddenInput(),
            'fin_lng': forms.HiddenInput(),
        }

class RutaAdmin(admin.ModelAdmin):
    form = RutaAdminForm
    
    def changeform_view(self, request, object_id=None, form_url='', extra_context=None):
        extra_context = extra_context or {}

        if object_id:
            ruta = Ruta.objects.get(pk=object_id)
            try:
                extra_context["recorrido_json"] = json.loads(ruta.recorrido) if ruta.recorrido else []
            except json.JSONDecodeError:
                extra_context["recorrido_json"] = []
        else:
            extra_context["recorrido_json"] = []

        return super().changeform_view(request, object_id, form_url, extra_context)

    def save_model(self, request, obj, form, change):
        obj.recorrido = request.POST.get("recorrido") or "[]"
        obj.inicio_lat = request.POST.get("inicio_lat") or None
        obj.inicio_lng = request.POST.get("inicio_lng") or None
        obj.fin_lat = request.POST.get("fin_lat") or None
        obj.fin_lng = request.POST.get("fin_lng") or None

        super().save_model(request, obj, form, change)

admin.site.register(Ruta, RutaAdmin)
