/**
 * @fileoverview Utilities.
 */



goog.provide('ydn.crm.sugarcrm.utils');


/**
 * Convert name value entry to simple entry.
 * @param {!Array.<!SugarCrm.NameValueEntry>|!SugarCrm.NameValueEntry} name_value_entries
 * @return {!Array.<!SugarCrm.Record>|!SugarCrm.Record}
 */
ydn.crm.sugarcrm.utils.toRecordEntry = function(name_value_entries) {
  if (goog.isArray(name_value_entries)) {
    return name_value_entries.map(function(e) {
      return ydn.crm.sugarcrm.utils.toRecordEntry(e);
    });
  } else if (goog.isObject(name_value_entries)) {
    var entry = /** @type {SugarCrm.NameValueEntry} */ (name_value_entries);
    var obj = /** @type {!Object} */ ({});
    for (var key in entry.name_value_list) {
      obj[key] = entry.name_value_list[key].value;
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
ydn.crm.sugarcrm.utils.parseDate = function(date_str) {
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
ydn.crm.sugarcrm.utils.isValidDate = function(date) {
  return !!date && date instanceof Date && !isNaN(date.getTime());
};


/**
 * Convert to SugarCRM date string.
 * @param {Date} date a valid date
 * @return {string}
 * @throws RangeError if not a valid date.
 * @see #isValidDate
 */
ydn.crm.sugarcrm.utils.toDateString = function(date) {
  // ISO: "2014-04-02T03:32:20.522Z"
  // SugarCRM: "2013-09-20 22:10:00"
  if (!date || !date.getTime()) {
    return '';
  }
  return date.toISOString().replace('T', ' ').replace(/\..+/, '');
};

