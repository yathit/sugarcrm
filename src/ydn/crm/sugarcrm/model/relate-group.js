
/**
 * @fileoverview Group model for relate type field.
 *
 * The only two fields are assigned_user_id and assigned_user_name.
 */


goog.provide('ydn.crm.sugarcrm.model.RelateGroup');
goog.require('ydn.crm.sugarcrm.model.BaseGroup');



/**
 * Group model for assigned_user_name fields.
 * @param {ydn.crm.sugarcrm.model.Record} parent
 * @param {string} group_name Group name.
 * @constructor
 * @extends {ydn.crm.sugarcrm.model.BaseGroup}
 * @struct
 */
ydn.crm.sugarcrm.model.RelateGroup = function(parent, group_name) {
  goog.base(this, parent, group_name);
};
goog.inherits(ydn.crm.sugarcrm.model.RelateGroup, ydn.crm.sugarcrm.model.BaseGroup);


/**
 * @return {string} id field id of related record.
 */
ydn.crm.sugarcrm.model.RelateGroup.prototype.getRelateFieldId = goog.abstractMethod;


/**
 * @return {string} name field of related record.
 */
ydn.crm.sugarcrm.model.RelateGroup.prototype.getRelateFieldName = goog.abstractMethod;


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.model.RelateGroup.prototype.hasGroupValue = function() {
  return this.hasFieldValue(this.getRelateFieldId());
};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.model.RelateGroup.prototype.getGroupValue = function() {
  return this.getStringValue(this.getRelateFieldName());
};
