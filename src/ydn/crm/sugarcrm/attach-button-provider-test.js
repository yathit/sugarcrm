goog.provide('ydn.crm.su.AttachButtonProviderTest');
goog.setTestOnly('ydn.crm.su.AttachButtonProviderTest');

goog.require('goog.testing.asserts');
goog.require('goog.testing.jsunit');
goog.require('ydn.crm.su.AttachButtonProvider');
goog.require('ydn.crm.su.utils');


var mock = document.createElement('div');
ydn.crm.ui.setSvgDoc('/cwork/image/all-icons.svg');

document.body.appendChild(mock);

function setUp() {
  mock.innerHTML = '<div id="a1" download_url="application/pdf:SMG.pdf:https://mail.google.com/" data-mid="m1490e04d5446681e"></div>' +
  '<div id="a2" download_url="application/pdf:SMG2.pdf:https://mail.google.com/" data-mid="m1490e04d5446681e"></div>';

}

function tearDown() {
  mock.innerHTML = '';
}


/**
 * @return {ydn.crm.su.model.Sugar}
 */
var getMockSugar = function() {
  var sugar = /** @type {ydn.crm.su.model.Sugar} */({});
  sugar.getChannel = function() {
    return {
      send: function() {
        return goog.async.Deferred.succeed([{result: []}, {result: []}]);
      }
    };
  };
  return sugar;
};


function testRenderButton() {
  var provider = new ydn.crm.su.AttachButtonProvider(getMockSugar());
  var btn = provider.renderButton(document.getElementById('a1'));
  assertTrue(btn.isInDocument());
  assertEquals(1, provider.buttons_.length);
}


function testRenderButtonMultiple() {
  var provider = new ydn.crm.su.AttachButtonProvider(getMockSugar());
  var btn1 = provider.renderButton(document.getElementById('a1'));
  var btn2 = provider.renderButton(document.getElementById('a2'));
  assertTrue(btn1.isInDocument());
  assertTrue(btn2.isInDocument());
  assertEquals(2, provider.buttons_.length);
}






