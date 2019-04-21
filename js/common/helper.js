var app = app || {};
app.helper = (function() {
  return {
    getScript: function(url, success) {
      var script = document.createElement("script");
      script.src = url;
      var head = document.getElementsByTagName("head")[0],
        done = false;
      script.onload = script.onreadystatechange = function() {
        if (
          !done &&
          (!this.readyState ||
            this.readyState == "loaded" ||
            this.readyState == "complete")
        ) {
          done = true;
          success();
          script.onload = script.onreadystatechange = null;
          head.removeChild(script);
        }
      };
      head.appendChild(script);
    },
    getTemplate(templateId) {
      return $($(templateId).html()).addClass(templateId.replace("#", ""));
    },
    translate(elem) {
      $("[data-text]", elem).each((i, e) => {
        $(e).text($(e).attr("data-text"));
      });
      return elem;
    }
  };
})();
