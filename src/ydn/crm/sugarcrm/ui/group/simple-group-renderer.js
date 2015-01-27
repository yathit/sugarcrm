/**
 * @fileoverview Simple group component renderer.
 *
 */


goog.provide('ydn.crm.su.ui.group.SimpleGroupRenderer');
goog.require('ydn.crm.su.ui.field.FieldRenderer');



/**
 * Simple group component renderer.
 * @constructor
 * @struct
 */
ydn.crm.su.ui.group.SimpleGroupRenderer = function() {
};
goog.addSingletonGetter(ydn.crm.su.ui.group.SimpleGroupRenderer);


/**
 * @param {ydn.crm.su.ui.group.SimpleGroup} ctrl
 */
ydn.crm.su.ui.group.SimpleGroupRenderer.prototype.decorate = function(ctrl) {
  /**
   * @type {ydn.crm.su.model.BaseGroup}
   */
  var model = ctrl.getModel();
  var dom = ctrl.getDomHelper();

  var root = dom.createDom('div', ydn.crm.su.ui.field.FieldRenderer.CSS_CLASS);

  var label = model.getGroupLabel();

  var ele_value = dom.createDom('input', {
    'type': 'text',
    'class': ydn.crm.su.ui.field.FieldRenderer.CSS_CLASS_VALUE,
    'title': label,
    'placeholder': label
  });
  root.appendChild(ele_value);

  var options = model.getAdditionalOptions();
  if (goog.isArray(options)) {
    var more_el = dom.createDom('div', {
      'class': ydn.crm.su.ui.field.FieldRenderer.CSS_CLASS_HOVER_BUTTON + ' ' +
          ydn.crm.ui.CSS_CLASS_MORE_MENU
    });
    root.appendChild(more_el);
    ydn.ui.FlyoutMenu.decoratePopupMenu(more_el, options);
  } else if (goog.isObject(options)) {
    var opt = /** @type {ydn.ui.FlyoutMenu.ItemOption} */ (options);
    var cls = opt.name == ydn.crm.su.model.Field.Command ?
        ydn.crm.su.ui.field.FieldRenderer.CSS_CLASS_ACTION_DELETE :
        ydn.crm.su.ui.field.FieldRenderer.CSS_CLASS_ACTION_DETAIL;
    var action = dom.createDom('div', {
      'class': ydn.crm.su.ui.field.FieldRenderer.CSS_CLASS_HOVER_BUTTON + ' ' + cls,
      'title': opt.label
    });
    var icon_name = cls == ydn.crm.su.ui.field.FieldRenderer.CSS_CLASS_ACTION_DELETE ?
        'delete' : 'more-horiz';
    var svg = ydn.crm.ui.createSvgIcon(icon_name);
    action.appendChild(svg);
    action.setAttribute('name', opt.name);
    root.appendChild(action);
  }

  var content = ctrl.getContentElement();
  content.appendChild(root);
};


/**
 * @param {ydn.crm.su.ui.group.SimpleGroup} ctrl
 * @return {string}
 */
ydn.crm.su.ui.group.SimpleGroupRenderer.prototype.getInputValue = function(ctrl) {
  var content = ctrl.getContentElement();
  var input = content.querySelector('input.' + ydn.crm.su.ui.field.FieldRenderer.CSS_CLASS_VALUE);
  return input.value;
};


/**
 * @param {ydn.crm.su.ui.group.SimpleGroup} ctrl
 * @param {string} val
 */
ydn.crm.su.ui.group.SimpleGroupRenderer.prototype.setInputValue = function(ctrl, val) {
  var content = ctrl.getContentElement();
  var input = content.querySelector('input.' + ydn.crm.su.ui.field.FieldRenderer.CSS_CLASS_VALUE);
  input.value = val;
};


/**
 * @param {ydn.crm.su.ui.group.SimpleGroup} ctrl
 */
ydn.crm.su.ui.group.SimpleGroupRenderer.prototype.refresh = function(ctrl) {
  /**
   * @type {ydn.crm.su.model.BaseGroup}
   */
  var model = ctrl.getModel();
  var content = ctrl.getContentElement();
  goog.style.setElementShown(content, !!model);
  if (!model) {
    return;
  }
  var ele_field = content.querySelector('.' +
      ydn.crm.su.ui.field.FieldRenderer.CSS_CLASS_VALUE);
  var value = model.getGroupValue();
  if (ele_field.tagName == goog.dom.TagName.INPUT) {
    ele_field.value = value;
  } else {
    ele_field.textContent = value;
  }
  var label = model.getGroupLabel();
  if (label) {
    ele_field.setAttribute('title', label);
  } else {
    ele_field.removeAttribute('title');
  }

  var is_def = goog.isString(value) ? !goog.string.isEmpty(value) :
      goog.isDefAndNotNull(value);
  var root = ctrl.getElement();
  if (is_def) {
    root.classList.remove(ydn.crm.su.ui.field.FieldRenderer.CSS_CLASS_EMPTY);
  } else {
    root.classList.add(ydn.crm.su.ui.field.FieldRenderer.CSS_CLASS_EMPTY);
  }
};
