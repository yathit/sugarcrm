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
 * @fileoverview Gmail command injector.
 *
 * Inject context specific UI to gmail heading of an email.
 */


goog.provide('ydn.crm.ui.GmailCmdInjector');
goog.require('ydn.crm.ui.GmailCmd');



/**
 * Gmail command injector.
 * @param {ydn.crm.sugarcrm.model.Sugar} sugar
 * @constructor
 */
ydn.crm.ui.GmailCmdInjector = function(sugar) {
  /**
   * @protected
   * @type {ydn.crm.sugarcrm.model.Sugar}
   */
  this.sugar = sugar;

  /**
   * @type {Array.<!ydn.crm.ui.GmailCmd>}
   * @private
   */
  this.cmd_pools_ = [];

};


/**
 * @define {boolean} debug flag.
 */
ydn.crm.ui.GmailCmdInjector.DEBUG = true;


/**
 * @protected
 * @type {goog.debug.Logger}
 */
ydn.crm.ui.GmailCmdInjector.prototype.logger =
    goog.log.getLogger('ydn.crm.ui.GmailCmdInjector');


/**
 * Handle menu button click.
 * @param {Event} e
 */
ydn.crm.ui.GmailCmdInjector.onMenuButtonClick = function(e) {
  if (ydn.crm.ui.GmailCmdInjector.DEBUG) {
    window.console.info('adding menu');
  }
};


/**
 * Inject email message header menu. The menu has option for archiving message.
 * This method is to be called when URL changes to gmail message thread.
 */
ydn.crm.ui.GmailCmdInjector.prototype.injectEmailMessageHeaderMenu = function() {
  // what about other language ?
  var reply_btns = document.querySelectorAll('div[data-tooltip="Reply"]');
  var n = reply_btns.length;
  if (n > 0) {
    for (var i = 0; i < n; i++) {
      var span = document.createElement('span');
      span.textContent = 'YDN';
      span.onclick = ydn.crm.ui.GmailCmdInjector.onMenuButtonClick;
      reply_btns[i].parentElement.insertBefore(span, reply_btns[i]);
    }
  } else {
    ydn.msg.getMain().getChannel().send(ydn.crm.Ch.Req.LOG,
        {'error': 'Reply not found',
          'html': document.body.outerHTML});
  }
};


/**
 * Observe Gmail compose panel for template menu attachment.
 * This need to be called only once.
 * <pre>
 *   var tm = new ydn.crm.ui.GmailCmdInjector(sugar);
 *   tm.observeEmailThreadToolbar(document.body);
 * </pre>
 * @param {Element} el
 * @return {MutationObserver}
 * @deprecated use #injectEmailMessageHeaderMenu instead. No longer working.
 */
ydn.crm.ui.GmailCmdInjector.prototype.observeEmailThreadToolbar = function(el) {
  var config = /** @type {MutationObserverInit} */ (/** @type {Object} */ ({
    'childList': false,
    'attributes': true,
    'characterData': false,
    'subtree': true,
    'attributeOldValue': false,
    'characterDataOldValue': false,
    'attributeFilter': ['data-tooltip']
  }));

  var observer = new MutationObserver(this.observe_.bind(this));

  if (ydn.crm.ui.GmailCmdInjector.DEBUG) {
    window.console.log('observing data-tooltip changes in ', el);
  }

  observer.observe(el, config);
  return observer;
};


/**
 * Get a panel from the pool or create a new one if not exist.
 * @return {ydn.crm.ui.GmailCmd}
 */
ydn.crm.ui.GmailCmdInjector.prototype.popGmailCmd = function() {

  for (var i = 0; i < this.cmd_pools_.length; i++) {
    if (this.cmd_pools_[i].isFree()) {
      if (this.cmd_pools_[i].isInDocument()) { // it will be
        this.cmd_pools_[i].exitDocument();
      }
      if (ydn.crm.ui.GmailCmdInjector.DEBUG) {
        window.console.log(this.cmd_pools_.length + ' objects in pools using ' + i);
      }
      return this.cmd_pools_[i];
    }
  }
  if (ydn.crm.ui.GmailCmdInjector.DEBUG) {
    window.console.log(this.cmd_pools_.length + ' objects in pools, creating new one');
  }
  var cmd = new ydn.crm.ui.GmailCmd(this.sugar);
  this.cmd_pools_.push(cmd);
  return cmd;
};


/**
 * Mutation observer.
 * @param {Array.<MutationRecord>} mutations
 * @private
 */
ydn.crm.ui.GmailCmdInjector.prototype.observe_ = function(mutations) {
  var n = mutations.length;
  if (ydn.crm.ui.GmailCmdInjector.DEBUG) {
    window.console.log('checking ' + n + ' mutations');
  }
  for (var i = 0; i < n; i++) {
    var mutation = mutations[i];
    /**
     * @type {Node}
     */
    var el = mutation.target;
    var exp_value = 'Reply'; // what about other languages?
    var value = el.getAttribute('data-tooltip');
    if (ydn.crm.ui.GmailCmdInjector.DEBUG) {
      window.console.info('data-tooltip=' + value);
    }
    if (value == exp_value) {
      if (ydn.crm.ui.GmailCmdInjector.DEBUG) {
        window.console.log(el);
      }
      var cmd = this.popGmailCmd();
      var root = document.createElement('span');
      el.parentElement.insertBefore(root, el);
      cmd.render(root);
    }
  }
};
