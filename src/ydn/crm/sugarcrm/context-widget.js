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
 * @fileoverview Context sidebar widget rendered inside context container.
 *
 * The panel show on right side of an email message. Receiving context contact
 * that display on the right bar, this will widget will show relevant
 * information regarding context including, Google gmail contact, SugarCRM
 * contact, lead and social information.
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */


goog.provide('ydn.crm.sugarcrm.ContextWidget');
goog.require('goog.async.Delay');
goog.require('goog.ui.Component');
goog.require('ydn.crm.gmail.ComposeObserver');
goog.require('ydn.crm.gmail.GmailObserver');
goog.require('ydn.crm.gmail.Template');
goog.require('ydn.crm.sugarcrm.model.GDataSugar');
goog.require('ydn.crm.sugarcrm.ui.ContextSugarPanel');
goog.require('ydn.gmail.Utils');



/**
 * Context sidebar widget rendered inside context container.
 * <pre>
 *   var widget = new ydn.crm.sugarcrm.ContextWidget(gob, cob);
 *   widget.render(el);
 * </pre>
 * @param {ydn.crm.gmail.GmailObserver} gmail_observer
 * @param {ydn.crm.gmail.ComposeObserver} observer
 * @param {goog.dom.DomHelper=} opt_dom
 * @constructor
 * @struct
 * @extends {goog.ui.Component}
 * @suppress {checkStructDictInheritance} suppress closure-library code.
 */
ydn.crm.sugarcrm.ContextWidget = function(gmail_observer, observer, opt_dom) {
  goog.base(this, opt_dom);

  /**
   * @type {ydn.crm.gmail.Template}
   * @private
   */
  this.gmail_template_ = null;
  /**
   * @type {ydn.crm.gmail.ComposeObserver}
   * @private
   */
  this.compose_observer_ = observer;

  this.email_list_updator_ = new goog.async.Delay(this.updateEmailDataList,
      500, this);

  this.getHandler().listen(gmail_observer,
      ydn.crm.gmail.GmailObserver.EventType.PAGE_CHANGE,
      this.onGmailPageChanged);

  this.getHandler().listen(gmail_observer,
      ydn.crm.gmail.GmailObserver.EventType.CONTEXT_CHANGE,
      this.onGmailContextEvent_);
};
goog.inherits(ydn.crm.sugarcrm.ContextWidget, goog.ui.Component);


/**
 * Sniff contact and set to model.
 * @param {ydn.crm.gmail.GmailObserver.ContextRightBarEvent} e
 * @private
 */
ydn.crm.sugarcrm.ContextWidget.prototype.onGmailContextEvent_ = function(e) {

  this.updateForNewContact(e.context);

};


/**
 * @define {boolean} debug flag.
 */
ydn.crm.sugarcrm.ContextWidget.DEBUG = false;


/**
 * @type {boolean}
 * @private
 */
ydn.crm.sugarcrm.ContextWidget.prototype.show_toolbar_ = false;


/**
 * @protected
 * @type {goog.log.Logger}
 */
ydn.crm.sugarcrm.ContextWidget.prototype.logger =
    goog.log.getLogger('ydn.crm.sugarcrm.ContextWidget');


/**
 * Element id for all email data list.
 * @const
 * @type {string}
 */
ydn.crm.sugarcrm.ContextWidget.ID_EMAILS = 'all-emails';


/**
 * @const
 * @type {string}
 */
ydn.crm.sugarcrm.ContextWidget.CSS_CLASS_TRAGET = 'target-email';


/**
 * @const
 * @type {string}
 */
ydn.crm.sugarcrm.ContextWidget.CSS_CLASS_SUGAR_SETUP_LINK = 'sugarcrm-link';


/**
 * @const
 * @type {string}
 */
ydn.crm.sugarcrm.ContextWidget.CSS_CLASS_NO_SUGAR_PANEL = 'no-sugar-panel';


/**
 * @const
 * @type {string}
 */
ydn.crm.sugarcrm.ContextWidget.CSS_CLASS = 'context-sidebar';


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.ContextWidget.prototype.createDom = function() {
  goog.base(this, 'createDom');
  // status bar
  var root = this.getElement();
  var dom = this.getDomHelper();
  root.classList.add(ydn.crm.sugarcrm.ContextWidget.CSS_CLASS);
  var header = dom.createDom('div', ydn.crm.ui.CSS_CLASS_HEAD);
  var content = dom.createDom('div', ydn.crm.ui.CSS_CLASS_CONTENT);
  root.appendChild(header);
  root.appendChild(content);

  // render header

  var no_sugar_login = dom.createDom('div',
      ydn.crm.sugarcrm.ContextWidget.CSS_CLASS_NO_SUGAR_PANEL);
  var a = dom.createElement('a');
  a.textContent = 'Setup SugarCRM';
  a.href = chrome.extension.getURL(ydn.crm.base.SETUP_PAGE) + '#modal';
  a.className = ydn.crm.sugarcrm.ContextWidget.CSS_CLASS_SUGAR_SETUP_LINK + ' maia-button blue';
  a.setAttribute('data-window-height', '600');
  a.setAttribute('data-window-width', '800');
  no_sugar_login.appendChild(a);
  goog.style.setElementShown(no_sugar_login, false);

  header.appendChild(no_sugar_login);

  // toolbar
  var toolbar = dom.createDom('div', 'toolbar flex-bar');
  goog.style.setElementShown(toolbar,
      ydn.crm.sugarcrm.ContextWidget.prototype.show_toolbar_);

  var emails_list = dom.createDom('input',
      ydn.crm.sugarcrm.ContextWidget.CSS_CLASS_TRAGET);
  emails_list.setAttribute('list', ydn.crm.sugarcrm.ContextWidget.ID_EMAILS);
  toolbar.appendChild(emails_list);

  var svg_search = ydn.crm.ui.createSvgIcon('search');
  var search = dom.createDom('span', 'search svg-button');
  search.appendChild(svg_search);
  toolbar.appendChild(search);
  header.appendChild(toolbar);

  if (!document.getElementById(ydn.crm.sugarcrm.ContextWidget.ID_EMAILS)) {
    var list = document.createElement('datalist');
    list.id = ydn.crm.sugarcrm.ContextWidget.ID_EMAILS;
    document.body.appendChild(list);
  }
};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.ContextWidget.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  var handler = this.getHandler();
  var head = this.getElement().querySelector('.toolbar');
  var email_input = head.querySelector('input');
  var search = head.querySelector('.search');

  handler.listen(email_input, 'change', this.onSearch);
  handler.listen(search, 'click', this.onSearch);

};


/**
 * @param {ydn.crm.gmail.GmailObserver.PageChangeEvent} e
 */
ydn.crm.sugarcrm.ContextWidget.prototype.onGmailPageChanged = function(e) {
  if (ydn.crm.sugarcrm.ContextWidget.DEBUG) {
    window.console.info(e.page_type);
  }
  if (e.page_type == ydn.gmail.Utils.GmailViewState.EMAIL) {
    this.updateForNewContact(null); // let know, new context is coming.
  }
};


/**
 * @param {goog.events.Event} e
 * @protected
 */
ydn.crm.sugarcrm.ContextWidget.prototype.onSearch = function(e) {
  var target = this.getElement().querySelector('input.' + ydn.crm.sugarcrm.ContextWidget.CSS_CLASS_TRAGET);
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
ydn.crm.sugarcrm.ContextWidget.prototype.updateEmailDataList = function() {
  var emails = ydn.gmail.Utils.sniffAllEmailsInDocument();
  var list = document.getElementById(ydn.crm.sugarcrm.ContextWidget.ID_EMAILS);
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
ydn.crm.sugarcrm.ContextWidget.prototype.disposeInternal = function() {
  this.email_list_updator_.dispose();
  this.email_list_updator_ = null;
  goog.base(this, 'disposeInternal');
};


/**
 * @param {?ydn.crm.sugarcrm.model.GDataSugar} sugar
 */
ydn.crm.sugarcrm.ContextWidget.prototype.setSugarCrm = function(sugar) {

  var ex_panel = this.getSugarPanel_();
  if (ex_panel) {
    var ex_model = ex_panel.getModel();
    if (sugar && ex_model.getDomain() == sugar.getDomain()) {
      return;
    }
    this.removeChild(ex_panel, true);
    ex_panel.dispose();
    ex_model.dispose();
    if (ydn.crm.sugarcrm.ContextWidget.DEBUG) {
      window.console.info('Existing sugar panel disposed.');
    }
    this.gmail_template_.dispose();
    this.gmail_template_ = null;
  }

  if (!sugar) {
    return;
  }

  this.gmail_template_ = new ydn.crm.gmail.Template(sugar);
  this.gmail_template_.setObserver(this.compose_observer_);

  var panel = new ydn.crm.sugarcrm.ui.ContextSugarPanel(sugar, this.dom_);
  this.addChild(panel, true);
  if (ydn.crm.sugarcrm.ContextWidget.DEBUG) {
    window.console.info('context sugar panel ' + sugar.getDomain() +
        ' initialized');
  }

};


/**
 * @return {?ydn.crm.sugarcrm.ui.ContextSugarPanel}
 * @private
 */
ydn.crm.sugarcrm.ContextWidget.prototype.getSugarPanel_ = function() {
  var cn = this.getChildCount();
  for (var i = 0; i < cn; i++) {
    var child = this.getChildAt(i);
    if (child instanceof ydn.crm.sugarcrm.ui.ContextSugarPanel) {
      return /** @type {ydn.crm.sugarcrm.ui.ContextSugarPanel} */ (child);
    }
  }
  return null;
};


/**
 * Update sniff contact data.
 * @param {ydn.crm.inj.Context} cm set `null` to flash out.
 * @protected
 */
ydn.crm.sugarcrm.ContextWidget.prototype.updateForNewContact = function(cm) {

  var child = this.getSugarPanel_();
  if (child) {
    /**
     * @type {ydn.crm.sugarcrm.model.GDataSugar}
     */
    var sugar = child.getModel();
    if (ydn.crm.sugarcrm.ContextWidget.DEBUG) {
      window.console.log('updating new contact', cm);
    }
    sugar.update(cm);
    if (this.show_toolbar_) {
      this.email_list_updator_.start();
    }
  }

};



