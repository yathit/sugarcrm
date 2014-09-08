/**
 * @fileoverview Basic field renderer.
 */


goog.provide('ydn.crm.sugarcrm.ui.field.FieldRenderer');
goog.require('goog.dom.TagName');
goog.require('goog.dom.forms');
goog.require('ydn.ui.FlyoutMenu');



/**
 * Field renderer.
 * @constructor
 * @struct
 * @suppress {checkStructDictInheritance} suppress closure-library code.
 */
ydn.crm.sugarcrm.ui.field.FieldRenderer = function() {

};
goog.addSingletonGetter(ydn.crm.sugarcrm.ui.field.FieldRenderer);


/**
 * @define {boolean} debug flag.
 */
ydn.crm.sugarcrm.ui.field.FieldRenderer.DEBUG = false;


/**
 * @const
 * @type {string}
 */
ydn.crm.sugarcrm.ui.field.FieldRenderer.CSS_CLASS_EMPTY = 'empty';


/**
 * @const
 * @type {string}
 */
ydn.crm.sugarcrm.ui.field.FieldRenderer.CSS_CLASS_VALUE = 'value';


/**
 * @const
 * @type {string} button show on hover.
 */
ydn.crm.sugarcrm.ui.field.FieldRenderer.CSS_CLASS_HOVER_BUTTON = 'hover-button';


/**
 * @const
 * @type {string} trash icon button for deleting field value.
 */
ydn.crm.sugarcrm.ui.field.FieldRenderer.CSS_CLASS_ACTION_DETAIL = 'detail-field';


/**
 * @const
 * @type {string} trash icon button for deleting field value.
 */
ydn.crm.sugarcrm.ui.field.FieldRenderer.CSS_CLASS_ACTION_DELETE = 'delete-field';


/**
 * @const
 * @type {string} confirm again for deleting field value
 */
ydn.crm.sugarcrm.ui.field.FieldRenderer.CSS_CLASS_CONFIRM = 'confirm';


/**
 * @const
 * @type {string}
 */
ydn.crm.sugarcrm.ui.field.FieldRenderer.CSS_CLASS = 'field';


/** @return {string} */
ydn.crm.sugarcrm.ui.field.FieldRenderer.prototype.getCssClass = function() {
  return ydn.crm.sugarcrm.ui.field.FieldRenderer.CSS_CLASS;
};


/**
 * A quick UID.
 * @type {string}
 */
ydn.crm.sugarcrm.ui.field.FieldRenderer.UID = 'ydnf-';


/**
 * Make datalist of given enum field. If already exist, this will return it.
 * @param {string} mn module name.
 * @param {SugarCrm.ModuleField} mf field info.
 * @return {?string} datalist id, null if field info is does not have option list.
 */
ydn.crm.sugarcrm.ui.field.FieldRenderer.getDataList = function(mn, mf) {
  var id = ydn.crm.sugarcrm.ui.field.FieldRenderer.UID +
      ydn.crm.sugarcrm.model.Field.getFieldId(mn, mf.name);
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
 * @param {ydn.crm.sugarcrm.ui.field.Field} field
 * @return {Element}
 */
ydn.crm.sugarcrm.ui.field.FieldRenderer.prototype.createDom = function(field) {

  /**
   * @type {ydn.crm.sugarcrm.model.Field}
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
 * @param {ydn.crm.sugarcrm.ui.field.Field} ctrl controller.
 */
ydn.crm.sugarcrm.ui.field.FieldRenderer.prototype.refresh = function(ctrl) {
  var ele_field = ctrl.getElement();
  var model = ctrl.getModel();
  goog.style.setElementShown(ele_field, !!model);
  if (!model) {
    return;
  }
  var value = model.getFieldValue();
  ele_field.textContent = value;
  if (ydn.crm.sugarcrm.ui.field.FieldRenderer.DEBUG) {
    window.console.log(model.getFieldName(), model.getType(), value);
  }
  var label = model.getLabel();
  if (label) {
    ele_field.setAttribute('title', label);
  } else {
    ele_field.removeAttribute('title');
  }

  var is_def = goog.isString(value) ? !goog.string.isEmpty(value) :
      goog.isDefAndNotNull(value);
  if (is_def) {
    ele_field.classList.remove(ydn.crm.sugarcrm.ui.field.FieldRenderer.CSS_CLASS_EMPTY);
  } else {
    ele_field.classList.add(ydn.crm.sugarcrm.ui.field.FieldRenderer.CSS_CLASS_EMPTY);
  }

  if (!model.getGroupName() && ctrl.getSetting().getNormallyHide()) {
    ele_field.classList.add(ydn.crm.ui.CSS_CLASS_NORMALLY_HIDE);
  } else {
    ele_field.classList.remove(ydn.crm.ui.CSS_CLASS_NORMALLY_HIDE);
  }
};


/**
 * Collect data.
 * @param {ydn.crm.sugarcrm.ui.field.Field} ctrl
 * @return {*} return value of the element.
 */
ydn.crm.sugarcrm.ui.field.FieldRenderer.prototype.collectValue = function(ctrl) {
  var ele = ctrl.getContentElement();
  return ele.textContent;
};





