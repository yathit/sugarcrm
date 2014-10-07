/**
 * @fileoverview Panel for name group fields.
 *
 * This module provide adding, linking and syncing.
 */


goog.provide('ydn.crm.sugarcrm.ui.group.Email');
goog.require('goog.ui.PopupMenu');
goog.require('ydn.crm.sugarcrm');
goog.require('ydn.crm.sugarcrm.model.EmailGroup');
goog.require('ydn.crm.sugarcrm.ui.group.Group');



/**
 * Panel for name group fields.
 * @param {ydn.crm.sugarcrm.model.EmailGroup} model
 * @param {goog.dom.DomHelper=} opt_dom
 * @constructor
 * @struct
 * @extends {ydn.crm.sugarcrm.ui.group.Group}
 */
ydn.crm.sugarcrm.ui.group.Email = function(model, opt_dom) {
  var renderer = ydn.crm.sugarcrm.ui.group.GroupRenderer.getInstance();
  goog.base(this, model, renderer, opt_dom);
  /**
   * @type {goog.ui.PopupMenu}
   * @private
   */
  this.popup_menu_ = null;
};
goog.inherits(ydn.crm.sugarcrm.ui.group.Email, ydn.crm.sugarcrm.ui.group.Group);


/**
 * @return {ydn.crm.sugarcrm.model.EmailGroup}
 * @override
 */
ydn.crm.sugarcrm.ui.group.Email.prototype.getModel;


/**
 * @override
 */
ydn.crm.sugarcrm.ui.group.Email.prototype.reset = function() {
  // we have to remove child, Field, because their name, i.e., bean id
  // are not same for different record.
  for (var i = this.getChildCount() - 1; i >= 0; i--) {
    var child = this.removeChildAt(i);
    child.dispose();
  }
  this.createFields();
  /*
  var model = this.getModel();
  var fields = model.listFields();
  console.log('email reset', model, fields);
  */
};


