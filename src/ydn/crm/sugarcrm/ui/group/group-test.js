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
    input.value = value;
  } else {
    input.value = value;
  }
};


var editDialog = function() {
  var edit = attach_el.querySelector('.' + ydn.crm.sugarcrm.ui.field.FieldRenderer.CSS_CLASS_HOVER_BUTTON);
  edit.click(); // open edit dialog
};

var createAddressPanel = function() {
  var record = ydn.crm.test.createContactRecord(null, {});
  var group = record.getGroupModel('primary_address');
  var panel = new ydn.crm.sugarcrm.ui.group.Address(group);
  panel.render(attach_el);
  return panel;
};

var closeDialog = function() {
  var ok_btn = document.querySelector('div.modal-dialog button[name=ok]');
  ok_btn.click();
};

function test_new_address_street() {
  var panel = createAddressPanel();
  editDialog();
  simulateDialogEdit('primary_address_street', 'Street 1');
  closeDialog();
  var data = panel.collectData();

  assertArrayEquals('edited fields', ['primary_address_street'], Object.keys(data));
  assertEquals('edited value', 'Street 1', data['primary_address_street']);
}

function test_new_address_street_multi_lines() {
  var panel = createAddressPanel();
  editDialog();
  simulateDialogEdit('primary_address_street', 'Street 1\n#09-118');
  closeDialog();
  var data = panel.collectData();

  assertArrayEquals('edited fields', ['primary_address_street'], Object.keys(data));
  assertEquals('edited value', 'Street 1\n#09-118', data['primary_address_street']);
}

function test_new_address() {
  var panel = createAddressPanel();
  editDialog();
  simulateDialogEdit('primary_address_street', 'St 1');
  simulateDialogEdit('primary_address_city', 'City');
  simulateDialogEdit('primary_address_state', 'CA');
  simulateDialogEdit('primary_address_postalcode', '12345');
  simulateDialogEdit('primary_address_country', 'SG');
  closeDialog();
  var data = panel.collectData();

  assertArrayEquals('edited fields', ['primary_address_street',
    'primary_address_city',
    'primary_address_state', 'primary_address_postalcode',
    'primary_address_country'], Object.keys(data));
  assertEquals('primary_address_street', 'St 1', data['primary_address_street']);
  assertEquals('primary_address_city', 'City', data['primary_address_city']);
  assertEquals('primary_address_state', 'CA', data['primary_address_state']);
  assertEquals('primary_address_postalcode', '12345', data['primary_address_postalcode']);
  assertEquals('primary_address_country', 'SG', data['primary_address_country']);

}


function test_new_address_re_edit() {
  var panel = createAddressPanel();
  editDialog();
  simulateDialogEdit('primary_address_street', 'St 1');
  simulateDialogEdit('primary_address_city', 'City');
  simulateDialogEdit('primary_address_state', 'CA');
  simulateDialogEdit('primary_address_postalcode', '12345');
  simulateDialogEdit('primary_address_country', 'SG');
  closeDialog();

  editDialog();
  closeDialog();
  var data = panel.collectData();

  assertArrayEquals('edited fields', ['primary_address_street',
    'primary_address_city',
    'primary_address_state', 'primary_address_postalcode',
    'primary_address_country'], Object.keys(data));
  assertEquals('primary_address_street', 'St 1', data['primary_address_street']);
  assertEquals('primary_address_city', 'City', data['primary_address_city']);
  assertEquals('primary_address_state', 'CA', data['primary_address_state']);
  assertEquals('primary_address_postalcode', '12345', data['primary_address_postalcode']);
  assertEquals('primary_address_country', 'SG', data['primary_address_country']);

}
