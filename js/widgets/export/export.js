var app = app || {};
app.export = (function () {
    "use strict";
    return {
        getCSV: function (name, callback) {
            app.db.getData(name).then((data) => {
                const csv = data.map((row) => {
                    return JSON.stringify(Object.values(row))
                }).join('\n')
                    .replace(/,/g, ";")
                    .replace(/(^\[)|(\]$)/mg, '');
                callback(csv);
            });
        }
    };
})();
