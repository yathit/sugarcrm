/**
 * @fileoverview Panel for name group fields.
 *
 * This module provide adding, linking and syncing.
 */


goog.provide('ydn.crm.sugarcrm.ui.group.Name');
goog.require('ydn.crm.sugarcrm');
goog.require('ydn.crm.sugarcrm.model.NameGroup');
goog.require('ydn.crm.sugarcrm.ui.group.Expander');



/**
 * Panel for name group fields.
 * @param {ydn.crm.sugarcrm.model.NameGroup} model
 * @param {goog.dom.DomHelper=} opt_dom
 * @constructor
 * @struct
 * @extends {ydn.crm.sugarcrm.ui.group.Expander}
 */
ydn.crm.sugarcrm.ui.group.Name = function(model, opt_dom) {
  goog.base(this, model, opt_dom);
};
goog.inherits(ydn.crm.sugarcrm.ui.group.Name, ydn.crm.sugarcrm.ui.group.Expander);


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
 * @protected
 * @return {*}
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
ydn.crm.sugarcrm.ui.group.Name.prototype.fillByMetaContact = function(meta) {
  throw new Error('Not impl');
};
