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
 * @fileoverview Suggested record.
 *
 * A group control for relate type. This control provide auto-suggestion input
 * of the relation record. The primary field is record id, such as, `account_id`,
 * `contact_id`, or `parent_id`.
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */


goog.provide('ydn.crm.su.ui.group.SuggestedRecord');
goog.require('ydn.crm.su.model.RelateGroup');
goog.require('ydn.crm.su.ui.field.FieldRenderer');
goog.require('ydn.crm.su.ui.group.AbstractGroup');
goog.require('ydn.crm.su.ui.widget.SelectRecord');
goog.require('ydn.ui');



/**
 * Suggested record component.
 * @param {ydn.crm.su.model.RelateGroup} model
 * @param {goog.dom.DomHelper=} opt_dom
 * @constructor
 * @struct
 * @extends {ydn.crm.su.ui.group.AbstractGroup}
 */
ydn.crm.su.ui.group.SuggestedRecord = function(model, opt_dom) {
  ydn.crm.su.ui.group.SuggestedRecord.base(this, 'constructor', model, opt_dom);

};
goog.inherits(ydn.crm.su.ui.group.SuggestedRecord, ydn.crm.su.ui.group.AbstractGroup);


/**
 * @return {ydn.crm.su.model.RelateGroup}
 * @override
 */
ydn.crm.su.ui.group.SuggestedRecord.prototype.getModel;


/**
 * @override
 */
ydn.crm.su.ui.group.SuggestedRecord.prototype.createDom = function() {
  ydn.crm.su.ui.group.SuggestedRecord.base(this, 'createDom');
  var t = goog.soy.renderAsElement(templ.ydn.crm.inj.selectRecord, {});
  this.getContentElement().appendChild(t);
};


/**
 * @override
 */
ydn.crm.su.ui.group.SuggestedRecord.prototype.enterDocument = function() {
  ydn.crm.su.ui.group.SuggestedRecord.base(this, 'enterDocument');
  var input = this.getInputElement();
  this.getHandler().listen(input, goog.events.EventType.FOCUS, this.onInputFocus_);
  this.getHandler().listen(input, goog.events.EventType.BLUR, this.onInputBlur);
};


/**
 * @return {ydn.crm.su.ModuleName}
 */
ydn.crm.su.ui.group.SuggestedRecord.prototype.getRelateModuleName = function() {
  return this.getModel().getRelateModuleName();
};


/**
 * @param {goog.events.BrowserEvent} e
 * @private
 */
ydn.crm.su.ui.group.SuggestedRecord.prototype.onInputFocus_ = function(e) {
  var mn = this.getRelateModuleName();
  var idx = ydn.crm.su.CacheModules.indexOf(mn);
  if (idx >= 0) {
    var sel = ydn.crm.su.ui.widget.SelectRecord.getInstanceFor(
        this.getModel().getMeta(), mn);
    sel.attach(this.getContentElement().querySelector('.select-record'));
  }
};


/**
 * @param {goog.events.BrowserEvent} e
 * @protected
 */
ydn.crm.su.ui.group.SuggestedRecord.prototype.onInputBlur = function(e) {
  if (!this.hasChanged()) {
    return;
  }
  var patch = this.collectData();
  var ev = new ydn.crm.su.ui.events.ChangedEvent(this.collectData(), this);
  this.dispatchEvent(ev);
};


/**
 * @return {Element}
 * @protected
 */
ydn.crm.su.ui.group.SuggestedRecord.prototype.getInputElement = function() {
  return this.getContentElement().querySelector('.select-record input.value');
};


/**
 * @inheritDoc
 */
ydn.crm.su.ui.group.SuggestedRecord.prototype.reset = function() {
  var input = this.getInputElement();
  input.removeAttribute('data-id');
  /**
   * @type {ydn.crm.su.model.RelateGroup}
   */
  var model = this.getModel();
  input.setAttribute('placeholder', model.getGroupLabel());
  input.setAttribute('data-tooltip', model.getGroupLabel());
};


/**
 * @inheritDoc
 */
ydn.crm.su.ui.group.SuggestedRecord.prototype.refresh = function() {
  var input = this.getInputElement();
  /**
   * @type {ydn.crm.su.model.RelateGroup}
   */
  var model = this.getModel();
  var name = model.valueAsString(model.getRelateFieldName());
  var id = model.valueAsString(model.getRelateFieldId());
  input.value = name;
  input.setAttribute('data-id', id);
  input.setAttribute('data-name', name);
  var root = this.getElement();
  if (id) {
    root.classList.remove(ydn.crm.su.ui.field.FieldRenderer.CSS_CLASS_EMPTY);
  } else {
    root.classList.add(ydn.crm.su.ui.field.FieldRenderer.CSS_CLASS_EMPTY);
  }
};


/**
 * @inheritDoc
 */
ydn.crm.su.ui.group.SuggestedRecord.prototype.collectData = function() {
  var input = this.getInputElement();
  /**
   * @type {ydn.crm.su.model.RelateGroup}
   */
  var model = this.getModel();
  var id_field = model.getRelateFieldId();
  var name_field = model.getRelateFieldName();
  var data = {
  };
  data[id_field] = input.getAttribute('data-id');
  data[name_field] = input.getAttribute('data-name');
  return data;
};


/**
 * @inheritDoc
 */
ydn.crm.su.ui.group.SuggestedRecord.prototype.hasChanged = function() {
  var input = this.getInputElement();
  var model = this.getModel();
  var id_field = model.getRelateFieldId();
  return input.getAttribute('data-id') != this.getModel().getStringValue(id_field);
};


/**
 * @inheritDoc
 */
ydn.crm.su.ui.group.SuggestedRecord.prototype.getPatch = function() {
  if (this.hasChanged()) {
    return this.collectData();
  } else {
    return null;
  }
};
