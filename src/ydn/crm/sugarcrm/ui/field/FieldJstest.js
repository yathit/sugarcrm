

ydn.crm.sugarcrm.ui.field.FieldJsTest = AsyncTestCase("ydn.crm.sugarcrm.ui.field.FieldJsTest");



ydn.crm.sugarcrm.ui.field.FieldJsTest.prototype.setUp = function() {
  ydn.crm.test.init();

};


ydn.crm.sugarcrm.ui.field.FieldJsTest.prototype.test_bool_rendering = function(queue) {

  var record = ydn.crm.test.createContactRecord();
  var group = record.getGroupModel('');
  var field = group.createOrGetFieldModel('my_favorite');
  var panel = new ydn.crm.sugarcrm.ui.field.Field(field);
  panel.render(document.body);

  assertFalse('original value', panel.getValue());
  assertNull('field value not change', panel.collectData());

};



ydn.crm.sugarcrm.ui.field.FieldJsTest.prototype.test_bool_rendering = function(queue) {

  var record = ydn.crm.test.createContactRecord();
  var group = record.getGroupModel('');
  var field = group.createOrGetFieldModel('my_favorite');
  var panel = new ydn.crm.sugarcrm.ui.field.Field(field);
  panel.render(document.body);

  assertFalse('original value', panel.getValue());
  assertNull('field value not change', panel.collectData());

};


ydn.crm.sugarcrm.ui.field.FieldJsTest.prototype.test_bool_rendering_default = function(queue) {

  var record = ydn.crm.test.createContactRecord(null, {});
  var group = record.getGroupModel('');
  var field = group.createOrGetFieldModel('my_favorite');
  var panel = new ydn.crm.sugarcrm.ui.field.Field(field);
  panel.render(document.body);

  assertUndefined('original value', panel.getValue());
  assertNull('field value not change', panel.collectData());

};






