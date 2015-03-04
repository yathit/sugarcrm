// Copyright 2014 YDN Authors. All Rights Reserved.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
//    This program is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.


/**
 * @fileoverview Secondary record panel show records which is related to
 * given parent record.
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */


goog.provide('ydn.crm.su.ui.record.Secondary');
goog.require('goog.positioning.AnchoredViewportPosition');
goog.require('ydn.crm.su.ui.record.HoverCard');
goog.require('ydn.crm.su.ui.record.RecordItemRenderer');
goog.require('ydn.crm.ui');



/**
 * Secondary record panel
 * @param {ydn.crm.su.model.Record} model
 * @param {goog.dom.DomHelper=} opt_dom
 * @constructor
 * @struct
 * @extends {goog.ui.Component}
 * @suppress {checkStructDictInheritance} suppress closure-library code.
 */
ydn.crm.su.ui.record.Secondary = function(model, opt_dom) {
  goog.base(this, opt_dom);
  this.setModel(model);
  /**
   * @protected
   * @type {ydn.crm.su.ui.record.RecordItemRenderer}
   */
  this.item_renderer = new ydn.crm.su.ui.record.RecordItemRenderer(
      model.getSugar());
  /**
   * @type {ydn.crm.su.ui.record.HoverCard}
   * @private
   */
  this.hover_ = null;

  /**
   * @type {ydn.crm.su.ui.record.Secondary.Section}
   * @private
   */
  this.activity_ = new ydn.crm.su.ui.record.Secondary.Section(this,
      ydn.crm.su.ui.record.Secondary.SectionType.ACTIVITY);

  /**
   * @type {ydn.crm.su.ui.record.Secondary.Section}
   * @private
   */
  this.related_ = new ydn.crm.su.ui.record.Secondary.Section(this,
      ydn.crm.su.ui.record.Secondary.SectionType.RELATED);

  /**
   * @type {ydn.crm.su.ui.record.Secondary.Section}
   * @private
   */
  this.email_ = new ydn.crm.su.ui.record.Secondary.Section(this,
      ydn.crm.su.ui.record.Secondary.SectionType.EMAIL);
};
goog.inherits(ydn.crm.su.ui.record.Secondary, goog.ui.Component);


/**
 * @define {boolean} debug flag.
 */
ydn.crm.su.ui.record.Secondary.DEBUG = false;


/**
 * @const
 * @type {Array.<?ydn.ui.FlyoutMenu.ItemOption>}
 */
ydn.crm.su.ui.record.Secondary.ACTIVITY_MENUS =
    /** @type {Array.<?ydn.ui.FlyoutMenu.ItemOption>} */([{
      label: 'New Tasks',
      name: 'Tasks'
    }]);


/**
 * @return {ydn.crm.su.model.Record}
 * @override
 */
ydn.crm.su.ui.record.Secondary.prototype.getModel;


/**
 * @const
 * @type {string} CSS class name for secondary records panel.
 */
ydn.crm.su.ui.record.Secondary.CSS_CLASS = 'secondary';


/** @return {string} */
ydn.crm.su.ui.record.Secondary.prototype.getCssClass = function() {
  return ydn.crm.su.ui.record.Secondary.CSS_CLASS;
};


/**
 * @inheritDoc
 */
ydn.crm.su.ui.record.Secondary.prototype.createDom = function() {
  goog.base(this, 'createDom');
  var dom = this.getDomHelper();
  var root = this.getElement();
  root.classList.add(this.getCssClass());

  var content = this.getContentElement();
  this.activity_.render(content);
  this.related_.render(content);
  this.email_.render(content);

  var sugar = this.getModel().getSugar();
  this.hover_ = new ydn.crm.su.ui.record.HoverCard(sugar, content, dom);

};


/**
 * @inheritDoc
 */
ydn.crm.su.ui.record.Secondary.prototype.enterDocument = function() {
  ydn.crm.su.ui.record.Secondary.base(this, 'enterDocument');

  var hd = this.getHandler();
  var root = this.getElement();
  hd.listen(this.hover_, goog.ui.HoverCard.EventType.TRIGGER,
      this.onTrigger_);
  hd.listen(this.hover_, goog.ui.HoverCard.EventType.BEFORE_SHOW,
      this.onBeforeShow_);

  hd.listen(root, 'click', this.onActivityUlClick_);
};


/**
 * @inheritDoc
 */
ydn.crm.su.ui.record.Secondary.prototype.disposeInternal = function() {
  this.activity_.dispose();
  this.related_.dispose();
  this.email_.dispose();
  this.activity_ = null;
  this.related_ = null;
  this.email_ = null;
  ydn.crm.su.ui.record.Secondary.base(this, 'disposeInternal');
};


/**
 * @param {goog.events.BrowserEvent} ev
 * @private
 */
ydn.crm.su.ui.record.Secondary.prototype.onActivityUlClick_ = function(ev) {
  if (ev.target instanceof Element) {
    var cmds = this.activity_.handleClick(ev);
    if (cmds) {
      console.log(cmds);
    }
  }
};


/**
 * @param {goog.ui.HoverCard.TriggerEvent} ev
 * @return {boolean}
 * @private
 */
ydn.crm.su.ui.record.Secondary.prototype.onTrigger_ = function(ev) {
  var trigger = ev.anchor;
  var pos = new goog.positioning.AnchoredViewportPosition(trigger,
      goog.positioning.Corner.TOP_LEFT, true);
  this.hover_.setPosition(pos);
  return true;
};


/**
 * @param {goog.events.Event} ev
 * @private
 */
ydn.crm.su.ui.record.Secondary.prototype.onBeforeShow_ = function(ev) {

  var trigger = this.hover_.getAnchorElement();
  var id = trigger.getAttribute('data-id');
  var mn = trigger.getAttribute('data-module');
  this.hover_.refreshRecord(/** @type {ydn.crm.su.ModuleName} */(mn), id);
};


/**
 * Reset
 */
ydn.crm.su.ui.record.Secondary.prototype.reset = function() {
  this.activity_.reset();
  this.related_.reset();
  this.email_.reset();
  var root = this.getElement();
  var data_id = root.removeAttribute('data-id');
};


/**
 * @const
 * @type {boolean}
 */
ydn.crm.su.ui.record.Secondary.SHOW_EMBEDDED = false;


/**
 * Add embedded children components.
 * @private
 */
ydn.crm.su.ui.record.Secondary.prototype.addEmbeddedChildren_ = function() {
  /**
   * @type {ydn.crm.su.model.Record}
   */
  var model = this.getModel();
  model.listEmbedded().addCallbacks(function(arr) {
    for (var i = 0; i < arr.length; i++) {
      var r = /** @type {!SugarCrm.Record} */(arr[i]);
      this.activity_.addItem(r);
    }
  }, function(e) {
    window.console.error(e);
  }, this);
};


/**
 * Add children components from relationships.
 * @private
 */
ydn.crm.su.ui.record.Secondary.prototype.addRelationChildren_ = function() {
  /**
   * @type {ydn.crm.su.model.Record}
   */
  var model = this.getModel();
  var root = this.getElement();

  model.listRelated().addProgback(function(arr) {
    if (ydn.crm.su.ui.record.Secondary.DEBUG) {
      window.console.log(arr);
    }
    if (!arr) {
      return;
    }
    for (var i = 0; i < arr.length; i++) {
      var r = /** @type {!SugarCrm.Record} */(arr[i]);
      var mn = /** @type {ydn.crm.su.ModuleName} */ (r._module);
      var is_activity = false;
      if (ydn.crm.su.ACTIVITY_MODULES.indexOf(mn) >= 0) {
        var record = new ydn.crm.su.Record(model.getDomain(), mn, r);
        var due = record.getDueDate();
        if (due && due > new Date()) {
          is_activity = true;
        }
      }
      if (mn == ydn.crm.su.ModuleName.EMAILS) {
        this.email_.addItem(r);
      } else if (is_activity) {
        this.activity_.addItem(r);
      } else {
        this.related_.addItem(r);
      }
    }
  }, this);
};


/**
 * Refresh UI.
 */
ydn.crm.su.ui.record.Secondary.prototype.refresh = function() {

  /**
   * @type {ydn.crm.su.model.Record}
   */
  var model = this.getModel();

  if (!model.isNew()) {
    var root = this.getElement();
    var data_id = root.getAttribute('data-id');
    if (data_id == model.getId()) {
      return;
    }
    this.activity_.reset();
    root.setAttribute('data-id', model.getId());
    if (ydn.crm.su.ui.record.Secondary.SHOW_EMBEDDED) {
      this.addEmbeddedChildren_();
    }
    this.addRelationChildren_();
  }
};


/**
 * @enum {string}
 */
ydn.crm.su.ui.record.Secondary.SectionType = {
  ACTIVITY: 'activity',
  EMAIL: 'email',
  RELATED: 'related'
};



/**
 * Section class.
 * @param {ydn.crm.su.ui.record.Secondary} parent
 * @param {string} name
 * @constructor
 * @struct
 * @protected
 */
ydn.crm.su.ui.record.Secondary.Section = function(parent, name) {
  /**
   * @type {ydn.crm.su.ui.record.Secondary}
   * @private
   */
  this.parent_ = parent;
  /**
   * @final
   * @type {string}
   * @private
   */
  this.type_ = name;
  var title = 'Related';
  if (name == ydn.crm.su.ui.record.Secondary.SectionType.ACTIVITY) {
    title = 'Upcoming Activities';
  } else if (name == ydn.crm.su.ui.record.Secondary.SectionType.EMAIL) {
    title = 'Emails';
  }
  this.root_ = goog.soy.renderAsElement(templ.ydn.crm.su.secondaryPanel,
      {className: name, title: title});

  /**
   * @type {ydn.ui.FlyoutMenu}
   * @private
   */
  this.menu_ = new ydn.ui.FlyoutMenu(undefined,
      ydn.crm.su.ui.record.Secondary.ACTIVITY_MENUS);

  /**
   * @protected
   * @type {goog.events.EventHandler}
   */
  this.handler = new goog.events.EventHandler(this);
};


/**
 * Render UI.
 * @param {Element} el
 */
ydn.crm.su.ui.record.Secondary.Section.prototype.render = function(el) {
  el.appendChild(this.root_);
  var expander = this.root_.querySelector('.header .expander');
  var ul = this.root_.querySelector('ul');
  goog.style.setElementShown(ul, false);
  var svg = ydn.crm.ui.createSvgIcon('unfold-more');
  expander.appendChild(svg);
  var activity_menu = this.root_.querySelector('.header [name=menu]');
  this.menu_.render(activity_menu);
  goog.style.setElementShown(activity_menu, false);
  this.handler.listen(expander, 'click', this.onExpanderClick);
  var pref = window.localStorage.getItem(this.getPrefKey_());
  if (pref) {
    if (pref.charAt(0) == '1') {
      this.setExpand_(true);
    } else {
      this.setExpand_(false);
    }
  }
};


/**
 * Dispose.
 */
ydn.crm.su.ui.record.Secondary.Section.prototype.dispose = function() {
  this.handler.dispose();
  this.handler = null;
};


/**
 * @param {goog.events.BrowserEvent} ev
 */
ydn.crm.su.ui.record.Secondary.Section.prototype.onExpanderClick = function(ev) {
  this.setExpand(!this.isExpanded());
};


/**
 * @return {boolean}
 */
ydn.crm.su.ui.record.Secondary.Section.prototype.isExpanded = function() {
  return goog.style.isElementShown(this.root_.querySelector('ul'));
};


/**
 * @param {boolean} val
 * @private
 */
ydn.crm.su.ui.record.Secondary.Section.prototype.setExpand_ = function(val) {
  var ul = this.root_.querySelector('ul');
  goog.style.setElementShown(ul, val);
  var expander = this.root_.querySelector('.header .expander');
  var svg = ydn.crm.ui.createSvgIcon(val ? 'unfold-less' : 'unfold-more');
  expander.replaceChild(svg, expander.firstElementChild);
};


/**
 * @param {boolean} val
 */
ydn.crm.su.ui.record.Secondary.Section.prototype.setExpand = function(val) {
  this.setExpand_(val);
  var pref = val ? '1' : '0';
  window.localStorage.setItem(this.getPrefKey_(), pref);
};


/**
 * Handle menu click.
 * @param {goog.events.BrowserEvent} e
 * @return {?string}
 */
ydn.crm.su.ui.record.Secondary.Section.prototype.handleClick = function(e) {
  return this.menu_.handleClick(e);
};


/**
 * Reset UI.
 */
ydn.crm.su.ui.record.Secondary.Section.prototype.reset = function() {
  var ul = this.root_.querySelector('ul');
  ul.innerHTML = '';
  var count = this.root_.querySelector('.header [name=count]');
  count.innerHTML = '0';
};


/**
 * Change visibility.
 * @param {boolean} val
 */
ydn.crm.su.ui.record.Secondary.Section.prototype.setVisible = function(val) {
  goog.style.setElementShown(this.root_, val);
};


/**
 * Get child component by record id.
 * @param {string} id
 * @return {Element}
 */
ydn.crm.su.ui.record.Secondary.Section.prototype.getItemByRecordId = function(id) {
  var ul = this.root_.querySelector('ul');
  var n = ul.childElementCount;
  for (var i = 0; i < n; i++) {
    var child = ul.children[i];
    var ch_id = child.getAttribute('data-id');
    if (ch_id == id) {
      return child;
    }
  }
  return null;
};


/**
 * @return {string}
 * @private
 */
ydn.crm.su.ui.record.Secondary.Section.prototype.getPrefKey_ = function() {
  return 'section-section-' + this.parent_.getModel().getModuleName() + '-' + this.type_;
};


/**
 * Attach related record item.
 * @param {!SugarCrm.Record} r
 */
ydn.crm.su.ui.record.Secondary.Section.prototype.addItem = function(r) {
  var ul = this.root_.querySelector('ul');
  var item = this.getItemByRecordId(r.id);
  if (!item) {
    item = document.createElement('li');
    item.setAttribute('data-id', r.id);
    item.setAttribute('data-module', r._module);
    ul.appendChild(item);
    var count = this.root_.querySelector('.header [name=count]');
    count.innerHTML = String(ul.childElementCount);
  }
  this.parent_.item_renderer.render(item, r);
};
