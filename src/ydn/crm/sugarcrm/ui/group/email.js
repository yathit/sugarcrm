/**
 * @fileoverview Panel for name group fields.
 *
 * This module provide adding, linking and syncing.
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */


goog.provide('ydn.crm.su.ui.group.Email');
goog.require('goog.ui.PopupMenu');
goog.require('ydn.crm.su');
goog.require('ydn.crm.su.model.EmailGroup');
goog.require('ydn.crm.su.ui.group.Group');



/**
 * Panel for name group fields.
 * @param {ydn.crm.su.model.EmailGroup} model
 * @param {goog.dom.DomHelper=} opt_dom
 * @constructor
 * @struct
 * @extends {ydn.crm.su.ui.group.Group}
 */
ydn.crm.su.ui.group.Email = function(model, opt_dom) {
  goog.base(this, model, opt_dom);
  /**
   * @type {goog.ui.PopupMenu}
   * @private
   */
  this.popup_menu_ = null;
};
goog.inherits(ydn.crm.su.ui.group.Email, ydn.crm.su.ui.group.Group);


/**
 * @return {ydn.crm.su.model.EmailGroup}
 * @override
 */
ydn.crm.su.ui.group.Email.prototype.getModel;


/**
 * @override
 */
ydn.crm.su.ui.group.Email.prototype.reset = function() {
  // we have to remove child, Field, because their name, i.e., bean id
  // are not same for different record.
  for (var i = this.getChildCount() - 1; i >= 0; i--) {
    var child = this.removeChildAt(i);
    child.dispose();
  }
  this.createFields();
  /*
  var model = this.getModel();
  var fields = model.listFields();
  console.log('email reset', model, fields);
  */
};


/**
 * @inheritDoc
 */
ydn.crm.su.ui.group.Email.prototype.collectData = function() {
  var patch = ydn.crm.su.ui.group.Email.base(this, 'collectData');
  patch = this.getModel().pluck(patch);
  return patch;
};


/**
 * @inheritDoc
 */
ydn.crm.su.ui.group.Email.prototype.getPatch = function() {
  var patch = ydn.crm.su.ui.group.Email.base(this, 'getPatch');

  patch = this.getModel().pluck(patch);
  return patch;
};


/**
 * @inheritDoc
 */
ydn.crm.su.ui.group.Email.prototype.getFieldByName = function(name) {
  var v7 = this.getModel().getMeta().isVersion7();
  if (v7 && name == 'email1') {
    return /** @type {ydn.crm.su.ui.field.Field} */(this.getChildAt(0));
  } else if (v7 && name == 'email2') {
    return /** @type {ydn.crm.su.ui.field.Field} */(this.getChildAt(1));
  } else {
    return ydn.crm.su.ui.group.Email.base(this, 'getFieldByName', name);
  }
};
