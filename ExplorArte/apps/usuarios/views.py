from django.shortcuts import render
from django.contrib.auth.models import Group
from django.contrib.auth import login
from django.shortcuts import render, redirect
from .forms import RegistroForm, UsuariosForm, LoginForm

def register_view(request):
    
    if request.method == 'POST':
        form = UsuariosForm(request.POST)     # Procesa el formulario si se envió una solicitud POST
        
        if form.is_valid():

            user = form.save()                 # Almacena el usuario en la db

            if user is not None:
                login(request, user)           # Se loguea el usuario recién creado
                return redirect("blog:index")  # Se redirecciona al index
        
    else:
        form = UsuariosForm()
        print(form.errors)            # Si el formulario no es válido, se mostrará con los mensajes de error
    return render(request, 'register.html', {'form': form})

