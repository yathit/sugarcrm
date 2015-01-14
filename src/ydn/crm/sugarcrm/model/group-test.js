goog.provide('ydn.crm.sugarcrm.model.GroupTest');
goog.setTestOnly('ydn.crm.sugarcrm.model.GroupTest');

goog.require('goog.testing.asserts');
goog.require('goog.testing.jsunit');
goog.require('ydn.crm.sugarcrm.model.Record');
goog.require('ydn.crm.sugarcrm.model.Sugar');
goog.require('ydn.crm.test');


function setUp() {
  ydn.crm.test.initPipe();
}


function test_tasks_appointment() {
  var record = ydn.crm.test.createRecord(null, 'Tasks');
  var group = record.getGroupModel('appointment');
  assertTrue('date_start', group.hasField('date_start'));
  assertTrue('date_due', group.hasField('date_due'));

}


function test_name() {
  var record = ydn.crm.test.createRecord(null, ydn.crm.sugarcrm.ModuleName.CASES);
  var model = record.getGroupModel('');
  assertTrue(model.hasField('name'));
}






