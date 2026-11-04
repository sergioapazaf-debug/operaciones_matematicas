import { SumaAModel } from "../models/addition/sumaAModel.js";

// Helper para comparar arrays
function assertArrayEqual(actual, esperado, mensaje) {
    console.assert(
        JSON.stringify(actual) === JSON.stringify(esperado),
        `${mensaje}. Esperado: ${JSON.stringify(esperado)}, obtenido: ${JSON.stringify(actual)}`
    );
}

// =====================================
// Pruebas de sumarDigitos()
// =====================================

const modelo = new SumaAModel(2, 3);

let resultado = modelo.sumarDigitos(2, 3);

console.assert(resultado.resultado === 5, "2 + 3: resultado incorrecto");
console.assert(resultado.acarreo === 0, "2 + 3: acarreo incorrecto");


resultado = modelo.sumarDigitos(7, 3);

console.assert(resultado.resultado === 0, "7 + 3: resultado incorrecto");
console.assert(resultado.acarreo === 1, "7 + 3: acarreo incorrecto");


resultado = modelo.sumarDigitos(4, 7, 1);

console.assert(resultado.resultado === 2, "4 + 7 + 1: resultado incorrecto");
console.assert(resultado.acarreo === 1, "4 + 7 + 1: acarreo incorrecto");


resultado = modelo.sumarDigitos(9, 9, 1);

console.assert(resultado.resultado === 9, "9 + 9 + 1: resultado incorrecto");
console.assert(resultado.acarreo === 1, "9 + 9 + 1: acarreo incorrecto");


resultado = modelo.sumarDigitos(9, 9, 9);

console.assert(resultado.resultado === 7, "9 + 9 + 9: resultado incorrecto");
console.assert(resultado.acarreo === 2, "9 + 9 + 9: acarreo incorrecto");


// =====================================
// Pruebas de descomponer()
// =====================================

assertArrayEqual(modelo.descomponer(342), [3, 4, 2], "Descomposición de 342");


// =====================================
// Pruebas de calcularOperacion()
// =====================================

const suma1 = new SumaAModel(342, 279);

console.assert(suma1.sumaTotal === 621, "342 + 279: sumaTotal incorrecta");

assertArrayEqual(
    suma1.resultadoDescompuesto,
    [6, 2, 1],
    "342 + 279: resultado descompuesto incorrecto"
);

assertArrayEqual(
    suma1.acarreosCorrectos,
    [0, 1, 1],
    "342 + 279: acarreos incorrectos"
);


const suma2 = new SumaAModel(342, 9);

console.assert(suma2.sumaTotal === 351, "342 + 9: sumaTotal incorrecta");

assertArrayEqual(
    suma2.resultadoDescompuesto,
    [3, 5, 1],
    "342 + 9: resultado descompuesto incorrecto"
);

assertArrayEqual(
    suma2.acarreosCorrectos,
    [0, 0, 1],
    "342 + 9: acarreos incorrectos"
);

const suma3 = new SumaAModel(999, 1);

console.assert(suma3.sumaTotal === 1000, "999 + 1: sumaTotal incorrecta");

assertArrayEqual(
    suma3.resultadoDescompuesto,
    [1, 0, 0, 0],
    "999 + 1: resultado descompuesto incorrecto"
);

assertArrayEqual(
    suma3.acarreosCorrectos,
    [1, 1, 1],
    "999 + 1: acarreos incorrectos"
);

const suma4 = new SumaAModel(123, 456);

assertArrayEqual(
    suma4.resultadoDescompuesto,
    [5, 7, 9],
    "123 + 456: resultado descompuesto incorrecto"
);

assertArrayEqual(
    suma4.acarreosCorrectos,
    [0, 0, 0],
    "123 + 456: acarreos incorrectos"
);

console.log("Pruebas finalizadas. Revisa la consola por posibles errores.");

