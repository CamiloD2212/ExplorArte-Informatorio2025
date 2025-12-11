from django.shortcuts import render, get_object_or_404, redirect
from django.http import JsonResponse
from django.contrib import messages
from django.conf import settings
from django.db.models import Count, Q
from django.contrib.auth.decorators import login_required, user_passes_test

from .models import Arte, Categoria, Artista
from .forms import ArteForm
from apps.rutas.models import Ruta


# ========================================
#   PERMISOS
# ========================================
def es_admin_o_colaborador(user):
    return user.is_staff or user.groups.filter(name="Colaborador").exists()


# ========================================
#   CREAR ARTE (VERSIÓN SIMPLE)
# ========================================
@login_required
@user_passes_test(es_admin_o_colaborador)
def crear_arte(request):

    if request.method == "POST":
        form = ArteForm(request.POST, request.FILES)

        if form.is_valid():
            arte = form.save()
            return redirect("arte:categorias")
        else:
            print("ERRORES:", form.errors)

    else:
        form = ArteForm()

    return render(request, "arte/crear_arte.html", {
        "form": form,
    })


# ========================================
#   CREAR ARTISTA
# ========================================
@login_required
@user_passes_test(es_admin_o_colaborador)
def crear_artista(request):
    if request.method == "POST":
        Artista.objects.create(
            nombre=request.POST["nombre"],
            apellido=request.POST["apellido"]
        )
        return redirect("arte:crear_arte")


# ========================================
#   CREAR CATEGORÍA
# ========================================
@login_required
@user_passes_test(es_admin_o_colaborador)
def crear_categoria(request):
    if request.method == "POST":
        Categoria.objects.create(nombre=request.POST["nombre"])
        return redirect("arte:crear_arte")


# ========================================
#   FUNCIONES AUXILIARES
# ========================================
def parse_latlng(text):
    if not text:
        return None
    try:
        lat, lng = text.split(",")
        return float(lat.strip()), float(lng.strip())
    except:
        return None


# ========================================
#   VISTAS PRINCIPALES
# ========================================
def index(request):
    ultimas = Arte.objects.select_related('categoria', 'artista').order_by('-id')[:3]

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

    return render(request, "index.html", {
        "ultimas": ultimas,
        "markers": markers,
    })


def categorias(request):
    todas = Categoria.objects.all()
    artistas = Artista.objects.all()

    seleccionadas = request.GET.getlist('cat')
    orden = request.GET.get('orden', 'recientes')
    filtro_artista = request.GET.get('artista', '')

    artes = Arte.objects.select_related('categoria', 'artista').all()

    if seleccionadas:
        artes = artes.filter(categoria_id__in=seleccionadas)

    if filtro_artista:
        artes = artes.filter(
            Q(artista__id=filtro_artista) |
            Q(artista__nombre__icontains=filtro_artista) |
            Q(artista__apellido__icontains=filtro_artista)
        )

    if orden == 'recientes':
        artes = artes.order_by('-fecha_creacion', '-id')
    elif orden == 'antiguos':
        artes = artes.order_by('fecha_creacion', 'id')
    elif orden == 'az':
        artes = artes.order_by('titulo')
    elif orden == 'za':
        artes = artes.order_by('-titulo')

    markers = []
    for a in artes:
        coord = parse_latlng(a.ubicacion)
        if coord:
            markers.append({
                "id": a.id,
                "titulo": a.titulo,
                "lat": coord[0],
                "lng": coord[1],
            })

    return render(request, "categorias.html", {
        "categorias": todas,
        "artes": artes,
        "seleccionadas": list(map(int, seleccionadas)) if seleccionadas else [],
        "orden": orden,
        "artistas": artistas,
        "filtro_artista": filtro_artista,
        "markers": markers,
        "puede_agregar": request.user.is_staff or request.user.groups.filter(name="Colaborador").exists(),
    })


def rutas_view(request):
    rutas = Ruta.objects.all()
    selected_id = request.GET.get('ruta')
    artes = Arte.objects.none()
    selected = None

    if selected_id:
        try:
            selected = rutas.get(id=selected_id)
            artes = selected.artes.select_related('categoria', 'artista').all()
        except Ruta.DoesNotExist:
            pass

    source = artes if selected else Arte.objects.all()

    markers = []
    for a in source:
        coord = parse_latlng(a.ubicacion)
        if coord:
            markers.append({
                "id": a.id,
                "titulo": a.titulo,
                "lat": coord[0],
                "lng": coord[1],
            })

    return render(request, "rutas.html", {
        "rutas": rutas,
        "selected": selected,
        "artes": artes,
        "markers": markers
    })


def acerca(request):
    contadores = Arte.objects.values(
        'categoria__id', 'categoria__nombre'
    ).annotate(total=Count('id')).order_by('-total')

    equipo = [{"nombre": "Agustín Valdez", "linkedin": "#", "git": "#"}]
    total_artes = Arte.objects.count()

    return render(request, "acerca.html", {
        "contadores": contadores,
        "equipo": equipo,
        "total_artes": total_artes,
    })


def contacto(request):
    if request.method == "POST":
        messages.success(request, "Gracias. Tu mensaje fue recibido.")
        return redirect('arte:contacto')

    return render(request, "contacto.html")


def detalle_arte(request, pk):
    arte = get_object_or_404(Arte.objects.select_related('categoria', 'artista'), pk=pk)
    coord = parse_latlng(arte.ubicacion)
    return render(request, "arte/detalle.html", {"arte": arte, "coord": coord})
