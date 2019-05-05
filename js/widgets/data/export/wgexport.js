"use strict";
$.widget("ba.wgexport", $.ba.wgbase, {
  _create: function() {
    const that = this;
    this._on(this.element, {
      "click a": event => {
        const tablenames = app.db.getTableNames();
        for (let i = 0; i < tablenames.length; i++) {
          const tableName = tablenames[i];
          app.control.waiting.start();
          app.export.getCSV(tableName, csv => {
            const BOM = "\uFEFF";
            let link = document.createElement("a");
            let data = new Blob([csv], { type: "text/csv" });
            link.href = URL.createObjectURL(data);
            link.setAttribute("download", tableName + ".csv");
            link.setAttribute("type", "type='text/csv'");
            link.click();
            app.control.waiting.end();
          });
        }
      }
    });
    this._super();
  }
});
