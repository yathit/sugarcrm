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
 * @fileoverview Secondary record panel show records which is link to
 * given parent record.
 *
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */


goog.provide('ydn.crm.sugarcrm.ui.record.Secondary');
goog.require('ydn.db.KeyRange');



/**
 * Secondary record panel
 * @param {ydn.crm.sugarcrm.model.Record} model
 * @param {goog.dom.DomHelper=} opt_dom
 * @constructor
 *  @struct
 * @extends {goog.ui.Component}
 * @suppress {checkStructDictInheritance} suppress closure-library code.
 */
ydn.crm.sugarcrm.ui.record.Secondary = function(model, opt_dom) {
  goog.base(this, opt_dom);
  this.setModel(model);
};
goog.inherits(ydn.crm.sugarcrm.ui.record.Secondary, goog.ui.Component);


/**
 * @return {ydn.crm.sugarcrm.model.Record}
 * @override
 */
ydn.crm.sugarcrm.ui.record.Secondary.prototype.getModel;


/**
 * @const
 * @type {string} CSS class name for secondary records panel.
 */
ydn.crm.sugarcrm.ui.record.Secondary.CSS_CLASS = 'secondary';


/** @return {string} */
ydn.crm.sugarcrm.ui.record.Secondary.prototype.getCssClass = function() {
  return ydn.crm.sugarcrm.ui.record.Secondary.CSS_CLASS;
};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.ui.record.Secondary.prototype.createDom = function() {
  goog.base(this, 'createDom');
  var root = this.getElement();
  root.classList.add(this.getCssClass());
};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.ui.record.Secondary.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  var model = this.getModel();
  if (model.isPrimary()) {
    var hd = this.getHandler();
    hd.listen(model, ydn.crm.sugarcrm.model.events.Type.MODULE_CHANGE, this.handleChanged);
    hd.listen(model, ydn.crm.sugarcrm.model.events.Type.RECORD_CHANGE, this.handleChanged);
    this.handleChanged(null);
  }
};


/**
 * Attach child to the panel.
 * @param {!ydn.crm.sugarcrm.Record} r
 */
ydn.crm.sugarcrm.ui.record.Secondary.prototype.attachChild = function(r) {
  var sugar = this.getModel().getSugar();
  var record_model = new ydn.crm.sugarcrm.model.Record(sugar, r);
  var child_panel = new ydn.crm.sugarcrm.ui.record.Record(record_model, this.getDomHelper());
  this.addChild(child_panel, true);
};


/**
 * @protected
 * @param {*} e
 */
ydn.crm.sugarcrm.ui.record.Secondary.prototype.handleChanged = function(e) {
  while (this.hasChildren()) {
    var child = this.getChildAt(0);
    this.removeChild(child, true);
    child.dispose();
  }
  /**
   * @type {ydn.crm.sugarcrm.model.Record}
   */
  var model = this.getModel();
  if (!model.isNew()) {
    var sugar = model.getSugar();
    var req = ydn.crm.Ch.SReq.QUERY;
    var query = [{
      'store': ydn.crm.sugarcrm.ModuleName.NOTES,
      'index': 'parent',
      'reverse': true,
      'keyRange': ydn.db.KeyRange.starts([model.getModuleName(), model.getId()])
    }];
    sugar.send(req, query).addCallbacks(function(x) {
      var arr = /** @type {Array.<CrmApp.QueryResult>} */ (x);
      for (var i = 0; i < arr.length; i++) {
        /**
         * @type {CrmApp.QueryResult}
         */
        var q = arr[i];
        if (q.result && q.result.length > 0) {
          // window.console.log(q);
          var obj = /** @type {SugarCrm.Record} */ (q.result[0]);
          var r = new ydn.crm.sugarcrm.Record(sugar.getDomain(), ydn.crm.sugarcrm.ModuleName.NOTES, obj);
          this.attachChild(r);
        }
      }
    }, function(e) {
      throw e;
    }, this);
  }
};

