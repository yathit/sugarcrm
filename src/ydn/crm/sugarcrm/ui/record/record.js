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
 * @fileoverview Record module panel for Accounts, Contacts, Leads, etc.
 *
 * A specific renderer is selected depending on module type.
 * This is container for group panel and has some controls to viewing and editing.
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */


goog.provide('ydn.crm.sugarcrm.ui.record.Record');
goog.require('goog.ui.Component');
goog.require('ydn.crm.msg.Manager');
goog.require('ydn.crm.sugarcrm');
goog.require('ydn.crm.sugarcrm.model.Sugar');
goog.require('ydn.crm.sugarcrm.ui.events');
goog.require('ydn.crm.sugarcrm.ui.field.Field');
goog.require('ydn.crm.sugarcrm.ui.record.Body');
goog.require('ydn.crm.sugarcrm.ui.record.Default');
goog.require('ydn.crm.sugarcrm.ui.record.FooterRenderer');
goog.require('ydn.crm.sugarcrm.ui.record.Secondary');
goog.require('ydn.crm.sugarcrm.ui.widget.SelectRecord');
goog.require('ydn.crm.ui');
goog.require('ydn.crm.ui.StatusBar');
goog.require('ydn.ui');
goog.require('ydn.ui.FlyoutMenu');
goog.require('ydn.ui.MessageDialog');



/**
 * SugarCRM record panel.
 * @param {ydn.crm.sugarcrm.model.Record} model
 * @param {goog.dom.DomHelper=} opt_dom
 * @param {ydn.crm.sugarcrm.ui.record.Record=} opt_parent parent panel for for child record panel.
 * @constructor
 * @struct
 * @extends {goog.ui.Component}
 * @suppress {checkStructDictInheritance} suppress closure-library code.
 */
ydn.crm.sugarcrm.ui.record.Record = function(model, opt_dom, opt_parent) {
  goog.base(this, opt_dom);
  goog.asserts.assert(model);
  this.setModel(model);

  /**
   * @final
   * @protected
   * @type {ydn.crm.sugarcrm.ui.record.Record}
   */
  this.parent_panel = opt_parent || null;
  /**
   * @final
   * @protected
   * @type {ydn.ui.FlyoutMenu}
   */
  this.head_menu = new ydn.ui.FlyoutMenu({
    className: 'menu'
  });
  /**
   * @protected
   * @type {ydn.crm.sugarcrm.ui.record.Body}
   */
  this.body_panel = this.createBodyPanel();
  this.enable_secondary = ydn.crm.sugarcrm.ui.record.Record.EnableSecondary.ENABLED;
  /**
   * @protected
   * @type {ydn.crm.sugarcrm.ui.record.Secondary}
   */
  this.secondary_panel = null;
  /**
   * @final
   * @protected
   * @type {ydn.crm.sugarcrm.ui.record.FooterRenderer}
   */
  this.footer_panel = ydn.crm.sugarcrm.ui.record.FooterRenderer.getInstance();


  this.addChild(this.body_panel, true);

};
goog.inherits(ydn.crm.sugarcrm.ui.record.Record, goog.ui.Component);


/**
 * @protected
 * @type {goog.log.Logger}
 */
ydn.crm.sugarcrm.ui.record.Record.prototype.logger =
    goog.log.getLogger('ydn.crm.sugarcrm.ui.record.Record');


/**
 * @define {boolean} debug flag.
 */
ydn.crm.sugarcrm.ui.record.Record.DEBUG = false;


/**
 * @return {ydn.crm.sugarcrm.model.Record}
 * @override
 */
ydn.crm.sugarcrm.ui.record.Record.prototype.getModel;


/**
 * @const
 * @type {string}
 */
ydn.crm.sugarcrm.ui.record.Record.CSS_CLASS = 'record-panel';


/**
 * @const
 * @type {string} class name for body content when viewing.
 */
ydn.crm.sugarcrm.ui.record.Record.CSS_CLASS_DETAIL = 'detail';


/**
 * @const
 * @type {string} CSS class name for secondary records panel.
 */
ydn.crm.sugarcrm.ui.record.CSS_HEADER = 'record-header';


/**
 * @const
 * @type {string}
 */
ydn.crm.sugarcrm.ui.record.CSS_HEADER_TITLE = 'title';


/**
 * @const
 * @type {string}
 */
ydn.crm.sugarcrm.ui.record.CSS_HEADER_ICON = 'icon';


/**
 * @const
 * @type {string}
 */
ydn.crm.sugarcrm.ui.record.CSS_HEADER_SYNCED = 'synced';


/**
 * @const
 * @type {string}
 */
ydn.crm.sugarcrm.ui.record.CSS_HEADER_EDIT = 'edit-button';


/**
 * @return {string}
 */
ydn.crm.sugarcrm.ui.record.Record.prototype.getCssClass = function() {
  return ydn.crm.sugarcrm.ui.record.Record.CSS_CLASS;
};


/**
 * @return {?ydn.crm.sugarcrm.ui.record.Record}
 */
ydn.crm.sugarcrm.ui.record.Record.prototype.getParentPanel = function() {
  return this.parent_panel;
};


/**
 * @param {ydn.crm.sugarcrm.ui.record.Record.EnableSecondary} val
 */
ydn.crm.sugarcrm.ui.record.Record.prototype.setEnableSecondary = function(val) {
  if (val == this.enable_secondary) {
    return;
  }
  this.enable_secondary = val;
  this.validateSecondaryPanel_();
};


/**
 * validate secondary panel should be added or remove.
 * @private
 */
ydn.crm.sugarcrm.ui.record.Record.prototype.validateSecondaryPanel_ = function() {
  if (this.enable_secondary == ydn.crm.sugarcrm.ui.record.Record.EnableSecondary.ALWAYS ||
      (this.enable_secondary == ydn.crm.sugarcrm.ui.record.Record.EnableSecondary.ENABLED &&
      this.isActive())) {
    if (!this.secondary_panel) {
      this.secondary_panel = new ydn.crm.sugarcrm.ui.record.Secondary(
          this.getModel(), this.getDomHelper());
      this.addChild(this.secondary_panel, true);
      if (this.isInDocument()) {
        this.secondary_panel.reset();
        this.secondary_panel.refresh();
      }
    }
  } else if (this.enable_secondary == ydn.crm.sugarcrm.ui.record.Record.EnableSecondary.DISABLED ||
      (this.enable_secondary == ydn.crm.sugarcrm.ui.record.Record.EnableSecondary.ENABLED &&
      !this.isActive())) {
    if (this.secondary_panel) {
      this.removeChild(this.secondary_panel, true);
      this.secondary_panel.dispose();
      this.secondary_panel = null;
    }
  }

};


/**
 * @return {ydn.crm.sugarcrm.ui.record.Body}
 * @protected
 */
ydn.crm.sugarcrm.ui.record.Record.prototype.createBodyPanel = function() {
  var model = this.getModel();
  var dom = this.getDomHelper();
  var mn = model.getModuleName();
  return new ydn.crm.sugarcrm.ui.record.Default(model, dom);
};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.ui.record.Record.prototype.getContentElement = function() {
  return this.getElement().querySelector('.' + ydn.crm.ui.CSS_CLASS_CONTENT);
};


/**
 * @return {Element}
 */
ydn.crm.sugarcrm.ui.record.Record.prototype.getHeaderElement = function() {
  return this.getElement().querySelector('.' + ydn.crm.ui.CSS_CLASS_HEAD);
};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.ui.record.Record.prototype.createDom = function() {
  goog.base(this, 'createDom');
  var root = this.getElement();
  var dom = this.getDomHelper();
  // root.classList.add(this.getCssClass());
  root.className = this.getCssClass() + ' ' + this.getModel().getModuleName();
  var ele_header = dom.createDom('div', ydn.crm.ui.CSS_CLASS_HEAD);
  var content = dom.createDom('div', ydn.crm.ui.CSS_CLASS_CONTENT);
  root.appendChild(ele_header);
  root.appendChild(content);

  ele_header.classList.add(ydn.crm.sugarcrm.ui.record.CSS_HEADER);
  ele_header.classList.add(ydn.crm.ui.CSS_CLASS_FLEX_BAR);

  var title = dom.createDom('a', {
    'class': ydn.crm.sugarcrm.ui.record.CSS_HEADER_TITLE + ' center',
    'title': 'Open in SugarCRM'
  });

  var record_type_badge = dom.createDom('span',
      ydn.crm.sugarcrm.ui.record.CSS_HEADER_ICON);
  var gmail_icon = dom.createDom('a', {
    'title': 'View in Gmail contact',
    'class': ydn.crm.ui.CSS_CLASS_BADGE_ICON + ' google'
  }, ydn.crm.ui.createSvgIcon('google', 'icons-small'));
  var save_btn = dom.createDom('span', 'svg-button ' + ydn.crm.ui.CSS_CLASS_OK_BUTTON,
      ydn.crm.ui.createSvgIcon('check-circle'));
  save_btn.setAttribute('title', 'Save');

  ele_header.appendChild(record_type_badge);
  ele_header.appendChild(gmail_icon);
  ele_header.appendChild(title);
  ele_header.appendChild(save_btn);
  this.head_menu.render(ele_header);

  this.validateSecondaryPanel_();

  var footer = dom.createDom('div', ydn.crm.sugarcrm.ui.record.FooterRenderer.CSS_CLASS);
  root.appendChild(footer);
  this.footer_panel.createDom(this);
};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.ui.record.Record.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  var hd = this.getHandler();
  /**
   * @type {ydn.crm.sugarcrm.model.Record}
   */
  var model = this.getModel();

  var footer_ele = this.getElement().querySelector('.' + ydn.crm.sugarcrm.ui.record.FooterRenderer.CSS_CLASS);
  var menu_ele = this.getElement().querySelector('.' + ydn.crm.ui.CSS_CLASS_HEAD +
      ' .' + ydn.ui.FlyoutMenu.CSS_CLASS);
  hd.listen(model, ydn.crm.sugarcrm.model.events.Type.MODULE_CHANGE, this.handleModuleChanged);
  hd.listen(model, ydn.crm.sugarcrm.model.events.Type.RECORD_CHANGE, this.handleRecordChanged);
  hd.listen(model, ydn.crm.sugarcrm.model.events.Type.RECORD_UPDATE, this.handleRecordUpdated);
  // Note: we do not listen events on element of children of these component.
  hd.listen(this.getContentElement(), goog.events.EventType.CLICK, this.handleContentClick, false);
  hd.listen(this, [ydn.crm.sugarcrm.ui.events.Type.CHANGE], this.handleInputChanged);
  hd.listen(menu_ele, 'click', this.handleHeaderMenuClick);

  var ok_btn = this.getHeaderElement().querySelector('.' + ydn.crm.ui.CSS_CLASS_OK_BUTTON);
  hd.listen(ok_btn, 'click', this.onSaveClick);

  this.reset();
};


/**
 * Handle delete record event.
 * @param {*} e
 */
ydn.crm.sugarcrm.ui.record.Record.prototype.handleRecordDelete = function(e) {
  var record = this.getModel();

  var dialog = /** @type {HTMLDialogElement} */ (ydn.ui.getTemplateById('record-delete-dialog'));

  var record_link = dialog.querySelector('a.record');
  record_link.href = record.getViewLink();
  record_link.textContent = record.getLabel();
  var type = dialog.querySelector('span.type');
  type.textContent = record.getModuleName();
  dialog.showModal(document.getElementById('sticky-hud-base'));

  var cancel_btn = dialog.querySelector('button[name=cancel]');
  cancel_btn.onclick = function() {
    dialog.close('cancel');
  };
  var ok_btn = dialog.querySelector('button[name=ok]');
  ok_btn.onclick = function() {
    dialog.close('ok');
  };
  ok_btn.focus();

  dialog.onclose = function(e) {
    var dialog = /** @type {HTMLDialogElement} */ (e.target);
    if (dialog.returnValue == 'ok') {
      var mid = ydn.crm.msg.Manager.addStatus('Deleting', '...');
      ydn.crm.msg.Manager.setLink(mid, record.getViewLink(), record.getLabel());
      record.deleteRecord().addCallbacks(function(x) {
        ydn.crm.msg.Manager.setStatus(mid, record.getLabel(), ' deleted.');
      }, function(e) {
        ydn.crm.msg.Manager.updateStatus(mid, e.message, ydn.crm.msg.MessageType.ERROR);
      }, this);
    }
  };

};


/**
 * Handle on exporting record to GData contact.
 * @protected
 * @param {goog.events.BrowserEvent} e
 */
ydn.crm.sugarcrm.ui.record.Record.prototype.onExport = function(e) {
  var record = this.getModel();
  if (!record.isNew()) {
    var mid = ydn.crm.msg.Manager.addStatus('exporting...');
    record.export2GData().addCallbacks(function(x) {
      var acui = ydn.gmail.Utils.getGoogleAcui();
      ydn.crm.msg.Manager.setStatus(mid, 'Exported to ');
      var href = x.getGmailViewLink(acui);
      ydn.crm.msg.Manager.setLink(mid, href, 'View in Gmail contact',
          'Gmail Contact ' + x.getSingleId());
      this.postReset();
    }, function(e) {
      ydn.crm.msg.Manager.setStatus(mid, 'Error exporting: ' + e.message || e);
    }, this);
  } else {
    ydn.ui.MessageDialog.showModal('Export to Gmail Contact',
        'SugarCRM Record does not exist');
  }
};


/**
 * @protected
 * @param {goog.events.BrowserEvent} e
 */
ydn.crm.sugarcrm.ui.record.Record.prototype.handleHeaderMenuClick = function(e) {
  var cmds = this.head_menu.handleClick(e);
  if (!cmds) {
    return;
  }
  var names = cmds.split(',');
  var cmd = names[names.length - 1];
  var dp_ = ydn.crm.sugarcrm.ui.record.Record.MenuName.DUPLICATE + '-';
  if (cmd == ydn.crm.sugarcrm.ui.record.Record.MenuName.EDIT) {
    this.setEditMode(!this.getEditMode());
  } else if (cmd == ydn.crm.sugarcrm.ui.record.Record.MenuName.DELETE) {
    this.handleRecordDelete(e);
  } else if (cmd == ydn.crm.sugarcrm.ui.record.Record.MenuName.EXPORT_TO_GMAIL) {
    this.onExport(e);
  } else if (cmd == ydn.crm.sugarcrm.ui.record.Record.MenuName.FIELDS_OPTION) {
    this.showFieldDisplayDialog();
  } else if (cmd == ydn.crm.sugarcrm.ui.record.Record.MenuName.DETAILS) {
    this.showDetailDialog();
  } else if (!!cmd && goog.string.startsWith(cmd, 'new-')) {
    var m_name = /** @type {ydn.crm.sugarcrm.ModuleName} */ (cmd.substr('new-'.length));
    this.newRecord(m_name, false);
  } else if (!!cmd && goog.string.startsWith(cmd, dp_)) {
    var m_name = /** @type {ydn.crm.sugarcrm.ModuleName} */ (cmd.substr(dp_.length));
    this.newRecord(m_name, true);
  }
};


/**
 * @protected
 * @param {goog.events.BrowserEvent} e
 */
ydn.crm.sugarcrm.ui.record.Record.prototype.onSaveClick = function(e) {
  if (!this.body_panel.hasChanged()) {
    if (ydn.crm.sugarcrm.ui.record.Record.DEBUG) {
      window.console.info('No change');
    }
    return;
  }
  var is_new_record = this.getModel().isNew();
  var patches = is_new_record ?
      this.body_panel.collectData() : this.body_panel.getPatch();
  if (patches) {
    this.patch(patches);
  }
};


/**
 * Show record detail dialog to change default display.
 * @protected
 */
ydn.crm.sugarcrm.ui.record.Record.prototype.showFieldDisplayDialog = function() {
  var dialog = this.getFieldDisplayDialog_();
  var content = dialog.querySelector('.content');
  var m_name = content.getAttribute('name');
  if (!m_name) {
    // first time use, attach listeners
    var close_btn = dialog.querySelector('button.apply');
    var cancel_btn = dialog.querySelector('button.cancel');
    close_btn.onclick = function() {
      dialog.close('apply');
    };
    cancel_btn.onclick = function() {
      dialog.close('cancel');
    };
    dialog.onclose = this.onFieldDisplayDialogClose_.bind(this);
  }
  var record = this.getModel();
  var dom = this.getDomHelper();
  var model_m_name = record.getModuleName();
  if (m_name != model_m_name) {
    content.innerHTML = '';
    content.setAttribute('name', model_m_name);
    var table = ydn.ui.getTemplateById('field-table').content;
    content.appendChild(table.cloneNode(true));
    var group_body = content.querySelector('tbody.group-body');
    var field_body = content.querySelector('tbody.field-body');
    var module_info = record.getModuleInfo();
    var groups = [];
    var other_group = null;
    var us = ydn.crm.ui.UserSetting.getInstance();
    for (var name in module_info.module_fields) {
      var field = module_info.module_fields[name];
      var group = field.group;
      var setting;
      var tr = document.createElement('tr');
      if (group) {
        if (groups.indexOf(group) == -1) {
          groups.push(group);
          group_body.appendChild(tr);
          setting = new ydn.crm.sugarcrm.ui.setting.Group(model_m_name, group);
        } else {
          continue;
        }
      } else {
        field_body.appendChild(tr);
        setting = new ydn.crm.sugarcrm.ui.setting.Field(model_m_name, field);
      }
      tr.setAttribute('name', setting.getName());
      var show_td = document.createElement('td');
      var name_td = document.createElement('td');
      var show_chk = document.createElement('input');
      show_td.appendChild(show_chk);
      show_chk.type = 'checkbox';
      if (!setting.getNormallyHide()) {
        show_chk.checked = true;
      }
      name_td.textContent = setting.getLabel();
      tr.appendChild(show_td);
      tr.appendChild(name_td);
    }
  }

  dialog.showModal();
};


/**
 * @return {HTMLDialogElement}
 * @private
 */
ydn.crm.sugarcrm.ui.record.Record.prototype.getFieldDisplayDialog_ = function() {
  var dialog = document.querySelector('#field-display-dialog') || ydn.ui.getTemplateById('field-display-dialog');
  return /** @type {HTMLDialogElement} */ (dialog);
};


/**
 * @param {Event} e
 * @private
 */
ydn.crm.sugarcrm.ui.record.Record.prototype.onFieldDisplayDialogClose_ = function(e) {
  var dialog = /** @type {HTMLDialogElement} */ (e.target);
  if (dialog.returnValue == 'apply') {
    var group_body = dialog.querySelector('.group-body');
    var group_display_setting = this.collectDisplaySetting_(group_body);
    this.setFieldDisplaySetting(true, group_display_setting);
    var field_body = dialog.querySelector('.field-body');
    var field_display_setting = this.collectDisplaySetting_(field_body);
    this.setFieldDisplaySetting(false, field_display_setting);

    var is_edit = this.getEditMode();
    this.body_panel.reset(is_edit);
    this.body_panel.refresh();

  }
};


/**
 * Collect normally hide display setting from DOM.
 * @param {Element} tbody
 * @return {Object.<boolean>}
 * @private
 */
ydn.crm.sugarcrm.ui.record.Record.prototype.collectDisplaySetting_ = function(tbody) {
  var settings = {};
  var n = tbody.childElementCount;
  for (var i = 0; i < n; i++) {
    var tr = tbody.children[i];
    var td1 = tr.children[0];
    var chk = td1.children[0];
    settings[tr.getAttribute('name')] = !chk.checked;
  }
  return settings;
};


/**
 * Set field display setting.
 * @param {boolean} is_group
 * @param {Object.<boolean>} settings
 */
ydn.crm.sugarcrm.ui.record.Record.prototype.setFieldDisplaySetting = function(is_group, settings) {
  var record = this.getModel();
  var module_info = record.getModuleInfo();
  var us = ydn.crm.ui.UserSetting.getInstance();

  for (var name in settings) {
    var field = module_info.module_fields[name];
    var setting;
    if (is_group) {
      setting = new ydn.crm.sugarcrm.ui.setting.Group(record.getModuleName(), name);
    } else {
      setting = new ydn.crm.sugarcrm.ui.setting.Field(record.getModuleName(), field);
    }
    setting.setNormallyHide(settings[name]);
  }
};


/**
 * Show record detail dialog to see the fields.
 * @protected
 */
ydn.crm.sugarcrm.ui.record.Record.prototype.showDetailDialog = function() {
  var record = this.getModel();
  var data = record.cloneData();
  var dialog = /** @type {HTMLDialogElement} */ (ydn.ui.getTemplateById('record-detail-dialog'));
  var cancel_btn = dialog.querySelector('button.ok');
  cancel_btn.onclick = function() {
    dialog.close('close');
  };
  var content = dialog.querySelector('.content');
  content.innerHTML = '';
  var pre = document.createElement('pre');
  if (data) {
    for (var name in data) {
      if (goog.string.startsWith(name, 'ydn$')) {
        delete data[name];
      }
    }
    pre.textContent = JSON.stringify(data, null, 2);
  }
  content.appendChild(pre);
  dialog.showModal();
};


/**
 * @protected
 * @param {ydn.crm.sugarcrm.ui.events.ChangedEvent} e
 */
ydn.crm.sugarcrm.ui.record.Record.prototype.handleInputChanged = function(e) {
  if (this.getEditMode()) {
    // patch is not applied, but marked as modal data is dirty.
    // event dispatcher may need to store the patches.
    // @see ydn.crm.sugarcrm.ui.group.Address#doEditorApplyDefault
    this.setDirty(true);
  } else if (this.getModel().isNew()) {
    // for new record creation, should be in input mode.
    this.setDirty(true);
  } else {
    // patch is applied, so default is prevented.
    e.preventDefault();
    this.patch(e.patches);
  }
};


/**
 * Set record is dirty.
 * @param {boolean} val
 */
ydn.crm.sugarcrm.ui.record.Record.prototype.setDirty = function(val) {
  var btn = this.getHeaderElement().querySelector('.' + ydn.crm.ui.CSS_CLASS_OK_BUTTON);
  goog.style.setElementShown(btn, !!val);
};


/**
 * Get record is dirty.
 * @return {boolean} dirty state.
 */
ydn.crm.sugarcrm.ui.record.Record.prototype.getDirty = function() {
  var btn = this.getHeaderElement().querySelector('.' + ydn.crm.ui.CSS_CLASS_OK_BUTTON);
  return goog.style.isElementShown(btn);
};


/**
 * Patch record and update to server.
 * @param {Object} patches Field name-value pairs to patch the record data.
 * @return {!goog.async.Deferred.<SugarCrm.Record>} Resolved with record object
 * as return from the server.
 */
ydn.crm.sugarcrm.ui.record.Record.prototype.patch = function(patches) {
  /**
   * @type {ydn.crm.sugarcrm.model.Record}
   */
  var model = this.getModel();
  var is_new = model.isNew();
  var status = is_new ? 'Creating ...' : 'Updating...';
  var mid = ydn.crm.msg.Manager.addStatus(status);
  if (ydn.crm.sugarcrm.ui.record.Record.DEBUG) {
    window.console.log(patches);
  }
  return model.patch(patches).addCallbacks(function(x) {
    this.setDirty(false);
    var status = is_new ? ' created.' : 'updated.';
    ydn.crm.msg.Manager.setStatus(mid, model.getModuleName(), status);
    var href = /** @type {string} */ (model.getViewLink());
    ydn.crm.msg.Manager.setLink(mid, href, model.getLabel(), 'View in SugarCRM');
  }, function(e) {
    ydn.crm.msg.Manager.updateStatus(mid, e.message, ydn.crm.msg.MessageType.ERROR);
  }, this);
};


/**
 * @protected
 * @param {ydn.crm.sugarcrm.ui.events.SettingChangeEvent} e
 */
ydn.crm.sugarcrm.ui.record.Record.prototype.handleSettingChange = function(e) {
  this.body_panel.handleSettingChange(e);
};


/**
 * Change edit mode status.
 * @param {boolean} val <code>true</code> to edit mode, <code>false</code> to view mode.
 */
ydn.crm.sugarcrm.ui.record.Record.prototype.setEditMode = function(val) {
  var root = this.getElement();
  if (val) {
    root.classList.add(ydn.crm.ui.CSS_CLASS_EDIT);
  } else {
    root.classList.remove(ydn.crm.ui.CSS_CLASS_EDIT);
  }

  this.body_panel.setEditMode(val);
};


/**
 * @return {boolean}
 */
ydn.crm.sugarcrm.ui.record.Record.prototype.getEditMode = function() {
  return this.getElement().classList.contains(ydn.crm.ui.CSS_CLASS_EDIT);
};


/**
 * @protected
 * @param {Event} e
 */
ydn.crm.sugarcrm.ui.record.Record.prototype.handleContentClick = function(e) {
  this.setActive(true);
};


/**
 * Set a message.
 * @param {string} s
 * @param {boolean=} opt_is_error
 * @return {number}
 */
ydn.crm.sugarcrm.ui.record.Record.prototype.setMessage = function(s, opt_is_error) {
  var type = opt_is_error ? ydn.crm.msg.MessageType.ERROR : ydn.crm.msg.MessageType.NORMAL;
  return ydn.crm.msg.Manager.addStatus(s, '', type);
};


/**
 * Get user updated record value, if edited.
 * @return {?SugarCrm.Record} null if record value is not updated.
 */
ydn.crm.sugarcrm.ui.record.Record.prototype.getUpdatedValue = function() {
  if (!this.body_panel.hasChanged()) {
    return null;
  }
  var delta = this.body_panel.getPatch();
  if (delta) {
    var old_value = this.getModel().getRecordValue();
    if (old_value) {
      for (var name in delta) {
        old_value[name] = delta[name];
      }
      return old_value;
    } else {
      return delta;
    }
  }
  return null;
};


/**
 * @param {ydn.crm.sugarcrm.ModuleName} module_name
 * @protected
 */
ydn.crm.sugarcrm.ui.record.Record.prototype.addNewItem = function(module_name) {

  /**
   * @type {ydn.crm.sugarcrm.model.Record}
   */
  var this_record = this.getModel();
  var sugar = this_record.getSugar();
  var r = new ydn.crm.sugarcrm.Record(sugar.getDomain(), module_name);
  var model = new ydn.crm.sugarcrm.model.Record(sugar, r);
  var new_panel = new ydn.crm.sugarcrm.ui.record.Record(model, this.getDomHelper(), this);
  this.secondary_panel.addChild(new_panel, true);
};


/**
 * @protected
 * @param {*} e
 */
ydn.crm.sugarcrm.ui.record.Record.prototype.handleModuleChanged = function(e) {
  if (ydn.crm.sugarcrm.ui.record.Record.DEBUG) {
    window.console.log('handleModuleChanged');
  }
  this.removeChild(this.body_panel, true);
  this.body_panel.dispose();
  this.body_panel = this.createBodyPanel();
  this.addChildAt(this.body_panel, 0, true);
  this.reset();
};


/**
 * @protected
 * @param {*} e
 */
ydn.crm.sugarcrm.ui.record.Record.prototype.handleRecordChanged = function(e) {
  if (ydn.crm.sugarcrm.ui.record.Record.DEBUG) {
    window.console.log('Record:handleRecordChanged:');
  }
  this.reset();
};


/**
 * @protected
 * @param {*} e
 */
ydn.crm.sugarcrm.ui.record.Record.prototype.handleRecordUpdated = function(e) {
  if (ydn.crm.sugarcrm.ui.record.Record.DEBUG) {
    window.console.log(e.type, e);
  }
  this.refresh();
};


/**
 * Do post-processing progressive enhancement after record is reset.
 */
ydn.crm.sugarcrm.ui.record.Record.prototype.postReset = function() {
  if (this.hasExportMenuItem()) {
    var record = this.getModel();
    record.findPairedGData().addCallback(function(gdata) {
      if (gdata) {
        var ele_header = this.getHeaderElement();
        var g_contact = ele_header.querySelector('a.google');
        goog.style.setElementShown(g_contact, true);
        var contact = new ydn.gdata.m8.ContactEntry(gdata);
        g_contact.href = contact.getGmailViewLink(ydn.gmail.Utils.getGoogleAcui());
        this.head_menu.setEnableMenuItem(ydn.crm.sugarcrm.ui.record.Record.MenuName.EXPORT_TO_GMAIL, false);
      } else {
        this.head_menu.setEnableMenuItem(ydn.crm.sugarcrm.ui.record.Record.MenuName.EXPORT_TO_GMAIL, true);
      }
    }, this);
  }
};


/**
 * Reset UI when record ID or user setting changed.
 * @protected
 */
ydn.crm.sugarcrm.ui.record.Record.prototype.reset = function() {
  var model = this.getModel();
  if (ydn.crm.sugarcrm.ui.record.Record.DEBUG) {
    window.console.log('reset ' + model);
  }
  var root = this.getElement();
  this.resetHeader();
  this.refreshHeader();
  this.footer_panel.reset(this);
  this.body_panel.reset(this.getEditMode());
  this.body_panel.refresh();
  if (model.isNew()) {
    root.className = this.getCssClass() + ' ' + model.getModuleName() + ' ' +
        ydn.crm.ui.CSS_CLASS_EMPTY;
  } else {
    root.className = this.getCssClass() + ' ' + model.getModuleName();
  }
  this.validateSecondaryPanel_();
  this.postReset();
};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.ui.record.Record.prototype.exitDocument = function() {
  goog.base(this, 'exitDocument');
};


/**
 * Refresh UI when record is updated.
 * @protected
 */
ydn.crm.sugarcrm.ui.record.Record.prototype.refresh = function() {
  var model = this.getModel();
  if (ydn.crm.sugarcrm.ui.record.Record.DEBUG) {
    window.console.log('Record:refresh:' + model + ' isNew:' + model.isNew());
  }
  if (model.isNew()) {
    this.getElement().classList.add(ydn.crm.ui.CSS_CLASS_EMPTY);
  } else {
    this.getElement().classList.remove(ydn.crm.ui.CSS_CLASS_EMPTY);
  }
  this.refreshHeader();
  this.footer_panel.reset(this);
  this.body_panel.refresh();
  if (this.secondary_panel) {
    this.secondary_panel.refresh();
  }
};


/**
 * @return {boolean}
 */
ydn.crm.sugarcrm.ui.record.Record.prototype.isActive = function() {
  return this.getElement().classList.contains(ydn.crm.ui.CSS_CLASS_ACTIVE);
};


/**
 * Set active state. An active panel expand secondary, if it is enabled.
 * @param {boolean} val
 */
ydn.crm.sugarcrm.ui.record.Record.prototype.setActive = function(val) {
  if (val == this.isActive()) {
    return;
  }
  if (val) {
    this.getElement().classList.add(ydn.crm.ui.CSS_CLASS_ACTIVE);
  } else {
    this.getElement().classList.remove(ydn.crm.ui.CSS_CLASS_ACTIVE);
  }
  this.validateSecondaryPanel_();
};


/**
 * Simulate user edit.
 * @param {Object} user_patch patch object of field name and its value, of user edited.
 * @param {boolean=} opt_dispatch_event dispatch change event.
 */
ydn.crm.sugarcrm.ui.record.Record.prototype.simulateEdit = function(user_patch,
    opt_dispatch_event) {
  if (!user_patch) {
    return;
  }
  this.body_panel.simulateEdit(user_patch);
  if (opt_dispatch_event) {
    var patch = this.body_panel.getPatch();
    var ev = new ydn.crm.sugarcrm.ui.events.ChangedEvent(patch, this);
    this.dispatchEvent(ev);
  }
};


if (goog.DEBUG) {
  /**
   * @inheritDoc
   */
  ydn.crm.sugarcrm.ui.record.Record.prototype.toString = function() {
    return 'ydn.crm.sugarcrm.ui.record.Record:' + this.getModel();
  };
}


/**
 * Render new record creation UI for given module.
 * @param {ydn.crm.sugarcrm.ModuleName} m_name module name.
 * @param {boolean=} opt_duplicate duplicate existing record data.
 */
ydn.crm.sugarcrm.ui.record.Record.prototype.newRecord = function(m_name, opt_duplicate) {
  if (ydn.crm.sugarcrm.ui.record.Record.DEBUG) {
    window.console.log('new record prepare for ' + m_name);
  }

  var model = this.getModel();
  var patches = null;
  if (opt_duplicate) {
    patches = model.cloneData();
    delete patches.id;
    delete patches._module;
    delete patches.date_entered;
    delete patches.date_modified;
  }
  var r = new ydn.crm.sugarcrm.Record(model.getDomain(), m_name);
  // var r = new ydn.crm.sugarcrm.Record(sugar.getDomain(), m_name, patches);
  // NOTE: we don't modify model for UI edit, but simulate user edit bellow.
  model.setRecord(r);
  if (patches) {
    this.simulateEdit(patches);
  }

  this.setEditMode(true);
};


/**
 * @param {ydn.crm.sugarcrm.ui.events.NewRecord} e
 */
ydn.crm.sugarcrm.ui.record.Record.prototype.onNewRecord = function(e) {
  this.newRecord(e.module_name);
};


/**
 * @enum {string}
 */
ydn.crm.sugarcrm.ui.record.Record.MenuName = {
  DELETE: 'delete',
  DETAILS: 'record-detail',
  DUPLICATE: 'duplicate',
  EDIT: 'edit',
  EXPORT_TO_GMAIL: 'export',
  NEW: 'new',
  UNSYNC: 'unsync',
  FIELDS_OPTION: 'field-option'
};


/**
 * @return {boolean}
 * @protected
 */
ydn.crm.sugarcrm.ui.record.Record.prototype.getRecordEditable = function() {
  return true;
};


/**
 * @return {Array.<ydn.crm.sugarcrm.ModuleName>} list of module names, that
 * can be created from the panel.
 * @protected
 */
ydn.crm.sugarcrm.ui.record.Record.prototype.getNewModuleList = function() {
  return [];
};


/**
 * @return {Array.<ydn.crm.sugarcrm.ModuleName>} list of module names that can
 * be duplicated from the current record.
 * @protected
 */
ydn.crm.sugarcrm.ui.record.Record.prototype.getDuplicateModuleList = function() {
  return [];
};


/**
 * @return {boolean} return true if data could be exported to GData.
 * @protected
 */
ydn.crm.sugarcrm.ui.record.Record.prototype.hasExportMenuItem = function() {
  var record = this.getModel();
  // we don't export Leads record, because they are not pernment contact to user.
  if (record && record.getModuleName() == ydn.crm.sugarcrm.ModuleName.CONTACTS) {
    return true;
  }
  return false;
};


/**
 * @return {Array.<?ydn.ui.FlyoutMenu.ItemOption>}
 * @protected
 */
ydn.crm.sugarcrm.ui.record.Record.prototype.getMenuItems = function() {
  var record = this.getModel();
  var m_name = record.getModuleName();
  var items = [];
  if (this.getRecordEditable()) {
    items.push({
      name: ydn.crm.sugarcrm.ui.record.Record.MenuName.EDIT,
      label: 'Edit'
    }, {
      name: ydn.crm.sugarcrm.ui.record.Record.MenuName.DELETE,
      label: 'Delete'
    }, null);
  }
  var new_list = this.getNewModuleList();
  if (new_list.length > 0) {
    var new_items = [];
    for (var i = 0; i < new_list.length; i++) {
      new_items[i] = {
        name: ydn.crm.sugarcrm.ui.record.Record.MenuName.NEW + '-' + new_list[i],
        label: new_list[i]
      };
    }
    items.push({
      name: ydn.crm.sugarcrm.ui.record.Record.MenuName.NEW,
      label: 'New',
      children: new_items
    });
  }
  var dup_list = this.getDuplicateModuleList();
  if (dup_list.length > 0) {
    var dup_items = [];
    for (var i = 0; i < dup_list.length; i++) {
      dup_items[i] = {
        name: ydn.crm.sugarcrm.ui.record.Record.MenuName.DUPLICATE + '-' + dup_list[i],
        label: dup_list[i]
      };
    }
    items.push({
      name: ydn.crm.sugarcrm.ui.record.Record.MenuName.DUPLICATE,
      label: 'Duplicate to',
      children: dup_items
    });
  }
  var has_export = this.hasExportMenuItem();
  if (has_export) {
    items.push({
      name: ydn.crm.sugarcrm.ui.record.Record.MenuName.EXPORT_TO_GMAIL,
      label: 'To Gmail',
      title: 'Export SugarCRM Contacts record to Gmail Contact and sync'
    });
  }
  if (has_export || new_list.length > 0 || dup_list.length > 0) {
    items.push(null);
  }

  items.push({
    name: ydn.crm.sugarcrm.ui.record.Record.MenuName.DETAILS,
    label: 'View details ...'
  }, {
    name: ydn.crm.sugarcrm.ui.record.Record.MenuName.FIELDS_OPTION,
    label: 'Fields ...'
  });

  // how to add sync and export to menu here?

  return items;
};


/**
 * Remove sync link from Gmail contact.
 * @return {!goog.async.Deferred}
 */
ydn.crm.sugarcrm.ui.record.Record.prototype.removeSync = function() {
  var sugar = this.getModel();
  if (sugar instanceof ydn.crm.sugarcrm.model.GDataSugar) {
    var gdata = sugar.getGData();
    if (!gdata) {
      return goog.async.Deferred.fail('No Gmail contact exist to remove the link.');
    }

    var gid = gdata.getSingleId();
    var mid = ydn.crm.msg.Manager.addStatus('Removing link from Gmail contact ' +
        gid);
    return sugar.unlinkGDataToRecord().addCallbacks(function() {
      ydn.crm.msg.Manager.setStatus(mid, 'Removed link from ' + gid);
    }, function(e) {
      window.console.error(e.stack || e);
      ydn.crm.msg.Manager.setStatus(mid, 'Removing link failed ' + (e.message || '.'),
          ydn.crm.msg.MessageType.ERROR);
    });
  } else {
    var msg = '';
    if (goog.DEBUG) {
      msg = 'Sync service not available in this model.';
    }
    throw new Error(msg);
  }
};


/**
 * Reset header.
 * Record type, record id may change.
 */
ydn.crm.sugarcrm.ui.record.Record.prototype.resetHeader = function() {
  var ele_header = this.getHeaderElement();
  var record = this.getModel();
  var dom = this.getDomHelper();
  var m_name = record.getModuleName();
  if (ydn.crm.sugarcrm.ui.record.Record.DEBUG) {
    window.console.log('resetHeader' + m_name + ':' + record);
  }
  var badge = ele_header.querySelector('span.' +
          ydn.crm.sugarcrm.ui.record.CSS_HEADER_ICON);
  badge.textContent = ydn.crm.sugarcrm.toModuleSymbol(m_name);
  var g_contact = ele_header.querySelector('a.google');
  goog.style.setElementShown(g_contact, false);
  g_contact.removeAttribute('href');

  this.head_menu.setItems(this.getMenuItems());

  var ok = ele_header.querySelector('.' + ydn.crm.ui.CSS_CLASS_OK_BUTTON);
  goog.style.setElementShown(ok, false);
};


/**
 * Refresh header.
 */
ydn.crm.sugarcrm.ui.record.Record.prototype.refreshHeader = function() {

  var ele_header = this.getHeaderElement();
  var record = this.getModel();
  var m_name = record.getModuleName();
  if (ydn.crm.sugarcrm.ui.record.Record.DEBUG) {
    window.console.log('refreshHeader:' + m_name + ':' + record);
  }
  var ele_title = ele_header.querySelector('a.' + ydn.crm.sugarcrm.ui.record.CSS_HEADER_TITLE);
  if (record.isNew()) {
    ele_title.innerHTML = '';
    ele_title.href = '';
    this.head_menu.setEnableMenuItem(ydn.crm.sugarcrm.ui.record.Record.MenuName.DUPLICATE, false);
  } else {
    ele_title.textContent = record.getLabel();
    ele_title.href = record.getViewLink();
    ele_title.target = record.getDomain();
    this.head_menu.setEnableMenuItem(ydn.crm.sugarcrm.ui.record.Record.MenuName.DUPLICATE, true);
  }
};


/**
 * Fill up by meta contact data.
 * @param {ydn.social.MetaContact} meta
 * @return {boolean}
 */
ydn.crm.sugarcrm.ui.record.Record.prototype.fillByMetaContact = function(meta) {
  var val = this.body_panel.fillByMetaContact(meta);
  if (val) {
    this.setDirty(true);
  }
  return val;
};


/**
 * @enum {string}
 */
ydn.crm.sugarcrm.ui.record.Record.EnableSecondary = {
  ALWAYS: 'a',
  ENABLED: 'e',
  DISABLED: 'd'
};
