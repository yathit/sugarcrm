/**
 * @fileoverview SugarCRM module model pair with Gmail contact data.
 *
 * Unlike Record module, this module name cannot be change and parent sugar
 * module keep track of this instance. Only one type of instance can have
 * in a parent sugar model.
 */


goog.provide('ydn.crm.sugarcrm.model.GDataRecord');
goog.require('ydn.crm.sugarcrm.gdata');
goog.require('ydn.crm.sugarcrm.model.Record');
goog.require('ydn.ds.gdata.Contact');
goog.require('ydn.gdata.m8.NewContactEntry');



/**
 * SugarCRM module model.
 * @param {ydn.crm.sugarcrm.model.GDataSugar} parent
 * @param {ydn.crm.sugarcrm.ModuleName} module_name
 * @constructor
 * @extends {ydn.crm.sugarcrm.model.Record}
 * @struct
 * @deprecated use ydn.crm.sugarcrm.model.Record instead.
 */
ydn.crm.sugarcrm.model.GDataRecord = function(parent, module_name) {
  var r = new ydn.crm.sugarcrm.Record(parent.getDomain(), module_name);
  goog.base(this, parent, r);
  /**
   * Paired Gdata entry with SugarCRM record.
   * @type {ydn.gdata.m8.ContactEntry}
   * @private
   */
  this.synced_contact_ = null;
  /**
   * @final
   * @protected
   * @type {ydn.crm.sugarcrm.ModuleName}
   */
  this.module_name = module_name;

  /**
   * FIXME: generally we don't like event handler on model.
   * @protected
   * @type {goog.events.EventHandler}
   */
  this.handler = new goog.events.EventHandler(this);
  this.handler.listen(parent, [ydn.crm.sugarcrm.model.events.Type.CONTEXT_CHANGE],
      this.relayContextChange);

};
goog.inherits(ydn.crm.sugarcrm.model.GDataRecord, ydn.crm.sugarcrm.model.Record);


/**
 * @define {boolean} debug flag.
 */
ydn.crm.sugarcrm.model.GDataRecord.DEBUG = false;


/**
 * @protected
 * @type {goog.debug.Logger}
 */
ydn.crm.sugarcrm.model.GDataRecord.prototype.logger =
    goog.log.getLogger('ydn.crm.sugarcrm.model.GDataRecord');


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.model.GDataRecord.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
  this.handler.dispose();
  this.handler = null;
};


/**
 * Dispatch events due to changes from parent GDataSugar.
 * @param {ydn.crm.sugarcrm.model.events.Event} e
 */
ydn.crm.sugarcrm.model.GDataRecord.prototype.relayContextChange = function(e) {
  this.dispatchEvent(e);
};


/**
 * Dispatch events due to changes from parent GDataSugar.
 * @param {ydn.crm.sugarcrm.model.events.Event} e
 */
ydn.crm.sugarcrm.model.GDataRecord.prototype.relayGDataEvent = function(e) {
  if (ydn.crm.sugarcrm.model.GDataRecord.DEBUG) {
    window.console.log('relayGDataEvent: ' + e.type + ' ' + this);
  }
  if (e instanceof ydn.crm.sugarcrm.model.events.ContextGDataChangeEvent) {
    var ce = /** @type {ydn.crm.sugarcrm.model.events.ContextGDataChangeEvent} */ (e);
    // the record is not longer valid.
    this.setRecord(null);
    this.synced_contact_ = ce.pop(this.getModuleName());
    if (this.synced_contact_) {
      var xp = this.synced_contact_.getExternalId(ydn.gdata.m8.ExternalId.Scheme.SUGARCRM,
          this.getDomain(), this.getModuleName());
      var id = xp.record_id;
      this.updateRecord_(id);
    }
  } else if (e.type == ydn.crm.sugarcrm.model.events.Type.GDATA_CHANGE) {
    // unpaired GData entry is available
    var has_record = this.hasRecord();
    if (!has_record) {
      // if we already have synced contact, we don't dispatch the event, since
      // unpaired record is not relevant to this module.
      var ge = /** @type {ydn.crm.sugarcrm.model.events.GDataEvent} */ (e);
      var gmail = this.getParent().getContextGmail();
      if (gmail) {
        var query = [{
          'store': this.getModuleName(),
          'index': 'ydn$emails',
          'key': gmail
        }];

        this.getChannel().send(ydn.crm.Ch.SReq.QUERY, query).addCallback(function(x) {
          var result = /** @type {SugarCrm.Query} */ (x[0]);
          if (ydn.crm.sugarcrm.model.GDataRecord.DEBUG) {
            var n = result.result ? result.result.length : 0;
            window.console.log(this + ' receiving sugarcrm ' + n + ' query result for ' + gmail, result);
          }

          if (result && result.result[0]) {
            var r = new ydn.crm.sugarcrm.Record(this.getDomain(), this.getModuleName(), result.result[0]);
            if (ydn.crm.sugarcrm.model.GDataRecord.DEBUG) {
              window.console.log('relayGDataEvent: ' + e.type + ' swallow as (setRecord)');
            }
            this.setRecord(r);
          } else {
            if (ydn.crm.sugarcrm.model.GDataRecord.DEBUG) {
              window.console.log('relayGDataEvent: ' + e.type + ' to ' + e.type);
            }
            this.dispatchEvent(e);
          }
        }, this);
      } else {
        if (ydn.crm.sugarcrm.model.GDataRecord.DEBUG) {
          window.console.log('relayGDataEvent: ' + e.type + ' to ' + e.type);
        }
        this.dispatchEvent(e);
      }
    }
  }
};


/**
 * @return {ydn.crm.sugarcrm.model.GDataSugar}
 */
ydn.crm.sugarcrm.model.GDataRecord.prototype.getParent = function() {
  return /** @type {ydn.crm.sugarcrm.model.GDataSugar} */ (this.parent);
};


/**
 * @return {ydn.gdata.m8.ContactEntry} return unbounded sugarcrm record entry.
 */
ydn.crm.sugarcrm.model.GDataRecord.prototype.getGData = function() {
  return this.getParent().getGData();
};


/**
 * @return {ydn.gdata.m8.ContactEntry}
 */
ydn.crm.sugarcrm.model.GDataRecord.prototype.getSyncedGData = function() {
  return this.synced_contact_;
};


/**
 * @return {ydn.crm.inj.Context} return context contact from gmail panel
 */
ydn.crm.sugarcrm.model.GDataRecord.prototype.getContext = function() {
  return this.getParent().getContext();
};


/**
 * @return {ydn.crm.sugarcrm.ModuleName}
 */
ydn.crm.sugarcrm.model.GDataRecord.prototype.getModuleName = function() {
  return this.module_name;
};


/**
 * @return {boolean} return true if contact has gdata entry.
 */
ydn.crm.sugarcrm.model.GDataRecord.prototype.hasValidGData = function() {
  var gdata = this.getGData();
  return !!gdata && !(gdata instanceof ydn.gdata.m8.NewContactEntry);
};


/**
 * Update sugarcrm record. This will dispatch ModuleRecordChangeEvent.
 * @param {string?} id sugarcrm record id.
 * @private
 */
ydn.crm.sugarcrm.model.GDataRecord.prototype.updateRecord_ = function(id) {
  // query to sugarcrm module.
  var contact = this.getGData();
  var email = contact ? contact.getEmails()[0] : undefined;
  if (ydn.crm.sugarcrm.model.GDataRecord.DEBUG) {
    window.console.log(id, email);
  }
  if (id) {
    var id_query = [{
      'store': this.getModuleName(),
      'index': 'id',
      'key': id
    }];

    this.getChannel().send(ydn.crm.Ch.SReq.QUERY, id_query).addCallbacks(function(x) {
      var result = /** @type {SugarCrm.Query} */ (x[0]);
      if (ydn.crm.sugarcrm.model.GDataRecord.DEBUG) {
        window.console.log(result);
      }
      if (result && result.result[0]) {
        var r = new ydn.crm.sugarcrm.Record(this.getDomain(), this.getModuleName(),
            result.result[0]);
        this.setRecord(r);
      } else {
        // should we delete this.synced_contact_ ?
        this.logger.warning('record id ' + id + ' not in ' + this.getModuleName());
      }
    }, function(e) {
      throw e;
    }, this);
  }
};


/**
 * Get current email address sniffed from the gmail inbox.
 * @return {?string}
 */
ydn.crm.sugarcrm.model.GDataRecord.prototype.getEmail = function() {
  var contact = this.getGData();
  return contact ? contact.getEmails()[0] : null;
};


/**
 * Score entries aginst target.
 * @param {Array.<ydn.gdata.m8.ContactEntry>} contacts this will be sorted by
 * scores.
 * @return {Array.<number>} return respective score.
 */
ydn.crm.sugarcrm.model.GDataRecord.prototype.score = function(contacts) {
  var gdata = this.getGData();
  var scores = [];
  for (var i = 0; i < contacts.length; i++) {
    scores[i] = gdata.scoreSimilarity(contacts[i]);
  }
  var sorted_scores = [];
  for (var i = 0; i < contacts.length; i++) {
    var index = goog.array.binarySearch(sorted_scores, scores[i]);
    if (index < 0) {
      goog.array.insertAt(sorted_scores, scores[i], -(index + 1));
      var c = contacts.splice(i, 1);
      goog.array.insertAt(contacts, c[0], -(index + 1));
    } else {
      goog.array.insertAt(sorted_scores, scores[i], index);
    }
  }
  return sorted_scores;
};


/**
 * Check sugarcrm record and gdata contact are in synced.
 * @return {boolean}
 */
ydn.crm.sugarcrm.model.GDataRecord.prototype.isSynced = function() {
  if (!!this.synced_contact_ && !!this.hasRecord()) {
    var xp = this.synced_contact_.getExternalId(ydn.gdata.m8.ExternalId.Scheme.SUGARCRM,
        this.getDomain(), this.getModuleName(), this.getId());
    return !!xp;
  }
  return false;
};


/**
 * Check gmail context contact exist.
 * @return {boolean}
 */
ydn.crm.sugarcrm.model.GDataRecord.prototype.canSync = function() {
  if (!this.synced_contact_ && !!this.hasRecord()) {
    return !!this.getParent().getGData(); // if available, it can sync.
  }
  return false;
};


/**
 * Import from gdata to a new sugar entry.  This do not update extenal reference
 * id of the gdata record.
 * @return {!goog.async.Deferred} Return {ydn.crm.sugarcrm.Record} on success.
 */
ydn.crm.sugarcrm.model.GDataRecord.prototype.importToSugar = function() {
  goog.asserts.assert(!this.hasRecord(), 'already imported?');
  var contact = this.getGData();
  goog.asserts.assertObject(contact, 'no contact gdata to import?');
  var req = ydn.crm.Ch.SReq.IMPORT_GDATA;
  var data = {
    'module': this.getModuleName(),
    'kind': contact.getKind(),
    'gdataId': contact.getId()
  };
  this.logger.finer('sending ' + req + ' ' + JSON.stringify(data));
  return this.getChannel().send(req, data).addCallback(function(data) {
    if (ydn.crm.sugarcrm.model.GDataRecord.DEBUG) {
      window.console.log(data);
    }
    var record = new ydn.crm.sugarcrm.Record(this.getDomain(), this.getModuleName(), data);
    this.logger.finer(record + ' created.');
    this.setRecord(record);
  }, this);
};


/**
 * Add context inbox contact to a new sugar entry.
 * @return {!goog.async.Deferred} Return {ydn.crm.sugarcrm.Record} on success.
 */
ydn.crm.sugarcrm.model.GDataRecord.prototype.addToSugar = function() {
  goog.asserts.assert(!this.hasRecord(), 'already imported?');
  var contact = this.getContext().toContactEntry();
  goog.asserts.assertObject(contact, 'no contact gdata to import?');

  goog.asserts.assert(!this.hasRecord(), 'already imported as ' + this.record);
  var df = new ydn.async.Deferred();

  var req = ydn.crm.Ch.SReq.PUT_RECORD;
  var fn = contact.getFullName();
  var new_record = {
    'email1': contact.getEmails()[0],
    'full_name': fn
  };
  if (fn && fn.length > 0) {
    var fns = fn.split(/\s/);
    if (fns[0]) {
      new_record['first_name'] = fns[0];
    }
    if (fns[1]) {
      new_record['last_name'] = fns[fns.length - 1];
    }
  }
  var ph = contact.getPhoneNumbers();
  if (ph[0]) {
    new_record['phone_work'] = ph[0];
  }
  var data = {
    'module': this.getModuleName(),
    'record': new_record
  };

  this.logger.finer('sending ' + req + ' ' + JSON.stringify(data));
  return this.getChannel().send(req, data).addCallback(function(data) {
    if (ydn.crm.sugarcrm.model.GDataRecord.DEBUG) {
      window.console.log(data);
    }
    var record = new ydn.crm.sugarcrm.Record(this.getDomain(), this.getModuleName(), data);
    this.logger.finer(record + ' created.');
    this.setRecord(record);
  }, this);
};


/**
 * Link GData Contact to sugar record
 * @return {!goog.async.Deferred}
 */
ydn.crm.sugarcrm.model.GDataRecord.prototype.link = function() {
  if (!this.hasRecord()) {
    return goog.async.Deferred.fail('no Record to link.');
  }
  throw new Error('deprecated');
};


/**
 * Update or create model.
 * @return {!goog.async.Deferred}
 */
ydn.crm.sugarcrm.model.GDataRecord.prototype.save = function() {
  // var record = this.getRecord();
  if (!this.hasRecord()) {
    return goog.async.Deferred.fail('no Record to save.');
  }
  var df = this.getChannel().send(ydn.crm.Ch.SReq.PUT_RECORD, this.record);
  df.addCallback(function(data) {
    goog.asserts.assert(data, this + ' receiving unexpected put record result ' + data);
    goog.asserts.assertString(data['id'], this + ' record id missing in ' + data);
    // cannot check module name
    if (ydn.crm.sugarcrm.model.GDataRecord.DEBUG) {
      window.console.log(data);
    }
    this.record.setData(data);
  }, this);
  return df;
};


if (goog.DEBUG) {
  /**
   * @inheritDoc
   */
  ydn.crm.sugarcrm.model.GDataRecord.prototype.toString = function() {
    var s = goog.base(this, 'toString');
    var contact = this.getGData();
    if (contact) {
      s += ':' + contact;
    }
    return 'GDataRecord:' + this.getModuleName() + s;
  };
}
