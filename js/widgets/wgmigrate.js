$.widget("ui.wgmigrate", $.ui.wgbase, {
  // Default options.
  options: {
    param1: "foo",
    param2: "bar",
    param3: "baz"
  },

  _create: function() {
    app.migrate.init(() => {
      app.migrate.checkSubscribtion(this._updateSubscription);
    });

    console.log("create");
    this._super();
  },
  _updateSubscription(sub) {
    if (sub) {
      //has Subscription
      $(".subscribed", this.element).show();
    } else {
      //not Subscribed
      $(".unsubscribed a", this.element).on("click", app.migrate.subscribeuser);
      $(".unsubscribed", this.element).show();
    }
  }
});
