
/**
 * @fileoverview Group model for 'name' group fields.
 *
 *
 */


goog.provide('ydn.crm.sugarcrm.model.PhoneGroup');
goog.require('ydn.crm.sugarcrm.model.Group');
goog.require('ydn.crm.sugarcrm.model.PhoneField');



/**
 * Group model for 'email' group fields.
 * @param {ydn.crm.sugarcrm.model.Record} parent
 * @constructor
 * @extends {ydn.crm.sugarcrm.model.Group}
 * @struct
 */
ydn.crm.sugarcrm.model.PhoneGroup = function(parent) {
  goog.base(this, parent, 'phone');
};
goog.inherits(ydn.crm.sugarcrm.model.PhoneGroup, ydn.crm.sugarcrm.model.Group);


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.model.PhoneGroup.prototype.createOrGetFieldModel = function(name) {
  var index = this.fields.indexOf(name);
  if (index >= 0) {
    return this.fields[index];
  }
  var f = new ydn.crm.sugarcrm.model.PhoneField(this, name);
  this.fields.push(f);
  return f;
};

