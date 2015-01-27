/**
 * @fileoverview Input field renderer with rel selector.
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */


goog.provide('ydn.crm.su.ui.field.SelectInputFieldRenderer');
goog.require('ydn.crm.su.ui.field.InputFieldRenderer');



/**
 * Create a new module record field.
 * @constructor
 * @struct
 * @extends {ydn.crm.su.ui.field.InputFieldRenderer}
 */
ydn.crm.su.ui.field.SelectInputFieldRenderer = function() {
  goog.base(this);
};
goog.inherits(ydn.crm.su.ui.field.SelectInputFieldRenderer, ydn.crm.su.ui.field.InputFieldRenderer);
goog.addSingletonGetter(ydn.crm.su.ui.field.SelectInputFieldRenderer);

