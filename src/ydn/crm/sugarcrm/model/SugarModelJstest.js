

SugarModelJsTest = TestCase("SugarModelJsTest");



SugarModelJsTest.prototype.setUp = function() {
  ydn.crm.test.initPipe();
};


SugarModelJsTest.prototype.test_bean_email = function() {
  var data = {
    "id": "37585f19-03b9-f463-ed83-54016c6ceec5", "name": "Kyaw Tun",
    "email": [
      {"email_address": "kyaw@game.com", "email_address_caps": "KYAW@GAME.COM", "invalid_email": "0", "opt_out": "0",
        "date_created": "2014-08-30 10:57:38", "date_modified": "2014-08-30 10:57:38",
        "id": "1d381013-055d-1ae2-be4f-5401ae8f9641", "email_address_id": "1d8d2d3e-d80a-4ca8-61da-5401ae743f6d",
        "bean_id": "37585f19-03b9-f463-ed83-54016c6ceec5", "bean_module": "Leads", "primary_address": "1",
        "reply_to_address": "0", "deleted": "0"}
    ],
    "email1": "kyaw@game.com",
    "email2": "",
    "invalid_email": "0",
    "email_opt_out": "0",
    "email_addresses_non_primary": "",
    "salutation": "", "first_name": "Kyaw", "last_name": "Tun", "full_name": "Kyaw Tun", "title": "",
    "ydn$emails": ["kyaw@game.com", "kyaw@game.com"], "ydn$phones": [], "_module": "Leads"
  };
  var sugar = ydn.crm.test.createGDataSugar();
  var record = new ydn.crm.sugarcrm.Record(sugar.getDomain(), data._module, data);
  var model = new ydn.crm.sugarcrm.model.Record(sugar, record);
  var email_group = model.getGroupModel('email');
  assertObject('has email group', email_group);
  var fields = email_group.listFields();
  assertEquals('field count', 1, fields.length);
  var email_field = email_group.createOrGetFieldModel(fields[0]);
  assertEquals('field 0 value', data.email[0].email_address, email_field.getStringValue());
};

