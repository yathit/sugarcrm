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
 * @fileoverview Panel for listed items.
 *
 * This module provide adding, linking and syncing.
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */


goog.provide('ydn.crm.sugarcrm.ui.group.Phone');
goog.require('ydn.crm.sugarcrm');
goog.require('ydn.crm.sugarcrm.ui.group.List');



/**
 * Panel for listed items.
 * @param {ydn.crm.sugarcrm.model.PhoneGroup} model
 * @param {goog.dom.DomHelper=} opt_dom
 * @constructor
 * @struct
 * @extends {ydn.crm.sugarcrm.ui.group.List}
 */
ydn.crm.sugarcrm.ui.group.Phone = function(model, opt_dom) {
  goog.base(this, model, opt_dom);
};
goog.inherits(ydn.crm.sugarcrm.ui.group.Phone, ydn.crm.sugarcrm.ui.group.List);





