

/**
 * @fileoverview SugarCrm module field.
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */


goog.provide('ydn.crm.su.ui.field.Field');
goog.require('goog.dom.TagName');
goog.require('goog.dom.forms');
goog.require('goog.ui.Component');
goog.require('goog.ui.PopupMenu');
goog.require('templ.ydn.crm.inj');
goog.require('ydn.crm.su.ui.events.ChangedEvent');
goog.require('ydn.crm.su.ui.field.CheckboxFieldRenderer');
goog.require('ydn.crm.su.ui.field.SelectInputFieldRenderer');
goog.require('ydn.crm.su.ui.field.FieldRenderer');
goog.require('ydn.crm.su.ui.field.InputFieldRenderer');
goog.require('ydn.crm.su.ui.field.TextFieldRenderer');
goog.require('ydn.crm.su.ui.setting.Field');
goog.require('ydn.crm.ui.Refreshable');



/**
 * Create a new module record field.
 * @param {ydn.crm.su.model.Field} info
 * @param {ydn.crm.su.ui.field.FieldRenderer=} opt_renderer Renderer used to
 * render or decorate the component; defaults to {@link goog.ui.ControlRenderer}.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for
 *     document interaction.
 * @extends {goog.ui.Component}
 * @constructor
 * @struct
 * @suppress {checkStructDictInheritance} suppress closure-library code.
 * @implements {ydn.crm.ui.Refreshable}
 */
ydn.crm.su.ui.field.Field = function(info, opt_renderer, opt_domHelper) {
  goog.base(this, opt_domHelper);
  /**
   * @protected
   * @type {ydn.crm.su.ui.field.FieldRenderer}
   */
  this.renderer = opt_renderer || ydn.crm.su.ui.field.Field.selectFieldRenderer(info.getType());
  this.setModel(info);

};
goog.inherits(ydn.crm.su.ui.field.Field, goog.ui.Component);


/**
 * @define {boolean} debug flag.
 */
ydn.crm.su.ui.field.Field.DEBUG = false;


/**
 * @return {ydn.crm.su.model.Field}
 * @override
 */
ydn.crm.su.ui.field.Field.prototype.getModel;


/**
 * @return {ydn.crm.su.ui.field.FieldRenderer}
 */
ydn.crm.su.ui.field.Field.prototype.getRenderer = function() {
  return this.renderer;
};


/**
 * @return {!ydn.crm.su.ui.setting.Field}
 */
ydn.crm.su.ui.field.Field.prototype.getSetting = function() {
  var m = this.getModel();
  return new ydn.crm.su.ui.setting.Field(m.getModuleName(), m.getFieldInfo());
};


/**
 * Select suitable renderer for a given type.
 * @param {string} type
 * @return {ydn.crm.su.ui.field.FieldRenderer}
 */
ydn.crm.su.ui.field.Field.selectFieldRenderer = function(type) {
  if (type == 'bool') {
    return ydn.crm.su.ui.field.CheckboxFieldRenderer.getInstance();
  } else if (type == 'text') {
    return ydn.crm.su.ui.field.TextFieldRenderer.getInstance();
  } else if (type == 'enum') {
    return ydn.crm.su.ui.field.SelectInputFieldRenderer.getInstance();
  } else {
    return ydn.crm.su.ui.field.InputFieldRenderer.getInstance();
  }
};


/**
 * @inheritDoc
 */
ydn.crm.su.ui.field.Field.prototype.createDom = function() {
  this.renderer.createDom(this);
};


/**
 * @inheritDoc
 */
ydn.crm.su.ui.field.Field.prototype.enterDocument = function() {
  var input = this.getRenderer().getInputElement(this);
  if (input) {
    this.getHandler().listen(input,
        goog.events.EventType.BLUR, this.handleInputBlur);
  }
  var el_more = this.getRenderer().getMoreMenuElement(this);
  if (el_more) {
    this.getHandler().listen(el_more, 'click', this.onMoreMenuClick);
  }
};


/**
 * @param {Event} e
 * @protected
 */
ydn.crm.su.ui.field.Field.prototype.onMoreMenuClick = function(e) {
  var el = /** @type {Element} */ (e.target);
  var item = goog.dom.getAncestorByClass(el, 'goog-menuitem');
  var cmd = /** @type {ydn.crm.su.model.Field.Command} */ (item.getAttribute('name'));

  if (cmd) {
    // menu action are handle in group level.
    var ev = new ydn.crm.su.ui.events.FieldMenuActionEvent(cmd, this);
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
      if (ev.command == ydn.crm.su.model.Field.Command.REMOVE) {
        var obj = this.createClearPatch();
        var ce = new ydn.crm.su.ui.events.ChangedEvent(obj, this);
        this.dispatchEvent(ce);
      } else if (ev.command == ydn.crm.su.model.Field.Command.EDIT) {
        this.showEditor();
      }
    }
  }
};


/**
 * Get template data for editor dialog.
 * @return {ydn.crm.su.ui.field.Field.EditorTemplateData}
 */
ydn.crm.su.ui.field.Field.prototype.getTemplateData = function() {

  var model = this.getModel();
  var lid = this.getDataList();
  var fields = [{
    label: model.getLabel(),
    name: model.getFieldName(),
    value: model.getStringValue(),
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
ydn.crm.su.ui.field.Field.prototype.getDataList = function() {
  var model = this.getModel();
  return ydn.crm.su.ui.field.FieldRenderer.getDataList(
      model.getModuleName(), model.getFieldInfo());
};


/**
 * @typedef {{
 *   fields: !Array.<{label: string, listId: (null|string|undefined), name: string, type: string, value: string}>,
 *   title: (string|undefined)
 * }}
 */
ydn.crm.su.ui.field.Field.EditorTemplateData;


/**
 * Create editor dialog.
 * Dialog is disposed on hide.
 * @param {ydn.crm.su.ui.field.Field.EditorTemplateData} data template data.
 * @return {goog.ui.Dialog}
 */
ydn.crm.su.ui.field.Field.createEditor = function(data) {
  var title = data.title || 'Edit record fields';
  var dialog = new goog.ui.Dialog();
  dialog.setButtonSet(goog.ui.Dialog.ButtonSet.createOkCancel());
  dialog.setTitle(title);
  dialog.setEscapeToCancel(true);
  dialog.setHasTitleCloseButton(true);
  dialog.setModal(true);
  dialog.setDisposeOnHide(true);

  var content = dialog.getContentElement();
  content.classList.add('ydn-crm');
  var body = document.createElement('tbody');
  for (var i = 0; i < data.fields.length; i++) {
    var field = data.fields[i];
    var tr = document.createElement('tr');
    tr.className = 'field';
    tr.setAttribute('name', field.name);
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    tr.appendChild(td1);
    tr.appendChild(td2);
    td1.className = 'name';
    td2.className = 'value';
    td1.textContent = field.label;
    if (field.type == 'textarea') {
      var tx = document.createElement('textarea');
      tx.value = field.value;
      tx.setAttribute('rows', '3');
      td2.appendChild(tx);
    } else {
      var ip = document.createElement('input');
      if (field.type) {
        ip.type = field.type;
      }
      goog.dom.forms.setValue(ip, field.value);
      if (field.listId) {
        ip.setAttribute('list', field.listId);
      }
      td2.appendChild(ip);
    }
    body.appendChild(tr);
  }
  var table = document.createElement('table');
  table.appendChild(body);
  var div = document.createElement('div');
  div.className = 'field-edit-dialog';
  div.appendChild(table);
  content.appendChild(div);

  return dialog;
};


/**
 * Show field editor.
 */
ydn.crm.su.ui.field.Field.prototype.showEditor = function() {

  var dialog = ydn.crm.su.ui.field.Field.createEditor(this.getTemplateData());

  this.getHandler().listen(dialog, goog.ui.Dialog.EventType.SELECT, this.handleEditorSelect, false);
  this.getHandler().listenOnce(dialog, goog.ui.PopupBase.EventType.HIDE, function(e) {
    this.getHandler().unlisten(dialog, goog.ui.Dialog.EventType.SELECT, this.handleEditorSelect, false);
  }, false);

  dialog.setVisible(true);
};


/**
 * Dispatch ChangedEvent when editor closed.
 * Subclass should override this to get correct patch from the dialog box.
 * @param {goog.ui.Dialog.Event} e
 * @protected
 */
ydn.crm.su.ui.field.Field.prototype.handleEditorSelect = function(e) {

  if (e.key == goog.ui.Dialog.DefaultButtonKeys.OK) {
    var dialog = /** @type {goog.ui.Dialog} */ (e.target);
    var el = dialog.getContentElement();
    var fields_el = el.querySelectorAll('.field');
    var patches = {};
    for (var i = 0; i < fields_el.length; i++) {
      var field_name = fields_el[i].getAttribute('name');
      var input = fields_el[i].querySelector('.value');
      patches[field_name] = input.value;
    }
    var ev = new ydn.crm.su.ui.events.ChangedEvent(patches, this);
    this.dispatchEvent(ev);
  }
};


/**
 * @param {Event} e
 * @protected
 */
ydn.crm.su.ui.field.Field.prototype.handleInputBlur = function(e) {
  var new_val = this.collectData();
  if (goog.isNull(new_val)) {
    return;
  }
  var model = this.getModel();
  var patch = model.patch(new_val);
  if (patch) {
    var ev = new ydn.crm.su.ui.events.ChangedEvent(patch, this);
    this.dispatchEvent(ev);
  }
};


/**
 * @return {Object} patch to clear the field, default to `{fieldName: ''}`.
 */
ydn.crm.su.ui.field.Field.prototype.createClearPatch = function() {
  var obj = {};
  obj[this.getModel().getFieldName()] = '';
  return obj;
};


/**
 * @return {string}
 */
ydn.crm.su.ui.field.Field.prototype.getFieldName = function() {
  return this.getModel().getFieldName();
};


/**
 * Refresh UI for model changes.
 */
ydn.crm.su.ui.field.Field.prototype.refresh = function() {
  this.renderer.refresh(this);
};


/**
 * Refresh UI when record is changed with different ID.
 */
ydn.crm.su.ui.field.Field.prototype.reset = function() {
  this.setNormallyHide(this.getSetting().getNormallyHide());
};


/**
 * Conform resulting value collected from input element conforms with model
 * formatting.
 * @param {*} new_value
 * @param {ydn.crm.su.model.Field} model
 * @return {*}
 */
ydn.crm.su.ui.field.Field.formatResult = function(new_value, model) {
  var old_value = undefined;
  if (model.hasFieldValue()) {
    old_value = model.getField();
  } else {
    var def = model.getDefaultFieldValue();
    if (goog.isDefAndNotNull(def)) {
      old_value = def;
    }
  }

  if (ydn.crm.su.ui.field.Field.DEBUG) {
    window.console.log(model.getFieldName(), model.getType(), old_value, new_value);
  }

  if (model.getType() == 'bool' && (goog.isDef(old_value) && !goog.isBoolean(old_value))) {
    if (old_value == 'on' || old_value == 'off') {
      new_value = new_value ? 'on' : 'off';
    } else if (old_value == 'true' || old_value == 'false') {
      new_value = new_value ? 'true' : 'false';
    } else if (old_value == '1' || old_value == '0') {
      new_value = new_value ? '1' : '0';
    }
  } else if (model.getType() == 'int' && (!new_value || new_value == '0') && (!old_value || old_value == '0')) {
    new_value = old_value;
  } else if (old_value === false && !model.getType() != 'bool' && new_value == 'false') {
    new_value = old_value; // restore wired old value.
  } else if (!goog.isDef(old_value) && !new_value) {
    new_value = old_value; // restore undefined status.
  }

  return new_value;
};


/**
 * Get field value from the model.
 * @return {ydn.crm.su.RecordValue}
 */
ydn.crm.su.ui.field.Field.prototype.getValue = function() {
  return this.getModel().getField();
};


/**
 * Check modification on UI value from the original set (by the user).
 * @return {boolean}
 */
ydn.crm.su.ui.field.Field.prototype.hasChanged = function() {
  /**
   * @type {ydn.crm.su.model.Field}
   */
  var model = this.getModel();
  var val = model.getField();
  if (!goog.isDefAndNotNull(val)) {
    val = model.getDefaultFieldValue();
  }
  var new_val = this.collectData();
  return val != new_val;
};


/**
 * Collect data from Element.
 * @return {*}
 */
ydn.crm.su.ui.field.Field.prototype.collectData = function() {
  var new_value = this.getRenderer().collectValue(this);
  /**
   * @type {ydn.crm.su.model.Field}
   */
  var model = this.getModel();
  var val = ydn.crm.su.ui.field.Field.formatResult(new_value, model);
  return val;
};


/**
 * Get normally hide status as display in DOM.
 * @return {?boolean}
 */
ydn.crm.su.ui.field.Field.prototype.isNormallyHide = function() {
  var field = this.getElement();
  return field.classList.contains(ydn.crm.ui.CSS_CLASS_NORMALLY_HIDE);
};


/**
 * @param {boolean} val
 */
ydn.crm.su.ui.field.Field.prototype.setNormallyHide = function(val) {
  var ele = this.getElement();
  if (val) {
    ele.classList.add(ydn.crm.ui.CSS_CLASS_NORMALLY_HIDE);
  } else {
    ele.classList.remove(ydn.crm.ui.CSS_CLASS_NORMALLY_HIDE);
  }
};


/**
 * Simulate user edit.
 * @param {ydn.crm.su.RecordValue} val
 */
ydn.crm.su.ui.field.Field.prototype.simulateEdit = function(val) {
  this.getRenderer().simulateEdit(this, val);
};
