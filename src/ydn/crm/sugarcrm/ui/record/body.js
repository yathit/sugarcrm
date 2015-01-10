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
 * @fileoverview Render record body component.
 *
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */


goog.provide('ydn.crm.sugarcrm.ui.record.Body');



/**
 * Record body panel.
 * @param {ydn.crm.sugarcrm.model.Record} model
 * @param {goog.dom.DomHelper} dom
 * @constructor
 * @struct
 * @extends {goog.ui.Component}
 * @suppress {checkStructDictInheritance} suppress closure-library code.
 */
ydn.crm.sugarcrm.ui.record.Body = function(model, dom) {
  goog.base(this, dom);
  this.setModel(model);
};
goog.inherits(ydn.crm.sugarcrm.ui.record.Body, goog.ui.Component);


/**
 * @define {boolean} debug flag.
 */
ydn.crm.sugarcrm.ui.record.Body.DEBUG = false;


/**
 * @return {ydn.crm.sugarcrm.model.Record}
 * @override
 */
ydn.crm.sugarcrm.ui.record.Body.prototype.getModel;


/**
 * Change edit mode.
 * @param {boolean} val
 */
ydn.crm.sugarcrm.ui.record.Body.prototype.setEditMode = function(val) {
  var root = this.getElement();
  if (val) {
    root.classList.add(ydn.crm.ui.CSS_CLASS_EDIT);
    root.classList.remove(ydn.crm.ui.CSS_CLASS_VIEW);
  } else {
    root.classList.remove(ydn.crm.ui.CSS_CLASS_EDIT);
    root.classList.add(ydn.crm.ui.CSS_CLASS_VIEW);
  }
};


/**
 * @param {string} field_name
 * @return {ydn.crm.sugarcrm.ui.field.Field}
 */
ydn.crm.sugarcrm.ui.record.Body.prototype.getFieldByName = function(field_name) {
  for (var i = 0; i < this.getChildCount(); i++) {
    var child = this.getChildAt(i);
    var g = /** @type {ydn.crm.sugarcrm.ui.group.Group} */ (child);
    var field = g.getFieldByName(field_name);
    if (field) {
      return field;
    }
  }
  return null;
};


/**
 * @param {string} field_name
 * @return {ydn.crm.sugarcrm.ui.group.Group}
 * @see #getChildByGroup
 */
ydn.crm.sugarcrm.ui.record.Body.prototype.getGroupByFieldName = function(field_name) {
  var model = this.getModel();
  var info = model.getFieldInfo(field_name);
  if (!info) {
    return null;
  }
  var group_name = info.group || '';
  for (var i = 0; i < this.getChildCount(); i++) {
    var child = this.getChildAt(i);
    var g = /** @type {ydn.crm.sugarcrm.ui.group.Group} */ (child);
    if (g.getGroupName() == group_name) {
      return g;
    }
  }
  return null;
};


/**
 * Get child group component by group name.
 * @param {string} group_name
 * @return {ydn.crm.sugarcrm.ui.group.Group}
 */
ydn.crm.sugarcrm.ui.record.Body.prototype.getChildByGroup = function(group_name) {

  for (var i = 0; i < this.getChildCount(); i++) {
    var child = this.getChildAt(i);
    var g = /** @type {ydn.crm.sugarcrm.ui.group.Group} */ (child);
    if (g.getGroupName() == group_name) {
      return g;
    }
  }
  return null;
};


/**
 * @param {Element} ele
 * @return {ydn.crm.sugarcrm.ui.group.Group?}
 */
ydn.crm.sugarcrm.ui.record.Body.prototype.getGroupByFieldValueElement = function(ele) {
  var group_ele = goog.dom.getAncestorByClass(ele, ydn.crm.sugarcrm.ui.group.GroupRenderer.CSS_CLASS);
  if (group_ele) {
    for (var i = 0; i < this.getChildCount(); i++) {
      var child = this.getChildAt(i);
      var g = /** @type {ydn.crm.sugarcrm.ui.group.Group} */ (child);
      // here we compare Element, but not class name, because, we want to make sure this element
      // is belong to this control.
      if (g.getElement() == group_ele) {
        return g;
      }
    }
  }
  return null;
};


/**
 * @return {boolean} true if edit mode.
 */
ydn.crm.sugarcrm.ui.record.Body.prototype.getEditMode = function() {
  return this.getElement().classList.contains(ydn.crm.ui.CSS_CLASS_EDIT);
};


/**
 * Reset control UI to initial state.
 * Record id many change or or user setting, but record type does not change.
 * @param {boolean} edit_mode
 */
ydn.crm.sugarcrm.ui.record.Body.prototype.reset = function(edit_mode) {
  var root = this.getElement();
  this.setEditMode(edit_mode);
  for (var i = 0; i < this.getChildCount(); i++) {
    var child = this.getChildAt(i);
    var g = /** @type {ydn.crm.sugarcrm.ui.group.Group} */ (child);
    g.reset();
  }
};


/**
 * @const
 * @type {string}
 */
ydn.crm.sugarcrm.ui.record.Body.CSS_CLASS = 'record-body';


/** @return {string} */
ydn.crm.sugarcrm.ui.record.Body.prototype.getCssClass = function() {
  return ydn.crm.sugarcrm.ui.record.Body.CSS_CLASS;
};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.ui.record.Body.prototype.createDom = function() {
  goog.base(this, 'createDom');
  var root = this.getElement();
  root.classList.add(this.getCssClass());
  root.classList.add(ydn.crm.ui.CSS_CLASS_VIEW);
};


/**
 * Change if user change fields.
 * @return {boolean}
 */
ydn.crm.sugarcrm.ui.record.Body.prototype.hasChanged = function() {
  for (var i = 0; i < this.getChildCount(); i++) {
    var child = this.getChildAt(i);
    var g = /** @type {ydn.crm.sugarcrm.ui.group.AbstractGroup} */ (child);
    if (g.hasChanged()) {
      return true;
    }
  }
  return false;
};


/**
 * Return data from UI values. Return null, if invalid data present.
 * @return {?SugarCrm.Record} null if data is not valid.
 */
ydn.crm.sugarcrm.ui.record.Body.prototype.collectData = function() {
  var obj = null;
  for (var i = 0; i < this.getChildCount(); i++) {
    var child = this.getChildAt(i);
    var g = /** @type {ydn.crm.sugarcrm.ui.group.AbstractGroup} */ (child);
    var value = g.collectData();
    if (!goog.isNull(value)) {
      if (!obj) {
        obj = {};
      }
      for (var name in value) {
        obj[name] = value[name];
      }
    }
  }
  return /** @type {SugarCrm.Record} */ (/** @type {Object} */ (obj));
};


/**
 * Return data from UI values for only fields of user changed.
 * @return {?SugarCrm.Record} null if data is not valid or not changed.
 */
ydn.crm.sugarcrm.ui.record.Body.prototype.getPatch = function() {
  var obj = null;
  for (var i = 0; i < this.getChildCount(); i++) {
    var child = this.getChildAt(i);
    var g = /** @type {ydn.crm.sugarcrm.ui.group.AbstractGroup} */ (child);
    var value = g.getPatch();
    if (!goog.isNull(value)) {
      if (!obj) {
        obj = {};
      }
      for (var name in value) {
        obj[name] = value[name];
      }
    }
  }
  return /** @type {SugarCrm.Record} */ (/** @type {Object} */ (obj));
};


/**
 * Refresh content due to model changes. By default this will refresh all
 * children group panel.
 */
ydn.crm.sugarcrm.ui.record.Body.prototype.refresh = function() {
  for (var i = 0; i < this.getChildCount(); i++) {
    var child = this.getChildAt(i);
    var g = /** @type {ydn.crm.sugarcrm.ui.group.Group} */ (child);
    g.refresh();
  }
};


/**
 * @param {ydn.crm.sugarcrm.ui.events.SettingChangeEvent} ev
 */
ydn.crm.sugarcrm.ui.record.Body.prototype.handleSettingChange = function(ev) {
  if (ev.key == ydn.crm.ui.UserSetting.SugarCrmSettingUnitKey.NORMALLY_HIDE) {
    var value = /** @type {boolean} */ (ev.value);
    if (ev.setting instanceof ydn.crm.sugarcrm.ui.setting.Field) {
      var field = this.getFieldByName(ev.setting.getName());
      if (field) {
        field.setNormallyHide(value);
      }
    } else if (ev.setting instanceof ydn.crm.sugarcrm.ui.setting.Group) {
      var group = this.getChildByGroup(ev.setting.getName());
      if (group) {
        group.setNormallyHide(value);
      }
    }
  }
};


/**
 * Simulate user edit.
 * This will simulate input change event.
 * @param {Object} user_patch patch object of field name and its value, of user edited.
 */
ydn.crm.sugarcrm.ui.record.Body.prototype.simulateEdit = function(user_patch) {
  for (var name in user_patch) {
    var group = this.getGroupByFieldName(name);
    if (group) {
      group.simulateEditByField(name, user_patch[name]);
    } else if (ydn.crm.sugarcrm.ui.record.Body.DEBUG) {
      window.console.warn('Field ' + name + ' not found');
    }
  }
};


/**
 * Fill up by meta contact data.
 * @param {ydn.social.MetaContact} meta
 * @return {boolean} true if updated.
 */
ydn.crm.sugarcrm.ui.record.Body.prototype.fillByMetaContact = function(meta) {
  var out = false;
  for (var i = 0; i < this.getChildCount(); i++) {
    var child = this.getChildAt(i);
    var g = /** @type {ydn.crm.sugarcrm.ui.group.AbstractGroup} */ (child);
    out |= !!g.fillByMetaContact(meta);
  }
  return out;
};
