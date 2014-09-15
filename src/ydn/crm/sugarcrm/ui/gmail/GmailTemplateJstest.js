

GmailTemplateJsTest = TestCase("GmailTemplateJsTest");



GmailTemplateJsTest.prototype.setUp = function() {
  ydn.crm.test.initPipe();
};


GmailTemplateJsTest.prototype.createTempl1 = function(record) {
  var fn = record.getGroupModel('name').getFullName();
  return {
    original: '<p>Hi {::future::Contacts::full_name::}:</p>',
    fill: '<p>Hi ' + fn + ':</p>'
  };
};


GmailTemplateJsTest.prototype.test_label_full_name = function() {
  var sugar = ydn.crm.test.createGDataSugar();
  var record = ydn.crm.test.createContactRecord(sugar);
  var template = new ydn.crm.ui.gmail.Template(sugar);
  var templ = this.createTempl1(record);
  var html = template.renderTemplate(templ.original, record);
  assertEquals(templ.fill, html);

};

