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
 * @fileoverview Popup page.
 *
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */

goog.provide('ydn.crm.ui.PopupPage');
goog.require('goog.log');



/**
 * Yathit CRM Popup Page.
 * @constructor
 */
ydn.crm.ui.PopupPage = function() {
  var ul = document.querySelector('ul.host-permission');
  ul.addEventListener('click', this.handleHostPermissionRequest_.bind(this));
};


/**
 * @protected
 * @type {goog.debug.Logger}
 */
ydn.crm.ui.PopupPage.prototype.logger =
    goog.log.getLogger('ydn.crm.ui.PopupPage');


/**
 * Set status message.
 * @param {Error|string} msg
 */
ydn.crm.ui.PopupPage.setStatus = function(msg) {
  var s = msg instanceof Error ? msg.name + ' ' + msg.message : msg;
  document.getElementById('status-bar-message').textContent = s;
};


/**
 * Render feed info.
 * @param {Array} feeds
 * @param {boolean=} opt_append
 */
ydn.crm.ui.PopupPage.prototype.renderFeed = function(feeds, opt_append) {
  if (!feeds) {
    return;
  }
  var fg = document.querySelector('ul.feeds');
  if (!opt_append) {
    fg.innerHTML = '';
  }
  for (var i = 0; i < feeds.length; i++) {
    var ele = ydn.crm.ui.json2element(feeds[i]);
    if (ele) {
      var li = document.createElement('li');
      li.appendChild(ele);
      fg.appendChild(li);
    }
  }

};


/**
 * @param {Event} e
 * @private
 */
ydn.crm.ui.PopupPage.prototype.handleHostPermissionRequest_ = function(e) {
  var a = e.target;
  if (a.tagName == 'BUTTON') {
    e.preventDefault();
    var domain = a.getAttribute('data-domain');
    var permissions = {
      origins: ['http://' + domain + '/*', 'https://' + domain + '/*']
    };
    chrome.permissions.request(permissions, function(grant) {
      if (grant) {
        a.style.display = 'none';
      }
    });
  }
};


ydn.crm.ui.PopupPage.prototype.init = function() {
  ydn.crm.ui.PopupPage.setStatus('connecting to background...');
};


/**
 * Initialize UI.
 */
ydn.crm.ui.PopupPage.prototype.init_ = function() {
  ydn.crm.ui.PopupPage.setStatus('checking login...');
  // here we can use extension.getURL, but need more robust on dev.
  var option_page = window.location.href.replace(/#.*/, '')
      .replace('popup.html', 'option-page.html');

  ydn.msg.getChannel().send('login-info').addCallbacks(function(info) {

    if (info.is_login) {
      ydn.crm.ui.PopupPage.setStatus(info.email + ' logged in.');
      // check host premission requirement
      SugarCrmModel.list(function(models) {
        for (var i = 0; i < models.length; i++) {
          models[i].hasHostPermission(function(grant) {
            if (!grant) {
              var ul = document.querySelector('ul.host-permission');
              var li = document.createElement('li');
              var a = document.createElement('button');
              a.textContent = 'Grant host permission';
              a.setAttribute('title', this.getDomain());
              li.appendChild(a);
              a.setAttribute('data-domain', this.getDomain());
              ul.appendChild(li);
            }
          }, models[i]);
        }
        if (models.length == 0) {
          this.renderFeed([
            {
              tagName: 'A',
              textContent: 'Setup SugarCRM',
              target: 'option-page',
              href: option_page + '#credentials'
            }
          ], true);
        }
      }, this);
      // check gdata token
      ydn.msg.getChannel().send('gdata-token', option_page + '#credentials').addCallback(function(data) {
        var token = /** @type {YdnApiToken} */ (data);
        if (!token || !token.has_token) {
          this.renderFeed([
            {
              tagName: 'A',
              textContent: 'Setup Google account',
              target: 'option-page',
              href: option_page + '#credentials'
            }
          ], true);
        }
      }, this);
    } else {
      ydn.crm.ui.PopupPage.setStatus('Not logged in.');
      var arr = [
        {
          tagName: 'A',
          textContent: 'Setup',
          target: 'option-page',
          href: option_page
        }
      ];
      this.renderFeed(arr, true);
    }
  }, function(e) {
    ydn.crm.ui.PopupPage.setStatus(e);
  }, this);

};






