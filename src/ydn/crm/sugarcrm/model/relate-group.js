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
 * @fileoverview Group model for relate type field.
 *
 * The only two fields are assigned_user_id and assigned_user_name.
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */


goog.provide('ydn.crm.sugarcrm.model.RelateGroup');
goog.require('ydn.crm.sugarcrm.model.BaseGroup');



/**
 * Group model for assigned_user_name fields.
 * @param {ydn.crm.sugarcrm.model.Record} parent
 * @param {string} group_name Group name.
 * @constructor
 * @extends {ydn.crm.sugarcrm.model.BaseGroup}
 * @struct
 */
ydn.crm.sugarcrm.model.RelateGroup = function(parent, group_name) {
  goog.base(this, parent, group_name);
};
goog.inherits(ydn.crm.sugarcrm.model.RelateGroup, ydn.crm.sugarcrm.model.BaseGroup);


/**
 * @return {string} id field id of related record.
 */
ydn.crm.sugarcrm.model.RelateGroup.prototype.getRelateFieldId = goog.abstractMethod;


/**
 * @return {string} name field of related record.
 */
ydn.crm.sugarcrm.model.RelateGroup.prototype.getRelateFieldName = goog.abstractMethod;


/**
 * @return {ydn.crm.sugarcrm.ModuleName} module name field of related record.
 */
ydn.crm.sugarcrm.model.RelateGroup.prototype.getRelateModuleName = goog.abstractMethod;


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.model.RelateGroup.prototype.hasGroupValue = function() {
  return this.hasFieldValue(this.getRelateFieldId());
};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.model.RelateGroup.prototype.getGroupValue = function() {
  return this.getStringValue(this.getRelateFieldName());
};
