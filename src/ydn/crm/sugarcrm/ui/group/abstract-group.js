/**
 * @fileoverview Group controller.
 *
 * Group controller manage changes in filed of the records.
 */


goog.provide('ydn.crm.su.ui.group.AbstractGroup');
goog.require('ydn.crm.su');
goog.require('ydn.crm.su.model.Group');
goog.require('ydn.crm.su.ui.group.GroupRenderer');
goog.require('ydn.crm.ui.UserSetting');
goog.require('ydn.social.MetaContact');



/**
 * Group controller.
 * @param {ydn.crm.su.model.BaseGroup} model
 * @param {goog.dom.DomHelper=} opt_dom
 * @constructor
 * @struct
 * @extends {goog.ui.Component}
 */
ydn.crm.su.ui.group.AbstractGroup = function(model, opt_dom) {
  goog.base(this, opt_dom);
  this.setModel(model);
};
goog.inherits(ydn.crm.su.ui.group.AbstractGroup, goog.ui.Component);


/**
 * @define {boolean} debug flag.
 */
ydn.crm.su.ui.group.AbstractGroup.DEBUG = false;


/**
 * @return {ydn.crm.su.model.BaseGroup}
 * @override
 */
ydn.crm.su.ui.group.AbstractGroup.prototype.getModel;


/**
 * Get group name.
 * @return {string}
 */
ydn.crm.su.ui.group.AbstractGroup.prototype.getGroupName = function() {
  return this.getModel().getGroupName();
};


/**
 * @return {!ydn.crm.su.ui.setting.Setting}
 */
ydn.crm.su.ui.group.AbstractGroup.prototype.getSetting = function() {
  return new ydn.crm.su.ui.setting.Group(this.getModel().getModuleName(),
      this.getGroupName());
};


/**
 * @inheritDoc
 */
ydn.crm.su.ui.group.AbstractGroup.prototype.getContentElement = function() {
  return this.getElement().querySelector('.' + ydn.crm.ui.CSS_CLASS_CONTENT);
};


/**
 * Check if user has change the data.
 * @return {boolean}
 */
ydn.crm.su.ui.group.AbstractGroup.prototype.hasChanged = function() {
  var data = this.collectData();
  return !!data;
};


/**
 * Collect data for sending to server.
 * @return {Object}
 * @see getPatch
 */
ydn.crm.su.ui.group.AbstractGroup.prototype.collectData = goog.abstractMethod;


/**
 * Collect data that user has changed.
 * @return {?Object} `null` if user does not change the data.
 * @see collectData
 */
ydn.crm.su.ui.group.AbstractGroup.prototype.getPatch = goog.abstractMethod;


/** @return {string} */
ydn.crm.su.ui.group.AbstractGroup.prototype.getCssClass = function() {
  return ydn.crm.su.ui.group.GroupRenderer.CSS_CLASS;
};


/**
 * Get normally hide status as display in DOM.
 * @return {?boolean}
 */
ydn.crm.su.ui.group.AbstractGroup.prototype.isNormallyHide = function() {
  var group = this.getElement();
  return group.classList.contains(ydn.crm.ui.CSS_CLASS_NORMALLY_HIDE);
};


/**
 * Update normally hide status in DOM.
 * Default is adding or removing 'normally-hide' class to 'record-group' Element.
 * @param {boolean} val status value.
 */
ydn.crm.su.ui.group.AbstractGroup.prototype.setNormallyHide = function(val) {
  var ele = this.getElement();
  if (val) {
    ele.classList.add(ydn.crm.ui.CSS_CLASS_NORMALLY_HIDE);
  } else {
    ele.classList.remove(ydn.crm.ui.CSS_CLASS_NORMALLY_HIDE);
  }
};


/**
 * @inheritDoc
 */
ydn.crm.su.ui.group.AbstractGroup.prototype.createDom = function() {
  var dom = this.getDomHelper();
  var root = dom.createDom('div', this.getCssClass());
  var head = dom.createDom('div', ydn.crm.su.ui.group.GroupRenderer.CSS_CLASS_HEADER);
  var content = dom.createDom('div', ydn.crm.ui.CSS_CLASS_CONTENT);
  root.appendChild(head);
  root.appendChild(content);
  this.setElementInternal(root);
  var model = this.getModel();
  var group_name = model.getGroupName();
  root.setAttribute('name', group_name);
  if (this.getSetting().getNormallyHide()) {
    root.classList.add(ydn.crm.ui.CSS_CLASS_NORMALLY_HIDE);
  }
};


/**
 * Refresh UI when record is updated
 */
ydn.crm.su.ui.group.AbstractGroup.prototype.refresh = function() {

};


/**
 * Refresh UI when record is changed with different ID.
 */
ydn.crm.su.ui.group.AbstractGroup.prototype.reset = function() {
  this.setNormallyHide(this.getSetting().getNormallyHide());
};


/**
 * Simulate user edit.
 * If input field is not found, edit is ignored.
 * @param {string} name
 * @param {string} value
 */
ydn.crm.su.ui.group.AbstractGroup.prototype.simulateEditByField = function(name, value) {
  var field_sel = name ? '[name="' + name + '"]' : '';
  var input = this.getContentElement().querySelector('div.field' + field_sel + ' input.value');
  if (input) {
    input.value = value;
  } else {
    var txt = this.getContentElement().querySelector('div.field' + field_sel + ' textarea.value');
    if (txt) {
      txt.textContent = value;
    } else {
      window.console.error('field ' + field_sel + ' not found in ' + this.getGroupName());
    }

  }
};


/**
 * Get field component by field name.
 * Subclass should override this, default implementation return null.
 * @param {string} name
 * @return {ydn.crm.su.ui.field.Field}
 */
ydn.crm.su.ui.group.AbstractGroup.prototype.getFieldByName = function(name) {
  return null;
};


/**
 * Fill up by meta contact data.
 * @param {ydn.social.MetaContact} meta
 * @return {boolean} true if updated.
 */
ydn.crm.su.ui.group.AbstractGroup.prototype.fillByMetaContact = function(meta) {
  return false;
};


/**
 * Check if in edit mode.
 * @return {boolean}
 */
ydn.crm.su.ui.group.AbstractGroup.prototype.isEditMode = function() {
  var pe = goog.dom.getAncestorByClass(this.getElement(),
      ydn.crm.su.ui.record.Body.CSS_CLASS);
  return pe.classList.contains(ydn.crm.ui.CSS_CLASS_EDIT);
};
