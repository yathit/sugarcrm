/**
 * @fileoverview About this file
 */

// ydn.msg.Pipe.DEBUG =  true;
ydn.crm.msg.Manager.addConsumer(new ydn.crm.msg.ConsoleStatusBar());
ydn.msg.initPipe('dev');
// ydn.debug.log('ydn.crm', 'finer');
var user = ydn.crm.ui.UserSetting.getInstance();

ydn.crm.sugarcrm.ui.group.Group.DEBUG =  true;

var panel = new ydn.crm.ui.SidebarPanel();
panel.render(document.querySelector('.inj'));
var activity_panel, new_record_panel;

user.onReady().addCallbacks(function() {
  ydn.msg.getChannel().send(ydn.crm.Ch.Req.LIST_SUGAR).addCallback(
      function(sugars) {
        console.log(sugars);
        panel.setSugarCrm(sugars[0]);
        setTimeout(function() {
          activity_panel = panel.getChildAt(0).getChildAt(0).getChildAt(0);
          new_record_panel = activity_panel.getChildAt(2);
        }, 1000);
      }, this);
}, function(e) {
  window.console.error(e);
});


