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


goog.provide('ydn.crm.su.ui.SearchResultList');
goog.require('goog.ui.Component');
goog.require('ydn.crm.msg.Manager');
goog.require('ydn.crm.su');
goog.require('ydn.crm.su.model.Sugar');
goog.require('ydn.crm.su.ui.events');



/**
 * SugarCRM record panel.
 * @param {ydn.crm.su.model.Search} model
 * @param {goog.dom.DomHelper=} opt_dom
 * @constructor
 * @struct
 * @extends {goog.ui.Component}
 * @suppress {checkStructDictInheritance} suppress closure-library code.
 */
ydn.crm.su.ui.SearchResultList = function(model, opt_dom) {
  goog.base(this, opt_dom);
  this.setModel(model);
};
goog.inherits(ydn.crm.su.ui.SearchResultList, goog.ui.Component);


/**
 * @protected
 * @type {goog.log.Logger}
 */
ydn.crm.su.ui.SearchResultList.prototype.logger =
    goog.log.getLogger('ydn.crm.su.ui.SearchResultList');


/**
 * @define {boolean} debug flag.
 */
ydn.crm.su.ui.SearchResultList.DEBUG = false;


/**
 * @return {ydn.crm.su.model.Search}
 * @override
 */
ydn.crm.su.ui.SearchResultList.prototype.getModel;


/**
 * @const
 * @type {string}
 */
ydn.crm.su.ui.SearchResultList.CSS_CLASS = 'snippet-panel';


/**
 * @return {string}
 */
ydn.crm.su.ui.SearchResultList.prototype.getCssClass = function() {
  return ydn.crm.su.ui.SearchResultList.CSS_CLASS;
};


/**
 * @inheritDoc
 */
ydn.crm.su.ui.SearchResultList.prototype.createDom = function() {
  goog.base(this, 'createDom');
  var root = this.getElement();
  var dom = this.getDomHelper();
  var header = dom.createDom('div', ydn.crm.ui.CSS_CLASS_HEAD);
  var content = dom.createDom('div', ydn.crm.ui.CSS_CLASS_CONTENT,
      dom.createDom('ul'));
  root.appendChild(header);
  root.appendChild(content);
};


/**
 * @inheritDoc
 */
ydn.crm.su.ui.SearchResultList.prototype.getContentElement = function() {
  return this.getElement().querySelector('.' + ydn.crm.ui.CSS_CLASS_CONTENT);
};


/**
 * @inheritDoc
 */
ydn.crm.su.ui.SearchResultList.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  var hd = this.getHandler();
  /**
   * @type {ydn.crm.su.model.Search}
   */
  var model = this.getModel();
  hd.listen(model, ydn.crm.su.model.events.SearchEvent.Type.RESET, this.onReset_);
  hd.listen(model, ydn.crm.su.model.events.SearchEvent.Type.ADD, this.onAddResult_);
  hd.listen(model, ydn.crm.su.model.events.SearchEvent.Type.UPDATED, this.onAddResult_);
};


/**
 * @return {HTMLElement}
 * @protected
 */
ydn.crm.su.ui.SearchResultList.prototype.getUlElement = function() {
  return this.getContentElement().querySelector('ul');
};


/**
 * @param {ydn.crm.su.model.events.SearchResetEvent} e
 * @private
 */
ydn.crm.su.ui.SearchResultList.prototype.onReset_ = function(e) {
  this.getUlElement().innerHTML = '';
};


/**
 * @param {ydn.crm.su.model.events.SearchResultAddEvent} e
 * @private
 */
ydn.crm.su.ui.SearchResultList.prototype.onAddResult_ = function(e) {
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
ydn.crm.su.ui.SearchResultList.prototype.onUpdateResult_ = function(e) {
  this.updateResult(e.index);
};


/**
 * Add a result.
 * @param {SugarCrm.ScoredRecord} r
 * @param {number} idx
 */
ydn.crm.su.ui.SearchResultList.prototype.addResult = function(r, idx) {
  var ul = this.getUlElement();
  var node = ul.children[idx];
  var li = this.getDomHelper().createDom('li');
  if (node) {
    ul.insertBefore(li, node);
  } else {
    if (goog.DEBUG) {
      window.console.warn('Node ' + idx + ' not exists.');
    }
    ul.appendChild(li);
  }
  this.renderItem_(li, r);
};


/**
 * Update result.
 * @param {number} idx the index the record has been changes.
 */
ydn.crm.su.ui.SearchResultList.prototype.updateResult = function(idx) {
  /**
   * @type {ydn.crm.su.model.Search}
   */
  var model = this.getModel();
  var ul = this.getUlElement();
  this.renderItem_(ul.children[idx], model.getResultAt(idx));
  for (var i = idx + 1; i < model.getResultCount(); i++) {
    var li = ul.children[i];
    var id = li.getAttribute('data-id');
    var r
  }
};


/**
 * Render a record.
 * @param {Element} li
 * @param {SugarCrm.Record} r
 * @private
 */
ydn.crm.su.ui.SearchResultList.prototype.renderItem_ = function(li, r) {

};


