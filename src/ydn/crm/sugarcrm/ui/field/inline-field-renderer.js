/**
 * @fileoverview Inline field renderer.
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */


goog.provide('ydn.crm.su.ui.field.InlineFieldRenderer');
goog.require('ydn.crm.su.ui.field.FieldRenderer');



/**
 * Inline field renderer.
 * @constructor
 * @struct
 * @extends {ydn.crm.su.ui.field.FieldRenderer}
 */
ydn.crm.su.ui.field.InlineFieldRenderer = function() {
  goog.base(this);
};
goog.inherits(ydn.crm.su.ui.field.InlineFieldRenderer, ydn.crm.su.ui.field.FieldRenderer);
goog.addSingletonGetter(ydn.crm.su.ui.field.InlineFieldRenderer);


/**
 * @const
 * @type {string}
 */
ydn.crm.su.ui.field.InlineFieldRenderer.CSS_CLASS = 'inline';


/**
 * @param {ydn.crm.su.ui.field.Field} field
 * @override
 */
ydn.crm.su.ui.field.InlineFieldRenderer.prototype.createDom = function(field) {

  /**
   * @type {ydn.crm.su.model.Field}
   */
  var model = field.getModel();
  var dom = field.getDomHelper();
  var input = dom.createDom('input');
  input.classList.add(ydn.crm.su.ui.field.FieldRenderer.CSS_CLASS_VALUE);
  input.setAttribute('data-tooltip', model.getLabel());

  var el = dom.createDom('span', this.getCssClass() + ' ' + ydn.crm.su.ui.field.InlineFieldRenderer.CSS_CLASS, [input]);
  el.setAttribute('name', model.getFieldName());
  field.setElementInternal(el);

  return input;
};


/**
 * @inheritDoc
 */
ydn.crm.su.ui.field.InlineFieldRenderer.prototype.refresh = function(ctrl) {
  var ele_field = ctrl.getElement();
  var input = ele_field.querySelector('input');
  var model = ctrl.getModel();
  goog.style.setElementShown(ele_field, !!model);
  if (!model) {
    return;
  }
  var value = model.getStringValue() || model.getDefaultStringValue();
  var is_def = goog.isString(value) ? !goog.string.isEmpty(value) :
      goog.isDefAndNotNull(value);
  // console.log(model.getFieldName() + ' ' + value);

  input.value = is_def ? value : '';
  if (ydn.crm.su.ui.field.FieldRenderer.DEBUG) {
    window.console.log(model.getFieldName(), model.getType(), value);
  }
  if (is_def) {
    ele_field.classList.remove(ydn.crm.su.ui.field.FieldRenderer.CSS_CLASS_EMPTY);
  } else {
    ele_field.classList.add(ydn.crm.su.ui.field.FieldRenderer.CSS_CLASS_EMPTY);
  }

  if (!model.getGroupName() && ctrl.getSetting().getNormallyHide()) {
    ele_field.classList.add(ydn.crm.ui.CSS_CLASS_NORMALLY_HIDE);
  }
};


/**
 * Collect data.
 * @param {ydn.crm.su.ui.field.Field} ctrl
 * @return {*} return value of the element.
 */
ydn.crm.su.ui.field.InlineFieldRenderer.prototype.collectValue = function(ctrl) {
  var ele_value = ctrl.getElement().querySelector('input');
  return ele_value.value;
};


