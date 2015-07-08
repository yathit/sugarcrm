/**
 * @fileoverview Select contacts.
 */


goog.provide('ydn.crm.su.ui.widget.SelectContactsDialog');



/**
 * Select contacts dialog.
 * @param {ydn.crm.su.Meta} meta
 * @param {goog.dom.DomHelper=} opt_dom Optional DOM helper.
 * @constructor
 * @extends {goog.ui.Component}
 */
ydn.crm.su.ui.widget.SelectContactsDialog = function(meta, opt_dom) {
  goog.ui.Component.base(this, 'constructor', opt_dom);
  /**
   * @type {ydn.crm.su.Meta}
   * @private
   */
  this.meta_ = meta;
  /**
   * @type {ydn.crm.su.ui.widget.SelectRecord}
   * @private
   */
  this.sel_record_ = null;
  /**
   * @type {Array<ydn.crm.su.ModuleName>}
   */
  this.relationship_modules = [ydn.crm.su.ModuleName.CONTACTS,
    ydn.crm.su.ModuleName.USERS,
    ydn.crm.su.ModuleName.ACCOUNTS,
    ydn.crm.su.ModuleName.LEADS];

};
goog.inherits(ydn.crm.su.ui.widget.SelectContactsDialog, goog.ui.Component);


/**
 * @define {boolean} debug variable.
 */
ydn.crm.su.ui.widget.SelectContactsDialog.DEBUG = false;


/**
 * @const
 * @type {string}
 */
ydn.crm.su.ui.widget.SelectContactsDialog.CSS_NAME = 'select-contacts-dialog';


/**
 * @inheritDoc
 */
ydn.crm.su.ui.widget.SelectContactsDialog.prototype.createDom = function() {
  goog.base(this, 'createDom');
  var root = this.getElement();
  root.classList.add(ydn.crm.su.ui.widget.SelectContactsDialog.CSS_NAME);
  var dom = this.getDomHelper();
  var h3 = dom.createDom('h3', ydn.crm.ui.CSS_CLASS_HEAD, 'Select contacts');
  root.appendChild(h3);
  root.appendChild(dom.createDom('div', ydn.crm.ui.CSS_CLASS_CONTENT));

  var row = goog.soy.renderAsElement(templ.ydn.crm.inj.selectRecord, {
    use_sel: true
  });

  var a = row.querySelector('a');
  a.classList.add('spacer');

  var select = row.querySelector('select');
  for (var i = 0; i < this.relationship_modules.length; i++) {
    var option = document.createElement('option');
    option.value = this.relationship_modules[i];
    option.textContent = this.relationship_modules[i];
    select.appendChild(option);
  }
  var input = row.querySelector('input');
  root.appendChild(row);

  this.sel_record_ = new ydn.crm.su.ui.widget.SelectRecord(this.meta_, undefined, root);
};


/**
 * @inheritDoc
 */
ydn.crm.su.ui.widget.SelectContactsDialog.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
  this.sel_record_.dispose();
  this.sel_record_ = null;
  this.meta_ = null;
};




