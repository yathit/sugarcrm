/**
 * @fileoverview Panel for listed items of same type.
 *
 * Fields in this group are same type, but differ only by labeling.
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */


goog.provide('ydn.crm.sugarcrm.ui.group.Array');
goog.require('ydn.crm.sugarcrm');
goog.require('ydn.crm.sugarcrm.model.Array');
goog.require('ydn.crm.sugarcrm.ui.group.Group');



/**
 * Panel for listed items of same type.
 * @param {ydn.crm.sugarcrm.model.Array} model
 * @param {goog.dom.DomHelper=} opt_dom
 * @constructor
 * @struct
 * @extends {ydn.crm.sugarcrm.ui.group.Group}
 */
ydn.crm.sugarcrm.ui.group.Array = function(model, opt_dom) {
  ydn.crm.sugarcrm.ui.group.Array.base(this, 'constructor', model, opt_dom);
};
goog.inherits(ydn.crm.sugarcrm.ui.group.Array, ydn.crm.sugarcrm.ui.group.Group);


/**
 * @return {ydn.crm.sugarcrm.model.Array}
 * @override
 */
ydn.crm.sugarcrm.ui.group.Array.prototype.getModel;


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.ui.group.Array.prototype.createFields = function() {

};



