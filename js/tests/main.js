import { SumaAController } from "../controllers/sumaAController.js";

const contenedor = document.querySelector("#app");

const controller = new SumaAController(contenedor);

controller.iniciar();