goog.provide('ydn.crm.su.model.RecordTest');
goog.setTestOnly('ydn.crm.su.model.RecordTest');

goog.require('goog.testing.asserts');
goog.require('goog.testing.jsunit');
goog.require('ydn.crm.su.model.Record');
goog.require('ydn.crm.su.model.Sugar');
goog.require('ydn.crm.test');


function setUp() {
  ydn.crm.test.initPipe();
}


function test_record_update_event() {
  var sugar = ydn.crm.test.createSugar();
  var data = ydn.crm.test.createContactSugarCrmRecord();
  var r = new ydn.crm.su.Record(sugar.getDomain(),
      ydn.crm.su.ModuleName.CONTACTS, data);
  var record = new ydn.crm.su.model.Record(sugar, r);
  var ev = null;
  goog.events.listen(record, [ydn.crm.su.model.events.Type.RECORD_UPDATE,
    ydn.crm.su.model.events.Type.RECORD_CHANGE,
    ydn.crm.su.model.events.Type.MODULE_CHANGE], function(e) {
    ev = e;
  });
  var data2 = ydn.crm.test.createContactSugarCrmRecord();
  data2.name = 'New Name';
  var r2 = new ydn.crm.su.Record(sugar.getDomain(),
      ydn.crm.su.ModuleName.CONTACTS, data2);
  record.setRecord(r2);
  assertNotNull('event called', ev);
  assertEquals('event type', ydn.crm.su.model.events.Type.RECORD_UPDATE, ev.type);
}


function test_record_change_event() {
  var sugar = ydn.crm.test.createSugar();
  var data = ydn.crm.test.createContactSugarCrmRecord();
  var r = new ydn.crm.su.Record(sugar.getDomain(),
      ydn.crm.su.ModuleName.CONTACTS, data);
  var record = new ydn.crm.su.model.Record(sugar, r);
  var ev = null;
  goog.events.listen(record, [ydn.crm.su.model.events.Type.RECORD_UPDATE,
    ydn.crm.su.model.events.Type.RECORD_CHANGE,
    ydn.crm.su.model.events.Type.MODULE_CHANGE], function(e) {
    ev = e;
  });
  var data2 = ydn.crm.test.createContactSugarCrmRecord();
  data2.name = 'New Name';
  data2.id = data2.id += '1';
  var r2 = new ydn.crm.su.Record(sugar.getDomain(),
      ydn.crm.su.ModuleName.CONTACTS, data2);
  record.setRecord(r2);
  assertNotNull('event called', ev);
  assertEquals('event type', ydn.crm.su.model.events.Type.RECORD_CHANGE, ev.type);
}


function test_module_change_event() {
  var sugar = ydn.crm.test.createSugar();
  var data = ydn.crm.test.createContactSugarCrmRecord();
  var r = new ydn.crm.su.Record(sugar.getDomain(),
      ydn.crm.su.ModuleName.CONTACTS, data);
  var record = new ydn.crm.su.model.Record(sugar, r);
  var ev = null;
  goog.events.listen(record, [ydn.crm.su.model.events.Type.RECORD_UPDATE,
    ydn.crm.su.model.events.Type.RECORD_CHANGE,
    ydn.crm.su.model.events.Type.MODULE_CHANGE], function(e) {
    ev = e;
  });
  var data2 = ydn.crm.test.createContactSugarCrmRecord();
  data2.name = 'New Name';
  var r2 = new ydn.crm.su.Record(sugar.getDomain(),
      ydn.crm.su.ModuleName.LEADS, data2);
  record.setRecord(r2);
  assertNotNull('event called', ev);
  assertEquals('event type', ydn.crm.su.model.events.Type.MODULE_CHANGE, ev.type);
}


function test_null_module_change_event() {
  var sugar = ydn.crm.test.createSugar();
  var data = ydn.crm.test.createContactSugarCrmRecord();
  var r = new ydn.crm.su.Record(sugar.getDomain(),
      ydn.crm.su.ModuleName.CONTACTS, data);
  var record = new ydn.crm.su.model.Record(sugar, r);
  var ev = null;
  goog.events.listen(record, [ydn.crm.su.model.events.Type.RECORD_UPDATE,
    ydn.crm.su.model.events.Type.RECORD_CHANGE,
    ydn.crm.su.model.events.Type.MODULE_CHANGE], function(e) {
    ev = e;
  });
  var r2 = new ydn.crm.su.Record(sugar.getDomain(),
      ydn.crm.su.ModuleName.LEADS, null);
  record.setRecord(r2);
  assertNotNull('event called', ev);
  assertEquals('event type', ydn.crm.su.model.events.Type.MODULE_CHANGE, ev.type);
}


function test_contact_name_group() {
  var sugar = ydn.crm.test.createSugar();
  var r = new ydn.crm.su.Record(sugar.getDomain(),
      ydn.crm.su.ModuleName.CONTACTS);
  var record = new ydn.crm.su.model.Record(sugar, r);
  var name_group = record.getGroupModel('name');
  assertTrue('name group', name_group instanceof ydn.crm.su.model.NameGroup);
}

function test_calls_name_group() {
  var sugar = ydn.crm.test.createSugar();
  var r = new ydn.crm.su.Record(sugar.getDomain(),
      ydn.crm.su.ModuleName.CALLS);
  var record = new ydn.crm.su.model.Record(sugar, r);
  var name_group = record.getGroupModel('name');
  assertTrue('name group', name_group instanceof ydn.crm.su.model.Group);
}



function test_name_group_change() {
  var sugar = ydn.crm.test.createSugar();
  var r = new ydn.crm.su.Record(sugar.getDomain(),
      ydn.crm.su.ModuleName.CONTACTS);
  var record = new ydn.crm.su.model.Record(sugar, r);
  var r2 = new ydn.crm.su.Record(sugar.getDomain(),
      ydn.crm.su.ModuleName.CALLS);
  record.setRecord(r2);
  var name_group = record.getGroupModel('name');
  assertTrue('name group', name_group instanceof ydn.crm.su.model.Group);
}


var parent_group_test = function(ce) {
  var sugar = ydn.crm.test.createSugar(ce);
  var r = new ydn.crm.su.Record(sugar.getDomain(),
      ydn.crm.su.ModuleName.TASKS);
  var record = new ydn.crm.su.model.Record(sugar, r);
  var groups = record.listGroups();
  assertTrue('has parent group', groups.indexOf('parent') >= 0);
  assertFalse('not has parent_name group', groups.indexOf('parent_name') >= 0);
};

function test_parent_group_ce() {
  parent_group_test(true);
}

function test_parent_group_ent() {
  parent_group_test(false);
}
