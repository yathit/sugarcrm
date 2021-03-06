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
 * @fileoverview Interface for immutable SugarCRM model.
 *
 * This is implemented in {@link ydn.crm.su.model.Sugar}.
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */

goog.provide('ydn.crm.su.Meta');



/**
 * SugarCRM meta data.
 * Implemented by {@link ydn.crm.su.model.Sugar}
 * @interface
 */
ydn.crm.su.Meta = function() {};


/**
 * @return {string} SugarCrm Version
 */
ydn.crm.su.Meta.prototype.getVersion = function() {};


/**
 * @return {?boolean} true if SugarCrm backend has version 7.
 */
ydn.crm.su.Meta.prototype.isVersion7 = function() {};


/**
 * Check require version.
 * @param {string} ver sugarcrm version, such as '7'.
 * @return {boolean} return true if sugarcrm version is higher or equal to
 * given version.
 */
ydn.crm.su.Meta.prototype.hasVersion = function(ver) {};


/**
 * @return {string} instance domain of sugarcrm.
 */
ydn.crm.su.Meta.prototype.getDomain = function() {};


/**
 * @return {ydn.crm.su.Record} login user record.
 */
ydn.crm.su.Meta.prototype.getUser = function() {};


/**
 * @return {ydn.msg.Channel} instance domain of sugarcrm.
 */
ydn.crm.su.Meta.prototype.getChannel = function() {};


/**
 * Query people module records by email.
 * @param {string} email email address to query.
 * @return {!goog.async.Deferred<!Array<!SugarCrm.Record>>}  list of record. the record value
 * has `_module` for respective module name.
 */
ydn.crm.su.Meta.prototype.queryByEmail = function(email) {};


/**
 * Query one people module record by email. This will search on server if not
 * found in client database.
 * @param {string} email email address to query.
 * @param {boolean=} opt_include_internal include internal people from 'Users'
 * @return {!goog.async.Deferred<SugarCrm.Record>} list of record. the record value
 * has `_module` for respective module name.
 */
ydn.crm.su.Meta.prototype.queryOneByEmail = function(email, opt_include_internal) {};


/**
 * Query module information.
 * @param {ydn.crm.su.ModuleName} name
 * @return {SugarCrm.ModuleInfo}
 */
ydn.crm.su.Meta.prototype.getModuleInfo = function(name) {};


/**
 * @return {boolean} check login status.
 */
ydn.crm.su.Meta.prototype.isLogin = function() {};


/**
 * Get url for contact entry of given id
 * @param {ydn.crm.su.ModuleName} module
 * @param {string} id
 * @return {string}
 */
ydn.crm.su.Meta.prototype.getRecordViewLink = function(module, id) {

};


/**
 * Heuristically convert given name to module name. Useful for converting
 * lousy label to module name.
 * <pre>
 *   sugar.tryToModuleName('Account'); // return 'Accounts'
 * </pre>
 * @param {string} name
 * @return {ydn.crm.su.ModuleName|undefined}
 */
ydn.crm.su.Meta.prototype.tryToModuleName = function(name) {};


/**
 * @param {string} name
 * @return {ydn.crm.su.ModuleName|undefined} return undefined if not a valid
 * module name.
 * @see #tryToModuleName
 */
ydn.crm.su.Meta.prototype.asModuleName = function(name) {};


/**
 * Get Users module record id of login user.
 * @return {string}
 */
ydn.crm.su.Meta.prototype.getUserRecordId = function() {};
