/**
 * @fileoverview SugarCrm module field.
 */


goog.provide('ydn.crm.su.ui.field.EnumFieldRenderer');
goog.require('ydn.crm.su.ui.field.InputFieldRenderer');



/**
 * Create a new module record field.
 * @constructor
 * @struct
 * @extends {ydn.crm.su.ui.field.InputFieldRenderer}
 */
ydn.crm.su.ui.field.EnumFieldRenderer = function() {
  goog.base(this);
};
goog.inherits(ydn.crm.su.ui.field.EnumFieldRenderer, ydn.crm.su.ui.field.InputFieldRenderer);
goog.addSingletonGetter(ydn.crm.su.ui.field.EnumFieldRenderer);


/**
 * @inheritDoc
 */
ydn.crm.su.ui.field.EnumFieldRenderer.prototype.createDom = function(field) {
  var el = goog.base(this, 'createDom', field);
  var model = field.getModel();
  var ele_value = el.querySelector('.' + ydn.crm.su.ui.field.FieldRenderer.CSS_CLASS_VALUE);
  ele_value.classList.add('enum');
  var lid = field.getDataList();
  if (lid) {
    ele_value.setAttribute('list', lid);
  }
  return el;
};


