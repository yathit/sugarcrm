/**
 * @fileoverview Model change event.
 */

goog.provide('ydn.crm.su.model.events');


/**
 * Event types.
 *
 * Note: these event type string are exported.
 * @enum {string}
 */
ydn.crm.su.model.events.Type = {
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
 * @type {Array.<ydn.crm.su.model.events.Type>}
 */
ydn.crm.su.model.events.TYPES_SUGAR = [
  ydn.crm.su.model.events.Type.CONTEXT_DATA_CHANGE,
  ydn.crm.su.model.events.Type.RECORD_CHANGE,
  ydn.crm.su.model.events.Type.GDATA_CHANGE
];


/**
 * List of all events dispatched by Module model.
 * @const
 * @type {Array.<ydn.crm.su.model.events.Type>}
 */
ydn.crm.su.model.events.TYPES_MODULE = [
  ydn.crm.su.model.events.Type.MODULE_CHANGE,
  ydn.crm.su.model.events.Type.RECORD_CHANGE,
  ydn.crm.su.model.events.Type.RECORD_UPDATE
];



/**
 * Event for sugar models.
 * @param {ydn.crm.su.model.events.Type} event_type event type.
 * @param {Object=} opt_event_target target.
 * @extends {goog.events.Event}
 * @constructor
 * @struct
 * @suppress {checkStructDictInheritance} suppress closure-library code.
 */
ydn.crm.su.model.events.Event = function(event_type, opt_event_target) {
  goog.base(this, event_type, opt_event_target);
};
goog.inherits(ydn.crm.su.model.events.Event, goog.events.Event);



/**
 * Event when inbox contact data change.
 * @param {?ydn.crm.inj.Context} context new contact data.
 * @param {ydn.gdata.m8.ContactEntry=} opt_gdata contact gdata of matching email with
 * context.
 * @param {ydn.crm.su.Record=} opt_record SugarCRM record of matching email with
 * @param {YdnCrm.SyncRecord=} opt_sync Sync record.
 * @param {Object=} opt_event_target target.
 * @extends {ydn.crm.su.model.events.Event}
 * @constructor
 * @struct
 */
ydn.crm.su.model.events.ContextChangeEvent = function(context,
    opt_gdata, opt_record, opt_sync, opt_event_target) {
  goog.base(this, ydn.crm.su.model.events.Type.CONTEXT_CHANGE, opt_event_target);
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
   * @type {?ydn.crm.su.Record}
   */
  this.record = opt_record || null;

  /**
   * @final
   * @type {?YdnCrm.SyncRecord}
   */
  this.sync = opt_sync || null;
};
goog.inherits(ydn.crm.su.model.events.ContextChangeEvent, ydn.crm.su.model.events.Event);



/**
 * Event when inbox contact data change.
 * @param {ydn.crm.inj.Context} contact new contact data.
 * @param {Object=} opt_event_target target.
 * @extends {ydn.crm.su.model.events.Event}
 * @constructor
 * @struct
 */
ydn.crm.su.model.events.ContextDataChangeEvent = function(contact, opt_event_target) {
  goog.base(this, ydn.crm.su.model.events.Type.CONTEXT_DATA_CHANGE, opt_event_target);
  /**
   * @final
   * @type {ydn.crm.inj.Context}
   */
  this.contact = contact;
};
goog.inherits(ydn.crm.su.model.events.ContextDataChangeEvent, ydn.crm.su.model.events.Event);



/**
 * Event when inbox contact data change.
 * @param {string} domain
 * @param {ydn.crm.inj.Context} contact new contact data.
 * @param {!Array.<ydn.gdata.m8.ContactEntry>} contacts
 * @param {Object=} opt_event_target target.
 * @extends {ydn.crm.su.model.events.Event}
 * @constructor
 * @struct
 */
ydn.crm.su.model.events.ContextGDataChangeEvent = function(domain, contact, contacts, opt_event_target) {
  goog.base(this, ydn.crm.su.model.events.Type.CONTEXT_GDATA_CHANGE, opt_event_target);
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
goog.inherits(ydn.crm.su.model.events.ContextGDataChangeEvent, ydn.crm.su.model.events.Event);


/**
 * Pop out GData of relevant module.
 * @param {ydn.crm.su.ModuleName} name
 * @return {ydn.gdata.m8.ContactEntry} if contact is available.
 */
ydn.crm.su.model.events.ContextGDataChangeEvent.prototype.pop = function(name) {
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
 * @extends {ydn.crm.su.model.events.Event}
 * @constructor
 * @struct
 */
ydn.crm.su.model.events.RecordChangeEvent = function(old_id, opt_event_target) {
  goog.base(this, ydn.crm.su.model.events.Type.RECORD_CHANGE, opt_event_target);

  /**
   * @final
   * @type {?string}
   */
  this.old_id = old_id;
};
goog.inherits(ydn.crm.su.model.events.RecordChangeEvent, ydn.crm.su.model.events.Event);



/**
 * Event when sugarcrm record change in a module. The update has already being
 * applied at the time of call.
 * @param {ydn.crm.su.ModuleName?} module
 * @param {Object=} opt_event_target target.
 * @extends {ydn.crm.su.model.events.Event}
 * @constructor
 * @struct
 */
ydn.crm.su.model.events.ModuleChangeEvent = function(module,
                                                        opt_event_target) {
  goog.base(this, ydn.crm.su.model.events.Type.MODULE_CHANGE, opt_event_target);
  /**
   * @final
   * @type {?ydn.crm.su.ModuleName} old module name.
   */
  this.module = module;
};
goog.inherits(ydn.crm.su.model.events.ModuleChangeEvent, ydn.crm.su.model.events.Event);



/**
 * Event when sugarcrm record change in a module. The update has already being
 * applied.
 * @param {Object=} opt_event_target target.
 * @extends {ydn.crm.su.model.events.Event}
 * @constructor
 * @struct
 */
ydn.crm.su.model.events.RecordUpdatedEvent = function(opt_event_target) {
  goog.base(this, ydn.crm.su.model.events.Type.RECORD_UPDATE, opt_event_target);
};
goog.inherits(ydn.crm.su.model.events.RecordUpdatedEvent, ydn.crm.su.model.events.Event);



/**
 * Event when gdata contact entry link to the sugarcrm record change in a module.
 * @param {ydn.crm.su.model.events.Type} type
 * @param {ydn.gdata.m8.ContactEntry} old_record
 * @param {ydn.gdata.m8.ContactEntry} new_record
 * @param {Object=} opt_event_target target.
 * @extends {ydn.crm.su.model.events.Event}
 * @constructor
 * @struct
 */
ydn.crm.su.model.events.GDataEvent = function(type, old_record, new_record, opt_event_target) {
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
goog.inherits(ydn.crm.su.model.events.GDataEvent, ydn.crm.su.model.events.Event);



/**
 * Event when GData was changed.
 * @param {ydn.gdata.m8.ContactEntry} old_record
 * @param {ydn.gdata.m8.ContactEntry} new_record
 * @param {Object=} opt_event_target target.
 * @extends {ydn.crm.su.model.events.GDataEvent}
 * @constructor
 * @struct
 */
ydn.crm.su.model.events.GDataChangedEvent = function(old_record, new_record, opt_event_target) {
  goog.base(this, ydn.crm.su.model.events.Type.GDATA_CHANGE, old_record, new_record, opt_event_target);
};
goog.inherits(ydn.crm.su.model.events.GDataChangedEvent, ydn.crm.su.model.events.GDataEvent);



/**
 * Event when GData was changed.
 * @param {ydn.gdata.m8.ContactEntry} old_record
 * @param {ydn.gdata.m8.ContactEntry} new_record
 * @param {Object=} opt_event_target target.
 * @extends {ydn.crm.su.model.events.GDataEvent}
 * @constructor
 * @struct
 */
ydn.crm.su.model.events.GDataUpdatedEvent = function(old_record, new_record, opt_event_target) {
  goog.base(this, ydn.crm.su.model.events.Type.GDATA_UPDATED, old_record, new_record, opt_event_target);
};
goog.inherits(ydn.crm.su.model.events.GDataUpdatedEvent, ydn.crm.su.model.events.GDataEvent);



/**
 * Event for search event.
 * @param {ydn.crm.su.model.events.SearchEvent.Type} event_type event type.
 * @param {Object=} opt_event_target target.
 * @extends {goog.events.Event}
 * @constructor
 * @struct
 * @suppress {checkStructDictInheritance} suppress closure-library code.
 */
ydn.crm.su.model.events.SearchEvent = function(event_type, opt_event_target) {
  goog.base(this, event_type, opt_event_target);
};
goog.inherits(ydn.crm.su.model.events.SearchEvent, goog.events.Event);


/**
 * @enum {string} event type for search events.
 */
ydn.crm.su.model.events.SearchEvent.Type = {
  UPDATED: 'up',
  ADD: 'ad',
  RESET: 'rs'
};



/**
 * Event search result is reset.
 * @param {string} q query term.
 * @param {Object=} opt_event_target target.
 * @extends {ydn.crm.su.model.events.SearchEvent}
 * @constructor
 * @struct
 */
ydn.crm.su.model.events.SearchResetEvent = function(q, opt_event_target) {
  goog.base(this, ydn.crm.su.model.events.SearchEvent.Type.RESET, opt_event_target);
  /**
   * @final
   * @type {string}
   */
  this.q = q;
};
goog.inherits(ydn.crm.su.model.events.SearchResetEvent, ydn.crm.su.model.events.SearchEvent);



/**
 * Event search result is updated. Event though only one record is update,
 * the order of records has been changed.
 * @param {number} idx the update record index.
 * @param {Object=} opt_event_target target.
 * @extends {ydn.crm.su.model.events.SearchEvent}
 * @constructor
 * @struct
 */
ydn.crm.su.model.events.SearchUpdatedEvent = function(idx, opt_event_target) {
  goog.base(this, ydn.crm.su.model.events.SearchEvent.Type.UPDATED, opt_event_target);
  /**
   * @final
   * @type {number} The index of record updated. The index the the one after changes.
   */
  this.index = idx;
};
goog.inherits(ydn.crm.su.model.events.SearchUpdatedEvent, ydn.crm.su.model.events.SearchEvent);



/**
 * Event search result is updated.
 * @param {number} level progress level between 0 and 1 for start and finished.
 * @param {Object=} opt_event_target target.
 * @extends {ydn.crm.su.model.events.SearchEvent}
 * @constructor
 * @struct
 */
ydn.crm.su.model.events.SearchProgressEvent = function(level, opt_event_target) {
  goog.base(this, ydn.crm.su.model.events.SearchEvent.Type.UPDATED, opt_event_target);
  /**
   * @final
   * @type {number}
   */
  this.level = level;
};
goog.inherits(ydn.crm.su.model.events.SearchProgressEvent, ydn.crm.su.model.events.SearchEvent);



/**
 * Event search result that a new record is added to the result.
 * @param {number} index progress level between 0 and 1 for start and finished.
 * @param {Object=} opt_event_target target.
 * @extends {ydn.crm.su.model.events.SearchEvent}
 * @constructor
 * @struct
 */
ydn.crm.su.model.events.SearchResultAddEvent = function(index, opt_event_target) {
  goog.base(this, ydn.crm.su.model.events.SearchEvent.Type.ADD, opt_event_target);
  /**
   * @final
   * @type {number}
   */
  this.index = index;
};
goog.inherits(ydn.crm.su.model.events.SearchResultAddEvent, ydn.crm.su.model.events.SearchEvent);
