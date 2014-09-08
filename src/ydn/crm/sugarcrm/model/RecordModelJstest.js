

RecordModelJsTest = TestCase("RecordModelJsTest");



RecordModelJsTest.prototype.setUp = function() {
  ydn.crm.test.initPipe();
};


RecordModelJsTest.prototype.test_record_update_event = function() {
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
};


RecordModelJsTest.prototype.test_record_change_event = function() {
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
};


RecordModelJsTest.prototype.test_module_change_event = function() {
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
};


RecordModelJsTest.prototype.test_null_module_change_event = function() {
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
};
