/**
 * @fileoverview About this file
 */

// ydn.msg.Pipe.DEBUG = true;
ydn.ui.setTemplateDocument(chrome.extension.getURL(ydn.crm.base.INJ_TEMPLATE));
ydn.msg.initPipe('popup');
ydn.debug.log('ydn.crm', 'finer');
var panel, sugar;

var onUpdate = function(input) {
  var label = input.value;
  console.log(label);
  document.getElementById('result').textContent = label;
};

ydn.crm.su.model.GDataSugar.list().addCallbacks(function(models) {
  sugar = /** @type {ydn.crm.su.model.GDataSugar} */ (models[0]);
  document.getElementById('sugarcrm-instance').textContent = sugar.getBaseUrl();

  panel = ydn.crm.su.ui.widget.ContactsSearch.getInstance(sugar);
  panel.attach(document.getElementById('main'), onUpdate);
}, function(e) {
  throw e;
});


