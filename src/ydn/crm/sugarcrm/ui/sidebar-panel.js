/**
 * @fileoverview Contact sidebar panel.
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */


goog.provide('ydn.crm.ui.SidebarPanel');
goog.require('goog.ui.Component');
goog.require('ydn.crm.sugarcrm.ui.SugarPanel');



/**
 * Contact sidebar panel.
 * @param {goog.dom.DomHelper=} opt_dom
 * @constructor
 * @struct
 * @extends {goog.ui.Component}
 * @suppress {checkStructDictInheritance} suppress closure-library code.
 */
ydn.crm.ui.SidebarPanel = function(opt_dom) {
  goog.base(this, opt_dom);
};
goog.inherits(ydn.crm.ui.SidebarPanel, goog.ui.Component);


/**
 * @define {boolean} debug flag.
 */
ydn.crm.ui.SidebarPanel.DEBUG = false;


/**
 * @protected
 * @type {goog.log.Logger}
 */
ydn.crm.ui.SidebarPanel.prototype.logger =
    goog.log.getLogger('ydn.crm.ui.SidebarPanel');


/**
 * @const
 * @type {string}
 */
ydn.crm.ui.SidebarPanel.CSS_CLASS = 'sidebar';


/**
 * @const
 * @type {string}
 */
ydn.crm.ui.SidebarPanel.CSS_CLASS_SUGAR_SETUP_LINK = 'sugarcrm-link';


/**
 * @const
 * @type {string}
 */
ydn.crm.ui.SidebarPanel.CSS_CLASS_NO_SUGAR_PANEL = 'no-sugar-panel';


/** @return {string} */
ydn.crm.ui.SidebarPanel.prototype.getCssClass = function() {
  return ydn.crm.ui.SugarWrapperPanel.CSS_CLASS;
};


/**
 * @inheritDoc
 */
ydn.crm.ui.SidebarPanel.prototype.createDom = function() {
  goog.base(this, 'createDom');
  var root = this.getElement();
  var dom = this.getDomHelper();
  root.classList.add(this.getCssClass());
  var header = dom.createDom('div', ydn.crm.ui.CSS_CLASS_HEAD);
  var content = dom.createDom('div', ydn.crm.ui.CSS_CLASS_CONTENT);
  root.appendChild(header);
  root.appendChild(content);

  // render header

  var no_sugar_login = dom.createDom('div',
      ydn.crm.ui.SidebarPanel.CSS_CLASS_NO_SUGAR_PANEL);
  var a = dom.createElement('a');
  a.textContent = 'Setup SugarCRM';
  a.href = chrome.extension.getURL(ydn.crm.base.SETUP_PAGE) + '#modal';
  a.className = ydn.crm.ui.SidebarPanel.CSS_CLASS_SUGAR_SETUP_LINK + ' maia-button blue';
  a.setAttribute('data-window-height', '600');
  a.setAttribute('data-window-width', '800');
  no_sugar_login.appendChild(a);
  goog.style.setElementShown(no_sugar_login, false);

  header.appendChild(no_sugar_login);
};


/**
 * @inheritDoc
 */
ydn.crm.ui.SidebarPanel.prototype.getContentElement = function() {
  return this.getElement().querySelector('.' + ydn.crm.ui.CSS_CLASS_CONTENT);
};


/**
 * @return {Element}
 */
ydn.crm.ui.SidebarPanel.prototype.getHeaderElement = function() {
  return this.getElement().querySelector('.' + ydn.crm.ui.CSS_CLASS_HEAD);
};


/**
 * @inheritDoc
 */
ydn.crm.ui.SidebarPanel.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  var handler = this.getHandler();

  var a_grant = this.getHeaderElement().querySelector('a.' +
      ydn.crm.ui.SugarWrapperPanel.CSS_CLASS_SUGAR_SETUP_LINK);
  handler.listen(a_grant, 'click', ydn.ui.openPageAsDialog, true);
};


/**
 * @return {?ydn.crm.sugarcrm.ui.SugarPanel}
 * @protected
 */
ydn.crm.ui.SidebarPanel.prototype.getSugarCrmPanel = function() {
  return /** @type {ydn.crm.sugarcrm.ui.SugarPanel} */ (this.getChildAt(0)) || null;
};


/**
 * Set SugarCRM.
 * @param {?SugarCrm.About} about
 */
ydn.crm.ui.SidebarPanel.prototype.setSugarCrm = function(about) {
  var link_panel = this.getHeaderElement().querySelector('.' + ydn.crm.ui.SugarWrapperPanel.CSS_CLASS_NO_SUGAR_PANEL);
  var q = link_panel.querySelector('a');
  var panel = this.getSugarCrmPanel();
  if (!about || !about.isLogin) {
    goog.style.setElementShown(link_panel, true);
    if (panel) {
      goog.style.setElementShown(panel.getElement(), false);
    }
    return;
  }
  if (panel) {
    var model = panel.getModel();
    if (model.getDomain() == about.domain) {
      goog.log.finer(this.logger, 'sugar panel ' + model.getDomain() + ' already exists.');
      return;
    }
    goog.log.fine(this.logger, 'disposing sugar panel ' + model.getDomain());
    this.removeChild(panel, true);
    model.dispose();
    panel.dispose();
  }
  var ch = ydn.msg.getChannel(ydn.msg.Group.SUGAR, about.domain);
  var us = ydn.crm.ui.UserSetting.getInstance();

  ch.send(ydn.crm.Ch.SReq.DETAILS).addCallback(function(x) {
    panel = this.getSugarCrmPanel();
    if (panel) {
      goog.log.fine(this.logger, 'existing sugar panel detect');
      return;
    }
    var details = /** @type {SugarCrm.Details} */ (x);
    for (var i = 0; i < details.modulesInfo.length; i++) {
      us.fixSugarCrmModuleMeta(details.modulesInfo[i]);
    }
    var ac = us.getLoginEmail();
    var sugar = new ydn.crm.sugarcrm.model.GDataSugar(details.about,
        details.modulesInfo, ac, details.serverInfo);
    panel = new ydn.crm.sugarcrm.ui.SugarPanel(sugar, this.dom_);
    goog.log.fine(this.logger, 'sugar panel ' + about.domain + ' added.');
    this.addChild(panel, true);
    goog.style.setElementShown(link_panel, false);
  }, this);

};


/**
 * @param {boolean} val
 */
ydn.crm.ui.SidebarPanel.prototype.setVisible = function(val) {
  goog.style.setElementShown(this.getElement(), val);
};




