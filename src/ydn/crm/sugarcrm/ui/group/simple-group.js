/**
 * @fileoverview Simple group component.
 *
 * Simple group component render themselves without using child field components.
 * Detail field editing is rely on Options drop down menu.
 */


goog.provide('ydn.crm.su.ui.group.SimpleGroup');
goog.require('ydn.crm.su.ui.group.AbstractGroup');
goog.require('ydn.crm.su.ui.group.SimpleGroupRenderer');



/**
 * Simple group component.
 * @param {ydn.crm.su.model.BaseGroup} model
 * @param {ydn.crm.su.ui.group.SimpleGroupRenderer=} opt_renderer
 * @param {goog.dom.DomHelper=} opt_dom
 * @constructor
 * @struct
 * @extends {ydn.crm.su.ui.group.AbstractGroup}
 */
ydn.crm.su.ui.group.SimpleGroup = function(model, opt_renderer, opt_dom) {
  /**
   * @protected
   * @type {ydn.crm.su.ui.group.SimpleGroupRenderer}
   */
  this.renderer = opt_renderer || ydn.crm.su.ui.group.SimpleGroupRenderer.getInstance();
  goog.base(this, model, opt_dom);
};
goog.inherits(ydn.crm.su.ui.group.SimpleGroup, ydn.crm.su.ui.group.AbstractGroup);


/**
 * @define {boolean} debug flag.
 */
ydn.crm.su.ui.group.SimpleGroup.DEBUG = false;


/**
 * @inheritDoc
 */
ydn.crm.su.ui.group.SimpleGroup.prototype.createDom = function() {
  goog.base(this, 'createDom');
  this.renderer.decorate(this);
};


/**
 * @inheritDoc
 */
ydn.crm.su.ui.group.SimpleGroup.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');

  var input = this.getElement().querySelector('input');
  if (input) {
    this.getHandler().listen(input,
        goog.events.EventType.BLUR, this.handleInputBlur);
  }

  var el_more = this.getElement().getElementsByClassName(
      ydn.crm.su.ui.field.FieldRenderer.CSS_CLASS_HOVER_BUTTON)[0];
  if (el_more) {
    this.getHandler().listen(el_more, 'click', this.onHoverButtonClick);
  }

};


/**
 * @return {string}
 */
ydn.crm.su.ui.group.SimpleGroup.prototype.getInputValue = function() {
  return this.renderer.getInputValue(this);
};


/**
 * @param {string} val
 */
ydn.crm.su.ui.group.SimpleGroup.prototype.setInputValue = function(val) {
  this.renderer.setInputValue(this, val);
};


/**
 * @param {Event} e
 * @protected
 */
ydn.crm.su.ui.group.SimpleGroup.prototype.handleInputBlur = function(e) {
  var new_val = this.collectData();
  var model = this.getModel();
  var patch = model.pluck(new_val);
  if (patch) {
    var ev = new ydn.crm.su.ui.events.ChangedEvent(patch, this);
    this.dispatchEvent(ev);
  }
};


/**
 * @param {goog.events.Event} e
 * @protected
 */
ydn.crm.su.ui.group.SimpleGroup.prototype.onHoverButtonClick = function(e) {
  var el = /** @type {Element} */ (e.currentTarget);
  var cmd = /** @type {ydn.crm.su.model.Field.Command} */ (el.getAttribute('name'));
  if (ydn.crm.su.ui.group.SimpleGroup.DEBUG) {
    window.console.log(cmd);
  }
  if (cmd) {
    // menu action are handle in group level.
    var ev = new ydn.crm.su.ui.events.FieldMenuActionEvent(cmd, this);
    this.dispatchEvent(ev);
    if (!ev.defaultPrevented) {
      this.doMenuActionDefault(ev);
    }
  }
};


/**
 * @inheritDoc
 */
ydn.crm.su.ui.group.SimpleGroup.prototype.collectData = function() {
  var obj = null;
  for (var j = 0; j < this.getChildCount(); j++) {
    if (!(this.getChildAt(j) instanceof ydn.crm.su.ui.field.Field)) {
      continue;
    }
    var f = /** @type {ydn.crm.su.ui.field.Field} */ (this.getChildAt(j));
    var value = f.collectData();
    if (!goog.isNull(value)) {
      if (!obj) {
        obj = {};
      }
      obj[f.getFieldName()] = value;
    }
  }
  return obj;
};


/**
 * @inheritDoc
 */
ydn.crm.su.ui.group.SimpleGroup.prototype.getPatch = function() {
  var obj = null;
  for (var j = 0; j < this.getChildCount(); j++) {
    if (!(this.getChildAt(j) instanceof ydn.crm.su.ui.field.Field)) {
      continue;
    }
    var f = /** @type {ydn.crm.su.ui.field.Field} */ (this.getChildAt(j));
    if (!f.hasChanged()) {
      continue;
    }
    var value = f.collectData();
    if (!goog.isNull(value)) {
      if (!obj) {
        obj = {};
      }
      obj[f.getFieldName()] = value;
    }
  }
  return obj;
};


/**
 * @inheritDoc
 */
ydn.crm.su.ui.group.SimpleGroup.prototype.hasChanged = function() {
  for (var j = 0; j < this.getChildCount(); j++) {
    if (!(this.getChildAt(j) instanceof ydn.crm.su.ui.field.Field)) {
      continue;
    }
    var f = /** @type {ydn.crm.su.ui.field.Field} */ (this.getChildAt(j));
    if (f.hasChanged()) {
      return true;
    }
  }
  return false;
};


/**
 * Default operation for action.
 * @param {ydn.crm.su.ui.events.FieldMenuActionEvent} mae
 * @protected
 */
ydn.crm.su.ui.group.SimpleGroup.prototype.doMenuActionDefault = function(mae) {
  if (mae.command == ydn.crm.su.model.Field.Command.EDIT) {
    var dialog = ydn.crm.su.ui.field.Field.createEditor(this.getEditorTemplateData());

    this.getHandler().listen(dialog, goog.ui.Dialog.EventType.SELECT,
        this.handleEditorSelect_, false);
    this.getHandler().listenOnce(dialog, goog.ui.PopupBase.EventType.HIDE, function(e) {
      this.getHandler().unlisten(dialog, goog.ui.Dialog.EventType.SELECT,
          this.handleEditorSelect_, false);
    }, false);

    dialog.setVisible(true);
  }
};


/**
 * Patch option fields when Edit dialog closed with OK.
 * Subclass should override this to get correct patch from the dialog box.
 * @param {Element} el field element.
 * @param {Object} patches the patch object.
 * @return {boolean} true if patch has been applied.
 * @protected
 */
ydn.crm.su.ui.group.SimpleGroup.prototype.patchOptionField = function(el, patches) {
  var field_name = el.getAttribute('name');
  var input = el.querySelector('.value').firstElementChild;
  var field_value;
  if (input.tagName == goog.dom.TagName.INPUT) {
    field_value = input.value;
  } else {
    // textarea element.
    field_value = input.value;
  }
  patches[field_name] = field_value;
  return true;
};


/**
 * Handle when dialog is closed with 'OK' button.
 * The default handler will collect field values and dispatch
 * @see {ydn.crm.su.ui.events.Type.CHANGE} event.
 * If the event is handled
 * @see {#applyEditorChanges} default handler will be invoke.
 * @param {goog.ui.Dialog} dialog
 * @protected
 */
ydn.crm.su.ui.group.SimpleGroup.prototype.handleDialogOk = function(dialog) {
  var el = dialog.getContentElement();
  var fields_el = el.querySelectorAll('.field');
  var patches = {};
  var has_patch = false;
  for (var i = 0; i < fields_el.length; i++) {
    has_patch |= this.patchOptionField(fields_el[i], patches);
  }
  if (has_patch) {
    var ev = new ydn.crm.su.ui.events.ChangedEvent(patches, this);
    this.dispatchEvent(ev);
    if (!ev.defaultPrevented) {
      this.applyEditorChanges(ev);
    }
  }
};


/**
 * @param {goog.ui.Dialog.Event} e
 * @private
 */
ydn.crm.su.ui.group.SimpleGroup.prototype.handleEditorSelect_ = function(e) {

  if (e.key == goog.ui.Dialog.DefaultButtonKeys.OK) {
    var dialog = /** @type {goog.ui.Dialog} */ (e.target);
    this.handleDialogOk(dialog);
  }
};


/**
 * Performed default operation if event is handled.
 * @param {ydn.crm.su.ui.events.ChangedEvent} ev
 * @protected
 */
ydn.crm.su.ui.group.SimpleGroup.prototype.applyEditorChanges = function(ev) {
  // sub-class may override
};


/**
 * @override
 */
ydn.crm.su.ui.group.SimpleGroup.prototype.refresh = function() {
  this.renderer.refresh(this);
};


/**
 * Get template data for editor dialog.
 * Subclass  with default renderer should override for rendering standard edit
 * dialog and override
 * @see #applyEditorChanges handler.
 * @return {ydn.crm.su.ui.field.Field.EditorTemplateData}
 * @protected
 */
ydn.crm.su.ui.group.SimpleGroup.prototype.getEditorTemplateData = function() {
  return {
    fields: []
  };
};


