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


goog.provide('ydn.crm.sugarcrm.ui.ContextSugarPanel');
goog.require('ydn.crm.sugarcrm.model.GDataSugar');
goog.require('ydn.crm.sugarcrm.ui.GDataRecord');
goog.require('ydn.crm.sugarcrm.ui.Header');
goog.require('ydn.crm.sugarcrm.ui.NewRecord');
goog.require('ydn.crm.sugarcrm.ui.SimpleSugarPanel');
goog.require('ydn.crm.ui.GmailCmdInjector');
goog.require('ydn.crm.ui.gmail.ContactPanel');



/**
 * Contact sidebar panel.
 * @param {ydn.crm.sugarcrm.model.GDataSugar} model
 * @param {goog.dom.DomHelper} dom
 * @constructor
 * @struct
 * @extends {ydn.crm.sugarcrm.ui.SimpleSugarPanel}
 */
ydn.crm.sugarcrm.ui.ContextSugarPanel = function(model, dom) {
  goog.base(this, model, dom);

  /**
   * @type {ydn.crm.ui.GmailCmdInjector}
   * @private
   */
  this.gmail_cmd_inj_ = new ydn.crm.ui.GmailCmdInjector(model);
};
goog.inherits(ydn.crm.sugarcrm.ui.ContextSugarPanel, ydn.crm.sugarcrm.ui.SimpleSugarPanel);


/**
 * @define {boolean} debug flag.
 */
ydn.crm.sugarcrm.ui.ContextSugarPanel.DEBUG = false;


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.ui.ContextSugarPanel.prototype.createDom = function() {
  goog.base(this, 'createDom');
  var dom = this.dom_;
  var head_ele = this.getElement().querySelector('.' +
      ydn.crm.sugarcrm.ui.SimpleSugarPanel.CSS_CLASS_HEAD);
  var content_ele = this.getContentElement();
  // goog.style.setElementShown(content_ele, false);

  var model = this.getModel();

  var new_r = new ydn.crm.sugarcrm.model.Record(model,
      new ydn.crm.sugarcrm.Record(model.getDomain(), ydn.crm.ui.DEFAULT_MODULE));
  var new_record = new ydn.crm.sugarcrm.ui.NewRecord(new_r, dom);
  this.addChild(new_record, true);

  var gdata_panel = new ydn.crm.ui.gmail.ContactPanel(model, dom);
  this.addChild(gdata_panel, true);

  var r = new ydn.crm.sugarcrm.Record(model.getDomain(),
      ydn.crm.ui.DEFAULT_MODULE);
  var m = new ydn.crm.sugarcrm.model.Record(model, r);

  var child = new ydn.crm.sugarcrm.ui.GDataRecord(m, dom);
  this.addChild(child, true);

};


/**
 * Inject drop down menu on Gmail message.
 */
ydn.crm.sugarcrm.ui.ContextSugarPanel.prototype.injectGmailHeaderMenu = function() {
  this.gmail_cmd_inj_.injectEmailMessageHeaderMenu();
};


/**
 * @protected
 * @type {goog.debug.Logger}
 */
ydn.crm.sugarcrm.ui.ContextSugarPanel.prototype.logger =
    goog.log.getLogger('ydn.crm.sugarcrm.ui.ContextSugarPanel');


/**
 * Get SugarCRM record id that is related to gmail context thread.
 * @return {?{module: ydn.crm.sugarcrm.ModuleName, id: string}}
 */
ydn.crm.sugarcrm.ui.ContextSugarPanel.prototype.getContext = function() {
  for (var i = 0; i < this.getChildCount(); i++) {
    var child = /** @type {ydn.crm.sugarcrm.ui.record.Record} */ (this.getChildAt(i));
    /**
     * @type {ydn.crm.sugarcrm.model.Record}
     */
    var model = child.getModel();
    if (model.hasRecord()) {
      return {
        module: model.getModuleName(),
        id: model.getId()
      };
    }
  }
  return null;
};

