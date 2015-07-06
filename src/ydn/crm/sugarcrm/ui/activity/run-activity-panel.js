/**
 * @fileoverview About this file
 */

ydn.crm.su.ui.activity.DetailPanel.DEBUG =  true;
ydn.crm.su.ui.activity.Panel.DEBUG =  true;

ydn.crm.msg.Manager.addConsumer(new ydn.crm.msg.ConsoleStatusBar());
ydn.ui.setTemplateDocument(chrome.extension.getURL(ydn.crm.base.INJ_TEMPLATE));
ydn.msg.initPipe('popup');
ydn.debug.log('ydn.crm', 'finer');
var panel, sugar;
var user = ydn.crm.ui.UserSetting.getInstance();
var inj = document.querySelector('.inj');
inj.style.maxWidth = '20em';
var div = document.getElementById('activity-root');
ydn.crm.shared.logger.info('activity panel test')

ydn.crm.su.model.GDataSugar.list().addCallbacks(function(models) {
  for (var i = 0; i < models.length; i++) {
    sugar = /** @type {ydn.crm.su.model.GDataSugar} */ (models[i]);
    // console.log(sugar.getUser());
    document.getElementById('domain').textContent = sugar.getDomain();
    setTimeout(function() {
      document.getElementById('user').textContent = sugar.getUser().getId();
      document.getElementById('user-name').textContent = sugar.getUser().getLabel();
    }, 500);
    panel = new ydn.crm.su.ui.activity.Panel(sugar);
    panel.render(div);
    break;
  }
}, function(e) {
  throw e;
});
