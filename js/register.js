// Elementos del DOM
const nombre = document.getElementById("nombre");
const apellidoPaterno = document.getElementById("apellidoPaterno");
const apellidoMaterno = document.getElementById("apellidoMaterno");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const rol = document.getElementById("rol");
const registerForm = document.getElementById("registerForm");
const mensajeDiv = document.getElementById("mensaje");

// Elementos de requisitos de contraseña
const reqLength = document.getElementById("reqLength");
const reqUpperLower = document.getElementById("reqUpperLower");
const reqNumber = document.getElementById("reqNumber");
const reqSpecial = document.getElementById("reqSpecial");

// ========== FUNCIONES DE VALIDACIÓN ==========

// Función para validar la fortaleza de la contraseña
function validatePasswordStrength(password) {
    let isValid = true;
    
    // 1. Mínimo 8 caracteres
    const hasMinLength = password.length >= 8;
    updateRequirement(reqLength, hasMinLength, "Mínimo 8 caracteres");
    if (!hasMinLength) isValid = false;
    
    // 2. Mayúsculas y minúsculas
    const hasBothCases = /[A-Z]/.test(password) && /[a-z]/.test(password);
    updateRequirement(reqUpperLower, hasBothCases, "Mayúsculas y minúsculas");
    if (!hasBothCases) isValid = false;
    
    // 3. Al menos un número
    const hasNumber = /[0-9]/.test(password);
    updateRequirement(reqNumber, hasNumber, "Al menos un número");
    if (!hasNumber) isValid = false;
    
    // 4. Al menos un símbolo especial
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    updateRequirement(reqSpecial, hasSpecial, "Al menos un símbolo especial");
    if (!hasSpecial) isValid = false;
    
    return isValid;
}

// Función auxiliar para actualizar requisitos visuales
function updateRequirement(element, isValid, text) {
    if (isValid) {
        element.classList.add("valid");
        element.innerHTML = `✅ ${text}`;
    } else {
        element.classList.remove("valid");
        element.innerHTML = `❌ ${text}`;
    }
}

// Función para resetear los requisitos visuales
function resetRequirements() {
    reqLength.classList.remove("valid");
    reqUpperLower.classList.remove("valid");
    reqNumber.classList.remove("valid");
    reqSpecial.classList.remove("valid");
    reqLength.innerHTML = "❌ Mínimo 8 caracteres";
    reqUpperLower.innerHTML = "❌ Mayúsculas y minúsculas";
    reqNumber.innerHTML = "❌ Al menos un número";
    reqSpecial.innerHTML = "❌ Al menos un símbolo especial";
}

// Función para obtener nombre completo
function getNombreCompleto() {
    const nombreValue = nombre.value.trim();
    const apellidoPaternoValue = apellidoPaterno.value.trim();
    const apellidoMaternoValue = apellidoMaterno.value.trim();
    
    let nombreCompleto = nombreValue;
    if (apellidoPaternoValue) nombreCompleto += " " + apellidoPaternoValue;
    if (apellidoMaternoValue) nombreCompleto += " " + apellidoMaternoValue;
    
    return nombreCompleto;
}

// ========== GESTIÓN DE USUARIOS ==========

// Cargar usuarios existentes del localStorage
let users = JSON.parse(localStorage.getItem("users")) || [
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

// Guardar usuarios en localStorage
function saveUsers() {
    localStorage.setItem("users", JSON.stringify(users));
}

// ========== EVENT LISTENERS ==========

// Validación en tiempo real
password.addEventListener("input", function() {
    validatePasswordStrength(password.value);
});

// Submit del formulario
registerForm.addEventListener("submit", function (e) {
    e.preventDefault();
    
    // Limpiar mensajes anteriores
    mensajeDiv.classList.remove("exito", "error");
    
    // Obtener valores
    const nombreValue = nombre.value.trim();
    const apellidoPaternoValue = apellidoPaterno.value.trim();
    const apellidoMaternoValue = apellidoMaterno.value.trim();
    const userEmail = email.value.trim();
    const userPassword = password.value;
    const userConfirmPassword = confirmPassword.value;
    const userRol = rol.value;
    
    // Validar campos vacíos
    if (nombreValue === "" || apellidoPaternoValue === "" || apellidoMaternoValue === "" || 
        userEmail === "" || userPassword === "" || userConfirmPassword === "") {
        showMessage("❌ Por favor, completa todos los campos", "error");
        return;
    }
    
    // Validar que solo contenga letras y espacios (sin números ni caracteres especiales)
    const nameRegex = /^[a-zA-ZáéíóúñÑÁÉÍÓÚ\s]+$/;
    if (!nameRegex.test(nombreValue)) {
        showMessage("❌ El nombre solo puede contener letras", "error");
        return;
    }
    if (!nameRegex.test(apellidoPaternoValue)) {
        showMessage("❌ El apellido paterno solo puede contener letras", "error");
        return;
    }
    if (!nameRegex.test(apellidoMaternoValue)) {
        showMessage("❌ El apellido materno solo puede contener letras", "error");
        return;
    }
    
    // ========== FASE 4: VALIDACIÓN DE CONTRASEÑA SEGURA ==========
    if (userPassword.length < 8) {
        showMessage("❌ La contraseña debe tener al menos 8 caracteres", "error");
        return;
    }
    
    if (!/[A-Z]/.test(userPassword) || !/[a-z]/.test(userPassword)) {
        showMessage("❌ La contraseña debe contener mayúsculas y minúsculas", "error");
        return;
    }
    
    if (!/[0-9]/.test(userPassword)) {
        showMessage("❌ La contraseña debe contener al menos un número", "error");
        return;
    }
    
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(userPassword)) {
        showMessage("❌ La contraseña debe contener al menos un símbolo especial", "error");
        return;
    }
    
    // Validar que las contraseñas coincidan
    if (userPassword !== userConfirmPassword) {
        showMessage("❌ Las contraseñas no coinciden", "error");
        return;
    }
    
    // Validar email único
    if (users.find(u => u.email === userEmail)) {
        showMessage("❌ Este correo electrónico ya está registrado", "error");
        return;
    }
    
    // ========== CREAR NUEVO USUARIO ==========
    const nombreCompleto = getNombreCompleto();
    
    const newUser = {
        nombre: nombreValue,
        apellidoPaterno: apellidoPaternoValue,
        apellidoMaterno: apellidoMaternoValue,
        nombreCompleto: nombreCompleto,
        email: userEmail,
        password: userPassword,
        rol: userRol
    };
    
    users.push(newUser);
    saveUsers();
    
    // ========== FASE 5: MENSAJE SEGÚN ROL ==========
    if (userRol === "admin") {
        showMessage(`✅ ¡Bienvenido Administrador ${nombreCompleto}! Registro exitoso. Serás redirigido al panel de control.`, "exito");
    } else {
        showMessage(`✅ ¡Bienvenido Usuario ${nombreCompleto}! Registro exitoso. Serás redirigido al panel de usuario.`, "exito");
    }
    
    // Limpiar formulario
    registerForm.reset();
    resetRequirements();
    
    // Redirigir después de 2.5 segundos
    setTimeout(() => {
        window.location.href = "./index.html";
    }, 2500);
});

// Función auxiliar para mostrar mensajes
function showMessage(text, type) {
    mensajeDiv.textContent = text;
    mensajeDiv.classList.add(type);
}