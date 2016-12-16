const Di = require('./../index.js');

/**
 * Function dependency
 */
Di.addDependency(function plus(a,b){
  return a+b;
});

/**
 * Object dependency
 */
Di.addDependency({
  name : 'minus',
  action : (a,b) => a - b
});

/**
 * Booleans, Strings and Numbers are invalid dependencies
 */
Di.addDependencies([true, 'Invalid', 25]);

var minificationProof = Di.invoke(['plus','minus',function(x,y){
  this.val = 35;

  console.log('Minification proof');
  console.log(x(this.val,4));
  console.log(y(5,this.val));
}]);

var iFailInMinification = Di.invoke(function(plus){
  console.log('Minification fail');
  console.log(plus(5,5))
});

minificationProof();
iFailInMinification();
