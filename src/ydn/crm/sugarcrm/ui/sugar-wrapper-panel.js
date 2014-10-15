/**
 * @fileoverview Wrap a sugarcrm panel.
 *
 * If no sugarcrm available, 'Setup SugarCRM'
 * link is shown to bring Setup wizard. If no login or invalid login, panel
 * is hide.
 * 
 * The only different with ydn.crm.ui.SugarListPanel is this keep only one
 * sugarcrm panel.
 */


goog.provide('ydn.crm.ui.SugarWrapperPanel');
goog.require('goog.Timer');
goog.require('goog.async.DeferredList');
goog.require('goog.dom.classes');
goog.require('goog.log');
goog.require('goog.ui.Component');
goog.require('ydn.crm.Ch');
goog.require('ydn.crm.inj.Context');
goog.require('ydn.crm.inj.Task');
goog.require('ydn.crm.msg.Manager');
goog.require('ydn.crm.msg.StatusBar');
goog.require('ydn.crm.sugarcrm.ui.SimpleSugarPanel');
goog.require('ydn.crm.ui.UserSetting');
goog.require('ydn.gdata.m8.ContactEntry');
goog.require('ydn.msg.Message');



/**
 * A of SugarCRM panel wrapper.
 * @param {goog.dom.DomHelper=} opt_dom
 * @constructor
 * @struct
 * @extends {goog.ui.Component}
 * @suppress {checkStructDictInheritance} suppress closure-library code.
 * @see ydn.crm.ui.SugarListPanel
 */
ydn.crm.ui.SugarWrapperPanel = function(opt_dom) {
  goog.base(this, opt_dom);

};
goog.inherits(ydn.crm.ui.SugarWrapperPanel, goog.ui.Component);


/**
 * @define {boolean} debug flag.
 */
ydn.crm.ui.SugarWrapperPanel.DEBUG = false;


/**
 * @const
 * @type {string}
 */
ydn.crm.ui.SugarWrapperPanel.CSS_CLASS = 'sidebar';


/**
 * @const
 * @type {string}
 */
ydn.crm.ui.SugarWrapperPanel.CSS_CLASS_STATUS = 'sidebar-status';


/**
 * @const
 * @type {string}
 */
ydn.crm.ui.SugarWrapperPanel.CSS_CLASS_SUGAR_SETUP_LINK = 'sugarcrm-link';


/**
 * @const
 * @type {string}
 */
ydn.crm.ui.SugarWrapperPanel.CSS_CLASS_NO_SUGAR_PANEL = 'no-sugar-panel';


/** @return {string} */
ydn.crm.ui.SugarWrapperPanel.prototype.getCssClass = function() {
  return ydn.crm.ui.SugarWrapperPanel.CSS_CLASS;
};


/**
 * @inheritDoc
 */
ydn.crm.ui.SugarWrapperPanel.prototype.createDom = function() {
  goog.base(this, 'createDom');
  var root = this.getElement();
  var dom = this.getDomHelper();
  root.classList.add(this.getCssClass());
  var header = dom.createDom('div', ydn.crm.ui.CSS_CLASS_HEAD);
  var content = dom.createDom('div', ydn.crm.ui.CSS_CLASS_CONTENT);
  root.appendChild(header);
  root.appendChild(content);

  // render header

  var no_sugar_login = dom.createDom('div', ydn.crm.ui.SugarWrapperPanel.CSS_CLASS_NO_SUGAR_PANEL);
  var a = dom.createElement('a');
  a.textContent = 'Setup SugarCRM';
  a.href = chrome.extension.getURL(ydn.crm.base.SETUP_PAGE) + '#modal';
  a.className = ydn.crm.ui.SugarWrapperPanel.CSS_CLASS_SUGAR_SETUP_LINK + ' maia-button blue';
  a.setAttribute('data-window-height', '600');
  a.setAttribute('data-window-width', '800');
  no_sugar_login.appendChild(a);
  goog.style.setElementShown(no_sugar_login, false);

  header.appendChild(no_sugar_login);
};


/**
 * @inheritDoc
 */
ydn.crm.ui.SugarWrapperPanel.prototype.getContentElement = function() {
  return this.getElement().querySelector('.' + ydn.crm.ui.CSS_CLASS_CONTENT);
};


/**
 * @return {Element}
 */
ydn.crm.ui.SugarWrapperPanel.prototype.getHeaderElement = function() {
  return this.getElement().querySelector('.' + ydn.crm.ui.CSS_CLASS_HEAD);
};


/**
 * @inheritDoc
 */
ydn.crm.ui.SugarWrapperPanel.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  var handler = this.getHandler();

  var a_grant = this.getHeaderElement().querySelector('a.' +
      ydn.crm.ui.SugarWrapperPanel.CSS_CLASS_SUGAR_SETUP_LINK);
  handler.listen(a_grant, 'click', ydn.ui.openPageAsDialog, true);
};


/**
 * Update header panel.
 */
ydn.crm.ui.SugarWrapperPanel.prototype.updateHeader = function() {


  var us = /** @type {ydn.crm.ui.UserSetting} */ (ydn.crm.ui.UserSetting.getInstance());
  if (us.isLogin()) {
    goog.style.setElementShown(this.getContentElement(), true);
  } else {
    goog.style.setElementShown(this.getContentElement(), false);
  }

};


/**
 * @protected
 * @type {goog.log.Logger}
 */
ydn.crm.ui.SugarWrapperPanel.prototype.logger =
    goog.log.getLogger('ydn.crm.ui.SugarWrapperPanel');


/**
 * Initialize sugar instance panel.
 * @param {string} name
 * @private
 * @return {!goog.async.Deferred}
 */
ydn.crm.ui.SugarWrapperPanel.prototype.validateSugarPanels_ = function(name) {

  var ch = ydn.msg.getChannel(ydn.msg.Group.SUGAR, name);
  var df = ch.send(ydn.crm.Ch.SReq.DETAILS);
  var us = ydn.crm.ui.UserSetting.getInstance();

  return df.addCallback(function(x) {
    var details = /** @type {SugarCrm.Details} */ (x);
    for (var i = 0; i < details.modulesInfo.length; i++) {
      us.fixSugarCrmModuleMeta(details.modulesInfo[i]);
    }
    var ac = us.getLoginEmail();
    var sugar = new ydn.crm.sugarcrm.model.GDataSugar(details.about,
        details.modulesInfo, ac, details.serverInfo);
    if (!this.hasSugarPanel(name)) {
      // remove other sugars panel
      for (var j = 0; j < this.getChildCount(); j++) {
        var panel = /** @type {ydn.crm.sugarcrm.ui.SimpleSugarPanel} */ (
            this.removeChildAt(j, true));
        panel.dispose();
        var model = panel.getModel();
        model.dispose();
      }
      this.addSugarPanel(sugar);
    } else if (ydn.crm.ui.SugarWrapperPanel.DEBUG) {
      window.console.log('sugar panel ' + name + ' already exists.');
    }
  }, this);
};


/**
 * Add sugarcrm panel as child component.
 * @param {ydn.crm.sugarcrm.model.GDataSugar} sugar
 * @protected
 */
ydn.crm.ui.SugarWrapperPanel.prototype.addSugarPanel = function(sugar) {
  var panel = new ydn.crm.sugarcrm.ui.SimpleSugarPanel(sugar, this.dom_);
  this.addChild(panel, true);
  if (ydn.crm.ui.SugarWrapperPanel.DEBUG) {
    window.console.info('simple sugar panel ' + sugar.getDomain() + ' created, now ' +
        this.getChildCount() + ' panels');
  }
};


/**
 * Get active sugarcrm model.
 */
ydn.crm.ui.SugarWrapperPanel.prototype.getSugarModelClone = function() {
  for (var i = 0; i < this.getChildCount(); i++) {
    var ch = this.getChildAt(i);
    if (ch instanceof ydn.crm.sugarcrm.ui.SimpleSugarPanel) {
      var model = this.getModel();
      if (model.isLogin()) {
        return model.clone();
      }
    }
  }
  return null;
};


/**
 * Check existence of sugarcrm instance on the panel.
 * @param {string} name domain name
 * @return {boolean}
 */
ydn.crm.ui.SugarWrapperPanel.prototype.hasSugarPanel = function(name) {
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
ydn.crm.ui.SugarWrapperPanel.prototype.updateSugarPanels = function(sugars) {
  goog.asserts.assertArray(sugars, 'sugar domains');
  var link_panel = this.getHeaderElement().querySelector('.' + ydn.crm.ui.SugarWrapperPanel.CSS_CLASS_NO_SUGAR_PANEL);
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
      dfs.push(this.validateSugarPanels_(sugars[i]));
    }
  }
  return goog.async.DeferredList.gatherResults(dfs);
};


/**
 * Get current contact showing on sidebar of gmail.
 * @return {ydn.crm.inj.Context}
 * @override
 */
ydn.crm.ui.SugarWrapperPanel.prototype.getModel;


/**
 * Show or hide this panel.
 * @param {boolean} val
 */
ydn.crm.ui.SugarWrapperPanel.prototype.setVisible = function(val) {
  goog.style.setElementShown(this.getElement(), val);
};



