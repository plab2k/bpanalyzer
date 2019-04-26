var app = app || {};
app.control = (function () {
    "use strict";
    return {
        waiting: {
            cnt: 0,
            start: function () {
                this.cnt++;
                $("#loader").show();
            },
            end: function () {
                this.cnt--;
                if (this.cnt == 0)
                    $("#loader").hide();
            }
        }

    };
})();
