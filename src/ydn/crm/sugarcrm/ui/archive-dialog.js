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
 * @fileoverview Email archive dialog.
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */


goog.provide('ydn.crm.su.ui.ArchiveDialog');
goog.require('goog.dom');
goog.require('goog.soy');
goog.require('ydn.crm.su.ui.Relationships');
goog.require('ydn.string');
goog.require('ydn.ui');
goog.require('ydn.ui.MessageDialog');



/**
 * Email archive dialog.
 * <pre>
 *   ydn.crm.su.ui.ArchiveDialog.showModel(meta, info).addCallbacks(function(obj) {
 *     console.log(obj);
 *   }, function(val) {
 *     console.log('do not archive');
 *   });
 * <pre>
 * @param {ydn.crm.su.Meta} meta
 * @param {ydn.gmail.Utils.EmailInfo} info message info.
 * of attachment.
 * @param {ydn.crm.IUser=} opt_user optionally provide user for feature control.
 * @constructor
 * @const
 * @extends {ydn.ui.MessageDialog}
 * @see ydn.crm.su.ui.UploadDialog
 */
ydn.crm.su.ui.ArchiveDialog = function(meta, info, opt_user) {
  var title = 'Archive email';

  /**
   * @type {ydn.crm.IUser}
   * @private
   */
  this.user_ = opt_user || null;
  var content = ydn.crm.su.ui.ArchiveDialog.renderContent_(info, this.user_);

  var btns = ydn.ui.MessageDialog.createOKCancelButtonSet();
  ydn.crm.su.ui.ArchiveDialog.base(this, 'constructor', title, content, btns);

  /**
   * File name.
   * @type {ydn.crm.su.Meta}
   * @private
   */
  this.meta_ = meta;

  /**
   * @type {ydn.crm.su.ui.Relationships}
   * @private
   */
  this.rel_panel_ = new ydn.crm.su.ui.Relationships(meta, ydn.crm.su.ModuleName.EMAILS);
  this.rel_panel_.render(content.querySelector('section[name="rel-panel"]'));

  var checks = content.querySelectorAll('ul input[type=checkbox]');
  for (var i = 0; i < checks.length; i++) {
    this.handler.listen(checks[i], 'click', this.onAttClick_);
  }
};
goog.inherits(ydn.crm.su.ui.ArchiveDialog, ydn.ui.MessageDialog);


/**
 * @define {boolean} debug variable.
 */
ydn.crm.su.ui.ArchiveDialog.DEBUG = false;


/**
 * @typedef {{
 *   document_names: Array<string|undefined>,
 *   relationships: Array<SugarCrm.ModuleNameIdPair>
 * }}
 * document_names is list of document_name corresponding to attachments array.
 * The value is only exists if user is selected to upload.
 */
ydn.crm.su.ui.ArchiveDialog.ReturnValue;


/**
 * @param {ydn.gmail.Utils.EmailInfo} info
 * @param {ydn.crm.IUser} user
 * @return {Element}
 * @private
 */
ydn.crm.su.ui.ArchiveDialog.renderContent_ = function(info, user) {
  var content = document.createElement('div');
  var t = ydn.ui.getTemplateById('archive-dialog-template').content;
  content.appendChild(t.cloneNode(true));
  var name_el = content.querySelector('input[name=name]');
  name_el.value = info.subject;
  name_el.setAttribute('disabled', '');
  var message_id_el = content.querySelector('input[name=message_id]');
  message_id_el.value = info.message_id;
  message_id_el.setAttribute('disabled', '');
  var att_el = content.querySelector('[name=attachment]');
  var has_att_feature = user ?
      user.hasFeature(ydn.crm.base.Feature.ATTACHMENT) : true;

  if (info.attachments.length > 0 && has_att_feature) {
    var ul = att_el.querySelector('ul');
    for (var i = 0; i < info.attachments.length; i++) {
      var att = /** @type {ydn.gmail.Utils.AttachmentParts} */(info.attachments[i]);
      var li = document.createElement('li');
      var chk = document.createElement('input');
      chk.type = 'checkbox';
      var fn = att.fn;
      var input = document.createElement('input');
      input.type = 'text';
      input.className = 'value';
      input.setAttribute('disabled', 'disabled');
      if (att.document_id) {
        chk.checked = true;
        chk.setAttribute('disabled', 'disabled');
        chk.setAttribute('title', 'Document ' + att.document_id + ' already in CRM.');
        fn = att.document_name || att.fn;
      } else {
        chk.setAttribute('title', '');
      }
      input.value = fn;
      li.appendChild(chk);
      li.appendChild(input);
      ul.appendChild(li);
    }
  } else {
    if (info.attachments.length == 0) {
      goog.style.setElementShown(att_el, false);
    } else if (!has_att_feature) {
      att_el.innerHTML = '<p><small>A <a href="https://www.yathit.com/shop/crmininbox-subscription.html" tabIndex="-1" style="outline: none;">subscription</a> is required for attachment.</small></p>';
    }
  }

  content.querySelector('[name=from]').textContent = info.from_addr;
  content.querySelector('[name=to]').textContent = info.to_addrs;
  var word_count_el = content.querySelector('.word-count');
  word_count_el.textContent = String(ydn.string.countByReg(info.html, /\w+/g));
  return content;
};


/**
 * @param {goog.events.BrowserEvent} e
 * @private
 */
ydn.crm.su.ui.ArchiveDialog.prototype.onAttClick_ = function(e) {
  var input = /** @type {HTMLInputElement} */(e.target);
  if (input.checked) {
    input.nextElementSibling.removeAttribute('disabled');
  } else {
    input.nextElementSibling.setAttribute('disabled', '');
  }
};


/**
 * @return {ydn.crm.su.ui.ArchiveDialog.ReturnValue}
 */
ydn.crm.su.ui.ArchiveDialog.prototype.getReturnValue = function() {
  var content = this.getContentElement();
  var att_ul = content.querySelector('[name=attachment] ul');
  var attachments = [];
  for (var i = 0; i < att_ul.childElementCount; i++) {
    var li = att_ul.children[i];
    var chk = li.querySelector('input[type=checkbox]');
    if (!chk.hasAttribute('disabled') && chk.checked) {
      var label = li.querySelector('input.value');
      attachments[i] = label.value;
    }
  }

  return {
    document_names: attachments,
    relationships: this.rel_panel_.getRelationships()
  };
};


/**
 * @param {ydn.crm.su.ui.ArchiveDialog} dialog
 * @param {ydn.crm.su.Meta} meta
 * @param {string} email
 * @private
 */
ydn.crm.su.ui.ArchiveDialog.addRel_ = function(dialog, meta, email) {

  // in version ? these relationship are automatically added ?
  meta.queryOneByEmail(email).addCallback(function(r) {
    if (ydn.crm.su.ui.ArchiveDialog.DEBUG) {
      window.console.log('addRel_', email, r);
    }
    if (r) {
      dialog.addRelationship(/** @type {ydn.crm.su.ModuleName} */(r._module), r.id, r.name);
    }
  });

  dialog.rel_panel_.addSuggestionByEmail(email,
      [ydn.crm.su.ModuleName.OPPORTUNITIES, ydn.crm.su.ModuleName.CASES]);
};


/**
 * Show modal dialog.
 * @param {ydn.crm.su.Meta} meta
 * @param {ydn.gmail.Utils.EmailInfo} info message info.
 * @param {ydn.crm.IUser} user optionally provide user for feature control.
 * @param {SugarCrm.Record=} opt_record parent record.
 * @return {!goog.async.Deferred<ydn.crm.su.ui.ArchiveDialog.ReturnValue>}
 */
ydn.crm.su.ui.ArchiveDialog.showModel = function(meta, info, user, opt_record) {
  var dialog = new ydn.crm.su.ui.ArchiveDialog(meta, info, user);
  if (opt_record) {
    var mn = /** @type {ydn.crm.su.ModuleName} */(opt_record._module);
    dialog.addRelationship(mn, opt_record.id, opt_record.name);
  }
  var df = new goog.async.Deferred();
  dialog.dialog.onclose = function(event) {
    if (dialog.dialog.returnValue == ydn.ui.MessageDialog.Button.OK) {
      df.callback(dialog.getReturnValue());
    } else {
      df.errback(dialog.dialog.returnValue);
    }
    dialog.dispose();
  };
  dialog.dialog.showModal();

  var emails = info.to_addrs.split(', ').concat(info.from_addr.split(', '));
  for (var i = 0; i < emails.length; i++) {
    ydn.crm.su.ui.ArchiveDialog.addRel_(dialog, meta, emails[i]);
  }

  return df;
};


/**
 * Add a relationship.
 * @param {ydn.crm.su.ModuleName} mn module name.
 * @param {string} id
 * @param {string} name
 */
ydn.crm.su.ui.ArchiveDialog.prototype.addRelationship = function(mn, id, name) {
  this.rel_panel_.addRelationship({
    module_name: mn,
    id: id,
    name: name
  });
};


/**
 * @override
 */
ydn.crm.su.ui.ArchiveDialog.prototype.dispose = function() {
  this.meta_ = null;
  this.rel_panel_.dispose();
  this.rel_panel_ = null;
  ydn.crm.su.ui.ArchiveDialog.base(this, 'dispose');
};


