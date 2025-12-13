document.addEventListener("DOMContentLoaded", function () {
    const map = L.map('map').setView([-27.451389, -58.986667], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
        .addTo(map);

    const drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    const drawControl = new L.Control.Draw({
        edit: { featureGroup: drawnItems },
        draw: { 
            polyline: true,
            polygon: false,
            circle: false,
            marker: false,
            rectangle: false,
        }
    });

    map.addControl(drawControl);

    // Campo hidden donde guardamos el GeoJSON
    const geoInput = document.getElementById("id_recorrido");

    // --- Si hay un GeoJSON guardado, cargarlo en el mapa ---
    if (geoInput.value) {
        try {
            const geo = JSON.parse(geoInput.value);
            const layer = L.geoJSON(geo);
            layer.eachLayer(l => drawnItems.addLayer(l));
            map.fitBounds(layer.getBounds());
        } catch (e) {
            console.error("Error cargando GeoJSON:", e);
        }
    }

    // --- Guardar nuevo dibujo ---
    map.on(L.Draw.Event.CREATED, function (e) {
        drawnItems.clearLayers(); // Solo permitimos 1 línea
        drawnItems.addLayer(e.layer);

        const geo = drawnItems.toGeoJSON();
        geoInput.value = JSON.stringify(geo);
    });

    // --- Guardar edición ---
    map.on(L.Draw.Event.EDITED, function () {
        const geo = drawnItems.toGeoJSON();
        geoInput.value = JSON.stringify(geo);
    });
});
