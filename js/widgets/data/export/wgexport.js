"use strict";
$.widget("ba.wgexport", $.ba.wgbase, {

  _create: function () {
    const that = this;
    this._on(this.element, {
      "click a": (event) => {
        const tablenames = app.db.getTableNames();
        for (let i = 0; i < tablenames.length; i++) {
          const tableName = tablenames[i];
          app.control.waiting.start();
          app.export.getCSV(tableName, (csv) => {
            const BOM = "\uFEFF";
            let encodedUri = encodeURI("data:text/csv;charset=utf-8," + BOM + csv);
            let link = document.createElement('a');
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", tableName + ".csv");
            //document.body.appendChild(link);
            link.click();
            link.removeAttribute("href");
            link.removeAttribute("download");
            app.control.waiting.end();
          })
        };
      }
    });
    this._super();
  }

});
