import { renderMenuController } from "../controllers/menuController.js";
import { renderNotFound } from "../views/notFoundView.js";
import { renderEnConstruccion } from "../views/enConstruccionView.js";
import { SumaAController } from "../controllers/sumaAController.js";
import { DivisionAController } from "../controllers/divisionAController.js";

export function router() {
    console.log("ini router.");
    const BASE_PATH = "/operaciones_matematicas"
    const path = window.location.pathname.replace(BASE_PATH, "");
    console.log(path);
    const app = document.getElementById("app");
    app.innerHTML = "";

    switch (path) {
        case "/":
            renderMenuController("app");
            break;
        case "/suma":
            const sumaController = new SumaAController(app);
            sumaController.iniciar();
            break;
        case "/resta":
        case "/multiplicacion":
        case "/division":
            const divisionAController = new DivisionAController(app);
            divisionAController.iniciar();
            // document.getElementById("app").innerHTML = renderNotFound();            
            break;

        default:
            document.getElementById("app").innerHTML = renderNotFound();
            break;
    }
}

document.addEventListener("click", (event) => {
    const link = event.target.closest("a");

    if (!link) return;

    event.preventDefault();

    const path = "/operaciones_matematicas" + link.getAttribute("href");

    console.log(path);

    window.history.pushState({}, "", path);

    router();
});

window.addEventListener("popstate", () => {
    router();
});
