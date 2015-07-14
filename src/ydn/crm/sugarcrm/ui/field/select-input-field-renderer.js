/**
 * @fileoverview Input field renderer with rel selector.
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */


goog.provide('ydn.crm.su.ui.field.SelectInputFieldRenderer');
goog.require('ydn.crm.su.ui.field.FieldRenderer');



/**
 * Create a new module record field.
 * @constructor
 * @struct
 * @extends {ydn.crm.su.ui.field.FieldRenderer}
 */
ydn.crm.su.ui.field.SelectInputFieldRenderer = function() {
  goog.base(this);
};
goog.inherits(ydn.crm.su.ui.field.SelectInputFieldRenderer, ydn.crm.su.ui.field.FieldRenderer);
goog.addSingletonGetter(ydn.crm.su.ui.field.SelectInputFieldRenderer);


/**
 * @inheritDoc
 */
ydn.crm.su.ui.field.SelectInputFieldRenderer.prototype.createDom = function(field) {
  var el = goog.base(this, 'createDom', field);
  /**
   * @type {ydn.crm.su.model.Field}
   */
  var model = field.getModel();
  var dom = field.getDomHelper();
  var label = model.getLabel();
  var ele_value = dom.createDom('select', {
    'class': ydn.crm.su.ui.field.FieldRenderer.CSS_CLASS_VALUE,
    'data-tooltip': label
  });

  /**
   * @type {SugarCrm.ModuleField}
   */
  var mf = model.getFieldInfo();
  for (var name in mf.options) {
    if (name) {
      var option = document.createElement('option');
      var val = mf.options[name];
      option.setAttribute('value', val.value);
      option.setAttribute('name', val.name);
      option.textContent = val.value;
      ele_value.appendChild(option);
    }
  }
  el.appendChild(ele_value);

  return el;
};
