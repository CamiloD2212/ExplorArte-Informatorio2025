from django.forms import widgets
from django.utils.safestring import mark_safe
import json

class RutaMapWidget(widgets.Textarea):
    template_name = "rutas/ruta_map_widget.html"

    class Media:
        css = {
            "all": [
                "https://unpkg.com/leaflet@1.7.1/dist/leaflet.css",
            ]
        }
        js = [
            "https://unpkg.com/leaflet@1.7.1/dist/leaflet.js",
        ]

    # Convierte Python → JSON para ponerlo en la plantilla
    def format_value(self, value):
        if not value:
            return "[]"
        if isinstance(value, str):
            return value  # ya es JSON
        return json.dumps(value)

    # Render del widget usando template
    def render(self, name, value, attrs=None, renderer=None):
        value_json = self.format_value(value)

        # Aseguramos el textarea oculto con el JSON
        final_html = super().render(name, value_json, attrs, renderer)

        # Agregamos el contenedor del mapa
        mapa_html = """
            <div id="map" style="height: 500px; margin-bottom: 20px; border: 1px solid #ccc;"></div>
            <button type="button" id="clear-map" class="button delete-button">
                Borrar recorrido
            </button>
            <script>
                (function() {
                    let map = L.map('map').setView([-34.6, -58.45], 12);

                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        maxZoom: 19
                    }).addTo(map);

                    const textarea = document.getElementById('{id}');
                    let recorrido = [];

                    // Si hay datos previos, cargarlos
                    try {
                        recorrido = JSON.parse(textarea.value);
                    } catch(e) {
                        recorrido = [];
                    }

                    let markers = [];
                    let polyline = null;

                    function dibujarRecorrido() {
                        markers.forEach(m => map.removeLayer(m));
                        markers = [];

                        if (polyline) {
                            map.removeLayer(polyline);
                            polyline = null;
                        }

                        if (recorrido.length > 0) {
                            recorrido.forEach(p => {
                                let marker = L.marker([p.lat, p.lng]).addTo(map);
                                markers.push(marker);
                            });

                            let latlngs = recorrido.map(p => [p.lat, p.lng]);
                            polyline = L.polyline(latlngs, {color: 'blue'}).addTo(map);
                            map.fitBounds(polyline.getBounds());
                        }
                    }

                    // Cargar datos existentes al iniciar
                    dibujarRecorrido();

                    // Agregar punto clickeando en el mapa
                    map.on('click', function(e) {
                        let punto = {lat: e.latlng.lat, lng: e.latlng.lng};
                        recorrido.push(punto);
                        textarea.value = JSON.stringify(recorrido);

                        dibujarRecorrido();
                    });

                    // Botón borrar mapa
                    document.getElementById("clear-map").onclick = function() {
                        recorrido = [];
                        textarea.value = "[]";
                        dibujarRecorrido();
                    };

                })();
            </script>
        """.replace("{id}", attrs["id"])

        return mark_safe(final_html + mapa_html)

