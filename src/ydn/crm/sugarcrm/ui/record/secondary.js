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
goog.require('ydn.crm.su.ui.record.HoverCard');
goog.require('ydn.crm.su.ui.record.RecordItemRenderer');



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

  this.activity_ = new ydn.crm.su.ui.record.Secondary.Section(this, 'activity');
};
goog.inherits(ydn.crm.su.ui.record.Secondary, goog.ui.Component);


/**
 * @define {boolean} debug flag.
 */
ydn.crm.su.ui.record.Secondary.DEBUG = false;


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
 * @param {goog.events.BrowserEvent} ev
 * @private
 */
ydn.crm.su.ui.record.Secondary.prototype.onActivityUlClick_ = function(ev) {
  var cmds = this.activity_.handleClick(ev);
  if (cmds) {
    console.log(cmds);
  }
};


/**
 * @param {goog.ui.HoverCard.TriggerEvent} ev
 * @return {boolean}
 * @private
 */
ydn.crm.su.ui.record.Secondary.prototype.onTrigger_ = function(ev) {
  var trigger = ev.anchor;
  var pos = new goog.positioning.AnchoredPosition(trigger,
      goog.positioning.Corner.TOP_LEFT);
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

  var is_people = ydn.crm.su.PEOPLE_MODULES.indexOf(model.getModuleName()) >= 0;
  this.activity_.setVisible(is_people);
  
  model.listRelatedActivities().addProgback(function(arr) {
    if (ydn.crm.su.ui.record.Secondary.DEBUG) {
      window.console.log(arr);
    }
    if (!arr) {
      return;
    }
    for (var i = 0; i < arr.length; i++) {
      var r = /** @type {!SugarCrm.Record} */(arr[i]);
      var mn = /** @type {ydn.crm.su.ModuleName} */ (r._module);
      this.activity_.addItem(r);
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
  this.root_ = goog.soy.renderAsElement(templ.ydn.crm.su.secondaryPanel,
      {className: name});

  /**
   * @type {ydn.ui.FlyoutMenu}
   * @private
   */
  this.menu_ = new ydn.ui.FlyoutMenu(undefined,
      ydn.crm.su.ui.record.Secondary.ACTIVITY_MENUS);

};


/**
 * Render UI.
 * @param {Element} el
 */
ydn.crm.su.ui.record.Secondary.Section.prototype.render = function(el) {
  el.appendChild(this.root_);
  var activity_menu = this.root_.querySelector('.header [name=menu]');
  this.menu_.render(activity_menu);
  goog.style.setElementShown(activity_menu, false);
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
  }
  this.parent_.item_renderer.render(item, r);
};
