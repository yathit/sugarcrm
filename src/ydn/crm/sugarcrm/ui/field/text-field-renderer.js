/**
 * @fileoverview SugarCrm module field.
 */


goog.provide('ydn.crm.sugarcrm.ui.field.TextFieldRenderer');
goog.require('ydn.crm.sugarcrm.ui.field.FieldRenderer');



/**
 * Create a new module record field.
 * @constructor
 * @struct
 * @extends {ydn.crm.sugarcrm.ui.field.FieldRenderer}
 */
ydn.crm.sugarcrm.ui.field.TextFieldRenderer = function() {
  goog.base(this);
};
goog.inherits(ydn.crm.sugarcrm.ui.field.TextFieldRenderer, ydn.crm.sugarcrm.ui.field.FieldRenderer);
goog.addSingletonGetter(ydn.crm.sugarcrm.ui.field.TextFieldRenderer);


/**
 * @param {ydn.crm.sugarcrm.ui.field.Field} field
 */
ydn.crm.sugarcrm.ui.field.TextFieldRenderer.prototype.createDom = function(field) {

  var el = goog.base(this, 'createDom', field);

  /**
   * @type {ydn.crm.sugarcrm.model.Field}
   */
  var model = field.getModel();
  var dom = field.getDomHelper();
  var ele_value;
  var ele_label;
  var label = model.getLabel();
  // console.log(label, type, calculated);

  ele_value = dom.createDom(goog.dom.TagName.TEXTAREA, {
    'class': ydn.crm.sugarcrm.ui.field.FieldRenderer.CSS_CLASS_VALUE,
    'title': label,
    'rows': '4',
    'placeholder': label
  });
  // ele_value.setAttribute('disabled', '1');

  el.appendChild(ele_value);
  return el;
};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.ui.field.TextFieldRenderer.prototype.refresh = function(ctrl) {
  var ele_field = ctrl.getElement();
  var model = ctrl.getModel();
  goog.style.setElementShown(ele_field, !!model);
  if (!model) {
    return;
  }
  var value = model.getStringValue();
  var is_def = goog.isString(value) ? !goog.string.isEmpty(value) :
      goog.isDefAndNotNull(value);
  // console.log(model.getFieldName() + ' ' + value);
  var ele_value = ele_field.querySelector('.' + ydn.crm.sugarcrm.ui.field.FieldRenderer.CSS_CLASS_VALUE);
  ele_value.value = is_def ? value : '';
  if (ydn.crm.sugarcrm.ui.field.FieldRenderer.DEBUG) {
    window.console.log(model.getFieldName(), model.getType(), value);
  }
  if (is_def) {
    ele_field.classList.remove(ydn.crm.sugarcrm.ui.field.FieldRenderer.CSS_CLASS_EMPTY);
  } else {
    ele_field.classList.add(ydn.crm.sugarcrm.ui.field.FieldRenderer.CSS_CLASS_EMPTY);
  }

  if (!model.getGroupName() && ctrl.getSetting().getNormallyHide()) {
    ele_field.classList.add(ydn.crm.ui.CSS_CLASS_NORMALLY_HIDE);
  }
};


/**
 * Collect data.
 * @param {ydn.crm.sugarcrm.ui.field.Field} ctrl
 * @return {*} return value of the element.
 */
ydn.crm.sugarcrm.ui.field.TextFieldRenderer.prototype.collectValue = function(ctrl) {
  var ele = ctrl.getContentElement();
  var ele_value = ele.querySelector('.' + ydn.crm.sugarcrm.ui.field.FieldRenderer.CSS_CLASS_VALUE);
  if (ele_value.tagName == goog.dom.TagName.LABEL ||
      ele_value.tagName == goog.dom.TagName.SPAN || ele_value.tagName == goog.dom.TagName.DIV) {
    return ele_value.textContent;
  } else if (ele_value.type == 'checkbox') {
    return ele_value.checked; // goog.dom.forms get value incorrect.
  } else {
    return ele_value.value; // goog.dom.forms.getValue(ele_value);
  }
};


