/**
 * Created by kyawtun on 5/1/14.
 */


/**
 * @const
 */
var CrmApp = {};



/**
 * @constructor
 */
CrmApp.UserSetting = function() {};


/**
 * @type {string}
 */
CrmApp.UserSetting.prototype.track;


/**
 * @type {string}
 */
CrmApp.UserSetting.prototype.theme;


/**
 * @type {boolean}
 */
CrmApp.UserSetting.prototype.logging;



/**
 * Query for request. Use in ydn.crm.Ch.SReq.LIST and ydn.crm.Ch.SReq.SEARCH
 * @constructor
 */
CrmApp.ReqQuery = function() {};


/**
 * @type {string}
 */
CrmApp.ReqQuery.prototype.store;


/**
 * @type {string}
 */
CrmApp.ReqQuery.prototype.index;


/**
 * @type {boolean|undefined} for prefix query
 */
CrmApp.ReqQuery.prototype.prefix;


/**
 * @type {IDBKey?}
 */
CrmApp.ReqQuery.prototype.key;


/**
 * @type {number?}
 */
CrmApp.ReqQuery.prototype.limit;


/**
 * @type {number?}
 */
CrmApp.ReqQuery.prototype.offset;


/**
 * @type {boolean?}
 */
CrmApp.ReqQuery.prototype.reverse;


/**
 * @type {IDBKeyRange?}
 */
CrmApp.ReqQuery.prototype.keyRange;


/**
 * @type {Array.<Object>} query result
 */
CrmApp.ReqQuery.prototype.result;


/**
 * @type {Array.<DbFullTextSearchResult>} query result
 */
CrmApp.ReqQuery.prototype.fullTextResult;



/**
 * Basic user setting used in UI modules.
 * @constructor
 */
CrmApp.UiUserSetting = function() {};


/**
 * User setting for context panel on Gmail.
 * @type {Object}
 */
CrmApp.UiUserSetting.prototype.contextPanel = {};


/**
 * User preferred location of context panel.
 * @type {string} ydn.crm.base.ContextPanelPosition
 */
CrmApp.UiUserSetting.prototype.contextPanel.location;



/**
 * Basic user setting used in UI modules.
 * @interface
 */
CrmApp.SugarCrmSettingUnit = function() {};


/**
 * @type {boolean|undefined}
 */
CrmApp.SugarCrmSettingUnit.prototype.normallyHide;



/**
 * Basic user setting used in UI modules.
 * @interface
 */
CrmApp.SugarCrmModuleSetting = function() {};


/**
 * @type {!Object.<CrmApp.SugarCrmSettingUnit>}
 */
CrmApp.SugarCrmModuleSetting.prototype.Group;


/**
 * @type {!Object.<CrmApp.SugarCrmSettingUnit>}
 */
CrmApp.SugarCrmModuleSetting.prototype.Field;



/**
 * Basic user setting used in UI modules.
 * @interface
 */
CrmApp.SugarCrmSetting = function() {};


/**
 * @type {!Object.<CrmApp.SugarCrmModuleSetting>}
 */
CrmApp.SugarCrmSetting.prototype.Module;



/**
 * FullContact v2 data.
 * @interface
 */
CrmApp.FullContact2SocialProfile = function() {};


/**
 * @type {string}
 */
CrmApp.FullContact2SocialProfile.prototype.typeId;


/**
 * @type {string}
 */
CrmApp.FullContact2SocialProfile.prototype.typeName;


/**
 * @type {string}
 */
CrmApp.FullContact2SocialProfile.prototype.id;


/**
 * @type {string}
 */
CrmApp.FullContact2SocialProfile.prototype.username;


/**
 * @type {string}
 */
CrmApp.FullContact2SocialProfile.prototype.url;


/**
 * @type {string|undefined}
 */
CrmApp.FullContact2SocialProfile.prototype.bio;


/**
 * @type {string}
 */
CrmApp.FullContact2SocialProfile.prototype.followers;


/**
 * @type {string}
 */
CrmApp.FullContact2SocialProfile.prototype.following;



/**
 * FullContact v2 data.
 * @interface
 */
CrmApp.FullContact2LocationUnit = function() {};


/**
 * @type {string}
 */
CrmApp.FullContact2LocationUnit.prototype.name;


/**
 * @type {string}
 */
CrmApp.FullContact2LocationUnit.prototype.code;


/**
 * @type {boolean}
 */
CrmApp.FullContact2LocationUnit.prototype.deduced;



/**
 * FullContact v2 data.
 * @interface
 */
CrmApp.FullContact2DeducedLocation = function() {};


/**
 * @type {CrmApp.FullContact2LocationUnit}
 */
CrmApp.FullContact2DeducedLocation.prototype.city;


/**
 * @type {CrmApp.FullContact2LocationUnit}
 */
CrmApp.FullContact2DeducedLocation.prototype.state;


/**
 * @type {CrmApp.FullContact2LocationUnit}
 */
CrmApp.FullContact2DeducedLocation.prototype.country;


/**
 * @type {CrmApp.FullContact2LocationUnit}
 */
CrmApp.FullContact2DeducedLocation.prototype.continent;


/**
 * @type {CrmApp.FullContact2LocationUnit}
 */
CrmApp.FullContact2DeducedLocation.prototype.county;


/**
 * @type {number}
 */
CrmApp.FullContact2DeducedLocation.prototype.likelihood;


/**
 * @type {string}
 */
CrmApp.FullContact2DeducedLocation.prototype.normalizedLocation;


/**
 * @type {string}
 */
CrmApp.FullContact2DeducedLocation.prototype.deducedLocation;



/**
 * FullContact v2 data.
 * @interface
 */
CrmApp.FullContact2Demographic = function() {};


/**
 * @type {string}
 */
CrmApp.FullContact2Demographic.prototype.locationGeneral;


/**
 * @type {string}
 */
CrmApp.FullContact2Demographic.prototype.age;


/**
 * @type {string}
 */
CrmApp.FullContact2Demographic.prototype.gender;


/**
 * @type {string}
 */
CrmApp.FullContact2Demographic.prototype.ageRange;


/**
 * @type {CrmApp.FullContact2DeducedLocation}
 */
CrmApp.FullContact2Demographic.prototype.locationDeduced;



/**
 * FullContact v2 data.
 * @interface
 */
CrmApp.FullContact2Website = function() {};


/**
 * @type {string}
 */
CrmApp.FullContact2Website.prototype.url;



/**
 * FullContact v2 data.
 * @interface
 */
CrmApp.FullContact2Organization = function() {};


/**
 * @type {string}
 */
CrmApp.FullContact2Organization.prototype.name;


/**
 * @type {string}
 */
CrmApp.FullContact2Organization.prototype.title;


/**
 * @type {boolean}
 */
CrmApp.FullContact2Organization.prototype.isPrimary;



/**
 * FullContact v2 data.
 * @interface
 */
CrmApp.FullContact2Chat = function() {};


/**
 * @type {string}
 */
CrmApp.FullContact2Chat.prototype.handle;



/**
 * FullContact v2 data.
 * @interface
 */
CrmApp.FullContact2Photo = function() {};


/**
 * @type {string}
 */
CrmApp.FullContact2Photo.prototype.url;


/**
 * @type {string}
 */
CrmApp.FullContact2Photo.prototype.typeName;


/**
 * @type {boolean}
 */
CrmApp.FullContact2Photo.prototype.isPrimary;



/**
 * FullContact v2 data.
 * @interface
 */
CrmApp.FullContact2Contact = function() {};


/**
 * @type {string}
 */
CrmApp.FullContact2Contact.prototype.familyName;


/**
 * @type {string}
 */
CrmApp.FullContact2Contact.prototype.givenName;


/**
 * @type {string}
 */
CrmApp.FullContact2Contact.prototype.fullName;


/**
 * @type {Array.<CrmApp.FullContact2Website>}
 */
CrmApp.FullContact2Contact.prototype.websites;


/**
 * @type {Object.<Array.<CrmApp.FullContact2Chat>>}
 */
CrmApp.FullContact2Contact.prototype.chats;



/**
 * FullContact v2 data.
 * @interface
 */
CrmApp.FullContact2 = function() {};


/**
 * @type {number}
 */
CrmApp.FullContact2.prototype.likelihood;


/**
 * @type {Array.<CrmApp.FullContact2Photo>}
 */
CrmApp.FullContact2.prototype.photos;


/**
 * @type {CrmApp.FullContact2Contact}
 */
CrmApp.FullContact2.prototype.contactInfo;


/**
 * @type {Array.<CrmApp.FullContact2Organization>}
 */
CrmApp.FullContact2.prototype.organizations;


/**
 * @type {Array.<CrmApp.FullContact2Demographic>}
 */
CrmApp.FullContact2.prototype.demographics;


/**
 * @type {Array<CrmApp.FullContact2SocialProfile>}
 */
CrmApp.FullContact2.prototype.socialProfiles;



/**
 * All available social data.
 * @interface
 */
CrmApp.MetaContact = function() {};


/**
 * @type {?CrmApp.FullContact2}
 */
CrmApp.MetaContact.prototype.fc;
