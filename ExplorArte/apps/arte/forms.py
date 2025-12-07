from django import forms
from .models import Arte
from .widgets import LeafletWidget

class ArteForm(forms.ModelForm):
    class Meta:
        model = Arte
        fields = "__all__"
        widgets = {
            "ubicacion": LeafletWidget(),
        }
