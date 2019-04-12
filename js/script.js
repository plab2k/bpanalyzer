(function() {
  Notification.requestPermission(function(status) {
    console.log("Notification permission status:", status);
  });

  /*  navigator.serviceWorker.ready.then(function(swRegistration) {
        return swRegistration.sync.register('myFirstSync');
      }); */

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("sw.js", { scope: "/" })
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

  function subscribeUser() {
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
})();
