/**
 * @fileoverview About this file
 */


ydn.app.msg.Manager.addConsumer(new ydn.app.msg.ConsoleStatusBar());

var about = {
  "baseUrl": "https://qzihat7936.trial.sugarcrm.com",
  "domain": "qzihat7936.trial.sugarcrm.com",
  "userName": "jane",
  "isLogin": true,
  "hostPermission": true
};
var modules_info_arr = [];
for (var x in normalized_module_info) {
  modules_info_arr.push(normalized_module_info[x]);
}
var sugar = new ydn.crm.sugarcrm.model.GDataSugar(about, modules_info_arr, 'test@yathit.com');

var obj = {
  "assigned_user_name": "sarah",
  "modified_by_name": "admin",
  "created_by_name": "admin",
  "my_favorite": false,
  "following": "",
  "id": "6f4c1746-a824-f11b-6e8c-523cc72804bf",
  "name": "Roscoe Ashe",
  "date_entered": "2013-09-20 22:10:00",
  "date_modified": "2013-09-20 22:10:00",
  "modified_user_id": "1",
  "created_by": "1",
  "doc_owner": "",
  "user_favorites": "",
  "description": "",
  "deleted": "0",
  "assigned_user_id": "seed_sarah_id",
  "team_id": "West",
  "team_set_id": "5028a240-eeba-750b-3074-523cc7e493bf",
  "team_count": "",
  "team_name": "West",
  "email": [
    {
      "email_address": "the.phone.kid@example.biz",
      "email_address_caps": "THE.PHONE.KID@EXAMPLE.BIZ",
      "invalid_email": "0",
      "opt_out": "1",
      "date_created": "2013-09-20 22:10:00",
      "date_modified": "2013-09-20 22:10:00",
      "id": "7045830f-3cd4-24b5-15ae-523cc7f78af7",
      "email_address_id": "705868fa-03f7-358b-8193-523cc70d8ce1",
      "bean_id": "6f4c1746-a824-f11b-6e8c-523cc72804bf",
      "bean_module": "Contacts",
      "primary_address": "0",
      "reply_to_address": "0",
      "deleted": "0"
    },
    {
      "email_address": "im.im.support@example.de",
      "email_address_caps": "IM.IM.SUPPORT@EXAMPLE.DE",
      "invalid_email": "0",
      "opt_out": "0",
      "date_created": "2013-09-20 22:10:00",
      "date_modified": "2013-09-20 22:10:00",
      "id": "7018b254-b8a7-612d-af7f-523cc723ce6f",
      "email_address_id": "70273f5e-8a9a-c3f0-1a03-523cc7728857",
      "bean_id": "6f4c1746-a824-f11b-6e8c-523cc72804bf",
      "bean_module": "Contacts",
      "primary_address": "1",
      "reply_to_address": "1",
      "deleted": "0"
    }
  ],
  "email1": "im.im.support@example.de",
  "email2": "the.phone.kid@example.biz",
  "invalid_email": "0",
  "email_opt_out": "0",
  "email_addresses_non_primary": "",
  "salutation": "",
  "first_name": "Roscoe",
  "last_name": "Ashe",
  "full_name": "Roscoe Ashe",
  "title": "IT Developer",
  "facebook": "",
  "twitter": "",
  "googleplus": "",
  "department": "",
  "do_not_call": "0",
  "phone_home": "(564) 729-0964",
  "phone_mobile": "(118) 802-8863",
  "phone_work": "(768) 035-6781",
  "phone_other": "",
  "phone_fax": "",
  "primary_address_street": "345 Sugar Blvd.",
  "primary_address_street_2": "",
  "primary_address_street_3": "",
  "primary_address_city": "Santa Monica",
  "primary_address_state": "CA",
  "primary_address_postalcode": "75217",
  "primary_address_country": "USA",
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
  "account_name": "Tortoise Corp",
  "account_id": "3daf1e03-b57c-bc0b-d5ca-523cc7512659",
  "dnb_principal_id": "",
  "opportunity_role_fields": "                                                                                                                                                                                                                                                              ",
  "opportunity_role_id": "",
  "opportunity_role": "",
  "reports_to_id": "",
  "report_to_name": "",
  "birthdate": false,
  "portal_name": "RoscoeAshe115",
  "portal_active": true,
  "portal_password": "$1$ASLZa/cX$uK6TU9svKU9djhrdykSnB1",
  "portal_password1": "",
  "portal_app": "",
  "preferred_language": "en_us",
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
  "opportunity_role_mkto_id": "",
  "deptcat_c": "",
  "modified_user_name": "admin",
  "ydn$emails": [
    "the.phone.kid@example.biz",
    "im.im.support@example.de",
    "im.im.support@example.de",
    "the.phone.kid@example.biz"
  ],
  "ydn$phones": [
    "5647290964",
    "1188028863",
    "7680356781"
  ]
};
var m_name = 'Contacts';
var r = new ydn.crm.sugarcrm.Record(sugar.getDomain(), m_name, obj);
model = new ydn.crm.sugarcrm.model.Record(sugar, r);
panel = new ydn.crm.sugarcrm.ui.record.Record(model);
var us = ydn.crm.ui.UserSetting.getInstance();
us.onReady();
us.loadSugarCrmSetting().addBoth(function() {
  panel.render(document.getElementById('record-root'));
});


