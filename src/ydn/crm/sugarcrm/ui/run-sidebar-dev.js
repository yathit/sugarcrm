/**
 * @fileoverview About this file
 */

// ydn.msg.Pipe.DEBUG =  true;
ydn.crm.msg.Manager.addConsumer(new ydn.crm.msg.ConsoleStatusBar());
ydn.msg.initPipe('dev');
// ydn.debug.log('ydn.crm', 'finer');
var user = ydn.crm.ui.UserSetting.getInstance();
var inj = document.querySelector('.inj');

var panel = new ydn.crm.ui.SidebarPanel();
panel.render(inj);

user.onReady().addCallbacks(function() {

  ydn.msg.getChannel().send(ydn.crm.Ch.Req.LIST_SUGAR).addCallback(
      function(sugars) {
        console.log(sugars);
        panel.setSugarCrm(sugars[0]);
      }, this);
}, function(e) {
  window.console.error(e);
});


