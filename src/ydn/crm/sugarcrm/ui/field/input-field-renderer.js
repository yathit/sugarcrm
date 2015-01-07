/**
 * @fileoverview Input field renderer for varchar, number and datetime.
 */


goog.provide('ydn.crm.sugarcrm.ui.field.InputFieldRenderer');
goog.require('ydn.crm.sugarcrm.ui.field.FieldRenderer');
goog.require('ydn.crm.ui');
goog.require('ydn.ui.FlyoutMenu');



/**
 * Create a new module record field.
 * @constructor
 * @struct
 * @extends {ydn.crm.sugarcrm.ui.field.FieldRenderer}
 */
ydn.crm.sugarcrm.ui.field.InputFieldRenderer = function() {
  goog.base(this);
};
goog.inherits(ydn.crm.sugarcrm.ui.field.InputFieldRenderer, ydn.crm.sugarcrm.ui.field.FieldRenderer);
goog.addSingletonGetter(ydn.crm.sugarcrm.ui.field.InputFieldRenderer);


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.ui.field.InputFieldRenderer.prototype.createDom = function(field) {
  var el = goog.base(this, 'createDom', field);

  /**
   * @type {ydn.crm.sugarcrm.model.Field}
   */
  var model = field.getModel();
  var dom = field.getDomHelper();

  var label = model.getLabel();
  // console.log(label, type, calculated);

  var input_type = 'text';
  var type = model.getType();
  if (type == 'datetimecombo') {
    input_type = 'datetime-local';
  } else if (type == 'int') {
    input_type = 'number';
  } else if (type == 'date') {
    input_type = 'date';
  } else {
    input_type = 'text';
  }

  var ele_value = dom.createDom('input', {
    'type': input_type,
    'class': ydn.crm.sugarcrm.ui.field.FieldRenderer.CSS_CLASS_VALUE,
    'title': label,
    'placeholder': label
  });
  if (model.isRequired()) {
    // Note: the value of 'required' attribute should be empty or 'required'.
    ele_value.setAttribute('required', '');
  }
  el.appendChild(ele_value);
  if (model.isCalculated()) {
    ele_value.setAttribute('disabled', '1');
  }

  var options = model.getMoreOptions();
  if (options.length > 0) {
    var more_el = dom.createDom('div', {
      'class': ydn.crm.sugarcrm.ui.field.FieldRenderer.CSS_CLASS_HOVER_BUTTON + ' ' +
          ydn.crm.ui.CSS_CLASS_MORE_MENU
    });
    el.appendChild(more_el);
    ydn.ui.FlyoutMenu.decoratePopupMenu(more_el, options);
  }

  return el;
};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.ui.field.InputFieldRenderer.prototype.refresh = function(ctrl) {
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

  if (is_def) {
    if (ele_value.type == 'datetime-local') {
      var lv = ydn.crm.sugarcrm.utils.toDateTimeLocalString(
          /** @type {string} */ (value));
      // console.log(value, lv);
      ele_value.value = lv;
    } else {
      ele_value.value = value;
    }
  } else {
    ele_value.value = '';
  }

  var more_el = ele_field.querySelector('.' + ydn.crm.ui.CSS_CLASS_MORE_MENU);
  if (more_el) {
    more_el.innerHTML = '';
    var options = model.getMoreOptions();
    var new_el = ydn.ui.FlyoutMenu.decoratePopupMenu(more_el, options);
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
ydn.crm.sugarcrm.ui.field.InputFieldRenderer.prototype.collectValue = function(ctrl) {
  var ele = ctrl.getContentElement();
  var ele_value = ele.querySelector('.' + ydn.crm.sugarcrm.ui.field.FieldRenderer.CSS_CLASS_VALUE);
  if (ele_value.type == 'datetime-local') {
    return ydn.crm.sugarcrm.utils.fromDateTimeLocalString(ele_value.valueAsNumber);
  } else {
    return ele_value.value;
  }
};


