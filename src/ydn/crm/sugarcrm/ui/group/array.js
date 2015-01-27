/**
 * @fileoverview Panel for listed items of same type.
 *
 * Fields in this group are same type, but differ only by labeling.
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */


goog.provide('ydn.crm.su.ui.group.Array');
goog.require('ydn.crm.su');
goog.require('ydn.crm.su.model.Array');
goog.require('ydn.crm.su.ui.group.Group');



/**
 * Panel for listed items of same type.
 * @param {ydn.crm.su.model.Array} model
 * @param {goog.dom.DomHelper=} opt_dom
 * @constructor
 * @struct
 * @extends {ydn.crm.su.ui.group.Group}
 */
ydn.crm.su.ui.group.Array = function(model, opt_dom) {
  ydn.crm.su.ui.group.Array.base(this, 'constructor', model, opt_dom);
};
goog.inherits(ydn.crm.su.ui.group.Array, ydn.crm.su.ui.group.Group);


/**
 * @return {ydn.crm.su.model.Array}
 * @override
 */
ydn.crm.su.ui.group.Array.prototype.getModel;


/**
 * @inheritDoc
 */
ydn.crm.su.ui.group.Array.prototype.createFields = function() {

};



