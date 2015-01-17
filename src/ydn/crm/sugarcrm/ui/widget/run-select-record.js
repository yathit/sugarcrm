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
var panel, sugar;
var user = ydn.crm.ui.UserSetting.getInstance();
var inj = document.querySelector('.inj');
inj.style.maxWidth = '20em';

var renderInput = function(mn) {
  var main = document.getElementById('main');
  var h3 = document.createElement('h3');
  h3.textContent = mn;
  var root = goog.soy.renderAsElement(templ.ydn.crm.inj.selectRecord, {});
  document.body.appendChild(h3);
  document.body.appendChild(root);
  var input = root.querySelector('input');
  input.onfocus = function(e) {
    var sel = ydn.crm.sugarcrm.ui.widget.SelectRecord.getInstanceFor(sugar, mn);
    sel.attach(root);
  };
};

ydn.crm.sugarcrm.model.GDataSugar.list().addCallbacks(function(models) {
  sugar = /** @type {ydn.crm.sugarcrm.model.GDataSugar} */ (models[0]);
  document.getElementById('gmail-account').textContent = sugar.getGDataAccount();

  for (var i = 0; i < ydn.crm.sugarcrm.PEOPLE_MODULES.length; i++) {
    renderInput(ydn.crm.sugarcrm.PEOPLE_MODULES[i]);
  }
}, function(e) {
  throw e;
});


