goog.provide('ydn.crm.su.ui.setting.SettingPrefTest');
goog.setTestOnly('ydn.crm.su.ui.setting.SettingPrefTest');

goog.require('goog.testing.AsyncTestCase');
goog.require('goog.testing.asserts');
goog.require('goog.testing.jsunit');
goog.require('ydn.crm.su.ui.setting.Field');
goog.require('ydn.testing.mockExtension');

var asyncTestCase = goog.testing.AsyncTestCase.createAndInstall();


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


function test_saving_field() {
  var name = 'name';
  var mn = ydn.crm.su.ModuleName.ACCOUNTS;
  var info = getFieldInfo(mn, name);
  var field = new ydn.crm.su.ui.setting.Field(mn, info);
  assertFalse(field.getNormallyHide());
  asyncTestCase.waitForAsync();
  field.setNormallyHide(true).addBoth(function(x) {
    assertTrue(field.getNormallyHide());
    asyncTestCase.continueTesting();
  });
}


function test_saving_group() {
  var name = 'name';
  var mn = ydn.crm.su.ModuleName.ACCOUNTS;
  var group = new ydn.crm.su.ui.setting.Group(mn, name);
  assertFalse(group.getNormallyHide());
  asyncTestCase.waitForAsync();
  group.setNormallyHide(true).addBoth(function (x) {
    assertTrue(group.getNormallyHide());
    asyncTestCase.continueTesting();
  });
}
