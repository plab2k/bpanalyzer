$.widget("ui.wgbase", {
  _apply: function () {
    this.close();
  },
  _create: function () {
    this.element.addClass("wgbase");
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
