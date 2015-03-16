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
 * @fileoverview SugarCRM service model.
 *
 * This is primary model to get any data from a SugarCRM. With given
 * {@link SugarCrm.About}, this model will query remaining data from
 * background page using persistent channel. See
 * {@link ydn.crm.su.model.Sugar#list} for initialing this model.
 *
 * Dispatch 'login', 'logout' and 'host-access` events.
 *                                                 `
 * @author kyawtun@yathit.com (Kyaw Tun)
 */

goog.provide('ydn.crm.su.model.Sugar');
goog.require('goog.events.EventHandler');
goog.require('ydn.crm.Ch');
goog.require('ydn.crm.su.Meta');
goog.require('ydn.crm.su.model.ImmutableRecord');
goog.require('ydn.crm.su.model.Sugar');
goog.require('ydn.crm.su.model.events');
goog.require('ydn.crm.su.utils');
goog.require('ydn.db.KeyRange');
goog.require('ydn.debug.error.ConstraintError');



/**
 * SugarCRM service model.
 * <pre>
 *   ydn.crm.su.model.Sugar.list().addCallback(function(models) {
 *     var sugar = models[0];
 *     if (sugar.isLogin()) {
 *       var q = {'store': 'Contact', key: 'abc'};
 *       sugar.send([q]).addCallback(function(data) {
 *
 *       });
 *     }
 *   });
 * <pre>
 * @param {SugarCrm.About} about setup for particular domain.
 * @param {Array.<SugarCrm.ModuleInfo>|Object.<SugarCrm.ModuleInfo>} arr
 * @param {SugarCrm.ServerInfo=} opt_info
 * @param {SugarCrm.Record=} opt_user login user info.
 * @param {SugarCrm.LoginRecord=} opt_login_info login user info.
 * @constructor
 * @extends {goog.events.EventTarget}
 * @implements {ydn.crm.su.Meta}
 * @struct
 * @suppress {checkStructDictInheritance} suppress closure-library code.
 */
ydn.crm.su.model.Sugar = function(about, arr, opt_info, opt_user, opt_login_info) {
  goog.base(this);
  /**
   * @protected
   * @type {SugarCrm.About}
   */
  this.about = about;
  var modules_info = {};
  if (goog.isArray(arr)) {
    for (var i = 0; i < arr.length; i++) {
      modules_info[arr[i]['module_name']] = arr[i];
    }
  } else {
    modules_info = arr;
  }
  /**
   * @protected
   * @final
   * @type {Object.<SugarCrm.ModuleInfo>}
   */
  this.module_info = modules_info;

  /**
   * @protected
   * @type {SugarCrm.ServerInfo}
   */
  this.info = opt_info || /** @type {SugarCrm.ServerInfo} */ ({});

  /**
   * @protected
   * @type {goog.events.EventHandler}
   */
  this.handler = new goog.events.EventHandler(this);
  var domain = this.about ? this.about.domain : '';
  /**
   * User record.
   * @type {ydn.crm.su.Record}
   * @private
   */
  this.user_ = new ydn.crm.su.Record(domain, ydn.crm.su.ModuleName.USERS, opt_user);
  if (!opt_user) {
    this.initUser_();
  }
  /**
   * @type {SugarCrm.LoginRecord}
   * @private
   */
  this.login_info_ = opt_login_info || null;
  if (!opt_login_info) {
    this.initUserInfo_();
  }

  var pipe = ydn.msg.getMain();
  this.handler.listen(pipe, [ydn.crm.ch.BReq.SUGARCRM, ydn.crm.ch.BReq.HOST_PERMISSION],
      this.handleMessage);

  if (ydn.crm.su.model.Sugar.DEBUG) {
    this.sugar_random_id_ = Math.random();
  }

  /**
   * @type {?boolean}
   * @private
   */
  this.is_version_7_ = null;
};
goog.inherits(ydn.crm.su.model.Sugar, goog.events.EventTarget);


/**
 * @define {boolean} debug flag.
 */
ydn.crm.su.model.Sugar.DEBUG = false;


/**
 * Handle message from channel.
 * @param {ydn.msg.Event} e
 */
ydn.crm.su.model.Sugar.prototype.handleMessage = function(e) {
  if (ydn.crm.su.model.Sugar.DEBUG) {
    window.console.log('handling message: ' + e.type, e.mesage);
  }
  if (e.type == ydn.crm.ch.BReq.SUGARCRM) {
    var about = /** @type {SugarCrm.About} */ (e.getData());
    if (!!about && about.domain == this.getDomain()) {
      this.setAbout(about);
    }
  } else if (e.type == ydn.crm.ch.BReq.HOST_PERMISSION && this.about) {
    var msg = e.getData();
    if (msg['grant'] && msg['grant'] == this.getDomain()) {
      this.about.hostPermission = true;
      this.dispatchEvent(new goog.events.Event(ydn.crm.su.SugarEvent.HOST_ACCESS_GRANT));
    }
  }
};


/**
 * Get version.
 * @return {string} SugarCrm Version
 */
ydn.crm.su.model.Sugar.prototype.getVersion = function() {
  return this.info ? this.info.version || '' : '';
};


/**
 * Check require version.
 * <pre>
 *   sugar.hasVersion('7');
 * </pre>
 * @param {string} ver sugarcrm version, such as '7'.
 * @return {boolean} return true if sugarcrm version is higher or equal to
 * given version.
 * @private
 */
ydn.crm.su.model.Sugar.prototype.hasVersion_ = function(ver) {
  return goog.string.compareVersions(this.getVersion(), ver) >= 0;
};


/**
 * @return {?boolean} true if SugarCrm backend has version 7.
 */
ydn.crm.su.model.Sugar.prototype.isVersion7 = function() {
  if (!goog.isDefAndNotNull(this.is_version_7_) && this.info) {
    this.is_version_7_ = this.hasVersion_('7');
  }
  return this.is_version_7_;
};


/**
 * Set about.
 * @param {SugarCrm.About} about
 */
ydn.crm.su.model.Sugar.prototype.setAbout = function(about) {
  if (!about) {
    return;
  }
  goog.asserts.assert((about.domain == this.getDomain()),
      'domain must not change from ' + this.getDomain() + ' to ' + about.domain);
  var was_login = this.about.isLogin;
  var is_login = !!about && about.isLogin;
  this.about = about;
  if (!was_login && is_login) {
    this.dispatchEvent(new goog.events.Event(ydn.crm.su.SugarEvent.LOGIN, this));
  } else if (was_login && !is_login) {
    this.dispatchEvent(new goog.events.Event(ydn.crm.su.SugarEvent.LOGOUT, this));
  }
};


/**
 * @return {boolean}
 */
ydn.crm.su.model.Sugar.prototype.isLogin = function() {
  return !!this.about.isLogin;
};


/**
 * Initialize user.
 * @private
 */
ydn.crm.su.model.Sugar.prototype.initUser_ = function() {
  if (this.about) {
    if (this.about.userName) {
      this.send(ydn.crm.ch.SReq.LOGIN_USER).addCallback(function(obj) {
        if (obj && obj['id']) {
          var user = /** @type {SugarCrm.Record} */ (obj);
          this.user_ = new ydn.crm.su.Record(this.getDomain(),
              ydn.crm.su.ModuleName.USERS, user);
        }
      }, this);
    }

  }
};


/**
 * Initialize user info.
 * @private
 */
ydn.crm.su.model.Sugar.prototype.initUserInfo_ = function() {
  if (this.about) {
    if (this.about.userName) {
      this.send(ydn.crm.ch.SReq.LOGIN_INFO).addCallback(function(obj) {
        if (obj && obj['id']) {
          this.login_info_ = /** @type {SugarCrm.LoginRecord} */ (obj);
        }
      }, this);
    }

  }
};


/**
 * Update login status, host permission, etc.
 * @return {!goog.async.Deferred}
 */
ydn.crm.su.model.Sugar.prototype.updateStatus = function() {
  return this.send(ydn.crm.ch.SReq.ABOUT).addCallback(function(about) {
    this.setAbout(about);
  }, this);
};


/**
 * @return {string} sugarcrm user name. This is `About.userName`, which is
 * same as `getUser().value('user_name')`.
 * @see #getUser for getting login user record.
 */
ydn.crm.su.model.Sugar.prototype.getUserName = function() {
  return this.about ? this.about.userName || '' : '';
};


/**
 * Get SugarCRM entry of login user record.
 * @return {ydn.crm.su.Record} SugarCRM User record.
 */
ydn.crm.su.model.Sugar.prototype.getUser = function() {
  return this.user_;
};


/**
 * Get message channel to send to background worker thread.
 * @return {ydn.msg.Channel}
 */
ydn.crm.su.model.Sugar.prototype.getChannel = function() {
  return ydn.msg.getChannel(ydn.msg.Group.SUGAR, this.getDomain());
};


/**
 * @param {ydn.crm.su.ModuleName} name
 * @return {SugarCrm.ModuleInfo}
 */
ydn.crm.su.model.Sugar.prototype.getModuleInfo = function(name) {
  return this.module_info[name];
};


/**
 * @return {boolean}
 */
ydn.crm.su.model.Sugar.prototype.hasHostPermission = function() {
  return !!this.about.hostPermission;
};


/**
 * Set host permission.
 * @param {boolean} grant
 */
ydn.crm.su.model.Sugar.prototype.setHostPermission = function(grant) {
  this.about.hostPermission = grant;
};


/**
 * @return {string}
 */
ydn.crm.su.model.Sugar.prototype.getDomain = function() {
  return this.about.domain;
};


/**
 * @return {?string}
 */
ydn.crm.su.model.Sugar.prototype.getBaseUrl = function() {
  return this.about.baseUrl || null;
};


/**
 * Get sugar crm instance url.
 * @return {string}
 */
ydn.crm.su.model.Sugar.prototype.getHomeUrl = function() {
  return this.about.baseUrl ? this.about.baseUrl : 'https://' + this.about.domain;
};


/**
 * Get SugarCRM create new email template url.
 * @return {string}
 */
ydn.crm.su.model.Sugar.prototype.getNewEmailTemplateUrl = function() {
  return this.getHomeUrl() +
      '/index.php?module=EmailTemplates&action=EditView&return_module=EmailTemplates&return_action=DetailView';
};


/**
 * @param {SugarCrm.ServerInfo} info
 */
ydn.crm.su.model.Sugar.prototype.setInfo = function(info) {
  if (!info) {
    return;
  }
  this.info = info;
};


/**
 * @return {!SugarCrm.ServerInfo}
 */
ydn.crm.su.model.Sugar.prototype.getInfo = function() {
  return /** @type {!SugarCrm.ServerInfo} */ (goog.object.clone(this.info));
};


/**
 * Get url for contact entry of given id
 * @param {ydn.crm.su.ModuleName} module
 * @param {string} id
 * @return {string}
 */
ydn.crm.su.model.Sugar.prototype.getRecordViewLink = function(module, id) {
  if (this.isVersion7()) {
    return ydn.crm.su.getViewLinkV7(this.getHomeUrl(), module, id);
  } else {
    return ydn.crm.su.getViewLinkV6(this.getHomeUrl(), module, id);
  }
};


/**
 * @param {string} url
 * @return {ydn.crm.su.ViewLinkParts}
 */
ydn.crm.su.model.Sugar.prototype.parseRecordViewLink = function(url) {
  if (this.isVersion7()) {
    return ydn.crm.su.parseViewLinkV7(url);
  } else {
    return ydn.crm.su.parseViewLinkV6(url);
  }
};


/**
 * Set url.
 * @param {string} url
 */
ydn.crm.su.model.Sugar.prototype.setUrl = function(url) {
  url = goog.string.startsWith(url, 'http') ? url : 'https://' + url;
  var uri = new goog.Uri(url);
  if (this.getDomain() != uri.getDomain()) {
    throw new ydn.debug.error.ConstraintError('Domain name cannot be change from ' +
        this.getDomain() + ' to ' + uri.getDomain());
  }
};


/**
 * Do login.
 * @param {string} username
 * @param {string} password
 * @return {goog.async.Deferred}
 */
ydn.crm.su.model.Sugar.prototype.doLogin = function(username, password) {
  var info = {};
  info.domain = this.getDomain();
  info.baseUrl = this.getBaseUrl();
  info.username = username;
  info.password = password;
  return this.send(ydn.crm.ch.SReq.LOGIN, info)
      .addCallback(function(data) {
        this.setAbout(data);
      }, this);
};


/**
 * Do login.
 * @param {string} url
 * @param {string} username
 * @param {string} password
 * @return {goog.async.Deferred}
 */
ydn.crm.su.model.Sugar.prototype.createNew = function(url, username, password) {
  if (!/https?:\/\//.test(url)) {
    url = 'https://' + url;
  }
  var domain = new goog.Uri(url).getDomain();
  if (domain != this.getDomain()) {
    throw new Error('domain name must not be changed from ' + this.getDomain() +
        ' to ' + domain);
  }
  var info = {};
  info.domain = domain;
  info.baseUrl = url;
  info.username = username;
  info.password = password;
  return ydn.msg.getChannel().send(ydn.crm.ch.Req.NEW_SUGAR, info)
      .addCallback(function(data) {
        this.setAbout(data);
      }, this);
};


/**
 * Load a new sugarcrm instance.
 * @param {SugarCrm.About} about
 * @return {!goog.async.Deferred<ydn.crm.su.model.Sugar>}
 */
ydn.crm.su.model.Sugar.load = function(about) {
  var ch = ydn.msg.getChannel(ydn.msg.Group.SUGAR, about.domain);
  return ch.send(ydn.crm.ch.SReq.DETAILS).addCallback(function(x) {
    var details = /** @type {SugarCrm.Details} */ (x);
    for (var i = 0; i < details.modulesInfo.length; i++) {
      ydn.crm.su.fixSugarCrmModuleMeta(details.modulesInfo[i]);
    }
    return ch.send(ydn.crm.ch.SReq.SERVER_INFO).addCallback(function(info) {
      return new ydn.crm.su.model.Sugar(about, details, info);
    });
  });
};


/**
 * @param {ydn.crm.ch.SReq} req
 * @param {*=} opt_data
 * @return {!ydn.async.Deferred}
 */
ydn.crm.su.model.Sugar.prototype.send = function(req, opt_data) {
  return this.getChannel().send(req, opt_data);
};


/**
 * Query list of records.
 * @param {string} m_name
 * @param {string=} opt_order Module field name to order by.
 * @param {(ydn.db.KeyRange|string)=} opt_range key or key range.
 * @param {boolean=} opt_prefix do prefix search.
 * @param {number=} opt_limit limit
 * @param {number=} opt_offset offset
 * @return {!goog.async.Deferred}
 */
ydn.crm.su.model.Sugar.prototype.listRecords = function(m_name, opt_order,
    opt_range, opt_prefix, opt_limit, opt_offset) {
  goog.asserts.assert(ydn.crm.su.Modules.indexOf(m_name) >= 0, m_name);
  var query = {
    'store': m_name
  };
  if (opt_order) {
    query['index'] = opt_order;
  }
  if (opt_range) {
    if (opt_range instanceof ydn.db.KeyRange) {
      query['range'] = opt_range.toJSON();
    } else {
      query['key'] = opt_range;
    }
  }
  query['prefix'] = !!opt_prefix;
  if (opt_limit) {
    query['limit'] = opt_offset;
  }
  if (opt_offset) {
    query['offset'] = opt_offset;
  }
  return this.getChannel().send(ydn.crm.ch.SReq.QUERY, [query]);
};


/**
 * Query list of records.
 * @param {string} m_name
 * @param {string=} opt_order Module field name to order by.
 * @param {(ydn.db.KeyRange|string)=} opt_range key or key range.
 * @param {boolean=} opt_prefix do prefix search.
 * @param {number=} opt_limit limit
 * @param {number=} opt_offset offset
 * @return {!goog.async.Deferred<!Array.<SugarCrm.Record>>}
 */
ydn.crm.su.model.Sugar.prototype.listRecord = function(m_name, opt_order,
                                                       opt_range, opt_prefix, opt_limit, opt_offset) {
  goog.asserts.assert(ydn.crm.su.Modules.indexOf(m_name) >= 0, m_name);
  var query = {
    'store': m_name
  };
  if (opt_order) {
    query['index'] = opt_order;
  }
  if (opt_range) {
    if (opt_range instanceof ydn.db.KeyRange) {
      query['range'] = opt_range.toJSON();
    } else {
      query['key'] = opt_range;
    }
  }
  query['prefix'] = !!opt_prefix;
  if (opt_limit) {
    query['limit'] = opt_offset;
  }
  if (opt_offset) {
    query['offset'] = opt_offset;
  }
  return this.getChannel().send(ydn.crm.ch.SReq.QUERY, [query])
      .addCallback(function(res) {
        var arr = /** @type {Array<CrmApp.QueryResult>} */(res);
        var result = arr[0];
        return result.result || [];
      }, this);
};


/**
 * Full text search query.
 * @param {string} module_name filter by module
 * @param {string} q query term.
 * @param {boolean=} opt_fetch_full fetch full record
 * @return {!goog.async.Deferred<!Array<!CrmApp.TextQueryResult>>}
 */
ydn.crm.su.model.Sugar.prototype.searchRecords = function(module_name, q, opt_fetch_full) {
  var query = {
    'store': module_name,
    'index': 'name',
    'q': q,
    'fetchFull': !!opt_fetch_full
  };
  if (module_name == ydn.crm.su.ModuleName.NOTES) {
    query['index'] = 'content';
  }
  return this.getChannel().send(ydn.crm.ch.SReq.SEARCH, [query]);
};


/**
 * Full text search query.
 * @param {string} module_name filter by module
 * @param {string} q query term.
 * @param {boolean=} opt_fetch_full fetch full record
 * @return {!goog.async.Deferred<!Array.<SugarCrm.ScoredRecord>>}
 */
ydn.crm.su.model.Sugar.prototype.searchRecord = function(module_name, q, opt_fetch_full) {
  var query = {
    'store': module_name,
    'index': 'name',
    'q': q,
    'fetchFull': !!opt_fetch_full
  };
  if (module_name == ydn.crm.su.ModuleName.NOTES) {
    query['index'] = 'content';
  }
  return this.getChannel().send(ydn.crm.ch.SReq.SEARCH, [query])
      .addCallback(function(arr) {
        var res = /** @type {CrmApp.TextQueryResult} */(arr[0]);
        var out = [];
        for (var i = 0; i < res.fullTextResult.length; i++) {
          var r = /** @type {SugarCrm.ScoredRecord} */(res.fullTextResult[i].record);
          if (r) {
            r._score = res.fullTextResult[i].score;
          }
        }
        return out;
      });
};


/**
 * Query people module records by email.
 * @param {string} email email address to query.
 * @return {!goog.async.Deferred<!Array<!SugarCrm.Record>>} list of record. the record value
 * has `_module` for respective module name.
 */
ydn.crm.su.model.Sugar.prototype.queryByEmail = function(email) {
  if (!goog.isString(email) || email.indexOf('@') == -1) {
    return goog.async.Deferred.succeed([]);
  }
  var query = [{
    'store': ydn.crm.su.ModuleName.ACCOUNTS,
    'index': 'ydn$emails',
    'key': email
  }, {
    'store': ydn.crm.su.ModuleName.CONTACTS,
    'index': 'ydn$emails',
    'key': email
  }, {
    'store': ydn.crm.su.ModuleName.LEADS,
    'index': 'ydn$emails',
    'key': email
  }];
  return this.getChannel().send(ydn.crm.ch.SReq.QUERY,
      query).addCallback(function(x) {
    var out = [];
    var arr = /** @type {Array<CrmApp.QueryResult>} */(x);
    for (var i = 0; i < arr.length; i++) {
      var result = arr[i];
      if (result.result && result.result[0]) {
        // email is unique and should not have more than one record.
        var r = /** @type {!SugarCrm.Record} */(result.result[0]);
        r._module = query[i]['store'];
        out.push(r);
      }
    }
    return out;
  }, this);
};


/**
 * Archive an email to sugarcrm.
 * Attachments are ignored.
 * @param {ydn.gmail.Utils.EmailInfo} info email details.
 * @param {ydn.crm.su.ModuleName=} opt_parent_module
 * @param {string=} opt_parent_id
 * @return {!ydn.async.Deferred<SugarCrm.Record>}
 */
ydn.crm.su.model.Sugar.prototype.archiveEmail = function(info,
    opt_parent_module, opt_parent_id) {
  var types = ['archived', 'campaign', 'draft', 'inbound', 'out'];
  var div = document.createElement('div');
  div.innerHTML = info.html;
  // ISO: "2014-04-02T03:32:20.522Z"
  // SugarCRM: "2013-09-20 22:10:00"
  var date_str = ydn.crm.su.utils.isValidDate(info.date_sent) ?
      ydn.crm.su.utils.toDateString(info.date_sent) : '';
  var obj = {
    'assigned_user_id': this.user_.getStringValue('id'),
    'assigned_user_name': this.user_.getStringValue('name'),
    'date_sent': date_str,
    'description': div.textContent,
    'description_html': info.html,
    'from_addr': info.from_addr,
    'mailbox_id': info.mailbox_id || '',
    'message_id': info.message_id || '',
    'name': info.subject,
    'parent_id': opt_parent_id || '',
    'parent_type': opt_parent_module || '',
    'status': 'read',
    'to_addrs': info.to_addrs,
    'type': 'archived'
  };
  if (!this.isVersion7()) {
    var parts = obj['date_sent'].split(' ');
    obj['date_start'] = parts[0] || '';
    obj['time_start'] = parts[1] || '';
  }
  return this.send(ydn.crm.ch.SReq.NEW_RECORD, {
    'module': ydn.crm.su.ModuleName.EMAILS,
    'record': obj
  });
};


/**
 * Thoroughly find records using prefix list and full text search.
 * @param {string} q query term.
 * @param {string} module_name filter by module
 * @return {!ydn.async.Deferred}
 */
ydn.crm.su.model.Sugar.prototype.findRecords = function(q, module_name) {
  var ydf = new ydn.async.Deferred();
  var results = [];
  var total = 3;
  var count = 0;
  var onSuccess = function(x) {
    count++;
    if (goog.isArray(x)) {
      ydf.notify(x);
      results = results.concat(x);
    }
    if (count == total) {
      ydf.callback(results);
    }
  };
  this.listRecords(module_name, 'ydn$emails', q, true).addBoth(onSuccess, this);
  this.listRecords(module_name, 'ydn$phones', q, true).addBoth(onSuccess, this);
  this.searchRecords(module_name, q, false).addBoth(onSuccess, this);
  return ydf;
};


/**
 * Create a new Notes record.
 * @param {ydn.crm.su.Record} record Record to be saved.
 * @return {!ydn.async.Deferred}
 */
ydn.crm.su.model.Sugar.prototype.saveRecord = function(record) {
  var data = {
    'module': record.getModule(),
    'record': record.getData()
  };
  return this.send(ydn.crm.ch.SReq.PUT_RECORD, data);
};


/**
 * Get list of sugarcrm instance, of which login.
 * @return {!goog.async.Deferred.<Array.<ydn.crm.su.model.Sugar>>}
 */
ydn.crm.su.model.Sugar.list = function() {
  var user = ydn.crm.ui.UserSetting.getInstance();
  return ydn.msg.getChannel().send(ydn.crm.ch.Req.LIST_SUGAR).addCallback(function(abouts) {
    var models = [];
    var dfs = [];
    for (var i = 0; i < abouts.length; i++) {
      var about = /** @type {SugarCrm.About} */ (abouts[i]);
      if (about.isLogin) {
        dfs.push(user.getModuleInfo(about.domain).addCallback(function(info) {
          return new ydn.crm.su.model.Sugar(this, info);
        }, about));
      }
    }
    return goog.async.DeferredList.gatherResults(dfs);
  });
};


/**
 * @return {ydn.crm.su.model.Sugar}
 */
ydn.crm.su.model.Sugar.prototype.clone = function() {
  var clone = new ydn.crm.su.model.Sugar(this.about, this.module_info,
      this.info, this.login_info_);
  return clone;
};


/**
 * @override
 * @protected
 */
ydn.crm.su.model.Sugar.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
  this.info = null;
  this.handler.dispose();
  this.handler = null;
};



if (goog.DEBUG) {
  /**
   * @inheritDoc
   */
  ydn.crm.su.model.Sugar.prototype.toString = function() {
    var s = 'ydn.crm.su.model.Sugar:' + this.getDomain();
    if (ydn.crm.su.model.Sugar.DEBUG) {
      s += this.sugar_random_id_;
    }
    return s;
  };
}


/**
 * Export SugarCRM record to Gmail contact
 * @param {!ydn.crm.su.Record} record The SugarCRM record to export.
 * @return {!goog.async.Deferred.<ydn.gdata.m8.ContactEntry>} ContactEntry return
 * newly created contact entry.
 */
ydn.crm.su.model.Sugar.prototype.export2GData = function(record) {
  return ydn.msg.getChannel().send(ydn.crm.ch.Req.EXPORT_RECORD, record.toJSON())
      .addCallback(function(entry) {
        return new ydn.gdata.m8.ContactEntry(entry);
      }, this);
};


/**
 * Set relationship.
 * @param {ydn.crm.su.ModuleName} mn module name of relationship from.
 * @param {string} id record id of relationship from.
 * @param {Array<SugarCrm.ModuleNameIdPair>} rel list of relationships to.
 * @return {!goog.async.Deferred<!Array<SugarCrm.CrudResult>>}
 */
ydn.crm.su.model.Sugar.prototype.setRelationships = function(mn, id, rel) {
  if (rel.length == 0) {
    var df = new ydn.async.Deferred();
    df.callback({});
    return df;
  }
  var data = {
    'module_name': mn,
    'id': id,
    'related_ids': rel
  };
  return this.getChannel().send(ydn.crm.ch.SReq.SET_REL, data);
};


/**
 * Set relationship from one record to another.
 * @param {ydn.crm.su.ModuleName} from_mn
 * @param {string} from_id
 * @param {ydn.crm.su.ModuleName} to_mn
 * @param {string} to_id
 * @return {!goog.async.Deferred<SugarCrm.CrudResult>}
 */
ydn.crm.su.model.Sugar.prototype.setRelationship = function(from_mn, from_id, to_mn, to_id) {
  return this.setRelationships(from_mn, from_id, [{
    'module_name': to_mn,
    'id': to_id
  }]).addCallback(function(arr) {
    return arr[0] || {};
  });
};

