"use strict";
$.widget("ba.wgmigrate", $.ba.wgbase, {
  // Default options.
  options: {
    param1: "foo",
    param2: "bar",
    param3: "baz"
  },

  _create: function () {
    const that = this;
    this._on(this.element, {
      "click .subscribed a": (event) => {
        app.control.waiting.start();
        app.migrate.unsubscribe((result) => {
          that._updateSubscription(false);
          app.control.waiting.end();
        })
      },
      "click .unsubscribed a": (event) => {
        app.control.waiting.start();
        app.migrate.subscribe((result) => {
          that._updateSubscription(true);
          app.control.waiting.end();
        })
      }
    });

    app.migrate.init(() => {
      app.migrate.checkSubscribtion(this._updateSubscription);
    });

    this._super();
  },
  _updateSubscription(sub) {
    const that = this;
    if (sub) {
      //has Subscription      
      $(".subscribed", this.element).show();
      $(".unsubscribed", this.element).hide();
    } else {
      //not Subscribed      
      $(".unsubscribed", this.element).show();
      $(".subscribed", this.element).hide();
    }
  }
});
