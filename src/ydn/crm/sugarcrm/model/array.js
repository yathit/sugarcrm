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
 * @fileoverview SugarCRM group model composes of field with same types.
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */


goog.provide('ydn.crm.sugarcrm.model.Array');
goog.require('ydn.crm.sugarcrm.model.Group');
goog.require('ydn.crm.sugarcrm.model.Field');



/**
 * SugarCRM group model composes of field with same types.
 * @param {ydn.crm.sugarcrm.model.Record} parent
 * @param {string} group_name
 * @constructor
 * @extends {ydn.crm.sugarcrm.model.Group}
 * @struct
 */
ydn.crm.sugarcrm.model.Array = function(parent, group_name) {
  goog.base(this, parent, group_name);
};
goog.inherits(ydn.crm.sugarcrm.model.Array, ydn.crm.sugarcrm.model.Group);


/**
 * @define {boolean} debug flag.
 */
ydn.crm.sugarcrm.model.Array.DEBUG = false;

