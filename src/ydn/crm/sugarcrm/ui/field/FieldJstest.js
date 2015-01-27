

ydn.crm.su.ui.field.FieldJsTest = AsyncTestCase("ydn.crm.su.ui.field.FieldJsTest");



ydn.crm.su.ui.field.FieldJsTest.prototype.setUp = function() {
  ydn.crm.test.init();

};


ydn.crm.su.ui.field.FieldJsTest.prototype.test_bool_rendering = function(queue) {

  var record = ydn.crm.test.createContactRecord();
  var group = record.getGroupModel('');
  var field = group.createOrGetFieldModel('my_favorite');
  var panel = new ydn.crm.su.ui.field.Field(field);
  panel.render(document.body);

  assertFalse('original value', panel.getValue());
  assertNull('field value not change', panel.collectData());

};



ydn.crm.su.ui.field.FieldJsTest.prototype.test_bool_rendering = function(queue) {

  var record = ydn.crm.test.createContactRecord();
  var group = record.getGroupModel('');
  var field = group.createOrGetFieldModel('my_favorite');
  var panel = new ydn.crm.su.ui.field.Field(field);
  panel.render(document.body);

  assertFalse('original value', panel.getValue());
  assertNull('field value not change', panel.collectData());

};


ydn.crm.su.ui.field.FieldJsTest.prototype.test_bool_rendering_default = function(queue) {

  var record = ydn.crm.test.createContactRecord(null, {});
  var group = record.getGroupModel('');
  var field = group.createOrGetFieldModel('my_favorite');
  var panel = new ydn.crm.su.ui.field.Field(field);
  panel.render(document.body);

  assertUndefined('original value', panel.getValue());
  assertNull('field value not change', panel.collectData());

};






