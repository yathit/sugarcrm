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
 * @fileoverview SugarCRM model with gmail context.
 *
 * <pre>
 *   var gs = new ydn.crm.su.model.GDataSugar(about, info, email);
 *   // Controllers will listen for model changes.
 *   goog.events.listen(gs, 'context-change', listener);
 *   // Main app will update context from gmail
 *   gs.update(context);
 *   // Run some process
 *   gs.importToSugar('Leads');
 * </pre>
 * @see ydn.crm.su.model.GDataSugar#get for common instantiation pattern.
 * @author kyawtun@yathit.com (Kyaw Tun)
 */

goog.provide('ydn.crm.su.model.GDataSugar');
goog.require('ydn.crm.inj.Context');
goog.require('ydn.crm.su.model.Sugar');



/**
 * SugarCRM model with gmail context.
 * @param {SugarCrm.About} about setup for particular domain.
 * @param {Array.<SugarCrm.ModuleInfo>|Object.<SugarCrm.ModuleInfo>} modules_info
 * @param {string} gdata_account Google account id, i.e., email address
 * @param {SugarCrm.ServerInfo=} opt_info
 * @param {SugarCrm.LoginRecord=} opt_login_info login user info.
 * @constructor
 * @extends {ydn.crm.su.model.Sugar}
 * @struct
 */
ydn.crm.su.model.GDataSugar = function(about, modules_info, gdata_account,
                                       opt_info, opt_login_info) {
  goog.base(this, about, modules_info, opt_info, opt_login_info);
  /**
   * Gmail context contact data.
   * @type {ydn.crm.inj.Context}
   * @private
   */
  this.context_ = null;
  /**
   * Contact entry from the database that match with context, that is not associate
   * with GData record.
   * @type {ydn.gdata.m8.ContactEntry}
   * @private
   */
  this.contact_ = null;
  /**
   * Record from matching context email.
   * @type {?ydn.crm.su.Record}
   * @private
   */
  this.record_ = null;
  /**
   * @final
   * @protected
   * @type {string}
   */
  this.gdata_account = gdata_account;
  /**
   * @type {YdnCrm.SyncRecord}
   * @private
   */
  this.sync_ = null;

};
goog.inherits(ydn.crm.su.model.GDataSugar, ydn.crm.su.model.Sugar);


/**
 * @define {boolean} debug flag.
 */
ydn.crm.su.model.GDataSugar.DEBUG = false;


/**
 * @return {ydn.crm.su.model.GDataSugar}
 */
ydn.crm.su.model.GDataSugar.prototype.cloneGData = function() {
  var clone = new ydn.crm.su.model.GDataSugar(this.about, this.module_info,
      this.gdata_account, this.info);
  return clone;
};


/**
 * @return {ydn.gdata.m8.ContactEntry} return GData contact that is not associate
 * with any module.
 */
ydn.crm.su.model.GDataSugar.prototype.getGData = function() {
  return this.contact_;
};


/**
 * @return {?ydn.crm.su.Record} return sugarcrm record which has same email as
 * context email
 */
ydn.crm.su.model.GDataSugar.prototype.getRecord = function() {
  return this.record_;
};


/**
 * @return {ydn.crm.inj.Context} return context contact from gmail panel
 * with any module.
 */
ydn.crm.su.model.GDataSugar.prototype.getContext = function() {
  return this.context_;
};


/**
 * @return {string} return a google account id, an email address.
 */
ydn.crm.su.model.GDataSugar.prototype.getGDataAccount = function() {
  return this.gdata_account;
};


/**
 * @return {?string}
 */
ydn.crm.su.model.GDataSugar.prototype.getContextGmail = function() {
  return this.context_ ? this.context_.getEmail() : null;
};


/**
 * Link GData Contact to sugar record
 * @return {!goog.async.Deferred<YdnCrm.SyncRecord>}
 */
ydn.crm.su.model.GDataSugar.prototype.linkGDataToRecord = function() {
  if (!this.record_) {
    throw new Error('No SugarCRM Record to link with Gmail contact.');
  }
  var module_name = this.record_.getModule();
  // window.console.log(record);
  var gdata = this.contact_;
  if (!gdata) {
    throw new Error('Not Gmail contact data to link.');
  }

  var data = {
    'domain': this.getDomain(),
    'module': module_name,
    'recordId': this.record_.getId(),
    'entryId': gdata.getEntryId()
  };
  var df1 = this.getChannel().send(ydn.crm.ch.SReq.LINK, data);
  return df1.addCallback(function(x) {
    var sync = /** @type {YdnCrm.SyncRecord} */(x);
    if (ydn.crm.su.model.GDataSugar.DEBUG) {
      window.console.log('link', sync);
    }
    this.sync_ = sync;
    var ev = new ydn.crm.su.model.events.ContextChangeEvent(this.context_,
        this.contact_, this.record_, sync);
    this.dispatchEvent(ev);
  }, this);

};


/**
 * Remove external id link GData Contact to sugar record.
 * @return {!goog.async.Deferred}
 */
ydn.crm.su.model.GDataSugar.prototype.unlinkGDataToRecord = function() {
  if (!this.record_) {
    throw new Error('No SugarCRM Record to unlink with Gmail contact.');
  }
  var sugar_id = this.record_.getId();
  var module_name = this.record_.getModule();
  // window.console.log(record);
  goog.asserts.assertString(sugar_id, 'no Record ID'); // this will not happen.
  var gdata = this.contact_;
  if (!this.sync_) {
    throw new Error('No link record.');
  }

  var df1 = this.getChannel().send(ydn.crm.ch.SReq.UNLINK, this.sync_);
  return df1.addCallback(function(ok) {
    if (ydn.crm.su.model.GDataSugar.DEBUG) {
      window.console.log('unlink', ok);
    }
    if (ok) {
      this.sync_ = null;
      var ev = new ydn.crm.su.model.events.ContextChangeEvent(this.context_,
          this.contact_, this.record_, this.sync_);
      this.dispatchEvent(ev);
    }
  }, this);

};


/**
 * Remove all external id link on GData Contact for this SugarCRM instance.
 * @return {!goog.async.Deferred}
 * @deprecated use unlinkGDataToRecord instead
 */
ydn.crm.su.model.GDataSugar.prototype.unlinkGData_old = function() {
  var sugar_id = this.record_.getId();
  var module_name = this.record_.getModule();
  // window.console.log(record);
  goog.asserts.assertString(sugar_id, 'no Record ID'); // this will not happen.
  var gdata = this.contact_;
  if (!gdata) {
    return goog.async.Deferred.fail('Not Gmail contact data to link.');
  }
  var xp = gdata.getExternalId(ydn.gdata.m8.ExternalId.Scheme.SUGARCRM,
      this.getDomain());
  if (!xp) {
    return goog.async.Deferred.fail('No link exists for SugarCRM ' + this.getDomain() +
        ' in Gmail Contact ' + gdata.getSingleId());
  }

  var data = {
    'kind': gdata.getKind(),
    'gdataId': gdata.getId(),
    'externalId': xp.getValue()
  };
  var df1 = this.getChannel().send(ydn.crm.ch.SReq.UNLINK, data);
  return df1.addCallback(function(entry) {
    if (ydn.crm.su.model.GDataSugar.DEBUG) {
      window.console.log('unlink', entry);
    }
    this.contact_ = new ydn.gdata.m8.ContactEntry(entry);
    var ev = new ydn.crm.su.model.events.ContextChangeEvent(this.context_,
        this.contact_, this.record_);
    this.dispatchEvent(ev);
  }, this);

};


/**
 * Import from gdata to a new sugar entry.
 * @param {ydn.crm.su.ModuleName} m_name people module name.
 * @return {!goog.async.Deferred<ydn.crm.su.Record>} Return newly created record.
 */
ydn.crm.su.model.GDataSugar.prototype.importToSugar = function(m_name) {
  if (this.record_) {
    throw new Error('already imported as ' + this.record_.getId() +
        ' in ' + this.record_.getModule());
  }
  var contact = this.getGData();
  if (!contact) {
    throw new Error('no contact gdata to import?');
  }
  if (ydn.crm.su.PEOPLE_MODULES.indexOf(m_name) == -1) {
    throw new Error('invalid module name: ' + m_name);
  }
  var req = ydn.crm.ch.SReq.IMPORT_GDATA;
  var data = {
    'module': m_name,
    'kind': contact.getKind(),
    'gdataId': contact.getId()
  };
  if (ydn.crm.su.model.GDataSugar.DEBUG) {
    window.console.info('sending ' + req + ' ' + JSON.stringify(data));
  }
  return this.getChannel().send(req, data).addCallback(function(data) {
    if (ydn.crm.su.model.GDataSugar.DEBUG) {
      window.console.log(data);
    }
    this.record_ = new ydn.crm.su.Record(this.getDomain(), m_name, data);
    var ev = new ydn.crm.su.model.events.ContextChangeEvent(this.context_,
        this.contact_, this.record_);
    this.dispatchEvent(ev);
    return this.record_;
  }, this);
};


/**
 * Export SugarCRM record to Gmail contact
 * @param {!ydn.crm.su.Record} record The SugarCRM record to export.
 * @return {!goog.async.Deferred.<ydn.gdata.m8.ContactEntry>} ContactEntry return
 * newly created contact entry.
 */
ydn.crm.su.model.GDataSugar.prototype.export2GData = function(record) {
  return goog.base(this, 'export2GData', record).addCallback(function(entry) {
    var old_contact = this.contact_;
    this.contact_ = entry;
    var ev = new ydn.crm.su.model.events.GDataUpdatedEvent(old_contact, this.contact_, this);
    this.dispatchEvent(ev);
  }, this);
};


/**
 * Update gmail context.
 * @param {?ydn.crm.inj.Context} cm found in sniffing gmail thread.
 * @return {!goog.async.Deferred<ydn.crm.su.model.events.ContextChangeEvent>}
 */
ydn.crm.su.model.GDataSugar.prototype.setContext = function(cm) {
  if (this.isLogin()) {
    return this.updateContext_(cm);
  } else {
    // background page dispatch login event, but glitchy.
    // remove this code if background page notify changes in login and host permission
    // status.
    return this.updateStatus().addBoth(function() {
      return this.updateContext_(cm);
    }, this);
  }
};


/**
 * Process context updating for SugarCRM records.
 * @param {ydn.crm.inj.Context} cm contact email found in sniffing gmail thread.
 * @param {ydn.gdata.m8.ContactEntry=} opt_contact
 * @return {!goog.async.Deferred<ydn.crm.su.model.events.ContextChangeEvent>}
 * @private
 */
ydn.crm.su.model.GDataSugar.prototype.processContextRecord_ = function(cm, opt_contact) {

  var email = cm.getEmail();

  return this.queryOneByEmail(email).addCallback(function(x) {
    var query_result = /** @type {SugarCrm.Record} */ (x);
    if (ydn.crm.su.model.GDataSugar.DEBUG) {
      window.console.log(email, query_result);
    }
    var r;
    if (query_result) {
      var m_name = /** @type {ydn.crm.su.ModuleName} */ (query_result._module);
      r = new ydn.crm.su.Record(this.getDomain(), m_name,
          query_result);
    }
    return new ydn.crm.su.model.events.ContextChangeEvent(cm, opt_contact, r);
  }, this);
};


/**
 * Check gdata and record are in synced.
 * @return {boolean}
 */
ydn.crm.su.model.GDataSugar.prototype.isInSynced = function() {
  if (!this.contact_ || !this.record_) {
    return false;
  }
  var xp = this.contact_.getExternalId(ydn.gdata.m8.ExternalId.Scheme.SUGARCRM,
      this.getDomain(), this.record_.getModule(), this.record_.getId());
  return !!xp;
};


/**
 * Process given gdata contact if it has linked external id to SugarCRM record.
 * @param {ydn.crm.inj.Context} cm contact email found in sniffing gmail thread.
 * @param {!ydn.gdata.m8.ContactEntry} contact
 * @return {!goog.async.Deferred<ydn.crm.su.model.events.ContextChangeEvent>}
 * @private
 */
ydn.crm.su.model.GDataSugar.prototype.processContextRecordWithGData_ = function(cm, contact) {
  var xp = contact.getExternalId(ydn.gdata.m8.ExternalId.Scheme.SUGARCRM,
      this.getDomain());
  if (xp) {
    var id_query = [{
      'store': xp.module,
      'index': 'id',
      'key': xp.record_id
    }];
    return this.getChannel().send(ydn.crm.ch.SReq.QUERY, id_query).addCallback(function(x) {
      var result = /** @type {SugarCrm.Query} */ (x[0]);
      if (ydn.crm.su.model.GDataSugar.DEBUG) {
        window.console.log(result);
      }
      if (result && result.result[0]) {
        var m_name = /** @type {ydn.crm.su.ModuleName} */ (result.store);
        var r = new ydn.crm.su.Record(this.getDomain(), m_name,
            result.result[0]);
        return new ydn.crm.su.model.events.ContextChangeEvent(cm, contact, r);
      } else {
        if (goog.DEBUG) {
          window.console.warn('link id: ' + xp.record_id + ' no longer available, deleting..');
          window.console.error('Removing external id not implemented');
        }
        this.processContextRecord_(cm, contact);
      }
    }, this);
  } else {
    return this.processContextRecord_(cm, contact);
  }
};


/**
 * Process for GData contact if target email is exist in GData contacts list.
 * @param {!ydn.crm.inj.Context} cm contact email found in sniffing gmail thread.
 * @return {!goog.async.Deferred}
 * @private
 */
ydn.crm.su.model.GDataSugar.prototype.processContextGData_ = function(cm) {

  var email = cm.getEmail();

  // query to gdata.
  var req = ydn.msg.getChannel().send(ydn.crm.ch.Req.GDATA_LIST_CONTACT, {'email': email});
  return req.addCallback(function (x) {
    var results = /** @type {Array.<!ContactEntry>} */ (x);
    var contacts = results.map(function (x) {
      return new ydn.gdata.m8.ContactEntry(x);
    });
    var scores = cm.score(contacts);
    if (ydn.crm.su.model.GDataSugar.DEBUG) {
      window.console.log(results, scores, contacts);
    }
    if (contacts[0]) {
      return this.processContextRecordWithGData_(cm, contacts[0]);
    } else {
      return this.processContextRecord_(cm);
    }
  }, this);
};


/**
 * Update gmail context.
 * @param {ydn.crm.inj.Context} cm contact email found in sniffing gmail thread.
 * @return {!goog.async.Deferred<ydn.crm.su.model.events.ContextChangeEvent>}
 * @private
 */
ydn.crm.su.model.GDataSugar.prototype.updateContext_ = function(cm) {
  if (ydn.crm.su.model.GDataSugar.DEBUG) {
    window.console.log(this + ' update context for ' + cm);
  }
  if (!cm) {
    var null_ev = new ydn.crm.su.model.events.ContextChangeEvent(null);
    return goog.async.Deferred.succeed(null_ev);
  }
  return this.processContextGData_(cm).addCallbacks(function(ev) {
    var cce = /** @type {ydn.crm.su.model.events.ContextChangeEvent} */ (ev);
    this.contact_ = cce.gdata;
    this.context_ = cce.context;
    this.record_ = cce.record;
    this.dispatchEvent(ev);
  }, function(e) {
    window.console.error(e.stack || e);
  }, this);
};


/**
 * Update gmail context.
 * @param {ydn.crm.inj.Context} cm found in sniffing gmail thread.
 * @private
 */
ydn.crm.su.model.GDataSugar.prototype.update_ = function(cm) {
  if (ydn.crm.su.model.GDataSugar.DEBUG) {
    window.console.log(this + ' update for ' + cm);
  }
  var old_contact = this.contact_;

  this.context_ = cm;
  this.contact_ = null;
  if (cm) {
    var email = cm.getEmail();

    var context_gdata = this.context_.toContactEntry();
    // query to gdata.
    ydn.msg.getChannel().send(ydn.crm.ch.Req.GDATA_LIST_CONTACT, {'email': email}).addCallbacks(function(x) {
      var results = /** @type {Array.<!ContactEntry>} */ (x);
      var contacts = results.map(function(x) {
        return new ydn.gdata.m8.ContactEntry(x);
      });
      var scores = this.context_.score(contacts);
      if (ydn.crm.su.model.GDataSugar.DEBUG) {
        window.console.log(results, scores, contacts);
      }
      // Note: Module listener will pop out `contacts` if they are associated with the module
      var gc = new ydn.crm.su.model.events.ContextGDataChangeEvent(this.getDomain(),
          this.context_, contacts, this);
      this.dispatchEvent(gc);
      // a contact entry not associated with GData record.
      this.contact_ = gc.contacts[0] || null;
      var ev = new ydn.crm.su.model.events.GDataChangedEvent(old_contact, this.contact_, this);
      this.dispatchEvent(ev);
    }, function(e) {
      throw e;
    }, this);
  } else {
    var gc = new ydn.crm.su.model.events.ContextGDataChangeEvent(this.getDomain(), null, [], this);
    this.dispatchEvent(gc);
    var ev = new ydn.crm.su.model.events.GDataChangedEvent(old_contact, this.contact_, this);
    this.dispatchEvent(ev);
  }
};


/**
 * Get list of sugarcrm instance, of which login.
 * @return {!goog.async.Deferred<ydn.crm.su.model.GDataSugar>}
 * @see ydn.crm.su.model.Sugar#get
 */
ydn.crm.su.model.GDataSugar.get = function() {
  var user = ydn.crm.ui.UserSetting.getInstance();
  return user.onReady().addCallback(function() {

    return ydn.msg.getChannel().send(
        ydn.crm.ch.Req.GET_SUGAR).addCallback(function(x) {
      var details = /** @type {SugarCrm.Details} */ (x);

      for (var i = 0; i < details.modulesInfo.length; i++) {
        ydn.crm.su.fixSugarCrmModuleMeta(details.modulesInfo[i]);
      }
      var ac = user.getLoginEmail();
      return new ydn.crm.su.model.GDataSugar(details.about,
          details.modulesInfo, ac, details.serverInfo, details.loginInfo);
    });

  });

};


/**
 * Add context inbox contact to a new sugar entry.
 * @param {ydn.crm.su.ModuleName} m_name
 * @return {!goog.async.Deferred} Return {ydn.crm.su.Record} on success.
 */
ydn.crm.su.model.GDataSugar.prototype.addToSugar = function(m_name) {
  if (this.record_) {
    return goog.async.Deferred.fail('already exist as ' + this.record_.getId() +
        ' in ' + this.record_.getModule());
  }
  var email = this.context_.getEmail();
  if (!email) {
    return goog.async.Deferred.fail('No data to import.');
  }

  var df = new ydn.async.Deferred();

  var req = ydn.crm.ch.SReq.PUT_RECORD;
  var fn = this.context_.getFullName();
  var new_record = {
    'email1': email,
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
  var data = {
    'module': m_name,
    'record': new_record
  };
  if (ydn.crm.su.model.GDataSugar.DEBUG) {
    window.console.log('sending ' + req + ' ' + JSON.stringify(data));
  }

  return this.getChannel().send(req, data).addCallback(function(data) {
    if (ydn.crm.su.model.GDataSugar.DEBUG) {
      window.console.log(data);
    }
    this.record_ = new ydn.crm.su.Record(this.getDomain(), m_name, data);
    var ev = new ydn.crm.su.model.events.ContextChangeEvent(this.context_,
        this.contact_, this.record_);
    this.dispatchEvent(ev);
  }, this);
};

