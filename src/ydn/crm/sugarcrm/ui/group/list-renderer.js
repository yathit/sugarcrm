/**
 * @fileoverview Panel renderer for listed items.
 *
 * This module provide adding, linking and syncing.
 */


goog.provide('ydn.crm.su.ui.group.ListRenderer');
goog.require('goog.ui.ControlRenderer');



/**
 * Panel renderer for listed items.
 * @constructor
 * @struct
 * @extends {ydn.crm.su.ui.group.GroupRenderer}
 */
ydn.crm.su.ui.group.ListRenderer = function() {
  goog.base(this);
};
goog.inherits(ydn.crm.su.ui.group.ListRenderer, ydn.crm.su.ui.group.GroupRenderer);
goog.addSingletonGetter(ydn.crm.su.ui.group.ListRenderer);


/**
 * @define {boolean} debug flag.
 */
ydn.crm.su.ui.group.ListRenderer.DEBUG = false;


/**
 * @const
 * @type {string}
 */
ydn.crm.su.ui.group.ListRenderer.CSS_CLASS = 'list';


/** @return {string} */
ydn.crm.su.ui.group.ListRenderer.prototype.getCssClass = function() {
  return ydn.crm.su.ui.group.ListRenderer.CSS_CLASS;
};


/**
 * @inheritDoc
 */
ydn.crm.su.ui.group.ListRenderer.prototype.createDom = function(x) {
  var dom = x.getDomHelper();
  var root = dom.createDom('div', this.getCssClass());
  var ctrl = /** @type {ydn.crm.su.ui.group.List} */ (x);
  /**
   * @type {ydn.crm.su.model.Group}
   */
  var model = ctrl.getModel();
  root.setAttribute('name', model.getGroupName());
  root.classList.add(ydn.crm.su.ui.group.GroupRenderer.CSS_CLASS);
  var head = dom.createDom('div');
  head.setAttribute('data-tooltip', model.getGroupLabel());
  root.appendChild(head);
  var content = dom.createDom('div', ydn.crm.ui.CSS_CLASS_CONTENT);
  root.appendChild(head);
  root.appendChild(content);

  ctrl.setElementInternal(root);

  var fields = model.listFields();

  for (var i = 0; i < fields.length; i++) {
    var name = fields[i];
    var field_model = model.createOrGetFieldModel(name);
    var field = new ydn.crm.su.ui.field.Field(field_model, null, dom);
    ctrl.addChild(field, true);
  }

  return root;
};




