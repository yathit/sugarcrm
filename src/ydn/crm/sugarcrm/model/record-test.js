goog.provide('ydn.crm.sugarcrm.model.RecordTest');
goog.setTestOnly('ydn.crm.sugarcrm.model.RecordTest');

goog.require('goog.testing.asserts');
goog.require('goog.testing.jsunit');
goog.require('ydn.crm.sugarcrm.model.Record');
goog.require('ydn.crm.sugarcrm.model.Sugar');
goog.require('ydn.crm.test');


function setUp() {
  ydn.crm.test.initPipe();
}


function test_record_update_event() {
  var sugar = ydn.crm.test.createSugar();
  var data = ydn.crm.test.createContactSugarCrmRecord();
  var r = new ydn.crm.sugarcrm.Record(sugar.getDomain(),
      ydn.crm.sugarcrm.ModuleName.CONTACTS, data);
  var record = new ydn.crm.sugarcrm.model.Record(sugar, r);
  var ev = null;
  goog.events.listen(record, [ydn.crm.sugarcrm.model.events.Type.RECORD_UPDATE,
    ydn.crm.sugarcrm.model.events.Type.RECORD_CHANGE,
    ydn.crm.sugarcrm.model.events.Type.MODULE_CHANGE], function(e) {
    ev = e;
  });
  var data2 = ydn.crm.test.createContactSugarCrmRecord();
  data2.name = 'New Name';
  var r2 = new ydn.crm.sugarcrm.Record(sugar.getDomain(),
      ydn.crm.sugarcrm.ModuleName.CONTACTS, data2);
  record.setRecord(r2);
  assertNotNull('event called', ev);
  assertEquals('event type', ydn.crm.sugarcrm.model.events.Type.RECORD_UPDATE, ev.type);
}


function test_record_change_event() {
  var sugar = ydn.crm.test.createSugar();
  var data = ydn.crm.test.createContactSugarCrmRecord();
  var r = new ydn.crm.sugarcrm.Record(sugar.getDomain(),
      ydn.crm.sugarcrm.ModuleName.CONTACTS, data);
  var record = new ydn.crm.sugarcrm.model.Record(sugar, r);
  var ev = null;
  goog.events.listen(record, [ydn.crm.sugarcrm.model.events.Type.RECORD_UPDATE,
    ydn.crm.sugarcrm.model.events.Type.RECORD_CHANGE,
    ydn.crm.sugarcrm.model.events.Type.MODULE_CHANGE], function(e) {
    ev = e;
  });
  var data2 = ydn.crm.test.createContactSugarCrmRecord();
  data2.name = 'New Name';
  data2.id = data2.id += '1';
  var r2 = new ydn.crm.sugarcrm.Record(sugar.getDomain(),
      ydn.crm.sugarcrm.ModuleName.CONTACTS, data2);
  record.setRecord(r2);
  assertNotNull('event called', ev);
  assertEquals('event type', ydn.crm.sugarcrm.model.events.Type.RECORD_CHANGE, ev.type);
}


function test_module_change_event() {
  var sugar = ydn.crm.test.createSugar();
  var data = ydn.crm.test.createContactSugarCrmRecord();
  var r = new ydn.crm.sugarcrm.Record(sugar.getDomain(),
      ydn.crm.sugarcrm.ModuleName.CONTACTS, data);
  var record = new ydn.crm.sugarcrm.model.Record(sugar, r);
  var ev = null;
  goog.events.listen(record, [ydn.crm.sugarcrm.model.events.Type.RECORD_UPDATE,
    ydn.crm.sugarcrm.model.events.Type.RECORD_CHANGE,
    ydn.crm.sugarcrm.model.events.Type.MODULE_CHANGE], function(e) {
    ev = e;
  });
  var data2 = ydn.crm.test.createContactSugarCrmRecord();
  data2.name = 'New Name';
  var r2 = new ydn.crm.sugarcrm.Record(sugar.getDomain(),
      ydn.crm.sugarcrm.ModuleName.LEADS, data2);
  record.setRecord(r2);
  assertNotNull('event called', ev);
  assertEquals('event type', ydn.crm.sugarcrm.model.events.Type.MODULE_CHANGE, ev.type);
}


function test_null_module_change_event() {
  var sugar = ydn.crm.test.createSugar();
  var data = ydn.crm.test.createContactSugarCrmRecord();
  var r = new ydn.crm.sugarcrm.Record(sugar.getDomain(),
      ydn.crm.sugarcrm.ModuleName.CONTACTS, data);
  var record = new ydn.crm.sugarcrm.model.Record(sugar, r);
  var ev = null;
  goog.events.listen(record, [ydn.crm.sugarcrm.model.events.Type.RECORD_UPDATE,
    ydn.crm.sugarcrm.model.events.Type.RECORD_CHANGE,
    ydn.crm.sugarcrm.model.events.Type.MODULE_CHANGE], function(e) {
    ev = e;
  });
  var r2 = new ydn.crm.sugarcrm.Record(sugar.getDomain(),
      ydn.crm.sugarcrm.ModuleName.LEADS, null);
  record.setRecord(r2);
  assertNotNull('event called', ev);
  assertEquals('event type', ydn.crm.sugarcrm.model.events.Type.MODULE_CHANGE, ev.type);
}

