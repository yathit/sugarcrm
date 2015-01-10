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
 * @override
 */
ydn.crm.sugarcrm.ui.group.AssignUser.prototype.hasChanged = function() {
  var val = this.renderer.getInputValue(this);
  var org = this.getModel().getGroupValue();
  return val != org;
};


/**
 * @override
 */
ydn.crm.sugarcrm.ui.group.AssignUser.prototype.collectData = function() {
  var val = this.renderer.getInputValue(this);
  if (val) {
    var obj = {'assigned_user_name': val};
    var el = document.getElementById(this.getDataListId());
    if (el) {
      var option = el.querySelector('option[value="' + val + '"]');
      if (option) {
        var id = el.getAttribute('data-id');
        obj['assigned_user_id'] = id;
      }
    }
    return obj;
  } else {
    return null;
  }
};


/**
 * @override
 */
ydn.crm.sugarcrm.ui.group.AssignUser.prototype.getPatch = function() {
  if (this.hasChanged()) {
    return this.collectData();
  } else {
    return null;
  }
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
        // Note: User `name` is not unique, we should use `id` instead.
        // Unfortunately `option` element supports only `value` attribute.
        // Look like we need to implement custom element for selecting user.
        option.value = obj['name'];
        option.setAttribute('data-id', obj['id']);
        el.appendChild(option);
      }
    }, function(e) {
      window.console.error(e);
    }, this);
  }
  return id;
};
