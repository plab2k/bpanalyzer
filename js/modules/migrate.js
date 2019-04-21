var app = app || {};
app.migrate = (function() {
  "use strict";

  return {
    init: function(callback) {
      if (!app.config.migrate) {
        console.error("app/conf/firebase.js not loaded");
        return;
      }
      app.helper.getScript(
        "https://www.gstatic.com/firebasejs/live/3.0/firebase.js",
        () => {
          firebase.initializeApp(app.config.migrate);
          callback ? callback() : null;
        }
      );
    },
    checkSubscribtion: function(callback) {
      app.serviceWorker.pushManager.getSubscription().then(function(sub) {
        callback(sub);
      });
    },
    subscribeuser: function() {
      navigator.serviceWorker.ready.then(function(reg) {
        reg.pushManager
          .subscribe({
            userVisibleOnly: true
          })
          .then(function(sub) {
            console.log("Endpoint URL: ", sub.endpoint);
          })
          .catch(function(e) {
            if (Notification.permission === "denied") {
              console.warn("Permission for notifications was denied");
            } else {
              console.error("Unable to subscribe to push", e);
            }
          });
      });
    }
  };
})();
