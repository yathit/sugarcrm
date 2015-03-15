/**
 * @fileoverview About this file
 */

ydn.ui.setTemplateDocument(chrome.extension.getURL(ydn.crm.base.INJ_TEMPLATE));


ydn.crm.msg.Manager.addConsumer(new ydn.crm.msg.ConsoleStatusBar());
ydn.msg.initPipe('dev');
var user = ydn.crm.ui.UserSetting.getInstance();
var sugar, panel;

var btn = document.getElementById('add');
btn.onclick = function(e) {
  var n = panel.relationship_modules.length;
  var mn = panel.relationship_modules[goog.math.randomInt(n)];
  var data = query = {
       'store': mn,
       'offset': goog.math.randomInt(10)
     };
  sugar.send(ydn.crm.ch.SReq.QUERY, [data]).addCallback(function(arr) {
    var r = arr[0].result[0];
    console.log(r);
    panel.addRelationship({
      module_name: mn,
      id: r.id,
      name: r.name
    })
  });
};

user.onReady().addCallbacks(function() {
  ydn.crm.su.model.Sugar.list().addCallbacks(function(arr) {
    sugar = arr[0];
    btn.style.display = '';
    panel = new ydn.crm.su.ui.Relationships(sugar);
    panel.render(document.getElementById('relationships-panel'));
  }, function(e) {
    window.console.error(e);
  });
}, function(e) {
  window.console.error(e);
});


