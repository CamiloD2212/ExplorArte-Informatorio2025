from django.db.models.signals import post_migrate
from django.dispatch import receiver
from django.contrib.auth.models import Group, Permission
from django.contrib.contenttypes.models import ContentType

@receiver(post_migrate)
def crear_roles_y_permisos(sender, **kwargs):
    if sender.label != "usuarios":
        return

    miembro, _ = Group.objects.get_or_create(name="Miembro")
    colaborador, _ = Group.objects.get_or_create(name="Colaborador")

    ct_comentarios = ContentType.objects.get(app_label="comentarios", model="comentario")

    permisos = Permission.objects.filter(content_type=ct_comentarios)

    # Asignar todos los permisos de comentario a los dos roles
    for permiso in permisos:
        miembro.permissions.add(permiso)
        colaborador.permissions.add(permiso)

    print("✔ Roles y permisos actualizados")
