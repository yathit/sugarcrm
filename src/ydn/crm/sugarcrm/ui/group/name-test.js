goog.provide('ydn.crm.su.ui.group.NameTest');
goog.setTestOnly('ydn.crm.su.ui.group.NameTest');

goog.require('goog.testing.asserts');
goog.require('goog.testing.jsunit');
goog.require('ydn.crm.su.model.Sugar');
goog.require('ydn.crm.su.ui.group.Address');
goog.require('ydn.crm.su.ui.group.Appointment');
goog.require('ydn.crm.su.ui.group.AssignUser');
goog.require('ydn.crm.su.ui.group.Email');
goog.require('ydn.crm.su.ui.group.Name');
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

var closeDialog = function() {
  var ok_btn = document.querySelector('div.modal-dialog button[name=ok]');
  ok_btn.click();
};


function test_name() {
  var record = ydn.crm.test.createRecord(null, ydn.crm.su.ModuleName.CASES);
  var model = record.getGroupModel('');
  var ctrl = new ydn.crm.su.ui.group.Name(model);
  ctrl.render(attach_el);
  ctrl.simulateEditByField('name', 'Foo');
  var data = ctrl.collectData();
  assertTrue(ctrl.hasChanged());
  assertEquals('Foo', data['name']);
}


function test_full_name() {
  var record = ydn.crm.test.createRecord(null, ydn.crm.su.ModuleName.CONTACTS);
  var model = record.getGroupModel('name');
  var ctrl = new ydn.crm.su.ui.group.Name(model);
  ctrl.render(attach_el);
  ctrl.simulateEditByField('first_name', 'Foo');
  ctrl.simulateEditByField('last_name', 'Bar');
  var data = ctrl.collectData();
  assertTrue(ctrl.hasChanged());
  assertEquals('Foo', data['first_name']);
  assertEquals('Bar', data['last_name']);
}

