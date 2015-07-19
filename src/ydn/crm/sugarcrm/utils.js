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
 * @fileoverview Utilities.
 *                                                 `
 * @author kyawtun@yathit.com (Kyaw Tun)
 */



goog.provide('ydn.crm.su.utils');
goog.require('goog.string');
goog.require('ydn.crm.su');


/**
 * Convert name value entry to simple entry.
 * @param {!Array.<!SugarCrm.NameValueEntry>|!SugarCrm.NameValueEntry} name_value_entries
 * @return {!Array.<!SugarCrm.Record>|!SugarCrm.Record}
 */
ydn.crm.su.utils.toRecordEntry = function(name_value_entries) {
  if (goog.isArray(name_value_entries)) {
    return name_value_entries.map(function(e) {
      return ydn.crm.su.utils.toRecordEntry(e);
    });
  } else if (goog.isObject(name_value_entries)) {
    var entry = /** @type {SugarCrm.NameValueEntry} */ (name_value_entries);
    var obj = /** @type {!Object} */ ({});
    for (var key in entry.name_value_list) {
      var name = entry.name_value_list[key].name;
      obj[name] = entry.name_value_list[key].value;
    }
    return /** @type {!SugarCrm.Record} */ (obj);
  } else {
    throw new Error('Invalid name_value_entries');
  }
};


/**
 * Parse SugarCRM GMT date.
 * @param {string} date_str "2013-09-20 22:10:00"
 * @return {Date}
 */
ydn.crm.su.utils.parseDate = function(date_str) {
  // SugarCRM use UCT (GMT) date format, but not standard. By appending
  // GMT, it parse correctly in chrome, but not in Firefox. Since we are only
  // using in Chrome, this is OK. FIXME
  return new Date(date_str + ' GMT');
};


/**
 * Check valid date.
 * @param {Date|*} date
 * @return {boolean} true if a valid date.
 */
ydn.crm.su.utils.isValidDate = function(date) {
  return !!date && date instanceof Date && !isNaN(date.getTime());
};


/**
 * Convert to SugarCRM date string.
 * @param {Date} date a valid date
 * @return {string}
 * @see #isValidDate
 */
ydn.crm.su.utils.toDateString = function(date) {
  // ISO: "2014-04-02T03:32:20.522Z"
  // SugarCRM: "2013-09-20 22:10:00"
  if (!date || !date.getTime()) {
    return '';
  }
  return date.toISOString().replace('T', ' ').replace(/\..+/, '');
};


/**
 * Convert to SugarCRM date string to datetime-local INPUT value format.
 * @param {string} date_str SugarCRM date string "2013-09-20 22:10:00"
 * @return {string} eg: "2013-09-21T06:10"
 */
ydn.crm.su.utils.toDateTimeLocalString = function(date_str) {
  var date = ydn.crm.su.utils.parseDate(date_str);
  if (!date || !date.getTime()) {
    return '';
  }
  // datetime-local format: "2014-10-17T06:15"
  var year = date.getFullYear();
  var month = goog.string.padNumber((date.getMonth() + 1), 2);
  var day = goog.string.padNumber(date.getDate(), 2);
  var hour = goog.string.padNumber(date.getHours(), 2);
  var minute = goog.string.padNumber(date.getMinutes(), 2);

  return year + '-' + month + '-' + day + 'T' + hour + ':' + minute;
};


/**
 * Convert from datetime-local to SugarCRM date string
 * @param {number} date_value input.valueAsNumber
 * @return {string}
 */
ydn.crm.su.utils.fromDateTimeLocalString = function(date_value) {
  if (!date_value) {
    return '';
  }
  var offset = new Date().getTimezoneOffset();
  var d = new Date(date_value + offset * 60000);
  return ydn.crm.su.utils.toDateString(d);
};


/**
 * Increment one digit to date_modified field.
 * Used in cache invalidation hack.
 * @param {!SugarCrm.Record} record
 */
ydn.crm.su.utils.incrementDateModified = function(record) {
  if (record.date_modified) {
    var date = ydn.crm.su.utils.parseDate(record.date_modified);
    date = new Date(date.getTime() + 1000); // increment one second.
    record.date_modified = ydn.crm.su.utils.toDateString(date);
  }
};


/**
 * @param {string|ydn.crm.su.ModuleName} module
 * @return {string}
 */
ydn.crm.su.utils.getTableNameFromModule = function(module) {
  // TODO: use table_name from module info data.
  if (module == ydn.crm.su.ModuleName.EMAIL_TEMPLATES) {
    return 'email_templates';
  }
  return module.toLowerCase();
};


/**
 * @param {string|ydn.crm.su.ModuleName} module
 * @param {string} field
 * @return {string}
 */
ydn.crm.su.utils.getModule2QueryColumnName = function(module, field) {
  return ydn.crm.su.utils.getTableNameFromModule(module) + '.' + field;
};
