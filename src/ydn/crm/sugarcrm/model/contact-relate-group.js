
/**
 * @fileoverview Relate group model for Account record type.
 *
 */


goog.provide('ydn.crm.sugarcrm.model.ContactRelateGroup');
goog.require('ydn.crm.sugarcrm.model.RelateGroup');



/**
 * Relate group model for Account record type.
 * @param {ydn.crm.sugarcrm.model.Record} parent
 * @constructor
 * @extends {ydn.crm.sugarcrm.model.RelateGroup}
 * @struct
 */
ydn.crm.sugarcrm.model.ContactRelateGroup = function(parent) {
  goog.base(this, parent, 'contact');
};
goog.inherits(ydn.crm.sugarcrm.model.ContactRelateGroup, ydn.crm.sugarcrm.model.RelateGroup);


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.model.ContactRelateGroup.prototype.getGroupLabel = function() {
  return 'Contact';
};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.model.ContactRelateGroup.prototype.getRelateFieldId = function() {
  return 'contact_id';
};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.model.ContactRelateGroup.prototype.getRelateFieldName = function() {
  return 'contact_name';
};


