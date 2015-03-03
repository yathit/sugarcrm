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



/**
 * Hovercard showing record detail.
 * @param {HTMLUListElement} ul
 * @param {goog.dom.DomHelper=} opt_dom
 * @constructor
 * @struct
 * @extends {goog.ui.HoverCard}
 * @suppress {checkStructDictInheritance} suppress closure-library code.
 */
ydn.crm.su.ui.record.HoverCard = function(ul, opt_dom) {
  var trigger = /** @type {Document} */(/** @type {*} */(ul));
  goog.base(this, {'LI': 'data-id'}, true, opt_dom, trigger);

  var el = goog.soy.renderAsElement(templ.ydn.crm.su.hoverCard);

  this.setElement(el);
  this.setPinnedCorner(goog.positioning.Corner.TOP_RIGHT);
};
goog.inherits(ydn.crm.su.ui.record.HoverCard, goog.ui.HoverCard);


/**
 * @param {ydn.crm.su.ModuleName} mn module name.
 * @param {string} id record id.
 */
ydn.crm.su.ui.record.HoverCard.prototype.refreshRecord = function(mn, id) {
  var el = this.getElement();
  var content = el.querySelector('.secondary-hovercard-content');
  content.textContent = id;
};

