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

  this.observeEmailThreadToolbar_(document.body);

};


/**
 * @define {boolean} debug flag.
 */
ydn.crm.ui.GmailCmdInjector.DEBUG = false;


/**
 * @protected
 * @type {goog.debug.Logger}
 */
ydn.crm.ui.GmailCmdInjector.prototype.logger =
    goog.log.getLogger('ydn.crm.ui.GmailCmdInjector');


/**
 * Inject email message header menu. The menu has option for archiving message.
 * This method is to be called when URL changes to gmail message thread.
 * @deprecated this is no longer needed.
 */
ydn.crm.ui.GmailCmdInjector.prototype.injectEmailMessageHeaderMenu = function() {
  // what about other language ?
  var reply_btns = document.querySelectorAll('div[data-tooltip="Reply"]');
  var n = reply_btns.length;
  if (n > 0) {
    for (var i = 0; i < n; i++) {
      this.injectMenuBeforeReplyButton_(reply_btns[i]);
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
 * @private
 */
ydn.crm.ui.GmailCmdInjector.prototype.observeEmailThreadToolbar_ = function(el) {
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
 * Inject menu before "Reply" button.
 * @param {Element} btn
 * @private
 */
ydn.crm.ui.GmailCmdInjector.prototype.injectMenuBeforeReplyButton_ = function(btn) {
  var cmd = this.popGmailCmd();
  var root = document.createElement('span');
  root.setAttribute('data-sugarcrm', this.sugar.getDomain());
  btn.parentElement.insertBefore(root, btn);
  cmd.render(root);
};


/**
 * Mutation observer to detect on opening email message in gmail message thread.
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
    var exp_value = 'Show details'; // what about other languages?
    // "Show details" is a drop-down button, beside 'to me' in the message
    // header. This in only mutation observer find changes when a new message open.
    var value = el.getAttribute('data-tooltip');
    if (ydn.crm.ui.GmailCmdInjector.DEBUG) {
      window.console.info('data-tooltip=' + value);
    }
    if (value == exp_value) {
      if (ydn.crm.ui.GmailCmdInjector.DEBUG) {
        window.console.log(el);
      }
      // navigate to "Reply" button
      var detail_table = goog.dom.getAncestorByTagNameAndClass(
          el, goog.dom.TagName.TABLE);
      if (!detail_table) {
        if (ydn.crm.ui.GmailCmdInjector.DEBUG) {
          window.console.warn('Detail table not found.');
        }
        return;
      }
      var email_header_table = goog.dom.getAncestorByTagNameAndClass(
          detail_table.parentElement, goog.dom.TagName.TABLE);
      if (!email_header_table) {
        if (ydn.crm.ui.GmailCmdInjector.DEBUG) {
          window.console.warn('Email header table not found.');
        }
        return;
      }
      var reply_btn = email_header_table.querySelector('div[data-tooltip="Reply"]');
      if (!reply_btn) {
        if (ydn.crm.ui.GmailCmdInjector.DEBUG) {
          window.console.warn('Reply button not found in email header.');
        }
        return;
      }
      this.injectMenuBeforeReplyButton_(reply_btn);
    }
  }
};
