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
 * @fileoverview Archive email message to SugarCRM.
 *                                                 `
 * @author kyawtun@yathit.com (Kyaw Tun)
 */


goog.provide('ydn.crm.sugarcrm.model.Archiver');
goog.provide('ydn.crm.ui.IMenuItemProvider');



/**
 * Archive email message to SugarCRM.
 * @param {ydn.crm.sugarcrm.model.Sugar} sugar
 * @constructor
 * @struct
 * @implements {ydn.crm.ui.IMenuItemProvider}
 */
ydn.crm.sugarcrm.model.Archiver = function(sugar) {
  /**
   * @final
   * @type {ydn.crm.sugarcrm.model.Sugar}
   * @private
   */
  this.sugar_ = sugar;
};


/**
 * @const
 * @type {string}
 */
ydn.crm.sugarcrm.model.Archiver.MENU_NAME = 'archiver';


/**
 * @override
 */
ydn.crm.sugarcrm.model.Archiver.prototype.getMenuName = function() {
  return ydn.crm.sugarcrm.model.Archiver.MENU_NAME;
};


/**
 * @override
 */
ydn.crm.sugarcrm.model.Archiver.prototype.getIconName = function() {
  return ydn.crm.sugarcrm.model.Archiver.MENU_NAME;
};


/**
 * Archive menu label configuration.
 * @param {ydn.crm.gmail.MessageHeaderWidget} widget
 * @override
 */
ydn.crm.sugarcrm.model.Archiver.prototype.configureMenuItem = function(widget) {
  var info = widget.gatherEmailInfo();
  if (!info || !info.message_id) {
    widget.setMenuItemDetail(this.getMenuName(), false, 'Archive');
  } else {
    var q = {
      'store': ydn.crm.sugarcrm.ModuleName.EMAILS,
      'index': 'message_id',
      'key': info.message_id
    };
    return this.sugar_.send(ydn.crm.Ch.SReq.QUERY, [q]).addCallbacks(function(arr) {
      if (ydn.crm.sugarcrm.model.Archiver.DEBUG) {
        window.console.log(arr);
      }
      var record = arr[0] && arr[0]['result'] ? arr[0]['result'][0] : null;
      if (record) {
        widget.setMenuItemDetail(this.getMenuName(), true, 'View Archive',
            'View archived email in SugarCRM', record['id']);
      } else {
        widget.setMenuItemDetail(this.getMenuName(), true, 'Archive',
            'Archive this message to SugarCRM', info.message_id);
      }
    }, function(e) {
      widget.setMenuItemDetail(this.getMenuName(), false, 'Archive');
      window.console.error(e);
    }, this);
  }
};


/**
 * Archive button message configuration.
 * @param {ydn.crm.gmail.MessageHeaderWidget} widget
 * @override
 */
ydn.crm.sugarcrm.model.Archiver.prototype.configureButton = function(widget) {

};
