"use strict";
$.widget("ba.wgclear", $.ba.wgbase, {

  _create: function () {
    const that = this;
    $("[data-text=Confirm]", this.element).hide();
    this._on(this.element, {
      "click a": (event) => {
        if ($(event.target).attr("data-text") != "Confirm") {
          $(event.target).hide();
          $("[data-text=Confirm]", this.element).show();
          return;
        }
        app.control.waiting.start();
        const objnames = app.db.getTableNames();
        Promise.all(
          objnames.map(name => {
            app.db.clear(name)
          }))
          .then(() => {
            app.control.waiting.end();
            $("[data-text=Clear]", that.element).show();
            $("[data-text=Confirm]", that.element).hide();
            that._trigger("onSuccess");
          });
      }
    });
    this._super();
  }

});
