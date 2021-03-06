goog.provide('ydn.crm.su.model.NameTest');
goog.setTestOnly('ydn.crm.su.model.NameTest');

goog.require('goog.testing.asserts');
goog.require('goog.testing.jsunit');
goog.require('ydn.crm.su.model.Record');
goog.require('ydn.crm.su.model.Sugar');
goog.require('ydn.crm.test');


function setUp() {
  ydn.crm.test.initPipe();
}


/**
 * @param {Object} obj
 * @return {ydn.crm.su.model.NameGroup}
 */
var makeNameGroup = function(obj) {
  var record = ydn.crm.test.createContactRecord(null, obj);
  return /** @type {ydn.crm.su.model.NameGroup} */ (record.getGroupModel('name'));
};

function test_label_full_name() {
  var original = {
    'salutation': '',
    'first_name': 'Kyaw',
    'last_name': 'Tun',
    'full_name': 'Mg Kyaw Tun'
  };
  var ng = this.makeNameGroup(original);
  assertEquals('Mg Kyaw Tun', ng.getFullNameLabel());

}

function test_label_no_full_name() {
  var original = {
    'first_name': 'Kyaw',
    'last_name': 'Tun'
  };
  var ng = this.makeNameGroup(original);
  assertEquals('Kyaw Tun', ng.getFullNameLabel());
}


function test_label_empty() {
  var original = {};
  var ng = this.makeNameGroup(original);
  assertEquals('', ng.getFullNameLabel());
}


function test_label_full_name_sal() {
  var original = {
    'salutation': 'Mr.',
    'first_name': 'Kyaw',
    'last_name': 'Tun',
    'full_name': 'Mr. Kyaw Tun'
  };
  var ng = this.makeNameGroup(original);
  assertEquals('Mr. Kyaw Tun', ng.getFullNameLabel());
}


function test_parse_simple() {
  var original = {
    'salutation': '',
    'first_name': 'Kyaw',
    'last_name': 'Tun',
    'full_name': 'Kyaw Tun'
  };
  var ng = this.makeNameGroup(original);
  var patch = ng.parseFullNameLabel('Kyaw Tun');
  assertUndefined('salutation', patch.salutation);
  assertEquals('first name', patch.first_name, original.first_name);
  assertEquals('first name', patch.last_name, original.last_name);
  assertEquals('first name', patch.full_name, original.full_name);
}


function test_parse_with_salutation() {
  var original = {
    'salutation': 'Mr.',
    'first_name': 'Kyaw',
    'last_name': 'Tun',
    'full_name': 'Kyaw Tun'
  };
  var ng = this.makeNameGroup(original);
  var patch = ng.parseFullNameLabel('Mr. Kyaw Tun');
  assertEquals('salutation', original.salutation, patch.salutation);
  assertEquals('first name', original.first_name, patch.first_name);
  assertEquals('last name', original.last_name, patch.last_name);
  assertEquals('full name', original.full_name, patch.full_name);
}


function test_parse_remove_salutation() {
  var original = {
    'salutation': 'Mr.',
    'first_name': 'Kyaw',
    'last_name': 'Tun',
    'full_name': 'Kyaw Tun'
  };
  var ng = this.makeNameGroup(original);
  var patch = ng.parseFullNameLabel('Kyaw Tun');
  assertUndefined('salutation', patch.salutation);
  assertEquals('first name', patch.first_name, original.first_name);
  assertEquals('last name', patch.last_name, original.last_name);
  assertEquals('full name', patch.full_name, original.full_name);
}

function test_parse_add_sal() {
  var original = {
    'salutation': '',
    'first_name': 'Kyaw',
    'last_name': 'Tun',
    'full_name': 'Kyaw Tun'
  };
  var ng = this.makeNameGroup(original);
  var patch = ng.parseFullNameLabel('Ms. Kyaw Tun');
  assertEquals('salutation', 'Ms.', patch.salutation);
  assertEquals('first name', original.first_name, patch.first_name);
  assertEquals('last name', original.last_name, patch.last_name);
  assertEquals('full name', 'Kyaw Tun', patch.full_name);
}

function test_parse_edit_sal() {
  var original = {
    'salutation': 'Mr.',
    'first_name': 'Kyaw',
    'last_name': 'Tun',
    'full_name': 'Kyaw Tun'
  };
  var ng = this.makeNameGroup(original);
  var patch = ng.parseFullNameLabel('Ms. Kyaw Tun');
  assertEquals('salutation', 'Ms.', patch.salutation);
  assertEquals('first name', original.first_name, patch.first_name);
  assertEquals('last name', original.last_name, patch.last_name);
  assertEquals('full name', 'Kyaw Tun', patch.full_name);
}


function test_parse_amend_first() {
  var original = {
    'salutation': '',
    'last_name': 'Tun',
    'full_name': 'Tun'
  };
  var ng = this.makeNameGroup(original);
  var patch = ng.parseFullNameLabel('Kyaw Tun');
  assertUndefined('salutation', patch.salutation);
  assertEquals('first name', 'Kyaw', patch.first_name);
  assertEquals('last name', 'Tun', patch.last_name);
  assertEquals('full name', 'Kyaw Tun', patch.full_name);
}


function test_parse_add_first() {
  var original = {};
  var ng = this.makeNameGroup(original);
  var patch = ng.parseFullNameLabel('Kyaw');
  assertUndefined('salutation', patch.salutation);
  assertEquals('first name', 'Kyaw', patch.first_name);
  assertEquals('last name', '', patch.last_name);
  assertEquals('full name', 'Kyaw', patch.full_name);
}


function test_parse_add_first_2() {
  var original = {};
  var ng = this.makeNameGroup(original);
  var patch = ng.parseFullNameLabel('Kyaw ');
  assertUndefined('salutation', patch.salutation);
  assertEquals('first name', 'Kyaw', patch.first_name);
  assertEquals('last name', '', patch.last_name);
  assertEquals('full name', 'Kyaw', patch.full_name);
}


function test_parse_add_first_3() {
  var original = {};
  var ng = this.makeNameGroup(original);
  var patch = ng.parseFullNameLabel(' Kyaw');
  assertUndefined('salutation', patch.salutation);
  assertEquals('first name', 'Kyaw', patch.first_name);
  assertEquals('last name', '', patch.last_name);
  assertEquals('full name', 'Kyaw', patch.full_name);
}


function test_parse_add_both() {
  var original = {};
  var ng = this.makeNameGroup(original);
  var patch = ng.parseFullNameLabel('Kyaw Tun');
  assertUndefined('salutation', patch.salutation);
  assertEquals('first name', 'Kyaw', patch.first_name);
  assertEquals('last name', 'Tun', patch.last_name);
  assertEquals('full name', 'Kyaw Tun', patch.full_name);
}


function test_parse_add_all() {
  var original = {};
  var ng = this.makeNameGroup(original);
  var patch = ng.parseFullNameLabel('Mr. Kyaw Tun');
  assertEquals('salutation', 'Mr.', patch.salutation);
  assertEquals('first name', 'Kyaw', patch.first_name);
  assertEquals('last name', 'Tun', patch.last_name);
  assertEquals('full name', 'Kyaw Tun', patch.full_name);
}


function test_parse_edit_first() {
  var original = {
    'salutation': 'Mr.',
    'first_name': 'Kyaw',
    'last_name': 'Tun',
    'full_name': 'Kyaw Tun'
  };
  var ng = this.makeNameGroup(original);
  var patch = ng.parseFullNameLabel('Mr. Cyaw Tun');
  assertEquals('salutation', original.salutation, patch.salutation);
  assertEquals('first name', 'Cyaw', patch.first_name);
  assertEquals('last name', original.last_name, patch.last_name);
  assertEquals('full name', 'Cyaw Tun', patch.full_name);
}


function test_parse_remove_first() {
  var original = {
    'salutation': '',
    'first_name': 'Kyaw',
    'last_name': 'Tun',
    'full_name': 'Kyaw Tun'
  };
  var ng = this.makeNameGroup(original);
  var patch = ng.parseFullNameLabel('Tun');
  assertUndefined('salutation', patch.salutation);
  assertEquals('first name', '', patch.first_name);
  assertEquals('last name', 'Tun', patch.last_name);
  assertEquals('full name', 'Tun', patch.full_name);
}


function test_parse_add_last() {
  var original = {
    'salutation': '',
    'first_name': 'Kyaw',
    'last_name': '',
    'full_name': 'Kyaw'
  };
  var ng = this.makeNameGroup(original);
  var patch = ng.parseFullNameLabel('Kyaw Tun');
  assertUndefined('salutation', patch.salutation);
  assertEquals('first name', 'Kyaw', patch.first_name);
  assertEquals('last name', 'Tun', patch.last_name);
  assertEquals('full name', 'Kyaw Tun', patch.full_name);
}

function test_parse_edit_last() {
  var original = {
    'salutation': 'Mr.',
    'first_name': 'Kyaw',
    'last_name': 'Tun',
    'full_name': 'Kyaw Tun'
  };
  var ng = this.makeNameGroup(original);
  var patch = ng.parseFullNameLabel('Mr. Kyaw Htoon');
  assertEquals('salutation', original.salutation, patch.salutation);
  assertEquals('first name', 'Kyaw', patch.first_name);
  assertEquals('last name', 'Htoon', patch.last_name);
  assertEquals('full name', 'Kyaw Htoon', patch.full_name);
}


function test_parse_remove_last() {
  var original = {
    'salutation': '',
    'first_name': 'Kyaw',
    'last_name': 'Tun',
    'full_name': 'Kyaw Tun'
  };
  var ng = this.makeNameGroup(original);
  var patch = ng.parseFullNameLabel('Kyaw');
  assertUndefined('salutation', patch.salutation);
  assertEquals('first name', 'Kyaw', patch.first_name);
  assertEquals('last name', '', patch.last_name);
  assertEquals('full name', 'Kyaw', patch.full_name);
}


function test_parse_extra_last() {
  var original = {
    'salutation': '',
    'first_name': 'Kyaw',
    'last_name': 'Tun',
    'full_name': 'Kyaw Tun'
  };
  var ng = this.makeNameGroup(original);
  var patch = ng.parseFullNameLabel('Kyaw Tun San');
  assertUndefined('salutation', patch.salutation);
  assertEquals('first name', 'Kyaw', patch.first_name);
  assertEquals('last name', 'Tun San', patch.last_name);
  assertEquals('full name', 'Kyaw Tun San', patch.full_name);
}

function test_parse_extra_last_with_sal() {
  var original = {
    'salutation': 'Mr. ',
    'first_name': 'Kyaw',
    'last_name': 'Tun',
    'full_name': 'Mr. Kyaw Tun'
  };
  var ng = this.makeNameGroup(original);
  var patch = ng.parseFullNameLabel('Mr. Kyaw Tun San');
  assertEquals('salutation', 'Mr.', patch.salutation);
  assertEquals('first name', 'Kyaw', patch.first_name);
  assertEquals('last name', 'Tun San', patch.last_name);
  assertEquals('full name', 'Kyaw Tun San', patch.full_name);
}


function test_escape_entities() {
  var original = {
    'salutation': 'Mr. ',
    'first_name': 'Kyaw&#039;s',
    'last_name': 'Tun',
    'full_name': 'Mr. Kyaw&#039;s Tun',
    'name': 'Kyaw&#039;s Tun'
  };
  var ng = this.makeNameGroup(original);
  assertEquals('first_name', "Kyaw's", ng.getStringValue('first_name'));
}

