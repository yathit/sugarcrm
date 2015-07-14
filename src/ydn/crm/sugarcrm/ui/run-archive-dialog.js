/**
 * @fileoverview About this file
 */

ydn.ui.setTemplateDocument(chrome.extension.getURL(ydn.crm.base.INJ_TEMPLATE));

ydn.crm.su.ui.widget.RecordMatcher.DEBUG =  true;

ydn.crm.msg.Manager.addConsumer(new ydn.crm.msg.ConsoleStatusBar());
ydn.msg.initPipe('dev');
var user = ydn.crm.ui.UserSetting.getInstance();
var info = {
  'from_addr': 'kid60@example.org',
  'to_addrs': 'stefano@digita.it, nettie@example.name',
  'date_sent': '2014-11-29T01:05:00.000Z',
  'html': '<span class="comment-copy">That is why StackOverflow.com is awesome! If you dont know how to do something, or just want to verify something, just google the problem out and the first link would be StackOveflow.com, in most cases.</span>',
  'mailbox_id': '',
  'message_id': '149f91526d1dd46a',
  'subject': 'Invoice',
  'attachments': [
    {
      'fn': 'ydn.db-is-sql-e-cur-qry-text-dev.js',
      'mime': 'application/x-javascript',
      'url': 'https://mail.google.com/mail/u/0/?ui=2&ik=6356a677e5'
    },
    {
      'fn': 'ydn.db-is-sql-e-cur-qry-text-dev.js.map',
      'mime': 'application/octet-stream',
      'url': 'https://mail.google.com/mail/u/0/?ui=2&ik=6356a677e5',
      'document_id': '10debb45-6153-823a-ac67-5414e1582314',
      'document_name': 'Source map'
    }
  ]
};
var info2 = {
  'from_addr': 'kyawtun@yathit.com',
  'to_addrs': 'stefano@digita.it',
  'date_sent': '2014-11-29T01:05:00.000Z',
  'html': 'That is why StackOverflow.com is awesome',
  'mailbox_id': '',
  'message_id': '149f91526d1dd46a',
  'subject': 'Test',
  'attachments': []
};
var sugar;

var iuser = {
  hasFeature: function() {
    return false;
  }
};

var btn1 = document.getElementById('archive1');
btn1.onclick = function(e) {
  ydn.crm.su.ui.ArchiveDialog.showModel(sugar, info, iuser).addCallbacks(function(obj) {
    console.log(obj);
  }, function(val) {
    console.log('do not upload');
  });
};


var btn2 = document.getElementById('archive2');
btn2.onclick = function(e) {
  ydn.crm.su.ui.ArchiveDialog.showModel(sugar, info2, iuser, record).addCallbacks(function(obj) {
    console.log(obj);
  }, function(val) {
    console.log('do not upload');
  });
};

user.onReady().addCallbacks(function() {
  ydn.crm.su.model.Sugar.get().addCallbacks(function(x) {
    sugar = x;
    if (!sugar) {
      window.console.error('No sugar');
    }
    document.querySelector('.inj').style.display = '';
  }, function(e) {
    window.console.error(e);
  });
}, function(e) {
  window.console.error(e);
});


var record = {
  "_module": "Contacts",
  "assigned_user_name": "Max Jensen",
  "modified_by_name": "Kyaw Administrator",
  "created_by_name": "Kyaw Administrator",
  "id": "21304d82-3a45-cc38-08af-5414e10464c5",
  "name": "Long Crump",
  "date_entered": "2014-09-14 00:28:31",
  "date_modified": "2014-09-14 00:28:31",
  "modified_user_id": "1",
  "created_by": "1",
  "description": "",
  "deleted": "0",
  "assigned_user_id": "seed_max_id",
  "salutation": "",
  "first_name": "Long",
  "last_name": "Crump",
  "full_name": "Long Crump",
  "title": "Mgr Operations",
  "department": "",
  "do_not_call": "0",
  "phone_home": "(538) 148-9705",
  "email": "",
  "phone_mobile": "(449) 884-9399",
  "phone_work": "(072) 271-4015",
  "phone_other": "",
  "phone_fax": "",
  "email1": "qa78@example.de",
  "email2": "kid.im.dev@example.cn",
  "invalid_email": "0",
  "email_opt_out": "0",
  "primary_address_street": "111 Silicon Valley Road",
  "primary_address_street_2": "",
  "primary_address_street_3": "",
  "primary_address_city": "San Jose",
  "primary_address_state": "CA",
  "primary_address_postalcode": "20624",
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
  "email_addresses_non_primary": "",
  "email_and_name1": "Long Crump &lt;&gt;",
  "lead_source": "Email",
  "account_name": "Anytime Air Support Inc",
  "account_id": "663a3c73-2855-43bc-b0df-5414e18a4376",
  "opportunity_role_fields": "                                                                                                                                                                                                                                                              ",
  "opportunity_role_id": "",
  "opportunity_role": "",
  "reports_to_id": "",
  "report_to_name": "",
  "birthdate": false,
  "campaign_id": "",
  "campaign_name": "",
  "c_accept_status_fields": "                                                                                                                                                                                                                                                              ",
  "m_accept_status_fields": "                                                                                                                                                                                                                                                              ",
  "accept_status_id": "",
  "accept_status_name": "",
  "sync_contact": ""
};


