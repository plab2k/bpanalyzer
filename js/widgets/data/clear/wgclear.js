"use strict";
$.widget("ba.wgclear", $.ba.wgbase, {

  _create: function () {
    const that = this;
    this._on(this.element, {
      "click a": (event) => {
        app.control.waiting.start();
        const objnames = app.db.getTableNames();
        Promise.all(
          objnames.map(name => {
            app.db.clear(name)
          }))
          .then(() => {
            app.control.waiting.end();
            that._trigger("onSuccess");
          });
      }
    });
    this._super();
  }

});
