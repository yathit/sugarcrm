/**
 * @fileoverview SugarCrm module field.
 */


goog.provide('ydn.crm.su.ui.field.CheckboxFieldRenderer');
goog.require('ydn.crm.su.ui.field.FieldRenderer');



/**
 * Create a new module record field.
 * @constructor
 * @struct
 * @extends {ydn.crm.su.ui.field.FieldRenderer}
 */
ydn.crm.su.ui.field.CheckboxFieldRenderer = function() {
  goog.base(this);
};
goog.inherits(ydn.crm.su.ui.field.CheckboxFieldRenderer, ydn.crm.su.ui.field.FieldRenderer);
goog.addSingletonGetter(ydn.crm.su.ui.field.CheckboxFieldRenderer);


/**
 * @define {boolean} debug flag.
 */
ydn.crm.su.ui.field.CheckboxFieldRenderer.DEBUG = false;


/**
 * @inheritDoc
 */
ydn.crm.su.ui.field.CheckboxFieldRenderer.prototype.createDom = function(field) {
  var el = goog.base(this, 'createDom', field);

  /**
   * @type {ydn.crm.su.model.Field}
   */
  var model = field.getModel();
  var dom = field.getDomHelper();

  var label = model.getLabel();
  var calculated = model.isCalculated();
  // console.log(label, type, calculated);
  var id = goog.ui.IdGenerator.getInstance().getNextUniqueId();
  var ele_value = dom.createDom('input', {
    'type': 'checkbox',
    'id': id
  });
  var ele_label = dom.createDom('label', {'for': id}, label);
  if (calculated) {
    ele_value.setAttribute('disabled', 'true');
  }
  ele_value.classList.add(ydn.crm.su.ui.field.FieldRenderer.CSS_CLASS_VALUE);
  // ele_value.setAttribute('disabled', '1');

  el.appendChild(ele_value);
  el.appendChild(ele_label);
  return el;
};


/**
 * @inheritDoc
 */
ydn.crm.su.ui.field.CheckboxFieldRenderer.prototype.refresh = function(ctrl) {
  var ele_field = ctrl.getElement();
  var model = ctrl.getModel();
  goog.style.setElementShown(ele_field, !!model);
  if (!model) {
    return;
  }
  var value = model.getField();
  var is_def = goog.isString(value) ? !goog.string.isEmpty(value) :
      goog.isDefAndNotNull(value);
  // console.log(model.getFieldName() + ' ' + value);
  var ele_value = ele_field.querySelector('.' + ydn.crm.su.ui.field.FieldRenderer.CSS_CLASS_VALUE);

  if (model.getType() == 'bool' && !goog.isBoolean(value)) {
    if (value == '1' || value == 'on' || value == 'true') {
      value = true;
    } else {
      value = false;
    }
  }
  ele_value.checked = value;

  if (ydn.crm.su.ui.field.CheckboxFieldRenderer.DEBUG) {
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
ydn.crm.su.ui.field.CheckboxFieldRenderer.prototype.collectValue = function(ctrl) {
  var ele = ctrl.getContentElement();
  var ele_value = ele.querySelector('.' + ydn.crm.su.ui.field.FieldRenderer.CSS_CLASS_VALUE);
  return ele_value.checked; // goog.dom.forms get value incorrect.
};


/**
 * Simulate user edit.
 * @param {ydn.crm.su.ui.field.Field} ctrl
 * @param {ydn.crm.su.RecordValue} value value to set.
 */
ydn.crm.su.ui.field.CheckboxFieldRenderer.prototype.simulateEdit = function(ctrl, value) {
  var ele = ctrl.getContentElement();
  var ele_value = ele.querySelector('.' + ydn.crm.su.ui.field.FieldRenderer.CSS_CLASS_VALUE);
  var model = ctrl.getModel();
  if (model.getType() == 'bool' && !goog.isBoolean(value)) {
    if (value == '1' || value == 'on' || value == 'true') {
      value = true;
    } else {
      value = false;
    }
  }
  ele_value.checked = value;
};

