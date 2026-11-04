export class SumaAView {
    constructor(contenedor) {
        this.contenedor = contenedor;
    }

    renderPregunta(datos) {
        const operacion = document.createElement("div");
        operacion.classList.add("operacion");

        const filaAcarreos = this.crearFilaAcarreos(datos.cantidadDigitosOperandos);

        const filaSumandoA = this.crearFilaSumando(
            datos.sumandoA,
            datos.cantidadDigitosOperandos
        );

        const filaSumandoB = this.crearFilaSumando(
            datos.sumandoB,
            datos.cantidadDigitosOperandos
        );

        filaSumandoB.classList.add("fila-separador");

        const filaResultado = this.crearFilaResultado(datos.cantidadDigitosResultado);

        // Agregar columna adicional a cada fila
        filaAcarreos.prepend(this.crearCeldaVacia());
        filaSumandoA.prepend(this.crearCeldaVacia());
        filaSumandoB.prepend(this.crearCelda("+"));
        if (datos.cantidadDigitosResultado <= datos.cantidadDigitosOperandos) {
            filaResultado.prepend(this.crearCeldaVacia());
        }

        const botonRevisar = this.crearBotonRevisar();

        operacion.append(
            filaAcarreos,
            filaSumandoA,
            filaSumandoB,
            filaResultado,
            botonRevisar
        );

        this.contenedor.replaceChildren(operacion);
    }

    crearFilaAcarreos(cantidadDigitos) {
        const fila = document.createElement("div");
        fila.classList.add("fila", "fila-acarreos");

        for (let i = 0; i < cantidadDigitos; i++) {
            const esExtremo = i === 0 || i === cantidadDigitos - 1;

            if (esExtremo) {
                fila.append(this.crearCeldaVacia());
            } else {
                fila.append(this.crearInput("acarreo", i));
            }
        }

        return fila;
    }

    crearFilaSumando(sumando, cantidadDigitos) {
        const fila = document.createElement("div");
        fila.classList.add("fila", "fila-sumando");

        const espaciosVacios = cantidadDigitos - sumando.length;

        for (let i = 0; i < espaciosVacios; i++) {
            fila.append(this.crearCeldaVacia());
        }

        sumando.forEach(digito => {
            fila.append(this.crearCelda(digito));
        });

        return fila;
    }

    crearFilaResultado(cantidadDigitos) {
        const fila = document.createElement("div");
        fila.classList.add("fila", "fila-resultado");

        for (let i = 0; i < cantidadDigitos; i++) {
            fila.append(this.crearInput("digito", i));
        }

        return fila;
    }

    crearCelda(valor) {
        const celda = document.createElement("div");
        celda.classList.add("celda");

        const texto = document.createElement("span");
        texto.textContent = valor;

        celda.append(texto);

        return celda;
    }

    crearCeldaVacia() {
        const celda = document.createElement("div");
        celda.classList.add("celda", "celda-vacia");

        return celda;
    }

    crearInput(tipo, indice) {
        const input = document.createElement("input");

        input.type = "text";
        input.inputMode = "numeric";
        input.maxLength = 1;

        input.dataset.indice = indice;

        input.classList.add("form-control", tipo, "respuesta");

        return input;
    }

    renderSolucion(datos) {
        // Implementaremos posteriormente.
    }

    crearBotonRevisar() {
        const boton = document.createElement("button");

        boton.type = "button";
        boton.textContent = "Revisar";

        boton.classList.add(
            "btn",
            "btn-primary",
            "mt-3",
            "btn-revisar"
        );

        return boton;
    }
}