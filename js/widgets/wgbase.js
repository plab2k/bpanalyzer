$.widget("ba.wgbase", {
  _apply: function () {
    this.close();
  },
  _create: function () {
    this.element.addClass("wgbase");
    $("[data-icon]", this.element).each((i, elem) => {
      const icon = $("<svg>")
        .append(
          $("<use>").attr("xlink:href", "#" + elem.getAttribute("data-icon"))
        )
        .appendTo($(elem))
      //.attr("xlink:href", "#" + elem.attr("data-icon"))
    })
    app.helper.translate(this.element);
    this._super();
  },
  _destroy: function () {
    //$("*", this.element).off();
    this._off(this.element, "click");
    this._super();
  },
  close: function () { }
});
