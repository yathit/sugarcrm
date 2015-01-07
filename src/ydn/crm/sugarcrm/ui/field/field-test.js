goog.provide('ydn.crm.sugarcrm.ui.field.FieldTest');
goog.setTestOnly('ydn.crm.sugarcrm.ui.field.FieldTest');

goog.require('goog.testing.asserts');
goog.require('goog.testing.jsunit');
goog.require('ydn.crm.sugarcrm.model.Sugar');
goog.require('ydn.crm.sugarcrm.ui.field.Field');
goog.require('ydn.crm.sugarcrm.ui.group.Email');
goog.require('ydn.crm.test');

var mock_el = document.createElement('div');
document.body.appendChild(mock_el);

function setUp() {
  ydn.crm.test.initPipe();
}


function tearDown() {
  mock_el.innerHTML = '';
}


function test_bool_rendering() {

  var record = ydn.crm.test.createContactRecord();
  var group = record.getGroupModel('');
  var field = group.createOrGetFieldModel('my_favorite');
  var panel = new ydn.crm.sugarcrm.ui.field.Field(field);
  panel.render(mock_el);

  assertFalse('original value', panel.getValue());
  assertNull('field value not change', panel.collectData());
}


function test_bool_rendering_default() {

  var record = ydn.crm.test.createContactRecord(null, {});
  var group = record.getGroupModel('');
  var field = group.createOrGetFieldModel('my_favorite');
  var panel = new ydn.crm.sugarcrm.ui.field.Field(field);
  panel.render(mock_el);

  assertUndefined('original value', panel.getValue());
  assertNull('field value not change', panel.collectData());
}


function test_email() {
  var record = ydn.crm.test.createContactRecord();
  var obj = record.record.obj;
  var exp_email1 = obj['email'][0]['email_address'];
  var exp_email2 = obj['email'][1]['email_address'];
  var model = record.getGroupModel('email');
  var ctrl = new ydn.crm.sugarcrm.ui.group.Email(model);
  ctrl.render(mock_el);
  ctrl.refresh();

  var email_group = document.querySelector('div.record-group[name="email"]');
  var email_el = email_group.querySelectorAll('input.value');
  assertEquals('email1', exp_email1, email_el[0].value);
  assertEquals('email2', exp_email2, email_el[1].value);
}



