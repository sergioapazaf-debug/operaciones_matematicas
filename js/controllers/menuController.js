import { renderMenu } from "../views/menuView.js";

export function renderMenuController() {
    const app = document.getElementById("app");

    app.innerHTML = renderMenu();
}

