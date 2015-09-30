/**
 * @fileoverview Manage creating new record and conversion of record type.
 *
 */


goog.provide('ydn.crm.su.ui.ModuleManager');
goog.require('goog.events.KeyHandler');
goog.require('goog.style');
goog.require('goog.ui.Component');
goog.require('ydn.crm.base');
goog.require('ydn.crm.su');



/**
 * Contact sidebar panel.
 * @param {goog.dom.DomHelper} dom
 * @param {ydn.crm.su.model.Sugar} model
 * @constructor
 * @struct
 * @extends {goog.ui.Component}
 */
ydn.crm.su.ui.ModuleManager = function(dom, model) {
  goog.base(this, dom);
  this.setModel(model);
};
goog.inherits(ydn.crm.su.ui.ModuleManager, goog.ui.Component);


/**
 * @define {boolean} debug flag.
 */
ydn.crm.su.ui.ModuleManager.DEBUG = false;


/**
 * @protected
 * @type {goog.debug.Logger}
 */
ydn.crm.su.ui.ModuleManager.prototype.logger =
    goog.log.getLogger('ydn.crm.su.ui.ModuleManager');


/**
 * @return {ydn.crm.su.model.Sugar}
 * @override
 */
ydn.crm.su.ui.ModuleManager.prototype.getModel;


/**
 * @const
 * @type {string}
 */
ydn.crm.su.ui.ModuleManager.CSS_CLASS = 'record-manager';


/**
 * @const
 * @type {string}
 */
ydn.crm.su.ui.ModuleManager.CSS_CLASS_HEAD = 'head';


/**
 * @const
 * @type {string}
 */
ydn.crm.su.ui.ModuleManager.CSS_CLASS_CONTENT = 'content';


/** @return {string} */
ydn.crm.su.ui.ModuleManager.prototype.getCssClass = function() {
  return ydn.crm.su.ui.ModuleManager.CSS_CLASS;
};


/**
 * @inheritDoc
 */
ydn.crm.su.ui.ModuleManager.prototype.getContentElement = function() {
  return this.getElement().querySelector('.' + ydn.crm.su.ui.ModuleManager.CSS_CLASS_CONTENT);
};


/**
 * @inheritDoc
 */
ydn.crm.su.ui.ModuleManager.prototype.createDom = function() {
  goog.base(this, 'createDom');
  var root = this.getElement();
  /**
   * @type {ydn.crm.su.model.Sugar}
   */
  var model = this.getModel();
  var dom = this.getDomHelper();
  goog.dom.classes.add(root, this.getCssClass());
  var head = dom.createDom('div', ydn.crm.su.ui.ModuleManager.CSS_CLASS_HEAD);
  var content = dom.createDom('div', ydn.crm.su.ui.ModuleManager.CSS_CLASS_CONTENT);
  root.appendChild(head);
  root.appendChild(content);

  var search = new ydn.crm.su.ui.SearchPanel(dom, model);
  this.addChild(search, true);
};


/**
 * @inheritDoc
 */
ydn.crm.su.ui.ModuleManager.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  var root = this.getElement();
  var handler = this.getHandler();



};


/**
 * @return {string}
 */
ydn.crm.su.ui.ModuleManager.prototype.getDomain = function() {
  return this.getModel().getDomain();
};


