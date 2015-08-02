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
  this.key_prefix_ = 'mcko-' + db_name;
};


/**
 * Get last sync key of the given module.
 * @param {ydn.crm.su.ModuleName} mn module name.
 * @return {string} the check point.
 * @protected
 */
ydn.crm.su.UpdateCheckpoint.prototype.makeCheckPointKey = function(mn) {
  return this.key_prefix_ + '-' + mn;
};


/**
 * Get last sync checkup.
 * @param {ydn.crm.su.ModuleName} mn
 * @return {SugarCrm.SyncCheckpoint}
 */
ydn.crm.su.UpdateCheckpoint.prototype.getSyncCheckPoint = function(mn) {
  var key = this.makeCheckPointKey(mn);
  var cache = /** @type {string} */(goog.global.localStorage.getItem(key));
  if (goog.isString(cache)) {
    return /** @type {SugarCrm.SyncCheckpoint} */(JSON.parse(cache));
  } else {
    return /** @type {SugarCrm.SyncCheckpoint} */({});
  }
};


/**
 * Set last sync checkup.
 * @param {ydn.crm.su.ModuleName} mn
 * @param {SugarCrm.SyncCheckpoint} val a date time string to set. Invalid
 * value will not be set.
 */
ydn.crm.su.UpdateCheckpoint.prototype.setSyncCheckPoint = function(mn, val) {
  if (val) {
    if (/^\d{4}/.test(val.lower) && /^\d{4}/.test(val.upper)) {
      var key = this.makeCheckPointKey(mn);
      val.updated = goog.now();
      goog.global.localStorage.setItem(key, JSON.stringify(val));
    } else {
      window.console.error(val);
    }
  }
};


/**
 * Remove sync checkpoint.
 * @param {ydn.crm.su.ModuleName} mn
 */
ydn.crm.su.UpdateCheckpoint.prototype.resetCheckPoint = function(mn) {
  goog.global.localStorage.removeItem(this.makeCheckPointKey(mn));
  goog.global.localStorage.removeItem(this.makeCheckPointKey(mn));
};


/**
 * Update checkpoint.
 * @param {ydn.crm.su.ModuleName} mn
 * @param {string|undefined} lower
 * @param {string=} upper
 */
ydn.crm.su.UpdateCheckpoint.prototype.updateCheckpoint = function(mn, lower, upper) {
  var cp = /** @type {SugarCrm.SyncCheckpoint} */({});
  if (!lower || !upper) {
    cp = this.getSyncCheckPoint(mn);
  }
  cp.lower = lower || cp.lower;
  cp.upper = upper || cp.upper;
  if (cp.lower && cp.upper) {
    goog.asserts.assert(cp.lower <= cp.updated, cp.lower + ' <= ' + cp.upper);
  }
  this.setSyncCheckPoint(mn, cp);
};
