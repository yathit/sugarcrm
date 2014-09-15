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
 * @fileoverview New record create panel.
 *
 * Note: Events are handled by the parent activity panel.
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */


goog.provide('ydn.crm.sugarcrm.ui.NewRecord');
goog.require('ydn.crm.sugarcrm.ui.record.Record');



/**
 * New record create panel.
 * @param {ydn.crm.sugarcrm.model.Record} model
 * @param {goog.dom.DomHelper=} opt_dom
 * @constructor
 * @struct
 * @extends {ydn.crm.sugarcrm.ui.record.Record}
 */
ydn.crm.sugarcrm.ui.NewRecord = function(model, opt_dom) {
  goog.base(this, model, opt_dom);
};
goog.inherits(ydn.crm.sugarcrm.ui.NewRecord, ydn.crm.sugarcrm.ui.record.Record);


/**
 * @define {boolean} debug flag.
 */
ydn.crm.sugarcrm.ui.NewRecord.DEBUG = false;


/**
 * @const
 * @type {string}
 */
ydn.crm.sugarcrm.ui.NewRecord.CSS_CLASS = 'new-record';


/**
 * @override
 */
ydn.crm.sugarcrm.ui.NewRecord.prototype.getCssClass = function() {
  return goog.base(this, 'getCssClass') + ' ' + ydn.crm.sugarcrm.ui.NewRecord.CSS_CLASS;
};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.ui.NewRecord.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  var model = this.getModel();
  this.getHandler().listen(model.parent, ydn.crm.sugarcrm.model.events.Type.CONTEXT_CHANGE,
      this.onContextChange_);
  this.setEditMode(true);
};


/**
 * @private
 * @param {ydn.crm.sugarcrm.model.events.ContextChangeEvent} e
 */
ydn.crm.sugarcrm.ui.NewRecord.prototype.onContextChange_ = function(e) {
  var model = this.getModel();
  if (e.record || e.gdata) {
    // hide this new record creation panel.
    goog.style.setElementShown(this.getElement(), false);
  } else {
    goog.style.setElementShown(this.getElement(), true);

    var record = new ydn.crm.sugarcrm.Record(model.getDomain(), model.getModuleName());
    model.setRecord(record);
    this.setEditMode(true);
    if (e.context) {
      var patch = {
        'email1': e.context.getEmail() || '',
        'full_name': e.context.getFullName() || ''
      };
      this.simulateEdit(patch);
      this.socialFill(e.context);
    }
  }
};


/**
 * Update UI inputs with social data.
 * @param {?ydn.crm.inj.Context} context
 */
ydn.crm.sugarcrm.ui.NewRecord.prototype.socialFill = function(context) {
  if (!context || !context.getEmail()) {
    return;
  }
  var email = context.getEmail();
  var mid = ydn.crm.msg.Manager.addStatus('Querying social data for ' + email);
  ydn.social.MetaContact.fetchByEmail(context.getEmail()).addCallbacks(function(me) {
    if (me && me.hasData()) {
      ydn.crm.msg.Manager.setStatus(mid, 'Social data for ' + email + ' applied.');
      this.fillByMetaContact(me);
    } else {
      ydn.crm.msg.Manager.setStatus(mid, 'Social data for ' + email + ' not available, ' +
          'dispatching crawlers now.');
    }
  }, function(e) {
    var msg = e.message ? e.message : e;
    ydn.crm.msg.Manager.setStatus(mid, 'Fail request due to ' + msg);
  }, this);
};


/**
 * @override
 */
ydn.crm.sugarcrm.ui.NewRecord.prototype.getNewModuleList = function() {
  return ydn.crm.sugarcrm.CacheModules;
};


/**
 * @override
 */
ydn.crm.sugarcrm.ui.NewRecord.prototype.getDuplicateModuleList = function() {
  return [];
};


/**
 * @override
 */
ydn.crm.sugarcrm.ui.NewRecord.prototype.setEditMode = function(val) {
  goog.base(this, 'setEditMode', true);
};
