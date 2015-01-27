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
 * @fileoverview Default body implement creating Group components.
 *                                                 `
 * @author kyawtun@yathit.com (Kyaw Tun)
 */


goog.provide('ydn.crm.su.ui.record.Default');
goog.require('ydn.crm.su.ui.group.Address');
goog.require('ydn.crm.su.ui.group.Appointment');
goog.require('ydn.crm.su.ui.group.AssignUser');
goog.require('ydn.crm.su.ui.group.Email');
goog.require('ydn.crm.su.ui.group.Group');
goog.require('ydn.crm.su.ui.group.LazyGroupRenderer');
goog.require('ydn.crm.su.ui.group.List');
goog.require('ydn.crm.su.ui.group.Name');
goog.require('ydn.crm.su.ui.group.Parent');
goog.require('ydn.crm.su.ui.group.Phone');
goog.require('ydn.crm.su.ui.group.SuggestedRecord');
goog.require('ydn.crm.su.ui.record.Body');



/**
 * Default record body.
 * @param {ydn.crm.su.model.Record} model
 * @param {goog.dom.DomHelper} dom
 * @constructor
 * @extends {ydn.crm.su.ui.record.Body}
 */
ydn.crm.su.ui.record.Default = function(model, dom) {
  goog.base(this, model, dom);
};
goog.inherits(ydn.crm.su.ui.record.Default, ydn.crm.su.ui.record.Body);


/**
 * @inheritDoc
 */
ydn.crm.su.ui.record.Default.prototype.createDom = function() {
  goog.base(this, 'createDom');
  var root = this.getElement();
  var dom = this.getDomHelper();
  /**
   * @type {ydn.crm.su.model.Record}
   */
  var model = this.getModel();
  var groups = model.listGroups();
  for (var i = 0; i < groups.length; i++) {
    var name = groups[i];
    var group;
    var group_model = model.getGroupModel(name);
    if (group_model instanceof ydn.crm.su.model.EmailGroup) {
      var email = /** @type {ydn.crm.su.model.EmailGroup} */ (group_model);
      group = new ydn.crm.su.ui.group.Email(email, dom);
    } else if (group_model instanceof ydn.crm.su.model.AddressGroup) {
      var address = /** @type {ydn.crm.su.model.AddressGroup} */ (group_model);
      group = new ydn.crm.su.ui.group.Address(address, dom);
    } else if (group_model instanceof ydn.crm.su.model.AppointmentGroup) {
      var app = /** @type {ydn.crm.su.model.AppointmentGroup} */ (group_model);
      group = new ydn.crm.su.ui.group.Appointment(app, dom);
    } else if (group_model instanceof ydn.crm.su.model.AssignUserGroup) {
      var asg = /** @type {ydn.crm.su.model.AssignUserGroup} */ (group_model);
      group = new ydn.crm.su.ui.group.AssignUser(asg, dom);
    } else if (group_model instanceof ydn.crm.su.model.ParentRelateGroup) {
      var parent = /** @type {ydn.crm.su.model.ParentRelateGroup} */ (group_model);
      group = new ydn.crm.su.ui.group.Parent(parent, dom);
    } else if (group_model instanceof ydn.crm.su.model.PhoneGroup) {
      var phone = /** @type {ydn.crm.su.model.PhoneGroup} */ (group_model);
      group = new ydn.crm.su.ui.group.Phone(phone, dom);
    } else if (group_model instanceof ydn.crm.su.model.NameGroup) {
      var name_group = /** @type {ydn.crm.su.model.NameGroup} */ (group_model);
      if (name_group.hasField('full_name')) {
        group = new ydn.crm.su.ui.group.Name(name_group, dom);
      } else {
        group = new ydn.crm.su.ui.group.Group(name_group, dom);
      }
    } else if (group_model instanceof ydn.crm.su.model.RelateGroup) {
      // relate group is generic group for 'Account', 'Contact', 'Leads', 'User', etc.
      var account = /** @type {ydn.crm.su.model.RelateGroup} */ (group_model);
      group = new ydn.crm.su.ui.group.SuggestedRecord(account, dom);
    } else if (group_model instanceof ydn.crm.su.model.Group) {
      var gm = /** @type {ydn.crm.su.model.Group} */ (group_model);
      var renderer = null;
      if (gm.getGroupName() == '') {
        renderer = ydn.crm.su.ui.group.LazyGroupRenderer.getInstance();
      }
      group = new ydn.crm.su.ui.group.Group(gm, dom);
    } else {
      throw new Error('Invalid group: ' + name);
    }
    this.addChild(group, true);
  }
};
