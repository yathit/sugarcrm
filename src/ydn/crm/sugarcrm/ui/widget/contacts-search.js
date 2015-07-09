/**
 * @fileoverview Select contacts.
 */


goog.provide('ydn.crm.su.ui.widget.ContactsSearch');
goog.require('templ.ydn.crm.inj');
goog.require('ydn.crm.su.ui.widget.SelectRecord');



/**
 * Search contact for email address.
 * Use singleton method
 * <pre>
 *   var cs = ydn.crm.su.ui.widget.ContactsSearch.getInstance(meta);
 * </pre>
 * @param {ydn.crm.su.Meta} meta sugarcrm instance.
 * @constructor
 */
ydn.crm.su.ui.widget.ContactsSearch = function(meta) {
  /**
   * @type {ydn.crm.su.Meta}
   * @private
   */
  this.meta_ = meta;

  /**
   * @type {Element}
   * @private
   */
  this.root_ = goog.soy.renderAsElement(templ.ydn.crm.inj.contactSearch);

  /**
   * @type {ydn.crm.su.ui.widget.SelectRecord}
   * @private
   */
  this.sel_record_ = new ydn.crm.su.ui.widget.SelectRecord(this.meta_,
      undefined, this.root_);
  this.sel_record_.setEmailOutput(true);
  this.sel_record_.setModule(ydn.crm.su.ModuleName.CONTACTS);

  /**
   * @type {?function(HTMLInputElement)}
   * @private
   */
  this.callback_ = null;

  /**
   * @type {*}
   * @private
   */
  this.opt_scope_ = null;

  /**
   * @protected
   * @type {goog.events.EventHandler}
   */
  this.handler = new goog.events.EventHandler(this);

  this.handler.listen(this.sel_record_, goog.ui.ac.AutoComplete.EventType.UPDATE,
      this.onUpdate_);
  this.handler.listen(this.root_, goog.events.EventType.FOCUS,
      this.onFocus_, true);
  this.handler.listen(this.root_, goog.events.EventType.BLUR,
      this.onBlur_, true);
  var select = this.root_.querySelector('select');
  this.handler.listen(select, goog.events.EventType.CHANGE, this.onSelect_);

};


/**
 * @define {boolean} debug variable.
 */
ydn.crm.su.ui.widget.ContactsSearch.DEBUG = false;


/**
 * @const
 * @type {string}
 */
ydn.crm.su.ui.widget.ContactsSearch.CSS_NAME = 'contact-search';

/**
 * @const
 * @type {string}
 */
ydn.crm.su.ui.widget.ContactsSearch.CSS_NAME_FOCUS = 'select-focus';


/**
 * @param {goog.events.BrowserEvent} e
 * @private
 */
ydn.crm.su.ui.widget.ContactsSearch.prototype.onFocus_ = function(e) {
  this.root_.querySelector('.select-record').classList.add(
      ydn.crm.su.ui.widget.ContactsSearch.CSS_NAME_FOCUS);
  this.sel_record_.attach(this.root_);
};


/**
 * @param {goog.events.BrowserEvent} e
 * @private
 */
ydn.crm.su.ui.widget.ContactsSearch.prototype.onBlur_ = function(e) {
  this.root_.querySelector('.select-record').classList.remove(
      ydn.crm.su.ui.widget.ContactsSearch.CSS_NAME_FOCUS);
};


/**
 * @param {goog.events.BrowserEvent} e
 * @private
 */
ydn.crm.su.ui.widget.ContactsSearch.prototype.onSelect_ = function(e) {
  var mn = this.root_.querySelector('select').value;
  if (mn) {
    this.sel_record_.setModule(mn);
  }
};


/**
 * Delegate on autosuggestion update callback.
 * @param e
 * @private
 */
ydn.crm.su.ui.widget.ContactsSearch.prototype.onUpdate_ = function(e) {
  if (this.callback_) {
    var input = /** @type {HTMLInputElement} */(this.root_.querySelector('input'));
    this.callback_.call(this.opt_scope_, input);
  }
  this.root_.querySelector('.select-record').classList.remove(
      ydn.crm.su.ui.widget.ContactsSearch.CSS_NAME_FOCUS);
};


/**
 * Attach contact search component. Previous attachment will be detach.
 * @param {Element} el the search component to attach on.
 * @param {function(this:T, HTMLInputElement)} cb callback with email address selected.
 * @param {T=} opt_scope callback scope.
 * @template T
 */
ydn.crm.su.ui.widget.ContactsSearch.prototype.attach = function(el, cb, opt_scope) {
  this.detach();
  this.callback_ = cb;
  this.opt_scope_ = opt_scope;
  el.appendChild(this.root_);


};


ydn.crm.su.ui.widget.ContactsSearch.prototype.detach = function() {
  if (this.root_.parentNode) {
    this.root_.parentNode.removeChild(this.root_);
  }
  this.callback_ = null;
  this.opt_scope_ = null;
};


/**
 * @type {ydn.crm.su.ui.widget.ContactsSearch}
 * @private
 */
ydn.crm.su.ui.widget.ContactsSearch.instance_ = null;


/**
 * @param {ydn.crm.su.Meta} meta
 * @return {ydn.crm.su.ui.widget.ContactsSearch}
 */
ydn.crm.su.ui.widget.ContactsSearch.getInstance = function(meta) {
  if (!ydn.crm.su.ui.widget.ContactsSearch.instance_ ||
      ydn.crm.su.ui.widget.ContactsSearch.instance_.meta_.getDomain() != meta.getDomain()) {
    ydn.crm.su.ui.widget.ContactsSearch.instance_ = new ydn.crm.su.ui.widget.ContactsSearch(meta);
  }
  return ydn.crm.su.ui.widget.ContactsSearch.instance_;
};




