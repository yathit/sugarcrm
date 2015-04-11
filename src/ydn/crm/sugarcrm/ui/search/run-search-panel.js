/**
 * @fileoverview About this file
 */

ydn.ui.setTemplateDocument(chrome.extension.getURL(ydn.crm.base.INJ_TEMPLATE));
ydn.crm.msg.Manager.addConsumer(new ydn.crm.msg.ConsoleStatusBar());
ydn.msg.initPipe('popup');
ydn.debug.log('ydn.crm', 'finer');
var panel;

ydn.crm.su.model.GDataSugar.list().addCallback(function(models) {
  for (var i = 0; i < models.length; i++) {
    if (models[i].isLogin()) {
      var model = models[i];
      ydn.crm.ui.UserSetting.getInstance().getModuleInfo(model.getDomain())
          .addCallback(function(info) {
            panel = new ydn.crm.su.ui.SearchPanel(model);
            var root = document.getElementById('sync-panel-root');
            panel.render(root);
          }, this);
      return;
    }
  }
});


