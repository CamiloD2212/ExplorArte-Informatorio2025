from django import forms
from .models import Ruta

class RutaForm(forms.ModelForm):
    class Meta:
        model = Ruta
        fields = '__all__'
        widgets = {
            'recorrido': forms.HiddenInput(),
            'punto_inicio_lat': forms.HiddenInput(),
            'punto_inicio_lng': forms.HiddenInput(),
            'punto_fin_lat': forms.HiddenInput(),
            'punto_fin_lng': forms.HiddenInput(),
        }
