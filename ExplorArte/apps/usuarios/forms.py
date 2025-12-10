from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.models import User
from .models import Usuarios



class RegistroForm(UserCreationForm):
    email = forms.EmailField(required=True)

    class Meta:
        model = User
        fields = ("username", "email", "password1", "password2")


class UsuariosForm(UserCreationForm):
    
    def __init__(self, *args, **kwargs):            # Estas lineas de código borran las helps que
        super().__init__(*args, **kwargs)           # dejan feo el formulario
        self.fields['username'].help_text = None 
        self.fields['password1'].help_text = None
        self.fields['password2'].help_text = None
    class Meta:
        model = Usuarios
        fields = ['username','email','first_name', 'last_name']

class LoginForm(AuthenticationForm):
    # Este formulario hereda de AuthenticationForm, por lo que no es necesario agregar campos adicionales.
    # Es solo para importar el formulario y usarlo en las views
    pass


class PermisosUsuarioForm(forms.ModelForm):
    class Meta:
        model = Usuarios
        fields = ['es_publico', 'es_colaborador', 'is_staff']