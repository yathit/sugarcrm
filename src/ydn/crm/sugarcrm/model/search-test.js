goog.provide('ydn.crm.su.model.SearchTest');
goog.setTestOnly('ydn.crm.su.model.SearchTest');

goog.require('goog.testing.asserts');
goog.require('goog.testing.jsunit');
goog.require('ydn.crm.su.model.Record');
goog.require('ydn.crm.su.model.OmniSearch');
goog.require('ydn.crm.su.model.Sugar');
goog.require('ydn.crm.test');


function setUp() {
  ydn.crm.test.initPipe();
}


function test_ordering() {
  var sugar = ydn.crm.test.createSugar();
  var search = new ydn.crm.su.model.OmniSearch(sugar);
  search.q_ = 'john';
  search.addResult_({
    _module: "Contacts",
    _score: 0.5,
    name: "Johnnie",
    id: "1dd42af7-1ea6-6fee-fb5b-5414e132e4f6"
  }, 'name', search.q_);
  assertEquals("init", 1, search.results_.length);
  search.addResult_({
    _module: "Contacts",
    _score: 1,
    name: "Johnnie Epley",
    id: "2dd42af7-1ea6-6fee-fb5b-5414e132e4f6"
  }, 'name', search.q_);
  assertEquals("repeat", 2, search.results_.length);
  assertEquals("first", "2dd42af7-1ea6-6fee-fb5b-5414e132e4f6", search.results_[0].id);
}


function test_repeat() {
  var sugar = ydn.crm.test.createSugar();
  var search = new ydn.crm.su.model.OmniSearch(sugar);
  search.q_ = 'john';
  search.addResult_({
    _module: "Contacts",
    _score: 0.5,
    name: "Johnnie Epley",
    id: "4dd42af7-1ea6-6fee-fb5b-5414e132e4f6"
  }, 'name', 'john');
  assertEquals("first", 1, search.results_.length);
  search.addResult_({
    _module: "Contacts",
    _score: 1,
    name: "Johnnie Epley",
    id: "4dd42af7-1ea6-6fee-fb5b-5414e132e4f6"
  }, 'name', 'john');
  assertEquals("repeat", 1, search.results_.length);
}








