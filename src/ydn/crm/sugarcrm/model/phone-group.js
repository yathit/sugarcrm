
/**
 * @fileoverview Group model for 'name' group fields.
 *
 *
 */


goog.provide('ydn.crm.su.model.PhoneGroup');
goog.require('ydn.crm.su.model.Group');
goog.require('ydn.crm.su.model.PhoneField');



/**
 * Group model for 'email' group fields.
 * @param {ydn.crm.su.model.Record} parent
 * @constructor
 * @extends {ydn.crm.su.model.Group}
 * @struct
 */
ydn.crm.su.model.PhoneGroup = function(parent) {
  goog.base(this, parent, 'phone');
};
goog.inherits(ydn.crm.su.model.PhoneGroup, ydn.crm.su.model.Group);


/**
 * @inheritDoc
 */
ydn.crm.su.model.PhoneGroup.prototype.createOrGetFieldModel = function(name) {
  var index = this.fields.indexOf(name);
  if (index >= 0) {
    return this.fields[index];
  }
  var f = new ydn.crm.su.model.PhoneField(this, name);
  this.fields.push(f);
  return f;
};

