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


goog.provide('ydn.crm.sugarcrm.ui.record.HeaderRenderer');
goog.require('goog.ui.CheckBoxMenuItem');
goog.require('goog.ui.ColorMenuButton');
goog.require('goog.ui.Css3ButtonRenderer');
goog.require('goog.ui.CustomButton');
goog.require('goog.ui.ToggleButton');
goog.require('goog.ui.Toolbar');
goog.require('goog.ui.decorate');
goog.require('ydn.crm.sugarcrm.ui.events');
goog.require('ydn.crm.sugarcrm.ui.setting.Field');



/**
 * Record header renderer.
 * @constructor
 * @struct
 */
ydn.crm.sugarcrm.ui.record.HeaderRenderer = function() {
};
goog.addSingletonGetter(ydn.crm.sugarcrm.ui.record.HeaderRenderer);


/**
 * @define {boolean} debug flag.
 */
ydn.crm.sugarcrm.ui.record.HeaderRenderer.DEBUG = false;


/**
 * @const
 * @type {string} CSS class name for secondary records panel.
 */
ydn.crm.sugarcrm.ui.record.HeaderRenderer.CSS_CLASS = 'record-header';


/**
 * @const
 * @type {string}
 */
ydn.crm.sugarcrm.ui.record.HeaderRenderer.CSS_CLASS_TITLE = 'title';


/**
 * @const
 * @type {string}
 */
ydn.crm.sugarcrm.ui.record.HeaderRenderer.CSS_CLASS_ICON = 'icon';


/**
 * @const
 * @type {string}
 */
ydn.crm.sugarcrm.ui.record.HeaderRenderer.CSS_CLASS_SYNCED = 'synced';


/**
 * @const
 * @type {string}
 */
ydn.crm.sugarcrm.ui.record.HeaderRenderer.CSS_CLASS_EDIT = 'edit-button';


/**
 * @protected
 * @type {goog.debug.Logger}
 */
ydn.crm.sugarcrm.ui.record.HeaderRenderer.prototype.logger =
    goog.log.getLogger('ydn.crm.sugarcrm.ui.record.HeaderRenderer');


/**
 * @param {ydn.crm.sugarcrm.ui.record.Record} ctrl
 */
ydn.crm.sugarcrm.ui.record.HeaderRenderer.prototype.reset = function(ctrl) {
  var ele_header = ctrl.getHeaderElement();
  var record = ctrl.getModel();
  var dom = ctrl.getDomHelper();
  var m_name = record.getModuleName();
  if (ydn.crm.sugarcrm.ui.record.HeaderRenderer.DEBUG) {
    window.console.log('HeadRenderer:reset:' + m_name + ':' + record);
  }
  ele_header.innerHTML = '';
  ele_header.classList.add(ydn.crm.sugarcrm.ui.record.HeaderRenderer.CSS_CLASS);
  ele_header.classList.add(ydn.crm.ui.CSS_CLASS_FLEX_BAR);

  var title = dom.createDom('a', {
    'class': ydn.crm.sugarcrm.ui.record.HeaderRenderer.CSS_CLASS_TITLE + ' center',
    'title': 'Open in SugarCRM'
  });

  var icon = dom.createDom('span', ydn.crm.sugarcrm.ui.record.HeaderRenderer.CSS_CLASS_ICON,
      ydn.crm.sugarcrm.toModuleSymbol(m_name));

  var option_svg = ydn.crm.ui.createSvgIcon('menu');
  var option = dom.createDom('div', ydn.crm.sugarcrm.ui.record.HeaderRenderer.CSS_CLASS_EDIT,
      option_svg);
  option.classList.add('svg-button');

  ele_header.appendChild(icon);
  ele_header.appendChild(title);
  ele_header.appendChild(dom.createDom('div', 'center'));
  ele_header.appendChild(option);
};


/**
 * @param {ydn.crm.sugarcrm.ui.record.Record} ctrl
 */
ydn.crm.sugarcrm.ui.record.HeaderRenderer.prototype.refresh = function(ctrl) {

  var ele_header = ctrl.getHeaderElement();
  var record = ctrl.getModel();
  var m_name = record.getModuleName();
  if (ydn.crm.sugarcrm.ui.record.HeaderRenderer.DEBUG) {
    window.console.log('HeadRenderer:refresh:' + m_name + ':' + record);
  }
  var ele_title = ele_header.querySelector('a.' + ydn.crm.sugarcrm.ui.record.HeaderRenderer.CSS_CLASS_TITLE);
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
 * @param {ydn.crm.sugarcrm.ui.record.Record} ctrl
 * @param {boolean} val
 */
ydn.crm.sugarcrm.ui.record.HeaderRenderer.prototype.setDirty = function(ctrl, val) {

};
