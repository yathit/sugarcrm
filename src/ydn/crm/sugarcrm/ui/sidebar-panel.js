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

