
/**
 * @fileoverview Group model for 'name' group fields.
 *
 *
 */


goog.provide('ydn.crm.sugarcrm.model.PhoneField');
goog.require('ydn.crm.sugarcrm.model.Field');



/**
 * Group model for 'phone' group fields.
 * @param {ydn.crm.sugarcrm.model.PhoneGroup} parent
 * @param {string} field name
 * @constructor
 * @extends {ydn.crm.sugarcrm.model.Field}
 * @struct
 */
ydn.crm.sugarcrm.model.PhoneField = function(parent, field) {
  goog.base(this, parent, field);
};
goog.inherits(ydn.crm.sugarcrm.model.PhoneField, ydn.crm.sugarcrm.model.Field);


/**
 * Check the field value is deletable.
 * Extra field like, phone number, address, email are deletable.
 * @return {Array.<ydn.ui.FlyoutMenu.ItemOption>}
 */
ydn.crm.sugarcrm.model.PhoneField.prototype.getMoreOptions = function() {
  // Note: only InputFieldRenderer display delete button.
  return [
    {
      name: ydn.crm.sugarcrm.model.Field.Command.REMOVE,
      label: 'Remove'
    }
  ];
};
