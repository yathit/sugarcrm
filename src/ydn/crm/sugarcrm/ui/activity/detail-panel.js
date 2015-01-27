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


goog.provide('ydn.crm.su.ui.activity.DetailPanel');
goog.require('goog.ui.Component');
goog.require('ydn.crm.su.events');



/**
 * Activity detail panel for upcoming activities.
 * @param {ydn.crm.su.model.Sugar} model
 * @param {goog.dom.DomHelper} dom
 * @constructor
 * @struct
 * @extends {goog.ui.Component}
 * @suppress {checkStructDictInheritance} suppress closure-library code.
 */
ydn.crm.su.ui.activity.DetailPanel = function(model, dom) {
  goog.base(this, dom);
  this.setModel(model);
};
goog.inherits(ydn.crm.su.ui.activity.DetailPanel, goog.ui.Component);


/**
 * @define {boolean} debug flag.
 */
ydn.crm.su.ui.activity.DetailPanel.DEBUG = false;


/**
 * @return {ydn.crm.su.model.Sugar}
 * @override
 */
ydn.crm.su.ui.activity.DetailPanel.prototype.getModel;


/**
 * @const
 * @type {string}
 */
ydn.crm.su.ui.activity.DetailPanel.CSS_CLASS_ITEM = 'detail-item';


/**
 * @const
 * @type {string}
 */
ydn.crm.su.ui.activity.DetailPanel.CSS_CLASS_CLOSE = 'close';


/**
 * @const
 * @type {string}
 */
ydn.crm.su.ui.activity.DetailPanel.CSS_CLASS_HEADER = 'header';


/**
 * @const
 * @type {string}
 */
ydn.crm.su.ui.activity.DetailPanel.CSS_CLASS_CONTENT = 'content';


/**
 * @const
 * @type {string}
 */
ydn.crm.su.ui.activity.DetailPanel.CSS_CLASS = 'detail-panel';


/** @return {string} */
ydn.crm.su.ui.activity.DetailPanel.prototype.getCssClass = function() {
  return ydn.crm.su.ui.activity.DetailPanel.CSS_CLASS;
};


/**
 * @inheritDoc
 */
ydn.crm.su.ui.activity.DetailPanel.prototype.createDom = function() {
  goog.base(this, 'createDom');
  var dom = this.dom_;
  var root = this.getElement();
  root.classList.add(this.getCssClass());
  root.appendChild(dom.createDom('div', ydn.crm.su.ui.activity.DetailPanel.CSS_CLASS_HEADER));
  root.appendChild(dom.createDom('div', ydn.crm.su.ui.activity.DetailPanel.CSS_CLASS_CONTENT));
};


/**
 * @return {Element}
 */
ydn.crm.su.ui.activity.DetailPanel.prototype.getHeadElement = function() {
  return this.getElement().querySelector('.' + ydn.crm.su.ui.activity.DetailPanel.CSS_CLASS_HEADER);
};


/**
 * @inheritDoc
 */
ydn.crm.su.ui.activity.DetailPanel.prototype.getContentElement = function() {
  return this.getElement().querySelector('.' + ydn.crm.su.ui.activity.DetailPanel.CSS_CLASS_CONTENT);
};


/**
 * @inheritDoc
 */
ydn.crm.su.ui.activity.DetailPanel.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  this.getHandler().listen(this.getElement(), 'click', this.handleClick_);
};


/**
 * @param {Event} e
 * @private
 */
ydn.crm.su.ui.activity.DetailPanel.prototype.handleClick_ = function(e) {
  if (e.target.tagName == 'A' && e.target.getAttribute('data-view') == 'record') {
    var module = e.target.getAttribute('data-module');
    var id = e.target.getAttribute('data-id');
    if (ydn.crm.su.EDITABLE_MODULES.indexOf(module) >= 0) {
      e.stopPropagation();
      e.preventDefault();
      var ev;
      if (id) {
        ev = new ydn.crm.su.events.RecordViewEvent(module, id, this);
      } else {
        ev = new ydn.crm.su.events.NewRecordEvent(module, this);
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
ydn.crm.su.ui.activity.DetailPanel.prototype.renderItem_ = function(record) {
  var dom = this.getDomHelper();
  var sugar = this.getModel();
  var domain = sugar.getDomain();
  var m_name = /** @type {ydn.crm.su.ModuleName} */ (record._module);
  var r = new ydn.crm.su.Record(domain, m_name, record);
  var icon = dom.createDom('div', 'icon small', record._module.substr(0, 2));
  var msg = dom.createDom('span');
  var mod_id = r.getStringValue('modified_user_id');
  var user_id = r.getStringValue('created_by');
  if (mod_id) {
    var mod_link = dom.createDom('a', {
      'href': sugar.getRecordViewLink(ydn.crm.su.ModuleName.USERS, mod_id),
      'target': '_blank'
    }, r.getStringValue('modified_user_name'));
    msg.appendChild(mod_link);
    msg.appendChild(dom.createTextNode(' '));
  } else if (user_id) {
    var user_link = dom.createDom('a', {
      'href': sugar.getRecordViewLink(ydn.crm.su.ModuleName.USERS, user_id),
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

  var m_no_s = ydn.crm.su.Record.moduleAsNoun(m_name);
  msg.appendChild(dom.createTextNode(' ' + m_no_s + ''));

  var since = ydn.crm.su.utils.parseDate(record['date_modified']);
  var t = goog.date.relative.format(since.getTime()) || 'on ' + since.toLocaleDateString();
  msg.appendChild(dom.createTextNode(' ' + t + '.'));

  var div = dom.createDom('div', null, [icon, msg]);
  div.className = ydn.crm.su.ui.activity.DetailPanel.CSS_CLASS_ITEM +
      ' record-header ' + record._module;
  this.getContentElement().appendChild(div);
};


/**
 *
 */
ydn.crm.su.ui.activity.DetailPanel.prototype.clear = function() {
  var content = this.getContentElement();
  content.innerHTML = '';
  var head = this.getHeadElement();
  head.innerHTML = '';
};


/**
 * Generate upcoming query from current time.
 * @param {ydn.crm.su.ModuleName} m_name one of ydn.crm.su.ACTIVITY_MODULES.
 * @param {Date=} opt_until date limit.
 * @return {CrmApp.ReqQuery} query
 */
ydn.crm.su.ui.activity.DetailPanel.prototype.genUpcomingQuery = function(m_name, opt_until) {
  var assigned_user_id = this.getModel().getUser().getId();
  var reverse = false;
  var start_date = ydn.crm.su.utils.toDateString(new Date());
  var until = '\uffff';
  if (m_name == ydn.crm.su.ModuleName.CASES) {
    reverse = true;
    start_date = '';
    if (opt_until) {
      start_date = ydn.crm.su.utils.toDateString(opt_until);
    }
  } else {
    if (opt_until) {
      until = ydn.crm.su.utils.toDateString(opt_until);
    }
  }

  var kr = ydn.db.KeyRange.bound([assigned_user_id, start_date], [assigned_user_id, until]);

  var query = {
    'store': m_name,
    'index': ydn.crm.su.Record.getIndexForDeadline(m_name),
    'limit': 20,
    'reverse': reverse,
    'keyRange': kr.toJSON()
  };
  return /** @type {CrmApp.ReqQuery} */ (/** @type {Object} */ (query));
};


/**
 * Render recent activity.
 */
ydn.crm.su.ui.activity.DetailPanel.prototype.renderActivity = function() {
  var root = this.getElement();
  if (ydn.crm.su.ui.activity.DetailPanel.DEBUG) {
    window.console.info('renderActivity');
  }
  this.getModel().send(ydn.crm.Ch.SReq.ACTIVITY_STREAM).addCallbacks(function(ans) {
    // window.console.log(ans);
    var dom = this.getDomHelper();
    var title = dom.createDom('span');
    if (ydn.crm.su.ui.activity.DetailPanel.DEBUG) {
      window.console.log('receiving renderUpcoming ' + ans.length + ' items', ans);
    }
    if (ans.length > 0) {
      var since = ydn.crm.su.utils.parseDate(ans[ans.length - 1]['date_modified']);
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
    window.console.error(e);
  }, this);
};


/**
 * Render upcoming activity item.
 * @param {SugarCrm.Record} obj
 * @param {ydn.crm.su.ModuleName} m_name
 * @return {ydn.crm.su.Record}
 * @private
 */
ydn.crm.su.ui.activity.DetailPanel.prototype.renderUpcomingItem_ = function(obj, m_name) {
  var dom = this.getDomHelper();
  var sugar = this.getModel();
  var domain = sugar.getDomain();
  var r = new ydn.crm.su.Record(domain, m_name, obj);
  var msg = dom.createDom('span');
  var verb = ydn.crm.su.Record.moduleAsVerb(m_name);
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
  div.className = ydn.crm.su.ui.activity.DetailPanel.CSS_CLASS_ITEM +
      ' record-header ' + obj._module;
  this.getContentElement().appendChild(div);
  return r;
};


/**
 * Render header using given element as title.
 * @param {Element} el
 * @private
 */
ydn.crm.su.ui.activity.DetailPanel.prototype.renderHeader_ = function(el) {
  var head = this.getHeadElement();
  head.innerHTML = '';
  head.appendChild(el);
};


/**
 * Render upcoming activity.
 * @param {ydn.crm.su.ModuleName} m_name one of ydn.crm.su.ACTIVITY_MODULES.
 * @return {!goog.async.Deferred<number>} number of upcoming items until next weekend.
 */
ydn.crm.su.ui.activity.DetailPanel.prototype.renderUpcoming = function(m_name) {
  var q = this.genUpcomingQuery(m_name);
  if (ydn.crm.su.ui.activity.DetailPanel.DEBUG) {
    window.console.log('renderUpcoming for ' + m_name, q);
  }
  return this.getModel().send(ydn.crm.Ch.SReq.VALUES, q).addCallbacks(function(arr) {
    var results = /** @type {Array.<SugarCrm.Record>} */ (arr);
    if (ydn.crm.su.ui.activity.DetailPanel.DEBUG) {
      window.console.log('receiving renderUpcoming ' + results.length + ' items',
          q, arr);
    }
    var dom = this.getDomHelper();
    var msg = dom.createDom('span');
    var a = dom.createDom('a', {
      'href': '#' + m_name,
      'data-module': m_name,
      'data-view': 'record'
    }, 'New');
    var head = dom.createDom('span', null, [msg, a]);
    this.renderHeader_(head);

    var cnt = 0;
    var weekend = ydn.time.getWeekend();
    for (var i = 0; i < results.length; i++) {
      var r = this.renderUpcomingItem_(results[i], m_name);
      var deadline = r.getDeadline();
      if (m_name == ydn.crm.su.ModuleName.CASES) {
        cnt++;
      } else if (deadline < weekend) {
        cnt++;
      }
    }
    msg.textContent = cnt + ' upcoming ' + m_name + '. ';

    return cnt;
  }, function(e) {
    throw e;
  }, this);
};


