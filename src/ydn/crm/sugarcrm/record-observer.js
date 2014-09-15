/**
 * @fileoverview Listen change in SugarCRM Record for synchronization.
 *
 * User: kyawtun
 * Date: 7/3/14
 */


goog.provide('ydn.crm.sugarcrm.IRecordObserver');
goog.require('ydn.crm.sugarcrm');



/**
 * Listen change in SugarCRM Record for synchronization.
 * @interface
 */
ydn.crm.sugarcrm.IRecordObserver = function() {

};


/**
 * Listener on record change.
 * @param {string} domain
 * @param {ydn.crm.sugarcrm.ModuleName} module
 * @param {!Array.<!SugarCrm.Record>|!SugarCrm.Record} records
 */
ydn.crm.sugarcrm.IRecordObserver.prototype.onRecordChange = function(domain, module, records) {};
