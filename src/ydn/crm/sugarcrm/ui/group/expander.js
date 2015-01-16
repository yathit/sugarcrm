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
  /**
   * Patch object on edit.
   * @protected
   * @type {?Object}
   */
  this.patches = null;
  /**
   * @protected
   * @type {goog.events.KeyHandler}
   */
  this.keyHandler = null;
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
  var model = this.getModel();
  // model should not be null, but here make it robust while in DOM creation.
  var ed = model ? model.isGroupValueEditable() : false;
  var tag = ed ? 'input' : 'span';
  var label = dom.createDom(tag,
      ydn.crm.sugarcrm.ui.group.Expander.CSS_HEADER_LABEL);
  if (ed) {
    label.setAttribute('type', 'text');
  }
  header.appendChild(label);
  header.appendChild(dom.createDom('span', 'center'));
  var svg = ydn.crm.ui.createSvgIcon('create');
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
  var root = this.getElement();
  var label = this.getHeaderLabel();
  if (val) {
    root.classList.add('edit');
    if (label.tagName == 'INPUT') {
      label.setAttribute('disabled', 'disabled');
    } else {
      label.textContent = 'Edit ' + this.getModel().getGroupName();
    }
  } else {
    root.classList.remove('edit');
    if (label.tagName == 'INPUT') {
      label.removeAttribute('disabled');
    } else {
      label.textContent = this.getModel().getGroupValue();
    }
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
  var input = this.getElement().querySelector('.' +
      ydn.crm.sugarcrm.ui.group.GroupRenderer.CSS_CLASS_HEADER + ' input');
  if (input) {
    var header = this.getElement().querySelector('.' +
        ydn.crm.sugarcrm.ui.group.GroupRenderer.CSS_CLASS_HEADER);
    header.classList.add('field-like');
    this.getHandler().listen(input, 'blur', this.onLabelChanged);
    this.keyHandler = new goog.events.KeyHandler(input);
    this.getHandler().listen(this.keyHandler, goog.events.KeyHandler.EventType.KEY, this.onInputKey_);
  }
};


/**
 * @param {goog.events.KeyEvent} k
 * @private
 */
ydn.crm.sugarcrm.ui.group.Expander.prototype.onInputKey_ = function(k) {
  if (k.keyCode == goog.events.KeyCodes.ENTER) {
    this.onLabelChanged(k);
  }
};


/**
 * @param {goog.events.Event} ev
 * @protected
 */
ydn.crm.sugarcrm.ui.group.Expander.prototype.onLabelChanged = function(ev) {

  var model = this.getModel();
  var input = this.getElement().querySelector('.' +
      ydn.crm.sugarcrm.ui.group.GroupRenderer.CSS_CLASS_HEADER + ' input');
  var patch = model.setGroupValue(input.value);
  if (patch) {
    var ce = new ydn.crm.sugarcrm.ui.events.ChangedEvent(patch, this);
    this.dispatchEvent(ce);
    if (!ce.defaultPrevented) {
      if (!this.patches) {
        this.patches = {};
      }
      goog.object.extend(this.patches, ce.patches);
    }
  }
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
 * @return {Element} could be input or span.
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
ydn.crm.sugarcrm.ui.group.Expander.prototype.reset = function() {
  goog.base(this, 'reset');
  this.expand(false);
  var label = this.getHeaderLabel();
  label.setAttribute('title', this.getModel().getGroupName());
};


/**
 * @override
 */
ydn.crm.sugarcrm.ui.group.Expander.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
  if (this.keyHandler) {
    this.keyHandler.dispose();
    this.keyHandler = null;
  }
};


/**
* @inheritDoc
*/
ydn.crm.sugarcrm.ui.group.Expander.prototype.collectData = function() {
  var out = goog.base(this, 'collectData');
  if (this.patches) {
    var new_out = {};
    for (var name in this.patches) {
      new_out[name] = this.patches[name];
    }
    if (out) {
      for (var name in out) {
        if (goog.isDefAndNotNull(out[name])) {
          new_out[name] = out[name];
        }
      }
    }
    return new_out;
  }
  return out;
};


/**
* @inheritDoc
*/
ydn.crm.sugarcrm.ui.group.Expander.prototype.hasChanged = function() {
  if (this.patches) {
    return true;
  }
  return goog.base(this, 'hasChanged');
};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.ui.group.Expander.prototype.getPatch = function() {
  var out = goog.base(this, 'getPatch');
  if (this.patches) {
    var new_out = {};
    for (var name in this.patches) {
      new_out[name] = this.patches[name];
    }
    if (out) {
      for (var name in out) {
        if (out[name]) {
          new_out[name] = out[name];
        }
      }
    }
    return new_out;
  }
  return out;
};
