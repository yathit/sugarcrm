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
  panel.updateHeader();
  ydn.msg.getChannel().send(ydn.crm.Ch.Req.LIST_SUGAR_DOMAIN).addCallback(
      function(sugars) {
        panel.updateSugarPanels(sugars);
      }, this);
}, function(e) {
  window.console.error(e);
});



var btn = document.getElementById('set');
btn.onclick = function(e) {
  var input = document.getElementById('email');
  var cm = null;
  if (input.value) {
    cm = new ydn.crm.inj.Context(input.value);
  }

  panel.updateForNewContact(cm);
};



var btn_gmail = document.getElementById('cp-gmail');
btn_gmail.onclick = function(e) {
  ydn.msg.getChannel(ydn.msg.Group.GMAIL).send(ydn.msg.RReq.HTML_BODY_INNER).addBoth(function(x) {
    console.log(x);
  })
};
