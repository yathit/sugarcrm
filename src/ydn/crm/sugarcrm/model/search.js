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
goog.require('goog.array');
goog.require('goog.events.EventTarget');
goog.require('goog.math');
goog.require('ydn.crm.su.model.events');



/**
 * Search model for search display UI and search control.
 * @param {ydn.crm.su.model.Sugar} sugar
 * @constructor
 * @extends {goog.events.EventTarget}
 * @struct
 * @suppress {checkStructDictInheritance} suppress closure-library code.
 */
ydn.crm.su.model.Search = function(sugar) {
  goog.base(this);
  /**
   * @final
   * @type {ydn.crm.su.model.Sugar}
   * @private
   */
  this.sugar_ = sugar;
  /**
   * Current query term.
   * @type {string}
   * @private
   */
  this.q_ = '';
  /**
   * Order by.
   * @type {string} either 'date_modified', 'name' or '' (default)
   * @private
   */
  this.order_by_ = '';
  /**
   *
   * @type {?ydn.crm.su.ModuleName}
   * @private
   */
  this.record_type_ = null;
  /**
   * @type {ydn.crm.su.model.Search.Stack}
   * @private
   */
  this.stack_ = null;
  /**
   * Orderred list of results.
   * @type {Array<SugarCrm.ScoredRecord>}
   * @private
   */
  this.results_ = [];
};
goog.inherits(ydn.crm.su.model.Search, goog.events.EventTarget);


/**
 * @define {boolean} debug flag.
 */
ydn.crm.su.model.Search.DEBUG = false;


/**
 * @return {ydn.crm.su.model.Sugar}
 */
ydn.crm.su.model.Search.prototype.getSugar = function() {
  return this.sugar_;
};


/**
 * Set target module.
 * @param {?ydn.crm.su.ModuleName} mn set `null` to clear any target module.
 */
ydn.crm.su.model.Search.prototype.setTargetModule = function(mn) {
  if (mn == this.record_type_) {
    return;
  }
  this.record_type_ = mn;
  var q = this.q_;
  this.q_ = '';
  this.search(q);
};


/**
 * Search records.
 * @param {string} query
 */
ydn.crm.su.model.Search.prototype.search = function(query) {
  query = query.trim();
  if (query == this.q_) {
    return;
  }
  this.q_ = query;
  this.results_ = [];
  var ev = new ydn.crm.su.model.events.SearchResetEvent(this.q_, this);
  this.dispatchEvent(ev);
  this.stack_ = new ydn.crm.su.model.Search.Stack(this.record_type_);
  this.updateSearch_();
};


/**
 * Add result to pool.
 * @param {SugarCrm.ScoredRecord} r
 * @param {string} index
 * @param {string} q
 * @private
 */
ydn.crm.su.model.Search.prototype.addResult_ = function(r, index, q) {
  if (q != this.q_) {
    if (ydn.crm.su.model.Search.DEBUG) {
      window.console.info('query no longer valid: ' + q + ': ' + this.q_);
    }
    return;
  }
  if (index == 'full-text') {
    // normalize for full-text score.
    r._score = r._score || 0;
    r._score = r._score > 1 ? 1 : r._score;
  } else if (index == 'id') {
    r._score = 1;
  } else {
    r._score = 0.5;
  }

  var idx = goog.array.binarySearch(this.results_, function(a) {
    return a.id == r.id ? 0 : a._score > r._score ? 1 : -1;
  });
  if (idx < 0) {
    idx = -(idx + 1);
    goog.array.insertAt(this.results_, r, idx);
  } else {
    // existing record
    var ex = this.results_[idx];
    ex._score += r._score;
  }

  var ev = new ydn.crm.su.model.events.SearchResultAddEvent(idx, this);
  this.dispatchEvent(ev);
};


/**
 * Update for an module query. This will invoke updateSearch_().
 * @param {string} m_name
 * @param {string} index
 * @param {string} q
 * @private
 */
ydn.crm.su.model.Search.prototype.updateSearchFor_ = function(m_name, index, q) {

  this.sugar_.listRecord(m_name, index, q, true).addCallbacks(function(arr) {
    if (ydn.crm.su.model.Search.DEBUG) {
      window.console.log(m_name, index, q, arr);
    }
    for (var i = 0; i < arr.length; i++) {
      var r = /** @type {SugarCrm.ScoredRecord} */(arr[i]);
      r._module = m_name;
      this.addResult_(r, index, q);
    }
    this.updateSearch_();
  }, function(e) {
    if (ydn.crm.su.model.Search.DEBUG) {
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
  if (!this.stack_) {
    return;
  }
  if (!this.stack_.next()) {
    this.stack_ = null;
    this.dispatchEvent(new ydn.crm.su.model.events.SearchProgressEvent(1, this));
    return;
  }

  var level = this.stack_.getProgress();
  this.dispatchEvent(new ydn.crm.su.model.events.SearchProgressEvent(level, this));

  var task = this.stack_.getTask();
  var q = this.q_;

  var m_name = this.stack_.getModule();
  if (ydn.crm.su.model.Search.DEBUG) {
    window.console.log(m_name, task, q);
  }

  if (task == ydn.crm.su.model.Search.Task.ID) {
    // Task 0. query email
    this.updateSearchFor_(m_name, 'id', this.q_);
  } else if (task == ydn.crm.su.model.Search.Task.EMAIL) {
    // Task 0. query email
    this.updateSearchFor_(m_name, 'ydn$emails', this.q_);
  } else if (task == ydn.crm.su.model.Search.Task.PHONE) {
    // Task 1. query phone
    var m = q.match(/\d/g);
    var number_of_digits = m ? m.length : 0;
    if (number_of_digits < 3) {
      // skip phone no search.
      this.updateSearch_();
      return;
    }
    this.updateSearchFor_(m_name, 'ydn$phones', this.q_);
  } else if (task == ydn.crm.su.model.Search.Task.FULL_TEXT) {
    // Task 2. full text search on name
    this.sugar_.searchRecord(m_name, q, true).addCallbacks(function(x) {
      var arr = /** @type {!Array<!SugarCrm.ScoredRecord>} */ (x);
      if (ydn.crm.su.model.Search.DEBUG) {
        window.console.log(m_name, task, x);
      }
      for (var i = 0; i < arr.length; i++) {
        this.addResult_(arr[i], 'full-text', q);
      }
      this.updateSearch_();
    }, function(e) {
      window.console.error(e);
    }, this);
  } else {
    // done.
    this.updateSearch_();
  }
};


/**
 * @param {number} idx
 * @return {SugarCrm.ScoredRecord}
 */
ydn.crm.su.model.Search.prototype.getResultAt = function(idx) {
  return this.results_[idx];
};


/**
 * @return {number} number of results.
 */
ydn.crm.su.model.Search.prototype.getResultCount = function() {
  return this.results_.length;
};



/**
 * Query execution stack.
 * @param {?ydn.crm.su.ModuleName} mn module name if targeting for a specific
 * module. `null` for any modules.
 * @constructor
 */
ydn.crm.su.model.Search.Stack = function(mn) {
  /**
   * @final
   * @type {?ydn.crm.su.ModuleName}
   * @private
   */
  this.target_mn_ = mn;
  /**
   * @type {number}
   * @private
   */
  this.mn_idx_ = 0;
  /**
   * @type {number}
   * @private
   */
  this.task_idx_ = -1;
};


/**
 * List of task.
 * @enum {number}
 */
ydn.crm.su.model.Search.Task = {
  ID: 0,
  EMAIL: 1,
  PHONE: 2,
  FULL_TEXT: 3
};


/**
 * Task queue.
 * @type {Array<ydn.crm.su.model.Search.Task>}
 */
ydn.crm.su.model.Search.tasks = [ydn.crm.su.model.Search.Task.ID,
  ydn.crm.su.model.Search.Task.EMAIL,
  ydn.crm.su.model.Search.Task.PHONE,
  ydn.crm.su.model.Search.Task.FULL_TEXT];


/**
 * Move to next stack.
 * @return {boolean} return `true` if next execution task exist.
 */
ydn.crm.su.model.Search.Stack.prototype.next = function() {
  this.task_idx_++;
  if (this.task_idx_ >= ydn.crm.su.model.Search.tasks.length) {
    if (this.target_mn_) {
      return false;
    } else {
      this.task_idx_ = 0;
      this.mn_idx_++;
      if (this.mn_idx_ >= ydn.crm.su.CacheModules.length) {
        return false;
      } else {
        return true;
      }
    }
  } else {
    return true;
  }
};


/**
 * Get current task.
 * @return {ydn.crm.su.model.Search.Task}
 */
ydn.crm.su.model.Search.Stack.prototype.getTask = function() {
  return ydn.crm.su.model.Search.tasks[this.task_idx_];
};


/**
 * Get current module.
 * @return {ydn.crm.su.ModuleName}
 */
ydn.crm.su.model.Search.Stack.prototype.getModule = function() {
  if (this.target_mn_) {
    return this.target_mn_;
  } else {
    return ydn.crm.su.CacheModules[this.mn_idx_];
  }
};


/**
 * Get progress level.
 * @return {number} return progress level between 0 and 1 for start and finished.
 */
ydn.crm.su.model.Search.Stack.prototype.getProgress = function() {
  var total = ydn.crm.su.model.Search.tasks.length;
  if (!this.target_mn_) {
    total = ydn.crm.su.model.Search.tasks.length * ydn.crm.su.CacheModules.length;
  }
  var current = this.task_idx_ +
      this.mn_idx_ * ydn.crm.su.model.Search.tasks.length;
  return goog.math.clamp(current / total, 0, 1);
};

