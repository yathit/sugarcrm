/**
 * @fileoverview A group controller with expendable edit panel.
 *
 * In view mode, only group label is displayed with edit button on the right.
 * On edit mode, the panel is expended for viewing and editing all fields.
 */


goog.provide('ydn.crm.su.ui.group.Expander');
goog.require('goog.ui.Dialog');
goog.require('ydn.crm.su.model.Group');
goog.require('ydn.crm.su.ui.group.Group');



/**
 * A group controller with expendable edit panel.
 * @param {ydn.crm.su.model.Group} model
 * @param {goog.dom.DomHelper=} opt_dom
 * @constructor
 * @struct
 * @extends {ydn.crm.su.ui.group.Group}
 */
ydn.crm.su.ui.group.Expander = function(model, opt_dom) {
  goog.base(this, model, opt_dom);
  /**
   * @protected
   * @type {goog.events.KeyHandler}
   */
  this.keyHandler = null;
};
goog.inherits(ydn.crm.su.ui.group.Expander, ydn.crm.su.ui.group.Group);


/**
 * @define {boolean} debug flag.
 */
ydn.crm.su.ui.group.Expander.DEBUG = false;


/**
 * @inheritDoc
 */
ydn.crm.su.ui.group.Expander.prototype.createDom = function() {
  goog.base(this, 'createDom');

  var header = this.getElement().querySelector('.' +
      ydn.crm.su.ui.group.GroupRenderer.CSS_CLASS_HEADER);
  header.classList.add(ydn.crm.su.ui.group.Expander.CSS_CLASS);
  var dom = this.getDomHelper();
  var model = this.getModel();
  // model should not be null, but here make it robust while in DOM creation.
  var ed = model ? model.isGroupValueEditable() : false;
  var tag = ed ? 'input' : 'span';
  var label = dom.createDom(tag,
      ydn.crm.su.ui.group.Expander.CSS_HEADER_LABEL);
  if (ed) {
    label.setAttribute('type', 'text');
    label.setAttribute('placeholder', model.getGroupLabel());
  }
  header.appendChild(label);
  header.appendChild(dom.createDom('span', 'center'));
  var svg = ydn.crm.ui.createSvgIcon('unfold-more');
  var btn = dom.createDom('span', ydn.crm.ui.CSS_CLASS_SVG_BUTTON, svg);
  btn.setAttribute('data-tooltip', 'Edit');
  header.appendChild(btn);
  var content = this.getElement().querySelector('.' +
      ydn.crm.ui.CSS_CLASS_CONTENT);
  //
};


/**
 * @const
 * @type {string}
 */
ydn.crm.su.ui.group.Expander.CSS_CLASS = 'expander';


/**
 * @const
 * @type {string}
 */
ydn.crm.su.ui.group.Expander.CSS_HEADER_LABEL = 'header-label';


/**
 * Hide or show expander.
 * @param {boolean} val
 */
ydn.crm.su.ui.group.Expander.prototype.expand = function(val) {
  var content = this.getElement().querySelector('.' +
      ydn.crm.ui.CSS_CLASS_CONTENT);
  goog.style.setElementShown(content, val);
  var root = this.getElement();
  var label = this.getHeaderLabel();
  var header = root.querySelector('.' +
      ydn.crm.su.ui.group.GroupRenderer.CSS_CLASS_HEADER);
  var btn = header.querySelector(' .' +
      ydn.crm.ui.CSS_CLASS_SVG_BUTTON);
  var svg;
  if (val) {
    root.classList.add('edit');
    if (label.tagName == 'INPUT') {
      this.onLabelChanged();
      label.setAttribute('disabled', 'disabled');
      label.value = 'Edit ' + this.getModel().getGroupName();
    } else {
      label.textContent = 'Edit ' + this.getModel().getGroupName();
    }
    svg = ydn.crm.ui.createSvgIcon('unfold-less');
    header.classList.add('open');
  } else {
    root.classList.remove('edit');
    if (label.tagName == 'INPUT') {
      label.removeAttribute('disabled');
      label.value = this.getModel().getGroupValue();
    } else {
      label.textContent = this.getModel().getGroupValue();
    }
    svg = ydn.crm.ui.createSvgIcon('unfold-more');
    header.classList.remove('open');
  }
  btn.replaceChild(svg, btn.firstElementChild);
};


/**
 * @inheritDoc
 */
ydn.crm.su.ui.group.Expander.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  var btn = this.getElement().querySelector('.' +
      ydn.crm.su.ui.group.GroupRenderer.CSS_CLASS_HEADER + ' .' +
      ydn.crm.ui.CSS_CLASS_SVG_BUTTON);
  this.getHandler().listen(btn, 'click', this.onExpandClick_);
  var input = this.getElement().querySelector('.' +
      ydn.crm.su.ui.group.GroupRenderer.CSS_CLASS_HEADER + ' input');
  if (input) {
    var header = this.getElement().querySelector('.' +
        ydn.crm.su.ui.group.GroupRenderer.CSS_CLASS_HEADER);
    header.classList.add('field-like');
    this.getHandler().listen(input, 'blur', this.onLabelChanged_);
    this.keyHandler = new goog.events.KeyHandler(input);
    this.getHandler().listen(this.keyHandler, goog.events.KeyHandler.EventType.KEY, this.onInputKey_);
  }
};


/**
 * @param {goog.events.KeyEvent} k
 * @private
 */
ydn.crm.su.ui.group.Expander.prototype.onInputKey_ = function(k) {
  if (k.keyCode == goog.events.KeyCodes.ENTER) {
    this.onLabelChanged();
  }
};


/**
 * @param {goog.events.Event} ev
 * @private
 */
ydn.crm.su.ui.group.Expander.prototype.onLabelChanged_ = function(ev) {
  this.onLabelChanged();
};


/**
 * Set group value.
 * @param {string} val
 * @return {Object} return a patch object as result of setting group value.
 * return `null` if no change required.
 * @protected
 */
ydn.crm.su.ui.group.Expander.prototype.setGroupValue = function(val) {
  var model = this.getModel();
  var patch = model.setGroupValue(val);
  if (patch) {
    for (var field_name in patch) {
      if (model.hasField(field_name)) {
        this.simulateEditByField(field_name, patch[field_name]);
      }
    }
  }
  return patch;
};


/**
 * @protected
 */
ydn.crm.su.ui.group.Expander.prototype.onLabelChanged = function() {

  var model = this.getModel();
  var input = this.getElement().querySelector('.' +
      ydn.crm.su.ui.group.GroupRenderer.CSS_CLASS_HEADER + ' input');
  var patch = this.setGroupValue(input.value);
  if (patch) {
    var ce = new ydn.crm.su.ui.events.ChangedEvent(patch, this);
    this.dispatchEvent(ce);
  }
};


/**
 * @param {goog.events.Event} ev
 * @private
 */
ydn.crm.su.ui.group.Expander.prototype.onExpandClick_ = function(ev) {
  this.expand(!this.isExpanded());
};


/**
 * @return {boolean}
 */
ydn.crm.su.ui.group.Expander.prototype.isExpanded = function() {
  var content = this.getElement().querySelector('.' +
      ydn.crm.ui.CSS_CLASS_CONTENT);
  return goog.style.isElementShown(content);
};


/**
 * @protected
 * @return {Element} could be input or span.
 */
ydn.crm.su.ui.group.Expander.prototype.getHeaderLabel = function() {
  return this.getElement().querySelector('.' +
      ydn.crm.su.ui.group.GroupRenderer.CSS_CLASS_HEADER + ' .' +
      ydn.crm.su.ui.group.Expander.CSS_HEADER_LABEL);
};


/**
 * @override
 */
ydn.crm.su.ui.group.Expander.prototype.refresh = function() {
  goog.base(this, 'refresh');
  var label = this.getHeaderLabel();
  var value = this.isExpanded() ? 'Edit name' : this.getModel().getGroupValue();
  if (label.tagName == 'INPUT') {
    label.value = value;
  } else {
    label.textContent = value;
  }
};


/**
 * @override
 */
ydn.crm.su.ui.group.Expander.prototype.reset = function() {
  goog.base(this, 'reset');
  this.expand(false);
  var label = this.getHeaderLabel();
  label.setAttribute('data-tooltip', this.getModel().getGroupName());
};


/**
 * @override
 */
ydn.crm.su.ui.group.Expander.prototype.disposeInternal = function() {
  if (this.keyHandler) {
    this.keyHandler.dispose();
    this.keyHandler = null;
  }
  ydn.crm.su.ui.group.Expander.base(this, 'disposeInternal');
};

