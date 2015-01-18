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


goog.provide('ydn.crm.sugarcrm.ui.record.Default');
goog.require('ydn.crm.sugarcrm.ui.group.Address');
goog.require('ydn.crm.sugarcrm.ui.group.Appointment');
goog.require('ydn.crm.sugarcrm.ui.group.AssignUser');
goog.require('ydn.crm.sugarcrm.ui.group.Email');
goog.require('ydn.crm.sugarcrm.ui.group.Group');
goog.require('ydn.crm.sugarcrm.ui.group.LazyGroupRenderer');
goog.require('ydn.crm.sugarcrm.ui.group.List');
goog.require('ydn.crm.sugarcrm.ui.group.Name');
goog.require('ydn.crm.sugarcrm.ui.group.Parent');
goog.require('ydn.crm.sugarcrm.ui.group.Phone');
goog.require('ydn.crm.sugarcrm.ui.group.SuggestedRecord');
goog.require('ydn.crm.sugarcrm.ui.record.Body');



/**
 * Default record body.
 * @param {ydn.crm.sugarcrm.model.Record} model
 * @param {goog.dom.DomHelper} dom
 * @constructor
 * @extends {ydn.crm.sugarcrm.ui.record.Body}
 */
ydn.crm.sugarcrm.ui.record.Default = function(model, dom) {
  goog.base(this, model, dom);
};
goog.inherits(ydn.crm.sugarcrm.ui.record.Default, ydn.crm.sugarcrm.ui.record.Body);


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.ui.record.Default.prototype.createDom = function() {
  goog.base(this, 'createDom');
  var root = this.getElement();
  var dom = this.getDomHelper();
  /**
   * @type {ydn.crm.sugarcrm.model.Record}
   */
  var model = this.getModel();
  var groups = model.listGroups();
  for (var i = 0; i < groups.length; i++) {
    var name = groups[i];
    var group;
    var group_model = model.getGroupModel(name);
    if (group_model instanceof ydn.crm.sugarcrm.model.EmailGroup) {
      var email = /** @type {ydn.crm.sugarcrm.model.EmailGroup} */ (group_model);
      group = new ydn.crm.sugarcrm.ui.group.Email(email, dom);
    } else if (group_model instanceof ydn.crm.sugarcrm.model.AddressGroup) {
      var address = /** @type {ydn.crm.sugarcrm.model.AddressGroup} */ (group_model);
      group = new ydn.crm.sugarcrm.ui.group.Address(address, dom);
    } else if (group_model instanceof ydn.crm.sugarcrm.model.AppointmentGroup) {
      var app = /** @type {ydn.crm.sugarcrm.model.AppointmentGroup} */ (group_model);
      group = new ydn.crm.sugarcrm.ui.group.Appointment(app, dom);
    } else if (group_model instanceof ydn.crm.sugarcrm.model.AssignUserGroup) {
      var asg = /** @type {ydn.crm.sugarcrm.model.AssignUserGroup} */ (group_model);
      group = new ydn.crm.sugarcrm.ui.group.AssignUser(asg, dom);
    } else if (group_model instanceof ydn.crm.sugarcrm.model.ParentRelateGroup) {
      var parent = /** @type {ydn.crm.sugarcrm.model.ParentRelateGroup} */ (group_model);
      group = new ydn.crm.sugarcrm.ui.group.Parent(parent, dom);
    } else if (group_model instanceof ydn.crm.sugarcrm.model.PhoneGroup) {
      var phone = /** @type {ydn.crm.sugarcrm.model.PhoneGroup} */ (group_model);
      group = new ydn.crm.sugarcrm.ui.group.Phone(phone, dom);
    } else if (group_model instanceof ydn.crm.sugarcrm.model.NameGroup) {
      var name_group = /** @type {ydn.crm.sugarcrm.model.NameGroup} */ (group_model);
      if (name_group.hasField('full_name')) {
        group = new ydn.crm.sugarcrm.ui.group.Name(name_group, dom);
      } else {
        group = new ydn.crm.sugarcrm.ui.group.Group(name_group, dom);
      }
    } else if (group_model instanceof ydn.crm.sugarcrm.model.RelateGroup) {
      // relate group is generic group for 'Account', 'Contact', 'Leads', 'User', etc.
      var account = /** @type {ydn.crm.sugarcrm.model.RelateGroup} */ (group_model);
      group = new ydn.crm.sugarcrm.ui.group.SuggestedRecord(account, dom);
    } else if (group_model instanceof ydn.crm.sugarcrm.model.Group) {
      var gm = /** @type {ydn.crm.sugarcrm.model.Group} */ (group_model);
      var renderer = null;
      if (gm.getGroupName() == '') {
        renderer = ydn.crm.sugarcrm.ui.group.LazyGroupRenderer.getInstance();
      }
      group = new ydn.crm.sugarcrm.ui.group.Group(gm, dom);
    } else {
      throw new Error('Invalid group: ' + name);
    }
    this.addChild(group, true);
  }
};
