export function renderMenu() {
    return `
        <main class="container min-vh-100 d-flex justify-content-center align-items-center">
            <section class="border rounded-4 p-4 p-md-5 w-100">
                <div class="row justify-content-center g-3">

                    <div class="col-12 col-md-6">
                        <a href="/suma"
                           class="btn btn-outline-dark rounded-4 w-100 py-5">
                            Suma
                        </a>
                    </div>

                    <div class="col-12 col-md-6">
                        <a href="/resta"
                           class="btn btn-outline-dark rounded-4 w-100 py-5">
                            Resta
                        </a>
                    </div>

                    <div class="col-12 col-md-6">
                        <a href="/multiplicacion"
                           class="btn btn-outline-dark rounded-4 w-100 py-5">
                            Multiplicación
                        </a>
                    </div>

                    <div class="col-12 col-md-6">
                        <a href="/division"
                           class="btn btn-outline-dark rounded-4 w-100 py-5">
                            División
                        </a>
                    </div>

                </div>
            </section>
        </main>
    `;
}