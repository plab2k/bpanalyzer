"use strict";
$.widget("ba.wgdemo", $.ba.wgbase, {
  _create: function() {
    const that = this;
    this._on(this.element, {
      "click a": () => {
        $.get("./res/dsdemo.csv")
          .then(app.import.tranlate)
          .then(data => {
            return app.db.putData("task", data);
          })
          .then(data => {
            that._trigger("onSuccess", null, data);
          })
          .catch(error => {
            console.log(error);
          });
      }
    });
    this._super();
  }
});
