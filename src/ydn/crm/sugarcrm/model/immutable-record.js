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
 * @fileoverview SugarCRM module model.
 *
 * Unlike Record module, this module name cannot be change and parent sugar
 * module keep track of this instance. Only one type of instance can have
 * in a parent sugar model.
 */


goog.provide('ydn.crm.su.model.ImmutableRecord');

goog.require('ydn.crm.su.Record');
goog.require('ydn.crm.su.model.Record');



/**
 * SugarCRM module model. This does not instiate directly, but generate from
 * sugar.
 * <pre>
 *   var module = sugar.getModuleModel();
 * </pre>
 * @param {ydn.crm.su.model.Sugar} parent
 * @param {ydn.crm.su.ModuleName} module_name
 * @constructor
 * @extends {ydn.crm.su.model.Record}
 * @struct
 */
ydn.crm.su.model.ImmutableRecord = function(parent, module_name) {
  var r = new ydn.crm.su.Record(parent.getDomain(), module_name);
  goog.base(this, parent, r);

  /**
   * @final
   * @protected
   * @type {ydn.crm.su.ModuleName}
   */
  this.module_name = module_name;

};
goog.inherits(ydn.crm.su.model.ImmutableRecord, ydn.crm.su.model.Record);


/**
 * @define {boolean} debug flag.
 */
ydn.crm.su.model.ImmutableRecord.DEBUG = false;


/**
 * @return {ydn.crm.su.ModuleName}
 */
ydn.crm.su.model.ImmutableRecord.prototype.getModuleName = function() {
  return this.module_name;
};


/**
 * Set sugarcrm record. This will dispatch ModuleRecordChangeEvent.
 * @param {ydn.crm.su.Record} record sugarcrm record entry.
 */
ydn.crm.su.model.ImmutableRecord.prototype.setRecord = function(record) {
  // check valid record.
  if (record && record.getModule() != this.module_name) {
    throw new Error('Module name must be ' + this.module_name + ' but found ' +
        record.getModule());
  }
  goog.base(this, 'setRecord', record);
};


if (goog.DEBUG) {
  /**
   * @inheritDoc
   */
  ydn.crm.su.model.ImmutableRecord.prototype.toString = function() {
    return 'ydn.crm.su.model.ImmutableRecord:' + this.module_name +
        (this.record ? ':' + this.record : '');
  };
}
