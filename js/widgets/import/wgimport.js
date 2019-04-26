"use strict";
$.widget("ui.wgimport", $.ui.wgbase, {

  _create: function () {
    const that = this;
    this._on(this.element, {
      "change input": (event) => {
        const elem = event.target;
        const file = elem.files[0];
        app.import.readFile(file)
          .then(app.import.tranlate)
          .then((data) => {
            return app.db.putData(file.name.replace(/\.csv$/i, ''), data)
          })
          .then(data => {
            console.log(data)
          })
          .catch(error => {
            console.log(error)
          })

      }
    });
    this._super();
  }

});
