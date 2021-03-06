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
 * Full text search query
 * @constructor
 */
CrmApp.TextQuery = function() {};


/**
 * @type {string} `ydn.crm.su.ModuleName`
 */
CrmApp.TextQuery.prototype.store;


/**
 * @type {string} See `ydn.crm.su.Schema` for available indexes.
 */
CrmApp.TextQuery.prototype.index;


/**
 * @type {string} query.
 */
CrmApp.TextQuery.prototype.q;


/**
 * @type {number|undefined} query.
 */
CrmApp.TextQuery.prototype.limit;


/**
 * @type {number|undefined} Threshold score of a result to consider as
 * success.
 */
CrmApp.TextQuery.prototype.threshold;


/**
 * Return full record instead of just full text search result.
 * @type {boolean} query.
 */
CrmApp.TextQuery.prototype.fetchFull;



/**
 * Query result.
 * Query information are retained.
 * @constructor
 * @extends {DbFullTextSearchResult}
 */
CrmApp.RecordFullTextSearchResult = function() {};


/**
 * @type {SugarCrm.Record} return only when `fetchFull` is set `true` in query.
 */
CrmApp.RecordFullTextSearchResult.prototype.record;



/**
 * Query result.
 * Query information are retained.
 * @constructor
 * @extends {CrmApp.TextQuery}
 */
CrmApp.TextQueryResult = function() {};


/**
 * @type {!Array.<CrmApp.RecordFullTextSearchResult>} query result
 */
CrmApp.TextQueryResult.prototype.fullTextResult;



/**
 * Query for request. Use in ydn.crm.ch.SReq.LIST and ydn.crm.ch.SReq.SEARCH
 * @constructor
 */
CrmApp.ReqQuery = function() {};


/**
 * @type {string} `ydn.crm.su.ModuleName`
 */
CrmApp.ReqQuery.prototype.store = '';


/**
 * Index name. Default to 'id'.
 * @type {string|undefined} See `ydn.crm.su.Schema` for available indexes.
 */
CrmApp.ReqQuery.prototype.index = '';


/**
 * @type {boolean|undefined} for prefix query, in combine with key.
 */
CrmApp.ReqQuery.prototype.prefix = false;


/**
 * @type {IDBKey?} same as `KeyRange.only(key)`, but do normalization of the key
 * for phone and email query. If prefix is true, this becomes
 * `KeyRange.starts(key)`
 */
CrmApp.ReqQuery.prototype.key = '';


/**
 * @type {number?}
 */
CrmApp.ReqQuery.prototype.limit = 10;


/**
 * @type {number?}
 */
CrmApp.ReqQuery.prototype.offset = 0;


/**
 * @type {boolean?}
 */
CrmApp.ReqQuery.prototype.reverse = false;


/**
 * @type {boolean?} key-only query.
 */
CrmApp.ReqQuery.prototype.keyOnly = false;


/**
 * @type {IDBKeyRange?}
 */
CrmApp.ReqQuery.prototype.keyRange = null;



/**
 * Query result.
 * Query information are retained.
 * @constructor
 * @extends {CrmApp.ReqQuery}
 */
CrmApp.QueryResult = function() {};


/**
 * @type {!Array<!SugarCrm.Record>} query result
 */
CrmApp.QueryResult.prototype.result = [];



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
 * @constructor
 */
CrmApp.SugarCrmSettingUnit = function() {};


/**
 * @type {boolean|undefined}
 */
CrmApp.SugarCrmSettingUnit.prototype.normallyHide;



/**
 * Basic user setting used in UI modules.
 * @constructor
 */
CrmApp.SugarCrmModuleSetting = function() {};


/**
 * @type {Object.<CrmApp.SugarCrmSettingUnit>}
 */
CrmApp.SugarCrmModuleSetting.prototype.Group = null;


/**
 * @type {Object.<CrmApp.SugarCrmSettingUnit>}
 */
CrmApp.SugarCrmModuleSetting.prototype.Field = null;



/**
 * Basic user setting used in UI modules.
 * @constructor
 */
CrmApp.SugarCrmSetting = function() {};


/**
 * @type {!Object.<CrmApp.SugarCrmModuleSetting>}
 */
CrmApp.SugarCrmSetting.prototype.Module;



/**
 * FullContact v2 data.
 * @constructor
 */
CrmApp.FullContact2SocialProfile = function() {};


/**
 * @type {string}
 */
CrmApp.FullContact2SocialProfile.prototype.typeId = '';


/**
 * @type {string} e.g: Twitter
 */
CrmApp.FullContact2SocialProfile.prototype.typeName = '';


/**
 * @type {string}
 */
CrmApp.FullContact2SocialProfile.prototype.id = '';


/**
 * @type {string}
 */
CrmApp.FullContact2SocialProfile.prototype.username = '';


/**
 * @type {string}
 */
CrmApp.FullContact2SocialProfile.prototype.url = '';


/**
 * @type {string|undefined}
 */
CrmApp.FullContact2SocialProfile.prototype.bio = '';


/**
 * @type {number|undefined}
 */
CrmApp.FullContact2SocialProfile.prototype.followers = 0;


/**
 * @type {number|undefined}
 */
CrmApp.FullContact2SocialProfile.prototype.following = 0;



/**
 * FullContact v2 data.
 * @constructor
 */
CrmApp.FullContact2LocationUnit = function() {};


/**
 * @type {string}
 */
CrmApp.FullContact2LocationUnit.prototype.name = '';


/**
 * @type {string}
 */
CrmApp.FullContact2LocationUnit.prototype.code = '';


/**
 * @type {boolean}
 */
CrmApp.FullContact2LocationUnit.prototype.deduced = false;



/**
 * FullContact v2 data.
 * @constructor
 */
CrmApp.FullContact2DeducedLocation = function() {};


/**
 * @type {CrmApp.FullContact2LocationUnit}
 */
CrmApp.FullContact2DeducedLocation.prototype.city = null;


/**
 * @type {CrmApp.FullContact2LocationUnit}
 */
CrmApp.FullContact2DeducedLocation.prototype.state = null;


/**
 * @type {CrmApp.FullContact2LocationUnit}
 */
CrmApp.FullContact2DeducedLocation.prototype.country = null;


/**
 * @type {CrmApp.FullContact2LocationUnit}
 */
CrmApp.FullContact2DeducedLocation.prototype.continent = null;


/**
 * @type {CrmApp.FullContact2LocationUnit}
 */
CrmApp.FullContact2DeducedLocation.prototype.county = null;


/**
 * @type {number}
 */
CrmApp.FullContact2DeducedLocation.prototype.likelihood = 0;


/**
 * @type {string}
 */
CrmApp.FullContact2DeducedLocation.prototype.normalizedLocation = '';


/**
 * @type {string}
 */
CrmApp.FullContact2DeducedLocation.prototype.deducedLocation = '';



/**
 * FullContact v2 data.
 * @constructor
 */
CrmApp.FullContact2Demographic = function() {};


/**
 * @type {string}
 */
CrmApp.FullContact2Demographic.prototype.locationGeneral = '';


/**
 * @type {string}
 */
CrmApp.FullContact2Demographic.prototype.age = '';


/**
 * @type {string}
 */
CrmApp.FullContact2Demographic.prototype.gender = '';


/**
 * @type {string}
 */
CrmApp.FullContact2Demographic.prototype.ageRange = '';


/**
 * @type {CrmApp.FullContact2DeducedLocation}
 */
CrmApp.FullContact2Demographic.prototype.locationDeduced = null;



/**
 * FullContact v2 data.
 * @constructor
 */
CrmApp.FullContact2Website = function() {};


/**
 * @type {string}
 */
CrmApp.FullContact2Website.prototype.url = '';



/**
 * FullContact v2 data.
 * @constructor
 */
CrmApp.FullContact2Organization = function() {};


/**
 * @type {string}
 */
CrmApp.FullContact2Organization.prototype.name = '';


/**
 * @type {string}
 */
CrmApp.FullContact2Organization.prototype.title = '';


/**
 * @type {boolean}
 */
CrmApp.FullContact2Organization.prototype.isPrimary = false;



/**
 * FullContact v2 data.
 * @constructor
 */
CrmApp.FullContact2Chat = function() {};


/**
 * @type {string}
 */
CrmApp.FullContact2Chat.prototype.handle = '';



/**
 * FullContact v2 data.
 * @constructor
 */
CrmApp.FullContact2Photo = function() {};


/**
 * @type {string}
 */
CrmApp.FullContact2Photo.prototype.url = '';


/**
 * @type {string}
 */
CrmApp.FullContact2Photo.prototype.typeId = '';


/**
 * @type {string}
 */
CrmApp.FullContact2Photo.prototype.typeName = '';


/**
 * @type {boolean}
 */
CrmApp.FullContact2Photo.prototype.isPrimary = false;



/**
 * FullContact v2 data.
 * @constructor
 */
CrmApp.FullContact2Contact = function() {};


/**
 * @type {string}
 */
CrmApp.FullContact2Contact.prototype.familyName = '';


/**
 * @type {string}
 */
CrmApp.FullContact2Contact.prototype.givenName = '';


/**
 * @type {string}
 */
CrmApp.FullContact2Contact.prototype.fullName = '';


/**
 * @type {Array<CrmApp.FullContact2Website>}
 */
CrmApp.FullContact2Contact.prototype.websites = [];


/**
 * @type {Object<Array<CrmApp.FullContact2Chat>>}
 */
CrmApp.FullContact2Contact.prototype.chats = null;



/**
 * FullContact v2 data.
 * @constructor
 */
CrmApp.FullContact2 = function() {};


/**
 * @type {number}
 */
CrmApp.FullContact2.prototype.likelihood = 0;


/**
 * @type {Array.<CrmApp.FullContact2Photo>}
 */
CrmApp.FullContact2.prototype.photos = [];


/**
 * @type {CrmApp.FullContact2Contact}
 */
CrmApp.FullContact2.prototype.contactInfo = null;


/**
 * @type {Array.<CrmApp.FullContact2Organization>}
 */
CrmApp.FullContact2.prototype.organizations = [];


/**
 * @type {CrmApp.FullContact2Demographic}
 */
CrmApp.FullContact2.prototype.demographics = null;


/**
 * @type {Array<!CrmApp.FullContact2SocialProfile>}
 */
CrmApp.FullContact2.prototype.socialProfiles = [];



/**
 * All available social data.
 * @constructor
 */
CrmApp.MetaContact = function() {};


/**
 * @type {?CrmApp.FullContact2} FullContact data
 */
CrmApp.MetaContact.prototype.fc = null;



/**
 * ClearBit profile data.
 * @constructor
 * @link https://clearbit.com/docs#attributes
 */
CrmApp.ClearBitProfile = function() {};


/**
 * @type {string}
 */
CrmApp.ClearBitProfile.prototype.bio = '';


/**
 * @type {string}
 */
CrmApp.ClearBitProfile.prototype.handle = '';


/**
 * @type {string}
 */
CrmApp.ClearBitProfile.prototype.id = '';


/**
 * @type {number|undefined}
 */
CrmApp.ClearBitProfile.prototype.followers = 0;


/**
 * @type {number|undefined}
 */
CrmApp.ClearBitProfile.prototype.following = 0;


/**
 * @type {string|undefined}
 */
CrmApp.ClearBitProfile.prototype.location = '';


/**
 * @type {string|undefined}
 */
CrmApp.ClearBitProfile.prototype.site = '';


/**
 * @type {string}
 */
CrmApp.ClearBitProfile.prototype.avatar = '';



/**
 * ClearBit data.
 * @constructor
 * @link https://clearbit.com/docs#person-api
 */
CrmApp.ClearBit = function() {};



/**
 * @constructor
 */
CrmApp.ClearBitEmployment = function() {};


/**
 * @type {string}
 */
CrmApp.ClearBitEmployment.prototype.domain = '';


/**
 * @type {string}
 */
CrmApp.ClearBitEmployment.prototype.name = '';


/**
 * @type {string}
 */
CrmApp.ClearBitEmployment.prototype.title = '';



/**
 * @constructor
 */
CrmApp.ClearBitCompany = function() {};


/**
 * @type {string}
 */
CrmApp.ClearBitCompany.prototype.name = '';


/**
 * @type {string}
 */
CrmApp.ClearBitCompany.prototype.description = '';


/**
 * @type {string}
 */
CrmApp.ClearBitCompany.prototype.legal_name = '';


/**
 * @type {string}
 */
CrmApp.ClearBitCompany.prototype.url = '';



/**
 * @constructor
 */
CrmApp.ClearBitName = function() {};


/**
 * @type {string}
 */
CrmApp.ClearBitName.prototype.givenName = '';


/**
 * @type {string}
 */
CrmApp.ClearBitName.prototype.familyName = '';


/**
 * @type {string}
 */
CrmApp.ClearBitName.prototype.fullName = '';


/**
 * @type {CrmApp.ClearBitCompany}
 */
CrmApp.ClearBit.prototype.company = null;


/**
 * @type {CrmApp.ClearBitEmployment}
 */
CrmApp.ClearBit.prototype.employment = null;


/**
 * @type {CrmApp.ClearBitName}
 */
CrmApp.ClearBit.prototype.name = null;


/**
 * @type {string}
 */
CrmApp.ClearBit.prototype.gender = '';


/**
 * @type {string}
 */
CrmApp.ClearBit.prototype.location = '';


/**
 * @type {string}
 */
CrmApp.ClearBit.prototype.bio = '';


/**
 * @type {string} The best avatar url we have
 */
CrmApp.ClearBit.prototype.avatar = '';


/**
 * @type {CrmApp.ClearBitProfile}
 */
CrmApp.ClearBit.prototype.facebook = null;


/**
 * @type {CrmApp.ClearBitProfile}
 */
CrmApp.ClearBit.prototype.github = null;


/**
 * @type {CrmApp.ClearBitProfile}
 */
CrmApp.ClearBit.prototype.twitter = null;


/**
 * @type {CrmApp.ClearBitProfile}
 */
CrmApp.ClearBit.prototype.linkedin = null;


/**
 * @type {CrmApp.ClearBitProfile}
 */
CrmApp.ClearBit.prototype.googleplus = null;


/**
 * @type {CrmApp.ClearBitProfile}
 */
CrmApp.ClearBit.prototype.angellist = null;


/**
 * @type {CrmApp.ClearBitProfile}
 */
CrmApp.ClearBit.prototype.aboutme = null;


/**
 * @type {CrmApp.ClearBitProfile}
 */
CrmApp.ClearBit.prototype.gravatar = null;


/**
 * @type {?CrmApp.ClearBit} ClearBit data.
 */
CrmApp.MetaContact.prototype.cb = null;


/**
 * @type {?CrmApp.PiplRespond} Pipl data, formatted to FullContact.
 */
CrmApp.MetaContact.prototype.pp = null;



/**
 * All available social data.
 * @constructor
 * @extends {CrmApp.FullContact2SocialProfile}
 */
CrmApp.ProfileDetail = function() {};


/**
 * @type {?Object} raw data from the server.
 */
CrmApp.ProfileDetail.prototype.raw = null;



/**
 * Pipl respond data.
 * @link http://dev.pipl.com/docs/read/search_api/response
 * @constructor
 */
CrmApp.PiplRespond = function() {};



/**
 * Pipl respond data.
 * @link http://dev.pipl.com/docs/read/search_api/data#source
 * @constructor
 */
CrmApp.PiplSource = function() {};


/**
 * @type {string}
 */
CrmApp.PiplSource.prototype.domain = '';


/**
 * @type {string}
 */
CrmApp.PiplSource.prototype.url = '';



/**
 * Pipl name data.
 * @constructor
 */
CrmApp.PiplName = function() {};


/**
 * @type {string}
 */
CrmApp.PiplName.prototype.first = '';


/**
 * @type {string}
 */
CrmApp.PiplName.prototype.middle = '';


/**
 * @type {string}
 */
CrmApp.PiplName.prototype.last = '';


/**
 * @type {string}
 */
CrmApp.PiplName.prototype.display = '';



/**
 * Pipl respond data.
 * @link http://dev.pipl.com/docs/read/search_api/data#address
 * @constructor
 */
CrmApp.PiplAddress = function() {};


/**
 * @type {string} two latter code, eg: US
 */
CrmApp.PiplAddress.prototype.country = '';


/**
 * @type {string} two latter code
 */
CrmApp.PiplAddress.prototype.state = '';


/**
 * @type {string}
 */
CrmApp.PiplAddress.prototype.city = '';


/**
 * @type {string}
 */
CrmApp.PiplAddress.prototype.po_box = '';


/**
 * @type {string}
 */
CrmApp.PiplAddress.prototype.street = '';


/**
 * @type {string}
 */
CrmApp.PiplAddress.prototype.apartment = '';


/**
 * @type {string}
 */
CrmApp.PiplAddress.prototype.display = '';



/**
 * Pipl respond data.
 * @link http://dev.pipl.com/docs/read/search_api/data#phone
 * @constructor
 */
CrmApp.PiplPhone = function() {};



/**
 * Pipl text content data.
 * @constructor
 */
CrmApp.PiplContent = function() {};


/**
 * @type {string}
 */
CrmApp.PiplContent.prototype.content = '';



/**
 * Pipl text content data.
 * @constructor
 */
CrmApp.PiplUrl = function() {};


/**
 * @type {string}
 */
CrmApp.PiplUrl.prototype.url = '';



/**
 * Pipl people data.
 * @link http://dev.pipl.com/docs/read/search_api/data#person
 * @constructor
 */
CrmApp.PiplPerson = function() {};


/**
 * @type {Array<CrmApp.PiplName>}
 */
CrmApp.PiplPerson.prototype.names = [];


/**
 * @type {Array<CrmApp.PiplAddress>}
 */
CrmApp.PiplPerson.prototype.address = [];


/**
 * @type {Array<CrmApp.PiplUrl>}
 */
CrmApp.PiplPerson.prototype.images = [];



/**
 * Pipl respond data.
 * @link http://dev.pipl.com/docs/read/search_api/data#record
 * @constructor
 */
CrmApp.PiplRecord = function() {};


/**
 * @type {Array<CrmApp.PiplContent>}
 */
CrmApp.PiplRecord.prototype.usernames = [];


/**
 * @type {Array<CrmApp.PiplContent>}
 */
CrmApp.PiplRecord.prototype.user_ids = [];


/**
 * @type {Array<CrmApp.PiplUrl>}
 */
CrmApp.PiplRecord.prototype.images = [];


/**
 * @type {Array<string>}
 */
CrmApp.PiplRecord.prototype.names = [];


/**
 * @type {CrmApp.PiplSource}
 */
CrmApp.PiplRecord.prototype.source = null;


/**
 * @type {Array<CrmApp.PiplAddress>}
 */
CrmApp.PiplRecord.prototype.addresses = [];


/**
 * @type {Array<CrmApp.PiplPhone>}
 */
CrmApp.PiplRecord.prototype.phones = [];


/**
 * @type {Array<CrmApp.PiplRecord>}
 */
CrmApp.PiplRespond.prototype.records = [];


/**
 * @type {CrmApp.PiplPerson}
 */
CrmApp.PiplRespond.prototype.person = null;


