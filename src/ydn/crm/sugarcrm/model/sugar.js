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
goog.require('ydn.crm.msg.Manager');
goog.require('ydn.crm.su.Meta');
goog.require('ydn.crm.su.SortedRecords');
goog.require('ydn.crm.su.model.ImmutableRecord');
goog.require('ydn.crm.su.model.Sugar');
goog.require('ydn.crm.su.model.events');
goog.require('ydn.crm.su.utils');
goog.require('ydn.db.KeyRange');
goog.require('ydn.debug.error.ConstraintError');
goog.require('ydn.time');



/**
 * SugarCRM service model.
 * <pre>
 *   ydn.crm.su.model.Sugar.get().addCallback(function(sugar) {
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
 * @param {SugarCrm.ServerInfo=} opt_info server information.
 * @param {SugarCrm.LoginRecord=} opt_login_info login user info.
 * @param {Array<SugarCrm.AvailableModule>=} opt_availableModules available
 * module info.
 * @constructor
 * @extends {goog.events.EventTarget}
 * @implements {ydn.crm.su.Meta}
 * @struct
 */
ydn.crm.su.model.Sugar = function(about, arr, opt_info, opt_login_info, opt_availableModules) {
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
  this.user_ = new ydn.crm.su.Record(domain, ydn.crm.su.ModuleName.USERS);
  this.initUser_();
  /**
   * @type {SugarCrm.LoginRecord}
   * @private
   */
  this.login_info_ = opt_login_info || null;
  if (!opt_login_info) {
    this.initUserInfo_();
  }

  /**
   * @private
   * @type {Array.<SugarCrm.AvailableModule>}
   */
  this.availableModules_ = opt_availableModules || null;

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

  /**
   * Result of upcoming activities.
   * @type {Object<goog.async.Deferred>}
   * @private
   */
  this.df_upcoming_activities_ = {};

  /**
   * @type {SugarCrm.ModuleInfo}
   * @private
   */
  this.UserModuleInfo_ = null;
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
    var data = e.getData();
    if (data['type'] == 'login') {
      var about = /** @type {SugarCrm.About} */ (data['about']);
      if (!!about && about.domain == this.getDomain()) {
        this.setAbout(about);
      }
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
 *   sugar.hasVersion('6'); // return true for 6.5 and 7.1 version.
 * </pre>
 * @param {string} ver sugarcrm version, such as '7'.
 * @return {boolean} return true if sugarcrm version is higher or equal to
 * given version.
 */
ydn.crm.su.model.Sugar.prototype.hasVersion = function(ver) {
  return goog.string.compareVersions(this.getVersion(), ver) >= 0;
};


/**
 * @return {?boolean} true if SugarCrm backend has version 7.
 */
ydn.crm.su.model.Sugar.prototype.isVersion7 = function() {
  if (!goog.isDefAndNotNull(this.is_version_7_) && this.info) {
    this.is_version_7_ = this.hasVersion('7');
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
 * @param {SugarCrm.Record} obj
 * @private
 */
ydn.crm.su.model.Sugar.prototype.setUser_ = function(obj) {
  if (obj && obj.id) {
    this.user_ = new ydn.crm.su.Record(this.getDomain(),
        ydn.crm.su.ModuleName.USERS, obj);
  }
};


/**
 * Initialize user.
 * @private
 */
ydn.crm.su.model.Sugar.prototype.initUser_ = function() {
  if (this.about) {
    if (this.about.userName) {
      this.send(ydn.crm.ch.SReq.LOGIN_USER).addCallback(function(obj) {
        this.setUser_(obj);
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
 * same as `getUser().value('user_name')`, but different from
 * `getUser().value('name')`.
 * This is also different from login user record id, which is available as
 * @see #getUser for getting name of user using its login user record.
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
 * @const
 * @type {string}
 */
ydn.crm.su.model.Sugar.UserModuleInfoV65 = '{"module_name":"Users","table_name":"users","module_fields":{"id":{"name":"id","type":"id","group":"","id_name":"","label":"ID","required":1,"options":[],"related_module":"","calculated":false,"len":""},"user_name":{"name":"user_name","type":"user_name","group":"","id_name":"","label":"User Name","required":1,"options":[],"related_module":"","calculated":false,"len":"60"},"user_hash":{"name":"user_hash","type":"varchar","group":"","id_name":"","label":"Password","required":0,"options":[],"related_module":"","calculated":false,"len":"255"},"system_generated_password":{"name":"system_generated_password","type":"bool","group":"","id_name":"","label":"System Generated Password","required":1,"options":{"1":{"name":1,"value":"Yes"},"2":{"name":2,"value":"No"},"":{"name":"","value":""}},"related_module":"","calculated":false,"len":""},"pwd_last_changed":{"name":"pwd_last_changed","type":"datetime","group":"","id_name":"","label":"Password Last Changed","required":0,"options":[],"related_module":"","calculated":false,"len":""},"authenticate_id":{"name":"authenticate_id","type":"varchar","group":"","id_name":"","label":"Authentication Id","required":0,"options":[],"related_module":"","calculated":false,"len":"100"},"sugar_login":{"name":"sugar_login","type":"bool","group":"","id_name":"","label":"Is Sugar User","required":0,"options":{"1":{"name":1,"value":"Yes"},"2":{"name":2,"value":"No"},"":{"name":"","value":""}},"related_module":"","calculated":false,"len":"","default_value":"1"},"first_name":{"name":"first_name","type":"name","group":"","id_name":"","label":"First Name","required":0,"options":[],"related_module":"","calculated":false,"len":"30"},"last_name":{"name":"last_name","type":"name","group":"","id_name":"","label":"Last Name","required":1,"options":[],"related_module":"","calculated":false,"len":"30"},"full_name":{"name":"full_name","type":"name","group":"","id_name":"","label":"Full Name","required":0,"options":[],"related_module":"","calculated":false,"len":"510"},"name":{"name":"name","type":"varchar","group":"","id_name":"","label":"Full Name","required":0,"options":[],"related_module":"","calculated":false,"len":"510"},"is_admin":{"name":"is_admin","type":"bool","group":"","id_name":"","label":"Is Administrator","required":0,"options":{"1":{"name":1,"value":"Yes"},"2":{"name":2,"value":"No"},"":{"name":"","value":""}},"related_module":"","calculated":false,"len":"","default_value":"0"},"external_auth_only":{"name":"external_auth_only","type":"bool","group":"","id_name":"","label":"External Authentication","required":0,"options":{"1":{"name":1,"value":"Yes"},"2":{"name":2,"value":"No"},"":{"name":"","value":""}},"related_module":"","calculated":false,"len":"","default_value":"0"},"receive_notifications":{"name":"receive_notifications","type":"bool","group":"","id_name":"","label":"Notify on Assignment","required":0,"options":{"1":{"name":1,"value":"Yes"},"2":{"name":2,"value":"No"},"":{"name":"","value":""}},"related_module":"","calculated":false,"len":"","default_value":"1"},"description":{"name":"description","type":"text","group":"","id_name":"","label":"Description","required":0,"options":[],"related_module":"","calculated":false,"len":""},"date_entered":{"name":"date_entered","type":"datetime","group":"","id_name":"","label":"Date Entered","required":1,"options":[],"related_module":"","calculated":false,"len":""},"date_modified":{"name":"date_modified","type":"datetime","group":"","id_name":"","label":"Date Modified","required":1,"options":[],"related_module":"","calculated":false,"len":""},"modified_user_id":{"name":"modified_user_id","type":"assigned_user_name","group":"","id_name":"modified_user_id","label":"Modified By ID","required":0,"options":[],"related_module":"","calculated":false,"len":""},"modified_by_name":{"name":"modified_by_name","type":"assigned_user_name","group":"","id_name":"modified_user_id","label":"Modified By ID","required":0,"options":[],"related_module":"","calculated":false,"len":""},"created_by":{"name":"created_by","type":"assigned_user_name","group":"","id_name":"modified_user_id","label":"Assigned to:","required":0,"options":[],"related_module":"","calculated":false,"len":""},"created_by_name":{"name":"created_by_name","type":"assigned_user_name","group":"","id_name":"modified_user_id","label":"Assigned to:","required":0,"options":[],"related_module":"","calculated":false,"len":""},"title":{"name":"title","type":"varchar","group":"","id_name":"","label":"Title","required":0,"options":[],"related_module":"","calculated":false,"len":"50"},"department":{"name":"department","type":"varchar","group":"","id_name":"","label":"Department","required":0,"options":[],"related_module":"","calculated":false,"len":"50"},"phone_home":{"name":"phone_home","type":"phone","group":"","id_name":"","label":"Home Phone","required":0,"options":[],"related_module":"","calculated":false,"len":"50"},"phone_mobile":{"name":"phone_mobile","type":"phone","group":"","id_name":"","label":"Mobile","required":0,"options":[],"related_module":"","calculated":false,"len":"50"},"phone_work":{"name":"phone_work","type":"phone","group":"","id_name":"","label":"Work Phone","required":0,"options":[],"related_module":"","calculated":false,"len":"50"},"phone_other":{"name":"phone_other","type":"phone","group":"","id_name":"","label":"Other Phone","required":0,"options":[],"related_module":"","calculated":false,"len":"50"},"phone_fax":{"name":"phone_fax","type":"phone","group":"","id_name":"","label":"Fax","required":0,"options":[],"related_module":"","calculated":false,"len":"50"},"status":{"name":"status","type":"enum","group":"","id_name":"","label":"Status","required":1,"options":{"Active":{"name":"Active","value":"Active"},"Inactive":{"name":"Inactive","value":"Inactive"}},"related_module":"","calculated":false,"len":100},"address_street":{"name":"address_street","type":"varchar","group":"","id_name":"","label":"Address Street","required":0,"options":[],"related_module":"","calculated":false,"len":"150"},"address_city":{"name":"address_city","type":"varchar","group":"","id_name":"","label":"Address City","required":0,"options":[],"related_module":"","calculated":false,"len":"100"},"address_state":{"name":"address_state","type":"varchar","group":"","id_name":"","label":"Address State","required":0,"options":[],"related_module":"","calculated":false,"len":"100"},"address_country":{"name":"address_country","type":"varchar","group":"","id_name":"","label":"Address Country","required":0,"options":[],"related_module":"","calculated":false,"len":100},"address_postalcode":{"name":"address_postalcode","type":"varchar","group":"","id_name":"","label":"Address Postal Code","required":0,"options":[],"related_module":"","calculated":false,"len":"20"},"UserType":{"name":"UserType","type":"enum","group":"","id_name":"","label":"User Type","required":0,"options":{"RegularUser":{"name":"RegularUser","value":"Regular User"},"Administrator":{"name":"Administrator","value":"Administrator"}},"related_module":"","calculated":false,"len":50},"deleted":{"name":"deleted","type":"bool","group":"","id_name":"","label":"Deleted","required":0,"options":{"1":{"name":1,"value":"Yes"},"2":{"name":2,"value":"No"},"":{"name":"","value":""}},"related_module":"","calculated":false,"len":""},"portal_only":{"name":"portal_only","type":"bool","group":"","id_name":"","label":"Portal API User","required":0,"options":{"1":{"name":1,"value":"Yes"},"2":{"name":2,"value":"No"},"":{"name":"","value":""}},"related_module":"","calculated":false,"len":"","default_value":"0"},"show_on_employees":{"name":"show_on_employees","type":"bool","group":"","id_name":"","label":"Display Employee Record","required":0,"options":{"1":{"name":1,"value":"Yes"},"2":{"name":2,"value":"No"},"":{"name":"","value":""}},"related_module":"","calculated":false,"len":"","default_value":true},"employee_status":{"name":"employee_status","type":"varchar","group":"","id_name":"","label":"Employee Status","required":0,"options":[],"related_module":"","calculated":false,"len":100},"messenger_id":{"name":"messenger_id","type":"varchar","group":"","id_name":"","label":"IM Name","required":0,"options":[],"related_module":"","calculated":false,"len":100},"messenger_type":{"name":"messenger_type","type":"enum","group":"","id_name":"","label":"IM Type","required":0,"options":{"":{"name":"","value":""},"MSN":{"name":"MSN","value":"MSN"},"Yahoo!":{"name":"Yahoo!","value":"Yahoo!"},"AOL":{"name":"AOL","value":"AOL"}},"related_module":"","calculated":false,"len":100},"reports_to_id":{"name":"reports_to_id","type":"id","group":"","id_name":"","label":"Reports to ID:","required":0,"options":[],"related_module":"","calculated":false,"len":""},"reports_to_name":{"name":"reports_to_name","type":"relate","group":"","id_name":"reports_to_id","label":"Reports to","required":0,"options":[],"related_module":"Users","calculated":false,"len":""},"email1":{"name":"email1","type":"varchar","group":"email1","id_name":"","label":"Email Address","required":1,"options":[],"related_module":"","calculated":false,"len":""},"email_link_type":{"name":"email_link_type","type":"enum","group":"","id_name":"","label":"Email Client","required":0,"options":{"sugar":{"name":"sugar","value":"Sugar Email Client"},"mailto":{"name":"mailto","value":"External Email Client"}},"related_module":"","calculated":false,"len":""},"is_group":{"name":"is_group","type":"bool","group":"","id_name":"","label":"Group User","required":0,"options":{"1":{"name":1,"value":"Yes"},"2":{"name":2,"value":"No"},"":{"name":"","value":""}},"related_module":"","calculated":false,"len":""},"c_accept_status_fields":{"name":"c_accept_status_fields","type":"relate","group":"","id_name":"","label":"Accept Status","required":0,"options":[],"related_module":"","calculated":false,"len":""},"m_accept_status_fields":{"name":"m_accept_status_fields","type":"relate","group":"","id_name":"","label":"Accept Status","required":0,"options":[],"related_module":"","calculated":false,"len":""},"accept_status_id":{"name":"accept_status_id","type":"varchar","group":"","id_name":"","label":"Accept Status","required":0,"options":[],"related_module":"","calculated":false,"len":""},"accept_status_name":{"name":"accept_status_name","type":"enum","group":"","id_name":"","label":"Accept Status","required":0,"options":{"accept":{"name":"accept","value":"Accepted"},"decline":{"name":"decline","value":"Declined"},"tentative":{"name":"tentative","value":"Tentative"},"none":{"name":"none","value":"None"}},"related_module":"","calculated":false,"len":""}},"link_fields":{"calls":{"name":"calls","type":"link","group":"","id_name":"","relationship":"calls_users","module":"","bean_name":""},"meetings":{"name":"meetings","type":"link","group":"","id_name":"","relationship":"meetings_users","module":"","bean_name":""},"contacts_sync":{"name":"contacts_sync","type":"link","group":"","id_name":"","relationship":"contacts_users","module":"","bean_name":""},"reports_to_link":{"name":"reports_to_link","type":"link","group":"","id_name":"","relationship":"user_direct_reports","module":"","bean_name":""},"reportees":{"name":"reportees","type":"link","group":"","id_name":"","relationship":"user_direct_reports","module":"","bean_name":""},"email_addresses":{"name":"email_addresses","type":"link","group":"","id_name":"","relationship":"users_email_addresses","module":"EmailAddress","bean_name":"EmailAddress"},"email_addresses_primary":{"name":"email_addresses_primary","type":"link","group":"","id_name":"","relationship":"users_email_addresses_primary","module":"","bean_name":""},"aclroles":{"name":"aclroles","type":"link","group":"","id_name":"","relationship":"acl_roles_users","module":"","bean_name":""},"prospect_lists":{"name":"prospect_lists","type":"link","group":"","id_name":"","relationship":"prospect_list_users","module":"ProspectLists","bean_name":""},"emails_users":{"name":"emails_users","type":"link","group":"","id_name":"","relationship":"emails_users_rel","module":"Emails","bean_name":""},"holidays":{"name":"holidays","type":"link","group":"","id_name":"","relationship":"users_holidays","module":"","bean_name":""},"eapm":{"name":"eapm","type":"link","group":"","id_name":"","relationship":"eapm_assigned_user","module":"","bean_name":""},"oauth_tokens":{"name":"oauth_tokens","type":"link","group":"","id_name":"","relationship":"oauthtokens_assigned_user","module":"OAuthTokens","bean_name":"OAuthToken"},"project_resource":{"name":"project_resource","type":"link","group":"","id_name":"","relationship":"projects_users_resources","module":"","bean_name":""}}}';


/**
 * @const
 * @type {string}
 */
ydn.crm.su.model.Sugar.UserModuleInfoV72 = '{"module_name":"Users","table_name":"users","module_fields":{"id":{"name":"id","type":"id","group":"","id_name":"","label":"ID","required":1,"options":[],"related_module":"","calculated":false,"len":""},"user_name":{"name":"user_name","type":"user_name","group":"","id_name":"","label":"User Name","required":1,"options":[],"related_module":"","calculated":false,"len":"60"},"user_hash":{"name":"user_hash","type":"password","group":"","id_name":"","label":"Password","required":0,"options":[],"related_module":"","calculated":false,"len":"255"},"system_generated_password":{"name":"system_generated_password","type":"bool","group":"","id_name":"","label":"System Generated Password","required":1,"options":{"1":{"name":1,"value":"Yes"},"2":{"name":2,"value":"No"},"":{"name":"","value":""}},"related_module":"","calculated":false,"len":""},"pwd_last_changed":{"name":"pwd_last_changed","type":"datetime","group":"","id_name":"","label":"Password Last Changed","required":0,"options":[],"related_module":"","calculated":false,"len":""},"authenticate_id":{"name":"authenticate_id","type":"varchar","group":"","id_name":"","label":"Authentication Id","required":0,"options":[],"related_module":"","calculated":false,"len":"100"},"sugar_login":{"name":"sugar_login","type":"bool","group":"","id_name":"","label":"Is Sugar User","required":0,"options":{"1":{"name":1,"value":"Yes"},"2":{"name":2,"value":"No"},"":{"name":"","value":""}},"related_module":"","calculated":false,"len":"","default_value":"1"},"picture":{"name":"picture","type":"image","group":"","id_name":"","label":"Avatar","required":0,"options":[],"related_module":"","calculated":false,"len":"255"},"first_name":{"name":"first_name","type":"name","group":"","id_name":"","label":"First Name","required":0,"options":[],"related_module":"","calculated":false,"len":"30"},"last_name":{"name":"last_name","type":"name","group":"","id_name":"","label":"Last Name","required":1,"options":[],"related_module":"","calculated":false,"len":"30"},"full_name":{"name":"full_name","type":"fullname","group":"","id_name":"","label":"Full Name","required":0,"options":[],"related_module":"","calculated":false,"len":"510"},"name":{"name":"name","type":"fullname","group":"","id_name":"","label":"Full Name","required":0,"options":[],"related_module":"","calculated":false,"len":"510"},"is_admin":{"name":"is_admin","type":"bool","group":"","id_name":"","label":"Is Administrator","required":0,"options":{"1":{"name":1,"value":"Yes"},"2":{"name":2,"value":"No"},"":{"name":"","value":""}},"related_module":"","calculated":false,"len":"","default_value":"0"},"external_auth_only":{"name":"external_auth_only","type":"bool","group":"","id_name":"","label":"External Authentication","required":0,"options":{"1":{"name":1,"value":"Yes"},"2":{"name":2,"value":"No"},"":{"name":"","value":""}},"related_module":"","calculated":false,"len":"","default_value":"0"},"receive_notifications":{"name":"receive_notifications","type":"bool","group":"","id_name":"","label":"Notify on Assignment","required":0,"options":{"1":{"name":1,"value":"Yes"},"2":{"name":2,"value":"No"},"":{"name":"","value":""}},"related_module":"","calculated":false,"len":"","default_value":"1"},"description":{"name":"description","type":"text","group":"","id_name":"","label":"Description","required":0,"options":[],"related_module":"","calculated":false,"len":""},"date_entered":{"name":"date_entered","type":"datetime","group":"","id_name":"","label":"Date Entered","required":1,"options":[],"related_module":"","calculated":false,"len":""},"date_modified":{"name":"date_modified","type":"datetime","group":"","id_name":"","label":"Date Modified","required":1,"options":[],"related_module":"","calculated":false,"len":""},"last_login":{"name":"last_login","type":"datetime","group":"","id_name":"","label":"last login","required":0,"options":[],"related_module":"","calculated":false,"len":""},"modified_user_id":{"name":"modified_user_id","type":"assigned_user_name","group":"","id_name":"modified_user_id","label":"Modified By ID","required":0,"options":[],"related_module":"","calculated":false,"len":""},"modified_by_name":{"name":"modified_by_name","type":"assigned_user_name","group":"","id_name":"modified_user_id","label":"Modified By ID","required":0,"options":[],"related_module":"","calculated":false,"len":""},"created_by":{"name":"created_by","type":"assigned_user_name","group":"","id_name":"modified_user_id","label":"Assigned to:","required":0,"options":[],"related_module":"","calculated":false,"len":""},"created_by_name":{"name":"created_by_name","type":"assigned_user_name","group":"","id_name":"modified_user_id","label":"Assigned to:","required":0,"options":[],"related_module":"","calculated":false,"len":""},"title":{"name":"title","type":"varchar","group":"","id_name":"","label":"Title","required":0,"options":[],"related_module":"","calculated":false,"len":"50"},"department":{"name":"department","type":"varchar","group":"","id_name":"","label":"Department","required":0,"options":[],"related_module":"","calculated":false,"len":"50"},"phone_home":{"name":"phone_home","type":"phone","group":"","id_name":"","label":"Home Phone","required":0,"options":[],"related_module":"","calculated":false,"len":"50"},"phone_mobile":{"name":"phone_mobile","type":"phone","group":"","id_name":"","label":"Mobile","required":0,"options":[],"related_module":"","calculated":false,"len":"50"},"phone_work":{"name":"phone_work","type":"phone","group":"","id_name":"","label":"Work Phone","required":0,"options":[],"related_module":"","calculated":false,"len":"50"},"phone_other":{"name":"phone_other","type":"phone","group":"","id_name":"","label":"Other Phone","required":0,"options":[],"related_module":"","calculated":false,"len":"50"},"phone_fax":{"name":"phone_fax","type":"phone","group":"","id_name":"","label":"Fax","required":0,"options":[],"related_module":"","calculated":false,"len":"50"},"status":{"name":"status","type":"enum","group":"","id_name":"","label":"Status","required":1,"options":{"Active":{"name":"Active","value":"Active"},"Inactive":{"name":"Inactive","value":"Inactive"}},"related_module":"","calculated":false,"len":100},"address_street":{"name":"address_street","type":"text","group":"address","id_name":"","label":"Address Street","required":0,"options":[],"related_module":"","calculated":false,"len":"150"},"address_city":{"name":"address_city","type":"varchar","group":"address","id_name":"","label":"Address City","required":0,"options":[],"related_module":"","calculated":false,"len":"100"},"address_state":{"name":"address_state","type":"varchar","group":"address","id_name":"","label":"Address State","required":0,"options":[],"related_module":"","calculated":false,"len":"100"},"address_country":{"name":"address_country","type":"varchar","group":"address","id_name":"","label":"Address Country","required":0,"options":[],"related_module":"","calculated":false,"len":100},"address_postalcode":{"name":"address_postalcode","type":"varchar","group":"address","id_name":"","label":"Address Postal Code","required":0,"options":[],"related_module":"","calculated":false,"len":"20"},"UserType":{"name":"UserType","type":"enum","group":"","id_name":"","label":"User Type","required":0,"options":{"RegularUser":{"name":"RegularUser","value":"Regular User"},"Administrator":{"name":"Administrator","value":"Administrator"}},"related_module":"","calculated":false,"len":50},"default_team":{"name":"default_team","type":"id","group":"","id_name":"","label":"Default Teams","required":0,"options":[],"related_module":"","calculated":false,"len":"36"},"team_id":{"name":"team_id","type":"id","group":"","id_name":"","label":"Default Teams","required":0,"options":[],"related_module":"","calculated":false,"len":"36"},"team_set_id":{"name":"team_set_id","type":"id","group":"","id_name":"team_set_id","label":"Team Set ID","required":0,"options":[],"related_module":"","calculated":false,"len":""},"team_count":{"name":"team_count","type":"relate","group":"","id_name":"team_id","label":"Teams","required":1,"options":[],"related_module":"Teams","calculated":false,"len":""},"team_name":{"name":"team_name","type":"relate","group":"","id_name":"team_id","label":"Teams","required":1,"options":[],"related_module":"Teams","calculated":false,"len":36},"deleted":{"name":"deleted","type":"bool","group":"","id_name":"","label":"Deleted","required":0,"options":{"1":{"name":1,"value":"Yes"},"2":{"name":2,"value":"No"},"":{"name":"","value":""}},"related_module":"","calculated":false,"len":""},"portal_only":{"name":"portal_only","type":"bool","group":"","id_name":"","label":"Portal API User","required":0,"options":{"1":{"name":1,"value":"Yes"},"2":{"name":2,"value":"No"},"":{"name":"","value":""}},"related_module":"","calculated":false,"len":"","default_value":"0"},"show_on_employees":{"name":"show_on_employees","type":"bool","group":"","id_name":"","label":"Display Employee Record","required":0,"options":{"1":{"name":1,"value":"Yes"},"2":{"name":2,"value":"No"},"":{"name":"","value":""}},"related_module":"","calculated":false,"len":"","default_value":true},"employee_status":{"name":"employee_status","type":"enum","group":"","id_name":"","label":"Employee Status","required":0,"options":{"Active":{"name":"Active","value":"Active"},"Terminated":{"name":"Terminated","value":"Terminated"},"Leave of Absence":{"name":"Leave of Absence","value":"Leave of Absence"}},"related_module":"","calculated":false,"len":100},"messenger_id":{"name":"messenger_id","type":"varchar","group":"","id_name":"","label":"IM Name","required":0,"options":[],"related_module":"","calculated":false,"len":100},"messenger_type":{"name":"messenger_type","type":"enum","group":"","id_name":"","label":"IM Type","required":0,"options":{"":{"name":"","value":""},"MSN":{"name":"MSN","value":"MSN"},"Yahoo!":{"name":"Yahoo!","value":"Yahoo!"},"AOL":{"name":"AOL","value":"AOL"}},"related_module":"","calculated":false,"len":100},"reports_to_id":{"name":"reports_to_id","type":"id","group":"","id_name":"","label":"Reports to ID:","required":0,"options":[],"related_module":"","calculated":false,"len":""},"reports_to_name":{"name":"reports_to_name","type":"relate","group":"","id_name":"reports_to_id","label":"Reports to","required":0,"options":[],"related_module":"Users","calculated":false,"len":""},"email1":{"name":"email1","type":"varchar","group":"email1","id_name":"","label":"Email Address","required":1,"options":[],"related_module":"","calculated":false,"len":""},"email":{"name":"email","type":"email","group":"","id_name":"","label":"Email","required":0,"options":[],"related_module":"","calculated":false,"len":""},"email_link_type":{"name":"email_link_type","type":"enum","group":"","id_name":"","label":"Email Client","required":0,"options":{"sugar":{"name":"sugar","value":"Sugar Email Client"},"mailto":{"name":"mailto","value":"External Email Client"}},"related_module":"","calculated":false,"len":""},"is_group":{"name":"is_group","type":"bool","group":"","id_name":"","label":"Group User","required":0,"options":{"1":{"name":1,"value":"Yes"},"2":{"name":2,"value":"No"},"":{"name":"","value":""}},"related_module":"","calculated":false,"len":""},"c_accept_status_fields":{"name":"c_accept_status_fields","type":"relate","group":"","id_name":"","label":"Accept Status","required":0,"options":[],"related_module":"","calculated":false,"len":""},"m_accept_status_fields":{"name":"m_accept_status_fields","type":"relate","group":"","id_name":"","label":"Accept Status","required":0,"options":[],"related_module":"","calculated":false,"len":""},"accept_status_id":{"name":"accept_status_id","type":"varchar","group":"","id_name":"","label":"Accept Status","required":0,"options":[],"related_module":"","calculated":false,"len":""},"accept_status_name":{"name":"accept_status_name","type":"enum","group":"","id_name":"","label":"Accept Status","required":0,"options":{"accept":{"name":"accept","value":"Accepted"},"decline":{"name":"decline","value":"Declined"},"tentative":{"name":"tentative","value":"Tentative"},"none":{"name":"none","value":"None"}},"related_module":"","calculated":false,"len":""},"accept_status_calls":{"name":"accept_status_calls","type":"enum","group":"","id_name":"","label":"Accept Status","required":0,"options":{"accept":{"name":"accept","value":"Accepted"},"decline":{"name":"decline","value":"Declined"},"tentative":{"name":"tentative","value":"Tentative"},"none":{"name":"none","value":"None"}},"related_module":"","calculated":false,"len":""},"accept_status_meetings":{"name":"accept_status_meetings","type":"enum","group":"","id_name":"","label":"Accept Status","required":0,"options":{"accept":{"name":"accept","value":"Accepted"},"decline":{"name":"decline","value":"Declined"},"tentative":{"name":"tentative","value":"Tentative"},"none":{"name":"none","value":"None"}},"related_module":"","calculated":false,"len":""},"preferred_language":{"name":"preferred_language","type":"enum","group":"","id_name":"","label":"Language Preference:","required":0,"options":{"en_us":{"name":"en_us","value":"English (US)"},"bg_BG":{"name":"bg_BG","value":"Български"},"cs_CZ":{"name":"cs_CZ","value":"Česky"},"da_DK":{"name":"da_DK","value":"Dansk"},"de_DE":{"name":"de_DE","value":"Deutsch"},"el_EL":{"name":"el_EL","value":"Ελληνικά"},"es_ES":{"name":"es_ES","value":"Español"},"fr_FR":{"name":"fr_FR","value":"Français"},"he_IL":{"name":"he_IL","value":"עברית"},"hu_HU":{"name":"hu_HU","value":"Magyar"},"it_it":{"name":"it_it","value":"Italiano"},"lt_LT":{"name":"lt_LT","value":"Lietuvių"},"ja_JP":{"name":"ja_JP","value":"日本語"},"ko_KR":{"name":"ko_KR","value":"한국어"},"lv_LV":{"name":"lv_LV","value":"Latviešu"},"nb_NO":{"name":"nb_NO","value":"Bokmål"},"nl_NL":{"name":"nl_NL","value":"Nederlands"},"pl_PL":{"name":"pl_PL","value":"Polski"},"pt_PT":{"name":"pt_PT","value":"Português"},"ro_RO":{"name":"ro_RO","value":"Română"},"ru_RU":{"name":"ru_RU","value":"Русский"},"sv_SE":{"name":"sv_SE","value":"Svenska"},"tr_TR":{"name":"tr_TR","value":"Türkçe"},"zh_CN":{"name":"zh_CN","value":"简体中文"},"pt_BR":{"name":"pt_BR","value":"Português Brasileiro"},"ca_ES":{"name":"ca_ES","value":"Català"},"en_UK":{"name":"en_UK","value":"English (UK)"},"sr_RS":{"name":"sr_RS","value":"Српски"},"sk_SK":{"name":"sk_SK","value":"Slovenčina"},"sq_AL":{"name":"sq_AL","value":"Shqip"},"et_EE":{"name":"et_EE","value":"Eesti"},"es_LA":{"name":"es_LA","value":"Español (Latinoamérica)"},"fi_FI":{"name":"fi_FI","value":"Finnish"}},"related_module":"","calculated":false,"len":""}},"link_fields":{"team_link":{"name":"team_link","type":"link","group":"","id_name":"","relationship":"users_team","module":"Teams","bean_name":"Team"},"default_primary_team":{"name":"default_primary_team","type":"link","group":"","id_name":"","relationship":"users_team","module":"Teams","bean_name":"Team"},"team_count_link":{"name":"team_count_link","type":"link","group":"","id_name":"","relationship":"users_team_count_relationship","module":"Teams","bean_name":"TeamSet"},"teams":{"name":"teams","type":"link","group":"","id_name":"","relationship":"users_teams","module":"","bean_name":""},"team_memberships":{"name":"team_memberships","type":"link","group":"","id_name":"","relationship":"team_memberships","module":"","bean_name":""},"team_sets":{"name":"team_sets","type":"link","group":"","id_name":"","relationship":"users_team_sets","module":"","bean_name":""},"users_signatures":{"name":"users_signatures","type":"link","group":"","id_name":"","relationship":"users_users_signatures","module":"","bean_name":""},"calls":{"name":"calls","type":"link","group":"","id_name":"","relationship":"calls_users","module":"","bean_name":""},"meetings":{"name":"meetings","type":"link","group":"","id_name":"","relationship":"meetings_users","module":"","bean_name":""},"contacts_sync":{"name":"contacts_sync","type":"link","group":"","id_name":"","relationship":"contacts_users","module":"","bean_name":""},"reports_to_link":{"name":"reports_to_link","type":"link","group":"","id_name":"","relationship":"user_direct_reports","module":"","bean_name":""},"reportees":{"name":"reportees","type":"link","group":"","id_name":"","relationship":"user_direct_reports","module":"","bean_name":""},"email_addresses":{"name":"email_addresses","type":"link","group":"","id_name":"","relationship":"users_email_addresses","module":"EmailAddress","bean_name":"EmailAddress"},"email_addresses_primary":{"name":"email_addresses_primary","type":"link","group":"","id_name":"","relationship":"users_email_addresses_primary","module":"","bean_name":""},"aclroles":{"name":"aclroles","type":"link","group":"","id_name":"","relationship":"acl_roles_users","module":"","bean_name":""},"prospect_lists":{"name":"prospect_lists","type":"link","group":"","id_name":"","relationship":"prospect_list_users","module":"ProspectLists","bean_name":""},"emails_users":{"name":"emails_users","type":"link","group":"","id_name":"","relationship":"emails_users_rel","module":"Emails","bean_name":""},"holidays":{"name":"holidays","type":"link","group":"","id_name":"","relationship":"users_holidays","module":"","bean_name":""},"eapm":{"name":"eapm","type":"link","group":"","id_name":"","relationship":"eapm_assigned_user","module":"","bean_name":""},"oauth_tokens":{"name":"oauth_tokens","type":"link","group":"","id_name":"","relationship":"oauthtokens_assigned_user","module":"OAuthTokens","bean_name":"OAuthToken"},"project_resource":{"name":"project_resource","type":"link","group":"","id_name":"","relationship":"projects_users_resources","module":"","bean_name":""},"quotas":{"name":"quotas","type":"link","group":"","id_name":"","relationship":"users_quotas","module":"","bean_name":""},"forecasts":{"name":"forecasts","type":"link","group":"","id_name":"","relationship":"users_forecasts","module":"","bean_name":""},"activities":{"name":"activities","type":"link","group":"","id_name":"","relationship":"activities_users","module":"Activities","bean_name":"Activity"}}}';


/**
 * @param {ydn.crm.su.ModuleName} name
 * @return {SugarCrm.ModuleInfo}
 */
ydn.crm.su.model.Sugar.prototype.getModuleInfo = function(name) {
  var info = this.module_info[name];
  // some user are not available for user data.
  if (!info && name == 'Users') {
    if (!this.UserModuleInfo_) {
      if (this.isVersion7()) {
        this.UserModuleInfo_ = /** @type {SugarCrm.ModuleInfo} */(
            JSON.parse(ydn.crm.su.model.Sugar.UserModuleInfoV72));
      } else {
        this.UserModuleInfo_ = /** @type {SugarCrm.ModuleInfo} */(
            JSON.parse(ydn.crm.su.model.Sugar.UserModuleInfoV65));
      }
    }
    info = this.UserModuleInfo_;
  }
  return info;
};


/**
 * Should use `favorite_enabled` attribute for displaying Modules.
 * @return {boolean}
 */
ydn.crm.su.model.Sugar.prototype.shouldUseFavoriteEnabled = function() {
  var cnt = 0;
  if (this.availableModules_) {
    for (var i = 0; i < this.availableModules_.length; i++) {
      if (this.availableModules_[i]['favorite_enabled'] == true) {
        cnt++;
        if (cnt >= 3) {
          return true;
        }
      }
    }
  }
  return false;
};


/**
 * @param {ydn.crm.su.ModuleName} name
 * @return {SugarCrm.AvailableModule}
 */
ydn.crm.su.model.Sugar.prototype.getAvailableModule = function(name) {
  if (!this.availableModules_) {
    return null;
  }
  return goog.array.find(this.availableModules_, function(x) {
    return x.module_key == name;
  });
};


/**
 * Check if a module action is allow.
 * @param {ydn.crm.su.ModuleName} name module name.
 * @param {string} action Enum of 'edit', 'delete', 'list', 'view', 'import', 'export'
 * @return {?boolean} `null` if no information is available.
 */
ydn.crm.su.model.Sugar.prototype.isActionAllow = function(name, action) {
  var av = this.getAvailableModule(name);
  if (av && av.acls) {
    for (var i = 0; i < av.acls.length; i++) {
      if (av.acls[i].action == action) {
        return av.acls[i].access;
      }
    }
  }
  return null;
};


/**
 * @return {!Array<ydn.crm.su.ModuleName>} list of module available.
 */
ydn.crm.su.model.Sugar.prototype.listModules = function() {
  return /** @type {!Array<ydn.crm.su.ModuleName>} */(Object.keys(
      /** @type {!Object} */(this.module_info)));
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
 * Chrome host permission request object.
 * @return {{origins: (Array.<string>|undefined), permissions: (Array.<string>|undefined)}}
 */
ydn.crm.su.model.Sugar.prototype.getPermissionObject = function() {
  var url = this.getBaseUrl();
  goog.asserts.assertString(url);
  var uri = new goog.Uri(url);
  uri.setPath('/*');
  return {'origins': [uri.toString()]};
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
  var ch = ydn.msg.getChannel();
  return ch.send(ydn.crm.ch.Req.LOGIN_SUGAR, info)
      .addCallback(function(data) {
        this.initUser_();
        this.initUserInfo_();
        this.setAbout(data);
      }, this);
};


/**
 * @param {string} name
 * @return {ydn.crm.su.ModuleName|undefined} return undefined if not a valid
 * module name.
 * @see #tryToModuleName
 */
ydn.crm.su.model.Sugar.prototype.asModuleName = function(name) {
  if (this.module_info[name]) {
    return /** @type {ydn.crm.su.ModuleName} */(this.module_info[name].module_name);
  }
  for (var key in this.module_info) {
    if (this.module_info[key].module_name == name) {
      return /** @type {ydn.crm.su.ModuleName} */(this.module_info[name].module_name);
    }
  }
};


/**
 * Heuristically convert given name to module name. Useful for converting
 * lousy label to module name.
 * <pre>
 *   sugar.tryToModuleName('Account'); // return 'Accounts'
 * </pre>
 * @param {string} name
 * @return {ydn.crm.su.ModuleName|undefined}
 * @see asModuleName
 */
ydn.crm.su.model.Sugar.prototype.tryToModuleName = function(name) {
  if (!name) {
    return undefined;
  }
  var mn = this.asModuleName(name);
  if (mn) {
    return mn;
  }
  name = goog.string.capitalize(name.trim());
  mn = this.asModuleName(name);
  if (mn) {
    return mn;
  }
  if (name == 'Opportunity') {
    return ydn.crm.su.ModuleName.OPPORTUNITIES;
  }
  var plural = name + 's';
  mn = this.asModuleName(plural);
  if (mn) {
    return mn;
  }
  return undefined;
};


/**
 * @return {!goog.async.Deferred}
 */
ydn.crm.su.model.Sugar.prototype.retryLogin = function() {
  return this.getChannel().send(ydn.crm.ch.SReq.LOGIN)
      .addCallbacks(function(login_user) {
        this.login_info_ = /** @type {SugarCrm.LoginRecord} */ (login_user);
        this.initUser_();
        return this.updateStatus();
      }, function(e) {
        ydn.crm.msg.Manager.addStatus('Retry login fail: ' + (e ? e.message || e : ''));
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
    query['limit'] = opt_limit;
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
            r._module = module_name;
            out.push(r);
          }
        }
        return out;
      });
};


/**
 * Query people module records by email.
 * @param {string} email email address to query.
 * @param {boolean=} opt_internal include internal people from 'Users'
 * modules.
 * @return {!goog.async.Deferred<!Array<!SugarCrm.Record>>} list of record. the record value
 * has `_module` for respective module name.
 * @see #queryOneByEmail
 */
ydn.crm.su.model.Sugar.prototype.queryByEmail = function(email, opt_internal) {
  if (!goog.isString(email) || email.indexOf('@') == -1) {
    return goog.async.Deferred.succeed([]);
  }
  var query = [{
    'store': ydn.crm.su.ModuleName.CONTACTS,
    'index': 'ydn$emails',
    'key': email
  }, {
    'store': ydn.crm.su.ModuleName.ACCOUNTS,
    'index': 'ydn$emails',
    'key': email
  }, {
    'store': ydn.crm.su.ModuleName.LEADS,
    'index': 'ydn$emails',
    'key': email
  }];
  if (opt_internal) {
    query.push({
      'store': ydn.crm.su.ModuleName.USERS,
      'index': 'ydn$emails',
      'key': email
    });
  }
  return this.getChannel().send(ydn.crm.ch.SReq.QUERY,
      query).addCallback(function(x) {
    var arr = /** @type {Array<CrmApp.QueryResult>} */(x);
    if (arr.length == 0) {
      var q = {'email': email};
      return this.getChannel().send(ydn.crm.ch.SReq.QUERY_BY_EMAIL_ON_SERVER, q);
    }
    var out = [];
    for (var i = 0; i < arr.length; i++) {
      var result = arr[i];
      var n = result.result ? result.result.length : 0;
      for (var j = 0; j < n; j++) {
        // email is unique and should not have more than one record.
        var r = /** @type {!SugarCrm.Record} */(result.result[j]);
        if (!ydn.crm.su.Record.isDeleted(r)) {
          r._module = query[i]['store'];
          out.push(r);
        }
      }
    }
    return out;
  }, this);
};


/**
 * Query one people module record by email. This will search on server if not
 * found in client database.
 * <pre>
 *   sugar.queryOneByEmail('nettie@example.name')
 *   .addCallback(function(x) {console.log(x)});
 * </pre>
 * @param {string} email email address to query.
 * @return {!goog.async.Deferred<SugarCrm.Record>} list of record. the record value
 * has `_module` for respective module name.
 * @see #queryByEmail
 */
ydn.crm.su.model.Sugar.prototype.queryOneByEmail = function(email) {
  return this.queryByEmail(email).addCallback(function(arr) {
    if (arr[0]) {
      return arr[0];
    }
    var q = {'email': email};
    return this.getChannel().send(ydn.crm.ch.SReq.QUERY_BY_EMAIL_ON_SERVER, q)
        .addCallback(function(arr) {
          for (var i = 0; arr.length; i++) {
            if (arr[i]['_module'] == ydn.crm.su.ModuleName.CONTACTS) {
              return arr[i];
            }
          }
          if (arr[0]) {
            return arr[0];
          }
          return null;
    }, this);
  }, this);
};


/**
 * Get Users module record id of login user.
 * @return {string}
 */
ydn.crm.su.model.Sugar.prototype.getUserRecordId = function() {
  // same as this.user_.value('user_id'), but login_info_ is primary data.
  return this.login_info_ ? this.login_info_.user_id : '';
};


/**
 * Get name value of Users module record id of login user.
 * @return {string}
 */
ydn.crm.su.model.Sugar.prototype.getUserRecordName = function() {
  return this.user_ ? this.user_.getStringValue('name') || '' : '';
};


/**
 * Get name value of Users module record id of login user.
 * @return {string}
 */
ydn.crm.su.model.Sugar.prototype.getUserRecordEmail = function() {
  return this.user_ ? this.user_.getStringValue('email1') || '' : '';
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
  var text = info.text;
  if (!text) {
    var div = document.createElement('div');
    div.innerHTML = info.html;
    text = div.innerText;
  }
  var type = 'archived';

  // ISO: "2014-04-02T03:32:20.522Z"
  // SugarCRM: "2013-09-20 22:10:00"
  var date_str = ydn.crm.su.utils.isValidDate(info.date_sent) ?
      ydn.crm.su.utils.toDateString(info.date_sent) : '';
  var obj = {
    'assigned_user_id': this.getUserRecordId(),
    'assigned_user_name': this.getUserRecordName(),
    'date_sent': date_str,
    'description': text,
    'description_html': info.html,
    'from_addr': info.from_addr,
    'mailbox_id': info.mailbox_id || '',
    'message_id': info.message_id || '',
    'name': info.subject,
    'parent_id': opt_parent_id || '',
    'parent_type': opt_parent_module || '',
    'status': 'read',
    'to_addrs': info.to_addrs,
    'type': type
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
 * Get upcoming activities, except Cases activities.
 * @param {Date} since
 * @param {Date=} opt_until
 * @return {!goog.async.Deferred<!Array<!SugarCrm.Record>>}
 * @private
 */
ydn.crm.su.model.Sugar.prototype.upcomingCasesActivities_ = function(since, opt_until) {
  var mn = ydn.crm.su.ModuleName.CASES;
  var assigned_user_id = this.user_.getId();
  var reverse = false;
  var start_date = ydn.crm.su.utils.toDateString(since);
  var until = '\uffff';

  reverse = true;
  start_date = '';
  if (opt_until) {
    start_date = ydn.crm.su.utils.toDateString(opt_until);
  }

  var kr = ydn.db.KeyRange.bound([assigned_user_id, start_date], [assigned_user_id, until]);

  var query = {
    'store': mn,
    'index': ydn.crm.su.Record.getIndexForDeadline(mn),
    'limit': 20,
    'reverse': reverse,
    'keyRange': kr.toJSON()
  };
  if (ydn.crm.su.model.Sugar.DEBUG) {
    window.console.log('upcomingActivities_ for ' + mn, query);
  }

  return this.send(ydn.crm.ch.SReq.VALUES, query).addCallbacks(function(arr) {
    var results = /** @type {!Array<!SugarCrm.Record>} */ (arr);
    return results;
  }, function(e) {
    window.console.error(e);
  }, this);
};


/**
 * Get upcoming activities, except Cases activities.
 * @param {Date} since
 * @param {Date=} opt_until
 * @return {!goog.async.Deferred<!Array<!SugarCrm.Record>>}
 * @private
 */
ydn.crm.su.model.Sugar.prototype.upcomingMeetingActivities_ = function(since, opt_until) {
  var mn = ydn.crm.su.ModuleName.MEETINGS;
  var assigned_user_id = this.user_.getId();
  var reverse = false;
  var start_date = ydn.crm.su.utils.toDateString(since);
  var until = '\uffff';

  if (opt_until) {
    until = ydn.crm.su.utils.toDateString(opt_until);
  }

  var kr = ydn.db.KeyRange.bound([assigned_user_id, start_date], [assigned_user_id, until]);

  var query = {
    'store': mn,
    'index': ydn.crm.su.Record.getIndexForDeadline(mn),
    'limit': 20,
    'reverse': reverse,
    'keyRange': kr.toJSON()
  };
  if (ydn.crm.su.model.Sugar.DEBUG) {
    window.console.log('upcomingMeetingActivities_', query);
  }

  return this.send(ydn.crm.ch.SReq.VALUES, query).addCallbacks(function(arr) {
    var results = /** @type {!Array<!SugarCrm.Record>} */ (arr);
    return results;
  }, function(e) {
    window.console.error(e);
  }, this);
};


/**
 * Get upcoming activities, except Cases activities.
 * @param {ydn.crm.su.ModuleName} mn
 * @param {Date} since
 * @param {Date=} opt_until
 * @return {!goog.async.Deferred<!Array<!SugarCrm.Record>>}
 * @private
 */
ydn.crm.su.model.Sugar.prototype.upcomingActivities_ = function(mn, since, opt_until) {
  var assigned_user_id = this.user_.getId();
  var reverse = false;
  var start_date = ydn.crm.su.utils.toDateString(since);
  var until = '\uffff';

  if (opt_until) {
    until = ydn.crm.su.utils.toDateString(opt_until);
  }

  var kr = ydn.db.KeyRange.bound([assigned_user_id, start_date], [assigned_user_id, until]);

  var query = {
    'store': mn,
    'index': ydn.crm.su.Record.getIndexForDeadline(mn),
    'limit': 20,
    'reverse': reverse,
    'keyRange': kr.toJSON()
  };
  if (ydn.crm.su.model.Sugar.DEBUG) {
    window.console.log('upcomingActivities_ for ' + mn, query);
  }

  return this.send(ydn.crm.ch.SReq.VALUES, query).addCallbacks(function(arr) {
    var results = /** @type {!Array<!SugarCrm.Record>} */ (arr);
    return results;
  }, function(e) {
    window.console.error(e);
  }, this);
};


/**
 * @const
 * @type {number} Cache period for upcoming activity query.
 */
ydn.crm.su.model.Sugar.UP_ACT_PT = ydn.time.MINUTE;


/**
 * Get upcoming activities.
 * @param {ydn.crm.su.ModuleName} mn
 * @return {!goog.async.Deferred<!Array<!SugarCrm.Record>>}
 */
ydn.crm.su.model.Sugar.prototype.getUpcomingActivitiesClient = function(mn) {
  if (!this.df_upcoming_activities_[mn]) {
    var since = new Date();
    if (mn == ydn.crm.su.ModuleName.CASES) {
      this.df_upcoming_activities_[mn] = this.upcomingCasesActivities_(since);
    } else if (mn == ydn.crm.su.ModuleName.MEETINGS) {
      this.df_upcoming_activities_[mn] = this.upcomingMeetingActivities_(since);
    } else {
      this.df_upcoming_activities_[mn] = this.upcomingActivities_(mn, since);
    }
    this.df_upcoming_activities_[mn].addCallback(function() {
      var df = this.df_upcoming_activities_[mn];
      setTimeout((function() {
        this.df_upcoming_activities_[mn] = null;
      }).bind(this), ydn.crm.su.model.Sugar.UP_ACT_PT);
    }, this);
  }
  // make a branch so that the result is not modified.
  return this.df_upcoming_activities_[mn].branch();
};


/**
 * Get upcoming activities.
 * @param {ydn.crm.su.ModuleName} mn
 * @return {!goog.async.Deferred<!Array<!SugarCrm.Record>>}
 */
ydn.crm.su.model.Sugar.prototype.getUpcomingActivities = function(mn) {
  if (!this.df_upcoming_activities_[mn]) {
    this.df_upcoming_activities_[mn] = new goog.async.Deferred();
    var data = {'module': mn};
    var df = this.send(ydn.crm.ch.SReq.LIST_UPCOMING_ASYNC, data);
    var field = ydn.crm.su.Record.getFieldNameForDeadline(mn);
    var results = new ydn.crm.su.SortedRecords(field, true);

    df.addProgback(function(x) {
      if (ydn.crm.su.model.Sugar.DEBUG) {
        window.console.log(mn, x);
      }
      results.addAll(x);
    }, this);
    df.addBoth(function() {
      setTimeout((function() {
        this.df_upcoming_activities_[mn] = null;
      }).bind(this), ydn.crm.su.model.Sugar.UP_ACT_PT);
      return results.records;
    }, this);
    this.df_upcoming_activities_[mn] = df;
    return df;
  }
  // make a branch so that the result is not modified.
  return this.df_upcoming_activities_[mn].branch();
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
 * Get the sugarcrm instance, of which login.
 * @return {!goog.async.Deferred.<ydn.crm.su.model.Sugar>}
 * @see ydn.crm.su.model.GDataSugar#list
 */
ydn.crm.su.model.Sugar.get = function() {
  var user = ydn.crm.ui.UserSetting.getInstance();
  return ydn.msg.getChannel().send(ydn.crm.ch.Req.GET_SUGAR).addCallback(function(details) {
    return new ydn.crm.su.model.Sugar(details.about, details.modulesInfo,
        details.serverInfo, details.loginInfo, details.availableModules);
  });
};


/**
 * @return {!ydn.crm.su.model.Sugar}
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

