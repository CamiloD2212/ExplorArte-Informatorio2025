from django.db import models
from django.contrib.auth.models import AbstractUser, PermissionsMixin
from django.conf import settings # para que funcione el modelo de autenticación modificado

# Create your models here.

class Usuarios(AbstractUser, PermissionsMixin):
    
    
    avatar = models.CharField(max_length=250)
    es_publico = models.BooleanField(default=True)
    es_colaborador = models.BooleanField(default=False)
    

    groups = models.ManyToManyField(
        'auth.Group',  # Modelo relacionado: auth.Group
        blank=True,
        related_name='usuarios_group_set'  # Puedes cambiar 'usuarios_group_set' por el nombre que prefieras
    )

    user_permissions = models.ManyToManyField(
        'auth.Permission',  # Modelo relacionado: auth.Permission
        blank=True,
        related_name='usuarios_permission_set'  # Puedes cambiar 'usuarios_permission_set' por el nombre que prefieras
    )

    def __str__(self):
        return self.username

