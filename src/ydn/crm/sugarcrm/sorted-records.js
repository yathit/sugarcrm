/**
 * @fileoverview Sorted SugarCRM records.
 */


goog.provide('ydn.crm.su.SortedRecords');
goog.require('goog.array');



/**
 * Sorted SugarCRM records.
 * @param {string=} opt_field sorted field name, default to `id`.
 * @param {boolean=} opt_desc true to descending order. default to ascending.
 * @constructor
 */
ydn.crm.su.SortedRecords = function(opt_field, opt_desc) {
  /**
   * sorted field name
   * @type {string|string}
   * @private
   */
  this.field_ = opt_field || 'id';
  this.desc_ = !!opt_desc;
  /**
   * @type {!Array<!SugarCrm.Record>}
   */
  this.records = [];
};


/**
 * @param {SugarCrm.Record} r
 * @return {boolean} true if added.
 */
ydn.crm.su.SortedRecords.prototype.add = function(r) {
  if (!r) {
    return false;
  }
  var field = this.field_;
  var desc = this.desc_;
  return goog.array.binaryInsert(this.records, r, function(a, b) {
    if (a.id == b.id) {
      return 0;
    } else if (a[field] > b[field]) {
      return desc ? -1 : 1;
    } else {
      return desc ? 1 : -1;
    }
  });
};


/**
 * Add all records.
 * @param {!Array<SugarCrm.Record>} arr
 * @return {number} number of records added.
 */
ydn.crm.su.SortedRecords.prototype.addAll = function(arr) {
  var cnt = 0;
  for (var i = 0; i < arr.length; i++) {
    var ok = this.add(arr[i]);
    if (ok) {
      cnt++;
    }
  }
  return cnt;
};


/**
 * Get records clone.
 * Access {@link #records} directly for read only access.
 * @return {!Array<!SugarCrm.Record>}
 */
ydn.crm.su.SortedRecords.prototype.getRecords = function() {
  return goog.array.clone(this.records);
};

