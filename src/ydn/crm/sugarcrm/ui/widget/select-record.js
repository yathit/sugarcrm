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
goog.require('goog.ui.ac.InputHandler');
goog.require('goog.ui.ac.Renderer');
goog.require('ydn.crm.sugarcrm.ui.widget.RecordMatcher');
goog.require('ydn.crm.sugarcrm.ui.widget.RowRenderer');



/**
 * Record selector.
 * @param {ydn.crm.sugarcrm.Meta} meta
 * @param {ydn.crm.sugarcrm.ModuleName} m_name
 * @param {boolean=} opt_multi multiple field selector.
 * @param {goog.dom.DomHelper=} opt_dom
 * @constructor
 * @struct
 * @extends {goog.ui.Component}
 * @suppress {checkStructDictInheritance} suppress closure-library code.
 */
ydn.crm.sugarcrm.ui.widget.SelectRecord = function(meta, m_name, opt_multi, opt_dom) {
  goog.base(this, opt_dom);
  /**
   * @final
   * @type {ydn.crm.sugarcrm.Meta}
   * @protected
   */
  this.sugar = meta;
  /**
   * @final
   * @type {ydn.crm.sugarcrm.ModuleName}
   * @protected
   */
  this.module = m_name;

  var data = ['Apple', 'Car', 'Dog'];
  var matcher = new ydn.crm.sugarcrm.ui.widget.RecordMatcher(meta, m_name);
  var r = ydn.crm.sugarcrm.ui.widget.RowRenderer.getInstance();
  this.renderer = new goog.ui.ac.Renderer(undefined, r);
  this.input_handler = new goog.ui.ac.InputHandler(null, null, !!opt_multi, 300);
  /**
   * @final
   * @type {goog.ui.ac.AutoComplete}
   * @protected
   */
  this.ac = new goog.ui.ac.AutoComplete(matcher, this.renderer, this.input_handler);
  this.input_handler.attachAutoComplete(this.ac);

};
goog.inherits(ydn.crm.sugarcrm.ui.widget.SelectRecord, goog.ui.Component);


/**
 * @const
 * @type {string}
 */
ydn.crm.sugarcrm.ui.widget.SelectRecord.CSS_CLASS = 'select-record';


/**
 * @override
 */
ydn.crm.sugarcrm.ui.widget.SelectRecord.prototype.createDom = function() {
  goog.base(this, 'createDom');
  var root = this.getElement();
  root.classList.add(ydn.crm.sugarcrm.ui.widget.SelectRecord.CSS_CLASS);
  var dom = this.getDomHelper();
  var input = dom.createDom('input');
  this.input_handler.attachInputs(input);
  root.appendChild(input);
};
