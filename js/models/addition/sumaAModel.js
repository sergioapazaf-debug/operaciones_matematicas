export class SumaAModel {
    static metodo = "tradicional";

    constructor(sumandoA, sumandoB) {
        this.sumandoA = sumandoA;
        this.sumandoB = sumandoB;

        this.sumaTotal = sumandoA + sumandoB;

        this.sumandoADescompuesto = this.descomponer(sumandoA);
        this.sumandoBDescompuesto = this.descomponer(sumandoB);

        this.resultadoDescompuesto = [];
        this.acarreosCorrectos = [];

        this.calcularOperacion();
    }

    descomponer(numero) {
        return String(numero).split("").map(Number);
    }

    sumarDigitos(digitoA, digitoB, acarreoEntrada = 0) {
        const suma = digitoA + digitoB + acarreoEntrada;

        return {
            resultado: suma % 10,
            acarreo: Math.floor(suma / 10)
        };
    }

    calcularOperacion() {
        const cantidadDigitos = Math.max(
            this.sumandoADescompuesto.length,
            this.sumandoBDescompuesto.length
        );

        let acarreo = 0;

        for (let i = cantidadDigitos - 1; i >= 0; i--) {
            const indiceA = i - (cantidadDigitos - this.sumandoADescompuesto.length);

            const indiceB = i - (cantidadDigitos - this.sumandoBDescompuesto.length);

            const digitoA = this.sumandoADescompuesto[indiceA] ?? 0;
            const digitoB = this.sumandoBDescompuesto[indiceB] ?? 0;

            const { resultado, acarreo: nuevoAcarreo } = this.sumarDigitos(digitoA, digitoB, acarreo);

            this.resultadoDescompuesto.unshift(resultado);
            this.acarreosCorrectos[i] = nuevoAcarreo;

            acarreo = nuevoAcarreo;
        }

        if (acarreo > 0) {
            this.resultadoDescompuesto.unshift(acarreo);
        }
    }
}

