
/**
 * @fileoverview Relate group model for Account record type.
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */


goog.provide('ydn.crm.su.model.ContactRelateGroup');
goog.require('ydn.crm.su.model.RelateGroup');



/**
 * Relate group model for Account record type.
 * @param {ydn.crm.su.model.Record} parent
 * @constructor
 * @extends {ydn.crm.su.model.RelateGroup}
 * @struct
 */
ydn.crm.su.model.ContactRelateGroup = function(parent) {
  goog.base(this, parent, 'contact');
};
goog.inherits(ydn.crm.su.model.ContactRelateGroup, ydn.crm.su.model.RelateGroup);


/**
 * @inheritDoc
 */
ydn.crm.su.model.ContactRelateGroup.prototype.getGroupLabel = function() {
  return 'Contact';
};


/**
 * @inheritDoc
 */
ydn.crm.su.model.ContactRelateGroup.prototype.getRelateFieldId = function() {
  return 'contact_id';
};


/**
 * @inheritDoc
 */
ydn.crm.su.model.ContactRelateGroup.prototype.getRelateFieldName = function() {
  return 'contact_name';
};


/**
 * @inheritDoc
 */
ydn.crm.su.model.ContactRelateGroup.prototype.getRelateModuleName = function() {
  return ydn.crm.su.ModuleName.CONTACTS;
};

