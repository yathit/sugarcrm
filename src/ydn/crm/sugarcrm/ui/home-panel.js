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
 * @fileoverview Home panel for searching and add new records.
 *                                                 `
 * @author kyawtun@yathit.com (Kyaw Tun)
 */


goog.provide('ydn.crm.su.ui.HomePanel');
goog.require('goog.ui.Component');
goog.require('ydn.crm.su.ui.HomeBar');
goog.require('ydn.crm.su.ui.HoverResultList');
goog.require('ydn.crm.su.ui.record.Record');



/**
 * Home panel for searching and add new records.
 * @param {ydn.crm.su.model.Sugar} model
 * @param {goog.dom.DomHelper=} opt_dom
 * @constructor
 * @struct
 * @extends {goog.ui.Component}
 * @suppress {checkStructDictInheritance} suppress closure-library code.
 */
ydn.crm.su.ui.HomePanel = function(model, opt_dom) {
  goog.base(this, opt_dom);
  this.setModel(model);
  /**
   * Search model.
   * @type {ydn.crm.su.model.OmniSearch}
   * @private
   */
  this.search_ = new ydn.crm.su.model.OmniSearch(model);
};
goog.inherits(ydn.crm.su.ui.HomePanel, goog.ui.Component);


/**
 * @const
 * @type {string}
 */
ydn.crm.su.ui.HomePanel.CSS_CLASS = 'homepanel';


/**
 * @return {string}
 */
ydn.crm.su.ui.HomePanel.prototype.getCssClass = function() {
  return ydn.crm.su.ui.HomeBar.CSS_CLASS;
};


/**
 * @return {ydn.crm.su.model.OmniSearch}
 * @override
 */
ydn.crm.su.ui.HomePanel.prototype.getModel;


/**
 * @inheritDoc
 */
ydn.crm.su.ui.HomePanel.prototype.createDom = function() {
  goog.base(this, 'createDom');
  var root = this.getElement();
  var dom = this.getDomHelper();

  var sugar = this.getModel();
  var bar = new ydn.crm.su.ui.HomeBar(this.search_, dom);
  var result = new ydn.crm.su.ui.HoverResultList(this.search_, dom);

  this.addChild(bar, true);
  this.addChild(result, true);
};







