export class DivisionAView {

    constructor(datos) {
        this.dividendo = datos.dividendo;
        this.divisor = datos.divisor;
        this.cantidadCifras = String(datos.dividendo).length;
        this.cantidadCifrasCociente = String(datos.cociente).length;
    }

    render() {
        const operacion = document.createElement("div");
        operacion.classList.add("operacion", "division");

        const seccionDividendo = document.createElement("div");
        seccionDividendo.classList.add("seccion-dividendo");

        const seccionDivisor = document.createElement("div");
        seccionDivisor.classList.add("seccion-divisor");

        // Cifras del dividendo
        const cifrasDividendo = document.createElement("div");
        cifrasDividendo.classList.add("cifras-dividendo");

        for (const cifra of String(this.dividendo)) {
            const span = document.createElement("span");
            span.textContent = cifra;
            cifrasDividendo.append(span);
        }

        seccionDividendo.append(cifrasDividendo);

        // Matriz triangular de procedimientos
        const matriz = document.createElement("div");
        matriz.classList.add("matriz-procedimientos");

        for (let fila = 0; fila < this.cantidadCifras; fila++) {
            const filaMatriz = document.createElement("div");
            filaMatriz.classList.add("fila-procedimiento");

            for (let columna = 0; columna < this.cantidadCifras; columna++) {
                const input = document.createElement("input");
                input.type = "text";
                input.maxLength = 1;
                input.classList.add("form-control", "input-procedimiento");

                // Ocultar casillas conservando su espacio
                if (columna < fila) {
                    input.classList.add("invisible");
                }

                filaMatriz.append(input);
            }

            matriz.append(filaMatriz);
        }

        seccionDividendo.append(matriz);

        // Divisor
        const cifraDivisor = document.createElement("span");
        cifraDivisor.classList.add("cifra-divisor");
        cifraDivisor.textContent = this.divisor;

        // Línea divisoria
        const linea = document.createElement("div");
        linea.classList.add("linea-division");

        // Entradas del cociente
        const entradasCociente = document.createElement("div");
        entradasCociente.classList.add("entradas-cociente");

        for (let i = 0; i < this.cantidadCifrasCociente; i++) {
            const input = document.createElement("input");
            input.type = "text";
            input.maxLength = 1;
            input.classList.add("form-control", "input-cociente");

            entradasCociente.append(input);
        }

        seccionDivisor.append(cifraDivisor, linea, entradasCociente);

        operacion.append(seccionDividendo, seccionDivisor);

        return operacion;
    }

}