/**
 * @fileoverview About this file
 */

// ydn.msg.Pipe.DEBUG = true;
ydn.crm.msg.Manager.addConsumer(new ydn.crm.msg.ConsoleStatusBar());
ydn.msg.initPipe('dev');
ydn.debug.log('ydn.crm', 'finer');
var panel, sugar, provider;
var user = ydn.crm.ui.UserSetting.getInstance();

ydn.crm.shared.init();
ydn.ui.setTemplateDocument('/inj-template.html');


ydn.crm.su.model.Sugar.get().addCallback(function(x) {
  sugar = /** @type {ydn.crm.su.model.Sugar} */(x);
  if (!sugar) {
    window.console.error('no instance');
    return;
  }
  var provider = new ydn.crm.su.ui.RecordListProvider();
  provider.setSugar(sugar);
  panel = new ydn.crm.su.ui.ModulePage(provider);
  var root = document.getElementById('root');
  panel.render(root);
  var ul = root.querySelector('.module-record-list UL');
});

