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
  var label = record.name;
  // label as name itself is not distinguishable, so append by email,
  // account_name, id, etc.
  var email = ydn.crm.su.Record.getEmail(record);
  if (email) {
    label += ' <' + email + '>';
  } else {
    var account_name = record['account_name'];
    if (account_name) {
      label += ' [' + account_name + ']';
    } else {
      label += ' (' + record.id + ')';
    }
  }
  elem.textContent = label;
};


