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


goog.provide('ydn.crm.su.ui.GDataRecord');
goog.require('ydn.crm.su.ui.record.Record');



/**
 * New record create panel.
 * @param {ydn.crm.su.model.Record} model
 * @param {goog.dom.DomHelper=} opt_dom
 * @constructor
 * @struct
 * @extends {ydn.crm.su.ui.record.Record}
 */
ydn.crm.su.ui.GDataRecord = function(model, opt_dom) {
  goog.base(this, model, opt_dom);
};
goog.inherits(ydn.crm.su.ui.GDataRecord, ydn.crm.su.ui.record.Record);


/**
 * @define {boolean} debug flag.
 */
ydn.crm.su.ui.GDataRecord.DEBUG = false;


/**
 * @const
 * @type {string}
 */
ydn.crm.su.ui.GDataRecord.CSS_CLASS = 'new-record';


/**
 * @override
 */
ydn.crm.su.ui.GDataRecord.prototype.getCssClass = function() {
  return goog.base(this, 'getCssClass') + ' ' + ydn.crm.su.ui.GDataRecord.CSS_CLASS;
};


/**
 * @inheritDoc
 */
ydn.crm.su.ui.GDataRecord.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  var model = this.getModel();
  this.getHandler().listen(model.parent, ydn.crm.su.model.events.Type.CONTEXT_CHANGE,
      this.onContextChange_);
};


/**
 * @private
 * @param {ydn.crm.su.model.events.ContextChangeEvent} e
 */
ydn.crm.su.ui.GDataRecord.prototype.onContextChange_ = function(e) {
  var model = this.getModel();
  if (ydn.crm.su.ui.record.Record.DEBUG) {
    window.console.log('onContextChange: ' + e.record);
  }
  if (e.record) {
    model.setRecord(e.record);
  } else {
    var record = new ydn.crm.su.Record(model.getDomain(), model.getModuleName());
    model.setRecord(record);
  }
};


/**
 * @override
 */
ydn.crm.su.ui.GDataRecord.prototype.getNewModuleList = function() {
  return [];
};


/**
 * @override
 */
ydn.crm.su.ui.GDataRecord.prototype.getDuplicateModuleList = function() {
  return ydn.crm.su.PEOPLE_MODULES;
};
