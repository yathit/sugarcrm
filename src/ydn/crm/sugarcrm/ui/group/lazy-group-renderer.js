/**
 * @fileoverview Lazy group renderer render only not normallyHide.
 *
 */


goog.provide('ydn.crm.sugarcrm.ui.group.LazyGroupRenderer');
goog.require('ydn.crm.sugarcrm.ui.group.GroupRenderer');



/**
 * Lazy group renderer render.
 * @constructor
 * @struct
 * @extends {ydn.crm.sugarcrm.ui.group.GroupRenderer}
 */
ydn.crm.sugarcrm.ui.group.LazyGroupRenderer = function() {
  goog.base(this);
};
goog.inherits(ydn.crm.sugarcrm.ui.group.LazyGroupRenderer, ydn.crm.sugarcrm.ui.group.GroupRenderer);
goog.addSingletonGetter(ydn.crm.sugarcrm.ui.group.LazyGroupRenderer);


/**
 * @define {boolean} debug flag.
 */
ydn.crm.sugarcrm.ui.group.LazyGroupRenderer.DEBUG = false;


/** @return {string} */
ydn.crm.sugarcrm.ui.group.LazyGroupRenderer.prototype.getCssClass = function() {
  return ydn.crm.sugarcrm.ui.group.GroupRenderer.CSS_CLASS;
};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.ui.group.LazyGroupRenderer.prototype.createDom = function(ctrl) {
  var dom = ctrl.getDomHelper();
  var root = dom.createDom('div', this.getCssClass());
  var head = dom.createDom('div');
  var content = dom.createDom('div', ydn.crm.ui.CSS_CLASS_CONTENT);
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
    var field = new ydn.crm.sugarcrm.ui.field.Field(field_model, null, dom);
    if (!field.getSetting().getNormallyHide()) {
      ctrl.addChild(field, true);
    }
  }

  if (ctrl.getSetting().getNormallyHide()) {
    root.classList.add(ydn.crm.ui.CSS_CLASS_NORMALLY_HIDE);
  }

  return root;
};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.ui.group.LazyGroupRenderer.prototype.refresh = function(ctrl) {
  /**
   * @type {ydn.crm.sugarcrm.model.Group}
   */
  var model = ctrl.getModel();
  var dom = ctrl.getDomHelper();
  var names = [];
  for (var i = 0; i < ctrl.getChildCount(); i++) {
    var child = /** @type {ydn.crm.sugarcrm.ui.field.Field} */ (ctrl.getChildAt(i));
    if (ydn.crm.sugarcrm.ui.group.LazyGroupRenderer.DEBUG && !child) {
      window.console.error(this + ' child ' + i + ' ' + child);
    }
    child.refresh();
    names.push(child.getFieldName());
  }
  var field_names = model.listFields();
  for (var i = 0; i < field_names.length; i++) {
    var name = field_names[i];
    var field_model = model.createOrGetFieldModel(name);
    var is_normally_hide = ctrl.getSetting().getNormallyHide();
    if (!is_normally_hide && names.indexOf(name) == -1) {
      var field = new ydn.crm.sugarcrm.ui.field.Field(field_model, null, dom);
      ctrl.addChild(field, true);
    }
  }
};


