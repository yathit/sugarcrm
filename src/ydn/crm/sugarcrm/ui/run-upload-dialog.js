/**
 * @fileoverview About this file
 */

ydn.ui.setTemplateDocument(chrome.extension.getURL(ydn.crm.base.INJ_TEMPLATE));


ydn.crm.msg.Manager.addConsumer(new ydn.crm.msg.ConsoleStatusBar());
ydn.msg.initPipe('dev');
var user = ydn.crm.ui.UserSetting.getInstance();
var sugar;

ydn.crm.su.ui.widget.RecordMatcher.DEBUG =  true;

var btn = document.getElementById('upload');
btn.onclick = function(e) {
  ydn.crm.su.ui.UploadDialog.showModel(sugar, 'm123', 'name.png').addCallbacks(function(obj) {
    console.log(obj);
    var upload = document.getElementById('do-upload').checked;
    if (upload) {
      var url = '';
    }
  }, function(val) {
    console.log('do not upload');
  });
};

user.onReady().addCallbacks(function() {
  ydn.crm.su.model.Sugar.list().addCallbacks(function(arr) {
    sugar = arr[0];
    btn.style.display = '';
  }, function(e) {
    window.console.error(e);
  });
}, function(e) {
  window.console.error(e);
});


