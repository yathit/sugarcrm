

RecordModelJsTest = TestCase("RecordModelJsTest");



RecordModelJsTest.prototype.setUp = function() {
  ydn.crm.test.initPipe();
};


RecordModelJsTest.prototype.test_record_update_event = function() {
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
};


RecordModelJsTest.prototype.test_record_change_event = function() {
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
};


RecordModelJsTest.prototype.test_module_change_event = function() {
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
};


RecordModelJsTest.prototype.test_null_module_change_event = function() {
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
};
