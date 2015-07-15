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


goog.provide('ydn.crm.su.ui.group.Parent');
goog.require('ydn.crm.su.model.ParentRelateGroup');
goog.require('ydn.crm.su.ui.group.SuggestedRecord');
goog.require('ydn.crm.su.ui.widget.SelectRecord');
goog.require('ydn.ui');



/**
 * Suggested record component.
 * @param {ydn.crm.su.model.ParentRelateGroup} model
 * @param {goog.dom.DomHelper=} opt_dom
 * @constructor
 * @struct
 * @extends {ydn.crm.su.ui.group.SuggestedRecord}
 */
ydn.crm.su.ui.group.Parent = function(model, opt_dom) {
  ydn.crm.su.ui.group.Parent.base(this, 'constructor', model, opt_dom);

};
goog.inherits(ydn.crm.su.ui.group.Parent, ydn.crm.su.ui.group.SuggestedRecord);


/**
 * @return {ydn.crm.su.model.ParentRelateGroup}
 * @override
 */
ydn.crm.su.ui.group.Parent.prototype.getModel;


/**
 * @override
 */
ydn.crm.su.ui.group.Parent.prototype.createDom = function() {
  ydn.crm.su.ui.group.Parent.base(this, 'createDom');
  var sel = this.getTypeSelElement();
  goog.style.setElementShown(sel, true);
};


/**
 * @override
 */
ydn.crm.su.ui.group.Parent.prototype.enterDocument = function() {
  ydn.crm.su.ui.group.Parent.base(this, 'enterDocument');

};


/**
 * @inheritDoc
 */
ydn.crm.su.ui.group.Parent.prototype.reset = function() {
  ydn.crm.su.ui.group.Parent.base(this, 'reset');
  var sel_type = this.getTypeSelElement();
  if (sel_type.tagName == 'INPUT') {
    sel_type.setAttribute('list', this.getDataListId());
  } else if (sel_type.tagName == 'SELECT') {
    sel_type.innerHTML = '';
    var model =  this.getModel();
    var meta = model.getMeta();
    var options = model.getParentTypeOptions();
    for (var i = 0; i < options.length; i++) {
      var mn = model.optionValue2ModuleName(options[i]);
      if (!mn) {
        continue;
      }
      var option = document.createElement('option');
      option.value = mn;
      option.textContent = options[i];
      sel_type.appendChild(option);
    }
  }
  sel_type.value = this.getModel().getDefaultParentType();
};


/**
 * @return {string} data list id for parent type input.
 */
ydn.crm.su.ui.group.Parent.prototype.getDataListId = function() {
  var id = 'list-' + this.getModel().getModuleName() + '-parent-type';
  if (!document.getElementById('id')) {
    var list = document.createElement('datalist');
    var options = this.getModel().getParentTypeOptions();
    for (var i = 0; i < options.length; i++) {
      var option = document.createElement('option');
      option.value = options[i];
      list.appendChild(option);
    }
    list.id = id;
    document.body.appendChild(list);
  }
  return id;
};


/**
 * @override
 */
ydn.crm.su.ui.group.Parent.prototype.getRelateModuleName = function() {
  var val = /** @type {ydn.crm.su.ModuleName} */(this.getTypeSelElement().value);
  return val || ydn.crm.su.ui.group.Parent.base(this, 'getRelateModuleName');
};


/**
 * @inheritDoc
 */
ydn.crm.su.ui.group.Parent.prototype.refresh = function() {
  ydn.crm.su.ui.group.Parent.base(this, 'refresh');
  /**
   * @type {ydn.crm.su.model.ParentRelateGroup}
   */
  var model = this.getModel();
  var sel_type = this.getTypeSelElement();
  sel_type.value = model.valueAsString(model.getRelateFieldType()) ||
      model.getDefaultParentType();
};


/**
 * @inheritDoc
 */
ydn.crm.su.ui.group.Parent.prototype.collectData = function() {
  var data = ydn.crm.su.ui.group.Parent.base(this, 'collectData');
  /**
   * @type {ydn.crm.su.model.ParentRelateGroup}
   */
  var model = this.getModel();
  if (data) {
    var type_field = model.getRelateFieldType();
    data[type_field] = this.getRelateModuleName();
  }
  return data;
};
