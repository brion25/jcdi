const Di = require('../src/di');

const di = new Di();

//Adding Dependencies
di.addDependency('multiply', function(a, b) {
  return a * b;
});

Di.addGlobalDependency('greeting', function(name) {
  return `Hello ${name}`;
})

// controllers setup
const controllerA = di.invoke(function(multiply) {
  console.log(multiply(5,10))
})

const controllerB = di.invoke(function(greeting) {
  console.log(greeting('Jose'))
})

const controllerC = di.invoke(['multiply', 'greeting', function(mul, gtg) {
  console.log(mul(2,8));
  console.log(gtg('Chase'));
}])

controllerA();
controllerB();
controllerC();
