goog.provide('ydn.crm.sugarcrm.ui.setting.SettingTest');
goog.setTestOnly('ydn.crm.sugarcrm.ui.setting.SettingTest');

goog.require('goog.testing.asserts');
goog.require('goog.testing.jsunit');
goog.require('ydn.crm.sugarcrm.ui.setting.Field');
goog.require('ydn.testing.mockExtension');



function setUp() {

}

function tearDown() {
  chrome.storage.local.clear();
  chrome.storage.sync.clear();
}


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




