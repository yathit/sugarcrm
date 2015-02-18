/**
 * @fileoverview About this file
 */

// ydn.msg.Pipe.DEBUG =  true;
ydn.ui.setTemplateDocument(chrome.extension.getURL(ydn.crm.base.INJ_TEMPLATE));
// ydn.crm.su.ui.record.Record.DEBUG =  true;
// ydn.crm.su.ui.SearchPanel.DEBUG =  true;

ydn.crm.msg.Manager.addConsumer(new ydn.crm.msg.ConsoleStatusBar());
ydn.msg.initPipe('dev');
// ydn.debug.log('ydn.crm', 'finer');
var user = ydn.crm.ui.UserSetting.getInstance();
var sugar;

// ydn.crm.su.ui.group.Group.DEBUG =  true;
// ydn.crm.su.ui.activity.DetailPanel.DEBUG =  true;

var panel = new ydn.crm.ui.SidebarPanel();
panel.render(document.querySelector('.inj'));
var activity_panel, new_record_panel;

user.onReady().addCallbacks(function() {
  ydn.msg.getChannel().send(ydn.crm.ch.Req.LIST_SUGAR).addCallback(
      function(sugars) {
        console.log(sugars);
        panel.setSugarCrm(sugars[0]).addCallbacks(function(x) {
          activity_panel = panel.getChildAt(0).getChildAt(0).getChildAt(0);
          new_record_panel = activity_panel.getChildAt(2);
          sugar = x;
        }, function(e) {
          window.console.error(e);
        });

      }, this);
}, function(e) {
  window.console.error(e);
});


