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
 * @fileoverview Relate record group.
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */


goog.provide('ydn.crm.sugarcrm.ui.group.Relate');
goog.require('ydn.crm.sugarcrm.model.RelateGroup');
goog.require('ydn.crm.sugarcrm.ui.group.AbstractGroup');
goog.require('ydn.crm.sugarcrm.ui.widget.SelectRecord');
goog.require('ydn.ui');



/**
 * Relate record controller.
 * @param {ydn.crm.sugarcrm.model.RelateGroup} model
 * @param {goog.dom.DomHelper=} opt_dom
 * @constructor
 * @struct
 * @extends {ydn.crm.sugarcrm.ui.group.AbstractGroup}
 */
ydn.crm.sugarcrm.ui.group.Relate = function(model, opt_dom) {
  ydn.crm.sugarcrm.ui.group.Relate.base(this, 'constructor', model, opt_dom);

};
goog.inherits(ydn.crm.sugarcrm.ui.group.Relate, ydn.crm.sugarcrm.ui.group.AbstractGroup);


/**
 * @return {ydn.crm.sugarcrm.model.RelateGroup}
 * @override
 */
ydn.crm.sugarcrm.ui.group.Relate.prototype.getModel;


/**
 * @override
 */
ydn.crm.sugarcrm.ui.group.Relate.prototype.createDom = function() {
  ydn.crm.sugarcrm.ui.group.Relate.base(this, 'createDom');
  var t = goog.soy.renderAsElement(templ.ydn.crm.inj.selectRecord, {});
  this.getContentElement().appendChild(t);
};


/**
 * @override
 */
ydn.crm.sugarcrm.ui.group.Relate.prototype.enterDocument = function() {
  ydn.crm.sugarcrm.ui.group.Relate.base(this, 'enterDocument');
  var input = this.getElement().querySelector('input');
  this.getHandler().listen(input, goog.events.EventType.FOCUS, this.onInputFocus_);
  this.getHandler().listen(input, goog.events.EventType.BLUR, this.onInputBlur);
};


/**
 * @param {goog.events.BrowserEvent} e
 * @private
 */
ydn.crm.sugarcrm.ui.group.Relate.prototype.onInputFocus_ = function(e) {
  var m = this.getModel();
  var sel = ydn.crm.sugarcrm.ui.widget.SelectRecord.getInstanceFor(
      m.getMeta(), ydn.crm.sugarcrm.ModuleName.ACCOUNTS);
  sel.attach(this.getInput_().parentElement);
};


/**
 * @param {goog.events.BrowserEvent} e
 * @protected
 */
ydn.crm.sugarcrm.ui.group.Relate.prototype.onInputBlur = function(e) {
  if (!this.hasChanged()) {
    return;
  }
  var patch = this.collectData();
  var ev = new ydn.crm.sugarcrm.ui.events.ChangedEvent(this.collectData(), this);
  this.dispatchEvent(ev);
};


/**
 * @return {Element}
 * @private
 */
ydn.crm.sugarcrm.ui.group.Relate.prototype.getInput_ = function() {
  return this.getContentElement().querySelector('input');
};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.ui.group.Relate.prototype.reset = function() {
  var input = this.getInput_();
  input.removeAttribute('data-id');
};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.ui.group.Relate.prototype.refresh = function() {
  var input = this.getInput_();
  /**
   * @type {ydn.crm.sugarcrm.model.RelateGroup}
   */
  var model = this.getModel();
  var name = model.valueAsString(model.getRelateFieldName());
  input.value = name;
  input.setAttribute('data-id', model.valueAsString(model.getRelateFieldId()));
  input.setAttribute('data-name', name);
};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.ui.group.Relate.prototype.collectData = function() {
  var input = this.getInput_();
  var id_field = model.getRelateFieldId();
  var name_field = model.getRelateFieldName();
  var data = {
  };
  data['account_id'] = input.getAttribute('data-id');
  data['account_name'] = input.getAttribute('data-name');
  return data;
};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.ui.group.Relate.prototype.hasChanged = function() {
  var input = this.getInput_();
  var id_field = model.getRelateFieldId();
  return input.getAttribute('data-id') != this.getModel().getStringValue(id_field);
};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.ui.group.Relate.prototype.getPatch = function() {
  if (this.hasChanged()) {
    return this.collectData();
  } else {
    return null;
  }
};
