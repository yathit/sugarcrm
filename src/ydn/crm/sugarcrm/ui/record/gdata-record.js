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
 * @fileoverview New record create panel.
 *
 * Note: Events are handled by the parent activity panel.
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */


goog.provide('ydn.crm.sugarcrm.ui.GDataRecord');
goog.require('ydn.crm.sugarcrm.ui.record.Record');



/**
 * New record create panel.
 * @param {ydn.crm.sugarcrm.model.Record} model
 * @param {goog.dom.DomHelper=} opt_dom
 * @constructor
 * @struct
 * @extends {ydn.crm.sugarcrm.ui.record.Record}
 */
ydn.crm.sugarcrm.ui.GDataRecord = function(model, opt_dom) {
  goog.base(this, model, opt_dom);
};
goog.inherits(ydn.crm.sugarcrm.ui.GDataRecord, ydn.crm.sugarcrm.ui.record.Record);


/**
 * @define {boolean} debug flag.
 */
ydn.crm.sugarcrm.ui.GDataRecord.DEBUG = false;


/**
 * @const
 * @type {string}
 */
ydn.crm.sugarcrm.ui.GDataRecord.CSS_CLASS = 'new-record';


/**
 * @override
 */
ydn.crm.sugarcrm.ui.GDataRecord.prototype.getCssClass = function() {
  return goog.base(this, 'getCssClass') + ' ' + ydn.crm.sugarcrm.ui.GDataRecord.CSS_CLASS;
};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.ui.GDataRecord.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  var model = this.getModel();
  this.getHandler().listen(model.parent, ydn.crm.sugarcrm.model.events.Type.CONTEXT_CHANGE,
      this.onContextChange_);
};


/**
 * @private
 * @param {ydn.crm.sugarcrm.model.events.ContextChangeEvent} e
 */
ydn.crm.sugarcrm.ui.GDataRecord.prototype.onContextChange_ = function(e) {
  var model = this.getModel();
  if (ydn.crm.sugarcrm.ui.record.Record.DEBUG) {
    window.console.log('onContextChange: ' + e.record);
  }
  if (e.record) {
    model.setRecord(e.record);
  } else if (!e.record) {
    var record = new ydn.crm.sugarcrm.Record(model.getDomain(), model.getModuleName());
    model.setRecord(record);
  }
};


/**
 * @override
 */
ydn.crm.sugarcrm.ui.GDataRecord.prototype.getNewModuleList = function() {
  return [];
};


/**
 * @override
 */
ydn.crm.sugarcrm.ui.GDataRecord.prototype.getDuplicateModuleList = function() {
  return ydn.crm.sugarcrm.PEOPLE_MODULES;
};
