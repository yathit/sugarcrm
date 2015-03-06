/**
 * @fileoverview Input field renderer for varchar, number and datetime.
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */


goog.provide('ydn.crm.su.ui.field.InputFieldRenderer');
goog.require('ydn.crm.su.ui.field.FieldRenderer');
goog.require('ydn.crm.ui');
goog.require('ydn.ui.FlyoutMenu');



/**
 * Create a new module record field.
 * @constructor
 * @struct
 * @extends {ydn.crm.su.ui.field.FieldRenderer}
 */
ydn.crm.su.ui.field.InputFieldRenderer = function() {
  goog.base(this);
};
goog.inherits(ydn.crm.su.ui.field.InputFieldRenderer, ydn.crm.su.ui.field.FieldRenderer);
goog.addSingletonGetter(ydn.crm.su.ui.field.InputFieldRenderer);


/**
 * @inheritDoc
 */
ydn.crm.su.ui.field.InputFieldRenderer.prototype.createDom = function(field) {
  var el = goog.base(this, 'createDom', field);

  /**
   * @type {ydn.crm.su.model.Field}
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
    'class': ydn.crm.su.ui.field.FieldRenderer.CSS_CLASS_VALUE,
    'data-tooltip': label,
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

  var items = model.getMoreOptions();
  if (items.length > 0) {
    var more_el = dom.createDom('div', {
      'class': ydn.crm.su.ui.field.FieldRenderer.CSS_CLASS_HOVER_BUTTON + ' ' +
          ydn.crm.ui.CSS_CLASS_MORE_MENU
    });
    el.appendChild(more_el);
    ydn.ui.FlyoutMenu.decoratePopupMenu(more_el, items);
  }

  return el;
};


/**
 * @inheritDoc
 */
ydn.crm.su.ui.field.InputFieldRenderer.prototype.refresh = function(ctrl) {
  var ele_field = ctrl.getElement();
  /**
   * @type {ydn.crm.su.model.Field}
   */
  var model = ctrl.getModel();
  goog.style.setElementShown(ele_field, !!model);
  if (!model) {
    return;
  }

  // console.log(model.getFieldName() + ' ' + value);
  var ele_value = ele_field.querySelector('.' + ydn.crm.su.ui.field.FieldRenderer.CSS_CLASS_VALUE);

  var value = model.getStringValue();
  if (!value) {
    var df = model.getDefaultStringValue();
    if (!goog.isNull(df)) {
      value = df;
    }
  }

  if (value) {
    if (ele_value.type == 'datetime-local') {
      var lv = ydn.crm.su.utils.toDateTimeLocalString(
          /** @type {string} */ (value));
      // console.log(value, lv);
      ele_value.value = lv;
    } else {
      ele_value.value = value;
    }
    ele_field.classList.remove(ydn.crm.su.ui.field.FieldRenderer.CSS_CLASS_EMPTY);
  } else {
    ele_value.value = '';
    ele_field.classList.add(ydn.crm.su.ui.field.FieldRenderer.CSS_CLASS_EMPTY);
  }

  var more_el = ele_field.querySelector('.' + ydn.crm.ui.CSS_CLASS_MORE_MENU);
  if (more_el) {
    more_el.innerHTML = '';
    var options = model.getMoreOptions();
    var new_el = ydn.ui.FlyoutMenu.decoratePopupMenu(more_el, options);
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
ydn.crm.su.ui.field.InputFieldRenderer.prototype.collectValue = function(ctrl) {
  var ele = ctrl.getContentElement();
  var ele_value = ele.querySelector('.' + ydn.crm.su.ui.field.FieldRenderer.CSS_CLASS_VALUE);
  if (ele_value.type == 'datetime-local') {
    return ydn.crm.su.utils.fromDateTimeLocalString(ele_value.valueAsNumber);
  } else {
    return ele_value.value;
  }
};


/**
 * Simulate user edit.
 * @param {ydn.crm.su.ui.field.Field} ctrl
 * @param {ydn.crm.su.RecordValue} value value to set.
 */
ydn.crm.su.ui.field.InputFieldRenderer.prototype.simulateEdit = function(ctrl, value) {
  var ele = ctrl.getContentElement();
  var ele_value = ele.querySelector('.' + ydn.crm.su.ui.field.FieldRenderer.CSS_CLASS_VALUE);
  if (value) {
    if (ele_value.type == 'datetime-local') {
      var lv = ydn.crm.su.utils.toDateTimeLocalString(
          /** @type {string} */ (value));
      // console.log(value, lv);
      ele_value.value = lv;
    } else {
      ele_value.value = value;
    }
  } else {
    ele_value.value = '';
  }
};

