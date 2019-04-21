//Controller
(function() {
  "use strict";
  const showMigrate = function() {
    app.helper
      .getTemplate("#wgmigrate")
      .wgmigrate()
      .appendTo("main");
  };
  const registerSW = function() {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/js/sw.js", { scope: "/" })
        .then(registration => {
          app.serviceWorker = registration;
        })
        .catch(err => {
          console.error("Registration failed:", err);
        });
    }
  };

  $(document).ready(function() {
    registerSW();
    showMigrate();
  });
})();
