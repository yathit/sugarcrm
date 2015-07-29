/**
 * @fileoverview About this file
 */

// ydn.msg.Pipe.DEBUG = true;
ydn.crm.msg.Manager.addConsumer(new ydn.crm.msg.ConsoleStatusBar());
ydn.msg.initPipe('dev');
ydn.debug.log('ydn.crm', 'finer');
var sugar;
var user = ydn.crm.ui.UserSetting.getInstance();

ydn.crm.shared.init();
ydn.ui.setTemplateDocument('/inj-template.html');
var panel = new ydn.crm.su.ui.ModulePage();
var root = document.getElementById('root');
panel.render(root);


ydn.crm.su.model.Sugar.get().addCallback(function(x) {
  sugar = /** @type {ydn.crm.su.model.Sugar} */(x);
  if (!sugar) {
    window.console.error('no instance');
    return;
  }
  panel.setSugar(sugar);
  var ul = root.querySelector('.module-record-list UL');
});

