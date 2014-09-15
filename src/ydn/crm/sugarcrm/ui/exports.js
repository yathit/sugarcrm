/**
 * Created by kyawtun on 15/12/13.
 */


goog.require('ydn.crm.ui.SidebarPanel');
goog.require('ydn.crm.ui.UserSetting');
goog.require('ydn.crm.sugarcrm.ui.SearchPanel');
goog.require('ydn.crm.sugarcrm.ui.SyncPanel');




goog.exportSymbol('ydn.crm.sugarcrm.model.Sugar', ydn.crm.sugarcrm.model.Sugar);
goog.exportSymbol('ydn.crm.ui.SidebarPanel', ydn.crm.ui.SidebarPanel);
goog.exportSymbol('ydn.crm.sugarcrm.ui.SyncPanel', ydn.crm.sugarcrm.ui.SyncPanel);
goog.exportSymbol('ydn.crm.sugarcrm.ui.SearchPanel', ydn.crm.sugarcrm.ui.SearchPanel);
goog.exportProperty(ydn.crm.sugarcrm.ui.SearchPanel.prototype, 'setToolbarOptions',
    ydn.crm.sugarcrm.ui.SearchPanel.prototype.setToolbarOptions);
goog.exportSymbol('ydn.crm.ui.UserSetting', ydn.crm.ui.UserSetting);
goog.exportProperty(ydn.crm.ui.UserSetting, 'getInstance',
    ydn.crm.ui.UserSetting.getInstance);
goog.exportProperty(ydn.crm.ui.UserSetting.prototype, 'getModuleInfo',
    ydn.crm.ui.UserSetting.prototype.getModuleInfo);
goog.exportProperty(ydn.crm.ui.UserSetting.prototype, 'getUserInfo',
    ydn.crm.ui.UserSetting.prototype.getUserInfo);
goog.exportProperty(ydn.crm.ui.UserSetting.prototype, 'onReady',
    ydn.crm.ui.UserSetting.prototype.onReady);
goog.exportProperty(ydn.crm.ui.UserSetting.prototype, 'show',
    ydn.crm.ui.UserSetting.prototype.show);
goog.exportProperty(ydn.crm.ui.UserSetting.prototype, 'getLoginEmail',
    ydn.crm.ui.UserSetting.prototype.getLoginEmail);
goog.exportProperty(ydn.crm.sugarcrm.model.Sugar, 'list',
    ydn.crm.sugarcrm.model.Sugar.list);
goog.exportProperty(ydn.crm.ui.ContextSidebar.prototype, 'update',
    ydn.crm.ui.ContextSidebar.prototype.updateForNewContact);






