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
 * @fileoverview Upload attachment to email or document.
 *                                                 `
 * @author kyawtun@yathit.com (Kyaw Tun)
 */


goog.provide('ydn.crm.su.AttachButtonProvider');
goog.require('ydn.crm.IUser');
goog.require('ydn.crm.ch.SReq');
goog.require('ydn.crm.msg.Manager');
goog.require('ydn.crm.su.IAttachButtonProvider');
goog.require('ydn.crm.su.events');
goog.require('ydn.crm.su.ui.UploadDialog');
goog.require('ydn.gmail.Utils');



/**
 * Upload attachment to email or document.
 * @param {ydn.crm.IUser} user
 * @param {ydn.crm.su.model.Sugar} sugar
 * @param {ydn.crm.gmail.GmailObserver} gmail_observer
 * @constructor
 * @extends {goog.events.EventTarget}
 * @struct
 * @implements {ydn.crm.su.IAttachButtonProvider}
 */
ydn.crm.su.AttachButtonProvider = function(user, sugar, gmail_observer) {
  goog.base(this);
  /**
   * @protected
   * @final
   * @type {ydn.crm.IUser}
   */
  this.user = user;
  /**
   * @type {ydn.crm.su.model.Sugar}
   * @protected
   */
  this.sugar = sugar;

  goog.events.listen(gmail_observer,
      ydn.crm.gmail.GmailObserver.EventType.ATTACHMENT, this.onAttachment_,
      false, this);

  /**
   * Since owner of these buttons are not able to dispose properly, we recycle
   * instead of disposing.
   * @see #renderButton logic for the recycle trick.
   * @final
   * @type {Array<!ydn.crm.su.AttachButton>}
   * @private
   */
  this.buttons_ = [];
};
goog.inherits(ydn.crm.su.AttachButtonProvider, goog.events.EventTarget);


/**
 * @define {boolean} debug flag.
 */
ydn.crm.su.AttachButtonProvider.DEBUG = false;


/**
 * @override
 */
ydn.crm.su.AttachButtonProvider.prototype.disposeInternal = function() {
  for (var i = 0; i < this.buttons_.length; i++) {
    var btn = this.buttons_[i];
    btn.dispose();
  }
  this.buttons_.length = 0;
  this.sugar = null;
};


/**
 * @param {ydn.crm.gmail.GmailObserver.AttachmentEvent} ev
 * @private
 */
ydn.crm.su.AttachButtonProvider.prototype.onAttachment_ = function(ev) {
  this.renderButton(ev.anchor);
};


/**
 * @param {string} mid email message id.
 * @return {Array<ydn.crm.su.AttachButton>} list of attach buttons in the email.
 */
ydn.crm.su.AttachButtonProvider.prototype.getButtonsByMessageId = function(mid) {
  return this.buttons_.filter(function(btn) {
    return btn.getMessageId() == mid;
  });
};


/**
 * Get attach button.
 * @param {string} mid email message id.
 * @param {string} fn file name.
 * @return {ydn.crm.su.AttachButton}
 */
ydn.crm.su.AttachButtonProvider.prototype.getButton = function(mid, fn) {
  for (var i = 0; i < this.buttons_.length; i++) {
    var btn = this.buttons_[i];
    if (btn.getMessageId() == mid) {
      var parts = btn.getDownloadInfo();
      if (parts.fn == fn) {
        return btn;
      }
    }
  }
  return null;
};


/**
 * Render attach button on the download preview panel.
 * @param {Element} anchor attachment anchor element which has download_url
 * attribute.
 * @return {!ydn.crm.su.AttachButton}
 */
ydn.crm.su.AttachButtonProvider.prototype.renderButton = function(anchor) {
  for (var i = 0; i < this.buttons_.length; i++) {
    if (!this.buttons_[i].isInDocument()) {
      if (ydn.crm.su.AttachButtonProvider.DEBUG) {
        window.console.log('reusing button ' + i + ' of ' + this.buttons_.length);
      }
      this.buttons_[i].decorate(anchor);
      return this.buttons_[i];
    }
  }
  var button = new ydn.crm.su.AttachButton(this);
  button.decorate(anchor);
  this.buttons_.push(button);

  return button;
};



/**
 * Attach button.
 * @param {ydn.crm.su.AttachButtonProvider} provider
 * @constructor
 * @struct
 * @implements {ydn.crm.su.IAttachButton}
 */
ydn.crm.su.AttachButton = function(provider) {
  /**
   * @type {ydn.crm.su.AttachButtonProvider}
   * @private
   */
  this.provider_ = provider;
  /**
   * Document id if saved.
   * @type {string}
   * @private
   */
  this.id_ = '';
  /**
   * Document module name, this could be either 'Documents' or 'Notes'.
   * @type {?ydn.crm.su.ModuleName}
   * @private
   */
  this.module_ = null;
  /**
   * @type {Element}
   * @private
   */
  this.button_ = document.createElement('span');
  this.button_.className = 'ydn-crm ' + ydn.crm.su.AttachButton.CSS_CLASS +
      ' ' + ydn.crm.su.AttachButton.CSS_CLASS_BTN;
  this.button_.onclick = this.onBtnClick_.bind(this);
};


/**
 * Dispose this.
 */
ydn.crm.su.AttachButton.prototype.dispose = function() {
  if (this.button_) {
    this.button_.onclick = null;
    this.button_.innerHTML = '';
    if (this.button_.parentNode) {
      this.button_.parentNode.removeChild(this.button_);
    }
    this.button_ = null;
  }
};


/**
 * @const
 * @type {string}
 */
ydn.crm.su.AttachButton.CSS_CLASS = 'ydn-att';


/**
 * @const
 * @type {string}
 */
ydn.crm.su.AttachButton.CSS_CLASS_BTN = 'ydn-att-btn';


/**
 * @param {Event} ev
 * @private
 */
ydn.crm.su.AttachButton.prototype.onBtnClick_ = function(ev) {
  ev.preventDefault();
  if (this.id_ && this.module_) {
    var rve = new ydn.crm.su.events.RecordViewEvent(
        this.module_, this.id_);
    this.provider_.dispatchEvent(rve);
    this.validateRecord_();
  } else {
    if (this.provider_.user.hasFeature(ydn.crm.base.Feature.ATTACHMENT, true)) {
      this.beginUpload_();
    }
  }
};


/**
 * Begin upload.
 * @private
 */
ydn.crm.su.AttachButton.prototype.beginUpload_ = function() {
  var parts = this.getDownloadInfo();
  var mid = this.getMessageId();
  var el = this.button_;
  ydn.crm.su.ui.UploadDialog.showModel(
      this.provider_.sugar, mid, parts.fn).addCallback(function(x) {
    el.classList.add('working');
    var msg_id = ydn.crm.msg.Manager.addStatus('Uploading', '...');
    this.upload_(mid, parts, x).addCallbacks(function(data) {
      var record = /** @type {SugarCrm.Record} */ (data);
      if (ydn.crm.su.AttachButtonProvider.DEBUG) {
        window.console.log(record);
      }
      el.classList.remove('working');
      el.classList.remove('alert');
      el.classList.remove('error');
      this.module_ = ydn.crm.su.toModuleName(record._module);
      this.id_ = record.id;
      ydn.crm.msg.Manager.setStatus(msg_id, 'Upload');
      ydn.crm.msg.Manager.updateStatus(msg_id, 'Done.');
      var href = this.provider_.sugar.getRecordViewLink(
          ydn.crm.su.ModuleName.DOCUMENTS, record.id);
      ydn.crm.msg.Manager.setLink(msg_id, href, record['document_name'],
          'View record in SugarCRM');
      el.innerHTML = '';
      var svg = ydn.crm.ui.createSvgIcon('sugarcrm-bw', 'att-icon');
      el.appendChild(svg);
    }, function(x) {
      el.classList.remove('working');
      el.classList.remove('alert');
      el.classList.remove('error');
      if (x === ydn.ui.MessageDialog.Button.CANCEL) {
        return;
      }
      var e = /** @type {Error} */ (x);
      if (e.name = ydn.crm.base.ErrorName.HOST_PERMISSION) {
        el.classList.add('alert');
      } else {
        el.classList.add('error');
      }
      var msg = String(e.message || e);
      el.setAttribute('data-tooltip', msg);
      ydn.crm.msg.Manager.updateStatus(msg_id, 'fail to upload ' + parts.fn + ' ' + msg);
    }, this);
  }, this);
};


/**
 * Upload given document to SugarCRM.
 * @param {string} mid message id.
 * @param {ydn.gmail.Utils.AttachmentParts} parts
 * @param {ydn.crm.su.ui.UploadDialog.ReturnValue} obj
 * @return {!goog.async.Deferred<SugarCrm.Record>} document record with
 * document_revision_id.
 * @private
 */
ydn.crm.su.AttachButton.prototype.upload_ = function(mid, parts, obj) {

  var opt = {
    'fileName': parts.fn,
    'documentName': obj.document_name,
    'description': obj.description,
    'mime': parts.mime,
    'url': parts.url,
    'messageId': mid,
    'isUserRequest': true
  };
  if (ydn.crm.su.AttachButtonProvider.DEBUG) {
    window.console.log(obj);
  }
  return this.provider_.sugar.getChannel().send(ydn.crm.ch.SReq.UPLOAD,
      opt).addCallback(function(r) {
    var record = /** @type {SugarCrm.Record} */(r);
    record._module = ydn.crm.su.ModuleName.DOCUMENTS;
    if (obj.relationships.length > 0) {
      this.provider_.sugar.setRelationships(ydn.crm.su.ModuleName.DOCUMENTS,
          record.id, obj.relationships).addCallbacks(function(result) {
        if (ydn.crm.su.AttachButtonProvider.DEBUG) {
          window.console.log(result);
        }
        var n = 0;
        if (result && goog.isArray(result)) {
          n = result.reduce(function(p, x) {
            return p + x.created;
          }, 0);
        }
        var mi = ydn.crm.msg.Manager.addStatus(n + ' links created for ');
        var href = this.provider_.sugar.getRecordViewLink(
            ydn.crm.su.ModuleName.DOCUMENTS, record.id);
        ydn.crm.msg.Manager.setLink(mi, href, obj.document_name,
            'View record in SugarCRM');
      }, function(e) {
        ydn.crm.msg.Manager.addStatus('Error linking relationship ' +
            (e.message || e), '', ydn.crm.msg.MessageType.ERROR);
      }, this);
    }
    return record;
  }, this);
};


/**
 * @return {boolean}
 */
ydn.crm.su.AttachButton.prototype.isInDocument = function() {
  return document.body.contains(this.button_);
};


/**
 * @return {ydn.msg.Channel}
 */
ydn.crm.su.AttachButton.prototype.getChannel = function() {
  return this.provider_.sugar.getChannel();
};


/**
 * Render attach button on the download preview panel.
 * @param {Element} anchor attachment anchor element which has download_url
 * attribute.
 */
ydn.crm.su.AttachButton.prototype.decorate = function(anchor) {
  var d_url = anchor.getAttribute('download_url');
  var mid = anchor.getAttribute(ydn.gmail.Utils.ATTR_MESSAGE_ID);
  if (!mid || !d_url) {
    if (goog.DEBUG) {
      window.console.log(anchor);
    }
    throw new Error('Invalid anchor element');
  }
  if (this.button_.parentNode) {
    this.button_.parentNode.removeChild(this.button_);
  }
  var btn = anchor.querySelector('div[role=button]');
  btn.parentElement.appendChild(this.button_);

  var parts = ydn.gmail.Utils.parseDownloadUrl(d_url);
  var query = [{
    'store': ydn.crm.su.ModuleName.DOCUMENTS,
    'index': 'filename',
    'prefix': true, // Note: SugarCRM may append file extension
    'key': mid + '/' + parts.fn
  }, {
    'store': ydn.crm.su.ModuleName.NOTES,
    'prefix': true,
    'index': 'filename',
    'key': mid + '/' + parts.fn
  }];
  this.getChannel().send(ydn.crm.ch.SReq.QUERY, query).addCallbacks(function(x) {
    var arr = /** @type {Array<CrmApp.QueryResult>} */(x);
    var record = arr[0].result[0] || arr[1].result[0];
    this.renderAttachment_(anchor, record);
  }, function(e) {
    this.renderAttachment_(anchor);
    window.console.error(e);
  }, this);
};


/**
 * Return anchor element which has download_url.
 * @return {Element}
 * @private
 */
ydn.crm.su.AttachButton.prototype.getAnchor_ = function() {
  var anchor = this.button_.parentElement;
  for (var i = 0; i < 5; i++) {
    if (anchor.hasAttribute('download_url')) {
      return anchor;
    }
    anchor = anchor.parentElement;
  }
  return anchor.parentElement.parentElement;
};


/**
 * Get message id representing this button.
 * @return {string} gmail message id, such as: "m1490e04d5446681e"
 */
ydn.crm.su.AttachButton.prototype.getMessageId = function() {
  return this.getAnchor_().getAttribute(ydn.gmail.Utils.ATTR_MESSAGE_ID);
};


/**
 * Get download information.
 * @return {ydn.gmail.Utils.AttachmentParts}
 */
ydn.crm.su.AttachButton.prototype.getDownloadInfo = function() {
  var d_url = this.getAnchor_().getAttribute('download_url');
  var info = ydn.gmail.Utils.parseDownloadUrl(d_url);
  info.document_id = this.id_;
  return info;
};


/**
 * Render attach button on the download preview panel.
 * @param {Element} anchor attachment anchor element which has download_url
 * @param {SugarCrm.Record=} opt_doc option attachment record if already saved.
 * attribute.
 * @private
 */
ydn.crm.su.AttachButton.prototype.renderAttachment_ = function(anchor, opt_doc) {

  var parts = this.getDownloadInfo();
  this.id_ = '';
  this.module_ = null;
  if (opt_doc && opt_doc['deleted'] != '1') {
    this.id_ = opt_doc.id;
    if (opt_doc['_module']) {
      this.module_ = opt_doc['_module'];
    } else if (goog.isDef(opt_doc['document_name'])) {
      this.module_ = ydn.crm.su.ModuleName.DOCUMENTS;
    } else {
      this.module_ = ydn.crm.su.ModuleName.NOTES;
    }
  }
  var svg;
  if (this.id_) {
    svg = ydn.crm.ui.createSvgIcon('sugarcrm-bw', 'att-icon');
    var title = chrome.i18n.getMessage('View_record_on_sidebar', [this.module_]);
    this.button_.setAttribute('data-tooltip', title);
  } else {
    var upload = !!opt_doc ? 'Re_upload' : 'Upload';
    upload = chrome.i18n.getMessage(upload);
    svg = ydn.crm.ui.createSvgIcon('cloud-upload', 'att-icon');
    this.button_.setAttribute('data-tooltip', upload);
  }
  this.button_.innerHTML = '';
  this.button_.appendChild(svg);

};


/**
 * Upload as attachment to email record.
 * Attachment are uploaded as NOTES module record, with parent to given email
 * record.
 * @param {string} email_id email record id, as `parent_id`.
 * @param {string} name attachment name. Note: this may be different from `filename`,
 * which is original file name.
 * @return {!goog.async.Deferred<SugarCrm.Record>} newly created attachment
 * record.
 */
ydn.crm.su.AttachButton.prototype.uploadAttachment = function(email_id, name) {

  var msg_id = this.getMessageId();
  var info = this.getDownloadInfo();
  var record = {
    'description': '',
    'file_mime_type': info.mime,
    'filename': msg_id + '/' + info.fn,
    'name': name,
    'parent_id': email_id,
    'parent_name': 'attach from email',
    'parent_type': ydn.crm.su.ModuleName.EMAILS
  };
  var data = {
    'module': ydn.crm.su.ModuleName.NOTES,
    'record': record
  };
  var mid = ydn.crm.msg.Manager.addStatus('Uploading attachment', '...');

  var upload = {
    'module': ydn.crm.su.ModuleName.NOTES,
    'url': info.url,
    'fileName': info.fn,
    'name': name,
    'mime': info.mime,
    'messageId': msg_id,
    'emailId': email_id
  };

  return this.getChannel().send(ydn.crm.ch.SReq.UPLOAD, upload).addCallbacks(function(x) {
    var note = /** @type {SugarCrm.Record} */(x);
    var href = this.provider_.sugar.getRecordViewLink(ydn.crm.su.ModuleName.NOTES, note.id);
    ydn.crm.msg.Manager.setLink(mid, href, name);
    ydn.crm.msg.Manager.setStatus(mid, 'Uploaded attachment: ');
    ydn.crm.msg.Manager.updateStatus(mid, 'Done.');
    ydn.crm.shared.logAnalyticValue('ui.upload', 'attachment', 'OK');
    this.button_.innerHTML = '';
    var svg = ydn.crm.ui.createSvgIcon('sugarcrm-bw', 'att-icon');
    this.button_.appendChild(svg);
    return note;
  }, function(e) {
    ydn.crm.shared.logAnalyticValue('ui.upload', 'attachment', 'fail');
  }, this);

};


/**
 * Validate record value with server for freshness.
 * @private
 */
ydn.crm.su.AttachButton.prototype.validateRecord_ = function() {

  var data = {
    'module': this.module_,
    'id': this.id_
  };
  this.getChannel().send(ydn.crm.ch.SReq.FETCH, data).addCallback(function(r) {
    if (!r || r['deleted'] == '1') {
      this.id_ = '';
      this.module_ = null;
      var lbl = chrome.i18n.getMessage('Re_upload');
      var svg = ydn.crm.ui.createSvgIcon('cloud-upload', 'att-icon');
      this.button_.innerHTML = '';
      this.button_.appendChild(svg);
      this.button_.setAttribute('data-tooltip', lbl);
    }
  }, this);
};
