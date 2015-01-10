/**
 * @fileoverview Panel for name group fields.
 *
 * This module provide adding, linking and syncing.
 */


goog.provide('ydn.crm.sugarcrm.ui.group.Name');
goog.require('ydn.crm.sugarcrm');
goog.require('ydn.crm.sugarcrm.model.NameGroup');
goog.require('ydn.crm.sugarcrm.ui.group.SimpleGroup');



/**
 * Panel for name group fields.
 * @param {ydn.crm.sugarcrm.model.NameGroup} model
 * @param {goog.dom.DomHelper=} opt_dom
 * @constructor
 * @struct
 * @extends {ydn.crm.sugarcrm.ui.group.SimpleGroup}
 */
ydn.crm.sugarcrm.ui.group.Name = function(model, opt_dom) {
  goog.base(this, model, null, opt_dom);
  /**
   * User edited value.
   * @type {?Object}
   * @private
   */
  this.patches_ = null;
};
goog.inherits(ydn.crm.sugarcrm.ui.group.Name, ydn.crm.sugarcrm.ui.group.SimpleGroup);


/**
 * @define {boolean} debug flag
 */
ydn.crm.sugarcrm.ui.group.Name.DEBUG = false;


/**
 * @return {ydn.crm.sugarcrm.model.NameGroup}
 * @override
 */
ydn.crm.sugarcrm.ui.group.Name.prototype.getModel;


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.ui.group.Name.prototype.getEditorTemplateData = function() {

  var model = this.getModel();
  var data;
  if (model.hasField('full_name')) {
    var sal = ydn.crm.sugarcrm.ui.field.FieldRenderer.getDataList(model.getModuleName(),
        model.getFieldInfo('salutation'));
    data = [
      {
        name: 'salutation',
        label: 'Salutation',
        type: 'enum',
        value: model.valueAsString('salutation'),
        listId: sal
      },
      {
        name: 'first_name',
        label: 'First name',
        type: 'text',
        value: model.valueAsString('first_name')
      },
      {
        name: 'last_name',
        label: 'Last name',
        type: 'text',
        value: model.valueAsString('last_name')
      }
    ];
  } else {
    data = [{
      name: 'name',
      label: 'Name',
      type: 'text',
      value: model.valueAsString('name')
    }];
  }

  return {
    fields: data
  };
};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.ui.group.Name.prototype.applyEditorChanges = function(ev) {
  if (!this.patches_) {
    this.patches_ = {};
  }
  for (var k in ev.patches) {
    this.patches_[k] = ev.patches[k];
  }
  var name = ydn.crm.sugarcrm.model.NameGroup.makeFullName(
      this.patches_['full_name'],
      this.patches_['first_name'],
      this.patches_['last_name']);
  this.setInputValue(name);
};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.ui.group.Name.prototype.collectData = function() {
  return this.patches_;
};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.ui.group.SimpleGroup.prototype.getPatch = function() {

};


/**
 * @param {Event} e
 * @protected
 */
ydn.crm.sugarcrm.ui.group.Name.prototype.handleInputBlur = function(e) {
  var value = this.getInputValue();
  var model = this.getModel();
  var patch = {
    'name': value
  };
  if (model.hasField('full_name')) {
    patch['full_name'] = value;
  }
  patch = model.pluck(patch);
  if (patch) {
    if (!this.patches_) {
      this.patches_ = {};
    }
    for (var k in patch) {
      this.patches_[k] = patch[k];
    }
    var ev = new ydn.crm.sugarcrm.ui.events.ChangedEvent(patch, this);
    this.dispatchEvent(ev);
  }
};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.ui.group.Name.prototype.fillByMetaContact = function(meta) {
  var value = this.getInputValue();
  var full_name = meta.getFullName();
  if (!value && !!full_name) {
    this.setInputValue(full_name);
    return true;
  }
  return false;
};
