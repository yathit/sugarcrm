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
 * @fileoverview Account group.
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */


goog.provide('ydn.crm.sugarcrm.ui.group.Account');
goog.require('ydn.crm.sugarcrm.ui.group.AbstractGroup');
goog.require('ydn.crm.sugarcrm.ui.widget.SelectRecord');
goog.require('ydn.crm.ui');



/**
 * Account group controller.
 * @param {ydn.crm.sugarcrm.model.BaseGroup} model
 * @param {goog.dom.DomHelper=} opt_dom
 * @constructor
 * @struct
 * @extends {ydn.crm.sugarcrm.ui.group.AbstractGroup}
 */
ydn.crm.sugarcrm.ui.group.Account = function(model, opt_dom) {
  ydn.crm.sugarcrm.ui.group.Account.base(this, 'constructor', model, opt_dom);

};
goog.inherits(ydn.crm.sugarcrm.ui.group.Account, ydn.crm.sugarcrm.ui.group.AbstractGroup);


/**
 * @override
 */
ydn.crm.sugarcrm.ui.group.Account.prototype.createDom = function() {
  var t = ydn.ui.getTemplateById('select-record-template').content;
  this.decorateInternal(t.cloneNode(true));
};


/**
 * @override
 */
ydn.crm.sugarcrm.ui.group.Account.prototype.enterDocument = function() {
  ydn.crm.sugarcrm.ui.group.Account.base(this, 'enterDocument');
  var input = this.getElement().querySelector('input');
  this.getHandler().listen(input, goog.dom.TagName.FOCUS, this.onInputFocus_);
};


/**
 * @param {goog.events.BrowserEvent} e
 * @private
 */
ydn.crm.sugarcrm.ui.group.Account.prototype.onInputFocus_ = function(e) {
  var m = this.getModel();
  var sel = ydn.crm.sugarcrm.ui.widget.SelectRecord.getInstanceFor(
      m.getMeta(), m.getModuleName());
  sel.attach(this.getElement());
};



