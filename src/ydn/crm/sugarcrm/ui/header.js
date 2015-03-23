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
 * @fileoverview SugarCRM header panel for account setup, host access grant and
 * display activity and search toolbar.
 *
 */


goog.provide('ydn.crm.su.ui.Header');
goog.require('goog.events.KeyHandler');
goog.require('goog.style');
goog.require('goog.ui.Component');
goog.require('ydn.crm.base');
goog.require('ydn.crm.su');
goog.require('ydn.crm.su.ui.activity.Panel');



/**
 * SugarCRM header panel.
 * @param {ydn.crm.su.model.Sugar} model
 * @param {goog.dom.DomHelper} dom
 * @constructor
 * @struct
 * @extends {goog.ui.Component}
 * @suppress {checkStructDictInheritance} suppress closure-library code.
 */
ydn.crm.su.ui.Header = function(model, dom) {
  goog.base(this, dom);
  this.setModel(model);
};
goog.inherits(ydn.crm.su.ui.Header, goog.ui.Component);


/**
 * @define {boolean} debug flag.
 */
ydn.crm.su.ui.Header.DEBUG = false;


/**
 * @protected
 * @type {goog.debug.Logger}
 */
ydn.crm.su.ui.Header.prototype.logger =
    goog.log.getLogger('ydn.crm.su.ui.Header');


/**
 * @return {ydn.crm.su.model.Sugar}
 * @override
 */
ydn.crm.su.ui.Header.prototype.getModel;


/**
 * @const
 * @type {string}
 */
ydn.crm.su.ui.Header.CSS_CLASS_CONTENT = 'sugar-header-content';


/**
 * @const
 * @type {string}
 */
ydn.crm.su.ui.Header.CSS_CLASS = 'sugar-header';


/** @return {string} */
ydn.crm.su.ui.Header.prototype.getCssClass = function() {
  return ydn.crm.su.ui.Header.CSS_CLASS;
};


/**
 * @inheritDoc
 */
ydn.crm.su.ui.Header.prototype.getContentElement = function() {
  return this.getElement().querySelector('.' + ydn.crm.su.ui.Header.CSS_CLASS_CONTENT);
};


/**
 * @inheritDoc
 */
ydn.crm.su.ui.Header.prototype.createDom = function() {
  goog.base(this, 'createDom');
  var root = this.getElement();
  var ctrl = this;
  /**
   * @type {ydn.crm.su.model.Sugar}
   */
  var model = this.getModel();
  var dom = this.getDomHelper();
  goog.dom.classlist.add(root, this.getCssClass());
  var a = dom.createDom('a');
  a.textContent = model.getDomain();
  a.href = model.getHomeUrl();
  var svg = ydn.crm.ui.createSvgIcon('sugarcrm');
  var div_svg = dom.createDom('div', 'icon-box', svg);
  var ele_title = dom.createDom('div', {
    'class': 'main-title',
    'data-tooltip': 'SugarCRM'}, [div_svg, a]);
  root.appendChild(ele_title);
  var grants = [];

  var target = 'option-page';
  var msg = 'Setup host permission';

  // var btn = dom.createDom('button', null, msg);
  // using button inside a doesn't work, possible for strict security of chrome extension
  var btn_grant = dom.createDom('a', {
    'className': 'maia-button blue',
    'href': '#host-permission'
  }, msg);
  btn_grant.setAttribute('title', 'Your permission is required to connect your' +
      ' server from this extension. Without permission request to server will be slow.');
  grants.push(btn_grant);

  var div_grant = dom.createDom('div', {'class': 'host-permission'}, grants);
  root.appendChild(div_grant);
  var div_no_login_msg = dom.createDom('div', null, 'Login fail.');
  var un = dom.createDom('a', {'name': 'username', 'type': 'text'}, 'Re-login');
  var div_username = dom.createDom('div', null, [un]);
  var ps = dom.createDom('a', {'name': 'password', 'type': 'password'}, 'Setup');
  var div_password = dom.createDom('div', null, [ps]);
  var div_msg = dom.createDom('div', 'message');
  var div_login = dom.createDom('div', 'login-form', [div_no_login_msg, div_password, div_msg]);
  var content_ele = dom.createDom('div', ydn.crm.su.ui.Header.CSS_CLASS_CONTENT);
  root.appendChild(div_login);
  root.appendChild(content_ele);
  goog.style.setElementShown(div_grant, !model.hasHostPermission());
  goog.style.setElementShown(div_login, !model.isLogin());
  goog.style.setElementShown(content_ele, this.getModel().hasHostPermission());

  // todo: move to content section.
  var activity_panel = new ydn.crm.su.ui.activity.Panel(model, dom);
  this.addChild(activity_panel, true);
};


/**
 * @inheritDoc
 */
ydn.crm.su.ui.Header.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  var root = this.getElement();
  var handler = this.getHandler();
  var grant = this.getElement().querySelector('.host-permission');
  var div_login = root.querySelector('.login-form');
  var kh = new goog.events.KeyHandler(div_login);
  handler.listen(kh, goog.events.KeyHandler.EventType.KEY, this.handleLogin);
  var a_grant = grant.querySelector('a');
  handler.listen(a_grant, 'click', this.onGrantHostPermission);

  handler.listen(this.getModel(), ydn.crm.su.SugarEvent.HOST_ACCESS_GRANT,
      this.handleHostGrant);
  handler.listen(this.getModel(), [ydn.crm.su.SugarEvent.LOGIN, ydn.crm.su.SugarEvent.LOGOUT],
      this.handleModelLogin);

};


/**
 * Handle grant host permission grant.
 * @param {goog.events.BrowserEvent} e
 */
ydn.crm.su.ui.Header.prototype.onGrantHostPermission = function(e) {
  e.preventDefault();
  var model = this.getModel();
  var domain = model.getDomain();
  var permissions = model.getPermissionObject();

  // content script does not have permissions api.
  ydn.msg.getChannel().send(ydn.crm.ch.Req.REQUEST_HOST_PERMISSION, permissions).addBoth(function(x) {
    var grant = this.getElement().querySelector('.host-permission');
    if (x === true) {
      goog.style.setElementShown(grant, false);
    }
  }, this);

};


/**
 * @param {goog.events.BrowserEvent} e
 */
ydn.crm.su.ui.Header.prototype.handleModelLogin = function(e) {
  var div_login = this.getElement().querySelector('.login-form');
  goog.style.setElementShown(div_login, !this.getModel().isLogin());
};


/**
 * Listen model event for host grant access.
 * @param {Event} e
 */
ydn.crm.su.ui.Header.prototype.handleHostGrant = function(e) {
  var grant = this.getElement().querySelector('.host-permission');
  var has_per = this.getModel().hasHostPermission();
  goog.style.setElementShown(grant, !has_per);
  goog.style.setElementShown(this.getContentElement(), has_per);
};


/**
 * @param {goog.events.KeyEvent} keyEvent
 */
ydn.crm.su.ui.Header.prototype.handleLogin = function(keyEvent) {
  if (keyEvent.keyCode == goog.events.KeyCodes.ENTER) {
    var root = this.getElement();
    var div_login = root.querySelector('.login-form');
    var model = /** @type {ydn.crm.su.model.Sugar} */ (this.getModel());
    var un = div_login.querySelector('input[name=username]').value;
    var ps = div_login.querySelector('input[name=password]').value;
    var msg = div_login.querySelector('.message');
    msg.textContent = 'logging in...';
    model.doLogin(un, ps).addCallbacks(function(info) {
      if (model.isLogin()) {
        msg.textContent = '';
        goog.style.setElementShown(div_login, false);
      } else {
        msg.textContent = 'login failed';
      }
    }, function(e) {
      msg.textContent = 'Error: ' + e;
    }, this);
  }
};


/**
 * @return {string}
 */
ydn.crm.su.ui.Header.prototype.getDomain = function() {
  return this.getModel().getDomain();
};


/**
 * Update
 * @protected
 */
ydn.crm.su.ui.Header.prototype.handleSugarChanged = function() {
  var model = /** @type {ydn.crm.su.model.Sugar} */ (this.getModel());
  goog.asserts.assert(model, 'empty model?');
  var domain = model.getDomain();
  goog.asserts.assertString(domain, 'domain must be provided.');
  var root = this.getElement();
  var a_title = root.querySelector('.main-title a');
  var login = root.querySelector('.login-form');
  var grant = root.querySelector('.host-permission');
  a_title.textContent = domain;
  a_title.href = model.getBaseUrl() || 'https://' + domain;
  var user_name = login.querySelector('input[name=username]');
  user_name.textContent = model.getUserName() || '';
  var content_ele = this.getContentElement();
  goog.style.setElementShown(login, false);
  goog.style.setElementShown(grant, false);
  goog.style.setElementShown(root, true);
  goog.style.setElementShown(content_ele, true);

  if (!model.hasHostPermission()) {

    var hp_url = chrome.extension.getURL(ydn.crm.base.HOST_PERMISSION_PAGE);
    var a_grant = grant.querySelector('a');
    a_grant.href = hp_url + '?' + domain;

    goog.style.setElementShown(grant, true);
    goog.style.setElementShown(content_ele, false);
  } else if (!model.isLogin()) {
    var ch = ydn.msg.getChannel(ydn.msg.Group.SUGAR, domain).send(ydn.crm.ch.SReq.ABOUT);
    ch.addCallback(function(x) {
      // window.console.log('about ', x);
      var about = /** @type {SugarCrm.About} */ (x);
      goog.style.setElementShown(login, !about.isLogin);
    });
  }
};


/**
 * @return {ydn.crm.su.ui.activity.Panel}
 * @private
 */
ydn.crm.su.ui.Header.prototype.getActivityPanel_ = function() {
  for (var i = 0; i < this.getChildCount(); i++) {
    var child = this.getChildAt(i);
    if (child instanceof ydn.crm.su.ui.activity.Panel) {
      return child;
    }
  }
  return null;
};


/**
 * Show record.
 * @param {ydn.crm.su.ModuleName} m_name
 * @param {string} id
 */
ydn.crm.su.ui.Header.prototype.showRecord = function(m_name, id) {
  this.getActivityPanel_().showRecord(m_name, id);
};




