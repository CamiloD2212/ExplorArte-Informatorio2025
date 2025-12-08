from django.urls import reverse_lazy
from django.shortcuts import render
from django.views.generic import ListView, DetailView
from .models import Arte
from .forms import ArteForm

class ArteListView(ListView):
    model = Arte
    template_name = "arte/list.html"
    context_object_name = "artes"

class ArteDetailView(DetailView):
    model = Arte
    template_name = "arte/detail.html"
    context_object_name = "arte"

def home(request):
    return render(request, "home.html")

def mapa_general(request):
    obras = Arte.objects.all()
    return render(request, "arte/mapa_general.html", {"obras": obras})