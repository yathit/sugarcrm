
/**
 * @fileoverview Group model for 'name' group fields.
 *
 *
 */


goog.provide('ydn.crm.sugarcrm.model.AddressGroup');
goog.require('ydn.crm.sugarcrm.model.BaseGroup');



/**
 * Group model for 'email' group fields.
 * @param {ydn.crm.sugarcrm.model.Record} parent
 * @param {string} group_name group name, should be 'alt_address', 'primary_address'
 * or 'address'.
 * @constructor
 * @extends {ydn.crm.sugarcrm.model.BaseGroup}
 * @struct
 */
ydn.crm.sugarcrm.model.AddressGroup = function(parent, group_name) {
  goog.base(this, parent, group_name);
};
goog.inherits(ydn.crm.sugarcrm.model.AddressGroup, ydn.crm.sugarcrm.model.BaseGroup);


/**
 * Get address field value by address field.
 * @param {string} fn address field name, such as 'city', 'country', etc.
 * @return {?string}
 */
ydn.crm.sugarcrm.model.AddressGroup.prototype.getValueByAddressField = function(fn) {
  var field_name = this.getGroupName() + '_' + fn;
  return this.module.value(field_name);
};


/**
 * Make street label from parts.
 * @param {?string} country
 * @param {?string} city
 * @param {?string} state
 * @param {?string} postalcode
 * @param {?string} street
 * @param {?string} street_2
 * @return {string}
 */
ydn.crm.sugarcrm.model.AddressGroup.makeGroupValue = function(country, city, state,
    postalcode, street, street_2) {


  var label = '';
  if (country) {
    label += country;
  }
  if (state) {
    if (postalcode) {
      label = state + ' ' + postalcode + ', ' + label;
    } else {
      label += ' ' + state;
    }
  } else if (postalcode) {
    label += ' ' + postalcode;
  }
  if (!label) {
    label = street || '';
  }
  if (!label) {
    label = street_2 || '';
  }
  if (city) {
    label = city + ' ' + label;
  }

  return label;
};


/**
 * Get one linear short label for this address.
 * Eg: Salt Lake City, 91691 NY, USA
 * @return {string}
 * @override
 */
ydn.crm.sugarcrm.model.AddressGroup.prototype.getGroupValue = function() {

  // A typical SugarCRM address:
  /*
   primary_address_city: "Denver"
   primary_address_country: "USA"
   primary_address_postalcode: "12477"
   primary_address_state: "CA"
   primary_address_street: "345 Sugar Blvd."
   primary_address_street_2: ""
   primary_address_street_3: ""
   */
  /*
   alt_address_city: ""
   alt_address_country: ""
   alt_address_postalcode: ""
   alt_address_state: ""
   alt_address_street: ""
   alt_address_street_2: ""
   alt_address_street_3: ""
   */

  var country = this.getValueByAddressField('country');
  var city = this.getValueByAddressField('city');
  var state = this.getValueByAddressField('state');
  var code = this.getValueByAddressField('postalcode');
  var street = this.getValueByAddressField('street') || '';
  var street_2 = this.getValueByAddressField('street_2') || '';

  return ydn.crm.sugarcrm.model.AddressGroup.makeGroupValue(country, city, state,
      code, street, street_2);
};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.model.AddressGroup.prototype.getAdditionalOptions = function() {
  return {
    label: 'Edit',
    name: ydn.crm.sugarcrm.model.Field.Command.EDIT,
    type: 'text'
  };
};
