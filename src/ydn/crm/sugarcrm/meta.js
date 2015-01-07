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
 * @fileoverview SugarCRM meta data.
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */

goog.provide('ydn.crm.sugarcrm.Meta');



/**
 * SugarCRM meta data.
 * @interface
 */
ydn.crm.sugarcrm.Meta = function() {};


/**
 * @return {string} SugarCrm Version
 */
ydn.crm.sugarcrm.Meta.prototype.getVersion = function() {};


/**
 * @return {?boolean} true if SugarCrm backend has version 7.
 */
ydn.crm.sugarcrm.Meta.prototype.isVersion7 = function() {};


/**
 * @return {string} instance domain of sugarcrm.
 */
ydn.crm.sugarcrm.Meta.prototype.getDomain = function() {};


/**
 * @return {string} instance domain of sugarcrm.
 */
ydn.crm.sugarcrm.Meta.prototype.getUserId = function() {};


/**
 * @return {string} instance domain of sugarcrm.
 */
ydn.crm.sugarcrm.Meta.prototype.getUserLabel = function() {};


/**
 * @return {ydn.msg.Channel} instance domain of sugarcrm.
 */
ydn.crm.sugarcrm.Meta.prototype.getChannel = function() {};


/**
 * Query module information.
 * @param {ydn.crm.sugarcrm.ModuleName} name
 * @return {SugarCrm.ModuleInfo}
 */
ydn.crm.sugarcrm.Meta.prototype.getModuleInfo = function(name) {};


/**
 * @return {boolean} check login status.
 */
ydn.crm.sugarcrm.Meta.prototype.isLogin = function() {};


/**
 * Get url for contact entry of given id
 * @param {ydn.crm.sugarcrm.ModuleName} module
 * @param {string} id
 * @return {string}
 */
ydn.crm.sugarcrm.Meta.prototype.getRecordViewLink = function(module, id) {

};
