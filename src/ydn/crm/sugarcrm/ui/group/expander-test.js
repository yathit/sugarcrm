goog.provide('ydn.crm.sugarcrm.ui.group.ExpanderTest');
goog.setTestOnly('ydn.crm.sugarcrm.ui.group.ExpanderTest');

goog.require('goog.testing.asserts');
goog.require('goog.testing.jsunit');
goog.require('ydn.crm.sugarcrm.model.Sugar');
goog.require('ydn.crm.sugarcrm.ui.group.Name');
goog.require('ydn.crm.test');

var attach_el = document.getElementById('attach-el');

function setUp() {
  ydn.crm.test.initPipe();
  ydn.crm.test.getMain().addMockSugarRespond('list-name', []);
}

function tearDown() {
  attach_el.innerHTML = '';
}

function test_name_edit() {

  var record = ydn.crm.test.createContactRecord(null, {});
  var group = record.getGroupModel('name');
  var panel = new ydn.crm.sugarcrm.ui.group.Name(group);
  panel.render(attach_el);
  panel.simulateEditByField('first_name', 'Kyaw');

  var data = panel.collectData();
  assertTrue('edited', !!data);
  assertEquals('edited value', 'Kyaw', data['first_name']);

}

var editGroupLabel = function(panel, label) {
  var input = panel.getElement().querySelector('.' +
      ydn.crm.sugarcrm.ui.group.GroupRenderer.CSS_CLASS_HEADER + ' input');
  input.value = label;
  panel.onLabelChanged(new goog.events.Event('blur'));
};

function test_input_change() {

  var record = ydn.crm.test.createContactRecord(null, {});
  var group = record.getGroupModel('name');
  var panel = new ydn.crm.sugarcrm.ui.group.Name(group);
  panel.render(attach_el);
  editGroupLabel(panel, 'Kyaw Tun');
  assertTrue('edited', panel.hasChanged());
}

function test_patch_by_group_label() {

  var record = ydn.crm.test.createContactRecord();
  var group = record.getGroupModel('name');
  var panel = new ydn.crm.sugarcrm.ui.group.Name(group);
  panel.render(attach_el);
  editGroupLabel(panel, 'Kyaw Tun');
  var data = panel.getPatch();
  assertEquals('first_name', 'Kyaw', data['first_name']);
  assertEquals('last_name', 'Tun', data['last_name']);
}

function test_collect_by_group_label() {

  var record = ydn.crm.test.createContactRecord(null, {});
  var group = record.getGroupModel('name');
  var panel = new ydn.crm.sugarcrm.ui.group.Name(group);
  panel.render(attach_el);
  editGroupLabel(panel, 'Kyaw Tun');
  var data = panel.collectData();
  assertEquals('first_name', 'Kyaw', data['first_name']);
  assertEquals('last_name', 'Tun', data['last_name']);
}
