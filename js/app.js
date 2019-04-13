//Controller
;
(function() {
    if ("serviceWorker" in navigator) {
        window.addEventListener("load", () => {
            navigator.serviceWorker
                .register("/js/sw.js", { scope: "/" })
                .then(registration => {
                    registration.pushManager.getSubscription().then(function(sub) {
                        if (sub === null) {
                            // Update UI to ask user to register for Push
                            console.log("Not subscribed to push service!");
                            subscribeUser();
                        } else {
                            // We have a subscription, update the database
                            console.log("Subscription object: ", sub);
                        }
                    });
                })
                .catch(err => {
                    console.error("Registration failed:", err);
                });
        });
    }

    $(document).ready(function() {
        //app.firebase.init(() => {});

    });
})();