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
 * @fileoverview SugarCRM module record model.
 */


goog.provide('ydn.crm.su.model.Field');
goog.require('ydn.crm.su.Record');
goog.require('ydn.crm.su.gdata');



/**
 * SugarCRM module record model.
 * @param {ydn.crm.su.model.Group} parent
 * @param {string} field name
 * @constructor
 * @struct
 */
ydn.crm.su.model.Field = function(parent, field) {
  /**
   * @final
   * @protected
   * @type {ydn.crm.su.model.Group}
   */
  this.parent = parent;
  /**
   * @final
   * @protected
   * @type {string}
   */
  this.field_name = field;
  // goog.asserts.assertObject(this.parent.getFieldInfo(this.field_name),
  //    this.field_name + ' in ' + parent.getModuleName());
};


/**
 * @return {ydn.crm.su.Meta}
 */
ydn.crm.su.model.Field.prototype.getMeta = function() {
  return this.parent.getMeta();
};


/**
 * @return {ydn.crm.su.ModuleName}
 */
ydn.crm.su.model.Field.prototype.getModuleName = function() {
  return this.parent.getModuleName();
};


/**
 * @return {string}
 */
ydn.crm.su.model.Field.prototype.getFieldName = function() {
  return this.field_name;
};


/**
 * Get module info.
 * @return {SugarCrm.ModuleField}
 */
ydn.crm.su.model.Field.prototype.getFieldInfo = function() {
  return this.parent.getFieldInfo(this.field_name);
};


/**
 * Get group name.
 * @return {string}
 */
ydn.crm.su.model.Field.prototype.getGroupName = function() {
  var info = this.getFieldInfo();
  return info ? info.group : '';
};


/**
 * Get unique field id within sugarcrm instance.
 * @param {string} module_name
 * @param {string} field_name
 * @return {string}
 */
ydn.crm.su.model.Field.getFieldId = function(module_name, field_name) {
  return module_name + '-' + field_name;
};


/**
 * Get unique field id within sugarcrm instance.
 * @return {string}
 */
ydn.crm.su.model.Field.prototype.getFieldId = function() {
  return ydn.crm.su.model.Field.getFieldId(this.parent.getModuleName(),
      this.field_name);
};


/**
 * Get field value for string type.
 * @return {?string} `null` if not a string value or field value is not set.
 * @see #getField
 */
ydn.crm.su.model.Field.prototype.getStringValue = function() {
  return this.parent.module.getStringValue(this.field_name);
};


/**
 * Get default field value.
 * @return {?ydn.crm.su.RecordValue} `null` if no default value set.
 * @see #getDefaultStringValue
 */
ydn.crm.su.model.Field.prototype.getDefaultFieldValue = function() {
  return this.parent.getDefaultFieldValue(this.field_name);
};


/**
 * Get default field value as string.
 * @return {?string}
 * @see #getDefaultFieldValue
 */
ydn.crm.su.model.Field.prototype.getDefaultStringValue = function() {
  var s = this.getDefaultFieldValue();
  return goog.isString(s) ? s : null;
};


/**
 * Get raw field value.
 * @return {ydn.crm.su.RecordValue}
 * @see #getStringValue
 */
ydn.crm.su.model.Field.prototype.getField = function() {
  return this.parent.module.value(this.field_name);
};


/**
 * @return {boolean} true if field has value set.
 */
ydn.crm.su.model.Field.prototype.hasFieldValue = function() {
  return this.parent.module.hasValue(this.field_name);
};


/**
 * Get SugarCRM field options.
 * @return {!Object.<SugarCrm.NameValue>}
 */
ydn.crm.su.model.Field.prototype.getOptions = function() {
  var info = this.getFieldInfo();
  return info.options || {};
};


/**
 * Get field label.
 * @return {string} field label, default to SugarCrm.ModuleField#label.
 */
ydn.crm.su.model.Field.prototype.getLabel = function() {
  var info = this.getFieldInfo();
  return goog.isString(info.label) ? info.label.replace(/:$/, '') : info.label;
};


/**
 * Get field type.
 * @return {string} default to 'varchar'
 * @see #getInputType
 */
ydn.crm.su.model.Field.prototype.getType = function() {
  var info = this.getFieldInfo();
  return info ? info.type || 'varchar' : 'varchar';
};


/**
 * Check the field value is calculated or not.
 * @return {boolean}
 */
ydn.crm.su.model.Field.prototype.isCalculated = function() {
  var setting = this.getFieldInfo();
  return setting ? !!setting['calculated'] : false;
};


/**
 * Check the field value is required or not.
 * @return {boolean}
 */
ydn.crm.su.model.Field.prototype.isRequired = function() {
  var setting = this.getFieldInfo();
  return setting ? setting['required'] == '1' : false;
};


/**
 * Menu commands.
 * @enum {string}
 */
ydn.crm.su.model.Field.Command = {
  ADD: 'add',
  EDIT: 'edit',
  OPT_OUT: 'optout',
  PRIMARY: 'primary',
  REMOVE: 'remove'
};


/**
 * Check the field value is deletable.
 * Extra field like, phone number, address, email are deletable.
 * @return {Array.<ydn.ui.FlyoutMenu.ItemOption>}
 */
ydn.crm.su.model.Field.prototype.getMoreOptions = function() {
  return [];
};


if (goog.DEBUG) {
  /**
   * @inheritDoc
   */
  ydn.crm.su.model.Field.prototype.toString = function() {
    return this.parent + ';Field:' + this.field_name;
  };
}


/**
 * Get the patch object for given user input field value.
 * @param {*} value input value.
 * @return {?Object} patch object. `null` if patch is not necessary.
 */
ydn.crm.su.model.Field.prototype.patch = function(value) {
  if (this.isCalculated()) {
    return null;
  }
  if (value === this.getStringValue()) {
    return null;
  }
  var obj = {};
  obj[this.field_name] = value;
  return obj;
};
