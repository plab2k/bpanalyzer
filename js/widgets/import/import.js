var app = app || {};
app.import = (function () {
    "use strict";
    return {
        save: (name, content) => {
            return new Promise((resolve, reject) => {

                resolve(1)
            })
        },
        readFile: (file) => {
            return new Promise((resolve, reject) => {
                let reader = new FileReader();
                reader.onload = () => {
                    resolve(reader.result);
                };
                reader.onerror = (e) => {
                    reject(e)
                };
                reader.readAsText(file);
            })
        },
        /*translate from CSV String to JSON*/
        tranlate: (content) => {
            return new Promise((resolve, reject) => {
                var lines = content.split("\n");
                var result = [];
                var headers = lines[0].split(",");
                for (var i = 1; i < lines.length; i++) {
                    var obj = {};
                    var currentline = lines[i].split(",");
                    for (var j = 0; j < headers.length; j++) {
                        obj[headers[j]] = currentline[j];
                    }
                    result.push(obj);
                }
                resolve(result);
            })
        }
    };
})();
