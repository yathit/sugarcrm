
/**
 * @fileoverview Group model for assigned_user_name fields.
 *
 * The only two fields are assigned_user_id and assigned_user_name.
 */


goog.provide('ydn.crm.sugarcrm.model.AccountGroup');
goog.require('ydn.crm.sugarcrm.model.BaseGroup');



/**
 * Group model for assigned_user_name fields.
 * @param {ydn.crm.sugarcrm.model.Record} parent
 * @constructor
 * @extends {ydn.crm.sugarcrm.model.BaseGroup}
 * @struct
 */
ydn.crm.sugarcrm.model.AccountGroup = function(parent) {
  goog.base(this, parent, 'account');
};
goog.inherits(ydn.crm.sugarcrm.model.AccountGroup, ydn.crm.sugarcrm.model.BaseGroup);


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.model.AccountGroup.prototype.getGroupLabel = function() {
  return 'Account';
};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.model.AccountGroup.prototype.hasGroupValue = function() {
  return this.hasFieldValue('account_id');
};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.model.AccountGroup.prototype.getGroupValue = function() {
  return this.getStringValue('account_name');
};


