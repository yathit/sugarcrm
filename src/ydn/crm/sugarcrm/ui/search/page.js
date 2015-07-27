/**
 * @fileoverview Search page for sidebar desktop.
 */

goog.provide('ydn.crm.su.ui.search.Page');
goog.require('goog.ui.Component');
goog.require('ydn.crm.su.model.Search');
goog.require('ydn.crm.su.ui.HoverResultList');
goog.require('ydn.crm.ui.IDesktopPage');
goog.require('ydn.crm.su.ui.HomeBar');



/**
 * Search page for sidebar desktop.
 * @param {goog.dom.DomHelper=} opt_dom
 * @constructor
 * @struct
 * @extends {goog.ui.Component}
 * @implements {ydn.crm.ui.IDesktopPage}
 */
ydn.crm.su.ui.search.Page = function(opt_dom) {
  goog.base(this, opt_dom);

};
goog.inherits(ydn.crm.su.ui.search.Page, goog.ui.Component);


/**
 * @override
 * @return {ydn.crm.su.model.Search}
 */
ydn.crm.su.ui.search.Page.prototype.getModel;


/**
 * @inheritDoc
 */
ydn.crm.su.ui.search.Page.prototype.createDom = function() {
  goog.base(this, 'createDom');
  var root = this.getElement();

};


/**
 * @param {?ydn.crm.su.model.Sugar} sugar
 */
ydn.crm.su.ui.search.Page.prototype.setSugarCrm = function(sugar) {
  var model = this.getModel();
  var bar = this.getChildAt(0);
  var panel = this.getChildAt(1);
  if (!sugar) {
    if (panel) {
      this.removeChild(panel, true);
      panel.dispose();
    }
    this.setModel(null);
    return;
  }
  if (!model) {
    model = new ydn.crm.su.model.Search(sugar);
    this.setModel(model);
    panel = new ydn.crm.su.ui.HoverResultList(model, this.getDomHelper());
    bar = new ydn.crm.su.ui.HomeBar(model, this.getDomHelper());
    this.addChild(bar, true);
    this.addChild(panel, true);
  } else {
    if (model.getSugar().getDomain() != sugar.getDomain()) {
      model = new ydn.crm.su.model.Search(sugar);
      this.setModel(model);
      bar.setModel(model);
      panel.setModel(model);
    }
  }
};


/**
 * @inheritDoc
 */
ydn.crm.su.ui.search.Page.prototype.toString = function() {
  return ydn.crm.ui.PageName.SUGAR_SEARCH;
};


/**
 * @override
 */
ydn.crm.su.ui.search.Page.prototype.onPageShow = function(obj) {
  var ul = this.getElement().querySelector('UL');
  if (ul && !ul.style.height) {
    var h = ydn.crm.ui.getPopupContentHeight(2);
    if (h) {
      ul.style.height = h;
    }
  }
};
