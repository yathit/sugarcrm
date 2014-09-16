/**
 * @fileoverview About this file
 */


ydn.crm.msg.Manager.addConsumer(new ydn.crm.msg.ConsoleStatusBar());
ydn.msg.initPipe('popup');
ydn.debug.log('ydn.crm', 'finer');
var panel, sugar, model;
var user = ydn.crm.ui.UserSetting.getInstance();
var inj = document.querySelector('.inj');
inj.style.maxWidth = '20em';
var div = document.getElementById('activity-root');
ydn.crm.shared.logger.info('record panel test');
var results;


ydn.crm.sugarcrm.model.GDataSugar.list().addCallbacks(function(models) {
  for (var i = 0; i < models.length; i++) {
    sugar = /** @type {ydn.crm.sugarcrm.model.GDataSugar} */ (models[i]);
    document.getElementById('gmail-account').textContent = sugar.getGDataAccount();

    var r = new ydn.crm.sugarcrm.Record(sugar.getDomain(),
        ydn.crm.sugarcrm.ModuleName.CONTACTS);
    model = new ydn.crm.sugarcrm.model.Record(sugar, r);
    panel = new ydn.crm.sugarcrm.ui.record.Record(model);
    panel.render(document.getElementById('record-root'));
    break;
  }
}, function(e) {
  throw e;
});


var btn_test = document.getElementById('render');
btn_test.onclick = function(e) {
  var email = document.getElementById('email').value;
  var name = document.getElementById('name').value;
  sugar.update(email, name);
};



