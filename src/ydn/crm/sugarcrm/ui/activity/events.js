/**
 * @fileoverview Activity events.
 */

goog.provide('ydn.crm.sugarcrm.ui.activity.RecordViewEvent');
goog.require('goog.events.Event');
goog.require('ydn.crm.sugarcrm');



/**
 * Edit click event.
 * @param {ydn.crm.sugarcrm.ModuleName} m_name module name..
 * @param {string} id target.
 * @param {goog.events.EventTarget} event_target
 * @extends {goog.events.Event}
 * @constructor
 * @struct
 * @suppress {checkStructDictInheritance} suppress closure-library code.
 */
ydn.crm.sugarcrm.ui.activity.RecordViewEvent = function(m_name, id, event_target) {
  goog.base(this, ydn.crm.sugarcrm.ui.activity.EventType.VIEW_RECORD,
      event_target);

  /**
   * @final
   * @type {ydn.crm.sugarcrm.ModuleName}
   */
  this.module = m_name;
  /**
   * @final
   * @type {string}
   */
  this.id = id;
};
goog.inherits(ydn.crm.sugarcrm.ui.activity.RecordViewEvent, goog.events.Event);


/**
 * @enum {string} activity event types.
 */
ydn.crm.sugarcrm.ui.activity.EventType = {
  VIEW_RECORD: 'vr'
};
