goog.provide('ydn.crm.su.ui.setting.SettingTest');
goog.setTestOnly('ydn.crm.su.ui.setting.SettingTest');

goog.require('goog.testing.asserts');
goog.require('goog.testing.jsunit');
goog.require('ydn.crm.su.ui.setting.Field');
goog.require('ydn.testing.mockExtension');


function setUpPage() {
  for (var i = 0; i < moduleLists.length; i++) {
    ydn.crm.su.fixSugarCrmModuleMeta(moduleLists[i]);
  }
}

function setUp() {

}

function tearDown() {
  chrome.storage.local.clear();
  chrome.storage.sync.clear();
}

var getFieldInfo = function(mn, fn) {
  var info;
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
    var group = new ydn.crm.su.ui.setting.Group(mn, name);
    assertFalse('Not NormallyHide group: ' + name, group.getNormallyHide());
  }

  for (var i = 0; i < np.length; i++) {
    var name = np[i];
    var group = new ydn.crm.su.ui.setting.Group(mn, name);
    assertTrue('NormallyHide group: ' + name, group.getNormallyHide());
  }
};


function test_default_group_account() {
  var nc = ['', 'email', 'name', 'phone', 'billing_address', 'shipping_address'];
  var np = ['created_by_name'];
  default_group_test(ydn.crm.su.ModuleName.ACCOUNTS, nc, np);
}


function test_default_group_contacts() {
  var nc = ['', 'email', 'name', 'phone', 'primary_address', 'alt_address'];
  var np = ['created_by_name'];
  default_group_test(ydn.crm.su.ModuleName.CONTACTS, nc, np);
}

function test_default_group_leads() {
  var nc = ['', 'email', 'name', 'phone', 'primary_address', 'alt_address'];
  var np = ['created_by_name'];
  default_group_test(ydn.crm.su.ModuleName.LEADS, nc, np);
}


function test_default_group_calls() {
  var nc = ['name', 'appointment', 'assigned_user_name'];
  var np = ['created_by_name'];
  default_group_test(ydn.crm.su.ModuleName.CALLS, nc, np);
}

function test_default_group_meetings() {
  var nc = ['name', 'appointment', 'assigned_user_name'];
  var np = ['created_by_name'];
  default_group_test(ydn.crm.su.ModuleName.MEETINGS, nc, np);
}


var default_field_test = function(mn, nc, np) {
  for (var i = 0; i < nc.length; i++) {
    var name = nc[i];
    var info = getFieldInfo(mn, name);
    var group = new ydn.crm.su.ui.setting.Field(mn, info);
    assertFalse('Not NormallyHide field: ' + name, group.getNormallyHide());
  }

  for (var i = 0; i < np.length; i++) {
    var name = np[i];
    var info = getFieldInfo(mn, name);
    var group = new ydn.crm.su.ui.setting.Field(mn, info);
    assertTrue('NormallyHide field: ' + name, group.getNormallyHide());
  }
};


function test_default_field_account() {
  default_field_test(ydn.crm.su.ModuleName.ACCOUNTS,
      ['website'],
      ['id', 'rating']);
}

function test_default_field_contacts() {
  default_field_test(ydn.crm.su.ModuleName.CONTACTS,
      ['first_name'],
      ['id', 'account_id', 'name', 'full_name']);
}

function test_default_field_calls() {
  default_field_test(ydn.crm.su.ModuleName.CALLS,
      ['name', 'date_start', 'date_end', 'status', 'description'],
      ['id', 'repeat_count']);
}

function test_default_field_meetings() {
  default_field_test(ydn.crm.su.ModuleName.MEETINGS,
      ['name', 'date_start', 'date_end', 'status', 'description'],
      ['id', 'repeat_count']);
}

function test_default_field_notes() {
  default_field_test(ydn.crm.su.ModuleName.NOTES,
      ['name', 'description'],
      ['id', 'deleted']);
}

function test_default_field_tasks() {
  default_field_test(ydn.crm.su.ModuleName.TASKS,
      ['status', 'priority', 'description', 'date_start', 'date_due'],
      ['id', 'deleted']);
}


function test_default_field_opportunity() {
  default_field_test(ydn.crm.su.ModuleName.OPPORTUNITIES,
      ['amount'],
      ['id', 'deleted']);
}
