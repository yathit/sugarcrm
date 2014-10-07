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
ydn.crm.sugarcrm.ui.group.Name.prototype.getTemplateData = function() {

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
        value: model.getFieldAsValue('salutation'),
        listId: sal
      },
      {
        name: 'first_name',
        label: 'First name',
        type: 'text',
        value: model.getFieldAsValue('first_name')
      },
      {
        name: 'last_name',
        label: 'Last name',
        type: 'text',
        value: model.getFieldAsValue('last_name')
      }
    ];
  } else {
    data = [{
      name: 'name',
      label: 'Name',
      type: 'text',
      value: model.getFieldAsValue('name')
    }];
  }

  return {
    fields: data
  };
};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.ui.group.Name.prototype.collectData = function() {
  var model = this.getModel();
  var value = this.getInputValue();
  var org_value = model.getGroupValue();
  if (value == org_value) {
    // HACK: Since our parsing is not reliable, we check the input value is
    // tempered or not. If not, we just skip.
    // NOTE: Name may change via, popup dialog as well.
    if (ydn.crm.sugarcrm.ui.group.Name.DEBUG) {
      window.console.log('Name:collectData:No change');
    }
    return null;
  }
  if (!model.hasField('full_name')) {
    return {
      'name': value
    };
  }
  var new_value = model.parseFullNameLabel(value);
  var sal = model.getFieldValue('salutation');
  var first_name = model.getFieldValue('first_name');
  var last_name = model.getFieldValue('last_name');
  var full_name = model.getFieldValue('full_name');
  var has_changed = sal != new_value['salutation'] ||
      first_name != new_value['first_name'] ||
      last_name != new_value['last_name'] ||
      full_name != new_value['full_name'];
  var out = has_changed ? new_value : null;
  if (ydn.crm.sugarcrm.ui.group.Name.DEBUG) {
    window.console.log('Name:collectData', out);
  }
  return out;
};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.ui.group.Name.prototype.simulateEditByField = function(name, value) {
  if (name == 'full_name' || name == 'name') {
    goog.base(this, 'simulateEditByField', null, value);
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
