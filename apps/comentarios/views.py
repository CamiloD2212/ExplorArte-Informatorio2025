from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib import messages

from apps.arte.models import Arte
from .models import Comentario
from .forms import ComentarioForm


@login_required
def agregar_comentario(request, arte_id):
    arte = get_object_or_404(Arte, id=arte_id)

    # Verificar permiso
    if not request.user.has_perm("comentarios.add_comentario"):
        messages.error(request, "No tienes permiso para comentar.")
        return redirect(request.META.get("HTTP_REFERER", "/"))

    if request.method == "POST":
        form = ComentarioForm(request.POST)
        if form.is_valid():
            comentario = form.save(commit=False)
            comentario.usuario = request.user
            comentario.arte = arte
            comentario.save()

            messages.success(request, "Comentario agregado correctamente.")
            return redirect(request.META.get("HTTP_REFERER", "/"))

    return redirect(request.META.get("HTTP_REFERER", "/"))


@login_required
def editar_comentario(request, comentario_id):
    comentario = get_object_or_404(Comentario, id=comentario_id)

    
    if request.user != comentario.usuario:
        messages.error(request, "Solo podés editar tus propios comentarios.")
        return redirect(f"/arte/{comentario.arte.id}/")


    if request.method == "GET":
        prev_url = request.META.get("HTTP_REFERER", f"/arte/{comentario.arte.id}/")
        request.session["prev_url_edit"] = prev_url

    if request.method == "POST":
        form = ComentarioForm(request.POST, instance=comentario)
        if form.is_valid():
            form.save()
            messages.success(request, "Comentario actualizado correctamente.")
            return redirect(request.session.get("prev_url_edit", f"/arte/{comentario.arte.id}/"))

    else:
        form = ComentarioForm(instance=comentario)

    return render(request, "comentarios/editar.html", {
        "form": form,
        "comentario": comentario
    })



@login_required
def eliminar_comentario(request, comentario_id):
    comentario = get_object_or_404(Comentario, id=comentario_id)

    # Autor puede eliminar
    # Admin elimina todo
    if request.user != comentario.usuario and not request.user.is_superuser:
        messages.error(request, "No tienes permiso para eliminar este comentario.")
        return redirect(request.META.get("HTTP_REFERER", "/"))

    comentario.delete()
    messages.success(request, "Comentario eliminado correctamente.")
    return redirect(request.META.get("HTTP_REFERER", "/"))
