import { renderMenuController } from "../controllers/menuController.js";
import { renderNotFound } from "../views/notFoundView.js";
import { renderEnConstruccion } from "../views/enConstruccionView.js";
import { SumaAController } from "../controllers/sumaAController.js";

export function router() {
    const path = window.location.pathname;
    console.log(path);
    switch (path) {
        case "/":
            renderMenuController("app");
            break;
        case "/suma":
            const app = document.getElementById("app");
            const sumaController = new SumaAController(app);
            sumaController.iniciar();
            break;
        case "/resta":
        case "/multiplicacion":
        case "/division":
            document.getElementById("app").innerHTML = renderEnConstruccion();
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

    const path = link.getAttribute("href");

    window.history.pushState({}, "", path);

    router();
});

window.addEventListener("popstate", () => {
    router();
});