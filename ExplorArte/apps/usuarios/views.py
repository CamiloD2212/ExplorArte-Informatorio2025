from django.shortcuts import render
from django.contrib.auth.models import Group
from django.contrib.auth import login
from django.shortcuts import render, redirect
from .forms import RegistroForm

def registrar_usuario(request):
    if request.method == "POST":
        form = RegistroForm(request.POST)
        if form.is_valid():
            usuario = form.save()
            grupo = Group.objects.get(name="Miembro")
            usuario.groups.add(grupo)
            login(request, usuario)
            return redirect('home')
    else:
        form = RegistroForm()
    return render(request, "usuarios/registro.html", {"form": form})

