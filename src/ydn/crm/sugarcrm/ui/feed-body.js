/**
 * @fileoverview Feed panel show relevant record from the SugarCRM relative to
 * current gmail inbox contact.
 *
 * This panel two components: Header and Body.
 */


goog.provide('ydn.crm.sugarcrm.ui.FeedBody');
goog.require('goog.ui.Component');
goog.require('ydn.crm.sugarcrm.ui.record.Record');



/**
 * Contact sidebar panel.
 * @param {ydn.crm.sugarcrm.model.GDataSugar} model
 * @param {goog.dom.DomHelper} dom
 * @constructor
 * @struct
 * @extends {goog.ui.Component}
 * @suppress {checkStructDictInheritance} suppress closure-library code.
 */
ydn.crm.sugarcrm.ui.FeedBody = function(model, dom) {
  goog.base(this, dom);
  this.setModel(model);
  /**
   * Object pool for module panels.
   * @final
   * @type {Array.<!ydn.crm.sugarcrm.ui.record.Record>}
   */
  this.panel_pool = [];
};
goog.inherits(ydn.crm.sugarcrm.ui.FeedBody, goog.ui.Component);


/**
 * @define {boolean} debug flag.
 */
ydn.crm.sugarcrm.ui.FeedBody.DEBUG = false;


/**
 * @return {!ydn.crm.sugarcrm.model.GDataSugar}
 * @override
 */
ydn.crm.sugarcrm.ui.FeedBody.prototype.getModel;


/**
 * @const
 * @type {string}
 */
ydn.crm.sugarcrm.ui.FeedBody.CSS_CLASS = 'feed-panel';


/** @return {string} */
ydn.crm.sugarcrm.ui.FeedBody.prototype.getCssClass = function() {
  return ydn.crm.sugarcrm.ui.FeedBody.CSS_CLASS;
};


/**
 * @override
 */
ydn.crm.sugarcrm.ui.FeedBody.prototype.getContentElement = function() {
  return goog.dom.getElementByClass(ydn.crm.sugarcrm.ui.FeedBody.CSS_CLASS_CONTENT,
      this.getElement());
};


/**
 * @const
 * @type {string}
 */
ydn.crm.sugarcrm.ui.FeedBody.CSS_CLASS_HEADER = 'feed-header';


/**
 * @const
 * @type {string}
 */
ydn.crm.sugarcrm.ui.FeedBody.CSS_CLASS_CONTENT = 'feed-body';


/**
 * Obtain a free module panel form object pool.
 * @param {ydn.crm.sugarcrm.ModuleName} type panel type or module name.
 * @return {!ydn.crm.sugarcrm.ui.record.Record}
 */
ydn.crm.sugarcrm.ui.FeedBody.prototype.popPanel = function(type) {
  for (var i = 0; i < this.panel_pool.length; i++) {
    var panel = this.panel_pool[i];
    if (panel.getModuleName() == type) {
      goog.array.removeAt(this.panel_pool, i);
      return panel;
    }
  }
  /**
   * @type {ydn.crm.sugarcrm.model.GDataSugar}
   */
  var sugar = this.getModel();
  var r = new ydn.crm.sugarcrm.Record(sugar.getDomain(), type);
  var m = new ydn.crm.sugarcrm.model.Record(sugar, r);
  return new ydn.crm.sugarcrm.ui.record.Record(m, this.getDomHelper());
};


/**
 * Get SugarCRM record id that is related to gmail context thread.
 * @return {!Array.<{ydn.crm.sugarcrm.ModuleName: string, id: string}>}
 */
ydn.crm.sugarcrm.ui.FeedBody.prototype.getContexts = function() {
  var contexts = [];
  for (var i = 0; i < this.getChildCount(); i++) {
    var child = /** @type {ydn.crm.sugarcrm.ui.record.Record} */ (this.getChildAt(i));
    /**
     * @type {ydn.crm.sugarcrm.model.GDataRecord}
     */
    var model = child.getModel();
    if (model.hasRecord()) {
      contexts.push({
        module: model.getModuleName(),
        id: model.getId()
      });
    }
  }
  return contexts;
};


/**
 * Free panel if no longer use.
 * @param {ydn.crm.sugarcrm.ui.record.Record} panel
 */
ydn.crm.sugarcrm.ui.FeedBody.prototype.freePanel = function(panel) {
  if (panel) {
    this.panel_pool.push(panel);
  }
};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.ui.FeedBody.prototype.createDom = function() {
  goog.base(this, 'createDom');
  var root = this.getElement();
  var model = /** @type {ydn.crm.sugarcrm.model.GDataSugar} */ (this.getModel());
  var dom = this.getDomHelper();
  var ele_header = dom.createDom('div', ydn.crm.sugarcrm.ui.FeedBody.CSS_CLASS_HEADER);
  var ele_content = dom.createDom('div', ydn.crm.sugarcrm.ui.FeedBody.CSS_CLASS_CONTENT);
  root.appendChild(ele_header);
  root.appendChild(ele_content);

  var title = dom.createDom('div', 'feed-title');
  ele_header.appendChild(title);

  for (var i = 0; i < ydn.crm.sugarcrm.PANEL_MODULES.length; i++) {
    var name = ydn.crm.sugarcrm.PANEL_MODULES[i];
    var panel = this.popPanel(name);
    this.addChild(panel, true);
  }
  goog.style.setElementShown(this.getElement(), false);
};


/**
 * Change contact model when inbox changes.
 * @param {?string} email
 * @param {?string} name
 */
ydn.crm.sugarcrm.ui.FeedBody.prototype.update = function(email, name) {

  goog.style.setElementShown(this.getElement(), !!email);
  /**
   * @type {ydn.crm.sugarcrm.model.GDataSugar}
   */
  var model = this.getModel();
  model.update(email, name);
};
