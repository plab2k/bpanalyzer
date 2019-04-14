;
$.widget("ns.wgmigrate", {

    // Default options.
    options: {
        param1: "foo",
        param2: "bar",
        param3: "baz"
    },

    _create: function() {
        // Options are already merged and stored in this.options
        // Plugin logic goes here.
        console.log("create")
    }

});