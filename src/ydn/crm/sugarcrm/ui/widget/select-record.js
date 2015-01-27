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


goog.provide('ydn.crm.su.ui.widget.SelectRecord');
goog.require('goog.ui.Component');
goog.require('goog.ui.ac.ArrayMatcher');
goog.require('goog.ui.ac.AutoComplete');
goog.require('goog.ui.ac.Renderer');
goog.require('ydn.crm.su.ui.widget.RecordMatcher');
goog.require('ydn.crm.su.ui.widget.RichInputHandler');
goog.require('ydn.crm.su.ui.widget.RowRenderer');
goog.require('ydn.crm.ui');



/**
 * Record selector.
 * @param {ydn.crm.su.Meta} meta
 * @param {ydn.crm.su.ModuleName=} opt_m_name default to Accounts module.
 * @param {boolean=} opt_multi multiple field selector.
 * @constructor
 * @struct
 */
ydn.crm.su.ui.widget.SelectRecord = function(meta, opt_m_name, opt_multi) {

  /**
   * @final
   * @type {ydn.crm.su.Meta}
   * @protected
   */
  this.sugar = meta;

  var m_name = opt_m_name || ydn.crm.su.ModuleName.ACCOUNTS;
  /**
   * @protected
   * @type {ydn.crm.su.ui.widget.RecordMatcher}
   */
  this.matcher = new ydn.crm.su.ui.widget.RecordMatcher(meta, m_name);
  var r = ydn.crm.su.ui.widget.RowRenderer.getInstance();
  var renderer = new goog.ui.ac.Renderer(undefined, r);
  /**
   * @protected
   * @type {ydn.crm.su.ui.widget.RichInputHandler}
   */
  this.input_handler = new ydn.crm.su.ui.widget.RichInputHandler(meta,
      null, null, !!opt_multi, 300);
  /**
   * @type {goog.ui.ac.AutoComplete}
   * @protected
   */
  this.ac = new goog.ui.ac.AutoComplete(this.matcher, renderer, this.input_handler);
  this.input_handler.attachAutoComplete(this.ac);

  /**
   * @type {Element}
   * @private
   */
  this.input_ = null;

};


/**
 * @const
 * @type {string}
 */
ydn.crm.su.ui.widget.SelectRecord.CSS_CLASS = 'select-record';


/**
 * Set record module.
 * @param {ydn.crm.su.ModuleName} mn
 */
ydn.crm.su.ui.widget.SelectRecord.prototype.setModule = function(mn) {
  this.matcher.setModule(mn);
};


/**
 * Get record module.
 * @return {ydn.crm.su.ModuleName} mn
 */
ydn.crm.su.ui.widget.SelectRecord.prototype.getModule = function() {
  return this.matcher.getModule();
};


/**
 * Attach input.
 * Current attach input element will be detach.
 * @param {Element} el select record Element build by `select-record-template`
 * template.
 */
ydn.crm.su.ui.widget.SelectRecord.prototype.attach = function(el) {
  this.detach();
  this.input_ = el.querySelector('.select-record input.value');
  this.input_handler.attachInput(this.input_);
};


/**
 * Detach current input element.
 */
ydn.crm.su.ui.widget.SelectRecord.prototype.detach = function() {
  if (this.input_) {
    this.input_handler.detachInput(this.input_);
    this.input_ = null;
  }

};


/**
 * @type {Object<!ydn.crm.su.ui.widget.SelectRecord>}
 * @private
 */
ydn.crm.su.ui.widget.SelectRecord.ins_ = {};


/**
 * Get select record instance.
 * @param {ydn.crm.su.Meta} meta
 * @param {ydn.crm.su.ModuleName} mn
 * @return {!ydn.crm.su.ui.widget.SelectRecord}
 */
ydn.crm.su.ui.widget.SelectRecord.getInstanceFor = function(meta, mn) {
  var domain = meta.getDomain();
  goog.asserts.assert(mn);
  if (!ydn.crm.su.ui.widget.SelectRecord.ins_[domain]) {
    ydn.crm.su.ui.widget.SelectRecord.ins_[domain] =
        new ydn.crm.su.ui.widget.SelectRecord(meta, mn);
  }
  var sr = ydn.crm.su.ui.widget.SelectRecord.ins_[domain];
  sr.detach();
  sr.setModule(mn);
  return sr;
};
