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
goog.require('ydn.crm.sugarcrm');
goog.require('ydn.crm.ui.UserSetting');



/**
 * SugarCRM field setting model.
 * @see ydn.crm.sugarcrm.ui.setting.create
 * @param {ydn.crm.sugarcrm.ModuleName} m_name
 * @param {string} name module field name.
 * @constructor
 * @struct
 */
ydn.crm.sugarcrm.ui.setting.Setting = function(m_name, name) {
  /**
   * @final
   * @type {ydn.crm.sugarcrm.ModuleName}
   */
  this.module = m_name;
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
 * @param {ydn.crm.sugarcrm.ModuleName} m_name
 * @param {SugarCrm.ModuleField} field module field
 * @constructor
 * @extends {ydn.crm.sugarcrm.ui.setting.Setting}
 * @struct
 */
ydn.crm.sugarcrm.ui.setting.Field = function(m_name, field) {
  goog.base(this, m_name, field.name);
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
 * @inheritDoc
 */
ydn.crm.sugarcrm.ui.setting.Field.prototype.getUserSetting = function() {
  var user_setting = ydn.crm.ui.UserSetting.getInstance();
  var all_setting = user_setting.getSugarCrmSetting();
  var module_setting = all_setting.Module[this.module];
  goog.asserts.assert(!!module_setting, 'field setting for ' + this.field.name +
      ' on ' + this.module + ' not defined');
  return module_setting.Field[this.field.name] || null;
};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.ui.setting.Field.prototype.createUserSetting = function() {
  var user_setting = ydn.crm.ui.UserSetting.getInstance();
  var all_setting = user_setting.getSugarCrmSetting();
  var module_setting = all_setting.Module[this.module];
  if (!module_setting.Field[this.field.name]) {
    module_setting.Field[this.field.name] = /** @type {CrmApp.SugarCrmSettingUnit} */ ({});
  }
  return module_setting.Field[this.field.name];
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
      // name group
      if (['name'].indexOf(this.field.group) >= 0) {
        if (['name', 'full_name'].indexOf(this.name) >= 0) {
          return true;
        }
      }

      if (this.module == ydn.crm.sugarcrm.ModuleName.TASKS) {
        if (['date_due', 'date_start'].indexOf(this.field.group) >= 0) {
          if (['date_due_flag', 'date_start_flag'].indexOf(this.name) >= 0) {
            return true;
          }
        }
      }

      if (this.field.group == 'account') {
        if (['account_id'].indexOf(this.name) >= 0) {
          return true;
        }
      }
      return false;
    } else {
      if (this.module == ydn.crm.sugarcrm.ModuleName.ACCOUNTS) {
        return ['name', 'website'].indexOf(this.name) == -1;
      } else if (this.module == ydn.crm.sugarcrm.ModuleName.CALLS) {
        return ['name', 'date_start', 'date_end', 'status', 'description'].indexOf(this.name) == -1;
      } else if (this.module == ydn.crm.sugarcrm.ModuleName.CASES) {
        return ['name', 'description', 'priority', 'status', 'type'].indexOf(this.name) == -1;
      } else if (this.module == ydn.crm.sugarcrm.ModuleName.NOTES) {
        return ['name', 'description'].indexOf(this.name) == -1;
      } else if (this.module == ydn.crm.sugarcrm.ModuleName.MEETINGS) {
        return ['name', 'date_start', 'date_end', 'status', 'priority', 'description'].indexOf(this.name) == -1;
      } else if (this.module == ydn.crm.sugarcrm.ModuleName.OPPORTUNITIES) {
        return ['name', 'amount', 'date_closed', 'sales_stage', 'account_name',
          'description', 'lead_source'].indexOf(this.name) == -1;
      } else if (this.module == ydn.crm.sugarcrm.ModuleName.TASKS) {
        return ['name', 'status', 'priority', 'description'].indexOf(this.name) == -1;
      } else {
        return true;
      }
    }
  }
};



/**
 * SugarCRM group setting model.
 * @param {ydn.crm.sugarcrm.ModuleName} m_name
 * @param {string} name module field name
 * @constructor
 * @struct
 * @extends {ydn.crm.sugarcrm.ui.setting.Setting}
 */
ydn.crm.sugarcrm.ui.setting.Group = function(m_name, name) {
  goog.base(this, m_name, name);
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
  var module_setting = all_setting.Module[this.module];
  goog.asserts.assert(!!module_setting, 'group setting for ' + this.name +
      ' on ' + this.module + ' not defined');
  return module_setting.Group[this.name] || null;
};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.ui.setting.Group.prototype.createUserSetting = function() {
  var user_setting = ydn.crm.ui.UserSetting.getInstance();
  var all_setting = user_setting.getSugarCrmSetting();
  var module_setting = all_setting.Module[this.module];
  if (!module_setting.Group[this.name]) {
    module_setting.Group[this.name] = /** @type {CrmApp.SugarCrmSettingUnit} */ ({});
  }
  return module_setting.Group[this.name];
};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.ui.setting.Group.prototype.getNormallyHide = function() {
  var setting = this.getUserSetting();
  return setting ?
      !!setting[ydn.crm.ui.UserSetting.SugarCrmSettingUnitKey.NORMALLY_HIDE] :
      this.getNormallyHideDefault();
};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.ui.setting.Group.prototype.getNormallyHideDefault = function() {
  if (['', 'name'].indexOf(this.name) >= 0) {
    return false;
  } else if (this.module == ydn.crm.sugarcrm.ModuleName.ACCOUNTS) {
    return ['billing_address', 'shipping_address', 'email', 'phone'].indexOf(this.name) == -1;
  } else if (this.module == ydn.crm.sugarcrm.ModuleName.CALLS) {
    return ['appointment', 'assigned_user_name'].indexOf(this.name) == -1;
  } else if (this.module == ydn.crm.sugarcrm.ModuleName.CASES) {
    return ['account', 'assigned_user_name'].indexOf(this.name) == -1;
  } else if (this.module == ydn.crm.sugarcrm.ModuleName.CONTACTS || this.module == ydn.crm.sugarcrm.ModuleName.LEADS) {
    return ['account', 'primary_address', 'alt_address', 'email', 'phone'].indexOf(this.name) == -1;
  } else if (this.module == ydn.crm.sugarcrm.ModuleName.MEETINGS) {
    return ['appointment', 'assigned_user_name'].indexOf(this.name) == -1;
  } else if (this.module == ydn.crm.sugarcrm.ModuleName.OPPORTUNITIES) {
    return ['account', 'amount'].indexOf(this.name) == -1;
  } else if (this.module == ydn.crm.sugarcrm.ModuleName.TASKS) {
    return ['appointment'].indexOf(this.name) == -1;
  } else {
    return true;
  }
};
