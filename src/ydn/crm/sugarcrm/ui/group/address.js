/**
 * @fileoverview Panel for group of field in a module.
 *
 * This module provide adding, linking and syncing.
 */


goog.provide('ydn.crm.sugarcrm.ui.group.Address');
goog.require('ydn.crm.sugarcrm.ui.group.SimpleGroup');



/**
 * Contact sidebar panel.
 * @param {ydn.crm.sugarcrm.model.AddressGroup} model
 * @param {goog.dom.DomHelper=} opt_dom
 * @constructor
 * @struct
 * @extends {ydn.crm.sugarcrm.ui.group.SimpleGroup}
 */
ydn.crm.sugarcrm.ui.group.Address = function(model, opt_dom) {
  goog.base(this, model, null, opt_dom);
  /**
   * User edited value.
   * @type {?Object}
   * @private
   */
  this.patches_ = null;
};
goog.inherits(ydn.crm.sugarcrm.ui.group.Address, ydn.crm.sugarcrm.ui.group.SimpleGroup);


/**
 * @return {ydn.crm.sugarcrm.model.AddressGroup}
 * @override
 */
ydn.crm.sugarcrm.ui.group.Address.prototype.getModel;


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.ui.group.Address.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');

  var input = this.getElement().querySelector('input');
  input.setAttribute('disabled', '1');
};


/**
 * Get active field value, i.e., if user edited, it is user edited value, otherwise
 * model field value.
 * @param {string} name field name.
 * @return {?string}
 * @private
 */
ydn.crm.sugarcrm.ui.group.Address.prototype.getActiveFieldValue_ = function(name) {
  if (this.patches_ && this.patches_[name]) {
    return this.patches_[name];
  } else {
    var model = this.getModel();
    return model.getStringValue(name);
  }
};


/**
 * Set patch value.
 * @param {string} name field name.
 * @param {string} value
 * @private
 */
ydn.crm.sugarcrm.ui.group.Address.prototype.setPatchFieldValue_ = function(name, value) {
  if (!this.patches_) {
    this.patches_ = {};
  }
  this.patches_[name] = value;
};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.ui.group.Address.prototype.getEditorTemplateData = function() {

  var model = this.getModel();
  var data = [];
  var module_info = model.getModuleInfo();

  var group_name = model.getGroupName();
  var group_label = model.getGroupLabel();
  for (var name in module_info.module_fields) {
    var field = module_info.module_fields[name];
    if (field.group == group_name) {
      var value = this.getActiveFieldValue_(name);
      var label = field.label;
      var type = field.type;
      // the two fields: street_2, street_3 are not used, but instead
      // street is responsible for them.
      if (goog.string.endsWith(name, 'street')) {
        type = 'textarea'; // to support multi-lines editing.
      } else if ((goog.string.endsWith(name, 'street_2') ||
          goog.string.endsWith(name, 'street_3')) && !value) {
        continue;
      }
      if (label) {
        label = label.replace(/^\w+ address /i, '');
      }
      data.push({
        name: name,
        label: label,
        type: type,
        value: value,
        listId: ydn.crm.sugarcrm.ui.field.FieldRenderer.getDataList(model.getModuleName(),
            field)
      });
    }
  }

  return {
    fields: data,
    title: group_label
  };
};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.ui.group.Address.prototype.fillByMetaContact = function(meta) {
  if (!meta) {
    return false;
  }
  var location = meta.getLocationDeduced();
  var modified = false;
  if (location) {
    var model = this.getModel();
    var prefix = this.getGroupName() + '_';
    if (!this.getActiveFieldValue_(prefix + 'country') &&
        !!location.country) {
      if (!!location.country.code) {
        this.setPatchFieldValue_(prefix + 'country', location.country.code);
        modified = true;
      } else if (!!location.country.name) {
        this.setPatchFieldValue_(prefix + 'country', location.country.name);
        modified = true;
      }
    }
    if (!this.getActiveFieldValue_(prefix + 'city') &&
        !!location.city && !!location.city.name) {
      this.setPatchFieldValue_(prefix + 'city', location.city.name);
      modified = true;
    }
    if (!this.getActiveFieldValue_(prefix + 'state') &&
        !!location.state && !!location.state.name) {
      this.setPatchFieldValue_(prefix + 'state', location.state.name);
      modified = true;
    }
    if (modified) {
      var label = this.getGroupValue();
      this.setInputValue(label);
    }
  }
  return modified;
};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.ui.group.Address.prototype.patchOptionField = function(el, patches) {
  var field_name = el.getAttribute('name');
  var input = el.querySelector('.value').firstElementChild;

  var original = this.getModel().valueAsString(field_name);

  if (input.value == original) {
    return false;
  }
  patches[field_name] = input.value;
  return true;
};


/**
 * Return group value from user patch and model value.
 * @return {string}
 */
ydn.crm.sugarcrm.ui.group.Address.prototype.getGroupValue = function() {
  var model = this.getModel();
  if (this.patches_) {
    var prefix = this.getGroupName() + '_';
    var country = this.getActiveFieldValue_(prefix + 'country');
    var city = this.getActiveFieldValue_(prefix + 'city');
    var state = this.getActiveFieldValue_(prefix + 'state');
    var postalcode = this.getActiveFieldValue_(prefix + 'postalcode');
    var street = this.getActiveFieldValue_(prefix + 'street');
    var street_2 = this.getActiveFieldValue_(prefix + 'street_2');
    var label = ydn.crm.sugarcrm.model.AddressGroup.makeGroupValue(country, city, state,
        postalcode, street, street_2);
    return label;
  } else {
    return model.getGroupValue();
  }
};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.ui.group.Address.prototype.applyEditorChanges = function(ev) {
  this.patches_ = ydn.object.clone(ev.patches);
  var label = this.getGroupValue();
  this.setInputValue(label);
};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.ui.group.Address.prototype.collectData = function() {
  return this.patches_ || null;
};
