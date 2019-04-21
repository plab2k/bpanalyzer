$.widget("ns.wgmigrate", {
  // Default options.
  options: {
    param1: "foo",
    param2: "bar",
    param3: "baz"
  },

  _create: function() {
    this.element.wrapAll("div").addClass("wgmigrate");
    app.migrate.init(() => {
      app.migrate.checkSubscribtion(this._updateSubscription);
    });

    console.log("create");
  },
  _updateSubscription(sub) {
    if (sub) {
      //has Subscription
    } else {
      //not Subscribed
    }
  }
});
