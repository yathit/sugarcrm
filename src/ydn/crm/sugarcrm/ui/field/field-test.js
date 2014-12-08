goog.provide('ydn.crm.sugarcrm.ui.field.FieldTest');
goog.setTestOnly('ydn.crm.sugarcrm.ui.field.FieldTest');

goog.require('goog.testing.asserts');
goog.require('goog.testing.jsunit');
goog.require('ydn.crm.sugarcrm.model.Sugar');
goog.require('ydn.crm.sugarcrm.ui.field.Field');
goog.require('ydn.crm.test');


function setUp() {
  ydn.crm.test.initPipe();
}



function test_bool_rendering() {

  var record = ydn.crm.test.createContactRecord();
  var group = record.getGroupModel('');
  var field = group.createOrGetFieldModel('my_favorite');
  var panel = new ydn.crm.sugarcrm.ui.field.Field(field);
  panel.render(document.body);

  assertFalse('original value', panel.getValue());
  assertNull('field value not change', panel.collectData());

}


function test_bool_rendering_default(queue) {

  var record = ydn.crm.test.createContactRecord(null, {});
  var group = record.getGroupModel('');
  var field = group.createOrGetFieldModel('my_favorite');
  var panel = new ydn.crm.sugarcrm.ui.field.Field(field);
  panel.render(document.body);

  assertUndefined('original value', panel.getValue());
  assertNull('field value not change', panel.collectData());

}


