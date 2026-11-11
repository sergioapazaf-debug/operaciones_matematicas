export class DivisionAView {

    constructor(datos) {
        this.dividendo = datos.dividendo;
        this.divisor = datos.divisor;
        this.cantidadCifras = String(datos.dividendo).length;
        this.cantidadCifrasCociente = String(datos.cociente).length;
        this.elemento = null;
        this.onConsultar = () => { };
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

        // Contenedor del botón
        const contenedorBoton = document.createElement("div");
        contenedorBoton.classList.add("contenedor-boton");

        // Botón consultar
        const botonConsultar = document.createElement("button");
        botonConsultar.type = "button";
        botonConsultar.classList.add("btn", "btn-primary");
        botonConsultar.textContent = "Consultar";
        botonConsultar.addEventListener("click", () => {
            this.onConsultar();
        });

        contenedorBoton.append(botonConsultar);

        // Agregar elementos
        operacion.append(seccionDividendo, seccionDivisor);

        const contenedorOperacion = document.createElement("div");
        contenedorOperacion.classList.add("contenedor-operacion");

        contenedorOperacion.append(operacion, contenedorBoton);

        this.elemento = contenedorOperacion;
        return this.elemento;
    }

    obtenerProcedimientos() {
        const procedimientos = [];

        const filas = this.elemento.querySelectorAll(".fila-procedimiento");

        filas.forEach(fila => {
            const valores = [...fila.querySelectorAll("input")]
                .filter(input => !input.classList.contains("invisible"))
                .map(input => input.value);

            procedimientos.push(valores);
        });

        return procedimientos;
    }

    obtenerCociente() {
        return [...this.elemento.querySelectorAll(".input-cociente")]
            .map(input => input.value);
    }

    obtenerProcedimientos() {
        const procedimientos = [];

        const filas = this.elemento.querySelectorAll(".fila-procedimiento");

        filas.forEach(fila => {
            const valores = [...fila.querySelectorAll("input")]
                .map(input => input.value);

            procedimientos.push(valores);
        });

        return procedimientos;
    }

    asignarEventoConsultar(callback) {
        this.onConsultar = callback;
    }

    marcarCociente(resultados) {
        const entradas = this.elemento.querySelectorAll(".input-cociente");

        entradas.forEach((input, indice) => {
            input.classList.remove("correcto", "incorrecto");

            input.classList.add(
                resultados[indice] ? "correcto" : "incorrecto"
            );
        });
    }

    marcarProcedimientos(resultados) {
        const filas = this.elemento.querySelectorAll(".fila-procedimiento");

        filas.forEach((fila, indiceFila) => {
            const entradas = fila.querySelectorAll("input");

            entradas.forEach((input, indiceColumna) => {
                input.classList.remove("correcto", "incorrecto");

                if (input.classList.contains("invisible")) return;

                input.classList.add(
                    resultados[indiceFila][indiceColumna]
                        ? "correcto"
                        : "incorrecto"
                );
            });
        });
    }
}