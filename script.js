function mostrarMensaje() {
  alert("Usted es un bobo hp, No tengo el conocimiento  para esto care monda,bien estupido como se le va a olvidar");
}



class Usuario {
  constructor(nombre, contraseña) {
      this.nombre = nombre;
      this.contraseña = contraseña;
  }
}

class SistemaUsuarios {
  constructor() {
      // Cargar usuarios desde localStorage al iniciar la clase
      this.usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
      this.usuarioActual = null;
  }

  guardarUsuarios() {
      // Guardar la lista de usuarios en localStorage
      localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
  }

  registrar(nombre, contraseña) {
      const usuarioExistente = this.usuarios.find(usuario => usuario.nombre === nombre);
      if (!usuarioExistente) {
          this.usuarios.push(new Usuario(nombre, contraseña));
          this.guardarUsuarios(); // Guardar usuarios en localStorage
          alert('Registro exitoso');
          window.location.href = 'index.html'; // Redirige a la página de inicio de sesión
      } else {
          alert('El usuario ya existe');
      }
  }

  iniciarSesion(nombre, contraseña) {
      const usuario = this.usuarios.find(usuario => usuario.nombre === nombre && usuario.contraseña === contraseña);
      if (usuario) {
          this.usuarioActual = usuario;
          localStorage.setItem('usuarioActual', JSON.stringify(usuario)); // Guardar usuario actual en localStorage
          window.location.href = 'pagina-principal.html'; // Redirige a la página principal
      } else {
          alert('Usuario o contraseña incorrectos');
      }
  }

  cerrarSesion() {
      this.usuarioActual = null;
      localStorage.removeItem('usuarioActual'); // Eliminar el usuario actual de localStorage
      window.location.href = 'index.html'; // Redirige a la página de inicio de sesión
  }
}

const sistemaUsuarios = new SistemaUsuarios();

// Eventos de Registro
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('register-btn')) {
    document.getElementById('register-btn').addEventListener('click', (event) => {
      event.preventDefault(); // Evita el comportamiento predeterminado de enviar el formulario
      const nombre = document.getElementById('register-username').value;
      const contraseña = document.getElementById('register-password').value;
      if (nombre && contraseña) {
        sistemaUsuarios.registrar(nombre, contraseña);
      } else {
        alert('Por favor, completa todos los campos');
      }
    });
  }

  // Eventos de Inicio de Sesión
  if (document.getElementById('login-btn')) {
    document.getElementById('login-btn').addEventListener('click', (event) => {
      event.preventDefault();
      const nombre = document.getElementById('login-username').value;
      const contraseña = document.getElementById('login-password').value;
      if (nombre && contraseña) {
        sistemaUsuarios.iniciarSesion(nombre, contraseña);
      } else {
        alert('Por favor, completa todos los campos');
      }
    });
  }

  // Evento de Cerrar Sesión
  if (document.getElementById('logout-btn')) {
    document.getElementById('logout-btn').addEventListener('click', () => {
      sistemaUsuarios.cerrarSesion();
    });
  }
});


