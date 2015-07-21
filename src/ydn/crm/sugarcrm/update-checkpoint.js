/**
 * @fileoverview Record update checkpoint.
 */

goog.provide('ydn.crm.su.UpdateCheckpoint');



/**
 * Record update checkpoint.
 * @param {string} db_name sugarcrm database name.
 * @constructor
 */
ydn.crm.su.UpdateCheckpoint = function(db_name) {

  /**
   * @type {string}
   * @private
   * @final
   */
  this.key_prefix_ = 'mck-' + db_name;
};


/**
 * Get last sync key of the given module.
 * @param {ydn.crm.su.ModuleName} mn module name.
 * @param {string} lower true for lower bound, false for upper bound.
 * @return {string} the check point.
 * @protected
 */
ydn.crm.su.UpdateCheckpoint.prototype.makeCheckPointKey = function(mn, lower) {
  return this.key_prefix_ + '-' + mn + '-' + lower;
};


/**
 * Get last sync checkup.
 * @param {ydn.crm.su.ModuleName} mn
 * @param {boolean} is_up true for upper bound.
 * @return {string}
 */
ydn.crm.su.UpdateCheckpoint.prototype.getSyncCheckPoint = function(mn, is_up) {
  var key = this.makeCheckPointKey(mn, is_up ? 'upper' : 'lower');
  return /** @type {string} */(goog.global.localStorage.getItem(key));
};


/**
 * Set last sync checkup.
 * @param {ydn.crm.su.ModuleName} mn
 * @param {boolean} is_up true for upper bound.
 * @param {string} val a date time string to set. Invalid value will not be set.
 */
ydn.crm.su.UpdateCheckpoint.prototype.setSyncCheckPoint = function(mn, is_up, val) {
  if (val) {
    if (/^\d{4}/.test(val)) {
      var key = this.makeCheckPointKey(mn, is_up ? 'upper' : 'lower');
      goog.global.localStorage.setItem(key, val);
    } else {
      window.console.error(val);
    }
  }
};

