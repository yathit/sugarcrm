
/**
 * @fileoverview Group model for assigned_user_name fields.
 *
 * The only two fields are assigned_user_id and assigned_user_name.
 */


goog.provide('ydn.crm.su.model.AssignUserGroup');
goog.require('ydn.crm.su.model.BaseGroup');



/**
 * Group model for assigned_user_name fields.
 * @param {ydn.crm.su.model.Record} parent
 * @constructor
 * @extends {ydn.crm.su.model.BaseGroup}
 * @struct
 */
ydn.crm.su.model.AssignUserGroup = function(parent) {
  goog.base(this, parent, 'assigned_user_name');
};
goog.inherits(ydn.crm.su.model.AssignUserGroup, ydn.crm.su.model.BaseGroup);


/**
 * @inheritDoc
 */
ydn.crm.su.model.AssignUserGroup.prototype.getGroupLabel = function() {
  return 'Assign user';
};


/**
 * @inheritDoc
 */
ydn.crm.su.model.AssignUserGroup.prototype.hasGroupValue = function() {
  return this.hasFieldValue('assigned_user_id');
};


/**
 * @inheritDoc
 */
ydn.crm.su.model.AssignUserGroup.prototype.getGroupValue = function() {
  var name = this.getStringValue('assigned_user_name');
  if (name) {
    return name;
  } else {
    return this.module.getMeta().getUser().getStringValue('name') || '';
  }
};


