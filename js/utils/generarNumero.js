export function generarNumeros(cantidad, min, max) {
    const numeros = [];

    for (let i = 0; i < cantidad; i++) {
        const numero = Math.floor(Math.random() * (max - min + 1)) + min;
        numeros.push(numero);
    }

    numeros.sort((a, b) => String(b).length - String(a).length);

    return numeros;
}