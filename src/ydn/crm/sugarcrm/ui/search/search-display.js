/**
 * @fileoverview Search and display result.
 */


goog.provide('ydn.crm.su.ui.SearchDisplay');
goog.require('goog.ui.Component');
goog.require('goog.ui.Menu');
goog.require('goog.ui.MenuItem');
goog.require('goog.ui.Toolbar');
goog.require('goog.ui.ToolbarSelect');
goog.require('wgui.TextInput');
goog.require('ydn.crm.su.model.ResultRecord');
goog.require('ydn.crm.su.model.Sugar');
goog.require('ydn.crm.su.ui.record.Record');



/**
 * Search and display result.
 * @param {ydn.crm.su.model.Sugar} model
 * @param {goog.dom.DomHelper=} opt_dom
 * @constructor
 * @struct
 * @extends {goog.ui.Component}
 * @suppress {checkStructDictInheritance} suppress closure-library code.
 */
ydn.crm.su.ui.SearchDisplay = function(model, opt_dom) {
  goog.base(this, opt_dom);
  goog.asserts.assertInstanceof(model, ydn.crm.su.model.Sugar,
      'model must be ydn.crm.su.model.Sugar instance');
  this.setModel(model);
  /**
   * @type {Array.<ydn.crm.su.ui.SearchDisplay.SearchTask>}
   * @private
   */
  this.search_tasks_ = [];
  /**
   * Just to show progress of search task.
   * @type {number}
   * @private
   */
  this.total_tasks_ = 0;

};
goog.inherits(ydn.crm.su.ui.SearchDisplay, goog.ui.Component);


/**
 * @define {boolean} debug flag.
 */
ydn.crm.su.ui.SearchDisplay.DEBUG = false;


/**
 * @return {ydn.crm.su.model.Sugar}
 * @override
 */
ydn.crm.su.ui.SearchDisplay.prototype.getModel;


/**
 * @const
 * @type {string}
 */
ydn.crm.su.ui.SearchDisplay.CSS_CLASS = 'search-display';


/** @return {string} */
ydn.crm.su.ui.SearchDisplay.prototype.getCssClass = function() {
  return ydn.crm.su.ui.SearchDisplay.CSS_CLASS;
};


/**
 * @inheritDoc
 */
ydn.crm.su.ui.SearchDisplay.prototype.createDom = function() {
  goog.base(this, 'createDom');
  var dom = this.dom_;
  var root = this.getElement();
  root.classList.add(this.getCssClass());
  var header = dom.createDom('div', 'header');
  root.appendChild(header);
  this.toolbar = new goog.ui.Toolbar(null, null, dom);
  var record_types = new goog.ui.Menu(dom);
  for (var i = 0; i < ydn.crm.su.CacheModules.length; i++) {
    record_types.addChild(new goog.ui.MenuItem(ydn.crm.su.CacheModules[i]), true);
  }
  var tbn = new goog.ui.ToolbarSelect('Module', record_types, null, dom);
  this.toolbar.addChild(tbn, true);
  var search_input = new wgui.TextInput('');
  this.toolbar.addChild(search_input, true);
  this.toolbar.render(header);
  tbn.setVisible(false);
  var content = dom.createDom('div', 'content');
  var wrapper = dom.createDom('div', 'content-wrapper', [content]);
  root.appendChild(wrapper);
  this.addChild(this.result_panel, true);
  var ele_input = search_input.getElement().querySelector('input');
  ele_input.setAttribute('placeholder', 'Search ...');
  ele_input.setAttribute('title', 'Search name, email, phone, id, title, description, etc.');
};


/**
 * Set toolbar options.
 * @param {!Object} options
 */
ydn.crm.su.ui.SearchDisplay.prototype.setToolbarOptions = function(options) {
  var show_module = options['module'];
  if (goog.isBoolean(show_module)) {
    this.toolbar.getChildAt(0).setVisible(show_module);
  }
};


/**
 * @inheritDoc
 */
ydn.crm.su.ui.SearchDisplay.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  var search_input = /** @type {wgui.TextInput} */ (this.toolbar.getChildAt(1));
  this.getHandler().listen(search_input, goog.ui.Component.EventType.ACTION,
      this.handleAction, true);
};


/**
 * @return {?string}
 */
ydn.crm.su.ui.SearchDisplay.prototype.getRecordType = function() {
  var sel = /** @type {goog.ui.ToolbarSelect} */ (this.toolbar.getChildAt(0));
  var item = sel.getSelectedItem();
  return item ? item.getCaption() : null;
};


/**
 * Clear results.
 * @private
 */
ydn.crm.su.ui.SearchDisplay.prototype.clearResult_ = function() {
  for (var i = this.result_panel.getChildCount() - 1; i >= 0; i--) {
    var child = /** @type {ydn.crm.su.ui.record.Record} */ (this.result_panel.getChildAt(i));
    /**
     * @type {ydn.crm.su.model.ResultRecord}
     */
    var model = /** @type {ydn.crm.su.model.ResultRecord} */ (child.getModel());
    model.clear();
  }
  this.total_tasks_ = 0;
};


/**
 * @typedef {{
 *   module: string,
 *   q: string,
 *   taskNo: number
 * }}
 */
ydn.crm.su.ui.SearchDisplay.SearchTask;


/**
 * @const
 * @type {number}
 */
ydn.crm.su.ui.SearchDisplay.MAX_PANELS = 30;


/**
 * Add a new result.
 * @param {DbFullTextSearchResult} result
 * @private
 */
ydn.crm.su.ui.SearchDisplay.prototype.addResult_ = function(result) {
  if (ydn.crm.su.ui.SearchDisplay.DEBUG) {
    goog.global.console.log(result);
  }
  if (!result) {
    return;
  }
  var n = this.result_panel.getChildCount();
  for (var i = 0; i < n; i++) {
    var child = /** @type {ydn.crm.su.ui.record.Record} */(
        this.result_panel.getChildAt(i));
    var model = /** @type {ydn.crm.su.model.ResultRecord} */ (child.getModel());
    if (model && model.valueAsString('id') == result.primaryKey) {
      return;
    }
  }
  for (var i = 0; i < n; i++) {
    var child = /** @type {ydn.crm.su.ui.record.Record} */ (this.result_panel.getChildAt(i));
    var model = /** @type {ydn.crm.su.model.ResultRecord} */ (child.getModel());
    if (model.isEmpty()) {
      model.setResult(result);
      return;
    }
  }
  if (n > ydn.crm.su.ui.SearchDisplay.MAX_PANELS) {
    var banney = /** @type {ydn.crm.su.ui.record.Record} */ (this.result_panel.getChildAt(0));
    /**
     * @type {ydn.crm.su.model.ResultRecord}
     */
    var model = /** @type {ydn.crm.su.model.ResultRecord} */ (banney.getModel());
    model.setResult(result);
  } else {
    // create new result panel.
    var m = new ydn.crm.su.model.ResultRecord(this.getModel(), result);
    var ch = new ydn.crm.su.ui.record.Record(m, this.dom_);
    this.result_panel.addChild(ch, true);
  }

};


/**
 * Update for an module query. This will invoke updateSearch_().
 * @param {string} m_name
 * @param {string} index
 * @param {string} q
 * @private
 */
ydn.crm.su.ui.SearchDisplay.prototype.updateSearchFor_ = function(m_name, index, q) {
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
 * @param {number} x fraction.
 * @return {string} css property for linear-gradient
 */
ydn.crm.su.ui.SearchDisplay.computeBackground = function(x) {

  var dx = x + 0.1;
  var s = [];
  var start_color = '255, 255, 255';
  var mid1_color = '135, 224, 253';
  var mid2_color = '255, 255, 255';
  var end_color = '255, 255, 255';
  s[0] = 'rgb(' + start_color + ') 0%';
  if (x < 99) {
    s[1] = 'rgb(' + mid1_color + ') ' + x.toFixed(1) + '%';
    s[2] = 'rgb(' + mid2_color + ') ' + dx.toFixed(1) + '%';
  }
  s.push('rgb(' + end_color + ') 100%');
  return 'linear-gradient(to right, ' + s.join(', ') + ')';
};


/**
 * @param {number} pending_count
 * @private
 */
ydn.crm.su.ui.SearchDisplay.prototype.showStartProgress_ = function(pending_count) {
  if (this.total_tasks_ == 0) {
    this.total_tasks_ = pending_count;
  }
  var progress = 100 * (this.total_tasks_ - pending_count) / this.total_tasks_;
  var el = this.getSearchInput().getElement();
  var input = goog.dom.getElementsByTagNameAndClass('input', null, el)[0];
  input.style.background = ydn.crm.su.ui.SearchDisplay.computeBackground(progress);
};


/**
 * Update search progress. A given query is breakdown into task, represented
 * by taskNo, and then execute on each this function invocation. If a new search
 * is available, current result are clear.
 * @private
 */
ydn.crm.su.ui.SearchDisplay.prototype.updateSearch_ = function() {
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


/**
 * @protected
 * @return {wgui.TextInput}
 */
ydn.crm.su.ui.SearchDisplay.prototype.getSearchInput = function() {
  return /** @type {wgui.TextInput} */ (this.toolbar.getChildAt(1));
};


/**
 * @param {Event} e
 */
ydn.crm.su.ui.SearchDisplay.prototype.handleAction = function(e) {
  var search_input = this.getSearchInput();
  var query = search_input.getContent();
  this.clearResult_();
  if (query) {
    query = query.trim();
    if (query.length >= 2) {
      var type = this.getRecordType();
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
  }
};


/**
 * @inheritDoc
 */
ydn.crm.su.ui.SearchDisplay.prototype.getContentElement = function() {
  return goog.dom.getElementByClass(goog.getCssName('content'), this.getElement());
};


