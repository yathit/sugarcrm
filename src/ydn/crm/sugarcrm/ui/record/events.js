/**
 * @fileoverview Model change event.
 */

goog.provide('ydn.crm.su.ui.events');
goog.require('ydn.crm.su.ui.setting.Field');



/**
 * Event for sugar models.
 * @param {!ydn.crm.su.ui.setting.Setting} setting field key path.
 * @param {ydn.crm.ui.UserSetting.SugarCrmSettingUnitKey} key target setting name, eg. `normallyHide`.
 * @param {*} value new value.
 * @param {Object=} opt_event_target target.
 * @extends {goog.events.Event}
 * @constructor
 * @struct
 */
ydn.crm.su.ui.events.SettingChangeEvent = function(setting, key, value, opt_event_target) {
  goog.base(this, ydn.crm.su.ui.events.Type.SETTING_CHANGE, opt_event_target);

  /**
   * @final
   * @type {!ydn.crm.su.ui.setting.Setting}
   */
  this.setting = setting;
  /**
   * @final
   * @type {ydn.crm.ui.UserSetting.SugarCrmSettingUnitKey}
   */
  this.key = key;
  /**
   * @final
   * @type {*}
   */
  this.value = value;
};
goog.inherits(ydn.crm.su.ui.events.SettingChangeEvent, goog.events.Event);



/**
 * Edit click event.
 * @param {boolean} value new value.
 * @param {Object=} opt_event_target target.
 * @extends {goog.events.Event}
 * @constructor
 * @struct
 */
ydn.crm.su.ui.events.EditEvent = function(value, opt_event_target) {
  goog.base(this, ydn.crm.su.ui.events.Type.EDIT, opt_event_target);

  /**
   * @final
   * @type {boolean}
   */
  this.value = value;
};
goog.inherits(ydn.crm.su.ui.events.EditEvent, goog.events.Event);



