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
 * @fileoverview Home bar is top of home panel.
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */


goog.provide('ydn.crm.su.ui.HomeBar');
goog.require('goog.ui.Component');
goog.require('goog.ui.Css3MenuButtonRenderer');
goog.require('goog.ui.Menu');
goog.require('goog.ui.MenuButton');
goog.require('wgui.TextInput');
goog.require('ydn.crm.msg.Manager');
goog.require('ydn.crm.su');
goog.require('ydn.crm.su.model.Sugar');
goog.require('ydn.crm.su.ui.events');



/**
 * Home page toolbar.
 * @param {ydn.crm.su.model.Search} model
 * @param {goog.dom.DomHelper=} opt_dom
 * @constructor
 * @struct
 * @extends {goog.ui.Component}
 * @suppress {checkStructDictInheritance} suppress closure-library code.
 */
ydn.crm.su.ui.HomeBar = function(model, opt_dom) {
  ydn.crm.su.ui.HomeBar.base(this, 'constructor', opt_dom);
  this.setModel(model);
};
goog.inherits(ydn.crm.su.ui.HomeBar, goog.ui.Component);


/**
 * @const
 * @type {string}
 */
ydn.crm.su.ui.HomeBar.CSS_CLASS = 'homebar';


/**
 * @return {string}
 */
ydn.crm.su.ui.HomeBar.prototype.getCssClass = function() {
  return ydn.crm.su.ui.HomeBar.CSS_CLASS;
};


/**
 * @return {ydn.crm.su.model.Search}
 * @override
 */
ydn.crm.su.ui.HomeBar.prototype.getModel;


/**
 * @inheritDoc
 */
ydn.crm.su.ui.HomeBar.prototype.createDom = function() {
  ydn.crm.su.ui.HomeBar.base(this, 'createDom');
  var root = this.getElement();
  var dom = this.getDomHelper();

  var add_menu = new goog.ui.Menu(dom);
  for (var i = 0; i < ydn.crm.su.EDITABLE_MODULES.length; i++) {
    var mn = ydn.crm.su.EDITABLE_MODULES[i];
    add_menu.addChild(new goog.ui.MenuItem('New ' + mn, mn), true);
  }
  var svg = ydn.crm.ui.createSvgIcon('add');
  var add_btn = new goog.ui.MenuButton(svg, add_menu,
      null, dom);

  var search_input = new wgui.TextInput('');

  this.addChild(add_btn, true);
  this.addChild(search_input, true);
};


/**
 * @protected
 * @return {wgui.TextInput}
 */
ydn.crm.su.ui.HomeBar.prototype.getSearchInput = function() {
  return /** @type {wgui.TextInput} */ (this.getChildAt(1));
};


/**
 * @inheritDoc
 */
ydn.crm.su.ui.HomeBar.prototype.enterDocument = function() {
  ydn.crm.su.ui.HomeBar.base(this, 'enterDocument');
  var search_input = this.getSearchInput();
  this.getHandler().listen(search_input, goog.ui.Component.EventType.ACTION,
      this.onSearch_, true);
};


/**
 * @param {goog.events.Event} e
 * @private
 */
ydn.crm.su.ui.HomeBar.prototype.onSearch_ = function(e) {
  var search_input = this.getSearchInput();
  var q = search_input.getContent() || '';
  this.getModel().search(q);
};

