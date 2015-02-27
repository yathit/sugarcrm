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
 * @fileoverview Document upload dialog.
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */


goog.provide('ydn.crm.su.ui.UploadDialog');
goog.require('goog.dom');
goog.require('goog.soy');
goog.require('ydn.crm.su.ui.widget.SelectRecord');
goog.require('ydn.ui');
goog.require('ydn.ui.MessageDialog');



/**
 * Document upload dialog.
 * <pre>
 *   ydn.crm.su.ui.UploadDialog.showModel(meta, '1', 'name').addCallbacks(function(obj) {
 *     console.log(obj);
 *   }, function(val) {
 *     console.log('do not upload');
 *   });
 * <pre>
 * @param {ydn.crm.su.Meta} meta
 * @param {string} mid message id.
 * @param {string} file_name file name without message id prefix.
 * @constructor
 * @const
 * @extends {ydn.ui.MessageDialog}
 * @see ydn.crm.su.ui.ArchiveDialog
 */
ydn.crm.su.ui.UploadDialog = function(meta, mid, file_name) {
  var title = 'Upload document';
  var content = document.createElement('div');
  var t = ydn.ui.getTemplateById('upload-dialog-template').content;
  content.appendChild(t.cloneNode(true));
  var file_el = content.querySelector('input[name=file_name]');
  file_el.value = mid + '/' + file_name;
  file_el.setAttribute('disabled', '');

  var doc_el = content.querySelector('input[name=document_name]');
  doc_el.value = file_name;

  var btns = [ydn.ui.MessageDialog.Button.OK, ydn.ui.MessageDialog.Button.CANCEL];
  ydn.crm.su.ui.UploadDialog.base(this, 'constructor', title, content, btns);

  /**
   * File name.
   * @type {string}
   * @private
   */
  this.file_name_ = file_name;
  /**
   * File name.
   * @type {ydn.crm.su.Meta}
   * @private
   */
  this.meta_ = meta;

  var module_info = meta.getModuleInfo(ydn.crm.su.ModuleName.DOCUMENTS);
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
};
goog.inherits(ydn.crm.su.ui.UploadDialog, ydn.ui.MessageDialog);


/**
 * @typedef {{
 *   document_name: string,
 *   description: string,
 *   relationships: Array<SugarCrm.ModuleNameIdPair>
 * }}
 */
ydn.crm.su.ui.UploadDialog.ReturnValue;


/**
 * @return {ydn.crm.su.ui.UploadDialog.ReturnValue}
 */
ydn.crm.su.ui.UploadDialog.prototype.getReturnValue = function() {
  var content = this.getContentElement();
  var doc_el = content.querySelector('input[name=document_name]');
  var description_el = content.querySelector('textarea[name=description]');
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
    document_name: doc_el.value,
    description: description_el.value,
    relationships: relationships
  };
};


/**
 * Show modal dialog.
 * @param {ydn.crm.su.Meta} meta
 * @param {string} mid message id.
 * @param {string} file_name file name without message id prefix.
 * @return {!goog.async.Deferred<ydn.crm.su.ui.UploadDialog.ReturnValue>}
 */
ydn.crm.su.ui.UploadDialog.showModel = function(meta, mid, file_name) {
  var dialog = new ydn.crm.su.ui.UploadDialog(meta, mid, file_name);
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
ydn.crm.su.ui.UploadDialog.prototype.onSelectChange_ = function(e) {
  var div = goog.dom.getAncestorByClass(e.target, 'select-record');
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
ydn.crm.su.ui.UploadDialog.prototype.onInputFocus_ = function(e) {
  this.attachSelectRecord_(/** @type {Element} */(e.currentTarget));
};


/**
 * Attach select record auto completer.
 * @param {Element} input
 * @private
 */
ydn.crm.su.ui.UploadDialog.prototype.attachSelectRecord_ = function(input) {
  if (!(input instanceof HTMLInputElement)) {
    window.console.error('input must be HTMLInputElement', input);
    return;
  }
  var div = goog.dom.getAncestorByTagNameAndClass(input, 'div', 'select-record');
  var sel = div.querySelector('select');
  var mn = ydn.crm.su.toModuleName(sel.value);
  this.sel_record_.setModule(mn);
  this.sel_record_.attach(div);
};


/**
 * Add a row for relationship.
 * @private
 */
ydn.crm.su.ui.UploadDialog.prototype.addRelationshipRow_ = function() {
  var content = this.getContentElement();
  var div = content.querySelector('.upload-dialog');

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
};


/**
 * @param {goog.events.BrowserEvent} e
 * @private
 */
ydn.crm.su.ui.UploadDialog.prototype.onRelBlur_ = function(e) {
  this.addRelRowIfNecessary_();
};


/**
 * @private
 */
ydn.crm.su.ui.UploadDialog.prototype.addRelRowIfNecessary_ = function() {
  // add rows if no empty input in relationships.
  var content = this.getContentElement();
  var inputs = content.querySelectorAll('input[class=value]');
  for (var i = 0; i < inputs.length; i++) {
    if (!inputs[i].value) {
      return;
    }
  }
  this.addRelationshipRow_();
};


/**
 * @override
 */
ydn.crm.su.ui.UploadDialog.prototype.dispose = function() {
  this.meta_ = null;
  this.sel_record_.dispose();
  this.sel_record_ = null;
  ydn.crm.su.ui.UploadDialog.base(this, 'dispose');
};


