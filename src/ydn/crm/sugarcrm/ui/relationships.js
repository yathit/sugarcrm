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
 * @param {goog.dom.DomHelper=} opt_dom Optional DOM helper.
 * @constructor
 * @extends {goog.ui.Component}
 * @suppress {checkStructDictInheritance} suppress closure-library code.
 */
ydn.crm.su.ui.Relationships = function(meta, opt_dom) {
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
  var module_info = meta.getModuleInfo(ydn.crm.su.ModuleName.DOCUMENTS);
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
 * @inheritDoc
 */
ydn.crm.su.ui.Relationships.prototype.getContentElement = function() {
  return this.getElement().querySelector('.' + ydn.crm.ui.CSS_CLASS_CONTENT);
};


/**
 * @inheritDoc
 */
ydn.crm.su.ui.Relationships.prototype.createDom = function() {
  goog.base(this, 'createDom');
  var root = this.getElement();
  var dom = this.getDomHelper();
  var h3 = dom.createDom('h3', 'Relationships');
  root.appendChild(h3);
  root.appendChild(dom.createDom('div', ydn.crm.ui.CSS_CLASS_CONTENT));

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

  var content = this.getContentElement();
  handler.listen(content, goog.events.EventType.CLICK, this.onContentClick_);
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
  var item = new ydn.crm.su.ui.Relationships.Item(model, this.getDomHelper());
  this.addChild(item, true);
  return item;
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
 * @param {ydn.crm.su.ui.Relationships.ItemModel} model
 * @param {goog.dom.DomHelper=} opt_dom Optional DOM helper.
 * @constructor
 * @extends {goog.ui.Component}
 * @suppress {checkStructDictInheritance} suppress closure-library code.
 */
ydn.crm.su.ui.Relationships.Item = function(model, opt_dom) {
  ydn.crm.su.ui.Relationships.Item.base(this, 'constructor', opt_dom);
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
  var icon = dom.createDom('span', 'icon small', ydn.crm.su.toModuleSymbol(model.module_name));
  var content = dom.createDom('span', 'content');
  var clear_btn = dom.createDom('div', 'clear', 'x');
  root.classList.add(ydn.crm.su.ui.Relationships.Item.CSS_NAME);
  root.classList.add('record-header');
  root.classList.add(model.module_name);
  root.classList.add('flex-bar');
  content.textContent = model.name;
  root.appendChild(icon);
  root.appendChild(content);
  root.appendChild(clear_btn);
};


