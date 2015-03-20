goog.provide('ydn.crm.su.ui.SidebarPanelTest');
goog.setTestOnly('ydn.crm.su.ui.SidebarPanelTest');

goog.require('goog.testing.asserts');
goog.require('goog.testing.jsunit');
goog.require('ydn.crm.su.model.GDataSugar');
goog.require('ydn.crm.test');
goog.require('ydn.crm.ui.SidebarPanel');

var mock_el = document.createElement('div');
document.body.appendChild(mock_el);


function setUp() {
  ydn.crm.test.init();
  ydn.crm.test.getMain().addMockRespond('gdata-list-contact-by-email', []);
  ydn.crm.test.getMain().addMockRespond('gdata-list-contact', []);
  ydn.crm.test.getMain().addMockSugarRespond('query', [{result: []}]);
  ydn.crm.test.getMain().addMockSugarRespond('list-name', []);
  ydn.crm.test.getMain().addMockSugarRespond('keys', []);
  ydn.crm.test.getMain().addMockSugarRespond('activity-stream', []);
  ydn.crm.test.getMain().addMockRespond('sync-q', []);

}

function tearDown() {
  mock_el.innerHTML = '';
}

function test_rendering() {
  var details = ydn.crm.test.createDetails();
  var panel = new ydn.crm.ui.SidebarPanel();
  panel.render(mock_el);
  panel.setSugarCrm(details);

  var no_sugar_el = mock_el.querySelector('.no-sugar-panel');
  assertFalse(goog.style.isElementShown(no_sugar_el));

  var sugar_a = mock_el.querySelector('.sugar-panel .sugar-header .main-title a');
  assertTrue(!!sugar_a);
  assertEquals(details.about.domain, sugar_a.textContent);

  var host_per_el = mock_el.querySelector('.host-permission');
  assertFalse(goog.style.isElementShown(host_per_el));

  var login_el = mock_el.querySelector('.login-form');
  assertFalse(goog.style.isElementShown(login_el));

  var header_el = mock_el.querySelector('.sugar-header-content');
  assertTrue(goog.style.isElementShown(header_el));
}


function test_no_sugar() {

  var panel = new ydn.crm.ui.SidebarPanel();
  panel.render(mock_el);
  panel.setSugarCrm(null);

  // show "setup SugarCRM' panel
  var no_sugar_el = mock_el.querySelector('.no-sugar-panel');
  assertTrue(goog.style.isElementShown(no_sugar_el));

  var sugar_el = mock_el.querySelector('.sugar-panel');
  assertTrue(!sugar_el);
}


function test_sugar_no_host_permission_with_login() {
  var details = ydn.crm.test.createDetails();
  details.about.hostPermission = false;
  var panel = new ydn.crm.ui.SidebarPanel();
  panel.render(mock_el);
  panel.setSugarCrm(details);

  var no_sugar_el = mock_el.querySelector('.no-sugar-panel');
  assertFalse(goog.style.isElementShown(no_sugar_el));

  var sugar_a = mock_el.querySelector('.sugar-panel .sugar-header .main-title a');
  assertTrue(!!sugar_a);
  assertEquals(details.about.domain, sugar_a.textContent);

  var host_per_el = mock_el.querySelector('.host-permission');
  assertTrue(goog.style.isElementShown(host_per_el));

  var login_el = mock_el.querySelector('.login-form');
  assertFalse(goog.style.isElementShown(login_el));

  var header_el = mock_el.querySelector('.sugar-header-content');
  assertFalse(goog.style.isElementShown(header_el));
}


/**
 * Case: no host permission, not login.
 * In this case, UI request host permission first.
 */
function test_sugar_no_host_permission_without_login() {
  var details = ydn.crm.test.createDetails();
  details.about.hostPermission = false;
  details.about.isLogin = false;
  var panel = new ydn.crm.ui.SidebarPanel();
  panel.render(mock_el);
  panel.setSugarCrm(details);

  var no_sugar_el = mock_el.querySelector('.no-sugar-panel');
  assertFalse(goog.style.isElementShown(no_sugar_el));

  var sugar_a = mock_el.querySelector('.sugar-panel .sugar-header .main-title a');
  assertTrue(!!sugar_a);
  assertEquals(details.about.domain, sugar_a.textContent);

  var host_per_el = mock_el.querySelector('.host-permission');
  assertTrue(goog.style.isElementShown(host_per_el));

  var header_el = mock_el.querySelector('.sugar-header-content');
  assertFalse(goog.style.isElementShown(header_el));
}


function test_sugar_no_login() {
  var details = ydn.crm.test.createDetails();
  details.about.isLogin = false;
  var panel = new ydn.crm.ui.SidebarPanel();
  panel.render(mock_el);
  panel.setSugarCrm(details);

  var no_sugar_el = mock_el.querySelector('.no-sugar-panel');
  assertFalse(goog.style.isElementShown(no_sugar_el));

  var host_per_el = mock_el.querySelector('.host-permission');
  assertFalse(goog.style.isElementShown(host_per_el));

  var login_el = mock_el.querySelector('.login-form');
  assertTrue(goog.style.isElementShown(login_el));

}
