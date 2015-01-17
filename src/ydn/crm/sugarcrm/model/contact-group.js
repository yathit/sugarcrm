
/**
 * @fileoverview Group model for contact relation fields.
 *
 * The 'contact_name', 'contact_phone', 'contact_email', 'contact_id'.
 */


goog.provide('ydn.crm.sugarcrm.model.ContactGroup');
goog.require('ydn.crm.sugarcrm.model.BaseGroup');



/**
 * Group model for contact relation fields.
 * @param {ydn.crm.sugarcrm.model.Record} parent
 * @constructor
 * @extends {ydn.crm.sugarcrm.model.BaseGroup}
 * @struct
 */
ydn.crm.sugarcrm.model.ContactGroup = function(parent) {
  goog.base(this, parent, 'contact');
};
goog.inherits(ydn.crm.sugarcrm.model.ContactGroup, ydn.crm.sugarcrm.model.BaseGroup);


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.model.ContactGroup.prototype.getGroupLabel = function() {
  return 'Contact';
};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.model.ContactGroup.prototype.hasGroupValue = function() {
  return this.hasFieldValue('contact_id');
};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.model.ContactGroup.prototype.getGroupValue = function() {
  return this.getStringValue('contact_name');
};


