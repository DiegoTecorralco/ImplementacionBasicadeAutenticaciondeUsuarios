const email = document.getElementById("email");
const password = document.getElementById("password");
const loginForm = document.getElementById("loginForm");
const mensajeDiv = document.getElementById("mensaje");

// Cargar usuarios del localStorage
let users = JSON.parse(localStorage.getItem("users")) || [
    { email: "admin@test.com", password: "Admin123!", rol: "admin", fullname: "Administrador" },
    { email: "user@test.com", password: "User2024$", rol: "usuario", fullname: "Usuario Normal" }
];

loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    
    // Limpiar clases anteriores
    mensajeDiv.classList.remove("exito", "error");
    
    const userEmail = email.value.trim();
    const userPassword = password.value;
    
    // Validar campos vacíos
    if (userEmail === "" || userPassword === "") {
        mensajeDiv.textContent = "❌ Por favor, completa todos los campos";
        mensajeDiv.classList.add("error");
        return;
    }
    
    // Buscar usuario
    const usuario = users.find(
        u => u.email === userEmail && u.password === userPassword
    );
    
    if (usuario) {
        // ========== FASE 5: CONTROL DE ACCESO POR ROL ==========
        if (usuario.rol === "admin") {
            mensajeDiv.textContent = "✅ Acceso completo - Bienvenido Administrador";
            mensajeDiv.classList.add("exito");
            // Aquí redirigirías al dashboard de admin
            // window.location.href = "admin-dashboard.html";
        } else if (usuario.rol === "usuario") {
            mensajeDiv.textContent = "✅ Acceso limitado - Bienvenido Usuario";
            mensajeDiv.classList.add("exito");
            // Aquí redirigirías al dashboard de usuario
            // window.location.href = "user-dashboard.html";
        } else {
            mensajeDiv.textContent = "✅ Acceso concedido - Rol no identificado";
            mensajeDiv.classList.add("exito");
        }
        
        // Guardar sesión del usuario
        localStorage.setItem("currentUser", JSON.stringify(usuario));
    } else {
        mensajeDiv.textContent = "❌ Credenciales incorrectas. Verifica tu email y contraseña";
        mensajeDiv.classList.add("error");
    }
});