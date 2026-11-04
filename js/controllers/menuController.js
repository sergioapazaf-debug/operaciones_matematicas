import { renderMenu } from "../views/menuView.js";

export function renderMenuController(idContainer) {
    const app = document.getElementById(idContainer);

    app.innerHTML = renderMenu();
}