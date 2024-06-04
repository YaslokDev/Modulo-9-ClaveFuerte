interface ValidacionClave {
  esValida: boolean;
  error?: string;
}

const commonPasswords: string[] = [
  "password",
  "123456",
  "qwerty",
  "admin",
  "letmein",
  "welcome",
  "monkey",
  "sunshine",
  "password1",
  "123456789",
  "football",
  "iloveyou",
  "1234567",
  "123123",
  "12345678",
  "abc123",
  "qwerty123",
  "1q2w3e4r",
  "baseball",
  "password123",
  "superman",
  "987654321",
  "mypass",
  "trustno1",
  "hello123",
  "dragon",
  "1234",
  "555555",
  "loveme",
  "hello",
  "hockey",
  "letmein123",
  "welcome123",
  "mustang",
  "shadow",
  "12345",
  "passw0rd",
  "abcdef",
  "123abc",
  "football123",
  "master",
  "jordan23",
  "access",
  "flower",
  "qwertyuiop",
  "admin123",
  "iloveyou123",
  "welcome1",
  "monkey123",
  "sunshine1",
  "password12",
  "1234567890",
];

// Verificar si tiene mayúsculas y minúsculas
const tieneMayusculasYMinusculas = (clave: string): ValidacionClave => {
  const tieneMayusculas = /[A-Z]/.test(clave);
  const tieneMinusculas = /[a-z]/.test(clave);

  if (tieneMayusculas && tieneMinusculas) {
    return { esValida: true };
  } else {
    return { esValida: false, error: "La clave debe de tener mayúsculas y minúsculas" };
  }
};

// Verificar si tiene números
const tieneNumeros = (clave: string): ValidacionClave => {
  if (/\d/.test(clave)) {
    return { esValida: true };
  } else {
    return { esValida: false, error: "La clave debe de tener números" };
  }
};

// Verificar caracteres especiales
const tieneCaracteresEspeciales = (clave: string): ValidacionClave => {
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(clave)) {
    return { esValida: true };
  } else {
    return { esValida: false, error: "La clave debe de tener caracteres especiales" };
  }
};

// Verificar longitud mínima
const tieneLongitudMinima = (clave: string): ValidacionClave => {
  if (clave.length >= 8) {
    return { esValida: true };
  } else {
    return { esValida: false, error: "La clave debe de tener una longitud mínima de 8 caracteres" };
  }
};

// Verificar si la contraseña contiene el nombre de usuario
const tieneNombreUsuario = (nombreUsuario: string, clave: string): ValidacionClave => {
  if (clave.toLowerCase().includes(nombreUsuario.toLowerCase())) {
    return { esValida: false, error: "La clave no debe tener el nombre del usuario" };
  } else {
    return { esValida: true };
  }
};

// Verificar palabras comunes
const tienePalabrasComunes = (clave: string, commonPasswords: string[]): ValidacionClave => {
  const claveMinuscula = clave.toLowerCase();
  for (const palabra of commonPasswords) {
    if (claveMinuscula.includes(palabra.toLowerCase())) {
      return { esValida: false, error: "La clave no debe de contener palabras comunes" };
    }
  }
  return { esValida: true };
};

// Validación de contraseña
const validarClave = (nombreUsuario: string, clave: string, commonPasswords: string[]): ValidacionClave => {
  const validaciones = [
    tieneMayusculasYMinusculas(clave),
    tieneNumeros(clave),
    tieneCaracteresEspeciales(clave),
    tieneLongitudMinima(clave),
    tieneNombreUsuario(nombreUsuario, clave),
    tienePalabrasComunes(clave, commonPasswords),
  ];

  const validacionFallida = validaciones.find((validacion) => !validacion.esValida);

  if (validacionFallida) {
    return { esValida: false, error: validacionFallida.error };
  } else {
    return { esValida: true };
  }
};

// PRUEBAS
const nombreUsuario = "Pedrito";
const clave = "Hola123@";

const resultadoValidacion = validarClave(nombreUsuario, clave, commonPasswords);

if (resultadoValidacion.esValida) {
  console.log("La contraseña es válida");
} else {
  console.log("La contraseña no es válida:", resultadoValidacion.error);
}
