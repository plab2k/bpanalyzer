//Controller
(function () {
  "use strict";
  const showMigrate = function () {
    app.helper
      .getTemplate("#wgmigrate")
      .wgmigrate()
      .appendTo("main");
  };
  const showImport = function () {
    app.helper
      .getTemplate("#wgimport")
      .wgimport()
      .appendTo("main");
  };
  const showExport = function () {
    app.helper
      .getTemplate("#wgexport")
      .wgexport()
      .appendTo("main");
  };
  const registerSW = function () {
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

  $(document).ready(function () {
    registerSW();
    Promise.all([app.db.init()]).then((db) => {
      showExport();
      showImport();
    }).catch((dberror) => { })
    //showMigrate();

  });
})();
