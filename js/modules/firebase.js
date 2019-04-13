;
var app = app || {};
app.firebase = (function() {
    "use strict";
    const config = {
        apiKey: "AIzaSyCbb8jTiag_He6CYa1w1iflMLrOR2yYHlk",
        authDomain: "bpanalyzer-db.firebaseapp.com",
        databaseURL: "https://bpanalyzer-db.firebaseio.com",
        projectId: "bpanalyzer-db",
        storageBucket: "bpanalyzer-db.appspot.com",
        messagingSenderId: "669550904949"
    };

    return {
        init: function(callback) {
            app.helper.getScript("https://www.gstatic.com/firebasejs/live/3.0/firebase.js", () => {
                firebase.initializeApp(config);

                app.serviceWorker.pushManager.getSubscription().then(function(sub) {
                    if (sub === null) {
                        // Update UI to ask user to register for Push
                        console.log("Not subscribed to push service!");
                        subscribeUser();
                    } else {
                        // We have a subscription, update the database
                        console.log("Subscription object: ", sub);
                    }
                });

                callback ? callback() : null;
            })
        }
    }
})();