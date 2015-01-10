/**
 * @fileoverview A group controller with expendable edit panel.
 *
 * In view mode, only group label is displayed with edit button on the right.
 * On edit mode, the panel is expended for viewing and editing all fields.
 */


goog.provide('ydn.crm.sugarcrm.ui.group.Expander');
goog.require('goog.ui.Dialog');
goog.require('ydn.crm.sugarcrm.model.Group');
goog.require('ydn.crm.sugarcrm.ui.group.Group');



/**
 * A group controller with expendable edit panel.
 * @param {ydn.crm.sugarcrm.model.Group} model
 * @param {goog.dom.DomHelper=} opt_dom
 * @constructor
 * @struct
 * @extends {ydn.crm.sugarcrm.ui.group.Group}
 */
ydn.crm.sugarcrm.ui.group.Expander = function(model, opt_dom) {
  goog.base(this, model, opt_dom);
};
goog.inherits(ydn.crm.sugarcrm.ui.group.Expander, ydn.crm.sugarcrm.ui.group.Group);


/**
 * @define {boolean} debug flag.
 */
ydn.crm.sugarcrm.ui.group.Expander.DEBUG = false;


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.ui.group.Expander.prototype.createDom = function() {
  goog.base(this, 'createDom');

  var header = this.getElement().querySelector('.' +
      ydn.crm.sugarcrm.ui.group.GroupRenderer.CSS_CLASS_HEADER);
  header.classList.add(ydn.crm.sugarcrm.ui.group.Expander.CSS_CLASS);
  var dom = this.getDomHelper();
  var label = dom.createDom('span',
      ydn.crm.sugarcrm.ui.group.Expander.CSS_HEADER_LABEL);
  header.appendChild(label);
  header.appendChild(dom.createDom('span', 'center'));
  var svg = ydn.crm.ui.createSvgIcon('pencil');
  var btn = dom.createDom('span', ydn.crm.ui.CSS_CLASS_SVG_BUTTON, svg);
  btn.setAttribute('title', 'Edit');
  header.appendChild(btn);
  var content = this.getElement().querySelector('.' +
      ydn.crm.sugarcrm.ui.group.GroupRenderer.CSS_CLASS_CONTENT);
  //
};


/**
 * @const
 * @type {string}
 */
ydn.crm.sugarcrm.ui.group.Expander.CSS_CLASS = 'expander';


/**
 * @const
 * @type {string}
 */
ydn.crm.sugarcrm.ui.group.Expander.CSS_HEADER_LABEL = 'header-label';


/**
 * Hide or show expander.
 * @param {boolean} val
 */
ydn.crm.sugarcrm.ui.group.Expander.prototype.expand = function(val) {
  var content = this.getElement().querySelector('.' +
      ydn.crm.sugarcrm.ui.group.GroupRenderer.CSS_CLASS_CONTENT);
  goog.style.setElementShown(content, val);
  var label = this.getHeaderLabel();
  if (val) {
    label.textContent = 'Edit name';
  } else {
    label.textContent = this.getModel().getGroupValue();
  }
};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.ui.group.Expander.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  var btn = this.getElement().querySelector('.' +
      ydn.crm.sugarcrm.ui.group.GroupRenderer.CSS_CLASS_HEADER + ' .' +
      ydn.crm.ui.CSS_CLASS_SVG_BUTTON);
  this.getHandler().listen(btn, 'click', this.onExpandClick_);
};


/**
 * @param {goog.events.Event} ev
 * @private
 */
ydn.crm.sugarcrm.ui.group.Expander.prototype.onExpandClick_ = function(ev) {
  this.expand(!this.isExpanded());
};


/**
 * @return {boolean}
 */
ydn.crm.sugarcrm.ui.group.Expander.prototype.isExpanded = function() {
  var content = this.getElement().querySelector('.' +
      ydn.crm.sugarcrm.ui.group.GroupRenderer.CSS_CLASS_CONTENT);
  return goog.style.isElementShown(content);
};


/**
 * @protected
 * @return {Element}
 */
ydn.crm.sugarcrm.ui.group.Expander.prototype.getHeaderLabel = function() {
  return this.getElement().querySelector('.' +
      ydn.crm.sugarcrm.ui.group.GroupRenderer.CSS_CLASS_HEADER + ' .' +
      ydn.crm.sugarcrm.ui.group.Expander.CSS_HEADER_LABEL);
};


/**
 * @override
 */
ydn.crm.sugarcrm.ui.group.Expander.prototype.refresh = function() {
  goog.base(this, 'refresh');
  var label = this.getHeaderLabel();
  if (this.isExpanded()) {
    label.textContent = 'Edit name';
  } else {
    label.textContent = this.getModel().getGroupValue();
  }
};


/**
 * @override
 */
ydn.crm.sugarcrm.ui.group.Expander.prototype.reset = function() {
  goog.base(this, 'reset');
  this.expand(this.isEditMode());
  var label = this.getHeaderLabel();
  label.setAttribute('title', this.getModel().getGroupName());

};
