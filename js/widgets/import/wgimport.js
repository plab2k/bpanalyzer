"use strict";
$.widget("ui.wgimport", $.ui.wgbase, {
  _create: function() {
    const that = this;
    this._on(this.element, {
      "change input": event => {
        const elem = event.target;
        const file = elem.files[0];
        app.import
          .readFile(file)
          .then(app.import.tranlate)
          .then(data => {
            let storeName = file.name.replace(/\.csv$/i, "");
            return app.db.putData(storeName, data);
          })
          .then(data => {
            console.log(data);
          })
          .catch(error => {
            console.log(error);
          });
      }
    });
    this._super();
  }
});
