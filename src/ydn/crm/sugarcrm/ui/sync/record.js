/**
 * @fileoverview Panel to synchronize SugarCRM and GData Contact.
 */



goog.provide('ydn.crm.sugarcrm.ui.Record');
goog.require('goog.ui.Container');
goog.require('ydn.crm.inj.sugar.RecordRenderer');



/**
 * Panel to synchronize SugarCRM and GData Contact.
 * @param {goog.dom.DomHelper} dom
 * @param {ydn.crm.sugarcrm.model.ImmutableRecord} model
 * @constructor
 * @struct
 * @extends {goog.ui.Control}
 * @suppress {checkStructDictInheritance} suppress closure-library code.
 */
ydn.crm.sugarcrm.ui.Record = function(dom, model) {
  goog.base(this, null, null, dom);
  this.setModel(model);
};
goog.inherits(ydn.crm.sugarcrm.ui.Record, goog.ui.Control);


/**
 * @return {ydn.crm.sugarcrm.model.ImmutableRecord}
 */
ydn.crm.sugarcrm.ui.Record.prototype.getModel;


goog.ui.registry.setDefaultRenderer(ydn.crm.sugarcrm.ui.Record,
    ydn.crm.inj.sugar.RecordRenderer);
