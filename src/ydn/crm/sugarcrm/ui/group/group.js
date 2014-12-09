/**
 * @fileoverview Group controller.
 *
 * Group controller manage changes in filed of the records.
 */


goog.provide('ydn.crm.sugarcrm.ui.group.Group');
goog.require('goog.ui.Dialog');
goog.require('ydn.crm.sugarcrm.model.Group');
goog.require('ydn.crm.sugarcrm.ui.group.AbstractGroup');
goog.require('ydn.crm.sugarcrm.ui.group.GroupRenderer');



/**
 * Group controller.
 * @param {ydn.crm.sugarcrm.model.Group} model
 * @param {ydn.crm.sugarcrm.ui.group.GroupRenderer=} opt_renderer
 * @param {goog.dom.DomHelper=} opt_dom
 * @constructor
 * @struct
 * @extends {ydn.crm.sugarcrm.ui.group.AbstractGroup}
 */
ydn.crm.sugarcrm.ui.group.Group = function(model, opt_renderer, opt_dom) {
  /**
   * @protected
   * @type {ydn.crm.sugarcrm.ui.group.GroupRenderer}
   */
  this.renderer = opt_renderer || ydn.crm.sugarcrm.ui.group.GroupRenderer.getInstance();
  goog.base(this, model, opt_dom);
};
goog.inherits(ydn.crm.sugarcrm.ui.group.Group, ydn.crm.sugarcrm.ui.group.AbstractGroup);


/**
 * @define {boolean} debug flag.
 */
ydn.crm.sugarcrm.ui.group.Group.DEBUG = false;


/**
 * @return {ydn.crm.sugarcrm.model.Group}
 * @override
 */
ydn.crm.sugarcrm.ui.group.Group.prototype.getModel;


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.ui.group.Group.prototype.createDom = function() {
  goog.base(this, 'createDom');

  this.createFields();
};


/**
 * @protected
 */
ydn.crm.sugarcrm.ui.group.Group.prototype.createFields = function() {
  /**
   * @type {ydn.crm.sugarcrm.model.Group}
   */
  var model = this.getModel();
  var dom = this.getDomHelper();
  var fields = model.listFields();
  for (var i = 0; i < fields.length; i++) {
    var name = fields[i];
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
    this.addChild(field, true);
  }
};


/**
 * Attach handlers when the control become editable.
 * Superclass override to attach handlers. This will be called only when
 * handlers were not being attached.
 * @protected
 */
ydn.crm.sugarcrm.ui.group.Group.prototype.attachHandlers = function() {

};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.ui.group.Group.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  if (this.isEditable()) {
    this.attachHandlers();
  }

  this.getHandler().listen(this, ydn.crm.sugarcrm.ui.events.Type.ACTION,
      this.onMenuAction);

};


/**
 * @param {ydn.crm.sugarcrm.ui.events.FieldMenuActionEvent} ma
 * @protected
 */
ydn.crm.sugarcrm.ui.group.Group.prototype.onMenuAction = function(ma) {

};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.ui.group.Group.prototype.collectData = function() {
  var obj = null;
  for (var j = 0; j < this.getChildCount(); j++) {
    var f = /** @type {ydn.crm.sugarcrm.ui.field.Field} */ (this.getChildAt(j));
    var value = f.collectData();
    if (!goog.isNull(value)) {
      if (!obj) {
        obj = {};
      }
      obj[f.getFieldName()] = value;
    }
  }
  if (ydn.crm.sugarcrm.ui.group.Group.DEBUG && obj) {
    window.console.log(this, obj);
  }
  return obj;
};


/**
 * Get field component by field name.
 * @param {string} name
 * @return {ydn.crm.sugarcrm.ui.field.Field}
 */
ydn.crm.sugarcrm.ui.group.Group.prototype.getFieldByName = function(name) {
  for (var j = 0; j < this.getChildCount(); j++) {
    var f = /** @type {ydn.crm.sugarcrm.ui.field.Field} */ (this.getChildAt(j));
    if (f.getFieldName() == name) {
      return f;
    }
  }
  return null;
};


/**
 * @override
 */
ydn.crm.sugarcrm.ui.group.Group.prototype.refresh = function() {
  for (var i = 0; i < this.getChildCount(); i++) {
    var child = /** @type {ydn.crm.sugarcrm.ui.field.Field} */ (this.getChildAt(i));
    if (ydn.crm.sugarcrm.ui.group.Group.DEBUG && !child) {
      console.error(this + ' child ' + i + ' ' + child);
    }
    child.refresh();
  }
};


/**
 * @override
 */
ydn.crm.sugarcrm.ui.group.Group.prototype.reset = function() {
  goog.base(this, 'reset');
  for (var i = 0; i < this.getChildCount(); i++) {
    var child = /** @type {ydn.crm.sugarcrm.ui.field.Field} */ (this.getChildAt(i));
    if (ydn.crm.sugarcrm.ui.group.Group.DEBUG && !child) {
      console.error(this + ' child ' + i + ' ' + child);
    }
    child.reset();
  }
};
