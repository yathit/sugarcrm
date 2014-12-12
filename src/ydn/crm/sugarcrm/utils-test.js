goog.provide('ydn.crm.sugarcrm.UtilsTest');
goog.setTestOnly('ydn.crm.sugarcrm.UtilsTest');

goog.require('goog.testing.asserts');
goog.require('goog.testing.jsunit');
goog.require('ydn.crm.sugarcrm.utils');


var mock = document.createElement('div');
document.body.appendChild(mock);

function setUp() {

}

function tearDown() {
  mock.innerHTML = '';
}


function test_date_conversion() {
  var s = '2013-09-20 22:10:00';
  var d = ydn.crm.sugarcrm.utils.parseDate(s);
  var s2 = ydn.crm.sugarcrm.utils.toDateString(d);
  assertEquals(s, s2);

}


function test_datetime_input() {
  var input = document.createElement('input');
  mock.appendChild(input);
  input.type = 'datetime-local';
  var date_start = '2014-12-13 05:15:00';
  input.value = ydn.crm.sugarcrm.utils.toDateTimeLocalString(date_start);
  var input_date = ydn.crm.sugarcrm.utils.fromDateTimeLocalString(input.valueAsNumber);
  assertEquals(date_start, input_date);
}







