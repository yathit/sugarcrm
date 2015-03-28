// Copyright 2014 YDN Authors. All Rights Reserved.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
//    This program is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.



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


goog.provide('ydn.crm.su.ui.SugarPanel');
goog.require('ydn.crm.su.model.GDataSugar');
goog.require('ydn.crm.su.ui.Header');
goog.require('ydn.crm.su.ui.SimpleSugarPanel');
goog.require('ydn.crm.su.ui.activity.Panel');



/**
 * Contact sidebar panel.
 * @param {ydn.crm.su.model.GDataSugar} model
 * @param {goog.dom.DomHelper} dom
 * @constructor
 * @struct
 * @extends {ydn.crm.su.ui.SimpleSugarPanel}
 */
ydn.crm.su.ui.SugarPanel = function(model, dom) {
  goog.base(this, model, dom);
};
goog.inherits(ydn.crm.su.ui.SugarPanel, ydn.crm.su.ui.SimpleSugarPanel);


/**
 * @define {boolean} debug flag.
 */
ydn.crm.su.ui.SugarPanel.DEBUG = false;


/**
 * @inheritDoc
 */
ydn.crm.su.ui.SugarPanel.prototype.createDom = function() {
  goog.base(this, 'createDom');
  var dom = this.dom_;
  var head_ele = this.getElement().querySelector('.' +
      ydn.crm.su.ui.SimpleSugarPanel.CSS_CLASS_HEAD);
  var content_ele = this.getContentElement();

  var model = this.getModel();
  var header_panel = new ydn.crm.su.ui.Header(model, dom);
  this.addChild(header_panel);
  header_panel.render(head_ele);

  var activity_panel = new ydn.crm.su.ui.activity.Panel(model, dom);
  this.addChild(activity_panel, true);

  var ok = model.isLogin();
  goog.style.setElementShown(content_ele, ok);

};


/**
 * @inheritDoc
 */
ydn.crm.su.ui.SugarPanel.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');

  this.getHandler().listen(this.getModel(), [ydn.crm.su.SugarEvent.LOGIN,
    ydn.crm.su.SugarEvent.LOGOUT],
  this.handleLoginChange_);

};


/**
 * @protected
 * @type {goog.debug.Logger}
 */
ydn.crm.su.ui.SugarPanel.prototype.logger =
    goog.log.getLogger('ydn.crm.su.ui.SugarPanel');


/**
 * @return {ydn.crm.su.ui.Header}
 * @private
 */
ydn.crm.su.ui.SugarPanel.prototype.getHeader_ = function() {
  for (var i = 0; i < this.getChildCount(); i++) {
    var child = this.getChildAt(i);
    if (child instanceof ydn.crm.su.ui.Header) {
      return child;
    }
  }
  return null;
};


/**
 * @return {ydn.crm.su.ui.activity.Panel}
 * @private
 */
ydn.crm.su.ui.SugarPanel.prototype.getActivityPanel_ = function() {
  for (var i = 0; i < this.getChildCount(); i++) {
    var child = this.getChildAt(i);
    if (child instanceof ydn.crm.su.ui.activity.Panel) {
      return child;
    }
  }
  return null;
};


/**
 * Show record.
 * @param {ydn.crm.su.ModuleName} m_name
 * @param {string} id
 */
ydn.crm.su.ui.SugarPanel.prototype.showRecord = function(m_name, id) {
  this.getActivityPanel_().showRecord(m_name, id);
  this.getHeader_().dispatchOpenDrawer();
};


/**
 * Listen model event for host grant access.
 * @param {Event} e
 * @private
 */
ydn.crm.su.ui.SugarPanel.prototype.handleLoginChange_ = function(e) {
  var has_per = this.getModel().isLogin();
  goog.style.setElementShown(this.getContentElement(), has_per);
};
