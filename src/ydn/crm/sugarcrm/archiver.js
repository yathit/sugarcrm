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


goog.provide('ydn.crm.su.Archiver');
goog.require('ydn.crm.msg.Manager');
goog.require('ydn.crm.su.ui.ArchiveDialog');
goog.require('ydn.crm.ui.IMenuItemProvider');
goog.require('ydn.ui.MessageBox');



/**
 * Archive email message to SugarCRM.
 * @param {ydn.crm.su.model.Sugar} sugar
 * @constructor
 * @struct
 * @implements {ydn.crm.ui.IMenuItemProvider}
 */
ydn.crm.su.Archiver = function(sugar) {
  /**
   * @final
   * @type {ydn.crm.su.model.Sugar}
   * @private
   */
  this.sugar_ = sugar;
  if (ydn.crm.su.Archiver.DEBUG && !sugar) {
    window.console.warn('No sugarcrm instance to archive');
  }
};


/**
 * @define {boolean} debug flag.
 */
ydn.crm.su.Archiver.DEBUG = false;


/**
 * @const
 * @type {string}
 */
ydn.crm.su.Archiver.MENU_NAME = 'archiver';


/**
 * @const
 * @type {string}
 */
ydn.crm.su.Archiver.SVG_ICON_NAME = 'cloud-done';


/**
 * @override
 */
ydn.crm.su.Archiver.prototype.getName = function() {
  return ydn.crm.su.Archiver.MENU_NAME;
};


/**
 * Archive menu label configuration.
 * @param {ydn.crm.gmail.MessageHeaderWidget} widget
 * @override
 */
ydn.crm.su.Archiver.prototype.configureMenuItem = function(widget) {
  widget.setButtonMessageDetail(ydn.crm.su.Archiver.MENU_NAME, false,
      ydn.crm.su.Archiver.SVG_ICON_NAME);
  if (!this.sugar_) {
    widget.setMenuItemDetail(this.getName(), false, 'Archive', null);
  }
  if (!this.sugar_) {
    return;
  }
  var info = widget.gatherEmailInfo();
  if (ydn.crm.su.Archiver.DEBUG) {
    window.console.log(info);
  }
  if (info && !!info.message_id) {
    var q = {
      'store': ydn.crm.su.ModuleName.EMAILS,
      'index': 'message_id',
      'key': info.message_id
    };
    this.sugar_.send(ydn.crm.ch.SReq.QUERY, [q]).addCallbacks(function(arr) {
      if (ydn.crm.su.Archiver.DEBUG) {
        window.console.log(arr);
      }
      var record = arr[0] && arr[0]['result'] ? arr[0]['result'][0] : null;
      if (record) {
        var link = this.sugar_.getRecordViewLink(
            ydn.crm.su.ModuleName.EMAILS, record['id']);
        widget.setMenuItemDetail(this.getName(), true, 'View Archive',
            link);
        widget.setButtonMessageDetail(ydn.crm.su.Archiver.MENU_NAME, true,
            ydn.crm.su.Archiver.SVG_ICON_NAME, 'This message is archived.');
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
 * Add attachment to an email record.
 * @param {string} email_id email record id.
 * @param {ydn.gmail.Utils.AttachmentParts} att
 * @param {string} msg_id message id.
 * @return {!goog.async.Deferred}
 * @private
 */
ydn.crm.su.Archiver.prototype.addAttachment_ = function(email_id, att, msg_id) {
  var opt = {
    'fileName': att.fn,
    'documentName': att.document_name,
    'description': '',
    'mime': att.mime,
    'url': att.url,
    'messageId': msg_id
  };
  var mid = ydn.crm.msg.Manager.addStatus('Uploading attachment: ' +
      att.document_name);
  return this.sugar_.getChannel().send(ydn.crm.ch.SReq.UPLOAD_DOC,
      opt).addCallbacks(function(r) {
    var record = /** @type {SugarCrm.Record} */(r);
    ydn.crm.msg.Manager.setStatus(mid, 'Uploaded');
    var href = this.sugar_.getRecordViewLink(ydn.crm.su.ModuleName.DOCUMENTS, record.id);
    ydn.crm.msg.Manager.setLink(mid, href, att.document_name);
    ydn.crm.msg.Manager.updateStatus(mid, 'setting relationship...');
    return this.sugar_.setRelationship(ydn.crm.su.ModuleName.EMAILS, email_id,
        ydn.crm.su.ModuleName.DOCUMENTS, record.id).addCallback(function() {
      ydn.crm.msg.Manager.updateStatus(mid, 'OK.');
    });
  }, function(e) {
    ydn.crm.msg.Manager.updateStatus(mid, 'failed: ' + String(e),
        ydn.crm.msg.MessageType.ERROR);
  }, this);
};


/**
 * Do attachment recursively.
 * @param {string} email_id
 * @param {string} message_id
 * @param {Array<ydn.gmail.Utils.AttachmentParts>} attachments
 * @param {number} idx
 * @private
 */
ydn.crm.su.Archiver.prototype.doNextAttachment_ = function(email_id,
    message_id, attachments, idx) {
  // we should not send attachment in parallel because some attachment file
  // are several MB in size, which must be stored in memory during upload.
  if (attachments[idx]) {
    this.addAttachment_(email_id, attachments[idx], message_id).addBoth(function() {
      idx++;
      this.doNextAttachment_(email_id, message_id, attachments, idx);
    }, this);
  }
};


/**
 * Bring up archive email dialog and process archive.
 * @param {ydn.crm.gmail.MessageHeaderWidget} widget
 * @param {ydn.gmail.Utils.EmailInfo} info
 * @param {SugarCrm.Record=} opt_record parent record.
 * @return {!goog.async.Deferred}
 * @private
 */
ydn.crm.su.Archiver.prototype.archive_ = function(widget, info, opt_record) {

  return ydn.crm.su.ui.ArchiveDialog.showModel(this.sugar_, info,
      opt_record).addCallbacks(function(x) {
    var result = /** @type {ydn.crm.su.ui.ArchiveDialog.ReturnValue}*/(x);

    var mid = ydn.crm.msg.Manager.addStatus('Archiving message');
    return this.sugar_.archiveEmail(info).addCallbacks(function(y) {
      var record = /** @type {SugarCrm.Record} */(y);
      ydn.crm.msg.Manager.setStatus(mid, 'Archived:');
      var link = this.sugar_.getRecordViewLink(
          ydn.crm.su.ModuleName.EMAILS, record['id']);
      ydn.crm.msg.Manager.setLink(mid, link, 'view');
      widget.setMenuItemDetail(this.getName(), true, 'View Archive',
          link);
      widget.setButtonMessageDetail(ydn.crm.su.Archiver.MENU_NAME, true,
          ydn.crm.su.Archiver.SVG_ICON_NAME, 'This message is archived.');
      for (var i = 0; i < result.relationships.length; i++) {
        if (result.relationships[i]) {
          info.attachments[i].documentName = result.relationships[i];
        }
      }
      this.doNextAttachment_(record.id, info.message_id, info.attachments, 0);
    }, function(e) {
      ydn.crm.msg.Manager.setStatus(mid, 'Error archiving: ' + (e.message || e));
    }, this);
  }, function(e) {
    // cancel
  }, this);

};


/**
 * Bring up archive email dialog and process archive.
 * @param {ydn.crm.gmail.MessageHeaderWidget} widget
 * @param {ydn.gmail.Utils.EmailInfo} info
 * @param {ydn.crm.su.ModuleName=} opt_mn parent module name.
 * @param {string=} opt_id record id.
 * @private
 */
ydn.crm.su.Archiver.prototype.promptArchive_ = function(widget, info, opt_mn, opt_id) {
  var df = ydn.crm.su.ui.ArchiveDialog.showModel(this.sugar_, info);
  var mid = ydn.crm.msg.Manager.addStatus('Archiving message');
  this.sugar_.archiveEmail(info, opt_mn, opt_id).addCallbacks(function(record) {
    ydn.crm.msg.Manager.setStatus(mid, 'Archived:');
    var link = this.sugar_.getRecordViewLink(
        ydn.crm.su.ModuleName.EMAILS, record['id']);
    ydn.crm.msg.Manager.setLink(mid, link, 'view');
    widget.setMenuItemDetail(this.getName(), true, 'View Archive',
        link);
    widget.setButtonMessageDetail(ydn.crm.su.Archiver.MENU_NAME, true,
        ydn.crm.su.Archiver.SVG_ICON_NAME, 'This message is archived.');
  }, function(e) {
    ydn.crm.msg.Manager.setStatus(mid, 'Error archiving: ' + (e.message || e));
  }, this);
};


/**
 * Prepare archiving.
 * @param {ydn.crm.gmail.MessageHeaderWidget} widget
 * @private
 */
ydn.crm.su.Archiver.prototype.prepareArchive_ = function(widget) {
  var ei = widget.gatherEmailInfo();
  // window.console.log(JSON.stringify(info, null, 2));
  if (ei) {
    var info = /** @type {ydn.gmail.Utils.EmailInfo} */(ei);

    var is_receiving = info.from_addr != ydn.gmail.Utils.getUserEmail();
    var parent_email = is_receiving ? info.from_addr : info.to_addrs.split(', ')[0];
    this.sugar_.queryByEmail(parent_email).addCallbacks(function(arr) {
      var parent_mn, parent_id;
      if (arr[0]) {
        var r = /** @type {!SugarCrm.Record} */(arr[0]);
        this.archive_(widget, info, r);
      } else {
        this.archive_(widget, info);
      }
    }, function(e) {
      window.console.error(e);
      this.archive_(widget, info);
    }, this);
  } else {
    ydn.ui.MessageBox.show('Archive message', 'Cannot read message.');
  }

};


/**
 * @override
 */
ydn.crm.su.Archiver.prototype.onIMenuItem = function(widget, e) {
  var item = /** @type {goog.ui.MenuItem} */ (e.target);

  var record = item.getModel();
  if (record) {
    // view archive
    window.open(record, '_blank');
  } else {
    // archive
    this.prepareArchive_(widget);
  }
};
