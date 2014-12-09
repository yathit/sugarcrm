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


goog.provide('ydn.crm.sugarcrm.ui.field.Email');
goog.require('ydn.crm.sugarcrm.ui.field.Field');



/**
 * Panel for listed items.
 * @param {ydn.crm.sugarcrm.model.EmailField} model
 * @param {goog.dom.DomHelper=} opt_dom
 * @constructor
 * @struct
 * @extends {ydn.crm.sugarcrm.ui.field.Field}
 */
ydn.crm.sugarcrm.ui.field.Email = function(model, opt_dom) {
  var renderer = ydn.crm.sugarcrm.ui.field.InputFieldRenderer.getInstance();
  goog.base(this, model, renderer, opt_dom);
};
goog.inherits(ydn.crm.sugarcrm.ui.field.Email, ydn.crm.sugarcrm.ui.field.Field);


/**
 * @return {ydn.crm.sugarcrm.model.EmailField}
 * @override
 */
ydn.crm.sugarcrm.ui.field.Email.prototype.getModel;


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.ui.field.Email.prototype.createClearPatch = function() {
  return this.getModel().removeEmail();
};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.ui.field.Email.prototype.createDom = function() {
  ydn.crm.sugarcrm.ui.field.Email.base(this, 'createDom');
  var m = /** @type {ydn.crm.sugarcrm.model.EmailField} */ (this.getModel());
  if (!m.getMeta().isVersion7() && this.getFieldName() == 'email') {
    // in SugarCRM v6, the field 'email' is not used
    this.setNormallyHide(true);
  }
};
