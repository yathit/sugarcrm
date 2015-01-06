/**
 * @fileoverview Model change event.
 */

goog.provide('ydn.crm.sugarcrm.model.events');


/**
 * Event types.
 *
 * Note: these event type string are exported.
 * @enum {string}
 */
ydn.crm.sugarcrm.model.events.Type = {
  CONTEXT_CHANGE: 'context-change',
  CONTEXT_DATA_CHANGE: 'context-data-change',
  CONTEXT_GDATA_CHANGE: 'context-gdata-change',
  MODULE_CHANGE: 'module-change', // change in module name
  RECORD_CHANGE: 'record-change', // change in record primary key
  RECORD_UPDATE: 'record-update', // record value changes
  GDATA_CHANGE: 'gdata-change',
  GDATA_UPDATED: 'gdata-updated'
};


/**
 * List of all events dispatched by Sugar model.
 * @const
 * @type {Array.<ydn.crm.sugarcrm.model.events.Type>}
 */
ydn.crm.sugarcrm.model.events.TYPES_SUGAR = [
  ydn.crm.sugarcrm.model.events.Type.CONTEXT_DATA_CHANGE,
  ydn.crm.sugarcrm.model.events.Type.RECORD_CHANGE,
  ydn.crm.sugarcrm.model.events.Type.GDATA_CHANGE
];


/**
 * List of all events dispatched by Module model.
 * @const
 * @type {Array.<ydn.crm.sugarcrm.model.events.Type>}
 */
ydn.crm.sugarcrm.model.events.TYPES_MODULE = [
  ydn.crm.sugarcrm.model.events.Type.MODULE_CHANGE,
  ydn.crm.sugarcrm.model.events.Type.RECORD_CHANGE,
  ydn.crm.sugarcrm.model.events.Type.RECORD_UPDATE
];



/**
 * Event for sugar models.
 * @param {ydn.crm.sugarcrm.model.events.Type} event_type event type.
 * @param {Object=} opt_event_target target.
 * @extends {goog.events.Event}
 * @constructor
 * @struct
 * @suppress {checkStructDictInheritance} suppress closure-library code.
 */
ydn.crm.sugarcrm.model.events.Event = function(event_type, opt_event_target) {
  goog.base(this, event_type, opt_event_target);
};
goog.inherits(ydn.crm.sugarcrm.model.events.Event, goog.events.Event);



/**
 * Event when inbox contact data change.
 * @param {?ydn.crm.inj.Context} context new contact data.
 * @param {ydn.gdata.m8.ContactEntry=} opt_gdata contact gdata of matching email with
 * context.
 * @param {ydn.crm.sugarcrm.Record=} opt_record SugarCRM record of matching email with
 * @param {YdnCrm.SyncRecord=} opt_sync Sync record.
 * @param {Object=} opt_event_target target.
 * @extends {ydn.crm.sugarcrm.model.events.Event}
 * @constructor
 * @struct
 */
ydn.crm.sugarcrm.model.events.ContextChangeEvent = function(context,
    opt_gdata, opt_record, opt_sync, opt_event_target) {
  goog.base(this, ydn.crm.sugarcrm.model.events.Type.CONTEXT_CHANGE, opt_event_target);
  /**
   * @final
   * @type {?ydn.crm.inj.Context}
   */
  this.context = context;
  /**
   * @final
   * @type {?ydn.gdata.m8.ContactEntry}
   */
  this.gdata = opt_gdata || null;
  /**
   * @final
   * @type {?ydn.crm.sugarcrm.Record}
   */
  this.record = opt_record || null;

  /**
   * @final
   * @type {?YdnCrm.SyncRecord}
   */
  this.sync = opt_sync || null;
};
goog.inherits(ydn.crm.sugarcrm.model.events.ContextChangeEvent, ydn.crm.sugarcrm.model.events.Event);



/**
 * Event when inbox contact data change.
 * @param {ydn.crm.inj.Context} contact new contact data.
 * @param {Object=} opt_event_target target.
 * @extends {ydn.crm.sugarcrm.model.events.Event}
 * @constructor
 * @struct
 */
ydn.crm.sugarcrm.model.events.ContextDataChangeEvent = function(contact, opt_event_target) {
  goog.base(this, ydn.crm.sugarcrm.model.events.Type.CONTEXT_DATA_CHANGE, opt_event_target);
  /**
   * @final
   * @type {ydn.crm.inj.Context}
   */
  this.contact = contact;
};
goog.inherits(ydn.crm.sugarcrm.model.events.ContextDataChangeEvent, ydn.crm.sugarcrm.model.events.Event);



/**
 * Event when inbox contact data change.
 * @param {string} domain
 * @param {ydn.crm.inj.Context} contact new contact data.
 * @param {!Array.<ydn.gdata.m8.ContactEntry>} contacts
 * @param {Object=} opt_event_target target.
 * @extends {ydn.crm.sugarcrm.model.events.Event}
 * @constructor
 * @struct
 */
ydn.crm.sugarcrm.model.events.ContextGDataChangeEvent = function(domain, contact, contacts, opt_event_target) {
  goog.base(this, ydn.crm.sugarcrm.model.events.Type.CONTEXT_GDATA_CHANGE, opt_event_target);
  /**
   * @type {string}
   * @final
   */
  this.domain = domain;
  /**
   * Gmail context contact data.
   * @final
   * @type {ydn.crm.inj.Context}
   */
  this.context = contact;
  /**
   * Match contact entry from the database that match with context contact data.
   * @final
   * @type {!Array.<!ydn.gdata.m8.ContactEntry>}
   */
  this.contacts = contacts;
};
goog.inherits(ydn.crm.sugarcrm.model.events.ContextGDataChangeEvent, ydn.crm.sugarcrm.model.events.Event);


/**
 * Pop out GData of relevant module.
 * @param {ydn.crm.sugarcrm.ModuleName} name
 * @return {ydn.gdata.m8.ContactEntry} if contact is available.
 */
ydn.crm.sugarcrm.model.events.ContextGDataChangeEvent.prototype.pop = function(name) {
  for (var i = 0; i < this.contacts.length; i++) {
    var contact = this.contacts[i];
    var xp = contact.getExternalId(ydn.gdata.m8.ExternalId.Scheme.SUGARCRM,
        this.domain, name);
    if (xp) {
      return this.contacts.splice(i, 1)[0];
    }
  }
  return null;
};



/**
 * Event when sugarcrm record change in a module. The update has already being
 * applied at the time of call.
 * @param {?string} old_id the new value.
 * @param {Object=} opt_event_target target.
 * @extends {ydn.crm.sugarcrm.model.events.Event}
 * @constructor
 * @struct
 */
ydn.crm.sugarcrm.model.events.RecordChangeEvent = function(old_id, opt_event_target) {
  goog.base(this, ydn.crm.sugarcrm.model.events.Type.RECORD_CHANGE, opt_event_target);

  /**
   * @final
   * @type {?string}
   */
  this.old_id = old_id;
};
goog.inherits(ydn.crm.sugarcrm.model.events.RecordChangeEvent, ydn.crm.sugarcrm.model.events.Event);



/**
 * Event when sugarcrm record change in a module. The update has already being
 * applied at the time of call.
 * @param {ydn.crm.sugarcrm.ModuleName?} module
 * @param {Object=} opt_event_target target.
 * @extends {ydn.crm.sugarcrm.model.events.Event}
 * @constructor
 * @struct
 */
ydn.crm.sugarcrm.model.events.ModuleChangeEvent = function(module,
                                                        opt_event_target) {
  goog.base(this, ydn.crm.sugarcrm.model.events.Type.MODULE_CHANGE, opt_event_target);
  /**
   * @final
   * @type {?ydn.crm.sugarcrm.ModuleName} old module name.
   */
  this.module = module;
};
goog.inherits(ydn.crm.sugarcrm.model.events.ModuleChangeEvent, ydn.crm.sugarcrm.model.events.Event);



/**
 * Event when sugarcrm record change in a module. The update has already being
 * applied.
 * @param {Object=} opt_event_target target.
 * @extends {ydn.crm.sugarcrm.model.events.Event}
 * @constructor
 * @struct
 */
ydn.crm.sugarcrm.model.events.RecordUpdatedEvent = function(opt_event_target) {
  goog.base(this, ydn.crm.sugarcrm.model.events.Type.RECORD_UPDATE, opt_event_target);
};
goog.inherits(ydn.crm.sugarcrm.model.events.RecordUpdatedEvent, ydn.crm.sugarcrm.model.events.Event);



/**
 * Event when gdata contact entry link to the sugarcrm record change in a module.
 * @param {ydn.crm.sugarcrm.model.events.Type} type
 * @param {ydn.gdata.m8.ContactEntry} old_record
 * @param {ydn.gdata.m8.ContactEntry} new_record
 * @param {Object=} opt_event_target target.
 * @extends {ydn.crm.sugarcrm.model.events.Event}
 * @constructor
 * @struct
 */
ydn.crm.sugarcrm.model.events.GDataEvent = function(type, old_record, new_record, opt_event_target) {
  goog.base(this, type, opt_event_target);
  /**
   * @final
   * @type {ydn.gdata.m8.ContactEntry}
   */
  this.old_record = old_record;
  /**
   * @final
   * @type {ydn.gdata.m8.ContactEntry}
   */
  this.new_record = new_record;
};
goog.inherits(ydn.crm.sugarcrm.model.events.GDataEvent, ydn.crm.sugarcrm.model.events.Event);



/**
 * Event when GData was changed.
 * @param {ydn.gdata.m8.ContactEntry} old_record
 * @param {ydn.gdata.m8.ContactEntry} new_record
 * @param {Object=} opt_event_target target.
 * @extends {ydn.crm.sugarcrm.model.events.GDataEvent}
 * @constructor
 * @struct
 */
ydn.crm.sugarcrm.model.events.GDataChangedEvent = function(old_record, new_record, opt_event_target) {
  goog.base(this, ydn.crm.sugarcrm.model.events.Type.GDATA_CHANGE, old_record, new_record, opt_event_target);
};
goog.inherits(ydn.crm.sugarcrm.model.events.GDataChangedEvent, ydn.crm.sugarcrm.model.events.GDataEvent);



/**
 * Event when GData was changed.
 * @param {ydn.gdata.m8.ContactEntry} old_record
 * @param {ydn.gdata.m8.ContactEntry} new_record
 * @param {Object=} opt_event_target target.
 * @extends {ydn.crm.sugarcrm.model.events.GDataEvent}
 * @constructor
 * @struct
 */
ydn.crm.sugarcrm.model.events.GDataUpdatedEvent = function(old_record, new_record, opt_event_target) {
  goog.base(this, ydn.crm.sugarcrm.model.events.Type.GDATA_UPDATED, old_record, new_record, opt_event_target);
};
goog.inherits(ydn.crm.sugarcrm.model.events.GDataUpdatedEvent, ydn.crm.sugarcrm.model.events.GDataEvent);


