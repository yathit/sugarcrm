goog.provide('ydn.crm.su.model.GDataSugarTest');
goog.setTestOnly('ydn.crm.su.model.GDataSugarTest');

goog.require('goog.testing.asserts');
goog.require('goog.testing.jsunit');
goog.require('ydn.crm.su.model.GDataSugar');
goog.require('ydn.crm.su.model.Record');
goog.require('ydn.crm.test');


function setUp() {
  ydn.crm.test.initPipe();
  ydn.crm.test.getMain().addMockSugarRespond(ydn.crm.ch.SReq.QUERY_BY_EMAIL_ON_SERVER, []);
}


function test_context_data() {
  ydn.crm.test.getMain().addMockRespond(ydn.crm.ch.Req.GDATA_LIST_CONTACT, []);
  ydn.crm.test.getMain().addMockSugarRespond(ydn.crm.ch.SReq.QUERY, [{result: []}]);
  var email = 'test@example.com';
  var fn = 'Test User';
  var cm = new ydn.crm.inj.Context('kyaw@email.com', email, fn);
  var gdata = cm.toContactEntry();
  assertEquals('context name', fn, gdata.getFullName());
  assertArrayEquals('context email', [email], gdata.getEmails());
}


function test_no_match() {
  ydn.crm.test.getMain().addMockRespond(ydn.crm.ch.Req.GDATA_LIST_CONTACT, []);
  ydn.crm.test.getMain().addMockSugarRespond(ydn.crm.ch.SReq.QUERY, [{result: []}]);
  var sugar = ydn.crm.test.createGDataSugar();
  var email = 'test@example.com';
  var cm = new ydn.crm.inj.Context('kyaw@email.com', email);
  var df = sugar.setContext(cm);
  assertNotNull('context', sugar.context_);
  assertNull('gdata', sugar.contact_);
  assertNull('record', sugar.record_);
}


function test_gdata_match() {
  var gdata = ydn.crm.test.createGDataContact();
  ydn.crm.test.getMain().addMockRespond(ydn.crm.ch.Req.GDATA_LIST_CONTACT, [gdata]);
  ydn.crm.test.getMain().addMockSugarRespond(ydn.crm.ch.SReq.QUERY, [{result: []}]);
  var sugar = ydn.crm.test.createGDataSugar();
  var email = 'test@example.com';
  var cm = new ydn.crm.inj.Context('kyaw@email.com', email);
  var df = sugar.setContext(cm);
  assertNotNull('gdata', sugar.contact_);
  assertNull('record', sugar.record_);
}


function test_synced() {
  var sugar = ydn.crm.test.createGDataSugar();
  var gdata = ydn.crm.test.createGDataContact();
  var record = ydn.crm.test.createContactSugarCrmRecord();
  var ex_id = new ydn.gdata.m8.ExternalId(ydn.gdata.m8.ExternalId.Scheme.SUGARCRM,
      sugar.getDomain(), 'Contacts', record.id, NaN, 1379715000000);
  gdata.gContact$externalId = [ex_id.toExternalId()];
  ydn.crm.test.getMain().addMockRespond(ydn.crm.ch.Req.GDATA_LIST_CONTACT, [gdata]);
  ydn.crm.test.getMain().addMockSugarRespond(ydn.crm.ch.SReq.QUERY, [{
    store: 'Contacts',
    result: [record]
  }]);
  var email = 'test@example.com';
  var cm = new ydn.crm.inj.Context('kyaw@email.com', email);
  var df = sugar.setContext(cm);
  assertNotNull('gdata', sugar.contact_);
  assertNotNull('record', sugar.record_);
}


function test_record_match() {
  var record = ydn.crm.test.createContactSugarCrmRecord();
  ydn.crm.test.getMain().addMockRespond(ydn.crm.ch.Req.GDATA_LIST_CONTACT, []);
  ydn.crm.test.getMain().addMockSugarRespond(ydn.crm.ch.SReq.QUERY, [{
    store: 'Contacts',
    result: [record]
  }]);
  var sugar = ydn.crm.test.createGDataSugar();
  var email = 'test@example.com';
  var cm = new ydn.crm.inj.Context('kyaw@email.com', email);
  var df = sugar.setContext(cm);
  assertNull('gdata', sugar.contact_);
  assertNotNull('record', sugar.record_);
}
