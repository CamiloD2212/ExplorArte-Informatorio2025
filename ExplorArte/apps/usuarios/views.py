from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from django.contrib import messages

def registrar_usuario(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, "¡Tu cuenta fue creada con éxito!")
            return redirect('login')
    else:
        form = UserCreationForm()

    return render(request, 'usuarios/registro.html', {'form': form})
