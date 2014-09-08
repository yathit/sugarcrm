/**
 * @fileoverview Field renderer with more options menu.
 */


goog.provide('ydn.crm.sugarcrm.ui.field.LabelRenderer');
goog.require('ydn.crm.sugarcrm.ui.field.FieldRenderer');



/**
 * Field renderer with more options menu.
 * @constructor
 * @struct
 * @extends {ydn.crm.sugarcrm.ui.field.FieldRenderer}
 */
ydn.crm.sugarcrm.ui.field.LabelRenderer = function() {
  goog.base(this);
};
goog.inherits(ydn.crm.sugarcrm.ui.field.LabelRenderer, ydn.crm.sugarcrm.ui.field.FieldRenderer);
goog.addSingletonGetter(ydn.crm.sugarcrm.ui.field.LabelRenderer);


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.ui.field.LabelRenderer.prototype.createDom = function(field) {
  var el = goog.base(this, 'createDom', field);

  /**
   * @type {ydn.crm.sugarcrm.model.Field}
   */
  var model = field.getModel();
  var dom = field.getDomHelper();

  var label = model.getLabel();
  // console.log(label, type, calculated);

  var ele_value = dom.createDom('label', {
    'class': ydn.crm.sugarcrm.ui.field.FieldRenderer.CSS_CLASS_VALUE,
    'title': label
  });
  el.appendChild(ele_value);

  var options = model.getMoreOptions();
  if (options.length > 0) {
    var more_el = dom.createDom('label', {
      'class': ydn.crm.ui.CSS_CLASS_MORE_MENU
    });
    el.appendChild(more_el);
    ydn.ui.FlyoutMenu.decoratePopupMenu(more_el, options);
  }

  return el;
};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.ui.field.LabelRenderer.prototype.refresh = function(ctrl) {
  var ele_field = ctrl.getElement();
  var model = ctrl.getModel();
  goog.style.setElementShown(ele_field, !!model);
  if (!model) {
    return;
  }
  var value = model.getFieldValue();
  var is_def = goog.isString(value) ? !goog.string.isEmpty(value) :
      goog.isDefAndNotNull(value);
  // console.log(model.getFieldName() + ' ' + value);
  var ele_value = ele_field.querySelector('.' + ydn.crm.sugarcrm.ui.field.FieldRenderer.CSS_CLASS_VALUE);
  ele_value.textContent = is_def ? value : '';

  var more_el = ele_field.querySelector('.' + ydn.crm.ui.CSS_CLASS_MORE_MENU);
  if (more_el) {
    more_el.innerHTML = '';
    var options = model.getMoreOptions();
    ydn.ui.FlyoutMenu.decoratePopupMenu(more_el, options);
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



