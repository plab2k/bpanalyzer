//Controller
(function() {
  "use strict";

  function widget(wgname, options) {
    //define default options
    const opt = $.extend({}, options, {});
    /*creat a widget of the ba namespace*/
    $.ba[wgname](opt, app.helper.getTemplate("#" + wgname).appendTo("main"));
  }

  function registerSW() {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("./js/sw.js", { scope: "/" })
        .then(registration => {
          app.serviceWorker = registration;
        })
        .catch(err => {
          console.error("Registration failed:", err);
        });
    }
  }

  function refreshInfo() {
    $(":data('ba-wginfo')").wginfo("update");
  }

  $(document).ready(function() {
    registerSW();
    Promise.all([app.db.init()])
      .then(db => {
        widget("wgexport");
        widget("wgimport", {
          onSuccess: refreshInfo
        });
        widget("wgclear", {
          onSuccess: refreshInfo
        });
        widget("wgdemo", {
          onSuccess: refreshInfo
        });
        widget("wginfo");
      })
      .catch(dberror => {});
    //showMigrate();
  });
})();
