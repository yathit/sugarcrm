
/**
 * @fileoverview Group model for 'appointment' group fields.
 *
 *
 */


goog.provide('ydn.crm.sugarcrm.model.AppointmentGroup');
goog.require('ydn.crm.sugarcrm.model.Group');
goog.require('ydn.time');



/**
 * Group model for 'appointment' group fields, having start time and duration.
 * @param {ydn.crm.sugarcrm.model.Record} parent
 * @constructor
 * @extends {ydn.crm.sugarcrm.model.Group}
 * @struct
 */
ydn.crm.sugarcrm.model.AppointmentGroup = function(parent) {
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
goog.inherits(ydn.crm.sugarcrm.model.AppointmentGroup, ydn.crm.sugarcrm.model.Group);


/**
 * @enum {string} list of field name in 'appointment' group.
 */
ydn.crm.sugarcrm.model.AppointmentGroup.FieldName = {
  START: 'date_start',
  DUE: 'date_due',
  END: 'date_end',
  HOUR: 'duration_hours',
  MINUTE: 'duration_minutes'
};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.model.AppointmentGroup.prototype.getDefaultFieldValue = function(fn) {
  if (fn == ydn.crm.sugarcrm.model.AppointmentGroup.FieldName.END ||
      fn == ydn.crm.sugarcrm.model.AppointmentGroup.FieldName.DUE) {
    var duration = this.default_minute_ * ydn.time.MINUTE + this.default_hour_ * ydn.time.HOUR;
    var end_date = new Date(duration + this.default_start_.getTime());
    return ydn.crm.sugarcrm.utils.toDateString(end_date);
  } else if (fn == ydn.crm.sugarcrm.model.AppointmentGroup.FieldName.HOUR) {
    return String(this.default_hour_);
  } else if (fn == ydn.crm.sugarcrm.model.AppointmentGroup.FieldName.MINUTE) {
    return String(this.default_minute_);
  } else if (fn == ydn.crm.sugarcrm.model.AppointmentGroup.FieldName.START) {
    // default start.
    return ydn.crm.sugarcrm.utils.toDateString(this.default_start_);
  } else {
    return undefined;
  }
};


