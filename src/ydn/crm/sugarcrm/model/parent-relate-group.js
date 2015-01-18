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
 * @fileoverview Relate group model for parent fields: parent_id, parent_name
 * and parent_type.
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */


goog.provide('ydn.crm.sugarcrm.model.ParentRelateGroup');
goog.require('ydn.crm.sugarcrm.model.RelateGroup');



/**
 * Relate group model for parent fields.
 * @param {ydn.crm.sugarcrm.model.Record} parent
 * @constructor
 * @extends {ydn.crm.sugarcrm.model.RelateGroup}
 * @struct
 */
ydn.crm.sugarcrm.model.ParentRelateGroup = function(parent) {
  goog.base(this, parent, 'parent');
};
goog.inherits(ydn.crm.sugarcrm.model.ParentRelateGroup, ydn.crm.sugarcrm.model.RelateGroup);


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.model.ParentRelateGroup.prototype.getGroupLabel = function() {
  return 'Related to';
};


/**
 * @return {string}
 */
ydn.crm.sugarcrm.model.ParentRelateGroup.prototype.getRelateFieldType = function() {
  return 'parent_type';
};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.model.ParentRelateGroup.prototype.getRelateFieldId = function() {
  return 'parent_id';
};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.model.ParentRelateGroup.prototype.getRelateFieldName = function() {
  return 'parent_name';
};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.model.ParentRelateGroup.prototype.getRelateModuleName = function() {
  var mn = /** @type {ydn.crm.sugarcrm.ModuleName} */(this.valueAsString('parent_type'));
  if (!mn) {
    return ydn.crm.sugarcrm.ModuleName.ACCOUNTS;
  }
};


/**
 * List parent type options or list of relate module names.
 * @return {Array<string>} list of values of `parent_type` options field.
 */
ydn.crm.sugarcrm.model.ParentRelateGroup.prototype.getParentTypeOptions = function() {
  var info = this.getFieldInfo('parent_type');
  var options = [];
  if (info && info.options) {
    for (var i in info.options) {
      options.push(info.options[i].value);
    }
  }
  return options;
};


/**
 * Default parent type value. Use {@link #optionValue2ModuleName} to get
 * module name.
 * @return {string} return default parent type value. Empty string return if
 * not default parent type present.
 */
ydn.crm.sugarcrm.model.ParentRelateGroup.prototype.getDefaultParentType = function() {
  var info = this.getFieldInfo('parent_type');
  if (info && info.options) {
    for (var i in info.options) {
      return info.options[i].value;
    }
  }
  return '';
};


/**
 * Look up option value to module name.
 * @param {string} val
 * @return {?ydn.crm.sugarcrm.ModuleName}
 */
ydn.crm.sugarcrm.model.ParentRelateGroup.prototype.optionValue2ModuleName = function(val) {
  var info = this.getFieldInfo('parent_type');
  if (info && info.options) {
    for (var i in info.options) {
      if (info.options[i].value == val) {
        return /** @type {ydn.crm.sugarcrm.ModuleName} */(info.options[i].name);
      }
    }
  }
  return null;
};
