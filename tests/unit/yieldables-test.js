import Ember from 'ember';
import { task, all } from 'ember-concurrency';

module('Unit: yieldables');

test("all behaves like Promise.all", function(assert) {
  assert.expect(6);

  let defers = [];
  let Obj = Ember.Object.extend({
    parent: task(function * () {
      let task = this.get('child');
      let allPromise = all([
        task.perform(),
        task.perform(),
        task.perform(),
      ]);
      assert.equal(typeof allPromise.then, 'function');
      let values = yield allPromise;
      assert.deepEqual(values, ['a', 'b', 'c']);
    }),

    child: task(function * () {
      let defer = Ember.RSVP.defer();
      defers.push(defer);
      let value = yield defer.promise;
      return value;
    }),
  });

  let obj;
  Ember.run(() => {
    obj = Obj.create();
    obj.get('parent').perform();
  });

  let childTask = obj.get('child');
  assert.equal(childTask.get('concurrency'), 3);
  Ember.run(() => defers.shift().resolve('a'));
  assert.equal(childTask.get('concurrency'), 2);
  Ember.run(() => defers.shift().resolve('b'));
  assert.equal(childTask.get('concurrency'), 1);
  Ember.run(() => defers.shift().resolve('c'));
  assert.equal(childTask.get('concurrency'), 0);
});

test("all cancels all other joined tasks if one of them fails", function(assert) {
  assert.expect(3);

  let defers = [];
  let Obj = Ember.Object.extend({
    parent: task(function * () {
      let task = this.get('child');
      try {
        yield all([
          task.perform(),
          task.perform(),
          task.perform(),
        ]);
      } catch(e) {
        assert.equal(e.wat, 'lol');
      }
    }),

    child: task(function * () {
      let defer = Ember.RSVP.defer();
      defers.push(defer);
      yield defer.promise;
    }),
  });

  let obj;
  Ember.run(() => {
    obj = Obj.create();
    obj.get('parent').perform();
  });

  let childTask = obj.get('child');
  assert.equal(childTask.get('concurrency'), 3);
  Ember.run(() => defers.shift().reject({ wat: 'lol' }));
  assert.equal(childTask.get('concurrency'), 0);
});

test("all cancels all joined tasks if parent task is canceled", function(assert) {
  assert.expect(2);

  let Obj = Ember.Object.extend({
    parent: task(function * () {
      let task = this.get('child');
      yield all([
        task.perform(),
        task.perform(),
        task.perform(),
      ]);
    }),

    child: task(function * () {
      yield Ember.RSVP.defer().promise;
    }),
  });

  let obj;
  Ember.run(() => {
    obj = Obj.create();
    obj.get('parent').perform();
  });

  let childTask = obj.get('child');
  assert.equal(childTask.get('concurrency'), 3);
  Ember.run(() => obj.get('parent').cancelAll());
  assert.equal(childTask.get('concurrency'), 0);
});

