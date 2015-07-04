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
 * @fileoverview Relationship selection panel.
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */


goog.provide('ydn.crm.su.ui.Relationships');
goog.require('goog.soy');
goog.require('goog.ui.Component');
goog.require('templ.ydn.crm.inj');
goog.require('ydn.crm.su');
goog.require('ydn.crm.su.ui.widget.SelectRecord');



/**
 * Relationship selection panel.
 * @param {ydn.crm.su.Meta} meta
 * @param {ydn.crm.su.ModuleName} mn target relationship module.
 * @param {goog.dom.DomHelper=} opt_dom Optional DOM helper.
 * @constructor
 * @extends {goog.ui.Component}
 * @suppress {checkStructDictInheritance} suppress closure-library code.
 */
ydn.crm.su.ui.Relationships = function(meta, mn, opt_dom) {
  ydn.crm.su.ui.Relationships.base(this, 'constructor', opt_dom);
  /**
   * @type {ydn.crm.su.Meta}
   * @private
   */
  this.meta_ = meta;
  /**
   * @type {ydn.crm.su.ui.widget.SelectRecord}
   * @private
   */
  this.sel_record_ = null;
  var module_info = meta.getModuleInfo(mn);
  /**
   * @type {Array<ydn.crm.su.ModuleName>}
   */
  this.relationship_modules = ydn.crm.su.getRelationshipCacheModule(module_info,
      [ydn.crm.su.ModuleName.ACCOUNTS,
        ydn.crm.su.ModuleName.CONTACTS,
        ydn.crm.su.ModuleName.OPPORTUNITIES,
        ydn.crm.su.ModuleName.CASES]);
};
goog.inherits(ydn.crm.su.ui.Relationships, goog.ui.Component);


/**
 * @define {boolean} debug variable.
 */
ydn.crm.su.ui.Relationships.DEBUG = true;


/**
 * @const
 * @type {string}
 */
ydn.crm.su.ui.Relationships.CSS_NAME = 'relationships-panel';


/**
 * @inheritDoc
 */
ydn.crm.su.ui.Relationships.prototype.getContentElement = function() {
  return this.getElement().querySelector('.' + ydn.crm.ui.CSS_CLASS_CONTENT);
};


/**
 * @const
 * @type {string} error class
 */
ydn.crm.su.ui.Relationships.CSS_CLASS_SUGGESTIONS = 'suggestions';


/**
 * @inheritDoc
 */
ydn.crm.su.ui.Relationships.prototype.createDom = function() {
  goog.base(this, 'createDom');
  var root = this.getElement();
  root.classList.add(ydn.crm.su.ui.Relationships.CSS_NAME);
  var dom = this.getDomHelper();
  var h3 = dom.createDom('h3', ydn.crm.ui.CSS_CLASS_HEAD, 'Relationships');
  root.appendChild(h3);
  root.appendChild(dom.createDom('div', ydn.crm.ui.CSS_CLASS_CONTENT));
  root.appendChild(dom.createDom('div', ydn.crm.su.ui.Relationships.CSS_CLASS_SUGGESTIONS));

  var row = goog.soy.renderAsElement(templ.ydn.crm.inj.selectRecord, {
    use_sel: true
  });

  var a = row.querySelector('a');
  a.classList.add('spacer');

  var select = row.querySelector('select');
  for (var i = 0; i < this.relationship_modules.length; i++) {
    var option = document.createElement('option');
    option.value = this.relationship_modules[i];
    option.textContent = this.relationship_modules[i];
    select.appendChild(option);
  }
  var input = row.querySelector('input');
  root.appendChild(row);

  this.sel_record_ = new ydn.crm.su.ui.widget.SelectRecord(this.meta_, undefined, root);
};


/**
 * @inheritDoc
 */
ydn.crm.su.ui.Relationships.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  var root = this.getElement();
  var handler = this.getHandler();
  var select = root.querySelector('.select-record select');
  var input = root.querySelector('.select-record input');
  handler.listen(input, goog.events.EventType.FOCUS, this.onInputFocus_);
  handler.listen(input, goog.events.EventType.BLUR, this.onRelBlur_);
  handler.listen(select, goog.events.EventType.CHANGE, this.onSelectChange_);
  handler.listen(this.sel_record_, goog.ui.ac.AutoComplete.EventType.UPDATE, this.onInputChange_);

  var content = this.getContentElement();
  handler.listen(content, goog.events.EventType.CLICK, this.onContentClick_);

  var suggestion = root.querySelector('.' + ydn.crm.su.ui.Relationships.CSS_CLASS_SUGGESTIONS);
  handler.listen(suggestion, 'click', this.onSuggestionClick_);
};


/**
 * @param {goog.events.BrowserEvent} e
 * @private
 */
ydn.crm.su.ui.Relationships.prototype.onInputChange_ = function(e) {
  var row = e.row;
  if (row) {
    var r = /** @type {SugarCrm.Record} */(row);
    var label = ydn.crm.su.Record.getLabel(r);
    this.addRelationship({
      module_name: r._module,
      id: r.id,
      name: label
    });
    this.clear_();
  }
};


/**
 * @param {goog.events.BrowserEvent} e
 * @private
 */
ydn.crm.su.ui.Relationships.prototype.onRelBlur_ = function(e) {

};


/**
 * @param {goog.events.BrowserEvent} e
 * @private
 */
ydn.crm.su.ui.Relationships.prototype.onInputFocus_ = function(e) {
  this.attachSelectRecord_(/** @type {Element} */(e.currentTarget));
};


/**
 * @param {goog.events.BrowserEvent} e
 * @private
 */
ydn.crm.su.ui.Relationships.prototype.onSelectChange_ = function(e) {
  var div = goog.dom.getAncestorByClass(e.target, 'select-record');
  var input = div.querySelector('input');
  input.value = '';
  input.removeAttribute('data-id');
  var a = div.querySelector('a');
  a.href = '';
  goog.style.setElementShown(a, false);
};


/**
 * @private
 */
ydn.crm.su.ui.Relationships.prototype.clear_ = function() {
  var div = this.getElement().querySelector('.select-record');
  var input = div.querySelector('input');
  input.value = '';
  input.removeAttribute('data-id');
  var a = div.querySelector('a');
  a.href = '';
  goog.style.setElementShown(a, false);
};


/**
 * Attach select record auto completer.
 * @param {Element} input
 * @private
 */
ydn.crm.su.ui.Relationships.prototype.attachSelectRecord_ = function(input) {
  if (!(input instanceof HTMLInputElement)) {
    window.console.error('input must be HTMLInputElement', input);
    return;
  }
  var div = goog.dom.getAncestorByTagNameAndClass(input, 'div', 'select-record');
  var sel = div.querySelector('select');
  var mn = ydn.crm.su.toModuleName(sel.value);
  this.sel_record_.setModule(mn);
  this.sel_record_.attach(div);
};


/**
 * @return {Array<SugarCrm.ModuleNameIdPair>}
 */
ydn.crm.su.ui.Relationships.prototype.getRelationships = function() {
  var arr = [];
  for (var i = 0, n = this.getChildCount(); i < n; i++) {
    var ch = /** @type {ydn.crm.su.ui.Relationships.Item} */(this.getChildAt(i));
    var m = /** @type {ydn.crm.su.ui.Relationships.ItemModel} */ (ch.getModel());
    arr.push({
      'module_name': m.module_name,
      'id': m.id
    });
  }
  return arr;
};


/**
 * @param {goog.events.BrowserEvent} e
 * @private
 */
ydn.crm.su.ui.Relationships.prototype.onContentClick_ = function(e) {
  if (e.target.classList.contains('clear')) {
    var row = goog.dom.getAncestorByClass(e.target, ydn.crm.su.ui.Relationships.Item.CSS_NAME);
    for (var i = this.getChildCount() - 1; i >= 0; i--) {
      var ch = this.getChildAt(i);
      if (ch.getElement() == row) {
        this.removeChild(ch, true);
        ch.dispose();
        break;
      }
    }
  }
};


/**
 * @param {ydn.crm.su.ui.Relationships.ItemModel} model
 * @return {ydn.crm.su.ui.Relationships.Item}
 */
ydn.crm.su.ui.Relationships.prototype.addRelationship = function(model) {
  for (var i = this.getChildCount() - 1; i >= 0; i--) {
    var ch = /** @type {ydn.crm.su.ui.Relationships.Item} */(this.getChildAt(i));
    var m = /** @type {ydn.crm.su.ui.Relationships.ItemModel} */ (ch.getModel());
    if (m.id == model.id && m.module_name == model.module_name) {
      return ch;
    }
  }
  var item = new ydn.crm.su.ui.Relationships.Item(this.meta_, model, this.getDomHelper());
  this.addChild(item, true);
  return item;
};


ydn.crm.su.ui.Relationships.prototype.getSuggestionElement_ = function() {
  var el = this.getElement().querySelector('.' + ydn.crm.su.ui.Relationships.CSS_CLASS_SUGGESTIONS);
  var ul = el.querySelector('UL');
  if (!ul) {
    ul = document.createElement('UL');
    el.appendChild(document.createTextNode('Add '));
    el.appendChild(ul);
  }
  return ul;
};


/**
 * @param {goog.events.BrowserEvent} e
 * @private
 */
ydn.crm.su.ui.Relationships.prototype.onSuggestionClick_ = function(e) {
  e.preventDefault();
  var li = goog.dom.getAncestorByTagNameAndClass(e.target, 'LI');
  var id = li.getAttribute('data-id');
  var mn = li.getAttribute('data-module');

  this.addRelationship({
    module_name: mn,
    id: id,
    name: li.querySelector('A').textContent
  });
};


/**
 * @param {SugarCrm.Record} record
 * @param {string} email
 * @private
 */
ydn.crm.su.ui.Relationships.prototype.addSuggestion_ = function(record, email) {
  var el = this.getSuggestionElement_();
  if (el.querySelector('LI[data-id="' + record.id + '"]')) {
    return;
  }
  var li = document.createElement('LI');
  li.setAttribute('data-id', record.id);
  li.setAttribute('data-module', record._module);
  var a = document.createElement('A');
  a.textContent = record.name;
  a.href = '#';
  var label = record.name;
  if (record['account_name']) {
    label += ' (' + record['account_name'] + ')';
  }
  a.setAttribute('title', record.name + ' for ' + email);
  li.appendChild(a);
  el.appendChild(li);
};


/**
 * Add suggestion for possible relationship records.
 * @param {string} email email address of interested record.
 * @param {Array<ydn.crm.su.ModuleName>} opt_target_modules optional target module
 * name, default to {@link #relationship_modules}.
 */
ydn.crm.su.ui.Relationships.prototype.addSuggestionByEmail = function(
    email, opt_target_modules) {
  var modules = opt_target_modules || this.relationship_modules;
  var q = {
    'emails': [email],
    'modules': modules,
    'limit': 5
  };
  this.meta_.getChannel().send(ydn.crm.ch.SReq.QUERY_RELATED_BY_EMAILS, q).addCallback(function(arr) {
    if (ydn.crm.su.ui.Relationships.DEBUG) {
      window.console.log('suggestion', email, arr);
    }
    for (var i = 0; i < arr.length; i++) {
      this.addSuggestion_(arr[i], email);
    }
  }, this);
};


/**
 * Add suggestion for possible relationship records.
 * @param {ydn.crm.su.ModuleName} mn interested record module name.
 * @param {string} id email interested record id.
 * @param {Array<ydn.crm.su.ModuleName>} modules target module names.
 * @return {!goog.async.Deferred<Array>} list of record sorted by modified
 * descending.
 */
ydn.crm.su.ui.Relationships.prototype.getRelatedRecords_ = function(mn, id, modules) {

};


/**
 * @typedef {{
 *   id: string,
 *   module_name: string,
 *   name: string
 * }}
 */
ydn.crm.su.ui.Relationships.ItemModel;



/**
 * Relationship Item.
 * @param {ydn.crm.su.Meta} meta
 * @param {ydn.crm.su.ui.Relationships.ItemModel} model
 * @param {goog.dom.DomHelper=} opt_dom Optional DOM helper.
 * @constructor
 * @extends {goog.ui.Component}
 * @suppress {checkStructDictInheritance} suppress closure-library code.
 */
ydn.crm.su.ui.Relationships.Item = function(meta, model, opt_dom) {
  ydn.crm.su.ui.Relationships.Item.base(this, 'constructor', opt_dom);
  this.meta_ = meta;
  this.setModel(model);
};
goog.inherits(ydn.crm.su.ui.Relationships.Item, goog.ui.Component);


/**
 * @return {ydn.crm.su.ui.Relationships.ItemModel}
 */
ydn.crm.su.ui.Relationships.Item.prototype.getModel;


/**
 * @const
 * @type {string}
 */
ydn.crm.su.ui.Relationships.Item.CSS_NAME = 'relationship-item';


/**
 * @inheritDoc
 */
ydn.crm.su.ui.Relationships.Item.prototype.createDom = function() {
  ydn.crm.su.ui.Relationships.Item.base(this, 'createDom');
  var root = this.getElement();
  var dom = this.getDomHelper();
  var model = this.getModel();
  var mn = /** @type {ydn.crm.su.ModuleName} */(model.module_name);
  var icon = dom.createDom('span', 'icon small', ydn.crm.su.toModuleSymbol(mn));
  var content = dom.createDom('a', 'content');
  content.href = this.meta_.getRecordViewLink(mn, model.id);
  content.setAttribute('target', '_blank');
  var clear_btn = dom.createDom('div', 'clear', 'x');
  root.classList.add(ydn.crm.su.ui.Relationships.Item.CSS_NAME);
  root.classList.add('record-header');
  root.classList.add(mn);
  root.classList.add('flex-bar');
  content.textContent = model.name;
  root.appendChild(icon);
  root.appendChild(content);
  root.appendChild(clear_btn);
};


