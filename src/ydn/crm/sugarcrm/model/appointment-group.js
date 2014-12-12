
/**
 * @fileoverview Group model for 'appointment' group fields.
 *
 *
 */


goog.provide('ydn.crm.sugarcrm.model.AppointmentGroup');
goog.require('ydn.crm.sugarcrm.model.Group');



/**
 * Group model for 'appointment' group fields, having start time and duration.
 * @param {ydn.crm.sugarcrm.model.Record} parent
 * @constructor
 * @extends {ydn.crm.sugarcrm.model.Group}
 * @struct
 */
ydn.crm.sugarcrm.model.AppointmentGroup = function(parent) {
  goog.base(this, parent, 'appointment');
};
goog.inherits(ydn.crm.sugarcrm.model.AppointmentGroup, ydn.crm.sugarcrm.model.Group);


/**
 * @enum {string} list of field name in 'appointment' group.
 */
ydn.crm.sugarcrm.model.AppointmentGroup.FieldName = {
  START: 'date_start',
  END: 'date_end',
  HOUR: 'duration_hours',
  MINUTE: 'duration_minutes'
};


