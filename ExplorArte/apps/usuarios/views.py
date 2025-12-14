from django.shortcuts import render, redirect
from django.contrib.auth.models import Group
from django.contrib import messages
from .forms import RegistroForm   # 👈 IMPORTANTE

def registrar_usuario(request):
    if request.method == "POST":
        form = RegistroForm(request.POST)   # 👈 usar RegistroForm
        if form.is_valid():
            user = form.save()

            grupo_miembro = Group.objects.get(name="Miembro")
            user.groups.add(grupo_miembro)

            messages.success(request, "Registro exitoso. Ahora puedes iniciar sesión.")
            return redirect("login")
    else:
        form = RegistroForm()   # 👈 usar RegistroForm

    return render(request, "usuarios/registro.html", {"form": form})
