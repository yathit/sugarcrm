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
 * @fileoverview SugarCRM record launcher panel.
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */


goog.provide('ydn.crm.su.ui.Launcher');
goog.require('goog.ui.Component');
goog.require('ydn.crm.su.model.Sugar');



/**
 * Contact sidebar panel.
 * @param {ydn.crm.su.model.Sugar} model
 * @param {goog.dom.DomHelper} dom
 * @constructor
 * @struct
 * @extends {goog.ui.Component}
 */
ydn.crm.su.ui.Launcher = function(model, dom) {
  goog.base(this, dom);
  this.setModel(model);
};
goog.inherits(ydn.crm.su.ui.Launcher, goog.ui.Component);


/**
 * @define {boolean} debug flag.
 */
ydn.crm.su.ui.Launcher.DEBUG = false;


/**
 * @inheritDoc
 */
ydn.crm.su.ui.Launcher.prototype.createDom = function() {
  goog.base(this, 'createDom');
  var dom = this.dom_;


};


/**
 * @inheritDoc
 */
ydn.crm.su.ui.Launcher.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');

  this.getHandler().listen(this.getModel(), [ydn.crm.su.SugarEvent.LOGIN,
    ydn.crm.su.SugarEvent.LOGOUT],
  this.handleLoginChange_);

};


/**
 * @protected
 * @type {goog.debug.Logger}
 */
ydn.crm.su.ui.Launcher.prototype.logger =
    goog.log.getLogger('ydn.crm.su.ui.Launcher');


/**
 * Show record.
 * @param {ydn.crm.su.ModuleName} m_name
 * @param {string} id
 */
ydn.crm.su.ui.Launcher.prototype.showRecord = function(m_name, id) {
  throw new Error('Not implemented');
};


/**
 * Listen model event for host grant access.
 * @param {Event} e
 * @private
 */
ydn.crm.su.ui.Launcher.prototype.handleLoginChange_ = function(e) {
  var has_per = this.getModel().isLogin();
  goog.style.setElementShown(this.getContentElement(), has_per);
};
