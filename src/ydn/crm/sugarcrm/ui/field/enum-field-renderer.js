/**
 * @fileoverview SugarCrm module field.
 */


goog.provide('ydn.crm.sugarcrm.ui.field.EnumFieldRenderer');
goog.require('ydn.crm.sugarcrm.ui.field.InputFieldRenderer');



/**
 * Create a new module record field.
 * @constructor
 * @struct
 * @extends {ydn.crm.sugarcrm.ui.field.InputFieldRenderer}
 */
ydn.crm.sugarcrm.ui.field.EnumFieldRenderer = function() {
  goog.base(this);
};
goog.inherits(ydn.crm.sugarcrm.ui.field.EnumFieldRenderer, ydn.crm.sugarcrm.ui.field.InputFieldRenderer);
goog.addSingletonGetter(ydn.crm.sugarcrm.ui.field.EnumFieldRenderer);


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.ui.field.EnumFieldRenderer.prototype.createDom = function(field) {
  var el = goog.base(this, 'createDom', field);
  var model = field.getModel();
  var ele_value = el.querySelector('.' + ydn.crm.sugarcrm.ui.field.FieldRenderer.CSS_CLASS_VALUE);
  ele_value.classList.add('enum');
  var lid = field.getDataList();
  if (lid) {
    ele_value.setAttribute('list', lid);
  }
  return el;
};


