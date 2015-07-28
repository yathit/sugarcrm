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
 * @fileoverview SugarCRM record page for desktop.
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */


goog.provide('ydn.crm.su.ui.RecordPage');
goog.require('ydn.crm.su.ui.record.Record');
goog.require('ydn.crm.ui.IDesktopPage');



/**
 * SugarCRM record page for desktop.
 * @param {goog.dom.DomHelper=} opt_dom
 * @constructor
 * @struct
 * @extends {goog.ui.Component}
 * @implements {ydn.crm.ui.IDesktopPage}
 */
ydn.crm.su.ui.RecordPage = function(opt_dom) {
  goog.base(this, opt_dom);
  /**
   * @type {ydn.crm.su.ModuleName|string}
   * @private
   */
  this.module_ = ydn.crm.su.ModuleName.CONTACTS;
};
goog.inherits(ydn.crm.su.ui.RecordPage, goog.ui.Component);


/**
 * @define {boolean} debug flag.
 */
ydn.crm.su.ui.RecordPage.DEBUG = false;


/**
 * @const
 * @type {string}
 */
ydn.crm.su.ui.RecordPage.CSS_CLASS = 'record-page';


/**
 * @param {ydn.crm.su.model.Sugar} sugar
 */
ydn.crm.su.ui.RecordPage.prototype.setSugar = function(sugar) {
  var child = /** @type {ydn.crm.su.ui.record.Record} */(this.getChildAt(0));
  if (child) {
    this.removeChildAt(0, true);
    child.dispose();
  }
  if (!sugar) {
    return;
  }
  var record = new ydn.crm.su.model.Record(sugar,
      new ydn.crm.su.Record(sugar.getDomain(), ydn.crm.su.ModuleName.CONTACTS));
  child = new ydn.crm.su.ui.record.Record(record, this.getDomHelper());
  this.addChild(child, true);
};


/**
 * @override
 */
ydn.crm.su.ui.RecordPage.prototype.toString = function() {
  return ydn.crm.ui.PageName.NEW_RECORD;
};


/**
 * @override
 */
ydn.crm.su.ui.RecordPage.prototype.onPageShow = function(obj) {
  console.log(obj);
  var panel = /** @type {ydn.crm.su.ui.record.Record} */(this.getChildAt(0));
  var mn = /** @type {ydn.crm.su.ModuleName} */(obj['module']);
  panel.newRecord(mn);
};
