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

var gmail_obs = new ydn.crm.gmail.GmailObserver();
var comp_obs = new ydn.crm.gmail.ComposeObserver(gmail_obs);
panel = new ydn.crm.sugarcrm.ContextWidget(gmail_obs, comp_obs);
ydn.crm.msg.Manager.addStatus('Starting...');

user.onReady().addCallbacks(function() {
  panel.render(document.querySelector('.inj'));

  ydn.crm.msg.Manager.addStatus('Panel header updated.');

  ydn.crm.sugarcrm.model.GDataSugar.list().addCallback(
      function(sugars) {
        panel.setSugarCrm(sugars[0]);
        ydn.crm.msg.Manager.addStatus('Sugar panel ' + sugars.join(', ') + ' added.');

        setTimeout(function() {
          panel.updateForNewContact(null);
        }, 500);
      }, this);
}, function(e) {
  console.error(e);
});


var target_sel = document.getElementById('target-context');
target_sel.onchange = function(ev) {

  var item = target_sel.children[target_sel.selectedIndex];
  console.log(item);
  var cm = new ydn.crm.inj.Context(user.getLoginEmail(), item.value, item.textContent);
  panel.updateForNewContact(cm);
};


