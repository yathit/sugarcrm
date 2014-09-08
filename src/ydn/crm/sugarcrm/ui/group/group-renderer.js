/**
 * @fileoverview Default group renderer, create all fields by default field
 * component.
 *
 */


goog.provide('ydn.crm.sugarcrm.ui.group.GroupRenderer');
goog.require('ydn.crm.sugarcrm.ui.field.Email');
goog.require('ydn.crm.sugarcrm.ui.field.Field');
goog.require('ydn.crm.sugarcrm.ui.field.Phone');



/**
 * Default group renderer.
 * @constructor
 * @struct
 */
ydn.crm.sugarcrm.ui.group.GroupRenderer = function() {

};
goog.addSingletonGetter(ydn.crm.sugarcrm.ui.group.GroupRenderer);


/**
 * @define {boolean} debug flag.
 */
ydn.crm.sugarcrm.ui.group.GroupRenderer.DEBUG = false;


/**
 * @const
 * @type {string}
 */
ydn.crm.sugarcrm.ui.group.GroupRenderer.CSS_CLASS = 'record-group';


/**
 * @const
 * @type {string}
 */
ydn.crm.sugarcrm.ui.group.GroupRenderer.CSS_CLASS_HEADER = 'header';


/**
 * @const
 * @type {string}
 */
ydn.crm.sugarcrm.ui.group.GroupRenderer.CSS_CLASS_FOOTER = 'footer';


/**
 * @const
 * @type {string}
 */
ydn.crm.sugarcrm.ui.group.GroupRenderer.CSS_CLASS_CONTENT = 'content';


/** @return {string} */
ydn.crm.sugarcrm.ui.group.GroupRenderer.prototype.getCssClass = function() {
  return ydn.crm.sugarcrm.ui.group.GroupRenderer.CSS_CLASS;
};


/**
 * @param {ydn.crm.sugarcrm.ui.group.Group} ctrl
 * @return {Element}
 */
ydn.crm.sugarcrm.ui.group.GroupRenderer.prototype.createDom = function(ctrl) {
  var dom = ctrl.getDomHelper();
  var root = dom.createDom('div', this.getCssClass());
  var head = dom.createDom('div');
  var content = dom.createDom('div', ydn.crm.sugarcrm.ui.group.GroupRenderer.CSS_CLASS_CONTENT);
  root.appendChild(head);
  root.appendChild(content);
  ctrl.setElementInternal(root);
  var group_name = ctrl.getModel().getGroupName();
  root.setAttribute('name', group_name);

  /**
   * @type {ydn.crm.sugarcrm.model.Group}
   */
  var model = ctrl.getModel();
  var groups = model.listFields();
  for (var i = 0; i < groups.length; i++) {
    var name = groups[i];
    var field_model = model.createOrGetFieldModel(name);
    var field;
    if (field_model instanceof ydn.crm.sugarcrm.model.EmailField) {
      var email = /** @type {ydn.crm.sugarcrm.model.EmailField} */(field_model);
      field = new ydn.crm.sugarcrm.ui.field.Email(email, dom);
    } else if (field_model instanceof ydn.crm.sugarcrm.model.PhoneField) {
      var phone = /** @type {ydn.crm.sugarcrm.model.PhoneField} */(field_model);
      field = new ydn.crm.sugarcrm.ui.field.Phone(phone, dom);
    } else {
      field = new ydn.crm.sugarcrm.ui.field.Field(field_model, null, dom);
    }
    ctrl.addChild(field, true);
  }

  if (ctrl.getSetting().getNormallyHide()) {
    root.classList.add(ydn.crm.ui.CSS_CLASS_NORMALLY_HIDE);
  }

  return root;
};


/**
 * @param {ydn.crm.sugarcrm.ui.group.Group} ctrl
 */
ydn.crm.sugarcrm.ui.group.GroupRenderer.prototype.refresh = function(ctrl) {

  for (var i = 0; i < ctrl.getChildCount(); i++) {
    var child = /** @type {ydn.crm.sugarcrm.ui.field.Field} */ (ctrl.getChildAt(i));
    if (ydn.crm.sugarcrm.ui.group.GroupRenderer.DEBUG && !child) {
      window.console.error(this + ' child ' + i + ' ' + child);
    }
    child.refresh();
  }
};


