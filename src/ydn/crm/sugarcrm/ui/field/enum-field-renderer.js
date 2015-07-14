/**
 * @fileoverview SugarCrm module field with datalist suggestion.
 */


goog.provide('ydn.crm.su.ui.field.DataListFieldRenderer');
goog.require('ydn.crm.su.ui.field.InputFieldRenderer');



/**
 * SugarCrm module field with datalist suggestion.
 * @constructor
 * @struct
 * @extends {ydn.crm.su.ui.field.InputFieldRenderer}
 */
ydn.crm.su.ui.field.DataListFieldRenderer = function() {
  goog.base(this);
};
goog.inherits(ydn.crm.su.ui.field.DataListFieldRenderer, ydn.crm.su.ui.field.InputFieldRenderer);
goog.addSingletonGetter(ydn.crm.su.ui.field.DataListFieldRenderer);


/**
 * @inheritDoc
 */
ydn.crm.su.ui.field.DataListFieldRenderer.prototype.createDom = function(field) {
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


