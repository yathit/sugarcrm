
/**
 * @fileoverview Group model for 'name' group fields.
 *
 *
 */


goog.provide('ydn.crm.su.model.NoteGroup');
goog.require('ydn.crm.su.model.Group');



/**
 * Group model for 'email' group fields.
 * @param {ydn.crm.su.model.Record} parent
 * @param {string} group_name group name, should be 'alt_address', 'primary_address'
 * or 'address'.
 * @constructor
 * @extends {ydn.crm.su.model.Group}
 * @struct
 */
ydn.crm.su.model.NoteGroup = function(parent, group_name) {
  goog.base(this, parent, group_name);
};
goog.inherits(ydn.crm.su.model.NoteGroup, ydn.crm.su.model.Group);
