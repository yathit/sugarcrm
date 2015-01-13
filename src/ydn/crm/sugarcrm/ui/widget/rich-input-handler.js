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

goog.provide('ydn.crm.sugarcrm.ui.widget.RichInputHandler');

goog.require('goog.ui.ac.InputHandler');



/**
 * Class for managing the interaction between an autocomplete object and a
 * text-input or textarea.
 * @param {ydn.crm.sugarcrm.Meta} meta
 * @param {?string=} opt_separators Seperators to split multiple entries.
 * @param {?string=} opt_literals Characters used to delimit text literals.
 * @param {?boolean=} opt_multi Whether to allow multiple entries
 *     (Default: true).
 * @param {?number=} opt_throttleTime Number of milliseconds to throttle
 *     keyevents with (Default: 150).
 * @constructor
 * @extends {goog.ui.ac.InputHandler}
 */
ydn.crm.sugarcrm.ui.widget.RichInputHandler = function(meta, opt_separators,
    opt_literals, opt_multi, opt_throttleTime) {
  goog.ui.ac.InputHandler.call(this, opt_separators, opt_literals,
      opt_multi, opt_throttleTime);
  /**
   * @protected
   * @type {ydn.crm.sugarcrm.Meta}
   */
  this.meta = meta;
};
goog.inherits(ydn.crm.sugarcrm.ui.widget.RichInputHandler, goog.ui.ac.InputHandler);


/**
 * Selects the given rich row.  The row's select(target) method is called.
 * @param {Object} row The row to select.
 * @return {boolean} Whether to suppress the update event.
 * @override
 */
ydn.crm.sugarcrm.ui.widget.RichInputHandler.prototype.selectRow = function(row) {
  var suppressUpdate = ydn.crm.sugarcrm.ui.widget.RichInputHandler.superClass_
      .selectRow.call(this, row);
  var input = this.ac_.getTarget();
  var record = /** @type {SugarCrm.Record} */(row);
  input.value = record.name;
  input.setAttribute('data-id', record.id);
  var a = input.nextElementSibling;
  if (a.tagName == 'A' && record._module) {
    var mn = /** @type {ydn.crm.sugarcrm.ModuleName} */(record._module);
    a.href = this.meta.getRecordViewLink(mn, record.id);
    goog.style.setElementShown(a, true);
  }
  return suppressUpdate;
};
