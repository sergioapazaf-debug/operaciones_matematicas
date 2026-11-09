export class DivisionAModel {
    constructor(dividendo, divisor) {
        this.dividendo = dividendo;
        this.divisor = divisor;
    }

    dividirMinimo(dividendo, divisor) {
        if (String(dividendo).length !== 1) {
            throw new Error("El dividendo debe tener una sola cifra.");
        }

        if (divisor === 0) {
            throw new Error("No se puede dividir entre cero.");
        }

        let cociente = 0;

        while (dividendo >= divisor) {
            dividendo -= divisor;
            cociente++;
        }

        return {
            cociente,
            resto: dividendo
        }
    }

    descomponerDividendo(dividendo, divisor) {
    }


}