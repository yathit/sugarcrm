
/**
 * @fileoverview Group model for assigned_user_name fields.
 *
 * The only two fields are assigned_user_id and assigned_user_name.
 */


goog.provide('ydn.crm.sugarcrm.model.AssignUserGroup');
goog.require('ydn.crm.sugarcrm.model.BaseGroup');



/**
 * Group model for assigned_user_name fields.
 * @param {ydn.crm.sugarcrm.model.Record} parent
 * @constructor
 * @extends {ydn.crm.sugarcrm.model.BaseGroup}
 * @struct
 */
ydn.crm.sugarcrm.model.AssignUserGroup = function(parent) {
  goog.base(this, parent, 'assigned_user_name');
};
goog.inherits(ydn.crm.sugarcrm.model.AssignUserGroup, ydn.crm.sugarcrm.model.BaseGroup);


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.model.AssignUserGroup.prototype.getGroupLabel = function() {
  return 'Assign user';
};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.model.AssignUserGroup.prototype.hasGroupValue = function() {
  return this.hasFieldValue('assigned_user_id');
};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.model.AssignUserGroup.prototype.getGroupValue = function() {
  var name = this.getStringValue('assigned_user_name');
  if (name) {
    return name;
  } else {
    return this.module.getMeta().getUser().getStringValue('name') || '';
  }
};


