/**
 * @fileoverview Panel for listed items.
 *
 * This module provide adding, linking and syncing.
 */


goog.provide('ydn.crm.sugarcrm.ui.group.List');
goog.require('ydn.crm.sugarcrm');
goog.require('ydn.crm.sugarcrm.model.Group');
goog.require('ydn.crm.sugarcrm.ui.group.Group');
goog.require('ydn.crm.sugarcrm.ui.group.ListRenderer');



/**
 * Panel for listed items.
 * @param {ydn.crm.sugarcrm.model.Group} model
 * @param {goog.dom.DomHelper=} opt_dom
 * @constructor
 * @struct
 * @extends {ydn.crm.sugarcrm.ui.group.Group}
 */
ydn.crm.sugarcrm.ui.group.List = function(model, opt_dom) {
  goog.base(this, model, opt_dom);
};
goog.inherits(ydn.crm.sugarcrm.ui.group.List, ydn.crm.sugarcrm.ui.group.Group);


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.ui.group.List.prototype.getContentElement = function() {
  return goog.dom.getElementByClass(ydn.crm.sugarcrm.ui.group.ListRenderer.CSS_CONTENT_CLASS,
      this.getElement());
};


/**
 * refresh.
 */
ydn.crm.sugarcrm.ui.group.List.prototype.refresh = function() {

  for (var i = 0; i < this.getChildCount(); i++) {
    var child = /** @type {ydn.crm.ui.Refreshable} */ (this.getChildAt(i));
    child.refresh();
  }
};


