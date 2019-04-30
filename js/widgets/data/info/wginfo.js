"use strict";
$.widget("ba.wginfo", $.ba.wgbase, {

  _create: function () {
    const that = this;
    this._on(this.element, {
      "click a": (event) => {
        that.update();
      }
    });
    this.update();
    this._super();
  },
  update: function () {
    const objnames = app.db.getTableNames();
    $("tbody", this.element).empty();
    objnames.map(name => {
      app.control.waiting.start();
      app.db.recCount(name).then(count => {
        const content = "<tr><td>" + name + "</td><td>" + count + " rec</td></tr>"
        $("tbody", this.element).append(content);
        app.control.waiting.end();
      })
    });
    navigator.storage.estimate().then((data) => {
      const content = "<tr><td>Usage</td><td>" + Math.round(data.usage / (1024)) + " Kb</td></tr>"
      $("tbody", this.element).append(content);
    })
  }

});
