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
 * @fileoverview Activity panel.
 *
 * Show recent activity, upcoming activity and system activity.
 *
 * Activity panel listen update from SugarCRM client for module updated events
 * and show in the panel.
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */


goog.provide('ydn.crm.sugarcrm.ui.activity.Panel');
goog.require('goog.date.relative');
goog.require('goog.ui.Tab');
goog.require('goog.ui.TabBar');
goog.require('ydn.crm.msg.Manager');
goog.require('ydn.crm.sugarcrm.ui.NewRecord');
goog.require('ydn.crm.sugarcrm.ui.SearchPanel');
goog.require('ydn.crm.sugarcrm.ui.activity.DetailPanel');
goog.require('ydn.crm.sugarcrm.utils');



/**
 * Contact sidebar panel.
 * @param {ydn.crm.sugarcrm.model.Sugar} model
 * @param {goog.dom.DomHelper} dom
 * @constructor
 * @struct
 * @extends {goog.ui.Component}
 * @suppress {checkStructDictInheritance} suppress closure-library code.
 */
ydn.crm.sugarcrm.ui.activity.Panel = function(model, dom) {
  goog.base(this, dom);
  this.setModel(model);

  /**
   * @protected
   * @type {goog.ui.TabBar}
   */
  this.tabbar = new goog.ui.TabBar(goog.ui.TabBar.Location.TOP, undefined, dom);
  /**
   * @protected
   * @type {ydn.crm.sugarcrm.ui.activity.DetailPanel}
   */
  this.detail_panel = new ydn.crm.sugarcrm.ui.activity.DetailPanel(model, dom);

  /**
   * @protected
   * @type {ydn.crm.sugarcrm.ui.SearchPanel}
   */
  this.search = new ydn.crm.sugarcrm.ui.SearchPanel(model, dom);

  var new_record = new ydn.crm.sugarcrm.model.Record(model,
      new ydn.crm.sugarcrm.Record(model.getDomain(), ydn.crm.sugarcrm.DEFAULT_MODULE));

  /**
   * @protected
   * @type {ydn.crm.sugarcrm.ui.NewRecord}
   */
  this.new_record = new ydn.crm.sugarcrm.ui.NewRecord(new_record, dom);
};
goog.inherits(ydn.crm.sugarcrm.ui.activity.Panel, goog.ui.Component);


/**
 * @return {ydn.crm.sugarcrm.model.Sugar}
 * @override
 */
ydn.crm.sugarcrm.ui.activity.Panel.prototype.getModel;


/**
 * @const
 * @type {string}
 */
ydn.crm.sugarcrm.ui.activity.Panel.CSS_CLASS = 'activity-panel';


/**
 * @const
 * @type {string}
 */
ydn.crm.sugarcrm.ui.activity.Panel.CSS_CLASS_TAB_LABEL = 'activity-tab-label';


/** @return {string} */
ydn.crm.sugarcrm.ui.activity.Panel.prototype.getCssClass = function() {
  return ydn.crm.sugarcrm.ui.activity.Panel.CSS_CLASS;
};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.ui.activity.Panel.prototype.getContentElement = function() {
  return this.getElement().querySelector('.' + ydn.crm.ui.CSS_CLASS_CONTENT);
};


/**
 * @const
 * @type {string}
 */
ydn.crm.sugarcrm.ui.activity.Panel.CSS_CLASS_SEARCH = 'activity-search';


/**
 * @const
 * @type {string}
 */
ydn.crm.sugarcrm.ui.activity.Panel.CSS_CLASS_FEED = 'activity-feed';


/**
 * @const
 * @type {string}
 */
ydn.crm.sugarcrm.ui.activity.Panel.CSS_CLASS_NEW = 'new';


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.ui.activity.Panel.prototype.createDom = function() {
  goog.base(this, 'createDom');
  var dom = this.dom_;
  var root = this.getElement();
  goog.dom.classlist.add(root, this.getCssClass());
  var content = dom.createDom('div', ydn.crm.ui.CSS_CLASS_CONTENT);
  root.appendChild(content);

  this.addChild(this.tabbar, true);

  var search_el = dom.createDom('div');
  var search_svg = ydn.crm.ui.createSvgIcon('magnifying-glass');
  search_el.appendChild(search_svg);
  var search_tab = new goog.ui.Tab(search_el);
  search_tab.setTooltip('Search');
  this.tabbar.addChild(search_tab, true);
  search_tab.getContentElement().classList.add(
      ydn.crm.sugarcrm.ui.activity.Panel.CSS_CLASS_SEARCH);

  var new_el = dom.createDom('div');
  var new_svg = ydn.crm.ui.createSvgIcon('plus');
  new_el.appendChild(new_svg);
  var new_tab = new goog.ui.Tab(new_el);
  new_tab.setTooltip('Create a new record');
  this.tabbar.addChild(new_tab, true);
  new_tab.getContentElement().classList.add(
      ydn.crm.sugarcrm.ui.activity.Panel.CSS_CLASS_NEW);

  var feed_el = dom.createDom('div');
  var feed_svg = ydn.crm.ui.createSvgIcon('rss');
  feed_el.appendChild(feed_svg);
  var feed_tab = new goog.ui.Tab(feed_el);
  feed_tab.setTooltip('Activity feed');
  this.tabbar.addChild(feed_tab, true);
  feed_tab.getContentElement().classList.add(
      ydn.crm.sugarcrm.ui.activity.Panel.CSS_CLASS_FEED);

  for (var i = 0; i < ydn.crm.sugarcrm.ACTIVITY_MODULES.length; i++) {
    var module_name = ydn.crm.sugarcrm.ACTIVITY_MODULES[i];
    // var caption = module_name.substr(0, 2);
    var icon_name = module_name;
    var svg = ydn.crm.ui.createSvgIcon(icon_name);
    var ele = dom.createDom('div', ydn.crm.sugarcrm.ui.activity.Panel.CSS_CLASS_TAB_LABEL, svg);
    var tab = new goog.ui.Tab(ele);
    tab.setTooltip(module_name);
    this.tabbar.addChild(tab, true);
    tab.getContentElement().classList.add(module_name);
    // tab.setVisible(false);
  }

  this.addChild(this.search, true);
  this.addChild(this.new_record, true);
  this.addChild(this.detail_panel, true);
  this.tabbar.setSelectedTabIndex(0);
};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.ui.activity.Panel.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  var sugar = this.getModel();
  // Listen events
  var hd = this.getHandler();
  hd.listen(sugar, ydn.crm.sugarcrm.model.Sugar.Event.LOGIN, this.updaterLater_);
  hd.listen(this.tabbar, goog.ui.Component.EventType.SELECT, this.handleTabSelect_);
  hd.listen(this.tabbar, goog.ui.Component.EventType.UNSELECT, this.handleTabUnSelect_);
  hd.listen(this.detail_panel, ydn.crm.sugarcrm.events.EventType.VIEW_RECORD, this.onViewRecord_);
  hd.listen(this.detail_panel, ydn.crm.sugarcrm.events.EventType.NEW_RECORD, this.onNewRecord_);
  goog.style.setElementShown(this.getElement(), false);
  goog.style.setElementShown(this.new_record.getElement(), false);
  goog.style.setElementShown(this.detail_panel.getElement(), false);
  // if already login, update at the beginning.
  if (sugar.isLogin()) {
    this.updaterLater_();
  }
};


/**
 * @param {goog.events.Event} e
 * @private
 */
ydn.crm.sugarcrm.ui.activity.Panel.prototype.handleTabUnSelect_ = function(e) {
  this.detail_panel.clear();
};


/**
 * @enum {number} tab index.
 */
ydn.crm.sugarcrm.ui.activity.Panel.TabIndex = {
  SEARCH: 0,
  NEW: 1,
  FEED: 2,
  MEETINGS: 3,
  CALLS: 4,
  TASKS: 5,
  OPPORTUNITIES: 6
};


/**
 * @param {goog.events.Event} e
 * @private
 */
ydn.crm.sugarcrm.ui.activity.Panel.prototype.handleTabSelect_ = function(e) {
  var idx = this.tabbar.getSelectedTabIndex();
  if (idx == ydn.crm.sugarcrm.ui.activity.Panel.TabIndex.SEARCH) {
    goog.style.setElementShown(this.search.getElement(), true);
    goog.style.setElementShown(this.new_record.getElement(), false);
    goog.style.setElementShown(this.detail_panel.getElement(), false);
  } else if (idx == ydn.crm.sugarcrm.ui.activity.Panel.TabIndex.NEW) {
    goog.style.setElementShown(this.search.getElement(), false);
    goog.style.setElementShown(this.new_record.getElement(), true);
    goog.style.setElementShown(this.detail_panel.getElement(), false);
  } else {
    goog.style.setElementShown(this.search.getElement(), false);
    goog.style.setElementShown(this.new_record.getElement(), false);
    goog.style.setElementShown(this.detail_panel.getElement(), true);
    if (idx == ydn.crm.sugarcrm.ui.activity.Panel.TabIndex.FEED) {
      this.detail_panel.renderActivity();
    } else {
      var m_name = ydn.crm.sugarcrm.ACTIVITY_MODULES[idx - 3];
      this.detail_panel.renderUpcoming(m_name).addCallback(function(cnt) {
        this.setCount(m_name, cnt);
      }, this);
    }
  }
};


/**
 * @param {ydn.crm.sugarcrm.events.RecordViewEvent} ev
 * @private
 */
ydn.crm.sugarcrm.ui.activity.Panel.prototype.onViewRecord_ = function(ev) {
  this.showRecord(ev.module, ev.id);
};


/**
 * @param {ydn.crm.sugarcrm.events.NewRecordEvent} ev
 * @private
 */
ydn.crm.sugarcrm.ui.activity.Panel.prototype.onNewRecord_ = function(ev) {
  this.showNewRecord(ev.module);
};


/**
 * @param {ydn.crm.sugarcrm.ModuleName} m_name
 * @param {SugarCrm.Record} obj
 * @private
 */
ydn.crm.sugarcrm.ui.activity.Panel.prototype.showRecord_ = function(m_name, obj) {
  var sugar = this.getModel();
  var r = new ydn.crm.sugarcrm.Record(sugar.getDomain(), m_name, obj);
  var record = /** @type {ydn.crm.sugarcrm.model.Record} */ (
      this.new_record.getModel());
  record.setRecord(r);
};


/**
 * Show record.
 * @param {ydn.crm.sugarcrm.ModuleName} m_name
 * @param {string} id
 */
ydn.crm.sugarcrm.ui.activity.Panel.prototype.showRecord = function(m_name, id) {
  this.tabbar.setSelectedTabIndex(
      ydn.crm.sugarcrm.ui.activity.Panel.TabIndex.NEW);
  var ch = this.getModel().getChannel();
  var query = {
    'module': m_name,
    'id': id
  };
  ch.send(ydn.crm.Ch.SReq.GET, query).addCallbacks(function(obj) {
    if (obj) {
      this.showRecord_(m_name, obj);
    }
  }, function(e) {
    var msg = '' + e;
    var mid = ydn.crm.msg.Manager.addStatus('Fail to load a ' + m_name, msg);
    var sugar = /** @type {ydn.crm.sugarcrm.model.Sugar} */ (this.getModel());
    var href = sugar.getRecordViewLink(m_name, id);
    ydn.crm.msg.Manager.setLink(mid, href, id);
  }, this);
};


/**
 * Show a new record creation on New Record panel.
 * @param {ydn.crm.sugarcrm.ModuleName} m_name
 */
ydn.crm.sugarcrm.ui.activity.Panel.prototype.showNewRecord = function(m_name) {
  this.tabbar.setSelectedTabIndex(
      ydn.crm.sugarcrm.ui.activity.Panel.TabIndex.NEW);
  this.new_record.newRecord(m_name);
};


/**
 * Call updateActivity_ after a while.
 * @private
 */
ydn.crm.sugarcrm.ui.activity.Panel.prototype.updaterLater_ = function() {
  var me = this;
  setTimeout(function() {
    me.updateActivity_();
  }, 2000);
  setTimeout(function() {
    me.updateUpcomingActivity_(true);
  }, 3000);
};


/**
 * Update activity display.
 * 0 and continue to next after a time out. If over all activity modules, this stop.
 * @private
 */
ydn.crm.sugarcrm.ui.activity.Panel.prototype.updateActivity_ = function() {

  this.getModel().send(ydn.crm.Ch.SReq.ACTIVITY_STREAM).addCallbacks(function(ans) {
    if (ans.length > 0) {
      // Note: result are sorted by date_modified in descending ordering.
      var since = ydn.crm.sugarcrm.utils.parseDate(ans[ans.length - 1]['date_modified']);
      goog.style.setElementShown(this.getElement(), true);
      this.setActivityCount(ans.length, since);
    }
  }, function(e) {
    throw e;
  }, this);
};


/**
 * Update upcoming activity display.
 * @param {boolean=} opt_continue whether continue next.
 * @param {number=} opt_idx current activity to update. If not given, start with
 * 0 and continue to next after a time out. If over all activity modules, this stop.
 * @private
 */
ydn.crm.sugarcrm.ui.activity.Panel.prototype.updateUpcomingActivity_ = function(
    opt_continue, opt_idx) {
  var index = opt_idx || 0;
  var m_name = ydn.crm.sugarcrm.ACTIVITY_MODULES[index];
  if (!m_name) {
    return;
  }
  var query = this.detail_panel.genUpcomingQuery(m_name, ydn.time.getWeekend());
  this.getModel().send(ydn.crm.Ch.SReq.KEYS, query).addCallbacks(function(ans) {
    var query_result = /** @type {Array.<string>} */ (ans);
    var next = index + 1;
    if (opt_continue) {
      // let next update do first before updating UI
      // so that event if renderer fail, updating continue.
      this.updateUpcomingActivity_(true, next);
    }
    goog.style.setElementShown(this.getElement(), true);
    this.setCount(m_name, query_result.length);
  }, function(e) {
    throw e;
  }, this);
};


/**
 * @param {number} cnt
 * @param {Date} since
 */
ydn.crm.sugarcrm.ui.activity.Panel.prototype.setActivityCount = function(cnt, since) {
  var tab = /** @type {goog.ui.Tab} */ (this.tabbar.getChildAt(2));
  var ele = tab.getContentElement().firstElementChild;
  if (cnt > 0) {
    var t = goog.date.relative.format(since.getTime()) || since.toLocaleDateString();
    tab.setTooltip(cnt + ' records updated since ' + t);
  } else {
    tab.setTooltip('');
  }
};


/**
 * @param {ydn.crm.sugarcrm.ModuleName} name
 * @param {number} cnt
 */
ydn.crm.sugarcrm.ui.activity.Panel.prototype.setCount = function(name, cnt) {
  var idx = ydn.crm.sugarcrm.ACTIVITY_MODULES.indexOf(name);
  var tab = /** @type {goog.ui.Tab} */ (this.tabbar.getChildAt(idx + 3));
  var ele = tab.getContentElement().querySelector('.' +
      ydn.crm.sugarcrm.ui.activity.Panel.CSS_CLASS_TAB_LABEL);
  var tooltip = cnt ? cnt + ' ' : 'No ';
  if (name == ydn.crm.sugarcrm.ModuleName.CASES) {
    tooltip += 'Cases assigned to you.';
  } else {
    tooltip += 'upcoming ' + name + ' in this week.';
  }
  tab.setTooltip(tooltip);

  var root = tab.getElement();
  var el = root.querySelector('.count');
  if (cnt > 0) {
    if (!el) {
      el = document.createElement('span');
      el.classList.add('count');
      root.appendChild(el);
    }
    if (cnt > 9) {
      el.textContent = '*';
    } else {
      el.textContent = cnt;
    }
  } else {
    if (el) {
      root.removeChild(el);
    }
  }

};
