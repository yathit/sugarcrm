// Copyright 2014 YDN Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


/**
 * @fileoverview SugarCRM module group model.
 *
 * A group model is collection of fields.
 */


goog.provide('ydn.crm.sugarcrm.model.BaseGroup');
goog.require('ydn.ui.FlyoutMenu');



/**
 * SugarCRM module group model.
 * @param {ydn.crm.sugarcrm.model.Record} parent
 * @param {string} group_name Group name.
 * @constructor
 * @struct
 */
ydn.crm.sugarcrm.model.BaseGroup = function(parent, group_name) {
  /**
   * @final
   * @type {ydn.crm.sugarcrm.model.Record}
   */
  this.module = parent;
  /**
   * @final
   * @protected
   * @type {string}
   */
  this.group_name = group_name || '';
};


/**
 * @define {boolean} debug flag.
 */
ydn.crm.sugarcrm.model.BaseGroup.DEBUG = false;


/**
 * @return {SugarCrm.ModuleInfo}
 */
ydn.crm.sugarcrm.model.BaseGroup.prototype.getModuleInfo = function() {
  return this.module.getModuleInfo();
};


/**
 * @param {string} name field name.
 * @return {SugarCrm.ModuleField}
 */
ydn.crm.sugarcrm.model.BaseGroup.prototype.getFieldInfo = function(name) {
  return this.module.getFieldInfo(name);
};


/**
 * @return {ydn.crm.sugarcrm.Meta} SugarCRM metadata.
 */
ydn.crm.sugarcrm.model.BaseGroup.prototype.getMeta = function() {
  return this.module.getMeta();
};


/**
 * Return default setting.
 * @param {string} name group name.
 * @return {boolean}
 */
ydn.crm.sugarcrm.model.BaseGroup.getNormallyHideDefaultSetting = function(name) {
  if (/address/i.test(name)) {
    return false;
  } else if (['email', 'name', 'phone', ''].indexOf(name) >= 0) {
    return false;
  } else {
    return true;
  }
};


/**
 * Check existence of a field name in module information.
 * @param {string} name
 * @return {boolean} `true` if field name is in the group.
 * @see #hasFieldValue
 */
ydn.crm.sugarcrm.model.BaseGroup.prototype.hasField = function(name) {
  var module_info = this.module.getModuleInfo();
  var info = module_info.module_fields[name];
  if (!info) {
    return false;
  }
  return info.group == this.group_name;
};


/**
 * Get list of field name in this group.
 * @return {!Array.<string>}
 */
ydn.crm.sugarcrm.model.BaseGroup.prototype.listFields = function() {
  var module_info = this.module.getModuleInfo();
  var fields = [];
  for (var name in module_info.module_fields) {
    var field = module_info.module_fields[name];
    if (this.group_name && field.group == this.group_name) {
      fields.push(name);
    } else if (!this.group_name && !field.group) {
      fields.push(name);
    }
  }
  return fields;
};


/**
 * Get record field value.
 * @param {string} name
 * @return {ydn.crm.sugarcrm.RecordValue}
 */
ydn.crm.sugarcrm.model.BaseGroup.prototype.getFieldValue = function(name) {
  return this.module.value(name);
};


/**
 * Get default field value.
 * @param {string} name
 * @return {?ydn.crm.sugarcrm.RecordValue} `null` if no default value set.
 */
ydn.crm.sugarcrm.model.BaseGroup.prototype.getDefaultFieldValue = function(name) {
  // default field values
  if (!this.group_name) {
    if (name == 'status') {
      return 'Planned';
    } else if (name == 'priority') {
      return 'Medium';
    } else if (name == 'sales_stage') {
      return 'Prospecting';
    }
  }
  return null;
};


/**
 * Get record field value as string.
 * @param {string} name
 * @return {string}
 */
ydn.crm.sugarcrm.model.BaseGroup.prototype.valueAsString = function(name) {
  return this.module.valueAsString(name);
};


/**
 * @param {string} name
 * @return {boolean} return `true` if field has value set.
 * @see #hasField
 */
ydn.crm.sugarcrm.model.BaseGroup.prototype.hasFieldValue = function(name) {
  return this.module.hasValue(name);
};


/**
 * Get record field value for string.
 * @param {string} name
 * @return {?string}
 */
ydn.crm.sugarcrm.model.BaseGroup.prototype.getStringValue = function(name) {
  return this.module.getStringValue(name);
};


/**
 * @return {ydn.crm.sugarcrm.ModuleName}
 */
ydn.crm.sugarcrm.model.BaseGroup.prototype.getModuleName = function() {
  return this.module.getModuleName();
};


/**
 * @return {string}
 */
ydn.crm.sugarcrm.model.BaseGroup.prototype.getGroupName = function() {
  return this.group_name;
};


/**
 * Generally used by controller as group title tooltip.
 * @return {string}
 */
ydn.crm.sugarcrm.model.BaseGroup.prototype.getGroupLabel = function() {
  var label = this.group_name.replace('_', ' ');
  label = label.charAt(0).toUpperCase() + label.substr(1);
  return label;
};


/**
 * If return `true` {@link getGroupValue} must return a string.
 * @return {boolean} true if field has value set.
 */
ydn.crm.sugarcrm.model.BaseGroup.prototype.hasGroupValue = function() {
  return false;
};


/**
 * Get group value.
 * Generally used by controller as group title string.
 * @return {?string}
 */
ydn.crm.sugarcrm.model.BaseGroup.prototype.getGroupValue = function() {
  return null;
};


/**
 * Check that group label is editable.
 * If return `true` {@link setGroupValue} will be call when user chagne group
 * title string.
 * @return {boolean} `true` is group value can be set.
 */
ydn.crm.sugarcrm.model.BaseGroup.prototype.isGroupValueEditable = function() {
  return false;
};


/**
 * Set group label.
 * @param {string} label
 * @return {Object} return a patch object as result of setting group value.
 * return `null` if no change required.
 */
ydn.crm.sugarcrm.model.BaseGroup.prototype.setGroupValue = function(label) {
  return null;
};


/**
 * Option menu items.
 * @return {?Array|ydn.ui.FlyoutMenu.ItemOption} menu items. If string return, a horizontal dot will
 * show and action is immediately invoked, if Array is return, a vertical dot
 * will show and a menu will show.
 */
ydn.crm.sugarcrm.model.BaseGroup.prototype.getAdditionalOptions = function() {
  return null;
};


/**
 * Get the patch object for given user input field value.
 * @param {*} value input value.
 * @return {?Object} patch object. `null` if patch is not necessary.
 */
ydn.crm.sugarcrm.model.BaseGroup.prototype.pluck = function(value) {
  if (!goog.isObject(value)) {
    return null;
  }
  var has_changed = false;
  var obj = {};
  for (var name in value) {
    if (this.hasField(name)) {
      var field_value = this.module.value(name);
      if (value[name] !== field_value) {
        has_changed = true;
        obj[name] = value[name];
      }
    } /* else {
      has_changed = true;
      obj[name] = value[name];
      if (ydn.crm.sugarcrm.model.BaseGroup.DEBUG) {
        window.console.warn('New field: ' + name + ' was introduced to ' + this);
      }
    } */
  }
  return has_changed ? obj : null;
};
