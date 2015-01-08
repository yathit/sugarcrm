/**
 * @fileoverview Panel for name group fields.
 *
 * This module provide adding, linking and syncing.
 */


goog.provide('ydn.crm.sugarcrm.ui.group.AssignUser');
goog.require('ydn.crm.sugarcrm');
goog.require('ydn.crm.sugarcrm.model.AssignUserGroup');
goog.require('ydn.crm.sugarcrm.ui.group.AssignUserRenderer');
goog.require('ydn.crm.sugarcrm.ui.group.SimpleGroup');



/**
 * Panel for name group fields.
 * @param {ydn.crm.sugarcrm.model.AssignUserGroup} model
 * @param {goog.dom.DomHelper=} opt_dom
 * @constructor
 * @struct
 * @extends {ydn.crm.sugarcrm.ui.group.SimpleGroup}
 */
ydn.crm.sugarcrm.ui.group.AssignUser = function(model, opt_dom) {
  var r = ydn.crm.sugarcrm.ui.group.AssignUserRenderer.getInstance();
  goog.base(this, model, r, opt_dom);
};
goog.inherits(ydn.crm.sugarcrm.ui.group.AssignUser, ydn.crm.sugarcrm.ui.group.SimpleGroup);


/**
 * @define {boolean} debug flag
 */
ydn.crm.sugarcrm.ui.group.AssignUser.DEBUG = false;


/**
 * @return {ydn.crm.sugarcrm.model.AssignUserGroup}
 * @override
 */
ydn.crm.sugarcrm.ui.group.AssignUser.prototype.getModel;


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.ui.group.AssignUser.prototype.collectData = function() {
  var model = this.getModel();
  var value = this.getInputValue();
  var org_value = model.getGroupValue();
  if (value == org_value) {
    // HACK: Since our parsing is not reliable, we check the input value is
    // tempered or not. If not, we just skip.
    // NOTE: Name may change via, popup dialog as well.
    if (ydn.crm.sugarcrm.ui.group.AssignUser.DEBUG) {
      window.console.log('Name:collectData:No change');
    }
    return null;
  }

  throw new Error('Not impl');
};


/**
 * Get datalist element id. If the element does not exist, create a new one.
 * @return {string}
 */
ydn.crm.sugarcrm.ui.group.AssignUser.prototype.getDataListId = function() {
  /**
   * @type {ydn.crm.sugarcrm.model.AssignUserGroup}
   */
  var model = this.getModel();
  var id = model.getMeta().getDomain() + '-assign-user-datalist-id';
  var el = document.getElementById(id);
  if (!el) {
    el = document.createElement('datalist');
    el.id = id;
    document.body.appendChild(el);
    var ch = model.getMeta().getChannel();
    var q = {
      'module': ydn.crm.sugarcrm.ModuleName.USERS
    };
    ch.send(ydn.crm.Ch.SReq.LIST_NAME, q).addCallbacks(function(arr) {
      if (ydn.crm.sugarcrm.ui.group.AssignUser.DEBUG) {
        window.console.log(arr);
      }
      var el = document.getElementById(id);
      for (var i = 0; i < arr.length; i++) {
        var obj = arr[i];
        var option = document.createElement('option');
        option.value = obj['id'];
        option.textContent = obj['name'];
        el.appendChild(option);
      }
    }, function(e) {
      window.console.error(e);
    }, this);
  }
  return id;
};
