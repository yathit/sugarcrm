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
 * @fileoverview Record field selector.
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */


goog.provide('ydn.crm.su.ui.widget.SelectRecord');
goog.require('goog.ui.ac.ArrayMatcher');
goog.require('goog.ui.ac.AutoComplete');
goog.require('goog.ui.ac.Renderer');
goog.require('ydn.crm.su.ui.widget.RecordMatcher');
goog.require('ydn.crm.su.ui.widget.RichInputHandler');
goog.require('ydn.crm.su.ui.widget.RowRenderer');
goog.require('ydn.crm.ui');



/**
 * Record field selector.
 *
 * Provide auto-suggestion input box for selecting existing record from database.
 * Record are suggested by prefix search on email, name, id and full text search
 * on name, title and description.
 *
 * A link is provided after selection.
 * <pre>
 *   var sr = ydn.crm.su.ui.widget.SelectRecord.getInstanceFor(sugar, 'Leads');
 *   var span = document.createElement('span');
 *   span.className = 'select-record';
 *   var input = document.createElement('input');
 *   input.className = 'value';
 *   span.appendChild(input);
 *   span.onfocus = function() {
 *     sr.attach(span);
 *   };
 *   // listen to goog.ui.ac.AutoComplete.EventType.UPDATE event for changes
 *   goog.events.listen(sr, goog.ui.ac.AutoComplete.EventType.UPDATE, function(e) {
 *     console.log(e);
 *   });
 * </pre>
 * @param {ydn.crm.su.Meta} meta
 * @param {ydn.crm.su.ModuleName=} opt_m_name default to Contacts module.
 * @param {Element=} opt_node optional reference to the parent element
 *     that will hold the autocomplete elements. goog.dom.getDocument().body
 *     will be used if this is null.
 * @param {boolean=} opt_multi multiple field selector.
 * @constructor
 * @struct
 * @extends {goog.events.EventTarget}
 */
ydn.crm.su.ui.widget.SelectRecord = function(meta, opt_m_name, opt_node, opt_multi) {
  goog.base(this);
  /**
   * @type {ydn.crm.su.Meta}
   * @protected
   */
  this.sugar = meta;

  var m_name = opt_m_name || ydn.crm.su.ModuleName.CONTACTS;
  /**
   * @protected
   * @type {ydn.crm.su.ui.widget.RecordMatcher}
   */
  this.matcher = new ydn.crm.su.ui.widget.RecordMatcher(meta, m_name);
  var r = ydn.crm.su.ui.widget.RowRenderer.getInstance();
  this.renderer = new goog.ui.ac.Renderer(opt_node, r);
  this.renderer.setAutoPosition(true);
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
  this.ac = new goog.ui.ac.AutoComplete(this.matcher, this.renderer, this.input_handler);
  this.input_handler.attachAutoComplete(this.ac);

  /**
   * @type {Element}
   * @private
   */
  this.input_ = null;

  /**
   * @protected
   * @type {goog.events.EventHandler}
   */
  this.handler = new goog.events.EventHandler(this);

  this.handler.listen(this.ac, [goog.ui.ac.AutoComplete.EventType.UPDATE], this.delegateEvent_);

};
goog.inherits(ydn.crm.su.ui.widget.SelectRecord, goog.events.EventTarget);


/**
 * @param {goog.events.Event} e
 * @private
 */
ydn.crm.su.ui.widget.SelectRecord.prototype.delegateEvent_ = function(e) {
  this.dispatchEvent(e);
};


/**
 * @const
 * @type {string}
 */
ydn.crm.su.ui.widget.SelectRecord.CSS_CLASS = 'select-record';


/**
 * Set output to email format, e.g:
 *   Kyaw Tun <kyawtun@yathit.com>
 * @param {boolean} val option value.
 */
ydn.crm.su.ui.widget.SelectRecord.prototype.setEmailOutput = function(val) {
  this.input_handler.output_as_email = !!val;
};


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
 * @param {Element} el select record Element build by
 * {@link templ.ydn.crm.inj.selectRecord}
 * template.
 */
ydn.crm.su.ui.widget.SelectRecord.prototype.attach = function(el) {
  var input = el.querySelector('.select-record input.value');
  if (input == this.input_) {
    return;
  }
  this.detach();
  this.input_ = input;
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


/**
 * @override
 */
ydn.crm.su.ui.widget.SelectRecord.prototype.disposeInternal = function() {
  this.renderer.dispose();
  this.input_handler.dispose();
  this.ac.dispose();
  this.handler.dispose();
  this.renderer = null;
  this.matcher = null;
  this.input_handler = null;
  this.handler = null;
  this.ac = null;
  this.sugar = null;
  ydn.crm.su.ui.widget.SelectRecord.base(this, 'disposeInternal');
};
