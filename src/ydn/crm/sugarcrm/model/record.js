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
 * @fileoverview SugarCRM module model providing reading and writing to
 * SugarCRM instance and event dispatching.
 *
 * Encapsulate module info (or meta data) and its transient record entry data.
 * Record entry data can change during life time of the model dispatching
 * change (goog.events.EventType.CHANGE) event.
 */


goog.provide('ydn.crm.su.model.Record');
goog.require('ydn.crm.su.Record');
goog.require('ydn.crm.su.model.AccountRelateGroup');
goog.require('ydn.crm.su.model.AddressGroup');
goog.require('ydn.crm.su.model.AppointmentGroup');
goog.require('ydn.crm.su.model.AssignUserGroup');
goog.require('ydn.crm.su.model.ContactRelateGroup');
goog.require('ydn.crm.su.model.EmailGroup');
goog.require('ydn.crm.su.model.Group');
goog.require('ydn.crm.su.model.NameGroup');
goog.require('ydn.crm.su.model.ParentRelateGroup');
goog.require('ydn.crm.su.model.PhoneGroup');
goog.require('ydn.gdata.m8.ExternalId');
goog.require('ydn.msg');



/**
 * SugarCRM module model.
 * @param {ydn.crm.su.model.Sugar} parent
 * @param {!ydn.crm.su.Record} r
 * @constructor
 * @extends {goog.events.EventTarget}
 * @struct
 */
ydn.crm.su.model.Record = function(parent, r) {
  goog.base(this);
  /**
   * @final
   * @type {ydn.crm.su.model.Sugar}
   */
  this.parent = parent;
  /**
   * @type {!ydn.crm.su.Record}
   * @protected
   */
  this.record = r;
  /**
   * @type {Object.<!ydn.crm.su.model.BaseGroup>}
   * @private
   */
  this.groups_ = {};

  /**
   * @type {goog.async.Deferred}
   * @private
   */
  this.validated_ = null;

  if (ydn.crm.su.model.Record.DEBUG) {
    this.randomId_ = Math.random();
  }
};
goog.inherits(ydn.crm.su.model.Record, goog.events.EventTarget);


/**
 * @define {boolean} debug flag.
 */
ydn.crm.su.model.Record.DEBUG = false;


/**
 * @protected
 * @type {goog.debug.Logger}
 */
ydn.crm.su.model.Record.prototype.logger =
    goog.log.getLogger('ydn.crm.su.model.Record');


/**
 * @return {string}
 */
ydn.crm.su.model.Record.prototype.getDomain = function() {
  return this.parent.getDomain();
};


/**
 * Get record Id, as generated from SugarCRM
 * @return {string}
 */
ydn.crm.su.model.Record.prototype.getId = function() {
  return this.record.getId();
};


/**
 * List of fields need to escape HTML entities, such as &quot, &#039s.
 * @const
 * @type {Array<string>}
 */
ydn.crm.su.model.Record.HTML_ESCAPE_FIELDS = ['name', 'full_name', 'first_name',
  'last_name'];


/**
 * Get record field value.
 * @param {string} name field name
 * @return {ydn.crm.su.RecordValue} field value.
 * @see #getStringValue
 */
ydn.crm.su.model.Record.prototype.value = function(name) {
  var val = this.record.value(name);
  if (ydn.crm.su.model.Record.HTML_ESCAPE_FIELDS.indexOf(name) >= 0 &&
      goog.isString(val)) {
    val = goog.string.unescapeEntities(val);
  }
  return val;
};


/**
 * Check whether a deleted record.
 * @return {boolean}
 */
ydn.crm.su.model.Record.prototype.isDeleted = function() {
  return this.record.isDeleted();
};


/**
 * Get record modified date.
 * @return {number}
 */
ydn.crm.su.model.Record.prototype.getUpdated = function() {
  return this.record.getUpdated();
};


/**
 * Validate data freshness to server.
 * The will cause data to be read again from the server. If modified date is
 * different, `updated` event will dispatch and validate will be resolved
 * with `true`.
 * @return {!goog.async.Deferred<?boolean>} return `false` if data is fresh.
 * return `true` if data is updated. `null` if validation fail.
 */
ydn.crm.su.model.Record.prototype.validate = function() {
  if (this.record.isNew()) {
    return goog.async.Deferred.succeed(false);
  }
  if (this.validated_) {
    return this.validated_.branch();
  } else {
    var data = {
      'module': this.getModuleName(),
      'id': this.getId()
    };
    var ch = this.parent.getChannel();
    this.validated_ = ch.send(ydn.crm.ch.SReq.FETCH, data).addCallback(function(x) {
      if (ydn.crm.su.model.Record.DEBUG) {
        window.console.log(this.record.getData(), x);
      }
      if (!this.validated_) {
        // record is not the one we are doing.
        return;
      }
      var r = /** @type {!SugarCrm.Record} */(x);
      if (r && r.id == this.getId()) {
        if (r.date_modified == this.value('date_modified')) {
          return false;
        } else {
          var record = new ydn.crm.su.Record(this.getDomain(), this.getModuleName(), r);
          this.setRecord(record);
          return true;
        }
      } else {
        this.validated_ = null; // validation fail.
        return null;
      }
    }, this);
    return this.validated_;
  }
};


/**
 * Get record field value for string.
 * @param {string} name field name
 * @return {?string} a string field value. If the field is not a string, `null`
 * is returned.
 * @see #valueAsString for casting field value to string.
 * @see #value for getting raw field value.
 */
ydn.crm.su.model.Record.prototype.getStringValue = function(name) {
  var s = this.value(name);
  return /** @type {?string} */ (goog.isString(s) ? s : null);
};


/**
 * @param {string} name field name
 * @return {boolean} `true` if field value is define and not null.
 */
ydn.crm.su.model.Record.prototype.hasValue = function(name) {
  return this.record.hasValue(name);
};


/**
 * Get record field value as string.
 * @param {string} name field name
 * @return {string} if field value is not string, it is converted into string.
 * `null` and `undefined` values are converted into empty string.
 * @see #getStringValue when field value is always string.
 * @see #value for getting raw field value.
 */
ydn.crm.su.model.Record.prototype.valueAsString = function(name) {
  var s = this.value(name);
  if (goog.isString(s)) {
    return s;
  } else if (goog.isDefAndNotNull(s)) {
    return String(s);
  } else {
    return '';
  }
};


/**
 * Get record title.
 * @return {string}
 */
ydn.crm.su.model.Record.prototype.getLabel = function() {
  return this.record.isNew() ? '' : this.record.getLabel();
};


/**
 * SugarCRM meta data.
 * @return {ydn.crm.su.Meta}
 */
ydn.crm.su.model.Record.prototype.getMeta = function() {
  return this.parent;
};


/**
 * SugarCRM instance.
 * @return {ydn.crm.su.model.Sugar}
 */
ydn.crm.su.model.Record.prototype.getSugar = function() {
  return this.parent;
};


/**
 * @return {ydn.crm.su.ModuleName}
 */
ydn.crm.su.model.Record.prototype.getModuleName = function() {
  return this.record.getModule();
};


/**
 * @return {?Date}
 */
ydn.crm.su.model.Record.prototype.getDueDate = function() {
  return this.record.getDueDate();
};


/**
 * @return {SugarCrm.ModuleInfo}
 */
ydn.crm.su.model.Record.prototype.getModuleInfo = function() {
  return this.parent.getModuleInfo(this.getModuleName());
};


/**
 * @return {boolean} return true if the module represent a people.
 */
ydn.crm.su.model.Record.prototype.isPeople = function() {
  return ydn.crm.su.PEOPLE_MODULES.indexOf(this.getModuleName()) >= 0;
};


/**
 * @return {boolean} return true if the module represent a people.
 */
ydn.crm.su.model.Record.prototype.isEditable = function() {
  return ydn.crm.su.EDITABLE_MODULES.indexOf(this.getModuleName()) >= 0;
};


/**
 * @return {boolean} check simple module
 */
ydn.crm.su.model.Record.prototype.isSimple = function() {
  return ydn.crm.su.SIMPLE_MODULES.indexOf(this.getModuleName()) >= 0;
};


/**
 * Get SugarCRM field information.
 * @param {string} name field name.
 * @return {SugarCrm.ModuleField}
 */
ydn.crm.su.model.Record.prototype.getFieldInfo = function(name) {
  var info = this.getModuleInfo();
  var fields = info.module_fields;
  if (goog.isArray(fields)) {
    for (var i = 0; i < fields.length; i++) {
      if (fields[i].name == name) {
        return fields[i];
      }
    }
  }
  return fields[name];
};


/**
 * @return {ydn.msg.Channel}
 */
ydn.crm.su.model.Record.prototype.getChannel = function() {
  return this.parent.getChannel();
};


/**
 * Send update or create request to SugarCRM server and update.
 * @param {SugarCrm.Record} obj Record value to be sent.
 * @return {!goog.async.Deferred} Resolved with record object as return from the server.
 */
ydn.crm.su.model.Record.prototype.save = function(obj) {
  var record = new ydn.crm.su.Record(this.getDomain(), this.getModuleName(), obj);

  return this.parent.saveRecord(record).addCallback(function(x) {
    var v = /** @type {SugarCrm.Record} */ (x);
    this.updateRecord_(v);
  }, this);

};


/**
 * Find GData contact entry that is paired with this record.
 * @return {!goog.async.Deferred<?ContactEntry>}
 */
ydn.crm.su.model.Record.prototype.findPairedGData = function() {
  if (!this.isNew()) {
    var q = {
      'domain': this.getDomain(),
      'module': this.getModuleName(),
      'id': this.getId()
    };
    return ydn.msg.getMain().getChannel().send(ydn.crm.ch.Req.SYNC_QUERY,
        q).addCallback(function(arr) {
      // NOTE: to change the result `null` must be return instead of `undefined`.
      var val = arr[0] || null;
      if (ydn.crm.su.model.Record.DEBUG) {
        window.console.log('findPairedGData', q, arr);
      }
      return val;
    });
  } else {
    return goog.async.Deferred.succeed(null);
  }
};


/**
 * Update record data.
 * @param {SugarCrm.Record} patch
 * @private
 */
ydn.crm.su.model.Record.prototype.updateRecord_ = function(patch) {
  var old_id = this.record.isNew() ? null : this.record.getId();
  this.record.updateData(patch);
  if (!this.record.isNew()) {
    if (goog.isDefAndNotNull(patch.id)) {
      goog.asserts.assert(patch.id == this.getId(), 'updating record must ' +
          'not change id, from ' + this.getId() + ' to ' + patch.id);
    }
    this.dispatchEvent(new ydn.crm.su.model.events.RecordUpdatedEvent());
  } else {
    goog.asserts.assertString(patch.id, 'Id require for updating null record');
    this.dispatchEvent(new ydn.crm.su.model.events.RecordChangeEvent(null));
  }
};


/**
 * @define {boolean} when sending a patch, old field that is not changed,
 * are also to be submitted.
 */
ydn.crm.su.model.Record.PATCH_WITH_OLD_FIELDS = true;


/**
 * Patch record and update to server.
 * @param {Object} patches field name-value pair as Object.
 * @return {!goog.async.Deferred.<SugarCrm.Record>} Resolved with record object
 * as return from the server.
 */
ydn.crm.su.model.Record.prototype.patch = function(patches) {
  if (!patches || Object.keys(patches) == 0) {
    return goog.async.Deferred.succeed(false);
  }
  var obj = /** @type {SugarCrm.Record} */(patches);
  if (ydn.crm.su.model.Record.PATCH_WITH_OLD_FIELDS) {
    obj = ydn.object.clone(this.record.getData());
    for (var key in patches) {
      obj[key] = patches[key];
    }
  }

  var record = new ydn.crm.su.Record(this.getDomain(), this.getModuleName(), obj);

  return this.parent.saveRecord(record).addCallback(function(x) {
    var me = this;
    var v = /** @type {SugarCrm.Record} */ (x);
    this.updateRecord_(v);
  }, this);
};


/**
 * Delete a record.
 * @return {!goog.async.Deferred}
 */
ydn.crm.su.model.Record.prototype.deleteRecord = function() {
  if (this.isNew()) {
    return goog.async.Deferred.fail(new Error('record not defined.'));
  }
  var data = {
    'module': this.getModuleName(),
    'id': this.getId()
  };
  var ch = this.getChannel();
  return ch.send(ydn.crm.ch.SReq.DELETE_RECORD, data);
};


/**
 * @override
 * @protected
 */
ydn.crm.su.model.Record.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
  this.groups_ = null;
};


/**
 * Get sugar crm view link.
 * @return {?string} null if record is not set.
 */
ydn.crm.su.model.Record.prototype.getViewLink = function() {
  if (this.record.isNew()) {
    return null;
  } else {
    return this.parent.getRecordViewLink(this.getModuleName(), this.getId());
  }
};


/**
 * @return {?SugarCrm.Record} get clone data.
 */
ydn.crm.su.model.Record.prototype.getRecordValue = function() {
  return this.record ? /** @type {SugarCrm.Record} */ (/** @type {Object} */ (
      ydn.object.clone(this.record.getData()))) : null;
};


/**
 * Set sugarcrm record. This will dispatch ModuleRecordChangeEvent or
 * ModuleRecordUpdatedEvent.
 * @param {ydn.crm.su.Record} record sugarcrm record entry.
 */
ydn.crm.su.model.Record.prototype.setRecord = function(record) {

  if (ydn.crm.su.model.Record.DEBUG) {
    window.console.log('setRecord ' + this.record + ' to ' + record);
  }
  if (record == this.record) {
    // OK.
  } else if (!record) {
    this.validated_ = null;
    if (!this.record.isNew()) {
      this.record.setData(null);
      this.groups_ = {};
      this.dispatchEvent(new ydn.crm.su.model.events.RecordChangeEvent(null, this));
    }
  } else {
    this.validated_ = null;
    this.groups_ = {};
    if (record.getModule() != this.record.getModule()) {
      var old_module = this.record.getModule();
      this.record = record;
      this.dispatchEvent(new ydn.crm.su.model.events.ModuleChangeEvent(old_module,
          this));
    } else if (record.isNew()) {
      if (!this.record.isNew()) {
        var old_id = this.record.getId();
        this.record = record;
        this.dispatchEvent(new ydn.crm.su.model.events.RecordChangeEvent(old_id, this));
      }
    } else if (this.record.isNew()) {
      if (!record.isNew()) {
        this.record = record;
        this.dispatchEvent(new ydn.crm.su.model.events.RecordChangeEvent(null, this));
      }
    } else if (record.getId() != this.record.getId()) {
      var old_id = this.record.getId();
      this.record = record;
      this.dispatchEvent(new ydn.crm.su.model.events.RecordChangeEvent(old_id, this));
    } else {
      this.record = record;
      this.dispatchEvent(new ydn.crm.su.model.events.RecordUpdatedEvent(this));
    }
  }


};


/**
 * @return {boolean} return record has valid record id.
 * @see #hasData to check existence of data.
 */
ydn.crm.su.model.Record.prototype.isNew = function() {
  return this.record.isNew();
};


/**
 * @return {boolean} return record has valid record id.
 * @see #hasData to check existence of data.
 * @deprecated use #isNew instead.
 */
ydn.crm.su.model.Record.prototype.hasRecord = function() {
  return !this.record.isNew();
};


/**
 * @return {boolean} return record has valid record data.
 * @see #hasRecord to check valid record.
 */
ydn.crm.su.model.Record.prototype.hasData = function() {
  return this.record.hasData();
};


/**
 * Get list of group name in this module.
 * @return {Array.<string>}
 */
ydn.crm.su.model.Record.prototype.listGroups = function() {
  var groups = [];
  var module_info = this.getModuleInfo();
  for (var name in module_info.module_fields) {
    var field = module_info.module_fields[name];
    var group = field.group;
    if (groups.indexOf(group) == -1) {
      if (group == 'name') {
        groups.unshift(group);
      } else {
        groups.push(group);
      }
    }
  }
  return groups;
};


/**
 * Retrieve or create a new field model if the field present in the record.
 * @param {string} name
 * @return {!ydn.crm.su.model.BaseGroup}
 */
ydn.crm.su.model.Record.prototype.getGroupModel = function(name) {
  if (!this.groups_[name]) {
    if (name == 'name') {
      this.groups_[name] = new ydn.crm.su.model.NameGroup(this);
    } else if (name == 'account') {
      this.groups_[name] = new ydn.crm.su.model.AccountRelateGroup(this);
    } else if (name == 'appointment') {
      this.groups_[name] = new ydn.crm.su.model.AppointmentGroup(this);
    } else if (name == 'assigned_user_name') {
      this.groups_[name] = new ydn.crm.su.model.AssignUserGroup(this);
    } else if (name == 'contact') {
      this.groups_[name] = new ydn.crm.su.model.ContactRelateGroup(this);
    } else if (name == 'email') {
      this.groups_[name] = new ydn.crm.su.model.EmailGroup(this);
    } else if (name == 'parent') {
      this.groups_[name] = new ydn.crm.su.model.ParentRelateGroup(this);
    } else if (name == 'phone') {
      this.groups_[name] = new ydn.crm.su.model.PhoneGroup(this);
    } else if (/\w+_address/.test(String(name))) {
      this.groups_[name] = new ydn.crm.su.model.AddressGroup(this, name);
    } else {
      this.groups_[name] = new ydn.crm.su.model.Group(this, name);
    }
  }
  return this.groups_[name];
};


/**
 * @return {?SugarCrm.Record} get clone of underlying data.
 */
ydn.crm.su.model.Record.prototype.cloneData = function() {
  return ydn.object.clone(this.record.getData());
};



if (goog.DEBUG) {
  /**
   * @inheritDoc
   */
  ydn.crm.su.model.Record.prototype.toString = function() {
    var s = 'ydn.crm.su.model.Record:' + this.record;
    if (ydn.crm.su.model.Record.DEBUG) {
      s += String(this.randomId_);
    }
    return s;
  };
}


/**
 * Export SugarCRM record to Gmail contact
 * @return {!goog.async.Deferred.<ydn.gdata.m8.ContactEntry>}
 */
ydn.crm.su.model.Record.prototype.export2GData = function() {
  if (this.isNew()) {
    return goog.async.Deferred.fail(new Error('no Record to export.'));
  }
  return this.parent.export2GData(this.record);
};


/**
 * List related records.
 * Result are collected in progress callback as array list.
 * @param {number=} opt_top number of record to take from each module.
 * default to 5.
 * @return {!ydn.async.Deferred<!Array<!SugarCrm.Record>>}
 * @see #listEmbedded
 */
ydn.crm.su.model.Record.prototype.listRelated = function(opt_top) {
  var df = new ydn.async.Deferred();
  if (this.isNew()) {
    df.callback([]);
    return df;
  }

  var top = opt_top || 5;

  var modules = [];
  var info = this.getModuleInfo();
  if (info.link_fields) {
    for (var i = 0; i < ydn.crm.su.Modules.length; i++) {
      if (ydn.crm.su.Modules[i].toLowerCase() in info.link_fields) {
        modules.push(ydn.crm.su.Modules[i]);
      }
    }
  } else {
    var mn = this.getModuleName();
    if (mn == ydn.crm.su.ModuleName.CONTACTS || mn == ydn.crm.su.ModuleName.LEADS) {
      modules = [ydn.crm.su.ModuleName.CALLS];
    } else {
      modules = [ydn.crm.su.ModuleName.CONTACTS];
    }
  }

  var total = 0;

  var checkDone = function() {
    total++;
    if (total >= modules.length) {
      df.callback();
    }
  };

  /**
   * @param {number} idx
   * @this {ydn.crm.su.model.Record}
   */
  var fetch = function(idx) {
    var to = modules[idx];
    if (!to) {
      return;
    }
    var data = {
      'from': this.getModuleName(),
      'id': this.getId(),
      'to': to,
      'limit': top
    };
    var req = this.getChannel().send(ydn.crm.ch.SReq.QUERY_RELATED_ASYNC, data);
    req.addProgback(function(arr) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i]) {
          arr[i]['_module'] = to;
        } else {
          goog.array.removeAt(arr, i);
        }
      }
      df.notify(arr);
    }, this);
    req.addCallbacks(function(arr) {
      if (arr) {
        for (var i = arr.length = 1; i >= 0; i--) {
          if (arr[i]) {
            arr[i]['_module'] = to;
          } else {
            goog.array.removeAt(arr, i);
          }
        }
      }
      df.notify(arr);
      checkDone();
    }, function(e) {
      window.console.error(e);
      checkDone();
    }, this);
  };

  for (var i = 0; i < modules.length; i++) {
    fetch.call(this, i);
  }

  return df;
};


/**
 * List related records.
 * Result are collected in progress callback as array list.
 * @param {number=} opt_top number of record to take from each module.
 * default to 5.
 * @return {!ydn.async.Deferred<!Array<!SugarCrm.Record>>}
 * @see #listEmbedded
 * @see #listRelated
 */
ydn.crm.su.model.Record.prototype.listRelatedActivities = function(opt_top) {
  var df = new ydn.async.Deferred();
  if (this.isNew()) {
    df.callback([]);
    return df;
  }

  var top = opt_top || 5;

  var total = 0;

  var checkDone = function() {
    total++;
    if (total >= ydn.crm.su.ACTIVITY_MODULES.length) {
      df.callback();
    }
  };

  /**
   * @param {number} idx
   * @this {ydn.crm.su.model.Record}
   */
  var fetch = function(idx) {
    var to = ydn.crm.su.ACTIVITY_MODULES[idx];
    if (!to) {
      df.callback();
      return;
    }
    var data = {
      'from': this.getModuleName(),
      'id': this.getId(),
      'to': to,
      'limit': top
    };
    var req = this.getChannel().send(ydn.crm.ch.SReq.QUERY_RELATED_ASYNC, data);
    req.addProgback(function(arr) {
      for (var i = 0; i < arr.length; i++) {
        arr[i]['_module'] = to;
      }
      df.notify(arr);
    }, this);
    req.addCallbacks(function(arr) {
      if (arr) {
        for (var i = 0; i < arr.length; i++) {
          arr[i]['_module'] = to;
        }
      }
      df.notify(arr);
      checkDone();
    }, function(e) {
      window.console.error(e);
      checkDone();
    }, this);
  };

  for (var i = 0; i < ydn.crm.su.ACTIVITY_MODULES.length; i++) {
    fetch.call(this, i);
  }

  return df;
};


/**
 * List embeded records.
 * @return {!goog.async.Deferred<!Array<!SugarCrm.Record>>}
 * @see #listRelated
 */
ydn.crm.su.model.Record.prototype.listEmbedded = function() {
  if (this.isNew()) {
    return goog.async.Deferred.succeed([]);
  }
  return this.getChannel().send(ydn.crm.ch.SReq.QUERY_EMBEDDED, this.record.getData());
};

