// Copyright 2015 YDN Authors. All Rights Reserved.
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
 * @fileoverview Hovercard showing record detail on hovering on LI element
 * which has attribute of 'data-id' and 'data-module' to represent respective
 * record.
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */

goog.provide('ydn.crm.su.ui.record.HoverCard');
goog.require('goog.ui.HoverCard');
goog.require('templ.ydn.crm.su');
goog.require('ydn.crm.su.ui.record.Record');



/**
 * Hovercard showing record detail.
 * @param {ydn.crm.su.model.Sugar} sugar
 * @param {Element} ul
 * @param {goog.dom.DomHelper=} opt_dom
 * @constructor
 * @struct
 * @extends {goog.ui.HoverCard}
 * @suppress {checkStructDictInheritance} suppress closure-library code.
 */
ydn.crm.su.ui.record.HoverCard = function(sugar, ul, opt_dom) {
  var trigger = /** @type {Document} */(/** @type {*} */(ul));
  goog.base(this, {'LI': 'data-id'}, true, opt_dom, trigger);

  var el = goog.soy.renderAsElement(templ.ydn.crm.su.hoverCard);

  var r = new ydn.crm.su.Record(sugar.getDomain(), ydn.crm.su.DEFAULT_MODULE);
  var record = new ydn.crm.su.model.Record(sugar, r);
  /**
   * @type {ydn.crm.su.ui.record.Record}
   * @private
   */
  this.record_ = new ydn.crm.su.ui.record.Record(record, opt_dom);

  var content = el.querySelector('.secondary-hovercard-content');
  this.record_.render(content);

  this.setElement(el);
  this.setPinnedCorner(goog.positioning.Corner.TOP_RIGHT);
};
goog.inherits(ydn.crm.su.ui.record.HoverCard, goog.ui.HoverCard);


/**
 * @return {ydn.crm.su.model.Record}
 * @protected
 */
ydn.crm.su.ui.record.HoverCard.prototype.getRecord = function() {
  return this.record_.getModel();
};


/**
 * @return {ydn.msg.Channel} sugar channel.
 * @protected
 */
ydn.crm.su.ui.record.HoverCard.prototype.getChannel = function() {
  return this.record_.getModel().getChannel();
};


/**
 * @return {string} domain.
 * @protected
 */
ydn.crm.su.ui.record.HoverCard.prototype.getDomain = function() {
  return this.record_.getModel().getDomain();
};


/**
 * @param {ydn.crm.su.ModuleName} mn module name.
 * @param {string} id record id.
 */
ydn.crm.su.ui.record.HoverCard.prototype.refreshRecord = function(mn, id) {
  var model = this.getRecord();
  if (!model.isNew() && model.getId() == id) {
    return;
  }
  if (!mn || !id) {
    throw new Error('Invalid id');
  }
  var q = {
    'store': mn,
    'key': id
  };
  this.getChannel().send(ydn.crm.ch.SReq.QUERY, [q]).addCallbacks(function(x) {
    var res = /** @type {CrmApp.QueryResult} */(x[0]);
    if (res.result[0]) {
      var record = new ydn.crm.su.Record(this.getDomain(), mn, res.result[0]);
      model.setRecord(record);
    }
  }, function(e) {
    window.console.error(e);
  }, this);
};

