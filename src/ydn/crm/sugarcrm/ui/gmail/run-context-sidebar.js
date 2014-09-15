/**
 * @fileoverview About this file
 */

// ydn.crm.msg.Manager.addConsumer(new ydn.crm.msg.ConsoleStatusBar());
ydn.msg.initPipe('popup');
ydn.debug.log('ydn.crm', 'finer');
var user = ydn.crm.ui.UserSetting.getInstance();
var inj = document.querySelector('.inj');
var div = document.getElementById('activity-root');
ydn.crm.shared.logger.info('record panel test');
var results;

panel = new ydn.crm.ui.ContextSidebar();
ydn.crm.msg.Manager.addStatus('Starting...');

for (var idx = 0; idx < 50; idx++) {
  ydn.crm.msg.Manager.addStatus('Testing ' + idx);
}


user.onReady().addCallbacks(function() {
  panel.render(document.querySelector('.inj'));
  panel.updateHeader();
  ydn.crm.msg.Manager.addStatus('Panel header updated.');
  ydn.msg.getChannel().send(ydn.crm.Ch.Req.LIST_SUGAR_DOMAIN).addCallback(
      function(sugars) {
        panel.updateSugarPanels(sugars).addCallback(function() {
          var cm = new ydn.crm.inj.Context('kyawtun@yathit.com', 'Kyaw Tun');
          panel.updateForNewContact(null);
        });
        ydn.crm.msg.Manager.addStatus('Sugar panel ' + sugars.join(', ') + ' added.');
      }, this);
}, function(e) {
  console.error(e);
});




