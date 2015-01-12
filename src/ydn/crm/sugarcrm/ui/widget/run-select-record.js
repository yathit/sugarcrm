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


ydn.crm.sugarcrm.model.GDataSugar.list().addCallbacks(function(models) {
  for (var i = 0; i < models.length; i++) {
    sugar = /** @type {ydn.crm.sugarcrm.model.GDataSugar} */ (models[i]);
    document.getElementById('gmail-account').textContent = sugar.getGDataAccount();

    panel = new ydn.crm.sugarcrm.ui.widget.SelectRecord(sugar,
        ydn.crm.sugarcrm.ModuleName.ACCOUNTS);
    panel.render(document.getElementById('record-root'));
    break;
  }
}, function(e) {
  throw e;
});


