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
  this.item_renderer_ = new ydn.crm.su.ui.record.RecordItemRenderer(
      model.getSugar());
  /**
   * @type {ydn.crm.su.ui.record.HoverCard}
   * @private
   */
  this.hover_ = null;

  /**
   * @type {ydn.ui.FlyoutMenu}
   * @private
   */
  this.activity_menu_ = new ydn.ui.FlyoutMenu(undefined,
      ydn.crm.su.ui.record.Secondary.ACTIVITY_MENUS);

};
goog.inherits(ydn.crm.su.ui.record.Secondary, goog.ui.Component);


/**
 * @define {boolean} debug flag.
 */
ydn.crm.su.ui.record.Secondary.DEBUG = false;


/**
 * @define {boolean} debug flag.
 */
ydn.crm.su.ui.record.Secondary.USE_RECORD = false;


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
  if (ydn.crm.su.ui.record.Secondary.USE_RECORD) {
    return;
  }

  goog.soy.renderElement(root, templ.ydn.crm.su.secondaryPanel);

  var activity_menu = root.querySelector('.activity [name=menu]');
  this.activity_menu_.render(activity_menu);
  goog.style.setElementShown(activity_menu, false);

  var sugar = this.getModel().getSugar();
  var ul = root.querySelector('.activity > ul');
  var trigger = /** @type {HTMLUListElement} */(ul);
  this.hover_ = new ydn.crm.su.ui.record.HoverCard(sugar, trigger, dom);

};


/**
 * @inheritDoc
 */
ydn.crm.su.ui.record.Secondary.prototype.enterDocument = function() {
  ydn.crm.su.ui.record.Secondary.base(this, 'enterDocument');
  if (ydn.crm.su.ui.record.Secondary.USE_RECORD) {
    return;
  }
  var hd = this.getHandler();
  var root = this.getElement();
  hd.listen(this.hover_, goog.ui.HoverCard.EventType.TRIGGER,
      this.onTrigger_);
  hd.listen(this.hover_, goog.ui.HoverCard.EventType.BEFORE_SHOW,
      this.onBeforeShow_);

  var ul = root.querySelector('.activity > ul');
  hd.listen(ul, 'click', this.onActivityUlClick_);
};


/**
 * @param {goog.events.BrowserEvent} ev
 * @private
 */
ydn.crm.su.ui.record.Secondary.prototype.onActivityUlClick_ = function(ev) {
  var cmds = this.activity_menu_.handleClick(ev);
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
 * Attach related record as child panel.
 * @param {!ydn.crm.su.Record} r
 * @private
 */
ydn.crm.su.ui.record.Secondary.prototype.attachChild_ = function(r) {
  var sugar = this.getModel().getSugar();
  var child_panel = this.getChildByRecordId(r.getId());
  if (child_panel) {
    var model = child_panel.getModel();
    model.setRecord(r);
  } else {
    var record_model = new ydn.crm.su.model.Record(sugar, r);
    child_panel = new ydn.crm.su.ui.record.Record(record_model, this.getDomHelper());
    child_panel.setEnableSecondary(ydn.crm.su.ui.record.Record.EnableSecondary.DISABLED);
    this.addChild(child_panel, true);
  }
};


/**
 * Attach related record item.
 * @param {!SugarCrm.Record} r
 * @private
 */
ydn.crm.su.ui.record.Secondary.prototype.attachItem_ = function(r) {
  var ul = this.getElement().querySelector('ul');
  var item = this.getItemByRecordId(r.id);
  if (!item) {
    item = document.createElement('li');
    item.setAttribute('data-id', r.id);
    item.setAttribute('data-module', r._module);
    ul.appendChild(item);
  }
  this.item_renderer_.render(item, r);
};


/**
 * Reset
 */
ydn.crm.su.ui.record.Secondary.prototype.reset = function() {
  this.disposeChildren();
  var root = this.getElement();
  var data_id = root.removeAttribute('data-id');
};


/**
 * Remove all children and dispose them.
 * @protected
 */
ydn.crm.su.ui.record.Secondary.prototype.disposeChildren = function() {
  while (this.hasChildren()) {
    var child = this.getChildAt(0);
    this.removeChild(child, true);
    child.dispose();
  }
};


/**
 * @const
 * @type {boolean}
 */
ydn.crm.su.ui.record.Secondary.SHOW_EMBEDDED = false;


/**
 * Get child component by record id.
 * @param {string} id
 * @return {ydn.crm.su.ui.record.Record}
 */
ydn.crm.su.ui.record.Secondary.prototype.getChildByRecordId = function(id) {
  for (var i = 0; i < this.getChildCount(); i++) {
    var child = /** @type {ydn.crm.su.ui.record.Record} */(this.getChildAt(i));
    var model = /** @type {ydn.crm.su.model.Record} */(child.getModel());
    if (model && !model.isNew() && model.getId() == id) {
      return child;
    }
  }
  return null;
};


/**
 * Get child component by record id.
 * @param {string} id
 * @return {Element}
 */
ydn.crm.su.ui.record.Secondary.prototype.getItemByRecordId = function(id) {
  var ul = this.getElement().querySelector('ul');
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
      if (ydn.crm.su.ui.record.Secondary.USE_RECORD) {
        var mn = /** @type {ydn.crm.su.ModuleName} */ (r._module);
        this.attachChild_(new ydn.crm.su.Record(model.getDomain(), mn, r));
      } else {
        this.attachItem_(r);
      }
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
  var act_el = root.querySelector('.activity');
  if (ydn.crm.su.PEOPLE_MODULES.indexOf(model.getModuleName()) >= 0) {
    goog.style.setElementShown(act_el, true);
    var ul = act_el.querySelector('ul');
    ul.innerHTML = '';
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
        if (ydn.crm.su.ui.record.Secondary.USE_RECORD) {
          this.attachChild_(new ydn.crm.su.Record(model.getDomain(), mn, r));
        } else {
          this.attachItem_(r);
        }
      }
    }, this);
  } else {
    goog.style.setElementShown(act_el, false);
  }

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
    root.setAttribute('data-id', model.getId());
    this.disposeChildren();
    if (ydn.crm.su.ui.record.Secondary.SHOW_EMBEDDED) {
      this.addEmbeddedChildren_();
    }
    this.addRelationChildren_();
  }
};

