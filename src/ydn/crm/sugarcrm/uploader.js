// Copyright 2014 YDN Authors. All Rights Reserved.
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
 * @fileoverview Upload attachment to email or document.
 *                                                 `
 * @author kyawtun@yathit.com (Kyaw Tun)
 */


goog.provide('ydn.crm.su.Uploader');



/**
 * Upload attachment to email or document.
 * @param {ydn.crm.su.model.Sugar} sugar
 * @constructor
 */
ydn.crm.su.Uploader = function(sugar) {
  /**
   * @type {ydn.crm.su.model.Sugar}
   * @private
   */
  this.sugar_ = sugar;

};


/**
 * Upload attachment as specified by upload button element. The button element
 * has `data-filename` attribute, which is `messageId/filename`.
 * @param {Element} btn
 */
ydn.crm.su.Uploader.prototype.attach = function(btn) {
  var file_name = btn.getAttribute('data-filename');
  if (goog.DEBUG && !file_name) {
    throw new Error('Given element is not a attachment button element');
  }
};

