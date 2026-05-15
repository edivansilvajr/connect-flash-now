const assert = require('assert');
const flash = require('../lib');

function ok(msg) { console.log('ok -', msg); }
function fail(msg, err) { console.error('fail -', msg); if (err) console.error(err); }

try {
  // module export
  assert.strictEqual(typeof flash, 'function');
  ok('exports middleware as function');

  // Mock objects
  function MockRequest() { this.session = {}; }
  function MockRequestWithoutSession() {}
  function MockResponse() {}

  // middleware instance
  const mw = flash();

  // handling a request
  (function(){
    const req = new MockRequest();
    const res = new MockResponse();
    let called = false;
    mw(req, res, function(err){
      assert.strictEqual(err, undefined);
      called = true;
    });
    assert.strictEqual(called, true);
    ok('middleware does not error and calls next');

    assert.strictEqual(typeof req.flash, 'function');
    ok('adds req.flash function');

    let count = req.flash('error', 'Something went wrong');
    assert.strictEqual(count, 1);
    assert.strictEqual(Object.keys(req.session.flash).length, 1);
    assert.strictEqual(req.session.flash['error'].length, 1);
    ok('sets a flash message');

    let msgs = req.flash('error');
    assert.strictEqual(msgs.length, 1);
    assert.strictEqual(msgs[0], 'Something went wrong');
    assert.strictEqual(Object.keys(req.session.flash).length, 0);
    ok('gets and clears previously set flash message');

    req.flash('info', 'Welcome');
    count = req.flash('info', 'Check out this great new feature');
    assert.strictEqual(count, 2);
    assert.strictEqual(Object.keys(req.session.flash).length, 1);
    assert.strictEqual(req.session.flash['info'].length, 2);
    ok('sets multiple flash messages');

    count = req.flash('warning', ['username required', 'password required']);
    assert.strictEqual(count, 2);
    msgs = req.flash('warning');
    assert.strictEqual(msgs.length, 2);
    assert.strictEqual(msgs[0], 'username required');
    assert.strictEqual(msgs[1], 'password required');
    ok('sets flash messages in one call');

    msgs = req.flash('info');
    assert.strictEqual(msgs.length, 2);
    assert.strictEqual(msgs[0], 'Welcome');
    assert.strictEqual(msgs[1], 'Check out this great new feature');
    assert.strictEqual(Object.keys(req.session.flash).length, 0);
    ok('gets and clears multiple previously set flash messages');

    req.flash('info', 'Welcome back');
    req.flash('notice', 'Last login was yesterday');
    assert.strictEqual(Object.keys(req.session.flash).length, 2);
    assert.strictEqual(req.session.flash['info'].length, 1);
    assert.strictEqual(req.session.flash['notice'].length, 1);
    ok('sets flash messages of multiple types');

    msgs = req.flash('info');
    assert.strictEqual(msgs.length, 1);
    assert.strictEqual(msgs[0], 'Welcome back');
    assert.strictEqual(Object.keys(req.session.flash).length, 1);
    msgs = req.flash('notice');
    assert.strictEqual(msgs.length, 1);
    assert.strictEqual(msgs[0], 'Last login was yesterday');
    ok('independently get and clear messages of multiple types');

    req.flash('error', 'Database is down');
    req.flash('error', 'Message queue is down');
    req.flash('notice', 'Things are looking bleak');
    msgs = req.flash();
    assert.strictEqual(Object.keys(msgs).length, 2);
    assert.strictEqual(msgs['error'].length, 2);
    assert.strictEqual(msgs['notice'].length, 1);
    assert.strictEqual(Object.keys(req.session.flash).length, 0);
    ok('returns all messages and clears session');

    // formatting uses util.format if available
    try {
      req.flash('info', 'Hello %s', 'Jared');
      let msg = req.flash('info')[0];
      assert.strictEqual(msg, 'Hello Jared');
      req.flash('info', 'Hello %s %s', 'Jared', 'Hanson');
      msg = req.flash('info')[0];
      assert.strictEqual(msg, 'Hello Jared Hanson');
      ok('formats messages with util.format');
    } catch (e) {
      // ignore if util.format not present
    }

    msgs = req.flash('what');
    assert.strictEqual(msgs.length, 0);
    ok('returns empty array for flash type with no messages');
  })();

  // handling a request with existing flash function
  (function(){
    const req = new MockRequest();
    req.flash = function(type, msg) { this.session.flash = 'I Exist'; };
    const res = new MockResponse();
    mw(req, res, function(err){ assert.strictEqual(err, undefined); });
    req.flash('question', 'Do you?');
    assert.strictEqual(req.session.flash, 'I Exist');
    ok('does not overwrite existing flash when safe');
  })();

  // handling a request without a session
  (function(){
    const req = new MockRequestWithoutSession();
    const res = new MockResponse();
    mw(req, res, function(err){ assert.strictEqual(err, undefined); });
    assert.strictEqual(typeof req.flash, 'function');
    let threw = false;
    try { req.flash('error', 'Something went wrong'); } catch (e) { threw = true; }
    assert.strictEqual(threw, true);
    ok('throws when attempting to set a flash message without session');
  })();

  // middleware with unsafe option
  (function(){
    const mw2 = flash({ unsafe: true });
    const req = new MockRequest();
    req.flash = function(type, msg) { this.session.flash = 'I Exist'; };
    const res = new MockResponse();
    mw2(req, res, function(err){ assert.strictEqual(err, undefined); });
    req.flash('info', 'It works!');
    assert.strictEqual(Object.keys(req.session.flash).length, 1);
    assert.strictEqual(req.session.flash['info'].length, 1);
    ok('overwrites flash function when unsafe');
  })();

  console.log('\nAll tests passed');
  process.exit(0);

} catch (err) {
  console.error('\nTest failure:');
  console.error(err && err.stack || err);
  process.exit(1);
}
