/**
 * @fileoverview About this file
 */

ydn.ui.setTemplateDocument(chrome.extension.getURL(ydn.crm.base.INJ_TEMPLATE));
ydn.crm.msg.Manager.addConsumer(new ydn.crm.msg.ConsoleStatusBar());
ydn.msg.initPipe('popup');
ydn.debug.log('ydn.crm', 'finer');
var panel, sugar, search;
ydn.crm.su.model.Search.DEBUG =  true;

ydn.crm.su.model.GDataSugar.get().addCallback(function (x) {

  sugar = x;

  search = new ydn.crm.su.model.Search(sugar);
  panel = new ydn.crm.su.ui.HoverResultList(search);
  var root = document.getElementById('sync-panel-root');
  panel.render(root);

});


var el_search = document.getElementById('search');
el_search.addEventListener('keyup', function(e) {
  if (e.keyCode == 13) {
    search.search(el_search.value);
  }
}, false);


var el_sel = document.getElementById('target');
el_sel.onchange = function(e) {
  search.setTargetModule(el_sel.value);
};





