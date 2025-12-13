from django.shortcuts import render, get_object_or_404, redirect
from .models import Arte, Categoria, Artista
# Ruta model está en apps.rutas
from apps.rutas.models import Ruta
from django.db.models import Count, Q
from django.contrib import messages
from datetime import datetime
import json

def parse_latlng(text):
    """
    Si `text` tiene formato "lat,lng" devuelve (float(lat), float(lng)),
    sino devuelve None.
    """
    if not text:
        return None
    try:
        parts = text.split(',')
        if len(parts) >= 2:
            lat = float(parts[0].strip())
            lng = float(parts[1].strip())
            return (lat, lng)
    except Exception:
        return None
    return None

def index(request):
    # últimas 3 obras
    ultimas = Arte.objects.select_related('categoria', 'artista').order_by('-id')[:3]

    # preparar markers para map (tratamos de extraer coordenadas desde arte.ubicacion)
    markers = []
    for a in Arte.objects.all():
        coord = parse_latlng(a.ubicacion)
        if coord:
            markers.append({
                "id": a.id,
                "titulo": a.titulo,
                "lat": coord[0],
                "lng": coord[1],
            })

    context = {
        "ultimas": ultimas,
        "markers": markers,
    }
    return render(request, "index.html", context)

def categorias(request):
    todas = Categoria.objects.all()
    artistas = Artista.objects.all()

    # categorías seleccionadas por GET ?cat=1&cat=2
    seleccionadas = request.GET.getlist('cat')
    orden = request.GET.get('orden', 'recientes')
    filtro_artista = request.GET.get('artista', '')

    artes = Arte.objects.select_related('categoria', 'artista').all()

    if seleccionadas:
        # filtros por FK categoria (tu modelo tiene FK simple, no M2M)
        artes = artes.filter(categoria_id__in=seleccionadas)

    if filtro_artista:
        # buscar por artista id o por nombre parcial
        artes = artes.filter(Q(artista__id=filtro_artista) | Q(artista__nombre__icontains=filtro_artista) | Q(artista__apellido__icontains=filtro_artista))

    if orden == 'recientes':
        artes = artes.order_by('-fecha_creacion', '-id')
    elif orden == 'antiguos':
        artes = artes.order_by('fecha_creacion', 'id')
    elif orden == 'az':
        artes = artes.order_by('titulo')
    elif orden == 'za':
        artes = artes.order_by('-titulo')

    # contadores por categoría para panel 'acerca' o sidebar si querés
    contadores = Arte.objects.values('categoria__nombre', 'categoria').annotate(total=Count('id')).order_by('-total')

    # markers para mapa (como en index)
    markers = []
    for a in artes:
        coord = parse_latlng(a.ubicacion)
        if coord:
            markers.append({
                "id": a.id,
                "titulo": a.titulo,
                "lat": coord[0],
                "lng": coord[1],
                "url_imagen": a.url_imagen.url if a.url_imagen else "",
            })

    context = {
        "categorias": todas,
        "artes": artes,
        "seleccionadas": list(map(int, seleccionadas)) if seleccionadas else [],
        "orden": orden,
        "artistas": artistas,
        "filtro_artista": filtro_artista,
        "contadores": contadores,
        "markers": markers,
    }
    return render(request, "categorias.html", context)

import json

def rutas_view(request):
    rutas = Ruta.objects.all()
    selected_id = request.GET.get('ruta')
    selected = None
    artes = Arte.objects.none()
    recorrido_json = "[]"

    if selected_id:
        try:
            selected = rutas.get(id=selected_id)
            artes = selected.artes.all()

            raw = selected.recorrido or "[]"

            # Mostrar en consola del servidor para debug
            print("RAW RECORRIDO BD:", raw)

            # Caso 1 → ya es JSON válido
            try:
                recorrido_data = json.loads(raw)
            except json.JSONDecodeError:
                # Caso 2 → viene entre comillas simples ' ... '
                fixed = raw.strip()

                if fixed.startswith("'") and fixed.endswith("'"):
                    fixed = fixed[1:-1]  # quitar comillas externas

                # reemplazar comillas simples internas
                fixed = fixed.replace("'", '"')

                try:
                    recorrido_data = json.loads(fixed)
                except:
                    recorrido_data = []

            print("RECORRIDO FINAL:", recorrido_data)

            recorrido_json = json.dumps(recorrido_data)

        except Ruta.DoesNotExist:
            selected = None

    # MARKERS
    markers = []
    source_arts = artes if selected else Arte.objects.all()
    for a in source_arts:
        coord = parse_latlng(a.ubicacion)
        if coord:
            markers.append({"titulo": a.titulo, "lat": coord[0], "lng": coord[1], "url_imagen": a.url_imagen.url if a.url_imagen else ""})

    context = {
        "rutas": rutas,
        "selected": selected,
        "artes": artes,
        "markers": json.dumps(markers),
        "recorrido_json": recorrido_json,
    }

    return render(request, "rutas.html", context)


def acerca(request):
    # texto estático + contadores por categoría
    contadores = Arte.objects.values('categoria__id', 'categoria__nombre').annotate(total=Count('id')).order_by('-total')
    equipo = [
        {"nombre": "Agustín Valdez", "linkedin": "https://www.linkedin.com/in/agustin", "git": "https://github.com/agustin"},
        # agregá más miembros si querés
    ]
    total_artes = Arte.objects.count()

    context = {
        "contadores": contadores,
        "equipo": equipo,
        "total_artes": total_artes,
    }
    return render(request, "acerca.html", context)

def contacto(request):
    if request.method == "POST":
        # capturamos datos (aquí podés integrar envio de mail)
        nombre = request.POST.get("nombre")
        email = request.POST.get("email")
        asunto = request.POST.get("asunto")
        mensaje = request.POST.get("mensaje")
        # por ahora solo mostramos un mensaje y no enviamos mail real
        messages.success(request, "Gracias. Tu mensaje fue recibido.")
        return redirect('arte:contacto')

    return render(request, "contacto.html")

def detalle_arte(request, pk):
    arte = get_object_or_404(Arte.objects.select_related('categoria', 'artista'), pk=pk)
    coord = parse_latlng(arte.ubicacion)
    context = {
        "arte": arte,
        "coord": coord,
    }
    return render(request, "arte/detalle.html", context)
