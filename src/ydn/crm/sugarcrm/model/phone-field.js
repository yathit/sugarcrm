
/**
 * @fileoverview Group model for 'name' group fields.
 *
 *
 */


goog.provide('ydn.crm.su.model.PhoneField');
goog.require('ydn.crm.su.model.Field');



/**
 * Group model for 'phone' group fields.
 * @param {ydn.crm.su.model.PhoneGroup} parent
 * @param {string} field name
 * @constructor
 * @extends {ydn.crm.su.model.Field}
 * @struct
 */
ydn.crm.su.model.PhoneField = function(parent, field) {
  goog.base(this, parent, field);
};
goog.inherits(ydn.crm.su.model.PhoneField, ydn.crm.su.model.Field);


/**
 * Check the field value is deletable.
 * Extra field like, phone number, address, email are deletable.
 * @return {Array.<ydn.ui.FlyoutMenu.ItemOption>}
 */
ydn.crm.su.model.PhoneField.prototype.getMoreOptions = function() {
  // Note: only InputFieldRenderer display delete button.
  return [
    {
      name: ydn.crm.su.model.Field.Command.REMOVE,
      label: 'Remove'
    }
  ];
};
