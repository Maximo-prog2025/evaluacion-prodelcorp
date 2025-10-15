// Lista de correos permitidos
const usuariosPermitidos = [
  "xxmaxponcep@gmail.com",
  "xxconsulbf12@gmail.com",
  "xxginamu@gmail.com"
];

// Función que se ejecuta cuando el usuario inicia sesión con Google
function handleCredentialResponse(response) {
  const data = parseJwt(response.credential);
  const email = data.email;

  if (usuariosPermitidos.includes(email)) {
    // Guardamos el usuario en sessionStorage
    sessionStorage.setItem("usuarioAutenticado", email);
    window.location.href = "index.html"; // redirige al examen
  } else {
    alert("Acceso denegado: " + email + " no tiene permisos.");
  }
}

// Decodificar el token de Google para leer el email
function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  return JSON.parse(jsonPayload);
}

// Verifica si el usuario está autenticado
function verificarAcceso() {
  const user = sessionStorage.getItem("usuarioAutenticado");
  if (!user) {
    window.location.href = "login.html";
  }
}
