import { DivisionAModel } from "../models/division/divisionAModel.js";
import { DivisionAView } from "../views/divisionAView.js";
import { generarNumeros } from "../utils/generarNumero.js";

export class DivisionAController {

    constructor(contenedor) {
        this.contenedor = contenedor;

        // Generar números
        const [dividendo] = generarNumeros(1, 2, 999999);
        const [divisor] = generarNumeros(1, 1, 99);

        // Crear y ejecutar el modelo
        this.modelo = new DivisionAModel(
            dividendo,
            divisor
        );

        this.modelo.calcularDivision();

        console.log(this.modelo.procedimientos);

        // Crear y renderizar la vista
        this.vista = new DivisionAView({
            dividendo: this.modelo.dividendo,
            divisor: this.modelo.divisor,
            cociente: this.modelo.cociente
        });
    }

    iniciar() {
        this.vista.asignarEventoConsultar(() => this.revisar());

        this.vista.asignarEventoGuardarConfiguracion(
            (digitosDividendo, digitosDivisor) => {
                this.actualizarConfiguracion(digitosDividendo, digitosDivisor);
            }
        );

        this.contenedor.append(this.vista.render());

        this.vista.asignarEventoAbrirConfiguracion((modal) => {
            const instanciaModal = bootstrap.Modal.getOrCreateInstance(modal);
            instanciaModal.show();
        });
    }

    revisar() {
        this.revisarCociente();
        this.revisarProcedimiento();
    }

    revisarCociente() {
        const respuestas = this.vista.obtenerCociente();
        const resultado = String(this.modelo.cociente);

        const resultados = respuestas.map((respuesta, indice) => {
            return respuesta === resultado[indice];
        });

        this.vista.marcarCociente(resultados);
    }

    revisarProcedimiento() {
        const respuestas = this.vista.obtenerProcedimientos();
        const procedimientos = this.modelo.obtenerProcedimientos();

        // Normalizar cantidad de procedimientos
        let cantidadProcedimientos = procedimientos.length - 1;

        while (cantidadProcedimientos < respuestas.length) {
            procedimientos.push({
                dividendoParcial: "x".repeat(respuestas[0].length),
                cociente: "x",
                residuo: "x"
            });

            cantidadProcedimientos++;
        }

        // Comparar procedimientos
        const resultados = respuestas.map((fila, indiceFila) => {
            const resultado = procedimientos[indiceFila + 1].dividendoParcial;

            return fila.map((respuesta, indiceColumna) => {
                const esperado = resultado[indiceColumna];

                if (esperado === "x") {
                    return respuesta === "";
                }

                if (esperado === "0" && indiceColumna < resultado.length - 1) {
                    return respuesta === "" || respuesta === "0";
                }

                return respuesta === esperado;
            });
        });

        this.vista.marcarProcedimientos(resultados);
    }

    actualizarConfiguracion(digitosDividendo, digitosDivisor) {

        // Guardar configuración
        this.modelo.guardarConfiguracion(
            digitosDividendo,
            digitosDivisor
        );

        // Generar nuevo dividendo
        const [dividendo] = generarNumeros(
            1,
            10 ** (digitosDividendo - 1),
            10 ** digitosDividendo - 1
        );

        // Generar nuevo divisor
        const [divisor] = generarNumeros(
            1,
            10 ** (digitosDivisor - 1),
            10 ** digitosDivisor - 1
        );

        // Crear nuevo modelo
        this.modelo = new DivisionAModel(dividendo, divisor);
        this.modelo.calcularDivision();

        // Actualizar vista
        this.vista.actualizarDatos({
            dividendo: this.modelo.dividendo,
            divisor: this.modelo.divisor,
            cociente: this.modelo.cociente
        });

        // Renderizar nueva operación
        this.contenedor.replaceChildren(this.vista.render());
    }

}
