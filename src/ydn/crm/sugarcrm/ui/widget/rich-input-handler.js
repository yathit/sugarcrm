// Copyright 2007 The Closure Library Authors. All Rights Reserved.
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
 * @fileoverview Input handler with custom selector.
 *
 */

goog.provide('ydn.crm.su.ui.widget.RichInputHandler');

goog.require('goog.ui.ac.InputHandler');



/**
 * Class for managing the interaction between an autocomplete object and a
 * text-input or textarea.
 * @param {ydn.crm.su.Meta} meta
 * @param {?string=} opt_separators Seperators to split multiple entries.
 * @param {?string=} opt_literals Characters used to delimit text literals.
 * @param {?boolean=} opt_multi Whether to allow multiple entries
 *     (Default: true).
 * @param {?number=} opt_throttleTime Number of milliseconds to throttle
 *     keyevents with (Default: 150).
 * @constructor
 * @extends {goog.ui.ac.InputHandler}
 */
ydn.crm.su.ui.widget.RichInputHandler = function(meta, opt_separators,
    opt_literals, opt_multi, opt_throttleTime) {
  goog.ui.ac.InputHandler.call(this, opt_separators, opt_literals,
      opt_multi, opt_throttleTime);
  /**
   * @protected
   * @type {ydn.crm.su.Meta}
   */
  this.meta = meta;

  /**
   * @type {boolean}
   * @private
   */
  this.output_as_email_ = false;
};
goog.inherits(ydn.crm.su.ui.widget.RichInputHandler, goog.ui.ac.InputHandler);


/**
 * Selects the given rich row.  The row's select(target) method is called.
 * @param {Object} row The row to select.
 * @return {boolean} Whether to suppress the update event.
 * @override
 */
ydn.crm.su.ui.widget.RichInputHandler.prototype.selectRow = function(row) {
  var input = this.ac_.getTarget();
  var record = /** @type {SugarCrm.Record} */(row);
  var label = ydn.crm.su.Record.getLabel(record);
  if (this.output_as_email_) {
    var email = ydn.crm.su.Record.getEmail(record);
    if (email) {
      label += ' <' + email + '>';
    }
  }
  input.value = label;
  input.setAttribute('data-id', record.id);
  input.setAttribute('data-name', input.value);
  var a = input.nextElementSibling;
  if (a && a.tagName == 'A' && record._module) {
    var mn = /** @type {ydn.crm.su.ModuleName} */(record._module);
    a.href = this.meta.getRecordViewLink(mn, record.id);
    goog.style.setElementShown(a, true);
  }
  return false;
};
