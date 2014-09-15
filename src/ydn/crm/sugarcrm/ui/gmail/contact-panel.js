// Copyright 2014 YDN Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


/**
 * @fileoverview Gmail Contact Panel.
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */


goog.provide('ydn.crm.ui.gmail.ContactPanel');
goog.require('goog.ui.Component');



/**
 * Contact sidebar panel.
 * @param {ydn.crm.sugarcrm.model.GDataSugar} model
 * @param {goog.dom.DomHelper=} opt_dom
 * @constructor
 * @struct
 * @extends {goog.ui.Component}
 * @suppress {checkStructDictInheritance} suppress closure-library code.
 */
ydn.crm.ui.gmail.ContactPanel = function(model, opt_dom) {
  goog.base(this, opt_dom);
  this.setModel(model);
  /**
   * @final
   * @type {ydn.ui.FlyoutMenu}
   * @private
   */
  this.menu_ = new ydn.ui.FlyoutMenu({className: 'menu'}, this.getMenuItems_());
};
goog.inherits(ydn.crm.ui.gmail.ContactPanel, goog.ui.Component);


/**
 * @define {boolean} debug flag.
 */
ydn.crm.ui.gmail.ContactPanel.DEBUG = false;


/**
 * @protected
 * @type {goog.debug.Logger}
 */
ydn.crm.ui.gmail.ContactPanel.prototype.logger =
    goog.log.getLogger('ydn.crm.ui.gmail.ContactPanel');


/**
 * @const
 * @type {string}
 */
ydn.crm.ui.gmail.ContactPanel.CSS_CLASS = 'gmail-contact-panel';


/**
 * @return {ydn.crm.sugarcrm.model.GDataSugar}
 * @override
 */
ydn.crm.ui.gmail.ContactPanel.prototype.getModel;


/**
 * @inheritDoc
 */
ydn.crm.ui.gmail.ContactPanel.prototype.createDom = function() {
  goog.base(this, 'createDom');
  var root = this.getElement();
  root.classList.add(ydn.crm.ui.gmail.ContactPanel.CSS_CLASS);
  var dom = this.getDomHelper();

  var google = ydn.crm.ui.createSvgIcon('google', 'icons-small');
  var badge = dom.createDom('div', ydn.crm.ui.CSS_CLASS_BADGE, google);
  badge.setAttribute('title', 'Gmail contact');

  var title = dom.createDom('a', ydn.crm.ui.CSS_CLASS_TITLE + ' center');
  title.setAttribute('title', 'Open in Gmail contact');
  title.setAttribute('target', 'gmail');

  var head = dom.createDom('div', ydn.crm.ui.CSS_CLASS_HEAD + ' ' +
          ydn.crm.ui.CSS_CLASS_FLEX_BAR,
      [badge, title]);
  this.menu_.render(head);

  root.appendChild(head);
};


/**
 * @return {Array.<?ydn.ui.FlyoutMenu.ItemOption>}
 * @private
 */
ydn.crm.ui.gmail.ContactPanel.prototype.getMenuItems_ = function() {

  var sub_menu = [];
  for (var i = 0; i < ydn.crm.sugarcrm.PEOPLE_MODULES.length; i++) {
    var m_name = ydn.crm.sugarcrm.PEOPLE_MODULES[i];
    sub_menu[i] = {
      label: m_name,
      name: m_name
    };
  }
  return [
    {
      name: 'add',
      label: 'Add to',
      children: sub_menu
    },
    null,
    {
      label: 'Sync',
      name: 'sync'
    }
  ];
};


/**
 * @inheritDoc
 */
ydn.crm.ui.gmail.ContactPanel.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  this.getHandler().listen(this.getModel(),
      [ydn.crm.sugarcrm.model.events.Type.CONTEXT_CHANGE],
      this.handleOnGDataChanged);
  var el_more = this.getElement().getElementsByClassName(
      ydn.crm.ui.CSS_CLASS_MORE_MENU)[0];
  this.getHandler().listen(el_more, 'click', this.onMoreMenuClick);
};


/**
 * @protected
 * @param {ydn.crm.sugarcrm.model.events.ContextChangeEvent} e
 */
ydn.crm.ui.gmail.ContactPanel.prototype.handleOnGDataChanged = function(e) {
  this.refresh();
};


/**
 * @protected
 */
ydn.crm.ui.gmail.ContactPanel.prototype.refresh = function() {
  var sugar = this.getModel();
  var gdata = sugar.getGData();
  if (gdata) {
    var head = this.getElement().querySelector('.' + ydn.crm.ui.CSS_CLASS_HEAD);
    var title = head.querySelector('.' + ydn.crm.ui.CSS_CLASS_TITLE);
    title.textContent = gdata.getFullName();
    title.href = '#contact/' + gdata.getSingleId();
    goog.style.setElementShown(this.getElement(), true);

    var has_record = !!sugar.getRecord();

    // disable add to menus
    this.menu_.setEnableMenuItem('add', !has_record);

    if (has_record) {
      this.menu_.setEnableMenuItem('sync', true);
      if (sugar.isInSynced()) {
        this.menu_.setMenuItemLabel('sync', 'Remove sync');
      } else {
        this.menu_.setMenuItemLabel('sync', 'Sync');
      }
    } else {
      this.menu_.setEnableMenuItem('sync', false);
      this.menu_.setMenuItemLabel('sync', 'Sync');
    }

  } else {
    goog.style.setElementShown(this.getElement(), false);
  }
};


/**
 * Toggle sync.
 */
ydn.crm.ui.gmail.ContactPanel.prototype.toggleSync = function() {
  var sugar = this.getModel();
  var has_record = !!sugar.getRecord();
  if (has_record) {
    if (sugar.isInSynced()) {
      this.removeSync();
    } else {
      this.syncWithRecord();
    }
  } else {
    this.removeSync();
  }
};


/**
 * @param {goog.events.BrowserEvent} e
 * @protected
 */
ydn.crm.ui.gmail.ContactPanel.prototype.onMoreMenuClick = function(e) {
  var cmd = ydn.ui.FlyoutMenu.handleClick(e);
  if (cmd) {
    if (cmd == 'sync') {
      this.toggleSync();
    } else {
      var m_name = /** @type {ydn.crm.sugarcrm.ModuleName} */ (cmd);
      this.importToRecord(m_name);
    }
  }
};


/**
 * @return {!goog.async.Deferred}
 */
ydn.crm.ui.gmail.ContactPanel.prototype.syncWithRecord = function() {
  var sugar = this.getModel();
  var mid = ydn.crm.msg.Manager.addStatus('Linking gmail contact...');
  return sugar.linkGDataToRecord().addCallbacks(function() {
    ydn.crm.msg.Manager.setStatus(mid, 'Linked ');
  }, function(e) {
    window.console.error(e.stack || e);
    ydn.crm.msg.Manager.setStatus(mid, 'Linked failed ' + (e.message || '.'),
        ydn.crm.msg.MessageType.ERROR);
  });
};


/**
 * @return {!goog.async.Deferred}
 */
ydn.crm.ui.gmail.ContactPanel.prototype.removeSync = function() {
  var sugar = this.getModel();
  var record = sugar.getRecord();
  var target_msg = ' all records.';
  if (record) {
    var m_name = record.getModule();
    var id = record.getId();
    target_msg = m_name + ' record ' + id;
  }

  var mid = ydn.crm.msg.Manager.addStatus('Removing gmail contact link to ' +
      target_msg);
  return sugar.unlinkGDataToRecord().addCallbacks(function() {
    ydn.crm.msg.Manager.setStatus(mid, 'Removed link from ' + target_msg);
  }, function(e) {
    window.console.error(e.stack || e);
    ydn.crm.msg.Manager.setStatus(mid, 'Removing link failed ' + (e.message || '.'),
        ydn.crm.msg.MessageType.ERROR);
  });
};


/**
 * @param {ydn.crm.sugarcrm.ModuleName} module_name
 * @return {!goog.async.Deferred}
 * @protected
 */
ydn.crm.ui.gmail.ContactPanel.prototype.importToRecord = function(module_name) {
  var sugar = this.getModel();
  var mid = ydn.crm.msg.Manager.addStatus('Adding... to ' + module_name);

  /**
   * @type {ydn.gdata.m8.ContactEntry}
   */
  var gdata = sugar.getGData();
  var import_req;
  if (gdata) {
    import_req = sugar.importToSugar(module_name);
    import_req = import_req.addCallback(function(record) {
      ydn.crm.msg.Manager.setStatus(mid, 'Linking GData and SugarCRM...');
      return sugar.linkGDataToRecord();
    }, this);
  } else {
    import_req = sugar.addToSugar(module_name);
  }

  return import_req.addCallbacks(function(entry) {
    ydn.crm.msg.Manager.setStatus(mid, 'Added.');
  }, function(e) {
    var msg = e instanceof Error ? e.name + ' ' + e.message :
        goog.isObject(e) ? ydn.json.toShortString(e) : e;
    ydn.crm.msg.Manager.setStatus(mid, msg, '', ydn.crm.msg.MessageType.ERROR);
    throw new Error(msg); // update error message.
  }, this);
};

