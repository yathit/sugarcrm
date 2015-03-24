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
 * @fileoverview SugarCRM panel.
 *
 * A SugarCRM panel represent a fixed sugarcrm instance, with or without valid
 * login.
 *
 * The panel will probe available sugarcrm module and its fields before
 * initializing this instance. User may have preference setting.
 *
 * This panel display on right side bar of the gmail interface in email thread
 * view. SugarCrm instance related UI are on Header and email thread dependent
 * UI are in Body panels.
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */


goog.provide('ydn.crm.su.ui.SimpleSugarPanel');
goog.require('goog.log');
goog.require('goog.ui.Component');
goog.require('ydn.crm.Ch');
goog.require('ydn.crm.su.model.GDataSugar');
goog.require('ydn.gdata.m8.ContactEntry');
goog.require('ydn.json');
goog.require('ydn.crm.su.ui.activity.Panel');



/**
 * Contact sidebar panel.
 * @param {ydn.crm.su.model.GDataSugar} model
 * @param {goog.dom.DomHelper=} opt_dom
 * @constructor
 * @struct
 * @extends {goog.ui.Component}
 * @suppress {checkStructDictInheritance} suppress closure-library code.
 */
ydn.crm.su.ui.SimpleSugarPanel = function(model, opt_dom) {
  goog.base(this, opt_dom);
  this.setModel(model);

};
goog.inherits(ydn.crm.su.ui.SimpleSugarPanel, goog.ui.Component);


/**
 * @define {boolean} debug flag.
 */
ydn.crm.su.ui.SimpleSugarPanel.DEBUG = false;


/**
 * @const
 * @type {string}
 */
ydn.crm.su.ui.SimpleSugarPanel.CSS_CLASS_HEAD = 'sugar-panel-head';


/**
 * @const
 * @type {string}
 */
ydn.crm.su.ui.SimpleSugarPanel.CSS_CLASS_CONTENT = 'sugar-panel-content';


/**
 * @const
 * @type {string}
 */
ydn.crm.su.ui.SimpleSugarPanel.CSS_CLASS = 'sugar-panel';


/** @return {string} */
ydn.crm.su.ui.SimpleSugarPanel.prototype.getCssClass = function() {
  return ydn.crm.su.ui.SimpleSugarPanel.CSS_CLASS;
};


/**
 * @inheritDoc
 */
ydn.crm.su.ui.SimpleSugarPanel.prototype.getContentElement = function() {
  return this.getElement().querySelector('.' + ydn.crm.su.ui.SimpleSugarPanel.CSS_CLASS_CONTENT);
};


/**
 * @return {ydn.crm.su.model.GDataSugar}
 * @override
 */
ydn.crm.su.ui.SimpleSugarPanel.prototype.getModel;


/**
 * @inheritDoc
 */
ydn.crm.su.ui.SimpleSugarPanel.prototype.createDom = function() {
  goog.base(this, 'createDom');
  var dom = this.dom_;
  var root = this.getElement();
  goog.dom.classlist.add(root, this.getCssClass());
  var head_ele = dom.createDom('div', ydn.crm.su.ui.SimpleSugarPanel.CSS_CLASS_HEAD);
  var content_ele = dom.createDom('div', ydn.crm.su.ui.SimpleSugarPanel.CSS_CLASS_CONTENT);
  root.appendChild(head_ele);
  root.appendChild(content_ele);
  // goog.style.setElementShown(content_ele, false);

};


/**
 * @inheritDoc
 */
ydn.crm.su.ui.SimpleSugarPanel.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  if (ydn.crm.su.ui.SimpleSugarPanel.DEBUG) {
    window.console.log('SimpleSugarPanel:enterDocument:' + this.getModel());
  }
  this.getHandler().listen(this.getModel(), [ydn.crm.su.model.events.Type.GDATA_CHANGE],
      this.handleOnGDataChanged);
};


/**
 * @protected
 * @param {ydn.crm.su.model.events.GDataEvent} e
 */
ydn.crm.su.ui.SimpleSugarPanel.prototype.handleOnGDataChanged = function(e) {
  var sugar = this.getModel();
  if (ydn.crm.su.ui.SimpleSugarPanel.DEBUG) {
    window.console.log(e, sugar.getContextGmail());
  }
  var has_context = !!sugar.getContextGmail();
  goog.style.setElementShown(this.getContentElement(), has_context);
};


/**
 * @protected
 * @type {goog.log.Logger}
 */
ydn.crm.su.ui.SimpleSugarPanel.prototype.logger =
    goog.log.getLogger('ydn.crm.su.ui.SimpleSugarPanel');


/**
 * Get background message channel.
 * @return {!ydn.msg.Channel}
 */
ydn.crm.su.ui.SimpleSugarPanel.prototype.getChannel = function() {
  return ydn.msg.getChannel(ydn.msg.Group.SUGAR, this.getDomainName());
};


/**
 * @return {string}
 */
ydn.crm.su.ui.SimpleSugarPanel.prototype.getDomainName = function() {
  return this.getModel().getDomain();
};
