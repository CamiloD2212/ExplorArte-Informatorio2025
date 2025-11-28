ExplorArte – Informatorio 2025
------------------------------------
ExplorArte es un blog dedicado a descubrir, recorrer y contar las historias detrás de las esculturas.

-------------------------------------------------------
1. CREAR ENTORNO VIRTUAL
-------------------------------------------------------

PowerShell / CMD:
    python -m venv .venv

Git Bash:
    python -m venv .venv


-------------------------------------------------------
2. ACTIVAR ENTORNO VIRTUAL
(Asegurarse de estar en el directorio donde está .venv)
-------------------------------------------------------

PowerShell / CMD:
    .venv\Scripts\Activate

Git Bash:
    source .venv/Scripts/activate


-------------------------------------------------------
3. INSTALAR DEPENDENCIAS
-------------------------------------------------------

    pip install -r requirements.txt


-------------------------------------------------------
4. CONFIGURAR VARIABLES DE ENTORNO
-------------------------------------------------------

Renombrar el archivo:
    .env.example  -->  .env

Editar el archivo .env con los datos de tu base MySQL:
    DB_NAME=tu_db
    DB_USER=tu_usuario
    DB_PASSWORD=tu_password
    DB_HOST=127.0.0.1
    DB_PORT=3306


-------------------------------------------------------
5. APLICAR MIGRACIONES
(Ubicación: mismo nivel donde está manage.py)
-------------------------------------------------------

    python manage.py makemigrations
    python manage.py migrate


-------------------------------------------------------
6. CREAR USUARIO ADMINISTRADOR
-------------------------------------------------------

    python manage.py createsuperuser

Recomendación para pruebas:
    Usuario: root
    Email: root@email.com
    Contraseña: root

Django mostrará una advertencia sobre la similitud entre usuario y contraseña.
Responder "y" para confirmar.


-------------------------------------------------------
7. EJECUTAR EL SERVIDOR
-------------------------------------------------------

    python manage.py runserver

Abrir el panel admin desde:
    http://127.0.0.1:8000/admin



-------------------------------------------------------
NOTAS IMPORTANTES
-------------------------------------------------------

- Recordá activar el entorno virtual antes de trabajar.
- Verificá que MySQL esté corriendo antes de ejecutar el servidor.
- Si hay errores de migraciones, probar nuevamente:
      python manage.py migrate



