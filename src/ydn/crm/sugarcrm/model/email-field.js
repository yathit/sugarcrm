// Copyright 2014 YDN Authors. All Rights Reserved.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
//    This program is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.



/**
 * @fileoverview Group model for 'name' group fields.
 *
 *
 */


goog.provide('ydn.crm.su.model.EmailField');
goog.require('ydn.crm.su.model.Field');
goog.require('ydn.object');



/**
 * Group model for 'email' group fields.
 * @param {ydn.crm.su.model.EmailGroup} parent
 * @param {string} field name
 * @constructor
 * @extends {ydn.crm.su.model.Field}
 * @struct
 */
ydn.crm.su.model.EmailField = function(parent, field) {
  goog.base(this, parent, field);
};
goog.inherits(ydn.crm.su.model.EmailField, ydn.crm.su.model.Field);


/**
 * @return {ydn.crm.su.model.EmailGroup}
 */
ydn.crm.su.model.EmailField.prototype.getParentModel = function() {
  return /** @type {ydn.crm.su.model.EmailGroup} */ (this.parent);
};


/**
 * @inheritDoc
 */
ydn.crm.su.model.EmailField.prototype.getStringValue = function() {
  var email_model = this.getParentModel();
  return email_model.getFieldValueByEmailId(this.field_name);
};


/**
 * @inheritDoc
 */
ydn.crm.su.model.EmailField.prototype.hasFieldValue = function() {
  var email_model = this.getParentModel();
  return email_model.hasFieldValue(this.field_name);
};


/**
 * @return {?boolean}
 */
ydn.crm.su.model.EmailField.prototype.isOptOut = function() {
  var email_model = this.getParentModel();
  return email_model.isOptOut(this.field_name);
};


/**
 * @inheritDoc
 */
ydn.crm.su.model.EmailField.prototype.getFieldInfo = function() {
  return this.parent.getFieldInfo(this.field_name) ||
      this.parent.getFieldInfo('email');
};


/**
 * @inheritDoc
 */
ydn.crm.su.model.EmailField.prototype.patch = function(email) {
  if (!email) {
    return null; // we don't delete on update
  }
  email = /** @type {string} */ (email);
  var email_model = this.getParentModel();
  if (email_model.isBean()) {
    // bean format
    var bean_email = email_model.getEmails();
    for (var i = 0; i < bean_email.length; i++) {
      var bean = bean_email[i];
      if (bean_email[i].email_address_id == this.field_name) {
        if (bean.email_address == email) {
          return null;
        }
        bean_email[i].email_address = email;
        bean_email[i].email_address_caps = email.toUpperCase();
        return {
          'email': bean_email
        };
      }
    }
    // Note: we create with non-bean value.
    var obj = {};
    obj[this.field_name] = email;
    return obj;
  } else {
    // old format
    var original_value = email_model.module.value(this.field_name);
    if (original_value == email) {
      return null;
    } else {
      var obj = {};
      obj[this.field_name] = email;
      return obj;
    }
  }
};


/**
 * Get a patch for given email.
 * @return {Object} null if no path required.
 */
ydn.crm.su.model.EmailField.prototype.removeEmail = function() {
  var email_model = this.getParentModel();
  if (email_model.isBean()) {
    // bean format
    var bean_email = email_model.getEmails();
    for (var i = 0; i < bean_email.length; i++) {
      if (bean_email[i].email_address_id == this.field_name) {
        var emails = ydn.object.clone(bean_email);
        emails.splice(i, 1);
        return {
          'email': emails
        };
      }
    }
    return null;
  } else {
    // old format
    var original_value = email_model.module.value(this.field_name);
    if (original_value) {
      var obj = {};
      obj[this.field_name] = undefined;
      return obj;
    } else {
      return null;
    }
  }
};


/**
 * Check the field value is deletable.
 * Extra field like, phone number, address, email are deletable.
 * @return {Array.<ydn.ui.FlyoutMenu.ItemOption>}
 */
ydn.crm.su.model.EmailField.prototype.getMoreOptions = function() {
  // Note: only InputFieldRenderer display delete button.
  return [
    {
      name: ydn.crm.su.model.Field.Command.REMOVE,
      label: 'Remove'
    }, {
      name: ydn.crm.su.model.Field.Command.OPT_OUT,
      label: 'Opt out',
      type: 'bool',
      value: this.isOptOut()
    }
  ];
};
