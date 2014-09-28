// Copyright 2014 YDN Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


/**
 * @fileoverview Contact sidebar panel.
 */


goog.provide('ydn.crm.gmail.ContextSidebar');
goog.require('goog.async.Delay');
goog.require('goog.ui.ComboBox');
goog.require('goog.ui.Css3MenuButtonRenderer');
goog.require('goog.ui.Menu');
goog.require('goog.ui.MenuButton');
goog.require('goog.ui.MenuItem');
goog.require('goog.ui.Toolbar');
goog.require('ydn.crm.gmail.Template');
goog.require('ydn.crm.sugarcrm.ui.ContextSugarPanel');
goog.require('ydn.crm.ui.SugarListPanel');
goog.require('ydn.gmail.Utils');



/**
 * Contact sidebar panel.
 * @param {goog.dom.DomHelper=} opt_dom
 * @constructor
 * @struct
 * @extends {ydn.crm.ui.SugarListPanel}
 */
ydn.crm.gmail.ContextSidebar = function(opt_dom) {
  goog.base(this, opt_dom);

  /**
   * @type {ydn.crm.gmail.Template}
   * @private
   */
  this.gmail_template_ = null;

  this.email_list_updator_ = new goog.async.Delay(this.updateEmailDataList, 500, this);
};
goog.inherits(ydn.crm.gmail.ContextSidebar, ydn.crm.ui.SugarListPanel);


/**
 * @protected
 * @type {goog.debug.Logger}
 */
ydn.crm.gmail.ContextSidebar.prototype.logger =
    goog.log.getLogger('ydn.crm.gmail.ContextSidebar');


/**
 * Element id for all email data list.
 * @const
 * @type {string}
 */
ydn.crm.gmail.ContextSidebar.ID_EMAILS = 'all-emails';


/**
 * @const
 * @type {string}
 */
ydn.crm.gmail.ContextSidebar.CSS_CLASS_TRAGET = 'target-email';


/**
 * @const
 * @type {string}
 */
ydn.crm.gmail.ContextSidebar.CSS_CLASS = 'context-sidebar';


/**
 * @inheritDoc
 */
ydn.crm.gmail.ContextSidebar.prototype.createDom = function() {
  goog.base(this, 'createDom');
  // status bar
  var dom = this.getDomHelper();
  var root = this.getElement();
  root.classList.add(ydn.crm.gmail.ContextSidebar.CSS_CLASS);
  var header = root.querySelector('.' + ydn.crm.ui.CSS_CLASS_HEAD);

  var status_el = dom.createDom('div', ydn.crm.ui.SugarListPanel.CSS_CLASS_STATUS);
  var status = new ydn.crm.msg.StatusBar(true);
  status.render(status_el);
  ydn.crm.msg.Manager.addConsumer(status);
  root.appendChild(status_el);

  // toolbar
  var toolbar = dom.createDom('div', 'toolbar flex-bar');

  var emails_list = dom.createDom('input', ydn.crm.gmail.ContextSidebar.CSS_CLASS_TRAGET);
  emails_list.setAttribute('list', ydn.crm.gmail.ContextSidebar.ID_EMAILS);
  toolbar.appendChild(emails_list);

  var svg_search = ydn.crm.ui.createSvgIcon('search');
  var search = dom.createDom('span', 'search svg-button');
  search.appendChild(svg_search);
  toolbar.appendChild(search);
  header.appendChild(toolbar);

  if (!document.getElementById(ydn.crm.gmail.ContextSidebar.ID_EMAILS)) {
    var list = document.createElement('datalist');
    list.id = ydn.crm.gmail.ContextSidebar.ID_EMAILS;
    document.body.appendChild(list);
  }
};


/**
 * @inheritDoc
 */
ydn.crm.gmail.ContextSidebar.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  var handler = this.getHandler();
  var head = this.getElement().querySelector('.toolbar');
  var email_input = head.querySelector('input');
  var search = head.querySelector('.search');

  handler.listen(email_input, 'change', this.onSearch);
  handler.listen(search, 'click', this.onSearch);

};


/**
 * @param {goog.events.Event} e
 * @protected
 */
ydn.crm.gmail.ContextSidebar.prototype.onSearch = function(e) {
  var target = this.getElement().querySelector('input.' + ydn.crm.gmail.ContextSidebar.CSS_CLASS_TRAGET);
  var value = target.value;
  var email = value.indexOf('@') > 0 ? value : undefined;
  var name = !email ? value : undefined;
  var account = ydn.crm.ui.UserSetting.getInstance().getLoginEmail();
  var cm = new ydn.crm.inj.Context(account, email, name);
  cm.kind = ydn.crm.inj.Context.Kind.SEARCH;
  // console.log('update for ' + cm);
  this.updateForNewContact(cm);
};


/**
 * @protected
 */
ydn.crm.gmail.ContextSidebar.prototype.updateEmailDataList = function() {
  var emails = ydn.gmail.Utils.sniffAllEmailsInDocument();
  var list = document.getElementById(ydn.crm.gmail.ContextSidebar.ID_EMAILS);
  list.innerHTML = '';
  for (var i = 0; i < emails.length; i++) {
    var option = document.createElement('option');
    option.value = emails[i];
    list.appendChild(option);
  }
};


/**
 * @inheritDoc
 */
ydn.crm.gmail.ContextSidebar.prototype.disposeInternal = function() {
  this.email_list_updator_.dispose();
  this.email_list_updator_ = null;
  goog.base(this, 'disposeInternal');
};


/**
 * @inheritDoc
 */
ydn.crm.gmail.ContextSidebar.prototype.addSugarPanel = function(sugar) {
  var panel = new ydn.crm.sugarcrm.ui.ContextSugarPanel(sugar, this.dom_);
  this.addChild(panel, true);
  if (ydn.crm.ui.SugarListPanel.DEBUG) {
    window.console.info('context sugar panel ' + sugar.getDomain() + ' created, now ' +
        this.getChildCount() + ' panels');
  }

  if (!this.gmail_template_ && sugar.isLogin()) {
    this.logger.finer('compose template initialized.');
    this.gmail_template_ = new ydn.crm.gmail.Template(sugar);
  }
};


/**
 * Inject template menu on Gmail compose panel.
 * @return {boolean} true if injected.
 */
ydn.crm.gmail.ContextSidebar.prototype.injectTemplateMenu = function() {
  if (this.gmail_template_) {
    return this.gmail_template_.attach();
  } else {
    this.logger.warning('SugarCRM instance not ready.');
    return false;
  }
};


/**
 * Update sniff contact data.
 * @param {ydn.crm.inj.Context} cm set `null` to flash out.
 */
ydn.crm.gmail.ContextSidebar.prototype.updateForNewContact = function(cm) {

  var cn = this.getChildCount();
  for (var i = 0; i < cn; i++) {
    var child = /** @type {ydn.crm.sugarcrm.ui.ContextSugarPanel} */ (this.getChildAt(i));
    if (child instanceof ydn.crm.sugarcrm.ui.ContextSugarPanel) {
      /**
       * @type {ydn.crm.sugarcrm.model.GDataSugar}
       */
      var sugar = child.getModel();
      if (ydn.crm.ui.SugarListPanel.DEBUG) {
        window.console.log('updating new contact', cm);
      }
      sugar.update(cm);
      this.email_list_updator_.start();
    }
  }
};


/**
 * @override
 */
ydn.crm.gmail.ContextSidebar.prototype.updateHeader = function() {
  goog.base(this, 'updateHeader');

};


/**
 * Update for new gmail thread.
 */
ydn.crm.gmail.ContextSidebar.prototype.updateForNewGmailThread = function() {
  var cn = this.getChildCount();
  for (var i = 0; i < cn; i++) {
    var child = /** @type {ydn.crm.sugarcrm.ui.ContextSugarPanel} */ (this.getChildAt(i));
    if (child instanceof ydn.crm.sugarcrm.ui.ContextSugarPanel) {
      /**
       * @type {ydn.crm.sugarcrm.model.GDataSugar}
       */
      var sugar = child.getModel();
      if (sugar.isLogin()) {
        if (ydn.crm.ui.SugarListPanel.DEBUG) {
          window.console.log('updating for new gmail thread');
        }
        child.injectGmailHeaderMenu();
      }
    }
  }
};
