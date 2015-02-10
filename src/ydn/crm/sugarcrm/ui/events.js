/**
 * @fileoverview About this file
 */


goog.provide('ydn.crm.su.ui.events.ChangedEvent');
goog.provide('ydn.crm.su.ui.events.FieldMenuActionEvent');
goog.provide('ydn.crm.su.ui.events.NewRecordEvent');


/**
 * @enum {string}
 */
ydn.crm.su.ui.events.Type = {
  CHANGE: 'field-change',
  ACTION: 'action',
  SETTING_CHANGE: 'setting-change',
  EDIT: 'edit',
  SAVE: 'save',
  NEW: 'new',
  /**
   * @desc a new record created event.
   */
  CREATED: 'created'
};



/**
 * Input field value changed event.
 * @param {Object} patches
 * @param {Object=} opt_event_target target.
 * @extends {goog.events.Event}
 * @constructor
 * @struct
 * @suppress {checkStructDictInheritance} suppress closure-library code.
 */
ydn.crm.su.ui.events.ChangedEvent = function(patches, opt_event_target) {
  goog.base(this, ydn.crm.su.ui.events.Type.CHANGE, opt_event_target);
  /**
   * @final
   * @type {Object}
   */
  this.patches = patches;
};
goog.inherits(ydn.crm.su.ui.events.ChangedEvent, goog.events.Event);



/**
 * Input field value changed event.
 * @param {ydn.crm.su.model.Field.Command} command action command
 * @param {Object=} opt_event_target target.
 * @extends {goog.events.Event}
 * @constructor
 * @struct
 * @suppress {checkStructDictInheritance} suppress closure-library code.
 */
ydn.crm.su.ui.events.FieldMenuActionEvent = function(command, opt_event_target) {
  goog.base(this, ydn.crm.su.ui.events.Type.ACTION, opt_event_target);
  /**
   * @final
   * @type {ydn.crm.su.model.Field.Command}
   */
  this.command = command;
};
goog.inherits(ydn.crm.su.ui.events.FieldMenuActionEvent, goog.events.Event);



/**
 * Event from UI to create a new record.
 * @param {ydn.crm.su.ModuleName} name
 * @param {Object=} opt_event_target target.
 * @extends {goog.events.Event}
 * @constructor
 * @struct
 * @suppress {checkStructDictInheritance} suppress closure-library code.
 */
ydn.crm.su.ui.events.NewRecord = function(name, opt_event_target) {
  goog.base(this, ydn.crm.su.ui.events.Type.NEW, opt_event_target);
  /**
   * @final
   * @type {ydn.crm.su.ModuleName}
   */
  this.module_name = name;
};
goog.inherits(ydn.crm.su.ui.events.NewRecord, goog.events.Event);



/**
 * A new record created event.
 * @param {SugarCrm.Record} record the newly created record.
 * @param {Object=} opt_event_target target.
 * @extends {goog.events.Event}
 * @constructor
 * @struct
 * @suppress {checkStructDictInheritance} suppress closure-library code.
 */
ydn.crm.su.ui.events.Created = function(record, opt_event_target) {
  goog.base(this, ydn.crm.su.ui.events.Type.CREATED, opt_event_target);
  /**
   * @final
   * @type {SugarCrm.Record}
   */
  this.record = record;
};
goog.inherits(ydn.crm.su.ui.events.Created, goog.events.Event);


