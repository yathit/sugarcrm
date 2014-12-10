goog.provide('ydn.crm.sugarcrm.ui.group.GroupTest');
goog.setTestOnly('ydn.crm.sugarcrm.ui.group.GroupTest');

goog.require('goog.testing.asserts');
goog.require('goog.testing.jsunit');
goog.require('ydn.crm.sugarcrm.model.Sugar');
goog.require('ydn.crm.sugarcrm.ui.group.Address');
goog.require('ydn.crm.sugarcrm.ui.group.Phone');
goog.require('ydn.crm.sugarcrm.ui.group.Phone');
goog.require('ydn.crm.test');

var attach_el = document.getElementById('attach-el');

function setUp() {
  ydn.crm.test.initPipe();
}

function tearDown() {
  attach_el.innerHTML = '';
}

function test_new_email() {

  var record = ydn.crm.test.createContactRecord(null, {});
  var group = record.getGroupModel('email');
  var panel = new ydn.crm.sugarcrm.ui.group.Email(group);
  panel.render(attach_el);
  panel.simulateEditByField('email', 'abc@example.com');

  var data = panel.collectData();
  assertArrayEquals('edited fields', ['email'], Object.keys(data));
  assertEquals('edited value', 'abc@example.com', data['email']);

}

function test_new_phone() {

  var record = ydn.crm.test.createContactRecord(null, {});
  var group = record.getGroupModel('phone');
  var panel = new ydn.crm.sugarcrm.ui.group.Phone(group);
  panel.render(attach_el);
  panel.simulateEditByField('phone_home', '12345678');

  var data = panel.collectData();
  assertArrayEquals('edited fields', ['phone_home'], Object.keys(data));
  assertEquals('edited value', '12345678', data['phone_home']);

}


var simulateDialogEdit = function(name, value) {
  var dialog = document.querySelector('.field-edit-dialog');
  var street = dialog.querySelector('TR[name=' + name + '] .value');
  var input = street.firstElementChild;
  if (input.tagName == 'TEXTAREA') {
    input.textContent = value;
  } else {
    input.value = value;
  }
};

var createAddressPanelAndEdit = function() {
  var record = ydn.crm.test.createContactRecord(null, {});
  var group = record.getGroupModel('primary_address');
  var panel = new ydn.crm.sugarcrm.ui.group.Address(group);
  panel.render(attach_el);
  var edit = attach_el.querySelector('.' + ydn.crm.sugarcrm.ui.field.FieldRenderer.CSS_CLASS_HOVER_BUTTON);
  edit.click(); // open edit dialog
  return panel;
};

var closeDialogAndCollectData = function(panel) {
  var ok_btn = document.querySelector('div.modal-dialog button[name=ok]');
  ok_btn.click();
  return panel.collectData();
};

function test_new_address_street() {
  var panel = createAddressPanelAndEdit();
  simulateDialogEdit('primary_address_street', 'Street 1');
  var data = closeDialogAndCollectData(panel);

  assertArrayEquals('edited fields', ['primary_address_street'], Object.keys(data));
  assertEquals('edited value', 'Street 1', data['primary_address_street']);

}

function test_new_address() {
  var panel = createAddressPanelAndEdit();
  simulateDialogEdit('primary_address_city', 'City');
  simulateDialogEdit('primary_address_state', 'CA');
  simulateDialogEdit('primary_address_postalcode', '12345');
  simulateDialogEdit('primary_address_country', 'SG');
  var data = closeDialogAndCollectData(panel);

  assertArrayEquals('edited fields', ['primary_address_city',
    'primary_address_state', 'primary_address_postalcode',
    'primary_address_country'], Object.keys(data));
  assertEquals('primary_address_city', 'City', data['primary_address_city']);
  assertEquals('primary_address_state', 'CA', data['primary_address_state']);
  assertEquals('primary_address_postalcode', '12345', data['primary_address_postalcode']);
  assertEquals('primary_address_country', 'SG', data['primary_address_country']);

}
