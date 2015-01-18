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
 * @fileoverview Relate group model for Account record type.
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */


goog.provide('ydn.crm.sugarcrm.model.AccountRelateGroup');
goog.require('ydn.crm.sugarcrm.model.RelateGroup');



/**
 * Relate group model for Account record type.
 * @param {ydn.crm.sugarcrm.model.Record} parent
 * @constructor
 * @extends {ydn.crm.sugarcrm.model.RelateGroup}
 * @struct
 */
ydn.crm.sugarcrm.model.AccountRelateGroup = function(parent) {
  goog.base(this, parent, 'account');
};
goog.inherits(ydn.crm.sugarcrm.model.AccountRelateGroup, ydn.crm.sugarcrm.model.RelateGroup);


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.model.AccountRelateGroup.prototype.getGroupLabel = function() {
  return 'Account';
};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.model.AccountRelateGroup.prototype.getRelateFieldId = function() {
  return 'account_id';
};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.model.AccountRelateGroup.prototype.getRelateFieldName = function() {
  return 'account_name';
};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.model.AccountRelateGroup.prototype.getRelateModuleName = function() {
  return ydn.crm.sugarcrm.ModuleName.ACCOUNTS;
};
