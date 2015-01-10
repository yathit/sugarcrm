/**
 * @fileoverview Simple group component renderer.
 *
 */


goog.provide('ydn.crm.sugarcrm.ui.group.AssignUserRenderer');
goog.require('ydn.crm.sugarcrm.ui.group.SimpleGroupRenderer');



/**
 * Simple group component renderer.
 * @constructor
 * @struct
 * @extends {ydn.crm.sugarcrm.ui.group.SimpleGroupRenderer}
 */
ydn.crm.sugarcrm.ui.group.AssignUserRenderer = function() {
  goog.base(this);
};
goog.inherits(ydn.crm.sugarcrm.ui.group.AssignUserRenderer,
    ydn.crm.sugarcrm.ui.group.SimpleGroupRenderer);
goog.addSingletonGetter(ydn.crm.sugarcrm.ui.group.AssignUserRenderer);


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.ui.group.AssignUserRenderer.prototype.decorate = function(x) {
  goog.base(this, 'decorate', x);
  var ctrl = /** @type {ydn.crm.sugarcrm.ui.group.AssignUser} */(x);
  /**
   * @type {ydn.crm.sugarcrm.model.AssignUserGroup}
   */
  var model = ctrl.getModel();
  var input = ctrl.getContentElement().querySelector('input');
  input.setAttribute('list', ctrl.getDataListId());
};




