/**
 * @fileoverview About this file
 */


ydn.crm.msg.Manager.addConsumer(new ydn.crm.msg.ConsoleStatusBar());
ydn.msg.initPipe('popup');
ydn.debug.log('ydn.crm', 'finer');
var panel, sugar, new_record;
var user = ydn.crm.ui.UserSetting.getInstance();
var inj = document.querySelector('.inj');
inj.style.maxWidth = '20em';
var div = document.getElementById('new-record');
ydn.crm.shared.logger.info('activity panel test');

var st = new ydn.crm.msg.StatusBar();
st.render(document.getElementById('status'));
ydn.crm.msg.Manager.addConsumer(st);

ydn.crm.sugarcrm.model.GDataSugar.list().addCallbacks(function(models) {
  for (var i = 0; i < models.length; i++) {
    sugar = /** @type {ydn.crm.sugarcrm.model.GDataSugar} */ (models[i]);
    document.getElementById('gmail-account').textContent = sugar.getGDataAccount();
    new_record = new ydn.crm.sugarcrm.model.Record(sugar,
        new ydn.crm.sugarcrm.Record(sugar.getDomain(), ydn.crm.ui.DEFAULT_MODULE));
    panel = new ydn.crm.sugarcrm.ui.NewRecord(new_record);
    panel.render(div);
    break;
  }
}, function(e) {
  throw e;
});
