;
var app = app || {};
app.firebase = (function() {
    "use strict";

    return {
        init: function(callback) {
            app.helper.getScript("https://www.gstatic.com/firebasejs/live/3.0/firebase.js", () => {
                firebase.initializeApp(app.config.firebase);

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