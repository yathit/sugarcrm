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
 * @fileoverview Record item renderer for rendering brief overview of
 * record data.
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */


goog.provide('ydn.crm.su.ui.record.RecordItemRenderer');



/**
 * Record item renderer for rendering brief overview of record data.
 * <pre>
 *   var renderer = new ydn.crm.su.ui.record.RecordItemRenderer(sugar);
 *   renderer.render(el1, record1);
 *   renderer.record(el2, record2);
 * </pre>
 * @param {ydn.crm.su.model.Sugar} sugar
 * @constructor
 * @struct
 */
ydn.crm.su.ui.record.RecordItemRenderer = function(sugar) {
  /**
   * SugarCRM instance.
   * @type {ydn.crm.su.model.Sugar}
   * @private
   */
  this.sugar_ = sugar;
};


/**
 * Render content for people module.
 * @param {Element} el content element.
 * @param {ydn.crm.su.model.Record} record record.
 * @private
 */
ydn.crm.su.ui.record.RecordItemRenderer.prototype.contentForPeople_ = function(el, record) {
  var ele_desc = el.querySelector('.summary');
  var email_group = /** @type {ydn.crm.su.model.EmailGroup} */(
      record.getGroupModel('email'));
  ele_desc.textContent = email_group.getPrimaryEmailAddress();
};


/**
 * Render content for activity modules, Calls, Meetings and Tasks.
 * @param {Element} el content element.
 * @param {ydn.crm.su.model.Record} record record.
 * @private
 */
ydn.crm.su.ui.record.RecordItemRenderer.prototype.contentForActivity_ = function(el, record) {
  var ele_desc = el.querySelector('.summary');
  var due = record.getDueDate();
  if (due) {
    ele_desc.textContent = due.toLocaleString();
  } else {
    ele_desc.textContent = '';
  }
};


/**
 * Render content for default module.
 * @param {Element} el content element.
 * @param {ydn.crm.su.model.Record} record record.
 * @private
 */
ydn.crm.su.ui.record.RecordItemRenderer.prototype.contentDefault_ = function(el, record) {
  var ele_desc = el.querySelector('.summary');
  ele_desc.textContent = record.valueAsString('description');
};


/**
 * Render record item.
 * @param {Element} el element to render on.
 * @param {SugarCrm.Record} r record.
 */
ydn.crm.su.ui.record.RecordItemRenderer.prototype.render = function(el, r) {
  el.innerHTML = '';
  var t = ydn.ui.getTemplateById('record-item-template').content;
  el.appendChild(t.cloneNode(true));
  el.setAttribute('data-id', r.id);
  var root = el.firstElementChild;

  var mn = ydn.crm.su.toModuleName(r._module);
  root.classList.add(mn);
  var record = new ydn.crm.su.model.Record(this.sugar_,
      new ydn.crm.su.Record(this.sugar_.getDomain(), mn, r));

  var badge = el.querySelector('.icon');
  badge.textContent = ydn.crm.su.toModuleSymbol(mn);

  var ele_title = el.querySelector('.title');
  ele_title.textContent = record.getLabel();
  ele_title.href = record.getViewLink();
  ele_title.target = '_blank';

  var ele_content = el.querySelector('.content');
  if (ydn.crm.su.PEOPLE_MODULES.indexOf(mn) >= 0) {
    this.contentForPeople_(ele_content, record);
  } else if (ydn.crm.su.ACTIVITY_MODULES.indexOf(mn) >= 0) {
    this.contentForActivity_(ele_content, record);
  } else {
    this.contentDefault_(ele_content, record);
  }
};

