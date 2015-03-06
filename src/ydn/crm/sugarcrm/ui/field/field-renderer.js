/**
 * @fileoverview Basic field renderer for string field value.
 */


goog.provide('ydn.crm.su.ui.field.FieldRenderer');
goog.require('goog.dom.TagName');
goog.require('goog.dom.forms');
goog.require('ydn.ui.FlyoutMenu');



/**
 * Basic field renderer for string field value.
 * @constructor
 * @struct
 * @suppress {checkStructDictInheritance} suppress closure-library code.
 */
ydn.crm.su.ui.field.FieldRenderer = function() {

};
goog.addSingletonGetter(ydn.crm.su.ui.field.FieldRenderer);


/**
 * @define {boolean} debug flag.
 */
ydn.crm.su.ui.field.FieldRenderer.DEBUG = false;


/**
 * @const
 * @type {string}
 */
ydn.crm.su.ui.field.FieldRenderer.CSS_CLASS_EMPTY = 'empty';


/**
 * @const
 * @type {string}
 */
ydn.crm.su.ui.field.FieldRenderer.CSS_CLASS_VALUE = 'value';


/**
 * @const
 * @type {string} button show on hover.
 */
ydn.crm.su.ui.field.FieldRenderer.CSS_CLASS_HOVER_BUTTON = 'hover-button';


/**
 * @const
 * @type {string} trash icon button for deleting field value.
 */
ydn.crm.su.ui.field.FieldRenderer.CSS_CLASS_ACTION_DETAIL = 'detail-field';


/**
 * @const
 * @type {string} trash icon button for deleting field value.
 */
ydn.crm.su.ui.field.FieldRenderer.CSS_CLASS_ACTION_DELETE = 'delete-field';


/**
 * @const
 * @type {string} confirm again for deleting field value
 */
ydn.crm.su.ui.field.FieldRenderer.CSS_CLASS_CONFIRM = 'confirm';


/**
 * @const
 * @type {string}
 */
ydn.crm.su.ui.field.FieldRenderer.CSS_CLASS = 'field';


/** @return {string} */
ydn.crm.su.ui.field.FieldRenderer.prototype.getCssClass = function() {
  return ydn.crm.su.ui.field.FieldRenderer.CSS_CLASS;
};


/**
 * A quick UID.
 * @type {string}
 */
ydn.crm.su.ui.field.FieldRenderer.UID = 'ydnf-';


/**
 * Make datalist of given enum field. If already exist, this will return it.
 * @param {string} mn module name.
 * @param {SugarCrm.ModuleField} mf field info.
 * @return {?string} datalist id, null if field info is does not have option list.
 */
ydn.crm.su.ui.field.FieldRenderer.getDataList = function(mn, mf) {
  var id = ydn.crm.su.ui.field.FieldRenderer.UID +
      ydn.crm.su.model.Field.getFieldId(mn, mf.name);
  if (mf.options) {
    if (!document.getElementById(id)) {
      var datalist = document.createElement('datalist');
      datalist.id = id;
      for (var name in mf.options) {
        if (name) {
          var option = document.createElement('option');
          option.setAttribute('value', name);
          datalist.appendChild(option);
        }
      }
      document.body.appendChild(datalist);
    }
    return id;
  } else {
    return null;
  }
};


/**
 * @param {ydn.crm.su.ui.field.Field} field
 * @return {Element}
 */
ydn.crm.su.ui.field.FieldRenderer.prototype.createDom = function(field) {

  /**
   * @type {ydn.crm.su.model.Field}
   */
  var model = field.getModel();
  var dom = field.getDomHelper();
  var el = dom.createDom('div');
  el.classList.add(this.getCssClass());
  el.setAttribute('name', model.getFieldName());

  field.setElementInternal(el);
  return el;
};


/**
 * @param {ydn.crm.su.ui.field.Field} ctrl controller.
 */
ydn.crm.su.ui.field.FieldRenderer.prototype.refresh = function(ctrl) {
  var ele_field = ctrl.getElement();
  /**
   * @type {ydn.crm.su.model.Field}
   */
  var model = ctrl.getModel();
  goog.style.setElementShown(ele_field, !!model);
  if (!model) {
    return;
  }
  var value = model.getStringValue();
  ele_field.textContent = value;
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
 * Collect data.
 * @param {ydn.crm.su.ui.field.Field} ctrl
 * @return {*} return value of the element.
 */
ydn.crm.su.ui.field.FieldRenderer.prototype.collectValue = function(ctrl) {
  var ele = ctrl.getContentElement();
  return ele.textContent;
};


/**
 * Simulate user edit.
 * @param {ydn.crm.su.ui.field.Field} ctrl
 * @param {ydn.crm.su.RecordValue} val value to set.
 */
ydn.crm.su.ui.field.FieldRenderer.prototype.simulateEdit = function(ctrl, val) {
  var ele = ctrl.getContentElement();
  ele.textContent = goog.isDefAndNotNull(val) ? val : '';
};


/**
 * Get field input element.
 * @param {ydn.crm.su.ui.field.Field} ctrl
 * @return {?Element} `null` if not applicable.
 */
ydn.crm.su.ui.field.FieldRenderer.prototype.getInputElement = function(ctrl) {
  return ctrl.getElement().querySelector('input');
};


/**
 * Get more menu element.
 * @param {ydn.crm.su.ui.field.Field} ctrl
 * @return {?Element} `null` if not applicable.
 */
ydn.crm.su.ui.field.FieldRenderer.prototype.getMoreMenuElement = function(ctrl) {
  return ctrl.getElement().getElementsByClassName(
      ydn.crm.ui.CSS_CLASS_MORE_MENU)[0] || null;
};




