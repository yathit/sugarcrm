
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
  var module_info = this.module.getModuleInfo();
  var emails = [];
  for (var name in module_info.module_fields) {
    var field = module_info.module_fields[name];
    if (field.group == 'email') {
      if (name == 'email') {
        // 'email' field cannot be used to set or update
        continue;
      }
      emails.push(name);
    }
  }

  var email = this.module.value('email');
  if (goog.isArray(email)) {
    // Bean format
    var beans = /** @type {Array.<SugarCrm.EmailField>} */ (/** @type {*} */ (email));
    for (var i = 0; i < beans.length; i++) {
      emails[i] = beans[i].email_address_id;
    }
  }
  return emails;
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


/**
 *
 * @param {Array.<SugarCrm.EmailField>} beans
 * @param {string} id
 * @param value
 * @return {number}
 * @private
 */
ydn.crm.su.model.EmailGroup.updateEmail_ = function(beans, id, value) {
  for (var i = 0; i < beans.length; i++) {
    var bean = beans[i];
    if (bean.email_address_id == id) {
      bean.email_address = value;
      return i;
    }
  }
  window.console.warn('email bean_id: ' + id + ' not found');
  return -1;
};


/**
 * Convert from *UI patch* to *model patch*.
 * Example UI patch:
 * <pre>
 *   {
 *     'email1': 'foo@bar.com'
 *   }
 * </pre>
 * Example original model
 * <pre>
 *   {
 *     'email': [{
 *        "email_address": "the.phone.kid@example.biz",
 *        "id": "7045830f-3cd4-24b5-15ae-523cc7f78af7",
 *        "email_address_id": "705868fa-03f7-358b-8193-523cc70d8ce1",
 *        "primary_address": "1"
 *       }],
 *      'email1': "the.phone.kid@example.biz"
 *    }
 * </pre>
 * Example resulting model patch:
 * <pre>
 *   {
 *     'email': [{
 *     "email_address": "foo@bar.com",
 *          "id": "7045830f-3cd4-24b5-15ae-523cc7f78af7",
 *          "email_address_id": "705868fa-03f7-358b-8193-523cc70d8ce1",
 *          "primary_address": "1"
 *        }],
 *     'email1': "foo@bar.com"
 *    }
 * </pre>
 * @override
 */
ydn.crm.su.model.EmailGroup.prototype.pluck = function(value) {
  if (!goog.isObject(value)) {
    return null;
  }
  var email = this.module.value('email');
  if (goog.isObject(value) && goog.isArray(email)) {
    // conversion from UI patch to model patch is necessary for bean email format.
    var has_changed = false;
    var patch = {};
    var beans = /** @type {Array.<SugarCrm.EmailField>} */ (ydn.object.clone(email));
    for (var name in value) {
      var idx = ydn.crm.su.model.EmailGroup.updateEmail_(beans, name, value[name]);
      if (idx >= 0) {
        has_changed = true;
        if (idx >= 0 && idx <= 1) {
          var field_name = 'email' + (idx + 1);
          patch[field_name] = value[name];
        }
      } else {
        patch[name] = value[name];
      }
    }
    if (has_changed) {
      patch['email'] = beans;
    }
    return goog.object.isEmpty(patch) ? null : patch;
  } else {
    return goog.base(this, 'pluck', value);
  }

};

