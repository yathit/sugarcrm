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
 * @fileoverview Search model for search display UI and search control.
 *
 * There is one search operation at a time.
 *                                                 `
 * @author kyawtun@yathit.com (Kyaw Tun)
 */

goog.provide('ydn.crm.su.model.Search');



/**
 * Search model for search display UI and search control.
 * @param {ydn.crm.su.model.Meta} sugar
 * @constructor
 */
ydn.crm.su.model.Search = function(sugar) {
  /**
   * @final
   * @type {ydn.crm.su.model.Meta}
   * @private
   */
  this.sugar_ = sugar;
  /**
   *
   * @type {null}
   * @private
   */
  this.record_type_ = null;
};


/**
 * @define {boolean} debug flag.
 */
ydn.crm.su.model.Search.DEBUG = false;


/**
 * Search records.
 * @param {string} query
 */
ydn.crm.su.model.Search.prototype.search = function(query) {
  query = query.trim();
  if (!query) {
    return;
  }
  var type = this.getRecordType();
  if (query.length == 1) {

  } else if (query.length >= 2) {
    this.search_tasks_.length = 0;
    if (type) {
      this.search_tasks_[0] = {
        module: type,
        q: query,
        taskNo: -1
      };
    } else {
      for (var i = 0; i < ydn.crm.su.CacheModules.length; i++) {
        this.search_tasks_[i] = {
          module: ydn.crm.su.CacheModules[i],
          q: query,
          taskNo: -1
        };
      }
    }
    this.updateSearch_(); // if update search is already running this will
    // cause double run, but OK.
    ydn.crm.shared.logAnalyticValue('ui.search', 'click', query);
  }

};


/**
 * Update for an module query. This will invoke updateSearch_().
 * @param {string} m_name
 * @param {string} index
 * @param {string} q
 * @private
 */
ydn.crm.su.model.Search.prototype.updateSearchFor_ = function(m_name, index, q) {
  if (ydn.crm.su.ui.SearchDisplay.DEBUG) {
    window.console.log(m_name, index, q);
  }

  this.getModel().listRecords(m_name, index, q, true).addCallbacks(function(arr) {
    if (ydn.crm.su.ui.SearchDisplay.DEBUG) {
      window.console.log(m_name, index, q, arr);
    }
    var result = arr[0];
    if (result['result'][0]) {
      var module_name = ydn.crm.su.toModuleName(result['store']);
      var record = /** @type {SugarCrm.Record} */ (result['result'][0]);
      var key = record['id'];
      goog.asserts.assertString(key, 'key not found in ' + record);
      var search_result = {
        'storeName': module_name,
        'primaryKey': key,
        'record': record,
        'value': q,
        'tokens': [{
          'keyPath': index
        }]
      };
      this.addResult_(/** @type {DbFullTextSearchResult} */ (/** @type {Object} */ (search_result)));
    }
    this.updateSearch_();
  }, function(e) {
    if (ydn.crm.su.ui.SearchDisplay.DEBUG) {
      window.console.log(m_name, index, q, e);
    }
    this.updateSearch_();
    throw e;
  }, this);
};


/**
 * Update search progress. A given query is breakdown into task, represented
 * by taskNo, and then execute on each this function invocation. If a new search
 * is available, current result are clear.
 * @private
 */
ydn.crm.su.model.Search.prototype.updateSearch_ = function() {
  var task = this.search_tasks_[0];
  if (!task) {
    return;
  }
  task.taskNo++; // update task no. it always starts with -1.
  /*
   if (ydn.crm.su.ui.SearchDisplay.DEBUG) {
   window.console.log('updateSearch_ ' + JSON.stringify(task));
   }
   */

  // update status
  var n_per_task = 4;
  var total = n_per_task * (this.search_tasks_.length - 1) + (n_per_task - task.taskNo);
  this.showStartProgress_(total);

  var model = this.getModel();
  if (task.taskNo == 0) {
    // Task 0. query email
    this.updateSearchFor_(task.module, 'id', task.q);
  } else if (task.taskNo == 1) {
    // Task 0. query email
    this.updateSearchFor_(task.module, 'ydn$emails', task.q);
  } else if (task.taskNo == 2) {
    // Task 1. query phone
    var m = task.q.match(/\d/g);
    var number_of_digits = m ? m.length : 0;
    if (number_of_digits < 3) {
      // skip phone no search.
      this.updateSearch_();
      return;
    }
    this.updateSearchFor_(task.module, 'ydn$phones', task.q);
  } else if (task.taskNo == 3) {
    // Task 2. full text search on name
    model.searchRecords(task.module, task.q).addCallbacks(function(x) {
      var arr = /** @type {!Array<!CrmApp.TextQueryResult>} */ (x);
      var result = arr[0].fullTextResult;
      var n = result.length || 0;
      for (var i = 0; i < n; i++) {
        this.addResult_(result[i]);
      }
      this.updateSearch_();
    }, function(e) {
      throw e;
    }, this);
  } else {
    // done.
    this.search_tasks_.shift();
    if (this.search_tasks_.length > 0) {
      this.updateSearch_();
    }
  }
};
