//Controller
;
(function() {
    if ("serviceWorker" in navigator) {
        window.addEventListener("load", () => {
            navigator.serviceWorker
                .register("/js/sw.js", { scope: "/" })
                .then(registration => {
                    app.serviceWorker = registration;
                })
                .catch(err => {
                    console.error("Registration failed:", err);
                });
        });
    }

    $(document).ready(function() {
        //app.migrate.init(() => {});
        $($("#export").html()).wgmigrate().appendTo($("main"))

        //$("main").append($("#export").html());

    });
})();