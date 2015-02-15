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
 * @fileoverview Secondary record panel show records which is related to
 * given parent record.
 *
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */


goog.provide('ydn.crm.su.ui.record.Secondary');
goog.require('ydn.db.KeyRange');



/**
 * Secondary record panel
 * @param {ydn.crm.su.model.Record} model
 * @param {goog.dom.DomHelper=} opt_dom
 * @constructor
 * @struct
 * @extends {goog.ui.Component}
 * @suppress {checkStructDictInheritance} suppress closure-library code.
 */
ydn.crm.su.ui.record.Secondary = function(model, opt_dom) {
  goog.base(this, opt_dom);
  this.setModel(model);
};
goog.inherits(ydn.crm.su.ui.record.Secondary, goog.ui.Component);


/**
 * @define {boolean} debug flag.
 */
ydn.crm.su.ui.record.Secondary.DEBUG = false;


/**
 * @return {ydn.crm.su.model.Record}
 * @override
 */
ydn.crm.su.ui.record.Secondary.prototype.getModel;


/**
 * @const
 * @type {string} CSS class name for secondary records panel.
 */
ydn.crm.su.ui.record.Secondary.CSS_CLASS = 'secondary';


/** @return {string} */
ydn.crm.su.ui.record.Secondary.prototype.getCssClass = function() {
  return ydn.crm.su.ui.record.Secondary.CSS_CLASS;
};


/**
 * @inheritDoc
 */
ydn.crm.su.ui.record.Secondary.prototype.createDom = function() {
  goog.base(this, 'createDom');
  var root = this.getElement();
  root.classList.add(this.getCssClass());
};


/**
 * Attach child to the panel.
 * @param {!ydn.crm.su.Record} r
 */
ydn.crm.su.ui.record.Secondary.prototype.attachChild = function(r) {
  var sugar = this.getModel().getSugar();
  var child_panel = this.getChildByRecordId(r.getId());
  if (child_panel) {
    var model = child_panel.getModel();
    model.setRecord(r);
  } else {
    var record_model = new ydn.crm.su.model.Record(sugar, r);
    child_panel = new ydn.crm.su.ui.record.Record(record_model, this.getDomHelper());
    child_panel.setEnableSecondary(ydn.crm.su.ui.record.Record.EnableSecondary.DISABLED);
    this.addChild(child_panel, true);
  }
};


/**
 * Reset
 */
ydn.crm.su.ui.record.Secondary.prototype.reset = function() {
  this.disposeChildren();
  var root = this.getElement();
  var data_id = root.removeAttribute('data-id');
};


/**
 * Remove all children and dispose them.
 * @protected
 */
ydn.crm.su.ui.record.Secondary.prototype.disposeChildren = function() {
  while (this.hasChildren()) {
    var child = this.getChildAt(0);
    this.removeChild(child, true);
    child.dispose();
  }
};


/**
 * @const
 * @type {boolean}
 */
ydn.crm.su.ui.record.Secondary.SHOW_EMBEDDED = false;


/**
 * Get child component by record id.
 * @param {string} id
 * @return {ydn.crm.su.ui.record.Record}
 */
ydn.crm.su.ui.record.Secondary.prototype.getChildByRecordId = function(id) {
  for (var i = 0; i < this.getChildCount(); i++) {
    var child = /** @type {ydn.crm.su.ui.record.Record} */(this.getChildAt(i));
    var model = /** @type {ydn.crm.su.model.Record} */(child.getModel());
    if (model && !model.isNew() && model.getId() == id) {
      return child;
    }
  }
  return null;
};


/**
 * Add embedded children components.
 * @private
 */
ydn.crm.su.ui.record.Secondary.prototype.addEmbeddedChildren_ = function() {
  /**
   * @type {ydn.crm.su.model.Record}
   */
  var model = this.getModel();
  model.listEmbedded().addCallbacks(function(arr) {
    for (var i = 0; i < arr.length; i++) {
      var r = /** @type {!SugarCrm.Record} */(arr[i]);
      var mn = /** @type {ydn.crm.su.ModuleName} */ (r._module);
      this.attachChild(new ydn.crm.su.Record(model.getDomain(), mn, r));
    }
  }, function(e) {
    window.console.error(e);
  }, this);
};


/**
 * Add children components from relationships.
 * @private
 */
ydn.crm.su.ui.record.Secondary.prototype.addRelationChildren_ = function() {
  /**
   * @type {ydn.crm.su.model.Record}
   */
  var model = this.getModel();
  model.listRelated().addProgback(function(arr) {
    if (ydn.crm.su.ui.record.Secondary.DEBUG) {
      window.console.log(arr);
    }
    if (!arr) {
      return;
    }
    for (var i = 0; i < arr.length; i++) {
      var r = /** @type {!SugarCrm.Record} */(arr[i]);
      var mn = /** @type {ydn.crm.su.ModuleName} */ (r._module);
      this.attachChild(new ydn.crm.su.Record(model.getDomain(), mn, r));
    }
  }, this);
};


/**
 * Refresh UI.
 */
ydn.crm.su.ui.record.Secondary.prototype.refresh = function() {

  /**
   * @type {ydn.crm.su.model.Record}
   */
  var model = this.getModel();

  if (!model.isNew()) {
    var root = this.getElement();
    var data_id = root.getAttribute('data-id');
    if (data_id == model.getId()) {
      return;
    }
    root.setAttribute('data-id', model.getId());
    this.disposeChildren();
    if (ydn.crm.su.ui.record.Secondary.SHOW_EMBEDDED) {
      this.addEmbeddedChildren_();
    }
    this.addRelationChildren_();
  }
};

