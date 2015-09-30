/**
 * @fileoverview Panel to synchronize SugarCRM and GData Contact.
 */



goog.provide('ydn.crm.su.ui.Record');
goog.require('goog.ui.Container');
goog.require('ydn.crm.inj.sugar.RecordRenderer');



/**
 * Panel to synchronize SugarCRM and GData Contact.
 * @param {goog.dom.DomHelper} dom
 * @param {ydn.crm.su.model.ImmutableRecord} model
 * @constructor
 * @struct
 * @extends {goog.ui.Control}
 */
ydn.crm.su.ui.Record = function(dom, model) {
  goog.base(this, null, null, dom);
  this.setModel(model);
};
goog.inherits(ydn.crm.su.ui.Record, goog.ui.Control);


/**
 * @return {ydn.crm.su.model.ImmutableRecord}
 */
ydn.crm.su.ui.Record.prototype.getModel;


goog.ui.registry.setDefaultRenderer(ydn.crm.su.ui.Record,
    ydn.crm.inj.sugar.RecordRenderer);
