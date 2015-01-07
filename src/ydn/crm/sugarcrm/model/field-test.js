goog.provide('ydn.crm.sugarcrm.model.FieldTest');
goog.setTestOnly('ydn.crm.sugarcrm.model.FieldTest');

goog.require('goog.testing.asserts');
goog.require('goog.testing.jsunit');
goog.require('ydn.crm.sugarcrm.model.Record');
goog.require('ydn.crm.sugarcrm.model.Sugar');
goog.require('ydn.crm.test');


function setUp() {
  ydn.crm.test.initPipe();
}


function test_has_field_value_calls() {
  var record = ydn.crm.test.createRecord(null, 'Calls');
  var group = record.getGroupModel('name');
  assertTrue(group.hasFieldValue('name'));
  var name = group.createOrGetFieldModel('name');
  assertTrue('has name field', !!name);
  assertTrue(name.hasFieldValue());
}


function test_has_field_value_contact() {
  var record = ydn.crm.test.createRecord(null, 'Contacts');
  var obj = record.record.obj;
  var group = record.getGroupModel('email');
  var fields = group.listFields();
  assertTrue(group.hasFieldValue(fields[0]));
  assertTrue(group.hasFieldValue(fields[1]));

}







