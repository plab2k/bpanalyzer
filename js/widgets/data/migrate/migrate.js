var app = app || {};
app.migrate = (function () {
  "use strict";

  return {
    init: function (callback) {
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
    checkSubscribtion: function (callback) {
      app.serviceWorker.pushManager.getSubscription().then(function (sub) {
        callback(sub);
      });
    },
    subscribe: function (callback) {
      navigator.serviceWorker.ready.then(function (reg) {
        reg.pushManager
          .subscribe({
            userVisibleOnly: true
          })
          .then(function (sub) {
            callback(sub);
          })
          .catch(function (e) {
            if (Notification.permission === "denied") {
              console.warn("Permission for notifications was denied");
            } else {
              console.error("Unable to subscribe to push", e);
            }
            callback({ error: e })
          });
      });
    },
    unsubscribe: function (callback) {
      navigator.serviceWorker.ready.then(function (reg) {
        reg.pushManager.getSubscription().then(function (subscription) {
          subscription.unsubscribe().then(function (successful) {
            callback(successful);
          }).catch(function (e) {
            callback({ error: e })
          })
        })
      });
    }
  };
})();
