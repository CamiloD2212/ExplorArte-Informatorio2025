from django.contrib.auth.models import Group, Permission
from django.db.models.signals import post_migrate
from django.dispatch import receiver

@receiver(post_migrate)
def create_roles(sender, **kwargs):
    if sender.name not in ["usuarios", "arte"]:
        return

    grupos = ["Visitante", "Miembro", "Colaborador"]
    for rol in grupos:
        Group.objects.get_or_create(name=rol)

    miembro = Group.objects.get(name="Miembro")
    colaborador = Group.objects.get(name="Colaborador")

    permisos_comentarios = Permission.objects.filter(
        codename__contains="comentario"
    )
    miembro.permissions.set(permisos_comentarios)

    permisos_arte = Permission.objects.filter(
        content_type__app_label="arte"
    )
    colaborador.permissions.set(permisos_arte)
