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
goog.require('ydn.crm.su.ui.widget.SelectRecord');
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
 * @constructor
 * @const
 * @extends {ydn.ui.MessageDialog}
 * @see ydn.crm.su.ui.UploadDialog
 */
ydn.crm.su.ui.ArchiveDialog = function(meta, info) {
  var title = 'Archive email';
  var content = ydn.crm.su.ui.ArchiveDialog.renderContent_(info);

  var btns = [ydn.ui.MessageDialog.Button.OK, ydn.ui.MessageDialog.Button.CANCEL];
  ydn.crm.su.ui.ArchiveDialog.base(this, 'constructor', title, content, btns);

  /**
   * File name.
   * @type {ydn.crm.su.Meta}
   * @private
   */
  this.meta_ = meta;

  var module_info = meta.getModuleInfo(ydn.crm.su.ModuleName.EMAILS);
  /**
   * @type {Array<ydn.crm.su.ModuleName>}
   */
  this.relationship_modules = ydn.crm.su.getRelationshipCacheModule(module_info,
      [ydn.crm.su.ModuleName.ACCOUNTS,
        ydn.crm.su.ModuleName.CONTACTS,
        ydn.crm.su.ModuleName.OPPORTUNITIES,
        ydn.crm.su.ModuleName.CASES]);

  /**
   * @type {ydn.crm.su.ui.widget.SelectRecord}
   * @private
   */
  this.sel_record_ = new ydn.crm.su.ui.widget.SelectRecord(meta, undefined, this.dialog);
  this.addRelationshipRow_();

  var checks = content.querySelectorAll('ul input[type=checkbox]');
  for (var i = 0; i < checks.length; i++) {
    this.handler.listen(checks[i], 'click', this.onAttClick_);
  }
};
goog.inherits(ydn.crm.su.ui.ArchiveDialog, ydn.ui.MessageDialog);


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
 * @return {Element}
 * @private
 */
ydn.crm.su.ui.ArchiveDialog.renderContent_ = function(info) {
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
  if (info.attachments.length > 0) {
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
        fn = att.document_name || att.fn;
      }
      input.value = fn;
      li.appendChild(chk);
      li.appendChild(input);
      ul.appendChild(li);
    }
  } else {
    goog.style.setElementShown(att_el, false);
  }
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
  var relationships = [];
  var rows = content.querySelectorAll('.select-record');
  for (var i = 0; i < rows.length; i++) {
    var input = rows[i].querySelector('input');
    var select = rows[i].querySelector('select');
    var id = input.getAttribute('data-id');
    if (!id || !input.value) {
      continue;
    }
    relationships.push({
      'module_name': ydn.crm.su.toModuleName(select.value),
      'id': id
    });
  }
  return {
    document_names: attachments,
    relationships: relationships
  };
};


/**
 * Show modal dialog.
 * @param {ydn.crm.su.Meta} meta
 * @param {ydn.gmail.Utils.EmailInfo} info message info.
 * @param {SugarCrm.Record=} opt_record parent record.
 * @return {!goog.async.Deferred<ydn.crm.su.ui.ArchiveDialog.ReturnValue>}
 */
ydn.crm.su.ui.ArchiveDialog.showModel = function(meta, info, opt_record) {
  var dialog = new ydn.crm.su.ui.ArchiveDialog(meta, info);
  if (opt_record) {
    dialog.addRelationship(opt_record._module, opt_record.id, opt_record.name);
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
  return df;
};


/**
 * @param {goog.events.BrowserEvent} e
 * @private
 */
ydn.crm.su.ui.ArchiveDialog.prototype.onInputFocus_ = function(e) {
  this.attachSelectRecord_(/** @type {Element} */(e.currentTarget));
};


/**
 * Attach select record auto completer.
 * @param {Element} input
 * @private
 */
ydn.crm.su.ui.ArchiveDialog.prototype.attachSelectRecord_ = function(input) {
  if (!(input instanceof HTMLInputElement)) {
    window.console.error('input must be HTMLInputElement', input);
    return;
  }
  var div = goog.dom.getAncestorByTagNameAndClass(input, 'div',
      ydn.crm.su.ui.widget.SelectRecord.CSS_CLASS);
  var sel = div.querySelector('select');
  var mn = ydn.crm.su.toModuleName(sel.value);
  this.sel_record_.setModule(mn);
  this.sel_record_.attach(div);
};


/**
 * @return {Element}
 */
ydn.crm.su.ui.ArchiveDialog.prototype.getRelationshipsPanel = function() {
  var content = this.getContentElement();
  return content.querySelector('[name=relationships]');
};


/**
 * Add a row for relationship.
 * @private
 * @return {Element} newly created record.
 */
ydn.crm.su.ui.ArchiveDialog.prototype.addRelationshipRow_ = function() {
  var div = this.getRelationshipsPanel();

  var row = goog.soy.renderAsElement(templ.ydn.crm.inj.selectRecord, {
    use_sel: true
  });

  var a = row.querySelector('a');
  a.classList.add('spacer');

  var select = row.querySelector('select');
  for (var i = 0; i < this.relationship_modules.length; i++) {
    var option = document.createElement('option');
    option.value = this.relationship_modules[i];
    option.textContent = this.relationship_modules[i];
    select.appendChild(option);
  }
  var input = row.querySelector('input');

  this.handler.listen(input, goog.events.EventType.FOCUS, this.onInputFocus_);
  this.handler.listen(input, goog.events.EventType.BLUR, this.onRelBlur_);
  this.handler.listen(select, goog.events.EventType.CHANGE, this.onSelectChange_);

  div.appendChild(row);
  return row;
};


/**
 * Add a relationship.
 * @param {string} mn module name.
 * @param {string} id
 * @param {string} name
 */
ydn.crm.su.ui.ArchiveDialog.prototype.addRelationship = function(mn, id, name) {
  var row = this.addRelRowIfNecessary_();
  var select = row.querySelector('select');
  select.value = mn;
  if (select.selectedIndex >= 0) {
    var input = row.querySelector('input.value');
    input.setAttribute('data-id', id);
    input.value = name;
    this.addRelRowIfNecessary_();
  } else {
    throw new Error('record has not _module to add relationships');
  }
};


/**
 * @param {goog.events.BrowserEvent} e
 * @private
 */
ydn.crm.su.ui.ArchiveDialog.prototype.onSelectChange_ = function(e) {
  var div = goog.dom.getAncestorByClass(e.target,
      ydn.crm.su.ui.widget.SelectRecord.CSS_CLASS);
  var input = div.querySelector('input');
  input.value = '';
  input.removeAttribute('data-id');
  var a = div.querySelector('a');
  a.href = '';
  goog.style.setElementShown(a, false);
};


/**
 * @param {goog.events.BrowserEvent} e
 * @private
 */
ydn.crm.su.ui.ArchiveDialog.prototype.onRelBlur_ = function(e) {
  this.addRelRowIfNecessary_();
};


/**
 * @private
 * @return {Element} the empty row or newly created row.
 */
ydn.crm.su.ui.ArchiveDialog.prototype.addRelRowIfNecessary_ = function() {
  // add rows if no empty input in relationships.
  var content = this.getRelationshipsPanel();
  var inputs = content.querySelectorAll('input[class=value]');
  for (var i = 0; i < inputs.length; i++) {
    if (!inputs[i].value) {
      return goog.dom.getAncestorByClass(inputs[i],
          ydn.crm.su.ui.widget.SelectRecord.CSS_CLASS);
    }
  }
  return this.addRelationshipRow_();
};


/**
 * @override
 */
ydn.crm.su.ui.ArchiveDialog.prototype.dispose = function() {
  this.meta_ = null;
  this.sel_record_.dispose();
  this.sel_record_ = null;
  ydn.crm.su.ui.ArchiveDialog.base(this, 'dispose');
};


