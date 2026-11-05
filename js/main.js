import { router } from "./router/router.js";

const rutaSolicitada = sessionStorage.getItem("rutaSolicitada");

if (rutaSolicitada) {
    sessionStorage.removeItem("rutaSolicitada");
    window.history.replaceState({}, "", rutaSolicitada);
}

router();