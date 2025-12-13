from django.db.models.signals import post_migrate
from django.dispatch import receiver
from django.contrib.auth.models import Group, Permission
from django.contrib.contenttypes.models import ContentType
from apps.comentarios.models import Comentario


@receiver(post_migrate)
def crear_roles_y_permisos(sender, **kwargs):
    if sender.label != "usuarios":
        return

    miembro, _ = Group.objects.get_or_create(name="Miembro")
    colaborador, _ = Group.objects.get_or_create(name="Colaborador")

    ct_comentarios = ContentType.objects.get_for_model(Comentario)

    permisos = Permission.objects.filter(content_type=ct_comentarios)

    for permiso in permisos:
        miembro.permissions.add(permiso)
        colaborador.permissions.add(permiso)

    print("✔ Roles y permisos actualizados")
