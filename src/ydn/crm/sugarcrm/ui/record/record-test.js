goog.provide('ydn.crm.su.ui.record.RecordTest');
goog.setTestOnly('ydn.crm.su.ui.record.RecordTest');

goog.require('goog.testing.asserts');
goog.require('goog.testing.jsunit');
goog.require('ydn.crm.su.model.Sugar');
goog.require('ydn.crm.su.ui.record.Record');
goog.require('ydn.crm.test');

var mock_el = document.createElement('div');
document.body.appendChild(mock_el);


function setUp() {
  ydn.crm.test.init();
  ydn.crm.test.getMain().addMockRespond('gdata-list-contact-by-email', []);
  ydn.crm.test.getMain().addMockRespond('gdata-list-contact', []);
  ydn.crm.test.getMain().addMockSugarRespond('query', [{result: []}]);
  ydn.crm.test.getMain().addMockSugarRespond('list-name', []);
  ydn.crm.test.getMain().addMockRespond('sync-q', []);

  ydn.crm.su.ui.record.Record.prototype.applyPatchImmediately_ = true;

}

function tearDown() {
  mock_el.innerHTML = '';
}

function test_rendering() {

  var record = ydn.crm.test.createContactRecord();

  var obj = record.record.obj;
  var name = obj['full_name'];
  var phone_home = obj['phone_home'];
  var exp_email1 = obj['email'][0]['email_address'];
  var exp_email2 = obj['email'][1]['email_address'];

  var panel = new ydn.crm.su.ui.record.Record(record);
  panel.render(mock_el);

  var name_group = document.querySelector('div.record-group[name="name"]');
  var name_el = name_group.querySelectorAll('input.value');
  assertEquals('name', name, name_el[0].value);

  var email_group = document.querySelector('div.record-group[name="email"]');
  var email_el = email_group.querySelectorAll('input.value');
  assertEquals('email1', exp_email1, email_el[0].value);
  assertEquals('email2', exp_email2, email_el[1].value);

  var phone_field = document.querySelector('div.field[name="phone_home"]');
  var phone_el = phone_field.querySelector('input.value');
  assertEquals('phone_home', phone_home, phone_el.value);

}

function test_rendering_account_name() {

  var obj = {
    'id': '14931041-0811-1232-7bfc-5402b6f6dd93',
    'name': 'Chaw Su'
  };
  var sugar = ydn.crm.test.createSugar();
  var r = new ydn.crm.su.Record(sugar.getDomain(), ydn.crm.su.ModuleName.ACCOUNTS, obj);
  var record = new ydn.crm.su.model.Record(sugar, r);

  var panel = new ydn.crm.su.ui.record.Record(record);
  panel.render(mock_el);

  var name_el = document.querySelector('.field[name="name"] input.value');
  assertEquals('name', obj.name, name_el.value);

}

function test_normally_hide_setting() {
  var record = ydn.crm.test.createContactRecord();
  var panel = new ydn.crm.su.ui.record.Record(record);
  panel.render(mock_el);
  var name_group = panel.body_panel.getChildByGroup('name');
  assertFalse('normally hide value of name group', name_group.isNormallyHide());
  /*
  var team_group = panel.body_panel.getChildByGroup('team_name');
  assertTrue('normally hide value of team_group group', team_group.isNormallyHide());
  */
}


function test_edit_name() {

  var record = ydn.crm.test.createContactRecord(null);

  var record_panel = new ydn.crm.su.ui.record.Record(record);
  record_panel.render(mock_el);

  var called = false;
  record_panel.patch = function(patch) {
    assertEquals('first name', 'Kyaw', patch['first_name']);
    assertEquals('last name', 'Tun', patch['last_name']);
    called = true;
  };

  record_panel.simulateEdit({'first_name': 'Kyaw'});
  record_panel.simulateEdit({'last_name': 'Tun'}, true);
  assertTrue(called);
}

function test_edit_email() {

  var record = ydn.crm.test.createContactRecord(null);
  var record_panel = new ydn.crm.su.ui.record.Record(record);


  var called = false;
  record_panel.patch = function(patch) {
    assertEquals('email1', 'foo@example.com', patch['email1']);

    called = true;
  };

  record_panel.render(mock_el);
  record_panel.simulateEdit({'email1': 'foo@example.com'}, true);

  assertTrue(called);
}


function test_edit_full_name() {
  var record = ydn.crm.test.createRecord(null, ydn.crm.su.ModuleName.CONTACTS);
  var record_panel = new ydn.crm.su.ui.record.Record(record);
  var called = false;
  record_panel.patch = function(patch) {
    assertEquals('full_name', 'Test User', patch['full_name']);
    called = true;
  };
  record_panel.render(mock_el);
  record_panel.simulateEdit({'full_name': 'Test User'}, true);
  assertTrue(called);
}

