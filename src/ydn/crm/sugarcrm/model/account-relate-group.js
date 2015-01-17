
/**
 * @fileoverview Relate group model for Account record type.
 *
 */


goog.provide('ydn.crm.sugarcrm.model.AccountRelateGroup');
goog.require('ydn.crm.sugarcrm.model.RelateGroup');



/**
 * Relate group model for Account record type.
 * @param {ydn.crm.sugarcrm.model.Record} parent
 * @constructor
 * @extends {ydn.crm.sugarcrm.model.RelateGroup}
 * @struct
 */
ydn.crm.sugarcrm.model.AccountRelateGroup = function(parent) {
  goog.base(this, parent, 'account');
};
goog.inherits(ydn.crm.sugarcrm.model.AccountRelateGroup, ydn.crm.sugarcrm.model.RelateGroup);


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.model.AccountRelateGroup.prototype.getGroupLabel = function() {
  return 'Account';
};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.model.AccountRelateGroup.prototype.getRelateFieldId = function() {
  return 'account_id';
};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.model.AccountRelateGroup.prototype.getRelateFieldName = function() {
  return 'account_name';
};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.model.AccountRelateGroup.prototype.getRelateModuleName = function() {
  return ydn.crm.sugarcrm.ModuleName.ACCOUNTS;
};
