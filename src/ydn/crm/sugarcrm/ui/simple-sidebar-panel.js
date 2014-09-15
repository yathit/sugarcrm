/**
 * @fileoverview Contact sidebar panel.
 */


goog.provide('ydn.crm.ui.SimpleSidebarPanel');
goog.require('goog.Timer');
goog.require('goog.async.DeferredList');
goog.require('goog.dom.classes');
goog.require('goog.log');
goog.require('goog.ui.Component');
goog.require('ydn.crm.msg.Manager');
goog.require('ydn.crm.msg.StatusBar');
goog.require('ydn.crm.Ch');
goog.require('ydn.crm.inj.Context');
goog.require('ydn.crm.inj.Task');
goog.require('ydn.crm.ui.UserSetting');
goog.require('ydn.crm.sugarcrm.ui.SimpleSugarPanel');
goog.require('ydn.gdata.m8.ContactEntry');
goog.require('ydn.msg.Message');



/**
 * Contact sidebar panel.
 * @param {goog.dom.DomHelper=} opt_dom
 * @constructor
 * @struct
 * @extends {goog.ui.Component}
 * @suppress {checkStructDictInheritance} suppress closure-library code.
 */
ydn.crm.ui.SimpleSidebarPanel = function(opt_dom) {
  goog.base(this, opt_dom);

  /**
   * @type {ydn.crm.ui.UserSetting}
   */
  this.user_setting = ydn.crm.ui.UserSetting.getInstance();

};
goog.inherits(ydn.crm.ui.SimpleSidebarPanel, goog.ui.Component);


/**
 * @define {boolean} debug flag.
 */
ydn.crm.ui.SimpleSidebarPanel.DEBUG = false;


/**
 * @const
 * @type {string}
 */
ydn.crm.ui.SimpleSidebarPanel.CSS_CLASS = 'sidebar';


/**
 * @const
 * @type {string}
 */
ydn.crm.ui.SimpleSidebarPanel.CSS_CLASS_STATUS = 'sidebar-status';


/**
 * @const
 * @type {string}
 */
ydn.crm.ui.SimpleSidebarPanel.CSS_CLASS_SETUP = 'sugarcrm-link-panel';


/**
 * @const
 * @type {string}
 */
ydn.crm.ui.SimpleSidebarPanel.CSS_CLASS_NO_SUGAR_PANEL = 'no-sugar-panel';


/** @return {string} */
ydn.crm.ui.SimpleSidebarPanel.prototype.getCssClass = function() {
  return ydn.crm.ui.SimpleSidebarPanel.CSS_CLASS;
};


/**
 * @inheritDoc
 */
ydn.crm.ui.SimpleSidebarPanel.prototype.createDom = function() {
  goog.base(this, 'createDom');
  var root = this.getElement();
  var dom = this.getDomHelper();
  root.classList.add(this.getCssClass());
  var header = dom.createDom('div', ydn.crm.ui.CSS_CLASS_HEAD);
  var content = dom.createDom('div', ydn.crm.ui.CSS_CLASS_CONTENT);
  root.appendChild(header);
  root.appendChild(content);

  // render header
  var link_panel = dom.createDom('div', ydn.crm.ui.SimpleSidebarPanel.CSS_CLASS_SETUP);
  var a = dom.createElement('a');
  a.textContent = 'Setup';
  a.href = chrome.extension.getURL(ydn.crm.base.SETUP_PAGE) + '#modal';
  a.className = 'setup-link maia-button blue';
  a.setAttribute('data-window-height', '600');
  a.setAttribute('data-window-width', '800');
  link_panel.appendChild(a);
  goog.style.setElementShown(link_panel, false);

  var no_sugar_login = dom.createDom('div', ydn.crm.ui.SimpleSidebarPanel.CSS_CLASS_NO_SUGAR_PANEL);
  a = dom.createElement('a');
  a.textContent = 'Setup SugarCRM';
  a.href = chrome.extension.getURL(ydn.crm.base.SETUP_PAGE) + '#modal';
  a.className = 'setup-link maia-button blue';
  a.setAttribute('data-window-height', '600');
  a.setAttribute('data-window-width', '800');
  no_sugar_login.appendChild(a);
  goog.style.setElementShown(no_sugar_login, false);

  header.appendChild(link_panel);
  header.appendChild(no_sugar_login);
};


/**
 * @inheritDoc
 */
ydn.crm.ui.SimpleSidebarPanel.prototype.getContentElement = function() {
  return this.getElement().querySelector('.' + ydn.crm.ui.CSS_CLASS_CONTENT);
};


/**
 * @return {Element}
 */
ydn.crm.ui.SimpleSidebarPanel.prototype.getHeaderElement = function() {
  return this.getElement().querySelector('.' + ydn.crm.ui.CSS_CLASS_HEAD);
};


/**
 * @inheritDoc
 */
ydn.crm.ui.SimpleSidebarPanel.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  var handler = this.getHandler();

  var a_grant = this.getHeaderElement().querySelector('a.setup-link');
  handler.listen(a_grant, 'click', ydn.crm.base.openPageAsDialog, true);
};


/**
 * Note: Previously we used to have multi login, but the workflow is not great,
 * because it logout gmail too.
 * @protected
 * @param {Event} e
 */
ydn.crm.ui.SimpleSidebarPanel.prototype.handleMsgPanelClick = function(e) {
  if (e.target.tagName == 'A') {
    e.target.removeAttribute('href'); // so that user cannot click again.
    ydn.msg.getChannel().send(ydn.crm.Ch.Req.LOGGED_OUT);
    ydn.crm.base.openPageAsDialog(e);
  }
};


/**
 * Update header panel.
 */
ydn.crm.ui.SimpleSidebarPanel.prototype.updateHeader = function() {

  var setup = this.getHeaderElement().querySelector('.' + ydn.crm.ui.SimpleSidebarPanel.CSS_CLASS_SETUP);

  var us = /** @type {ydn.crm.ui.UserSetting} */ (ydn.crm.ui.UserSetting.getInstance());
  if (us.isLogin()) {
    goog.style.setElementShown(this.getContentElement(), true);
    goog.style.setElementShown(setup, false);
  } else {
    goog.style.setElementShown(this.getContentElement(), false);
    goog.style.setElementShown(setup, true);
  }

};


/**
 * @protected
 * @type {goog.debug.Logger}
 */
ydn.crm.ui.SimpleSidebarPanel.prototype.logger =
    goog.log.getLogger('ydn.crm.ui.SimpleSidebarPanel');


/**
 * Initialize sugar instance panel.
 * @param {string} name
 * @private
 * @return {!goog.async.Deferred}
 */
ydn.crm.ui.SimpleSidebarPanel.prototype.initSugar_ = function(name) {

  var ch = ydn.msg.getChannel(ydn.msg.Group.SUGAR, name);
  var df = ch.send(ydn.crm.Ch.SReq.DETAILS);

  return df.addCallback(function(x) {
    var details = /** @type {SugarCrm.Details} */ (x);
    for (var i = 0; i < details.modulesInfo.length; i++) {
      this.user_setting.fixSugarCrmModuleMeta(details.modulesInfo[i]);
    }
    var ac = this.user_setting.getLoginEmail();
    var sugar = new ydn.crm.sugarcrm.model.GDataSugar(details.about,
        details.modulesInfo, ac, details.serverInfo);
    if (!this.hasSugarPanel(name)) {
      this.addSugarPanel(sugar);
    } else if (ydn.crm.ui.SimpleSidebarPanel.DEBUG) {
      window.console.log('sugar panel ' + name + ' already exists.');
    }
  }, this);
};


/**
 * Add sugarcrm panel as child component.
 * @param {ydn.crm.sugarcrm.model.GDataSugar} sugar
 * @protected
 */
ydn.crm.ui.SimpleSidebarPanel.prototype.addSugarPanel = function(sugar) {
  var panel = new ydn.crm.sugarcrm.ui.SimpleSugarPanel(sugar, this.dom_);
  this.addChild(panel, true);
  if (ydn.crm.ui.SimpleSidebarPanel.DEBUG) {
    window.console.info('simple sugar panel ' + sugar.getDomain() + ' created, now ' +
        this.getChildCount() + ' panels');
  }
};


/**
 * Check existance of sugarcrm instance on the panel.
 * @param {string} name domain name
 * @return {boolean}
 */
ydn.crm.ui.SimpleSidebarPanel.prototype.hasSugarPanel = function(name) {
  for (var i = 0; i < this.getChildCount(); i++) {
    var ch = this.getChildAt(i);
    if (ch instanceof ydn.crm.sugarcrm.ui.SimpleSugarPanel) {
      if (ch.getDomainName() == name) {
        return true;
      }
    }
  }
  return false;
};


/**
 * Prepare sugar panels, if valid login.
 * @param {Array.<string>} sugars list of sugar domain.
 * @return {!goog.async.Deferred}
 */
ydn.crm.ui.SimpleSidebarPanel.prototype.updateSugarPanels = function(sugars) {
  goog.asserts.assertArray(sugars, 'sugar domains');
  var link_panel = this.getHeaderElement().querySelector('.' + ydn.crm.ui.SimpleSidebarPanel.CSS_CLASS_NO_SUGAR_PANEL);
  var q = link_panel.querySelector('a');
  if (!ydn.crm.ui.UserSetting.getInstance().isLogin()) {
    goog.style.setElementShown(link_panel, false);
    return goog.async.Deferred.succeed(false);
  }
  if (sugars.length == 0) {
    goog.style.setElementShown(link_panel, true);
  } else {
    goog.style.setElementShown(link_panel, false);
  }
  var dfs = [];
  for (var i = this.getChildCount() - 1; i > 0; i--) {
    var ch = this.getChildAt(i);
    if (ch instanceof ydn.crm.sugarcrm.ui.SimpleSugarPanel) {
      var domain = ch.getModel().getDomain();
      var has_it = sugars.indexOf(domain) >= 0;
      if (!has_it) {
        this.logger.fine('disposing sugar panel ' + ch.getDomainName());
        ch.getModel().dispose();
        this.removeChild(ch, true);
        ch.dispose();
      }
    }
  }
  for (var i = 0; i < sugars.length; i++) {
    goog.asserts.assertString(sugars[i], 'sugar domain must be a string');
    if (!this.hasSugarPanel(sugars[i])) {
      this.logger.fine('adding sugar panel ' + sugars[i]);
      dfs.push(this.initSugar_(sugars[i]));
    }
  }
  return goog.async.DeferredList.gatherResults(dfs);
};


/**
 * Get current contact showing on sidebar of gmail.
 * @return {ydn.crm.inj.Context}
 * @override
 */
ydn.crm.ui.SimpleSidebarPanel.prototype.getModel;


/**
 * Show or hide this panel.
 * @param {boolean} val
 */
ydn.crm.ui.SimpleSidebarPanel.prototype.setVisible = function(val) {
  goog.style.setElementShown(this.getElement(), val);
};



