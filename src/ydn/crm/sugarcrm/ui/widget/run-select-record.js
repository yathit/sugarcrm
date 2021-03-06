/**
 * @fileoverview About this file
 */

// ydn.msg.Pipe.DEBUG = true;
var status_bar = new ydn.crm.msg.StatusBar();
status_bar.render(document.getElementById('message'));
ydn.ui.setTemplateDocument(chrome.extension.getURL(ydn.crm.base.INJ_TEMPLATE));
ydn.crm.msg.Manager.addConsumer(status_bar);
ydn.msg.initPipe('popup');
ydn.debug.log('ydn.crm', 'finer');
var panel, sugar;
var user = ydn.crm.ui.UserSetting.getInstance();
var inj = document.querySelector('.inj');
inj.style.maxWidth = '20em';
ydn.crm.su.ui.widget.RecordMatcher.DEBUG =  true;

var renderInput = function(mn) {
  var main = document.getElementById('main');
  var h3 = document.createElement('h3');
  h3.textContent = mn;
  var root = goog.soy.renderAsElement(templ.ydn.crm.inj.selectRecord, {});
  document.body.appendChild(h3);
  document.body.appendChild(root);
  var input = root.querySelector('input');
  root.addEventListener(goog.events.EventType.FOCUS, function(e) {
    var sel = ydn.crm.su.ui.widget.SelectRecord.getInstanceFor(sugar, mn);
    console.log('attach to ' + sel.getModule());
    sel.attach(root);
  }, true);
  console.log('rendered for ' +  mn);
};

ydn.crm.su.model.GDataSugar.list().addCallbacks(function(models) {
  sugar = /** @type {ydn.crm.su.model.GDataSugar} */ (models[0]);
  document.getElementById('sugarcrm-instance').textContent = sugar.getBaseUrl();

  for (var i = 0; i < ydn.crm.su.PEOPLE_MODULES.length; i++) {
    renderInput(ydn.crm.su.PEOPLE_MODULES[i]);
  }
}, function(e) {
  throw e;
});


