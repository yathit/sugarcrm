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
 * @fileoverview Activity detail panel for upcoming activities for
 * Meetings, Calls, Tasks, Opportunities and activity feed.
 *
 * The first four module specific activities are rendered by #renderUpcoming.
 * The activity feed is rendered by #renderActivity.
 *
 * Note: Events are handled by the parent activity panel.
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */


goog.provide('ydn.crm.sugarcrm.ui.activity.DetailPanel');
goog.require('goog.ui.Component');
goog.require('ydn.crm.sugarcrm.events');



/**
 * Activity detail panel for upcoming activities.
 * @param {ydn.crm.sugarcrm.model.Sugar} model
 * @param {goog.dom.DomHelper} dom
 * @constructor
 * @struct
 * @extends {goog.ui.Component}
 * @suppress {checkStructDictInheritance} suppress closure-library code.
 */
ydn.crm.sugarcrm.ui.activity.DetailPanel = function(model, dom) {
  goog.base(this, dom);
  this.setModel(model);
};
goog.inherits(ydn.crm.sugarcrm.ui.activity.DetailPanel, goog.ui.Component);


/**
 * @define {boolean} debug flag.
 */
ydn.crm.sugarcrm.ui.activity.DetailPanel.DEBUG = false;


/**
 * @return {ydn.crm.sugarcrm.model.Sugar}
 * @override
 */
ydn.crm.sugarcrm.ui.activity.DetailPanel.prototype.getModel;


/**
 * @const
 * @type {string}
 */
ydn.crm.sugarcrm.ui.activity.DetailPanel.CSS_CLASS_ITEM = 'detail-item';


/**
 * @const
 * @type {string}
 */
ydn.crm.sugarcrm.ui.activity.DetailPanel.CSS_CLASS_CLOSE = 'close';


/**
 * @const
 * @type {string}
 */
ydn.crm.sugarcrm.ui.activity.DetailPanel.CSS_CLASS_HEADER = 'header';


/**
 * @const
 * @type {string}
 */
ydn.crm.sugarcrm.ui.activity.DetailPanel.CSS_CLASS_CONTENT = 'content';


/**
 * @const
 * @type {string}
 */
ydn.crm.sugarcrm.ui.activity.DetailPanel.CSS_CLASS = 'detail-panel';


/** @return {string} */
ydn.crm.sugarcrm.ui.activity.DetailPanel.prototype.getCssClass = function() {
  return ydn.crm.sugarcrm.ui.activity.DetailPanel.CSS_CLASS;
};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.ui.activity.DetailPanel.prototype.createDom = function() {
  goog.base(this, 'createDom');
  var dom = this.dom_;
  var root = this.getElement();
  root.classList.add(this.getCssClass());
  root.appendChild(dom.createDom('div', ydn.crm.sugarcrm.ui.activity.DetailPanel.CSS_CLASS_HEADER));
  root.appendChild(dom.createDom('div', ydn.crm.sugarcrm.ui.activity.DetailPanel.CSS_CLASS_CONTENT));
};


/**
 * @return {Element}
 */
ydn.crm.sugarcrm.ui.activity.DetailPanel.prototype.getHeadElement = function() {
  return this.getElement().querySelector('.' + ydn.crm.sugarcrm.ui.activity.DetailPanel.CSS_CLASS_HEADER);
};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.ui.activity.DetailPanel.prototype.getContentElement = function() {
  return this.getElement().querySelector('.' + ydn.crm.sugarcrm.ui.activity.DetailPanel.CSS_CLASS_CONTENT);
};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.ui.activity.DetailPanel.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  this.getHandler().listen(this.getElement(), 'click', this.handleClick_);
};


/**
 * @param {Event} e
 * @private
 */
ydn.crm.sugarcrm.ui.activity.DetailPanel.prototype.handleClick_ = function(e) {
  if (e.target.tagName == 'A' && e.target.getAttribute('data-view') == 'record') {
    var module = e.target.getAttribute('data-module');
    var id = e.target.getAttribute('data-id');
    if (ydn.crm.sugarcrm.EDITABLE_MODULES.indexOf(module) >= 0) {
      e.stopPropagation();
      e.preventDefault();
      var ev;
      if (id) {
        ev = new ydn.crm.sugarcrm.events.RecordViewEvent(module, id, this);
      } else {
        ev = new ydn.crm.sugarcrm.events.NewRecordEvent(module, this);
      }
      this.dispatchEvent(ev);
    }
  }
};


/**
 * Render item
 * @param {SugarCrm.Record} record
 * @private
 */
ydn.crm.sugarcrm.ui.activity.DetailPanel.prototype.renderItem_ = function(record) {
  var dom = this.getDomHelper();
  var sugar = this.getModel();
  var domain = sugar.getDomain();
  var m_name = /** @type {ydn.crm.sugarcrm.ModuleName} */ (record._module);
  var r = new ydn.crm.sugarcrm.Record(domain, m_name, record);
  var icon = dom.createDom('div', 'icon small', record._module.substr(0, 2));
  var msg = dom.createDom('span');
  var mod_id = r.getStringValue('modified_user_id');
  var user_id = r.getStringValue('created_by');
  if (mod_id) {
    var mod_link = dom.createDom('a', {
      'href': sugar.getRecordViewLink(ydn.crm.sugarcrm.ModuleName.USERS, mod_id),
      'target': '_blank'
    }, r.getStringValue('modified_user_name'));
    msg.appendChild(mod_link);
    msg.appendChild(dom.createTextNode(' '));
  } else if (user_id) {
    var user_link = dom.createDom('a', {
      'href': sugar.getRecordViewLink(ydn.crm.sugarcrm.ModuleName.USERS, user_id),
      'target': '_blank'
    }, r.getStringValue('created_by_name'));
    msg.appendChild(user_link);
    msg.appendChild(dom.createTextNode(' '));
  }

  var type = record.date_modified == record.date_entered ? 'created ' : 'updated ';
  msg.appendChild(dom.createTextNode(type));
  var link = dom.createDom('a', {
    'href': sugar.getRecordViewLink(r.getModule(), r.getId()),
    'data-view': 'record',
    'data-module': r.getModule(),
    'data-id': r.getId(),
    'target': '_blank'
  }, r.getLabel());
  msg.appendChild(link);

  var m_no_s = ydn.crm.sugarcrm.Record.moduleAsNoun(m_name);
  msg.appendChild(dom.createTextNode(' ' + m_no_s + ''));

  var since = ydn.crm.sugarcrm.utils.parseDate(record['date_modified']);
  var t = goog.date.relative.format(since.getTime()) || 'on ' + since.toLocaleDateString();
  msg.appendChild(dom.createTextNode(' ' + t + '.'));

  var div = dom.createDom('div', null, [icon, msg]);
  div.className = ydn.crm.sugarcrm.ui.activity.DetailPanel.CSS_CLASS_ITEM +
      ' record-header ' + record._module;
  this.getContentElement().appendChild(div);
};


/**
 *
 */
ydn.crm.sugarcrm.ui.activity.DetailPanel.prototype.clear = function() {
  var content = this.getContentElement();
  content.innerHTML = '';
  var head = this.getHeadElement();
  head.innerHTML = '';
};


/**
 * Generate upcoming query.
 * @param {ydn.crm.sugarcrm.ModuleName} m_name one of ydn.crm.sugarcrm.ACTIVITY_MODULES.
 * @return {CrmApp.ReqQuery} query
 */
ydn.crm.sugarcrm.ui.activity.DetailPanel.prototype.genUpcomingQuery = function(m_name) {
  var assigned_user_id = this.getModel().getUser().getId();
  var start_date = ydn.crm.sugarcrm.utils.toDateString(new Date());
  var kr = ydn.db.KeyRange.bound([assigned_user_id, start_date], [assigned_user_id, '\uffff']);

  var query = {
    'store': m_name,
    'index': ydn.crm.sugarcrm.Record.getIndexForDeadline(m_name),
    'keyRange': kr.toJSON()
  };
  return /** @type {CrmApp.ReqQuery} */ (/** @type {Object} */ (query));
};


/**
 * Render recent activity.
 */
ydn.crm.sugarcrm.ui.activity.DetailPanel.prototype.renderActivity = function() {
  var root = this.getElement();
  if (ydn.crm.sugarcrm.ui.activity.DetailPanel.DEBUG) {
    window.console.info('renderActivity');
  }
  this.getModel().send(ydn.crm.Ch.SReq.ACTIVITY_STREAM).addCallbacks(function(ans) {
    // window.console.log(ans);
    var dom = this.getDomHelper();
    var title = dom.createDom('span');
    if (ydn.crm.sugarcrm.ui.activity.DetailPanel.DEBUG) {
      window.console.log('receiving renderUpcoming ' + ans.length + ' items', ans);
    }
    if (ans.length > 0) {
      var since = ydn.crm.sugarcrm.utils.parseDate(ans[ans.length - 1]['date_modified']);
      var t = goog.date.relative.format(since.getTime()) || since.toLocaleDateString();
      title.textContent = ans.length + ' records updated since ' + t;
    } else {
      title.appendChild(dom.createTextNode('No activity? Have you '));
      var link = dom.createDom('a', {'href': chrome.extension.getURL('setup.html')}, 'setup');
      title.appendChild(link);
      title.appendChild(dom.createTextNode('?'));
    }
    this.renderHeader_(title);
    for (var i = 0; i < ans.length; i++) {
      this.renderItem_(ans[i]);
    }
  }, function(e) {
    throw e;
  }, this);
};


/**
 * Render upcoming activity item.
 * @param {SugarCrm.Record} obj
 * @param {ydn.crm.sugarcrm.ModuleName} m_name
 * @private
 */
ydn.crm.sugarcrm.ui.activity.DetailPanel.prototype.renderUpcomingItem_ = function(obj, m_name) {
  var dom = this.getDomHelper();
  var sugar = this.getModel();
  var domain = sugar.getDomain();
  var r = new ydn.crm.sugarcrm.Record(domain, m_name, obj);
  var msg = dom.createDom('span');
  var verb = ydn.crm.sugarcrm.Record.moduleAsVerb(m_name);
  verb = verb.charAt(0).toUpperCase() + verb.substr(1) + ' ';
  msg.appendChild(dom.createTextNode(verb));
  var link = dom.createDom('a', {
    'href': sugar.getRecordViewLink(r.getModule(), r.getId()),
    'target': domain
  }, r.getLabel());
  msg.appendChild(link);
  var deadline = r.getDeadline();
  var time_msg = goog.date.relative.format(deadline.getTime()) || 'on ' + deadline.toLocaleDateString();
  msg.appendChild(dom.createTextNode(' ' + time_msg + '.'));
  var div = dom.createDom('div', null, [msg]);
  div.className = ydn.crm.sugarcrm.ui.activity.DetailPanel.CSS_CLASS_ITEM +
      ' record-header ' + obj._module;
  this.getContentElement().appendChild(div);
};


/**
 * Render header using given element as title.
 * @param {Element} el
 * @private
 */
ydn.crm.sugarcrm.ui.activity.DetailPanel.prototype.renderHeader_ = function(el) {
  var head = this.getHeadElement();
  head.innerHTML = '';
  head.appendChild(el);
};


/**
 * Render upcoming activity.
 * @param {ydn.crm.sugarcrm.ModuleName} m_name one of ydn.crm.sugarcrm.ACTIVITY_MODULES.
 * @return {!goog.async.Deferred<number>} number of upcoming items.
 */
ydn.crm.sugarcrm.ui.activity.DetailPanel.prototype.renderUpcoming = function(m_name) {
  var q = this.genUpcomingQuery(m_name);
  if (ydn.crm.sugarcrm.ui.activity.DetailPanel.DEBUG) {
    window.console.log('renderUpcoming for ' + m_name, q);
  }
  return this.getModel().send(ydn.crm.Ch.SReq.VALUES, q).addCallbacks(function(arr) {
    var results = /** @type {Array.<SugarCrm.Record>} */ (arr);
    if (ydn.crm.sugarcrm.ui.activity.DetailPanel.DEBUG) {
      window.console.log('receiving renderUpcoming ' + results.length + ' items', arr);
    }
    var dom = this.getDomHelper();
    var msg = dom.createDom('span');
    msg.textContent = results.length + ' upcoming ' + m_name + '. ';
    var a = dom.createDom('a', {
      'href': '#' + m_name,
      'data-module': m_name,
      'data-view': 'record'
    }, 'New');
    var head = dom.createDom('span', null, [msg, a]);
    this.renderHeader_(head);
    for (var i = 0; i < results.length; i++) {
      this.renderUpcomingItem_(results[i], m_name);
    }
    return results.length;
  }, function(e) {
    throw e;
  }, this);
};


