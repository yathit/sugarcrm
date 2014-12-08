goog.provide('ydn.crm.sugarcrm.ui.group.GroupTest');
goog.setTestOnly('ydn.crm.sugarcrm.ui.group.GroupTest');

goog.require('goog.testing.asserts');
goog.require('goog.testing.jsunit');
goog.require('ydn.crm.sugarcrm.model.Sugar');
goog.require('ydn.crm.sugarcrm.ui.group.Email');
goog.require('ydn.crm.sugarcrm.ui.group.Phone');
goog.require('ydn.crm.test');


function setUp() {
  ydn.crm.test.initPipe();
}

function test_email_edit(queue) {

  var record = ydn.crm.test.createContactRecord(null, {});
  var group = record.getGroupModel('email');
  var panel = new ydn.crm.sugarcrm.ui.group.Email(group);
  panel.render(document.body);
  panel.simulateEditByField('email', 'abc@example.com');

  var data = panel.collectData();
  assertArrayEquals('edited fields', ['email'], Object.keys(data));
  assertEquals('edited value', 'abc@example.com', data['email']);

}

function test_phone_edit() {

  var record = ydn.crm.test.createContactRecord(null, {});
  var group = record.getGroupModel('phone');
  var panel = new ydn.crm.sugarcrm.ui.group.Phone(group);
  panel.render(document.body);
  panel.simulateEditByField('phone_home', '12345678');

  var data = panel.collectData();
  assertArrayEquals('edited fields', ['phone_home'], Object.keys(data));
  assertEquals('edited value', '12345678', data['phone_home']);

}



