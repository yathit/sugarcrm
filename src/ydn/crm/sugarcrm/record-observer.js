/**
 * @fileoverview Listen change in SugarCRM Record for synchronization.
 *
 * User: kyawtun
 * Date: 7/3/14
 */


goog.provide('ydn.crm.su.IRecordObserver');
goog.require('ydn.crm.su');



/**
 * Listen change in SugarCRM Record for synchronization.
 * @interface
 */
ydn.crm.su.IRecordObserver = function() {

};


/**
 * Listener on record change.
 * @param {string} domain
 * @param {ydn.crm.su.ModuleName} module
 * @param {!Array.<!SugarCrm.Record>|!SugarCrm.Record} records
 */
ydn.crm.su.IRecordObserver.prototype.onRecordChange = function(domain, module, records) {};
