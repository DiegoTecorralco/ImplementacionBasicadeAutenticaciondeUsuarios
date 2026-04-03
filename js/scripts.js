const email = document.getElementById("email");
const password = document.getElementById("password");
const loginForm = document.getElementById("loginForm");
const mensajeDiv = document.getElementById("mensaje");

// Usuarios por defecto con la estructura COMPLETA
const usuariosPorDefecto = [
    { 
        email: "admin@test.com", 
        password: "Admin123!", 
        rol: "admin", 
        nombre: "Administrador",
        apellidoPaterno: "Del",
        apellidoMaterno: "Sistema",
        nombreCompleto: "Administrador Del Sistema"
    },
    { 
        email: "user@test.com", 
        password: "User2024$", 
        rol: "usuario", 
        nombre: "Usuario",
        apellidoPaterno: "Normal",
        apellidoMaterno: "Estándar",
        nombreCompleto: "Usuario Normal Estándar"
    }
];

// Cargar usuarios del localStorage o crear los de defecto
let users = JSON.parse(localStorage.getItem("users"));

// Si no hay usuarios en localStorage, guardar los de defecto
if (!users) {
    users = usuariosPorDefecto;
    localStorage.setItem("users", JSON.stringify(users));
} else {
    // Verificar que los usuarios existentes tengan nombreCompleto
    let necesitaActualizacion = false;
    users = users.map(user => {
        if (!user.nombreCompleto) {
            necesitaActualizacion = true;
            // Buscar si es uno de los usuarios por defecto
            const usuarioDefecto = usuariosPorDefecto.find(u => u.email === user.email);
            if (usuarioDefecto) {
                return { ...user, ...usuarioDefecto };
            } else {
                // Para usuarios registrados que no tengan nombreCompleto
                return {
                    ...user,
                    nombre: user.nombre || user.email.split('@')[0],
                    apellidoPaterno: user.apellidoPaterno || "",
                    apellidoMaterno: user.apellidoMaterno || "",
                    nombreCompleto: user.nombreCompleto || user.nombre || user.email.split('@')[0]
                };
            }
        }
        return user;
    });
    
    // Si se actualizaron usuarios, guardar los cambios
    if (necesitaActualizacion) {
        localStorage.setItem("users", JSON.stringify(users));
    }
}

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    mensajeDiv.classList.remove("exito", "error");
    
    const userEmail = email.value.trim();
    const userPassword = password.value;
    
    if (userEmail === "" || userPassword === "") {
        mensajeDiv.textContent = "❌ Por favor, completa todos los campos";
        mensajeDiv.classList.add("error");
        return;
    }
    
    const usuario = users.find(u => u.email === userEmail && u.password === userPassword);
    
    if (usuario) {
        console.log("Usuario encontrado:", usuario); // Para depuración
        console.log("nombreCompleto:", usuario.nombreCompleto); // Para depuración
        
        if (usuario.rol === "admin") {
            mensajeDiv.textContent = `✅ Acceso completo - Bienvenido Administrador ${usuario.nombreCompleto || usuario.nombre || "Admin"}`;
            mensajeDiv.classList.add("exito");
        } else if (usuario.rol === "usuario") {
            mensajeDiv.textContent = `✅ Acceso limitado - Bienvenido Usuario ${usuario.nombreCompleto || usuario.nombre || "Usuario"}`;
            mensajeDiv.classList.add("exito");
        } else {
            mensajeDiv.textContent = "✅ Acceso concedido - Rol no identificado";
            mensajeDiv.classList.add("exito");
        }
        
        localStorage.setItem("currentUser", JSON.stringify(usuario));
    } else {
        mensajeDiv.textContent = "❌ Credenciales incorrectas. Verifica tu email y contraseña";
        mensajeDiv.classList.add("error");
    }
});