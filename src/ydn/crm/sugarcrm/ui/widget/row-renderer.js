/**
 * Created by kyawtun on 13/1/15.
 */

goog.provide('ydn.crm.sugarcrm.ui.widget.RowRenderer');
goog.require('ydn.crm.sugarcrm.Record');



/**
 * Custom row renderer.
 * @constructor
 */
ydn.crm.sugarcrm.ui.widget.RowRenderer = function() {

};
goog.addSingletonGetter(ydn.crm.sugarcrm.ui.widget.RowRenderer);


/**
 * Render row.
 * @param {Object} row
 * @param {string} token
 * @param {Element} elem
 */
ydn.crm.sugarcrm.ui.widget.RowRenderer.prototype.renderRow = function(row, token, elem) {
  if (!goog.isObject(row['data'])) {
    return;
  }
  var record = /** @type {SugarCrm.Record} */(row['data']);
  var email = ydn.crm.sugarcrm.Record.getEmail(record);
  var label = record.name;
  if (email) {
    label += ' <' + email + '>';
  }
  elem.textContent = label;
};


