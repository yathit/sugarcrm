/**
 * @fileoverview About this file
 */

// ydn.msg.Pipe.DEBUG = true;
var status_bar = new ydn.crm.msg.StatusBar();
status_bar.render(document.getElementById('message'));
ydn.ui.setTemplateDocument(chrome.extension.getURL(ydn.crm.base.INJ_TEMPLATE));
ydn.crm.msg.Manager.addConsumer(status_bar);
ydn.msg.initPipe('popup');
ydn.debug.log('ydn.crm', 'finer');
var panel, sugar, model;
var user = ydn.crm.ui.UserSetting.getInstance();
var inj = document.querySelector('.inj');
inj.style.maxWidth = '20em';
var div = document.getElementById('activity-root');
ydn.crm.shared.logger.info('record panel test');
var results;

if (false) {
  ydn.crm.sugarcrm.model.Record.DEBUG = true;
}

var types = document.getElementById('record-type');
for (var i = 0; i < ydn.crm.sugarcrm.CacheModules.length; i++) {
  var option = document.createElement('option');
  option.value =  ydn.crm.sugarcrm.CacheModules[i];
  option.textContent =  option.value;
  types.appendChild(option);

}


types.onchange = function(e) {
  var data_list = document.getElementById('id-list');
  data_list.innerHTML = '';
  var offset = 100 * Math.random();
  var type = types.value || 'Contacts';
  sugar.send(ydn.crm.Ch.SReq.VALUES, {'store': type, 'offset': offset}).addCallbacks(function(arr) {
    window.arr_ = arr;
    console.log(arr);
    results = arr;
    for (var i = 0; i < arr.length; i++) {
      var option = document.createElement('option');
      option.value = arr[i].id;
      data_list.appendChild(option);
    }
  }, function(e) {
    throw e;
  });
};

ydn.crm.sugarcrm.model.GDataSugar.list().addCallbacks(function(models) {
  for (var i = 0; i < models.length; i++) {
    sugar = /** @type {ydn.crm.sugarcrm.model.GDataSugar} */ (models[i]);
    document.getElementById('gmail-account').textContent = sugar.getGDataAccount();

    var r = new ydn.crm.sugarcrm.Record(sugar.getDomain(), types.value);
    model = new ydn.crm.sugarcrm.model.Record(sugar, r);
    panel = new ydn.crm.sugarcrm.ui.record.Record(model);
    panel.render(document.getElementById('record-root'));
    break;
  }
}, function(e) {
  throw e;
});

var btn_set = document.getElementById('set');
btn_set.onclick = function(e) {
  var email = document.getElementById('email').value;
  var n = results ? results.length : 0;
  for (var i = 0; i < n; i++) {
    if (results[i].id == email) {
      console.log(results[i]);
      var r = new ydn.crm.sugarcrm.Record(sugar.getDomain(), types.value, results[i]);
      model.setRecord(r);
      return;
    }
  }
  sugar.send(ydn.crm.Ch.SReq.VALUES, {'store': types.value, 'index': 'id', 'key': email}).addCallbacks(function(arr) {
    if (arr[0]) {
      var r = new ydn.crm.sugarcrm.Record(sugar.getDomain(), types.value, arr[0]);
      model.setRecord(r);
    }
  }, function(e) {
    throw e;
  })
};


var btn_test = document.getElementById('test-ui-read');
btn_test.onclick = function(e) {

  var old_data = model.getRecordValue();
  var new_data = panel.getUpdatedValue();
  var has_change = !ydn.object.equals(old_data, new_data);
  window.console.log(has_change, old_data, new_data);
};

var observer = new MutationObserver(function(ms) {
  console.log(ms);
});
var config = /** @type {MutationObserverInit} */ (/** @type {Object} */ ({
  'childList': true,
  'attributes': true,
  'characterData': true,
  'subtree': true,
  'attributeOldValue': true,
  'characterDataOldValue': true,
  'attributeFilter': ['value']
}));


