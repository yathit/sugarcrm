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
 * @fileoverview Record snippet shows a brief description of the record.
 *
 * Upon hovering over the pane, an editable record panel appear on the side
 * of snippet panel.
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */


goog.provide('ydn.crm.su.ui.HoverResultList');
goog.require('goog.ui.Component');
goog.require('ydn.crm.msg.Manager');
goog.require('ydn.crm.su');
goog.require('ydn.crm.su.model.Search');
goog.require('ydn.crm.su.model.Sugar');
goog.require('ydn.crm.su.ui.events');
goog.require('ydn.crm.su.ui.record.HoverCard');
goog.require('ydn.crm.su.ui.record.RecordItemRenderer');
goog.require('ydn.crm.ui.events');
goog.require('ydn.ui');



/**
 * Record snippet shows a brief description of the record.
 * @param {ydn.crm.su.model.Search} model
 * @param {goog.dom.DomHelper=} opt_dom
 * @constructor
 * @struct
 * @extends {goog.ui.Component}
 * @see ydn.crm.su.ui.HoverRecordList
 */
ydn.crm.su.ui.HoverResultList = function(model, opt_dom) {
  goog.base(this, opt_dom);
  /**
   * @type {ydn.crm.su.ui.record.RecordItemRenderer}
   * @private
   */
  this.item_renderer_ = null;
  /**
   * @type {ydn.crm.su.ui.record.HoverCard}
   * @private
   */
  this.hover_ = null;
  this.setModel(model);

};
goog.inherits(ydn.crm.su.ui.HoverResultList, goog.ui.Component);


/**
 * @protected
 * @type {goog.log.Logger}
 */
ydn.crm.su.ui.HoverResultList.prototype.logger =
    goog.log.getLogger('ydn.crm.su.ui.HoverResultList');


/**
 * @define {boolean} debug flag.
 */
ydn.crm.su.ui.HoverResultList.DEBUG = false;


/**
 * @return {ydn.crm.su.model.Search}
 * @override
 */
ydn.crm.su.ui.HoverResultList.prototype.getModel;


/**
 * @override
 */
ydn.crm.su.ui.HoverResultList.prototype.setModel = function(model) {
  ydn.crm.su.ui.HoverResultList.base(this, 'setModel', model);
  if (!model) {
    this.item_renderer_ = null;
    return;
  }
  var search = /** @type {ydn.crm.su.model.Search} */(model);
  this.item_renderer_ = new ydn.crm.su.ui.record.RecordItemRenderer(
      search.getSugar());
};


/**
 * @const
 * @type {string}
 */
ydn.crm.su.ui.HoverResultList.CSS_CLASS = 'snippet-panel';


/**
 * @return {string}
 */
ydn.crm.su.ui.HoverResultList.prototype.getCssClass = function() {
  return ydn.crm.su.ui.HoverResultList.CSS_CLASS;
};


/**
 * @inheritDoc
 */
ydn.crm.su.ui.HoverResultList.prototype.createDom = function() {
  goog.base(this, 'createDom');
  var root = this.getElement();
  root.classList.add(this.getCssClass());
  var dom = this.getDomHelper();
  var header = dom.createDom('div', ydn.crm.ui.CSS_CLASS_HEAD);
  var content = dom.createDom('div', ydn.crm.ui.CSS_CLASS_CONTENT,
      dom.createDom('ul'));
  root.appendChild(header);
  root.appendChild(content);

  var sugar = this.getModel().getSugar();
  this.hover_ = new ydn.crm.su.ui.record.HoverCard(sugar, content, dom);

};


/**
 * @inheritDoc
 */
ydn.crm.su.ui.HoverResultList.prototype.getContentElement = function() {
  return this.getElement().querySelector('.' + ydn.crm.ui.CSS_CLASS_CONTENT);
};


/**
 * @inheritDoc
 */
ydn.crm.su.ui.HoverResultList.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  var hd = this.getHandler();
  /**
   * @type {ydn.crm.su.model.Search}
   */
  var model = this.getModel();
  hd.listen(model, ydn.crm.su.model.events.SearchEvent.Type.RESET, this.onReset_);
  hd.listen(model, ydn.crm.su.model.events.SearchEvent.Type.ADD, this.onAddResult_);
  hd.listen(model, ydn.crm.su.model.events.SearchEvent.Type.PROGRESS, this.onProgress_);

  hd.listen(this.hover_, goog.ui.HoverCard.EventType.TRIGGER,
      this.onTrigger_);
  hd.listen(this.hover_, goog.ui.HoverCard.EventType.BEFORE_SHOW,
      this.onBeforeShow_);
  var ul = this.getContentElement().querySelector('UL');
  hd.listen(ul, goog.events.EventType.CLICK, this.onClick_);
};


/**
 * @param {goog.events.BrowserEvent} ev
 * @private
 */
ydn.crm.su.ui.HoverResultList.prototype.onClick_ = function(ev) {
  if (ev.target instanceof Element) {
    if (ev.target.classList.contains('title') ||
        ev.target.classList.contains('summary')) {
      return;
    }
  }

  var li = goog.dom.getAncestorByTagNameAndClass(ev.target, 'LI');
  if (li) {
    var data = {
      'id': li.getAttribute('data-id'),
      'module': li.getAttribute('data-module')
    };
    var se = new ydn.crm.ui.events.ShowPanelEvent(
        ydn.crm.ui.PageName.NEW_RECORD, data, this);
    this.dispatchEvent(se);
  }
};


/**
 * @return {Element}
 * @protected
 */
ydn.crm.su.ui.HoverResultList.prototype.getUlElement = function() {
  return this.getContentElement().querySelector('ul');
};


/**
 * Handle on hover card trigger.
 * @param {goog.ui.HoverCard.TriggerEvent} ev
 * @return {boolean}
 * @private
 */
ydn.crm.su.ui.HoverResultList.prototype.onTrigger_ = function(ev) {
  var trigger = ev.anchor;
  var pos = new goog.positioning.AnchoredViewportPosition(trigger,
      goog.positioning.Corner.TOP_LEFT, true);
  this.hover_.setPosition(pos);
  return true;
};


/**
 * Handle on hover card before show.
 * @param {goog.events.Event} ev
 * @private
 */
ydn.crm.su.ui.HoverResultList.prototype.onBeforeShow_ = function(ev) {

  var trigger = this.hover_.getAnchorElement();
  var id = trigger.getAttribute('data-id');
  var mn = trigger.getAttribute('data-module');
  this.hover_.refreshRecord(/** @type {ydn.crm.su.ModuleName} */(mn), id);
};


/**
 * @param {ydn.crm.su.model.events.SearchResetEvent} e
 * @private
 */
ydn.crm.su.ui.HoverResultList.prototype.onReset_ = function(e) {
  this.reset();
};


/**
 */
ydn.crm.su.ui.HoverResultList.prototype.reset = function() {
  this.getUlElement().innerHTML = '';
};


/**
 * @param {ydn.crm.su.model.events.SearchResultAddEvent} e
 * @private
 */
ydn.crm.su.ui.HoverResultList.prototype.onAddResult_ = function(e) {
  /**
   * @type {ydn.crm.su.model.Search}
   */
  var model = this.getModel();
  var r = model.getResultAt(e.index);
  this.addResult(r, e.index);
};


/**
 * @param {ydn.crm.su.model.events.SearchUpdatedEvent} e
 * @private
 */
ydn.crm.su.ui.HoverResultList.prototype.onUpdateResult_ = function(e) {
  this.updateResult(e.index);
};


/**
 * @param {ydn.crm.su.model.events.SearchProgressEvent} e
 * @private
 */
ydn.crm.su.ui.HoverResultList.prototype.onProgress_ = function(e) {
  // console.log(e.level);
};


/**
 * Add a result.
 * @param {SugarCrm.ScoredRecord} r
 * @param {number} idx
 */
ydn.crm.su.ui.HoverResultList.prototype.addResult = function(r, idx) {
  var ul = this.getUlElement();
  var node = ul.children[idx];
  var li = this.getDomHelper().createDom('li');
  if (node) {
    ul.insertBefore(li, node);
  } else {
    if (ydn.crm.su.ui.HoverResultList.DEBUG) {
      window.console.warn('Node ' + idx + ' not exists.');
    }
    ul.appendChild(li);
  }
  this.item_renderer_.render(li, r);
};


/**
 * Update result.
 * @param {number} idx the index the record has been changes.
 */
ydn.crm.su.ui.HoverResultList.prototype.updateResult = function(idx) {
  /**
   * @type {ydn.crm.su.model.Search}
   */
  var model = this.getModel();
  var ul = this.getUlElement();
  this.item_renderer_.render(ul.children[idx], model.getResultAt(idx));
  for (var i = idx + 1; i < model.getResultCount(); i++) {
    var li = ul.children[i];
    var id = li.getAttribute('data-id');
    var r = model.getResultAt(i);
    if (r.id != id) {
      this.item_renderer_.render(li, r);
    } else {
      // all remaining records are not changed.
      break;
    }
  }
};


/**
 * @return {ydn.crm.su.model.Sugar}
 * @private
 */
ydn.crm.su.ui.HoverResultList.prototype.getSugar_ = function() {
  return this.getModel().getSugar();
};


/**
 * Set show or hide.
 * @param {boolean} val
 */
ydn.crm.su.ui.HoverResultList.prototype.setVisible = function(val) {
  goog.style.setElementShown(this.getElement(), val);
};


