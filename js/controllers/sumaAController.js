import { SumaAModel } from "../models/addition/sumaAModel.js";
import { SumaAView } from "../views/sumaAView.js";
import { generarNumeros } from "../utils/generarNumero.js";

export class SumaAController {
    constructor(contenedor) {
        this.contenedor = contenedor;
        const [sumandoA, sumandoB] = generarNumeros(2, 1, 9999);
        this.modelo = new SumaAModel(sumandoA, sumandoB);
        this.vista = new SumaAView(contenedor);
    }

    iniciar() {
        const datosVista = {
            cantidadDigitosOperandos: Math.max(
                this.modelo.sumandoADescompuesto.length,
                this.modelo.sumandoBDescompuesto.length
            ),
            cantidadDigitosResultado: this.modelo.resultadoDescompuesto.length,
            sumandoA: this.modelo.sumandoADescompuesto,
            sumandoB: this.modelo.sumandoBDescompuesto
        };

        this.vista.renderPregunta(datosVista);

        const botonRevisar = this.contenedor.querySelector(".btn-revisar");

        botonRevisar.addEventListener("click", () => {
            this.revisar();
        });
    }

    revisar() {
        const acarreos = this.contenedor.querySelectorAll(".acarreo");
        const digitos = this.contenedor.querySelectorAll(".digito");

        acarreos.forEach(input => {
            const indice = Number(input.dataset.indice);
            const respuesta = Number(input.value);

            const correcto = respuesta === this.modelo.acarreosCorrectos[indice+1];

            this.actualizarEstado(input, correcto);
        });

        digitos.forEach(input => {
            const indice = Number(input.dataset.indice);
            const respuesta = Number(input.value);

            const correcto =
                respuesta === this.modelo.resultadoDescompuesto[indice];

            this.actualizarEstado(input, correcto);
        });
    }

    actualizarEstado(input, correcto) {
        input.classList.remove("input-correcto", "input-incorrecto");

        input.classList.add(
            correcto ? "input-correcto" : "input-incorrecto"
        );
    }
}