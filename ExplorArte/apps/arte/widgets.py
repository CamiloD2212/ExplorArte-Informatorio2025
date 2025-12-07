from django import forms
from django.utils.safestring import mark_safe

class LeafletWidget(forms.TextInput):
    template_name = "widgets/leaflet_widget.html"

    class Media:
        css = {
            "all": (
                "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",
            )
        }
        js = (
            "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js",
        )

    def format_value(self, value):
        # El valor viene como "POINT(lng lat)" → hay que convertirlo
        if value and value.startswith("POINT"):
            value = value.replace("POINT(", "").replace(")", "")
            lng, lat = value.split()
            return f"{lat},{lng}"  # formato para HTML
        return value
