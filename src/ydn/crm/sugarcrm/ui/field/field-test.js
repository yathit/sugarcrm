goog.provide('ydn.crm.su.ui.field.FieldTest');
goog.setTestOnly('ydn.crm.su.ui.field.FieldTest');

goog.require('goog.testing.asserts');
goog.require('goog.testing.jsunit');
goog.require('ydn.crm.su.model.Sugar');
goog.require('ydn.crm.su.ui.field.Field');
goog.require('ydn.crm.su.ui.group.Appointment');
goog.require('ydn.crm.su.ui.group.Email');
goog.require('ydn.crm.test');

var mock_el = document.createElement('div');
document.body.appendChild(mock_el);

function setUp() {
  ydn.crm.test.initPipe();
  ydn.crm.test.getMain().addMockSugarRespond('list-name', []);
}


function tearDown() {
  mock_el.innerHTML = '';
}


function test_bool_rendering() {

  var record = ydn.crm.test.createContactRecord();
  var group = record.getGroupModel('');
  var field = group.createOrGetFieldModel('my_favorite');
  var panel = new ydn.crm.su.ui.field.Field(field);
  panel.render(mock_el);

  assertFalse('original value', panel.getValue());
  assertFalse('field value not change', panel.hasChanged());
}


function test_bool_rendering_default() {

  var record = ydn.crm.test.createContactRecord(null, {});
  var group = record.getGroupModel('');
  var field = group.createOrGetFieldModel('my_favorite');
  var panel = new ydn.crm.su.ui.field.Field(field);
  panel.render(mock_el);

  assertUndefined('original value', panel.getValue());
  assertFalse('field value not change', panel.hasChanged());
}


function test_email() {
  var record = ydn.crm.test.createContactRecord();
  var obj = record.record.obj;
  var exp_email1 = obj['email'][0]['email_address'];
  var exp_email2 = obj['email'][1]['email_address'];
  var model = record.getGroupModel('email');
  var ctrl = new ydn.crm.su.ui.group.Email(model);
  ctrl.render(mock_el);
  ctrl.refresh();

  var email_group = document.querySelector('div.record-group[name="email"]');
  var email_el = email_group.querySelectorAll('input.value');
  assertEquals('email1', exp_email1, email_el[0].value);
  assertEquals('email2', exp_email2, email_el[1].value);
}

function test_data_start() {
  var sugar = ydn.crm.test.createSugar();
  var record = ydn.crm.test.createRecord(sugar, ydn.crm.su.ModuleName.CALLS);
  var model = record.getGroupModel('appointment');
  assertTrue(model.hasField(ydn.crm.su.model.AppointmentGroup.FieldName.START));
  var start = model.createOrGetFieldModel(ydn.crm.su.model.AppointmentGroup.FieldName.START);
  var ctrl = new ydn.crm.su.ui.field.Field(start);
  ctrl.render(mock_el);
  ctrl.refresh();

  var ex_val = start.getField();
  var ac_val = ctrl.collectData();
  assertEquals(ex_val, ac_val);
}

function test_data_start_change() {
  var sugar = ydn.crm.test.createSugar();
  var record = ydn.crm.test.createRecord(sugar, ydn.crm.su.ModuleName.CALLS);
  var model = record.getGroupModel('appointment');
  var start = model.createOrGetFieldModel(ydn.crm.su.model.AppointmentGroup.FieldName.START);
  var ctrl = new ydn.crm.su.ui.field.Field(start);
  ctrl.render(mock_el);
  ctrl.refresh();

  assertFalse(ctrl.hasChanged());
}

