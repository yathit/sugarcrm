goog.provide('ydn.crm.su.ui.group.GroupTest');
goog.setTestOnly('ydn.crm.su.ui.group.GroupTest');

goog.require('goog.testing.asserts');
goog.require('goog.testing.jsunit');
goog.require('ydn.crm.su.model.Sugar');
goog.require('ydn.crm.su.ui.group.Address');
goog.require('ydn.crm.su.ui.group.Appointment');
goog.require('ydn.crm.su.ui.group.AssignUser');
goog.require('ydn.crm.su.ui.group.Email');
goog.require('ydn.crm.su.ui.group.Name');
goog.require('ydn.crm.su.ui.group.Parent');
goog.require('ydn.crm.su.ui.group.Phone');
goog.require('ydn.crm.su.ui.group.SuggestedRecord');
goog.require('ydn.crm.test');

var attach_el = document.getElementById('attach-el');

function setUp() {
  ydn.crm.test.initPipe();
  ydn.crm.test.getMain().addMockSugarRespond('list-name', []);
}

function tearDown() {
  attach_el.innerHTML = '';
}

function test_new_email() {
  var record = ydn.crm.test.createContactRecord(null, {});
  var group = record.getGroupModel('email');
  var panel = new ydn.crm.su.ui.group.Email(group);
  panel.render(attach_el);
  panel.refresh();
  panel.simulateEditByField('email1', 'abc@example.com');

  var data = panel.collectData();
  assertTrue('edited', !!data);
  assertEquals('edited value', 'abc@example.com', data['email1']);
}

function test_email_edit() {
  var record = ydn.crm.test.createContactRecord();
  var group = record.getGroupModel('email');
  var panel = new ydn.crm.su.ui.group.Email(group);
  panel.render(attach_el);
  panel.refresh();
  panel.simulateEditByField('email1', 'abc@example.com');

  var email = record.value('email');
  assertTrue('edited', panel.hasChanged());
  var patch = panel.getPatch();
  assertEquals('edited value', 'abc@example.com', patch['email1']);
  assertUndefined('email2', patch['email2']);
  assertNotNullNorUndefined(patch['email']);
  assertEquals(email.length, patch['email'].length);
}


function test_email_no_edit() {
  var r = {
    "email": [
      {
        "email_address": "poholskyc@perich.com",
        "email_address_caps": "POHOLSKYC@PERICH.COM",
        "invalid_email": "0",
        "opt_out": "0",
        "date_created": "2014-12-03 20:34:28",
        "date_modified": "2014-12-03 20:34:28",
        "id": "26fc1a2c-ade3-e19c-a3e3-547f744f946d",
        "email_address_id": "2721b7c8-75ff-efd2-7ad3-547f745518bc",
        "bean_id": "1009c393-83bd-207d-c234-547f74cc5d5c",
        "bean_module": "Contacts",
        "primary_address": "1",
        "reply_to_address": "0",
        "deleted": "0"
      }
    ],
    "email1": "poholskyc@perich.com",
    "email2": "",
    "invalid_email": "0",
    "email_opt_out": "0",
    "email_addresses_non_primary": ""
  };
  var record = ydn.crm.test.createContactRecord(null, r);
  var group = record.getGroupModel('email');
  var panel = new ydn.crm.su.ui.group.Email(group);
  panel.render(attach_el);
  panel.refresh();
  assertFalse(panel.hasChanged());
  assertNull(panel.getPatch());
}


function test_account_no_edit() {
  var record = ydn.crm.test.createContactRecord();
  var group = record.getGroupModel('account');
  var panel = new ydn.crm.su.ui.group.SuggestedRecord(group);
  panel.render(attach_el);
  panel.refresh();
  assertFalse(panel.hasChanged());
  assertNull(panel.getPatch());
}

function test_new_phone() {

  var record = ydn.crm.test.createContactRecord(null, {});
  var group = record.getGroupModel('phone');
  var panel = new ydn.crm.su.ui.group.Phone(group);
  panel.render(attach_el);
  panel.simulateEditByField('phone_home', '12345678');

  var data = panel.collectData();
  assertTrue('edited', !!data);
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
  var edit = attach_el.querySelector('.' + ydn.crm.su.ui.field.FieldRenderer.CSS_CLASS_HOVER_BUTTON);
  edit.click(); // open edit dialog
};

var createAddressPanel = function() {
  var record = ydn.crm.test.createContactRecord(null, {});
  var group = record.getGroupModel('primary_address');
  var panel = new ydn.crm.su.ui.group.Address(group);
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


function test_assigned_user() {
  var sugar = ydn.crm.test.createSugar();
  var record = ydn.crm.test.createRecord(sugar, ydn.crm.su.ModuleName.CALLS);
  var model = record.getGroupModel('assigned_user_name');
  var df_val = model.getGroupValue();
  var exp_value = model.getStringValue('assigned_user_name');
  assertEquals('default user name', exp_value, df_val);
  var ctrl = new ydn.crm.su.ui.group.AssignUser(model);
  ctrl.render(attach_el);
  ctrl.refresh();
  var field_el = attach_el.querySelector('div.record-group[name="assigned_user_name"] input.value');
  assertEquals('input value', exp_value, field_el.value);
  assertFalse(ctrl.hasChanged());
}


function test_assigned_user_change() {
  var sugar = ydn.crm.test.createSugar();
  var record = ydn.crm.test.createRecord(sugar, ydn.crm.su.ModuleName.CALLS);
  var model = record.getGroupModel('assigned_user_name');

  var ctrl = new ydn.crm.su.ui.group.AssignUser(model);
  ctrl.render(attach_el);
  ctrl.refresh();

  assertFalse(ctrl.hasChanged());
}


function test_assigned_user_default() {
  var sugar = ydn.crm.test.createSugar();
  var record = ydn.crm.test.createRecord(sugar, ydn.crm.su.ModuleName.CALLS, {});
  var model = record.getGroupModel('assigned_user_name');
  var df_val = model.getGroupValue();
  var exp_value = sugar.getUser().getStringValue('name');
  assertEquals('default user name', exp_value, df_val);
  var ctrl = new ydn.crm.su.ui.group.AssignUser(model);
  ctrl.render(attach_el);
  ctrl.refresh();
  var field_el = attach_el.querySelector('div.record-group[name="assigned_user_name"] input.value');
  assertEquals('input value', exp_value, field_el.value);
}


function test_assigned_user_default_change() {
  var sugar = ydn.crm.test.createSugar();
  var record = ydn.crm.test.createRecord(sugar, ydn.crm.su.ModuleName.CALLS, {});
  var model = record.getGroupModel('assigned_user_name');

  var ctrl = new ydn.crm.su.ui.group.AssignUser(model);
  ctrl.render(attach_el);
  ctrl.refresh();

  assertFalse(ctrl.hasChanged());
  var data = ctrl.collectData();
  assert('filled with default', !!data);
}

function test_appointment_render() {
  var sugar = ydn.crm.test.createSugar();
  var record = ydn.crm.test.createRecord(sugar, ydn.crm.su.ModuleName.CALLS);
  var model = record.getGroupModel('appointment');
  assertTrue(model.hasField(ydn.crm.su.model.AppointmentGroup.FieldName.START));
  var ctrl = new ydn.crm.su.ui.group.Appointment(model);
  ctrl.render(attach_el);
  ctrl.refresh();
  var date_start_el = attach_el.querySelector('div.field[name="date_start"] input.value');
  var duration_hours_el = attach_el.querySelector('.field[name="duration_hours"] input.value');
  var duration_minutes_el = attach_el.querySelector('.field[name="duration_minutes"] input.value');
  var date_start = record.getStringValue('date_start');
  var duration_hours = record.getStringValue('duration_hours');
  var duration_minutes = record.getStringValue('duration_minutes');
  date_start = ydn.crm.su.utils.toDateTimeLocalString(date_start);
  assertEquals('date_start value', date_start, date_start_el.value);
  assertEquals('duration_hours value', duration_hours, duration_hours_el.value);
  assertEquals('duration_hours value', duration_minutes, duration_minutes_el.value);
}


function test_appointment_change() {
  var sugar = ydn.crm.test.createSugar();
  var record = ydn.crm.test.createRecord(sugar, ydn.crm.su.ModuleName.CALLS);
  var model = record.getGroupModel('appointment');
  assertTrue(model.hasField(ydn.crm.su.model.AppointmentGroup.FieldName.START));
  var ctrl = new ydn.crm.su.ui.group.Appointment(model);
  ctrl.render(attach_el);
  ctrl.refresh();

  assertFalse(ctrl.hasChanged());
}


function test_calls_appointment_default() {
  var sugar = ydn.crm.test.createSugar();
  var record = ydn.crm.test.createRecord(sugar, ydn.crm.su.ModuleName.CALLS, {});
  var model = record.getGroupModel('appointment');
  var default_st = ydn.time.getNextNominal(); // default value
  assertEquals(ydn.crm.su.utils.toDateString(default_st),
      model.getDefaultFieldValue(ydn.crm.su.model.AppointmentGroup.FieldName.START));
  var ctrl = new ydn.crm.su.ui.group.Appointment(model);
  ctrl.render(attach_el);
  ctrl.refresh();
  var date_start_el = attach_el.querySelector('div.field[name="date_start"] input.value');
  var duration_minutes_el = attach_el.querySelector('.field[name="duration_minutes"] input.value');
  assertTrue('date_start value', !!date_start_el.value);
  assertTrue('duration_minutes_el value', !!duration_minutes_el.value);
}


function test_tasks_appointment_default() {
  var sugar = ydn.crm.test.createSugar();
  var record = ydn.crm.test.createRecord(sugar, ydn.crm.su.ModuleName.TASKS, {});
  var model = record.getGroupModel('appointment');

  var ctrl = new ydn.crm.su.ui.group.Appointment(model);
  ctrl.render(attach_el);
  ctrl.refresh();

  var date_start_el = attach_el.querySelector('div.field[name="date_start"] input.value');
  var date_due_el = attach_el.querySelector('.field[name="date_due"] input.value');
  assertTrue('date_start value', !!date_start_el.value);
  assertTrue('date_due value', !!date_due_el.value);
}


function test_appointment_default_change() {
  var sugar = ydn.crm.test.createSugar();
  var record = ydn.crm.test.createRecord(sugar, ydn.crm.su.ModuleName.CALLS, {});
  var model = record.getGroupModel('appointment');

  var ctrl = new ydn.crm.su.ui.group.Appointment(model);
  ctrl.render(attach_el);
  ctrl.refresh();

  assertFalse(ctrl.hasChanged());

  var data = ctrl.collectData();
  assertTrue(!!data); // still get default data
  var names = [ydn.crm.su.model.AppointmentGroup.FieldName.START,
    ydn.crm.su.model.AppointmentGroup.FieldName.HOUR,
    ydn.crm.su.model.AppointmentGroup.FieldName.MINUTE];
  for (var i = 0; i < names.length; i++) {
    var name = names[i];
    assertTrue('default for '  + name, !!data[name]);
  }
}


function test_appointment_default_collect_data() {
  var sugar = ydn.crm.test.createSugar();
  var record = ydn.crm.test.createRecord(sugar, ydn.crm.su.ModuleName.CALLS, {});
  var model = record.getGroupModel('appointment');

  var ctrl = new ydn.crm.su.ui.group.Appointment(model);
  ctrl.render(attach_el);
  ctrl.refresh();

  assertFalse(ctrl.hasChanged());

  var data = ctrl.collectData();
  assertTrue(!!data); // still get default data
}



function test_tasks_appointment() {
  var record = ydn.crm.test.createRecord(null, ydn.crm.su.ModuleName.TASKS);
  var model = record.getGroupModel('appointment');
  var ctrl = new ydn.crm.su.ui.group.Appointment(model);
  ctrl.render(attach_el);
  var now = goog.now();
  var date_start = ydn.crm.su.utils.toDateString(new Date(2015, 1, 1, 1, 1));
  var date_due = ydn.crm.su.utils.toDateString(new Date(2015, 1, 1, 2, 1));

  ctrl.simulateEditByField('date_start',
      ydn.crm.su.utils.toDateTimeLocalString(date_start));
  ctrl.simulateEditByField('date_due',
      ydn.crm.su.utils.toDateTimeLocalString(date_due));
  var data = ctrl.collectData();

  assertTrue(ctrl.hasChanged());
  assertEquals('date_start', date_start, data['date_start']);
  assertEquals('date_due', date_due, data['date_due']);
}


function test_parent() {
  var obj = {
    "id": "1041135a-b41e-f1bf-656d-5414e1968eda",
    "name": "Make travel arrangements",
    "date_entered": "2014-09-14 00:28:31",
    "date_modified": "2014-09-14 00:28:31",
    "parent_type": "Opportunities",
    "parent_name": "X-Sell Holdings - 1000 units",
    "parent_id": "129d266d-789a-c562-409a-5414e185baa8"
  };
  var record = ydn.crm.test.createRecord(null, ydn.crm.su.ModuleName.TASKS, obj);
  var model = record.getGroupModel('parent');
  var ctrl = new ydn.crm.su.ui.group.Parent(model);
  ctrl.render(attach_el);
  ctrl.reset();
  ctrl.refresh();
  var data = ctrl.collectData();
  assertEquals('parent_id', obj.parent_id, data['parent_id']);
  assertEquals('parent_name', obj.parent_name, data['parent_name']);
  assertEquals('parent_type', obj.parent_type, data['parent_type']);

  var sel = attach_el.querySelector('select');
  assertEquals('selected correct parent module type', obj.parent_type, sel.value);
}

