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
    'class': ydn.crm.su.ui.field.FieldRenderer.CSS_CLASS_VALUE
  });

  var ele_label = dom.createDom('span',
      ydn.crm.su.ui.field.FieldRenderer.CSS_CLASS_LABEL, label);

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
  el.appendChild(ele_label);
  el.appendChild(ele_value);

  return el;
};


/**
 * @inheritDoc
 */
ydn.crm.su.ui.field.SelectInputFieldRenderer.prototype.refresh = function(ctrl) {
  var ele_field = ctrl.getElement();
  /**
   * @type {ydn.crm.su.model.Field}
   */
  var model = ctrl.getModel();
  goog.style.setElementShown(ele_field, !!model);
  if (!model) {
    return;
  }
  var val_el = ele_field.querySelector('select');
  var value = model.getStringValue();
  val_el.value = value;
  if (ydn.crm.su.ui.field.FieldRenderer.DEBUG) {
    window.console.log(model.getFieldName(), model.getType(), value);
  }
  var label = model.getLabel();
  if (label) {
    ele_field.setAttribute('data-tooltip', label);
  } else {
    ele_field.removeAttribute('data-tooltip');
  }

  var is_def = model.hasFieldValue();
  if (is_def) {
    ele_field.classList.remove(ydn.crm.su.ui.field.FieldRenderer.CSS_CLASS_EMPTY);
  } else {
    ele_field.classList.add(ydn.crm.su.ui.field.FieldRenderer.CSS_CLASS_EMPTY);
  }

  if (!model.getGroupName() && ctrl.getSetting().getNormallyHide()) {
    ele_field.classList.add(ydn.crm.ui.CSS_CLASS_NORMALLY_HIDE);
  } else {
    ele_field.classList.remove(ydn.crm.ui.CSS_CLASS_NORMALLY_HIDE);
  }
};


/**
 * @inheritDoc
 */
ydn.crm.su.ui.field.SelectInputFieldRenderer.prototype.getInputElement = function(ctrl) {
  return ctrl.getElement().querySelector('select');
};


/**
 * @inheritDoc
 */
ydn.crm.su.ui.field.SelectInputFieldRenderer.prototype.collectValue = function(ctrl) {
  var ele = this.getInputElement(ctrl);
  return ele.value;
};


/**
 * @inheritDoc
 */
ydn.crm.su.ui.field.SelectInputFieldRenderer.prototype.simulateEdit = function(ctrl, val) {
  var ele = this.getInputElement(ctrl);
  ele.value = goog.isDefAndNotNull(val) ? val : '';
};

