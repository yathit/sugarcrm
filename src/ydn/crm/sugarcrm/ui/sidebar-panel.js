/**
 * @fileoverview Contact sidebar panel.
 */


goog.provide('ydn.crm.ui.SidebarPanel');
goog.require('ydn.crm.sugarcrm.ui.SugarPanel');
goog.require('ydn.crm.ui.SugarWrapperPanel');



/**
 * Contact sidebar panel.
 * @param {goog.dom.DomHelper=} opt_dom
 * @constructor
 * @struct
 * @extends {ydn.crm.ui.SugarWrapperPanel}
 */
ydn.crm.ui.SidebarPanel = function(opt_dom) {
  goog.base(this, opt_dom);
};
goog.inherits(ydn.crm.ui.SidebarPanel, ydn.crm.ui.SugarWrapperPanel);


/**
 * @define {boolean} debug flag.
 */
ydn.crm.ui.SidebarPanel.DEBUG = false;


/**
 * @const
 * @type {string}
 */
ydn.crm.ui.SidebarPanel.CSS_CLASS_INVALID_LOGIN_PANEL = 'invalid-login-panel';


/**
 * @const
 * @type {string}
 */
ydn.crm.ui.SidebarPanel.CSS_CLASS_SETUP = 'setup-panel';


/**
 * @protected
 * @type {goog.debug.Logger}
 */
ydn.crm.ui.SidebarPanel.prototype.logger =
    goog.log.getLogger('ydn.crm.ui.SidebarPanel');


/**
 * @inheritDoc
 */
ydn.crm.ui.SidebarPanel.prototype.createDom = function() {
  goog.base(this, 'createDom');
  // status bar
  var dom = this.getDomHelper();
  var root = this.getElement();
  var header = root.querySelector('.' + ydn.crm.ui.CSS_CLASS_HEAD);

  var link_panel = dom.createDom('div', ydn.crm.ui.SidebarPanel.CSS_CLASS_SETUP);
  var a = dom.createElement('a');
  a.textContent = 'Setup';
  a.href = chrome.extension.getURL(ydn.crm.base.SETUP_PAGE) + '#modal';
  a.className = 'maia-button blue';
  a.setAttribute('data-window-height', '600');
  a.setAttribute('data-window-width', '800');
  link_panel.appendChild(a);
  goog.style.setElementShown(link_panel, false);

  var invalid_login = dom.createDom('div', ydn.crm.ui.SidebarPanel.CSS_CLASS_INVALID_LOGIN_PANEL);
  header.appendChild(link_panel);
  header.appendChild(invalid_login);

  var status_el = dom.createDom('div', ydn.crm.ui.SugarWrapperPanel.CSS_CLASS_STATUS);
  var status = new ydn.crm.msg.StatusBar();
  status.render(status_el);
  ydn.crm.msg.Manager.addConsumer(status);
  root.insertBefore(status_el, root.firstElementChild);
};


/**
 * @inheritDoc
 */
ydn.crm.ui.SidebarPanel.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  var handler = this.getHandler();

  var a_grant = this.getHeaderElement().querySelector('div.' +
      ydn.crm.ui.SidebarPanel.CSS_CLASS_SETUP + ' a');
  handler.listen(a_grant, 'click', ydn.ui.openPageAsDialog, true);
};


/**
 * @inheritDoc
 */
ydn.crm.ui.SidebarPanel.prototype.addSugarPanel = function(sugar) {
  var panel = new ydn.crm.sugarcrm.ui.SugarPanel(sugar, this.dom_);
  this.addChild(panel, true);
  if (ydn.crm.ui.SidebarPanel.DEBUG) {
    window.console.info('sugar panel ' + sugar.getDomain() + ' created, now ' +
        this.getChildCount() + ' panels');
  }
};


/**
 * @override
 */
ydn.crm.ui.SidebarPanel.prototype.updateHeader = function() {
  goog.base(this, 'updateHeader');

  var us = /** @type {ydn.crm.ui.UserSetting} */ (ydn.crm.ui.UserSetting.getInstance());
  var setup = this.getHeaderElement().querySelector('.' + ydn.crm.ui.SidebarPanel.CSS_CLASS_SETUP);

  if (us.isLogin()) {
    goog.style.setElementShown(setup, false);
    var msg_panel = this.getHeaderElement().querySelector('.' +
        ydn.crm.ui.SidebarPanel.CSS_CLASS_INVALID_LOGIN_PANEL);

    if (!us.hasValidLogin()) {
      var data = {
        ydn_login: us.getLoginEmail()
      };
      goog.soy.renderElement(msg_panel, templ.ydn.crm.inj.wrongLogin, data);
      goog.style.setElementShown(msg_panel, true);
    } else {
      goog.style.setElementShown(msg_panel, false);
    }
  } else {
    goog.style.setElementShown(setup, true);
  }

};


