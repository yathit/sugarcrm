

GmailTemplateJsTest = TestCase("GmailTemplateJsTest");



GmailTemplateJsTest.prototype.setUp = function() {
  ydn.crm.test.initPipe();
};


GmailTemplateJsTest.prototype.createBasicTempV7 = function(record) {
  var fn = record.getGroupModel('name').getFullName();
  return {
    original: '<p>Hi {::future::Contacts::full_name::}:</p>',
    fill: '<p>Hi ' + fn + ':</p>'
  };
};

GmailTemplateJsTest.prototype.createBasicTemp = function(record) {
  var fn = record.getGroupModel('name').getFullName();
  return {
    original: '<p>Hi $contact_name:</p>',
    fill: '<p>Hi ' + fn + ':</p>'
  };
};


GmailTemplateJsTest.prototype.test_label_full_name = function() {
  var sugar = ydn.crm.test.createGDataSugar();
  sugar.setInfo({version: '6.5'});
  var record = ydn.crm.test.createContactRecord(sugar);
  var template = new ydn.crm.gmail.Template(sugar);
  var templ = this.createBasicTemp(record);
  var html = template.renderTemplate(templ.original, record);
  assertEquals(templ.fill, html);

};


GmailTemplateJsTest.prototype.test_label_full_name_v7 = function() {
  var sugar = ydn.crm.test.createGDataSugar();
  sugar.setInfo({version: '7.1'});
  var record = ydn.crm.test.createContactRecord(sugar);
  var template = new ydn.crm.gmail.Template(sugar);
  var templ = this.createBasicTempV7(record);
  var html = template.renderTemplate(templ.original, record);
  assertEquals(templ.fill, html);

};

