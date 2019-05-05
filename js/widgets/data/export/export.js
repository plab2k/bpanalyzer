var app = app || {};
app.export = (function() {
  "use strict";
  return {
    getCSV: function(name, callback) {
      app.db.getData(name).then(data => {
        //Add fields name
        /* const header = data.length
          ? Object.keys(data[0])
              .join(";")
              .concat("\n")
          : ""; */
        const header = "time;kind;kindName;task;source;sourceName;Value";
        const csv = data
          .map(row => {
            return JSON.stringify(Object.values(row));
          })
          .join("\n")
          .replace(/,/g, ";")
          .replace(/(^\[)|(\]$)/gm, "");
        callback(header + csv);
      });
    }
  };
})();
