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
 * @param {boolean=} opt_with_result
 * @return {ydn.crm.su.model.Sugar}
 */
var getMockSugar = function(opt_with_result) {
  var arr = [];
  if (opt_with_result) {
    arr = [{
      _module: 'Documents',
      id: 'abc',
      name: 'ABC'
    }];
  }
  var sugar = /** @type {ydn.crm.su.model.Sugar} */({});
  sugar.getChannel = function() {
    return {
      send: function(req) {
        if (req == ydn.crm.ch.SReq.UPLOAD_DOC) {
          return goog.async.Deferred.succeed({
            id: 'xyz',
            document_name: 'ABC'
          });
        } else {
          return goog.async.Deferred.succeed([{result: arr}, {result: []}]);
        }
      }
    };
  };
  sugar.getRecordViewLink = function() {
    return 'http://foo.com';
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


function testRenderButtonReuse() {
  var provider = new ydn.crm.su.AttachButtonProvider(getMockSugar());
  var a1 = document.getElementById('a1');
  var btn1 = provider.renderButton(a1);
  assertTrue(btn1.isInDocument());
  a1.parentNode.removeChild(a1);
  assertFalse(btn1.isInDocument());
  var btn2 = provider.renderButton(document.getElementById('a2'));
  assertTrue(btn2.isInDocument());
  assertEquals(1, provider.buttons_.length);
}


function testMessageId() {
  var provider = new ydn.crm.su.AttachButtonProvider(getMockSugar(true));
  var btn = provider.renderButton(document.getElementById('a1'));
  assertEquals('m1490e04d5446681e', btn.getMessageId());
}


function testDownloadInfo() {
  var provider = new ydn.crm.su.AttachButtonProvider(getMockSugar(true));
  var btn = provider.renderButton(document.getElementById('a1'));
  var info = btn.getDownloadInfo();
  assertEquals('SMG.pdf', info.fn);
  assertEquals('application/pdf', info.mime);
  assertEquals('https://mail.google.com/', info.url);
}


function testDispatchView() {
  var provider = new ydn.crm.su.AttachButtonProvider(getMockSugar(true));
  var btn = provider.renderButton(document.getElementById('a1'));
  var called = false;
  goog.events.listen(provider, ydn.crm.su.events.EventType.VIEW_RECORD, function(ev) {
    assertEquals('abc', ev.id);
    called = true;
  });
  btn.button_.click();
  assertTrue(called);
}


function testUpload() {
  var provider = new ydn.crm.su.AttachButtonProvider(getMockSugar());
  var btn = provider.renderButton(document.getElementById('a1'));
  var info = btn.getDownloadInfo();
  assertEquals('', info.document_id);
  ydn.crm.su.ui.UploadDialog.showModel = function() {
    return goog.async.Deferred.succeed({
      document_name: 'def',
      description: '',
      relationships: []
    });
  };
  var view_called = false;
  goog.events.listen(provider, ydn.crm.su.events.EventType.VIEW_RECORD, function(ev) {
    assertEquals('abc', ev.id);
    view_called = true;
  });
  btn.button_.click();
  assertFalse(view_called);
  info = btn.getDownloadInfo();
  assertEquals('xyz', info.document_id);
}

