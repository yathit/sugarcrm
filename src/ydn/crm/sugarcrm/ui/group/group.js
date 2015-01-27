/**
 * @fileoverview Group controller.
 *
 * Group controller manage changes in filed of the records using field
 * controller. Field controller are created depending on type, such as email,
 * phone. Override {@link #createFields} methods to change custom field model
 * instantiation.
 *
 * This listen component ACTION from field controller and invoke
 * {@link #onMenuAction} method. Default implementation is noop.
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */


goog.provide('ydn.crm.su.ui.group.Group');
goog.require('goog.ui.Dialog');
goog.require('ydn.crm.su.model.Group');
goog.require('ydn.crm.su.ui.group.AbstractGroup');



/**
 * Group controller.
 * @param {ydn.crm.su.model.Group} model
 * @param {goog.dom.DomHelper=} opt_dom
 * @constructor
 * @struct
 * @extends {ydn.crm.su.ui.group.AbstractGroup}
 */
ydn.crm.su.ui.group.Group = function(model, opt_dom) {
  goog.base(this, model, opt_dom);
};
goog.inherits(ydn.crm.su.ui.group.Group, ydn.crm.su.ui.group.AbstractGroup);


/**
 * @define {boolean} debug flag.
 */
ydn.crm.su.ui.group.Group.DEBUG = false;


/**
 * @return {ydn.crm.su.model.Group}
 * @override
 */
ydn.crm.su.ui.group.Group.prototype.getModel;


/**
 * @inheritDoc
 */
ydn.crm.su.ui.group.Group.prototype.createDom = function() {
  goog.base(this, 'createDom');

  this.createFields();
};


/**
 * @protected
 */
ydn.crm.su.ui.group.Group.prototype.createFields = function() {
  /**
   * @type {ydn.crm.su.model.Group}
   */
  var model = this.getModel();
  var dom = this.getDomHelper();
  var fields = model.listFields();
  for (var i = 0; i < fields.length; i++) {
    var name = fields[i];
    var field_model = model.createOrGetFieldModel(name);
    var field;
    if (field_model instanceof ydn.crm.su.model.EmailField) {
      var email = /** @type {ydn.crm.su.model.EmailField} */(field_model);
      field = new ydn.crm.su.ui.field.Email(email, dom);
    } else if (field_model instanceof ydn.crm.su.model.PhoneField) {
      var phone = /** @type {ydn.crm.su.model.PhoneField} */(field_model);
      field = new ydn.crm.su.ui.field.Phone(phone, dom);
    } else {
      field = new ydn.crm.su.ui.field.Field(field_model, null, dom);
    }
    this.addChild(field, true);
  }
};


/**
 * @inheritDoc
 */
ydn.crm.su.ui.group.Group.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');

  this.getHandler().listen(this, ydn.crm.su.ui.events.Type.ACTION,
      this.onMenuAction);

};


/**
 * @param {ydn.crm.su.ui.events.FieldMenuActionEvent} ma
 * @protected
 */
ydn.crm.su.ui.group.Group.prototype.onMenuAction = function(ma) {

};


/**
 * Get field component by field name.
 * @param {string} name
 * @return {ydn.crm.su.ui.field.Field}
 */
ydn.crm.su.ui.group.Group.prototype.getFieldByName = function(name) {
  for (var j = 0; j < this.getChildCount(); j++) {
    var f = /** @type {ydn.crm.su.ui.field.Field} */ (this.getChildAt(j));
    if (f.getFieldName() == name) {
      return f;
    }
  }
  return null;
};


/**
 * @inheritDoc
 */
ydn.crm.su.ui.group.Group.prototype.collectData = function() {
  var obj = null;
  for (var j = 0; j < this.getChildCount(); j++) {
    var f = /** @type {ydn.crm.su.ui.field.Field} */ (this.getChildAt(j));
    var value = f.collectData();
    if (!goog.isNull(value)) {
      if (!obj) {
        obj = {};
      }
      obj[f.getFieldName()] = value;
    }
  }
  if (ydn.crm.su.ui.group.Group.DEBUG && obj) {
    window.console.log(this, obj);
  }
  return obj;
};


/**
 * @inheritDoc
 */
ydn.crm.su.ui.group.Group.prototype.hasChanged = function() {
  for (var j = 0; j < this.getChildCount(); j++) {
    var f = /** @type {ydn.crm.su.ui.field.Field} */ (this.getChildAt(j));
    if (f.hasChanged()) {
      return true;
    }
  }
  return false;
};


/**
 * @inheritDoc
 */
ydn.crm.su.ui.group.Group.prototype.getPatch = function() {
  var obj = null;
  for (var j = 0; j < this.getChildCount(); j++) {
    var f = /** @type {ydn.crm.su.ui.field.Field} */ (this.getChildAt(j));
    if (!f.hasChanged()) {
      continue;
    }
    var value = f.collectData();
    if (!goog.isNull(value)) {
      if (!obj) {
        obj = {};
      }
      obj[f.getFieldName()] = value;
    }
  }
  if (ydn.crm.su.ui.group.Group.DEBUG && obj) {
    window.console.log(this, obj);
  }
  return obj;
};


/**
 * @override
 */
ydn.crm.su.ui.group.Group.prototype.refresh = function() {
  for (var i = 0; i < this.getChildCount(); i++) {
    var child = /** @type {ydn.crm.su.ui.field.Field} */ (this.getChildAt(i));
    if (ydn.crm.su.ui.group.Group.DEBUG && !child) {
      window.console.error(this + ' child ' + i + ' ' + child);
    }
    child.refresh();
  }
};


/**
 * @override
 */
ydn.crm.su.ui.group.Group.prototype.reset = function() {
  goog.base(this, 'reset');
  for (var i = 0; i < this.getChildCount(); i++) {
    var child = /** @type {ydn.crm.su.ui.field.Field} */ (this.getChildAt(i));
    if (ydn.crm.su.ui.group.Group.DEBUG && !child) {
      window.console.error(this + ' child ' + i + ' ' + child);
    }
    child.reset();
  }
};
