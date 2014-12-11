goog.provide('ydn.crm.sugarcrm.ui.setting.SettingTest');
goog.setTestOnly('ydn.crm.sugarcrm.ui.setting.SettingTest');

goog.require('goog.testing.asserts');
goog.require('goog.testing.jsunit');
goog.require('ydn.crm.sugarcrm.ui.setting.Field');
goog.require('ydn.testing.mockExtension');


function setUpPage() {
  for (var i = 0; i < moduleLists.length; i++) {
    ydn.crm.sugarcrm.fixSugarCrmModuleMeta(moduleLists[i]);
  }
}

function setUp() {

}

function tearDown() {
  chrome.storage.local.clear();
  chrome.storage.sync.clear();
}

var getFieldInfo = function(mn, fn) {
  var info
  for (var i = 0; i < moduleLists.length; i++) {
    if (moduleLists[i].module_name == mn) {
      info = moduleLists[i].module_fields[fn];
      break;
    }
  }
  if (info) {
    return info;
  } else {
    throw new Error('FieldInfo: ' + mn + ' ' + fn);
  }
};


var default_group_test = function(mn, nc, np) {
  for (var i = 0; i < nc.length; i++) {
    var name = nc[i];
    var group = new ydn.crm.sugarcrm.ui.setting.Group(mn, name);
    assertFalse('group: ' + name, group.getNormallyHide());
  }

  for (var i = 0; i < np.length; i++) {
    var name = np[i];
    var group = new ydn.crm.sugarcrm.ui.setting.Group(mn, name);
    assertTrue('group: ' + name, group.getNormallyHide());
  }
};


function test_default_group_account() {
  var nc = ['', 'email', 'name', 'phone', 'billing_address', 'shipping_address'];
  var np = ['created_by_name', 'assigned_user_name'];
  default_group_test(ydn.crm.sugarcrm.ModuleName.ACCOUNTS, nc, np);
}


function test_default_group_contacts() {
  var nc = ['', 'email', 'name', 'phone', 'primary_address', 'alt_address'];
  var np = ['created_by_name'];
  default_group_test(ydn.crm.sugarcrm.ModuleName.CONTACTS, nc, np);
}

function test_default_group_leads() {
  var nc = ['', 'email', 'name', 'phone', 'primary_address', 'alt_address'];
  var np = ['created_by_name'];
  default_group_test(ydn.crm.sugarcrm.ModuleName.LEADS, nc, np);
}


function test_default_group_notes() {
  var nc = [''];
  var np = ['created_by_name', 'email', 'name', 'phone', 'primary_address'];
  default_group_test(ydn.crm.sugarcrm.ModuleName.NOTES, nc, np);
}


function test_default_group_calls() {
  var nc = ['name'];
  var np = ['created_by_name', 'email', 'phone', 'primary_address'];
  default_group_test(ydn.crm.sugarcrm.ModuleName.CALLS, nc, np);
}


var default_field_test = function(mn, nc, np) {
  for (var i = 0; i < nc.length; i++) {
    var name = nc[i];
    var info = getFieldInfo(mn, name);
    var group = new ydn.crm.sugarcrm.ui.setting.Field(mn, info);
    assertFalse('field: ' + name, group.getNormallyHide());
  }

  for (var i = 0; i < np.length; i++) {
    var name = np[i];
    var info = getFieldInfo(mn, name);
    var group = new ydn.crm.sugarcrm.ui.setting.Field(mn, info);
    assertTrue('field: ' + name, group.getNormallyHide());
  }
};


function test_default_field_account() {
  default_field_test(ydn.crm.sugarcrm.ModuleName.ACCOUNTS,
      ['website'],
      ['id', 'rating']);
}

function test_default_field_contacts() {
  default_field_test(ydn.crm.sugarcrm.ModuleName.CONTACTS,
      [],
      ['id', 'account_id']);
}

function test_default_field_calls() {
  default_field_test(ydn.crm.sugarcrm.ModuleName.CALLS,
      ['name', 'date_start', 'date_end', 'status', 'description'],
      ['id', 'repeat_count']);
}
