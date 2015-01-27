/**
 * @fileoverview Default group renderer, create all fields by default field
 * component.
 *
 */


goog.provide('ydn.crm.su.ui.group.AppointmentRenderer');
goog.require('ydn.crm.su.ui.group.GroupRenderer');



/**
 * Default group renderer.
 * @constructor
 * @extends {ydn.crm.su.ui.group.GroupRenderer}
 * @struct
 */
ydn.crm.su.ui.group.AppointmentRenderer = function() {
  goog.base(this);
};
goog.inherits(ydn.crm.su.ui.group.AppointmentRenderer, ydn.crm.su.ui.group.GroupRenderer)
goog.addSingletonGetter(ydn.crm.su.ui.group.AppointmentRenderer);


/**
 * @define {boolean} debug flag.
 */
ydn.crm.su.ui.group.AppointmentRenderer.DEBUG = false;


/** @return {string} */
ydn.crm.su.ui.group.AppointmentRenderer.prototype.getCssClass = function() {
  return ydn.crm.su.ui.group.GroupRenderer.CSS_CLASS;
};


/**
 * @override
 */
ydn.crm.su.ui.group.AppointmentRenderer.prototype.createDom = function(ctrl) {
  var dom = ctrl.getDomHelper();
  var root = dom.createDom('div', this.getCssClass());
  var head = dom.createDom('div', ydn.crm.su.ui.group.GroupRenderer.CSS_CLASS_HEADER);
  var content = dom.createDom('div', ydn.crm.ui.CSS_CLASS_CONTENT);
  root.appendChild(head);
  root.appendChild(content);
  ctrl.setElementInternal(root);
  var model = /** @type {ydn.crm.su.model.AppointmentGroup} */ (ctrl.getModel());
  var group_name = model.getGroupName();
  root.setAttribute('name', group_name);

  var start = model.createOrGetFieldModel(ydn.crm.su.model.AppointmentGroup.FieldName.START);
  var start_ctrl = new ydn.crm.su.ui.field.Field(start, null, dom);
  ctrl.addChild(start_ctrl, true);

  // render duration
  var label = dom.createDom('span', 'label', 'Duration: ');
  var hour = dom.createDom('input', {
    'name': ydn.crm.su.model.AppointmentGroup.FieldName.HOUR,
    'class': 'value',
    'type': 'number'
  });
  var minute = dom.createDom('input', {
    'name': ydn.crm.su.model.AppointmentGroup.FieldName.MINUTE,
    'class': 'value',
    'type': 'range',
    'min': 0,
    'max': 59,
    'value': 30
  });
  var duration_el = dom.createDom('div', null, [label, hour, minute]);
  content.appendChild(duration_el);

  return root;
};


/**
 * @override
 */
ydn.crm.su.ui.group.AppointmentRenderer.prototype.refresh = function(ctrl) {
  var start_ctrl = /** @type {ydn.crm.su.ui.field.Field} */ (ctrl.getChildAt(0));
  start_ctrl.refresh();

  var content = ctrl.getContentElement();
  var hour = content.querySelector('input[name=' +
      ydn.crm.su.model.AppointmentGroup.FieldName.HOUR + ']');
  var minute = content.querySelector('input[name=' +
      ydn.crm.su.model.AppointmentGroup.FieldName.MINUTE + ']');
  var model = /** @type {ydn.crm.su.model.AppointmentGroup} */ (ctrl.getModel());
  var hour_field = model.createOrGetFieldModel(ydn.crm.su.model.AppointmentGroup.FieldName.HOUR);
  hour.value = hour_field.getStringValue();
  var minute_field = model.createOrGetFieldModel(ydn.crm.su.model.AppointmentGroup.FieldName.MINUTE);
  minute.value = minute_field.getStringValue();
};




