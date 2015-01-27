
/**
 * @fileoverview Group model for 'name' group fields.
 *
 *
 */


goog.provide('ydn.crm.su.model.EmailGroup');
goog.require('ydn.crm.su.Meta');
goog.require('ydn.crm.su.model.EmailField');
goog.require('ydn.crm.su.model.Group');
goog.require('ydn.object');



/**
 * Group model for 'email' group fields.
 * @param {ydn.crm.su.model.Record} parent
 * @constructor
 * @extends {ydn.crm.su.model.Group}
 * @struct
 */
ydn.crm.su.model.EmailGroup = function(parent) {
  goog.base(this, parent, 'email');
};
goog.inherits(ydn.crm.su.model.EmailGroup, ydn.crm.su.model.Group);


/**
 * @inheritDoc
 */
ydn.crm.su.model.EmailGroup.prototype.listFields = function() {
  var email = this.module.value('email');
  if (goog.isArray(email)) {
    // Bean format
    var beans = /** @type {Array.<SugarCrm.EmailField>} */ (/** @type {*} */ (email));
    return beans.map(function(x) {
      return x.email_address_id;
    });
  } else {
    var is_bean = this.isBean();
    var module_info = this.module.getModuleInfo();
    var emails = [];
    for (var name in module_info.module_fields) {
      var field = module_info.module_fields[name];
      if (field.group == 'email') {
        if (is_bean && name == 'email') {
          // In V7, 'email' field cannot be used to set or update
          continue;
        }
        emails.push(name);
      }
    }
    return emails;
  }
};


/**
 * @inheritDoc
 */
ydn.crm.su.model.EmailGroup.prototype.createOrGetFieldModel = function(name) {
  var f = this.getFieldModelByName(name);
  if (f) {
    return f;
  }
  f = new ydn.crm.su.model.EmailField(this, name);
  this.fields.push(f);
  return f;
};


/**
 * @return {boolean}
 */
ydn.crm.su.model.EmailGroup.prototype.isBean = function() {
  var email = this.module.value('email');
  if (goog.isDef(email)) {
    return goog.isArray(email);
  } else {
    return !!this.module.getMeta().isVersion7();
  }
};


/**
 * Check existence of a field name.
 * @param {string} name
 * @return {boolean}
 */
ydn.crm.su.model.EmailGroup.prototype.hasField = function(name) {
  var email = this.module.value('email');
  if (goog.isArray(email)) {
    var beans = /** @type {Array.<SugarCrm.EmailField>} */ (/** @type {*} */ (email));
    return beans.some(function(x) {
      return x.email_address_id == name;
    });
  } else {
    return goog.base(this, 'hasField', name);
  }
};


/**
 * @param {string} name
 * @return {boolean} return `true` if field has value set.
 * @see #hasField
 */
ydn.crm.su.model.EmailGroup.prototype.hasFieldValue = function(name) {
  var email = this.module.value('email');
  if (goog.isArray(email)) {
    var beans = /** @type {Array.<SugarCrm.EmailField>} */ (/** @type {*} */ (email));
    for (var i = 0; i < beans.length; i++) {
      var x = beans[i];
      if (x.email_address_id == name) {
        return goog.isDefAndNotNull(x.email_address);
      }
    }
    return false;
  } else {
    return goog.base(this, 'hasFieldValue', name);
  }
};


/**
 * Return email value by email id.
 * @param {string} name
 * @return {?string}
 */
ydn.crm.su.model.EmailGroup.prototype.getFieldValueByEmailId = function(name) {
  var email = this.module.value('email');
  if (goog.isArray(email)) {
    var beans = /** @type {Array.<SugarCrm.EmailField>} */ (/** @type {*} */ (email));
    for (var i = 0; i < beans.length; i++) {
      var obj = beans[i];
      if (obj.email_address_id == name) {
        return obj.email_address;
      }
    }
    return null;
  } else {
    return this.module.getStringValue(name);
  }
};


/**
 * Check email opt in status.
 * @param {string} name
 * @return {?boolean}
 */
ydn.crm.su.model.EmailGroup.prototype.isOptOut = function(name) {
  var email = this.module.value('email');
  if (goog.isArray(email)) {
    var beans = /** @type {Array.<SugarCrm.EmailField>} */ (/** @type {*} */ (email));
    for (var i = 0; i < beans.length; i++) {
      var obj = beans[i];
      if (obj.email_address_id == name) {
        return obj.opt_out == '1';
      }
    }
    return null;
  } else if (name == 'email') {
    return this.module.value('email_opt_out') == '1';
  } else {
    return null;
  }
};


/**
 * Get all emails as normalized form of EmailBean.
 * @return {Array.<SugarCrm.EmailField>} list of all emails.
 */
ydn.crm.su.model.EmailGroup.prototype.getEmails = function() {
  var email = this.module.value('email');
  if (goog.isArray(email)) {
    // Bean format
    return /** @type {Array.<SugarCrm.EmailField>} */ (/** @type {*} */ (email));
  } else {
    var module_info = this.module.getModuleInfo();
    var emails = [];
    var has_primary = true;
    for (var name in module_info.module_fields) {
      var field = module_info.module_fields[name];
      if (field.group == 'email') {
        var is_primary = !has_primary && emails.length > 0;
        emails.push({
          'email_address_id': name,
          'email_address': email,
          'primary_address': is_primary ? '1' : '0'
        });
      }
    }
    return emails;
  }
};

