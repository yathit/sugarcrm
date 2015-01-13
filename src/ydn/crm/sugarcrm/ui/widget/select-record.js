// Copyright 2014 YDN Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


/**
 * @fileoverview Record selector.
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */


goog.provide('ydn.crm.sugarcrm.ui.widget.SelectRecord');
goog.require('goog.ui.Component');
goog.require('goog.ui.ac.ArrayMatcher');
goog.require('goog.ui.ac.AutoComplete');
goog.require('goog.ui.ac.Renderer');
goog.require('ydn.crm.sugarcrm.ui.widget.RecordMatcher');
goog.require('ydn.crm.sugarcrm.ui.widget.RichInputHandler');
goog.require('ydn.crm.sugarcrm.ui.widget.RowRenderer');
goog.require('ydn.crm.ui');



/**
 * Record selector.
 * @param {ydn.crm.sugarcrm.Meta} meta
 * @param {ydn.crm.sugarcrm.ModuleName=} opt_m_name default to Accounts module.
 * @param {boolean=} opt_multi multiple field selector.
 * @param {goog.dom.DomHelper=} opt_dom
 * @constructor
 * @struct
 * @extends {goog.ui.Component}
 * @suppress {checkStructDictInheritance} suppress closure-library code.
 */
ydn.crm.sugarcrm.ui.widget.SelectRecord = function(meta, opt_m_name, opt_multi, opt_dom) {
  ydn.crm.sugarcrm.ui.widget.SelectRecord.base(this, 'constructor', opt_dom);
  /**
   * @final
   * @type {ydn.crm.sugarcrm.Meta}
   * @protected
   */
  this.sugar = meta;

  var m_name = opt_m_name || ydn.crm.sugarcrm.ModuleName.ACCOUNTS;
  /**
   * @protected
   * @type {ydn.crm.sugarcrm.ui.widget.RecordMatcher}
   */
  this.matcher = new ydn.crm.sugarcrm.ui.widget.RecordMatcher(meta, m_name);
  var r = ydn.crm.sugarcrm.ui.widget.RowRenderer.getInstance();
  var renderer = new goog.ui.ac.Renderer(undefined, r);
  /**
   * @protected
   * @type {ydn.crm.sugarcrm.ui.widget.RichInputHandler}
   */
  this.input_handler = new ydn.crm.sugarcrm.ui.widget.RichInputHandler(meta,
      null, null, !!opt_multi, 300);
  /**
   * @type {goog.ui.ac.AutoComplete}
   * @protected
   */
  this.ac = new goog.ui.ac.AutoComplete(this.matcher, renderer, this.input_handler);
  this.input_handler.attachAutoComplete(this.ac);

};
goog.inherits(ydn.crm.sugarcrm.ui.widget.SelectRecord, goog.ui.Component);


/**
 * @const
 * @type {string}
 */
ydn.crm.sugarcrm.ui.widget.SelectRecord.CSS_CLASS = 'select-record';


/**
 * Set record module.
 * @param {ydn.crm.sugarcrm.ModuleName} mn
 */
ydn.crm.sugarcrm.ui.widget.SelectRecord.prototype.setModule = function(mn) {
  this.matcher.setModule(mn);
};


/**
 * Get record module.
 * @return {ydn.crm.sugarcrm.ModuleName} mn
 */
ydn.crm.sugarcrm.ui.widget.SelectRecord.prototype.getModule = function() {
  return this.matcher.getModule();
};


/**
 * @override
 */
ydn.crm.sugarcrm.ui.widget.SelectRecord.prototype.createDom = function() {
  ydn.crm.sugarcrm.ui.widget.SelectRecord.base(this, 'createDom');
  var root = this.getElement();
  root.classList.add(ydn.crm.sugarcrm.ui.widget.SelectRecord.CSS_CLASS);
  var dom = this.getDomHelper();
  var input = dom.createDom('input');
  var a = dom.createDom('a');
  a.setAttribute('title', 'View in SugarCRM');
  a.setAttribute('target', '_blank');
  goog.style.setElementShown(a, false);
  var svg = ydn.crm.ui.createSvgIcon('launch');
  a.appendChild(svg);
  root.appendChild(input);
  root.appendChild(a);
};


/**
 * @override
 */
ydn.crm.sugarcrm.ui.widget.SelectRecord.prototype.enterDocument = function() {
  ydn.crm.sugarcrm.ui.widget.SelectRecord.base(this, 'enterDocument');
  var input = this.getElement().querySelector('input');
  this.input_handler.attachInputs(input);
};


/**
 * @override
 */
ydn.crm.sugarcrm.ui.widget.SelectRecord.prototype.exitDocument = function() {
  ydn.crm.sugarcrm.ui.widget.SelectRecord.base(this, 'exitDocument');
  var input = this.getElement().querySelector('input');
  this.input_handler.detachInput(input);
};


/**
 * @override
 */
ydn.crm.sugarcrm.ui.widget.SelectRecord.prototype.disposeInternal = function() {
  ydn.crm.sugarcrm.ui.widget.SelectRecord.base(this, 'disposeInternal');
  this.input_handler.dispose();
  this.input_handler = null;
  this.ac.dispose();
  this.ac = null;
  this.matcher = null;
};
