document.addEventListener('DOMContentLoaded', function () {


    var map = L.map('map').setView([-27.451389, -58.986667], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);

    let puntos = [];

    let polyline = L.polyline([], { color: 'blue' }).addTo(map);

    map.on('click', function(e) {

        puntos.push([e.latlng.lat, e.latlng.lng]);
        polyline.setLatLngs(puntos);

        // Guardar en el hidden
        document.querySelector("#id_recorrido").value = JSON.stringify(puntos);

        // Inicio
        if (puntos.length === 1) {
            document.querySelector("#id_punto_inicio_lat").value = e.latlng.lat;
            document.querySelector("#id_punto_inicio_lng").value = e.latlng.lng;
        }

        // Fin
        document.querySelector("#id_punto_fin_lat").value = e.latlng.lat;
        document.querySelector("#id_punto_fin_lng").value = e.latlng.lng;
    });
});
