import { renderMenuController } from "../controllers/menuController.js";
import { renderNotFound } from "../views/notFoundView.js";

export function router() {
    const path = window.location.pathname;
    console.log(path);
    switch (path) {
        case "/":
        case "/suma":
        case "/resta":
        case "/multiplicacion":
        case "/division":
            renderMenuController();
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