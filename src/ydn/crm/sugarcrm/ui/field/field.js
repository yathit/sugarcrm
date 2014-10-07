

/**
 * @fileoverview SugarCrm module field.
 */


goog.provide('ydn.crm.sugarcrm.ui.field.Field');
goog.require('goog.ui.Component');
goog.require('goog.ui.PopupMenu');
goog.require('ydn.crm.ui.Refreshable');
goog.require('templ.ydn.crm.inj');
goog.require('ydn.crm.sugarcrm.ui.events.ChangedEvent');
goog.require('ydn.crm.sugarcrm.ui.field.CheckboxFieldRenderer');
goog.require('ydn.crm.sugarcrm.ui.field.EnumFieldRenderer');
goog.require('ydn.crm.sugarcrm.ui.field.FieldRenderer');
goog.require('ydn.crm.sugarcrm.ui.field.InputFieldRenderer');
goog.require('ydn.crm.sugarcrm.ui.field.TextFieldRenderer');
goog.require('ydn.crm.sugarcrm.ui.setting.Field');



/**
 * Create a new module record field.
 * @param {ydn.crm.sugarcrm.model.Field} info
 * @param {ydn.crm.sugarcrm.ui.field.FieldRenderer=} opt_renderer Renderer used to
 * render or decorate the component; defaults to {@link goog.ui.ControlRenderer}.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for
 *     document interaction.
 * @extends {goog.ui.Component}
 * @constructor
 * @struct
 * @suppress {checkStructDictInheritance} suppress closure-library code.
 * @implements {ydn.crm.ui.Refreshable}
 */
ydn.crm.sugarcrm.ui.field.Field = function(info, opt_renderer, opt_domHelper) {
  goog.base(this, opt_domHelper);
  /**
   * @protected
   * @type {ydn.crm.sugarcrm.ui.field.FieldRenderer}
   */
  this.renderer = opt_renderer || ydn.crm.sugarcrm.ui.field.Field.selectFieldRenderer(info.getType());
  this.setModel(info);

};
goog.inherits(ydn.crm.sugarcrm.ui.field.Field, goog.ui.Component);


/**
 * @define {boolean} debug flag.
 */
ydn.crm.sugarcrm.ui.field.Field.DEBUG = false;


/**
 * @return {ydn.crm.sugarcrm.model.Field}
 * @override
 */
ydn.crm.sugarcrm.ui.field.Field.prototype.getModel;


/**
 * @return {ydn.crm.sugarcrm.ui.field.FieldRenderer}
 */
ydn.crm.sugarcrm.ui.field.Field.prototype.getRenderer = function() {
  return this.renderer;
};


/**
 * @return {!ydn.crm.sugarcrm.ui.setting.Field}
 */
ydn.crm.sugarcrm.ui.field.Field.prototype.getSetting = function() {
  return new ydn.crm.sugarcrm.ui.setting.Field(this.getModel().getFieldInfo());
};


/**
 * Select suitable renderer for a given type.
 * @param {string} type
 * @return {ydn.crm.sugarcrm.ui.field.FieldRenderer}
 */
ydn.crm.sugarcrm.ui.field.Field.selectFieldRenderer = function(type) {
  if (type == 'bool') {
    return ydn.crm.sugarcrm.ui.field.CheckboxFieldRenderer.getInstance();
  } else if (type == 'text') {
    return ydn.crm.sugarcrm.ui.field.TextFieldRenderer.getInstance();
  } else if (type == 'enum') {
    return ydn.crm.sugarcrm.ui.field.EnumFieldRenderer.getInstance();
  } else {
    return ydn.crm.sugarcrm.ui.field.InputFieldRenderer.getInstance();
  }
};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.ui.field.Field.prototype.createDom = function() {
  this.renderer.createDom(this);
};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.ui.field.Field.prototype.enterDocument = function() {
  var input = this.getElement().querySelector('input');
  if (input) {
    this.getHandler().listen(input,
        goog.events.EventType.BLUR, this.handleInputBlur);
  }
  var el_more = this.getElement().getElementsByClassName(
      ydn.crm.ui.CSS_CLASS_MORE_MENU)[0];
  if (el_more) {
    this.getHandler().listen(el_more, 'click', this.onMoreMenuClick);
  }
};


/**
 * @param {Event} e
 * @protected
 */
ydn.crm.sugarcrm.ui.field.Field.prototype.onMoreMenuClick = function(e) {
  var el = /** @type {Element} */ (e.target);
  var item = goog.dom.getAncestorByClass(el, 'goog-menuitem');
  var cmd = /** @type {ydn.crm.sugarcrm.model.Field.Command} */ (item.getAttribute('name'));

  if (cmd) {
    // menu action are handle in group level.
    var ev = new ydn.crm.sugarcrm.ui.events.FieldMenuActionEvent(cmd, this);
    this.dispatchEvent(ev);
    var menu = /** @type {Element} */ (goog.dom.getAncestorByClass(el,
        ydn.crm.ui.CSS_CLASS_MORE_MENU));
    // hide menu immediately
    goog.style.setElementShown(menu, false);
    setTimeout(function() {
      // menu show/hide status is determine by hover state
      goog.style.setElementShown(menu, true);
    }, 1000);

    if (!ev.defaultPrevented) {
      if (ev.command == ydn.crm.sugarcrm.model.Field.Command.REMOVE) {
        var obj = this.createClearPatch();
        var ce = new ydn.crm.sugarcrm.ui.events.ChangedEvent(obj, this);
        this.dispatchEvent(ce);
      } else if (ev.command == ydn.crm.sugarcrm.model.Field.Command.EDIT) {
        this.showEditor();
      }
    }
  }
};


/**
 * Get template data for editor dialog.
 * @return {{
 *   fields: !Array.<{label: string, listId: (null|string|undefined), name: string, type: string, value: string}>
 * }}
 */
ydn.crm.sugarcrm.ui.field.Field.prototype.getTemplateData = function() {

  var model = this.getModel();
  var lid = this.getDataList();
  var fields = [{
    label: model.getLabel(),
    name: model.getFieldName(),
    value: model.getFieldValue(),
    type: model.getType(),
    listId: lid
  }];
  return {
    fields: fields
  };
};


/**
 * Make datalist of given enum field. If already exist, this will return it.
 * @return {?string} datalist id.
 */
ydn.crm.sugarcrm.ui.field.Field.prototype.getDataList = function() {
  var model = this.getModel();
  return ydn.crm.sugarcrm.ui.field.FieldRenderer.getDataList(
      model.getModuleName(), model.getFieldInfo());
};


/**
 * Create editor dialog.
 * Dialog is disposed on hide.
 * @param {{
 *   fields: !Array.<{label: string, listId: (null|string|undefined), name: string, type: string, value: string}>
 * }} data template data.
 * @return {goog.ui.Dialog}
 */
ydn.crm.sugarcrm.ui.field.Field.createEditor = function(data) {
  var dialog = new goog.ui.Dialog();
  dialog.setButtonSet(goog.ui.Dialog.ButtonSet.createOkCancel());
  dialog.setTitle('Edit name');
  dialog.setEscapeToCancel(true);
  dialog.setHasTitleCloseButton(true);
  dialog.setModal(true);
  dialog.setDisposeOnHide(true);
  dialog.getContentElement().classList.add('ydn-crm');
  var html = templ.ydn.crm.inj.nameEditor(data);
  dialog.setContent(html.toString());

  return dialog;
};


/**
 * Show field editor.
 */
ydn.crm.sugarcrm.ui.field.Field.prototype.showEditor = function() {

  var dialog = ydn.crm.sugarcrm.ui.field.Field.createEditor(this.getTemplateData());

  this.getHandler().listen(dialog, goog.ui.Dialog.EventType.SELECT, this.handleEditorSelect, false);
  this.getHandler().listenOnce(dialog, goog.ui.PopupBase.EventType.HIDE, function(e) {
    this.getHandler().unlisten(dialog, goog.ui.Dialog.EventType.SELECT, this.handleEditorSelect, false);
  }, false);

  dialog.setVisible(true);
};


/**
 * @param {goog.ui.Dialog.Event} e
 * @protected
 */
ydn.crm.sugarcrm.ui.field.Field.prototype.handleEditorSelect = function(e) {

  if (e.key == goog.ui.Dialog.DefaultButtonKeys.OK) {
    var dialog = /** @type {goog.ui.Dialog} */ (e.target);
    var el = dialog.getContentElement();
    var fields_el = el.querySelectorAll('.field');
    var patches = {};
    var model = this.getModel();
    for (var i = 0; i < fields_el.length; i++) {
      var field_name = fields_el[i].getAttribute('name');
      var field_value = fields_el[i].querySelector('.value').value;
      var original_value = model.getFieldValue();
      if (original_value != field_value) {
        patches[field_name] = field_value;
      }
    }
    var ev = new ydn.crm.sugarcrm.ui.events.ChangedEvent(patches, this);
    this.dispatchEvent(ev);
  }
};


/**
 * @param {Event} e
 * @protected
 */
ydn.crm.sugarcrm.ui.field.Field.prototype.handleInputBlur = function(e) {
  var new_val = this.getRenderer().collectValue(this);
  var model = this.getModel();
  var patch = model.patch(new_val);
  if (patch) {
    var ev = new ydn.crm.sugarcrm.ui.events.ChangedEvent(patch, this);
    this.dispatchEvent(ev);
  }
};


/**
 * @return {Object} patch to clear the field.
 */
ydn.crm.sugarcrm.ui.field.Field.prototype.createClearPatch = function() {
  var obj = {};
  obj[this.getModel().getFieldName()] = '';
  return obj;
};


/**
 * @return {string}
 */
ydn.crm.sugarcrm.ui.field.Field.prototype.getFieldName = function() {
  return this.getModel().getFieldName();
};


/**
 * Refresh UI for model changes.
 */
ydn.crm.sugarcrm.ui.field.Field.prototype.refresh = function() {
  this.renderer.refresh(this);
};


/**
 * Refresh UI when record is changed with different ID.
 */
ydn.crm.sugarcrm.ui.field.Field.prototype.reset = function() {
  this.setNormallyHide(this.getSetting().getNormallyHide());
};


/**
 * Collect data from UI.
 * @return {*} return null if not modified.
 */
ydn.crm.sugarcrm.ui.field.Field.prototype.collectData = function() {
  var new_value = this.getRenderer().collectValue(this);
  /**
   * @type {ydn.crm.sugarcrm.model.Field}
   */
  var m = this.getModel();
  var old_value = m.getField();
  if (m.getType() == 'bool' && (goog.isDef(old_value) && !goog.isBoolean(old_value))) {
    if (old_value == 'on' || old_value == 'off') {
      new_value = new_value ? 'on' : 'off';
    } else if (old_value == 'true' || old_value == 'false') {
      new_value = new_value ? 'true' : 'false';
    } else if (old_value == '1' || old_value == '0') {
      new_value = new_value ? '1' : '0';
    }
  } else if (old_value === false && !m.getType() != 'bool' && new_value == 'false') {
    new_value = old_value; // restore wired old value.
  } else if (!goog.isDef(old_value) && !new_value) {
    new_value = old_value; // restore undefined status.
  }
  if (ydn.crm.sugarcrm.ui.field.Field.DEBUG) {
    window.console.log(this.getFieldName(), m.getType(), old_value, new_value);
  }
  if (new_value != old_value) {
    return new_value;
  } else {
    return null;
  }
};


/**
 * Get field value from the model.
 * @return {*}
 */
ydn.crm.sugarcrm.ui.field.Field.prototype.getValue = function() {
  return this.getModel().getFieldValue();
};


/**
 * Check modification on UI value with model value.
 * @return {boolean}
 */
ydn.crm.sugarcrm.ui.field.Field.prototype.hasChanged = function() {
  return this.getValue() != this.collectData();
};


/**
 * Get user setting.
 * @return {?CrmApp.SugarCrmSettingUnit}
 */
ydn.crm.sugarcrm.ui.field.Field.prototype.getUserSetting = function() {
  var setting = ydn.crm.ui.UserSetting.getInstance().getSugarCrmSetting();
  return setting.Field[this.getFieldName()] || null;
};


/**
 * Get normally hide status as display in DOM.
 * @return {?boolean}
 */
ydn.crm.sugarcrm.ui.field.Field.prototype.isNormallyHide = function() {
  var field = this.getElement();
  return field.classList.contains(ydn.crm.ui.CSS_CLASS_NORMALLY_HIDE);
};


/**
 * @param {boolean} val
 */
ydn.crm.sugarcrm.ui.field.Field.prototype.setNormallyHide = function(val) {
  var ele = this.getElement();
  if (val) {
    ele.classList.add(ydn.crm.ui.CSS_CLASS_NORMALLY_HIDE);
  } else {
    ele.classList.remove(ydn.crm.ui.CSS_CLASS_NORMALLY_HIDE);
  }
};
