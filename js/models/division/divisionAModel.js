export class DivisionAModel {
    constructor(dividendo, divisor) {
        this.dividendo = dividendo;
        this.divisor = divisor;
        this.procedimientos = [];
        this.cociente = "";
        this.residuo = 0;
    }

    calcularDivision() {
        let residuoAnterior = 0;
        let minimoActual = this.descomponerDividendo(this.dividendo, this.divisor, true, residuoAnterior);
        let resultadoActual = this.dividirMinimo(Number(minimoActual.parteDividendo), this.divisor);

        this.procedimientos.push({
            dividendoParcial: Number(minimoActual.parteDividendo),
            cociente: String(resultadoActual.cociente),
            residuo: resultadoActual.resto
        });

        this.cociente += resultadoActual.cociente;

        let dividendoActual = String(this.dividendo);
        let aElimniar = minimoActual.parteDividendo.length;
        dividendoActual = dividendoActual.slice(aElimniar);

        while (dividendoActual.length > 0) {
            residuoAnterior = resultadoActual.resto;
            minimoActual = this.descomponerDividendo(dividendoActual, this.divisor, false, residuoAnterior);
            resultadoActual = this.dividirMinimo(Number(minimoActual.parteDividendo), this.divisor);

            this.procedimientos.push({
                dividendoParcial: Number(minimoActual.parteDividendo),
                cociente: "0".repeat(Number(minimoActual.cociente)) + resultadoActual.cociente,
                residuo: resultadoActual.resto
            });

            this.cociente += "0".repeat(Number(minimoActual.cociente)) + resultadoActual.cociente;
            aElimniar = minimoActual.parteDividendo.length - (residuoAnterior==0?0:String(residuoAnterior).length);
            dividendoActual = dividendoActual.slice(aElimniar);
        }

        this.residuo = resultadoActual.resto;
    }

    dividirMinimo(dividendo, divisor) {
        // if (String(dividendo).length !== 1) {
        //     throw new Error("El dividendo debe tener una sola cifra.");
        // }

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

    descomponerDividendo(dividendo, divisor, esPrimer = true, residuoAnterior = 0) {

        let parteDividendo = residuoAnterior + "";

        if (parteDividendo === "0") parteDividendo = "" + String(dividendo).charAt(0);
        else parteDividendo += String(dividendo).charAt(0);

        const strDividendo = String(dividendo);

        if (esPrimer) {
            for (let i = 1; i < strDividendo.length; i++) {
                if (Number(parteDividendo) < divisor)
                    parteDividendo += strDividendo.charAt(i);
                else
                    return { parteDividendo, cociente: 0 };
            }

            return { parteDividendo, cociente: 0 };
        } else {
            //cociente: nro de 0's referente a cero al cociente que se necesitan
            for (let i = 1; i < strDividendo.length; i++) {
                if (Number(parteDividendo) < divisor)
                    parteDividendo += strDividendo.charAt(i);
                else
                    return { parteDividendo, cociente: i - 1 };
            }
            return { parteDividendo, cociente: strDividendo.length - 1 };
        }
    }


}