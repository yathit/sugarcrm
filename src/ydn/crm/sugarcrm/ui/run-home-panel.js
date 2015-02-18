/**
 * @fileoverview About this file
 */

ydn.ui.setTemplateDocument(chrome.extension.getURL(ydn.crm.base.INJ_TEMPLATE));


ydn.crm.msg.Manager.addConsumer(new ydn.crm.msg.ConsoleStatusBar());
ydn.msg.initPipe('dev');
var user = ydn.crm.ui.UserSetting.getInstance();
var sugar, panel;


user.onReady().addCallbacks(function() {
  ydn.crm.su.model.Sugar.list().addCallback(function(sugars) {
    panel = new ydn.crm.su.ui.HomePanel(sugars[0]);
    panel.render(document.querySelector('.inj'));
  });
}, function(e) {
  window.console.error(e);
});


