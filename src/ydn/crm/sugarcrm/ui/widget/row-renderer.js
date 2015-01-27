/**
 * Created by kyawtun on 13/1/15.
 */

goog.provide('ydn.crm.su.ui.widget.RowRenderer');
goog.require('ydn.crm.su.Record');



/**
 * Custom row renderer.
 * @constructor
 */
ydn.crm.su.ui.widget.RowRenderer = function() {

};
goog.addSingletonGetter(ydn.crm.su.ui.widget.RowRenderer);


/**
 * Render row.
 * @param {Object} row
 * @param {string} token
 * @param {Element} elem
 */
ydn.crm.su.ui.widget.RowRenderer.prototype.renderRow = function(row, token, elem) {
  if (!goog.isObject(row['data'])) {
    return;
  }
  var record = /** @type {SugarCrm.Record} */(row['data']);
  var email = ydn.crm.su.Record.getEmail(record);
  var label = record.name;
  if (email) {
    label += ' <' + email + '>';
  }
  elem.textContent = label;
};


