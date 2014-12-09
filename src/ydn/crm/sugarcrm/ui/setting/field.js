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
 * @fileoverview SugarCRM field setting model.
 */


goog.provide('ydn.crm.sugarcrm.ui.setting.Field');
goog.provide('ydn.crm.sugarcrm.ui.setting.Group');
goog.provide('ydn.crm.sugarcrm.ui.setting.Setting');
goog.require('ydn.crm.ui.UserSetting');



/**
 * SugarCRM field setting model.
 * @see ydn.crm.sugarcrm.ui.setting.create
 * @param {string} name module field name.
 * @constructor
 * @struct
 */
ydn.crm.sugarcrm.ui.setting.Setting = function(name) {
  /**
   * @final
   * @type {string}
   */
  this.name = name || '';
};


/**
 * @return {string}
 */
ydn.crm.sugarcrm.ui.setting.Setting.prototype.getLabel = function() {
  return this.name.toUpperCase();
};


/**
 * @return {string}
 */
ydn.crm.sugarcrm.ui.setting.Setting.prototype.getName = function() {
  return this.name;
};


/**
 * Get user setting of the field.
 * @return {?CrmApp.SugarCrmSettingUnit}
 * @protected
 */
ydn.crm.sugarcrm.ui.setting.Setting.prototype.getUserSetting = goog.abstractMethod;


/**
 * Create user setting of the field if not exist.
 * @return {CrmApp.SugarCrmSettingUnit}
 * @protected
 */
ydn.crm.sugarcrm.ui.setting.Setting.prototype.createUserSetting = goog.abstractMethod;


/**
 * @return {boolean}
 */
ydn.crm.sugarcrm.ui.setting.Setting.prototype.getNormallyHide = goog.abstractMethod;


/**
 * @return {boolean}
 */
ydn.crm.sugarcrm.ui.setting.Setting.prototype.getNormallyHideDefault = goog.abstractMethod;


/**
 * Persist normally hide user setting.
 * @param {boolean} val
 * @return {!goog.async.Deferred}
 * @final
 */
ydn.crm.sugarcrm.ui.setting.Setting.prototype.setNormallyHide = function(val) {
  var user_setting = ydn.crm.ui.UserSetting.getInstance();
  var setting = this.getUserSetting();
  var default_val = this.getNormallyHideDefault();
  if (val == default_val) {
    if (setting) {
      delete setting.normallyHide;
      return user_setting.saveSugarCrmSetting();
    }
    return goog.async.Deferred.succeed(false);
  } else {
    if (!setting) {
      setting = this.createUserSetting();
    }
    setting.normallyHide = !!val;
    return user_setting.saveSugarCrmSetting();
  }
};



/**
 * SugarCRM field setting model.
 * @see ydn.crm.sugarcrm.ui.setting.create
 * @param {SugarCrm.ModuleField} field module field
 * @constructor
 * @extends {ydn.crm.sugarcrm.ui.setting.Setting}
 * @struct
 */
ydn.crm.sugarcrm.ui.setting.Field = function(field) {
  goog.base(this, field.name);
  /**
   * @final
   * @type {SugarCrm.ModuleField}
   */
  this.field = field;
};
goog.inherits(ydn.crm.sugarcrm.ui.setting.Field, ydn.crm.sugarcrm.ui.setting.Setting);


/**
 * @return {string}
 */
ydn.crm.sugarcrm.ui.setting.Field.prototype.getLabel = function() {
  return this.field.label || '';
};


/**
 * @return {string}
 */
ydn.crm.sugarcrm.ui.setting.Field.prototype.getName = function() {
  return this.field.name || '';
};


/**
 * @const
 * @type {!Array.<string>}
 * @protected
 */
ydn.crm.sugarcrm.ui.setting.Field.NORMALLY_HIDE = ['full_name', 'converted', 'date_entered', 'date_modified',
  'modified_user_id', 'modified_by_name', 'created_by', 'created_by_name', 'deleted', 'account_id',
  'email_and_name1', 'invalid_email', 'team_id',
  'team_set_id', 'team_count', 'assigned_user_id', 'preferred_language', 'status', 'id'];


/**
 * Return default setting.
 * @param {string} name group name.
 * @return {boolean}
 * @protected
 */
ydn.crm.sugarcrm.ui.setting.Field.getNormallyHideDefault = function(name) {
  return true;
};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.ui.setting.Field.prototype.getNormallyHideDefault = function() {
  return ydn.crm.sugarcrm.ui.setting.Field.getNormallyHideDefault(this.getName());
};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.ui.setting.Field.prototype.getUserSetting = function() {
  var user_setting = ydn.crm.ui.UserSetting.getInstance();
  var all_setting = user_setting.getSugarCrmSetting();
  var value = all_setting.Field[this.field.name];
  return all_setting.Field[this.field.name] || null;
};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.ui.setting.Field.prototype.createUserSetting = function() {
  var user_setting = ydn.crm.ui.UserSetting.getInstance();
  var all_setting = user_setting.getSugarCrmSetting();
  if (!all_setting.Field[this.field.name]) {
    all_setting.Field[this.field.name] = /** @type {CrmApp.SugarCrmSettingUnit} */ ({});
  }
  return all_setting.Field[this.field.name];
};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.ui.setting.Field.prototype.getNormallyHide = function() {
  var setting = this.getUserSetting();
  if (setting && goog.isDef(setting[ydn.crm.ui.UserSetting.SugarCrmSettingUnitKey.NORMALLY_HIDE])) {
    return !!setting[ydn.crm.ui.UserSetting.SugarCrmSettingUnitKey.NORMALLY_HIDE];
  } else {
    if (this.field.group) {
      return ydn.crm.sugarcrm.ui.setting.Group.getNormallyHideDefault(this.field.group);
    } else {
      return ydn.crm.sugarcrm.ui.setting.Field.getNormallyHideDefault(this.getName());
    }
  }
};



/**
 * SugarCRM field setting model.
 * @param {string} name module field name
 * @constructor
 * @struct
 * @extends {ydn.crm.sugarcrm.ui.setting.Setting}
 */
ydn.crm.sugarcrm.ui.setting.Group = function(name) {
  goog.base(this, name);
};
goog.inherits(ydn.crm.sugarcrm.ui.setting.Group, ydn.crm.sugarcrm.ui.setting.Setting);


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.ui.setting.Group.prototype.getLabel = function() {
  return goog.base(this, 'getLabel').toUpperCase();
};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.ui.setting.Group.prototype.getUserSetting = function() {
  var user_setting = ydn.crm.ui.UserSetting.getInstance();
  var all_setting = user_setting.getSugarCrmSetting();
  return all_setting.Group[this.name] || null;
};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.ui.setting.Group.prototype.createUserSetting = function() {
  var user_setting = ydn.crm.ui.UserSetting.getInstance();
  var all_setting = user_setting.getSugarCrmSetting();
  if (!all_setting.Group[this.name]) {
    all_setting.Group[this.name] = /** @type {CrmApp.SugarCrmSettingUnit} */ ({});
  }
  return all_setting.Group[this.name];
};


/**
 * List of normally hide group names.
 * @const
 * @type {Array.<string>}
 */
ydn.crm.sugarcrm.ui.setting.Group.NORMALLY_SHOW = ['name', 'email', 'phone',
  'primary_address', 'alt_address', ''];


/**
 * Return default setting.
 * @param {string} name group name.
 * @return {boolean}
 * @protected
 */
ydn.crm.sugarcrm.ui.setting.Group.getNormallyHideDefault = function(name) {
  return ydn.crm.sugarcrm.ui.setting.Group.NORMALLY_SHOW.indexOf(name) == -1;
};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.ui.setting.Group.prototype.getNormallyHide = function() {
  var setting = this.getUserSetting();
  return setting ? !!setting[ydn.crm.ui.UserSetting.SugarCrmSettingUnitKey.NORMALLY_HIDE] :
      ydn.crm.sugarcrm.ui.setting.Group.getNormallyHideDefault(this.name);
};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.ui.setting.Group.prototype.getNormallyHideDefault = function() {
  return ydn.crm.sugarcrm.ui.setting.Group.getNormallyHideDefault(this.getName());
};
