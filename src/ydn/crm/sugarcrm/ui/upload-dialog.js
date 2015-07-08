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
goog.require('ydn.crm.su.ui.Relationships');
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
  var title = 'Upload attachment as Documents record';
  var content = document.createElement('div');
  var t = ydn.ui.getTemplateById('upload-dialog-template').content;
  content.appendChild(t.cloneNode(true));
  var file_el = content.querySelector('input[name=file_name]');
  file_el.value = mid + '/' + file_name;
  file_el.setAttribute('disabled', '');

  var doc_el = content.querySelector('input[name=document_name]');
  doc_el.value = file_name;

  var btns = ydn.ui.MessageDialog.createOKCancelButtonSet();
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

  /**
   * @type {ydn.crm.su.ui.Relationships}
   * @private
   */
  this.rel_panel_ = new ydn.crm.su.ui.Relationships(meta, ydn.crm.su.ModuleName.DOCUMENTS);
  this.rel_panel_.render(content.querySelector('section[name="rel-panel"]'));

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

  return {
    document_name: doc_el.value,
    description: description_el.value,
    relationships: this.rel_panel_.getRelationships()
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
 * @override
 */
ydn.crm.su.ui.UploadDialog.prototype.dispose = function() {
  this.meta_ = null;
  this.rel_panel_.dispose();
  this.rel_panel_ = null;
  ydn.crm.su.ui.UploadDialog.base(this, 'dispose');
};


