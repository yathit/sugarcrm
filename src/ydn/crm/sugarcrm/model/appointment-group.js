
/**
 * @fileoverview Group model for 'appointment' group fields.
 *
 *
 */


goog.provide('ydn.crm.su.model.AppointmentGroup');
goog.require('ydn.crm.su.model.Group');
goog.require('ydn.time');



/**
 * Group model for 'appointment' group fields, having start time and duration.
 * @param {ydn.crm.su.model.Record} parent
 * @constructor
 * @extends {ydn.crm.su.model.Group}
 * @struct
 */
ydn.crm.su.model.AppointmentGroup = function(parent) {
  goog.base(this, parent, 'appointment');

  /**
   * @final
   * @type {Date}
   * @private
   */
  this.default_start_ = ydn.time.getNextNominal();
  /**
   * Default duration.
   * @type {number}
   * @private
   */
  this.default_hour_ = 0;
  /**
   * Default duration.
   * @type {number}
   * @private
   */
  this.default_minute_ = 30;
};
goog.inherits(ydn.crm.su.model.AppointmentGroup, ydn.crm.su.model.Group);


/**
 * @enum {string} list of field name in 'appointment' group.
 */
ydn.crm.su.model.AppointmentGroup.FieldName = {
  START: 'date_start',
  DUE: 'date_due',
  END: 'date_end',
  HOUR: 'duration_hours',
  MINUTE: 'duration_minutes'
};


/**
 * @inheritDoc
 */
ydn.crm.su.model.AppointmentGroup.prototype.getDefaultFieldValue = function(fn) {
  if (fn == ydn.crm.su.model.AppointmentGroup.FieldName.END ||
      fn == ydn.crm.su.model.AppointmentGroup.FieldName.DUE) {
    var duration = this.default_minute_ * ydn.time.MINUTE + this.default_hour_ * ydn.time.HOUR;
    var end_date = new Date(duration + this.default_start_.getTime());
    return ydn.crm.su.utils.toDateString(end_date);
  } else if (fn == ydn.crm.su.model.AppointmentGroup.FieldName.HOUR) {
    return String(this.default_hour_);
  } else if (fn == ydn.crm.su.model.AppointmentGroup.FieldName.MINUTE) {
    return String(this.default_minute_);
  } else if (fn == ydn.crm.su.model.AppointmentGroup.FieldName.START) {
    // default start.
    return ydn.crm.su.utils.toDateString(this.default_start_);
  } else {
    return undefined;
  }
};


/**
 * Get due date of the activity. This return Date value converted from
 *   Calls -> date_start
 *   Tasks -> date_due
 *   Meetings -> date_start
 *   Opportunities -> date_closed
 *
 * @return {?Date}
 */
ydn.crm.su.model.AppointmentGroup.prototype.getDueDate = function() {

  var info = this.getModuleInfo();
  var fields = info.module_fields;
  var val;
  if ('date_due' in fields) {
    val = this.getFieldValue('date_due');
  } else if ('date_start' in fields) {
    val = this.getFieldValue('date_start');
  } else if ('date_closed' in fields) {
    val = this.getFieldValue('date_closed');
  }
  if (!!val && goog.isString(val)) {
    return ydn.crm.su.utils.parseDate(val);
  } else {
    return null;
  }
};
