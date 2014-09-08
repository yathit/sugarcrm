
/**
 * @fileoverview Group model for 'name' group fields.
 *
 *
 */


goog.provide('ydn.crm.sugarcrm.model.NoteGroup');
goog.require('ydn.crm.sugarcrm.model.Group');



/**
 * Group model for 'email' group fields.
 * @param {ydn.crm.sugarcrm.model.Record} parent
 * @param {string} group_name group name, should be 'alt_address', 'primary_address'
 * or 'address'.
 * @constructor
 * @extends {ydn.crm.sugarcrm.model.Group}
 * @struct
 */
ydn.crm.sugarcrm.model.NoteGroup = function(parent, group_name) {
  goog.base(this, parent, group_name);
};
goog.inherits(ydn.crm.sugarcrm.model.NoteGroup, ydn.crm.sugarcrm.model.Group);
