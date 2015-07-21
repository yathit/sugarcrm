goog.provide('ydn.crm.su.UtilsTest');
goog.setTestOnly('ydn.crm.su.UtilsTest');

goog.require('goog.testing.asserts');
goog.require('goog.testing.jsunit');
goog.require('ydn.crm.su.utils');
goog.require('ydn.crm.su.SortedRecords');


var mock = document.createElement('div');
document.body.appendChild(mock);

function setUp() {

}

function tearDown() {
  mock.innerHTML = '';
}


function test_date_conversion() {
  var s = '2013-09-20 22:10:00';
  var d = ydn.crm.su.utils.parseDate(s);
  var s2 = ydn.crm.su.utils.toDateString(d);
  assertEquals(s, s2);
}


function test_datetime_input() {
  var input = document.createElement('input');
  mock.appendChild(input);
  input.type = 'datetime-local';
  var date_start = '2014-12-13 05:15:00';
  input.value = ydn.crm.su.utils.toDateTimeLocalString(date_start);
  var input_date = ydn.crm.su.utils.fromDateTimeLocalString(input.valueAsNumber);
  assertEquals(date_start, input_date);
}


function testIncrementDateModified() {
  var record = {
    date_modified: '2015-03-07 03:19:19'
  };
  ydn.crm.su.utils.incrementDateModified(record);
  assertEquals('2015-03-07 03:19:20', record.date_modified);
}


function testSortedArray() {
  var arr = [
    {
      "id": "135a15b0-a223-6d4e-363b-5414e1f2acf8",
      "name": "Follow-up on proposal",
      "date_start": "2015-09-08 07:15:00",
      "date_end": "2015-09-08 08:45:00"
    },
    {
      "id": "d7c11d6a-5ac7-1905-e131-5414e186c91e",
      "name": "Review needs",
      "date_start": "2015-07-30 09:30:00",
      "date_end": "2015-07-30 12:45:00"
    },
    {
      "id": "135a15b0-a223-6d4e-363b-5414e1f2acf8",
      "name": "Follow-up on proposal",
      "date_start": "2015-09-08 07:15:00",
      "date_end": "2015-09-08 08:45:00"
    },
    {
      id: "f32a8b72-cfbe-9aff-3b0d-5414e1d9d6f0",
      "name": "Test",
      "date_end": "2015-08-25 14:00:00",
      "date_start": "2015-08-25 11:30:00"
    }
  ];
  var sorted = new ydn.crm.su.SortedRecords('date_start', true);
  var cnt = sorted.addAll(arr);
  assertEquals(3, cnt);
  assertEquals('1', arr[0].id, sorted.records[0].id);
  assertEquals('2', arr[3].id, sorted.records[1].id);
  assertEquals('3', arr[1].id, sorted.records[2].id);
}







