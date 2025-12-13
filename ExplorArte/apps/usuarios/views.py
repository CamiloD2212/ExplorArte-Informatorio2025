from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import Group
from django.contrib import messages

def registrar_usuario(request):
    if request.method == "POST":
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()

            # Agregar al grupo Miembro
            grupo_miembro = Group.objects.get(name="Miembro")
            user.groups.add(grupo_miembro)

            messages.success(request, "Registro exitoso. Ahora puedes iniciar sesión.")
            return redirect("login")
    else:
        form = UserCreationForm()

    return render(request, "usuarios/registro.html", {"form": form})
