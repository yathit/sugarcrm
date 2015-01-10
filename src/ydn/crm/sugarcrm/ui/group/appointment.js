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
 * @fileoverview Appointment fields group.
 *
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */


goog.provide('ydn.crm.sugarcrm.ui.group.Appointment');
goog.require('ydn.crm.sugarcrm');
goog.require('ydn.crm.sugarcrm.ui.field.InlineFieldRenderer');
goog.require('ydn.crm.sugarcrm.ui.group.Group');



/**
 * Appointment fields group.
 * @param {ydn.crm.sugarcrm.model.AppointmentGroup} model
 * @param {goog.dom.DomHelper=} opt_dom
 * @constructor
 * @struct
 * @extends {ydn.crm.sugarcrm.ui.group.AbstractGroup}
 */
ydn.crm.sugarcrm.ui.group.Appointment = function(model, opt_dom) {
  goog.base(this, model, opt_dom);
};
goog.inherits(ydn.crm.sugarcrm.ui.group.Appointment, ydn.crm.sugarcrm.ui.group.AbstractGroup);


/**
 * @return {ydn.crm.sugarcrm.model.AppointmentGroup}
 * @override
 */
ydn.crm.sugarcrm.ui.group.Appointment.prototype.getModel;


/**
 * @override
 */
ydn.crm.sugarcrm.ui.group.Appointment.prototype.createDom = function() {
  goog.base(this, 'createDom');
  var dom = this.getDomHelper();

  var model = /** @type {ydn.crm.sugarcrm.model.AppointmentGroup} */ (this.getModel());

  var start = model.createOrGetFieldModel(ydn.crm.sugarcrm.model.AppointmentGroup.FieldName.START);
  var start_ctrl = new ydn.crm.sugarcrm.ui.field.Field(start, null, dom);
  this.addChild(start_ctrl, true);

  var duration_el = dom.createDom('span', 'field-label', 'Duration: ');
  this.getContentElement().appendChild(duration_el);

  var hour = model.createOrGetFieldModel(ydn.crm.sugarcrm.model.AppointmentGroup.FieldName.HOUR);
  var inline = ydn.crm.sugarcrm.ui.field.InlineFieldRenderer.getInstance();
  var hour_ctrl = new ydn.crm.sugarcrm.ui.field.Field(hour, inline, dom);
  this.addChild(hour_ctrl, true);
  var hour_el = hour_ctrl.getElement().querySelector('input');
  hour_el.classList.add('double-digit');
  hour_el.setAttribute('type', 'number');
  hour_el.setAttribute('min', '0');

  var minute = model.createOrGetFieldModel(ydn.crm.sugarcrm.model.AppointmentGroup.FieldName.MINUTE);
  var minute_ctrl = new ydn.crm.sugarcrm.ui.field.Field(minute, inline, dom);
  this.addChild(minute_ctrl, true);
  var minute_el = minute_ctrl.getElement().querySelector('input');
  minute_el.classList.add('double-digit');
  minute_el.setAttribute('type', 'number');
  minute_el.setAttribute('min', '0');
  minute_el.setAttribute('max', '59');

};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.ui.group.Appointment.prototype.hasChanged = function() {
  for (var j = 0; j < this.getChildCount(); j++) {
    var f = /** @type {ydn.crm.sugarcrm.ui.field.Field} */ (this.getChildAt(j));
    if (f.hasChanged()) {
      return true;
    }
  }
  return false;
};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.ui.group.Appointment.prototype.collectData = function() {
  var obj = null;
  for (var j = 0; j < this.getChildCount(); j++) {
    var f = /** @type {ydn.crm.sugarcrm.ui.field.Field} */ (this.getChildAt(j));

    var value = f.collectData();
    if (!goog.isNull(value)) {
      if (!obj) {
        obj = {};
      }
      obj[f.getFieldName()] = value;
    }
  }
  if (ydn.crm.sugarcrm.ui.group.Group.DEBUG && obj) {
    window.console.log(this, obj);
  }
  return obj;
};


/**
 * @override
 */
ydn.crm.sugarcrm.ui.group.Appointment.prototype.refresh = function() {
  for (var i = 0; i < this.getChildCount(); i++) {
    var child = /** @type {ydn.crm.sugarcrm.ui.field.Field} */ (this.getChildAt(i));
    if (ydn.crm.sugarcrm.ui.group.Group.DEBUG && !child) {
      console.error(this + ' child ' + i + ' ' + child);
    }
    child.refresh();
  }
};




