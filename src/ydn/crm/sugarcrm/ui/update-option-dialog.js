/**
 * @fileoverview Update option dialog for a module.
 */


goog.provide('ydn.crm.su.ui.UpdateOptionDialog');
goog.require('ydn.crm.su.utils');
goog.require('ydn.crm.templ');
goog.require('ydn.crm.su.utils');
goog.require('ydn.ui.MessageDialog');



/**
 * @param {ydn.crm.su.ModuleName} mn target module name.
 * @constructor
 * @const
 * @extends {ydn.ui.MessageDialog}
 */
ydn.crm.su.ui.UpdateOptionDialog = function(mn) {
  /**
   * @final
   * @type {ydn.crm.su.ModuleName}
   * @private
   */
  this.module_ = mn;

  var title = 'Cache update option dialog for ' + mn + ' module';
  /**
   * @protected
   * @type {Element}
   */
  this.content = ydn.crm.su.ui.UpdateOptionDialog.renderContent_(mn);
  var buttons = ydn.ui.MessageDialog.createOKButtonSet();
  ydn.crm.su.ui.UpdateOptionDialog.base(this, 'constructor', title, this.content, buttons);

  this.enterDocument_();
};
goog.inherits(ydn.crm.su.ui.UpdateOptionDialog, ydn.ui.MessageDialog);


/**
 * @param {Event} ev
 * @private
 */
ydn.crm.su.ui.UpdateOptionDialog.prototype.onContentClick_ = function(ev) {
  var btn = ev.target;
  if (btn.tagName != 'BUTTON') {
    return;
  }
  btn.setAttribute('disabled', 'disabled');
  var me = this;
  var ch = ydn.msg.getMain().findChannel(ydn.msg.Group.SUGAR);
  var name = btn.getAttribute('name');
  var data = {'module': this.module_};
  if (name == 'clear') {
    ch.send(ydn.crm.ch.SReq.UPDATE_CLEAR, data)
        .addBoth(function(e) {
          btn.removeAttribute('disabled');
          me.refreshInfo_();
        }, this);
  } else if (name == 'reset') {
    ch.send(ydn.crm.ch.SReq.UPDATE_RESET_CHECKPOINT, data)
        .addBoth(function(e) {
          btn.removeAttribute('disabled');
          me.refreshInfo_();
        }, this);
  } else if (name == 'update') {
    ch.send(ydn.crm.ch.SReq.UPDATE_NOW, data)
        .addBoth(function(e) {
          btn.removeAttribute('disabled');
          me.refreshInfo_();
        }, this);
  } else {
    btn.removeAttribute('disabled');
    throw new Error(name);
  }
};


/**
 * @param {Event} ev
 * @private
 */
ydn.crm.su.ui.UpdateOptionDialog.prototype.onChanged_ = function(ev) {
  var name = ev.target.getAttribute('name');
  if (name == 'strategy') {
    var value = ev.target.value;
    var key = ydn.crm.base.ChromeSyncKey.SUGAR_CACHING_OPTION;
    var me = this;
    chrome.storage.sync.get(key, function(obj) {
      var option = obj[key] || {};
      var full = goog.isArray(option['full']) ?
          option['full'] : ydn.crm.su.SyncModules;
      var partial = goog.isArray(option['partial']) ?
          option['partial'] : ydn.crm.su.PartialSyncModules;
      var idx_full = full.indexOf(me.module_);
      var idx_partial = partial.indexOf(me.module_);
      if (value == 'full') {
        if (idx_full == -1) {
          if (idx_partial >= 0) {
            goog.array.removeAt(partial, idx_partial);
          }
          full.push(me.module_);
        } else {
          alert(me.module_ + ' module already in ' + value + ' cache strategy?');
          return;
        }
      } else if (value == 'partial') {
        if (idx_partial == -1) {
          if (idx_full >= 0) {
            goog.array.removeAt(full, idx_full);
          }
          partial.push(me.module_);
        } else {
          alert(me.module_ + ' module already in ' + value + ' cache strategy?');
          return;
        }
      } else {
        if (idx_full >= 0) {
          goog.array.removeAt(full, idx_full);
        }
        if (idx_partial >= 0) {
          goog.array.removeAt(partial, idx_partial);
        }
        if (idx_full == -1 && idx_partial == -1) {
          alert(me.module_ + ' module already in ' + value + ' cache strategy?');
          return;
        }
      }
      obj[key] = {
        'full': full,
        'partial': partial
      };
      var status = me.module_ + ' module set to ' + value + ' cache strategy.';
      chrome.storage.sync.set(obj, function() {
        ydn.crm.msg.Manager.addStatus(status);
      });
    });
  }

};


/**
 * Refresh info.
 * @private
 */
ydn.crm.su.ui.UpdateOptionDialog.prototype.refreshInfo_ = function() {
  var ch = ydn.msg.getMain().findChannel(ydn.msg.Group.SUGAR);
  var data = {'module': this.module_};
  var el = this.content.querySelector('.info');
  ch.send(ydn.crm.ch.SReq.UPDATE_AUDIT, data).addCallbacks(function(x) {
    el.innerHTML = x;
  }, function(e) {
    el.textContent = goog.isObject(e) ? e.message : e;
  }, this);
};


/**
 * @private
 */
ydn.crm.su.ui.UpdateOptionDialog.prototype.enterDocument_ = function() {

  ydn.crm.su.option.getCacheOption(this.module_).addCallback(function(opt) {
    var input_full = this.content.querySelector('input[value=full]');
    var input_partial = this.content.querySelector('input[value=partial]');
    var input_opt = this.content.querySelector('input[value=opportunistic]');
    var input_none = this.content.querySelector('input[value=none]');
    if (opt == ydn.crm.su.CacheOption.FULL) {
      input_full.setAttribute('checked', 'checked');
    } else if (opt == ydn.crm.su.CacheOption.PARTIAL) {
      input_partial.setAttribute('checked', 'checked');
    } else if (opt == ydn.crm.su.CacheOption.OPPORTUNISTIC) {
      input_opt.setAttribute('checked', 'checked');
    } else {
      input_none.setAttribute('checked', 'checked');
    }
  }, this);

  this.refreshInfo_();

  this.content.onclick = this.onContentClick_.bind(this);
  this.content.onchange = this.onChanged_.bind(this);

};


/**
 * @const
 * @type {string}
 */
ydn.crm.su.ui.UpdateOptionDialog.CSS_CLASS = 'update-option';


/**
 * @const
 * @type {string}
 */
ydn.crm.su.ui.UpdateOptionDialog.CSS_CLASS_DEFAULT = 'default-option';


/**
 * @override
 */
ydn.crm.su.ui.UpdateOptionDialog.prototype.dispose = function() {
  this.content.onclick = null;
  this.content = null;
  ydn.crm.su.ui.UpdateOptionDialog.base(this, 'dispose');
};


/**
 * @param {ydn.crm.su.ModuleName} mn
 * @return {Element}
 * @private
 */
ydn.crm.su.ui.UpdateOptionDialog.renderContent_ = function(mn) {
  var content = document.createElement('div');
  content.classList.add(ydn.crm.su.ui.UpdateOptionDialog.CSS_CLASS);
  content.innerHTML = ydn.crm.templ.renderUpdateOptionDialog(mn);
  return content;
};


/**
 * Show modal dialog.
 * @param {ydn.crm.su.ModuleName} mn target module name.
 * @return {!goog.async.Deferred<ydn.crm.su.ui.ArchiveDialog.ReturnValue>}
 */
ydn.crm.su.ui.UpdateOptionDialog.showModel = function(mn) {
  var dialog = new ydn.crm.su.ui.UpdateOptionDialog(mn);

  var df = new goog.async.Deferred();
  dialog.dialog.onclose = function(event) {
    df.callback(dialog.dialog.returnValue);
    dialog.dispose();
  };
  dialog.dialog.showModal();

  return df;
};

