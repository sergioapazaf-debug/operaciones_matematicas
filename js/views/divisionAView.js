export class DivisionAView {

    constructor(datos) {
        this.dividendo = datos.dividendo;
        this.divisor = datos.divisor;
        this.cantidadCifras = String(datos.dividendo).length;
        this.cantidadCifrasCociente = String(datos.cociente).length;
        this.elemento = null;
        this.onConsultar = () => { };
        this.onGuardarConfiguracion = () => { };
        this.onAbrirConfiguracion = () => { };
        this.modalConfiguracion = null;
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
                input.inputMode = "numeric";
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
            input.inputMode = "numeric";
            input.classList.add("form-control", "input-cociente");

            entradasCociente.append(input);
        }

        seccionDivisor.append(cifraDivisor, linea, entradasCociente);

        // Contenedor del botón
        const contenedorBoton = document.createElement("div");
        contenedorBoton.classList.add("contenedor-boton");
        contenedorBoton.classList.add("d-flex", "gap-2", "justify-content-center");

        // Botón consultar
        const botonConsultar = document.createElement("button");
        botonConsultar.type = "button";
        botonConsultar.classList.add("btn", "btn-primary");
        botonConsultar.textContent = "Consultar";
        botonConsultar.addEventListener("click", () => {
            this.onConsultar();
        });

        // Botón configuración
        const botonConfiguracion = document.createElement("button");
        botonConfiguracion.type = "button";
        botonConfiguracion.classList.add("btn", "btn-secondary");
        botonConfiguracion.textContent = "Configuración";

        botonConfiguracion.addEventListener("click", () => {
            if (!this.modalConfiguracion) {
                this.modalConfiguracion = this.crearModalConfiguracion();

                this.modalConfiguracion.addEventListener("hide.bs.modal", () => {
                    if (this.modalConfiguracion.contains(document.activeElement)) {
                        botonConfiguracion.focus();
                    }
                });

                document.body.append(this.modalConfiguracion);
            }

            this.onAbrirConfiguracion(this.modalConfiguracion);
        });

        contenedorBoton.append(botonConsultar, botonConfiguracion);

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

    crearModalConfiguracion() {
        // Modal
        const modal = document.createElement("div");
        modal.classList.add("modal", "fade");
        modal.tabIndex = -1;

        // Contenedor del diálogo
        const dialogo = document.createElement("div");
        dialogo.classList.add("modal-dialog", "modal-dialog-centered");

        // Contenido
        const contenido = document.createElement("div");
        contenido.classList.add("modal-content");

        // Encabezado
        const encabezado = document.createElement("div");
        encabezado.classList.add("modal-header");

        const titulo = document.createElement("h5");
        titulo.classList.add("modal-title");
        titulo.textContent = "Configuración de la división";

        const botonCerrar = document.createElement("button");
        botonCerrar.type = "button";
        botonCerrar.classList.add("btn-close");
        botonCerrar.setAttribute("data-bs-dismiss", "modal");
        botonCerrar.setAttribute("aria-label", "Cerrar");

        encabezado.append(titulo, botonCerrar);

        // Cuerpo
        const cuerpo = document.createElement("div");
        cuerpo.classList.add("modal-body");

        // Campo: cantidad de cifras del dividendo
        const grupoDividendo = document.createElement("div");
        grupoDividendo.classList.add("mb-3");

        const labelDividendo = document.createElement("label");
        labelDividendo.classList.add("form-label");
        labelDividendo.textContent = "Cifras del dividendo";
        labelDividendo.htmlFor = "digitos-dividendo";

        const inputDividendo = document.createElement("input");
        inputDividendo.type = "number";
        inputDividendo.required = true;
        inputDividendo.id = "digitos-dividendo";
        inputDividendo.classList.add("form-control");
        inputDividendo.inputMode = "numeric";
        inputDividendo.min = 2;
        inputDividendo.max = 10;
        inputDividendo.step = 1;
        inputDividendo.placeholder = "Ej. 6";

        grupoDividendo.append(labelDividendo, inputDividendo);

        // Campo: cantidad de cifras del divisor
        const grupoDivisor = document.createElement("div");
        grupoDivisor.classList.add("mb-3");

        const labelDivisor = document.createElement("label");
        labelDivisor.classList.add("form-label");
        labelDivisor.textContent = "Cifras del divisor";
        labelDivisor.htmlFor = "digitos-divisor";

        const inputDivisor = document.createElement("input");
        inputDivisor.type = "number";
        inputDivisor.required = true;
        inputDivisor.id = "digitos-divisor";
        inputDivisor.classList.add("form-control");
        inputDivisor.inputMode = "numeric";
        inputDivisor.min = 1;
        inputDivisor.max = 5;
        inputDivisor.step = 1;
        inputDivisor.placeholder = "Ej. 1";

        grupoDivisor.append(labelDivisor, inputDivisor);

        cuerpo.append(grupoDividendo, grupoDivisor);

        // Contenedor de mensajes
        const contenedorMensaje = document.createElement("div");
        contenedorMensaje.classList.add("alert", "alert-danger", "d-none", "mb-0");
        contenedorMensaje.setAttribute("role", "alert");

        cuerpo.append(contenedorMensaje);

        // Pie
        const pie = document.createElement("div");
        pie.classList.add("modal-footer");

        const botonCancelar = document.createElement("button");
        botonCancelar.type = "button";
        botonCancelar.classList.add("btn", "btn-secondary");
        botonCancelar.textContent = "Cancelar";
        botonCancelar.setAttribute("data-bs-dismiss", "modal");

        botonCancelar.addEventListener("click", () => {
            this.cerrarModal(modal);
        });

        const botonGuardar = document.createElement("button");
        botonGuardar.type = "button";
        botonGuardar.classList.add("btn", "btn-primary");
        botonGuardar.textContent = "Guardar";

        botonGuardar.addEventListener("click", () => {
            this.validarConfiguracion(inputDividendo, inputDivisor, contenedorMensaje, modal);
        });

        pie.append(botonCancelar, botonGuardar);

        // Construcción
        contenido.append(encabezado, cuerpo, pie);
        dialogo.append(contenido);
        modal.append(dialogo);

        return modal;
    }

    cerrarModal(modal) {
        const instanciaModal = bootstrap.Modal.getInstance(modal);

        if (modal.contains(document.activeElement)) {
            document.activeElement.blur();
        }

        instanciaModal.hide();
    }

    validarConfiguracion(inputDividendo, inputDivisor, contenedorMensaje, modal) {

        // Primera validación: rangos permitidos
        if (!inputDividendo.checkValidity() || !inputDivisor.checkValidity()) {
            contenedorMensaje.textContent =
                "El dividendo debe tener entre 2 y 10 cifras y el divisor entre 1 y 5.";
            contenedorMensaje.classList.remove("d-none");
            return;
        }

        // Segunda validación: relación entre cifras
        if (Number(inputDividendo.value) <= Number(inputDivisor.value)) {
            contenedorMensaje.textContent =
                "El dividendo debe tener más cifras que el divisor.";
            contenedorMensaje.classList.remove("d-none");
            return;
        }

        this.onGuardarConfiguracion(
            Number(inputDividendo.value),
            Number(inputDivisor.value)
        );

        this.cerrarModal(modal);
    }

    asignarEventoGuardarConfiguracion(callback) {
        this.onGuardarConfiguracion = callback;
    }

    asignarEventoAbrirConfiguracion(callback) {
        this.onAbrirConfiguracion = callback;
    }

    actualizarDatos(datos) {
        this.dividendo = datos.dividendo;
        this.divisor = datos.divisor;
        this.cantidadCifras = String(datos.dividendo).length;
        this.cantidadCifrasCociente = String(datos.cociente).length;
    }
}