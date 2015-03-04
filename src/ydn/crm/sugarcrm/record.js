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
 * @fileoverview SugarCRM Record wrapper object, providing utility functions.
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */



goog.provide('ydn.crm.su.Record');
goog.require('ydn.crm.su');



/**
 * SugarCRM Record wrapper object, providing utility functions.
 * @param {string} domain SugarCRM instance identifier as domain name,
 * eg: "fjochv4737.trial.sugarcrm.eu".
 * @param {ydn.crm.su.ModuleName} module module name, eg: 'Contacts'.
 * @param {SugarCrm.Record=} opt_obj name SugarCRM record entry.
 * @constructor
 * @struct
 */
ydn.crm.su.Record = function(domain, module, opt_obj) {
  /**
   * @final
   * @type {string}
   */
  this.domain = domain;
  /**
   * @final
   * @protected
   * @type {ydn.crm.su.ModuleName}
   */
  this.module = module;

  /**
   * Name value pairs.
   * @protected
   * @type {!SugarCrm.Record}
   */
  this.obj = opt_obj || /** @type {!SugarCrm.Record} */ ({});
  // this.key_path = module == ydn.crm.su.ModuleName.EMAIL_TEXT ? 'email_id' : 'id';
};


/**
 * @define {boolean} debug flag.
 */
ydn.crm.su.Record.DEBUG = false;


/**
 * @protected
 * @final
 * @type {string}
 */
ydn.crm.su.Record.prototype.key_path = 'id';


/**
 * Check the record is new, i.e., not exist in server.
 * @return {boolean} return record has valid record id.
 * @see #hasData to check existence of data.
 */
ydn.crm.su.Record.prototype.isNew = function() {
  return !this.obj[this.key_path];
};


/**
 * @return {boolean} return record has valid record id.
 * @see #hasData to check existence of data.
 * @deprecated use #isNew instead
 */
ydn.crm.su.Record.prototype.hasRecord = function() {
  return !this.isNew();
};


/**
 * @return {boolean} return record has any data.
 * @see #hasRecord to check valid record.
 */
ydn.crm.su.Record.prototype.hasData = function() {
  return Object.keys(this.obj).length > 0;
};


/**
 * @return {string}
 */
ydn.crm.su.Record.prototype.getDomain = function() {
  return this.domain;
};


/**
 * @return {ydn.crm.su.ModuleName}
 */
ydn.crm.su.Record.prototype.getModule = function() {
  return this.module;
};


/**
 * @return {!SugarCrm.Record}
 */
ydn.crm.su.Record.prototype.getData = function() {
  return this.obj;
};


/**
 * Set record data.
 * @param {?SugarCrm.Record} obj if obj is specify, it must have a valid id.
 * To set empty record, use null value, i.e, setData(null);.
 */
ydn.crm.su.Record.prototype.setData = function(obj) {
  if (obj) {
    if (ydn.crm.su.Record.DEBUG && !obj[this.key_path]) {
      window.console.log(obj);
    }
    goog.asserts.assertString(obj[this.key_path], 'id missing in record');
  }
  this.obj = obj || /** @type {!SugarCrm.Record} */ ({});
};


/**
 * Merge data.
 * @param {SugarCrm.Record} obj
 */
ydn.crm.su.Record.prototype.updateData = function(obj) {
  if (obj) {
    if (!this.obj) {
      this.obj = /** @type {!SugarCrm.Record} */ (/** @type {Object} */ ({}));
    }
    for (var name in obj) {
      this.obj[name] = obj[name];
    }
  }
};


/**
 * @return {string}
 * @throws assertion if id not set.
 */
ydn.crm.su.Record.prototype.getId = function() {
  var id = this.obj[this.key_path];
  if (ydn.crm.su.Record.DEBUG && !id) {
    window.console.log(this.obj);
  }
  goog.asserts.assert(id, 'getting empty id of a record');
  return id;
};


/**
 * Get due date.
 * @return {?Date}
 */
ydn.crm.su.Record.prototype.getDueDate = function() {
  var field = ydn.crm.su.Record.getFieldNameForDeadline(this.module);
  if (!field) {
    return null;
  }
  var val = this.value(field);
  if (goog.isString(val)) {
    return ydn.crm.su.utils.parseDate(val);
  } else {
    return null;
  }
};


/**
 * Get record modified date.
 * @return {number}
 */
ydn.crm.su.Record.prototype.getUpdated = function() {
  if (this.obj) {
    return +ydn.crm.su.utils.parseDate(this.obj['date_modified']);
  } else {
    return NaN;
  }
};


/**
 * Get deadline.
 * @return {Date}
 */
ydn.crm.su.Record.prototype.getDeadline = function() {
  if (this.obj) {
    var field = ydn.crm.su.Record.getFieldNameForDeadline(this.module);
    return ydn.crm.su.utils.parseDate(this.obj[field]);
  } else {
    return new Date('NaN');
  }
};


/**
 * Return index name for determining deadline.
 * @param {ydn.crm.su.ModuleName} m_name
 * @return {string}
 */
ydn.crm.su.Record.getIndexForDeadline = function(m_name) {
  return 'assigned_user_id, ' + ydn.crm.su.Record.getFieldNameForDeadline(m_name);
};


/**
 * Return field name for determining deadline.
 * @param {ydn.crm.su.ModuleName} m_name
 * @return {string}
 */
ydn.crm.su.Record.getFieldNameForDeadline = function(m_name) {
  if (m_name == ydn.crm.su.ModuleName.TASKS) {
    return 'date_due';
  } else if (m_name == ydn.crm.su.ModuleName.OPPORTUNITIES) {
    return 'date_closed';
  } else if (m_name == ydn.crm.su.ModuleName.CALLS ||
      m_name == ydn.crm.su.ModuleName.MEETINGS) {
    return 'date_start';
  } else {
    return 'date_modified';
  }
};


/**
 * Return noun form of the module.
 * Eg: `Contacts` return as `Contact`.
 * @param {ydn.crm.su.ModuleName} name
 * @return {string}
 */
ydn.crm.su.Record.moduleAsNoun = function(name) {
  return name.replace(/ies$/, 'y').replace(/s$/, '');
};


/**
 * Return verb form of the module.
 * Eg: `Meetings` return as `Meet`, `Opportinities` return 'Close'.
 * @param {ydn.crm.su.ModuleName} name
 * @return {string}
 */
ydn.crm.su.Record.moduleAsVerb = function(name) {
  if (name == ydn.crm.su.ModuleName.CALLS) {
    return 'call';
  } else if (name == ydn.crm.su.ModuleName.TASKS) {
    return 'finish';
  } else if (name == ydn.crm.su.ModuleName.MEETINGS) {
    return 'meet';
  } else if (name == ydn.crm.su.ModuleName.OPPORTUNITIES) {
    return 'close';
  } else {
    return 'do';
  }
};


/**
 * Get suitable title of this record.
 * @return {string}
 */
ydn.crm.su.Record.prototype.getLabel = function() {
  if (!this.obj) {
    return '';
  }
  if (this.obj['name']) {
    return this.obj['name'];
  }
  var full_name = this.obj['full_name'] || this.obj['name'];
  if (full_name) {
    return full_name;
  } else if (this.obj['first_name'] || this.obj['last_name']) {
    var first_name = (this.obj['first_name'] || '').trim();
    var last_name = (this.obj['last_name'] || '').trim();
    return first_name + ' ' + last_name;
  } else {
    return this.obj[this.key_path];
  }
};


/**
 * List of field names.
 * @return {Array.<string>}
 */
ydn.crm.su.Record.prototype.names = function() {
  return Object.keys(this.obj);
};


/**
 * @typedef {(!Array|string|boolean|undefined)}
 */
ydn.crm.su.RecordValue;


/**
 * Get record field value.
 * @param {string} name
 * @return {ydn.crm.su.RecordValue}
 */
ydn.crm.su.Record.prototype.value = function(name) {
  return this.obj[name];
};


/**
 * Get record field value for string.
 * @param {string} name field name
 * @return {?string} a string field value.
 */
ydn.crm.su.Record.prototype.getStringValue = function(name) {
  var s = this.obj[name];
  return /** @type {?string} */ (goog.isString(s) ? s : null);
};


/**
 * @param {string} name field name
 * @return {boolean} `true` if record schema has valid field value.
 * @see {#hasValue}
 */
ydn.crm.su.Record.prototype.hasField = function(name) {
  // todo: should use schema.
  return this.obj.hasOwnProperty(name);
};


/**
 * @param {string} name field name
 * @return {boolean} `true` if field value is define and not null.
 * @see {#hasField}
 */
ydn.crm.su.Record.prototype.hasValue = function(name) {
  return goog.isDefAndNotNull(this.obj[name]);
};


/**
 * Set a field value. If record value is not exist, it will be initialize
 * with empty object.
 * @param {string} name
 * @param {*} value
 */
ydn.crm.su.Record.prototype.setValue = function(name, value) {
  if (!this.obj) {
    this.obj = /** @type {!SugarCrm.Record} */ (/** @type {Object} */({}));
  }
  this.obj[name] = value;
};


/**
 * @inheritDoc
 */
ydn.crm.su.Record.prototype.toJSON = function() {
  return {
    'domain': this.domain,
    'module': this.module,
    'obj': this.obj
  };
};


/**
 * Get list of email from the record.
 * @param {SugarCrm.Record} record
 * @return {!Array<string>}
 * @see getEmail
 */
ydn.crm.su.Record.getEmails = function(record) {
  var emails = [];
  if (record['email1']) {
    emails.push(record['email1']);
  }
  if (record['email2']) {
    emails.push(record['email2']);
  }
  if (record['email_addresses_non_primary']) {
    var email = record['email_addresses_non_primary'];
    var exists = emails.some(function(x) {
      return x == email;
    });
    if (!exists) {
      emails.push(email);
    }
  }
  return emails;
};


/**
 * Get an email from the record.
 * @param {SugarCrm.Record} record
 * @return {string} empty string if no email.
 * @see #getEmails
 */
ydn.crm.su.Record.getEmail = function(record) {
  if (record['email1']) {
    return record['email1'];
  }
  if (record['email2']) {
    return record['email2'];
  }
  if (record['email_addresses_non_primary']) {
    return record['email_addresses_non_primary'];
  }
  return '';
};


/**
 * Deserialize JSON object.
 * @param {!Object} json
 * @return {!ydn.crm.su.Record}
 */
ydn.crm.su.Record.fromJSON = function(json) {
  return new ydn.crm.su.Record(json['domain'], json['module'], json['obj']);
};


if (goog.DEBUG) {
  /**
   * @inheritDoc
   */
  ydn.crm.su.Record.prototype.toString = function() {
    var id = this.obj ? this.obj[this.key_path] : undefined;
    return 'Record:' + this.module + ':' + id;
  };
}
