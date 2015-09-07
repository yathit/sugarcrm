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
 * @fileoverview Field selector.
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */


goog.provide('ydn.crm.su.ui.widget.RecordMatcher');
goog.require('ydn.async.DelayService');



/**
 * @param {ydn.crm.su.Meta} meta
 * @param {ydn.crm.su.ModuleName} m_name
 * @constructor
 * Implements {@link goog.ui.ac.AutoComplete.Matcher}
 */
ydn.crm.su.ui.widget.RecordMatcher = function(meta, m_name) {
  /**
   * @protected
   * @type {ydn.crm.su.Meta}
   */
  this.meta = meta;
  /**
   * @protected
   * @type {ydn.crm.su.ModuleName}
   */
  this.module = m_name;

  /**
   * @type {ydn.async.DelayService}
   * @private
   */
  this.df_server_search_ = new ydn.async.DelayService(this.serverSearch_, 1000, this);
};


/**
 * @define {boolean} debug flag.
 */
ydn.crm.su.ui.widget.RecordMatcher.DEBUG = false;


/**
 * @param {string} token
 * @return {!goog.async.Deferred}
 * @private
 */
ydn.crm.su.ui.widget.RecordMatcher.prototype.clientSearch_ = function(token) {
  var q = [{
    'store': this.module,
    'index': 'id',
    'key': token
  }, {
    'store': this.module,
    'index': 'ydn$emails',
    'limit': 4,
    'prefix': true,
    'key': token.toLocaleLowerCase()
  }, {
    'store': this.module,
    'index': 'name',
    'limit': 2,
    'prefix': true,
    'key': token
  }];
  var fq = [{
    'store': this.module,
    'index': 'name',
    'fetchFull': true,
    'threshold': 0.2,
    'q': token
  }];

  var dfs = new goog.async.DeferredList([
    this.meta.getChannel().send(ydn.crm.ch.SReq.QUERY, q),
    this.meta.getChannel().send(ydn.crm.ch.SReq.SEARCH, fq)
  ]);
  return dfs.addCallbacks(function(x) {
    if (ydn.crm.su.ui.widget.RecordMatcher.DEBUG) {
      window.console.log(q, fq, x);
    }
    var arr = /** @type {Array<CrmApp.QueryResult>} */(x[0][1]);
    var out = [];
    var module = this.module;
    var add = function(r) {
      if (!r) {
        return;
      }
      var exists = out.some(function(x) {
        return x['id'] == r['id'];
      });
      if (!exists) {
        if (!r['_module']) {
          r['_module'] = module;
        }
        out.push(r);
      }
    };
    for (var i = 0; i < arr.length; i++) {
      for (var j = 0; j < arr[i].result.length; j++) {
        add(arr[i].result[j]);
      }
    }
    var frr = /** @type {CrmApp.TextQueryResult} */(x[1][1][0]);
    var res = frr.fullTextResult;
    for (var i = 0; i < res.length; i++) {
      add(res[i].record);
    }
    if (ydn.crm.su.ui.widget.RecordMatcher.DEBUG) {
      window.console.log(out.map(function(x) {return {id: x.id, name: x.name}}));
    }
    return out;
  }, function(e) {
    // module may not cache, OK to go server side search.
    // matchHandler(token, []);
    // window.console.error(e);
    return [];
  }, this);
};


/**
 * @param {string} token
 * @return {!goog.async.Deferred}
 * @private
 */
ydn.crm.su.ui.widget.RecordMatcher.prototype.serverSearch_ = function(token) {
  var q = {
    'modules': [this.module],
    'q': token,
    'quick': true,
    'limit': 5
  };
  return this.meta.getChannel().send(ydn.crm.ch.SReq.SEARCH_BY_MODULE, q);
};


/**
 * Retrieve a set of matching rows from the server via ajax.
 * @param {string} token The text that should be matched; passed to the server
 *     as the 'token' query param.
 * @param {number} maxMatches The maximum number of matches requested from the
 *     server; passed as the 'max_matches' query param.  The server is
 *     responsible for limiting the number of matches that are returned.
 * @param {Function} matchHandler Callback to execute on the result after
 *     matching.
 * @param {string=} opt_fullString The full string from the input box.
 */
ydn.crm.su.ui.widget.RecordMatcher.prototype.requestMatchingRows = function (token, maxMatches, matchHandler, opt_fullString) {
  if (!token || token.length == 0) {
    matchHandler(token, []);
    return;
  }
  var df = this.clientSearch_(token);
  df.addBoth(function(client) {
    if (client.length) {
      matchHandler(token, client);
    }
    // continue search in server side
    var sdf = this.df_server_search_.invoke(token);
    sdf.addCallbacks(function(server) {
      // make result interlace with client and server side.
      if (ydn.crm.su.ui.widget.RecordMatcher.DEBUG) {
        console.log(client, server);
      }
      var arr = [];
      var already = function(r) {
        return client.some(function(x) {
          return x['id'] == r['id'];
        });
      };
      for (var i = 0; i < server.length; i++) {
        if (!already(server[i])) {
          arr.unshift(server[i]);
        }
      }
      if (ydn.crm.su.ui.widget.RecordMatcher.DEBUG) {
        console.log(client, server, arr);
      }
      matchHandler(token, arr);
    }, function(e) {
          matchHandler(token, []);
          window.console.error(e);
    }, this);
  }, this);
};


/**
 * @return {boolean}
 */
ydn.crm.su.ui.widget.RecordMatcher.prototype.isRowDisabled = function() {
  return false;
};


/**
 * Set record module.
 * @param {ydn.crm.su.ModuleName} mn
 */
ydn.crm.su.ui.widget.RecordMatcher.prototype.setModule = function(mn) {
  this.module = mn;
};


/**
 * Get record module.
 * @return {ydn.crm.su.ModuleName} mn
 */
ydn.crm.su.ui.widget.RecordMatcher.prototype.getModule = function() {
  return this.module;
};
