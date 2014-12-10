/**
 * @fileoverview Simple group component.
 *
 * Simple group component render themselves without using child field components.
 * Detail field editing is rely on Options drop down menu.
 */


goog.provide('ydn.crm.sugarcrm.ui.group.SimpleGroup');
goog.require('ydn.crm.sugarcrm.ui.group.AbstractGroup');
goog.require('ydn.crm.sugarcrm.ui.group.SimpleGroupRenderer');



/**
 * Simple group component.
 * @param {ydn.crm.sugarcrm.model.BaseGroup} model
 * @param {ydn.crm.sugarcrm.ui.group.SimpleGroupRenderer=} opt_renderer
 * @param {goog.dom.DomHelper=} opt_dom
 * @constructor
 * @struct
 * @extends {ydn.crm.sugarcrm.ui.group.AbstractGroup}
 */
ydn.crm.sugarcrm.ui.group.SimpleGroup = function(model, opt_renderer, opt_dom) {
  /**
   * @protected
   * @type {ydn.crm.sugarcrm.ui.group.SimpleGroupRenderer}
   */
  this.renderer = opt_renderer || ydn.crm.sugarcrm.ui.group.SimpleGroupRenderer.getInstance();
  goog.base(this, model, opt_dom);
};
goog.inherits(ydn.crm.sugarcrm.ui.group.SimpleGroup, ydn.crm.sugarcrm.ui.group.AbstractGroup);


/**
 * @define {boolean} debug flag.
 */
ydn.crm.sugarcrm.ui.group.SimpleGroup.DEBUG = false;


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.ui.group.SimpleGroup.prototype.createDom = function() {
  goog.base(this, 'createDom');
  this.renderer.decorate(this);
};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.ui.group.SimpleGroup.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');

  var input = this.getElement().querySelector('input');
  if (input) {
    this.getHandler().listen(input,
        goog.events.EventType.BLUR, this.handleInputBlur);
  }

  var el_more = this.getElement().getElementsByClassName(
      ydn.crm.sugarcrm.ui.field.FieldRenderer.CSS_CLASS_HOVER_BUTTON)[0];
  if (el_more) {
    this.getHandler().listen(el_more, 'click', this.onHoverButtonClick);
  }

};


/**
 * @return {string}
 */
ydn.crm.sugarcrm.ui.group.SimpleGroup.prototype.getInputValue = function() {
  return this.renderer.getInputValue(this);
};


/**
 * @param {string} val
 */
ydn.crm.sugarcrm.ui.group.SimpleGroup.prototype.setInputValue = function(val) {
  this.renderer.setInputValue(this, val);
};


/**
 * @param {Event} e
 * @protected
 */
ydn.crm.sugarcrm.ui.group.SimpleGroup.prototype.handleInputBlur = function(e) {
  var new_val = this.collectData();
  var model = this.getModel();
  var patch = model.patch(new_val);
  if (patch) {
    var ev = new ydn.crm.sugarcrm.ui.events.ChangedEvent(patch, this);
    this.dispatchEvent(ev);
  }
};


/**
 * @param {goog.events.Event} e
 * @protected
 */
ydn.crm.sugarcrm.ui.group.SimpleGroup.prototype.onHoverButtonClick = function(e) {
  var el = /** @type {Element} */ (e.currentTarget);
  var cmd = /** @type {ydn.crm.sugarcrm.model.Field.Command} */ (el.getAttribute('name'));
  if (ydn.crm.sugarcrm.ui.group.SimpleGroup.DEBUG) {
    window.console.log(cmd);
  }
  if (cmd) {
    // menu action are handle in group level.
    var ev = new ydn.crm.sugarcrm.ui.events.FieldMenuActionEvent(cmd, this);
    this.dispatchEvent(ev);
    if (!ev.defaultPrevented) {
      this.doMenuActionDefault(ev);
    }
  }
};


/**
 * @inheritDoc
 */
ydn.crm.sugarcrm.ui.group.SimpleGroup.prototype.collectData = function() {
  var obj = null;
  for (var j = 0; j < this.getChildCount(); j++) {
    var f = /** @type {ydn.crm.sugarcrm.ui.field.Field} */ (this.getChildAt(j));
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
 * Default operation for action.
 * @param {ydn.crm.sugarcrm.ui.events.FieldMenuActionEvent} mae
 * @protected
 */
ydn.crm.sugarcrm.ui.group.SimpleGroup.prototype.doMenuActionDefault = function(mae) {
  if (mae.command == ydn.crm.sugarcrm.model.Field.Command.EDIT) {
    var dialog = ydn.crm.sugarcrm.ui.field.Field.createEditor(this.getEditorTemplateData());

    this.getHandler().listen(dialog, goog.ui.Dialog.EventType.SELECT, this.handleEditorSelect, false);
    this.getHandler().listenOnce(dialog, goog.ui.PopupBase.EventType.HIDE, function(e) {
      this.getHandler().unlisten(dialog, goog.ui.Dialog.EventType.SELECT, this.handleEditorSelect, false);
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
ydn.crm.sugarcrm.ui.group.SimpleGroup.prototype.patchOptionField = function(el, patches) {
  var field_name = el.getAttribute('name');
  var input = el.querySelector('.value');
  var field_value;
  if (input.tagName == goog.dom.TagName.INPUT) {
    field_value = input.value;
  } else {
    // textarea element.
    field_value = input.textContent;
  }
  patches[field_name] = field_value;
  return true;
};


/**
 * @param {goog.ui.Dialog.Event} e
 * @protected
 */
ydn.crm.sugarcrm.ui.group.SimpleGroup.prototype.handleEditorSelect = function(e) {

  if (e.key == goog.ui.Dialog.DefaultButtonKeys.OK) {
    var dialog = /** @type {goog.ui.Dialog} */ (e.target);
    var el = dialog.getContentElement();
    var fields_el = el.querySelectorAll('.field');
    var patches = {};
    var has_patch = false;
    for (var i = 0; i < fields_el.length; i++) {
      has_patch |= this.patchOptionField(fields_el[i], patches);
    }
    if (has_patch) {
      var ev = new ydn.crm.sugarcrm.ui.events.ChangedEvent(patches, this);
      this.dispatchEvent(ev);
      if (!ev.defaultPrevented) {
        this.doEditorApplyDefault(ev);
      }
    }
  }
};


/**
 * Performed default operation if event is handled.
 * @param {ydn.crm.sugarcrm.ui.events.ChangedEvent} ev
 * @protected
 */
ydn.crm.sugarcrm.ui.group.SimpleGroup.prototype.doEditorApplyDefault = function(ev) {
  // sub-class may override
};


/**
 * @override
 */
ydn.crm.sugarcrm.ui.group.SimpleGroup.prototype.refresh = function() {
  this.renderer.refresh(this);
};


/**
 * Get template data for editor dialog.
 * Subclass should override for rendering with default renderer.
 * @return {ydn.crm.sugarcrm.ui.field.Field.EditorTemplateData}
 * @protected
 */
ydn.crm.sugarcrm.ui.group.SimpleGroup.prototype.getEditorTemplateData = function() {
  return {
    fields: []
  };
};


