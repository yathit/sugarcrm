goog.provide('ydn.crm.su.ui.record.RecordTest');
goog.setTestOnly('ydn.crm.su.ui.record.RecordTest');

goog.require('goog.testing.asserts');
goog.require('goog.testing.jsunit');
goog.require('ydn.crm.su.model.Sugar');
goog.require('ydn.crm.su.ui.record.Record');
goog.require('ydn.crm.test');

var mock_el = document.createElement('div');
document.body.appendChild(mock_el);


function setUp() {
  ydn.crm.test.init();
  ydn.crm.test.getMain().addMockRespond('gdata-list-contact-by-email', []);
  ydn.crm.test.getMain().addMockRespond('gdata-list-contact', []);
  ydn.crm.test.getMain().addMockSugarRespond('query', [{result: []}]);
  ydn.crm.test.getMain().addMockSugarRespond('list-name', []);
  ydn.crm.test.getMain().addMockRespond('sync-q', []);

  ydn.crm.su.ui.record.Record.prototype.applyPatchImmediately_ = true;

}

function tearDown() {
  mock_el.innerHTML = '';
}

function test_rendering() {

  var record = ydn.crm.test.createContactRecord();

  var obj = record.record.obj;
  var name = obj['full_name'];
  var phone_home = obj['phone_home'];
  var exp_email1 = obj['email'][0]['email_address'];
  var exp_email2 = obj['email'][1]['email_address'];

  var panel = new ydn.crm.su.ui.record.Record(record);
  panel.render(mock_el);

  var name_group = document.querySelector('div.record-group[name="name"]');
  var name_el = name_group.querySelectorAll('input.value');
  assertEquals('name', name, name_el[0].value);

  var email_group = document.querySelector('div.record-group[name="email"]');
  var email_el = email_group.querySelectorAll('input.value');
  assertEquals('email1', exp_email1, email_el[0].value);
  assertEquals('email2', exp_email2, email_el[1].value);

  var phone_field = document.querySelector('div.field[name="phone_home"]');
  var phone_el = phone_field.querySelector('input.value');
  assertEquals('phone_home', phone_home, phone_el.value);

}

function test_rendering_account_name() {

  var obj = {
    'id': '14931041-0811-1232-7bfc-5402b6f6dd93',
    'name': 'Chaw Su'
  };
  var sugar = ydn.crm.test.createSugar();
  var r = new ydn.crm.su.Record(sugar.getDomain(), ydn.crm.su.ModuleName.ACCOUNTS, obj);
  var record = new ydn.crm.su.model.Record(sugar, r);

  var panel = new ydn.crm.su.ui.record.Record(record);
  panel.render(mock_el);

  var name_el = document.querySelector('.field[name="name"] input.value');
  assertEquals('name', obj.name, name_el.value);

}

function test_normally_hide_setting() {
  var record = ydn.crm.test.createContactRecord();
  var panel = new ydn.crm.su.ui.record.Record(record);
  panel.render(mock_el);
  var name_group = panel.body_panel.getChildByGroup('name');
  assertFalse('normally hide value of name group', name_group.isNormallyHide());
  /*
  var team_group = panel.body_panel.getChildByGroup('team_name');
  assertTrue('normally hide value of team_group group', team_group.isNormallyHide());
  */
}


function test_edit_name() {

  var record = ydn.crm.test.createContactRecord(null);

  var record_panel = new ydn.crm.su.ui.record.Record(record);
  record_panel.render(mock_el);

  var called = false;
  record_panel.patch = function(patch) {
    assertEquals('first name', 'Kyaw', patch['first_name']);
    assertEquals('last name', 'Tun', patch['last_name']);
    called = true;
  };

  record_panel.simulateEdit({'first_name': 'Kyaw'});
  record_panel.simulateEdit({'last_name': 'Tun'}, true);
  assertTrue(called);
}


var edit_email_test = function(is_ce) {
  var sugar = ydn.crm.test.createSugar(is_ce);
  var record = ydn.crm.test.createContactRecord(sugar);
  var record_panel = new ydn.crm.su.ui.record.Record(record);


  var called = false;
  record_panel.patch = function(patch) {
    assertEquals('email1', 'foo@example.com', patch['email1']);

    called = true;
  };

  record_panel.render(mock_el);
  record_panel.simulateEdit({'email1': 'foo@example.com'}, true);

  assertTrue(called);
};


function test_edit_email_ce() {
  edit_email_test(true);
}


function test_edit_email_ent() {
  edit_email_test(false);
}


function test_edit_full_name() {
  var record = ydn.crm.test.createRecord(null, ydn.crm.su.ModuleName.CONTACTS);
  var record_panel = new ydn.crm.su.ui.record.Record(record);
  var called = false;
  record_panel.patch = function(patch) {
    assertEquals('full_name', 'Test User', patch['full_name']);
    called = true;
  };
  record_panel.render(mock_el);
  record_panel.simulateEdit({'full_name': 'Test User'}, true);
  assertTrue(called);
}


function test_single_edit() {
  var r = {
    "assigned_user_name": "",
    "modified_by_name": "Chad Hutchins",
    "created_by_name": "Chad Hutchins",
    "my_favorite": false,
    "following": "",
    "id": "1009c393-83bd-207d-c234-547f74cc5d5c",
    "name": "Carol Poholsky",
    "date_entered": "2014-12-03 20:34:28",
    "date_modified": "2014-12-03 20:34:28",
    "modified_user_id": "1",
    "created_by": "1",
    "doc_owner": "",
    "user_favorites": "",
    "description": "",
    "deleted": "0",
    "assigned_user_id": "",
    "team_id": "1",
    "team_set_id": "1",
    "team_count": "",
    "team_name": "Global",
    "email": [
      {
        "email_address": "poholskyc@perich.com",
        "email_address_caps": "POHOLSKYC@PERICH.COM",
        "invalid_email": "0",
        "opt_out": "0",
        "date_created": "2014-12-03 20:34:28",
        "date_modified": "2014-12-03 20:34:28",
        "id": "26fc1a2c-ade3-e19c-a3e3-547f744f946d",
        "email_address_id": "2721b7c8-75ff-efd2-7ad3-547f745518bc",
        "bean_id": "1009c393-83bd-207d-c234-547f74cc5d5c",
        "bean_module": "Contacts",
        "primary_address": "1",
        "reply_to_address": "0",
        "deleted": "0"
      }
    ],
    "email1": "poholskyc@perich.com",
    "email2": "",
    "invalid_email": "0",
    "email_opt_out": "0",
    "email_addresses_non_primary": "",
    "salutation": "",
    "first_name": "Carol",
    "last_name": "Poholsky",
    "full_name": "Carol Poholsky",
    "title": "",
    "facebook": "",
    "twitter": "",
    "googleplus": "",
    "department": "",
    "do_not_call": "0",
    "phone_home": "",
    "phone_mobile": "",
    "phone_work": "",
    "phone_other": "",
    "phone_fax": "",
    "primary_address_street": "",
    "primary_address_street_2": "",
    "primary_address_street_3": "",
    "primary_address_city": "",
    "primary_address_state": "",
    "primary_address_postalcode": "",
    "primary_address_country": "",
    "alt_address_street": "",
    "alt_address_street_2": "",
    "alt_address_street_3": "",
    "alt_address_city": "",
    "alt_address_state": "",
    "alt_address_postalcode": "",
    "alt_address_country": "",
    "assistant": "",
    "assistant_phone": "",
    "picture": "",
    "email_and_name1": "",
    "lead_source": "",
    "dnb_principal_id": "",
    "opportunity_role_fields": "                                                                                                                                                                                                                                                              ",
    "opportunity_role_id": "",
    "opportunity_role": "",
    "reports_to_id": "",
    "report_to_name": "",
    "birthdate": false,
    "portal_name": "",
    "portal_active": "0",
    "portal_password": "",
    "portal_password1": "",
    "portal_app": "",
    "preferred_language": "",
    "campaign_id": "",
    "campaign_name": "",
    "c_accept_status_fields": "                                                                                                                                                                                                                                                              ",
    "m_accept_status_fields": "                                                                                                                                                                                                                                                              ",
    "accept_status_id": "",
    "accept_status_name": "",
    "accept_status_calls": "",
    "accept_status_meetings": "",
    "sync_contact": false,
    "mkto_sync": "0",
    "mkto_id": "",
    "mkto_lead_score": "",
    "is_customer_c": "yes",
    "newsletter_c": "0",
    "products_c": "",
    "mailchimp_dropdown_c": "first_choice",
    "query_name": "",
    "gcontact_id": "",
    "maps_lat": "",
    "maps_long": "",
    "ydn$emails": [
      "poholskyc@perich.com",
      "poholskyc@perich.com"
    ],
    "ydn$phones": []
  };

  var record = ydn.crm.test.createRecord(null, ydn.crm.su.ModuleName.CONTACTS, r);
  var record_panel = new ydn.crm.su.ui.record.Record(record);
  var called = false;
  record_panel.patch = function(patch) {
    console.log(patch);
    assertEquals('last_name', 'Poholskys', patch['last_name']);
    assertEquals('number of changes', 1, Object.keys(patch).length);
    called = true;
  };
  record_panel.render(mock_el);
  record_panel.refresh();
  record_panel.simulateEdit({'last_name': 'Poholskys'}, true);
  assertTrue(called);

}

