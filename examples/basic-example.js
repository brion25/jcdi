const Di = require('./../index.js');

let di = new Di();

/**
 * Function dependency
 */
di.addDependency(function plus(a,b){
  return a+b;
});

/**
 * Object dependency
 */
di.addDependency({
  name : 'minus',
  action : (a,b) => a - b
});

/**
 * Booleans, Strings and Numbers are invalid dependencies
 */
di.addDependencies([true, 'Invalid', 25]);

var minificationProof = di.invoke(['plus','minus',function(x,y){
  this.val = 35;

  console.log(x(this.val,4));
  console.log(y(5,this.val));
}]);

var iFailInMinification = di.invoke(function(plus){
  console.log(plus(5,5))
});

minificationProof();
iFailInMinification();
