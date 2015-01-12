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
 * @fileoverview Field selector.
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */


goog.provide('ydn.crm.sugarcrm.ui.widget.RecordMatcher');



/**
 * @param {ydn.crm.sugarcrm.Meta} meta
 * @param {ydn.crm.sugarcrm.ModuleName} m_name
 * @constructor
 * Implements {@link goog.ui.ac.AutoComplete.Matcher}
 */
ydn.crm.sugarcrm.ui.widget.RecordMatcher = function(meta, m_name) {
  /**
   *
   * @type {ydn.crm.sugarcrm.Meta}
   */
  this.meta = meta;
  this.module = m_name;
};


/**
 * Retrieve a set of matching rows from the server via ajax.
 * @param {string} token The text that should be matched; passed to the server
 *     as the 'token' query param.
 * @param {number} maxMatches The maximum number of matches requested from the
 *     server; passed as the 'max_matches' query param.  The server is
 *     responsible for limiting the number of matches that are returned.
 * @param {Function} matchHandler Callback to execute on the result after
 *     matching.
 * @param {string=} opt_fullString The full string from the input box.
 */
ydn.crm.sugarcrm.ui.widget.RecordMatcher.prototype.requestMatchingRows =
    function(token, maxMatches, matchHandler, opt_fullString) {
  var q = {
    'module': this.module,
    'limit': maxMatches,
    'keyRange': kr
  }
};


/**
 * @return {boolean}
 */
ydn.crm.sugarcrm.ui.widget.RecordMatcher.prototype.isRowDisabled = function() {
  return false;
};
