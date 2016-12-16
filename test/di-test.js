import test from 'tape';
import {
  addDependencies,
  addDependency,
  invoke,
  size,
  getDependency
} from '../src/di';

import * as mocks from './mocks';

test('DI class', t => {
  t.equal(typeof addDependencies, 'function');
  t.equal(typeof addDependency, 'function');
  t.equal(typeof getDependency, 'function');
  t.equal(typeof invoke, 'function');

  t.end();
})

test('di.addDependencies', t => {
  const dependencies = [ mocks.multiply, mocks.divide ];

  addDependencies(dependencies)

  t.equal(size(), dependencies.length)

  t.end();
})

test('di.addDependency', t => {
  addDependency(mocks.multiply)
  addDependency(mocks.divide)

  t.equal(mocks.multiply.action, getDependency('multiply'))
  t.equal(mocks.divide, getDependency('divide'))

  t.end();
})

test('di.invoke', t => {
  addDependency(mocks.multiply)
  const multiply = invoke(['multiply', function(multiply) {
    return multiply(5, 5)
  }])

  t.equal(mocks.multiply.action(5, 5), multiply())

  t.end();
})

test('di.getDependency', t => {
  addDependency(mocks.multiply)

  t.end();
})
