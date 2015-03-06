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
 * @fileoverview Record header render prominently at the top of record component
 * to show for quick identification, link to sugarcrm of the referring record
 * and additional editing capability not available in the record body component.
 *
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */


goog.provide('ydn.crm.su.ui.record.HeaderRenderer');
goog.require('goog.ui.CheckBoxMenuItem');
goog.require('goog.ui.ColorMenuButton');
goog.require('goog.ui.Css3ButtonRenderer');
goog.require('goog.ui.CustomButton');
goog.require('goog.ui.ToggleButton');
goog.require('goog.ui.Toolbar');
goog.require('goog.ui.decorate');
goog.require('ydn.crm.su.ui.events');
goog.require('ydn.crm.su.ui.setting.Field');



/**
 * Record header renderer.
 * @constructor
 * @struct
 */
ydn.crm.su.ui.record.HeaderRenderer = function() {
};
goog.addSingletonGetter(ydn.crm.su.ui.record.HeaderRenderer);


/**
 * @define {boolean} debug flag.
 */
ydn.crm.su.ui.record.HeaderRenderer.DEBUG = false;


/**
 * @protected
 * @type {goog.debug.Logger}
 */
ydn.crm.su.ui.record.HeaderRenderer.prototype.logger =
    goog.log.getLogger('ydn.crm.su.ui.record.HeaderRenderer');


/**
 * @param {ydn.crm.su.ui.record.Record} ctrl
 */
ydn.crm.su.ui.record.HeaderRenderer.prototype.reset = function(ctrl) {
  var ele_header = ctrl.getHeaderElement();
  var record = ctrl.getModel();
  var dom = ctrl.getDomHelper();
  var m_name = record.getModuleName();
  if (ydn.crm.su.ui.record.HeaderRenderer.DEBUG) {
    window.console.log('HeadRenderer:reset:' + m_name + ':' + record);
  }
  ele_header.innerHTML = '';
  ele_header.classList.add(ydn.crm.su.ui.record.CSS_HEADER);
  ele_header.classList.add(ydn.crm.ui.CSS_CLASS_FLEX_BAR);

  var title = dom.createDom('a', {
    'class': ydn.crm.su.ui.record.CSS_HEADER_TITLE + ' center',
    'data-tooltip': 'Open in SugarCRM'
  });

  var icon = dom.createDom('span', ydn.crm.su.ui.record.CSS_HEADER_ICON,
      ydn.crm.su.toModuleSymbol(m_name));

  var option_svg = ydn.crm.ui.createSvgIcon('menu');
  var option = dom.createDom('div', ydn.crm.su.ui.record.CSS_HEADER_EDIT,
      option_svg);
  option.classList.add('svg-button');

  ele_header.appendChild(icon);
  ele_header.appendChild(title);
  ele_header.appendChild(dom.createDom('div', 'center'));
  ele_header.appendChild(option);
};


/**
 * @param {ydn.crm.su.ui.record.Record} ctrl
 */
ydn.crm.su.ui.record.HeaderRenderer.prototype.refresh = function(ctrl) {

  var ele_header = ctrl.getHeaderElement();
  var record = ctrl.getModel();
  var m_name = record.getModuleName();
  if (ydn.crm.su.ui.record.HeaderRenderer.DEBUG) {
    window.console.log('HeadRenderer:refresh:' + m_name + ':' + record);
  }
  var ele_title = ele_header.querySelector('a.' + ydn.crm.su.ui.record.CSS_HEADER_TITLE);
  if (record.hasRecord()) {
    ele_title.textContent = record.getLabel();
    ele_title.href = record.getViewLink();
    ele_title.target = record.getDomain();
  } else {
    ele_title.innerHTML = '';
    ele_title.href = '';
  }
};


/**
 * Set record content dirty so that save button is enable.
 * @param {ydn.crm.su.ui.record.Record} ctrl
 * @param {boolean} val
 */
ydn.crm.su.ui.record.HeaderRenderer.prototype.setDirty = function(ctrl, val) {

};
