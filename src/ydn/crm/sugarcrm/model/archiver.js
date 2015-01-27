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


goog.provide('ydn.crm.su.model.Archiver');
goog.require('ydn.crm.msg.Manager');
goog.require('ydn.crm.ui.IMenuItemProvider');
goog.require('ydn.ui.MessageBox');



/**
 * Archive email message to SugarCRM.
 * @param {ydn.crm.su.model.Sugar} sugar
 * @constructor
 * @struct
 * @implements {ydn.crm.ui.IMenuItemProvider}
 */
ydn.crm.su.model.Archiver = function(sugar) {
  /**
   * @final
   * @type {ydn.crm.su.model.Sugar}
   * @private
   */
  this.sugar_ = sugar;
  if (ydn.crm.su.model.Archiver.DEBUG && !sugar) {
    window.console.warn('No sugarcrm instance to archive');
  }
};


/**
 * @define {boolean} debug flag.
 */
ydn.crm.su.model.Archiver.DEBUG = false;


/**
 * @const
 * @type {string}
 */
ydn.crm.su.model.Archiver.MENU_NAME = 'archiver';


/**
 * @const
 * @type {string}
 */
ydn.crm.su.model.Archiver.SVG_ICON_NAME = 'cloud-done';


/**
 * @override
 */
ydn.crm.su.model.Archiver.prototype.getName = function() {
  return ydn.crm.su.model.Archiver.MENU_NAME;
};


/**
 * Archive menu label configuration.
 * @param {ydn.crm.gmail.MessageHeaderWidget} widget
 * @override
 */
ydn.crm.su.model.Archiver.prototype.configureMenuItem = function(widget) {
  widget.setButtonMessageDetail(ydn.crm.su.model.Archiver.MENU_NAME, false,
      ydn.crm.su.model.Archiver.SVG_ICON_NAME);
  if (!this.sugar_) {
    widget.setMenuItemDetail(this.getName(), false, 'Archive', null);
  }
  if (!this.sugar_) {
    return;
  }
  var info = widget.gatherEmailInfo();
  if (ydn.crm.su.model.Archiver.DEBUG) {
    window.console.log(info);
  }
  if (info && !!info.message_id) {
    var q = {
      'store': ydn.crm.su.ModuleName.EMAILS,
      'index': 'message_id',
      'key': info.message_id
    };
    this.sugar_.send(ydn.crm.Ch.SReq.QUERY, [q]).addCallbacks(function(arr) {
      if (ydn.crm.su.model.Archiver.DEBUG) {
        window.console.log(arr);
      }
      var record = arr[0] && arr[0]['result'] ? arr[0]['result'][0] : null;
      if (record) {
        var link = this.sugar_.getRecordViewLink(
            ydn.crm.su.ModuleName.EMAILS, record['id']);
        widget.setMenuItemDetail(this.getName(), true, 'View Archive',
            link);
        widget.setButtonMessageDetail(ydn.crm.su.model.Archiver.MENU_NAME, true,
            ydn.crm.su.model.Archiver.SVG_ICON_NAME, 'This message is archived.');
      } else {
        widget.setMenuItemDetail(this.getName(), true, 'Archive', null);
      }
    }, function(e) {
      widget.setMenuItemDetail(this.getName(), false, 'Archive', null);
      window.console.error(e);
    }, this);
  }
};


/**
 * @override
 */
ydn.crm.su.model.Archiver.prototype.onIMenuItem = function(widget, e) {
  var item = /** @type {goog.ui.MenuItem} */ (e.target);

  var record = item.getModel();
  if (record) {
    // view archive
    window.open(record, '_blank');
  } else {
    // archive
    var info = widget.gatherEmailInfo();
    var module_name = undefined;
    var record_id = undefined;
    if (info) {
      var mid = ydn.crm.msg.Manager.addStatus('Archiving message');
      this.sugar_.archiveEmail(info, module_name, record_id).addCallbacks(function(record) {
        ydn.crm.msg.Manager.setStatus(mid, 'Archived:');
        var link = this.sugar_.getRecordViewLink(
            ydn.crm.su.ModuleName.EMAILS, record['id']);
        ydn.crm.msg.Manager.setLink(mid, link, 'view');
        widget.setMenuItemDetail(this.getName(), true, 'View Archive',
            link);
        widget.setButtonMessageDetail(ydn.crm.su.model.Archiver.MENU_NAME, true,
            ydn.crm.su.model.Archiver.SVG_ICON_NAME, 'This message is archived.');
      }, function(e) {
        ydn.crm.msg.Manager.setStatus(mid, 'Error archiving: ' + (e.message || e));
      }, this);
    } else {
      ydn.ui.MessageBox.show('Archive message', 'Cannot read message.');
    }
  }
};
