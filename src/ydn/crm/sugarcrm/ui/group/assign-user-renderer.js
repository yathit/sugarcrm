/**
 * @fileoverview Simple group component renderer.
 *
 */


goog.provide('ydn.crm.su.ui.group.AssignUserRenderer');
goog.require('ydn.crm.su.ui.group.SimpleGroupRenderer');



/**
 * Simple group component renderer.
 * @constructor
 * @struct
 * @extends {ydn.crm.su.ui.group.SimpleGroupRenderer}
 */
ydn.crm.su.ui.group.AssignUserRenderer = function() {
  goog.base(this);
};
goog.inherits(ydn.crm.su.ui.group.AssignUserRenderer,
    ydn.crm.su.ui.group.SimpleGroupRenderer);
goog.addSingletonGetter(ydn.crm.su.ui.group.AssignUserRenderer);


/**
 * @inheritDoc
 */
ydn.crm.su.ui.group.AssignUserRenderer.prototype.decorate = function(x) {
  goog.base(this, 'decorate', x);
  var ctrl = /** @type {ydn.crm.su.ui.group.AssignUser} */(x);
  /**
   * @type {ydn.crm.su.model.AssignUserGroup}
   */
  var model = ctrl.getModel();
  var input = ctrl.getContentElement().querySelector('input');
  input.setAttribute('list', ctrl.getDataListId());
};




