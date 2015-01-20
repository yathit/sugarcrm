/**
 * @fileoverview Input field renderer with rel selector.
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */


goog.provide('ydn.crm.sugarcrm.ui.field.SelectInputFieldRenderer');
goog.require('ydn.crm.sugarcrm.ui.field.InputFieldRenderer');



/**
 * Create a new module record field.
 * @constructor
 * @struct
 * @extends {ydn.crm.sugarcrm.ui.field.InputFieldRenderer}
 */
ydn.crm.sugarcrm.ui.field.SelectInputFieldRenderer = function() {
  goog.base(this);
};
goog.inherits(ydn.crm.sugarcrm.ui.field.SelectInputFieldRenderer, ydn.crm.sugarcrm.ui.field.InputFieldRenderer);
goog.addSingletonGetter(ydn.crm.sugarcrm.ui.field.SelectInputFieldRenderer);

