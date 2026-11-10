import { DivisionAModel } from "../models/division/divisionAModel.js";
import { DivisionAView } from "../views/divisionAView.js";
import { generarNumeros } from "../utils/generarNumero.js";

export class DivisionAController {

    constructor(contenedor) {
        this.contenedor = contenedor;

        // Generar números
        const [dividendo] = generarNumeros(1, 2, 999999);
        const [divisor] = generarNumeros(1, 2, 9);

        // Crear y ejecutar el modelo
        this.modelo = new DivisionAModel(
            718391,
            2
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
        this.vista.asignarEventoConsultar(() => this.revisarCociente());
        this.contenedor.append(this.vista.render());
    }

    revisarCociente() {
        const respuestas = this.vista.obtenerCociente();
        const resultado = String(this.modelo.cociente);

        const resultados = respuestas.map((respuesta, indice) => {
            return respuesta === resultado[indice];
        });

        this.vista.marcarCociente(resultados);
    }
}
