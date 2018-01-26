import test from 'tape';
import Di from '../src/di'

test('DI class', t => {
  t.ok(Di.hasOwnProperty('addGlobalDependency'));
  t.ok(Di.hasOwnProperty('addGlobalDependencies'));
  t.ok(Di.hasOwnProperty('getGlobalDependency'));

  const di = new Di();

  t.ok(di.hasOwnProperty('addDependency'));
  t.ok(di.hasOwnProperty('addDependencies'));
  t.ok(di.hasOwnProperty('getDependency'));

  t.end();
});

test('Di.addDependency', t => {
  Di.addGlobalDependency('d', 12345);

  t.equal(Di.getGlobalDependency('d'), 12345);

  const di = new Di();
  di.addDependency('b', 12345);

  t.equal(di.getDependency('b'), 12345);

  t.end();
});

test('Di.addDependencyObj', t => {
  const staticObj = {
    a: true,
    b: 12345
  };
  Di.addGlobalDependencies(staticObj);

  t.equal(Di.getGlobalDependency('a'), staticObj.a);
  t.equal(Di.getGlobalDependency('b'), staticObj.b);

  const di = new Di();
  const obj = {
    c: 'hello',
    d: () => {}
  };
  di.addDependencies(obj);

  t.equal(di.getDependency('c'), obj.c);
  t.equal(di.getDependency('d'), obj.d);

  t.end();
})
