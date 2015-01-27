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
 * New record creation panel is displayed when search event received but
 * there is no existing data in SugarCRM or Gmail contact.
 * This component listen @see {ydn.crm.su.model.events.ContextChangeEvent}
 * from the model for user interaction.
 *
 * This panel does not have search UI.
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */


goog.provide('ydn.crm.su.ui.NewRecord');
goog.require('ydn.crm.su.ui.record.Record');



/**
 * New record create panel.
 * @param {ydn.crm.su.model.Record} model
 * @param {goog.dom.DomHelper=} opt_dom
 * @constructor
 * @struct
 * @extends {ydn.crm.su.ui.record.Record}
 */
ydn.crm.su.ui.NewRecord = function(model, opt_dom) {
  goog.base(this, model, opt_dom);
};
goog.inherits(ydn.crm.su.ui.NewRecord, ydn.crm.su.ui.record.Record);


/**
 * @define {boolean} debug flag.
 */
ydn.crm.su.ui.NewRecord.DEBUG = false;


/**
 * @const
 * @type {string}
 */
ydn.crm.su.ui.NewRecord.CSS_CLASS = 'new-record';


/**
 * @override
 */
ydn.crm.su.ui.NewRecord.prototype.getCssClass = function() {
  return goog.base(this, 'getCssClass') + ' ' + ydn.crm.su.ui.NewRecord.CSS_CLASS;
};


/**
 * @inheritDoc
 */
ydn.crm.su.ui.NewRecord.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  var model = this.getModel();
  this.getHandler().listen(model.parent, ydn.crm.su.model.events.Type.CONTEXT_CHANGE,
      this.onContextChange_);
  this.setEditMode(true);
};


/**
 * @private
 * @param {ydn.crm.su.model.events.ContextChangeEvent} e
 */
ydn.crm.su.ui.NewRecord.prototype.onContextChange_ = function(e) {
  var model = this.getModel();
  if (e.record || e.gdata) {
    // hide this new record creation panel.
    goog.style.setElementShown(this.getElement(), false);
    if (ydn.crm.su.ui.NewRecord.DEBUG) {
      var ms = e.record ? ' record' : ' ';
      if (e.gdata) {
        ms += ' gdata';
      }
      window.console.info(this + ' hiding on context change since ' + ms + ' exists');
    }
  } else {

    var record = new ydn.crm.su.Record(model.getDomain(), model.getModuleName());
    model.setRecord(record);
    this.setEditMode(true);
    if (e.context && e.context.kind == ydn.crm.inj.Context.Kind.SEARCH) {
      var email = e.context.getEmail() || '';
      var full_name = e.context.getFullName() || '';
      var patch = {
        'email1': email,
        'full_name': full_name
      };
      this.simulateEdit(patch);
      this.socialFill(e.context);
      goog.style.setElementShown(this.getElement(), true);
      if (ydn.crm.su.ui.NewRecord.DEBUG) {
        window.console.info(this + ' show on context change for ' +
            (email || full_name));
      }
    } else {
      goog.style.setElementShown(this.getElement(), false);
      if (ydn.crm.su.ui.NewRecord.DEBUG) {
        if (!e.context) {
          window.console.info(this + ' hiding on context change for null context');
        } else {
          window.console.info(this + ' hiding on context change on none-search');
        }
      }
    }
  }
};


/**
 * Update UI inputs with social data.
 * @param {?ydn.crm.inj.Context} context
 */
ydn.crm.su.ui.NewRecord.prototype.socialFill = function(context) {
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
ydn.crm.su.ui.NewRecord.prototype.getNewModuleList = function() {
  return ydn.crm.su.EDITABLE_MODULES;
};


/**
 * @override
 */
ydn.crm.su.ui.NewRecord.prototype.getDuplicateModuleList = function() {
  return [];
};


/**
 * @override
 */
ydn.crm.su.ui.NewRecord.prototype.setEditMode = function(val) {
  goog.base(this, 'setEditMode', true);
};

if (goog.DEBUG) {
  /**
   * @override
   */
  ydn.crm.su.ui.NewRecord.prototype.toString = function() {
    return 'NewRecord';
  };
}
