

GroupUiJsTest = AsyncTestCase("GroupUiJsTest");



GroupUiJsTest.prototype.setUp = function() {
  ydn.crm.test.init();

};



GroupUiJsTest.prototype.test_email_edit = function(queue) {

  var record = ydn.crm.test.createContactRecord(null, {});
  var group = record.getGroupModel('email');
  var panel = new ydn.crm.sugarcrm.ui.group.Email(group);
  panel.render(document.body);
  panel.simulateEditByField('email', 'abc@example.com');

  var data = panel.collectData();
  assertEquals('edited fields', ['email'], Object.keys(data));
  assertEquals('edited value', 'abc@example.com', data['email']);

};


GroupUiJsTest.prototype.test_phone_edit = function(queue) {

  var record = ydn.crm.test.createContactRecord(null, {});
  var group = record.getGroupModel('phone');
  var panel = new ydn.crm.sugarcrm.ui.group.Phone(group);
  panel.render(document.body);
  panel.simulateEditByField('phone_home', '12345678');

  var data = panel.collectData();
  assertEquals('edited fields', ['phone_home'], Object.keys(data));
  assertEquals('edited value', '12345678', data['phone_home']);

};






