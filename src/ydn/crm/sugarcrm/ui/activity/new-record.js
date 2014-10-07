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


goog.provide('ydn.crm.sugarcrm.ui.activity.NewRecord');
goog.require('goog.ui.Component');
goog.require('goog.ui.Option');
goog.require('goog.ui.Select');
goog.require('ydn.crm.sugarcrm.ui.record.Record');



/**
 * New record create panel.
 * @param {ydn.crm.sugarcrm.model.Sugar} model
 * @param {goog.dom.DomHelper=} opt_dom
 * @constructor
 * @struct
 * @extends {goog.ui.Component}
 * @suppress {checkStructDictInheritance} suppress closure-library code.
 */
ydn.crm.sugarcrm.ui.activity.NewRecord = function(model, opt_dom) {
  goog.base(this, opt_dom);
  this.setModel(model);
};
goog.inherits(ydn.crm.sugarcrm.ui.activity.NewRecord, goog.ui.Component);


/**
 * @define {boolean} debug flag.
 */
ydn.crm.sugarcrm.ui.activity.NewRecord.DEBUG = false;


/**
 * @return {ydn.crm.sugarcrm.model.Sugar}
 * @override
 */
ydn.crm.sugarcrm.ui.activity.NewRecord.prototype.getModel;


/**
 * @const
 * @type {string}
 */
ydn.crm.sugarcrm.ui.activity.NewRecord.CSS_CLASS = 'new-record';


/**
 * @const
 * @type {string}
 */
ydn.crm.sugarcrm.ui.activity.NewRecord.CSS_CLASS_DETAIL = 'record-detail';


/** @return {string} */
ydn.crm.sugarcrm.ui.activity.NewRecord.prototype.getCssClass = function() {
  return ydn.crm.sugarcrm.ui.activity.NewRecord.CSS_CLASS;
};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.ui.activity.NewRecord.prototype.createDom = function() {
  goog.base(this, 'createDom');
  var dom = this.dom_;
  var root = this.getElement();
  root.classList.add(this.getCssClass());
  var head = dom.createDom('div', ydn.crm.ui.CSS_CLASS_HEAD);
  root.appendChild(head);
  var content = dom.createDom('div', ydn.crm.ui.CSS_CLASS_CONTENT);
  root.appendChild(content);

  var type = ydn.crm.sugarcrm.DEFAULT_MODULE;

  var sugar = this.getModel();
  var r = new ydn.crm.sugarcrm.model.Record(sugar,
      new ydn.crm.sugarcrm.Record(sugar.getDomain(), type));
  var record = new ydn.crm.sugarcrm.ui.record.Record(r, dom);

  this.addChild(record, true);
};


/**
 * @return {Element}
 */
ydn.crm.sugarcrm.ui.activity.NewRecord.prototype.getHeadElement = function() {
  return this.getElement().querySelector('.' + ydn.crm.ui.CSS_CLASS_HEAD);
};


/**
 * NOTE: use only in testing.
 * @return {ydn.crm.sugarcrm.ui.record.Record}
 */
ydn.crm.sugarcrm.ui.activity.NewRecord.prototype.getRecordPanel = function() {
  for (var i = 0; i < this.getChildCount(); i++) {
    var c = this.getChildAt(i);
    if (c instanceof ydn.crm.sugarcrm.ui.record.Record) {
      return c;
    }
  }
  return null;
};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.ui.activity.NewRecord.prototype.getContentElement = function() {
  return this.getElement().querySelector('.' + ydn.crm.ui.CSS_CLASS_CONTENT);
};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.ui.activity.NewRecord.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  var hd = this.getHandler();
  var record = this.getRecordPanel();
  record.setEditMode(true);
};

